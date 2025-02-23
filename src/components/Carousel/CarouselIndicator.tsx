import { FC, useMemo } from "react";
import styles from "./carousel.module.css";
import useCarouselContext from "./hooks/useCarouselContext";

interface CarouselIndicatorProps {
  className?: string;
}

const CarouselIndicator: FC<CarouselIndicatorProps> = ({ className }) => {
  const { carouselIndex, setCarouselIndex, itemLength } = useCarouselContext();

  const indexes = useMemo(() => Array.from({ length: itemLength }, (_, index) => index), [itemLength]);

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