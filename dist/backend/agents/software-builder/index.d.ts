import type { AgentRunInput } from '@connectingmatrix/ai-agents';
export interface SoftwareBuilderAgentInput extends AgentRunInput {
    objective?: string;
}
export declare const SoftwareBuilderAgent: {
    name: string;
    description: string;
    run(input: SoftwareBuilderAgentInput): Promise<string>;
};
