import { FC } from "react"

type Props = {
  setters: ((v: boolean) => void)[]
}

const SyncAllButton: FC<Props> = ({ setters }: Props) => {
  const onClick = () => {
    setters.forEach((setSynced) => setSynced(true))
  }
  return (
    <button type="button" className="btn btn-success btn-xs" onClick={onClick}>
      Sync all
    </button>
  )
}

export default SyncAllButton
