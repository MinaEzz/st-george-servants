import EditStudent from "@/screens/edit-student/EditStudent.screen";
import { useLocalSearchParams } from "expo-router";

export default function EditStudentScreen() {
  const { studentId } = useLocalSearchParams<{ studentId: string }>();

  return <EditStudent studentId={studentId} />;
}
