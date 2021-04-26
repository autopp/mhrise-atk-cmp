import { State } from "@/lib/types"
import { FC } from "react"

type Props = {
  state: State<boolean>
}

const SyncButton: FC<Props> = ({ state: [synced, setSynced] }: Props) => {
  const [style, text] = synced ? ["btn-info", "Synced"] : ["btn-secondary", "Unsynced"]
  const className = `btn ${style} btn-sm`
  return (
    <button type="button" className={className} onClick={() => setSynced(!synced)}>
      {text}
    </button>
  )
}

export default SyncButton
