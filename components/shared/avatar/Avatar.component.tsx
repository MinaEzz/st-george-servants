import { colors } from "@/styles/globals";
import { getStudentInitials } from "@/utils/getInitials";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";
import { IAvatarProps } from "./Avatar.types";

export default function Avatar({
  name,
  gender = "",
  image = null,
  size = 54,
}: IAvatarProps) {
  const palette =
    gender === "female"
      ? { background: colors.secondary[100], text: colors.secondary[800] }
      : { background: colors.primary[100], text: colors.primary[800] };

  const dimension = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  if (image && image.trim() !== "") {
    return <Image source={{ uri: image }} style={[styles.image, dimension]} />;
  }

  const hasName = name.trim().length > 0;

  return (
    <View
      style={[styles.circle, dimension, { backgroundColor: palette.background }]}
    >
      {hasName ? (
        <Text
          style={[
            styles.initials,
            { color: palette.text, fontSize: size * 0.36 },
          ]}
        >
          {getStudentInitials(name)}
        </Text>
      ) : (
        <Ionicons name="person-outline" size={size * 0.45} color={palette.text} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  circle: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    backgroundColor: colors.neutral[200],
  },
  initials: {
    fontFamily: "Tajawal",
    fontWeight: "bold",
  },
});
