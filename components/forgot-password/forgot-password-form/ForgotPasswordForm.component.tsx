import Button from "@/components/UI/button/Button.component";
import { colors } from "@/styles/globals";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleResetRequest = () => {
    // هنا هننادي على Firebase مستقبلاً لإرسال الرابط
    console.log("إرسال رابط الاستعادة إلى:", email);

    // بعد النجاح، ممكن نوديه لصفحة تأكيد أو نرجعه للـ Login
    // لسهولة الـ UX دلوقتي هنرجعه للـ Login مع رسالة تنبيه
    router.back();
  };
  return (
    <View style={styles.form}>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>البريد الإلكتروني</Text>
        <TextInput
          style={styles.input}
          placeholder="example@mail.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={colors.neutral[400]}
        />
      </View>

      <View style={styles.btnContainer}>
        <Button
          onPress={handleResetRequest}
          variant="fill"
          disabled={!email.includes("@")}
          style={styles.submitBtn}
        >
          <Text style={styles.btnText}>إرسال الرابط</Text>
        </Button>

        <Button onPress={() => router.back()} variant="ghost">
          <Text style={styles.backLink}>العودة لتسجيل الدخول</Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    fontSize: 16,
    fontFamily: "Tajawal",
    color: colors.primary[800],
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "right",
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
  btnContainer: {
    marginTop: 10,
  },
  submitBtn: {
    marginBottom: 10,
  },
  btnText: {
    color: "#fff",
    fontFamily: "Tajawal",
    fontWeight: "bold",
    fontSize: 18,
  },
  backLink: {
    color: colors.primary[700],
    fontFamily: "Tajawal",
    fontSize: 16,
    fontWeight: "600",
  },
});
