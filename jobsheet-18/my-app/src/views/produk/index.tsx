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
    <div className={styles.produk}>
      <h1 className={styles.produk__title}>Daftar Produk</h1>

      <div className={styles.produk__content}>
        {products.length > 0 ? (
          products.map((product: ProductType) => (
            <Link href={`/produk/${product.id}`} key={product.id}>
              <div className={styles.produk__content__item__image}>

                <Image
                  src={product.image}
                  alt={product.name}
                  width={300} 
                  height={300} 
                  className={styles.product__image}
                />
              </div>

              <h4 className={styles.produk__content__item__name}>
                {product.name}
              </h4>

              <p className={styles.produk__content__item__category}>
                {product.category}
              </p>

              <p className={styles.produk__content__item__size}>
                Size: {product.size}
              </p>

              <p className={styles.produk__content__item__price}>
                {formatPrice(product.price)}
              </p>
            </Link>
          ))
        ) : (
          <div className={styles.produk__content__skeleton}>
            <div className={styles.produk__content__skeleton__image}></div>
            <div className={styles.produk__content__skeleton__name}></div>
            <div className={styles.produk__content__skeleton__category}></div>
            <div className={styles.produk__content__skeleton__price}></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TampilanProduk