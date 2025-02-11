import styles from "./chipinput.module.css";
import Chip from "./components";

const ChipInput = () => {
  return (
    <>
      <Chip.Root>
        <Chip.Input className={styles.input} />
        <Chip.ItemsList className={styles.itemList} />
      </Chip.Root>
    </>
  );
};

export default ChipInput;
