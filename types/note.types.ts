import type { ISODateTimeString } from "./common.types";

/** general: ملاحظة عادية | follow-up: سجل افتقاد (اتصال أو زيارة) */
export type NoteKind = "general" | "follow-up";

export type ContactMethod = "call" | "visit" | "whatsapp" | "other";

export interface INote {
  id: string;
  studentId: string;
  kind: NoteKind;
  contactMethod: ContactMethod | null;
  body: string;
  authorId: string;
  authorName: string;
  createdAt: ISODateTimeString;
  updatedAt: ISODateTimeString;
}

export interface INoteQuery {
  studentId?: string;
}

export interface INewNoteInput {
  studentId: string;
  kind: NoteKind;
  contactMethod: ContactMethod | null;
  body: string;
  authorId: string;
  authorName: string;
}

export interface IUpdateNoteInput {
  id: string;
  body?: string;
  contactMethod?: ContactMethod | null;
}
