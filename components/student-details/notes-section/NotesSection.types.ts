import type { INote } from "@/types/note.types";
import type { ReactElement } from "react";

export interface INotesSectionProps {
  title: string;
  icon: ReactElement<{ size?: number; color?: string }>;
  notes: INote[];
  emptyText: string;
  onEdit: (note: INote) => void;
  onDelete: (note: INote) => void;
}
