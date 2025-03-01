import { FC } from "react";
import { useAccordionContext } from "./Root";
import { AccordionContentProps } from "../types";

const Content: FC<AccordionContentProps> = ({ children, className }) => {
  const { isOpen } = useAccordionContext();
  return isOpen && <div className={className}>{children}</div>;
};

export default Content;
