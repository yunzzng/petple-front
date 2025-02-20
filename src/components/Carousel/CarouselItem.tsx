import { FC, ReactNode, useContext, useMemo } from "react";
import { CarouselContext } from ".";
import styles from "./Carousel.module.css";

interface CarouselItemProps {
  index: number;
  children: ReactNode;
  className?: string;
}

const CarouselItem: FC<CarouselItemProps> = ({ children, index, className }) => {
  const carouselContext = useContext(CarouselContext) ?? { carouselIndex: 0 };
  const { carouselIndex } = carouselContext;

  const carouselItemCls = useMemo(() => {
    return `${styles.carouselItem} ${className || ""}`.trim();
  }, [className]);

  if (carouselIndex !== index) {
    return null;
  }

  return <div className={carouselItemCls}>{children}</div>;
};

export default CarouselItem;