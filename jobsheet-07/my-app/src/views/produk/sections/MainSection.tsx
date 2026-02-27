import Link from "next/link";
import styles from "../produk.module.scss";

type Props = {
  id?: string | string[];
};

const MainSection = ({ id }: Props) => {
  const products = [
    { id: 1, name: "Produk 1", desc: "Ini adalah produk pertama." },
    { id: 2, name: "Produk 2", desc: "Ini adalah produk kedua." },
    { id: 3, name: "Produk 3", desc: "Ini adalah produk ketiga." },
  ];

  return (
    <section className={styles.main}>
      {id ? (
        // =======================
        // DETAIL MODE
        // =======================
        <>
          <h2 className={styles.sectionTitle}>Produk {id}</h2>

          <div className={styles.card}>
            <p className={styles.cardDesc}>
              Ini adalah detail untuk produk dengan ID {id}.
            </p>

            <Link href="/produk" className={styles.link}>
              ← Kembali ke Daftar Produk
            </Link>
          </div>
        </>
      ) : (
        // =======================
        // LIST MODE
        // =======================
        <>
          <h2 className={styles.sectionTitle}>Daftar Produk</h2>

          {products.map((product) => (
            <div key={product.id} className={styles.card}>
              <h3 className={styles.cardTitle}>{product.name}</h3>
              <p className={styles.cardDesc}>{product.desc}</p>

              <Link
                href={`/produk/${product.id}`}
                className={styles.link}
              >
                Lihat Detail →
              </Link>
            </div>
          ))}
        </>
      )}
    </section>
  );
};

export default MainSection;