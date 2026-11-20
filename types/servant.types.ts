import type { UserRole } from "@/constants/user-roles";

export interface IServant {
  id: string;
  name: string;
  phoneNumber: string;
  role: UserRole;
  /** المرحلة المسؤول عنها (لمسؤول المرحلة) */
  stageId: string | null;
  /** الفصول المسؤول عنها (للخادم) */
  classIds: string[];
}
