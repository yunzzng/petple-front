import { FC, useEffect, Children, ReactNode, useMemo } from "react";
import styles from "./carousel.module.css";
import useCarouselContext from "./hooks/useCarouselContext";

interface CarouselItemListProps {
  children: ReactNode;
  className?: string;
}

const CarouselItemList: FC<CarouselItemListProps> = ({
  children,
  className,
}) => {
  const { setItemLength } = useCarouselContext();

  const carouselItemListCls = useMemo(() => {
    return `${styles.carouselItemList} ${className || ""}`.trim();
  }, [className]);

  useEffect(() => {
    const itemCount = Children.count(children);
    if (itemCount !== 0) {
      setItemLength(itemCount);
    }
  }, [children, setItemLength]);

  return <div className={carouselItemListCls}>{children}</div>;
};

export default CarouselItemList;
