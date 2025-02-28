import { FC } from "react";
import styles from "./chipinput.module.css";
import Chip from "./components";

interface ChipInputProps {
  values?: Array<string>;
  onChange?: () => void;
}

const ChipInput: FC<ChipInputProps> = ({ onChange, values }) => {
  return (
    <>
      <Chip.Root onChange={onChange} defaultItems={values}>
        <Chip.Input className={styles.input} />
        <p className={styles.info}>* 태그는 최대 10개까지 추가 가능합니다.</p>
        <Chip.ItemsList className={styles.itemList} />
      </Chip.Root>
    </>
  );
};

export default ChipInput;
