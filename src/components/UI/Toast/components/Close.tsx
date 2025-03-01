import { useToastStore } from "@/zustand/toastStore";
import styles from "./default.module.css";
import closeIcon from "/images/icons/close.svg";

const Close = () => {
  const { removeToast } = useToastStore();
  return (
    <>
      <div
        className={styles.toast_close}
        onClick={removeToast}
        aria-label="닫기"
      >
        <img src={closeIcon} alt="닫기 아이콘" />
      </div>
    </>
  );
};

export default Close;
