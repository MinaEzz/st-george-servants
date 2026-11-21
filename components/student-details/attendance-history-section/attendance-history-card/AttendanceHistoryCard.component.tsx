import { colors, statusColors } from "@/styles/globals";
import { StyleSheet, Text, View } from "react-native";
import IAttendanceHistoryCardProps from "./AttendanceHistoryCard.types";

const STATUS_CONFIG = {
  present: {
    label: "حاضر",
    color: statusColors.present.icon,
    bg: statusColors.present.background,
  },
  absent: {
    label: "غائب",
    color: statusColors.absent.icon,
    bg: statusColors.absent.background,
  },
  excused: {
    label: "معتذر",
    color: statusColors.excused.icon,
    bg: statusColors.excused.background,
  },
  none: {
    label: "لم يُسجّل",
    color: colors.neutral[400],
    bg: colors.neutral[100],
  },
};

export default function AttendanceHistoryCard({
  date,
  status,
}: IAttendanceHistoryCardProps) {
  const config = STATUS_CONFIG[status ?? "none"];

  return (
    <View style={[styles.card, { borderColor: config.color }]}>
      <Text style={styles.dateText}>{date}</Text>
      <View style={[styles.statusBadge, { backgroundColor: config.bg }]}>
        <Text style={[styles.statusText, { color: config.color }]}>
          {config.label}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    borderTopWidth: 4,
  },
  dateText: {
    fontFamily: "Tajawal",
    fontSize: 13,
    color: colors.neutral[600],
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  statusText: {
    fontFamily: "Tajawal",
    fontSize: 11,
    fontWeight: "bold",
  },
});
