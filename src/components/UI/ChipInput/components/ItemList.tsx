import { FC } from "react";
import { useChipContext } from "./Root";
import { ItemsListProps } from "../types";
import Item from "./Item";

const ItemsList: FC<ItemsListProps> = ({ className }) => {
  const { items } = useChipContext();
  return (
    <ul className={className}>
      {items.map((title, index) => (
        <Item key={`chip-item-${index}`} title={title}>
          #{title}
        </Item>
      ))}
    </ul>
  );
};

export default ItemsList;
