import type { IFollowUpStatus } from "@/types/followup.types";

export interface IFollowUpSectionProps {
  status: IFollowUpStatus | null;
  /** true أثناء حفظ تغيير المتابعة اليدوية */
  isUpdating: boolean;
  onToggleManual: (value: boolean) => void;
  onLogFollowUp: () => void;
}
