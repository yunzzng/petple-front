import { FC } from "react";
import { AccordionTitleProps } from "../types";

const Title: FC<AccordionTitleProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

export default Title;
