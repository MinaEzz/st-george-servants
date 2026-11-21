import type {
  IStudentFormErrors,
  IStudentFormValues,
} from "@/types/student-form.types";
import { calcAge } from "./calcAge";
import { isValidISODate } from "./dates";
import { isValidEgyptianMobile } from "./formatPhone";

const INVALID_PHONE_MESSAGE =
  "رقم الموبايل غير صحيح (11 رقم يبدأ بـ 010 أو 011 أو 012 أو 015)";

/** يرجّع كائن فاضي لو كل البيانات سليمة، أو رسالة عربية لكل حقل فيه مشكلة */
export function validateStudentForm(
  values: IStudentFormValues,
  today: Date = new Date(),
): IStudentFormErrors {
  const errors: IStudentFormErrors = {};

  const name = values.name.trim();
  if (!name) {
    errors.name = "اسم المخدوم مطلوب";
  } else if (name.split(/\s+/).length < 2) {
    errors.name = "اكتب الاسم الأول والثاني على الأقل";
  }

  if (!values.gender) {
    errors.gender = "اختر النوع";
  }

  if (!values.birthDate) {
    errors.birthDate = "تاريخ الميلاد مطلوب";
  } else if (!isValidISODate(values.birthDate)) {
    errors.birthDate = "تاريخ الميلاد غير صحيح";
  } else if (calcAge(values.birthDate, today) === null) {
    errors.birthDate = "تاريخ الميلاد لا يمكن أن يكون في المستقبل";
  }

  if (!values.stageId) {
    errors.stageId = "اختر المرحلة";
  }

  if (!values.classId) {
    errors.classId = "اختر الفصل";
  }

  if (values.phoneNumber.trim() && !isValidEgyptianMobile(values.phoneNumber)) {
    errors.phoneNumber = INVALID_PHONE_MESSAGE;
  }

  if (!values.parentPhoneNumber.trim()) {
    errors.parentPhoneNumber = "رقم ولي الأمر مطلوب";
  } else if (!isValidEgyptianMobile(values.parentPhoneNumber)) {
    errors.parentPhoneNumber = INVALID_PHONE_MESSAGE;
  }

  if (!values.address.trim()) {
    errors.address = "العنوان مطلوب (بيفيد في الافتقاد والزيارات)";
  }

  return errors;
}
