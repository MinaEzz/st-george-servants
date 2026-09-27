import { colors } from "@/styles/globals";
import { StyleSheet, View } from "react-native";
import StatCard from "./stat-card/StatCard.component";

export default function StatsSection() {
  return (
    <View style={styles.statsGrid}>
      <StatCard
        number="120"
        label="إجمالي المخدومين"
        backgroundColor={colors.primary[50]}
        href={{ pathname: "/(tabs)/students", params: { filter: "all" } }}
      />
      <StatCard
        number="45"
        label="حضور اليوم"
        backgroundColor="#E8F5E9"
        numberColor="#2E7D32"
        href={{ pathname: "/(tabs)/students", params: { filter: "present" } }}
      />
      <StatCard
        number="12"
        label="غياب اليوم"
        backgroundColor={colors.secondary[50]}
        numberColor={colors.secondary[600]}
        href={{ pathname: "/(tabs)/students", params: { filter: "absent" } }}
      />
      <StatCard
        number="12"
        label="يحتاجون متابعة"
        backgroundColor="#FFEBEE"
        numberColor="#C62828"
        href={{
          pathname: "/(tabs)/students",
          params: { filter: "follow-up" },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 30,
    flexWrap: "wrap",
    rowGap: 15,
  },
});
