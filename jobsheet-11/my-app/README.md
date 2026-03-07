# PEMROGRAMAN BERBASIS FRAMEWORK

## JOBSHEET 11

### Dynamic Routing & Detail Produk (CSR, SSR, SSG) pada Next.js

---

## 👤 Identitas Mahasiswa

* **Nama:** Ghetsa Ramadhani Riska A.
* **Kelas:** TI-3D
* **No. Absen:** 10
* **Program Studi:** Teknik Informatika
* **Jurusan:** Teknologi Informasi
* **Politeknik Negeri Malang**
* **Tahun:** 2026

---

# A. Tujuan Praktikum

Setelah menyelesaikan praktikum ini, mahasiswa mampu:

1. Membuat halaman detail produk menggunakan **Dynamic Routing**.
2. Mengambil parameter URL pada Next.js.
3. Mengimplementasikan halaman detail produk dengan metode:

   * Client Side Rendering (CSR)
   * Server Side Rendering (SSR)
   * Static Site Generation (SSG)
4. Menggunakan **getStaticPaths** pada dynamic SSG.
5. Menganalisis perbedaan performa ketiga metode rendering. 

---

# B. Dasar Teori Singkat

## 1️⃣ Dynamic Routing

Dynamic Routing pada Next.js digunakan untuk membuat halaman dengan parameter URL.

Contoh struktur file:

```
pages/products/[product].tsx
```

Jika URL diakses:

```
/products/123
```

Maka nilai parameter:

```
product = 123
```

Dynamic routing memungkinkan kita membuat **halaman detail produk berdasarkan ID** tanpa membuat banyak file halaman. 

---

## 2️⃣ Rendering pada Halaman Detail

Pada halaman detail produk, terdapat tiga metode rendering:

| Metode | Cara Ambil ID           | Cara Fetch Data    |
| ------ | ----------------------- | ------------------ |
| CSR    | useRouter()             | fetch / useSWR     |
| SSR    | context.params          | getServerSideProps |
| SSG    | params + getStaticPaths | getStaticProps     |

Metode ini menentukan **kapan data diambil dan bagaimana halaman dirender**. 

---

## 3️⃣ getStaticPaths

`getStaticPaths` digunakan pada **Dynamic Static Generation (SSG)** untuk:

* Menentukan daftar halaman yang akan dibuat saat build
* Mendaftarkan ID produk yang akan dijadikan halaman statis

Contoh konsep:

```tsx
export async function getStaticPaths() {

 const res = await fetch('http://localhost:3000/api/produk')
 const data = await res.json()

 const paths = data.map((product) => ({
   params: { product: product.id }
 }))

 return { paths, fallback: false }
}
```

Fungsi ini **wajib digunakan ketika SSG menggunakan dynamic route**. 

---

# C. Langkah Kerja Praktikum

---

# Bagian 1 – Membuat Dynamic Route

### 1️⃣ Modifikasi file

Buka file:

```
pages/products/[product].tsx
```

Modifikasi pada bagian link produk agar dapat menuju halaman detail:

```tsx
<Link href={`/products/${products.id}`} key={products.id}  className={styles.produk__content__item}>
```

Tujuannya agar setiap produk dapat menuju halaman detail berdasarkan ID.

---

### 2️⃣ Jalankan aplikasi

Buka browser:

```
http://localhost:3000/produk
```

![alt text](/jobsheet-11/my-app/public/img/laporan/image-1.png)

Jika salah satu produk diklik maka akan diarahkan ke halaman:

```
http://localhost:3000/produk/{id_produk}
```

Hal ini membuktikan bahwa **dynamic routing berhasil dibuat**. 

![alt text](/jobsheet-11/my-app/public/img/laporan/image.png)

---

# Bagian 2 – Implementasi CSR (Client Side Rendering)

---

## Langkah 1 – Modifikasi file `[product].tsx`

Buka file:

```
src/pages/produk/[product].tsx
```

Tambahkan kode berikut:

