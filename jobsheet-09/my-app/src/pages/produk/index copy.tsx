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
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/produk");
      const json = await res.json();
      setProducts(json.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "24px" }}>
        Daftar Produk
      </h1>

      {/* 🔥 Tombol Refresh */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <button
          onClick={fetchData}
          style={{
            padding: "8px 16px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor: "#6366f1",
            color: "white",
          }}
        >
          Refresh Data
        </button>
      </div>

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