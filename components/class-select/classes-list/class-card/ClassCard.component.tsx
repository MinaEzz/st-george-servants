import { colors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IClassCardProps from "./ClassCard.types";

export default function ClassCard({ item, onPress }: IClassCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.infoSection}>
        <Text style={styles.className}>{item.name}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{item.studentsCount}</Text>
          <Ionicons
            name="people-outline"
            size={16}
            color={colors.primary[600]}
          />
        </View>
        <Ionicons name="chevron-back" size={20} color={colors.neutral[300]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 18,
    flexDirection: "row-reverse", // للتنسيق العربي
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  infoSection: {
    flex: 1,
    alignItems: "flex-end",
  },
  className: {
    fontSize: 18,
    fontFamily: "Tajawal",
    fontWeight: "bold",
    color: colors.primary[900],
  },
  subText: {
    fontSize: 14,
    fontFamily: "Tajawal",
    color: colors.neutral[500],
    marginTop: 4,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  countBadge: {
    flexDirection: "row",
    backgroundColor: colors.primary[50],
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: "center",
    gap: 6,
  },
  countText: {
    fontSize: 14,
    fontFamily: "Tajawal",
    fontWeight: "bold",
    color: colors.primary[700],
  },
});
