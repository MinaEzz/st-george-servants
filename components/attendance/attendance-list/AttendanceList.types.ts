import type { AttendanceStatus } from "@/types/common.types";
import type { IStudent } from "@/types/student.types";

export interface IAttendanceListProps {
  students: IStudent[];
  attendanceData: Record<string, AttendanceStatus | null>;
  onStatusChange: (studentId: string, status: AttendanceStatus) => void;
  emptyText?: string;
}
