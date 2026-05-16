import { ENTITY, FIELD, RELATION, PERMISSIONS, Entity, Relation } from '@connectingmatrix/orm/orm';
import type { AIAgentSessionEntity } from '../auth/AIAgentSessionEntity';
import type { AIAgentMemoryEntity } from './AIAgentMemoryEntity';
import type { AIAgentAttachmentEntity } from './AIAgentAttachmentEntity';
import type { AIAgentRunEntity } from './AIAgentRunEntity';
import type { AIAgentVersionEntity } from './AIAgentVersionEntity';

export type AIAgentRow = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  instructions: string;
  owner_type?: 'user' | 'organization' | 'global' | 'system' | null;
  owner_id?: string | null;
  status?: 'draft' | 'active' | 'archived' | 'disabled' | null;
  scope_type: 'user' | 'organization' | 'global' | 'root';
  user_id?: string | null;
  organization_id?: string | null;
  created_by?: string | null;
  model_provider: string;
  model_id: string;
  model_config?: Record<string, unknown> | null;
  sdk_config?: Record<string, unknown> | null;
  tool_policy?: Record<string, unknown> | null;
  guardrails?: Record<string, unknown> | null;
  output_contract?: Record<string, unknown> | null;
  memory_policy?: Record<string, unknown> | null;
  runtime_kind?: 'openai_agents_sdk_sandbox' | null;
  sandbox_config?: Record<string, unknown> | null;
  capabilities?: Record<string, unknown>[] | null;
  skills?: Record<string, unknown>[] | null;
  permissions?: Record<string, unknown>[] | null;
  manifest?: Record<string, unknown> | null;
  shape?: Record<string, unknown> | null;
  skill_bindings?: Record<string, unknown>[] | null;
  permission_policy?: Record<string, unknown> | null;
  max_runtime_seconds?: number | null;
  max_tool_passes?: number | null;
  is_default?: boolean | null;
  is_active?: boolean | null;
  metadata?: Record<string, unknown> | null;
  created_at?: string | null;
  updated_at?: string | null;
};

@ENTITY({ table: 'ai_agents', label: 'AIAgent', store: 'dual', primaryKey: 'id', graph: { mirror: true } })
@PERMISSIONS({
  read: 'AI_AGENT_READ',
  list: 'AI_AGENT_LIST',
  create: 'AI_AGENT_CREATE',
  update: 'AI_AGENT_UPDATE',
  delete: 'AI_AGENT_DELETE',
  relations: {
    sessions: { list: 'AI_AGENT_SESSION_LIST', create: 'AI_AGENT_SESSION_CREATE' },
    memory: { list: 'AI_AGENT_MEMORY_LIST', create: 'AI_AGENT_MEMORY_CREATE' },
    attachments: { list: 'AI_AGENT_ATTACHMENT_LIST', create: 'AI_AGENT_ATTACHMENT_CREATE' },
    runs: { list: 'AI_AGENT_RUN_LIST', create: 'AI_AGENT_RUN_CREATE' },
    versions: { list: 'AI_AGENT_VERSION_LIST', create: 'AI_AGENT_VERSION_CREATE' },
  },
})
export class AIAgentEntity extends Entity<AIAgentRow> {
  @FIELD({ type: 'string', required: true, index: true }) public declare id: string | null;

  @FIELD({ type: 'string', required: true, index: true }) public declare name: string | null;

  @FIELD({ type: 'string', required: true, index: true }) public declare slug: string | null;

  @FIELD({ type: 'string' }) public declare description: string | null;

  @FIELD({ type: 'string', required: true }) public declare instructions: string | null;

  @FIELD({ type: 'string', index: true, default: 'user' }) public declare owner_type: AIAgentRow['owner_type'] | null;

  @FIELD({ type: 'string', index: true }) public declare owner_id: string | null;

  @FIELD({ type: 'string', default: 'active' }) public declare status: AIAgentRow['status'] | null;

  @FIELD({ type: 'string', required: true, index: true, default: 'user' }) public declare scope_type: AIAgentRow['scope_type'] | null;

  @FIELD({ type: 'string', index: true }) public declare user_id: string | null;

  @FIELD({ type: 'string', index: true }) public declare organization_id: string | null;

  @FIELD({ type: 'string', index: true }) public declare created_by: string | null;

  @FIELD({ type: 'string', required: true, default: 'openai' }) public declare model_provider: string | null;

  @FIELD({ type: 'string', required: true, default: 'gpt-5.3-codex' }) public declare model_id: string | null;

  @FIELD({ type: 'object', default: {} }) public declare model_config: Record<string, unknown> | null;

  @FIELD({ type: 'object', default: {} }) public declare sdk_config: Record<string, unknown> | null;

  @FIELD({ type: 'object', default: {} }) public declare tool_policy: Record<string, unknown> | null;

