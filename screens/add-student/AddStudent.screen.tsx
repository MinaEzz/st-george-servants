import StudentFormView from "@/components/add-student/student-form-view/StudentFormView.component";
import { useStudentForm } from "@/hooks/useStudentForm";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { Alert, ScrollView } from "react-native";

export default function AddStudent() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const form = useStudentForm();

  const handleSubmit = async () => {
    const result = await form.submit();

    if (!result) {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
      return;
    }

    const noteWarning = result.noteSaved
      ? ""
      : "\nتعذر حفظ الملاحظة، تقدر تضيفها من صفحة المخدوم.";

    Alert.alert(
      "تم الحفظ",
      `تمت إضافة ${result.student.name} بنجاح.\nكود المخدوم: ${result.student.code}${noteWarning}`,
      [
        {
          text: "إضافة مخدوم آخر",
          onPress: () => {
            form.reset();
            scrollRef.current?.scrollTo({ y: 0, animated: true });
          },
        },
        {
          text: "عرض المخدوم",
          onPress: () => router.replace(`/students/${result.student.id}`),
        },
      ],
    );
  };

  return (
    <StudentFormView
      form={form}
      title="إضافة مخدوم جديد"
      submitLabel="حفظ المخدوم"
      showNotes
      onSubmit={handleSubmit}
      onCancel={() => router.back()}
      scrollRef={scrollRef}
    />
  );
}
