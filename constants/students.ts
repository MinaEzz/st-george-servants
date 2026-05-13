export const STUDENTS: IStudent[] = [
  {
    id: "1",
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
    notes: [],
    code: "1234",
  },
  {
    id: "2",
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
    notes: [],
    code: "5678",
  },
  {
    id: "3",
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
    notes: [],
    code: "9101112",
  },
];

export interface IStudent {
  id: string;
  name: string;
  gender: "male" | "female";
  birthDate: string;
  stageId: string;
  classId: string;
  image: string | null;
  phoneNumber: string;
  parentPhoneNumber: string;
  address: string;
  school: string;
  notes: string[];
  code: string;
}
