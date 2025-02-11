import { FC, useContext } from "react";
import { CarouselContext } from ".";
import styles from "./Carousel.module.css";

const CarouselNavigator: FC = () => {
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

  return (
    <div className={styles.carouselNavigator}>
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