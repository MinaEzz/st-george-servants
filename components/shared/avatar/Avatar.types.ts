import type { Gender } from "@/types/common.types";

export interface IAvatarProps {
  name: string;
  gender?: Gender | "";
  /** رابط صورة (لسه مفيش رفع صور، فالقيمة الافتراضية null) */
  image?: string | null;
  size?: number;
}
