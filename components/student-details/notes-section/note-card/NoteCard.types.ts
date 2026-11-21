import type { ContactMethod, NoteKind } from "@/types/note.types";

export default interface INoteCardProps {
  servantName: string;
  timeText: string;
  noteBody: string;
  kind: NoteKind;
  contactMethod: ContactMethod | null;
  onEdit: () => void;
  onDelete: () => void;
}
