import { type BaseRecord } from './entity/repository.js';
import { type PackageHealth, type PackageModule, type RequestContext } from './contracts.js';
export type AdvancedAgentKind = 'planner-agent' | 'researcher-agent' | 'software-builder-agent' | 'deployment-agent' | 'data-analyst-agent' | 'image-gis-agent' | 'memory-agent' | 'platform-fix-agent' | 'process-monitor-control-agent' | 'output-designer-agent' | 'swarm-coordinator-agent';
export type LegacyAdvancedAgentKind = 'planner' | 'researcher' | 'software-builder' | 'deployment' | 'memory-analyst' | 'output-designer' | 'gis-image';
export interface AdvancedAgentPlan extends BaseRecord {
    kind: AdvancedAgentKind;
    objective: string;
    steps: string[];
    status: 'planned' | 'running' | 'completed';
    output?: string;
}
export interface AdvancedAgentRuntime {
    name: AdvancedAgentKind;
    description: string;
    run(input: {
        message: string;
        objective?: string;
        agentId?: string;
        payload?: Record<string, unknown>;
    }): Promise<string>;
}
export declare const AdvancedAIAgents: {
    setRunner(adapter: (plan: AdvancedAgentPlan, context: RequestContext) => Promise<string>): /*elided*/ any;
    agents(): {
        name: AdvancedAgentKind;
        description: string;
    }[];
    getAgent(kind: AdvancedAgentKind | LegacyAdvancedAgentKind): AdvancedAgentRuntime;
    plan(input: {
        kind?: AdvancedAgentKind | LegacyAdvancedAgentKind;
        objective: string;
        steps?: string[];
    }, context?: RequestContext): AdvancedAgentPlan;
    list(context?: RequestContext): import("./contracts.js").ListResult<AdvancedAgentPlan>;
    getObject(id: string, context?: RequestContext): AdvancedAgentPlan | undefined;
    executePlan(id: string, context?: RequestContext): Promise<AdvancedAgentPlan>;
    runAgent(kind: AdvancedAgentKind | LegacyAdvancedAgentKind, input: {
        message: string;
        objective?: string;
        agentId?: string;
        payload?: Record<string, unknown>;
    }, context?: RequestContext): Promise<{
        id: string;
        kind: AdvancedAgentKind;
        output: string;
        createdAt: string;
    }>;
    designOutput(input: {
        title: string;
        schema?: Record<string, unknown>;
        sample?: unknown;
    }, context?: RequestContext): {
        id: string;
        mode: string;
        title: string;
        editable: boolean;
        schema: Record<string, unknown>;
        sample: {} | null;
    };
    launcher: typeof import("./launcher.js").createConnectingmatrixAiAgentsAdvancedStubLauncher;
    health(): PackageHealth;
};
export declare const graphql: {
    namespace: string;
    typeDefs: string;
    resolvers: {
        Query: {
            advancedAgentPlans: (_: unknown, __: unknown, ctx: RequestContext) => AdvancedAgentPlan[];
            advancedAgentCatalog: () => {
                name: AdvancedAgentKind;
                description: string;
            }[];
            advancedAgentsLauncher: (_: unknown, __: unknown, ctx: RequestContext) => string;
        };
        Mutation: {
            advancedAgentPlan: (_: unknown, args: {
                kind?: AdvancedAgentKind | LegacyAdvancedAgentKind;
                objective: string;
            }, ctx: RequestContext) => AdvancedAgentPlan;
            advancedAgentExecute: (_: unknown, args: {
                id: string;
            }, ctx: RequestContext) => Promise<AdvancedAgentPlan>;
            advancedAgentRun: (_: unknown, args: {
                kind: AdvancedAgentKind | LegacyAdvancedAgentKind;
                message: string;
            }, ctx: RequestContext) => Promise<string>;
        };
    };
    migrations: string[];
};
export declare function createPackage(): PackageModule;
export * from './backend/agents/index.js';
export * from './contracts.js';
export * from './package-structure.js';
export * from './observability.js';
export * from './launcher.js';
