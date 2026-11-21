import { colors, statusColors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IDateSelectorProps } from "./DateSelector.types";

export default function DateSelector({
  dateLabel,
  isLatest,
  hasRecords,
  canGoOlder,
  canGoNewer,
  onOlder,
  onNewer,
}: IDateSelectorProps) {
  return (
    <View style={styles.container}>
      {/* الأقدم على اليمين (اتجاه القراءة العربي) */}
      <TouchableOpacity
        onPress={onOlder}
        disabled={!canGoOlder}
        style={[styles.arrowButton, !canGoOlder && styles.disabled]}
        hitSlop={8}
      >
        <Ionicons name="chevron-forward" size={22} color={colors.primary[900]} />
      </TouchableOpacity>

      <View style={styles.center}>
        <Text style={styles.dateText}>{dateLabel}</Text>

        <View style={styles.badges}>
          {isLatest ? (
            <View style={[styles.badge, styles.latestBadge]}>
              <Text style={[styles.badgeText, styles.latestText]}>آخر خدمة</Text>
            </View>
          ) : null}

          <View
            style={[
              styles.badge,
              hasRecords ? styles.savedBadge : styles.pendingBadge,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                hasRecords ? styles.savedText : styles.pendingText,
              ]}
            >
              {hasRecords ? "تم التسجيل" : "لم يُسجّل بعد"}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={onNewer}
        disabled={!canGoNewer}
        style={[styles.arrowButton, !canGoNewer && styles.disabled]}
        hitSlop={8}
      >
        <Ionicons name="chevron-back" size={22} color={colors.primary[900]} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  arrowButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary[50],
  },
  disabled: {
    opacity: 0.35,
  },
  center: {
    flex: 1,
    alignItems: "center",
    gap: 6,
  },
  dateText: {
    fontFamily: "Tajawal",
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary[900],
  },
  badges: {
    flexDirection: "row-reverse",
    gap: 6,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
  },
  badgeText: {
    fontFamily: "Tajawal",
    fontSize: 11,
    fontWeight: "bold",
  },
  latestBadge: { backgroundColor: colors.secondary[100] },
  latestText: { color: colors.secondary[800] },
  savedBadge: { backgroundColor: statusColors.present.background },
  savedText: { color: statusColors.present.text },
  pendingBadge: { backgroundColor: colors.neutral[100] },
  pendingText: { color: colors.neutral[500] },
});
