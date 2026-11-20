import type {
  IAttendanceHistoryItem,
  IAttendanceRecord,
  IAttendanceSummary,
} from "@/types/attendance.types";
import type { AttendanceStatus, ISODateString } from "@/types/common.types";

export type StatusByDate = Record<ISODateString, AttendanceStatus>;

function sortNewestFirst(dates: Iterable<ISODateString>): ISODateString[] {
  return Array.from(new Set(dates)).sort((a, b) => b.localeCompare(a));
}

/** أيام الخدمة اللي اتسجل فيها حضور فعلاً، من الأحدث للأقدم (لفصل معين أو للكل) */
export function getRecordedDates(
  records: IAttendanceRecord[],
  classId?: string,
): ISODateString[] {
  return sortNewestFirst(
    records
      .filter((record) => !classId || record.classId === classId)
      .map((record) => record.date),
  );
}

/** نفس getRecordedDates لكن متجمعة لكل فصل مرة واحدة */
export function getRecordedDatesByClass(
  records: IAttendanceRecord[],
): Record<string, ISODateString[]> {
  const grouped: Record<string, Set<ISODateString>> = {};

  records.forEach((record) => {
    if (!grouped[record.classId]) grouped[record.classId] = new Set();
    grouped[record.classId].add(record.date);
  });

  const result: Record<string, ISODateString[]> = {};
  Object.keys(grouped).forEach((classId) => {
    result[classId] = sortNewestFirst(grouped[classId]);
  });
  return result;
}

/** حالة كل مخدوم في يوم معين: { [studentId]: status } */
export function getStatusMapForDate(
  records: IAttendanceRecord[],
  date: ISODateString,
  classId?: string,
): Record<string, AttendanceStatus> {
  const map: Record<string, AttendanceStatus> = {};

  records.forEach((record) => {
    if (record.date !== date) return;
    if (classId && record.classId !== classId) return;
    map[record.studentId] = record.status;
  });

  return map;
}

/** { [studentId]: { [date]: status } } */
export function groupStatusByStudent(
  records: IAttendanceRecord[],
): Record<string, StatusByDate> {
  const grouped: Record<string, StatusByDate> = {};

  records.forEach((record) => {
    if (!grouped[record.studentId]) grouped[record.studentId] = {};
    grouped[record.studentId][record.date] = record.status;
  });

  return grouped;
}

export function calcAttendanceSummary(
  statusMap: Record<string, AttendanceStatus | null | undefined>,
  total: number,
): IAttendanceSummary {
  const statuses = Object.values(statusMap);
  const present = statuses.filter((status) => status === "present").length;
  const absent = statuses.filter((status) => status === "absent").length;
  const excused = statuses.filter((status) => status === "excused").length;
  const unrecorded = Math.max(total - present - absent - excused, 0);
  const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

  return { total, present, absent, excused, unrecorded, percentage };
}

/** سجل حضور مخدوم على أيام الخدمة المحددة (من الأحدث للأقدم) */
export function buildStudentHistory(
  statusByDate: StatusByDate,
  dates: ISODateString[],
  limit?: number,
): IAttendanceHistoryItem[] {
  const scopedDates = limit === undefined ? dates : dates.slice(0, limit);

  return scopedDates.map((date) => ({
    date,
    status: statusByDate[date] ?? null,
  }));
}
