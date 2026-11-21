import type { StyleProp, TextInputProps, ViewStyle } from "react-native";

export interface IFormFieldProps
  extends Omit<TextInputProps, "style" | "editable"> {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  /** للعرض فقط (زي السن اللي بيتحسب تلقائياً) */
  readOnly?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}
