import { createContext, FC, useContext, useState } from "react";
import { AccordionContextProps, AccordionProps } from "../types";

const AccordionContext = createContext<AccordionContextProps | null>(null);

export const useAccordionContext = () => {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(
      "Accordion Context should be used within AccordionContext.Provider"
    );
  }
  return context;
};

const Root: FC<AccordionProps> = ({
  defaultOpenStatus = false,
  children,
  className,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpenStatus);
  const handleClickButton = () => {
    onChange?.(!isOpen);
    setIsOpen(!isOpen);
  };

  const accordionContextValue = {
    isOpen,
    handleClickButton,
    onChange,
  };

  return (
    <AccordionContext.Provider value={accordionContextValue}>
      <div className={className}>{children}</div>
    </AccordionContext.Provider>
  );
};

export default Root;