  @FIELD({ type: 'object', default: {} }) public declare guardrails: Record<string, unknown> | null;

  @FIELD({ type: 'object', default: {} }) public declare output_contract: Record<string, unknown> | null;

  @FIELD({ type: 'object', default: {} }) public declare memory_policy: Record<string, unknown> | null;

  @FIELD({ type: 'string', required: true, default: 'openai_agents_sdk_sandbox' }) public declare runtime_kind: AIAgentRow['runtime_kind'] | null;

  @FIELD({ type: 'object', default: {} }) public declare sandbox_config: Record<string, unknown> | null;

  @FIELD({ type: 'array', default: [] }) public declare capabilities: Record<string, unknown>[] | null;

  @FIELD({ type: 'array', default: [] }) public declare skills: Record<string, unknown>[] | null;

  @FIELD({ type: 'array', default: [] }) public declare permissions: Record<string, unknown>[] | null;

  @FIELD({ type: 'object', default: {} }) public declare manifest: Record<string, unknown> | null;

  @FIELD({ type: 'object', default: {} }) public declare shape: Record<string, unknown> | null;

  @FIELD({ type: 'array', default: [] }) public declare skill_bindings: Record<string, unknown>[] | null;

  @FIELD({ type: 'object', default: {} }) public declare permission_policy: Record<string, unknown> | null;

  @FIELD({ type: 'number', default: 120 }) public declare max_runtime_seconds: number | null;

  @FIELD({ type: 'number', default: 8 }) public declare max_tool_passes: number | null;

  @FIELD({ type: 'boolean', default: false }) public declare is_default: boolean | null;

  @FIELD({ type: 'boolean', default: true }) public declare is_active: boolean | null;

  @FIELD({ type: 'object', default: {} }) public declare metadata: Record<string, unknown> | null;

  @FIELD({ type: 'string' }) public declare created_at: string | null;

  @FIELD({ type: 'string' }) public declare updated_at: string | null;

  @RELATION({
    target: 'AIAgentSession',
    relation: 'HAS_AGENT_SESSION',
    store: 'supabase',
    many: true,
    owner: { scope: 'inherit', parentField: 'id', childField: 'agent_id' },
  })
  public declare sessions: Relation<AIAgentSessionEntity>;

  @RELATION({
    target: 'AIAgentMemory',
    relation: 'HAS_AGENT_MEMORY',
    store: 'supabase',
    many: true,
    owner: { scope: 'inherit', parentField: 'id', childField: 'agent_id' },
  })
  public declare memory: Relation<AIAgentMemoryEntity>;

  @RELATION({
    target: 'AIAgentAttachment',
    relation: 'HAS_AGENT_ATTACHMENT',
    store: 'supabase',
    many: true,
    owner: { scope: 'inherit', parentField: 'id', childField: 'agent_id' },
  })
  public declare attachments: Relation<AIAgentAttachmentEntity>;

  @RELATION({
    target: 'AIAgentRun',
    relation: 'HAS_AGENT_RUN',
    store: 'supabase',
    many: true,
    owner: { scope: 'inherit', parentField: 'id', childField: 'agent_id' },
  })
  public declare runs: Relation<AIAgentRunEntity>;

  @RELATION({
    target: 'AIAgentVersion',
    relation: 'HAS_AGENT_VERSION',
    store: 'supabase',
    many: true,
    owner: { scope: 'inherit', parentField: 'id', childField: 'agent_id' },
  })
  public declare versions: Relation<AIAgentVersionEntity>;

  protected async preCommit(row: Record<string, unknown>): Promise<void> {
    const now = new Date().toISOString();
    row.created_at ??= now;
    row.updated_at ??= now;
    row.owner_type ??= row.scope_type || 'user';
    row.scope_type ??= row.owner_type || 'user';
    row.owner_id ??= row.user_id || row.organization_id || null;
    row.user_id ??= row.owner_type === 'user' ? row.owner_id : row.user_id;
    row.organization_id ??= row.owner_type === 'organization' ? row.owner_id : row.organization_id;
    row.status ??= row.is_active === false ? 'disabled' : 'active';
    row.model_provider ??= 'openai';
    row.model_id ??= 'gpt-5.3-codex';
    row.runtime_kind ??= 'openai_agents_sdk_sandbox';
    row.sandbox_config ??= { client: 'local', network: 'sandbox' };
    row.capabilities ??= [];
    row.skills ??= [];
    row.permissions ??= [];
    row.manifest ??= {};
    row.shape ??= {};
    row.skill_bindings ??= [];
    row.permission_policy ??= { allow: [], deny: [], requireConfirmation: [] };
    row.is_active ??= true;
    row.max_runtime_seconds ??= 120;
    row.max_tool_passes ??= 8;
  }

  protected async preUpdate(row: Record<string, unknown>): Promise<void> {
    row.updated_at = new Date().toISOString();
  }
}
