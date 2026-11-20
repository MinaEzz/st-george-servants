import { SERVICE_WEEKDAY } from "@/constants/service";
import type { ISODateString, ISODateTimeString } from "@/types/common.types";
import { arabicPlural } from "./arabic";

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

/** يحوّل Date لنص YYYY-MM-DD بالتوقيت المحلي (مش UTC) */
export function toISODate(date: Date): ISODateString {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** يحوّل YYYY-MM-DD لـ Date عند منتصف الليل بالتوقيت المحلي */
export function parseISODate(value: ISODateString): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function isValidISODate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  return toISODate(parseISODate(value)) === value;
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function isServiceDay(date: Date): boolean {
  return date.getDay() === SERVICE_WEEKDAY;
}

/** آخر يوم خدمة حصل (النهارده لو النهارده يوم الخدمة، وإلا أقرب يوم خدمة فات) */
export function getLatestServiceDate(from: Date = new Date()): ISODateString {
  const diff = (from.getDay() - SERVICE_WEEKDAY + 7) % 7;
  return toISODate(addDays(from, -diff));
}

/** آخر `count` أيام خدمة مرتبة من الأحدث للأقدم */
export function getServiceDates(
  count: number,
  from: Date = new Date(),
): ISODateString[] {
  const latest = parseISODate(getLatestServiceDate(from));
  return Array.from({ length: count }, (_, index) =>
    toISODate(addDays(latest, -7 * index)),
  );
}

/** وقت من `days` يوم فاتت بصيغة ISO (بيستخدم في الـ Mock Data) */
export function daysAgoISODateTime(
  days: number,
  from: Date = new Date(),
): ISODateTimeString {
  return new Date(from.getTime() - days * 24 * 60 * 60 * 1000).toISOString();
}

/** مثال: "19 سبتمبر" */
export function formatShortArabicDate(value: ISODateString): string {
  return parseISODate(value).toLocaleDateString("ar-EG", {
    day: "numeric",
    month: "long",
  });
}

/** مثال: "الجمعة، 19 سبتمبر 2025" */
export function formatFullArabicDate(value: ISODateString): string {
  return parseISODate(value).toLocaleDateString("ar-EG", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** مثال: "منذ يومين" - للملاحظات وآخر التحديثات */
export function formatRelativeArabic(
  value: ISODateTimeString,
  now: Date = new Date(),
): string {
  const diffSeconds = Math.floor((now.getTime() - new Date(value).getTime()) / 1000);

  if (diffSeconds < 45) return "الآن";

  const minutes = Math.floor(diffSeconds / 60);
  if (minutes < 60) {
    return `منذ ${arabicPlural(Math.max(minutes, 1), {
      one: "دقيقة",
      two: "دقيقتين",
      few: "دقائق",
      many: "دقيقة",
    })}`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `منذ ${arabicPlural(hours, {
      one: "ساعة",
      two: "ساعتين",
      few: "ساعات",
      many: "ساعة",
    })}`;
  }

  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `منذ ${arabicPlural(days, {
      one: "يوم",
      two: "يومين",
      few: "أيام",
      many: "يوماً",
    })}`;
  }

  if (days < 30) {
    return `منذ ${arabicPlural(Math.floor(days / 7), {
      one: "أسبوع",
      two: "أسبوعين",
      few: "أسابيع",
      many: "أسبوعاً",
    })}`;
  }

  if (days < 365) {
    return `منذ ${arabicPlural(Math.floor(days / 30), {
      one: "شهر",
      two: "شهرين",
      few: "أشهر",
      many: "شهراً",
    })}`;
  }

  return `منذ ${arabicPlural(Math.floor(days / 365), {
    one: "سنة",
    two: "سنتين",
    few: "سنوات",
    many: "سنة",
  })}`;
}
