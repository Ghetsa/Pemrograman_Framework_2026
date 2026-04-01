Berikut laporan lengkap dalam format **Markdown (MD)** yang sudah **disesuaikan dengan template Jobsheet 15 kamu**, tetapi isinya mengikuti **Jobsheet Login Database & Multi-Role** dan **SEMUA langkah modifikasi sudah dijelaskan detail**.

---

# PEMROGRAMAN BERBASIS FRAMEWORK

## JOBSHEET 16

### Implementasi Login Database & Multi-Role

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

1. Menghubungkan login dengan database.
2. Melakukan verifikasi password menggunakan bcrypt.
3. Membuat custom login page.
4. Mengimplementasikan callback URL redirect.
5. Menerapkan middleware authentication.
6. Menerapkan role-based access control (RBAC).

---

# B. Dasar Teori Singkat

## 1️⃣ Alur Login Database

```text
User input email + password
↓
NextAuth authorize()
↓
Query user berdasarkan email
↓
bcrypt.compare(password)
↓
Jika cocok → return user
↓
Token & Session dibuat
↓
Redirect sesuai callbackURL
```

---

## 2️⃣ Role-Based Access Control (RBAC)

RBAC adalah metode untuk mengatur hak akses user berdasarkan role.

Contoh role:

```text
user
admin
```

Tujuan RBAC:

* Membatasi akses halaman tertentu
* Meningkatkan keamanan aplikasi
* Mengatur otorisasi berdasarkan level user

---

# C. Langkah Kerja Praktikum

---

## Bagian 1 – Custom Login Page

### 1️⃣ Modifikasi NextAuth

Buka file:

```text
pages/api/auth/[...nextauth].ts
```

Tambahkan custom page login:

```ts
pages: {
  signIn: "/auth/login",
},
```

---

### 2️⃣ Jalankan aplikasi

```text
http://localhost:3000
```

Klik **Sign In**, maka akan diarahkan ke halaman login custom.

---

## Bagian 2 – Handle Login di Frontend

### 1️⃣ Copy file register ke login

Salin file berikut:

```text
views/auth/register/index.tsx → views/auth/login/index.tsx
views/auth/register/register.module.scss → views/auth/login/login.module.scss
```

---

### 2️⃣ Ubah semua teks "register" menjadi "login"

Contoh:

```tsx
<h1 className={style.login__title}>Halaman Login</h1>
```

---

### 3️⃣ Hapus field fullname

Pada file:

```text
views/auth/login/index.tsx
```

Hapus bagian input fullname sehingga hanya tersisa:

* Email
* Password

---

### 4️⃣ Modifikasi handler login

Tambahkan fungsi handle login menggunakan NextAuth:

```tsx
import { signIn } from "next-auth/react";

const handleLogin = async (event: any) => {
  event.preventDefault();

  const res = await signIn("credentials", {
    redirect: false,
    email: event.target.email.value,
    password: event.target.password.value,
    callbackUrl: "/",
  });

  if (res?.status === 200) {
    window.location.href = res.url || "/";
  } else {
    console.log("Login gagal");
  }
};
```

Gunakan pada form:

```tsx
<form onSubmit={handleLogin}>
```

---

### 5️⃣ Modifikasi servicefirebase.ts

Tambahkan fungsi untuk mengambil user berdasarkan email:

```ts
export async function login(
  email: string,
  callback: Function
) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const snapshot = await getDocs(q);

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  callback(data);
}
```

![alt text](/jobsheet-16/my-app/public/img/laporan/image-2.png)

---

## Bagian 3 – Authorize di NextAuth (Database Login)

### 1️⃣ Modifikasi provider credentials

Buka file:

```text
pages/api/auth/[...nextauth].ts
```

Tambahkan authorize:

```ts
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "../../../utils/db/servicefirebase";
import bcrypt from "bcrypt";

providers: [
  CredentialsProvider({
    name: "Credentials",
    credentials: {},
    async authorize(credentials) {
      return new Promise((resolve, reject) => {
        login(credentials?.email, async (data: any) => {
          if (data.length > 0) {
            const user = data[0];

            const isValid = await bcrypt.compare(
              credentials!.password,
              user.password
            );

            if (isValid) {
              resolve(user);
            } else {
              resolve(null);
            }
          } else {
            resolve(null);
          }
        });
      });
    },
  }),
],
```

---

## Bagian 4 – Tambahkan Role ke Token

### 1️⃣ Modifikasi JWT Callback

Tambahkan pada file `[...nextauth].ts`:

```ts
callbacks: {
  async jwt({ token, user }) {
    if (user) {
      token.role = user.role;
    }
    return token;
  },

  async session({ session, token }) {
    session.user.role = token.role;
    return session;
  },
}
```

---

### 2️⃣ Fix error HTML

Jika muncul error `<head>` di dalam `<div>`, buka:

```text
views/auth/login/index.tsx
```

Bungkus return dengan fragment:

```tsx
<>
  {/* isi */}
</>
```

