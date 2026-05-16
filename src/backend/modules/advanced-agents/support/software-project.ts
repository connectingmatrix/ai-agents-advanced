import { GigaORM } from '@connectingmatrix/orm/orm';
import { AIAgentProjectEntity } from '@connectingmatrix/orm/repositories/entities';
import { readSoftwareText } from './software-detection';
import { generateAdvancedSoftwareSystem } from './software-system-builder';
import type { AIAgentProjectRow } from '@connectingmatrix/orm/repositories/entities/runtime/AIAgentProjectEntity';

const advancedSoftwareContext = { caller: { id: 'advanced-software-agent', type: 'root' as const } };

export async function createAdvancedSoftwareProject(input: Record<string, unknown>) {
  return GigaORM.run(advancedSoftwareContext, async () => {
    const spec = generateAdvancedSoftwareSystem(input);
    const now = new Date().toISOString();
    const payload: AIAgentProjectRow = {
      id: spec.id,
      agent_id: readSoftwareText(input.agentId || input.agent_id) || null,
      owner_type: readSoftwareText(input.ownerType || input.owner_type) || 'user',
      owner_id: readSoftwareText(input.ownerId || input.owner_id || input.userId || input.user_id) || null,
      organization_id: readSoftwareText(input.organizationId || input.organization_id) || null,
      chat_id: readSoftwareText(input.chatId || input.chat_id) || null,
      name: spec.name,
      slug: spec.slug,
      description: spec.prompt,
      project_kind: spec.framework,
      status: 'draft',
      stack: { framework: spec.framework, database: spec.database, orm: spec.orm },
      architecture: {
        modules: spec.metadata.modules,
        blueprint: spec.metadata.blueprint,
        uiKit: spec.metadata.uiKit,
        source: 'agent.software.create.v2',
      },
      files: spec.files,
      database_manifest: { database: spec.database, schemaPath: 'db/schema.sql', seedPath: 'db/seed.json' },
      runtime_manifest: { commands: spec.commands, runner: spec.runner, entryFile: 'index.html' },
      last_run: {},
      metadata: spec.metadata,
      created_by: readSoftwareText(input.userId || input.created_by) || null,
      created_at: now,
      updated_at: now,
    };
    const project = await AIAgentProjectEntity.create(payload);
    return { project, spec, summary: `Created software system spec for ${spec.name}.` };
  });
}

export async function queueAdvancedSoftwareRun(input: Record<string, unknown>) {
  return GigaORM.run(advancedSoftwareContext, async () => {
    const projectId = readSoftwareText(input.projectId || input.project_id);
    if (!projectId) throw new Error('projectId is required.');
    const project = await AIAgentProjectEntity.single(projectId);
    if (!project) throw new Error(`Project ${projectId} was not found.`);
    const now = new Date().toISOString();
    const run = {
      status: 'queued',
      command: readSoftwareText(input.command) || 'build',
      runner: readSoftwareText(input.runner) || 'sandbox',
      requestedAt: now,
    };
    await project.update({ last_run: run, status: 'queued', updated_at: now });
    return { projectId, run };
  });
}
