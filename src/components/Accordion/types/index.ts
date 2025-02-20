import { PropsWithChildren } from "react";

/* Root Props */
export interface AccordionProps extends PropsWithChildren {
  className?: string;
  defaultOpenStatus?: boolean;
  onChange?: (isOpen: boolean) => void;
}
export interface AccordionContextProps {
  isOpen: boolean;
  handleClickButton: () => void;
}

/* Button Props */
export interface AccordionButtonProps extends PropsWithChildren {
  className?: string;
}

/* Content Props */
export interface AccordionContentProps extends PropsWithChildren {
  className?: string;
}

/* Title Props */
export interface AccordionTitleProps extends PropsWithChildren {
  className?: string;
}
