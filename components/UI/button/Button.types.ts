import { colors } from "@/styles/globals";
import { TextStyle, ViewStyle } from "react-native";

export default interface IButtonProps {
  onPress: () => void;
  variant?: "fill" | "outline" | "ghost" | "link";
  color?: keyof typeof colors.primary | string;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  children: React.ReactNode;
}
