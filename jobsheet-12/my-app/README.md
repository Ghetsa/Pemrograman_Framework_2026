# PEMROGRAMAN BERBASIS FRAMEWORK

## JOBSHEET 12

### Incremental Static Regeneration (ISR) pada Next.js

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

1. Menjelaskan konsep Incremental Static Regeneration (ISR).
2. Mengimplementasikan `revalidate` pada `getStaticProps`.
3. Menguji pembaruan halaman tanpa build ulang.
4. Membuat endpoint On-Demand Revalidation.
5. Mengamankan endpoint revalidation dengan token. 

---

# B. Dasar Teori Singkat

## 1️⃣ Masalah Static Site Generation (SSG)

Pada SSG:

* Data hanya diambil saat build
* Perubahan database tidak langsung tampil
* Harus melakukan `npm run build` ulang

---

## 2️⃣ Incremental Static Regeneration (ISR)

ISR memungkinkan:

* Halaman tetap static
* Namun dapat diperbarui setelah waktu tertentu
* Tanpa perlu rebuild aplikasi

Alur ISR:

```text
User request
↓
Serve cached static page
↓
Setelah waktu revalidate habis
↓
Next.js fetch ulang data di background
↓
Cache diperbarui
↓
Halaman kembali static
```

ISR menjadi solusi ketika ingin mempertahankan performa halaman static, tetapi tetap membutuhkan pembaruan data secara berkala. 

---

# C. Langkah Kerja Praktikum

---

## Bagian 1 – Implementasi ISR Otomatis

### Langkah 1 – Tambahkan `revalidate`

Buka file:

```tsx
src/pages/produk/static/index.tsx
```

Modifikasi `getStaticProps` dengan menambahkan `revalidate`:

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

