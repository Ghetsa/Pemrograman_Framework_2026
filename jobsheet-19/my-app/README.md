
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

1. Memahami konsep dasar Unit Testing
2. Menginstal dan mengkonfigurasi Jest di Next.js
3. Menggunakan React Testing Library
4. Membuat file testing (.spec / .test)
5. Menguji komponen dan halaman (pages)
6. Menghasilkan laporan coverage
7. Melakukan mocking pada Next Router
8. Menganalisis error melalui testing

---

# B. Dasar Teori Singkat

## 1️⃣ Pengertian Unit Testing

Unit Testing adalah proses pengujian Praktikum kecil dari aplikasi (unit), seperti:

* Component
* Pages
* Function
* Library

Tujuan utama:

* Mencegah bug
* Menjamin stabilitas kode
* Meningkatkan kualitas aplikasi
* Memenuhi standar industri (≥ 80% coverage)

---

## 2️⃣ Coverage Testing

Coverage digunakan untuk mengukur seberapa banyak kode yang sudah diuji, meliputi:

* Statements
* Branch
* Function
* Lines

Standar industri:

* ≥ 80% → Layak production
* < 80% → Perlu perbaikan

---

# C. Langkah Kerja Praktikum

---

## Praktikum 1 – Setup Jest di Next.js

### 1️⃣ Install Dependencies

Jalankan perintah berikut:

```bash
npm install jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom --save-dev --force
```

![alt text](/jobsheet-19/my-app/public/img/laporan/image.png)

---

### 2️⃣ Membuat File Konfigurasi Jest

Buat file:

```text
jest.config.mjs
```

Isi konfigurasi dasar:

```js
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

const config = {
  testEnvironment: 'jest-environment-jsdom',
};

export default createJestConfig(config);
```

---

### 3️⃣ Menambahkan Script pada package.json

```json
"scripts": {
  "test": "jest --passWithNoTests -u",
  "test:coverage": "npm run test -- --coverage",
  "test:watch": "jest --watch"
}
```

![alt text](/jobsheet-19/my-app/public/img/laporan/image-1.png)

---

## Praktikum 2 – Struktur Folder Testing

### 1️⃣ Membuat Folder Testing

Buat folder:

```text
src/__test__/
```

Struktur folder:

```text
src
├── pages
├── components
├── views
└── __test__
    ├── pages
    └── components
```

![alt text](/jobsheet-19/my-app/public/img/laporan/image-2.png)

---

## Praktikum 3 – Testing Halaman About

### 1️⃣ Membuat File Testing

```text
src/__test__/pages/about.spec.tsx
```

---

### 2️⃣ Menambahkan Testing Snapshot

```tsx
import { render } from "@testing-library/react"
import AboutPage from "@/pages/about"

describe("About Page", () => {
  it("renders about page correctly", () => {
    const page = render(<AboutPage />)
    expect(page).toMatchSnapshot()
  })
})
```
---

#### Jika terjadi error

1. Instal Type Definitions 
```tsx
npm install --save-dev @types/jest
```

![alt text](/jobsheet-19/my-app/public/img/laporan/image-3.png)


2. Update Konfigurasi tsconfig.json
```tsx
{
  "compilerOptions": {
    "types": ["node", "jest"] 
  }
}
```

---

### 3️⃣ Menjalankan Testing

```bash
npm run test
```

Hasil:

```text
PASS about.spec.tsx
```

![alt text](/jobsheet-19/my-app/public/img/laporan/image-4.png)

---

## Praktikum 4 – Coverage Report

### 1️⃣ Menjalankan Coverage

```bash
npm run test:coverage
```

![alt text](/jobsheet-19/my-app/public/img/laporan/image-5.png)

---

### 2️⃣ Hasil

Akan muncul folder:

```text
coverage/
```

Buka:

```text
coverage/lcov-report/index.html
```

![alt text](/jobsheet-19/my-app/public/img/laporan/image-6.png)

![alt text](/jobsheet-19/my-app/public/img/laporan/image-7.png)

---

## Praktikum 5 – Konfigurasi Coverage Lengkap

### 1️⃣ Modifikasi jest.config.mjs

Tambahkan:

```js
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  dir: './',
})

const config = {
  testEnvironment: "jsdom",
  modulePaths: ['<rootDir>/src/'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/jest.config.mjs',
    '!**/next.config.mjs',
    '!**/types/**',
    '!**/views/**',
    '!**/pages/api/**'
  ],
}

export default createJestConfig(config)
```

