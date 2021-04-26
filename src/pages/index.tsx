import Head from "next/head"
import { FC, useState } from "react"
import Layout, { siteTitle } from "@/components/layout"
import HeadingRow from "@/components/heading-row"
import NumberInputRow from "@/components/number-input-row"
import { createPairingState } from "@/lib/sync"

const Home: FC = () => {
  const initialWeaponAttack = 180
  const weaponAttack = createPairingState(
    useState(initialWeaponAttack),
    useState(initialWeaponAttack),
    useState<boolean>(false)
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
      </div>
    </Layout>
  )
}

export default Home
