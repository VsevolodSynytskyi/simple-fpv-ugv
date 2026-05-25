import { useCallback, useEffect, useRef, useState } from 'react'

export function useWebSocket(url: string) {
  const [connected, setConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    let cancelled = false
    let timeout: ReturnType<typeof setTimeout> | null = null

    function connect() {
      const ws = new WebSocket(url)
      wsRef.current = ws
      ws.onopen = () => setConnected(true)
      ws.onclose = () => {
        setConnected(false)
        if (!cancelled) timeout = setTimeout(connect, 2000)
      }
    }
    connect()

    return () => {
      cancelled = true
      if (timeout) clearTimeout(timeout)
      wsRef.current?.close()
    }
  }, [url])

  const send = useCallback((cmd: string) => {
    const ws = wsRef.current
    if (ws?.readyState === WebSocket.OPEN) ws.send(cmd)
  }, [])

  return { connected, send }
}
