import { useState, useMemo } from "react";

const ITEMS_PER_PAGE = 9;
const PAGE_GROUP_SIZE = 5;

const usePagination = <T>(data: T[], itemsPerPage = ITEMS_PER_PAGE) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const paginatedData = useMemo(
        () => data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
        [data, currentPage, itemsPerPage]
    );

    const startPage = useMemo(
        () => Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1,
        [currentPage]
    );

    const endPage = useMemo(
        () => Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages),
        [startPage, totalPages]
    );

    return { 
        page: currentPage,
        setPage: setCurrentPage,
        paginatedData, 
        totalPages, 
        startPage, 
        endPage 
    };
};

export default usePagination;