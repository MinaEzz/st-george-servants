import { colors } from "@/styles/globals";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function FilterItem({
  label,
  isActive,
  onPress,
}: {
  label: string;
  isActive: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.filterBadge, isActive && styles.activeFilterBadge]}
    >
      <Text style={[styles.filterText, isActive && styles.activeFilterText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  filterBadge: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.neutral[200],
  },
  activeFilterBadge: {
    backgroundColor: colors.primary[900],
    borderColor: colors.primary[900],
  },
  filterText: {
    fontFamily: "Tajawal",
    fontSize: 13,
    color: colors.neutral[600],
  },
  activeFilterText: { color: "#fff", fontWeight: "bold" },
});
