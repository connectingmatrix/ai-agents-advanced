import type { AdvancedSoftwareFile, SoftwareBuildContext } from '../contracts/types';

export const buildReactFiles = (context: SoftwareBuildContext): AdvancedSoftwareFile[] => [
  {
    path: 'src/main.tsx',
    kind: 'tsx',
    content:
      "import React from 'react';\nimport { createRoot } from 'react-dom/client';\nimport App from './app/App';\nimport './app/styles.css';\n\ncreateRoot(document.getElementById('root')!).render(<App />);\n",
  },
  {
    path: 'src/app/App.tsx',
    kind: 'tsx',
    content:
      "import { appManifest } from './data/domain';\nimport { AppLayout } from './components/AppLayout';\nimport { RecordsTable } from './components/RecordsTable';\nimport { WorkflowPanel } from './components/WorkflowPanel';\nimport { MonitoringPanel } from './components/MonitoringPanel';\n\nexport default function App() {\n  return <AppLayout manifest={appManifest}>\n    <MonitoringPanel metrics={appManifest.metrics} />\n    <RecordsTable records={appManifest.records} />\n    <WorkflowPanel workflows={appManifest.workflows} />\n  </AppLayout>;\n}\n",
  },
  {
    path: 'src/app/data/domain.ts',
    kind: 'ts',
    content: `export const appManifest = ${JSON.stringify(
      {
        name: context.name,
        summary: context.blueprint.summary,
        routes: context.blueprint.routes,
        modules: context.modules,
        metrics: context.blueprint.metrics,
        records: context.blueprint.records,
        workflows: context.blueprint.workflows,
      },
      null,
      2,
    )} as const;\n`,
  },
  {
    path: 'src/app/ui-kit/catalog.ts',
    kind: 'ts',
    content:
      "export const approvedUiKit = ['Root','Sidebar','GlobalHeader','EnhancedDataTable','CreateModal','FormField','TreeSelector','MetricCard','LiveBadge','StatusDot'] as const;\n",
  },
  { path: 'src/app/routes.ts', kind: 'ts', content: `export const routes = ${JSON.stringify(context.blueprint.routes, null, 2)} as const;\n` },
];
