import type { AdvancedSoftwareFile, SoftwareBuildContext } from '../contracts/types';

export const buildScreenFiles = (context: SoftwareBuildContext): AdvancedSoftwareFile[] => [
  {
    path: 'src/app/pages/HomePage.tsx',
    kind: 'tsx',
    content: `export function HomePage(){return <section className="hero"><div><p className="eyebrow">${context.blueprint.label}</p><h2>${context.name}</h2><p>${context.blueprint.summary}</p></div><a href="#/login">Open demo login</a></section>;}
`,
  },
  {
    path: 'src/app/pages/AuthScreens.tsx',
    kind: 'tsx',
    content: `import { CreateModal } from '../client-kit/approved-components';
export function LoginPage(){return <section className="panel"><h2>Login</h2><CreateModal/><label>Email<input aria-label="Email"/></label><label>Password<input type="password" aria-label="Password"/></label><button>Sign in</button></section>;}
export function SignupPage(){return <section className="panel"><h2>Signup</h2><CreateModal/><label>Name<input aria-label="Name"/></label><label>Organization<input aria-label="Organization"/></label><button>Create account</button></section>;}
`,
  },
  {
    path: 'src/app/pages/CrudScreens.tsx',
    kind: 'tsx',
    content: `import { EnhancedDataTable, CreateModal } from '../client-kit/approved-components';
export const crudScreens = ${JSON.stringify(
      context.blueprint.tables.map((table) => ({
        name: table.name,
        fields: table.columns,
        actions: ['create', 'read', 'update', 'archive', 'audit'],
      })),
      null,
      2,
    )} as const;
export function CrudPattern(){return <><CreateModal/><EnhancedDataTable rows={[]} /></>;}
`,
  },
  {
    path: 'src/app/pages/ReportsPage.tsx',
    kind: 'tsx',
    content: `import { MetricCard, Panel, LogViewerTable } from '../client-kit/approved-components';
export const reportCharts = ${JSON.stringify(
      context.blueprint.metrics.map((metric, index) => ({ title: metric, chart: 'sparkline', value: 48 + index * 11 })),
      null,
      2,
    )} as const;
export function ReportsPattern(){return <Panel>{reportCharts.map((chart) => <MetricCard key={chart.title} title={chart.title} value={chart.value}/>) }<LogViewerTable/></Panel>;}
`,
  },
];
