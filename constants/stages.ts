export const STAGES = [
  {
    id: "1",
    name: "ملايكة",
    slug: "angels",
    icon: "balloon-outline",
    color: "#FFB74D", // برتقالي هادي
  },
  {
    id: "2",
    name: "ابتدائي",
    slug: "primary",
    icon: "school-outline",
    color: "#4FC3F7", // أزرق سماوي
  },
  {
    id: "3",
    name: "إعدادي",
    slug: "preparatory",
    icon: "book-outline",
    color: "#81C784", // أخضر مريح
  },
  {
    id: "4",
    name: "ثانوي",
    slug: "secondary",
    icon: "rocket-outline",
    color: "#BA68C8", // بنفسجي شبابي
  },
  {
    id: "5",
    name: "خريجين",
    slug: "graduates",
    icon: "briefcase-outline",
    color: "#4DB6AC", // تركواز وقور
  },
];

export interface IStage {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
}
