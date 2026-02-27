import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import styles from "./register.module.scss";

const HalamanRegister = () => {
  const { push } = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlerRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) push("/auth/login");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Halaman Register</h1>

      <form onSubmit={handlerRegister} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>Nama Lengkap</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={styles.input}
            placeholder="Masukkan nama lengkap"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
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
          <label htmlFor="password" className={styles.label}>Password</label>
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

        <button type="submit" className={styles.button}>Daftar</button>
      </form>

      <p className={styles.text}>
        Sudah punya akun?{" "}
        <Link href="/auth/login" className={styles.link}>Login</Link>
      </p>
    </div>
  );
};

export default HalamanRegister;