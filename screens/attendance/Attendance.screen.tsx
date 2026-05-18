import AttendanceList from "@/components/attendance/attendance-list/AttendanceList.component";
import SaveAttendanceButton from "@/components/attendance/save-attendance-button/SaveAttendanceButton.component";
import ScreenHeader from "@/components/attendance/screen-header/ScreenHeader.component";
import Searchbar from "@/components/shared/searchbar/Searchbar.component";
import { STUDENTS } from "@/constants/students";
import { globalStyles } from "@/styles/globals";
import { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Attendance() {
  const [searchQuery, setSearchQuery] = useState("");
  const [attendanceData, setAttendanceData] = useState<
    Record<string, string | null>
  >({});

  const filteredStudents = useMemo(() => {
    const query = searchQuery.trim();
    if (!query) return STUDENTS;
    return STUDENTS.filter(
      (s) => s.name.includes(query) || s.code.includes(query),
    );
  }, [searchQuery]);

  const handleStatusChange = (studentId: string, status: string) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === status ? null : status,
    }));
  };

  const stats = useMemo(() => {
    const values = Object.values(attendanceData);
    const present = values.filter((v) => v === "present").length;
    const absent = values.filter((v) => v === "absent").length;
    const excused = values.filter((v) => v === "excused").length;
    const total = STUDENTS.length;

    const percentage =
      total > 0 ? Math.round(((present + excused) / total) * 100) : 0;

    return {
      present,
      absent,
      excused,
      percentage,
    };
  }, [attendanceData]);

  return (
    <SafeAreaView style={[globalStyles.container]}>
      <ScreenHeader
        stats={stats}
        className="الفصل الثاني"
        stageName="ابتدائي"
      />
      <Searchbar value={searchQuery} onChange={setSearchQuery} />
      <AttendanceList
        students={filteredStudents}
        attendanceData={attendanceData}
        onStatusChange={handleStatusChange}
      />
      <SaveAttendanceButton
        onSave={() => console.log("Final Attendance:", attendanceData)}
      />
    </SafeAreaView>
  );
}
