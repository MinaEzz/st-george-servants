import SectionHeader from "@/components/shared/section-header/SectionHeader.component";
import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, View } from "react-native";
import AttendanceHistoryCard from "./attendance-history-card/AttendanceHistoryCard.component";

const history = [
  { id: "4", date: "19 سبتمبر", status: "excused" },
  { id: "3", date: "26 سبتمبر", status: "absent" },
  { id: "2", date: "3 أكتوبر", status: "present" },
  { id: "1", date: "10 أكتوبر", status: "present" },
];

export default function AttendanceHistorySection() {
  return (
    <View style={styles.container}>
      <SectionHeader
        title="سجل الحضور"
        icon={<Ionicons name="calendar-outline" />}
        viewAllHref="/"
      />
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <AttendanceHistoryCard date={item.date} status={item.status as any} />
        )}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        inverted
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  listContent: {
    flexDirection: "row-reverse",
  },
});
