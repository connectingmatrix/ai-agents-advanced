import { randomUUID } from 'node:crypto';
import { parseRecordValue, parseStringValue } from 'giga-ai-helper/workflow';
import { AIAgentRunnerHostEntity, AIAgentRunnerJobEntity } from '@connectingmatrix/orm/repositories/entities';
import type { AIAgentRunnerHostRow } from '@connectingmatrix/orm/repositories/entities/runtime/AIAgentRunnerHostEntity';
import type { AIAgentRunnerJobRow } from '@connectingmatrix/orm/repositories/entities/runtime/AIAgentRunnerJobEntity';

const text = (value: unknown): string => parseStringValue(value).trim();
const record = (value: unknown): Record<string, unknown> => parseRecordValue(value);

export async function pairLocalRunner(input: Record<string, unknown>) {
  const now = new Date().toISOString();
  const payload: AIAgentRunnerHostRow = {
    id: randomUUID(),
    owner_type: text(input.ownerType || input.owner_type) || 'user',
    owner_id: text(input.ownerId || input.owner_id || input.userId || input.user_id) || null,
    organization_id: text(input.organizationId || input.organization_id) || null,
    host_name: text(input.hostName || input.host_name || input.name) || 'Local Giga Runner',
    status: 'pairing',
    port: Number(input.port || 10000),
    pairing_token_hash: text(input.pairingTokenHash || input.pairing_token_hash) || null,
    capabilities: record(input.capabilities),
    last_seen_at: null,
    metadata: { approvalRequired: true, source: 'agent.local_runner.pair' },
    created_at: now,
    updated_at: now,
  };
  const host = await AIAgentRunnerHostEntity.create(payload);
  return { host, instructions: 'Open Giga Runner, paste the pairing token, and approve jobs before they run.' };
}

export async function heartbeatLocalRunner(input: Record<string, unknown>) {
  const id = text(input.runnerId || input.runner_id || input.hostId || input.host_id);
  if (!id) throw new Error('runnerId is required.');
  const host = await AIAgentRunnerHostEntity.single(id);
  if (!host) throw new Error(`Runner ${id} was not found.`);
  const now = new Date().toISOString();
  await host.update({ status: 'online', last_seen_at: now, capabilities: record(input.capabilities), updated_at: now });
  return { hostId: id, status: 'online', lastSeenAt: now };
}

export async function queueLocalRunnerJob(input: Record<string, unknown>) {
  const runnerId = text(input.runnerId || input.runner_id || input.hostId || input.host_id);
  if (!runnerId) throw new Error('runnerId is required.');
  const now = new Date().toISOString();
  const payload: AIAgentRunnerJobRow = {
    id: randomUUID(),
    runner_host_id: runnerId,
    project_id: text(input.projectId || input.project_id) || null,
    job_kind: text(input.jobKind || input.job_kind || input.operation) || 'command',
    status: input.confirmed === true ? 'queued' : 'waiting_for_approval',
    input: record(input.payload || input.input),
    output: {},
    logs: [],
    risk: text(input.risk) || 'local-computer',
    metadata: { requiresApproval: input.confirmed !== true },
    created_at: now,
    updated_at: now,
  };
  const job = await AIAgentRunnerJobEntity.create(payload);
  return { job, confirmationRequired: input.confirmed !== true };
}
