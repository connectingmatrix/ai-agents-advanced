import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { generateAdvancedSoftwareSystem } from '@connectingmatrix/ai-agents/services/ai-agents/advanced';
import type { AdvancedSoftwareSystemSpec } from '@connectingmatrix/ai-agents/services/ai-agents/advanced';

const paths = (spec: AdvancedSoftwareSystemSpec) => spec.files.map((file) => file.path);
const content = (spec: AdvancedSoftwareSystemSpec) => spec.files.map((file) => `${file.path}\n${file.content}`).join('\n');

const assertRealGeneratedApp = (spec: AdvancedSoftwareSystemSpec, domain: string) => {
  const filePaths = paths(spec);
  const indexHtml = spec.files.find((file) => file.path === 'index.html')?.content || '';
  assert.equal(spec.metadata.uiKit && typeof spec.metadata.uiKit === 'object', true);
  assert.equal(spec.metadata.blueprint && typeof spec.metadata.blueprint === 'object', true);
  assert.equal(spec.metadata.softwareProcess && typeof spec.metadata.softwareProcess === 'object', true);
  assert.equal((spec.metadata.quality as { passed?: boolean }).passed, true);
  assert.equal(filePaths.includes('app.manifest.json'), true);
  assert.equal(filePaths.includes('docs/requirements-breakdown.json'), true);
  assert.equal(filePaths.includes('docs/user-stories.json'), true);
  assert.equal(filePaths.includes('docs/implementation-tasks.json'), true);
  assert.equal(filePaths.includes('docs/research-brief.json'), true);
  assert.equal(filePaths.includes('docs/agent-work-packets.json'), true);
  assert.equal(filePaths.includes('docs/ui-kit-usage.json'), true);
  assert.equal(filePaths.includes('docs/api-contract-map.json'), true);
  assert.equal(filePaths.includes('docs/role-route-matrix.json'), true);
  assert.equal(filePaths.includes('docs/feature-pattern-matrix.json'), true);
  assert.equal(filePaths.includes('docs/route-auth-rbac-matrix.json'), true);
  assert.equal(filePaths.includes('docs/crud-operation-matrix.json'), true);
  assert.equal(filePaths.includes('docs/backend-contract-matrix.json'), true);
  assert.equal(filePaths.includes('docs/screen-state-matrix.json'), true);
  assert.equal(filePaths.includes('docs/test-coverage-matrix.json'), true);
  assert.equal(filePaths.includes('docs/value-score.json'), true);
  assert.equal(filePaths.includes('docs/definition-of-done.json'), true);
  assert.equal(filePaths.includes('docs/requirement-completion-checklist.json'), true);
  assert.equal(filePaths.includes('docs/build-verification-report.md'), true);
  assert.equal(filePaths.includes('docs/final-report.md'), true);
  assert.equal(filePaths.includes('src/app/api/client.ts'), true);
  assert.equal(filePaths.includes('src/app/auth/rbac.ts'), true);
  assert.equal(filePaths.includes('src/app/crud/handlers.ts'), true);
  assert.equal(filePaths.includes('src/app/routes/guards.ts'), true);
  assert.equal(filePaths.includes('src/app/states/screen-states.ts'), true);
  assert.equal(filePaths.includes('backend/models/index.ts'), true);
  assert.equal(filePaths.includes('backend/routes/index.ts'), true);
  assert.equal(filePaths.includes('backend/validation/index.ts'), true);
  assert.equal(filePaths.includes('migrations/001_initial.sql'), true);
  assert.equal(filePaths.includes('pwa/manifest.webmanifest'), true);
  assert.equal(filePaths.includes('pwa/offline.html'), true);
  assert.equal(filePaths.includes('connectivity/checks.json'), true);
  assert.equal(filePaths.includes('tests/rbac.spec.ts'), true);
  assert.equal(filePaths.includes('giga.app.json'), false);
  assert.equal(filePaths.includes('db/schema.sql'), true);
  assert.equal(filePaths.includes('db/seed.json'), true);
  assert.equal(filePaths.includes('src/app/components/RecordsTable.tsx'), true);
  assert.equal(filePaths.includes('src/app/components/MonitoringPanel.tsx'), true);
  assert.equal(filePaths.includes('src/app/ui-kit/usage-contract.ts'), true);
  assert.equal(filePaths.includes('src/app/ui-kit/approved-components.tsx'), true);
  assert.equal(filePaths.includes('src/app/pages/HomePage.tsx'), true);
  assert.equal(filePaths.includes('src/app/pages/AuthScreens.tsx'), true);
  assert.equal(filePaths.includes('src/app/pages/CrudScreens.tsx'), true);
  assert.equal(filePaths.includes('src/app/pages/ReportsPage.tsx'), true);
  assert.equal(filePaths.length >= 15, true);
  assert.match(indexHtml, /data-generated-app-shell="static"/);
  assert.match(indexHtml, /data-screen="login"/);
  assert.match(indexHtml, /data-screen="signup"/);
  assert.match(indexHtml, /data-ui-kit-component="MetricCard"/);
  assert.match(indexHtml, /SparklineChart/);
  assert.match(indexHtml, /EnhancedDataTable/);
  assert.match(indexHtml, /CreateModal/);
  assert.match(indexHtml, /FormField/);
  assert.match(indexHtml, /class="screen crud-screen"/);
  assert.match(indexHtml, /data-crud-form=/);
  assert.match(indexHtml, /data-crud-rows=/);
  assert.match(indexHtml, /data-action="edit"/);
  assert.match(indexHtml, /data-action="delete"/);
  assert.match(indexHtml, /data-role-select/);
  assert.match(indexHtml, /data-screen="unauthorized"/);
  assert.match(indexHtml, /data-screen="offline"/);
  assert.match(indexHtml, /#toast-region/);
  assert.match(indexHtml, /class="chart-card"/);
  assert.match(indexHtml, /__AGENT_APP_LIVE__/);
  assert.doesNotMatch(indexHtml, /<link[^>]+src\/app\/styles\.css|<script type="module" src="\/src\/main\.tsx"/);
  assert.doesNotMatch(indexHtml, /href="\//);
  assert.match(content(spec), /softwareProcess|connectivity|acceptance criteria|userStories|agentWorkPackets|valueScore/i);
  assert.match(content(spec), /backendContractMatrix|crudOperationMatrix|routeAuthRbacMatrix|screenStateMatrix/i);
  assert.match(content(spec), /\.create|\.update|\.delete/);
  assert.equal(
    filePaths.some((path) => path.endsWith('.create') && path.startsWith('api/')),
    true,
  );
  assert.equal(
    filePaths.some((path) => path.endsWith('.update') && path.startsWith('api/')),
    true,
  );
  assert.equal(
    filePaths.some((path) => path.endsWith('.delete') && path.startsWith('api/')),
    true,
  );
  assert.match(content(spec), /<EnhancedDataTable|<CreateModal|<MetricCard|<LogViewerTable/);
  assert.match(content(spec), new RegExp(domain, 'i'));
  assert.doesNotMatch(content(spec), /\bGiga\b|\bGIGA\b/);
};

describe('advanced software generator', () => {
  it('builds a real UI-kit hospital application', () => {
    const spec = generateAdvancedSoftwareSystem({ prompt: 'Build a hospital practice management app with appointments and billing' });
    assert.equal(spec.framework, 'react-vite');
    assert.equal(JSON.parse(spec.files.find((file) => file.path === 'app.manifest.json')!.content).domain, 'healthcare-practice');
    assertRealGeneratedApp(spec, 'patient|appointment|provider');
  });

  it('builds a real RCM application', () => {
    const spec = generateAdvancedSoftwareSystem({ prompt: 'Create an RCM command center for denials, claims, payers, and appeals' });
    assert.equal(JSON.parse(spec.files.find((file) => file.path === 'app.manifest.json')!.content).domain, 'rcm-command-center');
    assertRealGeneratedApp(spec, 'claim|denial|appeal');
  });

  it('builds a real EdTech application', () => {
    const spec = generateAdvancedSoftwareSystem({ prompt: 'Create a school edtech app for students, attendance, fees, and parent portal' });
    assertRealGeneratedApp(spec, 'student|attendance|parent');
  });

  it('builds a real CFD research workbench', () => {
    const spec = generateAdvancedSoftwareSystem({ prompt: 'Create a turbulence CFD simulation workbench with meshes, solver runs, and charts' });
    assertRealGeneratedApp(spec, 'simulation|mesh|solver');
  });

  it('adds Electron shell files for desktop prompts', () => {
    const spec = generateAdvancedSoftwareSystem({ prompt: 'Create an electron desktop hospital operations application' });
    assert.equal(spec.framework, 'electron');
    assert.equal(paths(spec).includes('electron/main.ts'), true);
    assert.equal(paths(spec).includes('electron/preload.ts'), true);
    assertRealGeneratedApp(spec, 'hospital|patient|appointment');
  });
});
