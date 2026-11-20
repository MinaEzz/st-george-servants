import type {
  ISheetsRequest,
  SheetsAction,
  SheetsResponse,
} from "@/types/api.types";
import { REQUEST_TIMEOUT_MS, SHEETS_API_URL } from "../config";
import { ServiceError, toServiceError } from "../errors";

/**
 * بيبعت طلب لـ Google Apps Script Web App.
 *
 * ملاحظات مهمة للـ Apps Script:
 * - بنبعت POST بـ Content-Type: text/plain عشان نتجنب CORS preflight (Apps Script مش بيدعم OPTIONS).
 * - الـ Web App لازم يرجّع JSON بالشكل: { ok: true, data } أو { ok: false, error, code? }.
 */
export async function sheetsRequest<TPayload, TResult>(
  action: SheetsAction,
  payload: TPayload,
): Promise<TResult> {
  if (!SHEETS_API_URL) {
    throw new ServiceError(
      "CONFIG",
      "SHEETS_API_URL غير مضبوط في services/config.ts",
    );
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const body: ISheetsRequest<TPayload> = { action, payload };

  try {
    const response = await fetch(SHEETS_API_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new ServiceError("SERVER", `HTTP ${response.status}`);
    }

    const json = (await response.json()) as SheetsResponse<TResult>;

    if (!json.ok) {
      throw new ServiceError(json.code ?? "SERVER", json.error);
    }

    return json.data;
  } catch (error) {
    throw toServiceError(error);
  } finally {
    clearTimeout(timeoutId);
  }
}
