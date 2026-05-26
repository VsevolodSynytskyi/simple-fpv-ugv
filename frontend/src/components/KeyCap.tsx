import { motion } from 'motion/react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  active: boolean
}

export function KeyCap({ children, active }: Props) {
  return (
    <motion.div
      className="flex size-12 items-center justify-center rounded-md border border-white/20 shadow-sm backdrop-blur-sm"
      initial={false}
      animate={{
        backgroundColor: active ? 'oklch(0.922 0 0)' : 'oklch(1 0 0 / 0.06)',
        color: active ? 'oklch(0.205 0 0)' : 'oklch(0.985 0 0)',
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {children}
    </motion.div>
  )
}
