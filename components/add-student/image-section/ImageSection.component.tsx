import Avatar from "@/components/shared/avatar/Avatar.component";
import { colors } from "@/styles/globals";
import { StyleSheet, Text, View } from "react-native";
import { IImageSectionProps } from "./ImageSection.types";

export default function ImageSection({ name, gender }: IImageSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.ring}>
        <Avatar name={name} gender={gender} size={104} />
      </View>
      <Text style={styles.caption}>
        الصورة الرمزية بتتكوّن تلقائياً من اسم المخدوم، ورفع الصور هيتوفر في
        تحديث قادم
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  ring: {
    padding: 6,
    borderRadius: 999,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: colors.secondary[400],
  },
  caption: {
    textAlign: "center",
    fontFamily: "Tajawal",
    fontSize: 12,
    color: colors.neutral[500],
    paddingHorizontal: 24,
  },
});
