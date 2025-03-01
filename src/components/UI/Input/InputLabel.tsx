import { useMemo } from 'react';
import { BaseProps } from './InputBox';
import { inputLabelBaseCls } from '@/consts/className';
import styles from "./input.module.css";

interface LabelProps extends BaseProps {
  htmlFor?: string;
  className?: string;
}

const InputLabel = (props: LabelProps) => {
  const { children, htmlFor, className } = props;


  const inputLabelCls = useMemo(() => `${styles.inputLabel} ${inputLabelBaseCls} ${className || ""}`.trim(), [className]);

  return (
    <>
      <label htmlFor={htmlFor} className={inputLabelCls || styles.inputLabel}>
        {children}
      </label>
    </>
  );
};

export default InputLabel;
