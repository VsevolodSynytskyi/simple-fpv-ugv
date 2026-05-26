import { useCallback, useEffect, useState } from 'react'

const URL = `ws://${location.host}/ws`

let ws: WebSocket | null = null
let isConnected = false
let reconnectTimer: ReturnType<typeof setTimeout> | null = null
const listeners = new Set<(connected: boolean) => void>()

function setConnected(value: boolean) {
  isConnected = value
  listeners.forEach((l) => l(value))
}

function connect() {
  ws = new WebSocket(URL)
  ws.onopen = () => setConnected(true)
  ws.onclose = () => {
    setConnected(false)
    if (reconnectTimer) clearTimeout(reconnectTimer)
    reconnectTimer = setTimeout(connect, 2000)
  }
}

export function useWebSocket() {
  const [connected, setLocal] = useState(isConnected)

  useEffect(() => {
    if (!ws) connect()
    listeners.add(setLocal)
    setLocal(isConnected)
    return () => {
      listeners.delete(setLocal)
    }
  }, [])

  const send = useCallback((cmd: string) => {
    if (ws?.readyState === WebSocket.OPEN) ws.send(cmd)
  }, [])

  return { connected, send }
}
