import { FC, useContext, useEffect, Children, ReactNode, useMemo } from "react";
import { CarouselContext } from ".";
import styles from "./Carousel.module.css";

interface CarouselItemListProps {
  children: ReactNode;
  className?: string;
}

const CarouselItemList: FC<CarouselItemListProps> = ({ children, className }) => {
  const carouselContext = useContext(CarouselContext) ?? { setItemLength: () => {} };
  const { setItemLength } = carouselContext;

  const carouselItemListCls = useMemo(() => {
    return `${styles.carouselItemList} ${className || ""}`.trim();
  }, [className]);

  useEffect(() => {
    const totalItems = Children.count(children);
    setItemLength(totalItems);
  }, [children, setItemLength]);

  return <div className={carouselItemListCls}>{children}</div>;
};

export default CarouselItemList;