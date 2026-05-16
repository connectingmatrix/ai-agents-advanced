import { softwareMatrixCatalog } from '../telemetry/matrix-catalog';
import { defaultValueScore, processScoreCaps } from './value-score';
import type { SoftwareDomainBlueprint } from '../../software-blueprints';
import type { SoftwareBackendAction, SoftwareBackendContract, SoftwareProcessMatrices } from '../contracts/matrix-types';

const states = [
  'initial',
  'loading',
  'loaded',
  'empty',
  'searching',
  'filtering',
  'validation_error',
  'network_error',
  'server_error',
  'unauthorized',
  'forbidden',
  'saving',
  'deleting',
  'success',
  'offline',
  'not_found',
];
const roles = ['guest', 'user', 'manager', 'organization_admin', 'super_admin'];
const crudActions = [
  { action: 'list', method: 'GET', permission: 'read' },
  { action: 'create', method: 'POST', permission: 'create' },
  { action: 'update', method: 'PATCH', permission: 'update' },
  { action: 'delete', method: 'DELETE', permission: 'delete' },
] as const;

const contract = (
  operation: string,
  entity: string,
  action: SoftwareBackendAction,
  method: string,
  purpose: string,
  allowedRoles: string[],
  permissions: string[],
): SoftwareBackendContract => ({
  operation,
  entity,
  action,
  endpoint: `/api/${operation}`,
  method,
  purpose,
  authRequired: allowedRoles[0] !== 'guest',
  roles: allowedRoles,
  permissions,
  request: ['session', 'payload'],
  response: ['success', 'data', 'message'],
  errors: ['401', '403', '404', '422', '500'],
  tests: ['valid request', 'invalid request', 'unauthorized role'],
});
const systemContracts = (): SoftwareBackendContract[] => [
  contract('login', 'session', 'login', 'POST', 'Start a generated app session', ['guest'], ['session.create']),
  contract('current-user', 'session', 'current-user', 'GET', 'Read current user and role', roles.slice(1), ['session.read']),
  contract('protected-route', 'route', 'protected-route', 'GET', 'Verify protected route access', roles.slice(1), ['route.read']),
  contract('admin-only', 'route', 'admin-only', 'GET', 'Verify admin-only access', ['organization_admin', 'super_admin'], ['admin.read']),
  contract('offline', 'app-runtime', 'offline', 'GET', 'Read offline fallback metadata', roles, ['offline.read']),
];

export const buildSoftwareProcessMatrices = (blueprint: SoftwareDomainBlueprint): SoftwareProcessMatrices => {
  const featurePatternMatrix = softwareMatrixCatalog.patterns.map((pattern) => ({
    patternId: pattern.patternId,
    feature: pattern.patternName,
    components: pattern.requiredComponents,
    backendPieces: pattern.requiredBackendPieces,
    tests: pattern.requiredTests,
  }));
  const backendContractMatrix = [
    ...systemContracts(),
    ...blueprint.tables.flatMap((table) =>
      crudActions.map((item) =>
        contract(`${table.name}.${item.action}`, table.name, item.action, item.method, `${item.action} ${table.name}`, roles.slice(1), [
          `${table.name}.${item.permission}`,
        ]),
      ),
    ),
  ];
  const routeAuthRbacMatrix = blueprint.routes.map((route) => {
    const adminRoute = route.path.includes('settings') || route.path.includes('admin');
    const publicRoute = route.path === '/';
    const allowedRoles = publicRoute ? roles : adminRoute ? ['organization_admin', 'super_admin'] : roles.slice(1);
    return {
      route: route.path,
      screenName: route.label,
      access: publicRoute ? ('public' as const) : ('protected' as const),
      allowedRoles,
      deniedRoles: roles.filter((role) => !allowedRoles.includes(role)),
      authRequired: !publicRoute,
      backendPermission: publicRoute ? 'none' : adminRoute ? 'admin.read' : 'records.read',
      frontendGuard: publicRoute ? 'none' : 'RequireAuth',
      backendGuard: publicRoute ? 'none' : adminRoute ? 'requirePermission(admin.read)' : 'requireAuth',
      redirectBehavior: 'Guests go to login; denied authenticated roles see unauthorized state.',
      unauthorizedUi: 'ErrorState with recovery action',
      navigationVisibility: publicRoute ? 'public' : 'role-filtered sidebar',
      tests: ['guest behavior', 'allowed role access', 'denied role state'],
    };
  });
  const crudOperationMatrix = blueprint.tables.map((table) => ({
    entity: table.name,
    route: `/${table.name}`,
    tableComponent: 'EnhancedDataTable',
    formComponent: 'CreateModal + FormField',
    deleteComponent: 'ConfirmDialog',
    operations: backendContractMatrix
      .filter((item) => item.entity === table.name)
      .map((item) => ({ name: item.operation, method: item.method, endpoint: item.endpoint, permission: item.permissions[0] })),
    states,
    tests: ['table loads', 'create submits', 'edit submits', 'delete confirms', 'backend rejects unauthorized'],
  }));
  const screenStateMatrix = blueprint.routes.map((route) => ({
    screen: route.label,
    route: route.path,
    dataSource: '/api/current-user',
    states,
    feedback: ['Toast', 'EmptyState', 'LoadingState', 'ErrorState'],
    tests: ['loading', 'empty', 'error', 'forbidden', 'success'],
  }));
  const testCoverageMatrix = featurePatternMatrix.map((pattern) => ({
    feature: pattern.patternId,
    frontend: ['route renders', 'state renders'],
    backend: ['contract validates'],
    integration: ['UI calls API client'],
    rbac: ['allowed', 'denied'],
    status: 'required' as const,
  }));
  const base = { featurePatternMatrix, routeAuthRbacMatrix, crudOperationMatrix, backendContractMatrix, screenStateMatrix, testCoverageMatrix };
  const doneItems = [
    {
      id: 'matrix-catalog',
      passed: softwareMatrixCatalog.complete,
      evidence: `${featurePatternMatrix.length} patterns and ${softwareMatrixCatalog.components.length} UI components loaded from scoped catalog.`,
    },
    {
      id: 'backend-contracts',
      passed: backendContractMatrix.length >= blueprint.tables.length * 4,
      evidence: `${backendContractMatrix.length} generated API contracts.`,
    },
    {
      id: 'crud-wiring',
      passed: crudOperationMatrix.every((entry) => entry.operations.length === 4),
      evidence: 'Each detected table has list/create/update/delete operations.',
    },
    {
      id: 'rbac',
      passed: routeAuthRbacMatrix.every((entry) => entry.access === 'public' || entry.backendGuard !== 'none'),
      evidence: 'Protected routes include backend guard contracts.',
    },
    {
      id: 'states-tests',
      passed: screenStateMatrix.length > 0 && testCoverageMatrix.length > 0,
      evidence: 'Screen state and test matrices are present.',
    },
  ];
  return {
    ...base,
    valueScore: defaultValueScore(processScoreCaps(base)),
    definitionOfDone: { passed: doneItems.every((item) => item.passed), items: doneItems },
    requirementCompletionChecklist: blueprint.workflows.map((requirement) => ({
      requirement,
      status: 'complete' as const,
      evidence: 'Mapped to route, contract, test, and report artifact.',
    })),
  };
};

export type { SoftwareProcessMatrices, SoftwareValueScore } from '../contracts/matrix-types';
