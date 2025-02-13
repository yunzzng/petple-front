import { ChangeEvent, useMemo } from "react";
import styles from "./search.module.css";
import { Button, Input } from "..";
import { searchBaseCls } from "@/consts/className";

interface SearchProps {
  onSearch?: (region: string) => void;
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ onSearch, className, placeholder, value, onChange }: SearchProps) => {
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
        <Input.Label className={styles.label}>도시명을 입력하세요</Input.Label>
        <Input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder || "도시명을 입력하세요 (예: 부천, 수원)"}
          className={styles.input}
        />
      </Input.Box>
      <Button label="검색" onClick={handleSearch} className={searchCls} />
    </div>
  );
};

export default Search;