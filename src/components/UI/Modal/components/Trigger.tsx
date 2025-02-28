import React, {
  cloneElement,
  FC,
  isValidElement,
  ReactElement,
  useContext,
  useMemo,
} from "react";
import { TriggerProps } from "../types";
import { ModalContext } from "./Root";
import { ModalTriggerBaseCls } from "@/consts/className";

const Trigger: FC<TriggerProps> = (props) => {
  const { children, className } = props;
  const { onOpenModal } = useContext(ModalContext);

  const modalTriggerCls = useMemo(() => {
    return className
      ? `${className} ${ModalTriggerBaseCls}`
      : ModalTriggerBaseCls;
  }, [className]);

  if (!children) {
    return <button onClick={onOpenModal}>open</button>;
  }

  return (
    <div>
      {React.Children.map(props.children, (child) => {
        if (isValidElement(child)) {
          return cloneElement(child as ReactElement<any>, {
            onClick: () => {
              onOpenModal();
            },
            className: modalTriggerCls,
          });
        }
        return child;
      })}
    </div>
  );
};

export default Trigger;
