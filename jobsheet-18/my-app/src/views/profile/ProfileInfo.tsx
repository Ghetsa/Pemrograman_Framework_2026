import styles from "./profile.module.scss";

const ProfileInfo = ({ email, provider, role }: any) => {
  return (
    <div className={styles.profile__card__info}>
      <p>
        <span>Email:</span> {email}
      </p>
      <p>
        <span>Login Via:</span> {provider}
      </p>
      <p>
        <span>Role:</span>
        <span className={styles.user__role}>{role}</span>
      </p>
    </div>
  );
};

export default ProfileInfo;