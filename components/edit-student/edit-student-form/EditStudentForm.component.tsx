import StudentFormView from "@/components/add-student/student-form-view/StudentFormView.component";
import { useStudentForm } from "@/hooks/useStudentForm";
import { useRouter } from "expo-router";
import { useRef } from "react";
import { Alert, ScrollView } from "react-native";
import { IEditStudentFormProps } from "./EditStudentForm.types";

export default function EditStudentForm({ student }: IEditStudentFormProps) {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const form = useStudentForm({ student });

  const handleSubmit = async () => {
    const result = await form.submit();

    if (!result) {
      scrollRef.current?.scrollTo({ y: 0, animated: true });
      return;
    }

    Alert.alert("تم الحفظ", "تم تحديث بيانات المخدوم بنجاح.", [
      { text: "تمام", onPress: () => router.back() },
    ]);
  };

  const handleCancel = () => {
    if (!form.isDirty) {
      router.back();
      return;
    }

    Alert.alert(
      "تغييرات غير محفوظة",
      "لو خرجت دلوقتي هتضيع التعديلات اللي عملتها. تكمل؟",
      [
        { text: "رجوع", style: "cancel" },
        {
          text: "تجاهل التعديلات",
          style: "destructive",
          onPress: () => router.back(),
        },
      ],
    );
  };

  return (
    <StudentFormView
      form={form}
      title="تعديل بيانات المخدوم"
      submitLabel="حفظ التعديلات"
      showNotes={false}
      onSubmit={handleSubmit}
      onCancel={handleCancel}
      scrollRef={scrollRef}
    />
  );
}
