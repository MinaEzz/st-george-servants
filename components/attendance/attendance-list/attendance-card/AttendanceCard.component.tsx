import { colors, statusColors } from "@/styles/globals";
import type { AttendanceStatus } from "@/types/common.types";
import { getStudentImage } from "@/utils/getStudentImage";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import type { ComponentProps } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { IAttendanceCardProps } from "./AttendanceCard.types";

interface IStatusAction {
  status: AttendanceStatus;
  label: string;
  icon: ComponentProps<typeof Ionicons>["name"];
}

/** الترتيب من الشمال لليمين زي التصميم الحالي: اعتذر | غائب | حاضر */
const STATUS_ACTIONS: IStatusAction[] = [
  { status: "excused", label: "اعتذر", icon: "calendar-outline" },
  { status: "absent", label: "غائب", icon: "close-circle-outline" },
  { status: "present", label: "حاضر", icon: "checkmark-circle-outline" },
];

export default function AttendanceCard({
  student,
  currentStatus,
  onStatusChange,
}: IAttendanceCardProps) {
  const router = useRouter();
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
        {STATUS_ACTIONS.map((action) => {
          const isActive = currentStatus === action.status;
          const palette = statusColors[action.status];

          return (
            <TouchableOpacity
              key={action.status}
              style={[
                styles.actionBtn,
                isActive && { backgroundColor: palette.background },
              ]}
              onPress={() => onStatusChange(student.id, action.status)}
            >
              <Ionicons
                name={action.icon}
                size={20}
                color={isActive ? palette.icon : colors.neutral[600]}
              />
              <Text
                style={[styles.actionText, isActive && { color: palette.icon }]}
              >
                {action.label}
              </Text>
            </TouchableOpacity>
          );
        })}
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
    borderRightColor: colors.secondary[400],
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
});
