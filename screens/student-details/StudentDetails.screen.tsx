import AttendanceHistorySection from "@/components/student-details/attendance-history-section/AttendanceHistorySection.component";
import ButtonsSection from "@/components/student-details/buttons-section/ButtonsSection.component";
import FollowUpSection from "@/components/student-details/follow-up-section/FollowUpSection.component";
import NoteFormModal from "@/components/student-details/note-form-modal/NoteFormModal.component";
import NotesSection from "@/components/student-details/notes-section/NotesSection.component";
import PersonalInfoSection from "@/components/student-details/personal-info-section/PersonalInfoSection.component";
import QuickActionsSection from "@/components/student-details/quick-actions-section/QuickActionsSection.component";
import ScreenHeader from "@/components/student-details/screen-header/ScreenHeader.component";
import { useAttendance } from "@/hooks/useAttendance";
import { useClasses } from "@/hooks/useClasses";
import { useFollowUp } from "@/hooks/useFollowUp";
import { useNoteEditor } from "@/hooks/useNoteEditor";
import { useNotes } from "@/hooks/useNotes";
import { useStudents } from "@/hooks/useStudents";
import { getErrorMessage } from "@/services/errors";
import { globalStyles } from "@/styles/globals";
import type { INote } from "@/types/note.types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, ScrollView, View } from "react-native";

/** عدد أيام الخدمة اللي بتظهر في سجل الحضور بالتفاصيل */
const HISTORY_LENGTH = 6;

export default function StudentDetails({ studentId }: { studentId: string }) {
  const router = useRouter();
  const { getStudentById, setManualFollowUp } = useStudents();
  const { getClassById, getStageById } = useClasses();
  const { getStudentHistory } = useAttendance();
  const { getFollowUpStatus } = useFollowUp();
  const { generalNotes, followUpNotes } = useNotes(studentId);
  const editor = useNoteEditor(studentId);
  const [isUpdatingFollowUp, setIsUpdatingFollowUp] = useState(false);

  const student = getStudentById(studentId);
  console.log("Student Details: ", student);
  if (!student) return null;

  const className = getClassById(student.classId)?.name;
  const stageName = getStageById(student.stageId)?.name;
  const grade = [stageName, className].filter(Boolean).join(" - ");

  const handleToggleManual = async (value: boolean) => {
    setIsUpdatingFollowUp(true);

    try {
      await setManualFollowUp(student.id, value);
    } catch (caught) {
      Alert.alert("تعذر تحديث المتابعة", getErrorMessage(caught));
    } finally {
      setIsUpdatingFollowUp(false);
    }
  };

  const handleDeleteNote = (note: INote) => {
    const label = note.kind === "follow-up" ? "سجل الافتقاد ده" : "الملاحظة دي";

    Alert.alert(
      "تأكيد الحذف",
      `متأكد إنك عايز تحذف ${label}؟ مش هتقدر ترجّعها.`,
      [
        { text: "رجوع", style: "cancel" },
        {
          text: "حذف",
          style: "destructive",
          onPress: async () => {
            try {
              await editor.remove(note);
            } catch (caught) {
              Alert.alert("تعذر الحذف", getErrorMessage(caught));
            }
          },
        },
      ],
    );
  };

  return (
    <View style={globalStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ScreenHeader
          name={student.name}
          grade={grade}
          gender={student.gender}
          image={student.image}
        />

        <QuickActionsSection
          phone={student.parentPhoneNumber || student.phoneNumber}
          address={student.address}
        />

        <FollowUpSection
          status={getFollowUpStatus(student.id)}
          isUpdating={isUpdatingFollowUp}
          onToggleManual={handleToggleManual}
          onLogFollowUp={() => editor.openAdd("follow-up")}
        />

        <PersonalInfoSection student={student} />

        <AttendanceHistorySection
          history={getStudentHistory(student.id, HISTORY_LENGTH)}
        />

        <NotesSection
          title="سجل الافتقاد"
          icon={<Ionicons name="call-outline" />}
          notes={followUpNotes}
          emptyText="لسه ما اتسجلش أي افتقاد لهذا المخدوم"
          onEdit={editor.openEdit}
          onDelete={handleDeleteNote}
        />

        <NotesSection
          title="ملاحظات الخدام"
          icon={<Ionicons name="chatbubbles-outline" />}
          notes={generalNotes}
          emptyText="لا توجد ملاحظات بعد"
          onEdit={editor.openEdit}
          onDelete={handleDeleteNote}
        />

        <ButtonsSection
          onAddNote={() => editor.openAdd("general")}
          onEditStudent={() => router.push(`/students/edit/${student.id}`)}
        />
      </ScrollView>

      <NoteFormModal
        key={editor.state.openId}
        visible={editor.state.visible}
        mode={editor.state.mode}
        kind={editor.state.kind}
        note={editor.state.note}
        onClose={editor.close}
        onSubmit={editor.submit}
      />
    </View>
  );
}
