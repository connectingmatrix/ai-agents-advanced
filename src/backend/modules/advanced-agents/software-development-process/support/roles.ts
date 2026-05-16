import type { SoftwareAgentWorkNode } from '../contracts/types';

export const softwareDevelopmentRoles = [
  'main-agent',
  'ui-research-agent',
  'backend-research-agent',
  'public-screens-agent',
  'auth-screens-agent',
  'dashboard-agent',
  'crud-screens-agent',
  'admin-screens-agent',
  'settings-profile-agent',
  'error-offline-states-agent',
  'accessibility-agent',
  'data-model-agent',
  'migration-agent',
  'auth-agent',
  'authorization-agent',
  'api-routes-agent',
  'validation-agent',
  'backend-test-agent',
  'missing-screens-review-agent',
  'frontend-swarm',
  'backend-swarm',
  'pwa-agent',
  'integration-agent',
  'verification-swarm',
  'build-agent',
  'deployment-agent',
  'connectivity-agent',
  'final-output-agent',
] as const;

export const roleExpectedOutput = (role: string): string => {
  if (role.includes('research')) return 'Architecture research artifact';
  if (role.includes('screens') || role.includes('dashboard') || role.includes('crud')) return 'Screen contract and component usage';
  if (role.includes('backend') || role.includes('api') || role.includes('model')) return 'Thin backend contract artifact';
  if (role.includes('verification') || role.includes('test')) return 'Verification checklist and test report';
  if (role.includes('deployment')) return 'Deployment report and live URL contract';
  if (role.includes('connectivity')) return 'Connectivity smoke report';
  return 'Lifecycle planning artifact';
};

export const buildSoftwareAgentWorkGraph = (slug: string): SoftwareAgentWorkNode[] =>
  softwareDevelopmentRoles.map((role, index) => ({
    id: `${slug}-${role}`,
    title: role.replace(/-/g, ' '),
    parentId: index === 0 ? undefined : `${slug}-main-agent`,
    lifecycleStep: index + 1,
    expectedOutput: roleExpectedOutput(role),
    memoryNamespace: `${slug}:${role}`,
  }));
