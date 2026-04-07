import styles from './navbar.module.css';
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Script from "next/dist/client/script";
import Link from "next/link";

const Navbar = () => {
  const { data }: any = useSession();

  const defaultImage = "/user-default.jpeg"; // dari public

  return (
<div className={styles.navbar} data-testid="navbar">      <div className={styles.navbar__brand} id="title"></div>

      <Script id="my-script" strategy="lazyOnload">
        {`document.getElementById('title').innerHTML = 'MyApp';`}
      </Script>

      <div className={styles.navbar__right}>
        {data ? (
          <>
            <div className={styles.navbar__user}>
              Welcome, {data.user?.fullname || "User"}

              <Link href="/profile">
                <Image
                  data-testid="user-image"
                  width={50}
                  height={50}
                  src={data.user?.image || defaultImage}
                  alt={data.user?.fullname || "avatar"}
                  className={styles.navbar__user__image}
                />
              </Link>
            </div>

            <button
              data-testid="signout-button"
              className={`${styles.navbar__button} ${styles["navbar__button--danger"]}`}
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          </>
        ) : (
          <button
            data-testid="signin-button"
            className={`${styles.navbar__button} ${styles["navbar__button--primary"]}`}
            onClick={() => signIn()}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;