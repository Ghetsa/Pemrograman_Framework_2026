import useSWR from "swr";
import TampilanProduk from "../../views/product";
import fetcher from "../../utils/swr/fetcher";

const Kategori = () => {
  const { data, error, isLoading } = useSWR("/api/produk", fetcher);

  if (error) return <p>Gagal mengambil data produk.</p>;

  return (
    <div>
      <h1>Halaman Produk CSR</h1>
      <TampilanProduk
        products={isLoading ? [] : (data?.data ?? [])}
        basePath="/produk"
      />
    </div>
  );
};

export default Kategori;