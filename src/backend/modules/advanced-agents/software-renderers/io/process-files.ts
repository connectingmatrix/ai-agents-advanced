import { buildGeneratedAppSourceFiles, buildGeneratedAppTestFiles } from './process-app-files';
import type { AdvancedSoftwareFile, SoftwareBuildContext } from '../contracts/types';

const jsonFile = (path: string, value: unknown): AdvancedSoftwareFile => ({ path, kind: 'json', content: JSON.stringify(value, null, 2) });

export const buildProcessFiles = (context: SoftwareBuildContext): AdvancedSoftwareFile[] => {
  const process = context.softwareProcess;
  return [
    jsonFile('docs/requirements-breakdown.json', process.requirementBreakdown),
    jsonFile('docs/user-stories.json', process.userStories),
    jsonFile('docs/implementation-tasks.json', process.implementationTasks),
    jsonFile('docs/research-brief.json', process.researchBrief),
    jsonFile('docs/agent-work-packets.json', process.agentWorkPackets),
    jsonFile('docs/api-contract-map.json', process.apiContractMap),
    jsonFile('docs/screen-endpoint-map.json', process.screenEndpointMap),
    jsonFile('docs/role-route-matrix.json', process.roleRouteMatrix),
    jsonFile('docs/role-endpoint-matrix.json', process.roleEndpointMatrix),
    jsonFile('docs/request-response-schemas.json', process.requestResponseSchemas),
    jsonFile('docs/feature-pattern-matrix.json', process.featurePatternMatrix),
    jsonFile('docs/route-auth-rbac-matrix.json', process.routeAuthRbacMatrix),
    jsonFile('docs/crud-operation-matrix.json', process.crudOperationMatrix),
    jsonFile('docs/backend-contract-matrix.json', process.backendContractMatrix),
    jsonFile('docs/screen-state-matrix.json', process.screenStateMatrix),
    jsonFile('docs/test-coverage-matrix.json', process.testCoverageMatrix),
    jsonFile('docs/value-score.json', process.valueScore),
    jsonFile('docs/definition-of-done.json', process.definitionOfDone),
    jsonFile('docs/requirement-completion-checklist.json', process.requirementCompletionChecklist),
    {
      path: 'docs/final-report.md',
      kind: 'md',
      content: `# Final Delivery Report\n\n${process.finalReport}\n\n## Acceptance Criteria\n\n${process.acceptanceCriteria
        .map((item) => `- ${item}`)
        .join('\n')}\n`,
    },
    {
      path: 'docs/build-verification-report.md',
      kind: 'md',
      content: `# Build Verification Report\n\nPlanned commands: ${process.build.commands.join(', ')}.\n\nStatus: ${process.build.status}.\n`,
    },
    {
      path: 'migrations/001_initial.sql',
      kind: 'sql',
      content:
        context.database === 'none'
          ? '-- app has no database tables'
          : context.blueprint.tables.map((table) => `CREATE TABLE IF NOT EXISTS ${table.name} (id TEXT PRIMARY KEY);`).join('\n'),
    },
    jsonFile('connectivity/checks.json', process.connectivity),
    {
      path: 'pwa/manifest.webmanifest',
      kind: 'json',
      content: JSON.stringify(
        {
          name: context.name,
          short_name: context.name.slice(0, 12),
          start_url: '/',
          display: 'standalone',
          background_color: '#f8f6ef',
          theme_color: '#1d352d',
        },
        null,
        2,
      ),
    },
    {
      path: 'pwa/offline.html',
      kind: 'html',
      content: '<main><h1>Offline</h1><p>The app shell is available while the network reconnects.</p></main>',
    },
    {
      path: 'src/app/runtime-status.ts',
      kind: 'ts',
      content:
        "export const runtimeStatus = { online: true, offlineFallback: '/pwa/offline.html', checkedAt: new Date(0).toISOString() } as const;\n",
    },
    ...buildGeneratedAppSourceFiles(context),
    ...buildGeneratedAppTestFiles(),
  ];
};
