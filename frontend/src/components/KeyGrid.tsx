import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react'
import { useKeyboardControl } from '@/hooks/useKeyboardControl'
import { KeyCap } from './KeyCap'

export function KeyGrid() {
  const activeKey = useKeyboardControl()
  return (
    <div className="grid grid-cols-3 gap-1">
      <div />
      <KeyCap active={activeKey === 'arrowup'}>
        <ArrowUp size={18} />
      </KeyCap>
      <div />
      <KeyCap active={activeKey === 'arrowleft'}>
        <ArrowLeft size={18} />
      </KeyCap>
      <KeyCap active={activeKey === 'arrowdown'}>
        <ArrowDown size={18} />
      </KeyCap>
      <KeyCap active={activeKey === 'arrowright'}>
        <ArrowRight size={18} />
      </KeyCap>
    </div>
  )
}
