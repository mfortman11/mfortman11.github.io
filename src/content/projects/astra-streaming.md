---
title: Astra Streaming
summary: Lead frontend engineer taking DataStax's managed Apache Pulsar service from private alpha to general availability, including a configuration framework powering the UI for 50+ connectors.
role: Software Engineer
year: 2022
tags:
  - React
  - GraphQL
  - Apache Pulsar
links:
  - label: Live
    url: https://www.datastax.com/products/astra-streaming
featured: false
order: 3
---

## What it is

Astra Streaming is DataStax's managed Apache Pulsar service — a cloud-native event streaming platform. I joined when the product was in private alpha and owned the frontend end-to-end through GA launch.

## What I built

- **Alpha to GA** — Sole lead frontend engineer across the full launch arc: scoping, building, and shipping the core console UI from scratch through general availability.
- **Connector configuration framework** — Designed and built a dynamic configuration framework that drove the UI for 50+ Pulsar source and sink connectors. Rather than hand-coding a form per connector, the framework consumed a connector schema and generated the correct input types, validation, and layout automatically.
- **On-call rotation** — Supported production on-call for both Astra Streaming and Astra DB, giving me a ground-level view of the operational reality of the platform I was building for.
- **GraphQL API integration** — Worked directly against the GraphQL layer to surface tenant management, namespace config, topic stats, and connector status in the UI.

## What I'd do next

The connector framework was the right call but the schema format was a one-off. I'd replace it with a JSON Schema–backed approach so any team adding a connector gets validation, docs generation, and the UI form for free with no custom work on the frontend side.
