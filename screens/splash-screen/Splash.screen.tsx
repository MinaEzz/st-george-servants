import { colors } from "@/styles/globals";
import { useRouter } from "expo-router";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
const { width } = Dimensions.get("window");

export default function Splash() {
  const router = useRouter();

  //   useEffect(() => {
  //     const timer = setTimeout(() => {
  //       router.replace("/(auth)/login");
  //     }, 3000);
  //     return () => clearTimeout(timer);
  //   }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/top-left-pattern.png")}
        style={styles.topLeftPattern}
        resizeMode="contain"
      />
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.churchName}>كنيسة الشهيد العظيم</Text>
        <Text style={styles.saintName}>مارجرجس</Text>
        <Text style={styles.location}>حدائق حلوان</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerLocation}>حدائق حلوان</Text>
        <Text style={styles.footerSubText}>
          خدام كنيسة الشهيد العظيم مارجرجس
        </Text>
      </View>

      <Image
        source={require("../../assets/images/bottom-right-pattern.png")}
        style={styles.bottomRightPattern}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
  },
  logo: {
    width: 200,
    height: 200,
  },
  churchName: {
    fontSize: 22,
    color: colors.primary[900],
    fontWeight: "600",
  },
  saintName: {
    fontSize: 40,
    color: colors.primary[900],
    fontWeight: "bold",
    marginTop: -5,
  },
  location: {
    fontSize: 18,
    color: colors.neutral[600],
  },
  footer: {
    position: "absolute",
    bottom: 50,
    alignItems: "center",
  },
  footerLocation: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary[900],
  },
  footerSubText: {
    fontSize: 12,
    color: colors.neutral[600],
  },

  topLeftPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    width: width * 0.4,
    height: width * 0.4,
    opacity: 0.6,
  },

  bottomRightPattern: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: width * 0.4,
    height: width * 0.4,
    opacity: 0.6,
  },
});
