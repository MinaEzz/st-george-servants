export interface IBulkActionsProps {
  onMarkRemainingPresent: () => void;
  onClearAll: () => void;
  canMarkRemaining: boolean;
  canClear: boolean;
}
