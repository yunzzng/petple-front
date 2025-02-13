import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import RegionSelector from "@/components/RegionSelector";
import styles from "./petMedical.module.css";
import Button from "@/components/Button";
import Map from "@/components/Map";
import { Search } from "@/components";
import { fetchHospitalData, fetchPharmacyData } from "../../apis/medical.api";

interface MedicalFacility {
  name: string;
  lat: number;
  lng: number;
  licenseDate?: string;
  businessState?: string;
  closeDate?: string;
  phone?: string;
  zipCode?: string;
  roadAddress?: string;
  lotAddress?: string;
}

const PetMedical = () => {
  const [selectedTab, setSelectedTab] = useState("hospital");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    setSelectedRegion(null);
    setSearchTerm("");
  };

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<MedicalFacility[]>({
    queryKey: ["medicalData", selectedTab, selectedRegion],
    queryFn: async () => {
      if (!selectedRegion) return [];
      return selectedTab === "hospital"
        ? await fetchHospitalData()
        : await fetchPharmacyData();
    },
    // api 재요청: 7일
    staleTime: 7 * 24 * 60 * 60 * 1000,
    // 자동실행을 막아줌
    enabled: !!selectedRegion,
  });

  const filteredData: MedicalFacility[] = searchTerm
    ? data.filter((item) => item.name.includes(searchTerm))
    : data;

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
            onRegionChange={setSelectedRegion}
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
                조회된 {selectedTab === "hospital" ? "병원" : "약국"}이
                없습니다. 지역을 선택하세요.
              </p>
            ) : (
              <ul className={styles.list}>
                {filteredData.map((item, index) => (
                  <li key={index} className={styles.listItem}>
                    <div className={styles.dataItem}>
                      <p className={styles.dataName}>{item.name}</p>
                      {item.licenseDate && (
                        <p className={styles.dataLicenseDate}>
                          개업일:{" "}
                          <span className={styles.dataValue}>
                            {item.licenseDate}
                          </span>
                        </p>
                      )}
                      {item.businessState && (
                        <p className={styles.dataBusinessState}>
                          상태:
                          <span className={styles.dataValue}>
                            {item.businessState}
                          </span>
                        </p>
                      )}
                      {item.closeDate && (
                        <p className={styles.dataCloseDate}>
                          폐업일:
                          <span className={styles.dataValue}>
                            {item.closeDate}
                          </span>
                        </p>
                      )}
                      {item.phone && (
                        <p className={styles.dataPhone}>
                          전화번호:
                          <span className={styles.dataValue}>{item.phone}</span>
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PetMedical;
