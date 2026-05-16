# Software Builder UI Kit Markdown Context

This directory is the exported UI Kit context used by the Software Builder AI Agent. It replaces the earlier short catalog/stub with actual source snippets, explanations, and an inventory of the uploaded UI Kit.

## Source

- Uploaded archive: `UI Kit FInal.zip`
- Extracted root: `process-monitoring-final`
- Total files indexed: 305
- Text/code files exported into markdown: 241
- Binary assets cataloged: 64

## How the Software Builder uses this context

1. Read `inventory.json` to locate a reusable component, screen, process-monitoring pattern, selector, theme, or data contract.
2. Read the matching `components-*.md`, `screens-*.md`, `process-monitoring.md`, `styles.md`, `imports.md`, or `package-config.md` file.
3. Reuse the exact component structure when generating AI-Agent Projects. Bind live Giga data through GraphQL/dataloaders instead of copying mock data into runtime logic.
4. Preserve visual contracts such as `data-ui-kit-component`, empty/error/loading states, role/scope controls, and process-monitor status displays.
5. Do not expose private model chain-of-thought. Show auditable decision chains through Mermaid checkpoints and runtime events.

## Export files

- `components-01.md` ... component and primitive snippets.
- `screens-01.md` ... page/screen snippets.
- `process-monitoring.md` ... runtime monitor screens, hooks, and stores.
- `styles.md` ... theme/global styling snippets.
- `imports.md` ... imported schema/source snippets and binary asset references.
- `package-config.md` ... package and build config snippets.
- `app-shell-data.md` ... app shell, routes, contexts, and data files.
- `binary-assets.md` ... binary/image inventory for visual reuse.
