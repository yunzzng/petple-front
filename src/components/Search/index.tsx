import { ChangeEvent, useMemo } from "react";
import styles from "./search.module.css";
import { Button, Input } from "..";
import { searchBaseCls } from "@/consts/className";

interface SearchProps {
  onSearch?: (region: string) => void;
  className?: string;
  placeholder?: string;
  value: string;
  placeholderText?: string;
  labelText?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({
  onSearch,
  className,
  value,
  onChange,
  labelText = "도시명을 입력하세요",
  placeholderText = "도시명을 입력하세요 (예: 부천, 수원)",
}: SearchProps) => {
  const handleSearch = () => {
    if (onSearch) {
      onSearch(value.trim());
    }
  };

  const searchCls = useMemo(() => {
    return `${styles.button} ${searchBaseCls || ""} ${className || ""}`.trim();
  }, [className]);

  return (
    <div className={styles.searchContainer}>
      <Input.Box>
        <Input.Label className={styles.label}>{labelText}</Input.Label>
        <Input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholderText}
          className={styles.input}
        />
      </Input.Box>
      <Button label="검색" onClick={handleSearch} className={searchCls} />
    </div>
  );
};

export default Search;
