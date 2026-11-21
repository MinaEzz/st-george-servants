import SectionHeader from "@/components/shared/section-header/SectionHeader.component";
import { globalStyles } from "@/styles/globals";
import { FontAwesome5 } from "@expo/vector-icons";
import { View } from "react-native";
import ServiceForm from "./service-form/ServiceForm.component";
import { IServiceSectionProps } from "./ServiceSection.types";

export default function ServiceSection(props: IServiceSectionProps) {
  return (
    <View style={globalStyles.section}>
      <SectionHeader
        title="بيانات الخدمة"
        icon={<FontAwesome5 name={"cross"} />}
      />
      <View style={globalStyles.card}>
        <ServiceForm {...props} />
      </View>
    </View>
  );
}
