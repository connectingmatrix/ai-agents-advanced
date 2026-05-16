import type { SoftwareDomainBlueprint } from '../contracts/types';

export const healthcareBlueprint: SoftwareDomainBlueprint = {
  id: 'healthcare-practice',
  label: 'Hospital Practice Management',
  defaultName: 'Hospital Practice Management',
  summary: 'Clinical scheduling, provider operations, billing, inventory, and patient service workflows.',
  keywords: /hospital|clinic|practice|provider|appointment|patient/i,
  modules: ['Patients', 'Appointments', 'Providers', 'Billing', 'Inventory', 'Reports'],
  routes: [
    { path: '/', label: 'Practice Dashboard', component: 'DashboardPage', summary: 'Daily census, appointments, revenue, and bottleneck view.' },
    { path: '/patients', label: 'Patient Registry', component: 'RecordsPage', summary: 'Patient profile queue with care gaps and billing state.' },
    { path: '/appointments', label: 'Scheduling', component: 'RecordsPage', summary: 'Calendar-ready appointment pipeline and provider capacity.' },
    { path: '/operations', label: 'Operations Monitor', component: 'OperationsPage', summary: 'Live queues, approvals, and service-level alerts.' },
    {
      path: '/settings',
      label: 'Practice Settings',
      component: 'SettingsPage',
      summary: 'Departments, providers, billing rules, and portal options.',
    },
  ],
  tables: [
    { name: 'patients', columns: ['id', 'title', 'status', 'provider', 'risk', 'created_at'] },
    { name: 'appointments', columns: ['id', 'title', 'status', 'provider', 'visit_type', 'scheduled_at'] },
    { name: 'billing', columns: ['id', 'title', 'status', 'payer', 'amount', 'due_at'] },
  ],
  workflows: ['Intake triage', 'Appointment reminders', 'Billing review', 'Inventory reorder'],
  metrics: ['Appointments today', 'No-show risk', 'Open claims', 'Inventory alerts'],
  records: [
    { title: 'New patient intake', status: 'Ready', owner: 'Front desk', value: '24 charts' },
    { title: 'Provider capacity', status: 'At risk', owner: 'Clinic manager', value: '91%' },
    { title: 'Supply reorder', status: 'Pending approval', owner: 'Inventory', value: '12 items' },
  ],
};
