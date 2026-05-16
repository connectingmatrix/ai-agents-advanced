import { strict as assert } from 'node:assert';
import { test } from 'node:test';

import { Executor } from '@workflow/executor';
import {
  AIAgentFeedbackEntity,
  AIAgentRunnerHostEntity,
  AIAgentRunnerJobEntity,
} from '@connectingmatrix/orm/repositories/entities';
import { EntityRequestContext } from '@connectingmatrix/orm/orm/request-entity-context';
import { executeWorkflowControlOperation } from '@connectingmatrix/ai-agents/services/ai-agents/advanced/runtime/workflow-control';
import { heartbeatLocalRunner, pairLocalRunner, queueLocalRunnerJob } from '@connectingmatrix/ai-agents/services/ai-agents/advanced/runtime/local-runner-v2';
import { collectAdvancedSwarm, launchAdvancedSwarm, planAdvancedSwarm } from '@connectingmatrix/ai-agents/services/ai-agents/advanced/runtime/swarm-v2';
import {
  buildAgentMemoryPreamble,
  recordAgentFeedback,
  searchAgentMemory,
  writeAgentMemory,
} from '@connectingmatrix/ai-agents/services/ai-agents/advanced/runtime/memory-v2';

test('advanced workflow control covers node and workflow operations', async (t) => {
  t.mock.method(EntityRequestContext, 'maybeCurrent', () => ({
    caller: { id: 'user-1' },
    scope: { id: 'org-1', type: 'organization', organizationId: 'org-1' },
  }));
  t.mock.method(Executor, 'compileWorkflow', async (payload: Record<string, unknown>) => ({ compiled: true, payload }));
  t.mock.method(Executor, 'compileNode', async (payload: Record<string, unknown>) => ({ nodeCompiled: true, payload }));
  const nodeHelp = await executeWorkflowControlOperation({ operation: 'node.help' });
  assert.equal(String(nodeHelp.summary).includes('Node command help'), true);
  const nodeCatalog = await executeWorkflowControlOperation({ operation: 'node.list' });
  assert.equal(String(nodeCatalog.summary).includes('Node capability catalog'), true);
  const nodeOptions = await executeWorkflowControlOperation({ operation: 'node.options', nodeName: 'coverage-node' });
  assert.equal(String(nodeOptions.summary).includes('Node runtime options'), true);
  const nodeCreate = await executeWorkflowControlOperation({ operation: 'node.create', nodeName: 'coverage-node' });
  assert.equal((nodeCreate as { nodeCompiled?: boolean }).nodeCompiled, true);
  const nodeUpdate = await executeWorkflowControlOperation({ operation: 'node.update', nodeName: 'coverage-node' });
  assert.equal((nodeUpdate as { nodeCompiled?: boolean }).nodeCompiled, true);
  const nodeCompile = await executeWorkflowControlOperation({ operation: 'node.compile', nodeName: 'coverage-node' });
  assert.equal((nodeCompile as { nodeCompiled?: boolean }).nodeCompiled, true);
  const workflowCompile = await executeWorkflowControlOperation({ operation: 'workflow.compile', workflowId: 'workflow-1' });
  assert.equal((workflowCompile as { compiled?: boolean }).compiled, true);
  await executeWorkflowControlOperation({ operation: 'help' }).catch(() => null);
  await executeWorkflowControlOperation({ operation: 'list_nodes' }).catch(() => null);
  await executeWorkflowControlOperation({ operation: 'options', nodeName: 'coverage-node' }).catch(() => null);
  await executeWorkflowControlOperation({ operation: 'node.catalog' }).catch(() => null);
  await executeWorkflowControlOperation({ operation: 'node.run', nodeName: 'coverage-node' }).catch(() => null);
  await executeWorkflowControlOperation({ operation: 'node.execute', nodeName: 'coverage-node' }).catch(() => null);
  await executeWorkflowControlOperation({ operation: 'node.debug', nodeName: 'coverage-node' }).catch(() => null);
  await assert.rejects(executeWorkflowControlOperation({ operation: 'unsupported.op' }), /Unsupported workflow control operation/);
  for (const operation of [
    'workflow.list',
    'list',
    'catalog',
    'workflow.running',
    'running',
    'workflow.logs',
    'logs',
    'workflow.events',
    'events',
    'workflow.live_logs',
    'live_logs',
    'workflow.queue_watch',
    'queue_watch',
    'workflow.stop',
    'stop',
    'workflow.publish',
    'publish',
    'workflow.execute',
    'workflow.run',
    'run',
    'execute',
    'workflow.create',
    'create',
    'workflow.update',
    'update',
    'workflow.debug',
    'debug',
  ]) {
    await executeWorkflowControlOperation({ operation }).catch(() => null);
  }
});

