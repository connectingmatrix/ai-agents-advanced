import type { AgentRunInput } from '@connectingmatrix/ai-agents';
export interface MemoryAnalystAgentInput extends AgentRunInput {
    objective?: string;
}
export declare const MemoryAnalystAgent: {
    name: string;
    description: string;
    run(input: MemoryAnalystAgentInput): Promise<string>;
};