```tsx
import fetcher from "@/utils/swr/fetcher"
import useSWR from "swr"
import { useRouter } from "next/router"

const HalamanProduk = () => {

  const Router = useRouter()
  const { query } = Router

  const { data, error, isLoading } = useSWR(`/api/products/${query.product}`, fetcher)

  return (
    <div>
      <h1>Halaman Produk</h1>
      <p>Produk: {query.product}</p>
    </div>
  )
}

export default HalamanProduk
```

---

## Langkah 2 – Rename API route

Buka folder:

```
pages/api
```

Rename file:

```
produk.ts
```

menjadi:

```
[[...produk]].ts
```

Tujuannya agar API dapat menerima **parameter ID produk secara dinamis**.

![alt text](/jobsheet-11/my-app/public/img/laporan/image-3.png)

---

## Langkah 3 – Modifikasi service Firebase

Buka file:

```
utils/db/servicefirebase.ts
```

Tambahkan fungsi untuk mengambil detail produk berdasarkan ID.

![alt text](/jobsheet-11/my-app/public/img/laporan/image-4.png)

---

## Langkah 4 – Modifikasi file API

Buka file:

```
pages/api/[[...produk]].ts
```

Tambahkan kode handler:

```tsx
export default async function handler(req, res) {

  const {
    query: { produk },
  } = req

  if (produk) {
    const data = await retrieveDataById("products", produk[0])
    res.status(200).json({
      status: true,
      status_code: 200,
      data,
    })
  } else {
    const data = await retrieveProducts("products")
    res.status(200).json({
      status: true,
      status_code: 200,
      data,
    })
  }
}
```

![alt text](/jobsheet-11/my-app/public/img/laporan/image-5.png)

---

## Langkah 5 – Uji endpoint API

Akses:

```
http://localhost:3000/api/produk/{id}
```

Jika berhasil maka akan menampilkan data detail produk dalam bentuk JSON. 

![alt text](/jobsheet-11/my-app/public/img/laporan/image-2.png)

---

# Bagian 3 – Membuat View Detail Produk

---

## 1️⃣ Buat folder baru

```
src/views/DetailProduct
```

Buat file:

```
index.tsx
detailProduct.module.scss
```

---

## 2️⃣ Modifikasi `detailProduct.module.scss`

Tambahkan styling card detail produk:

```scss
.productdetail {
  display: flex;
  gap: 24px;
  padding: 24px;
  background-color: #fff;
  border-radius: 12px;
}

.image img {
  width: 100%;
  object-fit: cover;
}
```

---

## 3️⃣ Modifikasi `index.tsx`

```tsx
const DetailProduk = ({ products }) => {

 return (
   <div className={styles.productdetail}>

     <div className={styles.image}>
       <img src={products.image} alt={products.name} />
     </div>

     <div className={styles.info}>
       <h1>{products.name}</h1>
       <p>{products.category}</p>
       <p>{products.price.toLocaleString("id-ID")}</p>
     </div>

   </div>
 )
}

export default DetailProduk
```

---

## 4️⃣ Hubungkan dengan halaman `[product].tsx`

Tambahkan:

```tsx
import DetailProduk from "@/views/DetailProduct"

<DetailProduk products={isLoading ? [] : data.data} />
```

---

## 5️⃣ Jalankan browser

```
http://localhost:3000/produk/{id_produk}
```

Maka akan muncul **halaman detail produk**. 

![alt text](/jobsheet-11/my-app/public/img/laporan/image-7.png)

---

# Bagian 4 – Implementasi SSR

---

### 1️⃣ Modifikasi `[product].tsx`

Comment kode CSR.

Tambahkan kode SSR:

