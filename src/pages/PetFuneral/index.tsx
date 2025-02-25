import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "@/components";
import Map from "@/components/Map";
import RegionSelector from "@/components/RegionSelector";
import styles from "../PetMedical/petMedical.module.css";
import stylesFuneral from "./funeral.module.css";
import usePagination from "@/hooks/usePagination";

import { FuneralService } from "@/types/petApi.type";
import Pagination from "@/components/Pagination";
import { getFuneralData } from "@/apis/public.api";

const PetFuneral = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data = [],
    isError,
  } = useQuery<FuneralService[]>({
    queryKey: ["funeralData", selectedRegion],
    queryFn: async () => {
      if (!selectedRegion) return [];
      return await getFuneralData(selectedRegion);
    },
    staleTime: 7 * 24 * 60 * 60 * 1000,
    enabled: !!selectedRegion,
  });

  // 검색 필터 적용
  const filteredData = data.filter((item) => item.title.includes(searchTerm));

  // 페이지네이션 훅
  const { page, setPage, paginatedData, totalPages, startPage, endPage } =
    usePagination(filteredData);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>반려동물 장례 서비스 찾기</h2>
          <RegionSelector
            selectedRegion={selectedRegion}
            onRegionChange={(region) => {
              setSelectedRegion(region);
              setPage(1);
            }}
            className={stylesFuneral.selectedRegion}
          />
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.mapContainer}>
            <Map
              locations={paginatedData.map((item) => ({
                lat: item.lat,
                lng: item.lng,
                name: item.title,
              }))}
            />
          </div>

          <div className={styles.dataContainer}>
            <Search
              className={styles.searchContainer}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
            />

            {isError ? (
              <p className={styles.messageText}>
                데이터를 불러오는 중 오류가 발생했습니다.
              </p>
            ) : paginatedData.length === 0 ? (
              <p className={styles.messageText}>
                조회된 장례 서비스가 없습니다.
              </p>
            ) : (
              <>
                <ul className={styles.list}>
                  {paginatedData.map((item, index) => (
                    <li key={index} className={styles.listItem}>
                      <div className={styles.dataItem}>
                        <strong className={styles.dataName}>{item.title}</strong>
                        <br />
                        {item.phone && (
                          <p className={styles.dataPhone}>
                            전화번호:
                            <span className={styles.dataValue}>
                              {item.phone}
                            </span>
                          </p>
                        )}
                        {item.zipCode && (
                          <p className={styles.dataZipCode}>
                            우편번호:
                            <span className={styles.dataValue}>
                              {item.zipCode}
                            </span>
                          </p>
                        )}
                        {item.roadAddress && (
                          <p className={styles.dataRoadAddress}>
                            도로명 주소:
                            <span className={styles.dataValue}>
                              {item.roadAddress}
                            </span>
                          </p>
                        )}
                        {item.lotAddress && (
                          <p className={styles.dataLotAddress}>
                            지번 주소:
                            <span className={styles.dataValue}>
                              {item.lotAddress}
                            </span>
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>

                {totalPages > 1 && (
                  <Pagination
                    page={page}
                    totalPages={totalPages}
                    startPage={startPage}
                    endPage={endPage}
                    setPage={setPage}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PetFuneral;
