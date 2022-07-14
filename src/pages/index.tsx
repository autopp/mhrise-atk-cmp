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
  BARRELS,
  Status,
  getDangoTemper,
  RAMPAGE_ATTACK_BOOSTS,
  RAMPAGE_AFFINITY_BOOSTS,
  getRampageNonElementalBoost,
  RAMPAGE_ATTACK_OR_AFFINITY_SURGES,
  ATTACK_BOOSTS,
  CRITICAL_EYES,
  WEAKNESS_EXPLOITS,
  MAXIMUM_MIGHTS,
  CRITICAL_DRAWS,
  CRITICAL_BOOSTS,
  OFFENSIVE_GUARDS,
  PEAK_PERFORMANCES,
  LATENT_POWERS,
  AGITATORS,
  BLUDGEONERS,
  ARTILLERIES,
  RAPID_MORPHS,
  AMMO_AND_ARROW_UPS,
  RAPID_FIRE_UPS,
  RESUSCITATE,
  DRAGONHEART,
  RESENTMENT,
  CHAIN_CRIT,
} from "@/lib/status"
import CheckboxInputRow from "@/components/checkbox-input-row"
import { usePairingState } from "@/lib/pairing"
import RadioInputRow from "@/components/radio-input-row"
import LevelInputRow from "@/components/level-input-row"
import { State } from "@/lib/types"

