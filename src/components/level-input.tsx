import { State } from "@/lib/types"
import Image from "next/image"
import { FC } from "react"
import styles from "./level-input.module.css"

type Props = {
  levels: { text: string }[]
  state: State<number>
}

const LevelInput: FC<Props> = ({ levels, state: [level, setLevel] }: Props) => {
  const text = levels[level].text
  return (
    <>
      <div className="text-nowrap">
        <span className={styles.image}>
          <Image
            className={styles.image}
            src="/images/disable.svg"
            height={25}
            width={25}
            onClick={() => setLevel(0)}
          />
        </span>
        {levels.slice(1).map((_, i) => {
          const src = i < level ? "/images/skill-on.svg" : "/images/skill-off.svg"
          return (
            <span className={styles.image} key={i}>
              <Image src={src} height={25} width={25} onClick={() => setLevel(i + 1)} />
            </span>
          )
        })}
      </div>
      <div>
        Lv {level}
        {text.length !== 0 ? `: ${text}` : ""}
      </div>
    </>
  )
}

export default LevelInput
