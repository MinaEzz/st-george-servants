import { colors, globalStyles } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function ScreenHeader() {
  return (
    <View style={globalStyles.header}>
      <View style={styles.iconContainer}>
        <Ionicons name="key-sharp" size={40} color={colors.primary[600]} />
      </View>
      <Text style={styles.title}>نسيت كلمة المرور؟</Text>
      <Text style={styles.subtitle}>
        لا تقلق، أدخل بريدك الإلكتروني وسنرسل لك رابطاً لإعادة تعيينها.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary[50],
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontFamily: "Tajawal",
    fontWeight: "bold",
    color: colors.primary[900],
    textAlign: "right",
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Tajawal",
    color: colors.neutral[600],
    textAlign: "right",
    marginTop: 10,
    lineHeight: 22,
  },
});
