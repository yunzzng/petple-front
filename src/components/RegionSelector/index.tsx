import { useState } from "react";
import regions from "@/consts/regionData";
import styles from "./regionSelector.module.css";
import { Button } from "..";

const RegionSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>("지역선택");

  const handleClickSelect = (region: { id: string; name: string }) => {
    if (region.name !== "경기") {
      alert("준비중입니다.");
      setIsOpen(false);
      return;
    }
    setSelectedRegion(region.name);
    setIsOpen(false);
  };

  return (
    <div className={styles.regionContainer}>

      <Button label={`${selectedRegion} 🔻`} onClick={() => setIsOpen(!isOpen)} className={styles.regionButton} />

      {isOpen && (
        <div className={styles.regionDropdown}>
          <div className={styles.gridContainer}>
            {regions.map((region: { id: string; name: string }) => (
              <div
                key={region.id}
                className={styles.regionItem}
                onClick={() => handleClickSelect(region)}
              >
                {region.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RegionSelector;