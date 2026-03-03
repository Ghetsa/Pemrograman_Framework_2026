import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import HeroSection from "./sections/HeroSection";
import MainSection from "./sections/MainSection";
import styles from "./produk.module.scss";

const ProdukView = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const status = localStorage.getItem("isLogin");
    if (status === "true") {
      setIsLogin(true);
    } else {
      router.replace("/auth/login");
    }
    setIsChecking(false);
  }, [router]);

  if (isChecking) return <div className={styles.page}>Loading...</div>;
  if (!isLogin) return null;

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <HeroSection />
        <MainSection />
      </div>
    </div>
  );
};

export default ProdukView;