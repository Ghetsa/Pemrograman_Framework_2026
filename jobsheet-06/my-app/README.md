# PEMROGRAMAN BERBASIS FRAMEWORK

## JOBSHEET 06

### Custom Document dan Custom Error Page (404) pada Next.js

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

1. Memahami fungsi Custom Document (`_document.js`) pada Next.js
2. Mengimplementasikan custom document untuk kebutuhan global aplikasi
3. Membuat dan mengatur Custom Error Page (404)
4. Menambahkan styling khusus pada halaman error
5. Menampilkan gambar dari folder public
6. Melakukan handling komponen global (Navbar) pada halaman error

---

# B. Dasar Teori Singkat

## 1️⃣ Custom Document

`_document.js` digunakan untuk:

* Mengatur struktur dasar HTML (`<html>`, `<head>`, `<body>`)
* Menambahkan meta tag global (SEO, verification)
* Menambahkan CDN (Bootstrap, Font, Analytics)

⚠ **Catatan penting:**
`<title>` tidak direkomendasikan ditaruh di `_document.js`, tetapi di masing-masing halaman.

---

## 2️⃣ Custom Error Page (404)

Next.js memungkinkan membuat halaman error sendiri dengan membuat file:

```
pages/404.tsx
```

Halaman ini otomatis ditampilkan saat route tidak ditemukan.

---

# C. Alat dan Bahan

## Perangkat Lunak

* Node.js (LTS)
* NPM
* Visual Studio Code
* Browser

## Prasyarat

* Project Next.js (Pages Router) sudah tersedia
* Aplikasi dapat dijalankan (`npm run dev`)

---

# D. Langkah Kerja Praktikum

---

## Langkah 1 – Menjalankan Project

1. Buka folder project
2. Jalankan:

```bash
npm run dev
```

3. Akses:

```
http://localhost:3000
```

### Jika ada kendala tampilan index lama (Tailwind masih aktif)

Uninstall Tailwind:

```bash
npm uninstall tailwindcss postcss autoprefixer
```

Hapus file config:

```
tailwind.config.js
postcss.config.js
```

---

## Langkah 2 – Membuat Custom Document

Masuk ke folder:

```
pages/_document.tsx
```

### Modifikasi `_document.tsx`

```tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="id">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

![alt text](image.png)

### Verifikasi

* Buka Inspect Element
* Pastikan `<html lang="id">` sudah berubah

---

## Langkah 3 – Pengaturan Title per Halaman

Buka:

```
pages/index.tsx
```

Tambahkan:

```tsx
import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Praktikum Next.js Pages Router</title>
      </Head>
      <h1>Praktikum Next.js Pages Router</h1>
      <p>Mahasiswa D4 Pengembangan Web</p>
    </div>
  );
}
```

![alt text](image-1.png)

Refresh halaman dan perhatikan judul tab browser berubah.

---

## Langkah 4 – Membuat Custom Error Page (404)

Di folder `pages`, buat file:

```
pages/404.tsx
```

### Isi kode awal:

```tsx
const Custom404 = () => {
  return (
    <div>
      <h1>404 - Halaman Tidak Ditemukan</h1>
      <p>Maaf, halaman yang Anda cari tidak ada.</p>
    </div>
  );
};

export default Custom404;
```

### Pengujian

Akses URL yang tidak ada:

```
http://localhost:3000/dashboard
```

Halaman 404 akan tampil otomatis.


![alt text](image-2.png)

---

## Langkah 5 – Styling Halaman 404

### Buat file:

```
styles/404.module.scss
```

### Tambahkan style:

```scss
.error {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &__image {
    width: 300px;
  }
}
```

---

### Modifikasi `pages/404.tsx`

Tambahkan import:

```tsx
import styles from "@/styles/404.module.scss";
```

Ubah menjadi:

```tsx
const Custom404 = () => {
  return (
    <div className={styles.error}>
      <h1>404 - Halaman Tidak Ditemukan</h1>
      <p>Maaf, halaman yang Anda cari tidak ada.</p>
    </div>
  );
};
```

![Styling Halaman 404](image-3.png)

---

### Handling Navbar di Halaman 404

Jika Navbar masih muncul, tambahkan `/404` pada disableNavbar.

Modifikasi pada:

```
src/components/layout/AppShell/index.tsx
```

Ubah menjadi:

```tsx
const disableNavbar = ["/auth/login", "/auth/register", "/404"];
```

Sehingga:

```tsx
{!disableNavbar.includes(pathname) && <Navbar />}
```

Sekarang halaman 404 tidak menampilkan Navbar.

![alt text](image-4.png)

---

## Langkah 6 – Menampilkan Gambar dari Folder Public

### 1️⃣ Download gambar

* Buka: [https://undraw.co/](https://undraw.co/)
* Cari “404”
* Download file PNG

### 2️⃣ Simpan di folder:

```
public/page-not-found.png
```

---

### 3️⃣ Modifikasi `404.tsx`

Tambahkan:

```tsx
<img 
  src="/page-not-found.png" 
  alt="404"
  className={styles.error__image} 
/>
```

Sehingga menjadi:

```tsx
const Custom404 = () => {
  return (
    <div className={styles.error}>
      <img
        src="/page-not-found.png"
        alt="404"
        className={styles.error__image}
      />
      <h1>404 - Halaman Tidak Ditemukan</h1>
      <p>Maaf, halaman yang Anda cari tidak ada.</p>
    </div>
  );
};
```

Refresh browser dan gambar akan tampil.

![alt text](image-5.png)

---

# E. Tugas Praktikum

## Tugas 1 (Wajib)

Tambahkan pada halaman 404:

* Judul halaman
* Deskripsi singkat
* Gambar ilustrasi

---

## Tugas 2 (Wajib)

* Custom warna, font, dan layout halaman 404
* Navbar tidak tampil di halaman 404

---

## Tugas 3 (Pengayaan)

Tambahkan tombol:

```tsx
import Link from "next/link";

<Link href="/">
  <button>Kembali ke Home</button>
</Link>
```

Gunakan navigasi Next.js (`Link`).

---

# F. Pertanyaan Evaluasi

### 1. Apa fungsi utama `_document.js`?

Mengatur struktur dasar HTML dan konfigurasi global aplikasi.

### 2. Mengapa `<title>` tidak disarankan di `_document.js`?

Karena setiap halaman sebaiknya memiliki title berbeda untuk SEO dan usability.

### 3. Apa perbedaan halaman biasa dan halaman 404?

Halaman 404 otomatis dipanggil ketika route tidak ditemukan.

### 4. Mengapa folder public tidak perlu di-import?

Karena file di dalam folder `public` dapat diakses langsung melalui root URL aplikasi.

---

# G. Kesimpulan

Pada praktikum ini telah dipelajari:

* Custom Document untuk konfigurasi global HTML
* Pengaturan title per halaman menggunakan `Head`
* Pembuatan Custom Error Page (404)
* Styling halaman error menggunakan SCSS Module
* Handling Navbar agar tidak tampil di halaman 404
* Menampilkan gambar dari folder `public`

Next.js memberikan fleksibilitas tinggi dalam pengaturan struktur HTML global serta pengelolaan halaman error secara terstruktur dan profesional.
