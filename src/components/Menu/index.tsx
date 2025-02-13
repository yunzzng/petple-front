import { useMemo } from "react";
import styles from "./menu.module.css";

interface MenuItem {
  id: number;
  label: string;
  link: string;
  image: string;
}

interface MenuProps {
  menuList: MenuItem[];
  className?: string;
}

const Menu = ({ menuList, className }: MenuProps) => {
  const menuCls = useMemo(() => {
    return `${styles.menuContainer} ${className || ""}`.trim();
  }, [className]);

  return (
    <div className={`${styles.petMenuSection} ${className || ""}`}>
      <div className={menuCls}>
        {menuList.map((item: MenuItem) => (
          <a key={item.id} href={item.link} className={styles.menuItem}>
            <img src={item.image} alt={item.label} />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Menu;