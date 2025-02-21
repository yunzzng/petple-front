import {
  createContext,
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import { TabsContextProps, TabsProps } from "../types";
import { tabsBaseCls } from "@/consts/className";

export const TabsContext = createContext<TabsContextProps>({
  selectedTab: 1,
  setSelectedTab: () => {},
});

export const useTabContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error(
      "Accordion Context should be used within AccordionContext.Provider"
    );
  }
  return context;
};

const Root: FC<TabsProps> = ({ className, children }) => {
  const [selectedTab, setSelectedTab] = useState<number>(1);

  const handleChangeTabIndex: Dispatch<SetStateAction<number>> = (index) => {
    if (selectedTab === index) return;
    setSelectedTab(index);
  };

  const contextValue: TabsContextProps = {
    selectedTab,
    setSelectedTab: handleChangeTabIndex,
  };

  const tabsCls = useMemo(() => {
    return className ? `${className} ${tabsBaseCls}` : tabsBaseCls;
  }, [className]);

  return (
    <TabsContext.Provider value={contextValue}>
      <div className={tabsCls}>{children}</div>
    </TabsContext.Provider>
  );
};

export default Root;
