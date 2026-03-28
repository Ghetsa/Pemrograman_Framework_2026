import Head from 'next/head'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Praktikum Next.js Pages Router</title>
        <meta name="description" content="Belajar Next.js Pages Router" />
      </Head>

      <main
        className={inter.className}
        style={{
          padding: '40px',
          textAlign: 'center',
          backgroundColor: '#ffffff',
          minHeight: '100vh'
        }}
      >
        <h1
          style={{
            color: '#0070f3',
            fontSize: '36px',
            marginBottom: '20px'
          }}
        >
          <b>Praktikum Next.js Pages Router</b>
        </h1>

        <p style={{ fontSize: '18px', color: '#333' }}>
          Mahasiswa D4 TI Pengembangan Web dengan Framework.
        </p>

        <p style={{ fontSize: '16px', color: '#555' }}>
          This is me learning Next.js
        </p>
      </main>
    </>
  )
}