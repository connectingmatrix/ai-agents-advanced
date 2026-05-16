import type { AdvancedSoftwareFile } from '../contracts/types';

export const buildComponentFiles = (): AdvancedSoftwareFile[] => [
  {
    path: 'src/app/components/AppLayout.tsx',
    kind: 'tsx',
    content:
      "import type { ReactNode } from 'react';\nimport { Root, Sidebar, GlobalHeader } from '../client-kit/approved-components';\nimport { approvedUiKit } from '../../ui-kit/catalog';\n\ntype Props = { manifest: { name: string; summary: string; routes: readonly { path: string; label: string; summary: string }[] }; children: ReactNode };\n\nexport function AppLayout({ manifest, children }: Props) {\n  return <Root><Sidebar><p className=\"eyebrow\">Application Studio</p><h1>{manifest.name}</h1><p>{manifest.summary}</p><nav>{manifest.routes.map((route) => <a key={route.path} href={'#' + (route.path === '/' ? '/dashboard' : route.path)}>{route.label}</a>)}</nav><small>UI kit: {approvedUiKit.slice(0, 5).join(', ')}</small></Sidebar><main><GlobalHeader title={manifest.name} />{children}</main></Root>;\n}\n",
  },
  {
    path: 'src/app/components/RecordsTable.tsx',
    kind: 'tsx',
    content:
      'import { EnhancedDataTable } from \'../ui-kit/approved-components\';\n\ntype RecordRow = { title: string; status: string; owner: string; value: string };\n\nexport function RecordsTable({ records }: { records: readonly RecordRow[] }) {\n  return <section className="panel"><h2>Priority records</h2><EnhancedDataTable rows={records} /></section>;\n}\n',
  },
  {
    path: 'src/app/components/WorkflowPanel.tsx',
    kind: 'tsx',
    content:
      'export function WorkflowPanel({ workflows }: { workflows: readonly string[] }) {\n  return <section className="panel"><h2>Workflow automation</h2><ul className="workflow-list">{workflows.map((workflow) => <li key={workflow}><strong>{workflow}</strong><span>Ready for queue execution, audit, and escalation.</span></li>)}</ul></section>;\n}\n',
  },
  {
    path: 'src/app/components/MonitoringPanel.tsx',
    kind: 'tsx',
    content:
      "import { MetricCard } from '../client-kit/approved-components';\n\nexport function MonitoringPanel({ metrics }: { metrics: readonly string[] }) {\n  return <section className=\"metrics\">{metrics.map((metric, index) => <MetricCard key={metric} title={metric} value={(index + 2) + (index === 1 ? '%' : '')} />)}</section>;\n}\n",
  },
];
