import { z } from 'zod';
import featurePatterns from '../matrix/matrices/feature-pattern-matrix.json';
import uiKitComponents from '../matrix/matrices/ui-kit-component-matrix.json';
import valueScore from '../matrix/matrices/value-score-matrix.json';

export const requiredFeaturePatternIds = [
  'AUTH_EMAIL_PASSWORD',
  'AUTH_INVITE_ONLY',
  'AUTH_ROLE_BASED_DASHBOARD',
  'AUTH_SESSION_CURRENT_USER',
  'CRUD_TABLE_MODAL',
  'CRUD_TABLE_DRAWER',
  'CRUD_DETAIL_PAGE',
  'CRUD_CREATE_EDIT_MODAL',
  'CRUD_CREATE_EDIT_PAGE',
  'ADMIN_ONLY_MANAGEMENT',
  'SUPER_ADMIN_ONLY_MANAGEMENT',
  'RBAC_PERMISSION_MATRIX',
  'USER_MANAGEMENT',
  'ORGANIZATION_MANAGEMENT',
  'SETTINGS_PAGE',
  'PROFILE_PAGE',
  'FILE_UPLOAD_MANAGER',
  'FILE_VIEWER_PAGE',
  'TREE_HIERARCHY_MANAGER',
  'WORKFLOW_BUILDER',
  'MONITORING_DASHBOARD',
  'REALTIME_TABLE_VIEW',
  'CHAT_INTERFACE',
  'SEARCH_FILTER_PAGINATION',
  'AUDIT_LOG_VIEWER',
  'REPORTING_DASHBOARD',
  'NOTIFICATION_CENTER',
  'BILLING_OR_PLAN_MANAGEMENT',
  'PUBLIC_LANDING_PAGE',
  'PRICING_PAGE',
  'HELP_OR_DOCS_PAGE',
  'PWA_OFFLINE_FALLBACK',
] as const;
export const requiredComponentCategories = [
  'layout',
  'navigation',
  'data-display',
  'table',
  'crud',
  'form',
  'modal',
  'feedback',
  'permission',
  'file',
  'tree',
  'chat',
  'monitoring',
  'settings',
  'admin',
  'state',
] as const;
export const requiredScoreCaps = [
  'crud_without_backend',
  'admin_without_backend_rbac',
  'unwired_buttons_or_forms',
  'static_crud',
  'compat_api_missing',
  'matrix_incomplete',
  'checks_not_attempted',
  'ui_kit_ignored',
  'missing_completion_checklist',
  'missing_final_docs',
] as const;

const patternSchema = z.object({
  patternId: z.string().min(1),
  patternName: z.string().min(1),
  requiredComponents: z.array(z.string().min(1)).min(1),
  requiredBackendPieces: z.array(z.string().min(1)).min(1),
  requiredTests: z.array(z.string().min(1)).min(1),
});
const componentSchema = z
  .object({ componentName: z.string().min(1), category: z.string().min(1), recommendedPatterns: z.array(z.string()).min(1) })
  .passthrough();
const valueScoreSchema = z.object({ caps: z.array(z.object({ id: z.string().min(1), maxScore: z.number().int().positive() })).min(1) }).passthrough();
const parsedPatterns = z.object({ patterns: z.array(patternSchema).min(requiredFeaturePatternIds.length) }).parse(featurePatterns);
const parsedComponents = z.object({ components: z.array(componentSchema).min(requiredComponentCategories.length) }).parse(uiKitComponents);
const parsedValueScore = valueScoreSchema.parse(valueScore);

function requireCatalogEntries(label: string, required: readonly string[], actual: Set<string>) {
  const missing = required.filter((id) => !actual.has(id));
  if (missing.length) throw new Error(`Software-development matrix missing ${label}: ${missing.join(', ')}`);
}

requireCatalogEntries('feature patterns', requiredFeaturePatternIds, new Set(parsedPatterns.patterns.map((pattern) => pattern.patternId)));
requireCatalogEntries(
  'component categories',
  requiredComponentCategories,
  new Set(parsedComponents.components.map((component) => component.category)),
);
requireCatalogEntries('value score caps', requiredScoreCaps, new Set(parsedValueScore.caps.map((cap) => cap.id)));

export const softwareMatrixCatalog = {
  patterns: parsedPatterns.patterns,
  components: parsedComponents.components,
  valueScore: parsedValueScore,
  complete: true,
} as const;
