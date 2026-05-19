import { colors } from "@/styles/globals";
import { StyleSheet, Text, View } from "react-native";

export default function StatsSection({
  total,
  attendancePercentage,
}: {
  total: number;
  attendancePercentage: number;
}) {
  return (
    <View style={styles.statsRow}>
      <View style={[styles.statCard, styles.totalCard]}>
        <Text style={[styles.statNumber, { color: colors.primary[900] }]}>
          {total}
        </Text>
        <Text style={styles.statLabel}>إجمالي المخدومين</Text>
      </View>

      <View style={[styles.statCard, styles.attendanceCard]}>
        <Text style={[styles.statNumber, { color: "#4CAF50" }]}>
          {attendancePercentage}%
        </Text>
        <Text style={styles.statLabel}>نسبة حضور اليوم</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  statsRow: { flexDirection: "row-reverse", gap: 12, marginBottom: 20 },
  statCard: {
    flex: 1,
    height: 90,
    borderRadius: 18,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  totalCard: { backgroundColor: "#fff" },
  attendanceCard: { backgroundColor: "#E8F5E9" },
  statNumber: { fontFamily: "Tajawal", fontSize: 24, fontWeight: "bold" },
  statLabel: {
    fontFamily: "Tajawal",
    fontSize: 12,
    color: colors.neutral[600],
    marginTop: 2,
  },
});
