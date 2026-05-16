import type { SoftwareDomainBlueprint } from '../contracts/types';

export const researchBlueprint: SoftwareDomainBlueprint = {
  id: 'research-workbench',
  label: 'Simulation Research Workbench',
  defaultName: 'Simulation Research Workbench',
  summary: 'Datasets, simulations, mesh runs, charts, reports, and experiment reproducibility.',
  keywords: /turbulence|cfd|simulation|fluid|mesh|solver|research|experiment/i,
  modules: ['Datasets', 'Simulations', 'Meshes', 'Runs', 'Charts', 'Reports'],
  routes: [
    {
      path: '/',
      label: 'Research Dashboard',
      component: 'DashboardPage',
      summary: 'Experiment health, compute queues, and result quality indicators.',
    },
    { path: '/datasets', label: 'Datasets', component: 'RecordsPage', summary: 'Dataset registry with lineage, validation, and freshness state.' },
    {
      path: '/simulations',
      label: 'Simulation Runs',
      component: 'RecordsPage',
      summary: 'Solver parameters, mesh quality, status, and output artifacts.',
    },
    { path: '/operations', label: 'Runtime Monitor', component: 'OperationsPage', summary: 'Queue pressure, failed jobs, logs, and retry plans.' },
    { path: '/settings', label: 'Lab Settings', component: 'SettingsPage', summary: 'Solver presets, compute policy, and reporting defaults.' },
  ],
  tables: [
    { name: 'datasets', columns: ['id', 'title', 'status', 'source', 'samples', 'created_at'] },
    { name: 'simulations', columns: ['id', 'title', 'status', 'mesh', 'solver', 'residual'] },
    { name: 'reports', columns: ['id', 'title', 'status', 'author', 'published_at', 'artifact'] },
  ],
  workflows: ['Dataset validation', 'Mesh generation', 'Solver run', 'Report publishing'],
  metrics: ['Queue depth', 'Stable simulations', 'Residual target', 'Published reports'],
  records: [
    { title: 'LES wing-tip vortex run', status: 'Solving', owner: 'Numerics team', value: '72%' },
    { title: 'Mesh quality review', status: 'Blocked', owner: 'Research lead', value: '0.81 skew' },
    { title: 'Validation report', status: 'Draft', owner: 'Analyst', value: '14 charts' },
  ],
};
