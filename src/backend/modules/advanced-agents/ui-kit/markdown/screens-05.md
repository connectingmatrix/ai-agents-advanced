# UI Kit Screens Source Context

This file contains exact source snippets from the uploaded UI kit for the `screens` category.

## `process-monitoring-final/src/app/screens/NodeEditor.tsx`

- Category: `screens`
- Bytes: `64947`
- SHA-256: `38ca9278f554100ac51fde23aaf84b8f22db88d018425f196b10dbe0698252af`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `NodeEditor.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState } from 'react';
import { Save, Box, Settings, Code, FileInput, FileOutput, Info, Plus, FileText, Trash2, Play, CheckCircle, XCircle, Sparkles, Loader, Folder, FolderOpen, ChevronRight, ChevronDown, File, Database } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { useNavigate, useSearchParams } from 'react-router';
import Editor from '@monaco-editor/react';
import { MarkdownEditor } from '../components/editors/MarkdownEditor';

type NodeType = 'processor' | 'notifier' | 'generator' | 'converter' | 'sync' | 'custom';
type NodeCategory = 'Data' | 'Communication' | 'Analytics' | 'Utilities' | 'Integration' | 'Custom';

interface NodeFile {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'folder';
  language?: string;
  content?: string;
  required: boolean;
  children?: NodeFile[];
  isExpanded?: boolean;
}

interface SchemaField {
  id: string;
  name: string;
  type: string;
  required?: boolean;
  description?: string;
}

export default function NodeEditor() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const nodeId = searchParams.get('id');
  const isEditing = !!nodeId;

  const [activeTab, setActiveTab] = useState<'basic' | 'schema' | 'configuration' | 'files' | 'validation' | 'ai-generate'>('basic');
  const [selectedFileId, setSelectedFileId] = useState<string>('worker');
  const [isValidating, setIsValidating] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createType, setCreateType] = useState<'file' | 'folder'>('file');
  const [createName, setCreateName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('');
  const [validationResult, setValidationResult] = useState<{
    success: boolean;
    errors: string[];
    warnings: string[];
  } | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  // Basic Info
  const [name, setName] = useState('airtable');
  const [description, setDescription] = useState('Read/write Airtable through centralized backend capabilities.');
  const [type, setType] = useState<NodeType>('processor');
  const [category, setCategory] = useState<NodeCategory>('Data');
  const [version, setVersion] = useState('1.0.0');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [readmeContent, setReadmeContent] = useState(`# Airtable

Read/write Airtable through centralized backend capabilities.

## Usage

This node is command-capable and routes backend operations through \`executeBackend\`. It does not access Supabase or Neo4j directly.

## Configuration

Configure the operation and credentials in the node properties.
`);

  // Configuration
  const [autoExecute, setAutoExecute] = useState(false);
  const [requiresInput, setRequiresInput] = useState(true);
  const [hasOutput, setHasOutput] = useState(true);
  const [maxExecutionTime, setMaxExecutionTime] = useState(60);
  const [retryOnFailure, setRetryOnFailure] = useState(false);
  const [maxRetries, setMaxRetries] = useState(3);
  const [enableLogging, setEnableLogging] = useState(true);
  const [logLevel, setLogLevel] = useState<'debug' | 'info' | 'warning' | 'error'>('info');

  // Schema - Inputs and Outputs
  const [schemaInputs, setSchemaInputs] = useState<SchemaField[]>([
    { id: '1', name: 'message', type: 'string', required: true, description: '' },
    { id: '2', name: 'input', type: 'object', required: false, description: '' },
  ]);

  const [schemaOutputs, setSchemaOutputs] = useState<SchemaField[]>([
    { id: '1', name: 'result', type: 'object', required: false, description: '' },
  ]);

  const [schemaIcon, setSchemaIcon] = useState('sparkles');
  const [schemaGroup, setSchemaGroup] = useState(category);

  // Files - Only node.ts and worker.ts are required (schema.json and README.md are auto-generated)
  const [files, setFiles] = useState<NodeFile[]>([
    {
      id: 'worker',
      name: 'worker.ts',
      path: '/worker.ts',
      type: 'file',
      language: 'typescript',
      required: true,
      content: `import type { WorkflowCommandToolSpec, WorkerExecuteResult, WorkerPayload, WorkerScope, WorkerUpdateResult, WorkerValidateResult } from '@workflow/executor';
import { normalizeResult } from '@workflow/executor';
import { executeBackend } from '@workflow/execute';

const NODE_SCOPE: WorkerScope = {};
const descriptor = { key: 'executeAgentRuntimeTool', service: 'services/workflow/nodes/agent-runtime-tool-handler.ts', function: 'executeAgentRuntimeTool', description: 'Executes a centralized agent/backend capability.' };
const record = (value: unknown): Record<string, unknown> => value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
const text = (value: unknown): string => String(value ?? '').trim();
const nodeValue = (payload: WorkerPayload): Record<string, unknown> => record((payload as { NODE?: unknown }).NODE || (payload as { self?: unknown }).self || payload);
const runtime = (payload: WorkerPayload): Record<string, unknown> => ({ ...record(nodeValue(payload).runtime), ...record(nodeValue(payload).properties), ...record(payload.input) });

export const validate = async (payload: WorkerPayload): Promise<WorkerValidateResult> => {
  const data = runtime(payload);
  const warnings: string[] = [];
  if (!text(data.operation || data.action || data.prompt || data.query || data.message)) warnings.push('This node will read operation/query/message from workflow input if not configured.');
  return { ok: true, errors: [], warnings, normalizedRuntime: data };
};

export const init = async (payload: WorkerPayload): Promise<boolean> => { NODE_SCOPE.workflowId = text(record(payload.workflow?.metadata).id); return true; };
export const onUpdate = async (payload: WorkerPayload): Promise<WorkerUpdateResult> => { NODE_SCOPE.lastStatus = payload.self?.status || NODE_SCOPE.lastStatus; NODE_SCOPE.lastOutput = payload.self?.OUTPUT || NODE_SCOPE.lastOutput; return { ok: true, error: null }; };

export const execute = async (payload: WorkerPayload): Promise<WorkerExecuteResult> => {
  try {
    const data = runtime(payload);
    const tool = { id: 'mcp.execute', name: '${name}', description: '${description}', kind: 'general', mutates: true, mutationPolicy: 'confirmation-required' };
    const action = { id: \`\${tool.id}-\${Date.now()}\`, tool: tool.id, reason: text(data.reason || data.prompt || data.message || tool.description), input: data };
    const result = await executeBackend(descriptor, { tool, action, NODE: nodeValue(payload), payload, NODE_SCOPE });
    return normalizeResult(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Node execution failed.';
    return { output: { error: message }, status: 'failed', logs: [message] };
  }
};

export const commandToolSpec = async (payload: WorkerPayload): Promise<WorkflowCommandToolSpec> => {
  const node = nodeValue(payload);
  const data = runtime(payload);
  return {
    toolName: text(node.name || data.name || '${name}'),
    toolDescription: text(data.description || data.toolDescription || '${description}'),
    inputContract: { required: [], optional: [{ key: 'operation', label: 'Operation' }, { key: 'prompt', label: 'Prompt' }] },
    outputContract: [{ key: 'output', label: 'Output' }],
    metadata: { modelId: '${name}', toolDomain: 'general', mutating: true, reusableByAiAgent: true },
    executionKind: 'tool',
  };
};
`,
    },
    {
      id: 'node',
      name: 'node.ts',
      path: '/node.ts',
      type: 'file',
      language: 'typescript',
      required: true,
      content: `import rawSchema from './schema.json';
import { createAgentBackendNodeModule } from '@workflow/nodes/nodes/_agent-backend-node-module';

export default createAgentBackendNodeModule({
  id: '${name}',
  rawSchema,
  label: '${name.charAt(0).toUpperCase() + name.slice(1)}',
  description: '${description}',
  kind: 'database',
  order: 512
});
`,
    },
  ]);

  // Flatten files for easy lookup
  const flattenFiles = (fileList: NodeFile[]): NodeFile[] => {
    const result: NodeFile[] = [];
    const traverse = (items: NodeFile[]) => {
      items.forEach(item => {
        result.push(item);
        if (item.children) {
          traverse(item.children);
        }
      });
    };
    traverse(fileList);
    return result;
  };

  const allFiles = flattenFiles(files);
  const selectedFile = allFiles.find(f => f.id === selectedFileId);

  const handleFileChange = (value: string | undefined) => {
    if (value !== undefined && selectedFile) {
      const updateFiles = (fileList: NodeFile[]): NodeFile[] => {
        return fileList.map(f => {
          if (f.id === selectedFileId) {
            return { ...f, content: value };
          }
          if (f.children) {
            return { ...f, children: updateFiles(f.children) };
          }
          return f;
        });
      };
      setFiles(updateFiles(files));
    }
  };

  const toggleFolder = (folderId: string) => {
    const updateFiles = (fileList: NodeFile[]): NodeFile[] => {
      return fileList.map(f => {
        if (f.id === folderId && f.type === 'folder') {
          return { ...f, isExpanded: !f.isExpanded };
        }
        if (f.children) {
          return { ...f, children: updateFiles(f.children) };
        }
        return f;
      });
    };
    setFiles(updateFiles(files));
  };

  const openCreateModal = (type: 'file' | 'folder', parentPath: string = '') => {
    setCreateType(type);
    setSelectedFolder(parentPath);
    setCreateName('');
    setIsCreateModalOpen(true);
  };

  const handleCreate = () => {
    if (!createName.trim()) return;

    const language = createName.endsWith('.ts') ? 'typescript' :
                    createName.endsWith('.js') ? 'javascript' :
                    createName.endsWith('.json') ? 'json' :
                    createName.endsWith('.md') ? 'markdown' :
                    createName.endsWith('.sql') ? 'sql' :
                    createName.endsWith('.html') ? 'html' :
                    createName.endsWith('.css') ? 'css' : 'plaintext';

    const newPath = selectedFolder ? `${selectedFolder}/${createName}` : `/${createName}`;

    const newItem: NodeFile = {
      id: `item-${Date.now()}`,
      name: createName,
      path: newPath,
      type: createType,
      language: createType === 'file' ? language : undefined,
      content: createType === 'file' ? '' : undefined,
      required: false,
      children: createType === 'folder' ? [] : undefined,
      isExpanded: createType === 'folder' ? false : undefined,
    };

    if (selectedFolder) {
      // Add to folder
      const addToFolder = (fileList: NodeFile[]): NodeFile[] => {
        return fileList.map(f => {
          if (f.path === selectedFolder && f.type === 'folder') {
            return {
              ...f,
              children: [...(f.children || []), newItem],
              isExpanded: true
            };
          }
          if (f.children) {
            return { ...f, children: addToFolder(f.children) };
          }
          return f;
        });
      };
      setFiles(addToFolder(files));
    } else {
      // Add to root
      setFiles([...files, newItem]);
    }

    if (createType === 'file') {
      setSelectedFileId(newItem.id);
    }

    setIsCreateModalOpen(false);
    setCreateName('');
  };

  const handleDeleteFile = (fileId: string, filePath: string) => {
    const deleteFromFiles = (fileList: NodeFile[]): NodeFile[] => {
      return fileList.filter(f => {
        if (f.id === fileId) return false;
        if (f.children) {
          f.children = deleteFromFiles(f.children);
        }
        return true;
      });
    };
    setFiles(deleteFromFiles(files));

    if (selectedFileId === fileId) {
      const remaining = flattenFiles(deleteFromFiles(files)).filter(f => f.type === 'file');
      setSelectedFileId(remaining[0]?.id || '');
    }
  };

  const renderFileTree = (fileList: NodeFile[], depth: number = 0): JSX.Element[] => {
    return fileList.map(item => {
      const indent = depth * 16;

      if (item.type === 'folder') {
        return (
          <div key={item.id}>
            <div
              className="flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors group"
              style={{ paddingLeft: `${indent + 8}px` }}
            >
              <div className="flex items-center gap-1.5 flex-1 min-w-0" onClick={() => toggleFolder(item.id)}>
                {item.isExpanded ? (
                  <ChevronDown className="w-3.5 h-3.5 flex-shrink-0 dark:text-gray-400" />
                ) : (
                  <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 dark:text-gray-400" />
                )}
                {item.isExpanded ? (
                  <FolderOpen className="w-4 h-4 flex-shrink-0 text-blue-500" />
                ) : (
                  <Folder className="w-4 h-4 flex-shrink-0 text-blue-500" />
                )}
                <span className="text-sm dark:text-gray-200 truncate font-medium">{item.name}</span>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openCreateModal('file', item.path);
                  }}
                  className="p-1 hover:bg-primary/20 rounded"
                  title="New File"
                >
                  <File className="w-3 h-3 dark:text-gray-400" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openCreateModal('folder', item.path);
                  }}
                  className="p-1 hover:bg-primary/20 rounded"
                  title="New Folder"
                >
                  <Folder className="w-3 h-3 dark:text-gray-400" />
                </button>
                {!item.required && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFile(item.id, item.path);
                    }}
                    className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600 dark:text-red-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
            {item.isExpanded && item.children && renderFileTree(item.children, depth + 1)}
          </div>
        );
      }

      // File
      return (
        <div
          key={item.id}
          onClick={() => setSelectedFileId(item.id)}
          className={`flex items-center justify-between px-2 py-1.5 cursor-pointer border-l-2 transition-colors group ${
            selectedFileId === item.id
              ? 'border-primary bg-primary/10 dark:bg-primary/20'
              : 'border-transparent hover:bg-secondary dark:hover:bg-[#2a2a2a]'
          }`}
          style={{ paddingLeft: `${indent + 24}px` }}
        >
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <FileText className="w-4 h-4 flex-shrink-0 text-blue-500" />
            <span className="text-sm dark:text-gray-200 truncate">{item.name}</span>
            {item.required && (
              <Badge variant="default" className="text-xs">Required</Badge>
            )}
          </div>
          {!item.required && (
            <button
              onClick={e => {
                e.stopPropagation();
                handleDeleteFile(item.id, item.path);
              }}
              className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600 dark:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 className="w-3 h-3" />
            </button>
          )}
        </div>
      );
    });
  };

  const handleDeleteFolder = (fileId: string) => {
    if (file?.required) {
      alert('Cannot delete required files');
      return;
    }

    if (confirm(`Delete ${file?.name}?`)) {
      setFiles(files.filter(f => f.id !== fileId));
      if (selectedFileId === fileId) {
        setSelectedFileId('schema');
      }
    }
  };

  const handleValidate = async () => {
    setIsValidating(true);
    setValidationResult(null);

    // Simulate validation
    await new Promise(resolve => setTimeout(resolve, 1500));

    const errors: string[] = [];
    const warnings: string[] = [];

    // Validate schema
    const schemaFile = files.find(f => f.id === 'schema');
    try {
      if (schemaFile) {
        JSON.parse(schemaFile.content);
      }
    } catch (e) {
      errors.push('schema.json: Invalid JSON syntax');
    }

    // Check if all required files exist
    const requiredFiles = ['schema', 'node', 'worker', 'readme'];
    requiredFiles.forEach(fileId => {
      if (!files.find(f => f.id === fileId)) {
        errors.push(`Missing required file: ${fileId}`);
      }
    });

    // Add some warnings
    if (!author) {
      warnings.push('Author field is empty');
    }

    setValidationResult({
      success: errors.length === 0,
      errors,
      warnings,
    });
    setIsValidating(false);
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) {
      alert('Please enter a prompt');
      return;
    }

    setIsGenerating(true);

    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update files based on prompt (this would be actual AI generation in production)
    const updatedSchema = files.find(f => f.id === 'schema');
    if (updatedSchema) {
      const schema = JSON.parse(updatedSchema.content);
      schema.documentation.summary = aiPrompt;
      setFiles(files.map(f =>
        f.id === 'schema'
          ? { ...f, content: JSON.stringify(schema, null, 2) }
          : f
      ));
    }

    setIsGenerating(false);
    alert('Node generated successfully! Review the files and make any adjustments.');
  };

  // Generate schema.json from configuration
  const generateSchema = () => {
    // Build inputs object from schemaInputs array
    const inputs: Record<string, any> = {};
    schemaInputs.forEach(input => {
      if (input.name) {
        inputs[input.name] = {
          type: input.type,
          ...(input.description && { description: input.description }),
          ...(input.required && { required: input.required })
        };
      }
    });

    // Build outputs object from schemaOutputs array
    const outputs: Record<string, any> = {};
    schemaOutputs.forEach(output => {
      if (output.name) {
        outputs[output.name] = {
          type: output.type,
          ...(output.description && { description: output.description })
        };
      }
    });

    return JSON.stringify({
      id: name,
      name: name.charAt(0).toUpperCase() + name.slice(1),
      type: name,
      version: version,
      description: description,
      kind: type === 'processor' ? 'processor' : type === 'generator' ? 'generator' : 'custom',
      inputs,
      outputs,
      ui: {
        icon: schemaIcon,
        group: schemaGroup
      },
      configuration: {
        autoExecute,
        requiresInput,
        hasOutput,
        maxExecutionTime,
        retryOnFailure,
        maxRetries,
        enableLogging,
        logLevel,
      }
    }, null, 2);
  };

  const handleSave = () => {
    const schema = generateSchema();

    const nodeConfig = {
      name,
      description,
      type,
      category,
      version,
      author,
      tags,
      readme: readmeContent,
      schema: schema,
      configuration: {
        autoExecute,
        requiresInput,
        hasOutput,
        maxExecutionTime,
        retryOnFailure,
        maxRetries,
        enableLogging,
        logLevel,
      },
      files: files.map(f => ({ name: f.name, content: f.content })),
    };
    console.log('Saving node:', nodeConfig);
    navigate('/nodes');
  };

  return (
    <div className="min-h-screen bg-background dark:bg-[#0a0a0a]">
      {/* Header */}
      <div className="border-b border-border dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f]">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Box className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold dark:text-gray-100">
                  {isEditing ? 'Edit Node' : 'Create Node'}
                </h1>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  {name || 'Untitled Node'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleValidate}>
                <Play className="w-4 h-4 mr-2" />
                Validate
              </Button>
              <Button size="sm" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Node
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 border-b border-border dark:border-[#2a2a2a] -mb-[1px]">
            <button
              onClick={() => setActiveTab('basic')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'basic'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <Info className="w-4 h-4 inline mr-2" />
              Basic Info
            </button>
            <button
              onClick={() => setActiveTab('schema')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'schema'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <Database className="w-4 h-4 inline mr-2" />
              Schema
            </button>
            <button
              onClick={() => setActiveTab('configuration')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'configuration'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Configuration
            </button>
            <button
              onClick={() => setActiveTab('files')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'files'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <Code className="w-4 h-4 inline mr-2" />
              Files ({allFiles.filter(f => f.type === 'file').length})
            </button>
            <button
              onClick={() => setActiveTab('validation')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'validation'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <CheckCircle className="w-4 h-4 inline mr-2" />
              Validation
            </button>
            <button
              onClick={() => setActiveTab('ai-generate')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'ai-generate'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <Sparkles className="w-4 h-4 inline mr-2" />
              AI Generate
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Basic Info Tab */}
        {activeTab === 'basic' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <h3 className="font-semibold mb-4 dark:text-gray-100">Node Information</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                      Version
                    </label>
                    <input
                      type="text"
                      value={version}
                      onChange={e => setVersion(e.target.value)}
                      className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                      Type
                    </label>
                    <select
                      value={type}
                      onChange={e => setType(e.target.value as NodeType)}
                      className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
                    >
                      <option value="processor">Processor</option>
                      <option value="notifier">Notifier</option>
                      <option value="generator">Generator</option>
                      <option value="converter">Converter</option>
                      <option value="sync">Sync</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value as NodeCategory)}
                      className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
                    >
                      <option value="Data">Data</option>
                      <option value="Communication">Communication</option>
                      <option value="Analytics">Analytics</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Integration">Integration</option>
                      <option value="Custom">Custom</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Author
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={e => setAuthor(e.target.value)}
                    className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
                  />
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold mb-4 dark:text-gray-100">
                <FileText className="w-4 h-4 inline mr-2" />
                README Documentation
              </h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
                Write markdown documentation for your node. This will be saved as README.md.
              </p>
              <MarkdownEditor
                value={readmeContent}
                onChange={setReadmeContent}
                placeholder="Write documentation for your node..."
                height="500px"
              />
            </Card>
          </div>
        )}

        {/* Schema Tab */}
        {activeTab === 'schema' && (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Schema Inputs */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold dark:text-gray-100">
                    <FileInput className="w-4 h-4 inline mr-2" />
                    Inputs
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                    Define input parameters for your node
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSchemaInputs([...schemaInputs, {
                      id: Date.now().toString(),
                      name: '',
                      type: 'string',
                      required: false,
                      description: ''
                    }]);
                  }}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Input
                </Button>
              </div>

              <div className="space-y-4">
                {schemaInputs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground dark:text-gray-400">
                    No inputs defined. Click "Add Input" to create one.
                  </div>
                ) : (
                  schemaInputs.map((input, index) => (
                    <div key={input.id} className="p-4 border border-border dark:border-[#2a2a2a] rounded-lg space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium mb-1.5 dark:text-gray-300">
                              Name
                            </label>
                            <input
                              type="text"
                              value={input.name}
                              onChange={(e) => {
                                const updated = [...schemaInputs];
                                updated[index].name = e.target.value;
                                setSchemaInputs(updated);
                              }}
                              placeholder="e.g., message, data, config"
                              className="w-full px-3 py-2 text-sm border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1.5 dark:text-gray-300">
                              Type
                            </label>
                            <select
                              value={input.type}
                              onChange={(e) => {
                                const updated = [...schemaInputs];
                                updated[index].type = e.target.value;
                                setSchemaInputs(updated);
                              }}
                              className="w-full px-3 py-2 text-sm border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
                            >
                              <option value="string">string</option>
                              <option value="number">number</option>
                              <option value="boolean">boolean</option>
                              <option value="object">object</option>
                              <option value="array">array</option>
                              <option value="any">any</option>
                            </select>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSchemaInputs(schemaInputs.filter((_, i) => i !== index));
                          }}
                          className="mt-6"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5 dark:text-gray-300">
                          Description (optional)
                        </label>
                        <input
                          type="text"
                          value={input.description || ''}
                          onChange={(e) => {
                            const updated = [...schemaInputs];
                            updated[index].description = e.target.value;
                            setSchemaInputs(updated);
                          }}
                          placeholder="Describe this input parameter"
                          className="w-full px-3 py-2 text-sm border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          id={`required-${input.id}`}
                          checked={input.required || false}
                          onChange={(e) => {
                            const updated = [...schemaInputs];
                            updated[index].required = e.target.checked;
                            setSchemaInputs(updated);
                          }}
                          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                        />
                        <label htmlFor={`required-${input.id}`} className="text-sm dark:text-gray-300">
                          Required
                        </label>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* Schema Outputs */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold dark:text-gray-100">
                    <FileOutput className="w-4 h-4 inline mr-2" />
                    Outputs
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                    Define output parameters for your node
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSchemaOutputs([...schemaOutputs, {
                      id: Date.now().toString(),
                      name: '',
                      type: 'object',
                      required: false,
                      description: ''
                    }]);
                  }}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Add Output
                </Button>
              </div>

              <div className="space-y-4">
                {schemaOutputs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground dark:text-gray-400">
                    No outputs defined. Click "Add Output" to create one.
                  </div>
                ) : (
                  schemaOutputs.map((output, index) => (
                    <div key={output.id} className="p-4 border border-border dark:border-[#2a2a2a] rounded-lg space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium mb-1.5 dark:text-gray-300">
                              Name
                            </label>
                            <input
                              type="text"
                              value={output.name}
                              onChange={(e) => {
                                const updated = [...schemaOutputs];
                                updated[index].name = e.target.value;
                                setSchemaOutputs(updated);
                              }}
                              placeholder="e.g., result, data, response"
                              className="w-full px-3 py-2 text-sm border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium mb-1.5 dark:text-gray-300">
                              Type
                            </label>
                            <select
                              value={output.type}
                              onChange={(e) => {
                                const updated = [...schemaOutputs];
                                updated[index].type = e.target.value;
                                setSchemaOutputs(updated);
                              }}
                              className="w-full px-3 py-2 text-sm border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
                            >
                              <option value="string">string</option>
                              <option value="number">number</option>
                              <option value="boolean">boolean</option>
                              <option value="object">object</option>
                              <option value="array">array</option>
                              <option value="any">any</option>
                            </select>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSchemaOutputs(schemaOutputs.filter((_, i) => i !== index));
                          }}
                          className="mt-6"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1.5 dark:text-gray-300">
                          Description (optional)
                        </label>
                        <input
                          type="text"
                          value={output.description || ''}
                          onChange={(e) => {
                            const updated = [...schemaOutputs];
                            updated[index].description = e.target.value;
                            setSchemaOutputs(updated);
                          }}
                          placeholder="Describe this output parameter"
                          className="w-full px-3 py-2 text-sm border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            {/* UI Settings */}
            <Card>
              <h3 className="font-semibold mb-4 dark:text-gray-100">UI Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Icon
                  </label>
                  <input
                    type="text"
                    value={schemaIcon}
                    onChange={(e) => setSchemaIcon(e.target.value)}
                    placeholder="e.g., sparkles, database, zap"
                    className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
                  />
                  <p className="text-xs text-muted-foreground dark:text-gray-500 mt-1">
                    Lucide icon name
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Group
                  </label>
                  <input
                    type="text"
                    value={schemaGroup}
                    onChange={(e) => setSchemaGroup(e.target.value)}
                    placeholder="e.g., AI Agent OS, Data"
                    className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
                  />
                  <p className="text-xs text-muted-foreground dark:text-gray-500 mt-1">
                    Node group in the palette
                  </p>
                </div>
              </div>
            </Card>

            {/* Schema Preview */}
            <Card>
              <h3 className="font-semibold mb-4 dark:text-gray-100">
                <Code className="w-4 h-4 inline mr-2" />
                Schema Preview
              </h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
                Live preview of the schema.json that will be generated
              </p>
              <div className="border border-border dark:border-[#2a2a2a] rounded-lg overflow-hidden">
                <Editor
                  height="400px"
                  language="json"
                  value={generateSchema()}
                  theme="vs-dark"
                  options={{
                    readOnly: true,
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    automaticLayout: true,
                    tabSize: 2,
                    scrollBeyondLastLine: false,
                  }}
                />
              </div>
            </Card>
          </div>
        )}

        {/* Configuration Tab */}
        {activeTab === 'configuration' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <h3 className="font-semibold mb-4 dark:text-gray-100">Execution Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-sm font-medium dark:text-gray-300">Auto Execute</span>
                    <p className="text-xs text-muted-foreground dark:text-gray-500">
                      Run automatically when triggered
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={autoExecute}
                      onChange={e => setAutoExecute(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-sm font-medium dark:text-gray-300">Requires Input</span>
                    <p className="text-xs text-muted-foreground dark:text-gray-500">
                      Node needs input data to execute
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={requiresInput}
                      onChange={e => setRequiresInput(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-sm font-medium dark:text-gray-300">Has Output</span>
                    <p className="text-xs text-muted-foreground dark:text-gray-500">
                      Node produces output data
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasOutput}
                      onChange={e => setHasOutput(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between py-2">
                  <div>
                    <span className="text-sm font-medium dark:text-gray-300">Enable Logging</span>
                    <p className="text-xs text-muted-foreground dark:text-gray-500">
                      Log execution details
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={enableLogging}
                      onChange={e => setEnableLogging(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Max Execution Time (seconds)
                  </label>
                  <input
                    type="number"
                    value={maxExecutionTime}
                    onChange={e => setMaxExecutionTime(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Log Level
                  </label>
                  <select
                    value={logLevel}
                    onChange={e => setLogLevel(e.target.value as any)}
                    className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
                  >
                    <option value="debug">Debug</option>
                    <option value="info">Info</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                  </select>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Files Tab */}
        {activeTab === 'files' && (
          <div className="h-[calc(100vh-250px)] flex flex-col lg:flex-row gap-4">
            {/* File List */}
            <div className="w-full lg:w-80 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] overflow-hidden flex flex-col">
              <div className="p-3 border-b border-border dark:border-[#2a2a2a] flex items-center justify-between">
                <h3 className="font-semibold dark:text-gray-100">Explorer</h3>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openCreateModal('file', '')}
                    className="p-1.5 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded transition-colors"
                    title="New File"
                  >
                    <File className="w-3.5 h-3.5 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={() => openCreateModal('folder', '')}
                    className="p-1.5 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded transition-colors"
                    title="New Folder"
                  >
                    <Folder className="w-3.5 h-3.5 dark:text-gray-300" />
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {renderFileTree(files, 0)}
              </div>
            </div>

            {/* Monaco Editor */}
            <div className="flex-1 border border-border dark:border-[#2a2a2a] rounded-lg overflow-hidden bg-white dark:bg-[#1e1e1e]">
              {selectedFile && selectedFile.type === 'file' ? (
                <>
                  <div className="px-4 py-2 border-b border-border dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <h4 className="font-medium dark:text-gray-100">{selectedFile.name}</h4>
                    </div>
                    <span className="text-xs text-muted-foreground dark:text-gray-400 font-mono">
                      {selectedFile.path}
                    </span>
                  </div>
                  <Editor
                    height="100%"
                    language={selectedFile.language}
                    value={selectedFile.content || ''}
                    onChange={handleFileChange}
                    theme="vs-dark"
                    options={{
                      minimap: { enabled: true },
                      fontSize: 14,
                      lineNumbers: 'on',
                      rulers: [],
                      scrollBeyondLastLine: false,
                      automaticLayout: true,
                      tabSize: 2,
                    }}
                  />
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center text-muted-foreground dark:text-gray-400">
                    <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Select a file to edit</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Validation Tab */}
        {activeTab === 'validation' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold dark:text-gray-100">Node Validation</h3>
                <Button onClick={handleValidate} disabled={isValidating}>
                  {isValidating ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      Validating...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Run Validation
                    </>
                  )}
                </Button>
              </div>

              {validationResult && (
                <div className="space-y-4">
                  {/* Success/Failure Badge */}
                  <div className="flex items-center gap-2">
                    {validationResult.success ? (
                      <>
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          Validation Passed
                        </span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-red-600" />
                        <span className="text-red-600 dark:text-red-400 font-medium">
                          Validation Failed
                        </span>
                      </>
                    )}
                  </div>

                  {/* Errors */}
                  {validationResult.errors.length > 0 && (
                    <div className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <h4 className="font-semibold text-red-900 dark:text-red-200 mb-2">
                        Errors ({validationResult.errors.length})
                      </h4>
                      <ul className="space-y-1">
                        {validationResult.errors.map((error, idx) => (
                          <li key={idx} className="text-sm text-red-800 dark:text-red-300 flex items-start gap-2">
                            <span>•</span>
                            <span>{error}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Warnings */}
                  {validationResult.warnings.length > 0 && (
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                      <h4 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
                        Warnings ({validationResult.warnings.length})
                      </h4>
                      <ul className="space-y-1">
                        {validationResult.warnings.map((warning, idx) => (
                          <li key={idx} className="text-sm text-yellow-800 dark:text-yellow-300 flex items-start gap-2">
                            <span>•</span>
                            <span>{warning}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {!validationResult && !isValidating && (
                <p className="text-muted-foreground dark:text-gray-400 text-center py-8">
                  Click "Run Validation" to check your node configuration
                </p>
              )}
            </Card>
          </div>
        )}

        {/* AI Generate Tab */}
        {activeTab === 'ai-generate' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <h3 className="font-semibold mb-4 dark:text-gray-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                AI-Powered Node Generation
              </h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
                Describe what you want your node to do, and AI will generate all the required files for you.
              </p>

              <textarea
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value)}
                placeholder="e.g., Create a node that fetches weather data from OpenWeatherMap API and formats it as JSON..."
                rows={6}
                className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200 mb-4"
              />

              <Button onClick={handleAIGenerate} disabled={isGenerating} className="gap-2">
                {isGenerating ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Generating Node...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    Generate Node with AI
                  </>
                )}
              </Button>
            </Card>

            <Card>
              <h3 className="font-semibold mb-4 dark:text-gray-100">Examples</h3>
              <div className="space-y-3">
                <button
                  onClick={() => setAiPrompt('Create a node that sends Slack messages to a specific channel')}
                  className="w-full text-left p-3 border border-border dark:border-[#2a2a2a] rounded-lg hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors"
                >
                  <div className="font-medium dark:text-gray-200">Slack Messenger</div>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">
                    Send messages to Slack channels
                  </div>
                </button>
                <button
                  onClick={() => setAiPrompt('Create a node that reads CSV files and converts them to JSON format')}
                  className="w-full text-left p-3 border border-border dark:border-[#2a2a2a] rounded-lg hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors"
                >
                  <div className="font-medium dark:text-gray-200">CSV to JSON Converter</div>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">
                    Convert CSV files to JSON format
                  </div>
                </button>
                <button
                  onClick={() => setAiPrompt('Create a node that generates QR codes from text or URLs')}
                  className="w-full text-left p-3 border border-border dark:border-[#2a2a2a] rounded-lg hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors"
                >
                  <div className="font-medium dark:text-gray-200">QR Code Generator</div>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">
                    Generate QR codes from text or URLs
                  </div>
                </button>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Create File/Folder Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4 dark:text-gray-100 flex items-center gap-2">
              {createType === 'file' ? (
                <>
                  <File className="w-5 h-5" />
                  New File
                </>
              ) : (
                <>
                  <Folder className="w-5 h-5" />
                  New Folder
                </>
              )}
            </h2>

            {selectedFolder && (
              <div className="mb-4 p-2 bg-secondary dark:bg-[#2a2a2a] rounded text-sm">
                <span className="text-muted-foreground dark:text-gray-400">Location: </span>
                <span className="font-mono dark:text-gray-200">{selectedFolder}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                  {createType === 'file' ? 'File Name' : 'Folder Name'}
                </label>
                <input
                  type="text"
                  value={createName}
                  onChange={(e) => setCreateName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                  placeholder={createType === 'file' ? 'e.g., helpers.ts' : 'e.g., utils'}
                  className="w-full px-4 py-2.5 bg-white dark:bg-[#0a0a0a] border border-border dark:border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  autoFocus
                />
                {createType === 'file' && (
                  <p className="mt-2 text-xs text-muted-foreground dark:text-gray-400">
                    Supported: .ts, .js, .json, .md, .sql, .html, .css
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setCreateName('');
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={!createName.trim()}
                className="flex-1"
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/Nodes.tsx`

- Category: `screens`
- Bytes: `17680`
- SHA-256: `d293b1e1ef8279f0f8951eb13475e35d5331afdcd220690bc223ebeb5bfa7e50`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `Nodes.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState } from 'react';
import { Box, Plus, Edit, Trash2, Power, PowerOff, Copy } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { SearchBar } from '../components/SearchBar';
import { LazyLoadList } from '../components/LazyLoadList';
import { EmptyState } from '../components/EmptyState';
import { useNavigate } from 'react-router';

interface Node {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  type: string;
  category: string;
  uses: number;
  lastUsed: string;
  createdAt: string;
  configuration: {
    autoExecute: boolean;
    requiresInput: boolean;
    hasOutput: boolean;
  };
  metadata: {
    version: string;
    author: string;
  };
}

export default function Nodes() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const [nodes, setNodes] = useState<Node[]>([
    {
      id: '1',
      name: 'Data Processor',
      description: 'Processes and transforms data from various sources into structured format',
      status: 'active',
      type: 'processor',
      category: 'Data',
      uses: 342,
      lastUsed: '2 hours ago',
      createdAt: '2024-01-15',
      configuration: {
        autoExecute: true,
        requiresInput: true,
        hasOutput: true,
      },
      metadata: {
        version: '1.2.0',
        author: 'John Doe',
      },
    },
    {
      id: '2',
      name: 'Email Notifier',
      description: 'Sends email notifications based on triggers and conditions',
      status: 'active',
      type: 'notifier',
      category: 'Communication',
      uses: 1567,
      lastUsed: '5 minutes ago',
      createdAt: '2024-02-20',
      configuration: {
        autoExecute: false,
        requiresInput: true,
        hasOutput: false,
      },
      metadata: {
        version: '2.0.1',
        author: 'Jane Smith',
      },
    },
    {
      id: '3',
      name: 'Report Generator',
      description: 'Generates comprehensive reports with charts and analytics',
      status: 'active',
      type: 'generator',
      category: 'Analytics',
      uses: 789,
      lastUsed: 'Just now',
      createdAt: '2024-03-10',
      configuration: {
        autoExecute: true,
        requiresInput: true,
        hasOutput: true,
      },
      metadata: {
        version: '1.5.3',
        author: 'Bob Johnson',
      },
    },
    {
      id: '4',
      name: 'File Converter',
      description: 'Converts files between different formats (PDF, DOCX, XLS, etc.)',
      status: 'inactive',
      type: 'converter',
      category: 'Utilities',
      uses: 234,
      lastUsed: '2 days ago',
      createdAt: '2024-01-05',
      configuration: {
        autoExecute: false,
        requiresInput: true,
        hasOutput: true,
      },
      metadata: {
        version: '1.0.0',
        author: 'Alice Williams',
      },
    },
    {
      id: '5',
      name: 'Database Sync',
      description: 'Synchronizes data between multiple databases in real-time',
      status: 'active',
      type: 'sync',
      category: 'Integration',
      uses: 2341,
      lastUsed: '1 hour ago',
      createdAt: '2024-04-01',
      configuration: {
        autoExecute: true,
        requiresInput: false,
        hasOutput: false,
      },
      metadata: {
        version: '3.1.2',
        author: 'Charlie Brown',
      },
    },
  ]);

  const filteredNodes = nodes.filter(node =>
    node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    node.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id));
  };

  const handleDuplicate = (id: string) => {
    const nodeToDuplicate = nodes.find(n => n.id === id);
    if (nodeToDuplicate) {
      const newNode = {
        ...nodeToDuplicate,
        id: `${Date.now()}`,
        name: `${nodeToDuplicate.name} (Copy)`,
        uses: 0,
        lastUsed: 'Never',
        createdAt: new Date().toISOString().split('T')[0],
      };
      setNodes([...nodes, newNode]);
    }
  };

  const toggleStatus = (id: string) => {
    setNodes(nodes.map(node =>
      node.id === id
        ? { ...node, status: node.status === 'active' ? 'inactive' : 'active' as any }
        : node
    ));
  };

  const selectedNodeData = nodes.find(n => n.id === selectedNode);

  const renderNodeItem = (node: Node, isSelected: boolean) => (
    <div className="flex items-start gap-3 p-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
        node.status === 'active'
          ? 'bg-gradient-to-br from-blue-500 to-blue-600'
          : 'bg-gray-300 dark:bg-gray-700'
      }`}>
        <Box className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold dark:text-gray-100 truncate">{node.name}</h3>
          <Badge variant={node.status === 'active' ? 'success' : 'warning'}>
            {node.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-2 mb-2">
          {node.description}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground dark:text-gray-500">
          <span className="px-2 py-1 bg-secondary dark:bg-[#2a2a2a] rounded">
            {node.category}
          </span>
          <span>{node.uses.toLocaleString()} uses</span>
          <span>Last used: {node.lastUsed}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background dark:bg-[#0a0a0a]">
      <div className="flex h-screen">
        {/* Left Sidebar - Nodes List */}
        <div className="w-96 border-r border-border dark:border-[#2a2a2a] overflow-y-auto bg-white dark:bg-[#0f0f0f]">
          <div className="p-6 border-b border-border dark:border-[#2a2a2a]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold dark:text-gray-100">Nodes</h1>
                <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                  {nodes.length} custom nodes
                </p>
              </div>
              <Button onClick={() => navigate('/node-editor')} size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                New
              </Button>
            </div>

            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search nodes..."
            />
          </div>

          {filteredNodes.length === 0 ? (
            <EmptyState
              icon={Box}
              title="No nodes found"
              description={searchQuery ? "Try adjusting your search" : "Create your first custom node"}
              action={!searchQuery ? {
                label: "Create Node",
                onClick: () => navigate('/node-editor')
              } : undefined}
            />
          ) : (
            <LazyLoadList
              items={filteredNodes}
              renderItem={renderNodeItem}
              onItemClick={(node) => setSelectedNode(node.id)}
              selectedId={selectedNode || undefined}
              itemHeight={120}
            />
          )}
        </div>

        {/* Right Panel - Node Details */}
        <div className="flex-1 overflow-y-auto">
          {selectedNodeData ? (
            <div className="p-8">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                      selectedNodeData.status === 'active'
                        ? 'bg-gradient-to-br from-blue-500 to-blue-600'
                        : 'bg-gray-300 dark:bg-gray-700'
                    }`}>
                      <Box className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold dark:text-gray-100">
                          {selectedNodeData.name}
                        </h2>
                        <Badge variant={selectedNodeData.status === 'active' ? 'success' : 'warning'}>
                          {selectedNodeData.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground dark:text-gray-400 mb-2">
                        {selectedNodeData.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-3 py-1 bg-secondary dark:bg-[#2a2a2a] rounded-lg">
                          {selectedNodeData.category}
                        </span>
                        <span className="px-3 py-1 bg-secondary dark:bg-[#2a2a2a] rounded-lg">
                          v{selectedNodeData.metadata.version}
                        </span>
                        <span className="text-muted-foreground dark:text-gray-500">
                          by {selectedNodeData.metadata.author}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStatus(selectedNodeData.id)}
                      className="gap-2"
                    >
                      {selectedNodeData.status === 'active' ? (
                        <>
                          <PowerOff className="w-4 h-4" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <Power className="w-4 h-4" />
                          Activate
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDuplicate(selectedNodeData.id)}
                      className="gap-2"
                    >
                      <Copy className="w-4 h-4" />
                      Duplicate
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/node-editor?id=${selectedNodeData.id}`)}
                      className="gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(selectedNodeData.id)}
                      className="gap-2 text-red-600 dark:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <Card>
                  <div className="text-sm text-muted-foreground dark:text-gray-400 mb-1">Total Uses</div>
                  <div className="text-3xl font-bold text-primary">
                    {selectedNodeData.uses.toLocaleString()}
                  </div>
                </Card>
                <Card>
                  <div className="text-sm text-muted-foreground dark:text-gray-400 mb-1">Last Used</div>
                  <div className="text-lg font-semibold dark:text-gray-200">
                    {selectedNodeData.lastUsed}
                  </div>
                </Card>
                <Card>
                  <div className="text-sm text-muted-foreground dark:text-gray-400 mb-1">Status</div>
                  <div className="text-lg font-semibold dark:text-gray-200 capitalize">
                    {selectedNodeData.status}
                  </div>
                </Card>
              </div>

              {/* Configuration Details */}
              <div className="space-y-6">
                <Card>
                  <h3 className="font-semibold mb-4 dark:text-gray-100">Node Configuration</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-border dark:border-[#2a2a2a]">
                      <div>
                        <span className="text-sm font-medium dark:text-gray-300">Auto Execute</span>
                        <p className="text-xs text-muted-foreground dark:text-gray-500">
                          Node runs automatically when triggered
                        </p>
                      </div>
                      <Badge variant={selectedNodeData.configuration.autoExecute ? 'success' : 'default'}>
                        {selectedNodeData.configuration.autoExecute ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border dark:border-[#2a2a2a]">
                      <div>
                        <span className="text-sm font-medium dark:text-gray-300">Requires Input</span>
                        <p className="text-xs text-muted-foreground dark:text-gray-500">
                          Node needs input data to execute
                        </p>
                      </div>
                      <Badge variant={selectedNodeData.configuration.requiresInput ? 'warning' : 'default'}>
                        {selectedNodeData.configuration.requiresInput ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <div>
                        <span className="text-sm font-medium dark:text-gray-300">Has Output</span>
                        <p className="text-xs text-muted-foreground dark:text-gray-500">
                          Node produces output data
                        </p>
                      </div>
                      <Badge variant={selectedNodeData.configuration.hasOutput ? 'success' : 'default'}>
                        {selectedNodeData.configuration.hasOutput ? 'Yes' : 'No'}
                      </Badge>
                    </div>
                  </div>
                </Card>

                <Card>
                  <h3 className="font-semibold mb-4 dark:text-gray-100">Metadata</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-border dark:border-[#2a2a2a]">
                      <span className="text-sm text-muted-foreground dark:text-gray-400">Type</span>
                      <span className="text-sm font-medium dark:text-gray-200 capitalize">
                        {selectedNodeData.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border dark:border-[#2a2a2a]">
                      <span className="text-sm text-muted-foreground dark:text-gray-400">Category</span>
                      <span className="text-sm font-medium dark:text-gray-200">
                        {selectedNodeData.category}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border dark:border-[#2a2a2a]">
                      <span className="text-sm text-muted-foreground dark:text-gray-400">Version</span>
                      <span className="text-sm font-medium dark:text-gray-200">
                        {selectedNodeData.metadata.version}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border dark:border-[#2a2a2a]">
                      <span className="text-sm text-muted-foreground dark:text-gray-400">Author</span>
                      <span className="text-sm font-medium dark:text-gray-200">
                        {selectedNodeData.metadata.author}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm text-muted-foreground dark:text-gray-400">Created</span>
                      <span className="text-sm font-medium dark:text-gray-200">
                        {selectedNodeData.createdAt}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <EmptyState
                icon={Box}
                title="No node selected"
                description="Select a node from the list to view details"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/OrganizationDefaults.tsx`

- Category: `screens`
- Bytes: `11420`
- SHA-256: `9fe3bb040c1bbcc67fcb85e1d00e8aba30a101a916cb80efd292238070ed29a7`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `OrganizationDefaults.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { useToast } from '../components/Toast';
import { Settings, Bot, Zap, ChevronDown, X, Building2 } from 'lucide-react';

interface DefaultConfig {
  type: 'agent' | 'workflow' | 'none';
  id: string | null;
  name: string | null;
}

interface LevelDefaults {
  channel: DefaultConfig;
  category: DefaultConfig;
  subject: DefaultConfig;
  post: DefaultConfig;
}

// Mock data for agents and workflows
const availableAgents = [
  { id: '1', name: 'Customer Support Agent', model: 'claude-sonnet-4.5' },
  { id: '2', name: 'Code Review Assistant', model: 'claude-opus-4.7' },
  { id: '3', name: 'Data Analysis Agent', model: 'claude-sonnet-4.5' },
];

const availableWorkflows = [
  { id: '1', name: 'Data enrichment pipeline', description: 'Pull together data to answer user questions' },
  { id: '2', name: 'Customer service bot', description: 'Resolve customer queries with custom policies' },
  { id: '3', name: 'Knowledge assistant', description: 'Triage and answer questions from employees' },
];

export default function OrganizationDefaults() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [defaults, setDefaults] = useState<LevelDefaults>({
    channel: { type: 'none', id: null, name: null },
    category: { type: 'agent', id: '1', name: 'Customer Support Agent' },
    subject: { type: 'workflow', id: '2', name: 'Customer service bot' },
    post: { type: 'none', id: null, name: null },
  });

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleSelect = (level: keyof LevelDefaults, type: 'agent' | 'workflow' | 'none', id: string | null, name: string | null) => {
    setDefaults({
      ...defaults,
      [level]: { type, id, name }
    });
    setActiveDropdown(null);
  };

  const handleSave = () => {
    showToast('success', 'Organization defaults saved successfully');
    console.log('Saving defaults:', defaults);
  };

  const renderDefaultSelector = (level: keyof LevelDefaults, label: string, description: string) => {
    const config = defaults[level];
    const isOpen = activeDropdown === level;

    return (
      <Card key={level} className="hover:border-primary/30 dark:hover:border-primary/30 transition-all">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-lg dark:text-gray-100 mb-1">{label}</h3>
            <p className="text-sm text-muted-foreground dark:text-gray-400">{description}</p>
          </div>

          {/* Current Selection Display */}
          <div className="p-4 bg-secondary/30 dark:bg-[#1a1a1a] rounded-lg border border-border dark:border-[#2a2a2a]">
            {config.type === 'none' ? (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground dark:text-gray-400">
                  No default configured
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setActiveDropdown(isOpen ? null : level)}
                >
                  Configure
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    config.type === 'agent'
                      ? 'bg-gradient-to-br from-primary to-primary/80'
                      : 'bg-purple-100 dark:bg-purple-900/30'
                  }`}>
                    {config.type === 'agent' ? (
                      <Bot className="w-4 h-4 text-white" />
                    ) : (
                      <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium dark:text-gray-100">{config.name}</span>
                      <Badge variant={config.type === 'agent' ? 'default' : 'warning'}>
                        {config.type === 'agent' ? 'AI Agent' : 'Workflow'}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setActiveDropdown(isOpen ? null : level)}
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleSelect(level, 'none', null, null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Dropdown Selection */}
          {isOpen && (
            <div className="space-y-3 pt-2 border-t border-border dark:border-[#2a2a2a]">
              <div>
                <h4 className="text-sm font-medium mb-2 dark:text-gray-300">AI Agents</h4>
                <div className="space-y-2">
                  {availableAgents.map((agent) => (
                    <button
                      key={agent.id}
                      onClick={() => handleSelect(level, 'agent', agent.id, agent.name)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        config.type === 'agent' && config.id === agent.id
                          ? 'border-primary bg-primary/5 dark:bg-primary/10'
                          : 'border-border dark:border-[#2a2a2a] hover:border-primary/50 dark:hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium dark:text-gray-100">{agent.name}</div>
                          <div className="text-xs text-muted-foreground dark:text-gray-500">{agent.model}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2 dark:text-gray-300">Workflows</h4>
                <div className="space-y-2">
                  {availableWorkflows.map((workflow) => (
                    <button
                      key={workflow.id}
                      onClick={() => handleSelect(level, 'workflow', workflow.id, workflow.name)}
                      className={`w-full text-left p-3 rounded-lg border transition-all ${
                        config.type === 'workflow' && config.id === workflow.id
                          ? 'border-primary bg-primary/5 dark:bg-primary/10'
                          : 'border-border dark:border-[#2a2a2a] hover:border-primary/50 dark:hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium dark:text-gray-100">{workflow.name}</div>
                          <div className="text-xs text-muted-foreground dark:text-gray-500">{workflow.description}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => handleSelect(level, 'none', null, null)}
                className="w-full"
              >
                Clear Selection
              </Button>
            </div>
          )}
        </div>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background dark:bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600 to-orange-500 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold dark:text-gray-100">Organization Defaults</h1>
              <p className="text-muted-foreground dark:text-gray-400">
                Configure default AI agents and workflows for your organization
              </p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <Card className="mb-6 bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-blue-900 dark:text-blue-200">
                About Organization Defaults
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                These defaults will be applied to all channels, categories, subjects, and posts in your organization.
                Individual items can override these defaults if needed.
              </p>
            </div>
          </div>
        </Card>

        {/* Default Selectors */}
        <div className="space-y-4 mb-8">
          {renderDefaultSelector('channel', 'Channel Default', 'Default AI configuration for all channels')}
          {renderDefaultSelector('category', 'Category Default', 'Default AI configuration for all categories')}
          {renderDefaultSelector('subject', 'Subject Default', 'Default AI configuration for all subjects')}
          {renderDefaultSelector('post', 'Post Default', 'Default AI configuration for all posts')}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-border dark:border-[#2a2a2a]">
          <Button variant="outline" onClick={() => navigate('/settings')}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Settings className="w-4 h-4" />
            Save Defaults
          </Button>
        </div>
      </div>
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/OrganizationDrive.tsx`

- Category: `screens`
- Bytes: `22397`
- SHA-256: `acd0d4da353da25851ff89bb32e78e75eef4f2cd0b158c5992e13761d9c5adc9`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `OrganizationDrive.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useToast } from '../components/Toast';
import { FileUploadModal } from '../components/FileUploadModal';
import { formatBytes } from '../format';
import { HardDrive, Plus, FolderOpen, Users, User, MoreVertical, Edit, Trash2, Search, X, Upload, LayoutGrid, List, File as FileIcon, Eye } from 'lucide-react';

export interface SharedSpace {
  id: string;
  scope_type?: string | null;
  user_id?: string | null;
  organization_id?: string | null;
  name?: string | null;
  slug?: string | null;
  metadata?: Record<string, unknown> | null;
  created_by?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

// Mock data
const mockSpaces: SharedSpace[] = [
  {
    id: 'space-1',
    scope_type: 'organization',
    organization_id: 'org-1',
    name: 'Engineering Documents',
    slug: 'engineering-docs',
    metadata: { fileCount: 9, totalSize: 92160 },
    created_by: 'user-1',
    created_at: '2026-01-15T10:00:00Z',
    updated_at: '2026-05-08T14:30:00Z',
  },
  {
    id: 'space-2',
    scope_type: 'organization',
    organization_id: 'org-1',
    name: 'Design Assets',
    slug: 'design-assets',
    metadata: { fileCount: 128, totalSize: 52428800 },
    created_by: 'user-2',
    created_at: '2026-02-10T09:00:00Z',
    updated_at: '2026-05-10T11:20:00Z',
  },
  {
    id: 'space-3',
    scope_type: 'user',
    user_id: 'user-1',
    name: 'My Private Files',
    slug: 'my-private-files',
    metadata: { fileCount: 18, totalSize: 3145728 },
    created_by: 'user-1',
    created_at: '2026-03-05T15:00:00Z',
    updated_at: '2026-05-09T16:45:00Z',
  },
  {
    id: 'space-4',
    scope_type: 'organization',
    organization_id: 'org-1',
    name: 'Marketing Materials',
    slug: 'marketing-materials',
    metadata: { fileCount: 67, totalSize: 31457280 },
    created_by: 'user-3',
    created_at: '2026-01-20T11:00:00Z',
    updated_at: '2026-05-07T10:15:00Z',
  },
];

interface RootFile {
  id: string;
  filename: string;
  mime_type: string;
  byte_size: number;
  created_at: string;
}

export default function OrganizationDrive() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [spaces, setSpaces] = useState<SharedSpace[]>(mockSpaces);
  const [rootFiles, setRootFiles] = useState<RootFile[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newSpaceName, setNewSpaceName] = useState('');
  const [newSpaceType, setNewSpaceType] = useState<'organization' | 'user'>('organization');

  const filteredSpaces = spaces.filter(space =>
    space.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    space.slug?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateSpace = () => {
    if (!newSpaceName.trim()) {
      showToast('error', 'Please enter a space name');
      return;
    }

    const newSpace: SharedSpace = {
      id: `space-${Date.now()}`,
      scope_type: newSpaceType,
      organization_id: newSpaceType === 'organization' ? 'org-1' : null,
      user_id: newSpaceType === 'user' ? 'user-1' : null,
      name: newSpaceName,
      slug: newSpaceName.toLowerCase().replace(/\s+/g, '-'),
      metadata: { fileCount: 0, totalSize: 0 },
      created_by: 'user-1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setSpaces([newSpace, ...spaces]);
    setNewSpaceName('');
    setIsCreateModalOpen(false);
    showToast('success', `Created space "${newSpaceName}"`);
  };

  const handleDeleteSpace = (spaceId: string, spaceName: string | null | undefined) => {
    setSpaces(spaces.filter(s => s.id !== spaceId));
    showToast('success', `Deleted space "${spaceName}"`);
  };

  const handleUploadComplete = (uploadedFiles: File[]) => {
    const newFiles: RootFile[] = uploadedFiles.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      filename: file.name,
      mime_type: file.type || 'application/octet-stream',
      byte_size: file.size,
      created_at: new Date().toISOString(),
    }));

    setRootFiles([...newFiles, ...rootFiles]);
    showToast('success', `Uploaded ${uploadedFiles.length} file${uploadedFiles.length > 1 ? 's' : ''}`);
  };

  const handleDeleteFile = (fileId: string, filename: string) => {
    setRootFiles(rootFiles.filter(f => f.id !== fileId));
    showToast('success', `Deleted "${filename}"`);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-background dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center">
                <HardDrive className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold dark:text-gray-100">Organisation Drive</h1>
                <p className="text-muted-foreground dark:text-gray-400">
                  Manage shared files and documents
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setIsCreateModalOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                New Space
              </Button>
              <Button onClick={() => setIsUploadModalOpen(true)} className="gap-2">
                <Upload className="w-4 h-4" />
                Upload File
              </Button>
            </div>
          </div>

          {/* Search and View Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search spaces and files..."
                className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-gray-100"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-1 bg-secondary dark:bg-[#2a2a2a] rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-primary text-foreground dark:text-white shadow-sm'
                    : 'hover:bg-white/50 dark:hover:bg-white/10 text-muted-foreground dark:text-gray-400'
                }`}
                title="Grid view"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-primary text-foreground dark:text-white shadow-sm'
                    : 'hover:bg-white/50 dark:hover:bg-white/10 text-muted-foreground dark:text-gray-400'
                }`}
                title="List view"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Spaces and Files */}
        {rootFiles.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">Root Files ({rootFiles.length})</h2>
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-2'}>
              {rootFiles.map((file) => (
                viewMode === 'grid' ? (
                  <Card
                    key={file.id}
                    className="group hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer"
                  >
                    <div className="space-y-4">
                      <div className="aspect-[4/3] w-full rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-900/10 flex items-center justify-center">
                        <FileIcon className="w-12 h-12 text-blue-600 dark:text-blue-400 opacity-50" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-1 dark:text-gray-100 truncate" title={file.filename}>
                          {file.filename}
                        </h3>
                        <p className="text-xs text-muted-foreground dark:text-gray-400">
                          {formatBytes(file.byte_size)} • {formatDate(file.created_at)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="w-3 h-3 mr-1" />
                          View
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteFile(file.id, file.filename);
                          }}
                        >
                          <Trash2 className="w-3 h-3 text-red-600 dark:text-red-400" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ) : (
                  <Card
                    key={file.id}
                    className="group hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer"
                    padding="md"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                          <FileIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium dark:text-gray-100 truncate">{file.filename}</h3>
                          <p className="text-sm text-muted-foreground dark:text-gray-400">
                            {formatBytes(file.byte_size)} • {formatDate(file.created_at)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteFile(file.id, file.filename);
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                )
              ))}
            </div>
          </div>
        )}

        {/* Spaces Grid */}
        {filteredSpaces.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">Spaces ({filteredSpaces.length})</h2>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {filteredSpaces.map((space) => (
            <Card
              key={space.id}
              className="group hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer"
              onClick={() => navigate(`/organization-drive/${space.id}`)}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      space.scope_type === 'organization'
                        ? 'bg-purple-100 dark:bg-purple-900/30'
                        : 'bg-blue-100 dark:bg-blue-900/30'
                    }`}>
                      <FolderOpen className={`w-6 h-6 ${
                        space.scope_type === 'organization'
                          ? 'text-purple-600 dark:text-purple-400'
                          : 'text-blue-600 dark:text-blue-400'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-1 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                        {space.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground dark:text-gray-400">
                        {space.scope_type === 'organization' ? (
                          <>
                            <Users className="w-3 h-3" />
                            <span>Organization</span>
                          </>
                        ) : (
                          <>
                            <User className="w-3 h-3" />
                            <span>Private</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      // Show menu
                    }}
                    className="p-1 hover:bg-secondary rounded opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <div className="pt-3 border-t border-border dark:border-[#2a2a2a] space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-gray-400">Files</span>
                    <span className="font-medium dark:text-gray-200">
                      {(space.metadata as any)?.fileCount || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground dark:text-gray-400">Size</span>
                    <span className="font-medium dark:text-gray-200">
                      {formatBytes((space.metadata as any)?.totalSize)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/organization-drive/${space.id}`);
                    }}
                    className="flex-1"
                  >
                    Open
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Edit space
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteSpace(space.id, space.name);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredSpaces.length === 0 && rootFiles.length === 0 && (
          <Card className="text-center py-12">
            <div className="w-16 h-16 bg-secondary dark:bg-[#2a2a2a] rounded-full flex items-center justify-center mx-auto mb-4">
              <HardDrive className="w-8 h-8 text-muted-foreground dark:text-gray-500" />
            </div>
            <h3 className="font-semibold mb-2 dark:text-gray-100">
              {searchQuery ? 'No results found' : 'No spaces or files yet'}
            </h3>
            <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
              {searchQuery ? 'Try a different search term' : 'Create a space or upload files to get started'}
            </p>
            {!searchQuery && (
              <div className="flex items-center justify-center gap-2">
                <Button variant="outline" onClick={() => setIsCreateModalOpen(true)} className="gap-2">
                  <Plus className="w-4 h-4" />
                  New Space
                </Button>
                <Button onClick={() => setIsUploadModalOpen(true)} className="gap-2">
                  <Upload className="w-4 h-4" />
                  Upload File
                </Button>
              </div>
            )}
          </Card>
        )}
      </div>

      {/* Create Space Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
            <h2 className="text-xl font-bold mb-4 dark:text-gray-100">Create New Space</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                  Space Name
                </label>
                <input
                  type="text"
                  value={newSpaceName}
                  onChange={(e) => setNewSpaceName(e.target.value)}
                  placeholder="e.g., Engineering Documents"
                  className="w-full px-4 py-2.5 bg-white dark:bg-[#0a0a0a] border border-border dark:border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                  Space Type
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setNewSpaceType('organization')}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      newSpaceType === 'organization'
                        ? 'border-primary bg-primary/5'
                        : 'border-border dark:border-[#2a2a2a] hover:border-primary/50'
                    }`}
                  >
                    <Users className="w-5 h-5 mb-2 text-purple-600 dark:text-purple-400" />
                    <div className="font-medium text-sm dark:text-gray-100">Organization</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">
                      Shared with team
                    </div>
                  </button>
                  <button
                    onClick={() => setNewSpaceType('user')}
                    className={`p-4 border rounded-lg text-left transition-all ${
                      newSpaceType === 'user'
                        ? 'border-primary bg-primary/5'
                        : 'border-border dark:border-[#2a2a2a] hover:border-primary/50'
                    }`}
                  >
                    <User className="w-5 h-5 mb-2 text-blue-600 dark:text-blue-400" />
                    <div className="font-medium text-sm dark:text-gray-100">Private</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">
                      Only you
                    </div>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateModalOpen(false);
                  setNewSpaceName('');
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button onClick={handleCreateSpace} className="flex-1">
                Create Space
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* File Upload Modal */}
      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadComplete={handleUploadComplete}
      />
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/OrganizationMembers.tsx`

- Category: `screens`
- Bytes: `32046`
- SHA-256: `d156c76740672a0bb844dd611413341f22c5f7dd7435608a43cf93931bf2713b`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `OrganizationMembers.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState } from "react";
import { Users, UserPlus, Search, MoreVertical, Mail, Shield, Ban, Trash2, Settings, AlertTriangle, Plus, Box, Sparkles, Network, FileText, X } from "lucide-react";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { useToast } from "../components/Toast";
import { DependentSelect } from "../components/DependentSelect";
import { PermissionsMatrix, PermissionCategory, Role } from "../components/PermissionsMatrix";

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  joinedDate: string;
  lastActive: string;
  permissions?: Record<string, string[]>;
  restrictedNodes?: string[];
}

export function OrganizationMembers() {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  const [showEditPermissionsModal, setShowEditPermissionsModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [memberToDelete, setMemberToDelete] = useState<Member | null>(null);
  const [permissionTab, setPermissionTab] = useState<'permissions' | 'restrictions'>('permissions');
  const [nodeSearchQuery, setNodeSearchQuery] = useState('');
  const [selectedNodeToRestrict, setSelectedNodeToRestrict] = useState<string>('');

  const availableNodes = [
    { id: 'action-router', name: 'Action Router', icon: 'diamond', color: 'gray' },
    { id: 'ai-agent', name: 'AI Agent', icon: 'sparkles', color: 'cyan' },
    { id: 'ai-governor-node', name: 'AI Governor Node', icon: 'network', color: 'cyan' },
    { id: 'analyze-text', name: 'Analyze Text', icon: 'file-text', color: 'cyan' },
    { id: 'data-processor', name: 'Data Processor', icon: 'box', color: 'blue' },
    { id: 'email-notifier', name: 'Email Notifier', icon: 'mail', color: 'green' },
  ];

  const roles: Role[] = [
    { id: 'admin', name: 'Admin', description: 'Full access' },
    { id: 'manager', name: 'Manager', description: 'Team management' },
    { id: 'editor', name: 'Editor', description: 'Content editing' },
    { id: 'viewer', name: 'Viewer', description: 'Read-only' },
  ];

  const permissionCategories: PermissionCategory[] = [
    {
      id: 'content',
      name: 'Content Management',
      permissions: [
        { id: 'content.view', name: 'View Content', description: 'Can view all content' },
        { id: 'content.create', name: 'Create Content', description: 'Can create new content' },
        { id: 'content.edit', name: 'Edit Content', description: 'Can edit existing content' },
        { id: 'content.delete', name: 'Delete Content', description: 'Can delete content' },
        { id: 'content.publish', name: 'Publish Content', description: 'Can publish content' },
      ],
    },
    {
      id: 'workflows',
      name: 'Workflows',
      permissions: [
        { id: 'workflows.view', name: 'View Workflows', description: 'Can view workflows' },
        { id: 'workflows.create', name: 'Create Workflows', description: 'Can create workflows' },
        { id: 'workflows.execute', name: 'Execute Workflows', description: 'Can run workflows' },
        { id: 'workflows.delete', name: 'Delete Workflows', description: 'Can delete workflows' },
      ],
    },
    {
      id: 'ai',
      name: 'AI Features',
      permissions: [
        { id: 'ai.chat', name: 'AI Chat', description: 'Can use AI chat' },
        { id: 'ai.agents', name: 'AI Agents', description: 'Can create and use AI agents' },
        { id: 'ai.workflows', name: 'AI Workflows', description: 'Can use AI in workflows' },
      ],
    },
    {
      id: 'admin',
      name: 'Administration',
      permissions: [
        { id: 'admin.users', name: 'Manage Users', description: 'Can manage users' },
        { id: 'admin.permissions', name: 'Manage Permissions', description: 'Can manage permissions' },
        { id: 'admin.billing', name: 'Manage Billing', description: 'Can manage billing' },
      ],
    },
  ];

  const [members, setMembers] = useState<Member[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@company.com',
      role: 'admin',
      department: 'engineering',
      status: 'active',
      joinedDate: '2024-01-15',
      lastActive: '2 hours ago',
      permissions: {
        admin: permissionCategories.flatMap(c => c.permissions.map(p => p.id)),
        manager: [],
        editor: [],
        viewer: [],
      },
      restrictedNodes: [],
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      role: 'manager',
      department: 'sales',
      status: 'active',
      joinedDate: '2024-02-20',
      lastActive: '5 minutes ago',
      permissions: {
        admin: [],
        manager: ['content.view', 'content.create', 'content.edit', 'workflows.view', 'workflows.execute', 'ai.chat'],
        editor: [],
        viewer: [],
      },
      restrictedNodes: ['ai-governor-node'],
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob.johnson@company.com',
      role: 'editor',
      department: 'marketing',
      status: 'active',
      joinedDate: '2024-03-10',
      lastActive: '1 day ago',
      permissions: {
        admin: [],
        manager: [],
        editor: ['content.view', 'content.create', 'content.edit', 'ai.chat'],
        viewer: [],
      },
      restrictedNodes: [],
    },
    {
      id: '4',
      name: 'Alice Williams',
      email: 'alice.williams@company.com',
      role: 'viewer',
      department: 'support',
      status: 'inactive',
      joinedDate: '2024-01-05',
      lastActive: '1 week ago',
      permissions: {
        admin: [],
        manager: [],
        editor: [],
        viewer: ['content.view'],
      },
      restrictedNodes: ['ai-agent', 'data-processor'],
    },
    {
      id: '5',
      name: 'Charlie Brown',
      email: 'charlie.brown@company.com',
      role: 'editor',
      department: 'engineering',
      status: 'pending',
      joinedDate: '2026-05-07',
      lastActive: 'Never',
      permissions: {
        admin: [],
        manager: [],
        editor: ['content.view', 'content.create', 'content.edit', 'workflows.view', 'ai.chat'],
        viewer: [],
      },
      restrictedNodes: [],
    },
  ]);

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeactivate = (memberId: string) => {
    setMembers(members.map(m =>
      m.id === memberId ? { ...m, status: 'inactive' as const } : m
    ));
    showToast('success', 'Member deactivated');
    setShowActionMenu(null);
  };

  const handleActivate = (memberId: string) => {
    setMembers(members.map(m =>
      m.id === memberId ? { ...m, status: 'active' as const } : m
    ));
    showToast('success', 'Member activated');
    setShowActionMenu(null);
  };

  const handleDeleteClick = (member: Member) => {
    setMemberToDelete(member);
    setShowDeleteModal(true);
    setShowActionMenu(null);
  };

  const handleDeleteConfirm = () => {
    if (memberToDelete) {
      setMembers(members.filter(m => m.id !== memberToDelete.id));
      showToast('success', 'Member removed from organization');
      setShowDeleteModal(false);
      setMemberToDelete(null);
    }
  };

  const handleResendInvite = (memberId: string) => {
    showToast('success', 'Invitation resent');
    setShowActionMenu(null);
  };

  const handleEditPermissions = (member: Member) => {
    setSelectedMember(member);
    setShowEditPermissionsModal(true);
    setShowActionMenu(null);
  };

  const handlePermissionsChange = (newPermissions: Record<string, string[]>) => {
    if (!selectedMember) return;

    setMembers(members.map(m =>
      m.id === selectedMember.id ? { ...m, permissions: newPermissions } : m
    ));
    showToast('success', 'Permissions updated successfully');
  };

  const handleAddRestriction = () => {
    if (!selectedMember || !selectedNodeToRestrict) return;

    const currentRestrictions = selectedMember.restrictedNodes || [];
    if (currentRestrictions.includes(selectedNodeToRestrict)) {
      showToast('warning', 'This node is already restricted for this user');
      return;
    }

    setMembers(members.map(m =>
      m.id === selectedMember.id
        ? { ...m, restrictedNodes: [...currentRestrictions, selectedNodeToRestrict] }
        : m
    ));

    setSelectedNodeToRestrict('');
    showToast('success', 'Node restriction added');
  };

  const handleRemoveRestriction = (nodeId: string) => {
    if (!selectedMember) return;

    setMembers(members.map(m =>
      m.id === selectedMember.id
        ? { ...m, restrictedNodes: (m.restrictedNodes || []).filter(id => id !== nodeId) }
        : m
    ));

    showToast('success', 'Node restriction removed');
  };

  const filteredAvailableNodes = availableNodes.filter(node =>
    node.name.toLowerCase().includes(nodeSearchQuery.toLowerCase())
  );

  const getNodeIcon = (iconName: string) => {
    switch (iconName) {
      case 'sparkles':
        return Sparkles;
      case 'network':
        return Network;
      case 'file-text':
        return FileText;
      case 'box':
        return Box;
      default:
        return Box;
    }
  };

  const roleLabels: Record<string, string> = {
    admin: 'Admin',
    manager: 'Manager',
    editor: 'Editor',
    viewer: 'Viewer',
  };

  const departmentLabels: Record<string, string> = {
    engineering: 'Engineering',
    sales: 'Sales',
    marketing: 'Marketing',
    support: 'Support',
  };

  return (
    <div className="h-screen flex flex-col bg-secondary/30">
      {/* Header */}
      <div className="bg-white dark:bg-[#1a1a1a] border-b border-border dark:border-[#2a2a2a] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold dark:text-gray-200">Organization Members</h1>
                <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                  Manage team members and their access
                </p>
              </div>
            </div>
            <Button onClick={() => setShowAddModal(true)} className="gap-2">
              <UserPlus className="w-4 h-4" />
              Add Member
            </Button>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search members by name, email, or department..."
              className="w-full pl-10 pr-4 py-2 border border-border dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      {/* Members Table */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-secondary/30 dark:bg-[#0f0f0f] border-b border-border dark:border-[#2a2a2a]">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium dark:text-gray-200">Member</th>
                  <th className="px-4 py-3 text-left text-sm font-medium dark:text-gray-200">Role</th>
                  <th className="px-4 py-3 text-left text-sm font-medium dark:text-gray-200">Department</th>
                  <th className="px-4 py-3 text-left text-sm font-medium dark:text-gray-200">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium dark:text-gray-200">Last Active</th>
                  <th className="px-4 py-3 text-left text-sm font-medium dark:text-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map((member) => (
                  <tr key={member.id} className="border-b border-border dark:border-[#2a2a2a] hover:bg-secondary/30 dark:hover:bg-[#2a2a2a]/30">
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium dark:text-gray-200">{member.name}</div>
                        <div className="text-sm text-muted-foreground dark:text-gray-400 flex items-center gap-1">
                          <Mail className="w-3 h-3" />
                          {member.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        <span className="text-sm dark:text-gray-200">{roleLabels[member.role]}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm dark:text-gray-200">{departmentLabels[member.department]}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs ${
                        member.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : member.status === 'inactive'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground dark:text-gray-400">
                      {member.lastActive}
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative">
                        <button
                          onClick={() => setShowActionMenu(showActionMenu === member.id ? null : member.id)}
                          className="p-2 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4 dark:text-gray-400" />
                        </button>

                        {showActionMenu === member.id && (
                          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-lg shadow-lg z-10">
                            <button
                              onClick={() => handleEditPermissions(member)}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors flex items-center gap-2 dark:text-gray-200"
                            >
                              <Settings className="w-4 h-4" />
                              Edit Permissions
                            </button>
                            {member.status === 'pending' && (
                              <button
                                onClick={() => handleResendInvite(member.id)}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors flex items-center gap-2 dark:text-gray-200"
                              >
                                <Mail className="w-4 h-4" />
                                Resend Invite
                              </button>
                            )}
                            {member.status === 'active' ? (
                              <button
                                onClick={() => handleDeactivate(member.id)}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors flex items-center gap-2 dark:text-gray-200 text-yellow-600"
                              >
                                <Ban className="w-4 h-4" />
                                Deactivate
                              </button>
                            ) : member.status === 'inactive' ? (
                              <button
                                onClick={() => handleActivate(member.id)}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors flex items-center gap-2 dark:text-gray-200 text-green-600"
                              >
                                <Shield className="w-4 h-4" />
                                Activate
                              </button>
                            ) : null}
                            <button
                              onClick={() => handleDeleteClick(member)}
                              className="w-full px-4 py-2 text-left text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors flex items-center gap-2 dark:text-gray-200 text-destructive"
                            >
                              <Trash2 className="w-4 h-4" />
                              Remove Member
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Member Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Member"
        size="md"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              showToast('success', 'Invitation sent');
              setShowAddModal(false);
            }}>
              Send Invitation
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium dark:text-gray-200 mb-2">Email Address</label>
            <input
              type="email"
              placeholder="email@example.com"
              className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium dark:text-gray-200 mb-2">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <DependentSelect
            label="Role"
            value=""
            onChange={() => {}}
            options={[
              { value: 'admin', label: 'Admin' },
              { value: 'manager', label: 'Manager' },
              { value: 'editor', label: 'Editor' },
              { value: 'viewer', label: 'Viewer' },
            ]}
            placeholder="Select a role"
            required
          />

          <DependentSelect
            label="Department"
            value=""
            onChange={() => {}}
            options={[
              { value: 'engineering', label: 'Engineering' },
              { value: 'sales', label: 'Sales' },
              { value: 'marketing', label: 'Marketing' },
              { value: 'support', label: 'Support' },
            ]}
            placeholder="Select a department"
            required
          />
        </div>
      </Modal>

      {/* Edit Permissions Modal */}
      <Modal
        isOpen={showEditPermissionsModal}
        onClose={() => {
          setShowEditPermissionsModal(false);
          setSelectedMember(null);
        }}
        title={`Edit Permissions - ${selectedMember?.name}`}
        size="xl"
        footer={
          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              onClick={() => {
                setShowEditPermissionsModal(false);
                setSelectedMember(null);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setShowEditPermissionsModal(false);
                setSelectedMember(null);
              }}
            >
              Save Changes
            </Button>
          </div>
        }
      >
        {selectedMember && (
          <div>
            {/* Tabs */}
            <div className="flex gap-1 mb-6 border-b border-border dark:border-[#2a2a2a]">
              <button
                onClick={() => setPermissionTab('permissions')}
                className={`px-4 py-2.5 font-medium transition-colors relative ${
                  permissionTab === 'permissions'
                    ? 'text-primary'
                    : 'text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200'
                }`}
              >
                Permissions
                {permissionTab === 'permissions' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
              <button
                onClick={() => setPermissionTab('restrictions')}
                className={`px-4 py-2.5 font-medium transition-colors relative ${
                  permissionTab === 'restrictions'
                    ? 'text-primary'
                    : 'text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200'
                }`}
              >
                Restrictions
                {permissionTab === 'restrictions' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            </div>

            {/* Tab Content */}
            {permissionTab === 'permissions' && selectedMember.permissions && (
              <PermissionsMatrix
                roles={roles}
                categories={permissionCategories}
                initialPermissions={selectedMember.permissions}
                onChange={handlePermissionsChange}
              />
            )}

            {permissionTab === 'restrictions' && (
              <div>
                <h3 className="font-semibold mb-2 text-primary">NODE PERMISSIONS</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-400 mb-6">
                  Selected nodes are blocked for this user before organization overrides are applied.
                </p>

                {/* Node Selector and Add Button */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1">
                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                      Node Selector
                    </label>
                    <select
                      value={selectedNodeToRestrict}
                      onChange={(e) => setSelectedNodeToRestrict(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 text-muted-foreground"
                    >
                      <option value="">Select a node to disallow</option>
                      {availableNodes.filter(node => !(selectedMember.restrictedNodes || []).includes(node.id)).map(node => (
                        <option key={node.id} value={node.id}>{node.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Button
                      onClick={handleAddRestriction}
                      disabled={!selectedNodeToRestrict}
                      className="gap-2 px-6 py-3 h-[50px]"
                    >
                      <Plus className="w-5 h-5" />
                      Add Restriction
                    </Button>
                  </div>
                </div>

                {/* Search Box */}
                <div className="relative mb-6">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-gray-400" />
                  <input
                    type="text"
                    value={nodeSearchQuery}
                    onChange={(e) => setNodeSearchQuery(e.target.value)}
                    placeholder="Search nodes..."
                    className="w-full pl-12 pr-4 py-3 border-2 border-primary/30 dark:border-primary/30 rounded-lg bg-white dark:bg-[#0a0a0a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Available Nodes List */}
                <div className="border border-border dark:border-[#2a2a2a] rounded-lg overflow-hidden">
                  <div className="divide-y divide-border dark:divide-[#2a2a2a]">
                    {filteredAvailableNodes.length === 0 ? (
                      <div className="p-8 text-center text-muted-foreground dark:text-gray-400">
                        No nodes found
                      </div>
                    ) : (
                      filteredAvailableNodes.map((node) => {
                        const Icon = getNodeIcon(node.icon);
                        const isRestricted = (selectedMember.restrictedNodes || []).includes(node.id);

                        return (
                          <div
                            key={node.id}
                            className={`p-4 flex items-center justify-between hover:bg-secondary/50 dark:hover:bg-[#1a1a1a] transition-colors ${
                              isRestricted ? 'bg-red-50/50 dark:bg-red-950/10' : ''
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                node.color === 'cyan' ? 'bg-cyan-100 dark:bg-cyan-900/30' :
                                node.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900/30' :
                                node.color === 'green' ? 'bg-green-100 dark:bg-green-900/30' :
                                'bg-gray-100 dark:bg-gray-800'
                              }`}>
                                <Icon className={`w-5 h-5 ${
                                  node.color === 'cyan' ? 'text-cyan-600 dark:text-cyan-400' :
                                  node.color === 'blue' ? 'text-blue-600 dark:text-blue-400' :
                                  node.color === 'green' ? 'text-green-600 dark:text-green-400' :
                                  'text-gray-600 dark:text-gray-400'
                                }`} />
                              </div>
                              <span className="font-medium dark:text-gray-200">{node.name}</span>
                            </div>
                            {isRestricted && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRemoveRestriction(node.id)}
                                className="gap-2 text-red-600 dark:text-red-400 border-red-300 dark:border-red-800"
                              >
                                <X className="w-4 h-4" />
                                Remove
                              </Button>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setMemberToDelete(null);
        }}
        title="Remove Member"
        size="md"
        footer={
          <div className="flex gap-3 justify-end">
            <Button
              variant="secondary"
              onClick={() => {
                setShowDeleteModal(false);
                setMemberToDelete(null);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteConfirm}
            >
              Remove Member
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold text-red-900 dark:text-red-200 mb-1">
                This action cannot be undone
              </h4>
              <p className="text-sm text-red-800 dark:text-red-300">
                Removing this member will revoke their access to the organization and all associated resources.
              </p>
            </div>
          </div>

          {memberToDelete && (
            <div className="p-4 bg-secondary/50 dark:bg-[#1a1a1a] rounded-lg border border-border dark:border-[#2a2a2a]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold dark:text-gray-100">{memberToDelete.name}</p>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">{memberToDelete.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                <div>
                  <span className="text-muted-foreground dark:text-gray-400">Role:</span>{' '}
                  <span className="font-medium dark:text-gray-200">{roleLabels[memberToDelete.role]}</span>
                </div>
                <div>
                  <span className="text-muted-foreground dark:text-gray-400">Department:</span>{' '}
                  <span className="font-medium dark:text-gray-200">{departmentLabels[memberToDelete.department]}</span>
                </div>
              </div>
            </div>
          )}

          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Are you sure you want to remove <strong className="text-foreground dark:text-gray-200">{memberToDelete?.name}</strong> from the organization?
          </p>
        </div>
      </Modal>
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/PlansAndPolicies.tsx`

- Category: `screens`
- Bytes: `16154`
- SHA-256: `499f6b6fdc679d52f81ef8e9ef69ef57cbe12ac5a8056e0aa751817057a07fec`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `PlansAndPolicies.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState } from 'react';
import { Shield, Save, CreditCard, Zap, AlertCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { useToast } from '../components/Toast';

type PlanType = 'starter' | 'pro' | 'business-lite' | 'business-lite-seat';

interface Plan {
  id: PlanType;
  name: string;
  description: string;
  price: string;
  badge?: string;
}

interface Limitation {
  id: string;
  name: string;
  description: string;
  unit: string;
}

interface PlanLimits {
  [key: string]: number;
}

export default function PlansAndPolicies() {
  const { showToast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('business-lite');

  const plans: Plan[] = [
    {
      id: 'starter',
      name: 'Starter Pack',
      description: 'Perfect for individuals and small teams getting started',
      price: 'Free',
      badge: 'Free',
    },
    {
      id: 'pro',
      name: 'Pro',
      description: 'Advanced features for growing teams',
      price: '$29/month',
      badge: 'Popular',
    },
    {
      id: 'business-lite',
      name: 'Business Lite',
      description: 'Comprehensive solution for small businesses',
      price: '$99/month',
    },
    {
      id: 'business-lite-seat',
      name: 'Business Lite Seat',
      description: 'Per-seat pricing for larger organizations',
      price: '$15/seat/month',
    },
  ];

  const limitations: Limitation[] = [
    {
      id: 'BUSINESS_LITE_INCLUDED_USERS',
      name: 'Included Users',
      description: 'Total users included in the Business Lite organization pricing',
      unit: 'users',
    },
    {
      id: 'BUSINESS_LITE_MAX_TOTAL_USERS',
      name: 'Maximum Total Users',
      description: 'Maximum total users allowed on a Business Lite organization',
      unit: 'users',
    },
    {
      id: 'CHANNEL_COUNT',
      name: 'Channel Count',
      description: 'Maximum number of channels allowed inside the current scope',
      unit: 'channels',
    },
    {
      id: 'CONCURRENT_EXECUTIONS_PER_USER',
      name: 'Concurrent Executions',
      description: 'Maximum workflow executions a single user can run at the same time',
      unit: 'executions',
    },
    {
      id: 'MAX_LINKAGES',
      name: 'Maximum Linkages',
      description: 'Maximum structural links a user can create',
      unit: 'links',
    },
    {
      id: 'MAX_SHARING',
      name: 'Maximum Sharing',
      description: 'Maximum share grants a user can create',
      unit: 'shares',
    },
    {
      id: 'MAX_WORKFLOW_AI_CREDITS_PER_BILLING_PERIOD',
      name: 'AI Credits',
      description: 'Maximum AI-assisted workflow and chat operations in the current billing period',
      unit: 'credits',
    },
    {
      id: 'POST_COUNT',
      name: 'Post Count',
      description: 'Maximum number of posts allowed inside the current scope',
      unit: 'posts',
    },
    {
      id: 'SUBJECT_COUNT',
      name: 'Subject Count',
      description: 'Maximum number of subjects allowed inside the current scope',
      unit: 'subjects',
    },
    {
      id: 'WORKFLOW_EXECUTION_TIME_SECONDS',
      name: 'Execution Time',
      description: 'Maximum workflow execution time in seconds',
      unit: 'seconds',
    },
    {
      id: 'ORG_SHARED_SPACE_BYTES',
      name: 'Shared Storage',
      description: 'Maximum bytes available in the organization shared workflow drive',
      unit: 'bytes',
    },
  ];

  // Plan limits configuration
  const planLimits: Record<PlanType, PlanLimits> = {
    starter: {
      BUSINESS_LITE_INCLUDED_USERS: 1,
      BUSINESS_LITE_MAX_TOTAL_USERS: 1,
      CHANNEL_COUNT: 5,
      CONCURRENT_EXECUTIONS_PER_USER: 2,
      MAX_LINKAGES: 50,
      MAX_SHARING: 10,
      MAX_WORKFLOW_AI_CREDITS_PER_BILLING_PERIOD: 1000,
      POST_COUNT: 100,
      SUBJECT_COUNT: 20,
      WORKFLOW_EXECUTION_TIME_SECONDS: 300,
      ORG_SHARED_SPACE_BYTES: 1073741824, // 1GB
    },
    pro: {
      BUSINESS_LITE_INCLUDED_USERS: 5,
      BUSINESS_LITE_MAX_TOTAL_USERS: 10,
      CHANNEL_COUNT: 25,
      CONCURRENT_EXECUTIONS_PER_USER: 5,
      MAX_LINKAGES: 500,
      MAX_SHARING: 100,
      MAX_WORKFLOW_AI_CREDITS_PER_BILLING_PERIOD: 10000,
      POST_COUNT: 1000,
      SUBJECT_COUNT: 100,
      WORKFLOW_EXECUTION_TIME_SECONDS: 1800,
      ORG_SHARED_SPACE_BYTES: 10737418240, // 10GB
    },
    'business-lite': {
      BUSINESS_LITE_INCLUDED_USERS: 10,
      BUSINESS_LITE_MAX_TOTAL_USERS: 50,
      CHANNEL_COUNT: 100,
      CONCURRENT_EXECUTIONS_PER_USER: 10,
      MAX_LINKAGES: 2000,
      MAX_SHARING: 500,
      MAX_WORKFLOW_AI_CREDITS_PER_BILLING_PERIOD: 50000,
      POST_COUNT: 5000,
      SUBJECT_COUNT: 500,
      WORKFLOW_EXECUTION_TIME_SECONDS: 3600,
      ORG_SHARED_SPACE_BYTES: 53687091200, // 50GB
    },
    'business-lite-seat': {
      BUSINESS_LITE_INCLUDED_USERS: 1,
      BUSINESS_LITE_MAX_TOTAL_USERS: 1000,
      CHANNEL_COUNT: 500,
      CONCURRENT_EXECUTIONS_PER_USER: 20,
      MAX_LINKAGES: 10000,
      MAX_SHARING: 2000,
      MAX_WORKFLOW_AI_CREDITS_PER_BILLING_PERIOD: 100000,
      POST_COUNT: 25000,
      SUBJECT_COUNT: 2500,
      WORKFLOW_EXECUTION_TIME_SECONDS: 7200,
      ORG_SHARED_SPACE_BYTES: 107374182400, // 100GB
    },
  };

  // Current usage (mock data)
  const currentUsage: PlanLimits = {
    BUSINESS_LITE_INCLUDED_USERS: 7,
    BUSINESS_LITE_MAX_TOTAL_USERS: 12,
    CHANNEL_COUNT: 45,
    CONCURRENT_EXECUTIONS_PER_USER: 3,
    MAX_LINKAGES: 856,
    MAX_SHARING: 234,
    MAX_WORKFLOW_AI_CREDITS_PER_BILLING_PERIOD: 23450,
    POST_COUNT: 2340,
    SUBJECT_COUNT: 187,
    WORKFLOW_EXECUTION_TIME_SECONDS: 1200,
    ORG_SHARED_SPACE_BYTES: 21474836480, // 20GB
  };

  const formatValue = (value: number, unit: string): string => {
    if (unit === 'bytes') {
      const gb = value / 1073741824;
      return `${gb.toFixed(1)} GB`;
    }
    return value.toLocaleString();
  };

  const getUsagePercentage = (current: number, limit: number): number => {
    return Math.min((current / limit) * 100, 100);
  };

  const getUsageColor = (percentage: number): string => {
    if (percentage >= 90) return 'text-red-600 dark:text-red-400';
    if (percentage >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-green-600 dark:text-green-400';
  };

  const handleSave = () => {
    showToast('success', `Plan updated to ${plans.find(p => p.id === selectedPlan)?.name}`);
    console.log('Selected plan:', selectedPlan);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold dark:text-gray-100">Plans & Policies</h1>
                <p className="text-muted-foreground dark:text-gray-400">
                  Manage your subscription plan and usage limitations
                </p>
              </div>
            </div>
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Plan Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Select Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`cursor-pointer transition-all ${
                  selectedPlan === plan.id
                    ? 'border-primary dark:border-primary ring-2 ring-primary/20'
                    : 'hover:border-primary/50 dark:hover:border-primary/50'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                <div className="relative">
                  {plan.badge && (
                    <Badge
                      variant={plan.badge === 'Popular' ? 'info' : 'success'}
                      className="absolute -top-2 -right-2"
                    >
                      {plan.badge}
                    </Badge>
                  )}
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedPlan === plan.id
                        ? 'border-primary bg-primary'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}>
                      {selectedPlan === plan.id && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <h3 className="font-semibold text-lg dark:text-gray-100">{plan.name}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 mb-3 min-h-[40px]">
                    {plan.description}
                  </p>
                  <div className="text-2xl font-bold text-primary">{plan.price}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Current Plan Info */}
        <Card className="mb-8 bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold mb-1 text-blue-900 dark:text-blue-200">
                Current Plan: {plans.find(p => p.id === selectedPlan)?.name}
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Your current usage and limits are displayed below. Upgrade your plan to increase your limits.
              </p>
            </div>
          </div>
        </Card>

        {/* Limitations Table */}
        <div>
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Usage & Limitations</h2>
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-secondary/50 dark:bg-[#2a2a2a]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wider">
                      Limitation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wider">
                      Current Usage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wider">
                      Plan Limit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground dark:text-gray-400 uppercase tracking-wider">
                      Usage
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border dark:divide-[#2a2a2a]">
                  {limitations.map((limitation) => {
                    const current = currentUsage[limitation.id] || 0;
                    const limit = planLimits[selectedPlan][limitation.id] || 0;
                    const percentage = getUsagePercentage(current, limit);
                    const isNearLimit = percentage >= 90;

                    return (
                      <tr
                        key={limitation.id}
                        className="hover:bg-secondary/30 dark:hover:bg-[#1a1a1a] transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-start gap-2">
                            {isNearLimit && (
                              <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                            )}
                            <div>
                              <div className="font-medium dark:text-gray-100">
                                {limitation.name}
                              </div>
                              <div className="text-xs text-muted-foreground dark:text-gray-400 mt-1">
                                {limitation.description}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`font-semibold ${getUsageColor(percentage)}`}>
                            {formatValue(current, limitation.unit)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium dark:text-gray-300">
                            {formatValue(limit, limitation.unit)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-1 bg-secondary dark:bg-[#2a2a2a] rounded-full h-2 overflow-hidden">
                              <div
                                className={`h-full transition-all ${
                                  percentage >= 90
                                    ? 'bg-red-600 dark:bg-red-500'
                                    : percentage >= 70
                                    ? 'bg-yellow-600 dark:bg-yellow-500'
                                    : 'bg-green-600 dark:bg-green-500'
                                }`}
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className={`text-sm font-medium min-w-[45px] ${getUsageColor(percentage)}`}>
                              {percentage.toFixed(0)}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* Upgrade Notice */}
        {selectedPlan === 'starter' && (
          <Card className="mt-8 bg-purple-50/50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold mb-1 text-purple-900 dark:text-purple-200">
                  Upgrade to unlock more features
                </h4>
                <p className="text-sm text-purple-800 dark:text-purple-300 mb-3">
                  Get higher limits, more concurrent executions, and additional storage with our Pro or Business plans.
                </p>
                <Button size="sm" variant="outline" className="border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300">
                  View All Plans
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/PopoverDemo.tsx`

- Category: `screens`
- Bytes: `6733`
- SHA-256: `05580f72527ac5d6b5a9d42377254d9a30ed04cd84fdf5ddc344d358ba96628e`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `PopoverDemo.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { FilterPopover } from '../components/FilterPopover';
import { ColumnsPopover } from '../components/ColumnsPopover';
import { AlertsPopover } from '../components/AlertsPopover';
import { SettingsPopover } from '../components/SettingsPopover';

export function PopoverDemo() {
  return (
    <div className="min-h-screen bg-background dark:bg-[#050a0f] p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-foreground dark:text-white mb-2">Popover Components Demo</h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Click buttons to see popovers open in different positions
          </p>
        </div>

        <div className="space-y-16">
          {/* Auto Positioning (Default) */}
          <section className="space-y-6">
            <h2 className="text-foreground dark:text-white">Auto Positioning (Default)</h2>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              Popovers automatically position themselves based on available viewport space
            </p>
            <div className="border border-border dark:border-[#2a2a2a] rounded-xl p-8 bg-white dark:bg-[#0f0f0f]">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <FilterPopover />
                  <ColumnsPopover />
                </div>
                <div className="flex gap-4">
                  <AlertsPopover />
                  <SettingsPopover />
                </div>
              </div>
            </div>
          </section>

          {/* Bottom Positioning */}
          <section className="space-y-6">
            <h2 className="text-foreground dark:text-white">Bottom Positioning</h2>
            <div className="border border-border dark:border-[#2a2a2a] rounded-xl p-8 bg-white dark:bg-[#0f0f0f]">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <FilterPopover position="bottom-left" />
                  <ColumnsPopover position="bottom-left" />
                </div>
                <div className="flex gap-4">
                  <AlertsPopover position="bottom-right" />
                  <SettingsPopover position="bottom-right" />
                </div>
              </div>
            </div>
          </section>

          {/* Top Positioning */}
          <section className="space-y-6">
            <h2 className="text-foreground dark:text-white">Top Positioning</h2>
            <div className="border border-border dark:border-[#2a2a2a] rounded-xl p-8 bg-white dark:bg-[#0f0f0f]">
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  <FilterPopover position="top-left" />
                  <ColumnsPopover position="top-left" />
                </div>
                <div className="flex gap-4">
                  <AlertsPopover position="top-right" />
                  <SettingsPopover position="top-right" />
                </div>
              </div>
            </div>
          </section>

          {/* Center Positioning */}
          <section className="space-y-6">
            <h2 className="text-foreground dark:text-white">Center Positioning</h2>
            <div className="border border-border dark:border-[#2a2a2a] rounded-xl p-8 bg-white dark:bg-[#0f0f0f]">
              <div className="flex items-center justify-center gap-8">
                <FilterPopover position="center-top" />
                <ColumnsPopover position="center-bottom" />
                <AlertsPopover position="center-top" />
                <SettingsPopover position="center-bottom" />
              </div>
            </div>
          </section>

          {/* Mixed Layout Example */}
          <section className="space-y-6">
            <h2 className="text-foreground dark:text-white">Toolbar Example</h2>
            <div className="border border-border dark:border-[#2a2a2a] rounded-xl bg-white dark:bg-[#0f0f0f]">
              <div className="flex items-center justify-between px-6 py-4 border-b border-border dark:border-[#2a2a2a]">
                <h3 className="text-foreground dark:text-white">Data Table</h3>
                <div className="flex gap-3">
                  <FilterPopover position="bottom-right" />
                  <ColumnsPopover position="bottom-right" />
                  <AlertsPopover position="bottom-right" />
                  <SettingsPopover position="bottom-right" />
                </div>
              </div>
              <div className="p-6 text-center text-muted-foreground dark:text-gray-400">
                Table content would appear here
              </div>
            </div>
          </section>

          {/* Position Guide */}
          <section className="space-y-6">
            <h2 className="text-foreground dark:text-white">Available Positions</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                { name: 'Auto (Default)', value: 'auto', description: 'Smart positioning' },
                { name: 'Bottom Left', value: 'bottom-left', description: 'Fixed position' },
                { name: 'Bottom Right', value: 'bottom-right', description: 'Fixed position' },
                { name: 'Top Left', value: 'top-left', description: 'Fixed position' },
                { name: 'Top Right', value: 'top-right', description: 'Fixed position' },
                { name: 'Center Top', value: 'center-top', description: 'Fixed position' },
                { name: 'Center Bottom', value: 'center-bottom', description: 'Fixed position' }
              ].map((pos) => (
                <div
                  key={pos.value}
                  className={`px-4 py-3 border rounded-lg bg-white dark:bg-[#0f0f0f] text-sm ${
                    pos.value === 'auto'
                      ? 'border-primary dark:border-primary bg-primary/5 dark:bg-primary/10'
                      : 'border-border dark:border-[#2a2a2a]'
                  }`}
                >
                  <div className="font-medium text-foreground dark:text-white mb-1">
                    {pos.name}
                  </div>
                  <code className="text-xs text-muted-foreground dark:text-gray-400 block mb-1">
                    position="{pos.value}"
                  </code>
                  <div className="text-xs text-muted-foreground dark:text-gray-400">
                    {pos.description}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
```
