import { Ionicons } from "@expo/vector-icons";

export default interface IRecentUpdateCardProps {
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  variant: "primary" | "secondary" | "danger" | "success";
}
