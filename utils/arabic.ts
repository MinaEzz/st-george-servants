const ARABIC_INDIC_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

/** يحوّل الأرقام اللاتينية (0-9) لأرقام عربية هندية (٠-٩) */
export function toArabicDigits(value: number | string): string {
  return String(value).replace(
    /[0-9]/g,
    (digit) => ARABIC_INDIC_DIGITS[Number(digit)],
  );
}

/** يحوّل الأرقام العربية الهندية والفارسية لأرقام لاتينية (0-9) */
export function toLatinDigits(value: string): string {
  return value
    .replace(/[\u0660-\u0669]/g, (digit) =>
      String(digit.charCodeAt(0) - 0x0660),
    )
    .replace(/[\u06F0-\u06F9]/g, (digit) =>
      String(digit.charCodeAt(0) - 0x06f0),
    );
}

export interface IArabicPluralForms {
  /** المفرد (1) */
  one: string;
  /** المثنى (2) */
  two: string;
  /** الجمع من 3 إلى 10 */
  few: string;
  /** من 11 فما فوق */
  many: string;
}

/** يرجّع العدد مع المعدود بالصيغة العربية الصحيحة (دقيقة / دقيقتين / ٣ دقائق / ١١ دقيقة) */
export function arabicPlural(
  count: number,
  forms: IArabicPluralForms,
): string {
  if (count === 1) return forms.one;
  if (count === 2) return forms.two;
  if (count >= 3 && count <= 10) return `${toArabicDigits(count)} ${forms.few}`;
  return `${toArabicDigits(count)} ${forms.many}`;
}
