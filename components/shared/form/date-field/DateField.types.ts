import type { ISODateString } from "@/types/common.types";
import type { StyleProp, ViewStyle } from "react-native";

export interface IDateFieldProps {
  label: string;
  /** YYYY-MM-DD أو نص فاضي لو لسه ما اتختارش */
  value: ISODateString | "";
  onChange: (value: ISODateString) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  /** كام سنة لورا تظهر في قايمة السنين (الافتراضي 40) */
  yearsBack?: number;
  /** لو الحقل فاضي، الاختيار بيبدأ من السنة الحالية ناقص القيمة دي (الافتراضي 8) */
  defaultAge?: number;
  containerStyle?: StyleProp<ViewStyle>;
}

export interface IDateParts {
  day: number;
  month: number;
  year: number;
}
