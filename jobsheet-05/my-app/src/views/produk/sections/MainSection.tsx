import Link from "next/link";
import styles from "../produk.module.scss";

type Props = {
  id?: string | string[];
};

const MainSection = ({ id }: Props) => {
  return (
    <section className={styles.main}>
      <h2 className={styles.sectionTitle}>Produk {id}</h2>

      {id ? (
        <div className={styles.card}>
          {/* <h3 className={styles.cardTitle}>Produk ID: {id}</h3> */}
          <p className={styles.cardDesc}>
            Ini adalah detail untuk produk dengan ID {id}.
          </p>

          <Link href="/produk" className={styles.link}>
            ← Kembali ke Daftar Produk
          </Link>
        </div>
      ) : (
        <div className={styles.card}>
          <p>Produk tidak ditemukan.</p>       
         </div>
      )}
    </section>
  );
};

export default MainSection;