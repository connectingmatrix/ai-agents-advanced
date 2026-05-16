import type { AgentRunInput } from '@connectingmatrix/ai-agents';
export interface DataAnalystAgentInput extends AgentRunInput { objective?: string; payload?: Record<string, unknown>; }
export const DataAnalystAgent = {
  name: 'data-analyst-agent',
  description: 'Analyzes connected databases, query results, runtime logs, and project telemetry.',
  async run(input: DataAnalystAgentInput): Promise<string> {
    return ['advanced-agent:data-analyst-agent', `objective: ${input.objective ?? input.message}`, input.payload ? `payload: ${JSON.stringify(input.payload)}` : '', `message: ${input.message}`].filter(Boolean).join('\n');
  },
};
