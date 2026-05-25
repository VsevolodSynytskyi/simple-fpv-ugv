import { cn } from '@/lib/utils'

type Props = {
  connected: boolean
}

export function ConnectionStatus({ connected }: Props) {
  return (
    <div
      className={cn(
        'rounded-md border px-3 py-1 text-xs font-medium',
        connected
          ? 'border-primary bg-primary text-primary-foreground'
          : 'border-destructive bg-destructive text-white',
      )}
    >
      {connected ? 'Connected' : 'Disconnected'}
    </div>
  )
}
