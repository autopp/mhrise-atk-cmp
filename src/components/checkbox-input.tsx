import { FC } from "react"
import Image from "next/image"
import { State } from "@/lib/types"

type Props = {
  state: State<boolean>
}

const CheckboxInput: FC<Props> = ({ state: [value, setValue] }: Props) => {
  const src = value ? "/images/checkbox-on.svg" : "/images/checkbox-off.svg"
  return <Image src={src} height={20} width={20} onClick={() => setValue(!value)} />
}

export default CheckboxInput
