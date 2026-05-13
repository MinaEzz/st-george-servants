import { colors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import IInfoRowProps from "./InfoRow.types";

export default function InfoRow({ icon, label, value }: IInfoRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.textContainer}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <Ionicons
        name={icon as any}
        size={20}
        color={colors.primary[600]}
        style={styles.icon}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 10 },
  textContainer: { flex: 1, alignItems: "flex-end", marginRight: 15 },
  label: { fontFamily: "Tajawal", fontSize: 12, color: colors.neutral[400] },
  value: {
    fontFamily: "Tajawal",
    fontSize: 15,
    fontWeight: "600",
    color: "#333",
  },
  icon: { backgroundColor: colors.primary[50], padding: 8, borderRadius: 10 },
  divider: {
    height: 1,
    backgroundColor: colors.neutral[100],
    marginVertical: 5,
  },
});
