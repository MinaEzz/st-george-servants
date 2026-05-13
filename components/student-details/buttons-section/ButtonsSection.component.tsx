import Button from "@/components/UI/button/Button.component";
import { colors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function ButtonsSection() {
  return (
    <View style={styles.buttonGroup}>
      <Button
        variant="fill"
        onPress={() => console.log("Add Note Modal")}
        style={styles.addNoteBtn}
      >
        <View style={styles.btnContent}>
          <Ionicons name="add-circle-outline" size={20} color="#fff" />
          <Text style={styles.addNoteText}>إضافة ملاحظة</Text>
        </View>
      </Button>

      <Button
        variant="outline"
        onPress={() => console.log("Edit Student")}
        style={styles.editBtn}
      >
        <View style={styles.btnContent}>
          <Ionicons
            name="create-outline"
            size={20}
            color={colors.primary[900]}
          />
          <Text style={styles.editText}>تعديل بيانات المخدوم</Text>
        </View>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonGroup: { gap: 12, paddingBottom: 25 },
  btnContent: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 10,
  },
  addNoteBtn: {
    backgroundColor: colors.primary[900],
    height: 55,
  },
  addNoteText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Tajawal",
    fontWeight: "bold",
  },
  editBtn: {
    borderColor: colors.primary[900],
    height: 55,
  },
  editText: {
    fontSize: 18,
    color: colors.primary[900],
    fontFamily: "Tajawal",
    fontWeight: "bold",
  },
});
