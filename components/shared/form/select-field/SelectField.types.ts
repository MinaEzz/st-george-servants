import type { ISelectOption } from "@/types/common.types";
import type { StyleProp, ViewStyle } from "react-native";

export interface ISelectFieldProps {
  label: string;
  value: string;
  options: ISelectOption[];
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  /** عنوان الـ BottomSheet (الافتراضي هو الـ label) */
  sheetTitle?: string;
  /** الرسالة اللي بتظهر لو مفيش اختيارات */
  emptyText?: string;
  containerStyle?: StyleProp<ViewStyle>;
}
