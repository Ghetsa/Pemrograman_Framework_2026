import { useRouter } from "next/dist/client/components/navigation"
import { useState } from "react"
import useSWR from "swr"
import fetcher from "../../utils/swr/fetcher"
import dynamic from "next/dynamic"
import Head from 'next/head'; //

const TampilanProduk = dynamic(() => import("../../views/produk"), {
  loading: () => <p>Loading produk...</p>,
  ssr: true, // Tambahkan ini agar konten awal tetap ter-render di server untuk SEO
})

const kategori = () => {
  const { push } = useRouter()
  const { data, error, isLoading } = useSWR("/api/produk", fetcher)

  return (
    <>
      <Head>
        {/* Judul halaman yang muncul di tab browser */}
        <title>Daftar Koleksi Produk Sepatu Terbaru | NamaToko Kamu</title>
        
        {/* Deskripsi untuk hasil pencarian Google */}
        <meta 
          name="description" 
          content="Temukan berbagai macam koleksi sepatu Nike original dengan harga terbaik. Belanja mudah dan cepat hanya di aplikasi kami." 
        />
        
        {/* Penting untuk responsivitas layar */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Favicon atau Icon (opsional) */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <TampilanProduk products={isLoading ? [] : data?.data} />
      </div>
    </>
  )
}

export default kategori