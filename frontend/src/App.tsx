import { Hud } from './components/Hud'
import { VideoFeed } from './components/VideoFeed'
import { useKeyboardControl } from './hooks/useKeyboardControl'
import { useWebSocket } from './hooks/useWebSocket'

export default function App() {
  const { connected, send } = useWebSocket(`ws://${location.host}/ws`)
  const activeKey = useKeyboardControl(send)

  return (
    <main className="fixed inset-0 overflow-hidden">
      <VideoFeed />
      <Hud connected={connected} activeKey={activeKey} />
    </main>
  )
}
