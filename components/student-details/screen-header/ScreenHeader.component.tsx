import { colors } from "@/styles/globals";
import { getStudentImage } from "@/utils/getStudentImage";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";
import IScreenHeaderProps from "./ScreenHeader.types";

export default function ScreenHeader({
  name,
  grade,
  gender,
  image,
}: IScreenHeaderProps) {
  const studentImage = getStudentImage(image, gender);

  return (
    <View style={styles.header}>
      <View style={styles.imageContainer}>
        <Image
          source={studentImage}
          style={styles.profileImg}
          resizeMode="cover"
        />
        <View style={styles.editBadge}>
          <Ionicons name="camera" size={16} color="#fff" />
        </View>
      </View>

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.gradeText}>{grade}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: "center", paddingVertical: 20 },
  imageContainer: { position: "relative" },
  profileImg: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 4,
    borderColor: colors.secondary[400],
  },
  editBadge: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: colors.primary[900],
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },
  name: {
    fontFamily: "Tajawal",
    fontSize: 26,
    fontWeight: "bold",
    color: colors.primary[900],
    marginTop: 15,
  },
  gradeText: {
    fontFamily: "Tajawal",
    fontSize: 15,
    color: colors.neutral[500],
  },
});
