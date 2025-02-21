import { useContext, useMemo } from "react";
import { PannelProps } from "../types";
import { TabsContext } from "./Root";
import { tabsPannelBaseCls } from "@/consts/className";

const Pannel = ({ children, index, className }: PannelProps) => {
  const { selectedTab } = useContext(TabsContext);

  const tabsPannelCls = useMemo(() => {
    return className ? `${className} ${tabsPannelBaseCls}` : tabsPannelBaseCls;
  }, [className]);

  if (selectedTab !== index) return null;

  return <div className={tabsPannelCls}>{children}</div>;
};

export default Pannel;
