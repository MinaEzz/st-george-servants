import type { ServiceErrorCode } from "@/types/api.types";

export class ServiceError extends Error {
  readonly code: ServiceErrorCode;

  constructor(code: ServiceErrorCode, message: string) {
    super(message);
    this.name = "ServiceError";
    this.code = code;
    Object.setPrototypeOf(this, ServiceError.prototype);
  }
}

/** يحوّل أي خطأ (fetch / timeout / غير متوقع) إلى ServiceError */
export function toServiceError(error: unknown): ServiceError {
  if (error instanceof ServiceError) return error;

  if (error instanceof Error) {
    if (error.name === "AbortError") {
      return new ServiceError("TIMEOUT", error.message);
    }
    if (error instanceof TypeError) {
      return new ServiceError("NETWORK", error.message);
    }
    return new ServiceError("SERVER", error.message);
  }

  return new ServiceError("SERVER", "Unknown error");
}

/** رسالة عربية جاهزة تتعرض للمستخدم */
export function getErrorMessage(error: unknown): string {
  const serviceError = toServiceError(error);

  switch (serviceError.code) {
    case "CONFIG":
      return "لم يتم ضبط رابط الخدمة بعد";
    case "NETWORK":
      return "تعذر الاتصال بالإنترنت، تأكد من الشبكة وحاول مرة أخرى";
    case "TIMEOUT":
      return "استغرق الطلب وقتاً أطول من المتوقع، حاول مرة أخرى";
    case "NOT_FOUND":
    case "VALIDATION":
      return serviceError.message;
    case "SERVER":
    default:
      return "حدث خطأ في الخادم، حاول مرة أخرى لاحقاً";
  }
}
