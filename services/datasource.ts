import type { SheetsAction } from "@/types/api.types";
import { MOCK_LATENCY_MS, USE_MOCK_DATA } from "./config";
import { sheetsRequest } from "./sheets/sheetsClient";

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

/**
 * نقطة التبديل الوحيدة بين الـ Mock و Google Sheets.
 * كل Service بتمرر الـ action والـ payload ودالة الـ Mock، والباقي بيتحدد من USE_MOCK_DATA.
 */
export async function execute<TPayload, TResult>(
  action: SheetsAction,
  payload: TPayload,
  mockHandler: (payload: TPayload) => TResult,
): Promise<TResult> {
  if (USE_MOCK_DATA) {
    await delay(MOCK_LATENCY_MS);
    return mockHandler(payload);
  }

  return sheetsRequest<TPayload, TResult>(action, payload);
}
