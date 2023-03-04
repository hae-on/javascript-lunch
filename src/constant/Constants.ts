export const CategoryImgPath: Readonly<{ [key: string]: string }> = {
  아시안: "category-asian.png",
  한식: "category-korean.png",
  양식: "category-western.png",
  중식: "category-chinese.png",
  일식: "category-japanese.png",
  기타: "category-etc.png",
};

export const OptionValue: Readonly<{ [key: string]: string }> = {
  TOTAL: "전체",
  NAME_ORDER: "이름순",
  DISTANCE_ORDER: "거리순",
};

export const Constants: Readonly<{ [key: string]: string }> = {
  RESTAURANT_LIST: "restaurantList",
  KOREAN: "ko-KR",
  CATEGORY_FILTER: "category-filter",
  SORTING_FILTER: "sorting-filter",
};

export const RestaurantSelect: Readonly<{ [key: string]: string[] }> = {
  CATEGORY: ["전체", "한식", "중식", "일식", "양식", "아시안", "기타"],
  SORTING: ["이름순", "거리순"],
};
