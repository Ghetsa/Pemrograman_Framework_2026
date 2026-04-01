# PEMROGRAMAN BERBASIS FRAMEWORK

## JOBSHEET 19

### Implementasi Unit Testing pada Next.js menggunakan Jest

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

1. Memahami konsep dasar Unit Testing pada aplikasi web.
2. Menginstal dan mengkonfigurasi Jest di lingkungan Next.js.
3. Menggunakan React Testing Library untuk pengujian komponen.
4. Membuat file testing dengan ekstensi `.spec.tsx` atau `.test.tsx`.
5. Menguji fungsionalitas komponen dan halaman (pages).
6. Menghasilkan laporan code coverage.
7. Melakukan mocking pada Next Router untuk pengujian navigasi.

---

# B. Dasar Teori Singkat

## 1️⃣ Apa itu Unit Testing?

Unit Testing adalah proses pengujian bagian terkecil dari sebuah aplikasi secara terisolasi. Unit yang diuji bisa berupa fungsi, library, komponen UI, hingga satu halaman utuh.

Tujuan utama Unit Testing adalah:
* Mencegah munculnya bug baru saat melakukan perubahan kode (regression).
* Menjamin stabilitas kode sebelum masuk ke tahap production.
* Meningkatkan kualitas kode sesuai standar industri (biasanya mensyaratkan >80% coverage).

## 2️⃣ Library Pengujian

Dalam praktikum ini, kita menggunakan dua library utama:
* **Jest:** Test runner yang berfungsi menjalankan skrip pengujian dan memberikan laporan hasil.
* **React Testing Library (RTL):** Library untuk menguji komponen React dengan cara yang mirip dengan bagaimana pengguna berinteraksi dengan aplikasi.

---

# C. Langkah Kerja Praktikum

---

## Bagian 1 – Setup Jest di Next.js

### 1️⃣ Instalasi Dependencies

Jalankan perintah berikut di terminal untuk menginstal Jest dan React Testing Library:

```bash
npm install jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom --save-dev --force
```

---

### 2️⃣ Membuat File Konfigurasi `jest.config.mjs`

Buat file baru di root project dengan nama `jest.config.mjs` dan tambahkan konfigurasi berikut:

```javascript
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
}

export default createJestConfig(config)
```

---

### 3️⃣ Membuat File `jest.setup.ts`

Buat file `jest.setup.ts` di root project untuk mengimpor matcher tambahan dari jest-dom:

```typescript
import '@testing-library/jest-dom'
```

---

### 4️⃣ Konfigurasi Script pada `package.json`

Tambahkan perintah berikut pada bagian `scripts` di file `package.json`:

```json
"scripts": {
  "test": "jest",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

---

## Bagian 2 – Membuat Unit Test Pertama

### 1️⃣ Membuat Folder Testing

Buat folder baru dengan nama `__tests__` di dalam direktori `src` atau di root project.

---

### 2️⃣ Membuat Test untuk Halaman 404

Buat file `src/__tests__/404.spec.tsx` dan tambahkan kode pengujian untuk mengecek apakah judul halaman 404 muncul:

```tsx
import { render, screen } from "@testing-library/react";
import Custom404 from "@/pages/404";

