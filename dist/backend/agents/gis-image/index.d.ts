import type { AgentRunInput } from '@connectingmatrix/ai-agents';
export interface GisImageAgentInput extends AgentRunInput {
    objective?: string;
}
export declare const GisImageAgent: {
    name: string;
    description: string;
    run(input: GisImageAgentInput): Promise<string>;
};
