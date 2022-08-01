import { PairingState } from "@/lib/pairing"
import { Status, calculateTotal } from "@/lib/status"
import { FC } from "react"
import { inputColClass, labelColClass, syncColClass } from "./input-row"
import Result from "./result"
import SyncAllButton from "./sync-all-button"
import SwapAllButton from "./swap-all-button"

type Props = {
  left: Status
  right: Status
  states: PairingState<unknown>[]
}

const ResultRow: FC<Props> = ({ left, right, states }: Props) => {
  const syncedSetters = states.map(({ syncedState: [, setSynced] }) => setSynced)
  return (
    <div className="row">
      <div className={labelColClass}>
        <p>計算結果</p>
      </div>
      <div className={inputColClass}>
        <Result total={calculateTotal(left)} />
      </div>
      <div className={syncColClass}>
        <div className="mb-2">
          <SyncAllButton setters={syncedSetters} />
        </div>

        <div>
          <SwapAllButton states={states} />
        </div>
      </div>
      <div className={inputColClass}>
        <Result total={calculateTotal(right)} />
      </div>
    </div>
  )
}

export default ResultRow
