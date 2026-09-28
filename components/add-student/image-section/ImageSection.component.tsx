import { colors } from "@/styles/globals";
import { Feather } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function ImageSection() {
  return (
    <View style={styles.imageSection}>
      <TouchableOpacity style={styles.imagePicker}>
        <Feather name="camera" size={28} style={styles.cameraIcon} />
        <Text style={styles.imagePickerText}>أضف صورة</Text>
        <View style={styles.editIconBadge}>
          <Feather name="edit-2" size={12} style={styles.editIcon} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  imageSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  imagePicker: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1.5,
    borderColor: colors.neutral[400],
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    position: "relative",
  },
  cameraIcon: {
    color: colors.primary[900],
  },
  imagePickerText: {
    fontFamily: "Tajawal",
    fontSize: 14,
    color: colors.neutral[600],
    marginTop: 4,
  },
  editIcon: {
    color: "#fff",
  },
  editIconBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    backgroundColor: colors.secondary[600],
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
});
