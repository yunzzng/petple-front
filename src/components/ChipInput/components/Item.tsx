import styles from "./default.module.css";
import { FC } from "react";
import { ItemProps } from "../types";
import closeIcon from "../assets/CloseIcon.svg";
import { useChipContext } from "./Root";

const Item: FC<ItemProps> = ({ children, title }) => {
  const { removeItem } = useChipContext();
  return (
    <li className={styles.chip}>
      <span>{children}</span>
      <img
        src={closeIcon}
        className={styles.closeIcon}
        onClick={() => removeItem(title)}
      />
    </li>
  );
};

export default Item;
