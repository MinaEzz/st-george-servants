import Button from "@/components/UI/button/Button.component";
import { colors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function SaveAttendanceButton({ onSave }: any) {
  return (
    <View style={styles.footer}>
      <Button variant="fill" style={styles.saveBtn} onPress={onSave}>
        <View style={styles.btnContent}>
          <Ionicons name="save-outline" size={22} color="#fff" />
          <Text style={styles.saveBtnText}>حفظ الحضور</Text>
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
    backgroundColor: colors.primary[900],
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
