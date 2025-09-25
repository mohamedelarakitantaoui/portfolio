# 🛡️ Secure Government RAG Application

**Government-grade RAG (Retrieval Augmented Generation) application with complete data sovereignty and military-grade security**

Includes an enterprise chatbot that provides citation-based answers grounded in uploaded documents and a PDF→Excel conversion workflow for tabular extraction.

## Key Highlights
- 100% On-premises: Zero external API calls or data leakage
- Military-grade security: Guardrails and audit logging
- Multilingual support: Arabic, French, English with RTL
- Government compliance: Full audit trails and access controls

## Technical Stack
- Frontend: React, TypeScript, Tailwind CSS
- Backend: FastAPI, Python
- AI/ML: Ollama (Local LLM), Llama 3.2, Aya 8B, E5-Base embeddings
- Database: PostgreSQL with pgvector
- Storage: MinIO for documents
- Auth: Keycloak
- Infra: Docker Compose, NGINX reverse proxy

## Architecture
Frontend (React) → Chat Service (FastAPI) → Ollama LLM (Local)
                        ↓
               PostgreSQL (Vectors) + MinIO (Files)

## Security Features
- Data sovereignty (all on-prem)
- Prompt injection protection, hallucination prevention
- Role-based document access
- Complete audit logging
- Compliance-ready security

## Core Features
- Secure Document Q&A with context restriction
- Citation-based chatbot answers with source links
- PDF→Excel document conversion for tables and structured data
- Multi-language processing (Arabic RTL support)
- Enterprise authentication with Keycloak
- Modern SaaS UI with audit trail

## AI/ML Capabilities
- Local LLM inference
- Vector search (semantic similarity)
- Multi-model support
- Context-aware responses limited to uploaded docs

## Skills Demonstrated
- AI/ML Engineering (RAG, local LLM deployment)
- Security Architecture (zero-trust, data sovereignty)
- Full-stack Dev (React, FastAPI, PostgreSQL)
- DevOps (Docker, orchestration)
- Enterprise Standards (compliance, audit logging)
