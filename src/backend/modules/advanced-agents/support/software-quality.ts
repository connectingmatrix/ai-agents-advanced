import type { SoftwareValueScore } from '../software-development-process';
import type { AdvancedSoftwareSystemSpec } from '../contracts/types';

export type SoftwareQualityCheck = { id: string; passed: boolean; points: number; summary: string };
export type SoftwareQualityReport = SoftwareValueScore & { score: number; maxScore: number; passed: boolean; checks: SoftwareQualityCheck[] };

const contentFor = (spec: AdvancedSoftwareSystemSpec, path: string): string => spec.files.find((file) => file.path === path)?.content || '';
const sourceFor = (spec: AdvancedSoftwareSystemSpec): string => spec.files.reduce((text, file) => `${text}\n${file.path}\n${file.content}`, '');
const hasFile = (spec: AdvancedSoftwareSystemSpec, path: string): boolean => spec.files.some((file) => file.path === path);
const hasApiFile = (spec: AdvancedSoftwareSystemSpec, suffix: string): boolean =>
  spec.files.some((file) => file.path.startsWith('api/') && file.path.endsWith(suffix));
const check = (id: string, passed: boolean, points: number, summary: string): SoftwareQualityCheck => ({ id, passed, points, summary });
const capScore = (caps: string[], raw: number): number => {
  let score = raw;
  if (caps.includes('crud_without_backend') || caps.includes('admin_without_backend_rbac')) score = Math.min(score, 60);
  if (
    caps.includes('unwired_buttons_or_forms') ||
    caps.includes('static_crud') ||
    caps.includes('compat_api_missing') ||
    caps.includes('matrix_incomplete')
  )
    score = Math.min(score, 65);
  if (caps.includes('checks_not_attempted')) score = Math.min(score, 70);
  if (caps.includes('ui_kit_ignored')) score = Math.min(score, 75);
  if (caps.includes('missing_completion_checklist')) score = Math.min(score, 80);
  if (caps.includes('missing_final_docs')) score = Math.min(score, 85);
  return score;
};

export function scoreAdvancedSoftwareSystem(spec: AdvancedSoftwareSystemSpec): SoftwareQualityReport {
  const html = contentFor(spec, 'index.html');
  const source = sourceFor(spec);
  const featureMatrix = contentFor(spec, 'docs/feature-pattern-matrix.json');
  const wiredCrud =
    html.includes('data-crud-form=') &&
    html.includes('data-crud-rows=') &&
    html.includes('data-action="edit"') &&
    html.includes('data-action="delete"');
  const contractCrud =
    source.includes('docs/backend-contract-matrix.json') && hasApiFile(spec, '.create') && hasApiFile(spec, '.update') && hasApiFile(spec, '.delete');
  const checks = [
    check(
      'functionalCompleteness',
      html.includes('data-screen="home"') && html.includes('data-screen="dashboard"') && html.includes('data-screen="not-found"') && wiredCrud,
      25,
      'Routes and wired CRUD screens exist.',
    ),
    check(
      'backendWiring',
      hasFile(spec, 'src/app/api/client.ts') &&
        hasFile(spec, 'backend/routes/index.ts') &&
        hasFile(spec, 'docs/backend-contract-matrix.json') &&
        contractCrud,
      20,
      'API client, backend routes, contract matrix, and CRUD API files exist.',
    ),
    check(
      'uiKitCompliance',
      source.includes('EnhancedDataTable') &&
        source.includes('CreateModal') &&
        source.includes('MetricCard') &&
        source.includes('SparklineChart') &&
        source.includes('data-ui-kit-component'),
      15,
      'Approved UI-kit components are used in executable screens.',
    ),
    check(
      'rbacAuthCorrectness',
      hasFile(spec, 'src/app/auth/rbac.ts') &&
        hasFile(spec, 'src/app/routes/guards.ts') &&
        hasFile(spec, 'docs/route-auth-rbac-matrix.json') &&
        html.includes('data-role-select') &&
        html.includes('data-screen="unauthorized"'),
      15,
      'Frontend RBAC, route guard evidence, role simulation, and unauthorized state exist.',
    ),
    check(
      'stateCoverage',
      hasFile(spec, 'src/app/states/screen-states.ts') &&
        source.includes('offline') &&
        source.includes('unauthorized') &&
        html.includes('#toast-region'),
      10,
      'Screen states include toast, offline, and unauthorized coverage.',
    ),
    check(
      'testingVerification',
      hasFile(spec, 'tests/api-contract.spec.ts') && hasFile(spec, 'tests/connectivity.spec.ts') && hasFile(spec, 'tests/rbac.spec.ts'),
      10,
      'API, connectivity, and RBAC tests exist.',
    ),
    check(
      'maintainabilityDocs',
      hasFile(spec, 'docs/final-report.md') &&
        hasFile(spec, 'docs/definition-of-done.json') &&
        hasFile(spec, 'docs/requirement-completion-checklist.json'),
      5,
      'Final docs and completion checklist exist.',
    ),
  ];
  const capsApplied: string[] = [];
  if (source.includes('crud-screen') && !hasFile(spec, 'docs/backend-contract-matrix.json')) capsApplied.push('crud_without_backend');
  if (source.includes('super_admin') && !source.includes('backendGuard')) capsApplied.push('admin_without_backend_rbac');
  if (!source.includes('crudHandlers') || !source.includes('apiClient') || !wiredCrud) capsApplied.push('unwired_buttons_or_forms');
  if (source.includes('crud-screen') && !wiredCrud) capsApplied.push('static_crud');
  if (source.includes('crud-screen') && !contractCrud) capsApplied.push('compat_api_missing');
  if (!featureMatrix.includes('AUTH_INVITE_ONLY') || !featureMatrix.includes('PWA_OFFLINE_FALLBACK')) capsApplied.push('matrix_incomplete');
  if (!hasFile(spec, 'docs/value-score.json')) capsApplied.push('checks_not_attempted');
  if (!source.includes('src/app/ui-kit/approved-components.tsx')) capsApplied.push('ui_kit_ignored');
  if (!hasFile(spec, 'docs/requirement-completion-checklist.json')) capsApplied.push('missing_completion_checklist');
  if (!hasFile(spec, 'docs/final-report.md')) capsApplied.push('missing_final_docs');
  const rawScore = checks.reduce((sum, item) => sum + (item.passed ? item.points : 0), 0);
  const total = capScore(capsApplied, rawScore);
  return {
    functionalCompleteness: checks[0].passed ? 25 : 0,
    backendWiring: checks[1].passed ? 20 : 0,
    uiKitCompliance: checks[2].passed ? 15 : 0,
    rbacAuthCorrectness: checks[3].passed ? 15 : 0,
    stateCoverage: checks[4].passed ? 10 : 0,
    testingVerification: checks[5].passed ? 10 : 0,
    maintainabilityDocs: checks[6].passed ? 5 : 0,
    total,
    capsApplied,
    verdict: total >= 90 ? 'complete' : total >= 70 ? 'partial' : 'failed',
    score: total,
    maxScore: 100,
    passed: total >= 90 && capsApplied.length === 0,
    checks,
  };
}
