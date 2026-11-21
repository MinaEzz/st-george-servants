import type { StyleProp, ViewStyle } from "react-native";

export interface IPickerItem {
  label: string;
  value: number;
}

export interface IPickerColumnProps {
  label: string;
  items: IPickerItem[];
  selectedValue: number;
  onSelect: (value: number) => void;
  containerStyle?: StyleProp<ViewStyle>;
}
