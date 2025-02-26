import { Button } from "..";
import styles from "./pagination.module.css";
import { useMemo } from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  setPage: (page: number) => void;
}

const Pagination = ({ page, totalPages, startPage, endPage, setPage }: PaginationProps) => {
  const pageNumbers = useMemo(() => {
    return [...Array(endPage - startPage + 1)].map((_, i) => startPage + i);
  }, [startPage, endPage]);

  return (
    <div className={styles.pagination}>
      <Button onClick={() => setPage(Math.max(page - 1, 1))} disabled={page === 1} className={styles.pageButton}>
        이전
      </Button>

      {pageNumbers.map((pageNumber) => (
        <Button
          key={pageNumber}
          onClick={() => setPage(pageNumber)}
          className={`${styles.pageNumber} ${page === pageNumber ? styles.activePage : ""}`}
        >
          {pageNumber}
        </Button>
      ))}

      <Button onClick={() => setPage(Math.min(page + 1, totalPages))} disabled={page === totalPages} className={styles.pageButton}>
        다음
      </Button>
    </div>
  );
};

export default Pagination;