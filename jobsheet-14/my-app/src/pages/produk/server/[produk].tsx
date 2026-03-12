import DetailProduk from "../../../views/DetailProduct";
import { ProductType } from "../../../types/Product.type";

const HalamanDetailProdukSSR = ({ product }: { product: ProductType | null }) => {
  return (
    <div>
      <DetailProduk product={product} />
    </div>
  );
};

export default HalamanDetailProdukSSR;

export async function getServerSideProps({
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