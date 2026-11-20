import { CLASSES } from "@/constants/classes";
import type { IAttendanceRecord } from "@/types/attendance.types";
import type { IClass } from "@/types/class.types";
import type { AttendanceStatus } from "@/types/common.types";
import type { INote } from "@/types/note.types";
import type { IStudent } from "@/types/student.types";
import { daysAgoISODateTime, getServiceDates } from "@/utils/dates";

/** عدد أسابيع الحضور اللي بنولّدها في الـ Mock */
const MOCK_SERVICE_WEEKS = 6;

export const MOCK_CLASSES: IClass[] = CLASSES.map(
  ({ id, stageId, name }) => ({ id, stageId, name }),
);

export const MOCK_STUDENTS: IStudent[] = [
  {
    id: "1",
    code: "1234",
    name: "مارك ماجد جورج",
    gender: "male",
    birthDate: "2019-01-01",
    stageId: "1",
    classId: "101",
    image: null,
    phoneNumber: "01212121212",
    parentPhoneNumber: "01214151617",
    address: "14 شارع توتونجي - حدائق حلوان",
    school: "مدرسة الزهراء بنين",
    manualFollowUp: false,
    createdAt: daysAgoISODateTime(200),
  },
  {
    id: "2",
    code: "5678",
    name: "مينا ممدوح ابراهيم",
    gender: "male",
    birthDate: "2020-01-02",
    stageId: "1",
    classId: "101",
    image: null,
    phoneNumber: "01212121212",
    parentPhoneNumber: "01214151617",
    address: "منشية حدائق حلوان",
    school: "مدرسة الزهراء بنين",
    manualFollowUp: false,
    createdAt: daysAgoISODateTime(200),
  },
  {
    id: "3",
    code: "9101112",
    name: "نورا جرجس عاطف",
    gender: "female",
    birthDate: "2019-01-01",
    stageId: "1",
    classId: "101",
    image: null,
    phoneNumber: "01212121212",
    parentPhoneNumber: "01214151617",
    address: "14 شارع توتونجي - حدائق حلوان",
    school: "مدرسة الزهراء بنات",
    manualFollowUp: false,
    createdAt: daysAgoISODateTime(200),
  },
  {
    id: "4",
    code: "2468",
    name: "كيرلس عادل منصور",
    gender: "male",
    birthDate: "2019-05-14",
    stageId: "2",
    classId: "201",
    image: null,
    phoneNumber: "01012345678",
    parentPhoneNumber: "01112345678",
    address: "شارع الجيش - حدائق حلوان",
    school: "مدرسة الشهيد العظيم الابتدائية",
    manualFollowUp: false,
    createdAt: daysAgoISODateTime(180),
  },
  {
    id: "5",
    code: "1357",
    name: "مريم سامي فايز",
    gender: "female",
    birthDate: "2019-09-02",
    stageId: "2",
    classId: "201",
    image: null,
    phoneNumber: "01223344556",
    parentPhoneNumber: "01223344557",
    address: "شارع المحطة - حدائق حلوان",
    school: "مدرسة الزهراء بنات",
    manualFollowUp: false,
    createdAt: daysAgoISODateTime(180),
  },
  {
    id: "6",
    code: "8642",
    name: "أبانوب رأفت جرجس",
    gender: "male",
    birthDate: "2018-11-23",
    stageId: "2",
    classId: "201",
    image: null,
    phoneNumber: "01556677889",
    parentPhoneNumber: "01556677880",
    address: "منشية حدائق حلوان",
    school: "مدرسة الزهراء بنين",
    manualFollowUp: false,
    createdAt: daysAgoISODateTime(180),
  },
  {
    id: "7",
    code: "7531",
    name: "مارينا إياد ناجي",
    gender: "female",
    birthDate: "2018-03-12",
    stageId: "2",
    classId: "202",
    image: null,
    phoneNumber: "01099887766",
    parentPhoneNumber: "01099887765",
    address: "شارع 9 - حدائق حلوان",
    school: "مدرسة الزهراء بنات",
    manualFollowUp: false,
    createdAt: daysAgoISODateTime(150),
  },
  {
    id: "8",
    code: "9753",
    name: "يوسف مجدي لبيب",
    gender: "male",
    birthDate: "2013-07-08",
    stageId: "3",
    classId: "301",
    image: null,
    phoneNumber: "01166554433",
    parentPhoneNumber: "01166554434",
    address: "شارع النصر - حدائق حلوان",
    school: "مدرسة حلوان الإعدادية بنين",
    manualFollowUp: true,
    createdAt: daysAgoISODateTime(150),
  },
];

