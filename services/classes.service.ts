import type { IClass, INewClassInput } from "@/types/class.types";
import { execute } from "./datasource";
import { ServiceError } from "./errors";
import { clone, mockDb } from "./mock/mockDb";

export async function getClasses(): Promise<IClass[]> {
  return execute<undefined, IClass[]>("classes.list", undefined, () =>
    clone(mockDb.classes),
  );
}

export async function addClass(input: INewClassInput): Promise<IClass> {
  return execute<INewClassInput, IClass>("classes.add", input, (payload) => {
    const name = payload.name.trim();

    if (!name) {
      throw new ServiceError("VALIDATION", "اسم الفصل مطلوب");
    }

    const duplicate = mockDb.classes.some(
      (item) => item.stageId === payload.stageId && item.name === name,
    );
    if (duplicate) {
      throw new ServiceError(
        "VALIDATION",
        "اسم الفصل موجود بالفعل في هذه المرحلة",
      );
    }

    const stageClassNumbers = mockDb.classes
      .filter((item) => item.stageId === payload.stageId)
      .map((item) => Number.parseInt(item.id, 10))
      .filter((value) => !Number.isNaN(value));

    const nextNumber =
      stageClassNumbers.length > 0
        ? Math.max(...stageClassNumbers) + 1
        : Number.parseInt(`${payload.stageId}01`, 10);

    const created: IClass = {
      id: String(nextNumber),
      stageId: payload.stageId,
      name,
    };

    mockDb.classes.push(created);
    return clone(created);
  });
}
