import { colors } from "@/styles/globals";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RecentUpdateCard from "./recent-update-card/RecentUpdateCard.component";

export default function RecentUpdatesSection() {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <TouchableOpacity>
          <Text style={styles.viewAll}>عرض الكل</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>آخر التحديثات</Text>
      </View>
      <RecentUpdateCard
        title="تم تسجيل غياب: أبانوب رأفت"
        subtitle="منذ ١٥ دقيقة"
        icon="notifications"
        variant="secondary"
      />
      <RecentUpdateCard
        title="عيد ميلاد اليوم: مارينا إياد"
        subtitle="لا تنسى تهنئتها!"
        icon="gift"
        variant="primary"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontFamily: "Tajawal",
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary[900],
  },
  viewAll: {
    fontFamily: "Tajawal",
    fontSize: 14,
    color: colors.secondary[600],
    fontWeight: "600",
  },
});
