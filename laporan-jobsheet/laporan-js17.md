# PEMROGRAMAN BERBASIS FRAMEWORK

## JOBSHEET 17

### Implementasi Login Google Provider dengan NextAuth.js + Firebase

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

1. Mengkonfigurasi Google OAuth melalui Google Cloud Console.
2. Mengintegrasikan Google Provider ke NextAuth.js.
3. Mengelola session dan JWT callback untuk data provider.
4. Menyimpan data user Google ke Firebase Firestore secara otomatis.
5. Mengimplementasikan multi-role (member & admin) pada login provider.
6. Menampilkan avatar dan data profil user dari Google di UI.
7. Memahami alur autentikasi OAuth berbasis provider.

---

# B. Dasar Teori Singkat

## 1️⃣ Alur Autentikasi Google Provider

Login menggunakan Google Provider (OAuth 2.0) pada NextAuth.js memiliki alur sebagai berikut:

```text
User klik "Sign in with Google"
↓
Diatur oleh NextAuth untuk redirect ke Google Login
↓
User memberikan izin akses profil & email
↓
Google mengirimkan callback berisi data user ke NextAuth
↓
NextAuth mengeksekusi callback JWT & Session
↓
Sistem mengecek/menyimpan data user ke Firestore
↓
User berhasil masuk dan session tersimpan
```

## 2️⃣ Mengapa Perlu Menyimpan Data Google ke Database?

Meskipun data user sudah didapat dari Google, kita tetap perlu menyimpannya ke database (Firestore) untuk:
* Mengelola hak akses (Role) secara internal.
* Menyimpan preferensi tambahan user yang tidak ada di Google.
* Melakukan sinkronisasi data profil jika ada perubahan.

---

# C. Langkah Kerja Praktikum

---

## Bagian 1 – Konfigurasi Google Cloud Console

### 1️⃣ Membuat Project Baru
1. Masuk ke [Google Cloud Console](https://console.cloud.google.com/apis/credentials).
2. Klik **New Project** dan beri nama, misalnya `MyAppNext`.
3. Klik **Create**.

### 2️⃣ Konfigurasi OAuth Consent Screen
1. Masuk ke menu **OAuth consent screen**.
2. Pilih User Type **External** dan klik **Create**.
3. Isi **App Information** (App Name, User support email, Developer contact info).
4. Klik **Save and Continue** hingga selesai.

### 3️⃣ Membuat OAuth Credentials
1. Masuk ke menu **Credentials** -> **Create Credentials** -> **OAuth client ID**.
2. Pilih Application type: **Web application**.
3. Pada **Authorized JavaScript origins**, tambahkan: `http://localhost:3000`.
4. Pada **Authorized redirect URIs**, tambahkan: `http://localhost:3000/api/auth/callback/google`.
5. Klik **Create** dan simpan **Client ID** serta **Client Secret**.

---

## Bagian 2 – Konfigurasi Environment Variables

Buka file `.env` dan tambahkan variabel berikut:

```text
GOOGLE_CLIENT_ID=masukkan_client_id_anda
GOOGLE_CLIENT_SECRET=masukkan_client_secret_anda
NEXTAUTH_SECRET=masukkan_secret_key_acak
```

---

## Bagian 3 – Implementasi Provider di NextAuth

### 1️⃣ Modifikasi file `src/pages/api/auth/[...nextauth].ts`

Tambahkan GoogleProvider dan modifikasi callback untuk menangani data dari Google.

```ts
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { loginWithGoogle } from "@/utils/db/servicefirebase"; // Fungsi service database

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }: any) {
      if (account?.provider === "google") {
        const data = {
          fullname: user.name,
          email: user.email,
          image: user.image,
          type: account.provider,
        };
        
        // Simpan ke database via service
        await loginWithGoogle(data, (result: any) => {
          token.role = result.role;
        });

        token.fullname = data.fullname;
        token.email = data.email;
        token.image = data.image;
        token.type = data.type;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.fullname = token.fullname;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.role = token.role;
        session.user.type = token.type;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
```

---

## Bagian 4 – Modifikasi UI Login & Navbar

### 1️⃣ Menambahkan Tombol Login Google
Buka file `src/views/auth/login/index.tsx` dan tambahkan button Google.

```tsx
import { signIn } from "next-auth/react";

// Di dalam komponen TampilanLogin
<button
  type="button"
  onClick={() => signIn("google", { callbackUrl: "/", redirect: false })}
  className={style.login__form__item__button_google}
>
  {isLoading ? "Loading..." : "Sign in with Google"}
</button>
```

### 2️⃣ Menampilkan Profil & Avatar di Navbar
Buka file `src/components/layouts/Navbar/index.tsx` untuk menampilkan foto profil user.

```tsx
const { data }: any = useSession();

return (
  <nav className={styles.navbar}>
    <div className={styles.navbar__right}>
      {data ? (
        <div className={styles.navbar__user}>
          <p>Welcome, {data.user.fullname}</p>
          {data.user.image && (
            <img 
              src={data.user.image} 
              alt={data.user.fullname} 
              className={styles.navbar__user__image} 
            />
          )}
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </div>
  </nav>
);
```

---

# D. Pengujian

## Uji 1 – Login Google Pertama Kali
1. Klik tombol "Sign in with Google".
2. Pilih akun Google.
3. **Hasil:** User berhasil masuk, data profil (nama, email, image) tersimpan di Firestore dengan role default.

## Uji 2 – Sinkronisasi Data (Login Kedua)
1. Logout lalu login kembali dengan akun Google yang sama.
2. **Hasil:** Sistem melakukan pengecekan, jika email sudah ada maka data diperbarui (update) tanpa menduplikasi data.

## Uji 3 – Tampilan Avatar
1. Cek bagian Navbar setelah login.
2. **Hasil:** Foto profil asli dari Google muncul sebagai avatar dengan styling border-radius 50%.

## Uji 4 – Proteksi Role
1. Coba akses halaman `/admin` dengan akun Google yang memiliki `role: member`.
2. **Hasil:** Sistem melakukan redirect kembali ke home karena role tidak mencukupi.

---

# E. Struktur Database (Firestore)

Collection: `users`

| Field | Tipe | Keterangan |
| :--- | :--- | :--- |
| email | string | Email dari Google |
| fullname | string | Nama lengkap dari Google |
| image | string | URL foto profil dari Google |
| role | string | admin / member (default) |
| type | string | "google" (provider) |

---

# F. Tugas Praktikum

1. **Implementasi Google Login:** Berhasil mengintegrasikan provider Google ke dalam NextAuth.
2. **Sync Database:** Menambahkan logic di service untuk menyimpan data user Google ke Firestore saat pertama kali login.
3. **Multi-Role:** Memastikan user yang login via Google mendapatkan role default (misal: "member").
4. **Avatar UI:** Menampilkan foto profil user secara dinamis pada Navbar.
5. **Tugas Mandiri:** Menambahkan role "editor" dan membuat halaman khusus yang diproteksi untuk role tersebut di middleware.

---

# G. Pertanyaan Analisis

### 1. Apa perbedaan login credential dan login Google?
Login credential menggunakan database lokal aplikasi untuk menyimpan email dan password ter-hash, sedangkan login Google mendelegasikan proses autentikasi ke server Google (OAuth) sehingga aplikasi tidak perlu mengelola password user.

### 2. Mengapa data Google tetap perlu disimpan ke database?
Agar aplikasi bisa mengelola metadata internal seperti Role, log aktivitas, atau status langganan yang dikaitkan dengan email user tersebut secara permanen di sistem kita.

### 3. Apa fungsi JWT callback dalam alur ini?
Fungsinya adalah untuk mencegat (intercept) data yang datang dari provider, lalu memodifikasi isi token tersebut (seperti menambahkan data Role dari database) sebelum token dikirim ke client.

### 4. Mengapa perlu multi-role?
Untuk membatasi akses fitur. Contohnya, user biasa hanya bisa melihat profil, sedangkan admin bisa masuk ke dashboard manajemen untuk mengelola user lain.

### 5. Apa risiko jika tidak menyimpan user ke database?
Kita akan kesulitan memberikan hak akses khusus (RBAC) karena setiap kali user login, sistem hanya mengetahui data dari Google saja tanpa mengetahui role yang kita tetapkan secara internal.

---

# H. Output yang Diharapkan

Mahasiswa menghasilkan:
* Sistem login multi-provider (Credentials & Google).
* Database Firestore yang terisi otomatis oleh data user Google.
* UI Navbar yang responsif menampilkan identitas dan avatar user.
* Middleware yang mampu membedakan akses antar role user Google.

---

# I. Kesimpulan

Melalui praktikum ini, telah berhasil diimplementasikan login menggunakan Google Provider dengan NextAuth.js yang terintegrasi dengan Firebase Firestore. Integrasi ini memungkinkan aplikasi memiliki sistem autentikasi yang modern, aman, dan mudah bagi pengguna. Dengan pemanfaatan JWT callback dan Session callback, data dari pihak ketiga (Google) dapat disinkronkan dengan kebijakan internal aplikasi (Role-Based Access Control).