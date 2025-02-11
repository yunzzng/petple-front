import { FC, MouseEventHandler } from "react";
import styles from "./button.module.css";

interface ButtonsProps {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: (() => void) | MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Button: FC<ButtonsProps> = ({
  label,
  type,
  onClick,
  disabled,
}) => {

  return (
    <button
      onClick={onClick}
      type={type}
      className={styles.button}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
