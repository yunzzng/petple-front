import { FC, useMemo } from "react";
import styles from "./Carousel.module.css";
import useCarouselContext from "./hooks/useCarouselContext";

interface CarouselNavigatorProps {
  className?: string;
}

const CarouselNavigator: FC<CarouselNavigatorProps> = ({ className }) => {
  const { setCarouselIndex, itemLength } = useCarouselContext();

  const handleNavigation = (direction: "previous" | "next") => {
    setCarouselIndex((prevIndex) =>
      direction === "previous"
        ? prevIndex === 0
          ? itemLength - 1
          : prevIndex - 1
        : prevIndex === itemLength - 1
        ? 0
        : prevIndex + 1
    );
  };

  const carouselNavigatorCls = useMemo(() => {
    return `${styles.carouselNavigator} ${className || ""}`.trim();
  }, [className]);

  return (
    <div className={carouselNavigatorCls}>
      <button className={styles.navButton} onClick={() => handleNavigation("previous")}>
        {"<"}
      </button>
      <button className={styles.navButton} onClick={() => handleNavigation("next")}>
        {">"}
      </button>
    </div>
  );
};

export default CarouselNavigator;