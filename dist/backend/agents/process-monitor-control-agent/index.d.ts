import type { AgentRunInput } from '@connectingmatrix/ai-agents';
export interface ProcessMonitorControlAgentInput extends AgentRunInput {
    objective?: string;
    payload?: Record<string, unknown>;
}
export declare const ProcessMonitorControlAgent: {
    name: string;
    description: string;
    run(input: ProcessMonitorControlAgentInput): Promise<string>;
};
