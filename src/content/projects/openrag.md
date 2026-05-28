---
title: OpenRAG
summary: An open-source platform for agentic RAG that orchestrates Langflow, OpenSearch, and Docling in a single containerized stack — launched on IBM's watsonx.data platform.
role: Lead Engineer
year: 2024
tags:
  - Python
  - Docker
  - RAG
  - AI
  - Open Source
links:
  - label: GitHub
    url: https://github.com/datastax/openrag
featured: true
order: 0
---

## What it is

OpenRAG is an open-source, self-hostable platform for building agentic RAG (Retrieval-Augmented Generation) pipelines. It wires together Langflow for orchestration, OpenSearch for vector storage and retrieval, and Docling for document ingestion into a single `docker compose up` experience. It shipped as the reference architecture on IBM's watsonx.data platform.

## What I built

- **Full-stack architecture** — Designed the service topology: Langflow as the orchestration layer, Docling for document parsing and chunking, OpenSearch for hybrid (dense + sparse) vector search. Each service is containerized and configured to talk to each other out of the box.
- **Developer experience** — The entire stack launches with a single command. Built opinionated default flows in Langflow so new users can query their documents immediately without building a pipeline from scratch.
- **IBM watsonx.data integration** — Worked with the watsonx team to package OpenRAG as a launch offering, including adapting the vector store config to support their managed infrastructure.
- **Open source release** — Authored the repo, documentation, and contribution guides. Drove the public launch and community onboarding.

## What I'd do next

Add a streaming evaluation harness so teams can benchmark retrieval quality (precision, recall, RAGAS scores) against their own document sets before going to production. Better observability into which chunks are being retrieved — and why — would also make tuning retrieval parameters far less trial-and-error.
