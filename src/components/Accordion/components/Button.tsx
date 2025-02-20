import { FC, useMemo } from "react";
import { AccordionButtonProps } from "../types";
import { useAccordionContext } from "./Root";

const Button: FC<AccordionButtonProps> = ({ children, className }) => {
  const { handleClickButton } = useAccordionContext();
  return (
    <button onClick={handleClickButton} className={className}>
      {children}
    </button>
  );
};

export default Button;
