import { colors } from "@/styles/globals";
import { StyleSheet, Text, View } from "react-native";

export default function ScreenHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>لوحة التحكم</Text>
      <Text style={styles.subtitle}>اختر المرحلة الدراسية للمتابعة</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 24,
    paddingVertical: 30,
    alignItems: "flex-end",
  },
  title: {
    fontSize: 28,
    fontFamily: "Tajawal",
    color: colors.primary[900],
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Tajawal",
    color: colors.neutral[600],
    marginTop: 4,
  },
});
