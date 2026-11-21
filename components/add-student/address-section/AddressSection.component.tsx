import SectionHeader from "@/components/shared/section-header/SectionHeader.component";
import { globalStyles } from "@/styles/globals";
import type { IStudentFormSectionProps } from "@/types/student-form.types";
import { FontAwesome5 } from "@expo/vector-icons";
import { View } from "react-native";
import AddressForm from "./address-form/AddressForm.component";

export default function AddressSection(props: IStudentFormSectionProps) {
  return (
    <View style={globalStyles.section}>
      <SectionHeader
        title="العنوان والمدرسة"
        icon={<FontAwesome5 name={"map"} />}
      />
      <View style={globalStyles.card}>
        <AddressForm {...props} />
      </View>
    </View>
  );
}
