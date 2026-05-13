import { ViewStyle } from "react-native";

export default interface IButtonProps {
  onPress: () => void;
  variant?: "fill" | "outline" | "ghost" | "link";
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  children: React.ReactNode;
}
