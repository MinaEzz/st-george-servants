/**
 * أول حرفين لاسم المخدوم (أول حرف من الاسم الأول + أول حرف من الاسم الثاني).
 * لو الاسم كلمة واحدة بنأخذ أول حرفين منها.
 * بنفصل الحرفين بـ ZWNJ عشان الحروف العربية ما تتوصلش ببعض وتبان كأنها كلمة.
 */
export function getStudentInitials(name: string): string {
  const words = name.trim().split(/\s+/).filter(Boolean);

  if (words.length === 0) return "؟";

  if (words.length === 1) {
    const letters = Array.from(words[0]);
    return letters.slice(0, 2).join("\u200C");
  }

  const first = Array.from(words[0])[0];
  const second = Array.from(words[1])[0];
  return `${first}\u200C${second}`;
}
