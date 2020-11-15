import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { getAllProductsWithSlug } from "../lib/api"

export default function Home({ allPosts }) {
  console.log(allPosts)
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          learning <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <p>fumihogoをNext.jsで作ってみる
        </p>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}


export async function getStaticProps() {
  const allPosts = (await getAllProductsWithSlug()) ?? []
  return {
    props: { allPosts },
  }
}