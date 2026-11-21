import { colors, statusColors } from "@/styles/globals";
import { toTelUrl, toWhatsAppUrl } from "@/utils/formatPhone";
import { buildMapsUrl } from "@/utils/links";
import { openExternalUrl } from "@/utils/openExternalUrl";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IQuickActionsSectionProps } from "./QuickActionsSection.types";

export default function QuickActionsSection({
  phone,
  address,
}: IQuickActionsSectionProps) {
  const hasPhone = phone.trim().length > 0;
  const hasAddress = address.trim().length > 0;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.actionBtn, !hasPhone && styles.disabled]}
        disabled={!hasPhone}
        onPress={() => openExternalUrl(toTelUrl(phone))}
      >
        <View style={[styles.iconCircle, { backgroundColor: "#E1F5FE" }]}>
          <Ionicons name="call" size={22} color="#0288D1" />
        </View>
        <Text style={styles.actionText}>اتصال</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionBtn, !hasPhone && styles.disabled]}
        disabled={!hasPhone}
        onPress={() => openExternalUrl(toWhatsAppUrl(phone))}
      >
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: statusColors.present.background },
          ]}
        >
          <FontAwesome5 name="whatsapp" size={22} color={statusColors.present.text} />
        </View>
        <Text style={styles.actionText}>واتساب</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.actionBtn, !hasAddress && styles.disabled]}
        disabled={!hasAddress}
        onPress={() => openExternalUrl(buildMapsUrl(address))}
      >
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: statusColors.excused.background },
          ]}
        >
          <Ionicons name="location" size={22} color="#EF6C00" />
        </View>
        <Text style={styles.actionText}>الموقع</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  actionBtn: { alignItems: "center", gap: 8 },
  disabled: { opacity: 0.4 },
  iconCircle: {
    width: 55,
    height: 55,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  actionText: {
    fontFamily: "Tajawal",
    fontSize: 13,
    fontWeight: "bold",
    color: colors.neutral[700],
  },
});
