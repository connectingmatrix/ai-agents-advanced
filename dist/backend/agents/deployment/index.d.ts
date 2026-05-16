import type { AgentRunInput } from '@connectingmatrix/ai-agents';
export interface DeploymentAgentInput extends AgentRunInput {
    objective?: string;
}
export declare const DeploymentAgent: {
    name: string;
    description: string;
    run(input: DeploymentAgentInput): Promise<string>;
};
