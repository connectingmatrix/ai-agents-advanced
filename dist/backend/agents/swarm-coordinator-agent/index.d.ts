import type { AgentRunInput } from '@connectingmatrix/ai-agents';
export interface SwarmCoordinatorAgentInput extends AgentRunInput {
    objective?: string;
    payload?: Record<string, unknown>;
}
export declare const SwarmCoordinatorAgent: {
    name: string;
    description: string;
    run(input: SwarmCoordinatorAgentInput): Promise<string>;
};
