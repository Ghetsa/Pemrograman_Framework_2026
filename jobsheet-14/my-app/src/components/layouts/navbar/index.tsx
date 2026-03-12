import Link from "next/link";
import styles from "./navbar.module.css";
import { signIn, signOut, useSession } from "next-auth/react";


const Navbar = () => {
  const { data } = useSession();
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <h1>MyApp</h1>
      </div>

      <div className={styles.menu} >
        <Link href="/">Home</Link>
        <Link href="/produk">Produk</Link>
        <Link href="/profile">Profile</Link>
        {/* <Link href="/auth/login">Login</Link> */}

        {data ? (
          <button onClick={() => signOut()}>Sign Out</button>
        ) : (
          <button onClick={() => signIn()}>Sign In</button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;