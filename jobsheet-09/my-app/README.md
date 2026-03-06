# PEMROGRAMAN BERBASIS FRAMEWORK

## JOBSHEET 09

### Server Side Rendering (SSR) pada Next.js

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

1. Menjelaskan konsep Server Side Rendering (SSR)
2. Membedakan SSR dengan Client Side Rendering (CSR)
3. Mengimplementasikan `getServerSideProps`
4. Mengelola data melalui props pada SSR
5. Menganalisis perbedaan performa SSR dan CSR melalui DevTools

---

# B. Dasar Teori Singkat

## 1️⃣ Konsep Server Side Rendering (SSR)

Server Side Rendering adalah proses rendering HTML yang dilakukan di server sebelum dikirim ke browser.

Alur SSR:

User Request
↓
Server fetch data
↓
Server generate HTML lengkap
↓
HTML dikirim ke browser
↓
React melakukan hydration

Karakteristik SSR:

* HTML sudah lengkap saat diterima client
* Tidak ada skeleton awal
* Cocok untuk SEO
* Data diambil setiap request

---

## 2️⃣ Perbedaan CSR dan SSR

| Aspek         | CSR                  | SSR                        |
| ------------- | -------------------- | -------------------------- |
| Rendering     | Client               | Server                     |
| Data Fetching | `useEffect`          | `getServerSideProps`       |
| Skeleton      | Perlu                | Tidak perlu                |
| SEO           | Kurang optimal       | Lebih optimal              |
| Network Tab   | Request API terlihat | Request API tidak terlihat |

---

# C. Langkah Kerja Praktikum

---

## Bagian 1 – Setup Halaman SSR

### 1️⃣ Buat file baru

Buat file berikut pada folder produk:

```tsx
pages/produk/server.tsx
```

### 2️⃣ Modifikasi file `server.tsx`

Isi awal file:

```tsx
import TampilProduk from "../views/produk";

const halamanProdukServer = () => {
  return (
    <div>
      <h1>Halaman Produk Server</h1>
      <TampilProduk products={[]} />
    </div>
  );
};

export default halamanProdukServer;
```

### 3️⃣ Jalankan browser

Akses:

```text
http://localhost:3000/produk/server
```

![alt text](/jobsheet-09/my-app/public/img/js09/image.png)

Pada tahap awal, halaman SSR sudah berhasil dibuat dan menampilkan komponen produk, tetapi data masih kosong sehingga yang tampil masih struktur awal halaman.

---

## Bagian 2 – Implementasi `getServerSideProps` pada `server.tsx`

Pada tahap ini, data produk diambil di server sebelum halaman dirender.

### 1️⃣ Tambahkan tipe data produk

```tsx
type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};
```

### 2️⃣ Modifikasi komponen halaman

```tsx
const halamanProdukServer = (props: { products: ProductType[] }) => {
  const { products } = props;

  return (
    <div>
      <h1>Halaman Produk Server</h1>
      <TampilProduk products={products} />
    </div>
  );
};
```

### 3️⃣ Tambahkan `getServerSideProps`

```tsx
export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/produk");
  const response = await res.json();

  return {
    props: {
      products: response.data,
    },
  };
}
```

### 4️⃣ Jalankan browser

Akses kembali:

```text
http://localhost:3000/produk/server
```

![alt text](/jobsheet-09/my-app/public/img/js09/image-1.png)

### Catatan penting

* Skeleton tidak muncul karena data sudah diambil di server
* Harus menggunakan **full URL**
* `getServerSideProps` dipanggil pada setiap request halaman

---

## Bagian 3 – Refactor Type (Product Type)

Agar tipe data lebih rapi dan dapat digunakan ulang, tipe produk dipindahkan ke file terpisah.

### 1️⃣ Buat folder dan file type

```tsx
pages/types/Product.type.ts
```

### 2️⃣ Modifikasi `Product.type.ts`

```tsx
export type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};
```

### 3️⃣ Modifikasi `server.tsx` agar menggunakan type terpisah

```tsx
import TampilProduk from "../views/produk";
import { ProductType } from "../types/Product.type";

const halamanProdukServer = (props: { products: ProductType[] }) => {
  const { products } = props;

  return (
    <div>
      <h1>Halaman Produk Server</h1>
      <TampilProduk products={products} />
    </div>
  );
};

export default halamanProdukServer;

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/produk");
  const response = await res.json();

  return {
    props: {
      products: response.data,
    },
  };
}
```

Dengan refactor ini, tipe data produk menjadi lebih terpusat dan mudah digunakan di halaman lain.

---

## Bagian 4 – Uji Perbedaan SSR vs CSR

### Uji 1 – Skeleton

#### Pada halaman CSR

* Buka halaman CSR
* Refresh browser
* Skeleton muncul terlebih dahulu

![alt text](/jobsheet-09/my-app/public/img/js09/image-2.png)

#### Pada halaman SSR

* Buka halaman SSR
* Refresh browser
* Skeleton tidak muncul

![alt text](/jobsheet-09/my-app/public/img/js09/image-3.png)

---

### Uji 2 – Network Tab

1. Buka DevTools → **Network** → **XHR**
2. Refresh halaman CSR
   → Request API terlihat

   ![alt text](/jobsheet-09/my-app/public/img/js09/image-5.png)

3. Refresh halaman SSR
   → Request API tidak terlihat

   ![alt text](/jobsheet-09/my-app/public/img/js09/image-4.png)

---

### Uji 3 – Response HTML

#### CSR

HTML awal kosong atau hanya berisi skeleton.

![alt text](/jobsheet-09/my-app/public/img/js09/image-7.png)

#### SSR

HTML awal sudah berisi data produk lengkap.

![alt text](/jobsheet-09/my-app/public/img/js09/image-6.png)

---

# D. Tugas Praktikum

## Tugas Individu

### 1️⃣ Buat 2 halaman

* `/products` → CSR
* `/products/server` → SSR

![alt text](/jobsheet-09/my-app/public/img/js09/image-9.png)

### 2️⃣ Dokumentasikan

* Screenshot CSR

![alt text](/jobsheet-09/my-app/public/img/js09/image-10.png)

* Screenshot SSR

![alt text](/jobsheet-09/my-app/public/img/js09/image-11.png)

* Perbedaan Network tab

![alt text](/jobsheet-09/my-app/public/img/js09/image-5.png)

* Perbedaan View Source

![alt text](/jobsheet-09/my-app/public/img/js09/image-4.png)


### 3️⃣ Buat laporan analisis minimal 2 halaman

# Analisis Perbandingan Client Side Rendering (CSR) dan Server Side Rendering (SSR)

## Pendahuluan

Dalam pengembangan aplikasi web modern menggunakan framework seperti Next.js, terdapat beberapa pendekatan dalam proses rendering halaman, yaitu Client Side Rendering (CSR), Server Side Rendering (SSR), dan Static Site Generation (SSG). Pada praktikum ini, fokus utama adalah memahami dan menganalisis perbedaan antara Client Side Rendering (CSR) dan Server Side Rendering (SSR) melalui implementasi langsung pada halaman produk.

Kedua metode tersebut memiliki karakteristik yang berbeda dalam proses pengambilan data, cara halaman dirender, serta dampaknya terhadap performa, pengalaman pengguna (User Experience), dan optimasi mesin pencari (SEO). Dengan melakukan pengujian melalui skeleton loading, network tab, dan response HTML, dapat dianalisis bagaimana mekanisme kerja masing-masing metode rendering tersebut.

---

# 1. Client Side Rendering (CSR)

Client Side Rendering merupakan metode rendering dimana proses pembuatan tampilan halaman dilakukan di sisi client atau browser pengguna. Pada metode ini, server hanya mengirimkan HTML dasar beserta file JavaScript, kemudian browser akan menjalankan JavaScript tersebut untuk mengambil data dari API dan menampilkan konten halaman.

Dalam implementasi praktikum ini, CSR digunakan pada halaman produk yang memanfaatkan hook `useEffect` untuk melakukan proses fetching data dari endpoint API `/api/produk`. Setelah halaman dimuat di browser, barulah proses pengambilan data dilakukan.

Contoh pola dasar implementasi CSR:

```tsx
useEffect(() => {
  fetch('/api/produk')
    .then(res => res.json())
    .then(data => setProducts(data))
}, [])
```

Pada metode ini, ketika pengguna membuka halaman produk, HTML awal yang dikirim dari server belum berisi data produk. Halaman hanya menampilkan struktur dasar atau skeleton loading. Setelah JavaScript dijalankan di browser, barulah request API dilakukan untuk mengambil data produk dan menampilkannya pada halaman.

### Karakteristik CSR

Beberapa karakteristik utama dari Client Side Rendering adalah sebagai berikut:

1. **Rendering dilakukan di browser**

   Proses rendering halaman dilakukan sepenuhnya di sisi client menggunakan JavaScript.

2. **HTML awal masih kosong**

   Saat halaman pertama kali dimuat, HTML belum berisi data karena data masih diambil dari API.

3. **Memerlukan loading state**

   Karena data diambil setelah halaman dimuat, maka diperlukan tampilan loading seperti skeleton agar pengguna mengetahui bahwa data sedang diproses.

4. **Request API terlihat di browser**

   Pada DevTools → Network → XHR, request API akan terlihat karena data diambil langsung dari browser.

### Hasil Pengujian CSR

Berdasarkan pengujian yang dilakukan pada praktikum, ditemukan beberapa hal berikut:

#### 1. Skeleton Loading

Saat halaman CSR dibuka atau direfresh, skeleton loading akan muncul terlebih dahulu sebelum data produk ditampilkan. Hal ini terjadi karena data masih dalam proses fetching dari API.

Skeleton loading berfungsi sebagai indikator visual bagi pengguna bahwa sistem sedang memuat data.

#### 2. Network Request

Pada DevTools bagian Network → XHR, terlihat request API menuju endpoint:

```
/api/produk
```

Hal ini menunjukkan bahwa proses pengambilan data dilakukan oleh browser setelah halaman dimuat.

#### 3. Response HTML

Jika melihat response HTML pada halaman CSR, maka HTML awal yang dikirim dari server tidak berisi data produk. HTML hanya berisi struktur dasar halaman atau komponen skeleton.

Data produk baru ditambahkan setelah JavaScript berhasil mengambil data dari API.

### Kelebihan CSR

Beberapa kelebihan dari Client Side Rendering antara lain:

1. **Cocok untuk aplikasi interaktif**

   CSR sangat cocok untuk aplikasi seperti dashboard, admin panel, dan aplikasi berbasis SPA (Single Page Application).

2. **Interaksi pengguna lebih cepat**

   Setelah data dimuat, interaksi selanjutnya dapat dilakukan tanpa perlu reload halaman.

3. **Mengurangi beban server**

   Karena proses rendering dilakukan di browser, beban server menjadi lebih ringan.

### Kekurangan CSR

Namun CSR juga memiliki beberapa kekurangan:

1. **Loading awal lebih lambat**

   Pengguna harus menunggu proses fetching data sebelum konten muncul.

2. **Kurang optimal untuk SEO**

   Karena HTML awal tidak berisi konten lengkap, mesin pencari mungkin kesulitan melakukan indexing.

3. **Memerlukan JavaScript**

   Jika JavaScript dinonaktifkan di browser, halaman tidak akan dapat menampilkan data.

---

# 2. Server Side Rendering (SSR)

Server Side Rendering merupakan metode rendering dimana proses pembuatan halaman dilakukan di server sebelum dikirim ke browser. Dengan kata lain, server akan mengambil data dari API terlebih dahulu, kemudian menghasilkan HTML yang sudah berisi data lengkap.

Pada Next.js, implementasi SSR dilakukan menggunakan fungsi `getServerSideProps`.

Contoh implementasi SSR pada praktikum:

```tsx
export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/produk");
  const response = await res.json();

  return {
    props: {
      products: response.data,
    },
  };
}
```

Dengan menggunakan metode ini, ketika pengguna membuka halaman SSR, server akan mengambil data produk terlebih dahulu dari API. Setelah itu server akan merender halaman lengkap dengan data tersebut dan mengirimkannya ke browser.

### Karakteristik SSR

Beberapa karakteristik utama dari Server Side Rendering adalah:

1. **Rendering dilakukan di server**

   Proses rendering halaman dilakukan sebelum HTML dikirim ke browser.

2. **HTML sudah berisi data**

   Saat halaman pertama kali dimuat, konten sudah langsung terlihat tanpa perlu menunggu proses fetching data di browser.

3. **Tidak memerlukan skeleton loading**

   Karena data sudah tersedia sebelum halaman dirender, skeleton loading tidak diperlukan.

4. **Request API tidak terlihat di browser**

   Request API dilakukan di server sehingga tidak muncul di DevTools browser.

### Hasil Pengujian SSR

Berdasarkan pengujian yang dilakukan pada praktikum, ditemukan beberapa perbedaan signifikan dibanding CSR.

#### 1. Skeleton Loading

Pada halaman SSR, skeleton loading tidak muncul. Hal ini karena data sudah diambil oleh server sebelum halaman dikirim ke browser.

Akibatnya, halaman langsung menampilkan daftar produk tanpa proses loading tambahan.

#### 2. Network Request

Pada DevTools bagian Network → XHR, tidak terlihat request API menuju `/api/produk`. Hal ini karena request tersebut dilakukan di server, bukan di browser.

Browser hanya menerima hasil akhir berupa HTML yang sudah berisi data.

#### 3. Response HTML

Jika melihat response HTML dari halaman SSR, HTML yang diterima browser sudah berisi data produk secara lengkap. Hal ini berbeda dengan CSR dimana HTML awal masih kosong.

---

# 3. Perbandingan CSR dan SSR

Berdasarkan implementasi dan pengujian yang dilakukan, dapat disimpulkan beberapa perbedaan utama antara CSR dan SSR.

| Aspek            | Client Side Rendering | Server Side Rendering |
| ---------------- | --------------------- | --------------------- |
| Proses Rendering | Browser               | Server                |
| HTML Awal        | Kosong / skeleton     | Sudah berisi data     |
| Loading State    | Diperlukan            | Tidak diperlukan      |
| Request API      | Terlihat di browser   | Dilakukan di server   |
| SEO              | Kurang optimal        | Lebih baik            |
| Performa Awal    | Lebih lambat          | Lebih cepat           |

Dari tabel tersebut terlihat bahwa SSR lebih unggul dalam hal SEO dan waktu tampil awal (first contentful paint). Hal ini karena halaman sudah berisi data ketika diterima oleh browser.

Sebaliknya, CSR lebih unggul dalam aplikasi yang membutuhkan interaksi tinggi dan perubahan data secara dinamis.

---

# 4. Analisis Penggunaan CSR dan SSR

Pemilihan metode rendering sangat bergantung pada kebutuhan aplikasi yang sedang dikembangkan.

Jika aplikasi membutuhkan interaksi yang kompleks dan data yang sering berubah di sisi client, maka CSR merupakan pilihan yang tepat. Contohnya adalah dashboard admin, aplikasi manajemen data, atau aplikasi berbasis SPA.

Namun jika aplikasi memerlukan performa awal yang cepat dan SEO yang baik, maka SSR menjadi pilihan yang lebih tepat. Contohnya adalah website e-commerce, portal berita, atau website perusahaan.

