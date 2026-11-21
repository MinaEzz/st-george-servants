import AttendanceList from "@/components/attendance/attendance-list/AttendanceList.component";
import BulkActions from "@/components/attendance/bulk-actions/BulkActions.component";
import DateSelector from "@/components/attendance/date-selector/DateSelector.component";
import NoClassState from "@/components/attendance/no-class-state/NoClassState.component";
import SaveAttendanceButton from "@/components/attendance/save-attendance-button/SaveAttendanceButton.component";
import ScreenHeader from "@/components/attendance/screen-header/ScreenHeader.component";
import ErrorState from "@/components/shared/error-state/ErrorState.component";
import Searchbar from "@/components/shared/searchbar/Searchbar.component";
import { useAttendanceSheet } from "@/hooks/useAttendanceSheet";
import { useSession } from "@/store/session.store";
import { colors, globalStyles } from "@/styles/globals";
import { toArabicDigits } from "@/utils/arabic";
import { useMemo, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Attendance() {
  const { scope } = useSession();
  const sheet = useAttendanceSheet(scope.classId);
  const [searchQuery, setSearchQuery] = useState("");

  console.log("Attendance For: ", scope, sheet);

  const filteredStudents = useMemo(() => {
    const query = searchQuery.trim();
    if (!query) return sheet.students;
    return sheet.students.filter(
      (student) => student.name.includes(query) || student.code.includes(query),
    );
  }, [sheet.students, searchQuery]);

  if (!scope.classId) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <NoClassState />
      </SafeAreaView>
    );
  }

  if (sheet.loadError) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <ErrorState message={sheet.loadError} onRetry={sheet.reload} />
      </SafeAreaView>
    );
  }

  if (sheet.isLoading && sheet.students.length === 0) {
    return (
      <SafeAreaView style={[globalStyles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary[900]} />
      </SafeAreaView>
    );
  }

  const handleShiftDate = (direction: 1 | -1) => {
    if (!sheet.hasChanges) {
      sheet.shiftDate(direction);
      return;
    }

    Alert.alert(
      "تغييرات غير محفوظة",
      "لو غيّرت التاريخ هتضيع التغييرات اللي لسه ما اتحفظتش. تكمل؟",
      [
        { text: "رجوع", style: "cancel" },
        {
          text: "تجاهل التغييرات",
          style: "destructive",
          onPress: () => sheet.shiftDate(direction),
        },
      ],
    );
  };

  const saveNow = async () => {
    const result = await sheet.save();

    if (!result.ok && result.error) {
      Alert.alert("تعذر حفظ الحضور", result.error);
    }
  };

  const handleSave = () => {
    const { unrecorded } = sheet.summary;

    if (unrecorded === 0) {
      void saveNow();
      return;
    }

    Alert.alert(
      "مخدومين لم يُسجّل لهم حضور",
      `لسه ${toArabicDigits(unrecorded)} مخدوم من غير تسجيل، وهيفضلوا "لم يُسجّل" ومش هيتحسبوا غياب. تحفظ كده؟`,
      [
        { text: "رجوع", style: "cancel" },
        { text: "احفظ", onPress: () => void saveNow() },
      ],
    );
  };

  const recordedCount =
    sheet.summary.present + sheet.summary.absent + sheet.summary.excused;

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScreenHeader
        stats={sheet.summary}
        className={scope.className ?? ""}
        stageName={scope.stageName ?? ""}
        dateLabel={sheet.dateLabel}
      />

      <DateSelector
        dateLabel={sheet.dateLabel}
        isLatest={sheet.isLatestDate}
        hasRecords={sheet.hasSavedRecords}
        canGoOlder={sheet.canGoOlder}
        canGoNewer={sheet.canGoNewer}
        onOlder={() => handleShiftDate(-1)}
        onNewer={() => handleShiftDate(1)}
      />

      <BulkActions
        onMarkRemainingPresent={sheet.markRemainingPresent}
        onClearAll={sheet.clearAll}
        canMarkRemaining={sheet.summary.unrecorded > 0}
        canClear={recordedCount > 0}
      />

      <Searchbar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="ابحث عن مخدوم بالاسم أو الكود..."
      />

      <AttendanceList
        students={filteredStudents}
        attendanceData={sheet.statusMap}
        onStatusChange={sheet.setStatus}
        emptyText={
          sheet.students.length === 0
            ? "لا يوجد مخدومين في هذا الفصل بعد"
            : "لا يوجد مخدوم بهذا الإسم..."
        }
      />

      <SaveAttendanceButton
        onSave={handleSave}
        isSaving={sheet.isSaving}
        changesCount={sheet.changesCount}
        hasSavedRecords={sheet.hasSavedRecords}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
});
