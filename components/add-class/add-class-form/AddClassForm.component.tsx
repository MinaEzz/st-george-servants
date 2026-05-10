import Button from "@/components/UI/button/Button.component";
import { colors } from "@/styles/globals";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function AddClassForm({ stageId }: { stageId: string }) {
  const router = useRouter();
  const [className, setClassName] = useState("");
  const handleAddClass = () => {
    // هنا مستقبلاً هننادي على الـ API
    console.log("Adding Class clicked");
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={styles.form}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>اسم الفصل</Text>
        <TextInput
          style={styles.input}
          placeholder="مثال: الصف الأول"
          value={className}
          onChangeText={setClassName}
          textAlign="right"
        />
      </View>

      <Button
        onPress={handleAddClass}
        variant="fill"
        style={styles.submitBtn}
        disabled={!className}
      >
        <Text style={styles.btnText}>حفظ الفصل</Text>
      </Button>

      <Button onPress={handleCancel} variant="ghost">
        <Text style={[styles.btnText, { color: colors.primary[700] }]}>
          إلغاء
        </Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  form: { gap: 20 },
  inputGroup: { gap: 8 },
  label: {
    textAlign: "right",
    fontSize: 16,
    fontFamily: "Tajawal",
    color: colors.primary[800],
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#fff",
    height: 55,
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    fontFamily: "Tajawal",
    fontSize: 16,
  },
  submitBtn: { marginTop: 20 },
  btnText: {
    color: "#fff",
    fontFamily: "Tajawal",
    fontWeight: "bold",
    fontSize: 18,
  },
});
