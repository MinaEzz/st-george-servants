import type { Gender, ISODateString } from "./common.types";

/** قيم فورم المخدوم (كلها نصوص عشان تتربط مباشرة بالـ inputs) */
export interface IStudentFormValues {
  name: string;
  gender: Gender | "";
  birthDate: ISODateString | "";
  stageId: string;
  classId: string;
  phoneNumber: string;
  parentPhoneNumber: string;
  address: string;
  school: string;
  notes: string;
}

export type IStudentFormErrors = Partial<Record<keyof IStudentFormValues, string>>;

export type StudentFormChangeHandler = <TField extends keyof IStudentFormValues>(
  field: TField,
  value: IStudentFormValues[TField],
) => void;

/** الـ props المشتركة بين كل أقسام شاشة إضافة المخدوم */
export interface IStudentFormSectionProps {
  values: IStudentFormValues;
  errors: IStudentFormErrors;
  onChange: StudentFormChangeHandler;
}
