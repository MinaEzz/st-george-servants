import EditStudentForm from "@/components/edit-student/edit-student-form/EditStudentForm.component";
import ErrorState from "@/components/shared/error-state/ErrorState.component";
import { useStudents } from "@/hooks/useStudents";
import { colors, globalStyles } from "@/styles/globals";
import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EditStudent({ studentId }: { studentId: string }) {
  const { getStudentById, isLoading, error, refresh } = useStudents();
  const student = getStudentById(studentId);

  console.log("Edit Student: ", student);

  if (student) {
    return <EditStudentForm student={student} />;
  }

  if (error) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <ErrorState message={error} onRetry={refresh} />
      </SafeAreaView>
    );
  }

  if (isLoading) {
    return (
      <SafeAreaView style={[globalStyles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary[900]} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <ErrorState message="المخدوم ده غير موجود" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});
