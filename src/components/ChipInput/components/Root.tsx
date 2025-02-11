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
  onChange,
}) => {
  const [items, setItems] = useState<Array<string>>([]);
  const addItem = (item: string) => {
    const updatedItems = [...items, item];
    setItems(updatedItems);
    onChange?.(updatedItems);
  };
  const removeItem = (item: string) => {
    const filterdItems = items.filter((title) => title !== item);
    setItems(filterdItems);
    onChange?.(filterdItems);
  };

  return (
    <ChipContext.Provider
      value={{
        items,
        maxItemLength,
        maxItemsCount,
        addItem,
        removeItem,
      }}
    >
      {children}
    </ChipContext.Provider>
  );
};

export default Root;
