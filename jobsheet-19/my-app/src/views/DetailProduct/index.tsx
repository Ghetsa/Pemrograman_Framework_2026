// jobsheet-19/my-app/src/views/DetailProduct/index.tsx

// import { ProductType } from "@/types/Product.type"
import { ProductType } from "../../types/Product.type"
import styles from "../DetailProduct/detailProduct.module.scss"

const DetailProduk = ({ products }: { products: ProductType }) => {
    return (
        <>
            <h1 data-testid="title" className={styles.title}>Detail Produk</h1>
            <div className={styles.produkdetail}>
                <div className={styles.produkdetail__image}>
                    {/* <img src={products.image} alt={products.name} /> */}
                    <img
                        data-testid="product-image"
                        src={products.image && products.image}
                        alt={products.name}
                    />            </div>

                <div className={styles.produkdetail__info}>
                    <h1 data-testid="product-name">{products.name}</h1>
                    <p data-testid="product-category">{products.category}</p>
                    <p data-testid="product-price">
                        Rp {products.price && products.price.toLocaleString("id-ID")}
                    </p>
                </div>
            </div>
        </>
    )
}

export default DetailProduk