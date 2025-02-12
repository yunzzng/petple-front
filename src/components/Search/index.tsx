import { useMemo, useState } from "react";
import styles from "./search.module.css";
import { Button, Input } from "..";
import { searchBaseCls } from "@/consts/className";

interface SearchProps {
  onSearch?: (region: string) => void;
  className?: string;
}

const Search = ({ onSearch, className }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchTerm.trim());
    }
  };

  const _searchCls = useMemo(() => {
    return `${styles.button} ${searchBaseCls || ""} ${className || ""}`.trim();
  }, [className]);

  return (
    <div className={styles.searchContainer}>
      <Input.Box>
        <Input.Label className={styles.label}>도시명을 입력하세요</Input.Label>
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="도시명을 입력하세요 (예: 부천, 수원)"
          className={styles.input}
        />
      </Input.Box>
      <Button label="검색" onClick={handleSearch} className={_searchCls} />
    </div>
  );
};

export default Search;