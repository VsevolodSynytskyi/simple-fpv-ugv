import { ConnectionStatus } from './components/ConnectionStatus'
import { KeyGrid } from './components/KeyGrid'
import { VideoFeed } from './components/VideoFeed'
import { useKeyboardControl } from './hooks/useKeyboardControl'
import { useWebSocket } from './hooks/useWebSocket'

export default function App() {
  const { connected, send } = useWebSocket(`ws://${location.host}/ws`)
  const activeKey = useKeyboardControl(send)

  return (
    <main className="flex min-h-screen flex-col items-center gap-4 p-5 font-mono">
      <VideoFeed />
      <ConnectionStatus connected={connected} />
      <KeyGrid activeKey={activeKey} />
    </main>
  )
}
