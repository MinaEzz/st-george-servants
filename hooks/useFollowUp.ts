import { FOLLOW_UP_CONSECUTIVE_THRESHOLD } from "@/constants/service";
import { useDataStore } from "@/store/data.store";
import type { IFollowUpStatus } from "@/types/followup.types";
import type { IStudent } from "@/types/student.types";
import {
  getRecordedDatesByClass,
  groupStatusByStudent,
} from "@/utils/attendanceStats";
import { computeFollowUpStatus } from "@/utils/computeFollowUp";
import { useCallback, useMemo } from "react";

/**
 * "يحتاجون متابعة" = غياب 4 أسابيع متتالية (تلقائي) + المتابعة اليدوية.
 * @param classId لو اتبعت، القايمة والعدد بيتحسبوا لهذا الفصل بس.
 */
export function useFollowUp(classId?: string | null) {
  const { students, attendanceRecords, isLoading } = useDataStore();

  const statuses = useMemo<Record<string, IFollowUpStatus>>(() => {
    const datesByClass = getRecordedDatesByClass(attendanceRecords);
    const statusByStudent = groupStatusByStudent(attendanceRecords);
    const result: Record<string, IFollowUpStatus> = {};

    students.forEach((student) => {
      result[student.id] = computeFollowUpStatus({
        student,
        classDates: datesByClass[student.classId] ?? [],
        statusByDate: statusByStudent[student.id] ?? {},
        threshold: FOLLOW_UP_CONSECUTIVE_THRESHOLD,
      });
    });

    return result;
  }, [students, attendanceRecords]);

  const followUpStudents = useMemo<IStudent[]>(
    () =>
      students.filter(
        (student) =>
          (!classId || student.classId === classId) &&
          statuses[student.id]?.needsFollowUp,
      ),
    [students, statuses, classId],
  );

  const getFollowUpStatus = useCallback(
    (studentId: string): IFollowUpStatus | null => statuses[studentId] ?? null,
    [statuses],
  );

  return {
    isLoading,
    statuses,
    followUpStudents,
    followUpCount: followUpStudents.length,
    getFollowUpStatus,
  };
}
