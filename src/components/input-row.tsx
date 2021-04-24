import { FC, ReactElement } from "react"

type Props = {
  label: string
  left: ReactElement
  right: ReactElement
  synced: boolean
  setSync: (synced: boolean) => void
}

export const labelColClass = "col-lg-2"
export const inputColClass = "col-lg-4 center"
export const syncColClass = "col-lg-2 center"

const InputRow: FC<Props> = ({ label, left, right }: Props) => {
  return (
    <div className="row inputRow">
      <div className={labelColClass}>
        <p>{label}</p>
      </div>
      <div className={inputColClass}>{left}</div>
      <div className={syncColClass}></div>
      <div className={inputColClass}>{right}</div>
    </div>
  )
}

export default InputRow
