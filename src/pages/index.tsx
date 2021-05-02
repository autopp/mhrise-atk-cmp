import Head from "next/head"
import { FC } from "react"
import Layout, { siteTitle } from "@/components/layout"
import HeadingRow from "@/components/heading-row"
import NumberInputRow from "@/components/number-input-row"
import ResultRow from "@/components/result-row"
import {
  DEMONDRUGS,
  getTalonAndCharm,
  getMightSeed,
  getDemonPowder,
  getDangoBooster,
  SHARPNESSES,
  Status,
  getDangoTemper,
  RAMPAGE_ATTACK_BOOSTS,
  RAMPAGE_AFFINITY_BOOSTS,
} from "@/lib/status"
import CheckboxInputRow from "@/components/checkbox-input-row"
import { usePairingState } from "@/lib/pairing"
import RadioInputRow from "@/components/radio-input-row"
import LevelInputRow from "@/components/level-input-row"

const Home: FC = () => {
  // Weapon
  const weaponAttack = usePairingState(180)
  const weaponAffinity = usePairingState(0)
  const weaponSharpness = usePairingState(SHARPNESSES.length - 1)
  // Item
  const itemTalonAndCharm = usePairingState(true)
  const itemDemondrug = usePairingState(0)
  const itemMightSeed = usePairingState(false)
  const itemDemonPowder = usePairingState(false)
  // Dango
  const dangoBooster = usePairingState(false)
  const dangoTemper = usePairingState(false)
  // Rampage
  const rampageAttackBoost = usePairingState(0)
  const rampageAffinityBoost = usePairingState(0)
  const [leftStatus, rightStatus]: Status[] = (["leftState", "rightState"] as const).map((pos) => ({
    weapon: {
      attack: weaponAttack[pos][0],
      affinity: weaponAffinity[pos][0],
      sharpness: SHARPNESSES[weaponSharpness[pos][0]],
    },
    item: {
      talonAndCharm: getTalonAndCharm(itemTalonAndCharm[pos][0]),
      demonDrug: DEMONDRUGS[itemDemondrug[pos][0]],
      mightSeed: getMightSeed(itemMightSeed[pos][0]),
      demonPowder: getDemonPowder(itemDemonPowder[pos][0]),
    },
    dango: {
      booster: getDangoBooster(dangoBooster[pos][0]),
      temper: getDangoTemper(dangoTemper[pos][0]),
    },
    rampage: {
      attackBoost: RAMPAGE_ATTACK_BOOSTS[rampageAttackBoost[pos][0]],
      affinityBoost: RAMPAGE_AFFINITY_BOOSTS[rampageAffinityBoost[pos][0]],
    },
  }))

  const syncedSetters = [
    weaponAttack,
    weaponAffinity,
    weaponSharpness,
    itemTalonAndCharm,
    itemDemondrug,
    itemMightSeed,
    itemDemonPowder,
    dangoBooster,
    dangoTemper,
    rampageAttackBoost,
    rampageAffinityBoost,
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
        <NumberInputRow label="武器会心率" min={-100} max={100} step={5} {...weaponAffinity} />
        <RadioInputRow label="斬れ味" idPrefix="weaponSharpness" options={SHARPNESSES} {...weaponSharpness} />
        <HeadingRow text="アイテム" />
        <CheckboxInputRow label="爪・護符" {...itemTalonAndCharm} />
        <RadioInputRow label="鬼人薬" idPrefix="itemDemondrug" options={DEMONDRUGS} {...itemDemondrug} />
        <CheckboxInputRow label="怪力の種" {...itemMightSeed} />
        <CheckboxInputRow label="鬼人の粉塵" {...itemDemonPowder} />
        <HeadingRow text="おだんごスキル" />
        <CheckboxInputRow label="おだんご短期催眠術" {...dangoBooster} />
        <CheckboxInputRow label="おだんご暴れ撃ち" {...dangoTemper} />
        <HeadingRow text="百竜スキル" />
        <LevelInputRow label="攻撃力強化" levels={RAMPAGE_ATTACK_BOOSTS} {...rampageAttackBoost} />
        <LevelInputRow label="会心率強化" levels={RAMPAGE_AFFINITY_BOOSTS} {...rampageAffinityBoost} />
        <ResultRow left={leftStatus} right={rightStatus} syncedSetters={syncedSetters} />
      </div>
    </Layout>
  )
}

export default Home
