import type { AgentRunInput } from '@connectingmatrix/ai-agents';
export interface MemoryAgentInput extends AgentRunInput {
    objective?: string;
    payload?: Record<string, unknown>;
}
export declare const MemoryAgent: {
    name: string;
    description: string;
    run(input: MemoryAgentInput): Promise<string>;
};
