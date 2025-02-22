import { useState } from "react";

const ITEMS_PER_PAGE = 9;
const PAGE_GROUP_SIZE = 5;

const usePagination = <T>(data: T[]) => {
  const [page, setPage] = useState(1);

  // 전체 페이지 수
  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  // 현재 페이지에서 보여줄 데이터
  const paginatedData = data.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  // 페이지 그룹을 계산해서 페이지네이션 버튼 표시
  const startPage =
    Math.floor((page - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
  const endPage = Math.min(startPage + PAGE_GROUP_SIZE - 1, totalPages);

  return { page, setPage, paginatedData, totalPages, startPage, endPage };
};

export default usePagination;
