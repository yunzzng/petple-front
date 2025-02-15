import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import RegionSelector from "@/components/RegionSelector";
import styles from "./petMedical.module.css";
import Button from "@/components/Button";
import Map from "@/components/Map";
import { Search } from "@/components";

import usePagination from "@/hooks/usePagination";
import { fetchHospitalData, fetchPharmacyData } from "@/apis/medical";
import { MedicalFacility } from "@/types/medical.type";


const PetMedical = () => {
  const [selectedTab, setSelectedTab] = useState<"hospital" | "pharmacy">("hospital");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleTabChange = (tab: "hospital" | "pharmacy") => {
    setSelectedTab(tab);
    setSelectedRegion(null);
    setSearchTerm("");
  };

  const { data = [], isLoading, isError } = useQuery<MedicalFacility[]>({
    queryKey: ["medicalData", selectedTab, selectedRegion],
    queryFn: async () => {
      if (!selectedRegion) return [];
      return selectedTab === "hospital"
        ? await fetchHospitalData(selectedRegion)
        : await fetchPharmacyData(selectedRegion);
    },
    staleTime: 7 * 24 * 60 * 60 * 1000,
    enabled: !!selectedRegion,
  });

  // 검색 필터 적용
  const filteredData = data.filter((item) => searchTerm ? item.name.includes(searchTerm) : true);

  // 페이지네이션 훅
  const { page, setPage, paginatedData, totalPages, startPage, endPage } = usePagination(filteredData);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.tabContainer}>
          <Button label="병원" onClick={() => handleTabChange("hospital")} className={`${styles.tabButton} ${selectedTab === "hospital" ? styles.active : ""}`} />
          <Button label="약국" onClick={() => handleTabChange("pharmacy")} className={`${styles.tabButton} ${selectedTab === "pharmacy" ? styles.active : ""}`} />
        </div>

        <div className={styles.titleContainer}>
          <h2 className={styles.title}>{selectedTab === "hospital" ? "동물병원 찾기" : "동물약국 찾기"}</h2>
          <RegionSelector selectedRegion={selectedRegion} onRegionChange={(region) => { setSelectedRegion(region); setPage(1); }} />
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.mapContainer}>
            <Map 
              locations={paginatedData
                .filter((item) => item.lat !== null && item.lng !== null)
                .map((item) => ({ lat: item.lat!, lng: item.lng!, name: item.name }))}
            />
          </div>

          <div className={styles.dataContainer}>
            <Search className={styles.searchContainer} value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }} />

            {isLoading ? (
              <p className={styles.loadingText}>로딩 중...</p>
            ) : isError ? (
              <p className={styles.errorText}>데이터를 불러오는 중 오류가 발생했습니다.</p>
            ) : paginatedData.length === 0 ? (
              <p className={styles.noDataText}>조회된 {selectedTab === "hospital" ? "병원" : "약국"}이 없습니다. 지역을 선택하세요.</p>
            ) : (
              <>
                <ul className={styles.list}>
                  {paginatedData.map((item, index) => (
                    <li key={index} className={styles.listItem}>
                      <div className={styles.dataItem}>
                        <p className={styles.dataName}>{item.name}</p>
                        {item.businessState && <p className={styles.dataBusinessState}>상태: <span className={styles.dataValue}>{item.businessState}</span></p>}
                        {item.phone && <p className={styles.dataPhone}>전화번호: <span className={styles.dataValue}>{item.phone}</span></p>}
                        {item.roadAddress && <p className={styles.dataRoadAddress}>도로명 주소: <span className={styles.dataValue}>{item.roadAddress}</span></p>}
                        {item.lotAddress && <p className={styles.dataLotAddress}>지번 주소: <span className={styles.dataValue}>{item.lotAddress}</span></p>}
                      </div>
                    </li>
                  ))}
                </ul>

                <div className={styles.pagination}>
                  <button onClick={() => setPage(Math.max(page - 1, 1))} disabled={page === 1} className={styles.pageButton}>이전</button>

                  {[...Array(endPage - startPage + 1)].map((_, i) => (
                    <button key={startPage + i} onClick={() => setPage(startPage + i)} className={`${styles.pageNumber} ${page === startPage + i ? styles.activePage : ""}`}>
                      {startPage + i}
                    </button>
                  ))}

                  <button onClick={() => setPage(Math.min(page + 1, totalPages))} disabled={page === totalPages} className={styles.pageButton}>다음</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PetMedical;