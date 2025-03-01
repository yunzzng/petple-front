import { FC } from "react";
import { Button } from "../..";
import styles from "./pagination.module.css";
import { usePaginationContext } from ".";

interface PaginationNavigatorProps {
  type: "prev" | "next";
}

const PaginationNavigator: FC<PaginationNavigatorProps> = ({ type }) => {
    const { page, totalPages, setPage } = usePaginationContext();

    return (
        <div className={styles.paginationNavigator}>
            {type === "prev" && (
                <Button
                    onClick={() => setPage(Math.max(page - 1, 1))}
                    disabled={page === 1}
                    className={styles.pageButton}
                >
                    이전
                </Button>
            )}

            {type === "next" && (
                <Button
                    onClick={() => setPage(Math.min(page + 1, totalPages))}
                    disabled={page === totalPages}
                    className={styles.pageButton}
                >
                    다음
                </Button>
            )}
        </div>
    );
};

export default PaginationNavigator;