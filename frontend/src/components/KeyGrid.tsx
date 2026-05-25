import { KeyCap } from './KeyCap'

type Props = {
  activeKey: string | null
}

export function KeyGrid({ activeKey }: Props) {
  return (
    <div className="grid grid-cols-3 gap-1.5">
      <div />
      <KeyCap label="W" active={activeKey === 'w'} />
      <div />
      <KeyCap label="A" active={activeKey === 'a'} />
      <KeyCap label="S" active={activeKey === 's'} />
      <KeyCap label="D" active={activeKey === 'd'} />
    </div>
  )
}