---

### 2️⃣ Jalankan Ulang

```bash
npm run test:coverage
```

![alt text](/jobsheet-19/my-app/public/img/laporan/image-8.png)

![alt text](/jobsheet-19/my-app/public/img/laporan/image-9.png)

---

## Praktikum 6 – Testing dengan getByTestId

### 1️⃣ Modifikasi Halaman About

Tambahkan:

```tsx
<h1 data-testid="title">About Page</h1>
```

![alt text](/jobsheet-19/my-app/public/img/laporan/image-10.png)

---

### 2️⃣ Update Testing

```tsx
import { render, screen } from "@testing-library/react"
import AboutPage from "@/pages/about"

describe("About Page", () => {
  it("renders about page correctly", () => {
    const page = render(<AboutPage />)
    expect(screen.getByTestId("title").textContent).toBe("About Page")
    expect(page).toMatchSnapshot()
  })
})
```

![alt text](/jobsheet-19/my-app/public/img/laporan/image-11.png)

---

### 3️⃣ Pengujian Error

Jika diubah menjadi:

```tsx
toBe("About")
```

Hasil:

```text
FAIL
Expected: "About"
Received: "About Page"
```

![alt text](/jobsheet-19/my-app/public/img/laporan/image-12.png)

![alt text](/jobsheet-19/my-app/public/img/laporan/image-13.png)

---

## Praktikum 7 – Testing Page dengan Router (Mocking)

### 1️⃣ Membuat File Testing Product

```js
import { render, screen } from "@testing-library/react"
import TampilanProduk from "@/pages/produk"

describe("Product Page", () => {
  it("renders product page correctly", () => {
    const page = render(<TampilanProduk />)
    expect(screen.getByTestId("title").textContent).toBe("Product Page")
    expect(page).toMatchSnapshot()
  })
})
```



---

### 2️⃣ Error yang Terjadi

```text
NextRouter was not mounted
```

![alt text](/jobsheet-19/my-app/public/img/laporan/image-14.png)

---

### 3️⃣ Solusi Mock Router

Tambahkan kode berikut:

```tsx
jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: jest.fn(),
      prefetch: jest.fn(),
    };
  },
}));
```

---

## Praktikum 8 – Menangani Undefined Data

### 1️⃣ Error

```text
Cannot read properties of undefined
```

 Praktikum 8 – Menangani Undefined Data

---

### 2️⃣ Perbaikan pada Komponen

Contoh:

```tsx
{data && data.name}
```

atau

```tsx
data?.name
```

---

### 3️⃣ Jalankan Ulang

```bash
npm run test:coverage
```

---

## Analisis Coverage

Hasil:

![alt text](/jobsheet-19/my-app/public/img/laporan/image-15.png)

![alt text](/jobsheet-19/my-app/public/img/laporan/image-16.png)

![alt text](/jobsheet-19/my-app/public/img/laporan/image-17.png)

Catatan:

* Branch paling sulit karena harus menguji kondisi if/else

---

# D. Struktur Testing

Struktur final:

```text
src/__test__/
├── pages
│   ├── about.spec.tsx
│   └── product.spec.tsx
└── components
```

---

# F. Tugas Praktikum

1. Membuat unit test untuk:

   * Halaman Product
   * 1 Komponen

2. Menggunakan:

   * Snapshot test
   * toBe()
   * getByTestId()

3. Coverage minimal 50%

4. Mocking router

5. Dokumentasi hasil coverage


## Hasil

1. **Unit Test Halaman Product**

   * Membuat unit test untuk halaman Product pada file `src/__test__/pages/product.spec.tsx`
   * Test menggunakan snapshot, `toBe()`, dan `getByTestId()`

   Screenshot kode unit test halaman Product
   ![alt text](/jobsheet-19/my-app/public/img/laporan/image-23.png)

   Screenshot hasil test di terminal (Product Page PASS)
    ![alt text](/jobsheet-19/my-app/public/img/laporan/image-19.png)

2. **Unit Test Komponen**

   * Membuat unit test untuk komponen `Navbar` pada file `src/__test__/components/navbar.spec.tsx`
   * Test memastikan komponen menampilkan title dan item produk menggunakan `getByTestId()` dan `toBe()`

   Screenshot kode unit test komponen
  ![alt text](/jobsheet-19/my-app/public/img/laporan/image-32.png)

   Screenshot hasil test komponen di terminal
   ![alt text](/jobsheet-19/my-app/public/img/laporan/image-33.png)

