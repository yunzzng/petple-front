import { FC, useContext, useMemo } from "react";
import { ContentProps } from "../types";
import { ModalContext } from "./Root";
import { ModalContentBaseCls } from "@/consts/className";
import { createPortal } from "react-dom";

const Content: FC<ContentProps> = (props) => {
  const { children, className } = props;
  const { open } = useContext(ModalContext);

  const modalContentCls = useMemo(() => {
    return className
      ? `${className} ${ModalContentBaseCls}`
      : ModalContentBaseCls;
  }, [className]);

  return (
    <div>
      {open
        ? createPortal(
            <div className={modalContentCls}>{children}</div>,
            document.body
          )
        : null}
    </div>
  );
};

export default Content;
