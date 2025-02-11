import styles from "./footer.module.css";
import logo from "/images/logo.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img src={logo} alt="PETPLE Logo" className={styles.logo} />
      <p className={styles.text}>petple @ 2025. All rights reserved.</p>
    </footer>
  );
};

export default Footer;