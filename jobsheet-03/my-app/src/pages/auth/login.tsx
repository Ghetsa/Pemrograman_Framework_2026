import Link from "next/link";

const HalamanLogin = () => {
  return (
    <div>
      <h1>Halaman Login</h1>
      <Link href="/auth/register">Ke Halaman Register</Link>
    </div>
  );
};

export default HalamanLogin;