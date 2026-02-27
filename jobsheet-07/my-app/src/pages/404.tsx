import styles from "@/styles/404.module.scss";
import Link from "next/link";


const Custom404 = () => {
  return (
    <div className={styles.error}>
      <div className={styles.container}>
        <img
          src="./not-found.svg"
          alt="404"
          className={styles.error__image}
        />
        <h1 className={styles.title}>404 - Halaman Tidak Ditemukan</h1>
        <p className={styles.deskripsi}>Maaf, halaman yang Anda cari tidak ada.</p>
        <Link href="/"  className={styles.link}>
          <button>Kembali ke Home</button>
        </Link>
        </div>
    </div>
  );
};
export default Custom404;