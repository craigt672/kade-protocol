# KADE Protocol

One structured JSON event format for IoT devices, perception models, and agentic systems.

## Envelope

```json
{
  "source": "yolo.cam01",
  "type": "detection",
  "label": "person",
  "confidence": 0.92,
  "zone": "entryway",
  "timestamp": "2026-04-20T14:23:05.231Z",
  "meta": {
    "bbox": [421, 188, 612, 742],
    "frame_id": 18452
  }
}
```

## Fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `source` | string | yes | Emitter id. Convention: `<model>.<instance>` or `<sensor>.<id>`. |
| `type` | string | yes | Category. `detection`, `sensor_read`, `command`, `fault`, `heartbeat`. |
| `label` | string | yes | Specific event within the type. |
| `confidence` | number | no | 0 to 1. Omit for deterministic sources. |
| `zone` | string | no | Logical location. Decouples events from device identity. |
| `timestamp` | string | yes | ISO 8601 UTC. |
| `meta` | object | no | Source-specific data. Unknown fields ignored. |

## Principles

Thin envelope, fat meta. Core stays stable, source-specific data lives in `meta`.

Zones over device ids. Rules target locations, not hardware. Swap devices without rewriting rules.

Confidence as first-class. Probabilistic events are common. Surface it at the envelope.

Transport-agnostic. MQTT, Pub/Sub, Kafka, HTTP, UART. The protocol is payload-only.

## Examples

- [`examples/detection.json`](examples/detection.json)
- [`examples/sensor_read.json`](examples/sensor_read.json)
- [`examples/command.json`](examples/command.json)
- [`examples/fault.json`](examples/fault.json)

## Schema

[`schema/kade-protocol.schema.json`](schema/kade-protocol.schema.json). Validates with any JSON Schema 2020-12 validator.

## TypeScript

```ts
import type { KadeEvent } from "@kade/protocol";

function handle(event: KadeEvent) {
  if (event.type === "detection" && event.label === "person") {
    // ...
  }
}
```

Types: [`types/index.ts`](types/index.ts).

## Status

Draft 0.1. Stable envelope, new event types added without breaking existing consumers.

## License

MIT.
