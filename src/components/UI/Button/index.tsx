import {
  CSSProperties,
  FC,
  MouseEventHandler,
  ReactNode,
  useMemo,
} from "react";
import { buttonBaseCls } from "@/consts/className";
import styles from "./button.module.css";

interface ButtonProps {
  label?: string;
  type?: "button" | "submit" | "reset";
  onClick?: (() => void) | MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: CSSProperties;
  disabled?: boolean;
  children?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  label,
  type,
  onClick,
  className,
  style,
  disabled,
  children,
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

export default Button;
