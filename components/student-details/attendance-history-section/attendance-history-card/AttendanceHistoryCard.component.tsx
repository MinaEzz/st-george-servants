import { colors } from "@/styles/globals";
import { StyleSheet, Text, View } from "react-native";
import IAttendanceHistoryCardProps from "./AttendanceHistoryCard.types";

export default function AttendanceHistoryCard({
  date,
  status,
}: IAttendanceHistoryCardProps) {
  const statusConfig = {
    present: { label: "حاضر", color: "#4CAF50", bg: "#E8F5E9" },
    absent: { label: "غائب", color: "#F44336", bg: "#FFEBEE" },
    excused: { label: "معتذر", color: "#FF9800", bg: "#FFF3E0" },
  };
  const config = statusConfig[status];

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
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    width: 100,
    alignItems: "center",
    marginLeft: 12,
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
