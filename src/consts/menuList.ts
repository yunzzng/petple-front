import menu1 from "/images/petTalk_menu.png";
import menu2 from "/images/petMedi_menu.png";
import menu3 from "/images/petPlace_menu.png";
import menu4 from "/images/patFuneral_menu.png";

interface MenuItem {
  id: string;
  label: string;
  image: string;
  link: string;
}

const menuList: MenuItem[] = [
  { id: "pettalk", label: "펫톡", image: menu1, link: "/pettalk" },
  { id: "petmedi", label: "펫메디", image: menu2, link: "/petmedi" },
  { id: "petplace", label: "펫플레이스", image: menu3, link: "/petplace" },
  { id: "petfuneral", label: "펫퓨너럴", image: menu4, link: "/petfuneral" }
];

export default menuList;
export type { MenuItem }; 