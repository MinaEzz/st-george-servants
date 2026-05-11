import { colors } from "@/styles/globals";
import { todayDate } from "@/utils/todayData";
import { StyleSheet, Text, View } from "react-native";
import IScreenHeaderProps from "./ScreenHeader.types";

export default function ScreenHeader({
  stats,
  className,
  stageName,
}: IScreenHeaderProps) {
  const today = todayDate();
  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>مرحلة {stageName}</Text>
      </View>
      <Text style={styles.title}>تحضير {className}</Text>
      <Text style={styles.date}>{today}</Text>

      <View style={styles.progressSection}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>نسبة الحضور</Text>
          <Text style={styles.progressPercentage}>
            {stats.percentage || 0}%
          </Text>
        </View>
        <View style={styles.progressBarBg}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${stats.percentage || 0}%` },
            ]}
          />
        </View>
      </View>

      <View style={styles.statsSummary}>
        <Text style={[styles.summaryItem, { color: "#388E3C" }]}>
          ● {stats.present} حاضر
        </Text>
        <Text style={[styles.summaryItem, { color: "#D32F2F" }]}>
          ● {stats.absent} غائب
        </Text>
        <Text style={[styles.summaryItem, { color: "#F57C00" }]}>
          ● {stats.excused} اعتذار
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    marginBottom: 15,
    elevation: 4,
  },
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
  progressSection: { marginTop: 15 },
  progressInfo: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  progressText: {
    fontFamily: "Tajawal",
    fontSize: 12,
    color: colors.neutral[600],
  },
  progressPercentage: { fontFamily: "Tajawal", fontWeight: "bold" },
  progressBarBg: {
    height: 8,
    backgroundColor: colors.neutral[100],
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBarFill: { height: "100%", backgroundColor: colors.secondary[400] },
  statsSummary: {
    flexDirection: "row-reverse",
    justifyContent: "center",
    gap: 15,
    marginTop: 15,
  },
  summaryItem: { fontFamily: "Tajawal", fontSize: 12, fontWeight: "bold" },
});
