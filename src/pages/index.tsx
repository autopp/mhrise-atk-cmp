import Head from "next/head"
import { FC } from "react"
import Layout, { siteTitle } from "@/components/layout"

const Home: FC = () => {
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
      </div>
    </Layout>
  )
}

export default Home
