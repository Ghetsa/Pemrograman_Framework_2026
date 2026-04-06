import styles from "@/styles/404.module.scss"
import Link from "next/link" // Import Link yang lebih standar
import Head from "next/head" // Gunakan Head dari next/head

const Customer404 = () => {
  return (
    <div className={styles.error}>
      {/* Gunakan komponen Head dari Next.js untuk metadata */}
      <Head>
        <title>404 - Halaman Tidak Ditemukan</title>
      </Head>
      
      <div className={styles.error}>
        {/* Mengganti <Image> dengan <img> standar */}
        <img
          src="/no-results.png"
          alt="404"
          width="400"
          height="200"
          className={styles.error__image}
        />

        <h1 className={styles.title}>404</h1>

        <h2 className={styles.subtitle}>
          Halaman Tidak Ditemukan
        </h2>

        <p className={styles.description}>
          Maaf, halaman yang Anda cari tidak ditemukan atau sudah dipindahkan.
        </p>

        <Link href="/" className={styles.button}>
          Kembali ke Home
        </Link>
      </div>
    </div>
  )
}

export default Customer404