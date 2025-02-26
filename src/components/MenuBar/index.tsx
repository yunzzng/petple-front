import { useNavigate } from "react-router-dom";
import styles from "./menubar.module.css";
import home from "/images/home.png";
import chat from "/images/chat.png";
import community from "/images/community.png";
import menu from "/images/menu.png";
import walking from "/images/walking.png";

const MenuBar = () => {
  const navigate = useNavigate();
  return (
    <footer className={styles.footer}>
      <div className={styles.menu_wrap} onClick={() => navigate("/")}>
        <img src={home} className={styles.img} />
        <a>홈</a>
      </div>
      <div className={styles.menu_wrap} onClick={() => navigate("/petfriends")}>
        <img src={chat} className={styles.img} />
        <a>펫프렌즈</a>
      </div>
      <div className={styles.menu_wrap} onClick={() => navigate("/community")}>
        <img src={community} className={styles.img} />
        <a>커뮤니티</a>
      </div>
      <div className={styles.menu_wrap} onClick={() => navigate("/petwalk")}>
        <img src={walking} className={styles.img} />
        <a>펫산책</a>
      </div>
      <div className={styles.menu_wrap} onClick={() => navigate("/menu")}>
        <img src={menu} className={styles.img} />
        <a>메뉴</a>
      </div>
    </footer>
  );
};

export default MenuBar;
