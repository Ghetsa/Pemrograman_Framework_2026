// jobsheet-14/my-app/src/components/layouts/navbar/index.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "./navbar.module.css";

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLogin") === "true";
    setIsLogin(loginStatus);
  }, []);

  const handleSignOut = () => {
    document.cookie = "isLogin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem("isLogin");
    setIsLogin(false);
    router.push("/auth/login");
  };

  const handleSignIn = () => {
    router.push("/auth/login");
  };

  return (
    <div className={styles.navbar}>
      <div className="big">navbar Component</div>
      {isLogin ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <button onClick={handleSignIn}>Sign In</button>
      )}
    </div>
  );
};

export default Navbar;