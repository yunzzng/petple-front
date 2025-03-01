import { DescriptionProps } from "../types";
import styles from "./default.module.css";
import successIcon from "/images/icons/success.svg";
import errorIcon from "/images/icons/error.svg";
import infoIcon from "/images/icons/info.svg";

const mapTypeToIcon = {
  INFO: infoIcon,
  SUCCESS: successIcon,
  ERROR: errorIcon,
};

const Description = ({ children, type = "INFO" }: DescriptionProps) => {
  return (
    <div className={styles.toast_description}>
      <div className={styles.toast_icon}>
        <img src={mapTypeToIcon[type]} alt="토스트 아이콘" />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Description;
