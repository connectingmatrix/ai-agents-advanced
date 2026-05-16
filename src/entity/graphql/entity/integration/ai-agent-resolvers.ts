import {
  createAIAgent,
  executeAIAgentOperation,
  listAIAgentCapabilities,
  listAIAgentSkillCatalog,
  listSelectableAIAgents,
  runStoredAIAgent,
  attachAIAgentToChatWorkflow,
} from '@connectingmatrix/ai-agents/services/ai-agents';
import { decideAgentApproval, listAgentApprovalRequests, listAgentFileShapes } from '@connectingmatrix/ai-agents/services/ai-agents/clickhouse';
import { deleteAIAgentFile, rebuildAIAgentIngestion, updateAIAgentIngestion } from '@connectingmatrix/ai-agents/services/ai-agents/ingestion/agent-ingestion';
import {
  AIAgentEntity,
  AIAgentMemoryRuleEntity,
  AIAgentRoutingRuleEntity,
  AIAgentWorkflowBindingEntity,
} from '@connectingmatrix/orm/repositories/entities';
import { entriesForGraphql } from '../contracts/ai-agent-entry-fields';
import { manifestForGraphql, shapeForGraphql, skillBindingsForGraphql, skillsForGraphql } from '../contracts/ai-agent-sandbox-fields';
import { agentSandboxInput } from './ai-agent-sandbox-input';
import type { AIAgentCreateInput, AIAgentUpdateInput, AIAgentRuntimeInput, AIAgentAttachInput } from '@connectingmatrix/ai-agents/services/ai-agents/contracts';
import type { AgentUiScopeInput } from '@connectingmatrix/ai-agents/services/ai-agents/contracts/runtime/runtime';
import type { AIAgentRow } from '@connectingmatrix/orm/repositories/entities/runtime/AIAgentEntity';
import type { AgentSandboxGraphqlInput } from './ai-agent-sandbox-input';
import { randomUUID } from 'node:crypto';

type AgentWhereInput = { id?: string; slug?: string; name?: string };
type AIAgentGraphqlCreateInput = Omit<AIAgentCreateInput, keyof AgentSandboxGraphqlInput> & AgentSandboxGraphqlInput;
type AIAgentGraphqlUpdateInput = Omit<AIAgentUpdateInput, keyof AgentSandboxGraphqlInput> & AgentSandboxGraphqlInput;
type AgentRunPayload = { text?: string | null; output?: unknown; artifacts?: unknown; trace?: unknown };
type AgentUpdateIngestionGraphqlInput = { agentId: string; attachmentId?: string | null; modes?: string[] | null; rebuild?: boolean | null };
type AgentRebuildIngestionGraphqlInput = { agentId: string; modes?: string[] | null; organizationId?: string | null; replaceExisting?: boolean | null };
type AgentDeleteFileGraphqlInput = { agentId: string; attachmentId: string };

const CHAT_ATTACHMENT_BUCKET = process.env.GIGA_DRIVE_STORAGE_BUCKET || 'giga-drive';
const normalizePathPart = (value: unknown, fallback = 'unknown'): string => {
  const text = String(value || '').trim().replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/^-+|-+$/g, '');
  return text || fallback;
};
const readUpload = async (value: any): Promise<{ filename: string; mimetype: string; buffer: Buffer; size: number }> => {
  const upload = typeof value?.then === 'function' ? await value : value;
  const filename = normalizePathPart(upload?.filename || upload?.name || 'attachment.bin', 'attachment.bin');
  const mimetype = String(upload?.mimetype || upload?.type || 'application/octet-stream');
  if (upload?.createReadStream) {
    const chunks: Buffer[] = [];
    for await (const chunk of upload.createReadStream()) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    const buffer = Buffer.concat(chunks);
    return { filename, mimetype, buffer, size: buffer.length };
  }
  if (upload?.arrayBuffer) {
    const buffer = Buffer.from(await upload.arrayBuffer());
    return { filename, mimetype, buffer, size: buffer.length };
  }
  const buffer = Buffer.isBuffer(upload?.buffer) ? upload.buffer : Buffer.from(String(upload?.content || ''));
  return { filename, mimetype, buffer, size: buffer.length };
};
const chatAttachmentKind = (mimeType: string, fileName: string): string => {
  const lower = `${mimeType} ${fileName}`.toLowerCase();
  if (lower.includes('image/')) return 'image';
  if (/\.(csv|xlsx|xls|parquet)$/i.test(fileName)) return 'tabular';
  if (/\.(sqlite|sqlite3|db|duckdb)$/i.test(fileName)) return 'database';
  if (/\.(zip|tar|gz|rar|7z)$/i.test(fileName)) return 'archive';
  if (/\.(ts|tsx|js|jsx|py|sql|json|yaml|yml|graphql|md)$/i.test(fileName)) return 'code';
  return 'document';
};

