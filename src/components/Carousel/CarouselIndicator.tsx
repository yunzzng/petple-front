import { FC, useContext, useMemo } from "react";
import { CarouselContext } from ".";
import styles from "./Carousel.module.css";

interface CarouselIndicatorProps {
  className?: string;
}

const CarouselIndicator: FC<CarouselIndicatorProps> = ({ className }) => {
  const carouselContext = useContext(CarouselContext) ?? {
    carouselIndex: 0,
    setCarouselIndex: () => {},
    itemLength: 0,
  };

  const { carouselIndex, setCarouselIndex, itemLength } = carouselContext;
  const indexes = Array.from({ length: itemLength }, (_, index) => index);

  const carouselIndicatorCls = useMemo(() => {
    return `${styles.carouselIndicator} ${className || ""}`.trim();
  }, [className]);

  return (
    <div className={carouselIndicatorCls}>
      {indexes.map((index) => (
        <button
          key={index}
          className={index === carouselIndex ? styles.active : ""}
          onClick={() => setCarouselIndex(index)}
        />
      ))}
    </div>
  );
};

export default CarouselIndicator;