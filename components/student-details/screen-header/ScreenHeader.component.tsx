import Avatar from "@/components/shared/avatar/Avatar.component";
import { colors } from "@/styles/globals";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import IScreenHeaderProps from "./ScreenHeader.types";

export default function ScreenHeader({
  name,
  grade,
  gender,
  image,
}: IScreenHeaderProps) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
        hitSlop={12}
      >
        <Feather name="arrow-right" size={24} color={colors.primary[900]} />
      </TouchableOpacity>

      <View style={styles.avatarRing}>
        <Avatar name={name} gender={gender} image={image} size={122} />
      </View>

      <Text style={styles.name}>{name}</Text>
      <Text style={styles.gradeText}>{grade}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: "center", paddingVertical: 20, position: "relative" },
  backButton: {
    position: "absolute",
    top: 20,
    right: 0,
    zIndex: 1,
  },
  avatarRing: {
    padding: 4,
    borderRadius: 999,
    borderWidth: 4,
    borderColor: colors.secondary[400],
  },
  name: {
    fontFamily: "Tajawal",
    fontSize: 26,
    fontWeight: "bold",
    color: colors.primary[900],
    marginTop: 15,
    textAlign: "center",
  },
  gradeText: {
    fontFamily: "Tajawal",
    fontSize: 15,
    color: colors.neutral[500],
  },
});
