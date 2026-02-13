import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div><br />
      <h1>
        Praktikum <Image className={styles.logo} src="/next.svg" alt="Next.js Logo"
          width={180} height={37} priority /> Pages Router
      </h1> <br />
      <p>Mahasiswa D4 TI Pengembangan Web dengan Framework. <br /></p>
      <p>This is me learning NEXT.js</p>
      <Link href="/about" className={styles.button}>
        Go to About
      </Link>
    </div>
  )
}
