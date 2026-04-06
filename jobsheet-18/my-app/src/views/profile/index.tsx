import { useSession } from "next-auth/react";
import Image from "next/image";
import styles from "./profile.module.scss";
import dynamic from "next/dynamic";
import { Poppins } from "next/font/google";

// ✅ next/font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

// ✅ dynamic import (komponen kecil)
const ProfileInfo = dynamic(() => import("../profile/ProfileInfo"), {
  loading: () => <p>Loading...</p>,
});

const ProfileView = () => {
  const { data: session } = useSession();

  const getProvider = (type: string | undefined) => {
    if (type === "google") return "Google";
    if (type === "github") return "GitHub";
    return "Email";
  };

  const defaultImage = "/user-default.jpeg";

  return (
    <div className={`${styles.profile} ${poppins.className}`}>
      <h2 className={styles.profile__title}>Halaman Profile</h2>

      {session ? (
        <div className={styles.profile__card}>
          <div className={styles.profile__card__header}>
            <div className={styles.profile__card__image}>
              <Image
                src={session.user?.image || defaultImage}
                alt={session.user?.fullname || "avatar"}
                width={120}
                height={120}
                priority
              />
            </div>

            <h2 className={styles.profile__card__name}>
              {session.user?.fullname || "User"}
            </h2>
          </div>

          {/* ✅ dynamic component */}
          <ProfileInfo
            email={session.user?.email}
            provider={getProvider(session.user?.type)}
            role={session.user?.role || "member"}
          />
        </div>
      ) : (
        <p className={styles.profile__empty}>
          Silakan login terlebih dahulu
        </p>
      )}
    </div>
  );
};

export default ProfileView;