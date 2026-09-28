import { colors, globalStyles } from "@/styles/globals";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ScreenHeader() {
  const router = useRouter();

  return (
    <View style={[globalStyles.header, styles.header]}>
      <View style={styles.titleWrapper}>
        <TouchableOpacity onPress={() => router.back()}>
          <Feather name="arrow-right" size={24} style={styles.backArrow} />
        </TouchableOpacity>
        <Text style={styles.title}>إضافة مخدوم جديد</Text>
      </View>
      <Image
        style={styles.logo}
        source={require("../../../assets/images/logo.png")}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleWrapper: {
    flexDirection: "row-reverse",
    alignItems: "center",
    gap: 12,
  },
  backArrow: {
    color: colors.primary[900],
  },
  title: {
    fontFamily: "Tajawal",
    fontSize: 22,
    fontWeight: "bold",
    color: colors.primary[900],
  },
  logo: {
    width: 48,
    height: 48,
  },
});
