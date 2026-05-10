import { colors } from "@/styles/globals";
import { StyleSheet, Text, View } from "react-native";
import IStatCardProps from "./StatCard.types";

export default function StatCard({
  label,
  number,
  backgroundColor,
  numberColor,
  style,
}: IStatCardProps) {
  return (
    <View style={[styles.statCard, { backgroundColor }, style]}>
      <Text
        style={[styles.statNumber, numberColor ? { color: numberColor } : {}]}
      >
        {number}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statCard: {
    width: "48%",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary[800],
    fontFamily: "Tajawal",
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "Tajawal",
    color: colors.neutral[600],
    textAlign: "center",
    marginTop: 6,
  },
});
