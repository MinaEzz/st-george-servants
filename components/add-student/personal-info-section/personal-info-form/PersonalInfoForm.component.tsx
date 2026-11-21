import DateField from "@/components/shared/form/date-field/DateField.component";
import FormField from "@/components/shared/form/form-field/FormField.component";
import SelectField from "@/components/shared/form/select-field/SelectField.component";
import { GENDER_OPTIONS } from "@/constants";
import { globalStyles } from "@/styles/globals";
import type { Gender } from "@/types/common.types";
import type { IStudentFormSectionProps } from "@/types/student-form.types";
import { formatAge } from "@/utils/calcAge";
import { StyleSheet, View } from "react-native";

export default function PersonalInfoForm({
  values,
  errors,
  onChange,
}: IStudentFormSectionProps) {
  const ageText = values.birthDate ? formatAge(values.birthDate) : "";

  return (
    <View style={globalStyles.form}>
      <FormField
        label="الاسم الكامل"
        required
        value={values.name}
        onChangeText={(text) => onChange("name", text)}
        placeholder="مثال: مارك ماجد جورج"
        error={errors.name}
        returnKeyType="next"
      />

      <View style={styles.row}>
        <SelectField
          label="النوع"
          required
          value={values.gender}
          options={GENDER_OPTIONS}
          onChange={(value) => onChange("gender", value as Gender)}
          placeholder="اختر النوع"
          error={errors.gender}
          containerStyle={styles.flex}
        />
        <DateField
          label="تاريخ الميلاد"
          required
          value={values.birthDate}
          onChange={(value) => onChange("birthDate", value)}
          error={errors.birthDate}
          containerStyle={styles.flex}
        />
      </View>

      <FormField
        label="السن"
        readOnly
        value={ageText}
        placeholder="بيتحسب تلقائياً من تاريخ الميلاد"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row-reverse",
    gap: 20,
  },
  flex: {
    flex: 1,
  },
});
