import type { ReactNode } from "react";

export interface IBottomSheetProps {
  visible: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  /** لو false المحتوى مش بيتحط جوه ScrollView (مناسب لو المحتوى نفسه فيه scroll) */
  scrollable?: boolean;
  footer?: ReactNode;
}
