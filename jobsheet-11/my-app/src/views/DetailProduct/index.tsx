import { ProductType } from "../../types/Product.type";
import styles from "../DetailProduct/detailProduct.module.scss";

const DetailProduk = ({ products }: { products: ProductType }) => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Detail Produk</h1>

      <div className={styles.produkdetail}>
        <div className={styles.produkdetail_image}>
          <img src={products.image && products.image} alt={products.name} />
        </div>

        <div className={styles.produkdetail_info}>
          <h2 className={styles.produkdetail_name}>{products.name}</h2>
          <p className={styles.produkdetail_category}>{products.category}</p>
          <p className={styles.produkdetail_price}>
            Rp {products.price && products.price.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailProduk;