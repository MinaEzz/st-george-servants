import type { IAttendanceRecord } from "@/types/attendance.types";
import type { IClass } from "@/types/class.types";
import type { INote } from "@/types/note.types";
import type { IStudent } from "@/types/student.types";
import {
  MOCK_ATTENDANCE_RECORDS,
  MOCK_CLASSES,
  MOCK_NOTES,
  MOCK_STUDENTS,
} from "./mockData";

export function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

/** يرجّع أكبر id رقمي + 1 (الـ ids في الـ Mock أرقام نصية زي "1" و "2") */
export function nextNumericId(ids: string[]): string {
  const max = ids.reduce((highest, id) => {
    const numeric = Number.parseInt(id, 10);
    return Number.isNaN(numeric) ? highest : Math.max(highest, numeric);
  }, 0);

  return String(max + 1);
}

interface IMockDb {
  classes: IClass[];
  students: IStudent[];
  attendance: IAttendanceRecord[];
  notes: INote[];
}

/** قاعدة بيانات في الذاكرة بتحاكي تابات Google Sheets */
export const mockDb: IMockDb = {
  classes: clone(MOCK_CLASSES),
  students: clone(MOCK_STUDENTS),
  attendance: clone(MOCK_ATTENDANCE_RECORDS),
  notes: clone(MOCK_NOTES),
};
