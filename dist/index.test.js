import test from 'node:test';
import assert from 'node:assert/strict';
import { AdvancedAIAgents } from './index.js';
test('advanced ai-agents own advanced plans but not workflow/tree/node agents', async () => { const ctx = { userId: 'u1' }; const p = AdvancedAIAgents.plan({ objective: 'research deployment' }, ctx); const done = await AdvancedAIAgents.executePlan(p.id, ctx); assert.equal(done.status, 'completed'); assert.equal(AdvancedAIAgents.health().details?.workflowTreeNodeAgentsOwnedHere, false); });
