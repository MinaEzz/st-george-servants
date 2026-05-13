import { IStudent } from "@/constants/students";
import { colors } from "@/styles/globals";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import InfoRow from "./info-row/InfoRow.component";

export default function PersonalInfoSection({
  student,
}: {
  student: IStudent;
}) {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <View style={styles.titleContainer}>
          <FontAwesome5
            name={"address-card"}
            size={24}
            color={colors.primary[900]}
          />
          <Text style={styles.sectionTitle}>بيانات المخدوم</Text>
        </View>
      </View>
      <View style={styles.card}>
        <InfoRow
          icon="call-outline"
          label="رقم ولي الأمر"
          value={student.parentPhoneNumber}
        />
        <View style={styles.divider} />
        <InfoRow
          icon="location-outline"
          label="العنوان"
          value={student.address}
        />
        <View style={styles.divider} />
        <InfoRow icon="school-outline" label="المدرسة" value={student.school} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  sectionHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  titleContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 5,
  },
  sectionTitle: {
    fontFamily: "Tajawal",
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary[900],
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    elevation: 2,
    borderRightWidth: 5,
    borderRightColor: colors.secondary[400],
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral[100],
    marginVertical: 5,
  },
});
