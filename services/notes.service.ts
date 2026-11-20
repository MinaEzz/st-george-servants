import type {
  INewNoteInput,
  INote,
  INoteQuery,
  IUpdateNoteInput,
} from "@/types/note.types";
import { execute } from "./datasource";
import { ServiceError } from "./errors";
import { clone, mockDb, nextNumericId } from "./mock/mockDb";

export async function getNotes(query: INoteQuery = {}): Promise<INote[]> {
  return execute<INoteQuery, INote[]>("notes.list", query, (payload) =>
    clone(
      mockDb.notes.filter(
        (note) => !payload.studentId || note.studentId === payload.studentId,
      ),
    ),
  );
}

export async function addNote(input: INewNoteInput): Promise<INote> {
  return execute<INewNoteInput, INote>("notes.add", input, (payload) => {
    const body = payload.body.trim();
    if (!body) {
      throw new ServiceError("VALIDATION", "نص الملاحظة مطلوب");
    }

    if (!mockDb.students.some((student) => student.id === payload.studentId)) {
      throw new ServiceError("NOT_FOUND", "المخدوم غير موجود");
    }

    const now = new Date().toISOString();
    const created: INote = {
      ...payload,
      body,
      id: nextNumericId(mockDb.notes.map((note) => note.id)),
      createdAt: now,
      updatedAt: now,
    };

    mockDb.notes.push(created);
    return clone(created);
  });
}

export async function updateNote(input: IUpdateNoteInput): Promise<INote> {
  return execute<IUpdateNoteInput, INote>("notes.update", input, (payload) => {
    const index = mockDb.notes.findIndex((note) => note.id === payload.id);
    if (index === -1) {
      throw new ServiceError("NOT_FOUND", "الملاحظة غير موجودة");
    }

    const current = mockDb.notes[index];
    const next: INote = { ...current, updatedAt: new Date().toISOString() };

    if (payload.body !== undefined) {
      const body = payload.body.trim();
      if (!body) {
        throw new ServiceError("VALIDATION", "نص الملاحظة مطلوب");
      }
      next.body = body;
    }

    if (payload.contactMethod !== undefined) {
      next.contactMethod = payload.contactMethod;
    }

    mockDb.notes[index] = next;
    return clone(next);
  });
}

interface IDeleteNotePayload {
  id: string;
}

export async function deleteNote(id: string): Promise<void> {
  return execute<IDeleteNotePayload, void>("notes.delete", { id }, (payload) => {
    const index = mockDb.notes.findIndex((note) => note.id === payload.id);
    if (index === -1) {
      throw new ServiceError("NOT_FOUND", "الملاحظة غير موجودة");
    }
    mockDb.notes.splice(index, 1);
  });
}
