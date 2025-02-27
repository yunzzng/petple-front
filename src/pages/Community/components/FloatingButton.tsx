import { useNavigate } from "react-router-dom";
import styles from "./floatingbutton.module.css";
// import pencilIcon from "/images/icons/pencil.svg";
const FloatingButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/community/create")}
      className={styles.floating_button}
    >
      <img src={"/images/icons/pencil.svg"} alt="게시글 추가 버튼이미지" />
    </button>
  );
};

export default FloatingButton;
