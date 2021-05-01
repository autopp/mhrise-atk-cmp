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
  const [leftStatus, rightStatus]: Status[] = (["leftState", "rightState"] as const).map((pos) => ({
    weapon: {
      attack: weaponAttack[pos][0],
      critical: weaponCritical[pos][0],
      sharpness: SHARPNESSES[weaponSharpness[pos][0]],
    },
    item: {
      talonAndCharm: itemTalonAndCharm[pos][0],
      demonDrug: DEMONDRUGS[itemDemondrug[pos][0]],
    },
  }))

  const syncedSetters = [weaponAttack, weaponCritical, weaponSharpness, itemTalonAndCharm, itemDemondrug].map(
    ({ syncedState: [, setSynced] }) => setSynced
  )

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
        <ResultRow left={leftStatus} right={rightStatus} syncedSetters={syncedSetters} />
      </div>
    </Layout>
  )
}

export default Home
