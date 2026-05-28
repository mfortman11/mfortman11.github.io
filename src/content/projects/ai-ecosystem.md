---
title: AI Ecosystem & Integrations
summary: Sole engineer owning Astra DB vector search integrations across LangChain, LlamaIndex, and Vercel — plus a GitHub Copilot extension that debuted at the Microsoft Build keynote.
role: Senior Software Engineer
year: 2023
tags:
  - TypeScript
  - Vector Search
  - LangChain
  - LlamaIndex
  - AI
links:
  - label: LangChain Integration
    url: https://python.langchain.com/docs/integrations/vectorstores/astradb
  - label: LlamaIndex Integration
    url: https://docs.llamaindex.ai/en/stable/examples/vector_stores/AstraDBIndexDemo
featured: true
order: 2
---

## What it is

As the sole engineer owning DataStax's open-source AI ecosystem presence, I built and maintained the vector store integrations that put Astra DB inside the tools developers were already using — LangChain, LlamaIndex, and Vercel's AI SDK. I also built a GitHub Copilot extension for Astra DB that launched at Microsoft Build as one of 12 keynote partners.

## What I built

- **LangChain vector store** — Authored and maintained the `AstraDBVectorStore` integration for LangChain, including similarity search, MMR retrieval, metadata filtering, and async support. Kept it current through multiple LangChain breaking-change releases.
- **LlamaIndex vector store** — Built the equivalent integration for LlamaIndex, covering index creation, document upsert, and hybrid retrieval modes against Astra DB's vector API.
- **Vercel AI SDK integration** — Built starter templates and an integration layer for Vercel's AI SDK, making Astra DB a first-class retrieval backend for Next.js AI apps.
- **GitHub Copilot extension** — Engineered a Copilot extension that lets developers query and manage Astra DB collections in natural language directly from their editor. Selected as one of 12 launch partners featured at the Microsoft Build keynote.
- **Starter templates** — Authored production-ready starter repos across the GenAI ecosystem so developers could go from zero to a working RAG app in minutes.

## What I'd do next

As the MCP protocol has matured, the Copilot extension pattern has a natural successor: a proper MCP server for Astra DB that any tool (Cursor, Claude, etc.) can plug into without a platform-specific integration. I'd rebuild it on that foundation and deprecate the Copilot-specific layer.
