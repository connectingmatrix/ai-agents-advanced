import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { buildSoftwareDevelopmentProcess, executeAdvancedTool, softwareDevelopmentRoles } from '@connectingmatrix/ai-agents/services/ai-agents/advanced';
import { findSoftwareBlueprint } from '@connectingmatrix/ai-agents/services/ai-agents/advanced/software-blueprints';
import type { SoftwareDevelopmentProcess } from '@connectingmatrix/ai-agents/services/ai-agents/advanced';

describe('advanced software development process', () => {
  it('creates the full lifecycle evidence for a requirement', () => {
    const blueprint = findSoftwareBlueprint('Build a hospital management app with billing and appointments');
    const process = buildSoftwareDevelopmentProcess({
      name: 'Hospital Operations',
      prompt: blueprint.summary,
      modules: blueprint.modules,
      blueprint,
    });
    assert.equal(process.status, 'ready');
    assert.equal(process.agentWorkGraph.length, softwareDevelopmentRoles.length);
    assert.equal(process.agentWorkPackets.length, process.agentWorkGraph.length);
    assert.equal(process.userStories.length >= 5, true);
    assert.equal(process.implementationTasks.length >= 6, true);
    assert.equal(
      process.featurePatternMatrix.some((entry) => entry.patternId === 'CRUD_TABLE_MODAL'),
      true,
    );
    assert.equal(process.crudOperationMatrix.length > 0, true);
    assert.equal(process.backendContractMatrix.length > 0, true);
    assert.equal(process.screenStateMatrix.length > 0, true);
    assert.equal(process.testCoverageMatrix.length > 0, true);
    assert.equal(process.valueScore.total, 100);
    assert.equal(process.definitionOfDone.passed, true);
    assert.equal(process.researchBrief.reportingNeeds.length > 0, true);
    assert.equal(
      process.uiResearch.pagePatterns.some((pattern) => pattern.name === 'DashboardFromChat'),
      true,
    );
    assert.equal(
      process.apiContractMap.some((contract) => contract.endpoint === '/api/login'),
      true,
    );
    assert.equal(
      process.connectivity.checks.some((check) => check.operation === 'current-user'),
      true,
    );
    assert.match(process.finalReport, /process-backed/i);
  });

  it('runs through the advanced tool surface', async () => {
    const output = (await executeAdvancedTool('agent.software.development_process.v1', {
      prompt: 'Create an EdTech PWA with student attendance, parent portal, backend tests, and deployment checks',
      extractionMode: 'deterministic',
    })) as SoftwareDevelopmentProcess;
    assert.equal(output.status, 'ready');
    assert.equal(
      output.agentWorkGraph.some((node) => node.id.includes('pwa-agent')),
      true,
    );
  });
});
