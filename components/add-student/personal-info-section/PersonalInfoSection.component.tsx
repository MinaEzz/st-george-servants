import SectionHeader from "@/components/shared/section-header/SectionHeader.component";
import { globalStyles } from "@/styles/globals";
import type { IStudentFormSectionProps } from "@/types/student-form.types";
import { FontAwesome5 } from "@expo/vector-icons";
import { View } from "react-native";
import PersonalInfoForm from "./personal-info-form/PersonalInfoForm.component";

export default function PersonalInfoSection(props: IStudentFormSectionProps) {
  return (
    <View style={globalStyles.section}>
      <SectionHeader
        title="البيانات الشخصية"
        icon={<FontAwesome5 name={"address-card"} />}
      />
      <View style={globalStyles.card}>
        <PersonalInfoForm {...props} />
      </View>
    </View>
  );
}
