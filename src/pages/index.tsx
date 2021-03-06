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
  SHARPNESSES,
  BARRELS,
  Status,
  DANGO_TEMPER,
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
  CHAIN_CRIT_GUNNER,
  BLOODLUST,
  BLOODLUST_RESTORED,
  COALESCENCE,
  DERELICTION,
  MAIL_OF_HELLFIRE,
  getRampageKushalaDaoraSoul,
  getRampageSpeciesExploit,
  DANGO_BOOSTER,
} from "@/lib/status"
import CheckboxInputRow from "@/components/checkbox-input-row"
import { usePairingState } from "@/lib/pairing"
import RadioInputRow from "@/components/radio-input-row"
import LevelInputRow from "@/components/level-input-row"
import { State } from "@/lib/types"

const Home: FC = () => {
  // Weapon
  const weaponAttack = usePairingState(320)
  const weaponAffinity = usePairingState(0)
  const weaponSharpness = usePairingState(SHARPNESSES.length - 2)
  const weaponBarrel = usePairingState(0)
  // Item
  const itemTalonAndCharm = usePairingState(true)
  const itemDemondrug = usePairingState(0)
  const itemMightSeed = usePairingState(false)
  const itemDemonPowder = usePairingState(false)
  // Dango
  const dangoBooster = usePairingState(0)
  const dangoTemper = usePairingState(0)
  // Rampage
  const rampageAttackBoost = usePairingState(0)
  const rampageAffinityBoost = usePairingState(0)
  const rampageNonElementalBoost = usePairingState(false)
  const rampageDullingStrike = usePairingState(false)
  const rampageBrutalStrike = usePairingState(false)
  const rampageAttackOrAffinitySurge = usePairingState(0)
  const rampageKushalaDaoraSoul = usePairingState(false)
  const rampageSpeciesExploit = usePairingState(false)
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
  const skillChainCritGunner = usePairingState(0)
  const skillBloodlust = usePairingState(0)
  const skillBloodlustRestored = usePairingState(0)
  const skillCoalescence = usePairingState(0)
  const skillDereliction = usePairingState(0)
  const skillMailOfHellfire = usePairingState(0)
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
        booster: DANGO_BOOSTER[valueOf(dangoBooster)],
        temper: DANGO_TEMPER[valueOf(dangoTemper)],
      },
      rampage: {
        attackBoost: RAMPAGE_ATTACK_BOOSTS[valueOf(rampageAttackBoost)],
        affinityBoost: RAMPAGE_AFFINITY_BOOSTS[valueOf(rampageAffinityBoost)],
        nonElementalBoost: getRampageNonElementalBoost(valueOf(rampageNonElementalBoost)),
        dullingStrike: valueOf(rampageDullingStrike),
        brutalStrike: valueOf(rampageBrutalStrike),
        attackOrAffinitySurge: RAMPAGE_ATTACK_OR_AFFINITY_SURGES[valueOf(rampageAttackOrAffinitySurge)],
        kushalaDaoraSoul: getRampageKushalaDaoraSoul(valueOf(rampageKushalaDaoraSoul)),
        speciesExploit: getRampageSpeciesExploit(valueOf(rampageSpeciesExploit)),
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
        chainCritGunner: CHAIN_CRIT_GUNNER[valueOf(skillChainCritGunner)],
        bloodlust: BLOODLUST[valueOf(skillBloodlust)],
        bloodlustRestored: BLOODLUST_RESTORED[valueOf(skillBloodlustRestored)],
        coalescence: COALESCENCE[valueOf(skillCoalescence)],
        dereliction: DERELICTION[valueOf(skillDereliction)],
        mailOfHellfire: MAIL_OF_HELLFIRE[valueOf(skillMailOfHellfire)],
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
    rampageKushalaDaoraSoul,
    rampageSpeciesExploit,
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
    skillChainCritGunner,
    skillBloodlust,
    skillBloodlustRestored,
    skillCoalescence,
    skillDereliction,
    skillMailOfHellfire,
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
        <HeadingRow text="??????" />
        <NumberInputRow label="???????????????" min={0} max={400} step={10} {...weaponAttack} />
        <NumberInputRow label="???????????????" min={-100} max={100} step={5} {...weaponAffinity} />
        <RadioInputRow label="?????????" idPrefix="weaponSharpness" options={SHARPNESSES} {...weaponSharpness} />
        <RadioInputRow label="?????????/??????????????????" idPrefix="weaponBarrel" options={BARRELS} {...weaponBarrel} />
        <HeadingRow text="????????????" />
        <CheckboxInputRow label="????????????" {...itemTalonAndCharm} />
        <RadioInputRow label="?????????" idPrefix="itemDemondrug" options={DEMONDRUGS} {...itemDemondrug} />
        <CheckboxInputRow label="????????????" {...itemMightSeed} />
        <CheckboxInputRow label="???????????????" {...itemDemonPowder} />
        <HeadingRow text="?????????????????????" />
        <LevelInputRow label="???????????????????????????" levels={DANGO_BOOSTER} {...dangoBooster} />
        <LevelInputRow label="????????????????????????" levels={DANGO_TEMPER} {...dangoTemper} />
        <HeadingRow text="???????????????" />
        <LevelInputRow label="???????????????" levels={RAMPAGE_ATTACK_BOOSTS} {...rampageAttackBoost} />
        <LevelInputRow label="???????????????" levels={RAMPAGE_AFFINITY_BOOSTS} {...rampageAffinityBoost} />
        <CheckboxInputRow label="???????????????" {...rampageNonElementalBoost} />
        <CheckboxInputRow label="???????????????" {...rampageDullingStrike} />
        <CheckboxInputRow label="???????????????" {...rampageBrutalStrike} />
        <RadioInputRow
          label="?????????????????????????????????"
          idPrefix="rampageAttackOrAffinitySurge"
          options={RAMPAGE_ATTACK_OR_AFFINITY_SURGES}
          {...rampageAttackOrAffinitySurge}
        />
        <CheckboxInputRow label="????????????" {...rampageKushalaDaoraSoul} />
        <CheckboxInputRow label="???????????????" {...rampageSpeciesExploit} />
        <HeadingRow text="?????????" />
        <LevelInputRow label="??????" levels={ATTACK_BOOSTS} {...skillAttackBoost} />
        <LevelInputRow label="?????????" levels={CRITICAL_EYES} {...skillCriticalEye} />
        <LevelInputRow label="????????????" levels={WEAKNESS_EXPLOITS} {...skillWeaknessExploit} />
        <LevelInputRow label="??????" levels={MAXIMUM_MIGHTS} {...skillMaximumMight} />
        <LevelInputRow label="??????????????????" levels={CRITICAL_DRAWS} {...skillCriticalDraw} />
        <LevelInputRow label="?????????" levels={CRITICAL_BOOSTS} {...skillCriticalBoost} />
        <LevelInputRow label="???????????????" levels={OFFENSIVE_GUARDS} {...skillOffensiveGuard} />
        <LevelInputRow label="??????????????????" levels={PEAK_PERFORMANCES} {...skillPeakPerformace} />
        <LevelInputRow label="????????????" levels={LATENT_POWERS} {...skillLatentPower} />
        <LevelInputRow label="?????????" levels={AGITATORS} {...skillAgitator} />
        <LevelInputRow label="????????????" levels={RESUSCITATE} {...skillResuscitate} />
        <LevelInputRow label="?????????" levels={RESENTMENT} {...skillResentment} />
        <LevelInputRow label="????????????" levels={DRAGONHEART} {...skillDragonheart} />
        <LevelInputRow label="??????" levels={CHAIN_CRIT} {...skillChainCrit} />
        <LevelInputRow label="????????????????????????" levels={CHAIN_CRIT_GUNNER} {...skillChainCritGunner} />
        <LevelInputRow label="??????????????????" levels={BLOODLUST} {...skillBloodlust} />
        <LevelInputRow label="??????????????????????????????" levels={BLOODLUST_RESTORED} {...skillBloodlustRestored} />
        <LevelInputRow label="????????????" levels={COALESCENCE} {...skillCoalescence} />
        <LevelInputRow label="????????????" levels={DERELICTION} {...skillDereliction} />
        <LevelInputRow label="??????????????????" levels={MAIL_OF_HELLFIRE} {...skillMailOfHellfire} />
        <LevelInputRow label="????????????" levels={BLUDGEONERS} {...skillBludgeoner} />
        <LevelInputRow label="??????" levels={ARTILLERIES} {...skillArtillery} />
        <LevelInputRow label="????????????" levels={RAPID_MORPHS} {...skillRapidMorph} />
        <LevelInputRow label="???????????????" levels={AMMO_AND_ARROW_UPS} {...skillAmmoAndArrowUp} />
        <LevelInputRow label="????????????" levels={RAPID_FIRE_UPS} {...skillRapidFireUp} />
        <ResultRow left={leftStatus} right={rightStatus} syncedSetters={syncedSetters} />
      </div>
    </Layout>
  )
}

export default Home
