import Button from "@/components/UI/button/Button.component";
import { colors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

export default function Login() {
  const router = useRouter();

  const handleLogin = () => {
    // هنا هنضيف منطق تسجيل الدخول لاحقاً
    console.log("Login Pressed");
    // بعد النجاح نتوجه لصفحة اختيار المرحلة
    // router.push("/(selection)/stage-select");
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* --- Header Section --- */}
        <View style={styles.header}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.churchName}>كنيسة الشهيد العظيم</Text>
          <Text style={styles.saintName}>مارجرجس</Text>
          <Text style={styles.location}>حدائق حلوان</Text>
        </View>

        {/* --- Form Section --- */}
        <View style={styles.formContainer}>
          <Text style={styles.loginTitle}>تسجيل الدخول</Text>
          <Text style={styles.loginSubtitle}>
            خادم كنيسة الشهيد العظيم مارجرجس
          </Text>

          <View style={styles.inputGroup}>
            <TextInput
              placeholder="اسم المستخدم"
              style={styles.input}
              placeholderTextColor={colors.neutral[400]}
            />
            <TextInput
              placeholder="كلمة المرور"
              secureTextEntry
              style={styles.input}
              placeholderTextColor={colors.neutral[400]}
            />
          </View>
          <Button
            onPress={handleLogin}
            variant="fill"
            style={{ marginTop: 25 }}
          >
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 5,
  },
  churchName: {
    fontSize: 16,
    color: colors.primary[900],
    fontFamily: "Tajawal",
  },
  saintName: {
    fontSize: 24,
    color: colors.primary[900],
    fontFamily: "Tajawal",
    fontWeight: "bold",
    marginTop: -5,
  },
  location: {
    fontSize: 14,
    color: colors.neutral[600],
    fontFamily: "Tajawal",
  },
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
    gap: 15,
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
    // textDecorationLine: "underline",
  },
});
