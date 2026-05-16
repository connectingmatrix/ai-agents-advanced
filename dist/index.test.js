import test from 'node:test';
import assert from 'node:assert/strict';
import { AdvancedAIAgents } from './index.js';
test('advanced agents use agent-name folders and legacy aliases', async () => {
    const catalog = AdvancedAIAgents.agents();
    assert.equal(catalog.some((agent) => agent.name === 'software-builder-agent'), true);
    assert.equal(catalog.some((agent) => agent.name === 'process-monitor-control-agent'), true);
    const plan = AdvancedAIAgents.plan({ kind: 'planner', objective: 'plan legacy alias' }, { userId: 'u1' });
    assert.equal(plan.kind, 'planner-agent');
    const run = await AdvancedAIAgents.runAgent('software-builder-agent', { message: 'build project' }, { userId: 'u1' });
    assert.match(run.output, /software-builder-agent/);
});
