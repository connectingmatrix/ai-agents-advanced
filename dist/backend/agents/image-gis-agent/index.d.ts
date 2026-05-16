import type { AgentRunInput } from '@connectingmatrix/ai-agents';
export interface ImageGisAgentInput extends AgentRunInput {
    objective?: string;
    payload?: Record<string, unknown>;
}
export declare const ImageGisAgent: {
    name: string;
    description: string;
    run(input: ImageGisAgentInput): Promise<string>;
};
