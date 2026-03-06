import Link from "next/link";
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h1>MyApp</h1>
      </div>

      <div className={styles.menu}>
        <Link href="/">Home</Link>
        <Link href="/produk">Produk</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/auth/login">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;