import type { AttendanceStatus } from "@/types/common.types";
import type { IStudent } from "@/types/student.types";

export interface IAttendanceCardProps {
  student: IStudent;
  currentStatus: AttendanceStatus | null | undefined;
  onStatusChange: (studentId: string, status: AttendanceStatus) => void;
}
