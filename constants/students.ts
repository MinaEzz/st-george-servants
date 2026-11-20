import {
  MOCK_ATTENDANCE_RECORDS,
  MOCK_STUDENTS,
} from "@/services/mock/mockData";
import type { AttendanceStatus } from "@/types/common.types";
import {
  getRecordedDatesByClass,
  groupStatusByStudent,
} from "@/utils/attendanceStats";

export type { IStudent } from "@/types/student.types";

/**
 * @deprecated طبقة توافق مؤقتة عشان الشاشات القديمة تفضل شغالة.
 * الشاشات هتنتقل تدريجياً لـ `useStudents()` و `useAttendance()` و `useFollowUp()`،
 * وبعد نقل آخر شاشة الملف ده هيتحذف.
 */
export const STUDENTS = MOCK_STUDENTS;

function buildLegacyHistory(): Record<string, AttendanceStatus[]> {
  const datesByClass = getRecordedDatesByClass(MOCK_ATTENDANCE_RECORDS);
  const statusByStudent = groupStatusByStudent(MOCK_ATTENDANCE_RECORDS);
  const history: Record<string, AttendanceStatus[]> = {};

  MOCK_STUDENTS.forEach((student) => {
    const dates = datesByClass[student.classId] ?? [];
    const statusByDate = statusByStudent[student.id] ?? {};

    history[student.id] = dates
      .map((date) => statusByDate[date])
      .filter((status): status is AttendanceStatus => status !== undefined);
  });

  return history;
}

/**
 * @deprecated الأحدث أولاً: العنصر الأول = آخر يوم خدمة مسجل لفصل المخدوم.
 */
export const ATTENDANCE_HISTORY: Record<string, AttendanceStatus[]> =
  buildLegacyHistory();
