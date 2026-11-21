import type { AttendanceStatus } from "@/types/common.types";
import type { ContactMethod, NoteKind } from "@/types/note.types";
import type { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

export type IoniconName = ComponentProps<typeof Ionicons>["name"];

/** يوم الخدمة الأسبوعي (0 = الأحد ... 5 = الجمعة ... 6 = السبت) */
export const SERVICE_WEEKDAY = 5;

/** عدد أسابيع الغياب المتتالية اللي بيتحول بعدها المخدوم تلقائياً لـ "يحتاج متابعة" */
export const FOLLOW_UP_CONSECUTIVE_THRESHOLD = 4;

export const ATTENDANCE_STATUS_LABELS: Record<AttendanceStatus, string> = {
  present: "حاضر",
  absent: "غائب",
  excused: "اعتذر",
};

export const NOTE_KIND_LABELS: Record<NoteKind, string> = {
  general: "ملاحظة",
  "follow-up": "افتقاد",
};

/** ترتيب ظهور وسائل الافتقاد في الاختيارات */
export const CONTACT_METHODS: ContactMethod[] = [
  "call",
  "visit",
  "whatsapp",
  "other",
];

export const CONTACT_METHOD_LABELS: Record<ContactMethod, string> = {
  call: "اتصال",
  visit: "زيارة",
  whatsapp: "واتساب",
  other: "أخرى",
};

export const CONTACT_METHOD_ICONS: Record<ContactMethod, IoniconName> = {
  call: "call-outline",
  visit: "home-outline",
  whatsapp: "logo-whatsapp",
  other: "ellipsis-horizontal",
};
