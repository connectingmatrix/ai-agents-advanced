import type { AgentRunInput } from '@connectingmatrix/ai-agents';
export interface PlannerAgentInput extends AgentRunInput {
    objective?: string;
}
export declare const PlannerAgent: {
    name: string;
    description: string;
    run(input: PlannerAgentInput): Promise<string>;
};
