import type { AgentRunInput } from '@connectingmatrix/ai-agents';
export interface ProcessMonitorControlAgentInput extends AgentRunInput { objective?: string; payload?: Record<string, unknown>; }
export const ProcessMonitorControlAgent = {
  name: 'process-monitor-control-agent',
  description: 'Inspects process monitor state and recommends process abort/log actions.',
  async run(input: ProcessMonitorControlAgentInput): Promise<string> {
    return ['advanced-agent:process-monitor-control-agent', `objective: ${input.objective ?? input.message}`, input.payload ? `payload: ${JSON.stringify(input.payload)}` : '', `message: ${input.message}`].filter(Boolean).join('\n');
  },
};
