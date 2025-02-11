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
      <Chip.Root>
        <Chip.Input className={styles.input} onChange={onChange} />
        <Chip.ItemsList className={styles.itemList} />
      </Chip.Root>
    </>
  );
};

export default ChipInput;
