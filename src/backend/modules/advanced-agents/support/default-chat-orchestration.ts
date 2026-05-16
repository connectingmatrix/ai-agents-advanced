import { createAgentTaskGraph } from './task-graph';
import type { AdvancedAgentTask, AdvancedTaskGraph } from '../contracts/types';

export type ChatDefaultOrchestrationMode = 'DEFAULT' | 'SWARM';
export type ChatDefaultDecisionKind =
  | 'answer_directly'
  | 'research_then_answer'
  | 'execute_entity_action'
  | 'create_or_execute_workflow'
  | 'create_ai_agent_project'
  | 'create_node'
  | 'invoke_advanced_ai_agent'
  | 'escalate_to_swarm';

export type ChatDefaultSubagent = {
  id: string;
  role: string;
  advanced: boolean;
  taskIds: string[];
  taskTitles: string[];
  responsibilities: string[];
  output: string;
};

export type ChatDefaultPlannerSession = {
  id: string;
  title: string;
  kind: 'research' | 'long_planning' | 'confirmation' | 'execution';
  ownerRole: string;
  inputs: string[];
  outputs: string[];
  status: 'planned' | 'waiting_for_confirmation' | 'ready';
};

export type ChatDefaultDecision = {
  kind: ChatDefaultDecisionKind;
  label: string;
  reason: string;
  advancedToolId: string | null;
  canCreateEntities: boolean;
  canCreateWorkflow: boolean;
  canCreateProject: boolean;
  canCreateNode: boolean;
  canInvokeAdvancedAgent: boolean;
  canInvokeSwarm: boolean;
};

export type ChatDefaultPlanLimits = {
  maxDefaultSubagents?: number | null;
  maxSwarmSize?: number | null;
};

export type ChatDefaultOrchestration = {
  mode: ChatDefaultOrchestrationMode;
  goal: string;
  limits: { min: number; max: number; selected: number };
  downstreamSwarmAgents: number;
  downstreamSwarmRange: string;
  graph: AdvancedTaskGraph;
  subagents: ChatDefaultSubagent[];
  plannerSessions: ChatDefaultPlannerSession[];
  decision: ChatDefaultDecision;
  requiresConfirmation: boolean;
  confirmationReason: string | null;
  mermaid: string;
  warnings: string[];
};

const DEFAULT_MIN = 1;
const DEFAULT_MAX = 5;
const SWARM_MIN = 10;
const SWARM_MAX = 100;

const text = (value: unknown): string => String(value ?? '').trim();
const lower = (value: unknown): string => text(value).toLowerCase();
const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, Math.floor(Number.isFinite(value) ? value : min)));
const words = (value: string) => lower(value).split(/[^a-z0-9]+/).filter((item) => item.length > 2);

const unique = <T>(items: T[]): T[] => Array.from(new Set(items));

