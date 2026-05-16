# Software Development Agent Matrix Rules

This folder is the durable operating memory for the software-development agent only.

## Scope

- These matrices, prompts, checklists, schemas, subagent instructions, and reports apply to generated software projects.
- Do not treat this folder as the operating system for unrelated advanced tools such as GIS, image operations, memory, local runner, or generic swarm utilities.
- Do not create parallel repo-level `.giga-agent`, top-level `docs/agent-refactor`, or advanced-package-wide matrix folders for this agent.

## Generation Contract

- The software-development agent must produce matrix evidence before generated app files.
- Required evidence includes requirements, user stories, feature patterns, route/RBAC, CRUD, backend contracts, screen states, tests, value score, and definition of done.
- Web and Electron generated apps must use the sanctioned UI-kit cache before app-specific UI is invented.
- CRUD features must include API contracts, validation, handlers, loading/empty/error/success states, RBAC where required, and tests.
- Protected routes must include frontend guards, backend guard contracts, unauthorized states, and tests.
- Dashboard and report routes must include chart/report patterns when analytics are implied.

## Quality Gates

- Generated software must be routed, iframe/hash safe, backend-connected or explicitly matrix-marked as demo-only, RBAC-aware, tested, buildable, and scored.
- Value-score caps apply when backend wiring, RBAC, tests, final checklist, or real UI-kit usage is missing.
- User-facing generated project files must not include Giga branding.

## Maintenance

- Update `matrix-update-log.md` whenever a matrix changes.
- Keep this folder focused on the software-development agent; cross-agent contracts belong in their own scoped folders.

## Non-Negotiable Coding Standards

- Never ever write supabase.from we have entities always load data through it
- Do not use `supabase.from` or `input.from` directly. Load data through entities and the ORM.
- Do not add autofills
- Do not add placeholder, do not add normalisation.
- Find and fix the root cause instead of adding the fallback.
- Do not add fallbacks. Fix the logic.
- Everything should be typed dont use unknown, never, any
- Do not use JS-style safe/coercion helper functions.
- Do not use `to*` functions like `toPayload`.
- Do not create map functions.
- Do not check types like `type === Array` or `type === string`.
- Use the `||` operator for comparison.
- Do not write a code file bigger than 70-100 lines.
- Try to generalise multiple lines of code into fewer lines.
- After writing code, recheck patterns across the workspace to remove duplications.
- Do not invent functionality. Ask the user if it already exists somewhere.
- Prefer the smallest correct change over broad refactors.
- Preserve the repo's existing style, structure, and package manager.
- Avoid destructive git commands unless explicitly requested.
- Keep memory entries concise, factual, and tied to the files or behavior that changed.
- Entity table name should come from the Entity and not direct usage.
- Function naming should be .create, .delete .find .update .find .findBy .deleteBy
- Disallowed naming conventions are createRows, listRows and any programatic name for the entity.
- Importing supabase in the entities is disallowed. Upgrade the ORM file is something is not supported by entity. Orm is present at @gigav2/orm
- If Create, Update, Delete, Find is unable to do any thing stop the coding and inform the user of your updates first.
- Do not create proxy or additional functions for create, update, delete
- Keep ORM generic do not add Entity functions in the ORM
- MCP.ts will execute inner graphql for the operations they will not implement any
- JSON is disallowed in the Graphql Schema use proper types only
- Dont use zod for typing
