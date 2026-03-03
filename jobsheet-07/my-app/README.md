# PEMROGRAMAN BERBASIS FRAMEWORK

## JOBSHEET 07

### API Routes pada Next.js dan Integrasi Firebase (Fullstack Next.js)

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

1. Memahami konsep API Routes pada Next.js
2. Membuat API sederhana menggunakan Next.js
3. Mengirim response JSON dengan status code
4. Mengambil data API di sisi frontend menggunakan `fetch`
5. Mengintegrasikan Firebase Firestore sebagai database
6. Mengelola environment variable (`.env.local`)
7. Menampilkan data dinamis dari database ke halaman web

---

# B. Dasar Teori Singkat

## 1️⃣ API Routes pada Next.js

Next.js tidak hanya berfungsi sebagai frontend framework, tetapi juga dapat bertindak sebagai backend melalui API Routes.

Struktur folder:

```
pages/api/
```

Contoh:

```
pages/api/produk.js
```

Endpoint dapat diakses melalui:

```
http://localhost:3000/api/produk
```

---

## 2️⃣ Firebase Firestore

Firebase adalah layanan backend dari Google yang menyediakan:

* Database (Firestore)
* Authentication
* Storage

Firestore bersifat NoSQL dan cocok untuk aplikasi modern berbasis web.

---

# C. Alat dan Bahan

## Perangkat Lunak

* Node.js (LTS)
* NPM
* Visual Studio Code
* Browser
* Akun Google (untuk Firebase)

## Prasyarat

* Project Next.js (Pages Router) sudah tersedia
* Aplikasi dapat dijalankan (`npm run dev`)

---

# D. Langkah Kerja Praktikum

---

## Langkah 1 – Menjalankan Project

```bash
npm run dev
```

Akses:

```
http://localhost:3000
```

---

## Langkah 2 – Membuat API Produk (Data Statis)

### 1️⃣ Buat file:

```
pages/api/produk.js
```

### 2️⃣ Tambahkan kode:

```js
export default function handler(req, res) {
  const data = [
    {
      id: "1",
      nama: "Kaos Polos",
      harga: 10000,
      ukuran: "L",
      warna: "merah",
    },
    {
      id: "2",
      nama: "Kaos Berlengan Panjang",
      harga: 15000,
      ukuran: "M",
      warna: "biru",
    },
  ];

  res.status(200).json({
    status: true,
    status_code: 200,
    data: data,
  });
}
```

### 3️⃣ Uji endpoint:

```
http://localhost:3000/api/produk
```

Response JSON akan tampil di browser.


![alt text](/jobsheet-07/my-app/public/img/js07/image.png)

---

## Langkah 3 – Fetch Data API di Frontend

### 1️⃣ Buka:

```
pages/produk/index.tsx
```

### 2️⃣ Modifikasi kode

* Tambahkan `useEffect()`
* Comment sementara useEffect untuk `isLogin`

```tsx
useEffect(() => {
  fetch("/api/produk")
    .then((res) => res.json())
    .then((data) => setProducts(data.data))
    .catch((err) => console.error(err));
}, []);
```

Kode:

![alt text](/jobsheet-07/my-app/public/img/js07/image-1.png)

### 3️⃣ Jalankan:

```
http://localhost:3000/produk
```

Data dari API akan tampil di halaman produk.

![alt text](/jobsheet-07/my-app/public/img/js07/image-3.png)

---

# E. Integrasi Firebase

---

## Langkah 4 – Setup Firebase

1. Buka Firebase Console
2. Buat project baru
![alt text](/jobsheet-07/my-app/public/img/js07/image-4.png)<br>

3. Disable Google Analytics
![alt text](/jobsheet-07/my-app/public/img/js07/image-5.png)<br>
4. Klik Add App → Pilih Web
5. Register App
6. Continue to Console
![alt text](/jobsheet-07/my-app/public/img/js07/image-6.png)




---

## Langkah 5 – Aktifkan Firestore

1. Klik **Firestore Database**
![alt text](/jobsheet-07/my-app/public/img/js07/image-7.png)
2. Klik **Create Database**
![alt text](/jobsheet-07/my-app/public/img/js07/image-8.png)
3. Ubah rules menjadi `true`
![alt text](/jobsheet-07/my-app/public/img/js07/image-9.png)
4. Klik **Publish**


### – Buat Collection

1. Buat collection bernama:

```
products
```
![alt text](/jobsheet-07/my-app/public/img/js07/image-10.png)
2. Gunakan **Auto-ID**
3. Tambahkan field:

* name (string)
* price (number)
* size (string)

![alt text](/jobsheet-07/my-app/public/img/js07/image-11.png)

