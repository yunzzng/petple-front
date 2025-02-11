import { FC, ReactNode, useContext } from "react";
import { CarouselContext } from ".";
import styles from "./Carousel.module.css"; // CSS 모듈 임포트

interface CarouselItemProps {
  index: number;
  children: ReactNode;
}

const CarouselItem: FC<CarouselItemProps> = ({ children, index }) => {
  const carouselContext = useContext(CarouselContext) ?? { carouselIndex: 0 };
  const { carouselIndex } = carouselContext;

  if (carouselIndex !== index) {
    return null;
  }

  return <div className={styles.carouselItem}>{children}</div>;
};

export default CarouselItem;