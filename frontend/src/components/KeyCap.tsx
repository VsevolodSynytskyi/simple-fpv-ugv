import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  active: boolean
}

export function KeyCap({ children, active }: Props) {
  return (
    <div
      className={cn(
        'flex h-14 w-14 items-center justify-center rounded-md border transition-colors',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-card text-muted-foreground',
      )}
    >
      {children}
    </div>
  )
}
