import styles from "./footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <h3>MyApp</h3>
        <p>Platform pembelajaran berbasis Next.js</p>
      </div>

      <div className={styles.right}>
        <p>© 2026 MyApp. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;