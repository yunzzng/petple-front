import { BaseProps } from "./InputBox";
import styles from "./input.module.css";

interface LabelProps extends BaseProps {
  htmlFor?: string;
}

const InputLabel = (props: LabelProps) => {
  const { children, htmlFor } = props;

  return (
    <label htmlFor={htmlFor} className={styles.inputLabel}>
      {children}
    </label>
  );
};

export default InputLabel;