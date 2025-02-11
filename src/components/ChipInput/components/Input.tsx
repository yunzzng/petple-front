import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import { useChipContext } from "./Root";
import { InputProps } from "../types";

const Input: FC<InputProps> = ({
  className,
  placeholder = "#태그 작성후 Enter를 눌러주세요.",
  onChange,
}) => {
  const [value, setValue] = useState<string>("");
  const { addItem, items } = useChipContext();
  const hanldeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!value || e.key !== "Enter") return;
    if (e.key === "Enter") {
      e.preventDefault();
      addItem(value);
      onChange?.([...items, value]);
      setValue("");
    }
  };

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={hanldeChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={className}
      />
    </>
  );
};

export default Input;
