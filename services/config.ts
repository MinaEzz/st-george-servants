/**
 * true  = كل الـ Services بتقرأ وتكتب في الـ Mock Data (في الذاكرة).
 * false = كل الـ Services بتكلم Google Apps Script Web App عن طريق fetch.
 */
export const USE_MOCK_DATA = true;

/** رابط الـ Web App بعد ما تعمل Deploy للـ Apps Script (بينتهي بـ /exec) */
export const SHEETS_API_URL = "";

export const REQUEST_TIMEOUT_MS = 15000;

/** تأخير بسيط في الـ Mock عشان نشوف حالات الـ loading */
export const MOCK_LATENCY_MS = 250;
