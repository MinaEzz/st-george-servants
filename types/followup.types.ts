import type { ISODateString } from "./common.types";

export type FollowUpReason = "auto" | "manual";

export interface IFollowUpStatus {
  studentId: string;
  needsFollowUp: boolean;
  /** تلقائي: غاب عدد أسابيع متتالية >= الحد المحدد */
  isAuto: boolean;
  /** يدوي: الخادم حدده بنفسه */
  isManual: boolean;
  consecutiveAbsences: number;
  lastAttendedDate: ISODateString | null;
  reasons: FollowUpReason[];
}
