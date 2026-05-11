import { colors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import IRecentUpdateCardProps from "./RecentUpdateCard.types";

export default function RecentUpdateCard({
  title,
  subtitle,
  icon,
  variant,
}: IRecentUpdateCardProps) {
  const variantStyles = {
    primary: {
      bg: "#BBDEFB", // أزرق فاتح (مثلاً لأعياد الميلاد)
      icon: "#1976D2",
    },
    secondary: {
      bg: "#FFD54F", // أصفر فاتح (مثلاً للتنبيهات أو الغياب)
      icon: "#F57F17",
    },
    danger: {
      bg: "#FFEBEE", // أحمر فاتح (لحالات الطوارئ أو الانقطاع)
      icon: "#C62828",
    },
    success: {
      bg: "#E8F5E9", // أخضر فاتح (مثلاً مخدوم رجع بعد غياب)
      icon: "#2E7D32",
    },
  };

  const currentVariant = variantStyles[variant];

  return (
    <View style={styles.cardContainer}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subtitleText}>{subtitle}</Text>
        </View>
        <View
          style={[styles.iconCircle, { backgroundColor: currentVariant.bg }]}
        >
          <Ionicons name={icon} size={22} color={currentVariant.icon} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: colors.neutral[50],
    borderRadius: 20,
    padding: 15,
    marginBottom: 12,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  textContainer: {
    marginRight: 15,
    flex: 1,
    alignItems: "flex-end",
  },
  titleText: {
    fontFamily: "Tajawal",
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary[900],
  },
  subtitleText: {
    fontFamily: "Tajawal",
    fontSize: 12,
    color: colors.neutral[500],
    marginTop: 4,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});
