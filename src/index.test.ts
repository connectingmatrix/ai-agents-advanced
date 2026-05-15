import test from 'node:test'; import assert from 'node:assert/strict'; import { AdvancedAIAgents } from './index.js'; test('plans',()=>assert.equal(AdvancedAIAgents.plan('A. B').steps.length,2));
