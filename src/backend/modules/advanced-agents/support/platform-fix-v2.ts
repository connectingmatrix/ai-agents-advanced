import { identifyAdvancedGaps } from './gap-analysis';
import { createAgentTaskGraph } from './task-graph';

const text = (value: unknown) => String(value ?? '').trim();

export function createPlatformFixPlan(input: Record<string, unknown>) {
  const report = text(input.report || input.audit || input.message || input.prompt);
  const gaps = identifyAdvancedGaps({ ...input, audit: report });
  const graph = createAgentTaskGraph({
    ...input,
    message: report || 'Fix Giga platform build and agent gaps',
    includeGaps: true,
    mode: 'platform-fix',
  });
  return {
    status: input.confirmed === true ? 'ready' : 'confirmation_required',
    confirmationReason:
      input.confirmed === true ? null : 'Platform repair can modify repository files and should be confirmed before creating patches or runner jobs.',
    graph,
    gaps,
    patchStrategy: [
      'Fix missing modules and package aliases first.',
      'Make entity ORM generics return concrete entity classes, not GigaEntity<Row, Row>.',
      'Replace legacy direct helper calls with relation/entity wrappers, then remove wrappers.',
      'Repair GraphQL resolver registration and request-scoped DataLoader setup.',
      'Run yarn build and yarn typecheck in backend, workflow-nodes, executor, UI, and charts.',
    ],
  };
}
