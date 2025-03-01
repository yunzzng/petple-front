import { useContext, useMemo } from "react";
import { MenuProps } from "../types";
import { tabsMenuBaseCls } from "@/consts/className";
import { TabsContext } from "./Root";

const Menu = ({ index, children, className }: MenuProps) => {
  const { setSelectedTab } = useContext(TabsContext);

  const tabsMenuCls = useMemo(() => {
    return className ? `${className} ${tabsMenuBaseCls}` : tabsMenuBaseCls;
  }, [className]);

  return (
    <div onClick={() => setSelectedTab(index)} className={tabsMenuCls}>
      {children}
    </div>
  );
};

export default Menu;
