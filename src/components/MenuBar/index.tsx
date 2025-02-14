import styles from "./footer.module.css";
import chat from "/images/chat.png";
import menubar from "/images/menubar.png";
import home from "/images/home.png";

const MenuBar = () => {
  return (
    <footer className={styles.footer}>
      <a>
        <img src={home} className={styles.home} />
      </a>
      <a>
        <img src={chat} className={styles.img} />
      </a>
      <a>
        <img src={menubar} className={styles.img} />
      </a>
    </footer>
  );
};

export default MenuBar;
