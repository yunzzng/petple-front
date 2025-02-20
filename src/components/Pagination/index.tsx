import { Button } from "..";
import styles from "./pagination.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  setPage: (page: number) => void;
}

const Pagination = ({ page, totalPages, startPage, endPage, setPage }: PaginationProps) => {
  return (
    <div className={styles.pagination}>
      <Button onClick={() => setPage(Math.max(page - 1, 1))} disabled={page === 1} className={styles.pageButton}>
        이전
      </Button>

      {[...Array(endPage - startPage + 1)].map((_, i) => (
        <Button
          key={startPage + i}
          onClick={() => setPage(startPage + i)}
          className={`${styles.pageNumber} ${page === startPage + i ? styles.activePage : ""}`}
        >
          {startPage + i}
        </Button>
      ))}

      <Button onClick={() => setPage(Math.min(page + 1, totalPages))} disabled={page === totalPages} className={styles.pageButton}>
        다음
      </Button>
    </div>
  );
};

export default Pagination;