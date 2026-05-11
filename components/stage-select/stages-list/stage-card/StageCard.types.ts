import { IStage } from "@/constants/stages";

export default interface IStageCardProps {
  item: IStage;
  onPress?: () => void;
}
