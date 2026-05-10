import Button from "@/components/UI/button/Button.component";
import { colors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

export default function LoginForm() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // هنا هنضيف منطق تسجيل الدخول لاحقاً
    console.log("Login Pressed");
    // بعد النجاح نتوجه لصفحة اختيار المرحلة
    router.push("/(selection)/stage-select");
  };
  const router = useRouter();

  return (
    <View style={styles.formContainer}>
      <Text style={styles.loginTitle}>تسجيل الدخول</Text>
      <Text style={styles.loginSubtitle}>خادم كنيسة الشهيد العظيم مارجرجس</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>
          اسم المستخدم / البريد الإلكتروني / رقم الهاتف
        </Text>
        <TextInput
          placeholder="example@email.com"
          style={styles.input}
          placeholderTextColor={colors.neutral[400]}
          value={identifier}
          onChangeText={setIdentifier}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>كلمة المرور</Text>
        <TextInput
          placeholder="********"
          secureTextEntry
          style={styles.input}
          placeholderTextColor={colors.neutral[400]}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Button onPress={handleLogin} variant="fill" style={{ marginTop: 5 }}>
        <Ionicons name="log-in-outline" size={22} color="#fff" />
        <Text style={styles.loginButtonText}>دخول</Text>
      </Button>
      <Button
        onPress={() => router.push("/(auth)/forgot-password")}
        variant="link"
        style={{ marginTop: 10 }}
      >
        <Text style={styles.forgotPasswordText}>نسيت كلمة المرور؟</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,

    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  loginTitle: {
    fontSize: 20,
    color: colors.primary[900],
    fontFamily: "Tajawal",
    textAlign: "center",
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 16,
    color: colors.neutral[600],
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    gap: 8,
    marginBottom: 16,
  },
  label: {
    textAlign: "right",
    fontSize: 14,
    fontFamily: "Tajawal",
    color: colors.primary[800],
    fontWeight: "600",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: colors.neutral[50],
    borderRadius: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.neutral[200],
    textAlign: "right",
    fontFamily: "Tajawal",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Tajawal",
    fontWeight: "bold",
  },
  forgotPasswordText: {
    color: colors.primary[700],
    fontSize: 14,
    fontFamily: "Tajawal",
  },
});
