import { KeyGrid } from './KeyGrid'

export function Hud() {
  return (
    <div className="absolute bottom-3 left-1/2 z-1000 -translate-x-1/2">
      <KeyGrid />
    </div>
  )
}
