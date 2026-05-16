export interface AdvancedAgentRunInput { objective: string; context?: Record<string, unknown>; }
export interface AdvancedAgentRunOutput { agent: string; output: string; steps: string[]; metadata: Record<string, unknown>; }
export const planner_agent = {
  name: 'planner-agent',
  packageName: '@connectingmatrix/ai-agents-advanced',
  kind: 'advanced' as const,
  title: 'Planner Agent',
  description: 'Plans multi-step advanced tasks.',
  inputSchema: { type: 'object', required: ['objective'], properties: { objective: { type: 'string' }, context: { type: 'object' } } },
  outputSchema: { type: 'object', properties: { output: { type: 'string' }, steps: { type: 'array' } } },
  async run(input: AdvancedAgentRunInput): Promise<AdvancedAgentRunOutput> {
    const objective = input.objective.trim();
    return { agent: 'planner-agent', output: `Planner Agent completed: ${objective}`, steps: ['understand objective','inspect context','produce advanced output'], metadata: { usesCoreContract: '@connectingmatrix/ai-agents/agent-contracts' } };
  },
};
export default planner_agent;
