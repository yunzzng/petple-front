import { createContext, useContext, FC, ReactNode, useMemo } from "react";
import PaginationNavigator from "./PaginationNavigator";
import PaginationButtons from "./PaginationPageButtons";
import { paginationBaseCls } from "@/consts/className";
import styles from "./pagination.module.css";

interface PaginationContextProps {
  page: number;
  totalPages: number;
  startPage: number;
  endPage: number;
  setPage: (page: number) => void;
}

interface PaginationCompoundProps {
  PageButtons: typeof PaginationButtons;
  Navigator: typeof PaginationNavigator;
}

const PaginationContext = createContext<PaginationContextProps | null>(null);

const usePaginationContext = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error(
      "usePaginationContext must be used within a PaginationProvider"
    );
  }
  return context;
};

interface PaginationProps extends PaginationContextProps {
  className?: string;
  children?: ReactNode;
}

const Pagination: FC<PaginationProps> & PaginationCompoundProps = ({
  page,
  totalPages,
  startPage,
  endPage,
  setPage,
  className,
  children
}) => {
  const paginationCls = useMemo(() => {
    return className ? `${className} ${paginationBaseCls}` : paginationBaseCls;
  }, [className]);

  return (
    <PaginationContext.Provider
      value={{ page, totalPages, startPage, endPage, setPage }}
    >
      <div className={paginationCls}>
        <div className={styles.paginationContainer}>
          <div className={styles.paginationContainer}>{children}</div>
        </div>
      </div>
    </PaginationContext.Provider>
  );
};

Pagination.PageButtons = PaginationButtons;
Pagination.Navigator = PaginationNavigator;

export default Pagination;
export { usePaginationContext };
