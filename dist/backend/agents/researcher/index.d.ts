import type { AgentRunInput } from '@connectingmatrix/ai-agents';
export interface ResearcherAgentInput extends AgentRunInput {
    objective?: string;
}
export declare const ResearcherAgent: {
    name: string;
    description: string;
    run(input: ResearcherAgentInput): Promise<string>;
};
