import { ChangeEvent, FC } from "react";
import InputBox, { BaseProps } from "./InputBox";
import InputLabel from "./InputLabel";
import styles from "./input.module.css"; 

interface InputProps extends BaseProps {
  type?: "number" | "text" | "email" | "password" | "file" | "date" | "time" | "checkbox" | "radio";
  name?: string;
  id?: string;
  placeholder?: string;
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
  const { type, name, id, placeholder, value, onChange, pattern, checked = false, title, required, disabled } = props;

  return (
    <input
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      pattern={pattern}
      checked={type === "checkbox" || type === "radio" ? checked : undefined}
      title={title}
      required={required}
      disabled={disabled}
      className={styles.input}
    />
  );
};

Input.Box = InputBox;
Input.Label = InputLabel;

export default Input;