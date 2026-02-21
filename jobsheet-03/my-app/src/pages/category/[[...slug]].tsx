import { useRouter } from "next/router";

const halamanKategori = () => {
  const router = useRouter();

  if (!router.isReady) return <p>Loading...</p>;

  const { slug } = router.query;

  return (
    <div>
      <h1>Halaman Kategori</h1>

      <p>
        Nilai slug: {Array.isArray(slug) ? slug.join("-") : slug}
      </p>
      <br />
      <h3>List Kategori</h3>
      {Array.isArray(slug) && (
        <ol style={{ listStyleType: "decimal", paddingLeft: "20px" }}>
          {slug.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default halamanKategori;
