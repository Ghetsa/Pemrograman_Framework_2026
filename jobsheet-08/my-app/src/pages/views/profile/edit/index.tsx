import Link from "next/link";

const ProfileEditView = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
      <div className="w-full max-w-md rounded-2xl bg-slate-800 p-6 shadow-lg border border-slate-700">
        <h1 className="text-3xl font-bold text-white text-center">
          Edit Profile Page
        </h1>

        <p className="mt-3 text-slate-300 text-center">
          Ini merupakan halaman edit profile
        </p>

        <form className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-200">
              Nama
            </label>
            <input
              type="text"
              placeholder="Masukkan nama"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-200">
              Bio
            </label>
            <textarea
              placeholder="Tulis bio singkat"
              className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500"
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-500 transition"
          >
            Simpan
          </button>
        </form>

        <div className="mt-5 text-center">
          <Link href="/profile" className="text-indigo-400 hover:underline">
            ← Kembali ke Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditView;