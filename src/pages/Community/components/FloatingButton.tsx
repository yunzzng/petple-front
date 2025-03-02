import { useNavigate } from "react-router-dom";
import styles from "./floatingbutton.module.css";
import PencilIcon from "@/assets/icons/pencil.svg?react";
const FloatingButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/community/create")}
      className={styles.floating_button}
    >
      <PencilIcon />
    </button>
  );
};

export default FloatingButton;