type AgentAttachPayload = {
  chat_id?: string | null;
  agent_id?: string | null;
  is_default?: boolean | null;
  metadata?: Record<string, unknown> | null;
};

export const aiAgentResolvers = {
  AIAgent: {
    runtimeKind: (parent: AIAgentRow) => parent.runtime_kind,
    sandboxConfig: (parent: AIAgentRow) => parent.sandbox_config,
    skills: (parent: AIAgentRow) => skillsForGraphql(parent.skills as never),
    manifest: (parent: AIAgentRow) => manifestForGraphql(parent.manifest as never),
    shape: (parent: AIAgentRow) => shapeForGraphql(parent.shape as never),
    skillBindings: (parent: AIAgentRow) => skillBindingsForGraphql(parent.skill_bindings as never),
    workflowBindings: async (parent: AIAgentRow) =>
      parent.id ? AIAgentWorkflowBindingEntity.find({ agent_id: parent.id, status: 'active' }).many() : [],
    fileShapes: async (parent: AIAgentRow) => (parent.id ? listAgentFileShapes(parent.id) : []),
    memoryRules: async (parent: AIAgentRow) => (parent.id ? AIAgentMemoryRuleEntity.find({ agent_id: parent.id }).many() : []),
    routingRules: async (parent: AIAgentRow) => (parent.id ? AIAgentRoutingRuleEntity.find({ agent_id: parent.id }).many() : []),
    permissionPolicy: (parent: AIAgentRow) => parent.permission_policy,
  },
  AgentWorkflowBinding: {
    workflowId: (parent: { workflow_id?: string | null }) => parent.workflow_id,
    permissionId: (parent: { permission_id?: string | null }) => parent.permission_id,
  },
  AgentMemoryRule: {
    storeKind: (parent: { store_kind?: string | null }) => parent.store_kind,
    scopeType: (parent: { scope_type?: string | null }) => parent.scope_type,
    retentionDays: (parent: { retention_days?: number | null }) => parent.retention_days,
    maxMemories: (parent: { max_memories?: number | null }) => parent.max_memories,
    readBeforeRun: (parent: { read_before_run?: boolean | null }) => parent.read_before_run,
    writeFeedback: (parent: { write_feedback?: boolean | null }) => parent.write_feedback,
    embeddingModel: (parent: { embedding_model?: string | null }) => parent.embedding_model,
  },
  AgentRoutingRule: {
    agentId: (parent: { agent_id?: string | null }) => parent.agent_id,
    matchKind: (parent: { match_kind?: string | null }) => parent.match_kind,
    matchValue: (parent: { match_value?: string | null }) => parent.match_value,
    isInternal: (parent: { is_internal?: boolean | null }) => parent.is_internal,
  },
  AIAgentRunResult: {
    output: (parent: AgentRunPayload) => ({
      text: parent.text || null,
      entries: entriesForGraphql({ output: parent.output || parent.text || '' }),
      artifacts: entriesForGraphql({ artifacts: parent.artifacts || [] }),
      trace: entriesForGraphql({ trace: parent.trace || [] }),
    }),
  },
  AIAgentAttachPayload: {
    chatId: (parent: AgentAttachPayload) => parent.chat_id,
    agentId: (parent: AgentAttachPayload) => parent.agent_id,
    isDefault: (parent: AgentAttachPayload) => parent.is_default,
    metadata: (parent: AgentAttachPayload) => entriesForGraphql(parent.metadata),
  },
  Query: {
    aiAgents: async (_parent: unknown, args: { where?: AgentWhereInput; first?: number; offset?: number }) =>
      AIAgentEntity.find(args.where || {})
        .limit?.(Number(args.first || 50))
        .offset?.(Number(args.offset || 0))
        .many?.() || AIAgentEntity.find(args.where || {}).many(),
    selectableAiAgents: async (_parent: unknown, args: { scope?: AgentUiScopeInput }) => listSelectableAIAgents(args.scope || { type: '' }),
    aiAgent: async (_parent: unknown, args: { id: string }) => AIAgentEntity.single(args.id),
    aiAgentCapabilities: async () => {
      const catalog = await listAIAgentSkillCatalog();
      return { capabilities: await listAIAgentCapabilities(), ...catalog, skills: skillsForGraphql(catalog.skills) };
    },
    agentApprovalRequests: async (_parent: unknown, args: { agentId?: string | null; status?: string | null }) => listAgentApprovalRequests(args),
  },
  Mutation: {

    chatAttachmentUpload: async (_parent: unknown, args: { input: { file: unknown; file_name?: string | null; mime_type?: string | null; scope_type?: string | null; scope_id?: string | null } }, context: { supabase?: any; user?: { id?: string } }) => {
      const supabase = context?.supabase;
      if (!supabase?.storage?.from) throw new Error('Supabase storage client is required for chat attachment upload.');
      const upload = await readUpload(args.input.file);
      const id = randomUUID();
      const fileName = normalizePathPart(args.input.file_name || upload.filename, upload.filename);
      const mimeType = String(args.input.mime_type || upload.mimetype || 'application/octet-stream');
      const userId = normalizePathPart(context?.user?.id || supabase.__auth_user_id || 'user');
      const scopeType = normalizePathPart(args.input.scope_type || 'chat');
      const scopeId = normalizePathPart(args.input.scope_id || 'default');
      const storagePath = `user-drives/${userId}/chat-attachments/${scopeType}/${scopeId}/${id}-${fileName}`;
      const result = await supabase.storage.from(CHAT_ATTACHMENT_BUCKET).upload(storagePath, upload.buffer, { contentType: mimeType, upsert: false });
      if (result.error) throw result.error;
      return {
        id,
        file_name: fileName,
        mime_type: mimeType,
        size_bytes: upload.size,
        drive_path: `/drive/user/${userId}/chat-attachments/${scopeType}/${scopeId}/${id}-${fileName}`,
        storage_bucket: CHAT_ATTACHMENT_BUCKET,
        storage_path: storagePath,
        kind: chatAttachmentKind(mimeType, fileName),
        metadata: { original_file_name: upload.filename, scope_type: scopeType, scope_id: scopeId },
      };
    },
    createAiAgent: async (_parent: unknown, args: { input: AIAgentGraphqlCreateInput }) => createAIAgent(agentSandboxInput(args.input)),
    updateAiAgent: async (_parent: unknown, args: { input: AIAgentGraphqlUpdateInput }) =>
      executeAIAgentOperation({ operation: 'update', update: agentSandboxInput(args.input) }),
    deleteAiAgent: async (_parent: unknown, args: { id: string }) => {
      await AIAgentEntity.load(args.id).delete();
      return true;
    },
    runAiAgent: async (_parent: unknown, args: { input: AIAgentRuntimeInput }) => runStoredAIAgent(args.input),
    attachAiAgentToChatWorkflow: async (_parent: unknown, args: { input: AIAgentAttachInput }) => attachAIAgentToChatWorkflow(args.input),
    bindAiAgentWorkflow: async (_parent: unknown, args: { input: { agentId: string; workflowId: string; permissionId?: string | null } }) =>
      AIAgentWorkflowBindingEntity.create({
        agent_id: args.input.agentId,
        workflow_id: args.input.workflowId,
        permission_id: args.input.permissionId || 'workflow.execute',
        status: 'active',
      }),
    updateAiAgentIngestion: async (_parent: unknown, args: { input: AgentUpdateIngestionGraphqlInput }) =>
      updateAIAgentIngestion({
        agentId: args.input.agentId,
        attachmentId: args.input.attachmentId || null,
        modes: (args.input.modes || null) as never,
        rebuild: args.input.rebuild === true,
      }),
    rebuildAiAgentIngestion: async (_parent: unknown, args: { input: AgentRebuildIngestionGraphqlInput }) =>
      rebuildAIAgentIngestion({
        agentId: args.input.agentId,
        modes: (args.input.modes || null) as never,
        organizationId: args.input.organizationId || null,
        replaceExisting: args.input.replaceExisting === true,
      }),
    deleteAiAgentFile: async (_parent: unknown, args: { input: AgentDeleteFileGraphqlInput }) =>
      deleteAIAgentFile({ agentId: args.input.agentId, attachmentId: args.input.attachmentId }),
    decideAgentApproval: async (_parent: unknown, args: { input: Parameters<typeof decideAgentApproval>[0] }) => decideAgentApproval(args.input),
  },
};
