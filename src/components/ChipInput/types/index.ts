import { PropsWithChildren } from "react";

/* Base Type */
interface BaseProps extends PropsWithChildren {
  className?: string;
}

/* Context Component */
export interface ChipContextProps {
  items: Array<string>;
  maxItemLength: number;
  maxItemsCount: number;
  addItem: (item: string) => void;
  removeItem: (item: string) => void;
}

/* Root Component */
export interface RootProps extends BaseProps {
  maxItemLength?: number;
  maxItemsCount?: number;
  defaultItems?: Array<string>;
  onChange?: (value: Array<string>) => void;
}

/* Input Component */
export interface InputProps extends BaseProps {
  placeholder?: string;
}

/* ItemList Component */
export interface ItemsListProps extends BaseProps {}

/* Item Component */
export interface ItemProps extends BaseProps {
  title: string;
}
