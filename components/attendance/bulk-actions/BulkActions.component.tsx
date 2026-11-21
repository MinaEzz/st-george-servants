import { colors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IBulkActionsProps } from "./BulkActions.types";

export default function BulkActions({
  onMarkRemainingPresent,
  onClearAll,
  canMarkRemaining,
  canClear,
}: IBulkActionsProps) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onMarkRemainingPresent}
        disabled={!canMarkRemaining}
        style={[styles.button, !canMarkRemaining && styles.disabled]}
      >
        <Ionicons
          name="checkmark-done-outline"
          size={18}
          color={colors.primary[700]}
        />
        <Text style={styles.text}>تحديد الباقي حاضر</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onClearAll}
        disabled={!canClear}
        style={[styles.button, !canClear && styles.disabled]}
      >
        <Ionicons name="refresh-outline" size={18} color={colors.primary[700]} />
        <Text style={styles.text}>مسح التحديد</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    gap: 10,
    marginBottom: 12,
  },
  button: {
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: colors.primary[50],
    borderRadius: 12,
    paddingVertical: 10,
  },
  disabled: {
    opacity: 0.4,
  },
  text: {
    fontFamily: "Tajawal",
    fontSize: 13,
    fontWeight: "bold",
    color: colors.primary[700],
  },
});
