// jobsheet-14/my-app/src/views/DetailProduct/index.tsx

import { ProductType } from "../../types/Product.type";
import styles from "../DetailProduct/detailProduct.module.scss";

const DetailProduk = ({ product }: { product: ProductType | null }) => {
  if (!product) {
    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Detail Produk</h1>
        <p>Produk tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Detail Produk</h1>

      <div className={styles.produkdetail}>
        <div className={styles.produkdetail_image}>
          <img src={product.image} alt={product.name} />
        </div>

        <div className={styles.produkdetail_info}>
          <h2 className={styles.produkdetail_name}>{product.name}</h2>
          <p className={styles.produkdetail_category}>{product.category}</p>
          <p className={styles.produkdetail_price}>
            Rp {product.price.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailProduk;