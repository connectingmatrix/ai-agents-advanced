import type { SoftwareDomainBlueprint } from '../contracts/types';

export const educationBlueprint: SoftwareDomainBlueprint = {
  id: 'education-platform',
  label: 'School Operations Platform',
  defaultName: 'School Operations Platform',
  summary: 'Students, courses, attendance, parent communication, fees, and academic operations.',
  keywords: /school|edtech|student|course|attendance|grade|parent|lms/i,
  modules: ['Students', 'Courses', 'Attendance', 'Grades', 'Payments', 'Reports'],
  routes: [
    { path: '/', label: 'School Dashboard', component: 'DashboardPage', summary: 'Enrollment, attendance, fee, and academic progress overview.' },
    { path: '/students', label: 'Students', component: 'RecordsPage', summary: 'Student roster with guardian, class, status, and interventions.' },
    { path: '/attendance', label: 'Attendance', component: 'RecordsPage', summary: 'Daily attendance, absence reasons, and parent notifications.' },
    { path: '/operations', label: 'Operations Monitor', component: 'OperationsPage', summary: 'Automation, imports, billing queues, and alerts.' },
    { path: '/settings', label: 'Academic Settings', component: 'SettingsPage', summary: 'Terms, sections, fee plans, and grading policies.' },
  ],
  tables: [
    { name: 'students', columns: ['id', 'title', 'status', 'grade', 'guardian', 'created_at'] },
    { name: 'attendance', columns: ['id', 'title', 'status', 'date', 'reason', 'notified_at'] },
    { name: 'payments', columns: ['id', 'title', 'status', 'amount', 'due_at', 'owner'] },
  ],
  workflows: ['Attendance digest', 'Fee reminder', 'Parent portal summary', 'Grade publishing'],
  metrics: ['Attendance rate', 'Fee collection', 'At-risk students', 'Open interventions'],
  records: [
    { title: 'Grade 8 attendance sweep', status: 'Review', owner: 'Academic coordinator', value: '94%' },
    { title: 'Parent portal rollout', status: 'Launching', owner: 'Student services', value: '480 guardians' },
    { title: 'Fee follow-up batch', status: 'Queued', owner: 'Finance', value: '$31,500' },
  ],
};
