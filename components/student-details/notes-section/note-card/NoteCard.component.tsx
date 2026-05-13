import { colors } from "@/styles/globals";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import INoteCardProps from "./NoteCard.types";

export default function NoteCard({
  servantName,
  timeText,
  noteBody,
}: INoteCardProps) {
  return (
    <View style={styles.noteCard}>
      <View style={styles.noteHeader}>
        <View style={styles.servantInfo}>
          <Text style={styles.servantName}>خادم الفصل: {servantName}</Text>
          <Text style={styles.timeText}>{timeText}</Text>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            onPress={() => console.log("Delete Note")}
            style={styles.iconBtn}
          >
            <Ionicons name="trash-outline" size={18} color="#F44336" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("Edit Note")}
            style={styles.iconBtn}
          >
            <Ionicons
              name="create-outline"
              size={18}
              color={colors.primary[600]}
            />
          </TouchableOpacity>
        </View>
      </View>

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
    borderColor: colors.primary[900],
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
  noteBody: {
    fontFamily: "Tajawal",
    fontSize: 14,
    lineHeight: 22,
    color: "#444",
    textAlign: "right",
  },
});
