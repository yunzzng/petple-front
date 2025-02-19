import { FC, useContext, useMemo } from "react";
import { CarouselContext } from ".";
import styles from "./Carousel.module.css";

interface CarouselNavigatorProps {
  className?: string;
}

const CarouselNavigator: FC<CarouselNavigatorProps> = ({ className }) => {
  const carouselContext = useContext(CarouselContext) ?? {
    setCarouselIndex: () => {},
    itemLength: 0,
  };

  const { setCarouselIndex, itemLength } = carouselContext;

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
      <button
        className={styles.navButton}
        onClick={() => handleNavigation("previous")}
      >
        {"<"}
      </button>
      <button
        className={styles.navButton}
        onClick={() => handleNavigation("next")}
      >
        {">"}
      </button>
    </div>
  );
};

export default CarouselNavigator;