import { colors } from "@/styles/globals";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import ActionItem from "./action-item/ActionItem.component";

export default function QuickActionsSection() {
  const router = useRouter();

  return (
    <View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>إجراءات سريعة</Text>
      </View>
      <View style={styles.actionsGrid}>
        <ActionItem
          title="تسجيل حضور"
          icon="checkmark-done-circle"
          color={colors.primary[900]}
          onPress={() => {
            router.push("/(tabs)/attendance");
          }}
          isPrimary={true}
        />
        <ActionItem
          title="إضافة مخدوم"
          icon="person-add-outline"
          color={colors.primary[900]}
          onPress={() => {}}
        />
        <ActionItem
          title="إضافة خادم"
          icon="people-outline"
          color={colors.primary[900]}
          onPress={() => {}}
        />
        <ActionItem
          title="التقارير"
          icon="bar-chart-outline"
          color={colors.primary[900]}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    marginBottom: 15,
    alignItems: "flex-end",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Tajawal",
    fontWeight: "bold",
    color: colors.primary[900],
  },
  actionsGrid: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    rowGap: 15,
    marginBottom: 30,
  },
  actionContent: {
    flex: 1,
    alignItems: "flex-end", // محاذاة النص لليمين داخل الكارت
    justifyContent: "center",
  },
  actionIcon: {
    marginRight: 10, // مسافة بسيطة بين النص والأيقونة
  },
  actionTitle: {
    fontSize: 14,
    fontFamily: "Tajawal",
    fontWeight: "bold",
    textAlign: "right",
  },
  actionCardPrimary: {
    backgroundColor: colors.primary[900], // نفس لون الـ Percentage
    width: "48.5%", // كارتين في الصف
    height: 80, // طول مناسب زي الصورة
    borderRadius: 16,
    flexDirection: "row-reverse", // أيقونة يسار، نص يمين
    alignItems: "center",
    padding: 15,
    elevation: 5,
    shadowColor: colors.primary[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  actionCardOutline: {
    backgroundColor: "#fff",
    width: "48.5%",
    height: 80,
    borderRadius: 16,
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: colors.neutral[100], // إطار باهت زي الصورة
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
});
