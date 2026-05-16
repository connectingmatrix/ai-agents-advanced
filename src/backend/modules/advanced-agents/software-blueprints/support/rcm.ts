import type { SoftwareDomainBlueprint } from '../contracts/types';

export const rcmBlueprint: SoftwareDomainBlueprint = {
  id: 'rcm-command-center',
  label: 'Revenue Cycle Command Center',
  defaultName: 'Revenue Cycle Command Center',
  summary: 'Claims, denials, payer follow-up, appeals, and financial risk operations for healthcare teams.',
  keywords: /rcm|revenue cycle|claim|denial|payer|insurance|appeal|medical billing/i,
  modules: ['Patients', 'Claims', 'Payers', 'Denials', 'Appeals', 'Letters', 'Reports'],
  routes: [
    { path: '/', label: 'Command Center', component: 'DashboardPage', summary: 'KPI cockpit for claims inventory and reimbursement risk.' },
    { path: '/claims', label: 'Claims Workbench', component: 'RecordsPage', summary: 'Claim queue with payer, status, aging, and next action.' },
    { path: '/denials', label: 'Denial Studio', component: 'RecordsPage', summary: 'Root-cause tracking, appeal packets, and SLA escalations.' },
    {
      path: '/operations',
      label: 'Operations Monitor',
      component: 'OperationsPage',
      summary: 'Automation runs, stuck queues, and worker remediation.',
    },
    { path: '/settings', label: 'Rules', component: 'SettingsPage', summary: 'Payer rules, appeal templates, and thresholds.' },
  ],
  tables: [
    { name: 'patients', columns: ['id', 'title', 'status', 'payer', 'balance', 'created_at'] },
    { name: 'claims', columns: ['id', 'title', 'status', 'payer', 'amount', 'aging_days'] },
    { name: 'denials', columns: ['id', 'title', 'status', 'reason_code', 'owner', 'deadline'] },
    { name: 'appeals', columns: ['id', 'title', 'status', 'template', 'submitted_at', 'outcome'] },
  ],
  workflows: ['Eligibility verification', 'Claim scrub', 'Denial appeal packet', 'Payer follow-up digest'],
  metrics: ['Net collection rate', 'Denial overturn rate', 'A/R over 90 days', 'Clean claim rate'],
  records: [
    { title: 'Cardiology claim batch', status: 'Needs appeal', owner: 'Denials lead', value: '$42,800' },
    { title: 'BlueShield follow-up', status: 'Queued', owner: 'Payer specialist', value: '18 claims' },
    { title: 'Medical necessity packet', status: 'Drafting', owner: 'Clinical reviewer', value: '7 letters' },
  ],
};
