import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { GigaORM } from '@connectingmatrix/orm/orm';
import { AIAgentDeploymentEntity, AIAgentProjectEntity } from '@connectingmatrix/orm/repositories/entities';
import { deployGeneratedApp } from '../../app-hosting';
import { readSoftwareText } from './software-detection';
import type { AIAgentProjectEntity as AIAgentProjectInstance } from '@connectingmatrix/orm/repositories/entities/runtime/AIAgentProjectEntity';
import type { AIAgentDeploymentRow } from '@connectingmatrix/orm/repositories/entities/runtime/AIAgentDeploymentEntity';
import type { GeneratedAppFile } from '../../contracts';

const advancedSoftwareContext = { caller: { id: 'advanced-software-agent', type: 'root' as const } };
const projectFileSchema = z.object({ path: z.string().min(1), content: z.string(), contentType: z.string().optional() }).passthrough();
const deploymentFilesFromProject = (project: AIAgentProjectInstance): GeneratedAppFile[] => {
  const files = z
    .array(projectFileSchema)
    .parse(project.files || [])
    .map((file) => ({ path: file.path, content: file.content, contentType: file.contentType }));
  if (!files.length) throw new Error(`Project ${project.id} has no generated files to deploy.`);
  return files;
};

export async function createAdvancedSoftwareDeployment(input: Record<string, unknown>) {
  return GigaORM.run(advancedSoftwareContext, async () => {
    const projectId = readSoftwareText(input.projectId || input.project_id);
    if (!projectId) throw new Error('projectId is required.');
    const project = await AIAgentProjectEntity.single(projectId);
    if (!project) throw new Error(`Project ${projectId} was not found.`);
    const appDeployment = await deployGeneratedApp({
      projectId,
      userId: readSoftwareText(input.userId || input.created_by) || project.created_by || null,
      organizationId: readSoftwareText(input.organizationId || input.organization_id) || project.organization_id || null,
      chatId: readSoftwareText(input.chatId || input.chat_id) || project.chat_id || null,
      createdBy: readSoftwareText(input.userId || input.created_by) || project.created_by || null,
      appName: project.name || projectId,
      appSlug: project.slug || projectId,
      files: deploymentFilesFromProject(project),
      entryFile: 'index.html',
      sourcePrompt: project.description || null,
      metadata: { source: 'agent.software.host.v2' },
    });
    const now = new Date().toISOString();
    const payload: AIAgentDeploymentRow = {
      id: randomUUID(),
      project_id: projectId,
      agent_id: readSoftwareText(input.agentId || input.agent_id) || project.agent_id || null,
      deployment_kind: readSoftwareText(input.deploymentKind || input.deployment_kind) || 'generated-app-host',
      status: appDeployment.status,
      url: appDeployment.live_url,
      local_runner_id: readSoftwareText(input.localRunnerId || input.local_runner_id) || null,
      build_log: [],
      runtime_state: { deployedAt: now, appDeployment },
      created_by: readSoftwareText(input.userId || input.created_by) || project.created_by || null,
      created_at: now,
      updated_at: now,
    };
    const deployment = await AIAgentDeploymentEntity.create(payload);
    return { deployment, appDeployment, url: appDeployment.live_url, live_url: appDeployment.live_url };
  });
}
