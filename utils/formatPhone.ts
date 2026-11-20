import { toLatinDigits } from "./arabic";

/** يشيل أي حاجة غير الأرقام ويحوّل الأرقام العربية للاتينية */
export function normalizeDigits(value: string): string {
  return toLatinDigits(value).replace(/\D/g, "");
}

/** رقم موبايل مصري صحيح: 11 رقم يبدأ بـ 010 أو 011 أو 012 أو 015 */
export function isValidEgyptianMobile(value: string): boolean {
  return /^01[0125]\d{8}$/.test(normalizeDigits(value));
}

/** يحوّل 01212121212 إلى 201212121212 (الصيغة الدولية بدون +) */
export function toInternationalPhone(value: string): string {
  const digits = normalizeDigits(value).replace(/^00/, "");

  if (digits.startsWith("20") && digits.length === 12) return digits;
  if (digits.startsWith("0")) return `20${digits.slice(1)}`;
  return digits;
}

export function toTelUrl(phone: string): string {
  return `tel:${normalizeDigits(phone)}`;
}

export function toWhatsAppUrl(phone: string, message?: string): string {
  const base = `https://wa.me/${toInternationalPhone(phone)}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
