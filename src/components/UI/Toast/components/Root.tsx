import { RootProps } from "../types";
import styles from "./default.module.css";

const Root = ({ children, position = "top-middle" }: RootProps) => {
  return (
    <div className={`${styles.toast_wrapper} ${styles[position]}`}>
      {children}
    </div>
  );
};

export default Root;
