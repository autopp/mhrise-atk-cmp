import { FC } from "react"
import InputRow from "./input-row"
import NumberInput from "./number-input"

type Props = {
  label: string
  min: number
  max: number
  step: number
  synced: boolean
  setSync: (s: boolean) => void
  left: [number, (n: number) => void]
  right: [number, (n: number) => void]
}

const NumberInputRow: FC<Props> = ({ label, min, max, step, synced, setSync, left, right }: Props) => {
  const leftElem = <NumberInput {...{ label, min, max, step, state: left }} />
  const rightElem = <NumberInput {...{ label, min, max, step, state: right }} />
  return <InputRow label={label} synced={synced} setSync={setSync} left={leftElem} right={rightElem} />
}

export default NumberInputRow
