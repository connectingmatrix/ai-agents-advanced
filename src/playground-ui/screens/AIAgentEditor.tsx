import { useEffect, useState } from 'react';
import { Save, Bot, Shield, Wrench, Brain, FileOutput, Zap, AlertTriangle, Database, Trash2, RefreshCw } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { MiniAiChat } from '../components/MiniAiChat';
import { Input } from '../components/ui/Input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { Textarea } from '../components/ui/textarea';
import { useNavigate, useSearchParams } from 'react-router';
import { bindAgentWorkflow, createAgent, deleteAgentFile, listWorkflows, loadAgent, loadAgentCapabilityCatalog, rebuildAgentIngestion, updateAgent, updateAgentIngestion } from '@/dataloaders';
import { useUiDataContext } from '../contexts/AuthSessionContext';
import type { AgentCatalogSkill, AgentCreateInput, AgentFileShapeRecord, AgentIngestionModeInput, EntityRecord } from '@/orm';
import { useToast } from '../components/Toast';
import { LoadingState } from '../components/LoadingState';
import { chatRoute } from '../data/chatRoute';
import { AgentOutputPreview } from '../components/editors/AgentOutputPreview';

type AgentRisk = 'high' | 'medium' | 'low';
type AgentOutputBlock = 'text' | 'image' | 'file' | 'chart' | 'table';
type AgentEditorTab = 'basic' | 'tools' | 'guardrails' | 'output' | 'memory' | 'skills';
type AgentResponseFormat = 'markdown' | 'json' | 'mixed';
type AgentMemoryScope = 'chat' | 'session' | 'user' | 'organization' | 'agent';

