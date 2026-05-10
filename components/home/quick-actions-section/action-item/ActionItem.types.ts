export default interface IActionItemProps {
  title: string;
  icon: string;
  color: string;
  onPress: () => void;
  isPrimary?: boolean;
}
