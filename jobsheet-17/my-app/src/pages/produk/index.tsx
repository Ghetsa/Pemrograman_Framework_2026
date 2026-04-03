import { useEffect, useState } from "react"
import TampilanProduk from "../../views/produk"
import useSWR from "swr"
import fetcher from "../../utils/swr/fetcher"
import { useRouter } from "next/dist/client/components/navigation"

// const fetcher = (url: string) => fetch(url).then((res) => res.json())
const kategori = () => {
  const { push } = useRouter()
  const [products, setProducts] = useState([])

  const { data, error, isLoading } = useSWR("/api/produk", fetcher)

  return (
    <div>
      <TampilanProduk products={isLoading ? [] : data.data} />
    </div>
  )
}

export default kategori