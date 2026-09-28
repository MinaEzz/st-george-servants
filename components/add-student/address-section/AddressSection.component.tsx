import SectionHeader from "@/components/shared/section-header/SectionHeader.component";
import { colors } from "@/styles/globals";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";

export default function AddressSection() {
  return (
    <View style={styles.container}>
      <SectionHeader
        title="العنوان و المدرسة"
        icon={<FontAwesome5 name={"map"} />}
      />
      <View style={styles.card}>{/* <PersonalInfoForm /> */}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    elevation: 2,
    borderRightWidth: 5,
    borderRightColor: colors.secondary[400],
  },
});
