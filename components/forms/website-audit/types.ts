export type PhaseId =
  | "fetch"
  | "parse"
  | "security"
  | "fingerprint"
  | "analytics"
  | "index"
  | "pagespeed"
  | "adlibrary"
  | "discover"
  | "screenshots"
  | "synthesise";

export interface PhaseState {
  id: PhaseId;
  state: "idle" | "running" | "complete" | "error";
  note?: string;
}

export interface LiveSignal {
  label: string;
  value: string;
  receivedAt: number;
}

export interface ScreenshotEntry {
  category: string;
  status: "queued" | "captured" | "failed";
  note?: string;
}
