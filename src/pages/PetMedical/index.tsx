import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import RegionSelector from "@/components/RegionSelector";
import styles from "./petMedical.module.css";
import Map from "@/components/Map";
import { Button, Search } from "@/components";
import usePagination from "@/hooks/usePagination";
import Pagination from "@/components/Pagination";
import { MedicalService, MedicalType } from "@/types/petApi.type";
import { getMedicalData } from "@/apis/public.api";

const PetMedical = () => {
  const [selectedTab, setSelectedTab] = useState<MedicalType>("hospital");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleTabChange = (tab: MedicalType) => {
    setSelectedTab(tab);
    setSelectedRegion(null);
    setSearchTerm("");
  };

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<MedicalService[]>({
    queryKey: ["medicalData", selectedTab, selectedRegion],
    queryFn: async () => {
      if (!selectedRegion) return [];
      return await getMedicalData(selectedRegion, selectedTab);
    },
    staleTime: 7 * 24 * 60 * 60 * 1000,
    enabled: !!selectedRegion,
  });

  // 검색 필터 적용
  const filteredData = data.filter((item) => item.name.includes(searchTerm));

  // 페이지네이션 훅
  const { page, setPage, paginatedData, totalPages, startPage, endPage } =
    usePagination(filteredData);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.tabContainer}>
          <Button
            label="병원"
            onClick={() => handleTabChange("hospital")}
            className={`${styles.tabButton} ${
              selectedTab === "hospital" ? styles.active : ""
            }`}
          />
          <Button
            label="약국"
            onClick={() => handleTabChange("pharmacy")}
            className={`${styles.tabButton} ${
              selectedTab === "pharmacy" ? styles.active : ""
            }`}
          />
        </div>

        <div className={styles.titleContainer}>
          <h2 className={styles.title}>
            {selectedTab === "hospital" ? "동물병원 찾기" : "동물약국 찾기"}
          </h2>
          <RegionSelector
            selectedRegion={selectedRegion}
            onRegionChange={(region) => {
              setSelectedRegion(region);
              setPage(1);
            }}
          />
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.mapContainer}>
            <Map
              locations={paginatedData
                .filter((item) => item.lat !== null && item.lng !== null)
                .map((item) => ({
                  lat: item.lat!,
                  lng: item.lng!,
                  name: item.name,
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

            {isLoading ? (
              <p className={styles.messageText}>데이터를 불러오는 중...</p>
            ) : isError ? (
              <p className={styles.messageText}>
                데이터를 불러오는 중 오류가 발생했습니다.
              </p>
            ) : paginatedData.length === 0 ? (
              <p className={styles.messageText}>
                조회된 {selectedTab === "hospital" ? "병원" : "약국"}이
                없습니다. 지역을 선택하세요.
              </p>
            ) : (
              <>
                <ul className={styles.list}>
                  {paginatedData.map((item, index) => (
                    <li key={index} className={styles.listItem}>
                      <div className={styles.dataItem}>
                        <p className={styles.dataName}>{item.name}</p>
                        {item.businessState && (
                          <p className={styles.dataBusinessState}>
                            상태:
                            <span className={styles.dataValue}>
                              {item.businessState}
                            </span>
                          </p>
                        )}
                        {item.phone && (
                          <p className={styles.dataPhone}>
                            전화번호:
                            <span className={styles.dataValue}>
                              {item.phone}
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

export default PetMedical;
