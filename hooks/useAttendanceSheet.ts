import { useAttendance } from "@/hooks/useAttendance";
import { useStudents } from "@/hooks/useStudents";
import { getErrorMessage } from "@/services/errors";
import { useSession } from "@/store/session.store";
import type {
  IAttendanceSummary,
  ISaveAttendanceEntry,
} from "@/types/attendance.types";
import type { AttendanceStatus, ISODateString } from "@/types/common.types";
import type { IStudent } from "@/types/student.types";
import { calcAttendanceSummary } from "@/utils/attendanceStats";
import {
  addDays,
  formatFullArabicDate,
  parseISODate,
  toISODate,
} from "@/utils/dates";
import { useCallback, useMemo, useState } from "react";

/** أقصى عدد أسابيع يقدر الخادم يرجع لها لتسجيل أو تعديل حضور قديم */
const MAX_WEEKS_BACK = 52;

export type AttendanceDraft = Record<string, AttendanceStatus | null>;

export interface ISaveAttendanceResult {
  ok: boolean;
  error: string | null;
}

/**
 * منطق شاشة تحضير فصل واحد:
 * - الحالة الظاهرة = تعديلات الخادم الحالية (overrides) فوق الحضور المحفوظ في اليوم المختار.
 * - الحفظ بيبعت التغييرات بس (مش كل الفصل)، والاختيار المكرر بيمسح الحالة.
 */
export function useAttendanceSheet(classId: string | null) {
  const { students, refresh } = useStudents();
  const { latestServiceDate, getStatusMap, saveAttendance, isLoading, error } =
    useAttendance(classId);
  const { getAuthor } = useSession();

  const [selectedDate, setSelectedDate] =
    useState<ISODateString>(latestServiceDate);
  const [overrides, setOverrides] = useState<AttendanceDraft>({});
  const [isSaving, setIsSaving] = useState(false);

  const classStudents = useMemo<IStudent[]>(
    () =>
      classId ? students.filter((student) => student.classId === classId) : [],
    [students, classId],
  );

  const savedMap = useMemo<Record<string, AttendanceStatus>>(
    () => (classId ? getStatusMap(selectedDate, classId) : {}),
    [classId, getStatusMap, selectedDate],
  );

  /** الحالة اللي بتظهر في الشاشة لكل مخدوم (المحفوظة + تعديلات الخادم) */
  const statusMap = useMemo<AttendanceDraft>(() => {
    const map: AttendanceDraft = {};

    classStudents.forEach((student) => {
      const override = overrides[student.id];
      map[student.id] =
        override !== undefined ? override : (savedMap[student.id] ?? null);
    });

    return map;
  }, [classStudents, overrides, savedMap]);

  /** الفرق بين اللي على الشاشة واللي محفوظ = اللي هيتبعت عند الحفظ */
  const changes = useMemo<ISaveAttendanceEntry[]>(
    () =>
      classStudents
        .filter(
          (student) =>
            (statusMap[student.id] ?? null) !== (savedMap[student.id] ?? null),
        )
        .map((student) => ({
          studentId: student.id,
          status: statusMap[student.id] ?? null,
        })),
    [classStudents, statusMap, savedMap],
  );

  const summary = useMemo<IAttendanceSummary>(
    () => calcAttendanceSummary(statusMap, classStudents.length),
    [statusMap, classStudents.length],
  );

  const oldestDate = useMemo<ISODateString>(
    () =>
      toISODate(addDays(parseISODate(latestServiceDate), -7 * MAX_WEEKS_BACK)),
    [latestServiceDate],
  );

  const hasSavedRecords = Object.keys(savedMap).length > 0;
  const hasChanges = changes.length > 0;
  const canGoNewer = selectedDate < latestServiceDate;
  const canGoOlder = selectedDate > oldestDate;

  const setStatus = useCallback(
    (studentId: string, status: AttendanceStatus) => {
      setOverrides((previous) => {
        const current =
          studentId in previous
            ? previous[studentId]
            : (savedMap[studentId] ?? null);

        // الضغط على نفس الحالة مرة تانية بيمسحها
        return { ...previous, [studentId]: current === status ? null : status };
      });
    },
    [savedMap],
  );

  const markRemainingPresent = useCallback(() => {
    setOverrides((previous) => {
      const next = { ...previous };

      classStudents.forEach((student) => {
        const current =
          student.id in previous
            ? previous[student.id]
            : (savedMap[student.id] ?? null);

        if (current === null) next[student.id] = "present";
      });

      return next;
    });
  }, [classStudents, savedMap]);

  const clearAll = useCallback(() => {
    setOverrides(() => {
      const next: AttendanceDraft = {};
      classStudents.forEach((student) => {
        next[student.id] = null;
      });
      return next;
    });
  }, [classStudents]);

  /** direction: 1 = أسبوع أحدث، -1 = أسبوع أقدم (بيتجاهل لو برا الحدود) */
  const shiftDate = useCallback(
    (direction: 1 | -1) => {
      const next = toISODate(
        addDays(parseISODate(selectedDate), direction * 7),
      );

      if (next > latestServiceDate || next < oldestDate) return;

      setSelectedDate(next);
      setOverrides({});
    },
    [selectedDate, latestServiceDate, oldestDate],
  );

  const save = useCallback(async (): Promise<ISaveAttendanceResult> => {
    if (!classId || changes.length === 0) {
      return { ok: false, error: null };
    }

    setIsSaving(true);

    try {
      await saveAttendance({
        date: selectedDate,
        classId,
        entries: changes,
        recordedBy: getAuthor().id,
      });
      setOverrides({});
      return { ok: true, error: null };
    } catch (caught) {
      return { ok: false, error: getErrorMessage(caught) };
    } finally {
      setIsSaving(false);
    }
  }, [classId, changes, saveAttendance, selectedDate, getAuthor]);

  return {
    students: classStudents,
    statusMap,
    summary,
    selectedDate,
    dateLabel: formatFullArabicDate(selectedDate),
    isLatestDate: selectedDate === latestServiceDate,
    canGoNewer,
    canGoOlder,
    hasSavedRecords,
    hasChanges,
    changesCount: changes.length,
    isSaving,
    isLoading,
    loadError: error,
    reload: refresh,
    setStatus,
    markRemainingPresent,
    clearAll,
    shiftDate,
    save,
  };
}
