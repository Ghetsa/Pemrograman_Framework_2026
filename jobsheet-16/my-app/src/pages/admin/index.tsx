import { useSession } from "next-auth/react"
const HalamanAdmin = () => {
  const {data}:any = useSession()
  return (
    <div>
      <div className="admin">
        <h1>Halaman Admin {data?.user?.fullname}</h1>
        <br />
        <p>
          Selamat datang di halaman admin! Anda memiliki akses penuh ke semua
          fitur dan data di aplikasi ini. Di sini, Anda dapat mengelola
          pengguna, melihat laporan, dan melakukan tugas administratif lainnya.
          Pastikan untuk menggunakan hak akses Anda dengan bijak dan menjaga
          keamanan data pengguna.
        </p>
        <br />
      </div>
    </div>
  );
};

export default HalamanAdmin;