import { useRouter } from "next/router"

const halamanKategori = () => {
  const { query } = useRouter()

  const slug = query.slug

  return (
    <div>
      <h1>Halaman Kategori</h1>

      <p> 
        Kategori: {Array.isArray(slug) ? slug.join("-") : ""}
      </p> 

      {Array.isArray(slug) && slug.length > 0 && (
        <ul>
          {slug.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}

    </div>
  )
}

export default halamanKategori
