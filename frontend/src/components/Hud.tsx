import { ConnectionStatus } from './ConnectionStatus'
import { KeyGrid } from './KeyGrid'

type Props = {
  connected: boolean
  activeKey: string | null
}

export function Hud({ connected, activeKey }: Props) {
  return (
    <div className="bg-card/80 border-border absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3 rounded-lg border p-4 backdrop-blur-sm">
      <ConnectionStatus connected={connected} />
      <KeyGrid activeKey={activeKey} />
    </div>
  )
}
