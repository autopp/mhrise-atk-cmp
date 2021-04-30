import Head from "next/head"
import { FC, useState } from "react"
import Layout, { siteTitle } from "@/components/layout"
import HeadingRow from "@/components/heading-row"
import NumberInputRow from "@/components/number-input-row"
import { createPairingState } from "@/lib/sync"
import ResultRow from "@/components/result-row"
import { sharpnesses, Status } from "@/lib/status"
import CheckboxInputRow from "@/components/checkbox-input-row"

const Home: FC = () => {
  const weaponAttack = createPairingState(useState(180), useState(180), useState<boolean>(false))
  const weaponCritical = createPairingState(useState(0), useState(0), useState<boolean>(false))
  const itemTalonAndCharm = createPairingState(useState(true), useState(true), useState<boolean>(false))
  const [leftStatus, rightStatus]: Status[] = (["leftState", "rightState"] as const).map((pos) => ({
    weapon: {
      attack: weaponAttack[pos][0],
      critical: weaponCritical[pos][0],
      sharpness: sharpnesses["yellow"],
    },
    item: {
      talonAndCharm: itemTalonAndCharm[pos][0],
    },
  }))

  const syncedSetters = [weaponAttack, weaponCritical].map(({ syncedState: [, setSynced] }) => setSynced)

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
        <HeadingRow text="アイテム" />
        <CheckboxInputRow label="爪・護符" {...itemTalonAndCharm} />
        <ResultRow left={leftStatus} right={rightStatus} syncedSetters={syncedSetters} />
      </div>
    </Layout>
  )
}

export default Home
