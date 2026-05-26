import { AnimatePresence, motion } from 'motion/react'
import { ConnectionStatus } from './components/ConnectionStatus'
import { Hud } from './components/Hud'
import { VideoFeed } from './components/VideoFeed'
import { useWebSocket } from './hooks/useWebSocket'

export default function App() {
  const { connected } = useWebSocket()

  return (
    <main className="h-screen w-screen p-1">
      <div className="bg-background relative h-full w-full overflow-hidden rounded-lg">
        <AnimatePresence mode="wait">
          {connected ? (
            <motion.div
              key="live"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <VideoFeed />
              <Hud />
            </motion.div>
          ) : (
            <motion.div
              key="offline"
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <ConnectionStatus />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}
