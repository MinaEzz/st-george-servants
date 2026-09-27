export function checkNeedsFollowUp(
  studentId: string,
  history: Record<string, ("present" | "absent" | "excused")[]>,
  consecutiveThreshold = 4,
): boolean {
  const studentHistory = history[studentId];

  if (!studentHistory || studentHistory.length < consecutiveThreshold) {
    return false;
  }

  const lastFourWeeks = studentHistory.slice(0, consecutiveThreshold);
  return lastFourWeeks.every((status) => status === "absent");
}
