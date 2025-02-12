import { CSSProperties, FC, MouseEventHandler, useMemo } from "react";
import { buttonBaseCls } from "@/consts/className";
import styles from "./button.module.css";

interface ButtonsProps {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: (() => void) | MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
}

const Buttons: FC<ButtonsProps> = ({
  label,
  type,
  onClick,
  className,
  style,
  disabled,
}) => {
  const buttonCls = useMemo(() => {
    return `${styles.button} ${buttonBaseCls} ${className || ""}`.trim();
  }, [className]);

  return (
    <button
      onClick={onClick}
      type={type}
      className={buttonCls || styles.button}
      style={style}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Buttons;
