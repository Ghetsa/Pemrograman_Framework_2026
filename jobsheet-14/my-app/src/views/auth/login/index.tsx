// jobsheet-14/my-app/src/views/auth/login/index.tsx

import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./login.module.scss";

const HalamanLogin = () => {
  const router = useRouter();

  const handlerLogin = () => {
    localStorage.setItem("isLogin", "true");
    router.push("/produk");
  };

  return (
    <div className={styles.login}>
      <div className={styles.container}>
        <h1 className={styles.title}>Halaman Login</h1>

        <button onClick={handlerLogin} className={styles.button}>
          Login
        </button>

        <p className={styles.text}>Belum punya akun?</p>

        <p className={styles.text}>
          <Link href="/auth/register" className={styles.link}>
            Ke Halaman Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default HalamanLogin;