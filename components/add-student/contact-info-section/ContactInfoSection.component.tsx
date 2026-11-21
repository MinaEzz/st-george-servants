import SectionHeader from "@/components/shared/section-header/SectionHeader.component";
import { globalStyles } from "@/styles/globals";
import type { IStudentFormSectionProps } from "@/types/student-form.types";
import { FontAwesome5 } from "@expo/vector-icons";
import { View } from "react-native";
import ContactInfoForm from "./contact-info-form/ContactInfoForm.component";

export default function ContactInfoSection(props: IStudentFormSectionProps) {
  return (
    <View style={globalStyles.section}>
      <SectionHeader
        title="بيانات الاتصال"
        icon={<FontAwesome5 name={"phone"} />}
      />
      <View style={globalStyles.card}>
        <ContactInfoForm {...props} />
      </View>
    </View>
  );
}
