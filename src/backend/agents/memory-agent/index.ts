import type { AgentRunInput } from '@connectingmatrix/ai-agents';
export interface MemoryAgentInput extends AgentRunInput { objective?: string; payload?: Record<string, unknown>; }
export const MemoryAgent = {
  name: 'memory-agent',
  description: 'Analyzes memory files and recommends ingestion modes, summaries, and context trimming.',
  async run(input: MemoryAgentInput): Promise<string> {
    return ['advanced-agent:memory-agent', `objective: ${input.objective ?? input.message}`, input.payload ? `payload: ${JSON.stringify(input.payload)}` : '', `message: ${input.message}`].filter(Boolean).join('\n');
  },
};
