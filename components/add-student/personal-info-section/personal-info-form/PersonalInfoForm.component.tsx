import { colors, globalStyles } from "@/styles/globals";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function PersonalInfoForm() {
  return (
    <View style={globalStyles.form}>
      <View style={globalStyles.inputGroup}>
        <Text style={globalStyles.label}>الاسم الكامل</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="أدخل اسم المخدوم رباعي"
          placeholderTextColor={colors.neutral[400]}
          value={""}
        />
      </View>

      <View style={styles.row}>
        <View style={[globalStyles.inputGroup, { flex: 1 }]}>
          <Text style={globalStyles.label}>النوع</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="اختر النوع"
            placeholderTextColor={colors.neutral[400]}
            value={""}
          />
        </View>

        <View style={[globalStyles.inputGroup, { flex: 1 }]}>
          <Text style={globalStyles.label}>تاريخ الميلاد</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="dd/mm/yyyy"
            placeholderTextColor={colors.neutral[400]}
            value={""}
          />
        </View>
      </View>

      <View style={globalStyles.inputGroup}>
        <Text style={globalStyles.label}>العمر</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="عمر المخدوم يحسب تلقائياً"
          placeholderTextColor={colors.neutral[400]}
          value={""}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 20,
  },
});
