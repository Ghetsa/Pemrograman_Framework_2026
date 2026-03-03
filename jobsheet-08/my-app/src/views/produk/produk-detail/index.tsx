import { useRouter } from "next/router";
import styles from "../produk.module.scss";
import MainSection from "../sections/MainSection";

const ProdukDetailView = () => {
  const { query, isReady } = useRouter();

  if (!isReady) return <div>Loading...</div>;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <h1 className={styles.title}>Halaman Produk</h1>

        {/* Kirim id ke MainSection */}
        <MainSection id={query.id as string} />
      </div>
    </div>
  );
};

export default ProdukDetailView;