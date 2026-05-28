---
title: Langflow
summary: Led a 5-person frontend team to redesign and scale an open-source visual AI builder from 20k to 140k GitHub stars — one of the most widely adopted AI projects on GitHub.
role: Lead Frontend Engineer
year: 2024
tags:
  - React
  - Next.js
  - Python
  - Open Source
  - AI
links:
  - label: GitHub
    url: https://github.com/langflow-ai/langflow
  - label: Live
    url: https://langflow.org
featured: true
order: 1
---

## What it is

Langflow is a visual builder for agentic AI applications — a low-code canvas where developers drag, drop, and wire together LLMs, tools, memory, and data sources. It's used by thousands of developers and enterprise teams to prototype and ship AI workflows.

## What I built

- **Full platform redesign** — Rebuilt Langflow's information architecture, interaction patterns, and visual language from the ground up, transforming a fragmented tool into a cohesive developer experience. The redesigned product was featured on stage at NVIDIA GTC.
- **Canvas performance** — Revamped rendering on the React Flow canvas, eliminating cascading rerenders and achieving ~40% improvement in interaction latency. Key fix was isolating node state to prevent full-graph rerenders on every edit.
- **Team leadership** — Led a frontend team of 5 engineers across feature delivery, code quality, and design collaboration. Set craft standards and ran design-eng pairing sessions to tighten the feedback loop with our design team.
- **Growth** — Grew the repo from ~20k to over 140k GitHub stars, making Langflow one of the most widely used open-source AI projects on GitHub.

## What I'd do next

The canvas still has room for better multi-user collaboration (live cursors, conflict-free edits). I'd also explore a tighter feedback loop between the canvas and runtime — seeing live token streams inline on each node would make debugging AI flows dramatically faster.
