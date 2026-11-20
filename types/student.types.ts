import type { Gender, ISODateString, ISODateTimeString } from "./common.types";

/**
 * بيانات المخدوم الثابتة (تاب Students في Google Sheets).
 * سجل الحضور اليومي منفصل تماماً في attendance.types.ts
 */
export interface IStudent {
  id: string;
  code: string;
  name: string;
  gender: Gender;
  birthDate: ISODateString;
  stageId: string;
  classId: string;
  image: string | null;
  phoneNumber: string;
  parentPhoneNumber: string;
  address: string;
  school: string;
  /** المتابعة اليدوية: الخادم يحدد إن المخدوم يحتاج افتقاد بغض النظر عن الغياب */
  manualFollowUp: boolean;
  createdAt: ISODateTimeString;
}

/** البيانات المطلوبة لإضافة مخدوم جديد (الـ id والكود يتولدوا من الـ Service) */
export type INewStudentInput = Omit<
  IStudent,
  "id" | "code" | "manualFollowUp" | "createdAt"
>;

/** البيانات القابلة للتعديل في مخدوم موجود */
export type IUpdateStudentInput = Partial<Omit<IStudent, "id" | "createdAt">>;
