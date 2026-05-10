import { colors } from "@/styles/globals";
import { Image, StyleSheet, Text, View } from "react-native";

export default function ScreenHeader() {
  return (
    <View style={styles.header}>
      <Image
        source={require("../../../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.churchName}>كنيسة الشهيد العظيم</Text>
      <Text style={styles.saintName}>مارجرجس</Text>
      <Text style={styles.location}>حدائق حلوان</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
