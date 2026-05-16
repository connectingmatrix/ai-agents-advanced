export interface AdvancedAgentsClient {
  bindWithServer(endpoint: string): AdvancedAgentsClient;
  listPlans(): Promise<unknown>;
  createPlan(input: { kind?: string; objective: string }): Promise<unknown>;
  executePlan(id: string): Promise<unknown>;
}
let endpoint = '/graphql';
export const AdvancedAgentsLoader: AdvancedAgentsClient = {
  bindWithServer(next: string) { endpoint = next; return AdvancedAgentsLoader; },
  async listPlans() { return { endpoint, query: 'advancedAgentPlans' }; },
  async createPlan(input) { return { endpoint, mutation: 'advancedAgentPlan', input }; },
  async executePlan(id) { return { endpoint, mutation: 'advancedAgentExecute', id }; },
};
