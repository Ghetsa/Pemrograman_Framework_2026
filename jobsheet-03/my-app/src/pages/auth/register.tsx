import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";

const HalamanRegister = () => {
  const { push } = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlerRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Simple validation
    if (name && email && password) {
      push("/auth/login");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Halaman Register</h1>

      <form onSubmit={handlerRegister} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Nama Lengkap</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            placeholder="Masukkan nama lengkap"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            placeholder="Masukkan email"
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            placeholder="Masukkan password"
            required
          />
        </div>

        <button type="submit" style={styles.button}>
          Daftar
        </button>
      </form>

      <p style={styles.text}>
        Sudah punya akun? <Link href="/auth/login" style={styles.link}>Login</Link>
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    textAlign: "center" as const,
    marginBottom: "30px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "5px",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold" as const,
    color: "#333",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    outline: "none",
  },
  button: {
    padding: "12px",
    fontSize: "16px",
    fontWeight: "bold" as const,
    color: "white",
    backgroundColor: "#333",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
  text: {
    textAlign: "center" as const,
    marginTop: "20px",
    color: "#333",
  },
  link: {
    color: "#0070f3",
    textDecoration: "underline" as const,
  },
};

export default HalamanRegister;
