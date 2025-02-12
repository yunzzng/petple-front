import { Children, PropsWithChildren, ReactElement, useMemo } from 'react';
import Label from './InputLabel';
import Input from '.';
import { inputBoxBaseCls } from '@/consts/className';
import styles from "./input.module.css";

export interface BaseProps extends PropsWithChildren {}

interface InputProps extends BaseProps {
  className?: string;
}

const InputBox = (props: InputProps) => {
  const { children, className } = props;

  const inbox = Children.toArray(children) as ReactElement[];

  const label = inbox.find((child) => child.type === Label);
  const input = inbox.find((child) => child.type === Input);

  const inputBoxCls = useMemo(() => `${styles.inputBox} ${inputBoxBaseCls} ${className || ""}`.trim(), [className]);


  return (
    <>
      <div className={inputBoxCls || styles.inputBox}>
        {label}
        {input}
      </div>
    </>
  );
};

export default InputBox;
