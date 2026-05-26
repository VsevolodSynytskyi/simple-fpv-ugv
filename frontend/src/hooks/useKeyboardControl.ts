import { useEffect, useState } from 'react'
import { useWebSocket } from './useWebSocket'

const KEY_MAP: Record<string, string> = {
  arrowup: 'forward',
  arrowdown: 'backward',
  arrowleft: 'left',
  arrowright: 'right',
}

export function useKeyboardControl() {
  const { send } = useWebSocket()
  const [activeKey, setActiveKey] = useState<string | null>(null)

  useEffect(() => {
    let active: string | null = null

    function handleDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase()
      if (!KEY_MAP[key]) return
      e.preventDefault()
      if (key === active) return
      active = key
      setActiveKey(key)
      send(KEY_MAP[key])
    }

    function handleUp(e: KeyboardEvent) {
      const key = e.key.toLowerCase()
      if (!KEY_MAP[key]) return
      e.preventDefault()
      active = null
      setActiveKey(null)
      send('stop')
    }

    document.addEventListener('keydown', handleDown)
    document.addEventListener('keyup', handleUp)
    return () => {
      document.removeEventListener('keydown', handleDown)
      document.removeEventListener('keyup', handleUp)
    }
  }, [send])

  return activeKey
}
