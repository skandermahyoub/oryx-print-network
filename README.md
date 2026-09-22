# ORYX Print Network

**نطبع أي شيء على أي شيء**

ORYX Print Network is a digital operating platform for design, printing, advertising, customized manufacturing, production-partner routing, and project-based creative commerce.

## Build standard

- Product: Next.js + TypeScript
- Source of truth: GitHub
- Data/backend: Neon PostgreSQL
- Deployment: Netlify
- Architecture: modular monolith
- Primary language: Arabic (RTL), with English-ready data structures

## Deployment discipline

Netlify is intentionally **not connected during active construction**. Development happens on `preview` and is validated by GitHub CI. Netlify deploys are reserved for approved milestones only, so routine commits do not consume Netlify build credits.

## Core product modules

Catalog, Pricing, Orders, Design Studio, Production, Partner Network, Procurement, Packages, Projects Lab, CRM, Finance, Logistics, CMS/SEO, AI Assistant, RBAC and Audit.

## Branches

- `main`: approved milestone snapshots
- `preview`: active construction

