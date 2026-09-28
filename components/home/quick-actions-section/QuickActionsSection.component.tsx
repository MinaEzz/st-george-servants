import SectionHeader from "@/components/shared/section-header/SectionHeader.component";
import { colors } from "@/styles/globals";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import ActionItem from "./action-item/ActionItem.component";

export default function QuickActionsSection() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <SectionHeader title="إجراءات سريعة" />
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
          onPress={() => {
            router.push("/students/add-student");
          }}
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
  container: {
    marginBottom: 20,
  },
  actionsGrid: {
    flexDirection: "row-reverse",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
    rowGap: 15,
  },
});
