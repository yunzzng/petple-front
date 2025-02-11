import { FC, useContext } from "react";
import { CarouselContext } from ".";
import styles from "./Carousel.module.css"; // CSS 모듈 임포트

const CarouselIndicator: FC = () => {
  const carouselContext = useContext(CarouselContext) ?? {
    carouselIndex: 0,
    setCarouselIndex: () => {},
    itemLength: 0,
  };

  const { carouselIndex, setCarouselIndex, itemLength } = carouselContext;

  const indexes = Array.from({ length: itemLength }, (_, index) => index);

  return (
    <div className={styles.carouselIndicator}>
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