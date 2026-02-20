import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>PERTANYAAN REFLEKSI</h1>
        <br />
        <img
          src="/refleksi.png"
          alt=""
          width={220}
          className={styles.image}
        />
        <br />
        <ol>
          <li><strong>
            Mengapa Pages Router disebut sebagai routing berbasis file?
          </strong><p>
              Jawaban: Karena Next.js menggunakan struktur file di dalam folder
              <strong>pages</strong> untuk menentukan URL secara otomatis.
              Jadi setiap file yang dibuat di folder tersebut langsung menjadi route.
              Misalnya <code>about.js</code> otomatis bisa diakses lewat <code>/about</code>.
              Tidak perlu konfigurasi routing manual seperti di React biasa.
            </p>
          </li>

          <li><strong>
            Apa perbedaan Next.js dengan React standar (CRA)?
          </strong><p>
              Jawaban: Next.js memiliki fitur bawaan seperti routing otomatis,
              Server-Side Rendering (SSR), Static Site Generation (SSG),
              dan optimasi gambar. Sedangkan React standar (Create React App)
              hanya menyediakan dasar React tanpa fitur tambahan tersebut,
              sehingga routing dan konfigurasi lainnya harus diatur manual.
            </p>
          </li>

          <li><strong>
            Apa fungsi perintah npm run dev?
          </strong><p>
              Jawaban: Perintah <code>npm run dev</code> digunakan untuk menjalankan
              aplikasi dalam mode development. Mode ini memungkinkan developer
              melihat perubahan secara langsung (hot reload) saat melakukan editing kode.
            </p>
          </li>

          <li><strong>
            Apa perbedaan npm run dev dan npm run build?
          </strong><p>
              Jawaban: <code>npm run dev</code> digunakan saat proses pengembangan
              (development) dengan fitur hot reload dan debugging.
              Sedangkan <code>npm run build</code> digunakan untuk membuat versi
              produksi (production build) yang sudah dioptimasi dan siap untuk deployment.
            </p>
          </li>
        </ol>


      </div>
    </div>
  )
}

