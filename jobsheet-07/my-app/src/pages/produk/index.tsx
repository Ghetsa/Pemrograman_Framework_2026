import { useEffect, useState } from "react";

type ProductType = {
  id: string;
  name: string;
  price: number;
  size: string;
  category: string;
};

const ProdukPage = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/produk")
      .then((res) => res.json())
      .then((json) => {
        setProducts(json.data || []);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>
        Daftar Produk
      </h1>

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            marginBottom: "16px",
            padding: "16px",
            borderRadius: "12px",
            border: "1px solid #334155",
            background: "#1e293b",
            color: "#ffffff",
          }}
        >
          <h2>{product.name}</h2>
          <p>Harga: Rp {product.price}</p>
          <p>Ukuran: {product.size}</p>
          <p>
            <strong>Kategori:</strong> {product.category}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProdukPage;