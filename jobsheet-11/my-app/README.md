
# PEMROGRAMAN BERBASIS FRAMEWORK

## JOBSHEET 10

### Static Site Generation (SSG) pada Next.js

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

1. Menjelaskan konsep Static Site Generation (SSG)
2. Membedakan SSG dengan SSR dan CSR
3. Mengimplementasikan `getStaticProps`
4. Melakukan build dan menjalankan aplikasi pada production mode
5. Menganalisis perilaku data dinamis pada SSG

---

# B. Dasar Teori Singkat

## 1️⃣ Konsep Pre-rendering

Pre-rendering adalah proses:

* Mengambil data eksternal
* Mengubah kode menjadi HTML
* Mengirim HTML ke client
* React melakukan proses hydration di browser

Pada Next.js terdapat dua metode pre-rendering:

| Metode | Waktu Eksekusi  |
| ------ | --------------- |
| SSR    | Saat request    |
| SSG    | Saat build time |

---

## 2️⃣ Static Site Generation (SSG)

Static Site Generation adalah metode rendering dimana:

* HTML dibuat saat proses build
* Data diambil saat build
* Halaman menjadi file statis

Alur SSG:

```
npm run build
↓
Next.js mengambil data
↓
Generate HTML statis
↓
Disimpan sebagai file statis
↓
Dikirim ke browser saat request
```

Karakteristik SSG:

* Sangat cepat
* Cocok untuk landing page
* Tidak real-time
* Data berubah hanya setelah build ulang

---

## 3️⃣ Perbandingan CSR vs SSR vs SSG

| Aspek       | CSR       | SSR        | SSG          |
| ----------- | --------- | ---------- | ------------ |
| Waktu Fetch | Client    | Runtime    | Build Time   |
| Skeleton    | Ada       | Tidak      | Tidak        |
| Update Data | Real-time | Real-time  | Build ulang  |
| Cocok Untuk | Dashboard | E-commerce | Landing Page |

Tabel perbandingan ini juga ditampilkan pada diagram jobsheet halaman awal materi.

---

# C. Langkah Kerja Praktikum

---

# Bagian 1 – Setup Halaman Static

### 1️⃣ Membuat file halaman SSG

Buat file baru pada folder:

```
pages/produk/static.tsx
```

---

### 2️⃣ Modifikasi file `static.tsx`

Tambahkan kode berikut:

```tsx
import TampilProduk from "../../views/product";
import { ProductType } from "../../types/Product.type";

const halamanProdukStatic = (props: { products: ProductType[] }) => {
  const { products } = props;

  return (
    <div>
      <h1>Halaman Produk Static</h1>
      <TampilProduk products={products} />
    </div>
  );
};

export default halamanProdukStatic;
```

---

### 3️⃣ Implementasi `getStaticProps`

Tambahkan fungsi berikut pada file yang sama:

```tsx
export async function getStaticProps() {

  const res = await fetch("http://127.0.0.1:3000/api/produk");
  const response = await res.json();

  console.log("Data produk yang diambil dari API:", response);

  return {
    props: {
      products: response.data,
    },
  };
}
```

![alt text](/jobsheet-10/my-app/public/img/laporan/image.png)

Catatan penting:

* Implementasi hampir sama dengan **SSR**
* Perbedaan hanya pada **method yang digunakan**

```
SSR → getServerSideProps
SSG → getStaticProps
```

---

# Bagian 2 – Build Production Mode

Langkah berikut digunakan untuk membuat halaman statis.

### 1️⃣ Pindahkan beberapa folder

Untuk menghindari error, beberapa folder dipindahkan ke luar folder `src/pages`.

Struktur folder menjadi:

```
src
 ├ components
 ├ pages
 ├ styles
 ├ types
 ├ utils
 └ views
```

![alt text](/jobsheet-10/my-app/public/img/laporan/image-1.png)

Langkah ini dilakukan agar Next.js dapat mengenali halaman dengan benar saat build.

---

### 2️⃣ Jalankan build

Buka dua terminal:

Terminal 1:

```bash
npm run dev
```

Terminal 2:

```bash
npm run build
```

Tujuannya:

Karena API berjalan di:

```
http://localhost:3000/api/produk
```

Sehingga server harus tetap aktif saat proses build berlangsung.

---

### 3️⃣ Hasil build

Jika berhasil maka akan muncul daftar route seperti berikut:

```
Route (pages)

○ /
○ /about
○ /produk
○ /produk/server
● /produk/static
```

Keterangan:

| Simbol | Arti    |
| ------ | ------- |
| ○      | Static  |
| ●      | SSG     |
| f      | Dynamic |

![alt text](/jobsheet-10/my-app/public/img/laporan/image-2.png)

---

### 4️⃣ Menjalankan Production Mode

Jika build berhasil jalankan:

```
npm run start
```

Jika terjadi error:

```
EADDRINUSE: address already in use
```

![alt text](/jobsheet-10/my-app/public/img/laporan/image-3.png)

Maka:

1. Stop `npm run dev`
2. Jalankan kembali

```
npm run start
```

![alt text](/jobsheet-10/my-app/public/img/laporan/image-4.png)

---

### 5️⃣ Akses halaman static

Buka browser:

```
http://localhost:3000/produk/static
```

Halaman produk static akan tampil dengan data dari database.

![alt text](/jobsheet-10/my-app/public/img/laporan/image-5.png)

---

# Bagian 3 – Pengujian Perubahan Data

Pengujian dilakukan untuk melihat perbedaan CSR, SSR dan SSG.

---

## Uji 1 – Tambah Data pada Database

1. Buka Firebase Firestore
2. Tambahkan document baru pada collection:

```
products
```

Contoh field:

```
name: sepatu kasogi
image: url gambar
price: 500000
category: sepatu lain
```

---

### 2️⃣ Buka halaman berikut

#### Halaman CSR

```
/products
```

Hasil:

Data **langsung bertambah**.

![alt text](/jobsheet-10/my-app/public/img/laporan/image-6.png)

---

#### Halaman SSR

```
/products/server
```

Hasil:

Data **langsung bertambah**.

![alt text](/jobsheet-10/my-app/public/img/laporan/image-7.png)

---

#### Halaman SSG

```
/products/static
```

Hasil:

Data **tidak berubah**.

![alt text](/jobsheet-10/my-app/public/img/laporan/image-8.png)

Hal ini karena data SSG hanya diambil saat build.

---

## Uji 2 – Build ulang

Untuk memperbarui data SSG lakukan:

### 1️⃣ Jalankan kembali build

```
npm run build
```

Kemudian:

```
npm run start
```

---

### 2️⃣ Refresh halaman

```
/products/static
```

Sekarang data baru akan muncul.

![alt text](/jobsheet-10/my-app/public/img/laporan/image-9.png)

Ini membuktikan bahwa:

```
SSG membutuhkan build ulang untuk memperbarui data
```

---

# D. Tugas Praktikum

## Tugas Individu

### 1️⃣ Membuat 3 halaman rendering

Buat halaman berikut:

```
/products
/products/server
/products/static
```

![alt text](/jobsheet-10/my-app/public/img/laporan/image-10.png)

Yang masing-masing menggunakan:

| Halaman          | Rendering |
| ---------------- | --------- |
| /products        | CSR       |
| /products/server | SSR       |
| /products/static | SSG       |

---

### 2️⃣ Melakukan pengujian

Lakukan pengujian berikut:

* Tambah data
* Hapus data
* Bandingkan hasil perubahan pada ketiga metode rendering

| Halaman          | Tambah Data | Hapus Data | Hasil |
| ---------------- | ----------- | ---------- |------ |
| /products        | ![alt text](/jobsheet-10/my-app/public/img/laporan/image-6.png) | ![alt text](/jobsheet-10/my-app/public/img/laporan/image-12.png) | Data langsung berubah setelah ditambah atau dihapus karena halaman mengambil data di client (CSR). Saat halaman direfresh atau request ulang ke API, perubahan data langsung terlihat. |
| /products/server | ![alt text](/jobsheet-10/my-app/public/img/laporan/image-7.png) | ![alt text](/jobsheet-10/my-app/public/img/laporan/image-11.png) | Perubahan data terlihat setelah halaman direload karena data diambil ulang dari server menggunakan SSR (getServerSideProps) setiap kali halaman diakses. |
| /products/static | ![alt text](/jobsheet-10/my-app/public/img/laporan/image-8.png) | ![alt text](/jobsheet-10/my-app/public/img/laporan/image-13.png) | Perubahan data tidak langsung terlihat karena halaman dibuat secara statis saat proses build (getStaticProps). Data baru hanya muncul jika dilakukan rebuild atau revalidation. |

---

### 3️⃣ Membuat laporan analisis minimal 3 halaman

Analisis mencakup:

* Perbedaan performa
* Perbedaan update data
* Penggunaan yang tepat untuk setiap metode rendering

#### LAPORAN ANALISIS

# Analisis Perbandingan Rendering CSR, SSR, dan SSG pada Next.js

## Pendahuluan

Dalam pengembangan aplikasi web modern menggunakan framework seperti Next.js, terdapat beberapa metode rendering yang dapat digunakan untuk menampilkan halaman web kepada pengguna. Tiga metode yang paling umum digunakan adalah Client Side Rendering (CSR), Server Side Rendering (SSR), dan Static Site Generation (SSG). Setiap metode memiliki cara kerja, kelebihan, serta kekurangan yang berbeda dalam hal performa, proses pengambilan data, dan pembaruan data.

Pada praktikum ini dilakukan implementasi tiga halaman berbeda yaitu `/products`, `/products/server`, dan `/products/static`. Ketiga halaman tersebut menggunakan metode rendering yang berbeda yaitu CSR, SSR, dan SSG. Setelah implementasi dilakukan, dilakukan pengujian dengan menambahkan dan menghapus data produk untuk melihat bagaimana setiap metode merespons perubahan data tersebut.

Melalui pengujian ini dapat dianalisis bagaimana perbedaan performa, mekanisme pembaruan data, serta kondisi penggunaan yang paling sesuai untuk masing-masing metode rendering.

---

# 1. Client Side Rendering (CSR)

Client Side Rendering merupakan metode rendering dimana proses pengambilan data dan rendering halaman dilakukan di sisi client atau browser. Pada metode ini, server hanya mengirimkan struktur dasar HTML serta file JavaScript kepada browser. Setelah halaman dimuat, browser akan menjalankan JavaScript untuk mengambil data dari API dan menampilkan konten halaman.

Pada praktikum ini, halaman CSR diimplementasikan pada route:

```
/products
```

Pengambilan data dilakukan menggunakan `useEffect` yang memanggil API `/api/produk`. Setelah data berhasil diambil, data tersebut disimpan dalam state dan kemudian ditampilkan pada komponen produk.

### Cara Kerja CSR

Alur kerja Client Side Rendering dapat dijelaskan sebagai berikut:

1. Browser mengakses halaman `/products`.
2. Server mengirimkan HTML dasar serta file JavaScript.
3. Browser menjalankan JavaScript.
4. JavaScript melakukan request ke API `/api/produk`.
5. Data yang diterima dari API kemudian dirender di browser.

Pada proses ini, HTML awal yang diterima browser belum berisi data produk. Data baru akan muncul setelah proses fetching data selesai dilakukan.

### Hasil Pengujian CSR

Berdasarkan hasil pengujian yang dilakukan, ditemukan beberapa karakteristik penting dari CSR.

#### 1. Penambahan Data

Ketika data produk baru ditambahkan ke database, perubahan tersebut langsung terlihat pada halaman setelah halaman direfresh atau setelah request API dilakukan kembali. Hal ini terjadi karena data selalu diambil langsung dari API pada sisi client.

#### 2. Penghapusan Data

Jika data dihapus dari database, maka data tersebut juga akan langsung hilang dari halaman setelah halaman melakukan request ulang ke API.

Dengan demikian, CSR memiliki kemampuan untuk menampilkan data yang selalu terbaru karena setiap request dilakukan langsung dari client.

### Kelebihan CSR

Beberapa kelebihan dari metode CSR antara lain:

1. **Interaktivitas tinggi**

   CSR sangat cocok untuk aplikasi yang membutuhkan banyak interaksi pengguna seperti dashboard atau aplikasi manajemen data.

2. **Update data real-time**

   Karena data diambil langsung dari API di browser, perubahan data dapat langsung terlihat.

3. **Mengurangi beban server**

   Proses rendering dilakukan di browser sehingga server hanya bertugas menyediakan API.

### Kekurangan CSR

Namun CSR juga memiliki beberapa kekurangan:

1. **Loading awal lebih lambat**

   Pengguna harus menunggu proses fetching data sebelum konten muncul.

2. **Kurang optimal untuk SEO**

   HTML awal tidak berisi data sehingga mesin pencari sulit melakukan indexing.

3. **Membutuhkan JavaScript**

   Jika JavaScript tidak aktif, halaman tidak dapat menampilkan data.

---

# 2. Server Side Rendering (SSR)

Server Side Rendering merupakan metode rendering dimana proses pembuatan halaman dilakukan di server sebelum dikirim ke browser. Pada metode ini, server akan mengambil data dari API terlebih dahulu kemudian merender halaman lengkap dengan data tersebut.

Pada praktikum ini, SSR diimplementasikan pada halaman:

```
/products/server
```

Metode ini menggunakan fungsi `getServerSideProps` untuk mengambil data dari API `/api/produk`.

### Cara Kerja SSR

Alur kerja Server Side Rendering adalah sebagai berikut:

1. Browser mengakses halaman `/products/server`.
2. Server menjalankan fungsi `getServerSideProps`.
3. Server mengambil data dari API.
4. Server merender halaman HTML lengkap dengan data produk.
5. HTML yang sudah berisi data dikirim ke browser.

Dengan metode ini, halaman yang diterima browser sudah berisi konten lengkap tanpa perlu menunggu proses fetching data di browser.

### Hasil Pengujian SSR

Pada pengujian praktikum ditemukan beberapa karakteristik dari SSR.

#### 1. Penambahan Data

Jika data baru ditambahkan ke database, perubahan tersebut akan terlihat setelah halaman direload. Hal ini karena setiap kali halaman diakses, server akan mengambil data terbaru dari API.

#### 2. Penghapusan Data

Jika data dihapus dari database, maka data tersebut tidak akan muncul lagi ketika halaman direfresh. Hal ini terjadi karena data diambil ulang oleh server setiap request.

Dengan demikian SSR selalu menampilkan data terbaru setiap kali halaman diminta oleh pengguna.

### Kelebihan SSR

Beberapa kelebihan SSR antara lain:

1. **SEO lebih baik**

   HTML yang dikirim ke browser sudah berisi data sehingga mudah diindeks oleh mesin pencari.

2. **Konten langsung terlihat**

   Pengguna tidak perlu menunggu proses fetching data di browser.

3. **Data selalu terbaru**

   Karena data diambil setiap request.

### Kekurangan SSR

Namun SSR juga memiliki beberapa kekurangan:

1. **Beban server lebih tinggi**

   Server harus merender halaman untuk setiap request.

2. **Response time lebih lama**

   Proses rendering di server membutuhkan waktu tambahan sebelum halaman dikirim ke browser.

3. **Kurang efisien untuk trafik tinggi**

   Jika jumlah request sangat banyak, server dapat mengalami bottleneck.

---

# 3. Static Site Generation (SSG)

Static Site Generation merupakan metode rendering dimana halaman dibuat secara statis pada saat proses build aplikasi. Data diambil saat proses build dan kemudian disimpan dalam bentuk HTML statis.

Pada praktikum ini, halaman SSG diimplementasikan pada route:

```
/products/static
```

Metode ini menggunakan fungsi `getStaticProps`.

### Cara Kerja SSG

Alur kerja Static Site Generation adalah sebagai berikut:

1. Saat proses build dijalankan, Next.js memanggil `getStaticProps`.
2. Data produk diambil dari API.
3. Halaman HTML statis dibuat berdasarkan data tersebut.
4. HTML statis disimpan dan dikirim langsung ke browser saat halaman diakses.

Karena halaman sudah dibuat sebelumnya, browser hanya perlu mengambil file HTML statis tanpa melakukan proses rendering tambahan.

### Hasil Pengujian SSG

Berdasarkan hasil pengujian yang dilakukan pada praktikum, ditemukan beberapa karakteristik dari SSG.

#### 1. Penambahan Data

Ketika data baru ditambahkan ke database, perubahan tersebut tidak langsung terlihat pada halaman. Hal ini terjadi karena halaman telah dibuat secara statis pada saat proses build.

#### 2. Penghapusan Data

Jika data dihapus dari database, halaman masih menampilkan data lama karena halaman statis belum diperbarui.

Perubahan data hanya dapat terlihat jika dilakukan:

* rebuild aplikasi
* revalidation menggunakan ISR

### Kelebihan SSG

Beberapa kelebihan dari SSG antara lain:

1. **Performa sangat cepat**

   Halaman sudah berupa HTML statis sehingga dapat dimuat dengan sangat cepat.

2. **SEO sangat baik**

   HTML sudah berisi konten lengkap.

3. **Beban server sangat ringan**

   Server hanya perlu mengirimkan file statis.

### Kekurangan SSG

Namun SSG memiliki beberapa kekurangan:

1. **Data tidak real-time**

   Perubahan data tidak langsung terlihat.

2. **Memerlukan rebuild**

   Untuk memperbarui data perlu dilakukan build ulang.

3. **Tidak cocok untuk data yang sering berubah**

   Jika data sering berubah, penggunaan SSG menjadi kurang efisien.

---

# 4. Perbandingan Performa dan Update Data

Berdasarkan pengujian yang dilakukan pada tiga halaman rendering, dapat disimpulkan beberapa perbedaan utama sebagai berikut:

| Aspek            | CSR         | SSR            | SSG            |
| ---------------- | ----------- | -------------- | -------------- |
| Proses Rendering | Browser     | Server         | Build Time     |
| HTML Awal        | Kosong      | Berisi data    | Berisi data    |
| Update Data      | Langsung    | Setelah reload | Tidak langsung |
| Performa Loading | Sedang      | Sedang         | Sangat cepat   |
| SEO              | Kurang baik | Baik           | Sangat baik    |
| Beban Server     | Rendah      | Tinggi         | Sangat rendah  |

Dari tabel tersebut terlihat bahwa setiap metode memiliki keunggulan masing-masing.

---

# 5. Penggunaan yang Tepat untuk Setiap Metode

Pemilihan metode rendering harus disesuaikan dengan kebutuhan aplikasi.

### Penggunaan CSR

CSR cocok digunakan untuk:

* dashboard admin
* aplikasi interaktif
* aplikasi berbasis SPA
* sistem manajemen data

Pada aplikasi tersebut interaksi pengguna lebih penting dibanding SEO.

### Penggunaan SSR

SSR cocok digunakan untuk:

* website e-commerce
* portal berita
* website yang membutuhkan SEO baik
* halaman dengan data yang sering berubah

SSR memungkinkan data selalu terbaru setiap request.

### Penggunaan SSG

SSG cocok digunakan untuk:

* landing page
* blog
* dokumentasi
* halaman informasi yang jarang berubah

Karena halaman sudah dibuat statis, performanya menjadi sangat cepat.

---

# Kesimpulan

Berdasarkan hasil implementasi dan pengujian yang dilakukan pada halaman `/products`, `/products/server`, dan `/products/static`, dapat disimpulkan bahwa CSR, SSR, dan SSG memiliki perbedaan mendasar dalam proses rendering, performa, serta mekanisme pembaruan data.

Client Side Rendering melakukan proses rendering di browser sehingga data diambil setelah halaman dimuat. Metode ini cocok untuk aplikasi interaktif namun kurang optimal untuk SEO.

Server Side Rendering melakukan proses rendering di server sebelum halaman dikirim ke browser. Metode ini memberikan SEO yang baik dan data yang selalu terbaru, namun meningkatkan beban server.

Static Site Generation membuat halaman secara statis pada saat build sehingga memiliki performa yang sangat cepat. Namun metode ini tidak cocok untuk data yang sering berubah karena membutuhkan proses rebuild untuk memperbarui konten.

Dengan memahami karakteristik masing-masing metode rendering, pengembang dapat memilih pendekatan yang paling sesuai dengan kebutuhan aplikasi yang sedang dikembangkan. Dalam praktik pengembangan modern, sering kali digunakan kombinasi antara CSR, SSR, dan SSG untuk mendapatkan performa, fleksibilitas, dan pengalaman pengguna yang optimal.

---

# E. Studi Analisis

### 1. Mengapa SSG tidak menampilkan data terbaru?

Karena data diambil saat proses build. Setelah build selesai, halaman menjadi statis sehingga perubahan data tidak akan terlihat sampai dilakukan build ulang.

---

### 2. Mengapa SSG lebih cepat?

Karena HTML sudah dibuat sebelumnya saat build, sehingga server hanya mengirim file statis tanpa perlu memproses data lagi.

---

### 3. Kapan SSG tidak cocok digunakan?

SSG tidak cocok digunakan pada aplikasi yang memerlukan data real-time seperti dashboard atau aplikasi yang datanya sering berubah.

---

### 4. Mengapa e-commerce tidak cocok menggunakan SSG murni?

Karena data produk, stok, dan harga sering berubah. Jika menggunakan SSG murni maka data tidak akan langsung terupdate tanpa build ulang.

---

### 5. Apa perbedaan build mode dan development mode?

| Mode             | Penjelasan                                                         |
| ---------------- | ------------------------------------------------------------------ |
| Development Mode | Digunakan saat proses development dengan `npm run dev`             |
| Production Mode  | Digunakan setelah build dengan `npm run build` dan `npm run start` |

Production mode menghasilkan performa aplikasi yang lebih optimal.

---

# F. Pertanyaan Evaluasi

### 1. Apa itu Static Site Generation?

Static Site Generation adalah metode rendering dimana halaman HTML dibuat saat proses build dan dikirim sebagai file statis ke browser.

---

### 2. Apa perbedaan utama SSG dengan SSR?

Perbedaan utama terletak pada waktu pengambilan data.

* SSR mengambil data saat request
* SSG mengambil data saat build

---

### 3. Mengapa SSG tidak menampilkan skeleton loading?

Karena HTML sudah lengkap saat dikirim ke browser.

---

### 4. Mengapa halaman SSG perlu build ulang untuk update data?

Karena HTML statis dibuat saat build dan tidak berubah sampai proses build dilakukan kembali.

---

# G. Kesimpulan

Pada praktikum ini telah dipelajari:

* Konsep Static Site Generation (SSG)
* Implementasi `getStaticProps`
* Proses build dan production mode pada Next.js
* Perbedaan CSR, SSR, dan SSG
* Analisis perubahan data pada setiap metode rendering

SSG memberikan performa yang sangat cepat karena halaman sudah diproses sebelumnya menjadi file statis. Namun metode ini tidak cocok untuk aplikasi yang memerlukan data real-time karena perubahan data hanya dapat diperbarui setelah proses build ulang dilakukan.