export async function getStaticProps() {
  const res = await fetch("http://127.0.0.1:3000/api/produk");
  const response: { data: ProductType[] } = await res.json();

  return {
    props: {
      products: response.data,
    },
    revalidate: 10,
  };
}
```

Arti dari konfigurasi tersebut:

* Setiap 10 detik halaman akan dicek ulang
* Jika ada perubahan data, cache akan diperbarui

---

## Bagian 2 – Pengujian ISR

### Langkah 1 – Jalankan build dan start

Lakukan proses seperti pada jobsheet SSG sebelumnya.

Jalankan:

```bash
npm run build
npm run start
```

Jika build berhasil, route halaman static akan memiliki informasi `revalidate` pada hasil build. 

![alt text](/jobsheet-12/my-app/public/img/laporan/image.png)

---

### Langkah 2 – Tambahkan data baru di Firebase

Buka Firebase Firestore, lalu tambahkan produk baru pada collection `products`.

![alt text](/jobsheet-12/my-app/public/img/laporan/image-1.png)

---

### Langkah 3 – Refresh halaman sebelum 10 detik

Buka halaman static:

```text
http://localhost:3000/produk/static
```

Jika halaman direfresh sebelum 10 detik, maka yang tampil masih **data lama**.

![alt text](/jobsheet-12/my-app/public/img/laporan/image-2.png)
---

### Langkah 4 – Refresh halaman setelah 10 detik

Setelah melewati 10 detik, refresh kembali halaman static.

Hasilnya:

![alt text](/jobsheet-12/my-app/public/img/laporan/image-3.png)

* Data baru akan muncul
* Cache static telah diperbarui otomatis

Hal ini membuktikan bahwa ISR dapat memperbarui halaman tanpa perlu build ulang. 

---

# D. On-Demand Revalidation

Jika tidak ingin menunggu waktu `revalidate`, dapat digunakan endpoint khusus untuk memicu revalidation secara manual.

---

## Bagian 1 – Buat API Revalidate

### Langkah 1 – Buat file baru

Buat file:

```tsx
pages/api/revalidate.ts
```

### Langkah 2 – Modifikasi file `revalidate.ts`

```tsx
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  revalidated: boolean;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  try {
    await res.revalidate("/produk/static");
    return res.status(200).json({ revalidated: true });
  } catch (error) {
    console.error("Error in API route:", error);
    res.status(500).end({ revalidated: false } as any);
  }
}
```

Endpoint ini digunakan untuk memicu revalidation halaman static secara manual. 

---

## Bagian 2 – Tambahkan Parameter Data

Pada implementasi awal masih ada kekurangan, yaitu ketika salah satu data dihapus maka halaman tidak langsung terupdate secara tepat. Untuk mengatasinya, ditambahkan kondisi query parameter pada endpoint revalidate.

### Langkah 1 – Modifikasi file `revalidate.ts`

```tsx
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  revalidated: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.query.data === "produk") {
    try {
      await res.revalidate("/produk/static");
      return res.status(200).json({ revalidated: true });
    } catch (error) {
      console.error("Error in API route:", error);
      res.status(500).end({ revalidated: false } as any);
    }
  }

  return res.json({
    revalidated: false,
    message: "Invalid query parameter. Expected 'data=produk'.",
  });
}
```

---

### Langkah 2 – Uji endpoint dengan parameter

Akses URL berikut:

```text
http://localhost:3000/api/revalidate?data=produk
```

Hasil:

```json
{
  "revalidated": true
}
```

![alt text](/jobsheet-12/my-app/public/img/laporan/image-4.png)

Jika parameter salah atau kosong, hasil yang muncul adalah:

```text
http://localhost:3000/api/revalidate?data=
```

Response:

```json
{
  "revalidated": false,
  "message": "Invalid query parameter. Expected 'data=produk'."
}
```

![alt text](/jobsheet-12/my-app/public/img/laporan/image-5.png)

---

## Bagian 3 – Tambahkan Token Security

Agar endpoint revalidation tidak dapat digunakan sembarang orang melalui URL, perlu ditambahkan validasi token.

### Langkah 1 – Modifikasi file `.env`

Tambahkan variabel baru:

```env
REVALIDATE_TOKEN=12345678
```

---

### Langkah 2 – Modifikasi file `revalidate.ts`

Tambahkan validasi token pada handler:

```tsx
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  revalidated: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.query.token !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({
      revalidated: false,
      message: "Insert correct token",
    });
  }

  if (req.query.data === "produk") {
    try {
      await res.revalidate("/produk/static");
      return res.status(200).json({ revalidated: true });
    } catch (error) {
      console.error("Error in API route:", error);
      res.status(500).end({ revalidated: false } as any);
    }
  }

  return res.json({
    revalidated: false,
    message: "Invalid query parameter. Expected 'data=produk'.",
  });
}
```

Dengan validasi ini, endpoint revalidation menjadi lebih aman. 

---

# E. Pengujian Manual Revalidation

Akses endpoint berikut:

```text
http://localhost:3000/api/revalidate?data=produk&token=12345678
```

Jika token benar, hasilnya:

```json
{
  "revalidated": true
}
```

![alt text](/jobsheet-12/my-app/public/img/laporan/image-6.png)

Jika token salah:

```text
http://localhost:3000/api/revalidate?data=produk&token=123
```

Hasil:

```json
{
  "revalidated": false,
  "message": "Insert correct token"
}
```

![alt text](/jobsheet-12/my-app/public/img/laporan/image-7.png)

Lakukan juga pengujian:

* Token benar

![alt text](/jobsheet-12/my-app/public/img/laporan/image-8.png)

* Token salah

![alt text](/jobsheet-12/my-app/public/img/laporan/image-9.png)

* Tanpa token

![alt text](/jobsheet-12/my-app/public/img/laporan/image-10.png)

---

# F. Perbandingan SSG vs ISR

| Aspek       | SSG               | ISR                 |
| ----------- | ----------------- | ------------------- |
| Update Data | Harus build ulang | Otomatis / Trigger  |
| Cache       | Static permanen   | Static + Refresh    |
| Cocok untuk | Konten tetap      | Konten semi-dinamis |

Tabel ini menunjukkan bahwa ISR lebih fleksibel dibandingkan SSG murni karena dapat memperbarui data tanpa rebuild penuh. 

---

# G. Tugas Praktikum

## Tugas Individu

1. Tambahkan lagi produk pada Firebase.
![alt text](/jobsheet-12/my-app/public/img/laporan/image-1.png)

2. Implementasikan ISR dengan `revalidate: 10`.
![alt text](/jobsheet-12/my-app/public/img/laporan/image-11.png)

3. Tambahkan endpoint On-Demand Revalidation.
![alt text](/jobsheet-12/my-app/public/img/laporan/image-12.png)

4. Tambahkan validasi token.
![alt text](/jobsheet-12/my-app/public/img/laporan/image-13.png)

5. Uji dengan:

   * Token benar
  ![alt text](/jobsheet-12/my-app/public/img/laporan/image-14.png)

   * Token salah
  ![alt text](/jobsheet-12/my-app/public/img/laporan/image-15.png)

   * Tanpa token
  ![alt text](/jobsheet-12/my-app/public/img/laporan/image-15.png)

---

# H. Pertanyaan Analisis

### 1. Mengapa ISR lebih fleksibel dibanding SSG?

Karena ISR tetap menggunakan halaman static, tetapi dapat memperbarui data secara otomatis atau melalui trigger tanpa perlu build ulang aplikasi.

### 2. Apa perbedaan revalidate waktu dan on-demand?

`revalidate` waktu akan memperbarui cache setelah interval tertentu, sedangkan on-demand revalidation dijalankan secara manual melalui endpoint khusus saat dibutuhkan.

### 3. Mengapa endpoint revalidation harus diamankan?

Karena jika tidak diamankan, siapa pun dapat mengakses URL revalidation dan memicu pembaruan cache secara sembarangan.

### 4. Apa risiko jika token tidak digunakan?

Risikonya adalah endpoint bisa disalahgunakan oleh pihak lain, sehingga cache dapat di-refresh tanpa kontrol dan berpotensi mengganggu aplikasi.

### 5. Kapan ISR lebih cocok dibanding SSR?

ISR lebih cocok ketika halaman tetap ingin cepat seperti static page, tetapi data masih perlu diperbarui secara berkala tanpa harus merender ulang di setiap request seperti SSR.

---

# I. Kesimpulan

Pada praktikum ini telah dipelajari:

* Konsep Incremental Static Regeneration (ISR)
* Implementasi `revalidate` pada `getStaticProps`
* Pengujian pembaruan data tanpa build ulang
* Pembuatan endpoint On-Demand Revalidation
* Pengamanan endpoint dengan token

ISR merupakan pengembangan dari SSG yang lebih fleksibel karena halaman static dapat diperbarui secara otomatis maupun manual tanpa harus melakukan build ulang aplikasi. Pendekatan ini sangat cocok untuk halaman yang bersifat semi-dinamis dan tetap membutuhkan performa tinggi.
