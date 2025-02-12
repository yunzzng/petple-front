import { ChangeEvent, FC, useMemo } from "react";
import InputBox, { BaseProps } from "./InputBox";
import InputLabel from "./InputLabel";
import { inputBaseCls } from "@/consts/className";
import styles from "./input.module.css";

interface InputProps extends BaseProps {
  type?:
    | "number"
    | "text"
    | "email"
    | "password"
    | "file"
    | "date"
    | "time"
    | "checkbox"
    | "radio";
  name?: string;
  id?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  pattern?: string;
  checked?: boolean;
  title?: string;
  required?: boolean;
  readonly?: boolean;
  disabled?: boolean;
}

interface InputCompoundProps {
  Box: typeof InputBox;
  Label: typeof InputLabel;
}

const Input: FC<InputProps> & InputCompoundProps = (props: InputProps) => {
  const {
    type,
    name,
    id,
    placeholder,
    className,
    value,
    onChange,
    pattern,
    checked = false,
    title,
    required,
    disabled,
  } = props;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  const inputCls = useMemo(
    () => `${styles.input} ${inputBaseCls} ${className || ""}`.trim(),
    [className]
  );

  return (
    <>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        className={inputCls || styles.input}
        value={value}
        onChange={handleOnChange}
        pattern={pattern}
        checked={type === "checkbox" || type === "radio" ? checked : undefined}
        title={title}
        required={required}
        disabled={disabled}
      />
    </>
  );
};

Input.Box = InputBox;
Input.Label = InputLabel;

export default Input;
