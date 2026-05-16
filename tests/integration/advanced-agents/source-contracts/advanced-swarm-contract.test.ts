import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { planAdvancedSwarm } from '@connectingmatrix/ai-agents/services/ai-agents/advanced';

describe('advanced swarm contract', () => {
  it('allows an explicit swarm-agent role with bounded confirmation metadata', () => {
    const plan = planAdvancedSwarm({
      prompt: 'Build a complex app with a nested swarm manager and cleanup',
      roles: ['planner', 'swarm-agent', 'verifier'],
    });
    assert.equal(plan.status, 'confirmation_required');
    assert.deepEqual(plan.roles, ['planner', 'swarm-agent', 'verifier']);
    assert.equal(
      plan.proposedActions.some((action) => action.args.role === 'swarm-agent'),
      true,
    );
    assert.match(JSON.stringify(plan), /Create and run swarm-agent worker/);
  });

  it('plans the complete software-development lifecycle for app goals', () => {
    const plan = planAdvancedSwarm({ prompt: 'Build and deploy a complete PWA application with backend, tests, and connectivity checks' });
    assert.equal(plan.roles.includes('main-agent'), true);
    assert.equal(plan.roles.includes('ui-research-agent'), true);
    assert.equal(plan.roles.includes('backend-research-agent'), true);
    assert.equal(plan.roles.includes('verification-swarm'), true);
    assert.equal(plan.roles.includes('connectivity-agent'), true);
  });
});
