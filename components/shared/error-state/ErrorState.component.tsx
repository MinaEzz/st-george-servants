import Button from "@/components/UI/button/Button.component";
import { colors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { IErrorStateProps } from "./ErrorState.types";

export default function ErrorState({ message, onRetry }: IErrorStateProps) {
  return (
    <View style={styles.container}>
      <Ionicons name="cloud-offline-outline" size={56} color={colors.neutral[300]} />
      <Text style={styles.message}>{message}</Text>
      {onRetry ? (
        <Button variant="outline" onPress={onRetry}>
          <Ionicons name="refresh" size={20} color={colors.primary[600]} />
          <Text style={styles.retryText}>إعادة المحاولة</Text>
        </Button>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingHorizontal: 24,
  },
  message: {
    textAlign: "center",
    fontFamily: "Tajawal",
    fontSize: 15,
    color: colors.neutral[500],
  },
  retryText: {
    fontFamily: "Tajawal",
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primary[600],
  },
});
