export interface AdvancedAgentCardModel { name: string; description: string; status?: string; }
export const renderAdvancedAgentCard = (card: AdvancedAgentCardModel) => `${card.name}: ${card.description}`;
