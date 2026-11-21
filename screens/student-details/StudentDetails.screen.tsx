import AttendanceHistorySection from "@/components/student-details/attendance-history-section/AttendanceHistorySection.component";
import ButtonsSection from "@/components/student-details/buttons-section/ButtonsSection.component";
import NotesSection from "@/components/student-details/notes-section/NotesSection.component";
import PersonalInfoSection from "@/components/student-details/personal-info-section/PersonalInfoSection.component";
import QuickActionsSection from "@/components/student-details/quick-actions-section/QuickActionsSection.component";
import ScreenHeader from "@/components/student-details/screen-header/ScreenHeader.component";
import { useClasses } from "@/hooks/useClasses";
import { useStudents } from "@/hooks/useStudents";
import { globalStyles } from "@/styles/globals";
import { ScrollView, View } from "react-native";

export default function StudentDetails({ studentId }: { studentId: string }) {
  const { getStudentById } = useStudents();
  const { getClassById, getStageById } = useClasses();

  const student = getStudentById(studentId);
  const className = student ? getClassById(student.classId)?.name : undefined;
  const stageName = student ? getStageById(student.stageId)?.name : undefined;

  if (!student) return null;

  return (
    <View style={globalStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ScreenHeader
          name={student.name}
          grade={`${stageName} - ${className}`}
          gender={student.gender}
          image={student.image}
        />
        <QuickActionsSection
          phone={student.phoneNumber}
          location={student.address}
        />
        <PersonalInfoSection student={student} />
        <AttendanceHistorySection />
        <NotesSection studentId={studentId} />
        <ButtonsSection />
      </ScrollView>
    </View>
  );
}
