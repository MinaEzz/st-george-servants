import { colors, globalStyles } from "@/styles/globals";
import { todayDate } from "@/utils/todayData";
import { StyleSheet, Text, View } from "react-native";

export default function ScreenHeader({
  stageName,
  className,
}: {
  stageName: string;
  className: string;
}) {
  const today = todayDate();

  return (
    <View style={globalStyles.header}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>مرحلة {stageName}</Text>
      </View>
      <Text style={styles.title}>قائمة مخدومين {className}</Text>
      <Text style={styles.date}>{today}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.primary[900],
    alignSelf: "flex-end",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: { color: "#fff", fontFamily: "Tajawal", fontSize: 12 },
  title: {
    fontFamily: "Tajawal",
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary[900],
    textAlign: "right",
    marginTop: 10,
  },
  date: {
    fontFamily: "Tajawal",
    fontSize: 14,
    color: colors.neutral[500],
    textAlign: "right",
  },
});
