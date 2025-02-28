import { FC, useMemo } from "react";
import { Button } from "../..";
import styles from "./pagination.module.css";
import { usePaginationContext } from ".";

const PaginationButtons: FC = () => {
    const { page, startPage, endPage, setPage } = usePaginationContext();

    const pageNumbers = useMemo(() => {
        return [...Array(endPage - startPage + 1)].map((_, i) => startPage + i);
    }, [startPage, endPage]);

    return (
        <div className={styles.pageButtons}>
            {pageNumbers.map((pageNumber) => (
                <Button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`${styles.pageNumber} ${page === pageNumber ? styles.activePage : ""}`}
                >
                    {pageNumber}
                </Button>
            ))}
        </div>
    );
};

export default PaginationButtons;