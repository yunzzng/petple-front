import { useToastStore } from "@/zustand/toastStore";
import styles from "./default.module.css";
import CloseIcon from "@/assets/icons/close.svg?react";

const Close = () => {
  const { removeToast } = useToastStore();
  return (
    <>
      <div
        className={styles.toast_close}
        onClick={removeToast}
        aria-label="닫기"
      >
        <CloseIcon />
      </div>
    </>
  );
};

export default Close;
