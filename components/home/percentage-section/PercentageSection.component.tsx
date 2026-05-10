import { colors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function PercentageSection() {
  return (
    <View style={styles.percentageCard}>
      <View style={styles.percentageInfo}>
        <Text style={styles.percentageTitle}>نسبة حضور اليوم</Text>
        <Text style={styles.percentageSubtitle}>
          أداء الخدمة متميز جداً اليوم!
        </Text>
        <View style={styles.percentageBadge}>
          <Ionicons name="trending-up" size={16} color="#2E7D32" />
          <Text style={styles.percentageBadgeText}>+5% عن الأسبوع الماضي</Text>
        </View>
      </View>

      {/* الجزء الخاص بالدائرة أو الرقم الكبير */}
      <View style={styles.progressContainer}>
        <View style={styles.outerCircle}>
          {/* هنا بنعمل محاكاة للدائرة التقدم */}
          <Text style={styles.percentageNumber}>75%</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  percentageCard: {
    backgroundColor: colors.primary[900], // لون غامق عشان يكسر الألوان الفاتحة اللي فوقه
    borderRadius: 24,
    padding: 20,
    flexDirection: "row-reverse", // اتجاه عربي
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
    elevation: 8,
    shadowColor: colors.primary[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  percentageInfo: {
    flex: 1,
    alignItems: "flex-end",
  },
  percentageTitle: {
    fontSize: 20,
    fontFamily: "Tajawal",
    fontWeight: "bold",
    color: "#fff",
  },
  percentageSubtitle: {
    fontSize: 13,
    fontFamily: "Tajawal",
    color: colors.primary[200],
    marginTop: 4,
  },
  percentageBadge: {
    flexDirection: "row-reverse",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 12,
    alignItems: "center",
    gap: 5,
  },
  percentageBadgeText: {
    color: "#fff",
    fontSize: 11,
    fontFamily: "Tajawal",
  },
  progressContainer: {
    width: 90,
    height: 90,
    justifyContent: "center",
    alignItems: "center",
  },
  outerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: "rgba(255, 255, 255, 0.1)", // الدائرة الباهتة خلف الرقم
    borderTopColor: colors.secondary[400], // الجزء المنور من الدائرة
    justifyContent: "center",
    alignItems: "center",
  },
  percentageNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    fontFamily: "Tajawal",
  },
});
