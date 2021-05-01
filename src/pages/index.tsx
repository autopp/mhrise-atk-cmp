import Head from "next/head"
import { FC } from "react"
import Layout, { siteTitle } from "@/components/layout"
import HeadingRow from "@/components/heading-row"
import NumberInputRow from "@/components/number-input-row"
import ResultRow from "@/components/result-row"
import { DEMONDRUGS, SHARPNESSES, Status } from "@/lib/status"
import CheckboxInputRow from "@/components/checkbox-input-row"
import { usePairingState } from "@/lib/pairing"
import RadioInputRow from "@/components/radio-input-row"

const Home: FC = () => {
  const weaponAttack = usePairingState(180)
  const weaponCritical = usePairingState(0)
  const weaponSharpness = usePairingState(SHARPNESSES.length - 1)
  const itemTalonAndCharm = usePairingState(true)
  const itemDemondrug = usePairingState(0)
  const itemMightSeed = usePairingState(false)
  const itemDemonPowder = usePairingState(false)
  const dangoBooster = usePairingState(false)
  const dangoTemper = usePairingState(false)
  const [leftStatus, rightStatus]: Status[] = (["leftState", "rightState"] as const).map((pos) => ({
    weapon: {
      attack: weaponAttack[pos][0],
      critical: weaponCritical[pos][0],
      sharpness: SHARPNESSES[weaponSharpness[pos][0]],
    },
    item: {
      talonAndCharm: itemTalonAndCharm[pos][0],
      demonDrug: DEMONDRUGS[itemDemondrug[pos][0]],
      mightSeed: itemMightSeed[pos][0],
      demonPowder: itemDemonPowder[pos][0],
    },
    dango: {
      booster: dangoBooster[pos][0],
      temper: dangoTemper[pos][0],
    },
  }))

  const syncedSetters = [
    weaponAttack,
    weaponCritical,
    weaponSharpness,
    itemTalonAndCharm,
    itemDemondrug,
    itemMightSeed,
    itemDemonPowder,
    dangoBooster,
    dangoTemper,
  ].map(({ syncedState: [, setSynced] }) => setSynced)

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className="container">
        <div className="row">
          <div className="col-xxl-6">
            <h1>{siteTitle}</h1>
          </div>
        </div>
        <HeadingRow text="武器" />
        <NumberInputRow label="武器攻撃力" min={0} max={300} step={10} {...weaponAttack} />
        <NumberInputRow label="武器会心率" min={-100} max={100} step={5} {...weaponCritical} />
        <RadioInputRow label="斬れ味" idPrefix="weaponSharpness" options={SHARPNESSES} {...weaponSharpness} />
        <HeadingRow text="アイテム" />
        <CheckboxInputRow label="爪・護符" {...itemTalonAndCharm} />
        <RadioInputRow label="鬼人薬" idPrefix="itemDemondrug" options={DEMONDRUGS} {...itemDemondrug} />
        <CheckboxInputRow label="怪力の種" {...itemMightSeed} />
        <CheckboxInputRow label="鬼人の粉塵" {...itemDemonPowder} />
        <HeadingRow text="おだんごスキル" />
        <CheckboxInputRow label="おだんご短期催眠術" {...dangoBooster} />
        <CheckboxInputRow label="おだんご暴れ撃ち" {...dangoTemper} />
        <ResultRow left={leftStatus} right={rightStatus} syncedSetters={syncedSetters} />
      </div>
    </Layout>
  )
}

export default Home
