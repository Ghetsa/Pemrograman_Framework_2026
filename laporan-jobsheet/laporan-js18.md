# PEMROGRAMAN BERBASIS FRAMEWORK

## JOBSHEET 18

### Optimasi Performa Aplikasi Menggunakan Fitur Next.js

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

1. Mengoptimasi gambar menggunakan `next/image`.
2. Mengkonfigurasi remote image pada `next.config.js`.
3. Mengoptimasi penggunaan font dengan `next/font`.
4. Mengoptimasi script eksternal menggunakan `next/script`.
5. Mengimplementasikan Dynamic Import untuk lazy loading komponen.
6. Memahami dampak optimasi terhadap performa aplikasi.

---

# B. Dasar Teori Singkat

## 1️⃣ Image Optimization (`next/image`)
Fitur ini secara otomatis melakukan *resizing*, optimasi ukuran file, dan menyajikan gambar dalam format modern seperti WebP. Selain itu, gambar hanya akan dimuat saat masuk ke dalam *viewport* (lazy loading) untuk mempercepat load awal halaman.

## 2️⃣ Font Optimization (`next/font`)
`next/font` mengunduh font Google secara otomatis pada saat build dan menyimpannya secara lokal. Hal ini menghilangkan permintaan jaringan ke Google Fonts saat aplikasi dijalankan, sehingga mencegah masalah *Layout Shift* (CLS).

## 3️⃣ Dynamic Import
Metode ini memungkinkan pemuatan komponen JavaScript hanya saat dibutuhkan. Ini sangat berguna untuk komponen berat yang tidak terlihat langsung saat halaman pertama kali dimuat.

---

# C. Langkah Kerja Praktikum

---

## Bagian 1 – Optimasi Gambar Lokal (Public Folder)

### 1️⃣ Modifikasi file `src/pages/404.tsx`
Mengganti tag `<img>` standar dengan komponen `<Image />` dari Next.js untuk mendapatkan fitur optimasi otomatis.

```tsx
import Image from "next/image";
import styles from "@/styles/404.module.scss";

const Custom404 = () => {
  return (
    <div className={styles.error}>
      <Image 
        src="/not_found.png" 
        alt="404 Not Found" 
        width={500} 
        height={500} 
      />
      <h1 className={styles.error__title}>Halaman Tidak Ditemukan</h1>
    </div>
  );
};

export default Custom404;
```

---

## Bagian 2 – Optimasi Gambar Remote (Google Avatar)

### 1️⃣ Konfigurasi `next.config.js`
Agar Next.js bisa mengoptimasi gambar dari domain luar (seperti Google User Content), kita harus mendaftarkan hostname tersebut.

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "assets.adidas.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
```

### 2️⃣ Modifikasi Komponen Navbar
Ganti elemen `<img>` pada avatar user dengan `<Image />`.

```tsx
{data?.user?.image && (
  <Image
    src={data.user.image}
    alt={data.user.fullname}
    width={50}
    height={50}
    className={styles.navbar__user__image}
  />
)}
```

---

## Bagian 3 – Optimasi Font (`next/font`)

### 1️⃣ Menggunakan Google Font di `_app.tsx` atau Layout
Gunakan font `Roboto` atau `Inter` langsung dari package `next/font/google`.

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  return (
    <main className={inter.className}>
      <Component {...pageProps} />
    </main>
  );
}
```

---

## Bagian 4 – Optimasi Script Eksternal

### 1️⃣ Implementasi `next/script`
Gunakan komponen `Script` untuk memuat library pihak ketiga (seperti Google Analytics) dengan strategi loading yang tepat.

```tsx
import Script from 'next/script';

<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

---

## Bagian 5 – Dynamic Import (Lazy Loading)

### 1️⃣ Modifikasi Impor Komponen
Gunakan `dynamic` dari `next/dynamic` untuk komponen yang bersifat opsional atau berat.

```tsx
import dynamic from 'next/dynamic';

const ModalComplex = dynamic(() => import('@/components/ModalComplex'), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});
```

---

# D. Pengujian

## Uji 1 – Performa Gambar
Buka tab **Network** di Developer Tools. Pastikan gambar yang dimuat melalui `<Image />` memiliki type `webp` (atau format optimal lainnya) meskipun file aslinya adalah `.png` atau `.jpg`.

## Uji 2 – Remote Image
Login menggunakan Google Auth. Pastikan avatar muncul dengan benar menggunakan komponen `<Image />`. Jika konfigurasi `next.config.js` salah, maka gambar tidak akan muncul (error 400/500).

## Uji 3 – Lighthouse Audit
Lakukan audit menggunakan Chrome Lighthouse. Fokus pada peningkatan skor **Performance**, khususnya pada metrik *Largest Contentful Paint* (LCP) dan *Cumulative Layout Shift* (CLS).

---

# E. Tugas Praktikum

1. **Optimasi Semua Image:** Pastikan tidak ada lagi tag `<img>` di seluruh project dan semuanya sudah diganti menjadi `<Image />`.
2. **Implementasi Font:** Menggunakan minimal satu jenis font dari `next/font` dan menerapkannya secara global.
3. **Google Analytics:** Menambahkan script analitik menggunakan `next/script`.
4. **Dynamic Import:** Menerapkan lazy loading pada komponen Modal atau Chart yang ada di project.
5. **Analisis Performa:** Melampirkan screenshot hasil Lighthouse sebelum dan sesudah optimasi.

---

# F. Pertanyaan Analisis

### 1. Mengapa `<img>` biasa tidak optimal?
Tag `<img>` biasa memuat gambar dalam ukuran asli tanpa kompresi otomatis dan tidak mendukung fitur *lazy loading* secara bawaan yang efisien. Hal ini menyebabkan penggunaan bandwidth yang boros dan memperlambat waktu pemuatan halaman.

### 2. Apa perbedaan font CDN dan `next/font`?
Font via CDN memerlukan request HTTP tambahan ke server pihak ketiga (seperti Google Fonts) saat aplikasi berjalan. `next/font` mengunduh font saat waktu build, menyajikannya secara *self-hosted*, dan secara otomatis mengatur CSS *size-adjust* untuk meminimalkan layout shift.

### 3. Mengapa script bisa membuat website lambat?
Script eksternal (terutama yang dimuat secara sinkron) dapat memblokir proses rendering DOM. Jika script tersebut besar atau server penyedianya lambat, browser akan berhenti memproses visual website hingga script selesai diunduh dan dieksekusi.

### 4. Kapan harus menggunakan Dynamic Import?
Dynamic Import harus digunakan pada komponen yang tidak terlihat saat *initial load* (seperti Modal, Drawer), komponen yang berukuran sangat besar (seperti grafik/chart), atau komponen yang hanya dibutuhkan di sisi client (`ssr: false`).

---

# G. Output yang Diharapkan

Mahasiswa menghasilkan:
* Halaman web dengan waktu muat lebih cepat.
* Penggunaan resource gambar yang lebih efisien (WebP & Responsive sizes).
* Pengaturan font yang stabil tanpa pergeseran tata letak.
* Skor performa Lighthouse yang meningkat.

---

# H. Kesimpulan

Melalui praktikum ini, telah dipelajari berbagai teknik optimasi performa yang disediakan oleh Next.js. Penggunaan `next/image` terbukti mampu mengurangi beban bandwidth secara signifikan, sementara `next/font` dan `next/script` memberikan kontrol lebih baik terhadap sumber daya eksternal. Dengan menerapkan teknik-teknik ini, aplikasi web tidak hanya menjadi lebih cepat tetapi juga memberikan pengalaman pengguna yang lebih stabil dan profesional.