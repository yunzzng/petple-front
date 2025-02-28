import { ModalContextProps, ModalProps } from "../types";
import { FC, useContext, useMemo, createContext } from "react";
import { ModalBaseCls } from "@/consts/className";

export const ModalContext = createContext<ModalContextProps>({
  onCloseModal: () => {},
  onOpenModal: () => {},
  open: false,
});

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Tabs Context should be used within TabsContext.Provider");
  }
  return context;
};

const Root: FC<ModalProps> = ({
  children,
  onCloseModal,
  onOpenModal,
  open,
  className,
}) => {
  const modalCls = useMemo(() => {
    return className ? `${className} ${ModalBaseCls}` : ModalBaseCls;
  }, [className]);

  return (
    <ModalContext.Provider value={{ onCloseModal, onOpenModal, open }}>
      <div className={modalCls}>{children}</div>
    </ModalContext.Provider>
  );
};

export default Root;
