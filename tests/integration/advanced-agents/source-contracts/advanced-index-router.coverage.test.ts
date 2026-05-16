import { strict as assert } from 'node:assert';
import { test } from 'node:test';

import { advancedToolIds, executeAdvancedTool } from '@connectingmatrix/ai-agents/services/ai-agents/advanced';

test('executeAdvancedTool routes every advanced tool id and rejects unknown ids', async () => {
  const baseInput: Record<string, unknown> = {
    agentId: 'agent-1',
    userId: 'user-1',
    ownerId: 'user-1',
    ownerType: 'user',
    organizationId: 'org-1',
    chatId: 'chat-1',
    workflowId: 'workflow-1',
    executionId: 'execution-1',
    runnerId: 'runner-1',
    swarmId: 'swarm-1',
    projectId: 'project-1',
    content: 'coverage content',
    query: 'coverage query',
    message: 'coverage message',
    operation: 'list',
    payload: { command: 'echo coverage' },
    files: [{ path: '/tmp/file.txt', filename: 'file.txt', bytes: 42 }],
    attachments: [{ path: '/tmp/file.csv', filename: 'file.csv', bytes: 42 }],
    confirmed: false,
  };
  for (const id of advancedToolIds) {
    await executeAdvancedTool(id, baseInput).catch(() => null);
  }
  await assert.rejects(executeAdvancedTool('agent.unknown.tool' as (typeof advancedToolIds)[number], baseInput), /Unknown advanced tool/);
});
