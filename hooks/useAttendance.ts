import { useDataStore } from "@/store/data.store";
import type {
  IAttendanceHistoryItem,
  IAttendanceSummary,
} from "@/types/attendance.types";
import type { AttendanceStatus, ISODateString } from "@/types/common.types";
import {
  buildStudentHistory,
  calcAttendanceSummary,
  getRecordedDates,
  getRecordedDatesByClass,
  getStatusMapForDate,
  groupStatusByStudent,
} from "@/utils/attendanceStats";
import { getLatestServiceDate } from "@/utils/dates";
import { useCallback, useMemo } from "react";

/**
 * @param classId الفصل الافتراضي للحسابات (لو اتبعت، كل الدوال بتشتغل على الفصل ده
 * إلا لو مررت classId مختلف للدالة نفسها)
 */
export function useAttendance(classId?: string | null) {
  const { attendanceRecords, students, saveAttendance, isLoading, error } =
    useDataStore();

  /** آخر يوم خدمة (النهارده لو النهارده يوم الخدمة) */
  const latestServiceDate = useMemo<ISODateString>(
    () => getLatestServiceDate(),
    [],
  );

  const recordedDates = useMemo(
    () => getRecordedDates(attendanceRecords, classId ?? undefined),
    [attendanceRecords, classId],
  );

  const datesByClass = useMemo(
    () => getRecordedDatesByClass(attendanceRecords),
    [attendanceRecords],
  );

  const statusByStudent = useMemo(
    () => groupStatusByStudent(attendanceRecords),
    [attendanceRecords],
  );

  const getStatusMap = useCallback(
    (
      date: ISODateString,
      forClassId?: string | null,
    ): Record<string, AttendanceStatus> =>
      getStatusMapForDate(
        attendanceRecords,
        date,
        (forClassId ?? classId) ?? undefined,
      ),
    [attendanceRecords, classId],
  );

  const getSummary = useCallback(
    (date: ISODateString, forClassId?: string | null): IAttendanceSummary => {
      const scopeId = forClassId ?? classId ?? undefined;
      const total = students.filter(
        (student) => !scopeId || student.classId === scopeId,
      ).length;

      return calcAttendanceSummary(getStatusMap(date, scopeId), total);
    },
    [students, classId, getStatusMap],
  );

  /** سجل حضور مخدوم على أيام الخدمة المسجلة لفصله (الأحدث أولاً) */
  const getStudentHistory = useCallback(
    (studentId: string, limit?: number): IAttendanceHistoryItem[] => {
      const student = students.find((item) => item.id === studentId);
      if (!student) return [];

      return buildStudentHistory(
        statusByStudent[studentId] ?? {},
        datesByClass[student.classId] ?? [],
        limit,
      );
    },
    [students, statusByStudent, datesByClass],
  );

  return {
    records: attendanceRecords,
    isLoading,
    error,
    latestServiceDate,
    recordedDates,
    getStatusMap,
    getSummary,
    getStudentHistory,
    saveAttendance,
  };
}
