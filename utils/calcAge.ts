import type { ISODateString } from "@/types/common.types";
import { arabicPlural } from "./arabic";
import { isValidISODate, parseISODate } from "./dates";

export interface IAge {
  years: number;
  months: number;
}

/** يحسب السن من تاريخ الميلاد. يرجّع null لو التاريخ غير صحيح أو في المستقبل */
export function calcAge(
  birthDate: ISODateString,
  today: Date = new Date(),
): IAge | null {
  if (!isValidISODate(birthDate)) return null;

  const birth = parseISODate(birthDate);
  if (birth.getTime() > today.getTime()) return null;

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();

  if (today.getDate() < birth.getDate()) {
    months -= 1;
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return { years, months };
}

/** مثال: "٥ سنوات و ٣ أشهر" أو "٨ أشهر" أو "سنتين" */
export function formatAge(
  birthDate: ISODateString,
  today: Date = new Date(),
): string {
  const age = calcAge(birthDate, today);
  if (!age) return "";

  const monthsText = arabicPlural(age.months, {
    one: "شهر",
    two: "شهرين",
    few: "أشهر",
    many: "شهراً",
  });

  if (age.years === 0) {
    return age.months === 0 ? "أقل من شهر" : monthsText;
  }

  const yearsText = arabicPlural(age.years, {
    one: "سنة",
    two: "سنتين",
    few: "سنوات",
    many: "سنة",
  });

  return age.months > 0 ? `${yearsText} و ${monthsText}` : yearsText;
}
