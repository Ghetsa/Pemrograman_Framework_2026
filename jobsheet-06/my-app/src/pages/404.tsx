import styles from "@/styles/404.module.scss";

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
    </div>
    </div>
  );
};
export default Custom404;