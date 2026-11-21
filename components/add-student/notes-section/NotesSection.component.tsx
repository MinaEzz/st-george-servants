import FormField from "@/components/shared/form/form-field/FormField.component";
import SectionHeader from "@/components/shared/section-header/SectionHeader.component";
import { globalStyles } from "@/styles/globals";
import type { IStudentFormSectionProps } from "@/types/student-form.types";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

export default function NotesSection({
  values,
  errors,
  onChange,
}: IStudentFormSectionProps) {
  return (
    <View style={globalStyles.section}>
      <SectionHeader
        title="ملاحظات"
        icon={<Ionicons name="chatbubbles-outline" />}
      />
      <View style={globalStyles.card}>
        <FormField
          label="ملاحظات عن المخدوم (اختياري)"
          multiline
          value={values.notes}
          onChangeText={(text) => onChange("notes", text)}
          placeholder="أي معلومات تفيد الخدام: ظروف الأسرة، اهتمامات، احتياجات خاصة..."
          error={errors.notes}
          hint="هتتسجل باسمك في ملاحظات المخدوم"
        />
      </View>
    </View>
  );
}
