import type { AgentRunInput } from '@connectingmatrix/ai-agents';
export interface DataAnalystAgentInput extends AgentRunInput {
    objective?: string;
    payload?: Record<string, unknown>;
}
export declare const DataAnalystAgent: {
    name: string;
    description: string;
    run(input: DataAnalystAgentInput): Promise<string>;
};
