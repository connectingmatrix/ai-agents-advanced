import { InMemoryRepository, type BaseRecord } from './entity/repository.js';
import { makeId, nowIso, type PackageHealth, type PackageModule, type RequestContext } from './contracts.js';
import { createStubLauncher } from './launcher.js';
import { PackageObservability } from './observability.js';
import { PlannerAgent } from './backend/agents/planner-agent/index.js';
import { ResearcherAgent } from './backend/agents/researcher-agent/index.js';
import { SoftwareBuilderAgent } from './backend/agents/software-builder-agent/index.js';
import { DeploymentAgent } from './backend/agents/deployment-agent/index.js';
import { DataAnalystAgent } from './backend/agents/data-analyst-agent/index.js';
import { ImageGisAgent } from './backend/agents/image-gis-agent/index.js';
import { MemoryAgent } from './backend/agents/memory-agent/index.js';
import { PlatformFixAgent } from './backend/agents/platform-fix-agent/index.js';
import { ProcessMonitorControlAgent } from './backend/agents/process-monitor-control-agent/index.js';
import { OutputDesignerAgent } from './backend/agents/output-designer-agent/index.js';
import { SwarmCoordinatorAgent } from './backend/agents/swarm-coordinator-agent/index.js';

export type AdvancedAgentKind = 'planner-agent' | 'researcher-agent' | 'software-builder-agent' | 'deployment-agent' | 'data-analyst-agent' | 'image-gis-agent' | 'memory-agent' | 'platform-fix-agent' | 'process-monitor-control-agent' | 'output-designer-agent' | 'swarm-coordinator-agent';
export type LegacyAdvancedAgentKind = 'planner' | 'researcher' | 'software-builder' | 'deployment' | 'memory-analyst' | 'output-designer' | 'gis-image';
export interface AdvancedAgentPlan extends BaseRecord { kind: AdvancedAgentKind; objective: string; steps: string[]; status: 'planned' | 'running' | 'completed'; output?: string; }
export interface AdvancedAgentRuntime { name: AdvancedAgentKind; description: string; run(input: { message: string; objective?: string; agentId?: string; payload?: Record<string, unknown> }): Promise<string>; }
const plans = new InMemoryRepository<AdvancedAgentPlan>('advanced_plan');
const agents: Record<AdvancedAgentKind, AdvancedAgentRuntime> = {
  'planner-agent': PlannerAgent,
  'researcher-agent': ResearcherAgent,
  'software-builder-agent': SoftwareBuilderAgent,
  'deployment-agent': DeploymentAgent,
  'data-analyst-agent': DataAnalystAgent,
  'image-gis-agent': ImageGisAgent,
  'memory-agent': MemoryAgent,
  'platform-fix-agent': PlatformFixAgent,
  'process-monitor-control-agent': ProcessMonitorControlAgent,
  'output-designer-agent': OutputDesignerAgent,
  'swarm-coordinator-agent': SwarmCoordinatorAgent,
} as Record<AdvancedAgentKind, AdvancedAgentRuntime>;
const legacyAliases: Record<LegacyAdvancedAgentKind, AdvancedAgentKind> = { planner: 'planner-agent', researcher: 'researcher-agent', 'software-builder': 'software-builder-agent', deployment: 'deployment-agent', 'memory-analyst': 'memory-agent', 'output-designer': 'output-designer-agent', 'gis-image': 'image-gis-agent' };
let runner: ((plan: AdvancedAgentPlan, context: RequestContext) => Promise<string>) | undefined;
function normalizeKind(kind?: AdvancedAgentKind | LegacyAdvancedAgentKind): AdvancedAgentKind { if (!kind) return 'planner-agent'; return (legacyAliases as Record<string, AdvancedAgentKind>)[kind] ?? kind as AdvancedAgentKind; }

