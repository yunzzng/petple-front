import { Children, PropsWithChildren, ReactElement } from "react";
import Label from "./InputLabel";
import Input from ".";
import styles from "./input.module.css";

export interface BaseProps extends PropsWithChildren {}

interface InputProps extends BaseProps {
  className?: string;
}

const InputBox = (props: InputProps) => {
  const { children } = props;

  const inbox = Children.toArray(children) as ReactElement[];

  const label = inbox.find((child) => child.type === Label);
  const input = inbox.find((child) => child.type === Input);

  return (
    <div className={styles.inputBox}>
      {label}
      {input}
    </div>
  );
};

export default InputBox;