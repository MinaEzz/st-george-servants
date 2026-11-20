import { useDataStore } from "@/store/data.store";
import { useSession } from "@/store/session.store";
import type { ContactMethod, INote, NoteKind } from "@/types/note.types";
import { useCallback, useMemo } from "react";

interface IAddStudentNoteParams {
  body: string;
  kind?: NoteKind;
  contactMethod?: ContactMethod | null;
}

/** ملاحظات وسجل افتقاد مخدوم واحد (الأحدث أولاً) */
export function useNotes(studentId: string) {
  const { notes, addNote, updateNote, deleteNote, isLoading } = useDataStore();
  const { getAuthor } = useSession();

  const studentNotes = useMemo<INote[]>(
    () =>
      notes
        .filter((note) => note.studentId === studentId)
        .sort((first, second) =>
          second.createdAt.localeCompare(first.createdAt),
        ),
    [notes, studentId],
  );

  const generalNotes = useMemo(
    () => studentNotes.filter((note) => note.kind === "general"),
    [studentNotes],
  );

  const followUpNotes = useMemo(
    () => studentNotes.filter((note) => note.kind === "follow-up"),
    [studentNotes],
  );

  const addStudentNote = useCallback(
    ({ body, kind = "general", contactMethod = null }: IAddStudentNoteParams) => {
      const author = getAuthor();

      return addNote({
        studentId,
        kind,
        contactMethod: kind === "follow-up" ? (contactMethod ?? "call") : null,
        body,
        authorId: author.id,
        authorName: author.name,
      });
    },
    [addNote, getAuthor, studentId],
  );

  return {
    notes: studentNotes,
    generalNotes,
    followUpNotes,
    isLoading,
    addStudentNote,
    updateNote,
    deleteNote,
  };
}