export const AdvancedAIAgents = {
  setRunner(adapter: (plan: AdvancedAgentPlan, context: RequestContext) => Promise<string>) { runner = adapter; return AdvancedAIAgents; },
  agents() { return Object.values(agents).map((agent) => ({ name: agent.name, description: agent.description })); },
  getAgent(kind: AdvancedAgentKind | LegacyAdvancedAgentKind) { return agents[normalizeKind(kind)]; },
  plan(input: { kind?: AdvancedAgentKind | LegacyAdvancedAgentKind; objective: string; steps?: string[] }, context: RequestContext = {}) { const kind = normalizeKind(input.kind); const steps = input.steps?.length ? input.steps : [`${kind}: clarify objective`, `${kind}: inspect context`, `${kind}: produce output`, `${kind}: validate`]; return plans.create({ kind, objective: input.objective, steps, status: 'planned' }, context); },
  list(context: RequestContext = {}) { return plans.list(context, { limit: 500 }); },
  getObject(id: string, context: RequestContext = {}) { return plans.get(id, context); },
  async executePlan(id: string, context: RequestContext = {}) { const plan = plans.get(id, context); if (!plan) throw new Error(`Advanced plan not found: ${id}`); plans.update(id, { status: 'running' }, context); PackageObservability.track(`advanced:${plan.kind}:${id}`, { label: `${plan.kind}`, status: 'running', progress: 35, context: { processKind: 'Ai Agents', planId: id, agentKind: plan.kind } }, context); const output = runner ? await runner(plan, context) : await agents[plan.kind].run({ message: plan.objective, objective: plan.objective }); PackageObservability.track(`advanced:${plan.kind}:${id}`, { label: `${plan.kind}`, status: 'completed', progress: 100, context: { processKind: 'Ai Agents', planId: id, agentKind: plan.kind } }, context); return plans.update(id, { status: 'completed', output }, context); },
  async runAgent(kind: AdvancedAgentKind | LegacyAdvancedAgentKind, input: { message: string; objective?: string; agentId?: string; payload?: Record<string, unknown> }, context: RequestContext = {}) { const normalized = normalizeKind(kind); PackageObservability.track(`advanced:${normalized}`, { label: `${normalized}`, status: 'running', progress: 20, context: { processKind: 'Ai Agents', agentKind: normalized } }, context); const output = await agents[normalized].run(input); PackageObservability.track(`advanced:${normalized}`, { label: `${normalized}`, status: 'completed', progress: 100, context: { processKind: 'Ai Agents', agentKind: normalized } }, context); return { id: makeId('advanced_run'), kind: normalized, output, createdAt: nowIso() }; },
  designOutput(input: { title: string; schema?: Record<string, unknown>; sample?: unknown }, context: RequestContext = {}) { const plan = plans.create({ kind: 'output-designer-agent', objective: input.title, steps: ['draft schema', 'render editable designer', 'validate sample'], status: 'completed', output: JSON.stringify(input) }, context); return { id: plan.id, mode: 'stub', title: input.title, editable: true, schema: input.schema ?? {}, sample: input.sample ?? null }; },
  launcher: createStubLauncher,
  health(): PackageHealth { return { name: '@connectingmatrix/ai-agents-advanced', status: 'ok', checkedAt: nowIso(), details: { agents: Object.keys(agents), plans: plans.list({ root: true }).total, runner: Boolean(runner), workflowTreeNodeAgentsOwnedHere: false, folderNaming: 'agent-name/index.ts', ...PackageObservability.healthDetails() } }; }
};
export const graphql = { namespace: 'advancedAiAgents', typeDefs: `type AdvancedAgentPlan { id: ID!, kind: String!, objective: String!, steps: [String!]!, status: String!, output: String } type AdvancedAgentCatalogItem { name: String!, description: String! } type Query { advancedAgentPlans: [AdvancedAgentPlan!]!, advancedAgentCatalog: [AdvancedAgentCatalogItem!]!, advancedAgentsLauncher: String! } type Mutation { advancedAgentPlan(kind: String, objective: String!): AdvancedAgentPlan!, advancedAgentExecute(id: ID!): AdvancedAgentPlan!, advancedAgentRun(kind: String!, message: String!): String! }`, resolvers: { Query: { advancedAgentPlans: (_: unknown, __: unknown, ctx: RequestContext) => AdvancedAIAgents.list(ctx).items, advancedAgentCatalog: () => AdvancedAIAgents.agents(), advancedAgentsLauncher: (_: unknown, __: unknown, ctx: RequestContext) => JSON.stringify(createStubLauncher(ctx)) }, Mutation: { advancedAgentPlan: (_: unknown, args: { kind?: AdvancedAgentKind | LegacyAdvancedAgentKind; objective: string }, ctx: RequestContext) => AdvancedAIAgents.plan(args, ctx), advancedAgentExecute: (_: unknown, args: { id: string }, ctx: RequestContext) => AdvancedAIAgents.executePlan(args.id, ctx), advancedAgentRun: async (_:unknown,args:{kind: AdvancedAgentKind | LegacyAdvancedAgentKind; message:string},ctx:RequestContext)=>JSON.stringify(await AdvancedAIAgents.runAgent(args.kind,{message:args.message},ctx)) } }, migrations: ['migrations/0001_init.sql'] };
export function createPackage(): PackageModule { return { name: '@connectingmatrix/ai-agents-advanced', version: '0.4.0', health: () => AdvancedAIAgents.health(), graphql, migrations: graphql.migrations, launcher: createStubLauncher, runtime: { AdvancedAIAgents, observability: PackageObservability }, routes: [{ method: 'GET', path: '/ai-agents-advanced/health', handler: () => AdvancedAIAgents.health() }, { method: 'GET', path: '/ai-agents-advanced/launcher', handler: (request) => createStubLauncher((request as { context?: RequestContext }).context ?? {}) }] }; }
export * from './backend/agents/index.js';
export * from './contracts.js'; export * from './package-structure.js'; export * from './observability.js'; export * from './launcher.js';
