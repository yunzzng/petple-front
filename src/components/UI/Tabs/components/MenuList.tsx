import { useMemo } from "react";
import { MenuListProps } from "../types";
import { tabsMenuListBaseCls } from "@/consts/className";

const MenuList = ({ className, children }: MenuListProps) => {
  const tabsMenuListCls = useMemo(() => {
    return className
      ? `${className} ${tabsMenuListBaseCls}`
      : tabsMenuListBaseCls;
  }, [className]);

  return <div className={tabsMenuListCls}>{children}</div>;
};

export default MenuList;
