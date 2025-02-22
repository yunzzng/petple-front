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
    <div>
      {open && (
        <div
          onClick={onCloseModal}
          className={modalCls}
          // style={{
          //   position: "fixed",
          //   top: 0,
          //   left: 0,
          //   right: 0,
          //   bottom: 0,
          //   backgroundColor: "rgba(0, 0, 0, 0.5)",
          //   zIndex: 100,
          // }}
        ></div>
      )}
    </div>
  );
};

export default Backdrop;
