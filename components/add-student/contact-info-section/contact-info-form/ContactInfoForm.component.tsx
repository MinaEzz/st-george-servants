import FormField from "@/components/shared/form/form-field/FormField.component";
import { globalStyles } from "@/styles/globals";
import type { IStudentFormSectionProps } from "@/types/student-form.types";
import { View } from "react-native";

export default function ContactInfoForm({
  values,
  errors,
  onChange,
}: IStudentFormSectionProps) {
  return (
    <View style={globalStyles.form}>
      <FormField
        label="رقم ولي الأمر"
        required
        value={values.parentPhoneNumber}
        onChangeText={(text) => onChange("parentPhoneNumber", text)}
        placeholder="01xxxxxxxxx"
        keyboardType="phone-pad"
        maxLength={14}
        error={errors.parentPhoneNumber}
        hint="11 رقم يبدأ بـ 010 أو 011 أو 012 أو 015"
      />

      <FormField
        label="رقم المخدوم (اختياري)"
        value={values.phoneNumber}
        onChangeText={(text) => onChange("phoneNumber", text)}
        placeholder="01xxxxxxxxx"
        keyboardType="phone-pad"
        maxLength={14}
        error={errors.phoneNumber}
      />
    </View>
  );
}
