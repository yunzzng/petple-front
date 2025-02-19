import { Button } from "@/components";
import styles from "./placeButton.module.css";

interface CategoryButtonsProps {
  categories: { id: string; name: string }[];
  selectedCategory: string;
  onSelectCategory: (id: string) => void;
}

const CategoryButtons = ({ categories, selectedCategory, onSelectCategory }: CategoryButtonsProps) => {
  return (
    <div className={styles.categoryButtons}>
      {categories.map((category) => (
        <Button
          key={category.id}
          className={`${styles.categoryButton} ${
            selectedCategory === category.id ? styles.activeCategory : ""
          }`}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </Button>
      ))}
    </div>
  );
};

export default CategoryButtons;