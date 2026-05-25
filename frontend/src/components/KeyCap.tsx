import { cn } from '@/lib/utils'

type Props = {
  label: string
  active: boolean
}

export function KeyCap({ label, active }: Props) {
  return (
    <div
      className={cn(
        'flex h-14 w-14 items-center justify-center rounded-md border-2 text-lg transition-colors',
        active
          ? 'border-green-700 bg-green-700 text-white'
          : 'border-border text-muted-foreground',
      )}
    >
      {label}
    </div>
  )
}
