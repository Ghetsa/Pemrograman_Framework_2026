# PEMROGRAMAN BERBASIS FRAMEWORK

## JOBSHEET 08

### Client Side Rendering (CSR) & Data Fetching dengan SWR pada Next.js

---

## 👤 Identitas Mahasiswa

* **Nama:** Ghetsa Ramadhani Riska A.
* **Kelas:** TI-3D
* **No. Absen:** 11
* **NIM:** 2341720004
* **Program Studi:** Teknik Informatika
* **Jurusan:** Teknologi Informasi
* **Politeknik Negeri Malang**
* **Tahun:** 2026

---

# A. Tujuan Praktikum

Setelah menyelesaikan praktikum ini, mahasiswa mampu:

1. Menjelaskan konsep Client Side Rendering (CSR)
2. Mengimplementasikan data fetching menggunakan `useEffect`
3. Membuat Skeleton Loading menggunakan conditional rendering
4. Menggunakan library SWR untuk optimasi data fetching
5. Mengimplementasikan caching pada aplikasi berbasis framework

---

# B. Dasar Teori Singkat

## 1️⃣ Client Side Rendering (CSR)

Client Side Rendering adalah proses rendering UI yang dilakukan di sisi browser.

Ciri-ciri:

* HTML awal kosong
* Data diambil setelah halaman dimuat
* Ada delay sebelum data tampil
* Cocok untuk aplikasi interaktif

Alur CSR:

Server → kirim HTML kosong + JS
↓
Browser menjalankan JS
↓
Fetch data dari API
↓
Render UI di client

---

## 2️⃣ Data Fetching dengan useEffect

Contoh pola dasar CSR:

```tsx
useEffect(() => {
  fetch('/api/products')
    .then(res => res.json())
    .then(data => setProducts(data))
}, [])
```

Karakteristik:

* Data diambil di sisi client
* Memerlukan loading state
* Menggunakan conditional rendering

---

## 3️⃣ Skeleton Loading

Skeleton digunakan untuk:

* Menghindari tampilan kosong
* Memberikan feedback visual
* Meningkatkan pengalaman pengguna

Contoh konsep:

```tsx
{products.length > 0 ? (
  products.map(...)
) : (
  <Skeleton />
)}
```

---

## 4️⃣ SWR (Stale While Revalidate)

SWR adalah React Hook untuk data fetching dengan caching otomatis.

Instalasi:

```bash
npm install swr
```

Contoh penggunaan:

```tsx
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())
const { data, error, isLoading } = useSWR('/api/products', fetcher)
```

Keunggulan:

* Caching otomatis
* Revalidation
* Handling loading & error lebih sederhana
* Kode lebih clean dibanding useEffect manual

---

# C. Langkah Kerja Praktikum

---

## Bagian 1 – Setup Data Produk

### 1️⃣ Modifikasi Data di Firebase

* Tambahkan field baru:

  * id
  * name
  * category
  * price
  * image
* Gunakan URL image dari toko sepatu (copy image address)
* Tambahkan minimal 2 document pada collection `products`

### 2️⃣ Buat Endpoint API

Pastikan endpoint tersedia:

```
/api/produk
```

### 3️⃣ Uji Endpoint

```
http://localhost:3000/api/produk
```

Data JSON akan menampilkan produk lengkap dengan image dan category.

---

## Bagian 2 – Implementasi CSR dengan useEffect

### Langkah 1 – Buat File View

Buat file:

```
src/views/products/index.tsx
```

---

### Langkah 2 – Modifikasi index.tsx (View Produk)

Tambahkan tipe data:

```tsx
type ProductType = {
  id: string
  name: string
  price: number
  image: string
  category: string
}
```

Buat komponen tampil produk:

```tsx
const TampilProduk = ({ products }: { products: ProductType[] }) => {
  return (
    <div>
      <h1>Daftar Produk</h1>
      {products.map((products) => (
        <div key={products.id}>
          <h3>{products.name}</h3>
          <img src={products.image} width={200} />
          <p>Harga: {products.price}</p>
          <p>Kategori: {products.category}</p>
        </div>
      ))}
    </div>
  )
}
```

