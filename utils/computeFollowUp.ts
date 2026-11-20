import { FOLLOW_UP_CONSECUTIVE_THRESHOLD } from "@/constants/service";
import type { ISODateString } from "@/types/common.types";
import type { IFollowUpStatus, FollowUpReason } from "@/types/followup.types";
import type { IStudent } from "@/types/student.types";
import type { StatusByDate } from "./attendanceStats";

interface IComputeFollowUpParams {
  student: IStudent;
  /** أيام الخدمة اللي اتسجلت لفصل المخدوم، من الأحدث للأقدم */
  classDates: ISODateString[];
  /** حالة المخدوم في كل يوم: { [date]: status } */
  statusByDate: StatusByDate;
  threshold?: number;
}

/**
 * بيحسب هل المخدوم محتاج متابعة:
 * - تلقائي: غاب `threshold` أيام خدمة متتالية (من آخر يوم خدمة مسجل لفصله).
 *   الاعتذار أو الحضور أو عدم التسجيل بيقطع السلسلة.
 * - يدوي: الخادم فعّل manualFollowUp على المخدوم.
 */
export function computeFollowUpStatus({
  student,
  classDates,
  statusByDate,
  threshold = FOLLOW_UP_CONSECUTIVE_THRESHOLD,
}: IComputeFollowUpParams): IFollowUpStatus {
  let consecutiveAbsences = 0;

  for (const date of classDates) {
    if (statusByDate[date] === "absent") {
      consecutiveAbsences += 1;
    } else {
      break;
    }
  }

  const lastAttendedDate =
    classDates.find((date) => statusByDate[date] === "present") ?? null;

  const isAuto = consecutiveAbsences >= threshold;
  const isManual = student.manualFollowUp;

  const reasons: FollowUpReason[] = [];
  if (isAuto) reasons.push("auto");
  if (isManual) reasons.push("manual");

  return {
    studentId: student.id,
    needsFollowUp: isAuto || isManual,
    isAuto,
    isManual,
    consecutiveAbsences,
    lastAttendedDate,
    reasons,
  };
}
