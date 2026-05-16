import type { AgentRunInput } from '@connectingmatrix/ai-agents';
export interface PlatformFixAgentInput extends AgentRunInput {
    objective?: string;
    payload?: Record<string, unknown>;
}
export declare const PlatformFixAgent: {
    name: string;
    description: string;
    run(input: PlatformFixAgentInput): Promise<string>;
};
