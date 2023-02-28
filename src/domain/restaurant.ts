type Category = "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";

interface Restaurant {
  category: Category;
  name: string;
  takingTime: number;
  description?: string;
  link?: string;
}
