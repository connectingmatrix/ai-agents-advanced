import { type PackageHealth, type PackageModule } from './contracts.js';
export interface AdvancedAgentPlanStep {
    id: string;
    title: string;
    status: 'todo' | 'running' | 'done';
    output?: string;
}
export interface AdvancedAgentPlan {
    id: string;
    objective: string;
    steps: AdvancedAgentPlanStep[];
    createdAt: string;
}
export declare const AdvancedAIAgents: {
    plan(objective: string): AdvancedAgentPlan;
    executePlan(plan: AdvancedAgentPlan, runner: (step: AdvancedAgentPlanStep) => Promise<string> | string): Promise<{
        steps: AdvancedAgentPlanStep[];
        id: string;
        objective: string;
        createdAt: string;
    }>;
    designOutput(markdown: string): {
        id: string;
        markdown: string;
        previewBlocks: string[];
        updatedAt: string;
    };
    health(): PackageHealth;
};
export declare const graphql: {
    namespace: string;
    typeDefs: string;
    resolvers: {
        Query: {
            advancedAiAgentsHealth: () => "ok" | "degraded" | "down";
        };
    };
    migrations: string[];
};
export declare function createPackage(): PackageModule;
export * from './contracts.js';
