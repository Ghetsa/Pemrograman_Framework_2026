import TampilProduk from "../../../views/product";
import { ProductType } from "../../../types/Product.type";

type HalamanProdukServerProps = {
  products: ProductType[];
};

const HalamanProdukServer = ({ products }: HalamanProdukServerProps) => {
  return (
    <div>
      <h1>Halaman Produk Server</h1>
      <TampilProduk products={products} basePath="/produk/server" />
    </div>
  );
};

export default HalamanProdukServer;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/produk");
  const response = await res.json();

  return {
    props: {
      products: response.data || [],
    },
  };
}