import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <head>
        <title>Praktikum Next.js Pages Router</title>
        </head>
      <h1>
        Praktikum Next.js Pages Router
      </h1> <br />
      <p>Mahasiswa D4 TI Pengembangan Web dengan Framework. <br /></p>
      <p>This is me learning NEXT.js</p>

    </div>
  )
}
