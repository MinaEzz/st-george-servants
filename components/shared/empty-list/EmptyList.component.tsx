import { colors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function EmptyList({
  text = "لا يوجد نتائج تطابق بحثك",
}: {
  text: string;
}) {
  return (
    <View style={styles.emptyContainer}>
      <Ionicons name="search-sharp" size={48} color={colors.neutral[300]} />
      <Text style={styles.emptyText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    gap: 10,
  },
  emptyText: {
    fontFamily: "Tajawal",
    fontSize: 14,
    color: colors.neutral[400],
  },
});
