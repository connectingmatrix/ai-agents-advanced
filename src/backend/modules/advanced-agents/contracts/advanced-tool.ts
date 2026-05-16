import { parseRecordValue } from 'giga-ai-helper/workflow';
import type { AgentEntityToolInput, AgentLocalRunnerToolInput, AgentWorkflowToolInput } from '../io/advanced-control-payloads';
import type { AgentGisToolInput, AgentImageToolInput } from '../io/advanced-media-payloads';
import type { AgentMemoryToolInput, AgentSoftwareToolInput, AgentSwarmToolInput } from '../io/advanced-planning-payloads';
import type { GeneratedAppBuildInput } from './runtime';

const advancedToolIds = [
  'agent.gaps',
  'agent.task_graph',
  'agent.memory.search.v2',
  'agent.memory.write.v2',
  'agent.memory.feedback',
  'agent.memory.preamble',
  'agent.swarm.plan.v2',
  'agent.swarm.v2',
  'agent.swarm.collect.v2',
  'agent.software.create.v2',
  'agent.software.development_process.v1',
  'agent.software.run.v2',
  'agent.software.host.v2',
  'agent.local_runner.pair.v2',
  'agent.local_runner.heartbeat.v2',
  'agent.local_runner.job.v2',
  'agent.workflow',
  'gis.world',
  'gis.coordinates',
  'gis.operation.v2',
  'image.operation.v2',
  'image.sprite_sheet.v2',
  'agent.app.deploy',
  'platform.fix.plan.v2',
] as const;
const toolSlot = ['memory', 'swarm', 'software', 'gis', 'image', 'workflow', 'localRunner', 'entity', 'app'] as const;

export type AdvancedAgentToolId = (typeof advancedToolIds)[number];
export type AdvancedAgentToolInput = (
  | AgentMemoryToolInput
  | AgentSwarmToolInput
  | AgentSoftwareToolInput
  | AgentGisToolInput
  | AgentImageToolInput
  | AgentWorkflowToolInput
  | AgentLocalRunnerToolInput
  | AgentEntityToolInput
  | GeneratedAppBuildInput
) & { operation?: string; confirmed?: boolean };

const slotByTool: Record<AdvancedAgentToolId, (typeof toolSlot)[number]> = {
  'agent.gaps': 'workflow',
  'agent.task_graph': 'workflow',
  'agent.memory.search.v2': 'memory',
  'agent.memory.write.v2': 'memory',
  'agent.memory.feedback': 'memory',
  'agent.memory.preamble': 'memory',
  'agent.swarm.plan.v2': 'swarm',
  'agent.swarm.v2': 'swarm',
  'agent.swarm.collect.v2': 'swarm',
  'agent.software.create.v2': 'software',
  'agent.software.development_process.v1': 'software',
  'agent.software.run.v2': 'software',
  'agent.software.host.v2': 'software',
  'agent.local_runner.pair.v2': 'localRunner',
  'agent.local_runner.heartbeat.v2': 'localRunner',
  'agent.local_runner.job.v2': 'localRunner',
  'agent.workflow': 'workflow',
  'gis.world': 'gis',
  'gis.coordinates': 'gis',
  'gis.operation.v2': 'gis',
  'image.operation.v2': 'image',
  'image.sprite_sheet.v2': 'image',
  'agent.app.deploy': 'app',
  'platform.fix.plan.v2': 'workflow',
};

export function readAdvancedToolRequest(input: { tool: string; operation?: string | null; input?: unknown; confirmed?: boolean | null }) {
  if (!advancedToolIds.includes(input.tool as AdvancedAgentToolId)) throw new Error(`Unsupported advanced tool: ${input.tool}`);
  const tool = input.tool as AdvancedAgentToolId;
  const payload = parseRecordValue(input.input);
  const populated: string[] = [];
  for (const slot of toolSlot) if (payload[slot] !== undefined) populated.push(slot);
  if (populated.length !== 1) throw new Error('advanced tool input must contain exactly one typed payload slot.');
  if (populated[0] !== slotByTool[tool]) throw new Error(`${tool} requires input.${slotByTool[tool]}.`);
  return {
    tool,
    input: {
      ...parseRecordValue(payload[populated[0]]),
      operation: input.operation ?? undefined,
      confirmed: input.confirmed === true,
    } as AdvancedAgentToolInput,
  };
}
