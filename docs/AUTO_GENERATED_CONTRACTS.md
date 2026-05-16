# @connectingmatrix/ai-agents-advanced — auto-generated contracts

    Generated from the package audit on 2026-05-15.

    ## Purpose

    Advanced agents derived from core AI Agent contracts, organized by agent-name folders. No workflow/tree/node designer ownership.

    ## Public contracts

    - `AdvancedAIAgents.agents()`
- `AdvancedAIAgents.plan/list/getObject/executePlan`
- `AdvancedAIAgents.runAgent(agentName,input)`
- `AdvancedAIAgents.designOutput`
- agent folders: planner-agent, researcher-agent, software-builder-agent, deployment-agent, data-analyst-agent, image-gis-agent, memory-agent, platform-fix-agent, process-monitor-control-agent, output-designer-agent, swarm-coordinator-agent

    ## Package-owned surfaces

    - `src/client` owns dataloaders, browser binding and UI-facing data contracts.
    - `src/backend` owns non-CRUD runtime processing, route handlers, health/status and launchers.
    - `src/entity` owns entity records, CRUD repositories and entity GraphQL.
    - `migrations` owns package database migrations.
    - `playground.mjs` launches the package in stub/playable mode.

    ## GraphQL/middleware binding

    This package exposes `createPackage()` so `@connectingmatrix/server` or `giga-ai-backend` can register package middleware, package GraphQL and package health/launcher routes.
