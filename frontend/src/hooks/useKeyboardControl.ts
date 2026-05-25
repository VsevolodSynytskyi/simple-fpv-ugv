import { useEffect, useState } from 'react'

const KEY_MAP: Record<string, string> = {
  w: 'forward',
  s: 'backward',
  a: 'left',
  d: 'right',
}

export function useKeyboardControl(onCommand: (cmd: string) => void) {
  const [activeKey, setActiveKey] = useState<string | null>(null)

  useEffect(() => {
    let active: string | null = null

    function handleDown(e: KeyboardEvent) {
      const key = e.key.toLowerCase()
      if (!KEY_MAP[key] || key === active) return
      active = key
      setActiveKey(key)
      onCommand(KEY_MAP[key])
    }

    function handleUp(e: KeyboardEvent) {
      const key = e.key.toLowerCase()
      if (!KEY_MAP[key]) return
      active = null
      setActiveKey(null)
      onCommand('stop')
    }

    document.addEventListener('keydown', handleDown)
    document.addEventListener('keyup', handleUp)
    return () => {
      document.removeEventListener('keydown', handleDown)
      document.removeEventListener('keyup', handleUp)
    }
  }, [onCommand])

  return activeKey
}
