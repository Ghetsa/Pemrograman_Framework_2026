import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>IT'S ABOUT ME</h1>
        <br />
        <img
          src="/profil.png"
          alt=""
          width={180}
          className={styles.image}
        />
        <br />
        <ul>
          <li>My name: <strong>Ghetsa Ramadhani Riska Arryanti</strong></li>
          <li>My NIM: <strong>2341720004</strong></li>
          <li>My Departement/PRODI: <strong>D4-TI</strong></li>
        </ul>

      </div>
    </div>
  )
}

