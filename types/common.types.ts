export type Gender = "male" | "female";

export type AttendanceStatus = "present" | "absent" | "excused";

/** تاريخ بصيغة YYYY-MM-DD بالتوقيت المحلي للجهاز */
export type ISODateString = string;

/** تاريخ ووقت بصيغة ISO 8601 (مثال: 2026-11-20T18:00:00.000Z) */
export type ISODateTimeString = string;
