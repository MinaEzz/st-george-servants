import { colors } from "@/styles/globals";
import { FlatList, StyleSheet, Text } from "react-native";
import AttendanceCard from "./attendance-card/AttendanceCard.component";

export default function AttendanceList({
  students,
  attendanceData,
  onStatusChange,
}: any) {
  return (
    <FlatList
      data={students}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <AttendanceCard
          student={item}
          currentStatus={attendanceData[item.id]}
          onStatusChange={onStatusChange}
        />
      )}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <Text style={styles.emptyText}>لا يوجد مخدوم بهذا الاسم..</Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 120,
  },
  emptyText: {
    textAlign: "center",
    fontFamily: "Tajawal",
    color: colors.neutral[400],
    marginTop: 50,
  },
});
