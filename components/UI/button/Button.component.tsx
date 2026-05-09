import { colors } from "@/styles/globals";
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import IButtonProps from "./Button.types";

export default function Button({
  children,
  onPress,
  variant = "fill",
  loading = false,
  disabled = false,
  style,
  textStyle,
}: IButtonProps) {
  const getContainerStyle = () => {
    const baseStyle: ViewStyle = styles.base;

    if (variant === "fill") return [baseStyle, styles.fill, style];
    if (variant === "outline") return [baseStyle, styles.outline, style];
    if (variant === "ghost") return [baseStyle, styles.ghost, style];
    if (variant === "link") return [styles.link, style];

    return baseStyle;
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[getContainerStyle(), (disabled || loading) && { opacity: 0.5 }]}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "fill" ? "#fff" : colors.primary[600]}
        />
      ) : (
        <View style={styles.content}>{children}</View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  baseText: {
    fontSize: 16,
    fontFamily: "Tajawal",
    fontWeight: "bold",
  },
  content: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  // Variants
  fill: {
    backgroundColor: colors.primary[600],
  },
  textFill: {
    color: "#fff",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: colors.primary[600],
  },
  textOutline: {
    color: colors.primary[600],
  },
  ghost: {
    backgroundColor: colors.primary[50],
  },
  textGhost: {
    color: colors.primary[700],
  },
  link: {
    backgroundColor: "transparent",
    paddingVertical: 5,
  },
  textLink: {
    color: colors.primary[700],
    textDecorationLine: "underline",
  },
});
