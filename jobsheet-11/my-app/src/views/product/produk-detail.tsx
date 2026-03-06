import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../pages/produk/produk.module.scss";

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
};

const ProdukDetailView = () => {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const getDetailProduct = async () => {
      try {
        const res = await fetch(`/api/produk/${id}`);
        const response = await res.json();
        setProduct(response.data);
      } catch (error) {
        console.error("Gagal mengambil detail produk:", error);
      } finally {
        setLoading(false);
      }
    };

    getDetailProduct();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.produk}>
        <h1 className={styles.produk__title}>Detail Produk</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={styles.produk}>
        <h1 className={styles.produk__title}>Detail Produk</h1>
        <p>Produk tidak ditemukan.</p>
      </div>
    );
  }

  return (
    <div className={styles.produk}>
      <h1 className={styles.produk__title}>Detail Produk</h1>

      <div className={styles.produk__content}>
        <div className={styles.produk__content__item}>
          <div className={styles.produk__content__item__image}>
            <img src={product.image} alt={product.name} width={250} />
          </div>

          <h2 className={styles.produk__content__item__name}>
            {product.name}
          </h2>

          <p className={styles.produk__content__item__category}>
            {product.category}
          </p>

          <p className={styles.produk__content__item__price}>
            Rp {product.price.toLocaleString("id-ID")}
          </p>

          <p>
            {product.description || "Tidak ada deskripsi produk."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProdukDetailView;