import { useEffect, useMemo, useState } from "react";
import regions from "@/consts/regionData";
import styles from "./regionSelector.module.css";
import { Button } from "..";

interface RegionSelectorProps {
  selectedRegion: string | null;
  onRegionChange: (region: string | null) => void;
  className?: string;
  selectedTab?: string; 
}

const RegionSelector = ({ selectedRegion, onRegionChange, className, selectedTab  }: RegionSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickSelect = (region: { id: string; name: string }) => {
    if (region.name !== "경기" && region.name !== "서울") {
      alert("준비중입니다.");
      setIsOpen(false);
      return;
    }
    onRegionChange(region.name);
    setIsOpen(false);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [selectedTab]);

  const regionCls = useMemo(() => {
    return `${styles.regionDropdown} ${className || ""}`.trim();
  }, [className]);

  return (
    <div className={styles.regionContainer}>
      <Button 
        label={`${selectedRegion || "지역선택"} 🔻`} 
        onClick={() => setIsOpen(!isOpen)} 
        className={styles.regionButton} 
      />

      {isOpen && (
        <div className={regionCls}>
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