```tsx
export async function getServerSideProps(context) {

 const { product } = context.params

 const res = await fetch(`http://localhost:3000/api/produk/${product}`)
 const response = await res.json()

 return {
   props: {
     products: response.data
   }
 }
}
```

---

### 2️⃣ Jalankan halaman

```
http://localhost:3000/produk/server
```

![alt text](/jobsheet-11/my-app/public/img/laporan/image-9.png) ![alt text](/jobsheet-11/my-app/public/img/laporan/image-10.png)

Perbedaan SSR:

* Tidak memerlukan loading state
* Data sudah tersedia sebelum halaman dirender. 

---

# Bagian 5 – Implementasi Static Site Generation (Dynamic SSG)

---

## 1️⃣ Modifikasi `[product].tsx`

Tambahkan fungsi berikut:

### getStaticPaths

```tsx
export async function getStaticPaths() {

 const res = await fetch("http://localhost:3000/api/produk")
 const products = await res.json()

 const paths = products.data.map((product) => ({
   params: { product: product.id }
 }))

 return {
   paths,
   fallback: false
 }
}
```

---

### getStaticProps

```tsx
export async function getStaticProps({ params }) {

 const res = await fetch(`http://localhost:3000/api/produk/${params.product}`)
 const response = await res.json()

 return {
   props: {
     products: response.data
   }
 }
}
```

---

## 2️⃣ Jalankan aplikasi

```
http://localhost:3000/produk
```

Klik salah satu produk.

Halaman detail produk akan terbuka dengan metode **Static Site Generation**. 

![alt text](/jobsheet-11/my-app/public/img/laporan/image-11.png) ![alt text](/jobsheet-11/my-app/public/img/laporan/image-12.png)

---

# D. Pengujian

---

## Uji 1 – CSR

Langkah:

1. Refresh halaman detail produk
2. Buka **Network tab**
3. Perhatikan request API

Hasil:

![alt text](/jobsheet-11/my-app/public/img/laporan/image-29.png)

* Ada request API di Network tab
* Halaman memerlukan loading state.

---


## Uji 2 – SSR

Langkah:

1. Refresh halaman detail
2. Periksa Network tab

Hasil:

![alt text](/jobsheet-11/my-app/public/img/laporan/image-31.png)

* Tidak ada request API dari client
* Data sudah dirender dari server.

---

## Uji 3 – SSG

Langkah:

1. Jalankan build

```
npm run build
npm run start
```

![alt text](/jobsheet-11/my-app/public/img/laporan/image-15.png)

2. Tambahkan produk baru di database.

![alt text](/jobsheet-11/my-app/public/img/laporan/image-17.png)

3. Buka halaman detail produk baru.

Hasil:

![alt text](/jobsheet-11/my-app/public/img/laporan/image-18.png)

* Produk tidak muncul.

Setelah build ulang:

```
npm run build
npm run start
```

Baru produk akan muncul.

![alt text](/jobsheet-11/my-app/public/img/laporan/image-19.png)

---

# E. Tugas Praktikum

## Tugas Individu

### Implementasikan halaman detail produk dengan:

* CSR
* SSR
* SSG

---

## HASIL TUGAS INDIVIDU

### Tabel Perbandingan Rendering

| Aspek          | CSR (Client Side Rendering) | SSR (Server Side Rendering) | SSG (Static Site Generation) |
| -------------- | --------------------------- | --------------------------- | ---------------------------- |
| Loading        | Ada proses loading data     | Tidak ada loading tambahan  | Tidak ada loading tambahan   |
| Build Required | Tidak                       | Tidak                       | Ya                           |
| SEO            | Kurang optimal              | Baik                        | Sangat baik                  |
| Perubahan Data | Real-time                   | Real-time                   | Perlu build ulang            |


#### CSR (Client Side Rendering)

Pada metode CSR, data produk diambil di sisi client menggunakan fetch / SWR setelah halaman dimuat. Oleh karena itu pada **Network Tab** terlihat request API ke endpoint produk.

URL contoh:

```
http://localhost:3000/produk/DkSMRkvPhWSBdEe5zbZM
```

**Screenshot Halaman**

![alt text](/jobsheet-11/my-app/public/img/laporan/image-27.png)

**Screenshot Network (terlihat request API)**

![alt text](/jobsheet-11/my-app/public/img/laporan/image-29.png)

---

#### SSR (Server Side Rendering)

Pada metode SSR, data produk diambil di server menggunakan `getServerSideProps` setiap kali halaman diakses. Browser menerima halaman yang sudah berisi data sehingga **tidak ada request API pada Network Tab**.

URL contoh:

```
http://localhost:3000/produk/server/IrpyjWEI805TUYkozew5
```

**Screenshot Halaman**

![alt text](/jobsheet-11/my-app/public/img/laporan/image-30.png)

**Screenshot Network (tidak ada request API)**

![alt text](/jobsheet-11/my-app/public/img/laporan/image-31.png)

---

#### SSG (Static Site Generation)

Pada metode SSG, halaman detail produk dibuat saat proses build menggunakan `getStaticPaths` dan `getStaticProps`. Halaman yang dikirim ke browser sudah berupa HTML statis sehingga **tidak ada request API pada Network Tab**.

URL contoh:

```
http://localhost:3000/produk/static/[id]
```

**Screenshot Halaman**

![alt text](/jobsheet-11/my-app/public/img/laporan/image-24.png)

**Screenshot Network (tidak ada request API)**

![alt text](/jobsheet-11/my-app/public/img/laporan/image-25.png)


#### Hasil `npm run build`

![alt text](/jobsheet-11/my-app/public/img/laporan/image-32.png)

---

# F. Pertanyaan Analisis

### 1. Mengapa `getStaticPaths` wajib pada dynamic SSG?

Karena pada halaman dynamic, Next.js tidak mengetahui secara otomatis parameter URL yang tersedia. `getStaticPaths` digunakan untuk memberikan daftar path yang harus dibuat menjadi halaman statis saat proses build. Tanpa fungsi ini, Next.js tidak dapat menghasilkan halaman statis untuk setiap data yang tersedia.

---

### 2. Mengapa CSR membutuhkan loading state?

Pada metode CSR, data diambil setelah halaman selesai dirender di browser melalui request API. Selama proses pengambilan data tersebut berlangsung, konten belum tersedia sehingga diperlukan **loading state** untuk memberi indikasi kepada pengguna bahwa data sedang dimuat. Hal ini juga membantu meningkatkan pengalaman pengguna agar halaman tidak terlihat kosong.

---

### 3. Mengapa SSG tidak menampilkan produk baru tanpa build ulang?

SSG menghasilkan halaman statis saat proses build berlangsung berdasarkan data yang tersedia pada saat itu. Jika ada produk baru yang ditambahkan setelah proses build selesai, halaman statis tersebut tidak akan otomatis diperbarui. Oleh karena itu diperlukan proses **build ulang** agar halaman dapat dibuat kembali dengan data terbaru.

---

### 4. Mana metode terbaik untuk halaman detail e-commerce?

SSR lebih cocok digunakan pada halaman detail produk karena data yang ditampilkan selalu diambil secara langsung dari server saat halaman diminta. Hal ini memastikan informasi produk seperti harga atau stok selalu terbaru. Selain itu, SSR juga tetap memberikan keuntungan SEO yang baik karena konten sudah tersedia saat halaman dikirim ke browser.

---

### 5. Apa risiko menggunakan SSG untuk produk yang sering berubah?

Jika menggunakan SSG untuk produk yang sering berubah, data yang ditampilkan pada halaman bisa menjadi tidak sesuai dengan kondisi terbaru di database. Hal ini terjadi karena halaman statis tidak diperbarui secara otomatis setelah proses build selesai. Akibatnya pengguna bisa melihat informasi produk yang sudah tidak relevan, seperti harga lama atau stok yang sudah habis.

---

# G. Kesimpulan

Pada praktikum ini telah dipelajari:

* Implementasi **Dynamic Routing pada Next.js**
* Pengambilan parameter URL pada halaman detail
* Implementasi detail produk menggunakan **CSR, SSR, dan SSG**
* Penggunaan **getStaticPaths** untuk dynamic static generation
* Analisis performa dan perbedaan ketiga metode rendering

Dynamic Routing memungkinkan pembuatan halaman detail secara fleksibel berdasarkan parameter URL. Kombinasi CSR, SSR, dan SSG memberikan pilihan strategi rendering yang dapat disesuaikan dengan kebutuhan aplikasi web modern.
