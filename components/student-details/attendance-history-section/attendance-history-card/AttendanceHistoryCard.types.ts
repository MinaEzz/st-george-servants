import type { AttendanceStatus } from "@/types/common.types";

export default interface IAttendanceHistoryCardProps {
  date: string;
  /** null معناها: ما اتسجلش حضور في اليوم ده */
  status: AttendanceStatus | null;
}