describe("Halaman 404", () => {
  it("Harus menampilkan teks 'Halaman Tidak Ditemukan'", () => {
    render(<Custom404 />);
    const title = screen.getByText(/Halaman Tidak Ditemukan/i);
    expect(title).toBeInTheDocument();
  });
});
```

---

## Bagian 3 – Mocking Next Router

### 1️⃣ Menangani Error `useRouter`

Saat menguji komponen yang menggunakan `useRouter`, kita perlu melakukan mocking agar pengujian tidak error. Tambahkan kode berikut di awal file test yang membutuhkan router:

```tsx
jest.mock("next/router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    pathname: "/",
    query: {},
  })),
}));
```

---

## Bagian 4 – Menjalankan Testing dan Coverage

### 1️⃣ Menjalankan Test

Buka terminal dan jalankan perintah:

```bash
npm run test
```

Jika berhasil, Jest akan menampilkan status **PASS** pada file yang diuji.

---

### 2️⃣ Melihat Laporan Coverage

Jalankan perintah berikut untuk melihat seberapa banyak kode yang sudah tercover oleh unit test:

```bash
npm run test:coverage
```

Hasilnya akan muncul dalam bentuk tabel yang mencakup % Statements, % Branch, % Functions, dan % Lines.

---

# D. Pengujian

## Uji 1 – Menjalankan Test Case

Aksi:
* Menjalankan `npm run test`

Hasil:
* Terminal menunjukkan "Test Suites: 1 passed, 1 total"
* Semua ekspektasi (`expect`) terpenuhi.

---

## Uji 2 – Laporan Coverage

Aksi:
* Menjalankan `npm run test:coverage`

Hasil:
* Folder `coverage/` akan terbentuk secara otomatis.
* Muncul tabel metrik di terminal yang menunjukkan persentase cakupan kode.

---

# E. Analisis Coverage

Dalam industri perangkat lunak, standar minimal coverage biasanya adalah:
* **≥ 80%:** Dianggap aman untuk masuk ke tahap production.
* **< 80%:** Memerlukan penambahan test case pada bagian yang belum teruji (uncovered lines).

Tantangan terbesar biasanya terletak pada **Branch Coverage**, karena kita harus menguji semua kondisi `if/else` dan `switch case` yang mungkin terjadi dalam logika aplikasi.

---

# F. Tugas Praktikum

1. **Unit Test Halaman Product:** Buat file test untuk menguji apakah daftar produk berhasil dirender di UI.
2. **Snapshot Testing:** Gunakan `expect(view).toMatchSnapshot()` untuk memastikan UI tidak berubah secara tidak sengaja.
3. **Mocking Fungsi:** Lakukan mocking pada fungsi API call menggunakan `jest.fn()`.
4. **Target Coverage:** Pastikan minimal coverage mencapai 50% untuk seluruh aplikasi.
5. **Dokumentasi:** Sertakan screenshot hasil `test:coverage` yang menunjukkan persentase keberhasilan.

---

# G. Pertanyaan Analisis

### 1. Mengapa unit testing penting sebelum production?
Untuk mendeteksi bug sedini mungkin dan memastikan bahwa fitur baru yang ditambahkan tidak merusak fitur lama yang sudah berjalan dengan baik.

### 2. Mengapa branch coverage sulit mencapai 100%?
Karena dalam aplikasi yang kompleks, terdapat banyak kombinasi kondisi logika dan penanganan error (error handling) yang sulit untuk disimulasikan secara sempurna dalam lingkungan testing.

### 3. Apa kegunaan `jest.mock`?
Digunakan untuk menggantikan modul asli (seperti library navigasi atau API) dengan versi tiruan. Hal ini memungkinkan kita menguji komponen tanpa harus bergantung pada fungsionalitas eksternal yang kompleks.

### 4. Apa perbedaan `getByText` dan `queryByText`?
`getByText` akan melempar error jika elemen tidak ditemukan, sedangkan `queryByText` akan mengembalikan nilai `null`. `queryByText` sangat berguna untuk menguji elemen yang seharusnya *tidak* muncul di UI.

---

# H. Output yang Diharapkan

Mahasiswa menghasilkan:
* Konfigurasi Jest yang berjalan dengan benar.
* Skrip testing yang mampu memvalidasi elemen UI.
* Laporan coverage yang menunjukkan detail baris kode yang sudah diuji.
* Dokumentasi hasil pengujian yang lulus (Pass).

---

# I. Kesimpulan

Pada praktikum ini telah dipelajari:
* Cara mengintegrasikan Jest dan React Testing Library ke dalam project Next.js.
* Pentingnya melakukan mocking pada modul Next.js seperti `useRouter`.
* Cara membaca dan menganalisis laporan coverage untuk menentukan kualitas pengujian.
* Teknik penulisan test case yang efektif menggunakan matcher seperti `toBeInTheDocument()`.

Unit testing merupakan investasi penting dalam pengembangan perangkat lunak skala besar untuk menjaga integritas kode dan memudahkan proses kolaborasi tim.