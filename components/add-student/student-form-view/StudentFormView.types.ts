import type { StudentFormState } from "@/hooks/useStudentForm";
import type { RefObject } from "react";
import type { ScrollView } from "react-native";

export interface IStudentFormViewProps {
  form: StudentFormState;
  title: string;
  submitLabel: string;
  /** قسم الملاحظات بيظهر في الإضافة بس (التعديل بيتم من صفحة المخدوم) */
  showNotes: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  scrollRef?: RefObject<ScrollView | null>;
}
