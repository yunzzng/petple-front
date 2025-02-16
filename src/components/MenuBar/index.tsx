import { useNavigate } from "react-router-dom";
import styles from "./menubar.module.css";
import community from "/images/community3.png";
import menubar from "/images/menubar5.png";
import menuHome from "/images/menuHome3.png";

const MenuBar = () => {
  const navigate = useNavigate();
  return (
    <footer className={styles.footer}>
      <a>
        <img
          src={menuHome}
          className={styles.home}
          onClick={() => navigate("/")}
        />
      </a>
      <a>
        <img src={community} className={styles.community} />
      </a>
      <a>
        <img src={menubar} className={styles.menu} />
      </a>
    </footer>
  );
};

export default MenuBar;
