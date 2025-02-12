import styles from "./menu.module.css";

interface MenuItem {
  id: number;
  label: string;
  link: string;
  image: string;
}

interface MenuProps {
  menuList: MenuItem[];
}

const Menu = ({ menuList }: MenuProps) => {
  return (
    <div className={styles.petMenuSection}>
      <div className={styles.menuContainer}>
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