# PEMROGRAMAN BERBASIS FRAMEWORK

## JOBSHEET 03

### Routing & Layouting pada Next.js (Pages Router)

------------------------------------------------------------------------

## 👤 Identitas Mahasiswa

-   **Nama:** Ghetsa Ramadhani Riska A.
-   **Kelas:** TI-3D
-   **No. Absen:** 10
-   **Program Studi:** Teknik Informatika
-   **Jurusan:** Teknologi Informasi
-   **Politeknik Negeri Malang**
-   **Tahun:** 2026

------------------------------------------------------------------------

# A. Tujuan Praktikum

-   Memahami konsep Pages Router pada Next.js
-   Membuat routing statis berbasis file dan folder
-   Mengimplementasikan nested routing
-   Mengimplementasikan dynamic routing menggunakan parameter URL
-   Membuat layout global menggunakan komponen layout (App Shell)

------------------------------------------------------------------------

# B. Tools & Persiapan

-   Node.js (minimal v16)
-   NPM / Yarn / PNPM
-   Code Editor (VS Code disarankan)
-   Browser (Chrome / Firefox)
-   Project Next.js (TypeScript)

``` bash
npx create-next-app@latest next-routing
cd next-routing
npm run dev
```

------------------------------------------------------------------------

# C. Dasar Konsep (Ringkas)

-   `pages/` → otomatis menjadi routing
-   `index.tsx` → root route (`/`)
-   Folder di dalam `pages/` → nested route
-   File `[param].tsx` → dynamic routing
-   `pages/_app.tsx` → entry point global aplikasi

------------------------------------------------------------------------

# D. Langkah Kerja Praktikum

## 1️⃣ Routing Dasar (Static Routing)

**Struktur Awal**

    pages/
     └── index.tsx

Tambahkan halaman `about.tsx` lalu uji di browser:

    http://localhost:3001/about

<br>

![alt text](../jobsheet-03/my-app/public/image.png)

------------------------------------------------------------------------

## 2️⃣ Routing Menggunakan Folder

Rapikan struktur:
<br>

![alt text](../jobsheet-03/my-app/public/image-1.png) ![alt text](../jobsheet-03/my-app/public/image-2.png)

    pages/
     └── about/
         └── index.tsx

Akses:

    /about

<br>

![alt text](../jobsheet-03/my-app/public/image-3.png)

------------------------------------------------------------------------

## 3️⃣ Nested Routing

**Struktur Awal**

    pages/
     └── setting/
         ├── user.tsx
         └── app.tsx

Modifikasi kode:
-	user.tsx
<br>

![alt text](../jobsheet-03/my-app/public/image-4.png)

-	app.tsx

<br>

![alt text](../jobsheet-03/my-app/public/image-5.png)
Akses:

- /setting/user 
<br>

![alt text](../jobsheet-03/my-app/public/image-6.png)

- /setting/app
<br>

![alt text](../jobsheet-03/my-app/public/image-7.png)

Nested lebih dalam:

<br>

![alt text](../jobsheet-03/my-app/public/image-8.png)


    pages/
     └── setting/
     └── user/
          └── password/
          └── index.tsx

Akses:

    /user/password

<br>

![alt text](../jobsheet-03/my-app/public/image-9.png)

------------------------------------------------------------------------

## 4️⃣ Dynamic Routing

Struktur:

    pages/
     └── produk/
         ├── index.tsx
         └── [id].tsx

<br>

•	Modifikasi index.tsx
•	Modifikasi [id].tsx
Buka browser http://localhost:3000/produk/sepatu tambahkan segment sepatu

<br>

![alt text](../jobsheet-03/my-app/public/image-10.png)
 
•	Cek menggunakan console.log

<br>

![alt text](../jobsheet-03/my-app/public/image-11.png)
 
•	Modifikasi [id].tsx agar dapat mengambil nilai dari id

<br>

![alt text](../jobsheet-03/my-app/public/image-12.png)
 


Contoh akses:

- /produk/sepatu

<br>

![alt text](../jobsheet-03/my-app/public/image-13.png)

- /produk/sepatu-baru

<br>

![alt text](../jobsheet-03/my-app/public/image-15.png)

- /produk/baju

<br>

![alt text](../jobsheet-03/my-app/public/image-16.png)


Parameter `id` ditangkap menggunakan `useRouter()`.

------------------------------------------------------------------------

## 5️⃣ Membuat Komponen Navbar

Struktur:

    src/
     └── components/
         └── layouts/
             └── navbar/
                 └── index.tsx

<br>

![alt text](../jobsheet-03/my-app/public/image-17.png)


Modifikasi navbar/index.tsx

![alt text](../jobsheet-03/my-app/public/image-28.png)


Modifikasi _app.tsx 

