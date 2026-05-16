# UI Kit Process Monitoring Source Context

This file contains exact source snippets from the uploaded UI kit for the `process-monitoring` category.

## `process-monitoring-final/ATTRIBUTIONS.md`

- Category: `process-monitoring`
- Bytes: `290`
- SHA-256: `7eef0ed2b6fb8a4d85c6217fbcbebfdedc8e4ac286d55920ea8de35167baa89f`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `ATTRIBUTIONS.md`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```md
This Figma Make file includes components from [shadcn/ui](https://ui.shadcn.com/) used under [MIT license](https://github.com/shadcn-ui/ui/blob/main/LICENSE.md).

This Figma Make file includes photos from [Unsplash](https://unsplash.com) used under [license](https://unsplash.com/license).
```

## `process-monitoring-final/PROCESS_MONITORING_NOTES.md`

- Category: `process-monitoring`
- Bytes: `2077`
- SHA-256: `9f3f4bb6445823657d04aa01b9f7239b3e6a0c71ea1d03f98b28b05a605ad09c`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `PROCESS_MONITORING_NOTES.md`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```md
# Process tree / realtime monitor integration notes

## Routes

- Root/admin users: `/admin-dashboard`
- Normal users: `/process-monitoring`
- Legacy alias retained: `/process-monitor`

## Main files added

- `src/app/process-monitoring/views/ProcessMonitorView.tsx` — shared view used by both routes.
- `src/app/process-monitoring/components/*` — smaller UI components for header, metrics, user tree, process tree, realtime logs, footer, and popovers.
- `src/app/process-monitoring/realtimeProcessStore.ts` — subscription store and public update API.
- `src/app/process-monitoring/types.ts` — realtime data contracts.
- `src/app/process-monitoring/mockProcessMonitorData.ts` — initial mock snapshot.

## Realtime API

The view subscribes to `processMonitorRealtime`. Push data into the UI with:

```ts
import { processMonitorRealtime } from './src/app/process-monitoring';

processMonitorRealtime.upsertProcesses([...]);
processMonitorRealtime.upsertUsers([...]);
processMonitorRealtime.setMetrics({ cpuUsage: 31.2 });
processMonitorRealtime.appendLogs([...]);
processMonitorRealtime.replaceSnapshot(fullSnapshot);
```

For quick browser testing, the same API is exposed as:

```js
window.processMonitorRealtime.appendLogs([
  {
    id: crypto.randomUUID(),
    timestamp: new Date().toLocaleTimeString(),
    processName: 'api-worker',
    pid: 8844,
    userId: 'john',
    level: 'INFO',
    message: 'Realtime process sample received',
  },
]);
```

## UI details

- User Tree is summary-only; clicking a user loads that user’s process tree.
- Process Tree supports branch expand/collapse and expand-all/collapse-all.
- Real-time Logs panel has an independent scroll container.
- Filter, Columns, Settings, Alerts, and Time Range popovers are fixed-position with viewport flipping so they stay above the view.
- Accent color uses the existing `AccentColorContext` CSS variables.
- Light/dark mode uses the existing `DarkModeContext`.

## Build

The final package was validated with:

```bash
npm install --ignore-scripts --no-audit --no-fund
npm run build
```
```

## `process-monitoring-final/README.md`

- Category: `process-monitoring`
- Bytes: `335`
- SHA-256: `48a5d90a467f37e7362a36694d414cf0333b987cd635e86afa36e67b4a1c7d89`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `README.md`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```md

  # Design GIGA Intelligence PWA

  This is a code bundle for Design GIGA Intelligence PWA. The original project is available at https://www.figma.com/design/J4AE4LjzacPekDWbjb0OgJ/Design-GIGA-Intelligence-PWA.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
```

## `process-monitoring-final/default_shadcn_theme.css`

- Category: `process-monitoring`
- Bytes: `4319`
- SHA-256: `54729cdf634fadd501e3c92429ebfabb3f80553157f35051338cbda1337c1bda`

### Reuse notes

Use this artifact when the Software Builder needs the `process-monitoring` pattern represented by `default_shadcn_theme.css`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```css
/* KEEP_IN_SYNC(fullscreen/resources/figmake/shadcn/globals.css) */

:root {
  --font-size: 16px;
  --background: #ffffff;
  --foreground: oklch(0.145 0 0);
  --card: #ffffff;
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: #030213;
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.95 0.0058 264.53);
  --secondary-foreground: #030213;
  --muted: #ececf0;
  --muted-foreground: #717182;
  --accent: #e9ebef;
  --accent-foreground: #030213;
  --destructive: #d4183d;
  --destructive-foreground: #ffffff;
  --border: rgba(0, 0, 0, 0.1);
  --input: transparent;
  --input-background: #f3f3f5;
  --switch-background: #cbced4;
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: #030213;
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --font-weight-medium: 500;
  --font-weight-normal: 400;
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-input-background: var(--input-background);
  --color-switch-background: var(--switch-background);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}
```
