export const CLASSES = [
  // --- ملايكة (stageId: "1") ---
  { id: "101", stageId: "1", name: "حضانة صغرى", studentsCount: 15 },
  { id: "102", stageId: "1", name: "حضانة كبرى", studentsCount: 12 },

  // --- ابتدائي (stageId: "2") ---
  { id: "201", stageId: "2", name: "الصف الأول", studentsCount: 10 },
  { id: "202", stageId: "2", name: "الصف الثاني", studentsCount: 10 },
  { id: "203", stageId: "2", name: "الصف الثالث", studentsCount: 12 },
  { id: "204", stageId: "2", name: "الصف الرابع", studentsCount: 12 },
  { id: "205", stageId: "2", name: "الصف الخامس", studentsCount: 40 },
  { id: "206", stageId: "2", name: "الصف السادس", studentsCount: 40 },

  // --- إعدادي (stageId: "3") ---
  { id: "301", stageId: "3", name: "الصف الأول الإعدادي", studentsCount: 22 },
  { id: "302", stageId: "3", name: "الصف الثاني الإعدادي", studentsCount: 25 },
  { id: "303", stageId: "3", name: "الصف الثالث الإعدادي", studentsCount: 12 },

  // --- ثانوي (stageId: "4") ---
  { id: "401", stageId: "4", name: "الصف الأول الثانوي", studentsCount: 12 },
  { id: "402", stageId: "4", name: "الصف الثاني الثانوي", studentsCount: 55 },
  { id: "403", stageId: "4", name: "الصف الثالث الثانوي", studentsCount: 20 },

  // --- خريجين (stageId: "5") ---
  { id: "501", stageId: "5", name: "دفعة 2025", studentsCount: 23 },
  { id: "502", stageId: "5", name: "دفعة 2024 وما قبلها", studentsCount: 85 },
];

export interface IClass {
  id: string;
  stageId: string;
  name: string;
  studentsCount: number;
}
