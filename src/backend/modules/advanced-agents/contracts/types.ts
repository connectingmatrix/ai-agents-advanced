import { softwareDatabases, softwareFrameworks, softwareOrms } from '../softwares';

export type AdvancedRisk = 'none' | 'write' | 'destructive' | 'admin' | 'external-network' | 'local-computer' | 'package-install' | 'long-running';

export type AdvancedAgentMode = 'chat' | 'workflow' | 'swarm' | 'local-runner' | 'platform-fix';

export type AdvancedAgentTaskStatus = 'pending' | 'running' | 'waiting_for_user' | 'blocked' | 'failed' | 'done' | 'cancelled';

export type AdvancedAgentTask = {
  id: string;
  title: string;
  description?: string;
  status: AdvancedAgentTaskStatus;
  ownerRole?: string;
  dependsOn?: string[];
  toolHints?: string[];
  expectedOutput?: string;
  evidence?: string[];
  risk?: AdvancedRisk;
};

export type AdvancedTaskGraph = {
  id: string;
  goal: string;
  mode: AdvancedAgentMode;
  tasks: AdvancedAgentTask[];
  artifacts: Array<{ id: string; kind: string; title?: string; uri?: string; metadata?: Record<string, unknown> }>;
  warnings: string[];
  confirmationRequired: boolean;
  confirmationReason?: string;
  createdAt: string;
  updatedAt: string;
};

export type AdvancedCapabilityContract = {
  id: string;
  kind:
    | 'agent'
    | 'chart'
    | 'chat'
    | 'code'
    | 'control'
    | 'database'
    | 'entity'
    | 'excel'
    | 'file'
    | 'knowledge'
    | 'llm'
    | 'node'
    | 'tree'
    | 'workflow';
  title: string;
  description: string;
  inputSchema: Record<string, unknown>;
  outputSchema: Record<string, unknown>;
  mutation: 'none' | 'safe' | 'write' | 'destructive' | 'admin';
  risk: AdvancedRisk;
  requiresConfirmation: boolean;
  executeBackendTool: string;
  examples: Array<{ message: string; input: Record<string, unknown> }>;
};

export type AdvancedSoftwareFile = { path: string; content: string; kind?: 'ts' | 'tsx' | 'json' | 'sql' | 'md' | 'css' | 'html' | 'js' | 'txt' };

export type AdvancedSoftwareSystemSpec = {
  id: string;
  name: string;
  slug: string;
  prompt: string;
  framework: (typeof softwareFrameworks)[number];
  database: (typeof softwareDatabases)[number];
  orm: (typeof softwareOrms)[number];
  files: AdvancedSoftwareFile[];
  commands: Array<{ name: string; command: string; args: string[]; risk: AdvancedRisk }>;
  runner: { mode: 'sandbox' | 'local-runner'; port?: number; url?: string };
  metadata: Record<string, unknown>;
};

export type AdvancedGisSpec = {
  id: string;
  type: 'world' | 'country' | 'coordinates' | 'choropleth' | 'route' | 'buffer' | 'heatmap' | 'hexbin';
  title: string;
  projection: 'mercator' | 'natural-earth' | 'equal-earth';
  country?: string;
  geojsonUrl?: string;
  data: Array<Record<string, unknown>>;
  coordinateFields?: { longitude: string; latitude: string; label?: string; value?: string };
  style: { colorScale: 'blue' | 'red' | 'green' | 'viridis' | 'diverging'; labelField?: string; valueField?: string; legendTitle?: string };
  operations: Array<{ name: string; args: Record<string, unknown> }>;
};

export type AdvancedImageOperationSpec = {
  id: string;
  operation: 'edit' | 'resize' | 'crop' | 'mask' | 'background-remove' | 'sprite-sheet' | 'annotate' | 'upscale' | 'compose';
  sourceUri?: string;
  prompt?: string;
  outputFormat: 'png' | 'jpg' | 'webp' | 'svg';
  artifacts: Array<{ path: string; title: string; metadata?: Record<string, unknown> }>;
  requiresExecutor: boolean;
};
