import { cn } from '@/lib/utils'

type Props = {
  label: string
  active: boolean
}

export function KeyCap({ label, active }: Props) {
  return (
    <div
      className={cn(
        'flex h-14 w-14 items-center justify-center rounded-md border text-lg font-medium transition-colors',
        active
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-border bg-card text-muted-foreground',
      )}
    >
      {label}
    </div>
  )
}
