import AddressSection from "@/components/add-student/address-section/AddressSection.component";
import ContactInfoSection from "@/components/add-student/contact-info-section/ContactInfoSection.component";
import ImageSection from "@/components/add-student/image-section/ImageSection.component";
import NotesSection from "@/components/add-student/notes-section/NotesSection.component";
import PersonalInfoSection from "@/components/add-student/personal-info-section/PersonalInfoSection.component";
import ScreenHeader from "@/components/add-student/screen-header/ScreenHeader.component";
import ServiceSection from "@/components/add-student/service-section/ServiceSection.component";
import SubmitSection from "@/components/add-student/submit-section/SubmitSection.component";
import { useStudentForm } from "@/hooks/useStudentForm";
import { colors, globalStyles } from "@/styles/globals";
import { useRouter } from "expo-router";
import { useRef } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AddStudent() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const form = useStudentForm();

  const sectionProps = {
    values: form.values,
    errors: form.errors,
    onChange: form.onChange,
  };

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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          ref={scrollRef}
          style={globalStyles.container}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <ScreenHeader />

          <ImageSection name={form.values.name} gender={form.values.gender} />

          <PersonalInfoSection {...sectionProps} />

          <ServiceSection
            {...sectionProps}
            stageOptions={form.stageOptions}
            classOptions={form.classOptions}
          />

          <ContactInfoSection {...sectionProps} />

          <AddressSection {...sectionProps} />

          <NotesSection {...sectionProps} />

          <SubmitSection
            onSubmit={handleSubmit}
            onCancel={() => router.back()}
            isSubmitting={form.isSubmitting}
            errorMessage={form.submitError}
            invalidCount={form.invalidCount}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
});