export default function AIAgentEditor() {
    const context = useUiDataContext();
    const navigate = useNavigate();
    const { showToast } = useToast();
    const [searchParams] = useSearchParams();
    const agentId = searchParams.get('id');
    const isEditing = !!agentId;

    const [activeTab, setActiveTab] = useState<AgentEditorTab>('basic');

    // Basic Info
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [model, setModel] = useState('gpt-5.3-codex');
    const [systemPrompt, setSystemPrompt] = useState('');

    // Tool Policy
    const [allowSystemTools, setAllowSystemTools] = useState(true);
    const [allowEntityTools, setAllowEntityTools] = useState(true);
    const [allowWorkflowTools, setAllowWorkflowTools] = useState(true);
    const [allowFileTools, setAllowFileTools] = useState(false);
    const [allowMcpTools, setAllowMcpTools] = useState(false);
    const [allowedTools, setAllowedTools] = useState<string[]>([]);
    const [blockedTools, setBlockedTools] = useState<string[]>([]);
    const [maxToolPasses, setMaxToolPasses] = useState(10);
    const [requireConfirmationFor, setRequireConfirmationFor] = useState<AgentRisk[]>(['high']);

    // Guardrails
    const [requireConfirmation, setRequireConfirmation] = useState(true);
    const [blockDestructive, setBlockDestructive] = useState(true);
    const [blockAdmin, setBlockAdmin] = useState(true);
    const [blockExternalNetwork, setBlockExternalNetwork] = useState(false);
    const [maxRuntimeSeconds, setMaxRuntimeSeconds] = useState(300);
    const [maxCostUsd, setMaxCostUsd] = useState(10);
    const [piiPolicy, setPiiPolicy] = useState<'allow' | 'mask' | 'block'>('mask');
    const [allowedDomains, setAllowedDomains] = useState<string[]>([]);
    const [blockedDomains, setBlockedDomains] = useState<string[]>([]);

    // Agent Output Designer
    const [outputBlocks, setOutputBlocks] = useState<AgentOutputBlock[]>(['text']);
    const [responseFormat, setResponseFormat] = useState<AgentResponseFormat>('markdown');
    const [fileSyntax, setFileSyntax] = useState('');
    const [excelSyntax, setExcelSyntax] = useState('');
    const [chartGroupSyntax, setChartGroupSyntax] = useState('');
    const [outputDesignerDraft, setOutputDesignerDraft] = useState('Here is a KPI summary.\n\n[chart]{\"series\":[{\"label\":\"Completed\",\"value\":82},{\"label\":\"Blocked\",\"value\":9}]}[/chart]\n\n[excel]{\"sheets\":[{\"name\":\"Tasks\",\"rows\":[[\"Task\",\"Status\"],[\"Ingestion\",\"Ready\"],[\"Slash commands\",\"Ready\"]]}]}[/excel]');

    // Memory Policy
    const [memoryEnabled, setMemoryEnabled] = useState(true);
    const [memoryScope, setMemoryScope] = useState<AgentMemoryScope>('user');
    const [writeFeedback, setWriteFeedback] = useState(true);
    const [readBeforeRun, setReadBeforeRun] = useState(true);
    const [maxMemories, setMaxMemories] = useState(100);
    const [defaultImportance, setDefaultImportance] = useState(5);
    const [retentionDays, setRetentionDays] = useState(90);
    const [isAgentLoading, setIsAgentLoading] = useState(isEditing);
    const [isCatalogLoading, setIsCatalogLoading] = useState(true);
    const [catalogSkills, setCatalogSkills] = useState<AgentCatalogSkill[]>([]);
    const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([]);
    const [availableWorkflows, setAvailableWorkflows] = useState<EntityRecord[]>([]);
    const [selectedWorkflowId, setSelectedWorkflowId] = useState('');
    const [attachedFiles, setAttachedFiles] = useState<AgentFileShapeRecord[]>([]);
    const [selectedIngestionFileIds, setSelectedIngestionFileIds] = useState<string[]>([]);
    const [ingestionModesByFile, setIngestionModesByFile] = useState<Record<string, AgentIngestionModeInput[]>>({});
    const [ingestionProgressByFile, setIngestionProgressByFile] = useState<Record<string, { label: string; percent: number }>>({});
    const [bulkIngestionMode, setBulkIngestionMode] = useState<AgentIngestionModeInput>('SUMMARY');
    const [isIngestionSaving, setIsIngestionSaving] = useState(false);
    const ingestionModeOptions: Array<{ id: AgentIngestionModeInput; label: string; icon: string }> = [
        { id: 'FILE_TREE', label: 'Tree', icon: '🌳' },
        { id: 'FILE_NAMES_ONLY', label: 'Names', icon: '🏷️' },
        { id: 'SUMMARY', label: 'Summary', icon: '🧾' },
        { id: 'RANDOM_CHUNKS', label: 'Chunks', icon: '🧩' },
        { id: 'FULL_FILE', label: 'Full', icon: '📄' },
        { id: 'TABULAR_PROFILE', label: 'Profile', icon: '📊' },
        { id: 'IMAGE_VISION', label: 'Vision', icon: '🖼️' },
        { id: 'REJECT', label: 'Reject', icon: '🚫' }
    ];
    const selectedIngestionFiles = () => attachedFiles.filter((file) => selectedIngestionFileIds.includes(file.id));
    const toggleIngestionFile = (id: string) => setSelectedIngestionFileIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
    const setFileIngestionModes = (fileId: string, modes: AgentIngestionModeInput[]) => setIngestionModesByFile((current) => ({ ...current, [fileId]: modes.length ? modes : ['AUTO'] }));
    const toggleFileIngestionMode = (fileId: string, currentModes: AgentIngestionModeInput[], mode: AgentIngestionModeInput, checked: boolean) => {
        const nextModes = checked ? (Array.from(new Set([...currentModes, mode])) as AgentIngestionModeInput[]) : (currentModes.filter((item) => item !== mode) as AgentIngestionModeInput[]);
        setFileIngestionModes(fileId, nextModes);
    };
    const fileProgress = (file: AgentFileShapeRecord, modes: string[]) => {
        const active = ingestionProgressByFile[file.id];
        if (active) return active;
        if (file.status === 'rejected') return { percent: 100, label: 'Rejected' };
        if (file.status === 'configured' || file.status === 'indexed') return { percent: 100, label: file.status };
        if (modes.length) return { percent: 65, label: 'Configured; rebuild ready' };
        return { percent: 20, label: 'Mode required' };
    };
    const mergeReturnedFileShapes = (fileShapes: AgentFileShapeRecord[]) => {
        if (!fileShapes.length) return;
        setAttachedFiles(fileShapes);
        setIngestionModesByFile(Object.fromEntries(fileShapes.map((file) => [file.id, (file.ingestionMode ? [file.ingestionMode] : ['AUTO']) as AgentIngestionModeInput[]])));
    };
    const applyBulkIngestionMode = async (mode: AgentIngestionModeInput = bulkIngestionMode) => {
        const selected = selectedIngestionFiles();
        if (!selected.length) return;
        const nextModes = Object.fromEntries(selected.map((file) => [file.id, Array.from(new Set([...(ingestionModesByFile[file.id] || []), mode])) as AgentIngestionModeInput[]]));
        setIngestionModesByFile((current) => ({ ...current, ...nextModes }));
        if (!agentId) return;
        setIsIngestionSaving(true);
        try {
            for (const file of selected) {
                setIngestionProgressByFile((current) => ({ ...current, [file.id]: { percent: 35, label: 'Updating mode…' } }));
                const payload = await updateAgentIngestion(context, { agentId, attachmentId: file.id, modes: nextModes[file.id], rebuild: true });
                mergeReturnedFileShapes(payload.fileShapes);
                setIngestionProgressByFile((current) => ({ ...current, [file.id]: { percent: 100, label: payload.status } }));
            }
            showToast('success', 'Ingestion mode applied.');
        } catch (error) {
            showToast('error', error instanceof Error ? error.message : 'Ingestion update failed');
        } finally {
            setIsIngestionSaving(false);
        }
    };
    const rebuildSelectedIngestion = async () => {
        if (!agentId) return;
        const selected = selectedIngestionFiles();
        const modes = Array.from(new Set(selected.flatMap((file) => ingestionModesByFile[file.id] || []))).filter(Boolean) as AgentIngestionModeInput[];
        setIsIngestionSaving(true);
        try {
            selected.forEach((file) => setIngestionProgressByFile((current) => ({ ...current, [file.id]: { percent: 70, label: 'Queued rebuild…' } })));
            const payload = await rebuildAgentIngestion(context, { agentId, modes: modes.length ? modes : ['AUTO'], replaceExisting: true });
            selected.forEach((file) => setIngestionProgressByFile((current) => ({ ...current, [file.id]: { percent: 100, label: payload.status } })));
            showToast('success', `Ingestion rebuild queued for ${payload.queuedFiles} file(s).`);
        } catch (error) {
            showToast('error', error instanceof Error ? error.message : 'Ingestion rebuild failed');
        } finally {
            setIsIngestionSaving(false);
        }
    };
    const removeSelectedFromIngestion = async () => {
        const selected = selectedIngestionFiles();
        if (!selected.length) return;
        if (!agentId) {
            setAttachedFiles((current) => current.filter((file) => !selectedIngestionFileIds.includes(file.id)));
            setSelectedIngestionFileIds([]);
            return;
        }
        setIsIngestionSaving(true);
        try {
            for (const file of selected) {
                setIngestionProgressByFile((current) => ({ ...current, [file.id]: { percent: 45, label: 'Removing…' } }));
                const payload = await deleteAgentFile(context, agentId, file.id);
                mergeReturnedFileShapes(payload.fileShapes);
            }
            setSelectedIngestionFileIds([]);
            showToast('success', 'Selected files removed from ingested memory.');
        } catch (error) {
            showToast('error', error instanceof Error ? error.message : 'File removal failed');
        } finally {
            setIsIngestionSaving(false);
        }
    };


    useEffect(() => {
        let active = true;
        setIsCatalogLoading(true);
        Promise.all([loadAgentCapabilityCatalog(context), listWorkflows(context)])
            .then(([catalog, workflowList]) => {
                if (!active) return;
                setCatalogSkills(catalog.skills);
                setAvailableWorkflows(workflowList.rows);
            })
            .catch((error) => showToast('error', error instanceof Error ? error.message : 'Agent capability catalog failed to load'))
            .finally(() => {
                if (active) setIsCatalogLoading(false);
            });
        return () => {
            active = false;
        };
    }, [context, showToast]);

    useEffect(() => {
        if (!agentId) {
            setIsAgentLoading(false);
            return;
        }

        let active = true;
        setIsAgentLoading(true);

        const loadAgentRecord = async () => {
            const record = await loadAgent(context, agentId);
            if (!active) return;
            setName(record.title);
            setDescription(record.subtitle);
            setModel(record.modelId);
            setSystemPrompt(record.instructions);
            setAllowSystemTools(record.toolPolicy.allowSystemTools);
            setAllowEntityTools(record.toolPolicy.allowEntityTools);
            setAllowWorkflowTools(record.toolPolicy.allowWorkflowTools);
            setAllowFileTools(record.toolPolicy.allowFileTools);
            setAllowMcpTools(record.toolPolicy.allowMcpTools);
            setAllowedTools(record.toolPolicy.allowedTools);
            setBlockedTools(record.toolPolicy.blockedTools);
            setMaxToolPasses(record.toolPolicy.maxToolPasses);
            setRequireConfirmationFor(record.toolPolicy.requireConfirmationFor as AgentRisk[]);
            setRequireConfirmation(record.guardrails.requireConfirmation);
            setBlockDestructive(record.guardrails.blockDestructive);
            setBlockAdmin(record.guardrails.blockAdmin);
            setBlockExternalNetwork(record.guardrails.blockExternalNetwork);
            setMaxRuntimeSeconds(record.guardrails.maxRuntimeSeconds);
            setMaxCostUsd(record.guardrails.maxCostUsd);
            setPiiPolicy(record.guardrails.piiPolicy as 'allow' | 'mask' | 'block');
            setAllowedDomains(record.guardrails.allowedDomains);
            setBlockedDomains(record.guardrails.blockedDomains);
            setOutputBlocks(record.outputContract.blocks as AgentOutputBlock[]);
            setResponseFormat(record.outputContract.responseFormat as AgentResponseFormat);
            setFileSyntax(record.outputContract.fileSyntax);
            setExcelSyntax(record.outputContract.excelSyntax);
            setChartGroupSyntax(record.outputContract.chartGroupSyntax);
            setMemoryEnabled(record.memoryPolicy.enabled);
            setMemoryScope(record.memoryPolicy.scope as AgentMemoryScope);
            setWriteFeedback(record.memoryPolicy.writeFeedback);
            setReadBeforeRun(record.memoryPolicy.readBeforeRun);
            setMaxMemories(record.memoryPolicy.maxMemories);
            setDefaultImportance(record.memoryPolicy.defaultImportance);
            setRetentionDays(record.memoryPolicy.retentionDays);
            setSelectedSkillIds(record.skillBindings.map((binding) => binding.skillId));
            setSelectedWorkflowId(record.workflowBindings[0]?.workflowId || '');
            setAttachedFiles(record.fileShapes);
            setIngestionModesByFile(Object.fromEntries(record.fileShapes.map((file) => [file.id, (file.ingestionMode ? [file.ingestionMode] : ['AUTO']) as AgentIngestionModeInput[]])));
        };

        void loadAgentRecord()
            .catch((error) => showToast('error', error instanceof Error ? error.message : 'Agent failed to load'))
            .finally(() => {
                if (active) setIsAgentLoading(false);
            });
        return () => {
            active = false;
        };
    }, [agentId, context, showToast]);

    const handleSave = async () => {
        const selectedSkills = catalogSkills.filter((skill) => selectedSkillIds.includes(skill.id));
        const permissions = selectedSkills.flatMap((skill) => skill.permissions);
        const input: AgentCreateInput = {
            name,
            slug: name.trim().toLowerCase().replace(/\s+/g, '-'),
            description,
            instructions: systemPrompt,
            modelProvider: 'openai',
            modelId: model,
            toolPolicy: {
                allowSystemTools,
                allowEntityTools,
                allowWorkflowTools,
                allowFileTools,
                allowMcpTools,
                allowedTools,
                blockedTools,
                maxToolPasses,
                requireConfirmationFor
            },
            guardrails: {
                requireConfirmation,
                blockDestructive,
                blockAdmin,
                blockExternalNetwork,
                maxRuntimeSeconds,
                maxCostUsd,
                piiPolicy,
                allowedDomains,
                blockedDomains
            },
            outputContract: {
                blocks: outputBlocks,
                responseFormat,
                fileSyntax,
                excelSyntax,
                chartGroupSyntax
            },
            memoryPolicy: {
                enabled: memoryEnabled,
                scope: memoryScope,
                writeFeedback,
                readBeforeRun,
                maxMemories,
                defaultImportance,
                retentionDays
            },
            runtimeKind: 'openai_agents_sdk_sandbox',
            sandboxConfig: { client: 'local', network: blockExternalNetwork ? 'none' : 'sandbox', timeoutSeconds: maxRuntimeSeconds },
            skills: selectedSkills,
            skillBindings: selectedSkills.map((skill) => ({ skillId: skill.id, enabled: true, config: [] })),
            permissionPolicy: { allow: permissions, deny: blockedTools, requireConfirmation: requireConfirmation ? requireConfirmationFor : [] },
            metadata: { tags: selectedSkillIds, category: 'user-agent', createdFrom: 'ui-agent-editor' },
            maxRuntimeSeconds,
            maxToolPasses,
            isDefault: false
        };
        if (agentId) {
            await updateAgent(context, agentId, input);
            if (selectedWorkflowId) await bindAgentWorkflow(context, agentId, selectedWorkflowId);
            showToast('success', 'Agent updated');
        } else {
            const created = await createAgent(context, input);
            if (selectedWorkflowId) await bindAgentWorkflow(context, created.id, selectedWorkflowId);
            showToast('success', 'Agent created');
        }
        navigate('/ai-agents');
    };

    const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) => <Switch checked={checked} onCheckedChange={onChange} />;

    const visibleCatalogSkills = catalogSkills.filter((skill) => !skill.id.toLowerCase().includes('internal') && !skill.name.toLowerCase().includes('internal'));
    const selectedSkills = visibleCatalogSkills.filter((skill) => selectedSkillIds.includes(skill.id));
    const selectedPermissions = selectedSkills.flatMap((skill) => skill.permissions);

    const tabs: Array<{ id: AgentEditorTab; label: string; icon: typeof Bot }> = [
        { id: 'basic', label: 'Basic Info', icon: Bot },
        { id: 'tools', label: 'Tool Policy', icon: Wrench },
        { id: 'guardrails', label: 'Guardrails', icon: Shield },
        { id: 'output', label: 'Output', icon: FileOutput },
        { id: 'memory', label: 'Memory', icon: Brain },
        { id: 'skills', label: 'Skills', icon: Zap }
    ];

    return (
        <div className="min-h-screen bg-background dark:bg-[#0a0a0a]">
            {/* Top Bar */}
            <div className="border-b border-border dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f] sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-8 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold dark:text-gray-100">{isEditing ? 'Edit Agent' : 'Create New Agent'}</h1>
                                <p className="text-sm text-muted-foreground dark:text-gray-400">Configure your AI agent's behavior and capabilities</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="outline" onClick={() => navigate('/ai-agents')}>
                                Cancel
                            </Button>
                            {agentId && (
                                <Button variant="outline" onClick={() => navigate(chatRoute(undefined, '', { agentId }))}>
                                    Test Agent
                                </Button>
                            )}
                            <Button onClick={handleSave} className="gap-2" disabled={isAgentLoading}>
                                <Save className="w-4 h-4" />
                                {isEditing ? 'Save Changes' : 'Create Agent'}
                            </Button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-6 border-b border-border dark:border-[#2a2a2a] -mb-4">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`pb-4 px-1 font-medium transition-colors relative flex items-center gap-2 ${
                                        activeTab === tab.id ? 'text-primary dark:text-primary' : 'text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200'
                                    }`}
                                >
                                    <Icon className="w-4 h-4" />
                                    {tab.label}
                                    {activeTab === tab.id && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-8 py-8">
                {isAgentLoading && <LoadingState type="skeleton-list" count={6} />}

                {!isAgentLoading && activeTab === 'basic' && (
                    <div className="max-w-3xl space-y-6">
                        <Card>
                            <h3 className="text-lg font-semibold mb-4 dark:text-gray-100">Basic Information</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">Agent Name *</label>
                                    <Input value={name} onChange={(event) => setName(event.target.value)} />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">Description</label>
                                    <Textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3} className="resize-y" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">Model *</label>
                                    <Select value={model} onValueChange={setModel}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="gpt-5.3-codex">GPT-5.3 Codex (Planning + execution)</SelectItem>
                                            <SelectItem value="gpt-5.4">GPT-5.4 (High reasoning)</SelectItem>
                                            <SelectItem value="gpt-5.4-mini">GPT-5.4 Mini (Fast specialist)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">System Prompt</label>
                                    <Textarea value={systemPrompt} onChange={(event) => setSystemPrompt(event.target.value)} rows={6} className="font-mono text-sm resize-y" />
                                    <p className="text-xs text-muted-foreground dark:text-gray-500 mt-1">This prompt will guide the agent's behavior and responses</p>
                                </div>
                            </div>
                        </Card>
                        <MiniAiChat title="Test AI Agent" contextId={agentId || 'draft-agent'} agentId={agentId} seedPrompt={`Test agent ${name || 'draft'} against its system prompt, tools, permissions, memory, and attached capabilities.`} />
                    </div>
                )}

                {!isAgentLoading && activeTab === 'tools' && (
                    <div className="max-w-3xl space-y-6">
                        <Card>
                            <div className="flex items-center gap-3 mb-4">
                                <Wrench className="w-5 h-5 text-primary" />
                                <h3 className="text-lg font-semibold dark:text-gray-100">Tool Permissions</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-border dark:border-[#2a2a2a]">
                                    <div>
                                        <h4 className="font-medium dark:text-gray-200">System Tools</h4>
                                        <p className="text-sm text-muted-foreground dark:text-gray-400">Allow access to system-level operations</p>
                                    </div>
                                    <ToggleSwitch checked={allowSystemTools} onChange={setAllowSystemTools} />
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-border dark:border-[#2a2a2a]">
                                    <div>
                                        <h4 className="font-medium dark:text-gray-200">Entity Tools</h4>
                                        <p className="text-sm text-muted-foreground dark:text-gray-400">Allow CRUD operations on entities</p>
                                    </div>
                                    <ToggleSwitch checked={allowEntityTools} onChange={setAllowEntityTools} />
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-border dark:border-[#2a2a2a]">
                                    <div>
                                        <h4 className="font-medium dark:text-gray-200">Workflow Tools</h4>
                                        <p className="text-sm text-muted-foreground dark:text-gray-400">Allow execution of workflows</p>
                                    </div>
                                    <ToggleSwitch checked={allowWorkflowTools} onChange={setAllowWorkflowTools} />
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-border dark:border-[#2a2a2a]">
                                    <div>
                                        <h4 className="font-medium dark:text-gray-200">File Tools</h4>
                                        <p className="text-sm text-muted-foreground dark:text-gray-400">Allow file operations (read, write, delete)</p>
                                    </div>
                                    <ToggleSwitch checked={allowFileTools} onChange={setAllowFileTools} />
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-border dark:border-[#2a2a2a]">
                                    <div>
                                        <h4 className="font-medium dark:text-gray-200">MCP Tools</h4>
                                        <p className="text-sm text-muted-foreground dark:text-gray-400">Allow Model Context Protocol tools</p>
                                    </div>
                                    <ToggleSwitch checked={allowMcpTools} onChange={setAllowMcpTools} />
                                </div>

                                <div className="pt-4">
                                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">Max Tool Passes</label>
                                    <Input type="number" value={maxToolPasses} onChange={(event) => setMaxToolPasses(Number(event.target.value))} min={1} max={50} className="w-32" />
                                    <p className="text-xs text-muted-foreground dark:text-gray-500 mt-1">Maximum number of tool invocations per request</p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">Require Confirmation For</label>
                                    <div className="flex gap-2">
                                        {(['high', 'medium', 'low'] as AgentRisk[]).map((risk) => (
                                            <button
                                                key={risk}
                                                onClick={() => {
                                                    setRequireConfirmationFor(requireConfirmationFor.includes(risk) ? requireConfirmationFor.filter((r) => r !== risk) : [...requireConfirmationFor, risk]);
                                                }}
                                                className={`px-4 py-2 rounded-lg border transition-colors ${
                                                    requireConfirmationFor.includes(risk) ? 'bg-primary text-white border-primary' : 'border-border dark:border-[#2a2a2a] dark:text-gray-300 hover:border-primary'
                                                }`}
                                            >
                                                {risk.charAt(0).toUpperCase() + risk.slice(1)} Risk
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {!isAgentLoading && activeTab === 'guardrails' && (
                    <div className="max-w-3xl space-y-6">
                        <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/10">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                                <div>
                                    <h4 className="font-medium text-yellow-900 dark:text-yellow-200 mb-1">Safety Guardrails</h4>
                                    <p className="text-sm text-yellow-800 dark:text-yellow-300">Configure safety measures to prevent unauthorized or dangerous operations</p>
                                </div>
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-center gap-3 mb-4">
                                <Shield className="w-5 h-5 text-primary" />
                                <h3 className="text-lg font-semibold dark:text-gray-100">Security Settings</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-border dark:border-[#2a2a2a]">
                                    <div>
                                        <h4 className="font-medium dark:text-gray-200">Require Confirmation</h4>
                                        <p className="text-sm text-muted-foreground dark:text-gray-400">Ask for user approval before executing risky actions</p>
                                    </div>
                                    <ToggleSwitch checked={requireConfirmation} onChange={setRequireConfirmation} />
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-border dark:border-[#2a2a2a]">
                                    <div>
                                        <h4 className="font-medium dark:text-gray-200">Block Destructive Operations</h4>
                                        <p className="text-sm text-muted-foreground dark:text-gray-400">Prevent deletion and destructive modifications</p>
                                    </div>
                                    <ToggleSwitch checked={blockDestructive} onChange={setBlockDestructive} />
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-border dark:border-[#2a2a2a]">
                                    <div>
                                        <h4 className="font-medium dark:text-gray-200">Block Admin Operations</h4>
                                        <p className="text-sm text-muted-foreground dark:text-gray-400">Restrict administrative and privileged actions</p>
                                    </div>
                                    <ToggleSwitch checked={blockAdmin} onChange={setBlockAdmin} />
                                </div>

                                <div className="flex items-center justify-between py-3 border-b border-border dark:border-[#2a2a2a]">
                                    <div>
                                        <h4 className="font-medium dark:text-gray-200">Block External Network</h4>
                                        <p className="text-sm text-muted-foreground dark:text-gray-400">Prevent outbound network requests</p>
                                    </div>
                                    <ToggleSwitch checked={blockExternalNetwork} onChange={setBlockExternalNetwork} />
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2 dark:text-gray-200">Max Runtime (seconds)</label>
                                        <Input type="number" value={maxRuntimeSeconds} onChange={(event) => setMaxRuntimeSeconds(Number(event.target.value))} min={10} max={3600} />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2 dark:text-gray-200">Max Cost (USD)</label>
                                        <Input type="number" value={maxCostUsd} onChange={(event) => setMaxCostUsd(Number(event.target.value))} min={0} step={0.1} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">PII Policy</label>
                                    <div className="flex gap-2">
                                        {(['allow', 'mask', 'block'] as const).map((policy) => (
                                            <button
                                                key={policy}
                                                onClick={() => setPiiPolicy(policy)}
                                                className={`px-4 py-2 rounded-lg border transition-colors ${
                                                    piiPolicy === policy ? 'bg-primary text-white border-primary' : 'border-border dark:border-[#2a2a2a] dark:text-gray-300 hover:border-primary'
                                                }`}
                                            >
                                                {policy.charAt(0).toUpperCase() + policy.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-muted-foreground dark:text-gray-500 mt-2">How to handle Personally Identifiable Information</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}

                {!isAgentLoading && activeTab === 'skills' && (
                    <div className="max-w-4xl space-y-6">
                        <Card>
                            <div className="mb-4 flex items-center gap-3">
                                <Zap className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-semibold dark:text-gray-100">Agent Capabilities</h3>
                            </div>
                            {isCatalogLoading ? (
                                <LoadingState type="skeleton-list" count={3} />
                            ) : (
                                <div className="space-y-4">
                                    <Select onValueChange={(value) => !selectedSkillIds.includes(value) && setSelectedSkillIds([...selectedSkillIds, value])}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Attach an agent capability" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {visibleCatalogSkills
                                                .filter((skill) => !selectedSkillIds.includes(skill.id))
                                                .map((skill) => (
                                                    <SelectItem key={skill.id} value={skill.id}>
                                                        {skill.name} — {skill.permissions.length} permissions
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                    <div className="space-y-3">
                                        {selectedSkills.map((skill) => (
                                            <div key={skill.id} className="rounded-lg border border-border p-4 dark:border-[#2a2a2a]">
                                                <div className="mb-2 flex items-start justify-between gap-3">
                                                    <div>
                                                        <h4 className="font-semibold dark:text-gray-100">{skill.name}</h4>
                                                        <p className="text-sm text-muted-foreground dark:text-gray-400">{skill.description}</p>
                                                    </div>
                                                    <Button variant="outline" size="sm" onClick={() => setSelectedSkillIds(selectedSkillIds.filter((id) => id !== skill.id))}>
                                                        Remove
                                                    </Button>
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {skill.permissions.map((permission) => (
                                                        <Badge key={permission} variant="default">
                                                            {permission}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {selectedPermissions.length > 0 && (
                                        <div className="rounded-lg bg-muted/50 p-4 dark:bg-[#151515]">
                                            <p className="mb-2 text-sm font-medium dark:text-gray-200">Permission stack</p>
                                            <div className="flex flex-wrap gap-2">
                                                {Array.from(new Set(selectedPermissions)).map((permission) => (
                                                    <Badge key={permission} variant="success">
                                                        {permission}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </Card>
                        <Card>
                            <div className="mb-3 flex items-center gap-3">
                                <Zap className="h-5 w-5 text-primary" />
                                <h3 className="text-lg font-semibold dark:text-gray-100">Published Workflow Binding</h3>
                            </div>
                            {isCatalogLoading ? (
                                <LoadingState type="skeleton-list" count={2} />
                            ) : (
                                <Select value={selectedWorkflowId || 'none'} onValueChange={(value) => setSelectedWorkflowId(value === 'none' ? '' : value)}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="none">No workflow binding</SelectItem>
                                        {availableWorkflows.map((workflow) => (
                                            <SelectItem key={workflow.id} value={workflow.id}>
                                                {workflow.title}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                            <p className="mt-2 text-xs text-muted-foreground dark:text-gray-500">Bound workflows expose only Workflow Builder permissions allowed by the binding.</p>
                        </Card>
                        <Card>
                            <h3 className="mb-3 text-lg font-semibold dark:text-gray-100">Backend Attachments</h3>
                            <div className="grid gap-3 md:grid-cols-2">
                                <div className="rounded-lg border border-border p-3 dark:border-[#2a2a2a]">
                                    <p className="text-sm font-medium dark:text-gray-200">Files and manifests</p>
                                    <p className="mb-3 text-xs text-muted-foreground">Registered through backend creationAttachments/fileShapes.</p>
                                    {attachedFiles.length ? (
                                        <div className="space-y-2">
                                            {attachedFiles.map((file) => (
                                                <div key={file.id} className="rounded-md bg-muted/50 p-2 text-sm dark:bg-[#151515]">
                                                    <div className="font-medium dark:text-gray-200">{file.fileName}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {file.shapeKind} · {file.mimeType} · {file.status}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No backend file shapes are attached to this agent yet.</p>
                                    )}
                                </div>
                                <div className="rounded-lg border border-border p-3 dark:border-[#2a2a2a]">
                                    <p className="text-sm font-medium dark:text-gray-200">Databases and tools</p>
                                    <p className="text-xs text-muted-foreground">Database access is controlled by Entity Tools, allowed tool IDs, and the permission stack shown above.</p>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {allowEntityTools && <Badge variant="success">Entity tools</Badge>}
                                        {allowFileTools && <Badge variant="success">File tools</Badge>}
                                        {allowWorkflowTools && <Badge variant="success">Workflow tools</Badge>}
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <MiniAiChat title="Test AI Agent" contextId={agentId || 'draft-agent'} agentId={agentId} seedPrompt={`Test agent ${name || 'draft'} with its selected skills, workflow binding, files, and permission stack.`} />
                    </div>
                )}

                {!isAgentLoading && activeTab === 'output' && (
                    <div className="max-w-3xl space-y-6">
                        <Card>
                            <div className="flex items-center gap-3 mb-4">
                                <FileOutput className="w-5 h-5 text-primary" />
                                <h3 className="text-lg font-semibold dark:text-gray-100">Output Configuration</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">Allowed Output Blocks</label>
                                    <div className="grid grid-cols-2 gap-2">
                                        {(['text', 'image', 'file', 'chart', 'table'] as AgentOutputBlock[]).map((block) => (
                                            <button
                                                key={block}
                                                onClick={() => {
                                                    setOutputBlocks(outputBlocks.includes(block) ? outputBlocks.filter((b) => b !== block) : [...outputBlocks, block]);
                                                }}
                                                className={`px-4 py-2 rounded-lg border transition-colors text-left ${
                                                    outputBlocks.includes(block) ? 'bg-primary/10 dark:bg-primary/20 text-primary border-primary' : 'border-border dark:border-[#2a2a2a] dark:text-gray-300 hover:border-primary'
                                                }`}
                                            >
                                                {block.charAt(0).toUpperCase() + block.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">Response Format</label>
                                    <Select value={responseFormat} onValueChange={(value) => setResponseFormat(value as AgentResponseFormat)}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="markdown">Markdown</SelectItem>
                                            <SelectItem value="json">JSON</SelectItem>
                                            <SelectItem value="mixed">Mixed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">File Syntax</label>
                                    <Input value={fileSyntax} onChange={(event) => setFileSyntax(event.target.value)} className="font-mono text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">Excel Syntax</label>
                                    <Input value={excelSyntax} onChange={(event) => setExcelSyntax(event.target.value)} className="font-mono text-sm" />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">Chart Group Syntax</label>
                                    <Input value={chartGroupSyntax} onChange={(event) => setChartGroupSyntax(event.target.value)} className="font-mono text-sm" />
                                </div>
                            </div>
                        </Card>
                        <Card>
                            <div className="flex items-center gap-3 mb-4">
                                <FileOutput className="w-5 h-5 text-primary" />
                                <h3 className="text-lg font-semibold dark:text-gray-100">Agent Output Designer</h3>
                            </div>
                            <p className="mb-3 text-sm text-muted-foreground">Design, edit, and preview the exact markdown contract the agent should emit, including [chart], [excel], and Mermaid blocks.</p>
                            <Textarea value={outputDesignerDraft} onChange={(event) => setOutputDesignerDraft(event.target.value)} rows={8} className="font-mono text-sm resize-y" />
                            <div className="mt-4 rounded-xl border border-border bg-muted/20 p-4 dark:border-[#2a2a2a] dark:bg-[#121212]">
                                <AgentOutputPreview content={outputDesignerDraft} />
                            </div>
                        </Card>
                    </div>
                )}

                {!isAgentLoading && activeTab === 'memory' && (
                    <div className="max-w-3xl space-y-6">
                        <Card>
                            <div className="flex items-center gap-3 mb-4">
                                <Brain className="w-5 h-5 text-primary" />
                                <h3 className="text-lg font-semibold dark:text-gray-100">Memory Configuration</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between py-3 border-b border-border dark:border-[#2a2a2a]">
                                    <div>
                                        <h4 className="font-medium dark:text-gray-200">Enable Memory</h4>
                                        <p className="text-sm text-muted-foreground dark:text-gray-400">Allow the agent to remember context across conversations</p>
                                    </div>
                                    <ToggleSwitch checked={memoryEnabled} onChange={setMemoryEnabled} />
                                </div>

                                {memoryEnabled && (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium mb-2 dark:text-gray-200">Memory Scope</label>
                                            <Select value={memoryScope} onValueChange={(value) => setMemoryScope(value as AgentMemoryScope)}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="chat">Chat (current conversation only)</SelectItem>
                                                    <SelectItem value="session">Session (current session)</SelectItem>
                                                    <SelectItem value="user">User (across all user conversations)</SelectItem>
                                                    <SelectItem value="organization">Organization (shared across org)</SelectItem>
                                                    <SelectItem value="agent">Agent (shared across all users)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="flex items-center justify-between py-3 border-b border-border dark:border-[#2a2a2a]">
                                            <div>
                                                <h4 className="font-medium dark:text-gray-200">Write Feedback</h4>
                                                <p className="text-sm text-muted-foreground dark:text-gray-400">Store user feedback in memory</p>
                                            </div>
                                            <ToggleSwitch checked={writeFeedback} onChange={setWriteFeedback} />
                                        </div>

                                        <div className="flex items-center justify-between py-3 border-b border-border dark:border-[#2a2a2a]">
                                            <div>
                                                <h4 className="font-medium dark:text-gray-200">Read Before Run</h4>
                                                <p className="text-sm text-muted-foreground dark:text-gray-400">Load memories before processing requests</p>
                                            </div>
                                            <ToggleSwitch checked={readBeforeRun} onChange={setReadBeforeRun} />
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2 dark:text-gray-200">Max Memories</label>
                                                <Input type="number" value={maxMemories} onChange={(event) => setMaxMemories(Number(event.target.value))} min={1} max={1000} />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium mb-2 dark:text-gray-200">Retention Days</label>
                                                <Input type="number" value={retentionDays} onChange={(event) => setRetentionDays(Number(event.target.value))} min={1} max={365} />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium mb-2 dark:text-gray-200">Default Importance (1-10)</label>
                                            <Input type="range" value={defaultImportance} onChange={(event) => setDefaultImportance(Number(event.target.value))} min={1} max={10} className="w-full" />
                                            <div className="flex justify-between text-xs text-muted-foreground dark:text-gray-500 mt-1">
                                                <span>Low</span>
                                                <span className="font-medium dark:text-gray-300">{defaultImportance}</span>
                                                <span>High</span>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        </Card>
                        <Card>
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                <div className="flex items-center gap-3">
                                    <Database className="w-5 h-5 text-primary" />
                                    <div>
                                        <h3 className="text-lg font-semibold dark:text-gray-100">Ingestion Files</h3>
                                        <p className="text-xs text-muted-foreground">Select multiple files, apply a shared mode, rebuild ingestion, or remove files from memory.</p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <Select value={bulkIngestionMode} onValueChange={(value) => setBulkIngestionMode(value as AgentIngestionModeInput)}>
                                        <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                                        <SelectContent>{ingestionModeOptions.map((mode) => <SelectItem key={mode.id} value={mode.id}>{mode.icon} {mode.label}</SelectItem>)}</SelectContent>
                                    </Select>
                                    <Button size="sm" variant="secondary" onClick={() => void applyBulkIngestionMode()} disabled={!selectedIngestionFileIds.length || isIngestionSaving}>Apply Mode</Button>
                                    <Button size="sm" variant="secondary" onClick={() => void rebuildSelectedIngestion()} disabled={!selectedIngestionFileIds.length || !agentId || isIngestionSaving}><RefreshCw className="w-4 h-4 mr-1" />Rebuild</Button>
                                    <Button size="sm" variant="secondary" onClick={() => void removeSelectedFromIngestion()} disabled={!selectedIngestionFileIds.length || isIngestionSaving}><Trash2 className="w-4 h-4 mr-1" />Remove</Button>
                                </div>
                            </div>
                            <div className="overflow-x-auto rounded-lg border border-border dark:border-[#2a2a2a]">
                                <table className="w-full text-sm">
                                    <thead className="bg-muted/40 dark:bg-[#171717]"><tr><th className="p-3 text-left">Select</th><th className="p-3 text-left">File</th><th className="p-3 text-left">Mode selector</th><th className="p-3 text-left">Progress</th></tr></thead>
                                    <tbody>
                                        {attachedFiles.length === 0 && <tr><td colSpan={4} className="p-4 text-muted-foreground">No agent memory files yet. Upload skill, manifest, DB, CSV, Excel, document, or image files from the Drive-backed attachment flow.</td></tr>}
                                        {attachedFiles.map((file) => {
                                            const fileModes = ingestionModesByFile[file.id] || (file.ingestionMode ? [file.ingestionMode] : []);
                                            const progress = fileProgress(file, fileModes);
                                            return <tr key={file.id} className="border-t border-border dark:border-[#2a2a2a]"><td className="p-3"><input type="checkbox" checked={selectedIngestionFileIds.includes(file.id)} onChange={() => toggleIngestionFile(file.id)} /></td><td className="p-3"><div className="font-medium dark:text-gray-200">{file.fileName || file.id}</div><div className="text-xs text-muted-foreground">{file.shapeKind || file.mimeType} · {file.status}</div><div className="text-xs text-muted-foreground">{file.storageUri || 'Drive file'}</div></td><td className="p-3"><details className="relative"><summary className="cursor-pointer rounded border border-border px-3 py-2 text-xs dark:border-[#2a2a2a]">{fileModes.length ? `${fileModes.length} mode(s)` : 'Choose modes'}</summary><div className="absolute z-20 mt-2 min-w-[220px] rounded-lg border border-border bg-white p-3 shadow-lg dark:border-[#2a2a2a] dark:bg-[#111]"><div className="space-y-2">{ingestionModeOptions.map((mode) => <label key={mode.id} className="flex items-center gap-2 text-xs dark:text-gray-200"><input type="checkbox" checked={fileModes.includes(mode.id)} onChange={(event) => toggleFileIngestionMode(file.id, fileModes as AgentIngestionModeInput[], mode.id, event.target.checked)} /> <span>{mode.icon}</span><span>{mode.label}</span></label>)}</div></div></details><div className="mt-2 flex flex-wrap gap-1">{fileModes.map((mode) => { const option = ingestionModeOptions.find((item) => item.id === mode); return <Badge key={mode} variant="default">{option?.icon} {option?.label || mode}</Badge>; })}</div></td><td className="p-3 min-w-[180px]"><div className="h-2 rounded bg-muted overflow-hidden"><div className="h-full bg-primary transition-all" style={{ width: `${Math.max(0, Math.min(100, progress.percent))}%` }} /></div><div className="mt-1 text-xs text-muted-foreground">{progress.label}</div>{file.summary && <div className="mt-1 line-clamp-2 text-xs text-muted-foreground">{file.summary}</div>}</td></tr>;
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
