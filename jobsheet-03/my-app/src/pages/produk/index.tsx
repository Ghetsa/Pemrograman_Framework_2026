import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Produk = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [isLogin, setIsLogin] = useState(false);
  const { push } = useRouter();
  useEffect(() => {
    const status = localStorage.getItem("isLogin");

    if (status === "true") {
      setIsLogin(true);
      setIsChecking(false);
    } else {
      push("/auth/login");
      setIsChecking(false);
    }
  }, []);

  if (isChecking) {
    return <div>Loading...</div>;
  }
  if (!isLogin) {
    return null;
  }
  return <div>Produk User Page</div>;

};

export default Produk;