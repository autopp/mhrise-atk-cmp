import { GetStaticProps } from "next"
import Head from "next/head"
import { FC } from "react"
import Layout, { siteTitle } from "@/components/layout"
import utilStyles from "@/styles/utils.module.css"

const Home: FC = () => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  )
}

// export const getStaticProps: GetStaticProps = async () => {
//   return {
//     props: {},
//   }
// }

export default Home
