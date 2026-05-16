import type { AgentRunInput } from '@connectingmatrix/ai-agents';
export interface PlannerAgentInput extends AgentRunInput { objective?: string; payload?: Record<string, unknown>; }
export const PlannerAgent = {
  name: 'planner-agent',
  description: 'Plans multi-step tasks and validates execution shape.',
  async run(input: PlannerAgentInput): Promise<string> {
    return ['advanced-agent:planner-agent', `objective: ${input.objective ?? input.message}`, input.payload ? `payload: ${JSON.stringify(input.payload)}` : '', `message: ${input.message}`].filter(Boolean).join('\n');
  },
};
