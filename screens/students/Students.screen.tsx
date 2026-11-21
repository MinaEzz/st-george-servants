import Searchbar from "@/components/shared/searchbar/Searchbar.component";
import AddStudentButton from "@/components/students/add-student-button/AddStudentButton.component";
import FiltersList from "@/components/students/filters-list/FiltersList.component";
import ScreenHeader from "@/components/students/screen-header/ScreenHeader.component";
import StatsSection from "@/components/students/stats-section/StatsSection.component";
import StudentsList from "@/components/students/students-list/StudentsList.component";
import { useAttendance } from "@/hooks/useAttendance";
import { useFollowUp } from "@/hooks/useFollowUp";
import { useStudents } from "@/hooks/useStudents";
import { globalStyles } from "@/styles/globals";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { View } from "react-native";

export default function Students() {
  const [searchQuery, setSearchQuery] = useState("");
  const { filter } = useLocalSearchParams<{ filter?: string }>();
  const [activeFilter, setActiveFilter] = useState(filter || "all");

  const { students } = useStudents();
  const { statuses } = useFollowUp();
  const { latestServiceDate, getStatusMap } = useAttendance();

  useEffect(() => {
    if (filter) {
      setActiveFilter(filter);
    } else {
      setActiveFilter("all");
    }
  }, [filter]);

  // حالة كل مخدوم في آخر يوم خدمة مسجل
  const latestStatusMap = useMemo(
    () => getStatusMap(latestServiceDate),
    [getStatusMap, latestServiceDate],
  );

  const filteredStudents = useMemo(() => {
    const query = searchQuery.trim();
    return students.filter((student) => {
      const matchesSearch = query
        ? student.name.includes(query) || student.code.includes(query)
        : true;
      if (!matchesSearch) return false;

      if (activeFilter === "all") return true;

      const todayStatus = latestStatusMap[student.id];
      if (activeFilter === "present") return todayStatus === "present";
      if (activeFilter === "absent") return todayStatus === "absent";

      if (activeFilter === "follow-up") {
        // تلقائي (غياب 4 أسابيع متتالية) + المتابعة اليدوية
        return statuses[student.id]?.needsFollowUp ?? false;
      }

      return true;
    });
  }, [students, searchQuery, activeFilter, latestStatusMap, statuses]);

  const stats = useMemo(() => {
    const total = students.length;

    if (total === 0) {
      return { total: 0, attendancePercentage: 0 };
    }

    const presentCount = students.filter(
      (student) => latestStatusMap[student.id] === "present",
    ).length;

    const attendancePercentage = Math.round((presentCount / total) * 100);

    return {
      total,
      attendancePercentage,
    };
  }, [students, latestStatusMap]);

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
