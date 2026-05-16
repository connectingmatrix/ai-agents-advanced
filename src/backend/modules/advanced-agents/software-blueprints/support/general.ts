import type { SoftwareDomainBlueprint } from '../contracts/types';

export const generalBlueprint: SoftwareDomainBlueprint = {
  id: 'operations-workspace',
  label: 'Operations Workspace',
  defaultName: 'Operations Workspace',
  summary: 'Dashboard, records, workflows, monitoring, and reporting for a generated business system.',
  keywords: /.*/i,
  modules: ['Dashboard', 'Records', 'Workflows', 'Monitoring', 'Reports'],
  routes: [
    { path: '/', label: 'Dashboard', component: 'DashboardPage', summary: 'Executive summary, actions, and operational health.' },
    { path: '/records', label: 'Records', component: 'RecordsPage', summary: 'Primary record queue with filters, owners, and status.' },
    { path: '/workflows', label: 'Workflows', component: 'RecordsPage', summary: 'Automation catalog and execution readiness.' },
    { path: '/operations', label: 'Operations Monitor', component: 'OperationsPage', summary: 'Runtime logs, metrics, and alert handling.' },
    { path: '/settings', label: 'Settings', component: 'SettingsPage', summary: 'Policies, permissions, and deployment controls.' },
  ],
  tables: [
    { name: 'records', columns: ['id', 'title', 'status', 'owner', 'priority', 'created_at'] },
    { name: 'workflows', columns: ['id', 'title', 'status', 'trigger', 'last_run_at', 'owner'] },
  ],
  workflows: ['Record intake', 'Review queue', 'Report publish', 'Alert response'],
  metrics: ['Open records', 'Automation health', 'SLA risk', 'Published reports'],
  records: [
    { title: 'Executive review', status: 'Ready', owner: 'Operations', value: '12 items' },
    { title: 'Automation health', status: 'Healthy', owner: 'Runtime', value: '99.2%' },
    { title: 'Report queue', status: 'Scheduled', owner: 'Analytics', value: '8 reports' },
  ],
};