function asNumber(value: unknown): number | null {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function requestedAgentCount(input: Record<string, unknown>): number | null {
  return (
    asNumber(input.requestedAgents) ||
    asNumber(input.requested_agents) ||
    asNumber(input.agentCount) ||
    asNumber(input.agent_count) ||
    asNumber(input.workerCount) ||
    asNumber(input.worker_count) ||
    null
  );
}

function taskComplexity(goal: string): number {
  let score = Math.ceil(words(goal).length / 30);
  if (/workflow|node|agent|project|database|sqlite|duckdb|deploy|publish|build|test|validate/i.test(goal)) score += 1;
  if (/research|compare|analy[sz]e|plan|architecture|complex|advanced|multi|entire|full/i.test(goal)) score += 1;
  if (/create|update|delete|run|execute|launch|deploy|publish|write/i.test(goal)) score += 1;
  return clamp(score, 1, 5);
}

function selectedSwarmCount(input: Record<string, unknown>, taskCount: number) {
  const planLimits = (input.limits && typeof input.limits === 'object' ? input.limits : {}) as ChatDefaultPlanLimits;
  const rawMax = Number(planLimits.maxSwarmSize ?? SWARM_MAX);
  const max = Number.isFinite(rawMax) ? Math.max(0, Math.min(SWARM_MAX, Math.floor(rawMax))) : SWARM_MAX;
  if (max < SWARM_MIN) return { min: 0, max, selected: 0, range: 'disabled' };
  const requested = requestedAgentCount(input) || Math.max(SWARM_MIN, taskCount * 2);
  return { min: SWARM_MIN, max, selected: clamp(requested, SWARM_MIN, max), range: `${SWARM_MIN}-${max}` };
}

function selectedCount(input: Record<string, unknown>, mode: ChatDefaultOrchestrationMode, taskCount: number) {
  if (mode === 'SWARM') {
    const swarm = selectedSwarmCount(input, taskCount);
    return { min: swarm.min, max: swarm.max, selected: swarm.selected };
  }
  const planLimits = (input.limits && typeof input.limits === 'object' ? input.limits : {}) as ChatDefaultPlanLimits;
  const max = clamp(Number(planLimits.maxDefaultSubagents || DEFAULT_MAX), DEFAULT_MIN, DEFAULT_MAX);
  const requested = requestedAgentCount(input) || taskComplexity(text(input.goal || input.message || input.prompt));
  return { min: DEFAULT_MIN, max, selected: clamp(requested, DEFAULT_MIN, max) };
}

function classifyDecision(goal: string, mode: ChatDefaultOrchestrationMode): ChatDefaultDecision {
  const value = lower(goal);
  if (mode === 'SWARM') {
    return {
      kind: 'escalate_to_swarm',
      label: 'Swarm implementation route',
      reason: 'Swarm mode uses the same Default Chat router but raises the first worker pool from 1-5 to 10-100 and permits advanced-agent workers.',
      advancedToolId: 'agent.swarm.v2',
      canCreateEntities: true,
      canCreateWorkflow: true,
      canCreateProject: true,
      canCreateNode: true,
      canInvokeAdvancedAgent: true,
      canInvokeSwarm: true,
    };
  }
  if (/swarm|many agents|multi-agent|multi agent|parallel agents/i.test(value)) {
    return {
      kind: 'escalate_to_swarm',
      label: 'Escalate Default mode to Swarm',
      reason: 'The request asks for broad parallel delegation beyond the Default 1-5 subagent limit.',
      advancedToolId: 'agent.swarm.v2',
      canCreateEntities: true,
      canCreateWorkflow: true,
      canCreateProject: true,
      canCreateNode: true,
      canInvokeAdvancedAgent: true,
      canInvokeSwarm: true,
    };
  }
  if (/workflow|publish|automation|automate|run workflow|execute workflow/i.test(value)) {
    return {
      kind: 'create_or_execute_workflow',
      label: 'Workflow route',
      reason: 'The request needs a workflow graph, workflow validation, or workflow execution.',
      advancedToolId: 'agent.workflow',
      canCreateEntities: false,
      canCreateWorkflow: true,
      canCreateProject: false,
      canCreateNode: /node|custom/i.test(value),
      canInvokeAdvancedAgent: true,
      canInvokeSwarm: /complex|large|multi|entire/i.test(value),
    };
  }
  if (/node|\.node|node designer|custom node|validate node|build node|run node/i.test(value)) {
    return {
      kind: 'create_node',
      label: 'Node Designer route',
      reason: 'The request needs a reusable workflow node artifact or node validation/run operation.',
      advancedToolId: 'agent.workflow',
      canCreateEntities: false,
      canCreateWorkflow: false,
      canCreateProject: false,
      canCreateNode: true,
      canInvokeAdvancedAgent: true,
      canInvokeSwarm: /complex|large|multi/i.test(value),
    };
  }
  if (/project|app|software|sqlite|duckdb|documentdb|graph db|database app|deploy|build|preview|ui kit/i.test(value)) {
    return {
      kind: 'create_ai_agent_project',
      label: 'AI-Agent Project route',
      reason: 'The request needs generated project files, file-driven DB planning, preview, build, or deployment.',
      advancedToolId: 'agent.software.create.v2',
      canCreateEntities: false,
      canCreateWorkflow: /workflow/i.test(value),
      canCreateProject: true,
      canCreateNode: /node/i.test(value),
      canInvokeAdvancedAgent: true,
      canInvokeSwarm: /complex|large|entire|full/i.test(value),
    };
  }
  if (/agent|advanced agent|ai agent|tool policy|ingestion|skill|manifest/i.test(value)) {
    return {
      kind: 'invoke_advanced_ai_agent',
      label: 'Advanced AI Agent route',
      reason: 'The request needs an AI Agent capability, ingestion policy, skill, tool policy, or advanced agent runtime.',
      advancedToolId: 'agent.task_graph',
      canCreateEntities: false,
      canCreateWorkflow: /workflow/i.test(value),
      canCreateProject: /project|software/i.test(value),
      canCreateNode: /node/i.test(value),
      canInvokeAdvancedAgent: true,
      canInvokeSwarm: /swarm|complex|large|multi/i.test(value),
    };
  }
  if (/create|update|delete|link|move|rename|execute|run|alter/i.test(value) && /channel|category|subject|post|tree|entity|file|folder/i.test(value)) {
    return {
      kind: 'execute_entity_action',
      label: 'Entity/action route',
      reason: 'The request can be satisfied by scoped entity, tree, file, or folder operations after confirmation.',
      advancedToolId: null,
      canCreateEntities: true,
      canCreateWorkflow: false,
      canCreateProject: false,
      canCreateNode: false,
      canInvokeAdvancedAgent: false,
      canInvokeSwarm: false,
    };
  }
  if (/research|lookup|compare|explain|summari[sz]e|investigate|long plan|planning/i.test(value)) {
    return {
      kind: 'research_then_answer',
      label: 'Research and planning route',
      reason: 'The request benefits from a research/planning subagent before a final answer.',
      advancedToolId: null,
      canCreateEntities: false,
      canCreateWorkflow: false,
      canCreateProject: false,
      canCreateNode: false,
      canInvokeAdvancedAgent: false,
      canInvokeSwarm: false,
    };
  }
  return {
    kind: 'answer_directly',
    label: 'Direct LLM plan-and-answer route',
    reason: 'No workflow, agent, entity mutation, project, or node action is required.',
    advancedToolId: null,
    canCreateEntities: false,
    canCreateWorkflow: false,
    canCreateProject: false,
    canCreateNode: false,
    canInvokeAdvancedAgent: false,
    canInvokeSwarm: false,
  };
}

function roleForTask(task: AdvancedAgentTask, decision: ChatDefaultDecision): string {
  const owner = text(task.ownerRole);
  if (owner) return owner;
  if (decision.kind === 'create_ai_agent_project') return 'software-builder';
  if (decision.kind === 'create_or_execute_workflow') return 'workflow-builder';
  if (decision.kind === 'create_node') return 'node-designer';
  if (decision.kind === 'invoke_advanced_ai_agent') return 'advanced-agent-router';
  if (decision.kind === 'execute_entity_action') return 'entity-action-agent';
  return 'planner';
}

function subagentsFromGraph(graph: AdvancedTaskGraph, count: number, decision: ChatDefaultDecision, mode: ChatDefaultOrchestrationMode) {
  const tasks = graph.tasks.length ? graph.tasks : [{ id: 't1', title: graph.goal, ownerRole: 'planner' } as AdvancedAgentTask];
  const roles = unique(tasks.map((task) => roleForTask(task, decision)));
  const expandedRoles: string[] = [];
  for (let index = 0; index < count; index += 1) expandedRoles.push(roles[index % roles.length] || 'planner');
  return expandedRoles.map((role, index) => {
    let assigned = tasks.filter((task) => roleForTask(task, decision) === role);
    if (!assigned.length) assigned = [tasks[index % tasks.length]];
    return {
      id: `${mode.toLowerCase()}-subagent-${index + 1}`,
      role,
      advanced: mode === 'SWARM' || /advanced|software|workflow|node|swarm|platform|data|gis|image|runner/i.test(role),
      taskIds: assigned.map((task) => task.id),
      taskTitles: assigned.map((task) => task.title),
      responsibilities: responsibilitiesFor(role, decision),
      output: outputFor(role, decision),
    } satisfies ChatDefaultSubagent;
  });
}

function responsibilitiesFor(role: string, decision: ChatDefaultDecision): string[] {
  const base = ['Load only authorized context for the current chat scope.', 'Return evidence, not private chain-of-thought.'];
  if (/planner/.test(role)) return [...base, 'Build the plan, risk rating, and confirmation gate.'];
  if (/context|research/.test(role)) return [...base, 'Research available files, docs, memory, entities, and workflow/node capabilities.'];
  if (/workflow/.test(role)) return [...base, 'Create, validate, run, or repair workflow graphs before publish.'];
  if (/node/.test(role)) return [...base, 'Build .node manifests, validation fixtures, and run contracts.'];
  if (/software|project/.test(role)) return [...base, 'Create project files using Software Builder context and UI Kit markdown snippets.'];
  if (/swarm/.test(role)) return [...base, 'Delegate to bounded specialist workers and collect outputs.'];
  if (/data/.test(role)) return [...base, 'Profile file shape, ingestion mode, DB strategy, and analytics/model options.'];
  return [...base, `Handle ${decision.label.toLowerCase()} work for assigned task ids.`];
}

function outputFor(role: string, decision: ChatDefaultDecision) {
  if (/planner/.test(role)) return 'Plan, risk, required confirmation, and next executable tool.';
  if (/workflow/.test(role)) return 'Workflow graph, validation output, run logs, and publish eligibility.';
  if (/node/.test(role)) return '.node artifact, validation result, and run result.';
  if (/software|project/.test(role)) return 'Project file tree, UI Kit reuse map, DB plan, build/deploy plan, and preview artifacts.';
  if (/swarm/.test(role)) return 'Worker ledger, worker outputs, verifier output, and process-monitor ids.';
  return `${decision.label} evidence packet and final response contribution.`;
}

function plannerSessions(graph: AdvancedTaskGraph, subagents: ChatDefaultSubagent[], decision: ChatDefaultDecision, requiresConfirmation: boolean) {
  const researchOwners = subagents.filter((agent) => /context|research|data|workflow|software|node/.test(agent.role)).slice(0, 3);
  const sessions: ChatDefaultPlannerSession[] = [
    {
      id: 'planner-session-1',
      title: 'Intent, scope, permissions, and task graph',
      kind: 'long_planning',
      ownerRole: subagents[0]?.role || 'planner',
      inputs: ['user message', 'chat scope', 'plan/policy limits', 'available tool catalog'],
      outputs: ['decision route', 'subagent work packets', 'risk rating'],
      status: 'ready',
    },
  ];
  for (const agent of researchOwners) {
    sessions.push({
      id: `planner-session-${sessions.length + 1}`,
      title: `Research packet for ${agent.role}`,
      kind: 'research',
      ownerRole: agent.role,
      inputs: ['authorized drive/tree/docs', 'agent memory', 'workflow/node catalog', 'UI Kit markdown when software is involved'],
      outputs: [`evidence for ${agent.taskIds.join(', ') || graph.id}`],
      status: 'ready',
    });
  }
  if (requiresConfirmation) {
    sessions.push({
      id: `planner-session-${sessions.length + 1}`,
      title: 'Confirmation and execution gate',
      kind: 'confirmation',
      ownerRole: 'planner',
      inputs: [decision.reason, 'risk level', 'mutating outputs'],
      outputs: ['confirm/cancel prompt', 'pending plan stored on chat session'],
      status: 'waiting_for_confirmation',
    });
  }
  return sessions;
}

function needsConfirmation(decision: ChatDefaultDecision, graph: AdvancedTaskGraph, mode: ChatDefaultOrchestrationMode) {
  if (mode === 'SWARM') return true;
  if (decision.kind === 'answer_directly' || decision.kind === 'research_then_answer') return false;
  if (decision.kind === 'escalate_to_swarm') return true;
  return graph.confirmationRequired || decision.canCreateEntities || decision.canCreateWorkflow || decision.canCreateProject || decision.canCreateNode;
}

function mermaidFor(orchestration: Omit<ChatDefaultOrchestration, 'mermaid'>) {
  const lines = [
    'flowchart TD',
    '  U[User message] --> R[Default Chat Router]',
    `  R --> S[${orchestration.mode === 'SWARM' ? '10-100' : '1-5'} subagent planner]`,
    '  S --> P[Planner sessions]',
    `  P --> D{${orchestration.decision.label.replace(/[{}\[\]]/g, '')}}`,
  ];
  for (const agent of orchestration.subagents.slice(0, 12)) {
    const id = agent.id.replace(/[^a-zA-Z0-9_]/g, '_');
    lines.push(`  S --> ${id}[${agent.role}: ${agent.taskIds.length} task(s)]`);
    lines.push(`  ${id} --> D`);
  }
  if (orchestration.decision.canInvokeAdvancedAgent) lines.push('  D --> ADV[Advanced AI Agent tool]');
  if (orchestration.decision.canInvokeSwarm || orchestration.decision.kind === 'escalate_to_swarm') lines.push(`  ADV --> SW[Advanced Swarm workers: ${orchestration.downstreamSwarmAgents || 'disabled'}]`);
  if (orchestration.requiresConfirmation) lines.push('  D --> C{User confirmation required}', '  C -->|confirm| X[Execute approved route]', '  C -->|cancel| N[Discard pending plan]');
  else lines.push('  D --> X[Answer or safe read-only execution]');
  lines.push('  X --> M[Process Monitor + final response]');
  return `${lines.join('\n')}\n`;
}

export function buildDefaultChatOrchestration(input: Record<string, unknown>): ChatDefaultOrchestration {
  const mode: ChatDefaultOrchestrationMode = text(input.mode).toUpperCase() === 'SWARM' ? 'SWARM' : 'DEFAULT';
  const goal = text(input.goal || input.message || input.prompt || 'Answer the user request.');
  let decision = classifyDecision(goal, mode);
  const graph = createAgentTaskGraph({ ...input, goal, mode: mode === 'SWARM' ? 'swarm' : 'chat', confirmed: input.confirmed === true });
  const limits = selectedCount(input, mode, graph.tasks.length);
  const downstreamSwarm = selectedSwarmCount(input, graph.tasks.length);
  if (decision.kind === 'escalate_to_swarm' && downstreamSwarm.selected < 10) {
    decision = {
      ...decision,
      kind: 'invoke_advanced_ai_agent',
      label: 'Advanced AI Agent route with Swarm disabled by plan',
      reason: 'The request asks for swarm-scale execution, but the current plan has SWARM_SIZE_LIMIT below 10. Default mode can still invoke an Advanced AI Agent without launching Swarm workers.',
      advancedToolId: 'agent.task_graph',
      canInvokeSwarm: false,
    };
  }
  const subagents = subagentsFromGraph(graph, limits.selected, decision, mode);
  const requiresConfirmation = input.confirmed === true ? false : needsConfirmation(decision, graph, mode);
  const confirmationReason = requiresConfirmation
    ? decision.kind === 'escalate_to_swarm'
      ? 'Launching a swarm can create workers, workflows, nodes, projects, files, builds, and runtime processes.'
      : 'This route can create, update, delete, execute, publish, build, deploy, or launch an advanced agent and requires explicit confirmation.'
    : null;
  const base = {
    mode,
    goal,
    limits,
    downstreamSwarmAgents: downstreamSwarm.selected,
    downstreamSwarmRange: downstreamSwarm.range,
    graph,
    subagents,
    plannerSessions: plannerSessions(graph, subagents, decision, requiresConfirmation),
    decision,
    requiresConfirmation,
    confirmationReason,
    warnings: graph.warnings,
  };
  return { ...base, mermaid: mermaidFor(base) };
}

export function formatDefaultChatOrchestrationMarkdown(orchestration: ChatDefaultOrchestration) {
  const subagents = orchestration.subagents
    .map((agent) => `- ${agent.id}: ${agent.role}${agent.advanced ? ' (advanced-capable)' : ''} — ${agent.taskTitles.join('; ') || agent.output}`)
    .join('\n');
  const sessions = orchestration.plannerSessions
    .map((session) => `- ${session.title}: ${session.kind}, owner ${session.ownerRole}, status ${session.status}`)
    .join('\n');
  const confirmation = orchestration.requiresConfirmation
    ? `\n\n**Confirmation required:** ${orchestration.confirmationReason}\nReply with **confirm** to execute this route or **cancel** to discard it.`
    : '';
  return [
    `## ${orchestration.mode === 'SWARM' ? 'Swarm Chat routing plan' : 'Default Chat routing plan'}`,
    '',
    `**Goal:** ${orchestration.goal}`,
    `**Decision:** ${orchestration.decision.label}`,
    `**Why:** ${orchestration.decision.reason}`,
    `**Subagent limit:** ${orchestration.limits.selected} of ${orchestration.limits.min}-${orchestration.limits.max}`,
    `**Downstream swarm limit:** ${orchestration.downstreamSwarmRange}; selected ${orchestration.downstreamSwarmAgents}`,
    '',
    '### Subagents',
    subagents || '- No subagents required.',
    '',
    '### Planner sessions',
    sessions || '- No planner sessions required.',
    '',
    '### Decision chain',
    '```mermaid',
    orchestration.mermaid.trim(),
    '```',
    confirmation,
  ].join('\n');
}
