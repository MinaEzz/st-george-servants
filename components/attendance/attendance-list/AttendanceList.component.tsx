import EmptyList from "@/components/shared/empty-list/EmptyList.component";
import { FlatList, StyleSheet } from "react-native";
import AttendanceCard from "./attendance-card/AttendanceCard.component";
import { IAttendanceListProps } from "./AttendanceList.types";

export default function AttendanceList({
  students,
  attendanceData,
  onStatusChange,
  emptyText = "لا يوجد مخدوم بهذا الإسم...",
}: IAttendanceListProps) {
  return (
    <FlatList
      data={students}
      extraData={attendanceData}
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
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={<EmptyList text={emptyText} />}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 120,
  },
});
