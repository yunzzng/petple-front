import { FC } from "react";
import styles from "./chipinput.module.css";
import Chip from "./components";

interface ChipInputProps {
  value?: Array<string>;
  onChange?: () => void;
}

const ChipInput: FC<ChipInputProps> = ({ onChange }) => {
  return (
    <>
      <Chip.Root onChange={onChange}>
        <Chip.Input className={styles.input} />
        <p className={styles.info}>* 태그는 10가지만 추가 가능합니다.</p>
        <Chip.ItemsList className={styles.itemList} />
      </Chip.Root>
    </>
  );
};

export default ChipInput;
