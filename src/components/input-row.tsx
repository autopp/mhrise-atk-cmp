import { FC, ReactElement } from "react"
import { State } from "@/lib/types"
import SyncButton from "./sync-button"
import styles from "./input-row.module.css"

type Props = {
  label: string
  left: ReactElement
  right: ReactElement
  syncedState: State<boolean>
}

export const labelColClass = "col-lg-2"
export const inputColClass = "col-lg-4 center"
export const syncColClass = "col-lg-2 center"

const InputRow: FC<Props> = ({ label, left, right, syncedState }: Props) => {
  return (
    <div className={`row ${styles.inputRow}`}>
      <div className={labelColClass}>
        <p>{label}</p>
      </div>
      <div className={inputColClass}>{left}</div>
      <div className={syncColClass}>
        <SyncButton state={syncedState} />
      </div>
      <div className={inputColClass}>{right}</div>
    </div>
  )
}

export default InputRow
