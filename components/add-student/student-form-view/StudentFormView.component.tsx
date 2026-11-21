import AddressSection from "@/components/add-student/address-section/AddressSection.component";
import ContactInfoSection from "@/components/add-student/contact-info-section/ContactInfoSection.component";
import ImageSection from "@/components/add-student/image-section/ImageSection.component";
import NotesSection from "@/components/add-student/notes-section/NotesSection.component";
import PersonalInfoSection from "@/components/add-student/personal-info-section/PersonalInfoSection.component";
import ScreenHeader from "@/components/add-student/screen-header/ScreenHeader.component";
import ServiceSection from "@/components/add-student/service-section/ServiceSection.component";
import SubmitSection from "@/components/add-student/submit-section/SubmitSection.component";
import { colors, globalStyles } from "@/styles/globals";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { IStudentFormViewProps } from "./StudentFormView.types";

/** شكل فورم المخدوم المشترك بين شاشة الإضافة وشاشة التعديل */
export default function StudentFormView({
  form,
  title,
  submitLabel,
  showNotes,
  onSubmit,
  onCancel,
  scrollRef,
}: IStudentFormViewProps) {
  const sectionProps = {
    values: form.values,
    errors: form.errors,
    onChange: form.onChange,
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
          <ScreenHeader title={title} />

          <ImageSection name={form.values.name} gender={form.values.gender} />

          <PersonalInfoSection {...sectionProps} />

          <ServiceSection
            {...sectionProps}
            stageOptions={form.stageOptions}
            classOptions={form.classOptions}
          />

          <ContactInfoSection {...sectionProps} />

          <AddressSection {...sectionProps} />

          {showNotes ? <NotesSection {...sectionProps} /> : null}

          <SubmitSection
            onSubmit={onSubmit}
            onCancel={onCancel}
            submitLabel={submitLabel}
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
