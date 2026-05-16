export type AgentMemoryToolInput = {
  agentId?: string;
  userId?: string;
  organizationId?: string;
  sessionId?: string;
  content?: string;
  query?: string;
  kind?: string;
  scopeType?: string;
  scopeId?: string;
  importance?: number;
  rating?: number;
  comment?: string;
  limit?: number;
};

export type AgentSwarmToolInput = {
  agentId?: string;
  ownerType?: string;
  ownerId?: string;
  organizationId?: string;
  chatId?: string;
  goal?: string;
  message?: string;
  prompt?: string;
  roles?: string[];
  swarmId?: string;
};

export type AgentSoftwareToolInput = {
  agentId?: string;
  userId?: string;
  organizationId?: string;
  chatId?: string;
  name?: string;
  prompt?: string;
  modules?: string[];
  local?: boolean;
  port?: number;
  projectId?: string;
  command?: string;
  runner?: string;
  deploymentKind?: string;
  localRunnerId?: string;
  url?: string;
  extractionMode?: 'deterministic' | 'llm';
};
