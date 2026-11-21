export interface ISaveAttendanceButtonProps {
  onSave: () => void;
  isSaving: boolean;
  /** عدد التغييرات اللي لسه ما اتحفظتش */
  changesCount: number;
  /** هل اليوم ده ليه حضور محفوظ قبل كده */
  hasSavedRecords: boolean;
}
