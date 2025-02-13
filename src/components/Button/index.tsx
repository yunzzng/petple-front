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
  children?: string;
}

const Buttons: FC<ButtonsProps> = ({
  label,
  type,
  onClick,
  className,
  style,
  disabled,
  children
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
      {label || children}
    </button>
  );
};

export default Buttons;
