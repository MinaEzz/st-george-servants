import Button from "@/components/UI/button/Button.component";
import { colors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function NoClassState() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Ionicons name="school-outline" size={56} color={colors.neutral[300]} />
      <Text style={styles.title}>لم يتم اختيار فصل</Text>
      <Text style={styles.message}>
        اختر المرحلة والفصل الأول عشان تقدر تسجّل الحضور.
      </Text>
      <Button
        variant="fill"
        onPress={() => router.replace("/stage-select")}
        style={{ backgroundColor: colors.primary[900] }}
      >
        <Text style={styles.buttonText}>اختيار الفصل</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: "Tajawal",
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary[900],
  },
  message: {
    textAlign: "center",
    fontFamily: "Tajawal",
    fontSize: 14,
    color: colors.neutral[500],
    marginBottom: 8,
  },
  buttonText: {
    fontFamily: "Tajawal",
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});
