import type { INoteFormValues } from "@/hooks/useNoteEditor";
import type { INote, NoteKind } from "@/types/note.types";

export interface INoteFormModalProps {
  visible: boolean;
  mode: "add" | "edit";
  kind: NoteKind;
  /** الملاحظة اللي بتتعدل (null في الإضافة) */
  note: INote | null;
  onClose: () => void;
  /** بيرمي الخطأ لو الحفظ فشل */
  onSubmit: (values: INoteFormValues) => Promise<void>;
}
