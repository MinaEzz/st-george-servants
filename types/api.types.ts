/** أسماء العمليات اللي هيفهمها Google Apps Script Web App */
export type SheetsAction =
  | "classes.list"
  | "classes.add"
  | "students.list"
  | "students.add"
  | "students.update"
  | "attendance.list"
  | "attendance.save"
  | "notes.list"
  | "notes.add"
  | "notes.update"
  | "notes.delete";

export interface ISheetsRequest<TPayload> {
  action: SheetsAction;
  payload: TPayload;
}

export interface ISheetsSuccess<TData> {
  ok: true;
  data: TData;
}

export interface ISheetsFailure {
  ok: false;
  error: string;
  code?: ServiceErrorCode;
}

export type SheetsResponse<TData> = ISheetsSuccess<TData> | ISheetsFailure;

export type ServiceErrorCode =
  | "CONFIG"
  | "NETWORK"
  | "TIMEOUT"
  | "SERVER"
  | "NOT_FOUND"
  | "VALIDATION";
