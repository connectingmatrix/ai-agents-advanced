# UI Kit Screens Source Context

This file exports 23 source file(s). Each section includes reuse guidance and an exact snippet from the uploaded UI Kit.

## `src/app/screens/NewComponentsShowcase.tsx`

- Category: screen.
- Imports: import { useState } from "react";, import { Card } from "../components/Card";, import { Button } from "../components/Button";, import { useToast } from "../components/Toast";, import { InlineFilterBar, InlineFilter } from "../components/filters/InlineFilterBar";, import { TreeSelector } from "../components/selectors/TreeSelector";, import { TreeMultiSelector } from "../components/selectors/TreeMultiSelector";, import { TableSelector, TableSelectorColumn } from "../components/selectors/TableSelector";, import { TableMultiSelector, TableMultiSelectorColumn } from "../components/selectors/TableMultiSelector";, import { TreeNode } from "../components/LazyLoadTree";
- Exports: export function NewComponentsShowcase() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { useToast } from "../components/Toast";
import { InlineFilterBar, InlineFilter } from "../components/filters/InlineFilterBar";
import { TreeSelector } from "../components/selectors/TreeSelector";
import { TreeMultiSelector } from "../components/selectors/TreeMultiSelector";
import { TableSelector, TableSelectorColumn } from "../components/selectors/TableSelector";
import { TableMultiSelector, TableMultiSelectorColumn } from "../components/selectors/TableMultiSelector";
import { TreeNode } from "../components/LazyLoadTree";
import { MarkdownEditor } from "../components/editors/MarkdownEditor";
import { FileUploader } from "../components/upload/FileUploader";
import { FileViewer } from "../components/upload/FileViewer";
import { RealtimeTable, RealtimeTableColumn } from "../components/tables/RealtimeTable";
import { Folder, FileText, Database, Plus, Eye } from "lucide-react";

interface SampleData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

