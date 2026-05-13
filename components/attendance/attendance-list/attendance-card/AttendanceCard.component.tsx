import { colors } from "@/styles/globals";
import { getStudentImage } from "@/utils/getStudentImage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AttendanceCard({
  student,
  currentStatus,
  onStatusChange,
}: any) {
  const router = useRouter();
  const isPresent = currentStatus === "present";
  const isAbsent = currentStatus === "absent";
  const isExcused = currentStatus === "excused";
  const studentImage = getStudentImage(student.image, student.gender);

  return (
    <View style={styles.card}>
      <View style={styles.topSection}>
        <TouchableOpacity
          style={styles.infoIcon}
          onPress={() => {
            router.push(`/students/${student.id}`);
          }}
        >
          <Ionicons
            name="information-circle-outline"
            size={24}
            color={colors.neutral[400]}
          />
        </TouchableOpacity>

        <View style={styles.studentInfo}>
          <Text style={styles.studentName}>{student.name}</Text>
          <Text style={styles.studentCode}>كود: #{student.code}</Text>
        </View>

        <Image
          source={studentImage}
          style={styles.studentImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionBtn, isExcused && styles.excusedActive]}
          onPress={() => onStatusChange(student.id, "excused")}
        >
          <Ionicons
            name="calendar-outline"
            size={20}
            color={isExcused ? "#F57C00" : colors.neutral[600]}
          />
          <Text style={[styles.actionText, isExcused && { color: "#F57C00" }]}>
            اعتذر
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, isAbsent && styles.absentActive]}
          onPress={() => onStatusChange(student.id, "absent")}
        >
          <Ionicons
            name="close-circle-outline"
            size={20}
            color={isAbsent ? "#D32F2F" : colors.neutral[600]}
          />
          <Text style={[styles.actionText, isAbsent && { color: "#D32F2F" }]}>
            غائب
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionBtn, isPresent && styles.presentActive]}
          onPress={() => onStatusChange(student.id, "present")}
        >
          <Ionicons
            name="checkmark-circle-outline"
            size={20}
            color={isPresent ? "#388E3C" : colors.neutral[600]}
          />
          <Text style={[styles.actionText, isPresent && { color: "#388E3C" }]}>
            حاضر
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 15,
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderRightWidth: 4,
    borderRightColor: "#D4AF37", // الخط الذهبي اللي في الصورة
  },
  topSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    justifyContent: "space-between",
  },
  studentImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: colors.neutral[100],
  },
  studentInfo: {
    flex: 1,
    marginRight: 15,
    alignItems: "flex-end",
  },
  studentName: {
    fontFamily: "Tajawal",
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary[900],
  },
  studentCode: {
    fontFamily: "Tajawal",
    fontSize: 13,
    color: colors.neutral[500],
    marginTop: 2,
  },
  infoIcon: {
    padding: 5,
  },
  actionsContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: colors.neutral[100],
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    gap: 8,
    borderLeftWidth: 1,
    borderLeftColor: colors.neutral[500] + "20",
  },
  actionText: {
    fontFamily: "Tajawal",
    fontSize: 14,
    fontWeight: "600",
    color: colors.neutral[600],
  },
  // ألوان الحالات النشطة
  presentActive: { backgroundColor: "#E8F5E9" },
  absentActive: { backgroundColor: "#FFEBEE" },
  excusedActive: { backgroundColor: "#FFF3E0" },
});
