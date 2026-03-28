import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function About() {
  return (
    <main className={inter.className}>
      <h1>About Ghetsa Ramadhani</h1> <br />
      <p>Nama Mahasiswa: Ghetsa Ramadhani Riska Arryanti</p>
      <p>Absen: 10</p>
      <p>Kelas: TI-3D</p>
      <p>Program Studi: D-IV Teknik Informatika</p>
    </main>
  )
}