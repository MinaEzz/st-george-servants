import type {
  IAttendanceQuery,
  IAttendanceRecord,
  ISaveAttendanceInput,
} from "@/types/attendance.types";
import { isValidISODate } from "@/utils/dates";
import { execute } from "./datasource";
import { ServiceError } from "./errors";
import { clone, mockDb } from "./mock/mockDb";

export async function getAttendanceRecords(
  query: IAttendanceQuery = {},
): Promise<IAttendanceRecord[]> {
  return execute<IAttendanceQuery, IAttendanceRecord[]>(
    "attendance.list",
    query,
    (payload) =>
      clone(
        mockDb.attendance.filter(
          (record) =>
            (!payload.classId || record.classId === payload.classId) &&
            (!payload.studentId || record.studentId === payload.studentId) &&
            (!payload.date || record.date === payload.date),
        ),
      ),
  );
}

/**
 * بتحفظ (أو تعدّل) حضور فصل في يوم خدمة، وبترجّع كل سجلات الفصل في اليوم ده بعد الحفظ.
 * entry.status = null بتمسح تسجيل المخدوم في اليوم ده.
 */
export async function saveAttendance(
  input: ISaveAttendanceInput,
): Promise<IAttendanceRecord[]> {
  return execute<ISaveAttendanceInput, IAttendanceRecord[]>(
    "attendance.save",
    input,
    (payload) => {
      if (!isValidISODate(payload.date)) {
        throw new ServiceError("VALIDATION", "تاريخ الخدمة غير صحيح");
      }

      if (!mockDb.classes.some((item) => item.id === payload.classId)) {
        throw new ServiceError("VALIDATION", "الفصل المختار غير موجود");
      }

      const now = new Date().toISOString();

      payload.entries.forEach((entry) => {
        const student = mockDb.students.find(
          (item) =>
            item.id === entry.studentId && item.classId === payload.classId,
        );
        if (!student) {
          throw new ServiceError("VALIDATION", "المخدوم غير موجود في هذا الفصل");
        }

        const id = `${payload.date}_${entry.studentId}`;
        const index = mockDb.attendance.findIndex((record) => record.id === id);

        if (entry.status === null) {
          if (index !== -1) mockDb.attendance.splice(index, 1);
          return;
        }

        const record: IAttendanceRecord = {
          id,
          date: payload.date,
          studentId: entry.studentId,
          classId: payload.classId,
          status: entry.status,
          recordedBy: payload.recordedBy,
          recordedAt: now,
        };

        if (index === -1) {
          mockDb.attendance.push(record);
        } else {
          mockDb.attendance[index] = record;
        }
      });

      return clone(
        mockDb.attendance.filter(
          (record) =>
            record.date === payload.date && record.classId === payload.classId,
        ),
      );
    },
  );
}