const Home: FC = () => {
  // Weapon
  const weaponAttack = usePairingState(180)
  const weaponAffinity = usePairingState(0)
  const weaponSharpness = usePairingState(SHARPNESSES.length - 1)
  const weaponBarrel = usePairingState(0)
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
  const rampageNonElementalBoost = usePairingState(false)
  const rampageDullingStrike = usePairingState(false)
  const rampageBrutalStrike = usePairingState(false)
  const rampageAttackOrAffinitySurge = usePairingState(0)
  // Skill
  const skillAttackBoost = usePairingState(0)
  const skillCriticalEye = usePairingState(0)
  const skillWeaknessExploit = usePairingState(0)
  const skillMaximumMight = usePairingState(0)
  const skillCriticalDraw = usePairingState(0)
  const skillCriticalBoost = usePairingState(0)
  const skillOffensiveGuard = usePairingState(0)
  const skillPeakPerformace = usePairingState(0)
  const skillLatentPower = usePairingState(0)
  const skillAgitator = usePairingState(0)
  const skillResuscitate = usePairingState(0)
  const skillResentment = usePairingState(0)
  const skillDragonheart = usePairingState(0)
  const skillChainCrit = usePairingState(0)
  const skillBludgeoner = usePairingState(0)
  const skillArtillery = usePairingState(0)
  const skillRapidMorph = usePairingState(0)
  const skillAmmoAndArrowUp = usePairingState(0)
  const skillRapidFireUp = usePairingState(0)

  const [leftStatus, rightStatus]: Status[] = (["leftState", "rightState"] as const).map((pos) => {
    const valueOf = <T,>(states: { leftState: State<T>; rightState: State<T> }) => states[pos][0]
    return {
      weapon: {
        attack: valueOf(weaponAttack),
        affinity: valueOf(weaponAffinity),
        sharpness: SHARPNESSES[valueOf(weaponSharpness)],
        barrel: BARRELS[valueOf(weaponBarrel)],
      },
      item: {
        talonAndCharm: getTalonAndCharm(valueOf(itemTalonAndCharm)),
        demonDrug: DEMONDRUGS[valueOf(itemDemondrug)],
        mightSeed: getMightSeed(valueOf(itemMightSeed)),
        demonPowder: getDemonPowder(valueOf(itemDemonPowder)),
      },
      dango: {
        booster: getDangoBooster(valueOf(dangoBooster)),
        temper: getDangoTemper(valueOf(dangoTemper)),
      },
      rampage: {
        attackBoost: RAMPAGE_ATTACK_BOOSTS[valueOf(rampageAttackBoost)],
        affinityBoost: RAMPAGE_AFFINITY_BOOSTS[valueOf(rampageAffinityBoost)],
        nonElementalBoost: getRampageNonElementalBoost(valueOf(rampageNonElementalBoost)),
        dullingStrike: valueOf(rampageDullingStrike),
        brutalStrike: valueOf(rampageBrutalStrike),
        attackOrAffinitySurge: RAMPAGE_ATTACK_OR_AFFINITY_SURGES[valueOf(rampageAttackOrAffinitySurge)],
      },
      skill: {
        attackBoost: ATTACK_BOOSTS[valueOf(skillAttackBoost)],
        criticalEye: CRITICAL_EYES[valueOf(skillCriticalEye)],
        weaknessExploit: WEAKNESS_EXPLOITS[valueOf(skillWeaknessExploit)],
        maximumMight: MAXIMUM_MIGHTS[valueOf(skillMaximumMight)],
        criticalDraw: CRITICAL_DRAWS[valueOf(skillCriticalDraw)],
        criticalBoost: CRITICAL_BOOSTS[valueOf(skillCriticalBoost)],
        offensiveGuard: OFFENSIVE_GUARDS[valueOf(skillOffensiveGuard)],
        peakPerformance: PEAK_PERFORMANCES[valueOf(skillPeakPerformace)],
        latentPower: LATENT_POWERS[valueOf(skillLatentPower)],
        agitator: AGITATORS[valueOf(skillAgitator)],
        resuscitate: RESUSCITATE[valueOf(skillResuscitate)],
        resentment: RESENTMENT[valueOf(skillResentment)],
        dragonheart: DRAGONHEART[valueOf(skillDragonheart)],
        chainCrit: CHAIN_CRIT[valueOf(skillChainCrit)],
        bludgeoner: BLUDGEONERS[valueOf(skillBludgeoner)],
        artillery: ARTILLERIES[valueOf(skillArtillery)],
        rapidMorph: RAPID_MORPHS[valueOf(skillRapidMorph)],
        ammoAndArrowUp: AMMO_AND_ARROW_UPS[valueOf(skillAmmoAndArrowUp)],
        rapidFireUp: RAPID_FIRE_UPS[valueOf(skillRapidFireUp)],
      },
    }
  })

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
    rampageNonElementalBoost,
    rampageDullingStrike,
    rampageBrutalStrike,
    rampageAttackOrAffinitySurge,
    skillAttackBoost,
    skillCriticalEye,
    skillWeaknessExploit,
    skillMaximumMight,
    skillCriticalDraw,
    skillCriticalBoost,
    skillOffensiveGuard,
    skillPeakPerformace,
    skillLatentPower,
    skillAgitator,
    skillResuscitate,
    skillResentment,
    skillDragonheart,
    skillChainCrit,
    skillBludgeoner,
    skillArtillery,
    skillRapidMorph,
    skillAmmoAndArrowUp,
    skillRapidFireUp,
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
        <RadioInputRow label="ロング/パワーバレル" idPrefix="weaponBarrel" options={BARRELS} {...weaponBarrel} />
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
        <CheckboxInputRow label="無属性強化" {...rampageNonElementalBoost} />
        <CheckboxInputRow label="鈍刃の一撃" {...rampageDullingStrike} />
        <CheckboxInputRow label="痛恨の一撃" {...rampageBrutalStrike} />
        <RadioInputRow
          label="攻撃力激化・会心率激化"
          idPrefix="rampageAttackOrAffinitySurge"
          options={RAMPAGE_ATTACK_OR_AFFINITY_SURGES}
          {...rampageAttackOrAffinitySurge}
        />
        <HeadingRow text="スキル" />
        <LevelInputRow label="攻撃" levels={ATTACK_BOOSTS} {...skillAttackBoost} />
        <LevelInputRow label="見切り" levels={CRITICAL_EYES} {...skillCriticalEye} />
        <LevelInputRow label="弱点特効" levels={WEAKNESS_EXPLOITS} {...skillWeaknessExploit} />
        <LevelInputRow label="渾身" levels={MAXIMUM_MIGHTS} {...skillMaximumMight} />
        <LevelInputRow label="抜刀術【技】" levels={CRITICAL_DRAWS} {...skillCriticalDraw} />
        <LevelInputRow label="超会心" levels={CRITICAL_BOOSTS} {...skillCriticalBoost} />
        <LevelInputRow label="攻めの守勢" levels={OFFENSIVE_GUARDS} {...skillOffensiveGuard} />
        <LevelInputRow label="フルチャージ" levels={PEAK_PERFORMANCES} {...skillPeakPerformace} />
        <LevelInputRow label="力の解放" levels={LATENT_POWERS} {...skillLatentPower} />
        <LevelInputRow label="挑戦者" levels={AGITATORS} {...skillAgitator} />
        <LevelInputRow label="死中に活" levels={RESUSCITATE} {...skillResuscitate} />
        <LevelInputRow label="逆恨み" levels={RESENTMENT} {...skillResentment} />
        <LevelInputRow label="龍気活性" levels={DRAGONHEART} {...skillDragonheart} />
        <LevelInputRow label="連撃" levels={CHAIN_CRIT} {...skillChainCrit} />
        <LevelInputRow label="鈍器使い" levels={BLUDGEONERS} {...skillBludgeoner} />
        <LevelInputRow label="砲術" levels={ARTILLERIES} {...skillArtillery} />
        <LevelInputRow label="高速変形" levels={RAPID_MORPHS} {...skillRapidMorph} />
        <LevelInputRow label="弾・矢強化" levels={AMMO_AND_ARROW_UPS} {...skillAmmoAndArrowUp} />
        <LevelInputRow label="速射強化" levels={RAPID_FIRE_UPS} {...skillRapidFireUp} />
        <ResultRow left={leftStatus} right={rightStatus} syncedSetters={syncedSetters} />
      </div>
    </Layout>
  )
}

export default Home
