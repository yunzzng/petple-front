interface Category {
  id: string;
  name: string;
}

const categories: Category[] = [
  { id: "12", name: "관광" },
  { id: "14", name: "문화시설" },
  { id: "15", name: "축제" },
  { id: "28", name: "레저" },
  { id: "32", name: "숙박" },
  { id: "38", name: "쇼핑" },
  { id: "39", name: "식당" },
];

export default categories;
export type { Category }; 