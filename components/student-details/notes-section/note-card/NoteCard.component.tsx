import { CONTACT_METHOD_ICONS, CONTACT_METHOD_LABELS } from "@/constants/service";
import { colors, statusColors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import INoteCardProps from "./NoteCard.types";

export default function NoteCard({
  servantName,
  timeText,
  noteBody,
  kind,
  contactMethod,
  onEdit,
  onDelete,
}: INoteCardProps) {
  const isFollowUp = kind === "follow-up";

  return (
    <View
      style={[
        styles.noteCard,
        { borderColor: isFollowUp ? colors.secondary[500] : colors.primary[900] },
      ]}
    >
      <View style={styles.noteHeader}>
        <View style={styles.servantInfo}>
          <Text style={styles.servantName}>خادم الفصل: {servantName}</Text>
          <Text style={styles.timeText}>{timeText}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={onDelete} style={styles.iconBtn}>
            <Ionicons
              name="trash-outline"
              size={18}
              color={statusColors.absent.icon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onEdit} style={styles.iconBtn}>
            <Ionicons
              name="create-outline"
              size={18}
              color={colors.primary[600]}
            />
          </TouchableOpacity>
        </View>
      </View>

      {isFollowUp && contactMethod ? (
        <View style={styles.methodChip}>
          <Ionicons
            name={CONTACT_METHOD_ICONS[contactMethod]}
            size={14}
            color={colors.secondary[800]}
          />
          <Text style={styles.methodText}>
            {CONTACT_METHOD_LABELS[contactMethod]}
          </Text>
        </View>
      ) : null}

      <Text style={styles.noteBody}>{noteBody}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  noteCard: {
    backgroundColor: "#F8F9FA",
    borderRadius: 24,
    padding: 15,
    borderRightWidth: 5,
    marginBottom: 10,
  },
  noteHeader: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[100],
    paddingBottom: 5,
  },
  servantInfo: {
    alignItems: "flex-end",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  iconBtn: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.neutral[100],
  },
  servantName: {
    fontFamily: "Tajawal",
    fontSize: 14,
    fontWeight: "bold",
    color: colors.primary[800],
  },
  timeText: { fontFamily: "Tajawal", fontSize: 12, color: colors.neutral[400] },
  methodChip: {
    flexDirection: "row-reverse",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: 6,
    backgroundColor: colors.secondary[100],
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 8,
  },
  methodText: {
    fontFamily: "Tajawal",
    fontSize: 12,
    fontWeight: "bold",
    color: colors.secondary[800],
  },
  noteBody: {
    fontFamily: "Tajawal",
    fontSize: 14,
    lineHeight: 22,
    color: "#444",
    textAlign: "right",
  },
});
