import EmptyList from "@/components/shared/empty-list/EmptyList.component";
import { IStudent } from "@/constants/students";
import { FlatList, StyleSheet } from "react-native";
import StudentCard from "./student-card/StudentCard.component";

export default function StudentsList({ students }: { students: IStudent[] }) {
  return (
    <FlatList
      data={students}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <StudentCard student={item} />}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={<EmptyList text="لا يوجد مخدومين يطابقون البحث" />}
    />
  );
}

const styles = StyleSheet.create({
  listContent: { paddingBottom: 100, paddingTop: 5 },
});
