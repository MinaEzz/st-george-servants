import Button from "@/components/UI/button/Button.component";
import { colors, statusColors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { ISubmitSectionProps } from "./SubmitSection.types";

export default function SubmitSection({
  onSubmit,
  onCancel,
  submitLabel = "حفظ المخدوم",
  isSubmitting,
  errorMessage,
  invalidCount,
}: ISubmitSectionProps) {
  const bannerMessage =
    errorMessage ??
    (invalidCount > 0
      ? invalidCount === 1
        ? "في حقل واحد محتاج مراجعة، راجع الحقل المعلّم بالأحمر"
        : `في ${invalidCount} حقول محتاجة مراجعة، راجع الحقول المعلّمة بالأحمر`
      : null);

  return (
    <View style={styles.container}>
      {bannerMessage ? (
        <View style={styles.banner}>
          <Ionicons
            name="alert-circle"
            size={20}
            color={statusColors.absent.text}
          />
          <Text style={styles.bannerText}>{bannerMessage}</Text>
        </View>
      ) : null}

      <Button
        variant="fill"
        onPress={onSubmit}
        loading={isSubmitting}
        style={{ backgroundColor: colors.primary[900] }}
      >
        <Ionicons name="checkmark-circle-outline" size={22} color="#FFF" />
        <Text style={styles.submitText}>{submitLabel}</Text>
      </Button>

      <Button variant="ghost" onPress={onCancel} disabled={isSubmitting}>
        <Text style={styles.cancelText}>إلغاء</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
    marginTop: 8,
    marginBottom: 24,
  },
  banner: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 8,
    backgroundColor: statusColors.absent.background,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  bannerText: {
    flex: 1,
    textAlign: "right",
    fontFamily: "Tajawal",
    fontSize: 13,
    color: statusColors.absent.text,
  },
  submitText: {
    fontFamily: "Tajawal",
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  cancelText: {
    fontFamily: "Tajawal",
    fontSize: 15,
    fontWeight: "bold",
    color: colors.primary[700],
  },
});
