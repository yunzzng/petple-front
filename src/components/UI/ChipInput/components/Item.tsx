import styles from "./default.module.css";
import { FC } from "react";
import { ItemProps } from "../types";
import CloseIcon from "@/assets/icons/close.svg?react";
import { useChipContext } from "./Root";

const Item: FC<ItemProps> = ({ children, title }) => {
  const { removeItem } = useChipContext();
  return (
    <li className={styles.chip}>
      <span>{children}</span>
      <CloseIcon
        className={styles.closeIcon}
        onClick={() => removeItem(title)}
      />
    </li>
  );
};

export default Item;
