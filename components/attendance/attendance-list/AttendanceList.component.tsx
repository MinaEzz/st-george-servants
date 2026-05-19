import EmptyList from "@/components/shared/empty-list/EmptyList.component";
import { FlatList, StyleSheet } from "react-native";
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
      ListEmptyComponent={<EmptyList text="لا يوجد مخدوم بهذا الإسم..." />}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 120,
  },
});
