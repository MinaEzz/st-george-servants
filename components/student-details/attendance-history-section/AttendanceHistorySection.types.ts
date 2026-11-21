import type { IAttendanceHistoryItem } from "@/types/attendance.types";

export interface IAttendanceHistorySectionProps {
  /** أيام الخدمة المسجلة لفصل المخدوم، الأحدث أولاً */
  history: IAttendanceHistoryItem[];
}
