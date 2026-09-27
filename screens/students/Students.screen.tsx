import Searchbar from "@/components/shared/searchbar/Searchbar.component";
import AddStudentButton from "@/components/students/add-student-button/AddStudentButton.component";
import FiltersList from "@/components/students/filters-list/FiltersList.component";
import ScreenHeader from "@/components/students/screen-header/ScreenHeader.component";
import StatsSection from "@/components/students/stats-section/StatsSection.component";
import StudentsList from "@/components/students/students-list/StudentsList.component";
import { ATTENDANCE_HISTORY, STUDENTS } from "@/constants/students";
import { globalStyles } from "@/styles/globals";
import { checkNeedsFollowUp } from "@/utils/checkNeedsFollowUp";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";

export default function Students() {
  const [searchQuery, setSearchQuery] = useState("");
  const { filter } = useLocalSearchParams<{ filter?: string }>();
  const [activeFilter, setActiveFilter] = useState(filter || "all");

  useEffect(() => {
    if (filter) {
      setActiveFilter(filter);
    } else {
      setActiveFilter("all");
    }
  }, [filter]);

  const filteredStudents = useMemo(() => {
    const query = searchQuery.trim();
    return STUDENTS.filter((student) => {
      const matchesSearch = query
        ? student.name.includes(query) || student.code.includes(query)
        : true;
      if (!matchesSearch) return false;

      if (activeFilter === "all") return true;

      const todayStatus = ATTENDANCE_HISTORY[student.id]?.[0];
      if (activeFilter === "present") return todayStatus === "present";
      if (activeFilter === "absent") return todayStatus === "absent";

      if (activeFilter === "follow-up") {
        const isAutoFollowUp = checkNeedsFollowUp(
          student.id,
          ATTENDANCE_HISTORY,
          4,
        );

        return isAutoFollowUp;
      }

      return true;
    });
  }, [searchQuery, activeFilter]);

  const stats = useMemo(() => {
    const total = STUDENTS.length;

    if (total === 0) {
      return { total: 0, attendancePercentage: 0 };
    }

    const presentCount = STUDENTS.filter((student) => {
      const todayStatus = ATTENDANCE_HISTORY[student.id]?.[0];
      return todayStatus === "present";
    }).length;

    const attendancePercentage = Math.round((presentCount / total) * 100);

    return {
      total,
      attendancePercentage,
    };
  }, []);

  return (
    <View style={[globalStyles.container, { position: "relative" }]}>
      <ScreenHeader className="الفصل الثاني" stageName="ابتدائي" />
      <StatsSection
        total={stats.total}
        attendancePercentage={stats.attendancePercentage}
      />
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
