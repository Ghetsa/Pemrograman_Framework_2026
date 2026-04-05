import { useSession } from "next-auth/react";

const HalamanEditor = () => {
  const { data }: any = useSession();

  return (
    <div>
      <div className="editor">
        <h1>Halaman Editor {data?.user?.fullname}</h1>
        <br />
        <p>
          Selamat datang di halaman editor! Anda memiliki akses untuk mengelola
          dan mengedit konten di aplikasi ini. Di sini, Anda dapat menambahkan,
          memperbarui, dan menghapus data sesuai kebutuhan. Pastikan untuk
          menjaga konsistensi dan kualitas konten yang Anda kelola.
        </p>
        <br />
      </div>
    </div>
  );
};

export default HalamanEditor;