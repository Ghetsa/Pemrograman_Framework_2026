import styles from "@/styles/404.module.scss"
import Link from "next/dist/client/link"

const Customer404 = () => {
  return (
    <div className={styles.error}>
      <head>
        <title>404 - Halaman Tidak Ditemukan</title>
      </head>
       <div className={styles.error}>
        <img
          src="/page-not-found.png"
          alt="Halaman tidak ditemukan"
          className={styles.error_image}
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