import test from 'node:test';
import assert from 'node:assert/strict';
import { AdvancedAIAgents, advancedAgentNames } from './index.js';
test('advanced agents are visible by agent-name folders and not workflow/tree/node designers', async () => {
    assert.equal(advancedAgentNames.includes('software-builder-agent'), true);
    assert.equal(advancedAgentNames.includes('workflow-designer-agent'), false);
    const out = await AdvancedAIAgents.runAgent('software-builder-agent', { objective: 'build app' });
    assert.match(out.output, /Software Builder Agent completed/);
});