![alt text](../jobsheet-03/my-app/public/image-26.png)
<br>
Tambahkan style di `globals.css` dan import navbar ke halaman.


![alt text](../jobsheet-03/my-app/public/image-27.png)<br>

![alt text](../jobsheet-03/my-app/public/image-23.png)

Jalankan di browser 

![alt text](../jobsheet-03/my-app/public/image-25.png)
![alt text](../jobsheet-03/my-app/public/image-29.png)
![alt text](../jobsheet-03/my-app/public/image-30.png)

------------------------------------------------------------------------

## 6️⃣ Membuat Layout Global (App Shell)

Buat komponen `AppShell` yang membungkus:

-   Navbar (tetap)
-   `{children}` (konten dinamis)
-   Footer

![alt text](../jobsheet-03/my-app/public/image-31.png)

Modifikasi index.tsx pada AppShell
<br>

![alt text](../jobsheet-03/my-app/public/image-32.png)

------------------------------------------------------------------------

## 7️⃣ Implementasi Layout di `_app.tsx`

Modifikasi `_app.tsx` agar semua halaman dibungkus oleh `AppShell`.

![alt text](../jobsheet-03/my-app/public/image-33.png)


![alt text](../jobsheet-03/my-app/public/image-34.png)

Hasil: 
- Navbar muncul di semua halaman
- Footer muncul di semua halaman

------------------------------------------------------------------------

# E. Tugas Praktikum

## 📝 Tugas 1 -- Routing

-   Buat halaman `/profile`
-   Buat halaman `/profile/edit`
-   Pastikan routing berjalan tanpa error

Jawaban:
- Kode:
  - \profile\index.tsx
 
    ![alt text](../jobsheet-03/my-app/public/image-37.png)

  - \profile\edit\index.tsx
    
    ![alt text](../jobsheet-03/my-app/public/image-35.png)
 
- Struktur:
 
  ![alt text](../jobsheet-03/my-app/public/image-36.png)

- Output:

  ![alt text](../jobsheet-03/my-app/public/image-38.png)
  ![alt text](../jobsheet-03/my-app/public/image-39.png)



------------------------------------------------------------------------

## 📝 Tugas 2 -- Dynamic Routing

-   Buat routing `/blog/[slug]`
-   Tampilkan nilai slug di halaman

Jawaban:
- Kode:
  - \blog\index.tsx

    ![alt text](../jobsheet-03/my-app/public/image-40.png)
 
  - \blog/[slug].tsx

    ![alt text](../jobsheet-03/my-app/public/image-41.png)
 
- Struktur:

  ![alt text](../jobsheet-03/my-app/public/image-42.png)
 
- Output:

  ![alt text](../jobsheet-03/my-app/public/image-43.png)
  ![alt text](../jobsheet-03/my-app/public/image-44.png)


------------------------------------------------------------------------

## 📝 Tugas 3 -- Layout

-   Tambahkan Footer pada AppShell
-   Pastikan Footer tampil di semua halaman

Jawaban:
- Kode:
  - \AppShell\index.tsx

    ![alt text](../jobsheet-03/my-app/public/image-45.png)
 
  - \footer\index.tsx

    ![alt text](../jobsheet-03/my-app/public/image-46.png)
 
  - \globals.css

    ![alt text](../jobsheet-03/my-app/public/image-47.png)


- Struktur:

  ![alt text](../jobsheet-03/my-app/public/image-48.png)
 
- Output:

  ![alt text](../jobsheet-03/my-app/public/image-49.png)
  ![alt text](../jobsheet-03/my-app/public/image-50.png)


------------------------------------------------------------------------

# F. Pertanyaan Refleksi

### 1. Apa perbedaan routing berbasis file dan routing manual?

Routing berbasis file otomatis dibuat berdasarkan struktur folder dan
nama file, sedangkan routing manual memerlukan konfigurasi eksplisit
seperti pada React Router.

### 2. Mengapa dynamic routing penting dalam aplikasi web?

Dynamic routing memungkinkan halaman dibuat berdasarkan parameter URL
sehingga cocok untuk data dinamis seperti blog, produk, atau profil.

### 3. Apa keuntungan menggunakan layout global dibanding memanggil komponen satu per satu?

Layout global membuat komponen seperti Navbar dan Footer otomatis muncul
di semua halaman sehingga lebih efisien dan mudah dikelola.

------------------------------------------------------------------------

# G. Kesimpulan

Melalui praktikum ini, mahasiswa memahami konsep routing statis, nested
routing, dynamic routing, serta implementasi layout global pada Next.js
menggunakan Pages Router.

Next.js mempermudah pengelolaan routing tanpa konfigurasi manual dan
mendukung pengembangan aplikasi web yang lebih terstruktur.