3. **Penggunaan Snapshot Test**

   * Snapshot test digunakan untuk memastikan tampilan komponen tidak berubah secara tidak sengaja
   * Snapshot dibuat otomatis oleh Jest pada saat test dijalankan

   Screenshot file snapshot yang dihasilkan
   ![alt text](/jobsheet-19/my-app/public/img/laporan/image-26.png)

   ![alt text](/jobsheet-19/my-app/public/img/laporan/image-27.png)


4. **Penggunaan Assertion `toBe()` dan Query `getByTestId()`**

   * `getByTestId()` digunakan untuk mengambil elemen berdasarkan atribut `data-testid`
   * `toBe()` digunakan untuk memastikan nilai yang dihasilkan sesuai dengan yang diharapkan

   Screenshot kode penggunaan `getByTestId()` dan `toBe()` pada unit test
  ![alt text](/jobsheet-19/my-app/public/img/laporan/image-28.png)

5. **Mocking Router**

   * Router dari Next.js dimock menggunakan `jest.mock("next/router")`
   * Digunakan agar halaman dapat diuji tanpa menjalankan router asli dari Next.js

   Screenshot kode mocking router pada unit test
   ![alt text](/jobsheet-19/my-app/public/img/laporan/image-29.png)

6. **Hasil Coverage Testing**

   * Testing dijalankan menggunakan perintah `npm run test:coverage`
   * Coverage yang dihasilkan telah melebihi syarat minimal 50%

   Screenshot hasil coverage di terminal
   ![alt text](/jobsheet-19/my-app/public/img/laporan/image-30.png)

   Screenshot halaman laporan coverage (`coverage/lcov-report/index.html`)
   ![alt text](/jobsheet-19/my-app/public/img/laporan/image-31.png)

---

# F. Pertanyaan Analisis

### 1. Mengapa unit testing penting sebelum production?

Unit testing penting karena dapat mendeteksi bug lebih awal sebelum aplikasi digunakan oleh user. Dengan adanya unit test, developer dapat memastikan setiap fungsi dan komponen berjalan sesuai dengan yang diharapkan. Selain itu, unit testing membantu menjaga stabilitas aplikasi saat dilakukan perubahan atau pengembangan fitur baru.

---

### 2. Mengapa branch coverage sulit mencapai 100%?

Branch coverage sulit mencapai 100% karena setiap kondisi percabangan seperti `if`, `else`, dan `switch` harus diuji semua kemungkinan hasilnya. Dalam aplikasi yang kompleks, jumlah kondisi bisa sangat banyak, termasuk edge case yang jarang terjadi, sehingga membutuhkan banyak skenario test untuk mencapainya.

---

### 3. Apa itu mocking?

Mocking adalah teknik dalam testing untuk meniru fungsi atau modul tertentu agar tidak menggunakan dependensi asli. Dengan mocking, proses testing menjadi lebih cepat, stabil, dan tidak bergantung pada API, database, atau sistem eksternal lainnya.

---

### 4. Kapan snapshot test digunakan?

Snapshot test digunakan untuk memastikan tampilan UI tetap konsisten dari waktu ke waktu. Jika terjadi perubahan pada tampilan, snapshot akan mendeteksi perbedaan tersebut sehingga developer dapat mengetahui apakah perubahan tersebut memang diinginkan atau tidak.

---

### 5. Apakah semua file harus dites?

Tidak semua file harus dites, tetapi file yang berisi fitur utama atau logic penting (critical feature) wajib dites. Hal ini karena bagian tersebut memiliki pengaruh besar terhadap jalannya aplikasi, sehingga harus dipastikan berjalan dengan benar.


---

# G. Output yang Diharapkan

Mahasiswa menghasilkan:

* Jest terkonfigurasi
* Testing berjalan
* Snapshot test berhasil
* getByTestId berjalan
* Mocking router berhasil
* Coverage report muncul
* Error dapat dianalisis

---

# H. Kesimpulan

Pada praktikum ini telah dipelajari:

* Instalasi dan konfigurasi Jest pada Next.js
* Penggunaan React Testing Library
* Pembuatan unit test pada halaman
* Penggunaan snapshot dan getByTestId
* Pembuatan coverage report
* Teknik mocking pada Next Router
* Penanganan error saat testing

Unit testing sangat penting dalam pengembangan aplikasi modern karena membantu menjaga kualitas kode, mendeteksi bug lebih awal, dan memastikan aplikasi siap untuk production.
