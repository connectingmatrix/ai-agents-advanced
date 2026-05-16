# @connectingmatrix/ai-agents-advanced

Derived advanced agents grouped by agent name. Does not own workflow/tree/node designer agents.

## Ownership

This package owns its `src/ui`, `src/backend`, `src/entity`, GraphQL bundle, migrations, health/status, launcher, and package contracts. It can be included in backend or UI without assuming a monorepo.

## Public contracts

- `AdvancedAIAgents.agents()`
- `AdvancedAIAgents.plan/list/getObject/executePlan`
- `AdvancedAIAgents.runAgent(kind, input)`
- `AdvancedAIAgents.designOutput()`
- `agents/planner`
- `agents/researcher`
- `agents/output-designer`
- `agents/software-builder`
- `agents/deployment`
- `agents/memory-analyst`
- `agents/gis-image`


## Basic usage

```ts
import { AdvancedAIAgents } from '@connectingmatrix/ai-agents-advanced';
const plan = AdvancedAIAgents.plan({ kind: 'researcher', objective: 'audit deployment risk' });
await AdvancedAIAgents.executePlan(plan.id);
```

## Server usage

```ts
import { createPackage } from '@connectingmatrix/ai-agents-advanced';
const pkg = createPackage();
await pkg.health?.();
// register pkg.routes as middleware and merge pkg.graphql into /graphql
```

## UI usage

Package UI modules expose `bindWithServer('/graphql')` where applicable. Domain packages own their dataloaders; the thin UI only renders/binds.

## Observability and process monitor

All packages expose `PackageObservability`. The server wires logger and sockets into every package. Logger registers package health probes and exposes `/logger/process-monitor` plus `/server/process-monitor`.

## Launcher

Run locally:

```bash
npm run build
node playground.mjs
```

The launcher opens in stub mode so the package can be tested independently, similar to workflow designer stub mode.

## GraphQL and routes

GraphQL namespace and routes are returned by `createPackage()`. Routes include health and launcher endpoints when needed.

## Exports

- `.`
- `./backend`
- `./ui`
- `./entity`
- `./package.json`
- `./package-structure`
- `./launcher`
- `./observability`
- `./backend/agents`

## Folder counts

- `src/ui`: 5 files
- `src/backend`: 9 files
- `src/entity`: 4 files
- `migrations`: 7 files
- `tests`: 5 files



## Final gap closure

See `docs/FINAL_GAP_CLOSURE_CONTRACTS.md` for the final process-monitor, project, node, workflow, and package-owned contract audit.

## Final runtime contracts

See `docs/FINAL_RUNTIME_CONTRACTS.md` for the final package-owned API, routes, launcher, observability, and wiring contracts.


## Final package contracts

- `AdvancedAIAgents.runPlanner/runResearcher/runSoftwareBuilder/runDeployment`
- `AdvancedAIAgents.runOutputDesigner/runMemory/runDataAnalyst`
- `agent-name folders under src/backend/agents/<agent-name>`
- `uses @connectingmatrix/ai-agents contracts`

See `docs/AUTO_GENERATED_CONTRACTS.md` and `docs/OBSERVABILITY.md` for generated operational docs.