---

## Langkah 6 – Install dan Konfigurasi Firebase

```bash
npm install firebase
```

![alt text](/jobsheet-07/my-app/public/img/js07/image-12.png)


### Buat file:

```
src/utils/db/firebase.ts
```

![alt text](/jobsheet-07/my-app/public/img/js07/image-13.png)<br>
![alt text](/jobsheet-07/my-app/public/img/js07/image-16.png)

## Langkah 7 – Konfigurasi Environment Variable
### Buat file environment:

```
.env.local
```

![alt text](/jobsheet-07/my-app/public/img/js07/image-15.png)

Isi:

```
FIREBASE_API_KEY=xxxx
FIREBASE_AUTH_DOMAIN=xxxx
FIREBASE_PROJECT_ID=xxxx
FIREBASE_STORAGE_BUCKET=xxxx
FIREBASE_MESSAGING_SENDER_ID=xxxx
FIREBASE_APP_ID=xxxx
```

⚠ Tanpa tanda petik dan tanpa koma.

---


## Langkah 8 –  Konfigurasi Firebase

### Modifikasi firebase.ts

```
const firebaseConfig = { 
  apiKey: process.env.FIREBASE_API_KEY, 
  authDomain: process.env.FIREBASE_AUTH_DOMAIN, 
  projectId: process.env.FIREBASE_PROJECT_ID, 
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET, 
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID, 
  appId: process.env.FIREBASE_APP_ID 
};
```


---


## Langkah 9 – Ambil Data dari Firestore

### Buat file:

```
src/utils/db/servicefirebase.js
```

```js
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

export async function retrieveData(collectionName) {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
```

---

## Langkah 10 – API Mengambil Data Firebase

Edit:

```
pages/api/produk.js
```

```js
import { retrieveData } from "@/utils/db/servicefirebase";

export default async function handler(req, res) {
  const data = await retrieveData("products");

  res.status(200).json({
    status: true,
    status_code: 200,
    data: data,
  });
}
```

Akses:

```
http://localhost:3000/api/produk
```

![alt text](/jobsheet-07/my-app/public/img/js07/image-17.png)

Sekarang data berasal dari Firestore (data dinamis).

---

# F. Tugas Praktikum

## Tugas 1 (Wajib)

* Tambahkan minimal 3 data produk di Firestore
![alt text](/jobsheet-07/my-app/public/img/js07/image-18.png)


* Pastikan data tampil di halaman produk
![alt text](/jobsheet-07/my-app/public/img/js07/image-19.png)

---

## Tugas 2 (Wajib)

* Tambahkan field baru:

```
category
```

![alt text](/jobsheet-07/my-app/public/img/js07/image-22.png)

* Tampilkan `category` di frontend

Modifikasi tipe data dan tampilan di `pages/produk/index.tsx`.

![alt text](/jobsheet-07/my-app/public/img/js07/image-21.png)

![alt text](/jobsheet-07/my-app/public/img/js07/image-20.png)

---

## Tugas 3 (Pengayaan)

Tambahkan tombol:

```tsx
<button onClick={fetchData}>Refresh Data</button>
```

Gunakan fetch ulang tanpa reload halaman.

![alt text](/jobsheet-07/my-app/public/img/js07/image-23.png)

![alt text](/jobsheet-07/my-app/public/img/js07/image-24.png)

---

# G. Pertanyaan Evaluasi

### 1. Apa fungsi API Routes pada Next.js?

API Routes memungkinkan Next.js berfungsi sebagai backend untuk membuat endpoint API tanpa perlu server terpisah.

---

### 2. Mengapa `.env.local` tidak boleh di-push ke repository?

Karena file tersebut berisi kredensial sensitif seperti API key dan konfigurasi database.

---

### 3. Apa perbedaan data statis dan data dinamis?

Data statis ditulis langsung di dalam kode, sedangkan data dinamis berasal dari database atau API dan dapat berubah tanpa mengubah source code.

---

### 4. Mengapa Next.js disebut framework fullstack?

Karena Next.js dapat menangani frontend dan backend dalam satu framework, termasuk rendering UI dan pembuatan API.

---

# H. Kesimpulan

Pada praktikum ini telah dipelajari:

* Pembuatan API Routes pada Next.js
* Fetch data dari API ke frontend
* Integrasi Firebase Firestore sebagai database
* Penggunaan environment variable untuk keamanan
* Pengelolaan data dinamis dalam aplikasi

Dengan API Routes dan Firebase, Next.js dapat berfungsi sebagai framework fullstack yang memungkinkan pengembangan aplikasi web secara terintegrasi dan efisien.
