import fetcher from "@/utils/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";
import DetailProduk from "../../views/DetailProduct";
import { ProductType } from "../../types/Product.type";

const HalamanDetailProdukCSR = () => {
  const { query } = useRouter();
  const produk = Array.isArray(query.produk) ? query.produk[0] : query.produk;

  const { data, error, isLoading } = useSWR(
    produk ? `/api/produk/${produk}` : null,
    fetcher
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Gagal mengambil data produk.</p>;
  }

  return (
    <div>
      <DetailProduk product={(data?.data as ProductType) ?? null} />
    </div>
  );
};

export default HalamanDetailProdukCSR;