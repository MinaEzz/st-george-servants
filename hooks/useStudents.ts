import { useDataStore } from "@/store/data.store";
import type { IStudent } from "@/types/student.types";
import { useCallback } from "react";

export function useStudents() {
  const { students, isLoading, error, refresh, addStudent, updateStudent } =
    useDataStore();

  const getStudentById = useCallback(
    (id: string): IStudent | null =>
      students.find((student) => student.id === id) ?? null,
    [students],
  );

  const getStudentsByClass = useCallback(
    (classId: string): IStudent[] =>
      students.filter((student) => student.classId === classId),
    [students],
  );

  /** تفعيل/إلغاء المتابعة اليدوية للمخدوم */
  const setManualFollowUp = useCallback(
    (id: string, value: boolean) => updateStudent(id, { manualFollowUp: value }),
    [updateStudent],
  );

  return {
    students,
    isLoading,
    error,
    refresh,
    getStudentById,
    getStudentsByClass,
    addStudent,
    updateStudent,
    setManualFollowUp,
  };
}
