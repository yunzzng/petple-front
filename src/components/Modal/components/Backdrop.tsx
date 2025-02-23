import { FC, useContext, useMemo } from "react";
import { BackdropProps } from "../types";
import { ModalContext } from "./Root";
import { ModalBaseCls } from "@/consts/className";

const Backdrop: FC<BackdropProps> = (props) => {
  const { className } = props;
  const { onCloseModal, open } = useContext(ModalContext);

  const modalCls = useMemo(() => {
    return className ? `${className} ${ModalBaseCls}` : ModalBaseCls;
  }, [className]);

  return (
    <div>{open && <div onClick={onCloseModal} className={modalCls}></div>}</div>
  );
};

export default Backdrop;
