# Repository Audit

Date: 2026-05-11

## Structure
- Backend repo: `giga-ai-backend` on branch `dev`.
- Runtime: TypeScript, Node, webpack, routing-controllers, Apollo GraphQL, custom Giga ORM, workflow executor, MCP, socket services.
- Advanced agent implementation lives under `src/services/ai-agents/advanced`.
- Generated app hosting lives under `src/services/ai-agents/app-hosting`.
- UI-kit cache lives under `src/services/ai-agents/advanced/ui-kit`.

## Package Manager And Scripts
- Package manager: Yarn v1.
- Key scripts: `yarn build`, `yarn lint`, `yarn test`, `yarn test agent:live`, `yarn test agent-app:live-url`.
- Dev server script: `yarn dev` with `PORT=3001`.

## Existing Agent Code
- Tool routing exports `agent.software.development_process.v1`, `agent.software.create.v2`, `agent.software.run.v2`, and `agent.software.host.v2`.
- The software generator already has domain blueprints, software templates, renderers, process files, quality scoring, and swarm roles.
- Current gap: the process evidence is not yet durable as software-development-agent-scoped matrices and quality scoring is too shallow for full-stack readiness.

## UI Kit Source
- Source zip: `/Users/abeer/dev/abeer/ui - kits/GIGA AI - Final.zip`.
- Cache: `src/services/ai-agents/advanced/ui-kit`.
- Key components include Root, Sidebar, GlobalHeader, EnhancedDataTable, CreateModal, FormField, ConfirmDialog, Toast, EmptyState, LoadingState, ErrorState, PermissionsMatrix, MetricCard, SparklineChart, LogViewerTable, selectors, upload, and tree components.

## Existing Tests
- Focused tests already cover advanced software development process, generator quality, model profile, and swarm contracts.
- Live tests cover agent app live URLs, deep applications, swarms, chat/slash, files, image, and GIS.

## Missing Pieces
- No `src/services/ai-agents/advanced/software-development-process/matrix` durable matrix operating system existed before this refactor.
- No `src/services/ai-agents/advanced/software-development-process/matrix/reports` audit/report set existed before this refactor.
- Value scoring needed weighted categories and automatic caps.
- Generated process output needed CRUD/RBAC/backend/state/test matrices and definition-of-done evidence.

## Recommended Refactor Locations
- Durable instructions: root `AGENTS.md`, advanced `AGENTS.md`, UI-kit `AGENTS.md`.
- Runtime process: `src/services/ai-agents/advanced/software-development-process`.
- Quality gate: `src/services/ai-agents/advanced/software-quality.ts`.
- Generator metadata: `src/services/ai-agents/advanced/software-system-builder.ts` and process file renderer.
