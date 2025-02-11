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

const Root: FC<RootProps> = ({ children }) => {
  const [items, setItems] = useState<Array<string>>([]);
  const addItem = (item: string) => setItems((prev) => [...prev, item]);
  const removeItem = (item: string) =>
    setItems((prev) => prev.filter((title) => title !== item));

  return (
    <ChipContext.Provider
      value={{
        items,
        addItem,
        removeItem,
      }}
    >
      {children}
    </ChipContext.Provider>
  );
};

export default Root;
