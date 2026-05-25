import { ArrowDown, ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react'
import { KeyCap } from './KeyCap'

type Props = {
  activeKey: string | null
}

export function KeyGrid({ activeKey }: Props) {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      <div />
      <KeyCap active={activeKey === 'arrowup'}>
        <ArrowUp className="h-5 w-5" />
      </KeyCap>
      <div />
      <KeyCap active={activeKey === 'arrowleft'}>
        <ArrowLeft className="h-5 w-5" />
      </KeyCap>
      <KeyCap active={activeKey === 'arrowdown'}>
        <ArrowDown className="h-5 w-5" />
      </KeyCap>
      <KeyCap active={activeKey === 'arrowright'}>
        <ArrowRight className="h-5 w-5" />
      </KeyCap>
    </div>
  )
}
