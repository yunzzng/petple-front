import { useNavigate } from "react-router-dom";
import styles from "./menubar.module.css";
import community2 from "/images/community2.png";
import menubar3 from "/images/menubar3.png";
import menuHome from "/images/menuHome2.png";

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
        <img src={community2} className={styles.community} />
      </a>
      <a>
        <img src={menubar3} className={styles.menu} />
      </a>
    </footer>
  );
};

export default MenuBar;
