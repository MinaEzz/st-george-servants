import type {
  INewStudentInput,
  IStudent,
  IUpdateStudentInput,
} from "@/types/student.types";
import { generateStudentCode } from "@/utils/studentCode";
import { execute } from "./datasource";
import { ServiceError } from "./errors";
import { clone, mockDb, nextNumericId } from "./mock/mockDb";

export async function getStudents(): Promise<IStudent[]> {
  return execute<undefined, IStudent[]>("students.list", undefined, () =>
    clone(mockDb.students),
  );
}

export async function addStudent(input: INewStudentInput): Promise<IStudent> {
  return execute<INewStudentInput, IStudent>(
    "students.add",
    input,
    (payload) => {
      const name = payload.name.trim();
      if (!name) {
        throw new ServiceError("VALIDATION", "اسم المخدوم مطلوب");
      }

      const studentClass = mockDb.classes.find(
        (item) => item.id === payload.classId,
      );
      if (!studentClass) {
        throw new ServiceError("VALIDATION", "الفصل المختار غير موجود");
      }
      if (studentClass.stageId !== payload.stageId) {
        throw new ServiceError("VALIDATION", "الفصل لا يتبع المرحلة المختارة");
      }

      const created: IStudent = {
        ...payload,
        name,
        id: nextNumericId(mockDb.students.map((student) => student.id)),
        code: generateStudentCode(mockDb.students.map((student) => student.code)),
        manualFollowUp: false,
        createdAt: new Date().toISOString(),
      };

      mockDb.students.push(created);
      return clone(created);
    },
  );
}

interface IUpdateStudentPayload {
  id: string;
  changes: IUpdateStudentInput;
}

export async function updateStudent(
  id: string,
  changes: IUpdateStudentInput,
): Promise<IStudent> {
  return execute<IUpdateStudentPayload, IStudent>(
    "students.update",
    { id, changes },
    (payload) => {
      const index = mockDb.students.findIndex(
        (student) => student.id === payload.id,
      );
      if (index === -1) {
        throw new ServiceError("NOT_FOUND", "المخدوم غير موجود");
      }

      const next: IStudent = { ...mockDb.students[index], ...payload.changes };

      if (payload.changes.name !== undefined) {
        next.name = payload.changes.name.trim();
        if (!next.name) {
          throw new ServiceError("VALIDATION", "اسم المخدوم مطلوب");
        }
      }

      if (payload.changes.classId !== undefined) {
        const targetClass = mockDb.classes.find(
          (item) => item.id === payload.changes.classId,
        );
        if (!targetClass) {
          throw new ServiceError("VALIDATION", "الفصل المختار غير موجود");
        }
        // المرحلة دايماً بتتبع الفصل عشان ما يحصلش تضارب
        next.stageId = targetClass.stageId;
      }

      mockDb.students[index] = next;
      return clone(next);
    },
  );
}
