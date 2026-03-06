import Link from "next/link";

const UserProfileView = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-6">
      <div className="w-full max-w-md rounded-2xl bg-slate-800 p-6 shadow-lg border border-slate-700">
        <h1 className="text-3xl font-bold text-white text-center">
          Profile Page
        </h1>

        <p className="mt-3 text-slate-300 text-center">
          Ini merupakan halaman profile
        </p>

        <div className="mt-6 flex justify-center">
          <Link
            href="/profile/edit"
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-500 transition"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfileView;