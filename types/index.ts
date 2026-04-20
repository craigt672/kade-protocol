/**
 * KADE Protocol — structured event envelope for IoT and agentic systems.
 * Spec: https://github.com/craigt672/kade-protocol
 */

export interface KadeEvent<M = Record<string, unknown>> {
  /** Identifier for the emitter. Convention: "<model>.<instance>" or "<sensor>.<id>". */
  source: string;

  /** High-level event category. */
  type: string;

  /** Specific event name within the type. */
  label: string;

  /** Probability in [0, 1] for stochastic sources. Omit for deterministic sensors. */
  confidence?: number;

  /** Logical location. Decouples events from physical device identity. */
  zone?: string;

  /** ISO 8601 UTC timestamp. */
  timestamp: string;

  /** Free-form source-specific data. */
  meta?: M;
}

/** Common event types. Extend freely; the protocol is open. */
export type KadeEventType =
  | "detection"
  | "sensor_read"
  | "command"
  | "fault"
  | "heartbeat"
  | (string & {});

/** Type guard. */
export function isKadeEvent(value: unknown): value is KadeEvent {
  if (!value || typeof value !== "object") return false;
  const e = value as Record<string, unknown>;
  return (
    typeof e.source === "string" &&
    typeof e.type === "string" &&
    typeof e.label === "string" &&
    typeof e.timestamp === "string" &&
    (e.confidence === undefined ||
      (typeof e.confidence === "number" &&
        e.confidence >= 0 &&
        e.confidence <= 1)) &&
    (e.zone === undefined || typeof e.zone === "string") &&
    (e.meta === undefined || typeof e.meta === "object")
  );
}