/**
 * نمط الحضور لكل مخدوم عبر آخر 6 أيام خدمة (الحرف الأول = أحدث يوم خدمة):
 * P حاضر | A غائب | E اعتذر | - لم يُسجّل
 */
const ATTENDANCE_PATTERNS: Record<string, string> = {
  "1": "AAAAPP", // غاب 4 متتالية → متابعة تلقائية
  "2": "PAPAPP", // متقطع → لا يحتاج متابعة
  "3": "AAAPPP", // غاب 3 فقط → لا يحتاج متابعة
  "4": "PPPPPP", // منتظم
  "5": "EAAAAP", // الاعتذار الأخير قطع السلسلة → لا يحتاج متابعة
  "6": "AAAAAA", // غاب كل الأسابيع → متابعة تلقائية
  "7": "AAPPPP",
  "8": "PAPPPP", // متابعة يدوية
};

const STATUS_BY_CHAR: Record<string, AttendanceStatus | undefined> = {
  P: "present",
  A: "absent",
  E: "excused",
};

const MOCK_SERVICE_DATES = getServiceDates(MOCK_SERVICE_WEEKS);

export const MOCK_ATTENDANCE_RECORDS: IAttendanceRecord[] =
  MOCK_STUDENTS.flatMap((student): IAttendanceRecord[] => {
    const pattern = ATTENDANCE_PATTERNS[student.id] ?? "";

    return MOCK_SERVICE_DATES.flatMap((date, index): IAttendanceRecord[] => {
      const status = STATUS_BY_CHAR[pattern.charAt(index)];
      if (!status) return [];

      return [
        {
          id: `${date}_${student.id}`,
          date,
          studentId: student.id,
          classId: student.classId,
          status,
          recordedBy: "servant-1",
          recordedAt: `${date}T18:00:00.000Z`,
        },
      ];
    });
  });

export const MOCK_NOTES: INote[] = [
  {
    id: "1",
    studentId: "1",
    kind: "general",
    contactMethod: null,
    body: "الطالب يحتاج للاهتمام بدرس المحفوظات القادم. تم التواصل مع ولي الأمر بخصوص نشاط الجمعة.",
    authorId: "servant-1",
    authorName: "ا. عماد فوزي",
    createdAt: daysAgoISODateTime(2),
    updatedAt: daysAgoISODateTime(2),
  },
  {
    id: "2",
    studentId: "1",
    kind: "follow-up",
    contactMethod: "call",
    body: "تم الاتصال بولي الأمر، وأكد إن المخدوم كان مريضاً وسيحضر الجمعة القادمة بإذن الله.",
    authorId: "servant-1",
    authorName: "ا. عماد فوزي",
    createdAt: daysAgoISODateTime(1),
    updatedAt: daysAgoISODateTime(1),
  },
  {
    id: "3",
    studentId: "6",
    kind: "follow-up",
    contactMethod: "visit",
    body: "تمت زيارة الأسرة بالمنزل واتفقنا على المتابعة الأسبوعية مع ولي الأمر.",
    authorId: "servant-2",
    authorName: "ا. مريم نبيل",
    createdAt: daysAgoISODateTime(3),
    updatedAt: daysAgoISODateTime(3),
  },
  {
    id: "4",
    studentId: "8",
    kind: "general",
    contactMethod: null,
    body: "متميز في الأنشطة الرياضية ويحتاج لتشجيع مستمر على الحضور.",
    authorId: "servant-2",
    authorName: "ا. مريم نبيل",
    createdAt: daysAgoISODateTime(5),
    updatedAt: daysAgoISODateTime(5),
  },
];
