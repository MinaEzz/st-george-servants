import SectionHeader from "@/components/shared/section-header/SectionHeader.component";
import { colors, globalStyles } from "@/styles/globals";
import { arabicPlural, toArabicDigits } from "@/utils/arabic";
import { formatShortArabicDate } from "@/utils/dates";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import AttendanceHistoryCard from "./attendance-history-card/AttendanceHistoryCard.component";
import { IAttendanceHistorySectionProps } from "./AttendanceHistorySection.types";

const CARDS_PER_ROW = 3;

function chunk<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let index = 0; index < items.length; index += size) {
    rows.push(items.slice(index, index + size));
  }
  return rows;
}

export default function AttendanceHistorySection({
  history,
}: IAttendanceHistorySectionProps) {
  const recorded = history.filter((item) => item.status !== null);
  const presentCount = recorded.filter((item) => item.status === "present").length;
  const rows = chunk(history, CARDS_PER_ROW);

  const summaryText =
    recorded.length > 0
      ? `حضر ${toArabicDigits(presentCount)} من آخر ${arabicPlural(recorded.length, {
          one: "خدمة",
          two: "خدمتين",
          few: "خدمات",
          many: "خدمة",
        })}`
      : null;

  return (
    <View style={styles.container}>
      <SectionHeader
        title="سجل الحضور"
        icon={<Ionicons name="calendar-outline" />}
      />

      {history.length === 0 ? (
        <View style={globalStyles.card}>
          <Text style={styles.emptyText}>لا يوجد سجل حضور لفصل المخدوم بعد</Text>
        </View>
      ) : (
        <>
          {summaryText ? <Text style={styles.summary}>{summaryText}</Text> : null}

          <View style={styles.rows}>
            {rows.map((row) => (
              <View key={row[0].date} style={styles.row}>
                {row.map((item) => (
                  <AttendanceHistoryCard
                    key={item.date}
                    date={formatShortArabicDate(item.date)}
                    status={item.status}
                  />
                ))}
                {/* خانات فاضية عشان آخر صف يحافظ على نفس عرض الكروت */}
                {Array.from({ length: CARDS_PER_ROW - row.length }, (_, index) => (
                  <View key={`spacer-${index}`} style={styles.spacer} />
                ))}
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  summary: {
    textAlign: "right",
    fontFamily: "Tajawal",
    fontSize: 13,
    color: colors.neutral[500],
    marginBottom: 10,
  },
  rows: { gap: 12 },
  row: {
    flexDirection: "row-reverse",
    gap: 12,
  },
  spacer: { flex: 1 },
  emptyText: {
    textAlign: "center",
    fontFamily: "Tajawal",
    fontSize: 14,
    color: colors.neutral[500],
  },
});
