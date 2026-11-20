import type {
  AttendanceStatus,
  ISODateString,
  ISODateTimeString,
} from "./common.types";

/** سطر واحد في تاب Attendance: مخدوم واحد في يوم خدمة واحد */
export interface IAttendanceRecord {
  /** بصيغة `${date}_${studentId}` */
  id: string;
  date: ISODateString;
  studentId: string;
  classId: string;
  status: AttendanceStatus;
  recordedBy: string;
  recordedAt: ISODateTimeString;
}

export interface IAttendanceQuery {
  classId?: string;
  studentId?: string;
  date?: ISODateString;
}

export interface ISaveAttendanceEntry {
  studentId: string;
  /** null معناها: امسح التسجيل الموجود لهذا المخدوم في هذا اليوم */
  status: AttendanceStatus | null;
}

export interface ISaveAttendanceInput {
  date: ISODateString;
  classId: string;
  entries: ISaveAttendanceEntry[];
  recordedBy: string;
}

export interface IAttendanceSummary {
  total: number;
  present: number;
  absent: number;
  excused: number;
  /** مخدومين لسه ما اتسجلش لهم حاجة */
  unrecorded: number;
  /** نسبة الحضور = الحاضرين ÷ الإجمالي (الاعتذار لا يُحسب حضوراً) */
  percentage: number;
}

export interface IAttendanceHistoryItem {
  date: ISODateString;
  /** null معناها: ما اتسجلش حضور لهذا المخدوم في هذا اليوم */
  status: AttendanceStatus | null;
}
