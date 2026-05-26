import { motion } from 'motion/react'

export function ConnectionStatus() {
  return (
    <div className="bg-background/40 mx-4 max-w-md rounded-xl border border-white/20 p-4 shadow-sm backdrop-blur-sm [.light_&]:border-white/50 [.light_&]:shadow-none">
      <div className="inline-flex w-fit items-center gap-1 rounded-full border border-yellow-500/25 bg-yellow-500/15 px-2 py-0.5 text-xs font-medium whitespace-nowrap text-yellow-500">
        <motion.span
          className="inline-block size-1.5 rounded-full bg-current"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        Reconnecting
      </div>
      <h2 className="text-foreground mt-3 text-sm font-medium">
        Reconnecting to the rover
      </h2>
      <p className="text-muted-foreground mt-1 text-sm">
        The control link dropped. Retrying every couple of seconds — the view
        will come back as soon as the link is up.
      </p>
    </div>
  )
}