export function NewComponentsShowcase() {
  const { showToast } = useToast();

  // Filter state
  const [language, setLanguage] = useState('all');
  const [viewMode, setViewMode] = useState('list');
  const [status, setStatus] = useState('active');
  const [sortBy, setSortBy] = useState('sequence');
  const [searchQuery, setSearchQuery] = useState('');

  // Tree selector state
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);

  // Table selector state
  const [showTableSelector, setShowTableSelector] = useState(false);
  const [showTableMultiSelector, setShowTableMultiSelector] = useState(false);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Markdown state
  const [markdown, setMarkdown] = useState('# Hello World\n\nWrite your **markdown** here...');

  // File viewer state
  const [viewingFile, setViewingFile] = useState<any>(null);

  // Sample tree data
  const treeNodes: TreeNode[] = [
    {
      id: '1',
      label: 'Projects',
      icon: <Folder className="w-4 h-4 text-primary" />,
      children: [
        {
          id: '1-1',
          label: 'Website Redesign',
          icon: <Folder className="w-4 h-4 text-primary" />,
          children: [
            { id: '1-1-1', label: 'index.html', icon: <FileText className="w-4 h-4" /> },
            { id: '1-1-2', label: 'styles.css', icon: <FileText className="w-4 h-4" /> },
          ],
        },
        { id: '1-2', label: 'Mobile App', icon: <Folder className="w-4 h-4 text-primary" /> },
      ],
    },
    {
      id: '2',
      label: 'Documents',
      icon: <Folder className="w-4 h-4 text-primary" />,
      children: [
        { id: '2-1', label: 'report.pdf', icon: <FileText className="w-4 h-4" /> },
      ],
    },
  ];

  // Sample table data
  const tableData: SampleData[] = Array.from({ length: 20 }, (_, i) => ({
    id: `row-${i}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: ['Admin', 'Editor', 'Viewer'][i % 3],
    status: ['Active', 'Inactive'][i % 2],
  }));

  const tableColumns: TableSelectorColumn<SampleData>[] = [
    { id: 'name', header: 'Name', accessor: (row) => row.name, width: '200px' },
    { id: 'email', header: 'Email', accessor: (row) => row.email, width: '250px' },
    { id: 'role', header: 'Role', accessor: (row) => row.role, width: '150px' },
    {
      id: 'status',
      header: 'Status',
      accessor: (row) => (
        <span className={`px-2 py-0.5 rounded text-xs ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {row.status}
        </span>
      ),
      width: '120px',
    },
  ];

  // Inline filters
  const inlineFilters: InlineFilter[] = [
    {
      id: 'language',
      label: 'Language',
      value: language,
      onChange: setLanguage,
      options: [
        { value: 'all', label: 'All Languages' },
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Spanish' },
      ],
    },
    {
      id: 'view',
      label: 'View',
      value: viewMode,
      onChange: setViewMode,
      options: [
        { value: 'list', label: 'List with Detail' },
        { value: 'grid', label: 'Grid View' },
      ],
    },
    {
      id: 'status',
      label: 'Status',
      value: status,
      onChange: setStatus,
      options: [
        { value: 'all', label: 'All' },
        { value: 'active', label: 'Active' },
        { value: 'inactive', label: 'Inactive' },
      ],
    },
    {
      id: 'sort',
      label: 'Sort',
      value: sortBy,
      onChange: setSortBy,
      options: [
        { value: 'sequence', label: 'Sequence' },
        { value: 'name', label: 'Name' },
        { value: 'date', label: 'Date' },
      ],
    },
  ];

  // Realtime table columns
  const realtimeColumns: RealtimeTableColumn<SampleData>[] = [
    { id: 'name', header: 'Name', accessor: (row) => row.name },
    { id: 'email', header: 'Email', accessor: (row) => row.email },
    {
      id: 'status',
      header: 'Status',
      accessor: (row) => (
        <span className={`px-2 py-0.5 rounded text-xs ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {row.status}
        </span>
      ),
    },
  ];

  // Simulate realtime data updates
  const fetchRealtimeData = async (): Promise<SampleData[]> => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: `row-${i}`,
      name: `User ${i + 1}`,
      email: `user${i + 1}@example.com`,
      role: ['Admin', 'Editor', 'Viewer'][i % 3],
      status: Math.random() > 0.5 ? 'Active' : 'Inactive',
    }));
  };

  const handleFileUpload = async (files: File[]) => {
    console.log('Uploading files:', files);
    showToast('success', `Uploading ${files.length} file(s)`);
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <div className="min-h-screen bg-secondary/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">New Components Showcase</h1>
          <p className="text-muted-foreground">Elegant, animated components with modern UX</p>
        </div>

        {/* Inline Filter Bar */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Inline Filter Bar</h2>
          <Card className="p-0 overflow-hidden">
            <InlineFilterBar
              title="Contents List"
              filters={inlineFilters}
              searchValue={searchQuery}
              onSearchChange={setSearchQuery}
              searchPlaceholder="Search..."
              showResultCount
              resultCount={12}
              actions={
                <>
                  <Button size="sm" variant="secondary">
                    <Plus className="w-4 h-4" />
                  </Button>
                </>
              }
            />
          </Card>
        </section>

        {/* Tree Selectors */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Tree Selectors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-sm font-medium mb-4">Single Select Tree</h3>
              <TreeSelector
                nodes={treeNodes}
                value={selectedNode}
                onChange={(id, node) => {
                  setSelectedNode(id);
                  if (node) showToast('info', `Selected: ${node.label}`);
                }}
                label="Select a folder or file"
                placeholder="Choose an item..."
              />
            </Card>

            <Card>
              <h3 className="text-sm font-medium mb-4">Multi Select Tree</h3>
              <TreeMultiSelector
                nodes={treeNodes}
                value={selectedNodes}
                onChange={(ids, nodes) => {
                  setSelectedNodes(ids);
                  showToast('info', `Selected ${ids.length} item(s)`);
                }}
                label="Select multiple items"
                placeholder="Choose items..."
                maxSelections={5}
              />
            </Card>
          </div>
        </section>

        {/* Table Selectors */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Table Selectors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-sm font-medium mb-4">Single Select Table</h3>
              <Button onClick={() => setShowTableSelector(true)}>
                Open Table Selector
              </Button>
              {selectedRow && (
                <p className="text-sm text-muted-foreground mt-2">
                  Selected: {tableData.find(r => r.id === selectedRow)?.name}
                </p>
              )}
            </Card>

            <Card>
              <h3 className="text-sm font-medium mb-4">Multi Select Table</h3>
              <Button onClick={() => setShowTableMultiSelector(true)}>
                Open Multi-Select Table
              </Button>
              {selectedRows.length > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  Selected: {selectedRows.length} row(s)
                </p>
              )}
            </Card>
          </div>
        </section>

        {/* Markdown Editor */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Markdown Editor</h2>
          <Card>
            <MarkdownEditor
              value={markdown}
              onChange={setMarkdown}
              placeholder="Write your markdown here..."
              height="300px"
            />
          </Card>
        </section>

        {/* File Uploader */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">File Uploader</h2>
          <Card>
            <FileUploader
              onUpload={handleFileUpload}
              accept="image/*,application/pdf"
              maxSize={10}
              maxFiles={5}
              multiple
            />
          </Card>
        </section>

        {/* Realtime Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Realtime Table</h2>
          <RealtimeTable
            columns={realtimeColumns}
            initialData={tableData.slice(0, 10)}
            rowKey={(row) => row.id}
            onFetchData={fetchRealtimeData}
            updateInterval={3000}
            maxRows={10}
            highlightChanges
          />
        </section>
      </div>

      {/* Table Selector Modals */}
      <TableSelector
        isOpen={showTableSelector}
        onClose={() => setShowTableSelector(false)}
        columns={tableColumns}
        data={tableData}
        rowKey={(row) => row.id}
        value={selectedRow}
        onChange={(key) => setSelectedRow(key)}
        title="Select a User"
      />

      <TableMultiSelector
        isOpen={showTableMultiSelector}
        onClose={() => setShowTableMultiSelector(false)}
        columns={tableColumns}
        data={tableData}
        rowKey={(row) => row.id}
        value={selectedRows}
        onChange={(keys) => setSelectedRows(keys)}
        title="Select Users"
        maxSelections={10}
        onConfirm={() => showToast('success', `Selected ${selectedRows.length} users`)}
      />

      {/* File Viewer */}
      {viewingFile && (
        <FileViewer
          file={viewingFile}
          onClose={() => setViewingFile(null)}
        />
      )}
    </div>
  );
}
````````

## `src/app/screens/NodeEditor.tsx`

- Category: screen.
- Imports: import { useState } from 'react';, import { Save, Box, Settings, Code, FileInput, FileOutput, Info, Plus, FileText, Trash2, Play, CheckCircle, XCircle, Sparkles, Loader, Folder, FolderOpen, ChevronRight, ChevronDown, File, Database } from 'lucide-react';, import { Card } from '../components/Card';, import { Button } from '../components/Button';, import { Badge } from '../components/Badge';, import { useNavigate, useSearchParams } from 'react-router';, import Editor from '@monaco-editor/react';, import { MarkdownEditor } from '../components/editors/MarkdownEditor';, import { normalizeResult } from '@workflow/executor';, import { executeBackend } from '@workflow/execute';
- Exports: export default function NodeEditor() {, export const validate = async (payload: WorkerPayload): Promise<WorkerValidateResult> => {, export const init = async (payload: WorkerPayload): Promise<boolean> => { NODE_SCOPE.workflowId = text(record(payload.workflow?.metadata).id); return true; };, export const onUpdate = async (payload: WorkerPayload): Promise<WorkerUpdateResult> => { NODE_SCOPE.lastStatus = payload.self?.status || NODE_SCOPE.lastStatus; NODE_SCOPE.lastOutput = payload.self?.OUTPUT || NODE_SCOPE.lastOutput; return { ok: true, error: null }; };, export const execute = async (payload: WorkerPayload): Promise<WorkerExecuteResult> => {, export const commandToolSpec = async (payload: WorkerPayload): Promise<WorkflowCommandToolSpec> => {, export default createAgentBackendNodeModule({
- Reuse guidance: Use this for Node Designer screens, node validation, run/test controls, and debug-with-AI workflows.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
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
````````

## `src/app/screens/Nodes.tsx`

- Category: screen.
- Imports: import { useState } from 'react';, import { Box, Plus, Edit, Trash2, Power, PowerOff, Copy } from 'lucide-react';, import { Card } from '../components/Card';, import { Button } from '../components/Button';, import { Badge } from '../components/Badge';, import { SearchBar } from '../components/SearchBar';, import { LazyLoadList } from '../components/LazyLoadList';, import { EmptyState } from '../components/EmptyState';, import { useNavigate } from 'react-router';
- Exports: export default function Nodes() {
- Reuse guidance: Use this for Node Designer screens, node validation, run/test controls, and debug-with-AI workflows.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
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
````````

## `src/app/screens/OrganizationDefaults.tsx`

- Category: screen.
- Imports: import { useState } from 'react';, import { useNavigate } from 'react-router';, import { Card } from '../components/Card';, import { Button } from '../components/Button';, import { Badge } from '../components/Badge';, import { useToast } from '../components/Toast';, import { Settings, Bot, Zap, ChevronDown, X, Building2 } from 'lucide-react';
- Exports: export default function OrganizationDefaults() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
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
````````

## `src/app/screens/OrganizationDrive.tsx`

- Category: screen.
- Imports: import { useState } from 'react';, import { useNavigate } from 'react-router';, import { Card } from '../components/Card';, import { Button } from '../components/Button';, import { useToast } from '../components/Toast';, import { FileUploadModal } from '../components/FileUploadModal';, import { formatBytes } from '../format';, import { HardDrive, Plus, FolderOpen, Users, User, MoreVertical, Edit, Trash2, Search, X, Upload, LayoutGrid, List, File as FileIcon, Eye } from 'lucide-react';
- Exports: export interface SharedSpace {, export default function OrganizationDrive() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
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
````````

## `src/app/screens/OrganizationMembers.tsx`

- Category: screen.
- Imports: import { useState } from "react";, import { Users, UserPlus, Search, MoreVertical, Mail, Shield, Ban, Trash2, Settings, AlertTriangle, Plus, Box, Sparkles, Network, FileText, X } from "lucide-react";, import { Button } from "../components/Button";, import { Modal } from "../components/Modal";, import { useToast } from "../components/Toast";, import { DependentSelect } from "../components/DependentSelect";, import { PermissionsMatrix, PermissionCategory, Role } from "../components/PermissionsMatrix";
- Exports: export function OrganizationMembers() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
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
````````

## `src/app/screens/PlansAndPolicies.tsx`

- Category: screen.
- Imports: import { useState } from 'react';, import { Shield, Save, CreditCard, Zap, AlertCircle } from 'lucide-react';, import { Button } from '../components/Button';, import { Card } from '../components/Card';, import { Badge } from '../components/Badge';, import { useToast } from '../components/Toast';
- Exports: export default function PlansAndPolicies() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
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
````````

## `src/app/screens/PopoverDemo.tsx`

- Category: screen.
- Imports: import { FilterPopover } from '../components/FilterPopover';, import { ColumnsPopover } from '../components/ColumnsPopover';, import { AlertsPopover } from '../components/AlertsPopover';, import { SettingsPopover } from '../components/SettingsPopover';
- Exports: export function PopoverDemo() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
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
````````

## `src/app/screens/PostCreate.tsx`

- Category: screen.
- Imports: import { useState } from "react";, import { useParams, useNavigate } from "react-router";, import { Breadcrumb } from "../components/Breadcrumb";, import { Button } from "../components/Button";, import { channels, categories, subjects } from "../data/mockData";, import { Upload, Bold, Italic, Underline, List, ListOrdered, Code } from "lucide-react";
- Exports: export function PostCreate() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Breadcrumb } from "../components/Breadcrumb";
import { Button } from "../components/Button";
import { channels, categories, subjects } from "../data/mockData";
import { Upload, Bold, Italic, Underline, List, ListOrdered, Code } from "lucide-react";

export function PostCreate() {
  const { channelId, categoryId, subjectId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [narrative, setNarrative] = useState('');

  const channel = channels.find(c => c.id === channelId);
  const category = categories.find(c => c.id === categoryId);
  const subject = subjects.find(s => s.id === subjectId);

  if (!channel || !category || !subject) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-muted-foreground">Subject not found</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "My Channels", path: "/" },
    { label: channel.name, path: `/channel/${channelId}` },
    { label: category.name, path: `/channel/${channelId}/category/${categoryId}` },
    { label: subject.name, path: `/channel/${channelId}/category/${categoryId}/subject/${subjectId}` },
    { label: "Create Post" },
  ];

  const handleCancel = () => {
    navigate(`/channel/${channelId}/category/${categoryId}/subject/${subjectId}`);
  };

  const handlePublish = () => {
    navigate(`/channel/${channelId}/category/${categoryId}/subject/${subjectId}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">New Post</h1>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
          <Button size="sm" onClick={handlePublish}>
            Publish Post
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter post title..."
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Short Description</label>
          <input
            type="text"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="Briefly explain what this post is about..."
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium">Narrative</label>
            <span className="text-xs text-muted-foreground">MARKDOWN SUPPORTED</span>
          </div>

          <div className="border border-border rounded-xl overflow-hidden">
            <div className="flex items-center gap-1 p-2 bg-secondary border-b border-border">
              <button className="p-2 hover:bg-white dark:hover:bg-[#2a2a2a] rounded transition-colors">
                <Bold className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-white dark:hover:bg-[#2a2a2a] rounded transition-colors">
                <Italic className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-white dark:hover:bg-[#2a2a2a] rounded transition-colors">
                <Underline className="w-4 h-4" />
              </button>
              <div className="w-px h-6 bg-border mx-1" />
              <button className="p-2 hover:bg-white dark:hover:bg-[#2a2a2a] rounded transition-colors">
                <List className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-white dark:hover:bg-[#2a2a2a] rounded transition-colors">
                <ListOrdered className="w-4 h-4" />
              </button>
              <div className="w-px h-6 bg-border mx-1" />
              <button className="p-2 hover:bg-white dark:hover:bg-[#2a2a2a] rounded transition-colors">
                <Code className="w-4 h-4" />
              </button>
            </div>

            <textarea
              value={narrative}
              onChange={(e) => setNarrative(e.target.value)}
              placeholder="Write your content here using markdown..."
              className="w-full px-4 py-3 min-h-80 focus:outline-none resize-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Attachments</label>
          <div className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-primary/40 transition-colors cursor-pointer">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Upload className="w-6 h-6 text-primary" />
              </div>
              <p className="font-medium">Click to upload or drag and drop</p>
              <p className="text-sm text-muted-foreground">
                PNG, JPG, GIF, PDF, or ZIP (max. 100MB)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
````````

## `src/app/screens/PostView.tsx`

- Category: screen.
- Imports: import { useState } from "react";, import { useParams, useNavigate } from "react-router";, import { Breadcrumb } from "../components/Breadcrumb";, import { Button } from "../components/Button";, import { channels, categories, subjects, posts } from "../data/mockData";, import { Share2, MoreVertical, ThumbsUp, MessageCircle, Send, Bot } from "lucide-react";, import { BookmarkButton } from "../components/BookmarkButton";
- Exports: export function PostView() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Breadcrumb } from "../components/Breadcrumb";
import { Button } from "../components/Button";
import { channels, categories, subjects, posts } from "../data/mockData";
import { Share2, MoreVertical, ThumbsUp, MessageCircle, Send, Bot } from "lucide-react";
import { BookmarkButton } from "../components/BookmarkButton";

export function PostView() {
  const { channelId, categoryId, subjectId, postId } = useParams();
  const navigate = useNavigate();
  const [aiInput, setAiInput] = useState('');

  const channel = channels.find(c => c.id === channelId);
  const category = categories.find(c => c.id === categoryId);
  const subject = subjects.find(s => s.id === subjectId);
  const post = posts.find(p => p.id === postId);

  if (!channel || !category || !subject || !post) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-muted-foreground">Post not found</p>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "My Channels", path: "/" },
    { label: channel.name, path: `/channel/${channelId}` },
    { label: category.name, path: `/channel/${channelId}/category/${categoryId}` },
    { label: subject.name, path: `/channel/${channelId}/category/${categoryId}/subject/${subjectId}` },
    { label: post.title },
  ];

  const handleAskAI = () => {
    if (aiInput.trim()) {
      navigate('/dashboard-chat');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Breadcrumb items={breadcrumbItems} />

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center font-medium text-primary">
                {post.authorAvatar}
              </div>
              <div>
                <h3 className="font-semibold">{post.author}</h3>
                <p className="text-sm text-muted-foreground">
                  {post.date} • {post.readTime}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-lg">
                {subject.name}
              </span>
              <BookmarkButton
                type="post"
                id={post.id}
                channelId={channelId}
                categoryId={categoryId}
                subjectId={subjectId}
                postId={post.id}
                name={post.title}
                description={post.shortDescription}
                metadata={{ author: post.author, date: post.date }}
              />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate('/dashboard-chat')}
                title="Chat with AI"
              >
                <Bot className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <article className="mb-8">
            <h1 className="text-3xl font-bold mb-4">{post.title}</h1>

            <div className="p-4 bg-primary/5 border-l-4 border-primary rounded-r-lg mb-6">
              <p className="text-sm text-muted-foreground italic">
                AI-generated post narrative
              </p>
            </div>

            <div className="prose prose-slate max-w-none">
              <div
                className="text-foreground"
                dangerouslySetInnerHTML={{
                  __html: post.narrative.replace(/\n/g, '<br />').replace(/## /g, '<h2 class="text-xl font-semibold mt-6 mb-3">').replace(/<h2/g, '</p><h2').replace(/h2>/g, 'h2><p>').replace(/^/, '<p>').replace(/$/, '</p>')
                }}
              />
            </div>
          </article>

          <div className="flex items-center gap-6 py-4 border-t border-b border-border">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <ThumbsUp className="w-5 h-5" />
              <span className="text-sm">{post.reactions}</span>
            </button>
            <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm">{post.comments} Comments</span>
            </button>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-white dark:bg-[#1a1a1a] border-t border-border dark:border-[#2a2a2a] shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white text-sm">AI</span>
            </div>
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
              placeholder="Help me understand..."
              className="flex-1 px-4 py-3 bg-secondary/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button onClick={handleAskAI} size="md" className="gap-2">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Giga AI can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  );
}
````````

## `src/app/screens/PricingPage.tsx`

- Category: screen.
- Imports: import { Check, Zap, Crown, Rocket } from "lucide-react";, import { Button } from "../components/Button";, import { Card } from "../components/Card";, import { useToast } from "../components/Toast";
- Exports: export function PricingPage() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { Check, Zap, Crown, Rocket } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { useToast } from "../components/Toast";

interface PricingTier {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  popular?: boolean;
  cta: string;
}

export function PricingPage() {
  const { showToast } = useToast();

  const tiers: PricingTier[] = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for individuals getting started',
      icon: Zap,
      features: [
        '1 personal channel',
        '5 subjects',
        '20 posts per month',
        'Basic AI chat (100 messages/month)',
        'Community support',
      ],
      cta: 'Get Started Free',
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'For professionals and growing teams',
      icon: Rocket,
      popular: true,
      features: [
        '5 channels',
        'Unlimited subjects & posts',
        'Advanced AI chat (1,000 messages/month)',
        'Thinking mode & inline reasoning',
        'Priority support',
        'Advanced search & filters',
        'Export data',
      ],
      cta: 'Start Pro Trial',
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'contact sales',
      description: 'For organizations with advanced needs',
      icon: Crown,
      features: [
        'Unlimited everything',
        'Unlimited AI messages',
        'Custom AI models',
        'SSO & advanced security',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantee',
        'On-premise deployment',
      ],
      cta: 'Contact Sales',
    },
  ];

  const handleSelectPlan = (planName: string) => {
    showToast('success', `Selected ${planName} plan!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Choose Your Plan
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free and scale as you grow. All plans include our core AI-powered knowledge workspace features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <Card
                key={tier.name}
                className={`relative ${
                  tier.popular
                    ? 'border-2 border-primary shadow-xl scale-105'
                    : 'border border-border'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-primary text-white text-sm font-medium rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${
                      tier.popular ? 'bg-primary/10' : 'bg-secondary'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        tier.popular ? 'text-primary' : 'text-foreground'
                      }`} />
                    </div>
                    <h3 className="text-2xl font-bold">{tier.name}</h3>
                  </div>

                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      <span className="text-muted-foreground">/{tier.period}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {tier.description}
                    </p>
                  </div>

                  <Button
                    className="w-full"
                    variant={tier.popular ? 'primary' : 'secondary'}
                    onClick={() => handleSelectPlan(tier.name)}
                  >
                    {tier.cta}
                  </Button>

                  <div className="space-y-3 pt-6 border-t border-border">
                    {tier.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Need help choosing?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our team is here to help you find the perfect plan for your needs. Get in touch for a personalized demo or consultation.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => showToast('info', 'Opening calendar...')}>
              Schedule a Demo
            </Button>
            <Button variant="secondary" onClick={() => showToast('info', 'Opening chat...')}>
              Talk to Sales
            </Button>
          </div>
        </div>

        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>All plans include a 14-day free trial. No credit card required.</p>
          <p className="mt-2">Cancel anytime. Annual plans save 20%.</p>
        </div>
      </div>
    </div>
  );
}
````````

## `src/app/screens/PrivacyPage.tsx`

- Category: screen.
- Imports: No direct imports in this file.
- Exports: export function PrivacyPage() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
export function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: April 24, 2026</p>
        </div>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to GIGA Intelligence ("we", "our", or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered knowledge workspace platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We collect information you provide directly to us, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
                  <li>Name and email address</li>
                  <li>Account credentials</li>
                  <li>Profile information</li>
                  <li>Payment information (processed securely through our payment providers)</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Content Information</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We collect the content you create, upload, or share through our platform, including:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
                  <li>Channels, categories, subjects, and posts</li>
                  <li>Chat messages and AI interactions</li>
                  <li>Files and attachments</li>
                  <li>Comments and annotations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Usage Information</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We automatically collect certain information about your device and how you interact with our services:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-2">
                  <li>Device information and identifiers</li>
                  <li>Log data and analytics</li>
                  <li>Cookies and similar technologies</li>
                  <li>Usage patterns and preferences</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your transactions and send related information</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Train and improve our AI models (with your explicit consent)</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, prevent, and address technical issues and fraudulent activity</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">AI and Machine Learning</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our platform uses artificial intelligence to provide intelligent features:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Your content is processed by AI to provide contextual responses</li>
              <li>We do not use your private data to train public AI models without your explicit consent</li>
              <li>AI interactions are logged for quality improvement and debugging</li>
              <li>You can opt out of AI training at any time in your settings</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Sharing and Disclosure</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We may share your information in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>With service providers who assist in our operations</li>
              <li>In response to legal requests or to protect rights and safety</li>
              <li>With your consent or at your direction</li>
              <li>In connection with a merger, sale, or acquisition</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              We never sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mt-4">
              <li>Encryption in transit and at rest</li>
              <li>Regular security audits and penetration testing</li>
              <li>Access controls and authentication</li>
              <li>Employee training on data protection</li>
              <li>Incident response procedures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to or restrict processing</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-4">
              To exercise these rights, please contact us at privacy@gigaintelligence.com
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
            <p className="text-muted-foreground leading-relaxed">
              We retain your information for as long as necessary to provide our services and comply with legal obligations. When you delete your account, we will delete or anonymize your personal information within 30 days, except where we are required to retain it for legal purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our services are not directed to individuals under 16. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">International Data Transfers</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy and applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions or concerns about this Privacy Policy, please contact us:
            </p>
            <div className="mt-4 p-6 bg-secondary rounded-xl">
              <p className="font-medium mb-2">GIGA Intelligence Privacy Team</p>
              <p className="text-muted-foreground">Email: privacy@gigaintelligence.com</p>
              <p className="text-muted-foreground">Address: 123 AI Street, San Francisco, CA 94102, USA</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
````````

## `src/app/screens/ProcessMonitor.tsx`

- Category: screen.
- Imports: import { ProcessMonitorView } from '../process-monitoring/views/ProcessMonitorView';
- Exports: export function ProcessMonitor() {
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { ProcessMonitorView } from '../process-monitoring/views/ProcessMonitorView';

export function ProcessMonitor() {
  return <ProcessMonitorView accessMode="normal" title="Process Monitoring" normalUserId="john" />;
}
````````

## `src/app/screens/Profile.tsx`

- Category: screen.
- Imports: import { useState, useRef } from "react";, import { Card } from "../components/Card";, import { Button } from "../components/Button";, import { Input } from "../components/ui/input";, import { Modal } from "../components/Modal";, import { AccentColorPicker } from "../components/settings/AccentColorPicker";, import { useToast } from "../components/Toast";, import { useDarkMode } from "../contexts/DarkModeContext";, import { User, Mail, Bell, Shield, HelpCircle, LogOut, Camera, Check, Moon } from "lucide-react";
- Exports: export function Profile() {
- Reuse guidance: Use this for User Drive/Organisation Drive upload, file viewer, AI Agent project file editing, and ingestion mode changes.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, useRef } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { Input } from "../components/ui/input";
import { Modal } from "../components/Modal";
import { AccentColorPicker } from "../components/settings/AccentColorPicker";
import { useToast } from "../components/Toast";
import { useDarkMode } from "../contexts/DarkModeContext";
import { User, Mail, Bell, Shield, HelpCircle, LogOut, Camera, Check, Moon } from "lucide-react";

export function Profile() {
  const { showToast } = useToast();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEmailPrefs, setShowEmailPrefs] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showAccentPicker, setShowAccentPicker] = useState(false);

  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    bio: "AI enthusiast and knowledge worker",
    avatar: null as string | null,
  });

  const [emailPrefs, setEmailPrefs] = useState({
    newsletter: true,
    updates: true,
    marketing: false,
  });

  const [notificationPrefs, setNotificationPrefs] = useState({
    desktop: true,
    mobile: true,
    email: true,
    mentions: true,
    comments: true,
  });

  const [privacySettings, setPrivacySettings] = useState({
    profilePublic: true,
    showEmail: false,
    allowAnalytics: true,
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileData({ ...profileData, avatar: event.target?.result as string });
        showToast('success', 'Profile picture updated');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    showToast('success', 'Profile updated successfully');
    setShowEditProfile(false);
  };

  const handleSaveEmailPrefs = () => {
    showToast('success', 'Email preferences saved');
    setShowEmailPrefs(false);
  };

  const handleSaveNotifications = () => {
    showToast('success', 'Notification settings saved');
    setShowNotifications(false);
  };

  const handleSavePrivacy = () => {
    showToast('success', 'Privacy settings saved');
    setShowPrivacy(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-4">
      <header>
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </header>

      <Card padding="md">
        <div className="flex items-center gap-4">
          <div className="relative group">
            {profileData.avatar ? (
              <img
                src={profileData.avatar}
                alt="Profile"
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-primary" />
              </div>
            )}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Camera className="w-6 h-6 text-white" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold">{profileData.name}</h2>
            <p className="text-sm text-muted-foreground">{profileData.email}</p>
          </div>
          <Button variant="secondary" onClick={() => setShowEditProfile(true)}>
            Edit Profile
          </Button>
        </div>
      </Card>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Appearance</h2>

        <Card padding="sm" onClick={() => setShowAccentPicker(true)} className="cursor-pointer hover:border-primary/40">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary rounded-lg">
              <div className="w-5 h-5 bg-primary rounded-full" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Accent Color</h3>
              <p className="text-sm text-muted-foreground">
                Customize your theme color
              </p>
            </div>
          </div>
        </Card>

        <Card padding="sm" className="cursor-pointer hover:border-primary/40">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary rounded-lg">
              <Moon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Dark Mode</h3>
              <p className="text-sm text-muted-foreground">
                Toggle dark theme
              </p>
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                toggleDarkMode();
              }}
              className={`w-11 h-6 rounded-full transition-colors ${isDarkMode ? 'bg-primary' : 'bg-border'}`}
            >
              <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`} />
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Account Settings</h2>

        <Card padding="sm" onClick={() => setShowEmailPrefs(true)} className="cursor-pointer hover:border-primary/40">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary rounded-lg">
              <Mail className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Email Preferences</h3>
              <p className="text-sm text-muted-foreground">
                Manage notification emails
              </p>
            </div>
          </div>
        </Card>

        <Card padding="sm" onClick={() => setShowNotifications(true)} className="cursor-pointer hover:border-primary/40">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary rounded-lg">
              <Bell className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Configure notification settings
              </p>
            </div>
          </div>
        </Card>

        <Card padding="sm" onClick={() => setShowPrivacy(true)} className="cursor-pointer hover:border-primary/40">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary rounded-lg">
              <Shield className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Privacy & Security</h3>
              <p className="text-sm text-muted-foreground">
                Control your privacy settings
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Support</h2>

        <Card padding="sm" className="cursor-pointer hover:border-primary/40">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-secondary rounded-lg">
              <HelpCircle className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Help Center</h3>
              <p className="text-sm text-muted-foreground">
                Get help and support
              </p>
            </div>
          </div>
        </Card>

        <Card padding="sm" onClick={() => showToast('info', 'Signing out...')} className="cursor-pointer hover:border-destructive/40 border-destructive/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-destructive/10 rounded-lg">
              <LogOut className="w-5 h-5 text-destructive" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-destructive">Sign Out</h3>
              <p className="text-sm text-muted-foreground">
                Sign out of your account
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        title="Edit Profile"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowEditProfile(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveProfile}>
              Save Changes
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Full Name"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
            required
          />
          <Input
            label="Email"
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            required
          />
          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
        </div>
      </Modal>

      {/* Email Preferences Modal */}
      <Modal
        isOpen={showEmailPrefs}
        onClose={() => setShowEmailPrefs(false)}
        title="Email Preferences"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowEmailPrefs(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEmailPrefs}>
              Save Preferences
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          {Object.entries(emailPrefs).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary/30">
              <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              <div
                onClick={() => setEmailPrefs({ ...emailPrefs, [key]: !value })}
                className={`w-11 h-6 rounded-full transition-colors ${value ? 'bg-primary' : 'bg-border'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${value ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`} />
              </div>
            </label>
          ))}
        </div>
      </Modal>

      {/* Notifications Modal */}
      <Modal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        title="Notification Settings"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowNotifications(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveNotifications}>
              Save Settings
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          {Object.entries(notificationPrefs).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary/30">
              <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
              <div
                onClick={() => setNotificationPrefs({ ...notificationPrefs, [key]: !value })}
                className={`w-11 h-6 rounded-full transition-colors ${value ? 'bg-primary' : 'bg-border'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${value ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`} />
              </div>
            </label>
          ))}
        </div>
      </Modal>

      {/* Privacy Modal */}
      <Modal
        isOpen={showPrivacy}
        onClose={() => setShowPrivacy(false)}
        title="Privacy & Security"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowPrivacy(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePrivacy}>
              Save Settings
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          {Object.entries(privacySettings).map(([key, value]) => (
            <label key={key} className="flex items-center justify-between p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary/30">
              <div>
                <span className="font-medium block capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                <span className="text-sm text-muted-foreground">
                  {key === 'profilePublic' && 'Make your profile visible to others'}
                  {key === 'showEmail' && 'Display your email on your profile'}
                  {key === 'allowAnalytics' && 'Help us improve with usage data'}
                </span>
              </div>
              <div
                onClick={() => setPrivacySettings({ ...privacySettings, [key]: !value })}
                className={`w-11 h-6 rounded-full transition-colors ${value ? 'bg-primary' : 'bg-border'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white shadow-sm transform transition-transform ${value ? 'translate-x-6' : 'translate-x-0.5'} mt-0.5`} />
              </div>
            </label>
          ))}
        </div>
      </Modal>

      {/* Accent Color Picker Modal */}
      <Modal
        isOpen={showAccentPicker}
        onClose={() => setShowAccentPicker(false)}
        title="Accent Color"
        size="sm"
      >
        <AccentColorPicker />
      </Modal>
    </div>
  );
}
````````

## `src/app/screens/Settings.tsx`

- Category: screen.
- Imports: import { useState, useEffect } from 'react';, import { useNavigate } from 'react-router';, import { Settings as SettingsIcon, Users, Shield, Key, User, CreditCard, ShieldCheck, Network, Activity, BarChart3, Sparkles, Boxes, HardDrive, Building2 } from 'lucide-react';, import { Card } from '../components/Card';, import { Button } from '../components/Button';, import { useToast } from '../components/Toast';
- Exports: export default function Settings() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Settings as SettingsIcon, Users, Shield, Key, User, CreditCard, ShieldCheck, Network, Activity, BarChart3, Sparkles, Boxes, HardDrive, Building2 } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useToast } from '../components/Toast';

interface SettingSection {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: string;
}

export default function Settings() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [programmaticViewEnabled, setProgrammaticViewEnabled] = useState(() => {
    const stored = localStorage.getItem('programmaticViewEnabled');
    // Enable by default if not set
    if (stored === null) {
      localStorage.setItem('programmaticViewEnabled', 'true');
      return true;
    }
    return stored === 'true';
  });

  useEffect(() => {
    localStorage.setItem('programmaticViewEnabled', programmaticViewEnabled.toString());
  }, [programmaticViewEnabled]);

  const handleProgrammaticToggle = () => {
    const newValue = !programmaticViewEnabled;
    setProgrammaticViewEnabled(newValue);
    if (newValue) {
      showToast('success', 'Programmatic view enabled. Toggle available in header.');
    } else {
      showToast('info', 'Programmatic view disabled. Switched to compact view.');
      // Switch back to compact view if currently in programmatic
      if (localStorage.getItem('viewMode') === 'programmatic') {
        localStorage.setItem('viewMode', 'compact');
        window.location.reload(); // Reload to apply the change
      }
    }
  };

  const userSections: SettingSection[] = [
    {
      id: 'profile',
      title: 'Profile',
      description: 'Manage your personal profile, avatar, and preferences',
      icon: User,
      path: '/profile',
    },
    {
      id: 'organization',
      title: 'Organization Members',
      description: 'Manage team members, roles, and invitations',
      icon: Users,
      path: '/members',
      badge: 'Team',
    },
    {
      id: 'organization-drive',
      title: 'Organisation Drive',
      description: 'Manage shared files and documents across your organization',
      icon: HardDrive,
      path: '/organization-drive',
      badge: 'Storage',
    },
    {
      id: 'permissions',
      title: 'User Permissions',
      description: 'Configure user roles and access control',
      icon: Shield,
      path: '/permissions',
      badge: 'Security',
    },
    {
      id: 'credentials',
      title: 'Credentials Manager',
      description: 'Manage API keys, tokens, and integrations',
      icon: Key,
      path: '/credentials',
      badge: 'Security',
    },
    {
      id: 'nodes',
      title: 'Nodes',
      description: 'Create and manage custom workflow nodes with TypeScript',
      icon: Boxes,
      path: '/nodes',
      badge: 'Dev',
    },
    {
      id: 'plans-policies',
      title: 'Plans & Policies',
      description: 'Manage subscription plans and usage limitations',
      icon: CreditCard,
      path: '/plans-policies',
      badge: 'Billing',
    },
    {
      id: 'ai-agent-projects',
      title: 'AI Agent Projects',
      description: 'Build and manage full-stack applications with AI',
      icon: Sparkles,
      path: '/ai-agent-projects',
      badge: 'AI',
    },
    {
      id: 'organization-defaults',
      title: 'Organization Defaults',
      description: 'Configure default AI agents and workflows for your organization',
      icon: Building2,
      path: '/organization-defaults',
      badge: 'Org',
    },
  ];

  const adminSections: SettingSection[] = [
    {
      id: 'admin-plans-policies',
      title: 'Admin Plans & Policies',
      description: 'Manage organization and user plans with custom limits',
      icon: ShieldCheck,
      path: '/admin-plans-policies',
      badge: 'Admin',
    },
    {
      id: 'process-monitor',
      title: 'Process Monitor',
      description: 'Real-time monitoring of processes, users, and system resources',
      icon: Activity,
      path: '/process-monitor',
      badge: 'Admin',
    },
    {
      id: 'admin-dashboard',
      title: 'Admin Dashboard',
      description: 'Comprehensive dashboard for user and process management',
      icon: BarChart3,
      path: '/admin-dashboard',
      badge: 'Admin',
    },
    {
      id: 'global-defaults',
      title: 'Global Defaults',
      description: 'Configure system-wide default AI agents and workflows',
      icon: Shield,
      path: '/global-defaults',
      badge: 'Root',
    },
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <SettingsIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold dark:text-gray-100">Settings</h1>
              <p className="text-muted-foreground dark:text-gray-400">
                Manage your account and organization settings
              </p>
            </div>
          </div>
        </div>

        {/* User Settings Sections */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">User Settings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {userSections.map((section) => {
              const Icon = section.icon;
              return (
                <Card
                  key={section.id}
                  className="group hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer"
                  onClick={() => navigate(section.path)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                          {section.title}
                        </h3>
                        {section.badge && (
                          <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                            {section.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Admin Settings Sections */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-red-600 dark:text-red-400" />
            Admin Settings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {adminSections.map((section) => {
              const Icon = section.icon;
              return (
                <Card
                  key={section.id}
                  className="group hover:border-red-400 dark:hover:border-red-600 transition-all cursor-pointer border-red-200 dark:border-red-900"
                  onClick={() => navigate(section.path)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0 group-hover:bg-red-200 dark:group-hover:bg-red-900/50 transition-colors">
                      <Icon className="w-6 h-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                          {section.title}
                        </h3>
                        {section.badge && (
                          <span className="text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full">
                            {section.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="hover:border-primary/50 dark:hover:border-primary/50 transition-all">
              <div className="text-center">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-3">
                  <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h4 className="font-medium dark:text-gray-100 mb-1">Invite Members</h4>
                <p className="text-xs text-muted-foreground dark:text-gray-400 mb-3">
                  Add new team members
                </p>
                <Button size="sm" variant="outline" onClick={() => navigate('/members')}>
                  Invite
                </Button>
              </div>
            </Card>

            <Card className="hover:border-primary/50 dark:hover:border-primary/50 transition-all">
              <div className="text-center">
                <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-3">
                  <Key className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <h4 className="font-medium dark:text-gray-100 mb-1">New API Key</h4>
                <p className="text-xs text-muted-foreground dark:text-gray-400 mb-3">
                  Generate new credentials
                </p>
                <Button size="sm" variant="outline" onClick={() => navigate('/credentials')}>
                  Create
                </Button>
              </div>
            </Card>

            <Card className="hover:border-primary/50 dark:hover:border-primary/50 transition-all">
              <div className="text-center">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <h4 className="font-medium dark:text-gray-100 mb-1">Update Roles</h4>
                <p className="text-xs text-muted-foreground dark:text-gray-400 mb-3">
                  Configure permissions
                </p>
                <Button size="sm" variant="outline" onClick={() => navigate('/permissions')}>
                  Manage
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Preferences */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Preferences</h2>
          <Card>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                <Network className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg dark:text-gray-100">Programmatic View</h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                      Enable hierarchical tree navigation for advanced workspace organization
                    </p>
                  </div>
                  <button
                    onClick={handleProgrammaticToggle}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      programmaticViewEnabled
                        ? 'bg-primary'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        programmaticViewEnabled ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
                {programmaticViewEnabled && (
                  <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <p className="text-xs text-purple-800 dark:text-purple-300">
                      Programmatic view is now enabled. You can toggle between Compact and Programmatic views using the button in the header.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Additional Info */}
        <Card className="mt-8 bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
              <SettingsIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-blue-900 dark:text-blue-200">
                Need help with settings?
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-300 mb-3">
                Visit our documentation to learn more about managing your organization, configuring permissions, and securing your credentials.
              </p>
              <Button size="sm" variant="outline" className="border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300">
                View Documentation
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
````````

## `src/app/screens/SharedSpaceFiles.tsx`

- Category: screen.
- Imports: import { useState, useEffect, useMemo } from 'react';, import { useParams, useNavigate } from 'react-router';, import { Card } from '../components/Card';, import { Button } from '../components/Button';, import { useToast } from '../components/Toast';, import { DataTable, Column } from '../components/DataTable';, import { FileUploadModal } from '../components/FileUploadModal';, import { formatBytes } from '../format';, import {
- Exports: export interface SharedSpaceFile {, export default function SharedSpaceFiles() {
- Reuse guidance: Use this for User Drive/Organisation Drive upload, file viewer, AI Agent project file editing, and ingestion mode changes.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useToast } from '../components/Toast';
import { DataTable, Column } from '../components/DataTable';
import { FileUploadModal } from '../components/FileUploadModal';
import { formatBytes } from '../format';
import {
  ArrowLeft,
  Upload,
  LayoutGrid,
  List,
  Search,
  X,
  FileText,
  File,
  Image as ImageIcon,
  Video,
  Music,
  Archive,
  Code,
  MoreVertical,
  Download,
  Edit,
  Trash2,
  Eye,
  FolderOpen,
  Plus,
} from 'lucide-react';

export interface SharedSpaceFile {
  id: string;
  shared_space_id?: string | null;
  storage_bucket?: string | null;
  storage_path?: string | null;
  filename?: string | null;
  mime_type?: string | null;
  byte_size?: number | null;
  metadata?: Record<string, unknown> | null;
  created_by?: string | null;
  created_at?: string | null;
}

// Mock data
const mockFiles: SharedSpaceFile[] = [
  {
    id: 'file-1',
    shared_space_id: 'space-1',
    storage_bucket: 'org-files',
    storage_path: '/nodes/airtable/worker.ts',
    filename: 'worker.ts',
    mime_type: 'text/typescript',
    byte_size: 3840,
    metadata: { language: 'typescript', lines: 47, category: 'workflow-node' },
    created_by: 'user-1',
    created_at: '2026-05-01T10:00:00Z',
  },
  {
    id: 'file-2',
    shared_space_id: 'space-1',
    storage_bucket: 'org-files',
    storage_path: '/nodes/airtable/airtable-node.ts',
    filename: 'airtable-node.ts',
    mime_type: 'text/typescript',
    byte_size: 512,
    metadata: { language: 'typescript', lines: 5, category: 'workflow-node' },
    created_by: 'user-1',
    created_at: '2026-05-01T10:00:00Z',
  },
  {
    id: 'file-3',
    shared_space_id: 'space-1',
    storage_bucket: 'org-files',
    storage_path: '/nodes/airtable/airtable-schema.json',
    filename: 'airtable-schema.json',
    mime_type: 'application/json',
    byte_size: 4096,
    metadata: { language: 'json', category: 'workflow-node' },
    created_by: 'user-1',
    created_at: '2026-05-01T10:00:00Z',
  },
  {
    id: 'file-4',
    shared_space_id: 'space-1',
    storage_bucket: 'org-files',
    storage_path: '/nodes/airtable/README.md',
    filename: 'README.md',
    mime_type: 'text/markdown',
    byte_size: 256,
    metadata: { language: 'markdown', category: 'workflow-node' },
    created_by: 'user-1',
    created_at: '2026-05-01T10:00:00Z',
  },
  {
    id: 'file-5',
    shared_space_id: 'space-1',
    storage_bucket: 'org-files',
    storage_path: '/documents/api-spec.ts',
    filename: 'api-spec.ts',
    mime_type: 'text/typescript',
    byte_size: 15360,
    metadata: { language: 'typescript', lines: 245 },
    created_by: 'user-2',
    created_at: '2026-05-02T11:30:00Z',
  },
  {
    id: 'file-6',
    shared_space_id: 'space-1',
    storage_bucket: 'org-files',
    storage_path: '/documents/database-schema.sql',
    filename: 'database-schema.sql',
    mime_type: 'application/sql',
    byte_size: 12288,
    metadata: { language: 'sql', tables: 15 },
    created_by: 'user-3',
    created_at: '2026-05-05T09:20:00Z',
  },
  {
    id: 'file-7',
    shared_space_id: 'space-1',
    storage_bucket: 'org-files',
    storage_path: '/documents/config.json',
    filename: 'config.json',
    mime_type: 'application/json',
    byte_size: 2048,
    metadata: { language: 'json' },
    created_by: 'user-2',
    created_at: '2026-05-08T16:45:00Z',
  },
  {
    id: 'file-8',
    shared_space_id: 'space-1',
    storage_bucket: 'org-files',
    storage_path: '/documents/Engineering-README.md',
    filename: 'Engineering-README.md',
    mime_type: 'text/markdown',
    byte_size: 8192,
    metadata: { language: 'markdown' },
    created_by: 'user-2',
    created_at: '2026-05-02T11:30:00Z',
  },
  {
    id: 'file-9',
    shared_space_id: 'space-1',
    storage_bucket: 'org-files',
    storage_path: '/images/logo.png',
    filename: 'logo.png',
    mime_type: 'image/png',
    byte_size: 45056,
    metadata: { width: 512, height: 512 },
    created_by: 'user-2',
    created_at: '2026-05-03T14:15:00Z',
  },
];

const mockSpaces = [
  { id: 'space-1', name: 'Engineering Documents' },
  { id: 'space-2', name: 'Design Assets' },
  { id: 'space-3', name: 'My Private Files' },
  { id: 'space-4', name: 'Marketing Materials' },
];

export default function SharedSpaceFiles() {
  const { spaceId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [files, setFiles] = useState<SharedSpaceFile[]>(mockFiles);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isCreateSpaceModalOpen, setIsCreateSpaceModalOpen] = useState(false);
  const [newSpaceName, setNewSpaceName] = useState('');
  const [loadedCount, setLoadedCount] = useState(20);

  const space = mockSpaces.find(s => s.id === spaceId);

  const filteredFiles = useMemo(() => {
    return files.filter(file =>
      file.filename?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.mime_type?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [files, searchQuery]);

  // Compute displayed files directly without useEffect
  const displayedFiles = useMemo(() => {
    return filteredFiles.slice(0, loadedCount);
  }, [filteredFiles, loadedCount]);

  const loadMore = () => {
    setLoadedCount(prev => prev + 20);
  };

  const hasMore = displayedFiles.length < filteredFiles.length;

  // Reset loadedCount when search changes
  useEffect(() => {
    setLoadedCount(20);
  }, [searchQuery]);

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return 'Unknown';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getFileIcon = (mimeType?: string | null) => {
    if (!mimeType) return File;
    if (mimeType.startsWith('image/')) return ImageIcon;
    if (mimeType.startsWith('video/')) return Video;
    if (mimeType.startsWith('audio/')) return Music;
    if (mimeType.includes('zip') || mimeType.includes('tar') || mimeType.includes('rar')) return Archive;
    if (
      mimeType.includes('javascript') ||
      mimeType.includes('typescript') ||
      mimeType.includes('json') ||
      mimeType.includes('sql') ||
      mimeType.includes('python') ||
      mimeType.includes('java')
    ) return Code;
    if (mimeType.includes('text')) return FileText;
    return File;
  };

  const isCodeFile = (mimeType?: string | null) => {
    if (!mimeType) return false;
    return (
      mimeType.includes('javascript') ||
      mimeType.includes('typescript') ||
      mimeType.includes('json') ||
      mimeType.includes('sql') ||
      mimeType.includes('python') ||
      mimeType.includes('java') ||
      mimeType.includes('markdown') ||
      mimeType.includes('text')
    );
  };

  const isImageFile = (mimeType?: string | null) => {
    return mimeType?.startsWith('image/');
  };

  const getFilePreview = (file: SharedSpaceFile) => {
    // For demo purposes, return placeholder images
    if (isImageFile(file.mime_type)) {
      return `https://via.placeholder.com/200x150/6366f1/ffffff?text=${encodeURIComponent(file.filename || 'Image')}`;
    }
    return null;
  };

  const handleViewFile = (file: SharedSpaceFile) => {
    if (isCodeFile(file.mime_type)) {
      navigate(`/organization-drive/${spaceId}/file/${file.id}`);
    } else {
      showToast('info', `Viewing: ${file.filename}`);
      // Open file viewer modal
    }
  };

  const handleDeleteFile = (fileId: string, filename: string | null | undefined) => {
    setFiles(files.filter(f => f.id !== fileId));
    showToast('success', `Deleted "${filename}"`);
  };

  const handleUploadComplete = (uploadedFiles: File[]) => {
    const newFiles: SharedSpaceFile[] = uploadedFiles.map((file, index) => ({
      id: `file-${Date.now()}-${index}`,
      shared_space_id: spaceId,
      storage_bucket: 'org-files',
      storage_path: `/documents/${file.name}`,
      filename: file.name,
      mime_type: file.type || 'application/octet-stream',
      byte_size: file.size,
      metadata: {},
      created_by: 'user-1',
      created_at: new Date().toISOString(),
    }));

    setFiles([...newFiles, ...files]);
    showToast('success', `Uploaded ${uploadedFiles.length} file${uploadedFiles.length > 1 ? 's' : ''}`);
  };

  const handleCreateSpace = () => {
    if (!newSpaceName.trim()) {
      showToast('error', 'Please enter a space name');
      return;
    }

    showToast('success', `Created nested space "${newSpaceName}"`);
    setNewSpaceName('');
    setIsCreateSpaceModalOpen(false);
  };

  const fileColumns: Column<SharedSpaceFile>[] = [
    {
      id: 'filename',
      header: 'Name',
      accessor: (file) => {
        const Icon = getFileIcon(file.mime_type);
        return (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <div>
              <div className="font-medium">{file.filename}</div>
              <div className="text-xs text-muted-foreground">{file.mime_type}</div>
            </div>
          </div>
        );
      },
      sortable: true,
    },
    {
      id: 'size',
      header: 'Size',
      accessor: (file) => formatBytes(file.byte_size),
      sortable: true,
      width: '120px',
    },
    {
      id: 'created_at',
      header: 'Created',
      accessor: (file) => formatDate(file.created_at),
      sortable: true,
      width: '150px',
    },
    {
      id: 'actions',
      header: '',
      accessor: (file) => (
        <div className="flex items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handleViewFile(file);
            }}
          >
            <Eye className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              showToast('info', `Downloading ${file.filename}`);
            }}
          >
            <Download className="w-4 h-4" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteFile(file.id, file.filename);
            }}
          >
            <Trash2 className="w-4 h-4 text-red-600" />
          </Button>
        </div>
      ),
      width: '150px',
    },
  ];

  if (!space) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-muted-foreground">Space not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background dark:bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-purple-500 flex items-center justify-center">
                  <FolderOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold dark:text-gray-100">{space.name}</h1>
                  <p className="text-muted-foreground dark:text-gray-400">
                    {filteredFiles.length} {filteredFiles.length === 1 ? 'file' : 'files'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => setIsCreateSpaceModalOpen(true)} className="gap-2">
                <Plus className="w-4 h-4" />
                New Space
              </Button>
              <Button onClick={() => setIsUploadModalOpen(true)} className="gap-2">
                <Upload className="w-4 h-4" />
                Upload
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
                placeholder="Search files..."
                className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
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

        {/* Files Display */}
        {filteredFiles.length > 0 ? (
          viewMode === 'grid' ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayedFiles.map((file) => {
                  const Icon = getFileIcon(file.mime_type);
                  const preview = getFilePreview(file);
                  return (
                    <Card
                      key={file.id}
                      className="group hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer overflow-hidden"
                      onClick={() => handleViewFile(file)}
                    >
                      <div className="space-y-4">
                        {/* File Preview/Icon */}
                        <div className="relative">
                          {preview ? (
                            <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-secondary dark:bg-[#2a2a2a]">
                              <img
                                src={preview}
                                alt={file.filename || ''}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="aspect-[4/3] w-full rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 flex items-center justify-center">
                              <Icon className="w-12 h-12 text-primary opacity-50" />
                            </div>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="absolute top-2 right-2 p-1.5 bg-white/90 dark:bg-black/70 hover:bg-white dark:hover:bg-black rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>

                        <div>
                          <h3 className="font-medium mb-1 dark:text-gray-100 truncate" title={file.filename || ''}>
                            {file.filename}
                          </h3>
                          <p className="text-xs text-muted-foreground dark:text-gray-400 truncate">
                            {formatBytes(file.byte_size)} • {formatDate(file.created_at)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewFile(file);
                            }}
                            className="flex-1"
                          >
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
                  );
                })}
              </div>

              {/* Load More Button */}
              {hasMore && (
                <div className="flex justify-center mt-8">
                  <Button variant="outline" onClick={loadMore} className="gap-2">
                    Load More Files
                  </Button>
                </div>
              )}
            </>
          ) : (
            <DataTable
              columns={fileColumns}
              data={filteredFiles}
              onRowClick={handleViewFile}
              pageSize={20}
            />
          )
        ) : (
          <Card className="text-center py-12">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2 dark:text-gray-100">No files found</h3>
            <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
              {searchQuery ? 'Try a different search term' : 'Upload your first file to get started'}
            </p>
            {!searchQuery && (
              <Button onClick={() => setIsUploadModalOpen(true)} className="gap-2">
                <Upload className="w-4 h-4" />
                Upload File
              </Button>
            )}
          </Card>
        )}
      </div>

      {/* File Upload Modal */}
      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadComplete={handleUploadComplete}
      />

      {/* Create Space Modal */}
      {isCreateSpaceModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4 dark:text-gray-100">Create Nested Space</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                  Space Name
                </label>
                <input
                  type="text"
                  value={newSpaceName}
                  onChange={(e) => setNewSpaceName(e.target.value)}
                  placeholder="e.g., Team Documents"
                  className="w-full px-4 py-2.5 bg-white dark:bg-[#0a0a0a] border border-border dark:border-[#2a2a2a] rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 dark:text-gray-100"
                  autoFocus
                />
              </div>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                This will create a new space inside "{space.name}"
              </p>
            </div>

            <div className="flex items-center gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setIsCreateSpaceModalOpen(false);
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
    </div>
  );
}
````````

## `src/app/screens/Signup.tsx`

- Category: screen.
- Imports: import { useState } from 'react';, import { useNavigate } from 'react-router';, import { motion, AnimatePresence } from 'motion/react';, import { Sparkles, Mail, Lock, Eye, EyeOff, User, Building2, Users, ArrowRight, Check } from 'lucide-react';, import { Button } from '../components/Button';
- Exports: export function Signup() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Mail, Lock, Eye, EyeOff, User, Building2, Users, ArrowRight, Check } from 'lucide-react';
import { Button } from '../components/Button';

type SignupType = 'user' | 'organization';

export function Signup() {
  const navigate = useNavigate();
  const [signupType, setSignupType] = useState<SignupType>('user');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // User fields
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  // Organization fields
  const [orgName, setOrgName] = useState('');
  const [orgEmail, setOrgEmail] = useState('');
  const [orgPassword, setOrgPassword] = useState('');
  const [adminName, setAdminName] = useState('');
  const [teamSize, setTeamSize] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 2000);
  };

  const features = [
    'AI-powered knowledge workspace',
    'Unlimited channels and categories',
    'Advanced workflow automation',
    'Real-time collaboration',
    'Enterprise-grade security',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-purple-50 dark:from-[#0a0a0a] dark:via-[#0f0f0f] dark:to-purple-950/20 flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 50, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="w-full max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Branding & Features */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl mb-6 shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>

            <h1 className="text-4xl font-bold text-foreground dark:text-gray-100 mb-4">
              Start your journey with GIGA Intelligence
            </h1>
            <p className="text-lg text-muted-foreground dark:text-gray-400 mb-8">
              Transform how your team collaborates and manages knowledge with AI-powered intelligence.
            </p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-foreground dark:text-gray-200">{feature}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-12 p-6 bg-white/50 dark:bg-[#1a1a1a]/50 backdrop-blur-sm rounded-2xl border border-border dark:border-[#2a2a2a]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm text-muted-foreground dark:text-gray-400 italic">
                "GIGA Intelligence has completely transformed how we manage our team's knowledge. The AI features are game-changing!"
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                  JD
                </div>
                <div>
                  <p className="font-semibold text-sm dark:text-gray-200">John Doe</p>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">CEO, TechStart Inc</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Signup Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl border border-border dark:border-[#2a2a2a] p-8">
              {/* Type Toggle */}
              <div className="flex items-center gap-2 p-1 bg-secondary dark:bg-[#2a2a2a] rounded-lg mb-6">
                <button
                  onClick={() => setSignupType('user')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    signupType === 'user'
                      ? 'bg-white dark:bg-[#1a1a1a] text-primary shadow-sm'
                      : 'text-muted-foreground dark:text-gray-400 hover:text-foreground'
                  }`}
                >
                  <User className="w-4 h-4" />
                  Personal
                </button>
                <button
                  onClick={() => setSignupType('organization')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium transition-colors ${
                    signupType === 'organization'
                      ? 'bg-white dark:bg-[#1a1a1a] text-primary shadow-sm'
                      : 'text-muted-foreground dark:text-gray-400 hover:text-foreground'
                  }`}
                >
                  <Building2 className="w-4 h-4" />
                  Organization
                </button>
              </div>

              <AnimatePresence mode="wait">
                {signupType === 'user' ? (
                  <motion.form
                    key="user"
                    onSubmit={handleSignup}
                    className="space-y-5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-gray-400" />
                        <input
                          type="text"
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          placeholder="John Doe"
                          required
                          className="w-full pl-11 pr-4 py-3 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-gray-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-gray-400" />
                        <input
                          type="email"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          className="w-full pl-11 pr-4 py-3 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-gray-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={userPassword}
                          onChange={(e) => setUserPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full pl-11 pr-12 py-3 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-gray-100"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-gray-400"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">
                        Must be at least 8 characters
                      </p>
                    </div>

                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Button type="submit" className="w-full py-3 text-base font-semibold gap-2" disabled={isLoading}>
                        {isLoading ? (
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        ) : (
                          <>
                            Create Account
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                ) : (
                  <motion.form
                    key="organization"
                    onSubmit={handleSignup}
                    className="space-y-5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                        Organization Name
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-gray-400" />
                        <input
                          type="text"
                          value={orgName}
                          onChange={(e) => setOrgName(e.target.value)}
                          placeholder="Acme Corporation"
                          required
                          className="w-full pl-11 pr-4 py-3 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-gray-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                        Work Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-gray-400" />
                        <input
                          type="email"
                          value={orgEmail}
                          onChange={(e) => setOrgEmail(e.target.value)}
                          placeholder="admin@company.com"
                          required
                          className="w-full pl-11 pr-4 py-3 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-gray-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                        Admin Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-gray-400" />
                        <input
                          type="text"
                          value={adminName}
                          onChange={(e) => setAdminName(e.target.value)}
                          placeholder="John Doe"
                          required
                          className="w-full pl-11 pr-4 py-3 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-gray-100"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                        Team Size
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-gray-400" />
                        <select
                          value={teamSize}
                          onChange={(e) => setTeamSize(e.target.value)}
                          required
                          className="w-full pl-11 pr-4 py-3 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-gray-100"
                        >
                          <option value="">Select team size</option>
                          <option value="1-10">1-10 people</option>
                          <option value="11-50">11-50 people</option>
                          <option value="51-200">51-200 people</option>
                          <option value="201+">201+ people</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={orgPassword}
                          onChange={(e) => setOrgPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full pl-11 pr-12 py-3 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-gray-100"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-gray-400"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                      <Button type="submit" className="w-full py-3 text-base font-semibold gap-2" disabled={isLoading}>
                        {isLoading ? (
                          <motion.div
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        ) : (
                          <>
                            Create Organization
                            <ArrowRight className="w-5 h-5" />
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </motion.form>
                )}
              </AnimatePresence>

              <p className="text-xs text-muted-foreground dark:text-gray-400 text-center mt-4">
                By signing up, you agree to our{' '}
                <button className="text-primary hover:underline">Terms of Service</button>
                {' '}and{' '}
                <button className="text-primary hover:underline">Privacy Policy</button>
              </p>
            </div>

            <p className="text-center mt-6 text-sm text-muted-foreground dark:text-gray-400">
              Already have an account?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-primary font-semibold hover:underline"
              >
                Sign in
              </button>
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
````````

## `src/app/screens/SubjectHub.tsx`

- Category: screen.
- Imports: import { useState, useEffect } from "react";, import { useParams, useNavigate } from "react-router";, import { Card } from "../components/Card";, import { LoadingState } from "../components/LoadingState";, import { ErrorState } from "../components/ErrorState";, import { EmptyState } from "../components/EmptyState";, import { DataTable, Column } from "../components/DataTable";, import { channels, categories, subjects, posts, Post } from "../data/mockData";, import { Sparkles, FileText, ThumbsUp, MessageCircle, LayoutGrid, List, Bot } from "lucide-react";, import { Button } from "../components/Button";
- Exports: export function SubjectHub() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { Card } from "../components/Card";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { EmptyState } from "../components/EmptyState";
import { DataTable, Column } from "../components/DataTable";
import { channels, categories, subjects, posts, Post } from "../data/mockData";
import { Sparkles, FileText, ThumbsUp, MessageCircle, LayoutGrid, List, Bot } from "lucide-react";
import { Button } from "../components/Button";
import { BookmarkButton } from "../components/BookmarkButton";

export function SubjectHub() {
  const { channelId, categoryId, subjectId } = useParams();
  const navigate = useNavigate();
  const [aiInput, setAiInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const channel = channels.find(c => c.id === channelId);
  const category = categories.find(c => c.id === categoryId);
  const subject = subjects.find(s => s.id === subjectId);
  const subjectPosts = posts.filter(p => p.subjectId === subjectId);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, [subjectId]);

  const handleAskAI = () => {
    if (aiInput.trim()) {
      navigate('/dashboard-chat');
    }
  };

  const postColumns: Column<Post>[] = [
    {
      id: 'title',
      header: 'Title',
      accessor: (post) => (
        <div>
          <h3 className="font-medium mb-1">{post.title}</h3>
          <p className="text-xs text-muted-foreground line-clamp-1">{post.shortDescription}</p>
        </div>
      ),
      sortable: true,
    },
    {
      id: 'author',
      header: 'Author',
      accessor: (post) => post.author,
      sortable: true,
      width: '150px',
    },
    {
      id: 'date',
      header: 'Date',
      accessor: (post) => post.date,
      sortable: true,
      width: '120px',
    },
    {
      id: 'readTime',
      header: 'Read Time',
      accessor: (post) => post.readTime,
      width: '100px',
    },
    {
      id: 'engagement',
      header: 'Engagement',
      accessor: (post) => (
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{post.reactions}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{post.comments}</span>
          </div>
        </div>
      ),
      width: '150px',
    },
  ];

  if (!channel || !category || !subject) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <ErrorState
            title="Subject not found"
            message="The subject you're looking for doesn't exist or has been removed."
          />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col h-screen">
        <div className="flex-shrink-0">
          <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
            <div className="space-y-3 animate-pulse">
              <div className="h-10 w-96 bg-secondary dark:bg-[#2a2a2a] rounded" />
              <div className="h-6 w-full max-w-2xl bg-secondary dark:bg-[#2a2a2a] rounded" />
            </div>
            <LoadingState type="skeleton-card" count={1} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto px-6">
            <LoadingState type="skeleton-list" count={3} />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-screen items-center justify-center">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <ErrorState
            title="Failed to load subject"
            message="We couldn't load this subject. Please try again."
            onRetry={() => {
              setError(false);
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 600);
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-shrink-0">
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-8">
          <header className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h1 className="text-3xl font-bold dark:text-gray-100">{subject.name}</h1>
                  {subject.tag && (
                    <span className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-lg">
                      {subject.tag}
                    </span>
                  )}
                </div>
                <p className="text-muted-foreground dark:text-gray-400 text-lg">{subject.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <BookmarkButton
                  type="subject"
                  id={subject.id}
                  channelId={channelId}
                  categoryId={categoryId}
                  subjectId={subject.id}
                  name={subject.name}
                  description={subject.description}
                  metadata={{ postCount: subject.postCount }}
                  variant="button"
                />
                <Button
                  variant="outline"
                  onClick={() => navigate('/dashboard-chat')}
                  className="gap-2"
                >
                  <Bot className="w-4 h-4" />
                  Chat with AI
                </Button>
              </div>
            </div>
          </header>

          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border-primary/20 dark:border-primary/30">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-white dark:bg-white/10 rounded-xl shadow-sm">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2 dark:text-gray-100">AI Summary</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed">
                  This subject covers essential concepts and practical applications. The AI
                  can help you understand key topics, provide examples, and answer specific
                  questions about the material covered in the posts below. Ask anything to
                  get started.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-4xl mx-auto px-6 pb-8">
          <section className="space-y-4">
            <div className="flex items-center justify-between sticky top-0 bg-background dark:bg-[#0a0a0a] py-4 z-10">
              <h2 className="text-lg font-semibold dark:text-gray-100">Posts ({subjectPosts.length})</h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-secondary dark:bg-[#2a2a2a] rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'grid'
                        ? 'bg-white dark:bg-primary text-foreground dark:text-white shadow-sm'
                        : 'hover:bg-white/50 dark:hover:bg-white/10'
                    }`}
                    title="Grid view"
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('table')}
                    className={`p-2 rounded transition-colors ${
                      viewMode === 'table'
                        ? 'bg-white dark:bg-primary text-foreground dark:text-white shadow-sm'
                        : 'hover:bg-white/50 dark:hover:bg-white/10'
                    }`}
                    title="Table view"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
                <Button size="sm" onClick={() => navigate(`/channel/${channelId}/category/${categoryId}/subject/${subjectId}/create`)}>
                  Create Post
                </Button>
              </div>
            </div>

            {subjectPosts.length > 0 ? (
              viewMode === 'grid' ? (
                <div className="space-y-3">
                  {subjectPosts.map(post => (
                    <Card padding="md"
                      key={post.id}
                      onClick={() => navigate(`/channel/${channelId}/category/${categoryId}/subject/${subjectId}/post/${post.id}`)}
                      className="hover:border-primary/40 cursor-pointer"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary flex-shrink-0">
                          {post.authorAvatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <h3 className="font-semibold mb-1 dark:text-gray-100">{post.title}</h3>
                              <p className="text-xs text-muted-foreground dark:text-gray-500">
                                {post.author} • {post.date} • {post.readTime}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground dark:text-gray-400 mb-3 line-clamp-2">
                            {post.shortDescription}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground dark:text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <ThumbsUp className="w-3.5 h-3.5" />
                              <span>{post.reactions}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <DataTable
                  columns={postColumns}
                  data={subjectPosts}
                  onRowClick={(post) => navigate(`/channel/${channelId}/category/${categoryId}/subject/${subjectId}/post/${post.id}`)}
                  pageSize={10}
                />
              )
            ) : (
              <EmptyState
                icon={FileText}
                title="No posts yet"
                message="Create your first post to start sharing knowledge"
                action={{
                  label: "Create Post",
                  onClick: () => navigate(`/channel/${channelId}/category/${categoryId}/subject/${subjectId}/create`),
                }}
              />
            )}
          </section>
        </div>
      </div>

      <div className="flex-shrink-0 border-t border-border dark:border-[#2a2a2a] bg-white dark:bg-[#0a0a0a] shadow-lg">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAskAI()}
              placeholder={`Ask AI about ${subject.name}...`}
              className="flex-1 px-4 py-3 bg-secondary/50 dark:bg-[#2a2a2a] dark:text-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white dark:focus:bg-[#1a1a1a] transition-all"
            />
          </div>
          <p className="text-xs text-muted-foreground dark:text-gray-500 mt-2 text-center">
            AI answers stay focused on this subject
          </p>
        </div>
      </div>
    </div>
  );
}
````````

## `src/app/screens/UnifiedChat.tsx`

- Category: screen.
- Imports: import { useState, useRef } from "react";, import { Send, X, Plus, ChevronRight, Mic, FileDown, MicOff, Bot, Zap, Settings } from "lucide-react";, import { Button } from "../components/Button";, import { Card } from "../components/Card";, import { useToast } from "../components/Toast";, import { FileAttachmentManager } from "../components/FileAttachmentManager";, import { ActivityPanel, ThinkingStep } from "../components/ActivityPanel";, import { IntelligenceModal } from "../components/IntelligenceModal";, import { InlineConfirmation } from "../components/InlineConfirmation";, import jsPDF from "jspdf";
- Exports: export function UnifiedChat() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, useRef } from "react";
import { Send, X, Plus, ChevronRight, Mic, FileDown, MicOff, Bot, Zap, Settings } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { useToast } from "../components/Toast";
import { FileAttachmentManager } from "../components/FileAttachmentManager";
import { ActivityPanel, ThinkingStep } from "../components/ActivityPanel";
import { IntelligenceModal } from "../components/IntelligenceModal";
import { InlineConfirmation } from "../components/InlineConfirmation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Attachment {
  id: string;
  file: File;
  preview?: string;
  type: 'image' | 'file';
}

interface ConfirmationData {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  shown: boolean;
}

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  attachments?: Attachment[];
  timestamp: string;
  dashboard?: DashboardData;
  thinking?: ThinkingData;
  inlineThinking?: string;
  confirmation?: ConfirmationData;
}

interface ThinkingData {
  duration: number;
  steps: ThinkingStep[];
}

interface DashboardData {
  title: string;
  metrics: Array<{
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
  }>;
}

type AttachmentType = 'agent' | 'workflow' | 'default';

export function UnifiedChat() {
  const { showToast } = useToast();

  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [attachmentType, setAttachmentType] = useState<AttachmentType>('default');
  const [showModeMenu, setShowModeMenu] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showFileManager, setShowFileManager] = useState(false);
  const [showActivity, setShowActivity] = useState(false);
  const [activeThinking, setActiveThinking] = useState<ThinkingData | null>(null);
  const [showIntelligenceModal, setShowIntelligenceModal] = useState(false);

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter(a => a.id !== id));
  };

  const generateDashboard = (query: string): DashboardData | undefined => {
    const lowerQuery = query.toLowerCase();

    if (lowerQuery.includes('sales') || lowerQuery.includes('revenue') || lowerQuery.includes('performance')) {
      return {
        title: 'Sales Performance Dashboard',
        metrics: [
          { label: 'Total Revenue', value: '$124,563', change: '+12.5%', trend: 'up' },
          { label: 'Active Users', value: '2,847', change: '+8.2%', trend: 'up' },
          { label: 'Conversion Rate', value: '3.24%', change: '-0.4%', trend: 'down' },
          { label: 'Avg Order Value', value: '$43.76', change: '+5.1%', trend: 'up' },
        ],
      };
    }

    if (lowerQuery.includes('user') || lowerQuery.includes('engagement') || lowerQuery.includes('analytics')) {
      return {
        title: 'User Engagement Dashboard',
        metrics: [
          { label: 'Active Users', value: '12,456', change: '+15.2%', trend: 'up' },
          { label: 'Session Duration', value: '4m 32s', change: '+2.1%', trend: 'up' },
          { label: 'Bounce Rate', value: '42.3%', change: '-3.5%', trend: 'up' },
          { label: 'Page Views', value: '45,678', change: '+8.7%', trend: 'up' },
        ],
      };
    }

    return undefined;
  };

  const handleSend = () => {
    if (!input.trim() && attachments.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      attachments: attachments.length > 0 ? [...attachments] : undefined,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages([...messages, userMessage]);

    // Generate AI response with dashboard if applicable
    setTimeout(() => {
      const dashboard = generateDashboard(input);

      const thinkingSteps: ThinkingStep[] = [
        { type: 'thinking', content: 'Analyzing query parameters and context' },
        { type: 'code', content: 'const query = parseUserInput(message);\nconst intent = detectIntent(query);', language: 'JavaScript' },
        { type: 'thinking', content: 'Fetching relevant data sources from database' },
        { type: 'code', content: 'SELECT * FROM metrics\nWHERE date >= CURRENT_DATE - INTERVAL \'30 days\'\nORDER BY date DESC;', language: 'SQL' },
        { type: 'thinking', content: 'Processing metrics and generating visualization data' },
      ];

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: dashboard
          ? `I've generated a ${dashboard.title.toLowerCase()} based on your request. Here are the key metrics:`
          : `I understand you're asking about "${input}". Try asking me to show sales performance, revenue dashboard, or user analytics to generate interactive dashboards.`,
        timestamp: new Date().toLocaleTimeString(),
        dashboard,
        thinking: {
          duration: Math.floor(Math.random() * 10) + 3,
          steps: thinkingSteps,
        },
      };

      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setInput('');
    setAttachments([]);
  };

  const handleVoiceRecord = async () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);

      // Simulate transcription
      setTimeout(() => {
        const simulatedText = "This is a simulated voice transcription. In production, this would use the Web Speech API or a transcription service.";
        setInput(simulatedText);
        showToast('success', 'Voice transcribed');
      }, 500);
    } else {
      // Start recording
      setIsRecording(true);
      showToast('info', 'Recording... (simulated)');

      // Auto-stop after 3 seconds for demo
      setTimeout(() => {
        if (isRecording) {
          handleVoiceRecord();
        }
      }, 3000);
    }
  };

  const handleFileAttach = (files: Attachment[]) => {
    setAttachments(files);
  };

  const handleThinkingClick = (thinking: ThinkingData) => {
    setActiveThinking(thinking);
    setShowActivity(true);
  };

  const exportToPDF = async (elementRef: HTMLDivElement | null, filename: string = 'dashboard') => {
    if (!elementRef) return;

    try {
      const canvas = await html2canvas(elementRef, {
        scale: 2,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save(`${filename}-${Date.now()}.pdf`);

      showToast('success', 'Exported to PDF successfully');
    } catch (error) {
      showToast('error', 'Failed to export PDF');
    }
  };

  const getModeLabel = () => {
    switch (attachmentType) {
      case 'agent': return 'AI Agent';
      case 'workflow': return 'Workflow';
      case 'default': return 'Default';
      default: return 'Default';
    }
  };

  const getModeIcon = () => {
    switch (attachmentType) {
      case 'agent': return <Bot className="w-4 h-4" />;
      case 'workflow': return <Zap className="w-4 h-4" />;
      case 'default': return null;
      default: return null;
    }
  };

  return (
    <div className="h-screen flex bg-white dark:bg-[#0f0f0f] overflow-hidden">
      {/* Main Content Area */}
      {messages.length === 0 ? (
        /* Empty State */
        <div className="flex-1 flex flex-col items-center justify-center px-4">
          <h1 className="text-3xl font-semibold mb-12 text-center dark:text-gray-100">What's on the agenda today?</h1>

          {/* Input */}
          <div className="w-full max-w-3xl mb-6">
            <div className="relative flex items-center gap-3 border border-border dark:border-[#2a2a2a] rounded-full px-4 py-3 shadow-sm bg-white dark:bg-[#1a1a1a] focus-within:border-primary/50 transition-all">
              <button
                onClick={() => setShowFileManager(true)}
                className="p-1 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded-lg transition-colors flex-shrink-0 dark:text-gray-200"
                title="Attach files"
              >
                <Plus className="w-5 h-5" />
              </button>

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                placeholder="Ask anything"
                className="flex-1 bg-transparent focus:outline-none text-base dark:text-gray-100 dark:placeholder:text-gray-400"
              />

              <div className="flex items-center gap-2 flex-shrink-0">
                <div className="relative">
                  <button
                    onClick={() => setShowModeMenu(!showModeMenu)}
                    className="flex items-center gap-1 text-sm text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200 transition-colors"
                  >
                    {getModeIcon()}
                    <span>{getModeLabel()}</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${showModeMenu ? 'rotate-90' : '-rotate-90'}`} />
                  </button>

                  {showModeMenu && (
                    <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-lg shadow-lg py-1 min-w-[140px] z-10">
                      <button
                        onClick={() => { setAttachmentType('agent'); setShowModeMenu(false); }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors dark:text-gray-200 flex items-center gap-2 ${attachmentType === 'agent' ? 'bg-primary/10 text-primary' : ''}`}
                      >
                        <Bot className="w-4 h-4" />
                        AI Agent
                      </button>
                      <button
                        onClick={() => { setAttachmentType('workflow'); setShowModeMenu(false); }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors dark:text-gray-200 flex items-center gap-2 ${attachmentType === 'workflow' ? 'bg-primary/10 text-primary' : ''}`}
                      >
                        <Zap className="w-4 h-4" />
                        Workflow
                      </button>
                      <button
                        onClick={() => { setAttachmentType('default'); setShowModeMenu(false); }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors dark:text-gray-200 ${attachmentType === 'default' ? 'bg-primary/10 text-primary' : ''}`}
                      >
                        Default
                      </button>
                      <div className="border-t border-border dark:border-[#2a2a2a] my-1"></div>
                      <button
                        onClick={() => { setShowIntelligenceModal(true); setShowModeMenu(false); }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors dark:text-gray-200 flex items-center gap-2"
                      >
                        <Settings className="w-4 h-4" />
                        Configure
                      </button>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleVoiceRecord}
                  className={`p-1.5 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded-lg transition-colors dark:text-gray-200 ${isRecording ? 'bg-red-100 text-red-600 dark:bg-red-900/20' : ''}`}
                  title={isRecording ? 'Stop recording' : 'Record voice'}
                >
                  {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </button>

                <button
                  onClick={handleSend}
                  disabled={!input.trim() && attachments.length === 0}
                  className={`p-2 rounded-lg transition-colors ${
                    input.trim() || attachments.length > 0
                      ? 'bg-primary text-white hover:bg-primary/90'
                      : 'bg-secondary text-muted-foreground'
                  }`}
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Attachments Preview */}
            {attachments.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {attachments.map((att) => (
                  <div key={att.id} className="relative group">
                    {att.type === 'image' && att.preview ? (
                      <div className="relative">
                        <img
                          src={att.preview}
                          alt={att.file.name}
                          className="w-16 h-16 object-cover rounded border border-border"
                        />
                        <button
                          onClick={() => removeAttachment(att.id)}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="relative">
                        <div className="w-16 h-16 bg-secondary rounded border border-border flex items-center justify-center p-1">
                          <span className="text-xs text-center truncate">{att.file.name.split('.').pop()}</span>
                        </div>
                        <button
                          onClick={() => removeAttachment(att.id)}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Suggestion Pills */}
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => setInput('Show sales performance')}
              className="px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-full hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors text-sm dark:text-gray-200"
            >
              📊 Create a dashboard
            </button>
            <button
              onClick={() => setInput('Analyze user engagement')}
              className="px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-full hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors text-sm dark:text-gray-200"
            >
              ✏️ Analyze data
            </button>
            <button
              onClick={() => setInput('Generate revenue report')}
              className="px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-full hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors text-sm dark:text-gray-200"
            >
              🌐 Generate report
            </button>
          </div>
        </div>
      ) : (
        /* Messages View */
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-16">
            <div className="max-w-4xl mx-auto py-8 space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`${message.type === 'user' ? 'max-w-2xl' : 'w-full max-w-full'}`}>
                    {/* Thinking Section (for AI messages only, shown before content) */}
                    {message.type === 'ai' && message.thinking && (
                      <button
                        onClick={() => handleThinkingClick(message.thinking!)}
                        className="flex items-center gap-1 text-sm text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200 transition-colors mb-3"
                      >
                        <span>Thought for {message.thinking.duration}s</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    )}

                    {/* Inline Thinking (for AI messages only) */}
                    {message.type === 'ai' && message.inlineThinking && (
                      <div className="mb-3 pl-4 border-l-2 border-border dark:border-[#2a2a2a]">
                        <p className="text-sm text-muted-foreground dark:text-gray-400 italic">{message.inlineThinking}</p>
                      </div>
                    )}

                    {/* Text Content */}
                    {message.content && (
                      <div className={`mb-4 ${message.type === 'user' ? 'bg-secondary/50 dark:bg-[#2a2a2a] rounded-2xl px-4 py-3' : ''}`}>
                        <p className="text-base leading-relaxed whitespace-pre-wrap dark:text-gray-100">{message.content}</p>
                      </div>
                    )}

                    {/* Inline Confirmation */}
                    {message.type === 'ai' && message.confirmation && message.confirmation.shown && (
                      <InlineConfirmation
                        message={message.confirmation.message}
                        onConfirm={message.confirmation.onConfirm}
                        onCancel={message.confirmation.onCancel}
                      />
                    )}

                    {/* Attachments */}
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="flex flex-wrap gap-3 mb-4">
                        {message.attachments.map((att) => (
                          <div key={att.id}>
                            {att.type === 'image' && att.preview ? (
                              <img
                                src={att.preview}
                                alt={att.file.name}
                                className="max-w-sm rounded-lg border border-border dark:border-[#2a2a2a]"
                              />
                            ) : (
                              <div className="p-3 bg-secondary dark:bg-[#2a2a2a] rounded-lg border border-border dark:border-[#2a2a2a] text-sm dark:text-gray-200">
                                {att.file.name}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Dashboard */}
                    {message.dashboard && (
                      <div className="w-full mb-4" id={`dashboard-${message.id}`}>
                        <Card padding="md">
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <h3 className="text-lg font-semibold">{message.dashboard.title}</h3>
                              <Button
                                variant="icon"
                                iconOnly
                                size="sm"
                                onClick={() => {
                                  const element = document.getElementById(`dashboard-${message.id}`);
                                  exportToPDF(element as HTMLDivElement, message.dashboard!.title.replace(/\s+/g, '-').toLowerCase());
                                }}
                                title="Download as PDF"
                              >
                                <FileDown className="w-4 h-4" />
                              </Button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                              {message.dashboard.metrics.map((metric, index) => (
                                <div key={index} className="p-4 border border-border dark:border-[#2a2a2a] rounded-lg bg-secondary/30 dark:bg-[#2a2a2a]/50">
                                  <div className="text-sm text-muted-foreground dark:text-gray-400 mb-1">{metric.label}</div>
                                  <div className="text-2xl font-bold mb-1 dark:text-gray-100">{metric.value}</div>
                                  <div className={`text-sm ${
                                    metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                                  }`}>
                                    {metric.change}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </Card>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Input Area (sticky bottom) */}
          <div className="border-t border-border dark:border-[#2a2a2a] px-4 sm:px-8 md:px-16 py-4 bg-white dark:bg-[#0f0f0f]">
            <div className="max-w-4xl mx-auto">
              <div className="relative flex items-center gap-3 border border-border dark:border-[#2a2a2a] rounded-full px-4 py-3 shadow-sm bg-white dark:bg-[#1a1a1a] focus-within:border-primary/50 transition-all">
                <button
                  onClick={() => setShowFileManager(true)}
                  className="p-1 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded-lg transition-colors flex-shrink-0 dark:text-gray-200"
                  title="Attach files"
                >
                  <Plus className="w-5 h-5" />
                </button>

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                  placeholder="Ask anything"
                  className="flex-1 bg-transparent focus:outline-none text-base dark:text-gray-100 dark:placeholder:text-gray-400"
                />

                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className="relative">
                    <button
                      onClick={() => setShowModeMenu(!showModeMenu)}
                      className="flex items-center gap-1 text-sm text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200 transition-colors"
                    >
                      {getModeIcon()}
                      <span>{getModeLabel()}</span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${showModeMenu ? 'rotate-90' : '-rotate-90'}`} />
                    </button>

                    {showModeMenu && (
                      <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-lg shadow-lg py-1 min-w-[140px] z-10">
                        <button
                          onClick={() => { setAttachmentType('agent'); setShowModeMenu(false); }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors dark:text-gray-200 flex items-center gap-2 ${attachmentType === 'agent' ? 'bg-primary/10 text-primary' : ''}`}
                        >
                          <Bot className="w-4 h-4" />
                          AI Agent
                        </button>
                        <button
                          onClick={() => { setAttachmentType('workflow'); setShowModeMenu(false); }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors dark:text-gray-200 flex items-center gap-2 ${attachmentType === 'workflow' ? 'bg-primary/10 text-primary' : ''}`}
                        >
                          <Zap className="w-4 h-4" />
                          Workflow
                        </button>
                        <button
                          onClick={() => { setAttachmentType('default'); setShowModeMenu(false); }}
                          className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors dark:text-gray-200 ${attachmentType === 'default' ? 'bg-primary/10 text-primary' : ''}`}
                        >
                          Default
                        </button>
                        <div className="border-t border-border dark:border-[#2a2a2a] my-1"></div>
                        <button
                          onClick={() => { setShowIntelligenceModal(true); setShowModeMenu(false); }}
                          className="w-full text-left px-3 py-2 text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors dark:text-gray-200 flex items-center gap-2"
                        >
                          <Settings className="w-4 h-4" />
                          Configure
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleVoiceRecord}
                    className={`p-1.5 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded-lg transition-colors dark:text-gray-200 ${isRecording ? 'bg-red-100 text-red-600 dark:bg-red-900/20' : ''}`}
                    title={isRecording ? 'Stop recording' : 'Record voice'}
                  >
                    {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>

                  <button
                    onClick={handleSend}
                    disabled={!input.trim() && attachments.length === 0}
                    className={`p-2 rounded-lg transition-colors flex-shrink-0 ${
                      input.trim() || attachments.length > 0
                        ? 'bg-primary text-white hover:bg-primary/90'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Attachments Preview */}
              {attachments.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {attachments.map((att) => (
                    <div key={att.id} className="relative group">
                      {att.type === 'image' && att.preview ? (
                        <div className="relative">
                          <img
                            src={att.preview}
                            alt={att.file.name}
                            className="w-16 h-16 object-cover rounded border border-border dark:border-[#2a2a2a]"
                          />
                          <button
                            onClick={() => removeAttachment(att.id)}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <div className="relative">
                          <div className="w-16 h-16 bg-secondary dark:bg-[#2a2a2a] rounded border border-border dark:border-[#2a2a2a] flex items-center justify-center">
                            <span className="text-xs dark:text-gray-200">{att.file.name.split('.').pop()}</span>
                          </div>
                          <button
                            onClick={() => removeAttachment(att.id)}
                            className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Activity Panel (pushed to side) */}
      {showActivity && activeThinking && (
        <ActivityPanel
          isOpen={showActivity}
          onClose={() => setShowActivity(false)}
          duration={activeThinking.duration}
          steps={activeThinking.steps}
        />
      )}

      {/* File Attachment Manager Modal */}
      <FileAttachmentManager
        isOpen={showFileManager}
        onClose={() => setShowFileManager(false)}
        onAttach={handleFileAttach}
        existingAttachments={attachments}
      />

      {/* Intelligence Modal */}
      <IntelligenceModal
        isOpen={showIntelligenceModal}
        onClose={() => setShowIntelligenceModal(false)}
      />
    </div>
  );
}
````````

## `src/app/screens/UserPermissions.tsx`

- Category: screen.
- Imports: import { useState } from "react";, import { Shield, Save } from "lucide-react";, import { PermissionsMatrix, PermissionCategory, Role } from "../components/PermissionsMatrix";, import { Button } from "../components/Button";, import { useToast } from "../components/Toast";
- Exports: export function UserPermissions() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from "react";
import { Shield, Save } from "lucide-react";
import { PermissionsMatrix, PermissionCategory, Role } from "../components/PermissionsMatrix";
import { Button } from "../components/Button";
import { useToast } from "../components/Toast";

export function UserPermissions() {
  const { showToast } = useToast();

  const roles: Role[] = [
    { id: 'admin', name: 'Admin', description: 'Full system access' },
    { id: 'manager', name: 'Manager', description: 'Team management' },
    { id: 'editor', name: 'Editor', description: 'Content editing' },
    { id: 'viewer', name: 'Viewer', description: 'Read-only access' },
  ];

  const categories: PermissionCategory[] = [
    {
      id: 'content',
      name: 'Content Management',
      permissions: [
        { id: 'content.view', name: 'View Content', description: 'Can view all content' },
        { id: 'content.create', name: 'Create Content', description: 'Can create new content' },
        { id: 'content.edit', name: 'Edit Content', description: 'Can edit existing content' },
        { id: 'content.delete', name: 'Delete Content', description: 'Can delete content' },
        { id: 'content.publish', name: 'Publish Content', description: 'Can publish content to production' },
      ],
    },
    {
      id: 'users',
      name: 'User Management',
      permissions: [
        { id: 'users.view', name: 'View Users', description: 'Can view user list and profiles' },
        { id: 'users.create', name: 'Create Users', description: 'Can create new user accounts' },
        { id: 'users.edit', name: 'Edit Users', description: 'Can edit user details' },
        { id: 'users.delete', name: 'Delete Users', description: 'Can delete user accounts' },
        { id: 'users.roles', name: 'Manage Roles', description: 'Can assign roles to users' },
      ],
    },
    {
      id: 'settings',
      name: 'System Settings',
      permissions: [
        { id: 'settings.view', name: 'View Settings', description: 'Can view system settings' },
        { id: 'settings.edit', name: 'Edit Settings', description: 'Can modify system settings' },
        { id: 'settings.billing', name: 'Manage Billing', description: 'Can manage billing and subscriptions' },
        { id: 'settings.security', name: 'Security Settings', description: 'Can configure security settings' },
      ],
    },
    {
      id: 'analytics',
      name: 'Analytics & Reports',
      permissions: [
        { id: 'analytics.view', name: 'View Analytics', description: 'Can view analytics dashboards' },
        { id: 'analytics.export', name: 'Export Reports', description: 'Can export analytics data' },
        { id: 'analytics.admin', name: 'Analytics Admin', description: 'Can configure analytics settings' },
      ],
    },
    {
      id: 'api',
      name: 'API Access',
      permissions: [
        { id: 'api.read', name: 'API Read', description: 'Read-only API access' },
        { id: 'api.write', name: 'API Write', description: 'Write API access' },
        { id: 'api.keys', name: 'Manage API Keys', description: 'Can create and manage API keys' },
      ],
    },
  ];

  const [permissions, setPermissions] = useState<Record<string, string[]>>({
    admin: categories.flatMap(c => c.permissions.map(p => p.id)),
    manager: [
      'content.view', 'content.create', 'content.edit', 'content.publish',
      'users.view', 'users.edit', 'users.roles',
      'settings.view',
      'analytics.view', 'analytics.export',
      'api.read',
    ],
    editor: [
      'content.view', 'content.create', 'content.edit',
      'users.view',
      'analytics.view',
      'api.read',
    ],
    viewer: [
      'content.view',
      'users.view',
      'analytics.view',
    ],
  });

  const handlePermissionsChange = (newPermissions: Record<string, string[]>) => {
    setPermissions(newPermissions);
  };

  const handleSave = () => {
    showToast('success', 'Permissions saved successfully');
    console.log('Saved permissions:', permissions);
  };

  const handleReset = () => {
    // Reset to defaults
    setPermissions({
      admin: categories.flatMap(c => c.permissions.map(p => p.id)),
      manager: [
        'content.view', 'content.create', 'content.edit', 'content.publish',
        'users.view', 'users.edit', 'users.roles',
        'settings.view',
        'analytics.view', 'analytics.export',
        'api.read',
      ],
      editor: [
        'content.view', 'content.create', 'content.edit',
        'users.view',
        'analytics.view',
        'api.read',
      ],
      viewer: [
        'content.view',
        'users.view',
        'analytics.view',
      ],
    });
    showToast('info', 'Permissions reset to defaults');
  };

  return (
    <div className="h-screen flex flex-col bg-secondary/30 dark:bg-[#0f0f0f]">
      {/* Header */}
      <div className="bg-white dark:bg-[#1a1a1a] border-b border-border dark:border-[#2a2a2a] p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold dark:text-gray-200">Role Permissions</h1>
                <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                  Configure granular permissions for each role
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={handleReset}>
                Reset to Defaults
              </Button>
              <Button onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="flex-1 overflow-hidden p-6">
        <div className="max-w-7xl mx-auto h-full">
          <div className="bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] h-full overflow-auto">
            <PermissionsMatrix
              categories={categories}
              roles={roles}
              initialPermissions={permissions}
              onChange={handlePermissionsChange}
              editable={true}
            />
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-white dark:bg-[#1a1a1a] border-t border-border dark:border-[#2a2a2a] p-4">
        <div className="max-w-7xl mx-auto flex items-center gap-6 text-sm text-muted-foreground dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary border border-primary" />
            <span>Enabled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-primary/50 border border-primary/50" />
            <span>Partially Enabled</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a]" />
            <span>Disabled</span>
          </div>
        </div>
      </div>
    </div>
  );
}
````````

## `src/app/screens/WorkflowBuilder.tsx`

- Category: screen.
- Imports: import { Plus, Sparkles, Database, Users, FileText, BookOpen, Zap, List } from 'lucide-react';, import { Button } from '../components/Button';, import { Card } from '../components/Card';, import { useNavigate } from 'react-router';
- Exports: export default function WorkflowBuilder() {
- Reuse guidance: Use this for Workflow builder/editor pages, node tabs, execution status, and workflow-to-agent handoffs.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { Plus, Sparkles, Database, Users, FileText, BookOpen, Zap, List } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useNavigate } from 'react-router';

interface WorkflowTemplate {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function WorkflowBuilder() {
  const navigate = useNavigate();

  const templates: WorkflowTemplate[] = [
    {
      id: 'data-enrichment',
      title: 'Data enrichment',
      description: 'Pull together data to answer user questions',
      icon: <Database className="w-5 h-5" />,
    },
    {
      id: 'planning-helper',
      title: 'Planning helper',
      description: 'Simple multi-turn workflow for creating task plans',
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: 'customer-service',
      title: 'Customer service',
      description: 'Resolve customer queries with custom policies',
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: 'structured-qa',
      title: 'Structured Data Q/A',
      description: 'Query databases using natural language',
      icon: <Zap className="w-5 h-5" />,
    },
    {
      id: 'document-comparison',
      title: 'Document comparison',
      description: 'Analyze and highlight differences across uploaded documents',
      icon: <FileText className="w-5 h-5" />,
    },
    {
      id: 'knowledge-assistant',
      title: 'Internal knowledge assistant',
      description: 'Triage and answer questions from employees',
      icon: <BookOpen className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-[#0a0a0a]">
      {/* Top Bar */}
      <div className="border-b border-border dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold dark:text-gray-100">Workflow Builder</h2>
          <Button variant="secondary" size="sm" onClick={() => navigate('/workflows')} className="gap-2">
            <List className="w-4 h-4" />
            View All Workflows
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-3 dark:text-gray-100">
            Create a workflow
          </h1>
          <p className="text-lg text-muted-foreground dark:text-gray-400 mb-8">
            Build a chat agent workflow with custom logic and tools
          </p>
          <Button size="lg" className="gap-2">
            <Plus className="w-5 h-5" />
            Create
          </Button>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="group hover:border-primary/50 dark:hover:border-primary/50 transition-all cursor-pointer"
            >
              <div className="space-y-4">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-500">
                  {template.icon}
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-semibold mb-2 dark:text-gray-100 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                    {template.title}
                  </h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                {/* Template Label */}
                <div className="pt-2 border-t border-border dark:border-[#2a2a2a]">
                  <span className="text-xs text-muted-foreground dark:text-gray-500">
                    Template
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State Hint */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-3 bg-primary/5 dark:bg-primary/10 border border-primary/20 dark:border-primary/20 rounded-lg">
            <Sparkles className="w-4 h-4 text-primary" />
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              Choose a template to get started, or create a workflow from scratch
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
````````

## `src/app/screens/WorkflowEditor.tsx`

- Category: screen.
- Imports: import { useState } from 'react';, import { Save, Play, Settings, Code, Box, GitBranch } from 'lucide-react';, import { Card } from '../components/Card';, import { Button } from '../components/Button';, import { Badge } from '../components/Badge';, import { useNavigate, useSearchParams } from 'react-router';
- Exports: export default function WorkflowEditor() {
- Reuse guidance: Use this for Workflow builder/editor pages, node tabs, execution status, and workflow-to-agent handoffs.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from 'react';
import { Save, Play, Settings, Code, Box, GitBranch } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { useNavigate, useSearchParams } from 'react-router';

interface WorkflowNode {
  id: string;
  type: 'trigger' | 'action' | 'condition' | 'response';
  label: string;
  config: Record<string, any>;
}

export default function WorkflowEditor() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const workflowId = searchParams.get('id');

  const [workflowName, setWorkflowName] = useState('Customer service bot');
  const [workflowDescription, setWorkflowDescription] = useState('Resolve customer queries with custom policies');
  const [activeTab, setActiveTab] = useState<'visual' | 'code' | 'settings'>('visual');

  const [nodes, setNodes] = useState<WorkflowNode[]>([
    {
      id: '1',
      type: 'trigger',
      label: 'User message received',
      config: {},
    },
    {
      id: '2',
      type: 'condition',
      label: 'Check message intent',
      config: { intents: ['support', 'sales', 'general'] },
    },
    {
      id: '3',
      type: 'action',
      label: 'Query knowledge base',
      config: { database: 'support_docs' },
    },
    {
      id: '4',
      type: 'response',
      label: 'Send AI response',
      config: { template: 'friendly' },
    },
  ]);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'trigger':
        return 'bg-green-100 dark:bg-green-900/30 border-green-300 dark:border-green-700 text-green-700 dark:text-green-400';
      case 'condition':
        return 'bg-yellow-100 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700 text-yellow-700 dark:text-yellow-400';
      case 'action':
        return 'bg-blue-100 dark:bg-blue-900/30 border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-400';
      case 'response':
        return 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-400';
      default:
        return 'bg-gray-100 dark:bg-gray-900/30 border-gray-300 dark:border-gray-700';
    }
  };

  const handleSave = () => {
    console.log('Saving workflow...');
  };

  const handleTest = () => {
    console.log('Testing workflow...');
  };

  return (
    <div className="min-h-screen bg-background dark:bg-[#0a0a0a]">
      {/* Top Bar */}
      <div className="border-b border-border dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f] sticky top-0 z-10">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div>
                <input
                  type="text"
                  value={workflowName}
                  onChange={(e) => setWorkflowName(e.target.value)}
                  className="text-xl font-bold bg-transparent border-none outline-none dark:text-gray-100 focus:ring-2 focus:ring-primary rounded px-2 -ml-2"
                />
                <p className="text-sm text-muted-foreground dark:text-gray-400 px-2">
                  {workflowDescription}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="success">v1.5.0</Badge>
              <Button variant="outline" size="sm" onClick={handleTest} className="gap-2">
                <Play className="w-4 h-4" />
                Test
              </Button>
              <Button size="sm" onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                Save
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-border dark:border-[#2a2a2a] -mb-4">
            <button
              onClick={() => setActiveTab('visual')}
              className={`pb-4 px-1 font-medium transition-colors relative flex items-center gap-2 ${
                activeTab === 'visual'
                  ? 'text-primary dark:text-primary'
                  : 'text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200'
              }`}
            >
              <Box className="w-4 h-4" />
              Visual Editor
              {activeTab === 'visual' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`pb-4 px-1 font-medium transition-colors relative flex items-center gap-2 ${
                activeTab === 'code'
                  ? 'text-primary dark:text-primary'
                  : 'text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200'
              }`}
            >
              <Code className="w-4 h-4" />
              Code
              {activeTab === 'code' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`pb-4 px-1 font-medium transition-colors relative flex items-center gap-2 ${
                activeTab === 'settings'
                  ? 'text-primary dark:text-primary'
                  : 'text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200'
              }`}
            >
              <Settings className="w-4 h-4" />
              Settings
              {activeTab === 'settings' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {activeTab === 'visual' && (
          <div className="max-w-5xl mx-auto">
            <Card>
              <h3 className="font-semibold mb-4 dark:text-gray-100">Workflow Steps</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400 mb-6">
                Design your workflow by arranging steps in sequence
              </p>

              <div className="space-y-4">
                {nodes.map((node, index) => (
                  <div key={node.id}>
                    <div
                      className={`border-2 rounded-lg p-4 ${getNodeColor(node.type)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-medium uppercase tracking-wide">
                              {node.type}
                            </span>
                          </div>
                          <h4 className="font-semibold mb-1">{node.label}</h4>
                          {Object.keys(node.config).length > 0 && (
                            <p className="text-xs opacity-75">
                              {JSON.stringify(node.config, null, 2)}
                            </p>
                          )}
                        </div>
                        <Button variant="ghost" size="sm">
                          <Settings className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {index < nodes.length - 1 && (
                      <div className="flex justify-center py-2">
                        <div className="w-0.5 h-8 bg-border dark:bg-[#2a2a2a]" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border dark:border-[#2a2a2a]">
                <Button variant="outline" className="w-full gap-2">
                  <Box className="w-4 h-4" />
                  Add Step
                </Button>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'code' && (
          <div className="max-w-5xl mx-auto">
            <Card>
              <h3 className="font-semibold mb-4 dark:text-gray-100">Workflow Code</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400 mb-6">
                Edit workflow logic directly in JSON format
              </p>

              <div className="bg-secondary dark:bg-[#0a0a0a] rounded-lg p-4 font-mono text-sm">
                <pre className="text-foreground dark:text-gray-200 whitespace-pre-wrap">
{`{
  "name": "Customer service bot",
  "version": "1.5.0",
  "trigger": {
    "type": "message_received",
    "filters": []
  },
  "steps": [
    {
      "id": "check_intent",
      "type": "condition",
      "config": {
        "intents": ["support", "sales", "general"]
      }
    },
    {
      "id": "query_kb",
      "type": "action",
      "config": {
        "database": "support_docs",
        "max_results": 5
      }
    },
    {
      "id": "generate_response",
      "type": "response",
      "config": {
        "template": "friendly",
        "tone": "professional"
      }
    }
  ]
}`}
                </pre>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <Card>
              <h3 className="font-semibold mb-4 dark:text-gray-100">General Settings</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Workflow Name
                  </label>
                  <input
                    type="text"
                    value={workflowName}
                    onChange={(e) => setWorkflowName(e.target.value)}
                    className="w-full px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Description
                  </label>
                  <textarea
                    value={workflowDescription}
                    onChange={(e) => setWorkflowDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold mb-4 dark:text-gray-100">Execution Settings</h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium dark:text-gray-200">Enable retry on failure</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      Automatically retry failed executions
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Max retry attempts
                  </label>
                  <input
                    type="number"
                    defaultValue={3}
                    min={1}
                    max={10}
                    className="w-32 px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Timeout (seconds)
                  </label>
                  <input
                    type="number"
                    defaultValue={30}
                    min={5}
                    max={300}
                    className="w-32 px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold mb-4 dark:text-gray-100 flex items-center gap-2">
                <GitBranch className="w-5 h-5" />
                Version Control
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Version notes
                  </label>
                  <textarea
                    placeholder="Describe the changes in this version..."
                    rows={3}
                    className="w-full px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  />
                </div>

                <Button variant="outline" className="gap-2">
                  <GitBranch className="w-4 h-4" />
                  Create New Version
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
````````

## `src/app/screens/WorkflowsList.tsx`

- Category: screen.
- Imports: import { useState, useEffect } from 'react';, import { Play, Pause, Clock, CheckCircle, AlertCircle, GitBranch, Activity, Plus, Edit, MessageSquare, ExternalLink } from 'lucide-react';, import { Card } from '../components/Card';, import { Badge } from '../components/Badge';, import { Button } from '../components/Button';, import { useNavigate } from 'react-router';
- Exports: export default function WorkflowsList() {
- Reuse guidance: Use this for Workflow builder/editor pages, node tabs, execution status, and workflow-to-agent handoffs.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, useEffect } from 'react';
import { Play, Pause, Clock, CheckCircle, AlertCircle, GitBranch, Activity, Plus, Edit, MessageSquare, ExternalLink } from 'lucide-react';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router';

interface ChatAttachment {
  id: string;
  name: string;
  context: string;
  lastUsed: string;
  messageCount: number;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  running: number;
  queued: number;
  totalExecutions: number;
  lastRun: string;
  status: 'active' | 'paused' | 'error';
  versions: number;
  attachedChats: ChatAttachment[];
}

interface WorkflowExecution {
  id: string;
  workflowId: string;
  version: string;
  status: 'running' | 'completed' | 'failed' | 'queued';
  startedAt: string;
  completedAt?: string;
  duration?: string;
  progress?: number;
}

interface WorkflowVersion {
  id: string;
  version: string;
  createdAt: string;
  createdBy: string;
  changes: string;
  active: boolean;
}

export default function WorkflowsList() {
  const navigate = useNavigate();
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'executions' | 'versions' | 'chats'>('executions');
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Data enrichment pipeline',
      description: 'Pull together data to answer user questions',
      running: 3,
      queued: 7,
      totalExecutions: 1234,
      lastRun: '2 minutes ago',
      status: 'active',
      versions: 5,
      attachedChats: [
        { id: 'chat-w1', name: 'Data Analysis Hub', context: 'Subject: Analytics', lastUsed: '10 mins ago', messageCount: 523 },
        { id: 'chat-w2', name: 'Insights Channel', context: 'Channel: Business Intelligence', lastUsed: '1 hour ago', messageCount: 298 },
      ],
    },
    {
      id: '2',
      name: 'Customer service bot',
      description: 'Resolve customer queries with custom policies',
      running: 12,
      queued: 23,
      totalExecutions: 5678,
      lastRun: 'Just now',
      status: 'active',
      versions: 8,
      attachedChats: [
        { id: 'chat-w3', name: 'Support Team Chat', context: 'Channel: Customer Support', lastUsed: '5 mins ago', messageCount: 1247 },
        { id: 'chat-w4', name: 'General Queries', context: 'Subject: Help Desk', lastUsed: '15 mins ago', messageCount: 892 },
        { id: 'chat-w5', name: 'Urgent Issues', context: 'Category: Support', lastUsed: '30 mins ago', messageCount: 456 },
      ],
    },
    {
      id: '3',
      name: 'Document comparison',
      description: 'Analyze and highlight differences across uploaded documents',
      running: 0,
      queued: 0,
      totalExecutions: 234,
      lastRun: '1 hour ago',
      status: 'paused',
      versions: 3,
      attachedChats: [
        { id: 'chat-w6', name: 'Legal Documents', context: 'Channel: Legal', lastUsed: '2 hours ago', messageCount: 134 },
      ],
    },
    {
      id: '4',
      name: 'Planning helper',
      description: 'Simple multi-turn workflow for creating task plans',
      running: 1,
      queued: 0,
      totalExecutions: 456,
      lastRun: '5 minutes ago',
      status: 'active',
      versions: 12,
      attachedChats: [
        { id: 'chat-w7', name: 'Project Planning', context: 'Subject: Project Management', lastUsed: '8 mins ago', messageCount: 267 },
        { id: 'chat-w8', name: 'Strategy Discussions', context: 'Category: Planning', lastUsed: '20 mins ago', messageCount: 189 },
      ],
    },
    {
      id: '5',
      name: 'Knowledge assistant',
      description: 'Triage and answer questions from employees',
      running: 0,
      queued: 0,
      totalExecutions: 892,
      lastRun: '3 days ago',
      status: 'error',
      versions: 6,
      attachedChats: [
        { id: 'chat-w9', name: 'Knowledge Base', context: 'Channel: Documentation', lastUsed: '3 days ago', messageCount: 523 },
      ],
    },
  ]);

  const [executions, setExecutions] = useState<WorkflowExecution[]>([
    {
      id: 'exec-1',
      workflowId: '1',
      version: 'v1.5.0',
      status: 'running',
      startedAt: '2 minutes ago',
      progress: 65,
    },
    {
      id: 'exec-2',
      workflowId: '1',
      version: 'v1.5.0',
      status: 'running',
      startedAt: '5 minutes ago',
      progress: 42,
    },
    {
      id: 'exec-3',
      workflowId: '1',
      version: 'v1.5.0',
      status: 'queued',
      startedAt: '1 minute ago',
    },
    {
      id: 'exec-4',
      workflowId: '1',
      version: 'v1.5.0',
      status: 'completed',
      startedAt: '10 minutes ago',
      completedAt: '8 minutes ago',
      duration: '2m 15s',
    },
    {
      id: 'exec-5',
      workflowId: '1',
      version: 'v1.4.2',
      status: 'failed',
      startedAt: '1 hour ago',
      completedAt: '59 minutes ago',
      duration: '45s',
    },
  ]);

  const [versions, setVersions] = useState<WorkflowVersion[]>([
    {
      id: 'v-5',
      version: 'v1.5.0',
      createdAt: '2 days ago',
      createdBy: 'Sarah Chen',
      changes: 'Added retry logic and improved error handling',
      active: true,
    },
    {
      id: 'v-4',
      version: 'v1.4.2',
      createdAt: '1 week ago',
      createdBy: 'John Doe',
      changes: 'Fixed timeout issues in data fetching',
      active: false,
    },
    {
      id: 'v-3',
      version: 'v1.4.0',
      createdAt: '2 weeks ago',
      createdBy: 'Sarah Chen',
      changes: 'Optimized query performance',
      active: false,
    },
    {
      id: 'v-2',
      version: 'v1.3.0',
      createdAt: '3 weeks ago',
      createdBy: 'Alex Johnson',
      changes: 'Added new data sources integration',
      active: false,
    },
    {
      id: 'v-1',
      version: 'v1.0.0',
      createdAt: '2 months ago',
      createdBy: 'Sarah Chen',
      changes: 'Initial release',
      active: false,
    },
  ]);

  const selectedWorkflowData = workflows.find((w) => w.id === selectedWorkflow);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play className="w-4 h-4 text-green-500" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-yellow-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getExecutionStatusBadge = (status: string) => {
    switch (status) {
      case 'running':
        return <Badge variant="info">Running</Badge>;
      case 'completed':
        return <Badge variant="success">Completed</Badge>;
      case 'failed':
        return <Badge variant="danger">Failed</Badge>;
      case 'queued':
        return <Badge variant="warning">Queued</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-[#0a0a0a]">
      <div className="flex h-screen">
        {/* Left Sidebar - Workflows List */}
        <div className="w-96 border-r border-border dark:border-[#2a2a2a] overflow-y-auto bg-white dark:bg-[#0f0f0f]">
          <div className="p-6 border-b border-border dark:border-[#2a2a2a]">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl font-bold dark:text-gray-100">Workflows</h1>
              <Button size="sm" onClick={() => navigate('/workflow-builder')} className="gap-2">
                <Plus className="w-4 h-4" />
                New
              </Button>
            </div>
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              {workflows.length} workflows
            </p>
          </div>

          <div className="divide-y divide-border dark:divide-[#2a2a2a]">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                onClick={() => setSelectedWorkflow(workflow.id)}
                className={`p-4 cursor-pointer hover:bg-secondary/50 dark:hover:bg-[#1a1a1a] transition-colors ${
                  selectedWorkflow === workflow.id
                    ? 'bg-primary/5 dark:bg-primary/10 border-l-4 border-primary'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(workflow.status)}
                    <h3 className="font-semibold dark:text-gray-100">{workflow.name}</h3>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground dark:text-gray-400 mb-3">
                  {workflow.description}
                </p>

                <div className="flex items-center gap-4 text-xs">
                  {workflow.running > 0 && (
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="font-medium">{workflow.running} running</span>
                    </div>
                  )}
                  {workflow.queued > 0 && (
                    <div className="flex items-center gap-1 text-yellow-600 dark:text-yellow-400">
                      <Clock className="w-3 h-3" />
                      <span className="font-medium">{workflow.queued} queued</span>
                    </div>
                  )}
                  <span className="text-muted-foreground dark:text-gray-500">
                    {workflow.totalExecutions.toLocaleString()} total
                  </span>
                </div>

                <div className="mt-2 text-xs text-muted-foreground dark:text-gray-500">
                  Last run: {workflow.lastRun}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - Workflow Details */}
        <div className="flex-1 overflow-y-auto">
          {selectedWorkflowData ? (
            <div>
              {/* Header */}
              <div className="border-b border-border dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f] sticky top-0 z-10">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold dark:text-gray-100 mb-2">
                        {selectedWorkflowData.name}
                      </h2>
                      <p className="text-muted-foreground dark:text-gray-400">
                        {selectedWorkflowData.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(selectedWorkflowData.status)}
                        <span className="text-sm font-medium capitalize dark:text-gray-300">
                          {selectedWorkflowData.status}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => navigate(`/workflow-editor?id=${selectedWorkflow}`)}
                        className="gap-2"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <Card className="bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-2 mb-1">
                        <Activity className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="text-xs text-muted-foreground dark:text-gray-400">Running</span>
                      </div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {selectedWorkflowData.running}
                      </div>
                    </Card>

                    <Card className="bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                        <span className="text-xs text-muted-foreground dark:text-gray-400">Queued</span>
                      </div>
                      <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                        {selectedWorkflowData.queued}
                      </div>
                    </Card>

                    <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        <span className="text-xs text-muted-foreground dark:text-gray-400">Total Executions</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {selectedWorkflowData.totalExecutions.toLocaleString()}
                      </div>
                    </Card>

                    <Card className="bg-purple-50 dark:bg-purple-950/20 border-purple-200 dark:border-purple-800">
                      <div className="flex items-center gap-2 mb-1">
                        <GitBranch className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                        <span className="text-xs text-muted-foreground dark:text-gray-400">Versions</span>
                      </div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {selectedWorkflowData.versions}
                      </div>
                    </Card>
                  </div>

                  {/* Tabs */}
                  <div className="flex gap-4 border-b border-border dark:border-[#2a2a2a]">
                    <button
                      onClick={() => setActiveTab('executions')}
                      className={`pb-3 px-1 font-medium transition-colors relative ${
                        activeTab === 'executions'
                          ? 'text-primary dark:text-primary'
                          : 'text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200'
                      }`}
                    >
                      Executions
                      {activeTab === 'executions' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('versions')}
                      className={`pb-3 px-1 font-medium transition-colors relative ${
                        activeTab === 'versions'
                          ? 'text-primary dark:text-primary'
                          : 'text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200'
                      }`}
                    >
                      Versions
                      {activeTab === 'versions' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                      )}
                    </button>
                    <button
                      onClick={() => setActiveTab('chats')}
                      className={`pb-3 px-1 font-medium transition-colors relative ${
                        activeTab === 'chats'
                          ? 'text-primary dark:text-primary'
                          : 'text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Attached Chats
                        {selectedWorkflowData && selectedWorkflowData.attachedChats.length > 0 && (
                          <Badge variant="default" className="ml-1 text-xs">
                            {selectedWorkflowData.attachedChats.length}
                          </Badge>
                        )}
                      </div>
                      {activeTab === 'chats' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'executions' ? (
                  <div className="space-y-3">
                    <h3 className="font-semibold mb-4 dark:text-gray-100">Execution History</h3>
                    {executions.map((execution) => (
                      <Card key={execution.id} className="hover:border-primary/50 dark:hover:border-primary/50 transition-colors">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {getExecutionStatusBadge(execution.status)}
                            <span className="text-sm font-mono text-muted-foreground dark:text-gray-400">
                              {execution.id}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground dark:text-gray-500">
                            {execution.version}
                          </span>
                        </div>

                        {execution.status === 'running' && execution.progress !== undefined && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-muted-foreground dark:text-gray-400">Progress</span>
                              <span className="text-xs font-medium dark:text-gray-300">{execution.progress}%</span>
                            </div>
                            <div className="h-2 bg-secondary dark:bg-[#2a2a2a] rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary transition-all duration-500 ease-out relative overflow-hidden"
                                style={{ width: `${execution.progress}%` }}
                              >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-xs text-muted-foreground dark:text-gray-500">
                          <span>Started: {execution.startedAt}</span>
                          {execution.completedAt && (
                            <>
                              <span>•</span>
                              <span>Completed: {execution.completedAt}</span>
                            </>
                          )}
                          {execution.duration && (
                            <>
                              <span>•</span>
                              <span>Duration: {execution.duration}</span>
                            </>
                          )}
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : activeTab === 'versions' ? (
                  <div className="space-y-3">
                    <h3 className="font-semibold mb-4 dark:text-gray-100">Version History</h3>
                    {versions.map((version) => (
                      <Card
                        key={version.id}
                        className={`hover:border-primary/50 dark:hover:border-primary/50 transition-colors ${
                          version.active ? 'border-primary dark:border-primary' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                              <GitBranch className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-semibold dark:text-gray-100">{version.version}</h4>
                                {version.active && (
                                  <Badge variant="success">Active</Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground dark:text-gray-500 mt-1">
                                {version.createdAt} by {version.createdBy}
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          {version.changes}
                        </p>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="font-semibold dark:text-gray-100 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Attached Chats
                    </h3>

                    {selectedWorkflowData.attachedChats.length > 0 ? (
                      <div className="space-y-3">
                        {selectedWorkflowData.attachedChats.map((chat) => (
                          <Card
                            key={chat.id}
                            className="hover:border-primary/50 dark:hover:border-primary/50 transition-all"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium dark:text-gray-100 truncate">
                                    {chat.name}
                                  </h4>
                                  <span className="text-xs text-muted-foreground dark:text-gray-500">
                                    {chat.messageCount} messages
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground dark:text-gray-400">
                                  {chat.context}
                                </p>
                                <p className="text-xs text-muted-foreground dark:text-gray-500 mt-1">
                                  Last used: {chat.lastUsed}
                                </p>
                              </div>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => navigate('/dashboard-chat')}
                                className="gap-2 flex-shrink-0"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                                Open Chat
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <Card className="text-center py-12">
                        <div className="w-16 h-16 bg-secondary dark:bg-[#2a2a2a] rounded-full flex items-center justify-center mx-auto mb-4">
                          <MessageSquare className="w-8 h-8 text-muted-foreground dark:text-gray-500" />
                        </div>
                        <h4 className="font-semibold mb-2 dark:text-gray-100">No chats attached</h4>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          This workflow is not attached to any chats yet
                        </p>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Activity className="w-12 h-12 text-muted-foreground dark:text-gray-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 dark:text-gray-300">No workflow selected</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  Select a workflow from the list to view details
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
````````
