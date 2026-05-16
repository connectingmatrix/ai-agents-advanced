import { deployGeneratedApp } from '../app-hosting';
import { identifyAdvancedGaps } from './runtime/gap-analysis';
import { createAgentTaskGraph } from './runtime/task-graph';
import { launchAdvancedSwarm, collectAdvancedSwarm, planAdvancedSwarm } from './runtime/swarm-v2';
import { createAdvancedSoftwareProject, queueAdvancedSoftwareRun, createAdvancedSoftwareDeployment } from './runtime/software-system-builder';
import { executeSoftwareDevelopmentProcess } from './software-development-process';
import { createGisOperationPlan, createWorldGisSpec, createCoordinatePlotSpec } from './runtime/gis-world-service';
import { createImageOperationSpec, createSpriteSheetSpec } from './runtime/image-operations-v2';
import { createPlatformFixPlan } from './runtime/platform-fix-v2';
import { buildAgentMemoryPreamble, searchAgentMemory, writeAgentMemory, recordAgentFeedback } from './runtime/memory-v2';
import { pairLocalRunner, heartbeatLocalRunner, queueLocalRunnerJob } from './runtime/local-runner-v2';
import { executeWorkflowAgent } from './workflow-agent';
import type { AdvancedAgentToolId, AdvancedAgentToolInput, GeneratedAppBuildInput } from '../contracts';

export * from './contracts/types';
export * from './runtime/output-protocol';
export * from './runtime/gap-analysis';
export * from './runtime/task-graph';
export * from './runtime/swarm-v2';
export * from './runtime/software-system-builder';
export * from './runtime/software-quality';
export * from './software-development-process';
export * from './runtime/gis-world-service';
export * from './runtime/image-operations-v2';
export * from './runtime/platform-fix-v2';
export * from './runtime/memory-v2';
export * from './runtime/local-runner-v2';
export * from './softwares';
export * from './runtime/workflow-control';
export * from './workflow-agent';

export const advancedToolIds = [
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
];

export async function executeAdvancedTool(id: AdvancedAgentToolId, input: AdvancedAgentToolInput) {
  if (id === 'agent.gaps') return { gaps: identifyAdvancedGaps(input) };
  if (id === 'agent.task_graph') return createAgentTaskGraph(input);
  if (id === 'agent.memory.search.v2') return { memories: await searchAgentMemory(input) };
  if (id === 'agent.memory.write.v2') return writeAgentMemory(input);
  if (id === 'agent.memory.feedback') return recordAgentFeedback(input);
  if (id === 'agent.memory.preamble') return buildAgentMemoryPreamble(input);
  if (id === 'agent.swarm.plan.v2') return planAdvancedSwarm(input);
  if (id === 'agent.swarm.v2') return launchAdvancedSwarm(input);
  if (id === 'agent.swarm.collect.v2') return collectAdvancedSwarm(input);
  if (id === 'agent.software.create.v2') return createAdvancedSoftwareProject(input);
  if (id === 'agent.software.development_process.v1') return executeSoftwareDevelopmentProcess(input);
  if (id === 'agent.software.run.v2') return queueAdvancedSoftwareRun(input);
  if (id === 'agent.software.host.v2') return createAdvancedSoftwareDeployment(input);
  if (id === 'agent.local_runner.pair.v2') return pairLocalRunner(input);
  if (id === 'agent.local_runner.heartbeat.v2') return heartbeatLocalRunner(input);
  if (id === 'agent.local_runner.job.v2') return queueLocalRunnerJob(input);
  if (id === 'agent.workflow') return executeWorkflowAgent(input);
  if (id === 'gis.world') return createWorldGisSpec(input);
  if (id === 'gis.coordinates') return createCoordinatePlotSpec(input);
  if (id === 'gis.operation.v2') return createGisOperationPlan(input);
  if (id === 'image.operation.v2') return createImageOperationSpec(input);
  if (id === 'image.sprite_sheet.v2') return createSpriteSheetSpec(input);
  if (id === 'agent.app.deploy') return deployGeneratedApp(input as GeneratedAppBuildInput);
  if (id === 'platform.fix.plan.v2') return createPlatformFixPlan(input);
  throw new Error(`Unknown advanced tool: ${id}`);
}
