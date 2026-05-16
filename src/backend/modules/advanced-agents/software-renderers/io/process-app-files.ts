import type { AdvancedSoftwareFile, SoftwareBuildContext } from '../contracts/types';

type ConnectivityCheck = SoftwareBuildContext['softwareProcess']['connectivity']['checks'][number];

const jsonFile = (path: string, value: unknown): AdvancedSoftwareFile => ({ path, kind: 'json', content: JSON.stringify(value, null, 2) });

const apiResponseFile = (check: ConnectivityCheck): AdvancedSoftwareFile => {
  const action = check.operation.split('.')[1] || check.operation;
  return jsonFile(`api/${check.operation}`, {
    ok: true,
    operation: check.operation,
    method: check.method,
    data: {
      session: check.operation === 'login' ? 'generated-session-token' : undefined,
      user: ['login', 'current-user', 'protected-route', 'admin-only'].includes(check.operation)
        ? { id: 'demo-user', role: 'organization_admin' }
        : undefined,
      records: action === 'list' ? [{ id: 'demo-record', status: 'verified' }] : undefined,
      record: ['create', 'update', 'delete'].includes(action) ? { id: 'demo-record', status: 'verified' } : undefined,
      offline: check.operation === 'offline' ? { fallback: '/pwa/offline.html', cacheSafe: true } : undefined,
    },
  });
};

export const buildGeneratedAppSourceFiles = (context: SoftwareBuildContext): AdvancedSoftwareFile[] => [
  {
    path: 'src/app/api/client.ts',
    kind: 'ts',
    content:
      "export const apiClient = { request: async (operation: string, method = 'GET', body?: unknown) => { const response = await fetch('./api/' + operation, { method, headers: { 'content-type': 'application/json' }, body: body ? JSON.stringify(body) : undefined }); const payload = await response.json(); if (!response.ok || payload.ok === false) throw new Error(payload.error || 'Request failed'); return payload; } } as const;\n",
  },
  {
    path: 'src/app/auth/rbac.ts',
    kind: 'ts',
    content:
      "export const roles = ['guest','user','manager','organization_admin','super_admin'] as const;\nexport const canAccess = (allowed: readonly string[], role: string) => allowed.includes(role);\n",
  },
  {
    path: 'src/app/crud/handlers.ts',
    kind: 'ts',
    content:
      "import { apiClient } from '../api/client';\nexport const crudHandlers = { list: (entity: string) => apiClient.request(entity + '.list'), create: (entity: string, body: unknown) => apiClient.request(entity + '.create', 'POST', body), update: (entity: string, id: string, body: object) => apiClient.request(entity + '.update', 'PATCH', { id, ...body }), delete: (entity: string, id: string) => apiClient.request(entity + '.delete', 'DELETE', { id }) } as const;\n",
  },
  {
    path: 'src/app/routes/guards.ts',
    kind: 'ts',
    content:
      "import { canAccess } from '../auth/rbac';\nexport const requireRole = (allowed: readonly string[], role: string) => canAccess(allowed, role) ? 'allowed' : 'forbidden';\n",
  },
  {
    path: 'src/app/states/screen-states.ts',
    kind: 'ts',
    content:
      "export const screenStates = ['initial','loading','loaded','empty','validation_error','network_error','server_error','unauthorized','forbidden','saving','deleting','success','offline','not_found'] as const;\n",
  },
  {
    path: 'backend/models/index.ts',
    kind: 'ts',
    content: `export const models = ${JSON.stringify(context.softwareProcess.backendArchitecture.models, null, 2)} as const;\n`,
  },
  {
    path: 'backend/routes/index.ts',
    kind: 'ts',
    content: `export const routes = ${JSON.stringify(context.softwareProcess.backendArchitecture.routes, null, 2)} as const;\n`,
  },
  {
    path: 'backend/validation/index.ts',
    kind: 'ts',
    content: `export const validations = ${JSON.stringify(context.softwareProcess.backendArchitecture.validations, null, 2)} as const;\n`,
  },
  ...context.softwareProcess.connectivity.checks.map(apiResponseFile),
];

export const buildGeneratedAppTestFiles = (): AdvancedSoftwareFile[] => [
  {
    path: 'tests/api-contract.spec.ts',
    kind: 'ts',
    content:
      "import { describe, expect, it } from 'vitest';\nimport contract from '../docs/api-contract-map.json';\n\ndescribe('api contract', () => { it('defines generated endpoints', () => expect(contract.length).toBeGreaterThan(3)); });\n",
  },
  {
    path: 'tests/connectivity.spec.ts',
    kind: 'ts',
    content:
      "import { describe, expect, it } from 'vitest';\nimport checks from '../connectivity/checks.json';\n\ndescribe('connectivity checks', () => { it('covers auth and CRUD mutations', () => { const operations = checks.checks.map((item) => item.operation); expect(operations).toContain('login'); expect(operations.some((operation) => operation.endsWith('.create'))).toBe(true); }); });\n",
  },
  {
    path: 'tests/rbac.spec.ts',
    kind: 'ts',
    content:
      "import { describe, expect, it } from 'vitest';\nimport routes from '../docs/route-auth-rbac-matrix.json';\n\ndescribe('rbac matrix', () => { it('has backend guards for protected routes', () => expect(routes.every((route) => route.access === 'public' || route.backendGuard !== 'none')).toBe(true)); });\n",
  },
];
