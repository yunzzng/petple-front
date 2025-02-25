import { useNavigate } from "react-router-dom";
import styles from "./menubar.module.css";

const MenuBar = () => {
  const navigate = useNavigate();
  return (
    <footer className={styles.footer}>
      <a onClick={() => navigate("/")}>홈</a>
      <a onClick={() => navigate("/petfriends")}>펫프렌즈</a>
      <a onClick={() => navigate("/community")}>커뮤니티</a>
      <a onClick={() => navigate("/petwalk")}>펫산책</a>
      <a>메뉴</a>
    </footer>
  );
};

export default MenuBar;
