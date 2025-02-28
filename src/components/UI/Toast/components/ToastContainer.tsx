import styles from "./default.module.css";
import { createPortal } from "react-dom";
import { useToastStore } from "@/zustand/toastStore";
import Toast from ".";

const ToastContainer = () => {
  const { toast } = useToastStore();
  return createPortal(
    <div className={styles.container}>
      {toast && (
        <Toast.Root position={toast.position}>
          <Toast.Close />
          <Toast.Description type={toast.type}>
            {toast.description}
          </Toast.Description>
        </Toast.Root>
      )}
    </div>,
    document.body
  );
};

export default ToastContainer;
