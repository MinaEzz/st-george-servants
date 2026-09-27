import { Href } from "expo-router";
import { ViewStyle } from "react-native";

export default interface IStatCardProps {
  number: string | number;
  label: string;
  backgroundColor: string;
  numberColor?: string;
  style?: ViewStyle;
  href?: Href;
}
