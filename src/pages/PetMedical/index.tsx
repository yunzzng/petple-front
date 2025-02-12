import { useState } from "react";
import RegionSelector from "@/components/RegionSelector";
import styles from "./petMedical.module.css";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import { Search } from "@/components";

const PetMedical = () => {
  const [selectedTab, setSelectedTab] = useState("hospital");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const handleTabChange = (tab: string) => {
    setSelectedTab(tab);
    setSelectedRegion(null);
  };

  return (
    <>
      <Header />
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
          <RegionSelector selectedRegion={selectedRegion} onRegionChange={setSelectedRegion} />
        </div>
        <div className={styles.contentWrapper}>
          <div className={styles.mapContainer}>
            <Map />
          </div>
          <div className={styles.dataContainer}>
            <Search className={styles.searchContainer} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PetMedical;