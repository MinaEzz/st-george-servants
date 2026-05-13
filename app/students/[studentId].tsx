import StudentDetails from "@/screens/student-details/StudentDetails.screen";
import { useLocalSearchParams } from "expo-router";

export default function StudentDetailsScreen() {
  const { studentId } = useLocalSearchParams();

  return <StudentDetails studentId={studentId as string} />;
}
