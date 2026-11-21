export default interface IScreenHeaderProps {
  stats: {
    present: number;
    absent: number;
    excused: number;
    percentage: number;
    /** عدد المخدومين اللي لسه ما اتسجلش لهم حضور */
    unrecorded?: number;
  };
  stageName?: string;
  className?: string;
  /** تاريخ الخدمة المعروض (الافتراضي تاريخ النهارده) */
  dateLabel?: string;
}
