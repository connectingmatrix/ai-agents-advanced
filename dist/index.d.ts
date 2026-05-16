import { type BaseRecord } from './entity/repository.js';
import { type PackageHealth, type PackageModule, type RequestContext } from './contracts.js';
import { createPackageStatusPanel } from './services/package-status.service.js';
export type AdvancedAgentKind = 'planner-agent' | 'researcher-agent' | 'software-builder-agent' | 'deployment-agent' | 'memory-agent' | 'output-designer-agent' | 'image-gis-agent' | 'data-analyst-agent' | 'platform-fix-agent' | 'process-monitor-control-agent' | 'swarm-coordinator-agent';
export interface AdvancedAgentPlan extends BaseRecord {
    kind: AdvancedAgentKind;
    objective: string;
    steps: string[];
    status: 'planned' | 'running' | 'completed';
    output?: string;
}
export declare const AdvancedAIAgents: {
    bindLogger(logger: unknown): /*elided*/ any;
    bindSockets(sockets: unknown): /*elided*/ any;
    setRunner(adapter: (plan: AdvancedAgentPlan, context: RequestContext) => Promise<string>): /*elided*/ any;
    agents(): {
        name: string;
        packageName: string;
        kind: "advanced";
        title: string;
        description: string;
        inputSchema: {
            type: string;
            required: string[];
            properties: {
                objective: {
                    type: string;
                };
                context: {
                    type: string;
                };
            };
        };
        outputSchema: {
            type: string;
            properties: {
                output: {
                    type: string;
                };
                steps: {
                    type: string;
                };
            };
        };
        run(input: import("./backend/agents/planner-agent/index.js").AdvancedAgentRunInput): Promise<import("./backend/agents/planner-agent/index.js").AdvancedAgentRunOutput>;
    }[];
    plan(input: {
        kind?: AdvancedAgentKind;
        objective: string;
        steps?: string[];
    }, context?: RequestContext): AdvancedAgentPlan;
    list(context?: RequestContext): import("./contracts.js").ListResult<AdvancedAgentPlan>;
    getObject(id: string, context?: RequestContext): AdvancedAgentPlan;
    executePlan(id: string, context?: RequestContext): Promise<AdvancedAgentPlan>;
    runAgent(name: string, input: {
        objective: string;
        context?: Record<string, unknown>;
    }, context?: RequestContext): Promise<import("./backend/agents/planner-agent/index.js").AdvancedAgentRunOutput>;
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
        sample: unknown;
    };
    launcher: typeof createPackageStatusPanel;
    health(): PackageHealth;
};
export declare const graphql: {
    namespace: string;
    typeDefs: string;
    resolvers: {
        Query: {
            advancedAgentPlans: (_: unknown, __: unknown, ctx: RequestContext) => AdvancedAgentPlan[];
            advancedAgentsLauncher: (_: unknown, __: unknown, ctx: RequestContext) => string;
        };
        Mutation: {
            advancedAgentPlan: (_: unknown, args: {
                kind?: AdvancedAgentKind;
                objective: string;
            }, ctx: RequestContext) => AdvancedAgentPlan;
            advancedAgentExecute: (_: unknown, args: {
                id: string;
            }, ctx: RequestContext) => Promise<AdvancedAgentPlan>;
        };
    };
    migrations: string[];
};
export declare function createPackage(): PackageModule;
export * from './contracts.js';
export * from './package-structure.js';
export * from './services/package-status.service.js';
export * from './backend/agents/index.js';
