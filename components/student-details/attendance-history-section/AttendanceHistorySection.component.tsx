import { colors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AttendanceHistoryCard from "./attendance-history-card/AttendanceHistoryCard.component";

export default function AttendanceHistorySection() {
  const history = [
    { id: "4", date: "19 سبتمبر", status: "excused" },
    { id: "3", date: "26 سبتمبر", status: "absent" },
    { id: "2", date: "3 أكتوبر", status: "present" },
    { id: "1", date: "10 أكتوبر", status: "present" },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.titleContainer}>
          <Ionicons
            name="calendar-outline"
            size={24}
            color={colors.primary[900]}
          />
          <Text style={styles.sectionTitle}>سجل الحضور</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.viewAll}>عرض الكل</Text>
        </TouchableOpacity>
      </View>

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
  sectionHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 5,
  },
  sectionTitle: {
    fontFamily: "Tajawal",
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary[900],
  },
  viewAll: {
    fontFamily: "Tajawal",
    fontSize: 14,
    color: colors.secondary[400],
  },
  listContent: {
    flexDirection: "row-reverse",
  },
});
