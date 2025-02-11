import { FC, useContext, useEffect, Children, ReactNode } from "react";
import { CarouselContext } from ".";
import styles from "./Carousel.module.css";

interface CarouselItemListProps {
  children: ReactNode;
}

const CarouselItemList: FC<CarouselItemListProps> = ({ children }) => {
  const carouselContext = useContext(CarouselContext) ?? { setItemLength: () => {} };
  const { setItemLength } = carouselContext;

  useEffect(() => {
    const totalItems = Children.count(children);
    setItemLength(totalItems);
  }, [children, setItemLength]);

  return <div className={styles.carouselItemList}>{children}</div>;
};

export default CarouselItemList;