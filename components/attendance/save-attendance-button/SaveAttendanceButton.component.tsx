import Button from "@/components/UI/button/Button.component";
import { colors, statusColors } from "@/styles/globals";
import { toArabicDigits } from "@/utils/arabic";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { ISaveAttendanceButtonProps } from "./SaveAttendanceButton.types";

export default function SaveAttendanceButton({
  onSave,
  isSaving,
  changesCount,
  hasSavedRecords,
}: ISaveAttendanceButtonProps) {
  const hasChanges = changesCount > 0;
  const isSaved = !hasChanges && hasSavedRecords;

  const label = hasChanges
    ? `حفظ الحضور (${toArabicDigits(changesCount)})`
    : isSaved
      ? "تم حفظ الحضور"
      : "حفظ الحضور";

  return (
    <View style={styles.footer}>
      <Button
        variant="fill"
        style={{
          ...styles.saveBtn,
          backgroundColor: isSaved
            ? statusColors.present.icon
            : colors.primary[900],
        }}
        onPress={onSave}
        loading={isSaving}
        disabled={!hasChanges}
      >
        <View style={styles.btnContent}>
          <Ionicons
            name={isSaved ? "checkmark-circle-outline" : "save-outline"}
            size={22}
            color="#fff"
          />
          <Text style={styles.saveBtnText}>{label}</Text>
        </View>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
  },
  saveBtn: {
    height: 60,
    borderRadius: 18,
  },
  btnContent: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 10,
  },
  saveBtnText: {
    color: "#fff",
    fontFamily: "Tajawal",
    fontSize: 18,
    fontWeight: "bold",
  },
});
