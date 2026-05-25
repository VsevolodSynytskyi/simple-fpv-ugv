import { cn } from '@/lib/utils'

type Props = {
  connected: boolean
}

export function ConnectionStatus({ connected }: Props) {
  return (
    <div
      className={cn(
        'rounded px-4 py-1 text-sm text-white',
        connected ? 'bg-green-900' : 'bg-red-900',
      )}
    >
      {connected ? 'Connected' : 'Disconnected'}
    </div>
  )
}
