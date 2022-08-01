import { PairingState } from "@/lib/pairing"
import { FC } from "react"

type Props = {
  states: PairingState<unknown>[]
}

const SwapAllButton: FC<Props> = ({ states }: Props) => {
  const onClick = () => {
    states.forEach(({ swap }) => swap())
  }
  return (
    <button type="button" className="btn btn-success btn-sm" onClick={onClick}>
      Swap all
    </button>
  )
}

export default SwapAllButton
