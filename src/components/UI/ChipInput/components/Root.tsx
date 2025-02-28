import { createContext, FC, useContext, useState } from "react";
import { ChipContextProps, RootProps } from "../types";

const ChipContext = createContext<ChipContextProps | null>(null);

export const useChipContext = () => {
  const context = useContext(ChipContext);
  if (!context) {
    throw new Error(
      "useChipContext should be used within ChipContext.Provider."
    );
  }
  return context;
};

const Root: FC<RootProps> = ({
  children,
  maxItemLength = 10,
  maxItemsCount = 10,
  defaultItems = [],
  onChange,
}) => {
  const [items, setItems] = useState<Array<string>>(defaultItems);
  const addItem = (value: string) => {
    const trimedValue = trimValue(value);
    const updatedItems = [...items, trimedValue];
    setItems(updatedItems);
    onChange?.(updatedItems);
  };
  const removeItem = (item: string) => {
    const filterdItems = items.filter((title) => title !== item);
    setItems(filterdItems);
    onChange?.(filterdItems);
  };

  const isValidInput = (value: string) => {
    const trimedValue = trimValue(value);
    if (!trimedValue) return false;
    if (items.includes(trimedValue)) return false;
    if (trimedValue.length > maxItemLength || items.length >= maxItemsCount)
      return false;

    return true;
  };

  const trimValue = (value: string) => {
    return value.trim().replace(/#+/g, "#");
  };

  return (
    <ChipContext.Provider
      value={{
        items,
        maxItemLength,
        maxItemsCount,
        addItem,
        removeItem,
        isValidInput,
      }}
    >
      {children}
    </ChipContext.Provider>
  );
};

export default Root;
