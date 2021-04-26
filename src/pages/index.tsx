import Head from "next/head"
import { FC, useState } from "react"
import Layout, { siteTitle } from "@/components/layout"
import HeadingRow from "@/components/heading-row"
import NumberInputRow from "@/components/number-input-row"

const Home: FC = () => {
  const leftWeaponAttack = useState(180)
  const rightWeaponAttack = useState(180)
  const weaponAttackSynced = useState(false)
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
        <NumberInputRow
          label="武器攻撃力"
          min={0}
          max={300}
          step={10}
          syncedState={weaponAttackSynced}
          left={leftWeaponAttack}
          right={rightWeaponAttack}
        />
      </div>
    </Layout>
  )
}

export default Home
