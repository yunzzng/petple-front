import { CSSProperties, FC, MouseEventHandler, useMemo } from "react";
import { buttonBaseCls } from "@/consts/className";

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
    return className ? `${className} ${buttonBaseCls}` : buttonBaseCls;
  }, [className]);

  return (
    <button
      onClick={onClick}
      type={type}
      className={buttonCls}
      style={style}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Buttons;
