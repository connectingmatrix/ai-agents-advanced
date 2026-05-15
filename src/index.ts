import { makeId, nowIso, type PackageHealth, type PackageModule, type RequestContext } from './contracts.js';

export interface AdvancedAgentPlanStep { id: string; title: string; status: 'todo' | 'running' | 'done'; output?: string; }
export interface AdvancedAgentPlan { id: string; objective: string; steps: AdvancedAgentPlanStep[]; createdAt: string; }

export const AdvancedAIAgents = {
  plan(objective: string): AdvancedAgentPlan {
    const steps = objective.split(/[.;\n]/).map((text) => text.trim()).filter(Boolean).map((title) => ({ id: makeId('step'), title, status: 'todo' as const }));
    return { id: makeId('plan'), objective, steps: steps.length ? steps : [{ id: makeId('step'), title: objective, status: 'todo' }], createdAt: nowIso() };
  },
  async executePlan(plan: AdvancedAgentPlan, runner: (step: AdvancedAgentPlanStep) => Promise<string> | string) {
    const steps: AdvancedAgentPlanStep[] = [];
    for (const step of plan.steps) steps.push({ ...step, status: 'done', output: await runner({ ...step, status: 'running' }) });
    return { ...plan, steps };
  },
  designOutput(markdown: string) {
    return { id: makeId('agent_output_design'), markdown, previewBlocks: markdown.split(/\n{2,}/).filter(Boolean), updatedAt: nowIso() };
  },
  health(): PackageHealth { return { name: '@connectingmatrix/ai-agents-advanced', status: 'ok', checkedAt: nowIso() }; },
};

export const graphql = { namespace: 'advancedAiAgents', typeDefs: 'type Query { advancedAiAgentsHealth: String! }', resolvers: { Query: { advancedAiAgentsHealth: () => AdvancedAIAgents.health().status } }, migrations: ['migrations/0001_init.sql'] };
export function createPackage(): PackageModule { return { name: '@connectingmatrix/ai-agents-advanced', version: '0.1.0', health: () => AdvancedAIAgents.health(), graphql, migrations: graphql.migrations }; }
export * from './contracts.js';
