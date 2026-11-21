import SelectField from "@/components/shared/form/select-field/SelectField.component";
import { colors, globalStyles } from "@/styles/globals";
import { StyleSheet, Text, View } from "react-native";
import { IServiceSectionProps } from "../ServiceSection.types";

export default function ServiceForm({
  values,
  errors,
  onChange,
  stageOptions,
  classOptions,
}: IServiceSectionProps) {
  return (
    <View style={globalStyles.form}>
      <SelectField
        label="المرحلة"
        required
        value={values.stageId}
        options={stageOptions}
        onChange={(value) => onChange("stageId", value)}
        placeholder="اختر المرحلة"
        error={errors.stageId}
      />

      <SelectField
        label="الفصل"
        required
        value={values.classId}
        options={classOptions}
        onChange={(value) => onChange("classId", value)}
        placeholder={values.stageId ? "اختر الفصل" : "اختر المرحلة أولاً"}
        disabled={!values.stageId}
        emptyText="لا توجد فصول في هذه المرحلة، أضف فصلاً من شاشة الفصول"
        error={errors.classId}
      />

      <Text style={styles.hint}>
        كود المخدوم بيتولد تلقائياً بعد الحفظ.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hint: {
    textAlign: "right",
    fontFamily: "Tajawal",
    fontSize: 12,
    color: colors.neutral[500],
  },
});
