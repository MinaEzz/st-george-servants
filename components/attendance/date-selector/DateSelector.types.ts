export interface IDateSelectorProps {
  dateLabel: string;
  isLatest: boolean;
  hasRecords: boolean;
  canGoOlder: boolean;
  canGoNewer: boolean;
  onOlder: () => void;
  onNewer: () => void;
}
