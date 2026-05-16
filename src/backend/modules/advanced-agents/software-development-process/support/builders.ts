import { uiKitComponents } from '../../ui-kit';
import { buildSoftwareProcessMatrices } from './matrices';
import { buildSoftwareAgentWorkGraph } from './roles';
import { buildAcceptanceCriteria, buildImplementationTasks, buildUserStories } from './stories';
import { buildAgentWorkPackets, buildResearchBrief, buildUiResearchArtifact } from './work-packets';
import type { SoftwareDevelopmentProcess, SoftwareProcessInput } from '../contracts/types';

const routePath = (route: { path: string }) => route.path;
const tableName = (table: { name: string }) => table.name;
const approvedComponents = Object.values(uiKitComponents).flat() as string[];

export const buildSoftwareDevelopmentProcess = (input: SoftwareProcessInput): SoftwareDevelopmentProcess => {
  const routes = input.blueprint.routes.map(routePath);
  const models = input.blueprint.tables.map(tableName);
  const workGraph = buildSoftwareAgentWorkGraph(input.blueprint.id);
  const uiResearch = buildUiResearchArtifact(input.blueprint);
  const implementationTasks = buildImplementationTasks(input.blueprint);
  const matrices = buildSoftwareProcessMatrices(input.blueprint);
  const apiContractMap = matrices.backendContractMatrix.map((contract) => ({
    operation: contract.operation,
    endpoint: contract.endpoint,
    method: contract.method,
    purpose: contract.purpose,
    model: contract.entity,
  }));
  return {
    ...matrices,
    status: 'ready',
    requirementBreakdown: {
      productSummary: `${input.name}: ${input.blueprint.summary}`,
      userRoles: ['owner', 'operator', 'admin', 'auditor'],
      screens: routes,
      features: input.blueprint.workflows,
      dataEntities: models,
      businessRules: input.blueprint.metrics.map((metric) => `${metric} must be visible and traceable.`),
      permissions: ['Admins can manage settings.', 'Operators can create and update records.', 'Auditors are read-only.'],
      pwaExpectations: ['Installable shell', 'Offline fallback', 'Runtime connection status', 'Safe cache metadata'],
      testingExpectations: ['Domain tests', 'API contract tests', 'Connectivity smoke tests', 'PWA readiness checks'],
      deploymentExpectations: ['Static shell deployment', 'Health endpoint', 'Manifest endpoint', 'Compatibility API surface'],
    },
    userStories: buildUserStories(input.blueprint),
    implementationTasks,
    ambiguityRegister: ['Confirm production identity provider.', 'Confirm final audit retention period.'],
    assumptions: ['Generated backend contract is app-local.', 'UI kit components are the only approved visual primitives.'],
    acceptanceCriteria: buildAcceptanceCriteria(input.blueprint),
    agentWorkGraph: workGraph,
    agentWorkPackets: buildAgentWorkPackets(workGraph, input.blueprint),
    researchBrief: buildResearchBrief(input.blueprint),
    uiResearch: {
      routes,
      components: approvedComponents,
      states: ['loading', 'empty', 'error', 'offline', 'success'],
      accessibility: ['keyboard navigation', 'landmark regions', 'contrast-safe status colors'],
      screenArchitecture: uiResearch.screenArchitecture,
      pagePatterns: uiResearch.pagePatterns,
      mobile: uiResearch.mobile,
    },
    backendArchitecture: {
      models,
      routes: apiContractMap.map((contract) => `${contract.method} ${contract.endpoint}`),
      validations: ['required parent context', 'typed request body', 'role-aware mutation checks'],
      authRules: ['session required for protected routes', 'admin role required for admin routes'],
    },
    apiContractMap,
    screenEndpointMap: routes.map((screen) => ({
      screen,
      endpoints: ['/api/current-user', ...apiContractMap.filter((contract) => screen.includes(contract.model)).map((contract) => contract.endpoint)],
    })),
    roleRouteMatrix: ['owner', 'operator', 'admin', 'auditor'].map((role) => ({
      role,
      routes: role === 'auditor' ? routes.filter((route) => !route.includes('settings')) : routes,
    })),
    roleEndpointMatrix: ['owner', 'operator', 'admin', 'auditor'].map((role) => ({
      role,
      endpoints:
        role === 'auditor'
          ? apiContractMap.filter((contract) => contract.method === 'GET').map((contract) => contract.endpoint)
          : apiContractMap.map((contract) => contract.endpoint),
    })),
    requestResponseSchemas: apiContractMap.map((contract) => ({
      endpoint: contract.endpoint,
      request: ['session', 'payload'],
      response: ['ok', 'data', 'errors'],
    })),
    implementationPlan: implementationTasks,
    verification: {
      status: 'planned',
      checks: ['lint', 'typecheck', 'unit tests', 'api contract tests', 'accessibility review'],
      risks: ['external auth integration not connected in static compatibility mode'],
    },
    build: { status: 'planned', commands: ['npm install', 'npm run build', 'npm test'] },
    deployment: { status: 'planned', target: 'agent app static host', checks: ['health', 'manifest', 'live URL', 'contract API'] },
    connectivity: {
      checks: apiContractMap.map((contract) => ({
        operation: contract.operation,
        endpoint: contract.endpoint,
        method: contract.method,
        expectedStatus: 200,
      })),
    },
    finalReport: `${input.name} is planned as a process-backed ${input.blueprint.label} application with ${routes.length} screens, ${models.length} data models, ${workGraph.length} specialist work packets, UI-kit page patterns, charted reporting, PWA readiness, and connectivity checks.`,
    blueprint: { id: input.blueprint.id, label: input.blueprint.label },
  };
};
