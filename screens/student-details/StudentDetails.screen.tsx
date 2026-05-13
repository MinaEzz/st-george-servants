import AttendanceHistorySection from "@/components/student-details/attendance-history-section/AttendanceHistorySection.component";
import ButtonsSection from "@/components/student-details/buttons-section/ButtonsSection.component";
import NotesSection from "@/components/student-details/notes-section/NotesSection.component";
import PersonalInfoSection from "@/components/student-details/personal-info-section/PersonalInfoSection.component";
import QuickActionsSection from "@/components/student-details/quick-actions-section/QuickActionsSection.component";
import ScreenHeader from "@/components/student-details/screen-header/ScreenHeader.component";
import { CLASSES } from "@/constants/classes";
import { STAGES } from "@/constants/stages";
import { STUDENTS } from "@/constants/students";
import { globalStyles } from "@/styles/globals";
import { ScrollView, View } from "react-native";

export default function StudentDetails({ studentId }: { studentId: string }) {
  const student = STUDENTS.find((s) => s.id === studentId);
  const className = CLASSES.find((c) => c.id === student?.classId)?.name;
  const stageName = STAGES.find((s) => s.id === student?.stageId)?.name;
  console.log(student);
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
