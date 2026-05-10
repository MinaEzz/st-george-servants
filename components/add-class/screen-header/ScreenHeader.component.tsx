import { colors, globalStyles } from "@/styles/globals";
import { StyleSheet, Text, View } from "react-native";

export default function ScreenHeader({ stageName }: { stageName: string }) {
  return (
    <View style={globalStyles.header}>
      <Text style={styles.title}>إضافة فصل جديد</Text>
      <Text style={styles.subtitle}>
        أنت الآن تضيف فصلاً لمرحلة {stageName}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontFamily: "Tajawal",
    fontWeight: "bold",
    color: colors.primary[900],
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Tajawal",
    color: colors.neutral[600],
    marginTop: 5,
  },
});
