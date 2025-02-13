import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search } from "@/components";
import Header from "@/components/Header";
import Map from "@/components/Map";
import RegionSelector from "@/components/RegionSelector";
import styles from "../PetMedical/petMedical.module.css";
import stylesFuneral from "./funeral.module.css";
import { fetchFuneralData } from "@/apis/funeral.api";

interface FuneralService {
  name: string;
  representativeName?: string;
  lat: number;
  lng: number;
  phone?: string;
  zipCode?: string;
  roadAddress?: string;
  lotAddress?: string;
}

const PetFuneral = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<FuneralService[]>({
    queryKey: ["funeralData", selectedRegion],
    queryFn: async () => {
      if (!selectedRegion) return [];
      return await fetchFuneralData();
    },
    // api 재요청: 7일
    staleTime: 7 * 24 * 60 * 60 * 1000,
    // 자동실행을 막아줌
    enabled: !!selectedRegion,
  });

  const filteredData = searchTerm
    ? data.filter((item) => item.name.includes(searchTerm))
    : data;

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h2 className={styles.title}>반려동물 장례 서비스 찾기</h2>
          <RegionSelector
            selectedRegion={selectedRegion}
            onRegionChange={setSelectedRegion}
            className={stylesFuneral.selectedRegion}
          />
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.mapContainer}>
            <Map
              locations={filteredData.map((item) => ({
                lat: item.lat,
                lng: item.lng,
                name: item.name,
              }))}
            />
          </div>
          <div className={styles.dataContainer}>
            <Search
              className={styles.searchContainer}
              placeholder="도시명을 입력하세요"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {isLoading ? (
              <p className={styles.loadingText}>로딩 중...</p>
            ) : isError ? (
              <p className={styles.errorText}>
                데이터를 불러오는 중 오류가 발생했습니다.
              </p>
            ) : filteredData.length === 0 ? (
              <p className={styles.noDataText}>
                조회된 장례 서비스가 없습니다.
              </p>
            ) : (
              <ul className={styles.list}>
                {filteredData.map((item, index) => (
                  <li key={index} className={styles.listItem}>
                    <div className={styles.dataItem}>
                      <strong className={styles.dataName}>{item.name}</strong>
                      <br />
                      {item.representativeName && (
                        <p className={styles.dataRep}>
                          대표자:{" "}
                          <span className={styles.dataValue}>
                            {item.representativeName}
                          </span>
                        </p>
                      )}
                      {item.phone && (
                        <p className={styles.dataPhone}>
                          전화번호:{" "}
                          <span className={styles.dataValue}>{item.phone}</span>
                        </p>
                      )}
                      {item.zipCode && (
                        <p className={styles.dataZipCode}>
                          우편번호:{" "}
                          <span className={styles.dataValue}>
                            {item.zipCode}
                          </span>
                        </p>
                      )}
                      {item.roadAddress && (
                        <p className={styles.dataRoadAddress}>
                          도로명 주소:{" "}
                          <span className={styles.dataValue}>
                            {item.roadAddress}
                          </span>
                        </p>
                      )}
                      {item.lotAddress && (
                        <p className={styles.dataLotAddress}>
                          지번 주소:{" "}
                          <span className={styles.dataValue}>
                            {item.lotAddress}
                          </span>
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PetFuneral;
