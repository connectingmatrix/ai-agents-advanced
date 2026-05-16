import { nowIso, type PackageLauncherPanel, type RequestContext } from './contracts.js';

export function createConnectingmatrixAiAgentsAdvancedStubLauncher(context: RequestContext = {}): PackageLauncherPanel {
  return {
    packageName: '@connectingmatrix/ai-agents-advanced',
    title: 'Advanced AI Agents Launcher',
    mode: 'stub',
    status: 'ready',
    checkedAt: nowIso(),
    summary: 'Launches advanced derived agents such as planner, researcher, output designer, deployment and builder agents.',
    healthPath: '/ai-agents-advanced/health',
    graphqlNamespace: 'advancedAiAgents',
    routes: [
      { method: 'GET', path: '/ai-agents-advanced/health', description: 'Health/status endpoint' },
      { method: 'GET', path: '/advancedAiAgents/launcher', description: 'Stub launcher panel' }
    ],
    owns: {
      ui: ['dataloaders', 'bindWithServer', 'status/launcher UI'],
      backend: ["advanced planner", "research runtime", "output designer"],
      entity: ["AdvancedAgentPlan", "AdvancedAgentRun"],
      migrations: ['migrations/*.sql']
    },
    actions: [
      { name: 'plan', label: 'plan', method: 'LOCAL' as const, description: 'Run plan demo action' },
      { name: 'executePlan', label: 'executePlan', method: 'LOCAL' as const, description: 'Run executePlan demo action' },
      { name: 'designOutput', label: 'designOutput', method: 'LOCAL' as const, description: 'Run designOutput demo action' }
    ],
    sampleData: { context: 'stub-playground', userId: context.userId ?? 'stub-user' },
    context: { userId: context.userId, organizationId: context.organizationId, root: Boolean(context.root), traceId: context.traceId },
    notes: [
      'This launcher is intentionally stub-mode playable so the package can be tested outside giga-ai-backend.',
      'The launcher exposes this package boundary only; cross-package behavior is injected through adapters.'
    ]
  };
}

export const createStubLauncher = createConnectingmatrixAiAgentsAdvancedStubLauncher;
export const Launcher = { open: createConnectingmatrixAiAgentsAdvancedStubLauncher, mode: 'stub' as const };
export const launcher = createConnectingmatrixAiAgentsAdvancedStubLauncher;
