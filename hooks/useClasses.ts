import { STAGES } from "@/constants/stages";
import { useDataStore } from "@/store/data.store";
import type { IClassWithCount, IStage } from "@/types/class.types";
import { useCallback, useMemo } from "react";

export function useClasses() {
  const { classes, students, isLoading, error, addClass } = useDataStore();

  const classesWithCount = useMemo<IClassWithCount[]>(
    () =>
      classes.map((item) => ({
        ...item,
        studentsCount: students.filter((student) => student.classId === item.id)
          .length,
      })),
    [classes, students],
  );

  const getClassesByStage = useCallback(
    (stageId: string): IClassWithCount[] =>
      classesWithCount.filter((item) => item.stageId === stageId),
    [classesWithCount],
  );

  const getClassById = useCallback(
    (classId: string): IClassWithCount | null =>
      classesWithCount.find((item) => item.id === classId) ?? null,
    [classesWithCount],
  );

  const getStageById = useCallback(
    (stageId: string): IStage | null =>
      STAGES.find((stage) => stage.id === stageId) ?? null,
    [],
  );

  return {
    stages: STAGES,
    classes: classesWithCount,
    isLoading,
    error,
    getClassesByStage,
    getClassById,
    getStageById,
    addClass,
  };
}
