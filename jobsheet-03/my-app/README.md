# PEMROGRAMAN BERBASIS FRAMEWORK

## JOBSHEET 03

### Catch-All Routing, Optional Catch-All, Linking & Navigating pada Next.js (Pages Router)

------------------------------------------------------------------------

## 👤 Identitas Mahasiswa

-   **Nama:** Ghetsa Ramadhani Riska A.
-   **Kelas:** TI-3D
-   **No. Absen:** 11
-   **NIM:** 2341720004
-   **Program Studi:** Teknik Informatika
-   **Jurusan:** Teknologi Informasi
-   **Politeknik Negeri Malang**
-   **Tahun:** 2026

------------------------------------------------------------------------

# A. Tujuan Praktikum

-   Membuat catch-all route untuk menangkap banyak segmen URL
-   Menggunakan optional catch-all route agar halaman tetap dapat
    diakses tanpa parameter
-   Mengambil parameter URL berbentuk array menggunakan `useRouter`
-   Menerapkan navigasi antar halaman menggunakan `Link`
-   Melakukan navigasi imperatif menggunakan `router.push()`
-   Mengimplementasikan redirect sederhana berbasis kondisi (simulasi
    login)

------------------------------------------------------------------------

# B. Tools & Persiapan

-   Node.js (LTS)
-   NPM
-   Visual Studio Code
-   Browser (Chrome / Firefox)
-   Project Next.js Pages Router sudah tersedia

``` bash
npm run dev
```

Akses:

    http://localhost:3000

------------------------------------------------------------------------

# C. Dasar Konsep (Ringkas)

-   `[...slug].tsx` → Catch-All Route
-   `[[...slug]].tsx` → Optional Catch-All Route
-   `useRouter()` → Mengambil parameter URL
-   `Link` → Navigasi deklaratif
-   `router.push()` → Navigasi imperatif
-   Redirect dapat dilakukan menggunakan `router.push()` di dalam
    `useEffect`

------------------------------------------------------------------------

# D. Langkah Kerja Praktikum
  
## 1️⃣ Menjalankan Project

``` bash
npm run dev
```

------------------------------------------------------------------------

## 2️⃣ Membuat Catch-All Route

### Struktur Folder

    pages/
     └── shop/
         └── [...slug].tsx

### Kode Awal `[...slug].tsx`

``` tsx
import { useRouter } from "next/router";

export default function Shop() {
  const router = useRouter();
  const { slug } = router.query;

  console.log("Slug:", slug);

  return (
    <div>
      <h1>Halaman Shop</h1>
      <p>Slug: {JSON.stringify(slug)}</p>
    </div>
  );
}
```

### Contoh URL

-   /shop/clothes
-   /shop/clothes/tops
-   /shop/clothes/tops/t-shirt

------------------------------------------------------------------------

## 3️⃣ Perbaikan Agar Semua Segmen Terbaca

``` tsx
import { useRouter } from "next/router";

export default function Shop() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <div>
      <h1>Halaman Shop</h1>

      {slug && Array.isArray(slug) && (
        <ul>
          {slug.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

------------------------------------------------------------------------

## 4️⃣ Optional Catch-All Route

Rename:

    [...slug].tsx → [[...slug]].tsx

Akses:

    /shop

------------------------------------------------------------------------

## 5️⃣ Validasi Parameter

``` tsx
<p>
  Kategori: {slug ? slug[0] : "Semua Kategori"}
</p>
```

------------------------------------------------------------------------

## 6️⃣ Halaman Login & Register

### login.jsx

``` jsx
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();

  const handlerLogin = () => {
    router.push("/product");
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={() => handlerLogin()}>
        Login
      </button>
    </div>
  );
}
```

### register.jsx

``` jsx
import Link from "next/link";

export default function Register() {
  return (
    <div>
      <h1>Register Page</h1>
      <Link href="/auth/login">Kembali ke Login</Link>
    </div>
  );
}
```

------------------------------------------------------------------------

## 7️⃣ Simulasi Redirect

``` tsx
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Product() {
  const router = useRouter();
  const isLogin = false;

  useEffect(() => {
    if (!isLogin) {
      router.push("/auth/login");
    }
  }, []);

  return <h1>Product Page</h1>;
}
```

------------------------------------------------------------------------

# E. Pertanyaan Evaluasi

### 1. Apa perbedaan `[id].js` dan `[...slug].js`?

`[id].js` menangkap satu parameter saja, sedangkan `[...slug].js`
menangkap banyak segmen dalam bentuk array.

### 2. Mengapa slug berbentuk array?

Karena catch-all route menangkap lebih dari satu segmen URL.

### 3. Kapan menggunakan Link dan router.push()?

`Link` untuk navigasi deklaratif, `router.push()` untuk navigasi
berbasis aksi/logic.

### 4. Mengapa navigasi Next.js tidak me-refresh halaman?

Karena menggunakan client-side navigation (SPA behavior).

------------------------------------------------------------------------

# F. Kesimpulan

Praktikum ini membahas implementasi Catch-All Routing, Optional
Catch-All, serta navigasi deklaratif dan imperatif pada Next.js Pages
Router.

Mahasiswa memahami cara menangkap banyak segmen URL, melakukan redirect
berbasis kondisi, dan membangun sistem navigasi tanpa reload halaman.
