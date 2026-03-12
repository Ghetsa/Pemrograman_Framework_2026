import DetailProduk from "../../../views/DetailProduct";
import { ProductType } from "../../../types/Product.type";

const HalamanDetailProdukSSG = ({ product }: { product: ProductType | null }) => {
  return (
    <div>
      <DetailProduk product={product} />
    </div>
  );
};

export default HalamanDetailProdukSSG;

export async function getStaticPaths() {
  const res = await fetch("http://localhost:3000/api/produk");
  const response = await res.json();

  const paths = response.data.map((product: ProductType) => ({
    params: { produk: product.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: { produk: string };
}) {
  const res = await fetch(`http://localhost:3000/api/produk/${params.produk}`);
  const response = await res.json();

  return {
    props: {
      product: response.data ?? null,
    },
  };
}