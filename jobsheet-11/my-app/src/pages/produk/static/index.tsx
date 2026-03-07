import TampilProduk from "../../../views/product";
import { ProductType } from "../../../types/Product.type";

const HalamanProdukStatic = (props: { products: ProductType[] }) => {
  const { products } = props;

  return (
    <div>
      <h1>Halaman Produk Static</h1>
      <TampilProduk products={products} basePath="/produk/static" />
    </div>
  );
};

export default HalamanProdukStatic;

export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:3000/api/produk");
  const response = await res.json();

  return {
    props: {
      products: response.data,
    },
  };
}