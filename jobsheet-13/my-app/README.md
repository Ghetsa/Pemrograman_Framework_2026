# PEMROGRAMAN BERBASIS FRAMEWORK

## JOBSHEET 13

### Middleware & Route Protection pada Next.js

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

1. Menjelaskan konsep Middleware pada Next.js.
2. Membedakan redirect menggunakan `useEffect` dan Middleware.
3. Membuat file `middleware.ts`.
4. Mengatur proteksi route tertentu.
5. Mengimplementasikan sistem login sederhana menggunakan Middleware. 

---

# B. Dasar Teori Singkat

## 1️⃣ Apa itu Middleware?

Middleware adalah kode yang dijalankan sebelum request halaman diproses.

Alur kerja middleware:

```
User mengakses halaman
↓
Middleware dijalankan
↓
Melakukan pengecekan kondisi (login / role / dll)
↓
Request diteruskan atau diarahkan (redirect)
```

Middleware berjalan pada server atau edge layer sebelum halaman dirender sehingga dapat digunakan untuk melakukan validasi atau proteksi halaman tertentu. 

---

## 2️⃣ Mengapa Tidak Menggunakan useEffect?

Redirect menggunakan `useEffect` memiliki beberapa kekurangan.

Contoh redirect menggunakan `useEffect`:

```tsx
useEffect(() => {
  if (!isLogin) {
    router.push("/login")
  }
}, [])
```

Masalah dari pendekatan tersebut:

* Halaman sempat terbuka terlebih dahulu
* Terjadi glitch atau tampilan berkedip
* Keamanan kurang baik

Middleware memberikan solusi yang lebih baik karena redirect dilakukan sebelum halaman dirender sehingga lebih aman dan tidak menimbulkan glitch. 

---

# C. Langkah Kerja Praktikum

---

## Bagian 1 – Membuat Middleware

### 1️⃣ Modifikasi file halaman produk

Buka file berikut:

```
src/pages/produk/index.tsx
```

Contoh modifikasi:

```tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TampilProduk from "../../views/product";
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";

const kategori = () => {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();
  const [products, setProducts] = useState([]);

  const { data, error, isLoading } = useSWR("/api/produk", fetcher);

  return (
    <div>
      <TampilProduk products={isLoading ? [] : data.data} />
    </div>
  );
};

export default kategori;
```

Pada tahap ini halaman produk masih dapat diakses tanpa proteksi.

---

### 2️⃣ Membuat file middleware

Buat file baru:

```
src/middleware.ts
```

File ini diletakkan sejajar dengan folder `pages`.

---

# Bagian 2 – Struktur Dasar Middleware

Tambahkan kode berikut pada file `middleware.ts`.

```tsx
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.next();
}
```

Penjelasan:

* `NextResponse.next()` berarti request akan diteruskan tanpa redirect.
* Halaman seperti `/produk` masih dapat diakses secara normal. 

<img width="1183" height="895" alt="image" src="https://github.com/user-attachments/assets/609f43dd-d07b-439f-ac40-c2b1d4be9741" />

---

# Bagian 3 – Redirect Sederhana

Modifikasi file `middleware.ts`.

```tsx
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/", request.url));
}
```

Jika kode ini dijalankan maka semua halaman akan diarahkan ke halaman home.

Akibatnya:

* Semua halaman mengalami redirect terus menerus
* Halaman akan error karena terjadi redirect berulang.

<img width="1182" height="1219" alt="image" src="https://github.com/user-attachments/assets/a7d2a2e8-f5d3-4d5e-ba31-4a37a094c7db" />


---

# Bagian 4 – Batasi Route Tertentu

Untuk mengatasi redirect ke semua halaman, perlu dilakukan pembatasan route.

Modifikasi file `middleware.ts`.

```tsx
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return NextResponse.redirect(new URL("/", request.url));
}

export const config = {
  matcher: ["/produk", "/about"],
};
```

Penjelasan:

* Middleware hanya berjalan pada route `/produk` dan `/about`.
* Halaman lain tetap dapat diakses tanpa redirect.

Dengan konfigurasi ini:

* Jika user membuka `/produk` atau `/about` akan diarahkan ke halaman home.
* Halaman lain tetap berjalan normal. 

---

# Bagian 5 – Simulasi Sistem Login

Pada tahap ini middleware digunakan untuk membuat sistem login sederhana.

Modifikasi file `middleware.ts`.

```tsx
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLogin = false;

  if (isLogin) {
    return NextResponse.next();
  } else {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
}

export const config = {
  matcher: ["/produk", "/about"],
};
```

Penjelasan:

* Jika `isLogin = false` maka user akan diarahkan ke halaman login.
* Jika `isLogin = true` maka user dapat mengakses halaman yang diproteksi.

Dengan implementasi ini:

* Halaman `/produk` dan `/about` membutuhkan login.
* Halaman lain dapat diakses tanpa login. 

---

# D. Pengujian

## Uji 1 – isLogin = false

Akses halaman:

```
/products
```

Hasil:

User akan diarahkan ke halaman login.

```
/login
```

<img width="1393" height="1694" alt="image" src="https://github.com/user-attachments/assets/53a6dc33-6900-4aa4-b929-f4e5a969124e" />


---

## Uji 2 – isLogin = true

Ubah nilai variabel:

```tsx
const isLogin = true;
```

Hasil:

User dapat mengakses halaman:

```
/products
```

