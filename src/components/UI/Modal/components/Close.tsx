import React, {
  cloneElement,
  FC,
  isValidElement,
  ReactElement,
  useContext,
  useMemo,
} from "react";
import { CloseProps } from "../types";
import { ModalContext } from "./Root";
import { ModalCloseBaseCls } from "@/consts/className";

const Close: FC<CloseProps> = (props) => {
  const { children, className } = props;
  const { onCloseModal } = useContext(ModalContext);

  const modalCloseCls = useMemo(() => {
    return className ? `${className} ${ModalCloseBaseCls}` : ModalCloseBaseCls;
  }, [className]);

  if (!children) {
    return <button onClick={onCloseModal}>X</button>;
  }

  return React.Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement<any>, {
        onClick: () => {
          onCloseModal();
        },
        className: modalCloseCls,
      });
    }
    return child;
  });
};

export default Close;
