import FormField from "@/components/shared/form/form-field/FormField.component";
import { globalStyles } from "@/styles/globals";
import type { IStudentFormSectionProps } from "@/types/student-form.types";
import { View } from "react-native";

export default function AddressForm({
  values,
  errors,
  onChange,
}: IStudentFormSectionProps) {
  return (
    <View style={globalStyles.form}>
      <FormField
        label="العنوان"
        required
        multiline
        value={values.address}
        onChangeText={(text) => onChange("address", text)}
        placeholder="مثال: 14 شارع توتونجي - حدائق حلوان"
        error={errors.address}
      />

      <FormField
        label="المدرسة (اختياري)"
        value={values.school}
        onChangeText={(text) => onChange("school", text)}
        placeholder="اسم المدرسة"
        error={errors.school}
      />
    </View>
  );
}