![alt text](/jobsheet-16/my-app/public/img/laporan/image-3.png)

![alt text](/jobsheet-16/my-app/public/img/laporan/image-4.png)

---

## Bagian 5 – Callback URL Logic

### 1️⃣ Modifikasi middleware

Buka file:

```text
src/middleware/withAuth.ts
```

Tambahkan callback URL:

```ts
const callbackUrl = encodeURIComponent(req.nextUrl.pathname);

return NextResponse.redirect(
  new URL(`/auth/login?callbackUrl=${callbackUrl}`, req.url)
);
```

---

## Bagian 6 – Halaman Admin & Authorization

### 1️⃣ Buat halaman admin

```text
pages/admin/index.tsx
```

Contoh:

```tsx
const AdminPage = () => {
  return <h1>Halaman Admin</h1>;
};

export default AdminPage;
```

---

### 2️⃣ Proteksi dengan middleware

Modifikasi `withAuth.ts`:

```ts
if (pathname.startsWith("/admin")) {
  if (token?.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }
}
```

---

### 3️⃣ Pengujian role

* Login sebagai user → tidak bisa akses `/admin`
* Login sebagai admin → bisa akses `/admin`

---

# D. Pengujian

## Uji 1 – Login Valid

Input:

* Email benar
* Password benar

Hasil:

![alt text](/jobsheet-16/my-app/public/img/laporan/image-5.png)

![alt text](/jobsheet-16/my-app/public/img/laporan/image-6.png)

* Login berhasil
* Redirect sesuai callback URL

---

## Uji 2 – Password Salah

Input:

* Email benar
* Password salah

Hasil:

![alt text](/jobsheet-16/my-app/public/img/laporan/image-7.png)

* Error message tampil
* Tidak login

---

## Uji 3 – Akses Admin sebagai User

Akses:

```text
/admin
```

Hasil:

![alt text](/jobsheet-16/my-app/public/img/laporan/image-9.png)

![alt text](/jobsheet-16/my-app/public/img/laporan/image-8.png)

* Redirect ke home

---

## Uji 4 – Akses Admin sebagai Admin

Akses:

```text
/admin
```

Hasil:

![alt text](/jobsheet-16/my-app/public/img/laporan/image-10.png)

![alt text](/jobsheet-16/my-app/public/img/laporan/image-11.png)

* Bisa masuk halaman admin

---

# E. Struktur Database (Firestore)

Collection:

```text
users
```

Field yang digunakan:

| Field    | Tipe            |
| -------- | --------------- |
| email    | string          |
| password | string (hashed) |
| role     | string          |
| fullName | string          |
| createdAt | string          |

![alt text](/jobsheet-16/my-app/public/img/laporan/image-12.png)

---

# F. Tugas Praktikum

1. Implementasikan login database.

2. Tambahkan role pada user.

3. Buat halaman:

   * `/profile`
  ![alt text](/jobsheet-16/my-app/public/img/laporan/image-13.png)

   * `/admin`
  ![alt text](/jobsheet-16/my-app/public/img/laporan/image-15.png)


4. Proteksi `/admin` hanya untuk admin.

![alt text](/jobsheet-16/my-app/public/img/laporan/image-16.png)

![alt text](/jobsheet-16/my-app/public/img/laporan/image-17.png)

5. Implementasikan callback URL.

![alt text](/jobsheet-16/my-app/public/img/laporan/image-18.png)

---

# G. Pertanyaan Analisis

### 1. Mengapa password harus diverifikasi dengan bcrypt.compare?

Karena password yang disimpan di database sudah dalam bentuk hash, sehingga perlu dibandingkan menggunakan bcrypt agar aman.

### 2. Mengapa role disimpan di token?

Agar informasi role dapat digunakan di seluruh aplikasi tanpa query ulang ke database.

### 3. Apa fungsi callbackUrl?

Untuk mengarahkan user kembali ke halaman sebelumnya setelah login.

### 4. Mengapa middleware penting untuk security?

Karena middleware dapat membatasi akses halaman sebelum halaman dirender.

### 5. Apa risiko jika role tidak dicek di middleware?

User dapat mengakses halaman yang seharusnya terbatas, seperti halaman admin.

---

# H. Output yang Diharapkan

Mahasiswa menghasilkan:

* Login terhubung database
* Password diverifikasi
* Custom login page
* Redirect sesuai callback URL
* Middleware aktif
* Role-based access berjalan

---

# I. Kesimpulan

Pada praktikum ini telah dipelajari:

* Implementasi login terhubung database
* Verifikasi password menggunakan bcrypt
* Pembuatan custom login page
* Penggunaan NextAuth untuk autentikasi
* Implementasi middleware untuk proteksi route
* Penerapan role-based access control (RBAC)

Dengan adanya sistem login berbasis database dan RBAC, aplikasi menjadi lebih aman dan terstruktur. Sistem ini sudah mendekati implementasi autentikasi pada aplikasi production karena mencakup authentication, authorization, session management, dan access control.
