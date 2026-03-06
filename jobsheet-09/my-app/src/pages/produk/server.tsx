import TampilProduk from "../views/product";

const halamanProdukServer = () => {
  return (
    <div>
      <h1>Halaman Produk Server</h1>
      <TampilProduk products={[]} />
    </div>
  );
};

export default halamanProdukServer;