---

### Langkah 3 – Modifikasi pages/produk/index.tsx

Tambahkan `useEffect`:

```tsx
useEffect(() => {
  fetch('/api/produk')
    .then((res) => res.json())
    .then((respondata) => {
      setProducts(respondata.data)
    })
}, [])
```

Jalankan:

```
http://localhost:3000/produk
```

---

## Bagian 3 – Styling Produk

### 1️⃣ Buat file:

```
produk.module.scss
```

### 2️⃣ Tambahkan styling produk (grid, card, image, dll)

### 3️⃣ Import styling pada view produk

```tsx
import styles from "./produk.module.scss"
```

---

## Bagian 4 – Implementasi Skeleton Loading

### 1️⃣ Modifikasi index.tsx pada views/products

Tambahkan conditional rendering:

```tsx
{products.length > 0 ? (
  products.map(...)
) : (
  <div className={styles.skeleton}></div>
)}
```

---

### 2️⃣ Tambahkan animasi skeleton di produk.module.scss

```scss
@keyframes skeletonAnimation {
  0% { opacity: 0.6; }
  50% { opacity: 0.3; }
  100% { opacity: 0.6; }
}

.skeleton {
  background-color: #ddd;
  animation: skeletonAnimation 1.5s infinite;
}
```

---

### 3️⃣ Jalankan Browser

Saat halaman dimuat:

* Skeleton tampil terlebih dahulu
* Setelah data masuk → produk tampil

---

## Bagian 5 – Implementasi SWR

### 1️⃣ Install SWR

```bash
npm install swr
```

---

### 2️⃣ Buat folder utils/swr

Buat file:

```
src/utils/swr/fetcher.ts
```

Isi:

```tsx
const fetcher = (url: string) => fetch(url).then(res => res.json())
export default fetcher
```

---

### 3️⃣ Modifikasi pages/produk/index.tsx

```tsx
import useSWR from "swr"
import fetcher from "@/utils/swr/fetcher"

const { data, error, isLoading } = useSWR('/api/produk', fetcher)
```

Tampilkan data:

```tsx
<TampilProduk products={isLoading ? [] : data.data} />
```

---

## Perbandingan

| useEffect Manual      | SWR             |
| --------------------- | --------------- |
| Perlu state manual    | Otomatis        |
| Tidak ada caching     | Ada caching     |
| Lebih panjang         | Lebih ringkas   |
| Handling error manual | Lebih sederhana |

---

# D. Tugas Praktikum

## Tugas Individu

### 1️⃣ Jelaskan Perbedaan

* Client Side Rendering
* Server Side Rendering
* Static Site Generation

### 2️⃣ Buat Halaman Produk Dengan:

* Skeleton loading
* Animasi

### 3️⃣ Refactor dari useEffect menjadi SWR

---

# E. Penanganan Error

Jika muncul error saat membuka:

```
http://localhost:3000/produk/server
```

Modifikasi:

```tsx
<p>{products.price.toLocaleString("id-ID")}</p>
```

---

# F. Pertanyaan Evaluasi

### 1. Apa itu Client Side Rendering?

CSR adalah proses rendering halaman di sisi browser setelah data di-fetch dari API.

### 2. Mengapa perlu Skeleton Loading?

Untuk meningkatkan UX dan menghindari tampilan kosong saat data belum tersedia.

### 3. Apa keunggulan SWR dibanding useEffect manual?

SWR menyediakan caching, revalidation, dan handling loading/error secara otomatis.

---

# G. Kesimpulan

Pada praktikum ini telah dipelajari:

* Konsep Client Side Rendering
* Data fetching menggunakan useEffect
* Implementasi Skeleton Loading
* Optimasi data fetching dengan SWR
* Caching dan revalidation otomatis

Pendekatan CSR memberikan fleksibilitas tinggi dalam aplikasi interaktif, sementara SWR memberikan efisiensi dan optimasi dalam pengelolaan data pada sisi client.
