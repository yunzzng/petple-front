import { useState, ChangeEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import styles from "./food.module.css";
// import petFoodBanner from "/images/foodBanner.png";
import Search from "@/components/Search";
import { getPetFood } from "@/apis/public.api";
import { FoodService } from "@/types/petApi.type";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/Pagination";
import foodCategories, { FoodCategory } from "@/consts/foodCategories";

const PetFood = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [querySearchTerm, setQuerySearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<FoodCategory["id"]>("all");

  const {
    data = [],
    isError,
  } = useQuery<FoodService[]>({
    queryKey: ["petFoodData", selectedCategory, querySearchTerm],
    queryFn: () =>
      getPetFood(
        querySearchTerm,
        selectedCategory === "all" ? "" : selectedCategory
      ),
    staleTime: 7 * 24 * 60 * 60 * 1000,
  });

  const handleSearch = () => {
    setQuerySearchTerm(searchTerm);
    setPage(1);
  };

  const { page, setPage, paginatedData, totalPages, startPage, endPage } =
    usePagination(data);

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <img
          src={"/images/foodBanner.png"}
          alt="펫푸드 배너"
          className={styles.bannerImage}
        />
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>
          반려동물 영양 가이드: 식재료 & 성분 분석
        </h2>
        <p className={styles.description}>
          반려동물도 건강한 식사가 중요합니다! <br />
          다양한 원재료의 영양 성분과 특성을 확인하고, <br /> 우리 아이에게 꼭 맞는
          식단을 구성해보세요. <br />
          강아지와 고양이를 위한 올바른 식재료 선택이 어렵다면?
          <br />
          이곳에서 영양 정보와 추천 급여법을 한눈에 확인하세요!
        </p>
      </div>

      <div className={styles.searchContainer}>
        <Search
          value={searchTerm}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchTerm(e.target.value)
          }
          onSearch={handleSearch}
          labelText="사료 검색"
          placeholderText="사료명을 입력하세요 (예: 닭고기, 연어)"
        />

        <select
          className={styles.categorySelect}
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value as FoodCategory["id"]);
            setPage(1);
          }}
        >
          <option value="all">전체</option>
          {foodCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.foodTableContainer}>
        {isError ? (
          <p className={styles.messageText}>
            데이터를 불러오는 중 오류가 발생했습니다.
          </p>
        ) : paginatedData.length === 0 ? (
          <p className={styles.messageText}>검색 결과가 없습니다.</p>
        ) : (
          <table className={styles.foodTable}>
            <thead>
              <tr>
                <th>이름</th>
                <th>카테고리</th>
                <th>원산지</th>
                <th>가격</th>
                <th>단백질</th>
                <th>지방</th>
                <th>조섬유</th>
                <th>수분</th>
                <th>건물</th>
                <th>칼슘</th>
                <th>인</th>
                <th>나트륨</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((food) => (
                <tr key={food.id}>
                  <td>{food.name}</td>
                  <td>{food.category}</td>
                  <td>{food.origin}</td>
                  <td>{food.price}</td>
                  <td>{food.protein}</td>
                  <td>{food.fat}</td>
                  <td>{food.fiber}</td>
                  <td>{food.moisture}</td>
                  <td>{food.dryMatter}</td>
                  <td>{food.calcium}</td>
                  <td>{food.phosphorus}</td>
                  <td>{food.sodium}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          startPage={startPage}
          endPage={endPage}
          setPage={setPage}
        />
      )}
    </div>
  );
};

export default PetFood;