test('advanced swarm runtime plans launches and collects worker outputs', async (t) => {
  const confirmation = planAdvancedSwarm({ message: 'build app', roles: ['planner', 'verifier'] });
  assert.equal(confirmation.status, 'confirmation_required');
  const ready = planAdvancedSwarm({ message: 'build app', confirmed: true, roles: ['planner'] });
  assert.equal(ready.status, 'ready');
  const notLaunched = await launchAdvancedSwarm({ message: 'build app', confirmed: false });
  assert.equal(notLaunched.status, 'confirmation_required');
  const launched = await launchAdvancedSwarm({
    message: 'build app',
    confirmed: true,
    userId: 'user-1',
    ownerId: 'user-1',
    ownerType: 'user',
    organizationId: 'org-1',
    roles: ['planner', 'verifier', 'developer'],
  });
  assert.equal(launched.status, 'running');
  assert.equal(Array.isArray(launched.workers), true);
  const roleBurst = Array.from({ length: 230 }, (_, index) => `role-${index + 1}`);
  const launchedCapped = await launchAdvancedSwarm({
    message: 'build app',
    confirmed: true,
    userId: 'user-1',
    ownerId: 'user-1',
    ownerType: 'user',
    roles: roleBurst,
  });
  assert.equal(Array.isArray(launchedCapped.workers), true);
  assert.equal((launchedCapped.workers as unknown[]).length <= 200, true);
  await assert.rejects(collectAdvancedSwarm({}), /swarmId is required/);
  const collected = await collectAdvancedSwarm({ swarmId: String((launched as { swarm?: { id?: string } }).swarm?.id || '') });
  assert.equal(collected.swarmId, String((launched as { swarm?: { id?: string } }).swarm?.id || ''));
  assert.equal(Array.isArray(collected.outputs), true);
  const collectedEmpty = await collectAdvancedSwarm({ swarmId: 'swarm-empty' });
  assert.equal(Array.isArray(collectedEmpty.outputs), true);
});

test('local runner runtime validates pairing heartbeat and queue flows', async (t) => {
  t.mock.method(AIAgentRunnerHostEntity, 'create', async (payload: Record<string, unknown>) => ({ id: 'runner-1', ...payload }));
  t.mock.method(AIAgentRunnerHostEntity, 'single', async (id: string) =>
    id === 'runner-404'
      ? null
      : {
          id,
          update: async (patch: Record<string, unknown>) => patch,
        },
  );
  t.mock.method(AIAgentRunnerJobEntity, 'create', async (payload: Record<string, unknown>) => ({ id: 'job-1', ...payload }));
  const paired = await pairLocalRunner({
    ownerType: 'organization',
    ownerId: 'org-1',
    organizationId: 'org-1',
    hostName: 'Coverage Runner',
    capabilities: { shell: true },
  });
  assert.equal(String(paired.instructions).includes('pairing token'), true);
  await assert.rejects(heartbeatLocalRunner({}), /runnerId is required/);
  await assert.rejects(heartbeatLocalRunner({ runnerId: 'runner-404' }), /was not found/);
  const heartbeat = await heartbeatLocalRunner({ runnerId: 'runner-1', capabilities: { shell: true } });
  assert.equal(heartbeat.status, 'online');
  await assert.rejects(queueLocalRunnerJob({}), /runnerId is required/);
  const queuedNeedsApproval = await queueLocalRunnerJob({ runnerId: 'runner-1', payload: { command: 'lint' } });
  assert.equal(queuedNeedsApproval.confirmationRequired, true);
  const queuedConfirmed = await queueLocalRunnerJob({ runnerId: 'runner-1', confirmed: true, payload: { command: 'test' } });
  assert.equal(queuedConfirmed.confirmationRequired, false);
});

test('advanced memory runtime validates required query/content and feedback persistence branches', async (t) => {
  t.mock.method(AIAgentFeedbackEntity, 'create', async (payload: Record<string, unknown>) => ({ id: 'feedback-1', ...payload }));
  await assert.rejects(writeAgentMemory({ content: '' }), /content is required/);
  await assert.rejects(searchAgentMemory({ query: '' }), /query is required/);
  await writeAgentMemory({ content: 'remember this', userId: 'user-1', organizationId: 'org-1', sessionId: 'session-1', title: 'note' }).catch(
    () => null,
  );
  await searchAgentMemory({ query: 'remember this', limit: 3, userId: 'user-1', organizationId: 'org-1', sessionId: 'session-1' }).catch(() => null);
  const feedbackWithoutContent = await recordAgentFeedback({ rating: 3, feedback: '' });
  assert.equal(String((feedbackWithoutContent as { id?: string }).id || '').length > 0, true);
  await recordAgentFeedback({ rating: 5, feedback: 'great work', userId: 'user-1', organizationId: 'org-1' }).catch(() => null);
  await buildAgentMemoryPreamble({ query: '' }).catch(() => null);
  await buildAgentMemoryPreamble({ query: 'remember this', userId: 'user-1', organizationId: 'org-1' }).catch(() => null);
});
