import { useEffect, useState } from 'react'
import { useWebSocket } from './useWebSocket'

const ARROWS = ['arrowup', 'arrowdown', 'arrowleft', 'arrowright'] as const
type Arrow = (typeof ARROWS)[number]

function isArrow(key: string): key is Arrow {
  return (ARROWS as readonly string[]).includes(key)
}

function commandFor(keys: Set<Arrow>): string {
  const v = (keys.has('arrowup') ? 1 : 0) - (keys.has('arrowdown') ? 1 : 0)
  const h = (keys.has('arrowright') ? 1 : 0) - (keys.has('arrowleft') ? 1 : 0)
  switch (`${v}:${h}`) {
    case '1:0':
      return 'forward'
    case '-1:0':
      return 'backward'
    case '0:-1':
      return 'left'
    case '0:1':
      return 'right'
    case '1:-1':
      return 'forward-left'
    case '1:1':
      return 'forward-right'
    case '-1:-1':
      return 'backward-left'
    case '-1:1':
      return 'backward-right'
    default:
      return 'stop'
  }
}

export function useKeyboardControl() {
  const { send } = useWebSocket()
  const [activeKeys, setActiveKeys] = useState<Set<Arrow>>(new Set())

  useEffect(() => {
    const keys = new Set<Arrow>()
    let lastCommand = 'stop'

    function update() {
      const command = commandFor(keys)
      if (command === lastCommand) return
      lastCommand = command
      send(command)
    }

    function handleDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase()
      if (!isArrow(key)) return
      e.preventDefault()
      if (keys.has(key)) return
      keys.add(key)
      setActiveKeys(new Set(keys))
      update()
    }

    function handleUp(e: KeyboardEvent) {
      const key = e.key.toLowerCase()
      if (!isArrow(key)) return
      e.preventDefault()
      if (!keys.has(key)) return
      keys.delete(key)
      setActiveKeys(new Set(keys))
      update()
    }

    document.addEventListener('keydown', handleDown)
    document.addEventListener('keyup', handleUp)
    return () => {
      document.removeEventListener('keydown', handleDown)
      document.removeEventListener('keyup', handleUp)
    }
  }, [send])

  return activeKeys
}
