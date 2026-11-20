import { FOLLOW_UP_CONSECUTIVE_THRESHOLD } from "@/constants/service";

/**
 * @deprecated بتعتمد على ترتيب الـ array مش على تواريخ الخدمة، ومش بتشمل المتابعة اليدوية.
 * استخدم `useFollowUp()` أو `computeFollowUpStatus()` بدلها.
 * الملف ده هيتحذف بعد نقل شاشة المخدومين للـ hooks الجديدة.
 */
export function checkNeedsFollowUp(
  studentId: string,
  history: Record<string, ("present" | "absent" | "excused")[]>,
  consecutiveThreshold = FOLLOW_UP_CONSECUTIVE_THRESHOLD,
): boolean {
  const studentHistory = history[studentId];

  if (!studentHistory || studentHistory.length < consecutiveThreshold) {
    return false;
  }

  const lastWeeks = studentHistory.slice(0, consecutiveThreshold);
  return lastWeeks.every((status) => status === "absent");
}
