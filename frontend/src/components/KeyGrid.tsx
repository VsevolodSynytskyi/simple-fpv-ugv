import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react'
import { useKeyboardControl } from '@/hooks/useKeyboardControl'
import { KeyCap } from './KeyCap'

export function KeyGrid() {
  const activeKeys = useKeyboardControl()
  return (
    <div className="grid grid-cols-3 gap-1">
      <div />
      <KeyCap active={activeKeys.has('arrowup')}>
        <ArrowUp size={18} />
      </KeyCap>
      <div />
      <KeyCap active={activeKeys.has('arrowleft')}>
        <ArrowLeft size={18} />
      </KeyCap>
      <KeyCap active={activeKeys.has('arrowdown')}>
        <ArrowDown size={18} />
      </KeyCap>
      <KeyCap active={activeKeys.has('arrowright')}>
        <ArrowRight size={18} />
      </KeyCap>
    </div>
  )
}
