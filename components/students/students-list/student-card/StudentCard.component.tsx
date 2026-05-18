import { colors } from "@/styles/globals";
import { getStudentImage } from "@/utils/getStudentImage";
import { Ionicons } from "@expo/vector-icons";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function StudentCard({ student }: { student: any }) {
  const studentImage = getStudentImage(student.image, student.gender);

  const makeCall = (phone: string) => Linking.openURL(`tel:${phone}`);
  const openWhatsApp = (phone: string) =>
    Linking.openURL(`whatsapp://send?phone=${phone}`);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {}}
      activeOpacity={0.9}
    >
      <View style={styles.topInfo}>
        <View style={styles.studentMeta}>
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.studentCode}>كود: #{student.code}</Text>
        </View>
        <Image source={studentImage} style={styles.avatar} />
      </View>
      <View style={styles.divider} />

      <View style={styles.actionsRow}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: "#FFF3E0" }]}
          onPress={() => console.log("Open Map to: ", student.address)}
        >
          <Ionicons name="location" size={16} color="#FF9800" />
          <Text style={[styles.actionText, { color: "#B26A00" }]}>الموقع</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: "#E8F5E9" }]}
          onPress={() => openWhatsApp(student.phoneNumber)}
        >
          <Ionicons name="logo-whatsapp" size={16} color="#4CAF50" />
          <Text style={[styles.actionText, { color: "#2E7D32" }]}>واتساب</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: "#E3F2FD" }]}
          onPress={() => makeCall(student.phoneNumber)}
        >
          <Ionicons name="call" size={16} color="#2196F3" />
          <Text style={[styles.actionText, { color: "#1565C0" }]}>اتصال</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    borderRightWidth: 5,
    borderColor: colors.secondary[400], // حافة البراند الصفراء/الذهبية المريحة للعين بتاعتك
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
  },
  topInfo: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 14,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: colors.neutral[100],
  },
  studentMeta: {
    alignItems: "flex-end",
    flex: 1,
  },
  studentName: {
    fontFamily: "Tajawal",
    fontSize: 16,
    fontWeight: "bold",
    color: colors.primary[900],
  },
  studentCode: {
    fontFamily: "Tajawal",
    fontSize: 12,
    color: colors.neutral[400],
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.neutral[100],
    marginVertical: 12,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  actionBtn: {
    flexDirection: "row-reverse",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    gap: 6,
  },
  actionText: {
    fontFamily: "Tajawal",
    fontSize: 12,
    fontWeight: "500",
  },
});
