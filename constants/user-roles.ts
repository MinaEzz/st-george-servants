export const USER_ROLES = {
  SUPER_ADMIN: "SUPER_ADMIN",
  STAGE_ADMIN: "STAGE_ADMIN",
  SERVANT: "SERVANT",
} as const;

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES];
