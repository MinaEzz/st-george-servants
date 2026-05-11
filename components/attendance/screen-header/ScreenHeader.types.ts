export default interface IScreenHeaderProps {
  stats: {
    present: number;
    absent: number;
    excused: number;
    percentage: number;
  };
  stageName?: string;
  className?: string;
}
