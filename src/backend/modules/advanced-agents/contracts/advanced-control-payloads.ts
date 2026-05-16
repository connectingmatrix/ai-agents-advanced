export type AgentWorkflowToolInput = {
  workflowId?: string;
  executionId?: string;
  runId?: string;
  prompt?: string;
  message?: string;
  organizationId?: string;
  userId?: string;
  sourceFile?: string;
  target?: string;
  scenario?: string;
  bucket?: string;
  domain?: string;
  workflowKind?: string;
  first?: number;
  offset?: number;
  name?: string;
  description?: string;
  parentEntity?: string;
  parentId?: string;
  relation?: string;
};

export type AgentLocalRunnerToolInput = {
  runnerId?: string;
  hostId?: string;
  ownerType?: string;
  ownerId?: string;
  organizationId?: string;
  hostName?: string;
  port?: number;
  projectId?: string;
  jobKind?: string;
  risk?: string;
  command?: string;
  args?: string[];
};

export type AgentEntityToolInput = {
  operation?: string;
  entity?: string;
  id?: string;
  slug?: string;
  name?: string;
  title?: string;
  parentEntity?: string;
  parentId?: string;
  parentName?: string;
  childEntity?: string;
  childId?: string;
  childName?: string;
  relation?: string;
};
