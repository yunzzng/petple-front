import { Dispatch, PropsWithChildren, SetStateAction } from "react";

/* Root Props */
export interface TabsProps extends PropsWithChildren {
  className?: string;
}

export interface TabsContextProps {
  selectedTab: number;
  setSelectedTab: Dispatch<SetStateAction<number>>;
}

/* MenuList Props */
export interface MenuListProps extends PropsWithChildren {
  className?: string;
}

/* Menu Props */
export interface MenuProps extends PropsWithChildren {
  index: number;
  className?: string;
}

/* Pannel Props */
export interface PannelProps extends PropsWithChildren {
  index: number;
  className?: string;
}
