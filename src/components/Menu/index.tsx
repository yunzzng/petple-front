import { useMemo } from "react";
import styles from "./menu.module.css";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const menuCls = useMemo(() => {
    return `${styles.menuContainer} ${className || ""}`.trim();
  }, [className]);

  return (
    <div className={`${styles.petMenuSection} ${className || ""}`}>
      <ul className={menuCls}>
        {menuList.map((item: MenuItem) => (
          <li key={item.id} className={styles.menuItem}>
            <img src={item.image} alt={item.label} onClick={() => navigate(item.link)}/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;