export type MapFilter = "all" | "normal" | "warning" | "alert" | "anomaly";

export type Severity = "normal" | "warning" | "high" | "critical";

export type StationInsight = {
  severity: Severity;
  label: string;
  color: string;
  deviation: number;
  anomaly: string | null;
  alertState: "active" | "resolved" | "none";
};

export type AlertState = "active" | "resolved" | "none";

export type History = {
  id: string;
  stationId: string;
  ntu: number;
  timestamp: number;
  source: string;
};
