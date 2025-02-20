interface FoodCategory {
  id: string;
  name: string;
}

const foodCategories: FoodCategory[] = [
  { id: "livestock", name: "축산물" },
  { id: "fishery", name: "수산물" },
  { id: "agriculture", name: "농산물" },
  { id: "byproduct", name: "부산물" },
  { id: "etc", name: "기타" },
];

export default foodCategories;
export type { FoodCategory };