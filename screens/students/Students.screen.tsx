import Searchbar from "@/components/shared/searchbar/Searchbar.component";
import AddStudentButton from "@/components/students/add-student-button/AddStudentButton.component";
import FiltersList from "@/components/students/filters-list/FiltersList.component";
import ScreenHeader from "@/components/students/screen-header/ScreenHeader.component";
import StatsSection from "@/components/students/stats-section/StatsSection.component";
import StudentsList from "@/components/students/students-list/StudentsList.component";
import { STUDENTS } from "@/constants/students";
import { globalStyles } from "@/styles/globals";
import { useMemo, useState } from "react";
import { View } from "react-native";

export default function Students() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredStudents = useMemo(() => {
    const query = searchQuery.trim();
    if (!query) return STUDENTS;
    return STUDENTS.filter(
      (s) => s.name.includes(query) || s.code.includes(query),
    );
  }, [searchQuery]);

  // const stats = useMemo(() => {
  //   const total = STUDENTS.length;
  //   // حساب المخدومين الحاضرين اليوم ديناميكياً
  //   const presentToday = STUDENTS.filter((s) => s.attendanceStatus === "present").length;
  //   // حساب النسبة المئوية للحضور
  //   const attendancePercentage = total > 0 ? Math.round((presentToday / total) * 100) : 0;

  //   return {
  //     total,
  //     attendancePercentage,
  //   };
  // }, []);

  return (
    <View style={[globalStyles.container, { position: "relative" }]}>
      <ScreenHeader className="الفصل الثاني" stageName="ابتدائي" />
      <StatsSection total={STUDENTS.length} attendancePercentage={10} />
      <Searchbar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="ابحث عن مخدوم بالاسم أو الكود..."
      />
      <FiltersList
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />
      <StudentsList students={filteredStudents} />
      <AddStudentButton />
    </View>
  );
}
