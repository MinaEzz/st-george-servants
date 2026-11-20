import type { UserRole } from "@/constants/user-roles";

export interface ISessionUser {
  id: string;
  name: string;
  role: UserRole;
  stageId: string | null;
  classIds: string[];
}

/** المرحلة والفصل اللي الخادم اختارهم بعد تسجيل الدخول */
export interface ISessionScope {
  stageId: string | null;
  stageName: string | null;
  classId: string | null;
  className: string | null;
}

export interface IPersistedSession {
  user: ISessionUser | null;
  scope: ISessionScope;
}

export interface ISessionAuthor {
  id: string;
  name: string;
}