<img width="1385" height="915" alt="image" src="https://github.com/user-attachments/assets/62be4b92-b4c9-4af5-bebd-a53572a68239" />


---

## Uji 3 – Multiple Route Protection

Tambahkan konfigurasi berikut:

```tsx
export const config = {
  matcher: ["/products", "/about"],
};
```

Sekarang:

* `/products` membutuhkan login
* `/about` membutuhkan login
* Halaman lain tetap dapat diakses tanpa login. 

<img width="1338" height="1502" alt="image" src="https://github.com/user-attachments/assets/6076ad10-0760-4724-88f0-9dbff7ed65a3" />


---

# E. Perbandingan Middleware vs useEffect

| Aspek           | useEffect               | Middleware                 |
| --------------- | ----------------------- | -------------------------- |
| Redirect timing | Setelah render          | Sebelum render             |
| Glitch          | Ada                     | Tidak                      |
| Security        | Lemah                   | Lebih aman                 |
| Skalabilitas    | Harus di setiap halaman | Cukup sekali di middleware |

Middleware lebih efisien karena proteksi route dapat dilakukan secara global tanpa perlu menambahkan logic redirect pada setiap halaman. 

---

# F. Tugas Praktikum

## Tugas Individu

1. Membuat halaman berikut:

```
/products
/about
/login
```
  <img width="1393" height="1694" alt="image" src="https://github.com/user-attachments/assets/53a6dc33-6900-4aa4-b929-f4e5a969124e" />

<img width="1338" height="1502" alt="image" src="https://github.com/user-attachments/assets/6076ad10-0760-4724-88f0-9dbff7ed65a3" />

<img width="1385" height="915" alt="image" src="https://github.com/user-attachments/assets/62be4b92-b4c9-4af5-bebd-a53572a68239" />

2. Mengimplementasikan Middleware:

* Redirect ke `/login` jika user belum login.
* Izinkan akses jika `isLogin = true`.

<img width="1393" height="1694" alt="image" src="https://github.com/user-attachments/assets/53a6dc33-6900-4aa4-b929-f4e5a969124e" />

<img width="1039" height="674" alt="image" src="https://github.com/user-attachments/assets/8123f2d1-3a56-4d0d-b7de-43db8867b453" />


3. Menambahkan proteksi hanya untuk route tertentu.

Proteksi hanya untuk halaman produk dan about

<img width="450" height="143" alt="image" src="https://github.com/user-attachments/assets/cfc57288-1499-445d-9211-5d7b61f1319e" />


5. Mendokumentasikan hasil:

* Screenshot sebelum redirect

  <img width="1393" height="1694" alt="image" src="https://github.com/user-attachments/assets/53a6dc33-6900-4aa4-b929-f4e5a969124e" />
  
* Screenshot setelah redirect

  <img width="1385" height="915" alt="image" src="https://github.com/user-attachments/assets/62be4b92-b4c9-4af5-bebd-a53572a68239" />
  
* Perbandingan penggunaan middleware dengan `useEffect`. 

Middleware digunakan untuk melakukan pengecekan atau logika sebelum halaman diakses oleh pengguna. Middleware berjalan di server atau edge sehingga dapat melakukan proteksi route seperti autentikasi sebelum halaman dirender.

Sedangkan useEffect berjalan di sisi client setelah halaman berhasil dimuat di browser. Biasanya digunakan untuk menjalankan efek samping seperti mengambil data, memeriksa localStorage, atau melakukan redirect setelah komponen dirender.

Secara umum, middleware lebih cocok untuk proteksi halaman sejak awal, sementara useEffect digunakan untuk logika yang dijalankan di sisi client setelah halaman tampil.

---

# G. Pertanyaan Analisis

### 1. Mengapa middleware lebih aman dibanding useEffect?

Middleware dijalankan sebelum halaman dirender sehingga proses validasi dapat dilakukan lebih awal. Hal ini membuat halaman yang tidak memiliki akses tidak akan pernah ditampilkan kepada pengguna.

---

### 2. Mengapa middleware tidak menimbulkan glitch?

Karena redirect dilakukan sebelum halaman dikirim ke browser, sehingga pengguna tidak sempat melihat halaman yang tidak memiliki akses.

---

### 3. Apa risiko jika semua halaman diproteksi tanpa pengecualian?

Jika semua halaman diproteksi tanpa pengecualian, maka user tidak dapat mengakses halaman publik seperti halaman login atau halaman utama.

---

### 4. Kapan middleware tidak diperlukan?

Middleware tidak diperlukan pada aplikasi yang tidak memiliki sistem autentikasi atau halaman yang tidak membutuhkan proteksi akses.

---

### 5. Apa perbedaan middleware dan API route?

Middleware digunakan untuk memproses request sebelum halaman dirender, sedangkan API route digunakan untuk membuat endpoint backend yang menangani request data.

---

# G. Kesimpulan

Pada praktikum ini telah dipelajari:

* Konsep Middleware pada Next.js
* Implementasi redirect sebelum halaman dirender
* Proteksi route tertentu menggunakan middleware
* Simulasi sistem login sederhana
* Perbandingan middleware dengan redirect menggunakan `useEffect`

Middleware memberikan solusi yang lebih aman dan efisien dalam melakukan proteksi halaman karena proses validasi dilakukan sebelum halaman dirender. Dengan demikian pengguna tidak dapat mengakses halaman yang tidak memiliki izin akses.