Dalam pengembangan aplikasi modern, seringkali digunakan kombinasi antara CSR, SSR, dan SSG untuk mendapatkan kelebihan dari masing-masing metode.

---

# Kesimpulan

Berdasarkan hasil praktikum dan analisis yang telah dilakukan, dapat disimpulkan bahwa Client Side Rendering (CSR) dan Server Side Rendering (SSR) memiliki mekanisme kerja yang berbeda dalam proses rendering halaman dan pengambilan data.

CSR melakukan proses rendering di sisi browser setelah halaman dimuat, sehingga HTML awal masih kosong dan data diambil melalui API setelah halaman berjalan. Hal ini menyebabkan munculnya skeleton loading dan request API terlihat pada network tab browser.

Sebaliknya, SSR melakukan proses rendering di sisi server sebelum halaman dikirim ke browser. Data diambil terlebih dahulu oleh server menggunakan `getServerSideProps`, sehingga HTML yang diterima browser sudah berisi konten lengkap tanpa perlu menunggu proses loading tambahan.

CSR lebih cocok digunakan untuk aplikasi interaktif yang memerlukan banyak interaksi pengguna, sedangkan SSR lebih cocok untuk aplikasi yang membutuhkan performa awal yang cepat dan optimasi SEO yang baik.

Dengan memahami perbedaan kedua metode ini, pengembang dapat memilih strategi rendering yang paling sesuai dengan kebutuhan aplikasi yang sedang dikembangkan.


---

# E. Studi Analisis

### 1. Mengapa SSR lebih baik untuk SEO?

Karena pada SSR, HTML sudah lengkap dengan data saat pertama kali dikirim ke browser. Hal ini memudahkan mesin pencari membaca isi halaman tanpa harus menunggu JavaScript dijalankan.

### 2. Kapan sebaiknya menggunakan SSR?

SSR sebaiknya digunakan ketika halaman membutuhkan data yang selalu terbaru, membutuhkan SEO yang baik, atau perlu menampilkan konten lengkap sejak awal halaman dibuka.

### 3. Apa kekurangan SSR dibanding CSR?

SSR membebani server lebih besar karena proses render dilakukan setiap request. Selain itu, waktu respon server bisa lebih lama dibanding halaman statis atau CSR sederhana.

### 4. Mengapa skeleton tidak muncul pada SSR?

Karena data sudah diambil di server sebelum halaman dirender. Saat halaman sampai ke browser, data sudah siap ditampilkan sehingga tidak memerlukan loading state awal.

---

# F. Pertanyaan Evaluasi

### 1. Apa itu Server Side Rendering?

Server Side Rendering adalah proses rendering halaman di server sebelum dikirim ke browser.

### 2. Apa perbedaan utama SSR dan CSR?

Perbedaan utamanya terletak pada tempat render dan pengambilan data. CSR dilakukan di client menggunakan `useEffect`, sedangkan SSR dilakukan di server menggunakan `getServerSideProps`.

### 3. Mengapa SSR tidak menampilkan skeleton loading?

Karena data sudah tersedia saat HTML dikirim dari server.

### 4. Mengapa pada SSR request API tidak terlihat di tab XHR browser?

Karena proses fetch data dilakukan di server, bukan di browser.

---

# G. Kesimpulan

Pada praktikum ini telah dipelajari:

* Konsep Server Side Rendering pada Next.js
* Implementasi `getServerSideProps`
* Pengiriman data melalui props
* Refactor tipe data produk ke file terpisah
* Analisis perbedaan SSR dan CSR melalui skeleton, Network tab, dan response HTML

SSR sangat cocok digunakan untuk halaman yang membutuhkan SEO baik dan data yang selalu diperbarui. Dibanding CSR, SSR memberikan hasil HTML yang lebih lengkap sejak awal, meskipun proses render dilakukan di server pada setiap request.
