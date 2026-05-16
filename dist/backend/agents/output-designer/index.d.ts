import type { AgentRunInput } from '@connectingmatrix/ai-agents';
export interface OutputDesignerAgentInput extends AgentRunInput {
    objective?: string;
}
export declare const OutputDesignerAgent: {
    name: string;
    description: string;
    run(input: OutputDesignerAgentInput): Promise<string>;
};
