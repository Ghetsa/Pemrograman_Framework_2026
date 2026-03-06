import fetcher from "@/utils/swr/fetcher";
import { useRouter } from "next/router";
import useSWR from "swr";

const HalamanProduk = () => {
  // const Router = useRouter();
  // console.log(Router);
  const { query } = useRouter();
  const { data, error, isLoading } = useSWR(`/api/products/${query.produk}`, fetcher);
  return (
    <div>
      <h1>Halaman Produk</h1>
      <p>Produk: {query.produk}</p>
    </div>
  );
};

export default HalamanProduk;
