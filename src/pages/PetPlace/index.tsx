import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import categories from "@/consts/placeCategories";
import { useNavigate } from "react-router-dom";
import styles from "./place.module.css";
import { PlaceInfo } from "@/types/petApi.type";
import { Button, Search } from "@/components";
import defaultImg from "/images/titleLogo.png";
import usePagination from "@/hooks/usePagination";
import { fetchPlacesData } from "@/apis/public.api";
import Pagination from "@/components/Pagination";

const Place = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].id
  );
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<PlaceInfo[]>({
    queryKey: ["placesData", selectedCategory],
    queryFn: () => fetchPlacesData(selectedCategory),
    staleTime: 7 * 24 * 60 * 60 * 1000,
  });

  // 검색 필터 적용
  const filteredData = data.filter((item) => item.title.includes(searchTerm));

  // 페이지네이션 훅
  const { page, setPage, paginatedData, totalPages, startPage, endPage } =
    usePagination(filteredData);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>전국 반려동물 동반 장소 찾기</h2>

      <div className={styles.categoryButtons}>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            className={`${styles.categoryButton} ${
              selectedCategory === cat.id ? styles.activeCategory : ""
            }`}
            onClick={() => {
              setSelectedCategory(cat.id);
              setPage(1);
            }}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      <Search
        className={styles.searchContainer}
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setPage(1);
        }}
        labelText="장소 검색"
        placeholderText="반려동물 동반 장소를 검색하세요"
      />

      <div className={styles.placeList}>
        {isLoading ? (
          <p className={styles.messageText}>데이터를 불러오는 중...</p>
        ) : isError ? (
          <p className={styles.messageText}>
            데이터를 불러오는 중 오류가 발생했습니다.
          </p>
        ) : paginatedData.length === 0 ? (
          <p className={styles.messageText}>검색 결과가 없습니다.</p>
        ) : (
          paginatedData.map((place) => (
            <div
              key={place.id}
              className={styles.placeItem}
              onClick={() => navigate(`/place/${place.id}`)}
            >
              <img
                src={place.imageUrl || defaultImg}
                alt={place.title}
                className={styles.placeImage}
              />
              <div>
                <h3>{place.title}</h3>
                <p>
                  <strong>주소:</strong> {place.address}
                </p>
                <p>
                  <strong>전화번호:</strong> {place.tel}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        startPage={startPage}
        endPage={endPage}
        setPage={setPage}
      />
    </div>
  );
};

export default Place;
