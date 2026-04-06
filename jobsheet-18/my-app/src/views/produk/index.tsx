import styles from "../../pages/produk/product.module.scss"
import Link from "next/link"
import Image from "next/image"

type ProductType = {
  id: string
  name: string
  price: number
  size: string
  category: string
  image: string
}

const formatPrice = (price: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price)

const TampilanProduk = ({ products }: { products: ProductType[] }) => {
  return (
    <main className={styles.produk}>
      <h1 className={styles.produk__title}>Daftar Produk Sepatu Terbaru</h1>

      <div className={styles.produk__content}>
        {products.length > 0 ? (
          products.map((product: ProductType, index: number) => (
            <Link 
              href={`/produk/${product.id}`} 
              key={product.id}
              className={styles.produk__content__item}
              aria-label={`Lihat detail ${product.name} kategori ${product.category}`}
            >
              <div className={styles.produk__content__item__image}>
                <Image
                  src={product.image}
                  alt={`Sepatu ${product.name}`} 
                  width={300} 
                  height={300} 
                  className={styles.product__image}
                  // Optimasi LCP: Hanya berikan priority pada 2 produk teratas
                  priority={index < 2} 
                />
              </div>

              <h2 className={styles.produk__content__item__name}>
                {product.name}
              </h2>

              <p className={styles.produk__content__item__category}>
                {product.category}
              </p>

              <p className={styles.produk__content__item__size}>
                <strong>Size:</strong> {product.size}
              </p>

              <p className={styles.produk__content__item__price}>
                {formatPrice(product.price)}
              </p>
            </Link>
          ))
        ) : (
          /* Skeleton loader dengan aria-hidden agar tidak dibaca screen reader */
          <div className={styles.produk__content__skeleton} aria-hidden="true">
            <div className={styles.produk__content__skeleton__image}></div>
            <div className={styles.produk__content__skeleton__name}></div>
            <div className={styles.produk__content__skeleton__category}></div>
            <div className={styles.produk__content__skeleton__price}></div>
          </div>
        )}
      </div>
    </main>
  )
}

export default TampilanProduk