import { colors } from "@/styles/globals";
import { todayDate } from "@/utils/todayData";
import { StyleSheet, Text, View } from "react-native";

export default function ScreenHeader() {
  const today = todayDate();

  return (
    <View style={styles.welcomeHeader}>
      <View>
        <Text style={styles.welcomeText}>أهلاً بك يا خادم</Text>
        <Text style={styles.churchText}>
          كنيسة الشهيد العظيم مارجرجس - حدائق حلوان
        </Text>
        <Text style={styles.dateText}>{today}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  welcomeText: {
    fontSize: 22,
    fontFamily: "Tajawal",
    fontWeight: "bold",
    color: colors.primary[900],
    textAlign: "right",
  },
  churchText: {
    fontSize: 14,
    fontFamily: "Tajawal",
    color: colors.neutral[500],
    textAlign: "right",
    marginTop: 2,
  },
  dateText: {
    fontSize: 13,
    fontFamily: "Tajawal",
    color: colors.primary[600],
    textAlign: "right",
    marginTop: 5,
  },
});
