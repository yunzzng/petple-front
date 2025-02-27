// import menu1 from "/images/petName_menu.png";
// import menu2 from "/images/petMedi_menu.png";
// import menu3 from "/images/petPlace_menu.png";
// import menu4 from "/images/petFuneral_menu.png";
// import menu5 from "/images/petFood_menu.png";

interface MenuItem {
  id: number;
  label: string;
  image: string;
  link: string;
}

const menuList: MenuItem[] = [
  { id: 1, label: "펫네임", image: "/images/petName_menu.png", link: "/roulette" },
  { id: 2, label: "펫메디", image: "/images/petMedi_menu.png", link: "/petmedi" },
  { id: 3, label: "펫플레이스", image: "/images/petPlace_menu.png", link: "/petplace" },
  { id: 4, label: "펫퓨너럴", image:"/images/petFuneral_menu.png", link: "/petfuneral" },
  { id: 5, label: "펫푸드", image: "/images/petFood_menu.png", link: "/petfood" },
];

export default menuList;
export type { MenuItem };
