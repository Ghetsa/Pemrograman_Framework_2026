import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import styles from "./login.module.css";

const HalamanLogin = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlerLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      localStorage.setItem("isLogin", "true");
      push("/produk");
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Halaman Login</h1>

      <form onSubmit={handlerLogin} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            placeholder="Masukkan email"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder="Masukkan password"
            required
          />
        </div>

        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>

      <p className={styles.text}>
        Belum punya akun?{" "}
        <Link href="/auth/register" className={styles.link}>
          Daftar
        </Link>
      </p>
    </div>
  );
};

export default HalamanLogin;