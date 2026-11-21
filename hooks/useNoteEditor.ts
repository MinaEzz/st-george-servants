import { useNotes } from "@/hooks/useNotes";
import type { ContactMethod, INote, NoteKind } from "@/types/note.types";
import { useCallback, useState } from "react";

export interface INoteFormValues {
  body: string;
  contactMethod: ContactMethod | null;
}

export interface INoteEditorState {
  visible: boolean;
  /** بيزيد في كل مرة الفورم يتفتح، عشان الـ Modal يبدأ بحالة نضيفة */
  openId: number;
  mode: "add" | "edit";
  kind: NoteKind;
  note: INote | null;
}

const CLOSED_STATE: INoteEditorState = {
  visible: false,
  openId: 0,
  mode: "add",
  kind: "general",
  note: null,
};

/** إدارة فورم إضافة/تعديل/حذف ملاحظات وسجل افتقاد مخدوم واحد */
export function useNoteEditor(studentId: string) {
  const { addStudentNote, updateNote, deleteNote } = useNotes(studentId);
  const [state, setState] = useState<INoteEditorState>(CLOSED_STATE);

  const openAdd = useCallback((kind: NoteKind) => {
    setState((previous) => ({
      visible: true,
      openId: previous.openId + 1,
      mode: "add",
      kind,
      note: null,
    }));
  }, []);

  const openEdit = useCallback((note: INote) => {
    setState((previous) => ({
      visible: true,
      openId: previous.openId + 1,
      mode: "edit",
      kind: note.kind,
      note,
    }));
  }, []);

  const close = useCallback(() => {
    setState((previous) => ({ ...previous, visible: false }));
  }, []);

  /** بيرمي الخطأ لو الحفظ فشل عشان الفورم يعرضه، ويقفل نفسه لو نجح */
  const submit = useCallback(
    async (values: INoteFormValues): Promise<void> => {
      const contactMethod =
        state.kind === "follow-up" ? (values.contactMethod ?? "call") : null;

      if (state.mode === "edit" && state.note) {
        await updateNote({
          id: state.note.id,
          body: values.body,
          contactMethod,
        });
      } else {
        await addStudentNote({
          body: values.body,
          kind: state.kind,
          contactMethod,
        });
      }

      setState((previous) => ({ ...previous, visible: false }));
    },
    [state.kind, state.mode, state.note, updateNote, addStudentNote],
  );

  const remove = useCallback(
    (note: INote): Promise<void> => deleteNote(note.id),
    [deleteNote],
  );

  return { state, openAdd, openEdit, close, submit, remove };
}
