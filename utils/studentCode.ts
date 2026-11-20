/** يولّد كود مخدوم من 4 أرقام غير مستخدم قبل كده */
export function generateStudentCode(existingCodes: string[]): string {
  const used = new Set(existingCodes);

  for (let attempt = 0; attempt < 200; attempt += 1) {
    const code = String(Math.floor(1000 + Math.random() * 9000));
    if (!used.has(code)) return code;
  }

  // احتياطي لو الأكواد الـ 4 أرقام قربت تخلص
  let fallback = 10000;
  while (used.has(String(fallback))) fallback += 1;
  return String(fallback);
}
