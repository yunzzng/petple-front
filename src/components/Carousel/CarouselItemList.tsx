import { FC, useEffect, Children, ReactNode, useMemo } from "react";
import styles from "./Carousel.module.css";
import useCarouselContext from "./hooks/useCarouselContext";

interface CarouselItemListProps {
  children: ReactNode;
  className?: string;
}

const CarouselItemList: FC<CarouselItemListProps> = ({ children, className }) => {
  const { setItemLength } = useCarouselContext();

  const carouselItemListCls = useMemo(() => {
    return `${styles.carouselItemList} ${className || ""}`.trim();
  }, [className]);

  useEffect(() => {
    setItemLength(Children.count(children));
  }, [children, setItemLength]);

  return <div className={carouselItemListCls}>{children}</div>;
};

export default CarouselItemList;