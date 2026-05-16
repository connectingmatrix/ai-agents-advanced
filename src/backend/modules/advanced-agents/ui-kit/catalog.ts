export const uiKitSource = {
  sourceZipEnv: 'UI_KIT_SOURCE_ZIP',
  defaultZipPath: '/Users/abeer/dev/abeer/ui - kits/GIGA AI - Final.zip',
  sanitizedForGeneratedApps: true,
} as const;

export const uiKitComponents = {
  layout: ['Root', 'Sidebar', 'GlobalHeader', 'BottomNav', 'Breadcrumb'],
  records: ['EnhancedDataTable', 'DataTable', 'DraggableTable', 'RealtimeTable'],
  forms: ['CreateModal', 'FormField', 'TabbedFormView', 'InlineConfirmation'],
  selectors: ['TableSelector', 'TableMultiSelector', 'TreeSelector', 'TreeMultiSelector', 'TreeSelectField'],
  monitoring: ['Panel', 'PanelHeader', 'MetricCard', 'LiveBadge', 'StatusDot', 'SparklineChart', 'LogViewerTable'],
  feedback: ['Toast', 'ConfirmDialog', 'EmptyState', 'ErrorState', 'LoadingState'],
} as const;

export const uiKitScreens = [
  'ProcessMonitor',
  'WorkflowBuilder',
  'AIAgentProjects',
  'NodeEditor',
  'SharedSpaceFiles',
  'SubjectHub',
  'ComponentsShowcase',
  'AdvancedComponentsShowcase',
] as const;

export const uiKitComponentContracts = [
  { name: 'Root', usage: 'App shell with Sidebar, GlobalHeader, BottomNav, CreateModal, and main outlet.' },
  { name: 'Sidebar', usage: 'Primary navigation with create action, compact/programmatic modes, and grouped domain links.' },
  { name: 'GlobalHeader', usage: 'Top command area for search, create, view mode, status, and account actions.' },
  { name: 'MetricCard', props: ['title', 'value', 'unit', 'sparkline'], usage: 'Dashboard KPI with embedded SparklineChart.' },
  { name: 'SparklineChart', props: ['data', 'variant', 'width', 'height'], usage: 'Inline trend chart for operational metrics.' },
  {
    name: 'EnhancedDataTable',
    props: ['columns', 'data', 'rowActions', 'selectable', 'searchable'],
    usage: 'CRUD list with search, filters, sort, pagination, row actions.',
  },
  { name: 'CreateModal', props: ['isOpen', 'onClose'], usage: 'Create flow modal with form fields and confirmation states.' },
  { name: 'FormField', usage: 'Typed form field wrapper for labels, help text, errors, and dependent fields.' },
  { name: 'TreeSelector', usage: 'Hierarchy picker for parent/context fields.' },
  { name: 'Panel', usage: 'Monitoring/report shell with title, freshness, severity, and owner.' },
  { name: 'LogViewerTable', usage: 'Timestamped operational events with level/status filters.' },
] as const;

export const uiKitPagePatterns = [
  { name: 'LandingPage', useFor: 'Public home, value proposition, feature proof, CTA panels.' },
  { name: 'DashboardFromChat', useFor: 'Generated dashboard layout with widgets, charts, summaries, and activity.' },
  { name: 'ComponentsShowcase', useFor: 'Component prop examples and sanctioned composition patterns.' },
  { name: 'SubjectHub', useFor: 'Record hub/detail screen with tree context and related resources.' },
  { name: 'OrganizationMembers', useFor: 'Admin list, permission matrix, role changes, invite flow.' },
  { name: 'ProcessMonitor', useFor: 'Runtime status, queues, logs, worker health, remediation actions.' },
] as const;

export const uiKitVisualTokens = {
  layout: 'Sidebar + GlobalHeader + card/panel content grid',
  charts: 'MetricCard + SparklineChart + chart cards with legend and trend annotations',
  forms: 'FormField + CreateModal + TabbedFormView + InlineConfirmation',
  tables: 'EnhancedDataTable + row actions + filters + empty/error/loading states',
} as const;

export const uiKitUsageRules = [
  'Use the sidebar shell for business applications.',
  'Use data tables for record management pages.',
  'Use selectors for relational fields.',
  'Use monitoring cards for runtime and workflow status.',
  'Use neutral generated-app branding in project artifacts.',
] as const;
