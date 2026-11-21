import SectionHeader from "@/components/shared/section-header/SectionHeader.component";
import { colors, globalStyles } from "@/styles/globals";
import type { IStudent } from "@/types/student.types";
import { formatAge } from "@/utils/calcAge";
import { formatNumericDate } from "@/utils/dates";
import { FontAwesome5 } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import InfoRow from "./info-row/InfoRow.component";

const EMPTY_VALUE = "—";

export default function PersonalInfoSection({
  student,
}: {
  student: IStudent;
}) {
  const age = formatAge(student.birthDate);
  const birthText = student.birthDate
    ? `${formatNumericDate(student.birthDate)}${age ? ` (${age})` : ""}`
    : EMPTY_VALUE;

  return (
    <View style={styles.container}>
      <SectionHeader
        title="بيانات المخدوم"
        icon={<FontAwesome5 name={"address-card"} />}
      />
      <View style={globalStyles.card}>
        <InfoRow icon="pricetag-outline" label="كود المخدوم" value={`#${student.code}`} />
        <View style={styles.divider} />
        <InfoRow icon="calendar-outline" label="تاريخ الميلاد" value={birthText} />
        <View style={styles.divider} />
        <InfoRow
          icon="call-outline"
          label="رقم ولي الأمر"
          value={student.parentPhoneNumber || EMPTY_VALUE}
        />
        {student.phoneNumber ? (
          <>
            <View style={styles.divider} />
            <InfoRow
              icon="phone-portrait-outline"
              label="رقم المخدوم"
              value={student.phoneNumber}
            />
          </>
        ) : null}
        <View style={styles.divider} />
        <InfoRow
          icon="location-outline"
          label="العنوان"
          value={student.address || EMPTY_VALUE}
        />
        <View style={styles.divider} />
        <InfoRow
          icon="school-outline"
          label="المدرسة"
          value={student.school || EMPTY_VALUE}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20 },
  divider: {
    height: 1,
    backgroundColor: colors.neutral[100],
    marginVertical: 5,
  },
});
