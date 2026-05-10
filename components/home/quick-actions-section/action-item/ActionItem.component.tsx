import { colors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IActionItemProps from "./ActionItem.types";

export default function ActionItem({
  title,
  icon,
  color,
  onPress,
  isPrimary,
}: IActionItemProps) {
  const cardStyle = isPrimary
    ? styles.actionCardPrimary
    : styles.actionCardOutline;
  const contentColor = isPrimary ? "#fff" : color;

  return (
    <TouchableOpacity style={cardStyle} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.actionContent}>
        {/* النص الأول والثاني لو متاح */}
        <Text style={[styles.actionTitle, { color: contentColor }]}>
          {title}
        </Text>
      </View>
      <Ionicons
        name={icon as any}
        size={26}
        color={contentColor}
        style={styles.actionIcon}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  actionContent: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  actionIcon: {
    marginRight: 10,
  },
  actionTitle: {
    fontSize: 14,
    fontFamily: "Tajawal",
    fontWeight: "bold",
    textAlign: "right",
  },
  actionCardPrimary: {
    backgroundColor: colors.primary[900],
    width: "48.5%",
    height: 80,
    borderRadius: 16,
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 15,
    elevation: 5,
    shadowColor: colors.primary[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  actionCardOutline: {
    backgroundColor: "#fff",
    width: "48.5%",
    height: 80,
    borderRadius: 16,
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: colors.neutral[100],
    elevation: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
});
