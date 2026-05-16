# UI Kit Screens Source Context

This file contains exact source snippets from the uploaded UI kit for the `screens` category.

## `process-monitoring-final/src/app/screens/ComponentsShowcase.tsx`

- Category: `screens`
- Bytes: `173192`
- SHA-256: `fdce9e25fbc9321ccd5f7720a59897224de20e526ca8ff479ac9ee917e15cc03`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `ComponentsShowcase.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { EmptyState } from "../components/EmptyState";
import { InputField, TextareaField, SelectField } from "../components/FormField";
import { MultiSelect, iconOptions, userOptions, tagOptions, categoryOptions } from "../components/MultiSelect";
import { EnhancedDataTable, Column } from "../components/EnhancedDataTable";
import { TreeView, sampleTreeData } from "../components/TreeView";
import { ChatMessage, ThinkingStep, FileAttachment } from "../components/ChatMessage";
import { ConfirmDialog } from "../components/ConfirmDialog";
import { Modal } from "../components/Modal";
import { useToast } from "../components/Toast";
import { useNavigate } from "react-router";
import { SplitView } from "../components/SplitView";
import { LazyLoadList, ListItem } from "../components/LazyLoadList";
import { LazyLoadTree, TreeNode } from "../components/LazyLoadTree";
import { TabbedFormView, TabConfig } from "../components/TabbedFormView";
import { DraggableTable, TableColumn, TableAction } from "../components/DraggableTable";
import { InlineFilterBar, InlineFilter } from "../components/filters/InlineFilterBar";
import { TreeSelector } from "../components/selectors/TreeSelector";
import { TreeMultiSelector } from "../components/selectors/TreeMultiSelector";
import { TreeMultiSelectorModal } from "../components/selectors/TreeMultiSelectorModal";
import { TableSelector, TableSelectorColumn } from "../components/selectors/TableSelector";
import { TableMultiSelector, TableMultiSelectorColumn } from "../components/selectors/TableMultiSelector";
import { MarkdownEditor } from "../components/editors/MarkdownEditor";
import { FileUploader } from "../components/upload/FileUploader";
import { FileViewer } from "../components/upload/FileViewer";
import { RealtimeTable, RealtimeTableColumn } from "../components/tables/RealtimeTable";
import { Input } from "../components/ui/input";
import { TreeSelectField } from "../components/selectors/TreeSelectField";
import { CascadingFormExample, DependentSelect } from "../components/DependentSelect";
import { useContextMenu, ContextMenuItem } from "../components/ContextMenu";
import { FilterBar, FilterConfig } from "../components/FilterBar";
import { LiveBadge } from "../components/monitoring/LiveBadge";
import { SegmentedControl, SegmentedControlOption } from "../components/monitoring/SegmentedControl";
import { MetricCard } from "../components/monitoring/MetricCard";
import { SparklineChart } from "../components/monitoring/SparklineChart";
import { Panel } from "../components/monitoring/Panel";
import { PanelHeader } from "../components/monitoring/PanelHeader";
import { SearchInput } from "../components/monitoring/SearchInput";
import { StatusDot } from "../components/monitoring/StatusDot";
import { Legend, LegendItem } from "../components/monitoring/Legend";
import { Toggle } from "../components/monitoring/Toggle";
import { AlertItem, Alert } from "../components/monitoring/AlertItem";
import { ToolbarButton } from "../components/monitoring/ToolbarButton";
import { Popover, PopoverSection, CheckRow, RadioRow, SettingRow } from "../components/monitoring/Popover";
import { LogViewer } from "../components/LogViewer";
import { FileAttachmentManager } from "../components/FileAttachmentManager";
import { ActivityPanel } from "../components/ActivityPanel";
import { IntelligenceModal } from "../components/IntelligenceModal";
import { InlineConfirmation } from "../components/InlineConfirmation";
import { FilterPopover } from "../components/patterns/FilterPopover";
import { ColumnsPopover } from "../components/patterns/ColumnsPopover";
import { AlertsPopover } from "../components/patterns/AlertsPopover";
import { SettingsPopover } from "../components/patterns/SettingsPopover";
import { ChatEmptyState } from "../components/patterns/EmptyState";
import { ChatMessageSender } from "../components/patterns/MessageSender";
import {
  Inbox,
  Star,
  Heart,
  ThumbsUp,
  MessageSquare,
  Share2,
  Bookmark,
  AlertCircle,
  CheckCircle,
  Info,
  Zap,
  Shield,
  Crown,
  Trash2,
  Plus,
  Download,
  Settings,
  User,
  Bell,
  Edit,
  Eye,
  MoreVertical,
  Folder,
  FileText,
  Database,
  List,
  Loader2,
  Search,
  X,
} from "lucide-react";

interface TableData {
  id: number;
  name: string;
  status: string;
  category: string;
  date: string;
  priority: string;
}

interface SampleData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
}

interface DataItem {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
}

export function ComponentsShowcase() {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [multiSelectValue1, setMultiSelectValue1] = useState<string[]>([]);
  const [multiSelectValue2, setMultiSelectValue2] = useState<string[]>([]);
  const [multiSelectValue3, setMultiSelectValue3] = useState<string[]>([]);
  const [multiSelectValue4, setMultiSelectValue4] = useState<string[]>([]);
  const [multiSelectValue5, setMultiSelectValue5] = useState<string[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // SplitView & List/Tree state
  const [viewMode, setViewMode] = useState<'list' | 'tree'>('list');
  const [selectedItem, setSelectedItem] = useState<ListItem | TreeNode | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<'form' | 'table' | 'view'>('form');

  // Filter state
  const [language, setLanguage] = useState('all');
  const [filterViewMode, setFilterViewMode] = useState('list');
  const [status, setStatus] = useState('active');
  const [sortBy, setSortBy] = useState('sequence');
  const [searchQuery, setSearchQuery] = useState('');

  // Tree selector state
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [selectedListItems, setSelectedListItems] = useState<string[]>([]);
  const [selectedModalNodes, setSelectedModalNodes] = useState<string[]>([]);

  // Table selector state
  const [showTableSelector, setShowTableSelector] = useState(false);
  const [showTableMultiSelector, setShowTableMultiSelector] = useState(false);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  // Markdown state
  const [markdown, setMarkdown] = useState('# Hello World\n\nWrite your **markdown** here...');

  // Component search state
  const [componentSearch, setComponentSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Array<{id: string, name: string, category: string}>>([]);

  // Component directory for search
  const componentDirectory = [
    { id: 'button', name: 'Button', category: 'Basic UI' },
    { id: 'card', name: 'Card', category: 'Basic UI' },
    { id: 'loading-state', name: 'Loading State', category: 'Basic UI' },
    { id: 'error-state', name: 'Error State', category: 'Basic UI' },
    { id: 'empty-state', name: 'Empty State', category: 'Basic UI' },
    { id: 'toast', name: 'Toast Notifications', category: 'Basic UI' },
    { id: 'form-fields', name: 'Form Fields', category: 'Basic UI' },
    { id: 'dependent-select', name: 'Dependent Select', category: 'Basic UI' },
    { id: 'filter-bar', name: 'Filter Bar', category: 'Basic UI' },
    { id: 'multi-select', name: 'Multi-Select', category: 'Form & Input' },
    { id: 'table', name: 'Full-Featured Table', category: 'Data Display' },
    { id: 'tree-view', name: 'Tree View', category: 'Data Display' },
    { id: 'chat', name: 'Chat Components', category: 'Data Display' },
    { id: 'split-view', name: 'Split View', category: 'Layout' },
    { id: 'modal', name: 'Modal', category: 'Layout' },
    { id: 'inline-filter', name: 'Inline Filter Bar', category: 'Filter & Search' },
    { id: 'tree-selectors', name: 'Tree Selectors', category: 'Selection' },
    { id: 'table-selectors', name: 'Table Selectors', category: 'Selection' },
    { id: 'lazy-load-list', name: 'LazyLoadList', category: 'Selection' },
    { id: 'input-components', name: 'Input Components', category: 'Form & Input' },
    { id: 'markdown-editor', name: 'Markdown Editor', category: 'Form & Input' },
    { id: 'file-upload', name: 'File Upload & Viewer', category: 'Interactive' },
    { id: 'context-menu', name: 'Context Menu', category: 'Interactive' },
    { id: 'confirm-dialog', name: 'Confirm Dialog', category: 'Interactive' },
    { id: 'file-attachment', name: 'File Attachment Manager', category: 'AI Dashboard' },
    { id: 'activity-panel', name: 'Activity Panel', category: 'AI Dashboard' },
    { id: 'intelligence-modal', name: 'Intelligence Modal', category: 'AI Dashboard' },
    { id: 'inline-confirmation', name: 'Inline Confirmation', category: 'AI Dashboard' },
    { id: 'live-badge', name: 'Live Badge', category: 'Monitoring' },
    { id: 'segmented-control', name: 'Segmented Control', category: 'Monitoring' },
    { id: 'metric-card', name: 'Metric Card', category: 'Monitoring' },
    { id: 'sparkline-chart', name: 'Sparkline Chart', category: 'Monitoring' },
    { id: 'panel', name: 'Panel Components', category: 'Monitoring' },
    { id: 'search-input', name: 'Search Input', category: 'Monitoring' },
    { id: 'status-dot', name: 'Status Dot', category: 'Monitoring' },
    { id: 'legend', name: 'Legend', category: 'Monitoring' },
    { id: 'toggle', name: 'Toggle', category: 'Monitoring' },
    { id: 'alert-item', name: 'Alert Item', category: 'Monitoring' },
    { id: 'toolbar-button', name: 'Toolbar Button', category: 'Monitoring' },
    { id: 'popover', name: 'Popover', category: 'Monitoring' },
    { id: 'icon-examples', name: 'Icon Examples', category: 'Basic UI' },
    { id: 'inline-filter-bar', name: 'Inline Filter Bar', category: 'Filter & Search' },
    { id: 'draggable-table', name: 'Draggable & Resizable Table', category: 'Data Display' },
    { id: 'realtime-table', name: 'Realtime Table', category: 'Data Display' },
    { id: 'tree-select-fields', name: 'Tree Select Fields', category: 'Form & Input' },
    { id: 'monitoring-core', name: 'Monitoring Core Components', category: 'Monitoring' },
    { id: 'popover-patterns', name: 'Popover Patterns', category: 'Patterns' },
    { id: 'chat-patterns', name: 'Chat UI Patterns', category: 'Patterns' },
    { id: 'log-viewer', name: 'Log Viewer', category: 'Monitoring' },
  ];

  // Search and scroll to component
  const scrollToComponent = (componentId: string) => {
    const element = document.getElementById(componentId);
    if (element) {
      const yOffset = -100; // Offset for sticky header
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setComponentSearch('');
      setSearchResults([]);
    }
  };

  // Update search results
  useEffect(() => {
    if (componentSearch.trim()) {
      const filtered = componentDirectory.filter(comp =>
        comp.name.toLowerCase().includes(componentSearch.toLowerCase()) ||
        comp.category.toLowerCase().includes(componentSearch.toLowerCase())
      );
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
    }
  }, [componentSearch]);

  // File viewer state
  const [viewingFile, setViewingFile] = useState<any>(null);

  // Advanced Filter Bar state
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [loadingDepartments, setLoadingDepartments] = useState(false);
  const [departmentNodes, setDepartmentNodes] = useState<TreeNode[]>([]);

  // Monitoring components state
  const [isLive, setIsLive] = useState(true);
  const [segmentedValue, setSegmentedValue] = useState('overview');
  const [searchValue, setSearchValue] = useState('');
  const [toggleChecked, setToggleChecked] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverTrigger, setPopoverTrigger] = useState<HTMLElement | null>(null);
  const [popoverCheck1, setPopoverCheck1] = useState(true);
  const [popoverCheck2, setPopoverCheck2] = useState(false);
  const [popoverRadio, setPopoverRadio] = useState('option1');

  // AI Dashboard components state
  const [showFileManager, setShowFileManager] = useState(false);
  const [fileAttachments, setFileAttachments] = useState<any[]>([]);
  const [showActivityPanel, setShowActivityPanel] = useState(false);
  const [showIntelligenceModal, setShowIntelligenceModal] = useState(false);
  const [showInlineConfirm, setShowInlineConfirm] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [projectOptions, setProjectOptions] = useState<{ value: string; label: string }[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(false);

  // Simulate async loading of departments
  const loadDepartments = async () => {
    setLoadingDepartments(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const depts: TreeNode[] = [
      {
        id: 'eng',
        label: 'Engineering',
        icon: <Settings className="w-4 h-4 text-primary" />,
        children: [
          { id: 'eng-fe', label: 'Frontend Team' },
          { id: 'eng-be', label: 'Backend Team' },
          { id: 'eng-do', label: 'DevOps Team' },
        ],
      },
      {
        id: 'sales',
        label: 'Sales',
        icon: <Star className="w-4 h-4 text-primary" />,
        children: [
          { id: 'sales-ent', label: 'Enterprise Sales' },
          { id: 'sales-smb', label: 'SMB Sales' },
        ],
      },
      {
        id: 'mkt',
        label: 'Marketing',
        icon: <MessageSquare className="w-4 h-4 text-primary" />,
        children: [
          { id: 'mkt-cont', label: 'Content Marketing' },
          { id: 'mkt-prod', label: 'Product Marketing' },
        ],
      },
    ];
    setDepartmentNodes(depts);
    setLoadingDepartments(false);

    // Pre-select some departments
    setSelectedDepartments(['eng-fe', 'eng-be']);
  };

  // Simulate cascading filter - load projects based on selected departments
  const loadProjectsForDepartments = async (deptIds: string[]) => {
    if (deptIds.length === 0) {
      setProjectOptions([]);
      setSelectedProject('');
      return;
    }

    setLoadingProjects(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generate project options based on selected departments
    const projects: { value: string; label: string }[] = [];
    deptIds.forEach(deptId => {
      if (deptId.startsWith('eng-')) {
        projects.push(
          { value: `${deptId}-proj1`, label: `${deptId.toUpperCase()} - Project Alpha` },
          { value: `${deptId}-proj2`, label: `${deptId.toUpperCase()} - Project Beta` }
        );
      } else if (deptId.startsWith('sales-')) {
        projects.push(
          { value: `${deptId}-proj1`, label: `${deptId.toUpperCase()} - Q2 Campaign` }
        );
      } else if (deptId.startsWith('mkt-')) {
        projects.push(
          { value: `${deptId}-proj1`, label: `${deptId.toUpperCase()} - Brand Refresh` }
        );
      }
    });

    setProjectOptions(projects);
    setLoadingProjects(false);

    // Auto-select first project if available
    if (projects.length > 0) {
      setSelectedProject(projects[0].value);
    }
  };

  // Load departments on mount
  useEffect(() => {
    loadDepartments();
  }, []);

  // Update projects when departments change
  const handleDepartmentChange = (ids: string[], nodes: TreeNode[]) => {
    setSelectedDepartments(ids);
    loadProjectsForDepartments(ids);
  };

  // Context menu for tree nodes
  const treeContextMenu = useContextMenu<TreeNode>({
    getMenuItems: (node) => [
      {
        label: 'View',
        icon: <Eye className="w-4 h-4" />,
        onClick: () => showToast('info', `View: ${node.label}`),
      },
      {
        label: 'Edit',
        icon: <Edit className="w-4 h-4" />,
        onClick: () => showToast('info', `Edit: ${node.label}`),
        variant: 'primary',
      },
      {
        label: 'Rename',
        icon: <Edit className="w-4 h-4" />,
        onClick: () => showToast('info', `Rename: ${node.label}`),
      },
      {
        divider: true,
        label: '',
        onClick: () => {},
      },
      {
        label: 'Delete',
        icon: <Trash2 className="w-4 h-4" />,
        onClick: () => showToast('error', `Delete: ${node.label}`),
        variant: 'destructive',
      },
    ],
  });

  // Context menu for table rows
  const tableContextMenu = useContextMenu<DataItem>({
    getMenuItems: (row) => [
      {
        label: 'View Details',
        icon: <Eye className="w-4 h-4" />,
        onClick: () => showToast('info', `View: ${row.name}`),
      },
      {
        label: 'Edit',
        icon: <Edit className="w-4 h-4" />,
        onClick: () => showToast('info', `Edit: ${row.name}`),
        variant: 'primary',
      },
      {
        label: 'Duplicate',
        icon: <Plus className="w-4 h-4" />,
        onClick: () => showToast('success', `Duplicated: ${row.name}`),
      },
      {
        divider: true,
        label: '',
        onClick: () => {},
      },
      {
        label: 'Delete',
        icon: <Trash2 className="w-4 h-4" />,
        onClick: () => showToast('error', `Delete: ${row.name}`),
        variant: 'destructive',
      },
    ],
  });

  const tableData: TableData[] = [
    { id: 1, name: "Project Alpha", status: "Active", category: "Development", date: "2026-04-20", priority: "High" },
    { id: 2, name: "Project Beta", status: "Pending", category: "Design", date: "2026-04-19", priority: "Medium" },
    { id: 3, name: "Project Gamma", status: "Completed", category: "Marketing", date: "2026-04-18", priority: "Low" },
    { id: 4, name: "Project Delta", status: "Active", category: "Development", date: "2026-04-17", priority: "High" },
    { id: 5, name: "Project Epsilon", status: "On Hold", category: "Research", date: "2026-04-16", priority: "Medium" },
    { id: 6, name: "Project Zeta", status: "Active", category: "Design", date: "2026-04-15", priority: "High" },
    { id: 7, name: "Project Eta", status: "Completed", category: "Development", date: "2026-04-14", priority: "Low" },
    { id: 8, name: "Project Theta", status: "Pending", category: "Marketing", date: "2026-04-13", priority: "Medium" },
  ];

  const tableColumns: Column<TableData>[] = [
    {
      id: 'name',
      header: 'Project Name',
      accessor: (row) => row.name,
      sortable: true,
      filterable: true,
    },
    {
      id: 'status',
      header: 'Status',
      accessor: (row) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          row.status === 'Active' ? 'bg-green-100 text-green-800' :
          row.status === 'Completed' ? 'bg-blue-100 text-blue-800' :
          row.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {row.status}
        </span>
      ),
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { value: 'Active', label: 'Active' },
        { value: 'Pending', label: 'Pending' },
        { value: 'Completed', label: 'Completed' },
        { value: 'On Hold', label: 'On Hold' },
      ],
    },
    {
      id: 'category',
      header: 'Category',
      accessor: (row) => row.category,
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { value: 'Development', label: 'Development' },
        { value: 'Design', label: 'Design' },
        { value: 'Marketing', label: 'Marketing' },
        { value: 'Research', label: 'Research' },
      ],
    },
    {
      id: 'date',
      header: 'Date',
      accessor: (row) => row.date,
      sortable: true,
      width: '150px',
    },
    {
      id: 'priority',
      header: 'Priority',
      accessor: (row) => (
        <span className={`inline-flex items-center gap-1 ${
          row.priority === 'High' ? 'text-red-600' :
          row.priority === 'Medium' ? 'text-yellow-600' :
          'text-green-600'
        }`}>
          <span className="w-2 h-2 rounded-full bg-current" />
          {row.priority}
        </span>
      ),
      sortable: true,
      filterable: true,
      filterType: 'select',
      filterOptions: [
        { value: 'High', label: 'High' },
        { value: 'Medium', label: 'Medium' },
        { value: 'Low', label: 'Low' },
      ],
      width: '120px',
    },
  ];

  // Sample data for list
  const listItems: ListItem[] = Array.from({ length: 50 }, (_, i) => ({
    id: `item-${i}`,
    title: `List Item ${i + 1}`,
    description: `Description for item ${i + 1}`,
    category: i % 3 === 0 ? 'Category A' : i % 3 === 1 ? 'Category B' : 'Category C',
  }));

  // Sample data for tree
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
        {
          id: '1-2',
          label: 'Mobile App',
          icon: <Folder className="w-4 h-4 text-primary" />,
          hasChildren: true,
          loadChildren: async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            return [
              { id: '1-2-1', label: 'App.tsx', icon: <FileText className="w-4 h-4" /> },
              { id: '1-2-2', label: 'components', icon: <Folder className="w-4 h-4 text-primary" /> },
            ];
          },
        },
      ],
    },
    {
      id: '2',
      label: 'Documents',
      icon: <Folder className="w-4 h-4 text-primary" />,
      children: [
        { id: '2-1', label: 'report.pdf', icon: <FileText className="w-4 h-4" /> },
        { id: '2-2', label: 'presentation.pptx', icon: <FileText className="w-4 h-4" /> },
      ],
    },
    {
      id: '3',
      label: 'Database',
      icon: <Database className="w-4 h-4 text-primary" />,
      children: [
        { id: '3-1', label: 'users.sql', icon: <FileText className="w-4 h-4" /> },
        { id: '3-2', label: 'products.sql', icon: <FileText className="w-4 h-4" /> },
      ],
    },
  ];

  // Sample data for draggable table
  const draggableTableData: DataItem[] = Array.from({ length: 20 }, (_, i) => ({
    id: `row-${i}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: ['Admin', 'Editor', 'Viewer'][i % 3],
    department: ['Engineering', 'Sales', 'Marketing'][i % 3],
    status: ['Active', 'Inactive'][i % 2],
  }));

  const draggableTableColumns: TableColumn<DataItem>[] = [
    { id: 'name', header: 'Name', accessor: (row) => row.name, sortable: true, width: 200 },
    { id: 'email', header: 'Email', accessor: (row) => row.email, sortable: true, width: 250 },
    { id: 'role', header: 'Role', accessor: (row) => row.role, sortable: true, width: 150 },
    { id: 'department', header: 'Department', accessor: (row) => row.department, sortable: true, width: 150 },
    { id: 'status', header: 'Status', accessor: (row) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
        {row.status}
      </span>
    ), width: 120 },
  ];

  const draggableTableActions: TableAction<DataItem>[] = [
    {
      label: 'View',
      icon: <Eye className="w-4 h-4" />,
      onClick: (row) => showToast('info', `Viewing ${row.name}`),
    },
    {
      label: 'Edit',
      icon: <Edit className="w-4 h-4" />,
      onClick: (row) => showToast('info', `Editing ${row.name}`),
      variant: 'primary',
    },
    {
      label: 'Delete',
      icon: <Trash2 className="w-4 h-4" />,
      onClick: (row) => showToast('success', `Deleted ${row.name}`),
      variant: 'destructive',
    },
  ];

  // Tab configurations
  const tabs: TabConfig[] = [
    {
      id: 'details',
      label: 'Details',
      content: (
        <div className="space-y-4">
          <h3 className="font-semibold dark:text-gray-100">Item Details</h3>
          {selectedItem ? (
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground dark:text-gray-400">Name/Label</label>
                <p className="mt-1 dark:text-gray-200">{selectedItem.label || (selectedItem as any).title}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground dark:text-gray-400">ID</label>
                <p className="mt-1"><code className="px-2 py-1 bg-secondary dark:bg-[#2a2a2a] text-sm dark:text-gray-200">{selectedItem.id}</code></p>
              </div>
              {(selectedItem as any).description && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground dark:text-gray-400">Description</label>
                  <p className="mt-1 dark:text-gray-200">{(selectedItem as any).description}</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground dark:text-gray-400">Select an item to view details</p>
          )}
        </div>
      ),
    },
    {
      id: 'form',
      label: 'Edit Form',
      content: (
        <div className="space-y-4">
          <h3 className="font-semibold dark:text-gray-100">Edit Item</h3>
          <div>
            <label className="block text-sm font-medium dark:text-gray-200 mb-2">Name</label>
            <input
              type="text"
              defaultValue={selectedItem?.label || (selectedItem as any)?.title}
              className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-gray-200 mb-2">Description</label>
            <textarea
              rows={4}
              defaultValue={(selectedItem as any)?.description || ''}
              className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Button onClick={() => showToast('success', 'Changes saved')}>
            Save Changes
          </Button>
        </div>
      ),
    },
    {
      id: 'table',
      label: 'Related Data',
      badge: draggableTableData.length,
      content: (
        <div className="space-y-4">
          <h3 className="font-semibold dark:text-gray-100">Related Items</h3>
          <DraggableTable
            columns={draggableTableColumns}
            data={draggableTableData.slice(0, 5)}
            rowKey={(row) => row.id}
            actions={draggableTableActions}
            storageKey="related-table-state"
            draggableRows={true}
            resizableColumns={true}
          />
        </div>
      ),
    },
  ];

  const filterConfigs: FilterConfig[] = [
    {
      id: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { value: 'Category A', label: 'Category A' },
        { value: 'Category B', label: 'Category B' },
        { value: 'Category C', label: 'Category C' },
      ],
    },
    {
      id: 'date',
      label: 'Date Range',
      type: 'daterange',
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
      value: filterViewMode,
      onChange: setFilterViewMode,
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

  // Sample table data for selectors
  const selectorTableData: SampleData[] = Array.from({ length: 20 }, (_, i) => ({
    id: `row-${i}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: ['Admin', 'Editor', 'Viewer'][i % 3],
    status: ['Active', 'Inactive'][i % 2],
  }));

  const selectorTableColumns: TableSelectorColumn<SampleData>[] = [
    { id: 'name', header: 'Name', accessor: (row) => row.name, width: '200px' },
    { id: 'email', header: 'Email', accessor: (row) => row.email, width: '250px' },
    { id: 'role', header: 'Role', accessor: (row) => row.role, width: '150px' },
    {
      id: 'status',
      header: 'Status',
      accessor: (row) => (
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
          {row.status}
        </span>
      ),
      width: '120px',
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
        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
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
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const openModal = (content: 'form' | 'table' | 'view') => {
    setModalContent(content);
    setShowModal(true);
  };

  const getDepartmentLabels = () => {
    return selectedDepartments
      .map(id => {
        const findNode = (nodes: TreeNode[]): TreeNode | null => {
          for (const node of nodes) {
            if (node.id === id) return node;
            if (node.children) {
              const found = findNode(node.children);
              if (found) return found;
            }
          }
          return null;
        };
        return findNode(departmentNodes)?.label || id;
      })
      .join(', ');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-16">
      {/* Fixed Search Bar */}
      <div className="sticky top-0 z-50 bg-white dark:bg-[#0a0a0a] border-b border-border dark:border-[#2a2a2a] -mx-6 px-6 py-4 mb-8">
        <div className="max-w-2xl mx-auto relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-gray-400" />
            <input
              type="text"
              value={componentSearch}
              onChange={(e) => setComponentSearch(e.target.value)}
              placeholder="Search components... (e.g., Button, Modal, Table)"
              className="w-full pl-11 pr-10 py-3 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            {componentSearch && (
              <button
                onClick={() => {
                  setComponentSearch('');
                  setSearchResults([]);
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => scrollToComponent(result.id)}
                  className="w-full px-4 py-3 text-left hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors border-b border-border dark:border-[#2a2a2a] last:border-b-0 first:rounded-t-lg last:rounded-b-lg"
                >
                  <div className="font-medium dark:text-gray-200">{result.name}</div>
                  <div className="text-xs text-muted-foreground dark:text-gray-400 mt-1">{result.category}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <header>
        <h1 className="text-3xl font-bold mb-2 dark:text-gray-100">UI Components Library</h1>
        <p className="text-muted-foreground dark:text-gray-400">
          Comprehensive showcase of all available UI components
        </p>
      </header>

      {/* ========== COMPONENT REFERENCE GUIDE ========== */}
      <div className="space-y-8">
        <div className="border-l-4 border-primary pl-4">
          <h2 className="text-2xl font-bold mb-1 dark:text-gray-100">Component Reference Guide</h2>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Quick reference for all components organized by category
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Multi-Select Components Group */}
          <Card>
            <h3 className="text-lg font-semibold mb-4 dark:text-gray-100">Multi-Select Components</h3>
            <div className="p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
              <div className="flex gap-3 mb-2">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 MultiSelect.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Inline dropdown with styles: default, badges, pills, chips, compact</span>
              </div>
              <div className="text-primary mb-1">📁 selectors/</div>
              <div className="ml-4 flex gap-3">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">├─ 📄 TreeSelect.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Tree select (inline single/multi, modal multi) via props</span>
              </div>
              <div className="ml-4 flex gap-3 mt-1">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">├─ 📄 TableSelector.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Modal table select (single)</span>
              </div>
              <div className="ml-4 flex gap-3 mt-1">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">└─ 📄 TableMultiSelector.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Modal table select (multi)</span>
              </div>
            </div>
          </Card>

          {/* Table Components Group */}
          <Card>
            <h3 className="text-lg font-semibold mb-4 dark:text-gray-100">Table Components</h3>
            <div className="p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
              <div className="flex gap-3 mb-2">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 Table.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Unified table with features via props: sorting, filtering, pagination, draggable, resizable, realtime</span>
              </div>
            </div>
          </Card>

          {/* List & Tree Components Group */}
          <Card>
            <h3 className="text-lg font-semibold mb-4 dark:text-gray-100">List & Tree Components</h3>
            <div className="p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
              <div className="flex gap-3 mb-1">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 LazyLoadList.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Virtual scroll, search, multi-select</span>
              </div>
              <div className="flex gap-3 mb-1">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 LazyLoadTree.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Virtual scroll, expand/collapse, async loading</span>
              </div>
              <div className="flex gap-3 mb-2">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 TreeView.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Basic tree with icons and metadata</span>
              </div>
              <div className="text-primary mb-1">📁 selectors/</div>
              <div className="ml-4 flex gap-3">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">└─ 📄 TreeSelect.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Tree select (inline/modal, single/multi) via props</span>
              </div>
            </div>
          </Card>

          {/* Layout Components Group */}
          <Card>
            <h3 className="text-lg font-semibold mb-4 dark:text-gray-100">Layout Components</h3>
            <div className="p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
              <div className="flex gap-3">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 SplitView.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Contains leftPanel (List/Tree) + rightPanel (TabbedFormView)</span>
              </div>
              <div className="ml-4 flex gap-3 mt-1">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">├─ LazyLoadList.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Virtual scroll list</span>
              </div>
              <div className="ml-4 flex gap-3 mt-1">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">├─ LazyLoadTree.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Virtual scroll tree</span>
              </div>
              <div className="ml-4 flex gap-3 mt-1 mb-2">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">└─ TabbedFormView.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Tabs with badge counts</span>
              </div>
              <div className="flex gap-3">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 Modal.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Can contain any component (Tables, Forms, etc.)</span>
              </div>
            </div>
          </Card>

          {/* AI Dashboard Components Group */}
          <Card>
            <h3 className="text-lg font-semibold mb-4 dark:text-gray-100">AI Dashboard Components</h3>
            <div className="p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
              <div className="flex gap-3 mb-1">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 FileAttachmentManager.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">File upload & preview management</span>
              </div>
              <div className="flex gap-3 mb-1">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 ActivityPanel.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">AI thinking steps visualization</span>
              </div>
              <div className="flex gap-3 mb-1">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 IntelligenceModal.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">AI mode selection modal</span>
              </div>
              <div className="flex gap-3">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 InlineConfirmation.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Inline confirmation for actions</span>
              </div>
            </div>
          </Card>

          {/* Monitoring Components Group */}
          <Card>
            <h3 className="text-lg font-semibold mb-4 dark:text-gray-100">Monitoring Components</h3>
            <div className="p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
              <div className="text-primary mb-1">📁 monitoring/</div>
              <div className="ml-4 flex gap-3">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">├─ LiveBadge.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Live/paused status badge</span>
              </div>
              <div className="ml-4 flex gap-3 mt-1">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">├─ SegmentedControl.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">View switcher tabs</span>
              </div>
              <div className="ml-4 flex gap-3 mt-1">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">├─ MetricCard.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Metric with sparkline chart</span>
              </div>
              <div className="ml-4 flex gap-3 mt-1">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">├─ SparklineChart.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Mini trend chart (5 colors)</span>
              </div>
              <div className="ml-4 flex gap-3 mt-1">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">├─ Panel.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Layout container</span>
              </div>
              <div className="ml-4 flex gap-3 mt-1">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">├─ PanelHeader.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Panel title/subtitle/actions</span>
              </div>
              <div className="ml-4 flex gap-3 mt-1">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">├─ SearchInput.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Styled search field</span>
              </div>
              <div className="ml-4 flex gap-3 mt-1">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">├─ StatusDot.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Status indicator (9 states)</span>
              </div>
              <div className="ml-4 flex gap-3 mt-1">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">├─ Legend.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Status legend bar</span>
              </div>
              <div className="ml-4 flex gap-3 mt-1">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">├─ Toggle.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">On/off switch</span>
              </div>
              <div className="ml-4 flex gap-3 mt-1">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">├─ AlertItem.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Alert card (3 levels)</span>
              </div>
              <div className="ml-4 flex gap-3 mt-1">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">├─ ToolbarButton.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Toolbar action button</span>
              </div>
              <div className="ml-4 flex gap-3 mt-1">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">└─ Popover.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Dropdown panel (Filter/Columns/Alerts/Settings)</span>
              </div>
              <div className="flex gap-3 mt-2">
                <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 LogViewer.tsx</span>
                <span className="text-muted-foreground dark:text-gray-400">Real-time log console with colored levels</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ========== BASIC UI COMPONENTS ========== */}
      <div className="space-y-8">
        <div className="border-l-4 border-primary pl-4">
          <h2 className="text-2xl font-bold mb-1 dark:text-gray-100">Basic UI Components</h2>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Buttons, cards, icons, and loading states
          </p>
        </div>

      {/* Buttons Section */}
      <section id="button" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Buttons</h3>
        <Card>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3">
              <span className="text-blue-400 dark:text-blue-400">📄 Button.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">variant, size, loading, disabled, onClick, className</span>
            </div>
          </div>
          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Variants</h3>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="ghost">Ghost Button</Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">Sizes</h3>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">States</h3>
              <div className="flex flex-wrap gap-3">
                <Button disabled>Disabled</Button>
                <Button loading>Loading...</Button>
                <Button onClick={() => showToast('success', 'Button clicked!')}>
                  Click me
                </Button>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground">With Icons</h3>
              <div className="flex flex-wrap gap-3">
                <Button className="gap-2">
                  <Star className="w-4 h-4" />
                  Star
                </Button>
                <Button variant="secondary" className="gap-2">
                  <Heart className="w-4 h-4" />
                  Like
                </Button>
                <Button variant="ghost" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Loading States */}
      <section id="loading-state" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Loading States</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3">
            <span className="text-blue-400 dark:text-blue-400">📄 LoadingState.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">type ("spinner" | "skeleton-card" | "skeleton-list" | "skeleton-table"), count</span>
          </div>
        </div>
        <div className="space-y-4">
          <Card>
            <h3 className="text-sm font-medium mb-4">Spinner</h3>
            <LoadingState type="spinner" />
          </Card>

          <Card>
            <h3 className="text-sm font-medium mb-4">Skeleton Cards</h3>
            <LoadingState type="skeleton-card" count={3} />
          </Card>

          <Card>
            <h3 className="text-sm font-medium mb-4">Skeleton List</h3>
            <LoadingState type="skeleton-list" count={3} />
          </Card>

          <Card>
            <h3 className="text-sm font-medium mb-4">Skeleton Table</h3>
            <LoadingState type="skeleton-table" count={3} />
          </Card>
        </div>
      </section>

      {/* Error & Empty States */}
      <section id="error-state" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Error & Empty States</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3">
            <span className="text-blue-400 dark:text-blue-400">📄 ErrorState.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">title, message, inline, onRetry</span>
          </div>
          <div className="flex gap-3 mt-1">
            <span className="text-blue-400 dark:text-blue-400">📄 EmptyState.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">icon, title, message, action</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <h3 className="text-sm font-medium mb-4">Inline Error</h3>
            <ErrorState
              inline
              title="Something went wrong"
              message="This is an inline error message"
              onRetry={() => showToast('info', 'Retrying...')}
            />
          </Card>

          <Card>
            <h3 className="text-sm font-medium mb-4">Full Error</h3>
            <ErrorState
              title="Failed to load"
              message="We couldn't load the data"
              onRetry={() => showToast('info', 'Retrying...')}
            />
          </Card>

          <Card>
            <h3 className="text-sm font-medium mb-4">Empty State</h3>
            <EmptyState
              icon={Inbox}
              title="No items found"
              message="Start by creating your first item"
              action={{
                label: "Create Item",
                onClick: () => showToast('success', 'Creating item...'),
              }}
            />
          </Card>
        </div>
      </section>

      {/* Toast Notifications */}
      <section id="toast" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Toast Notifications</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3">
            <span className="text-blue-400 dark:text-blue-400">📄 Toast.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Hook:</span>
            <span className="text-muted-foreground dark:text-gray-400">useToast() → showToast(type, message) where type: "success" | "error" | "info"</span>
          </div>
        </div>
        <Card>
          <div className="flex flex-wrap gap-3">
            <Button
              variant="secondary"
              onClick={() => showToast('success', 'Operation completed successfully!')}
              className="gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Success Toast
            </Button>
            <Button
              variant="secondary"
              onClick={() => showToast('error', 'Something went wrong. Please try again.')}
              className="gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              Error Toast
            </Button>
            <Button
              variant="secondary"
              onClick={() => showToast('info', 'This is an informational message.')}
              className="gap-2"
            >
              <Info className="w-4 h-4" />
              Info Toast
            </Button>
          </div>
        </Card>
      </section>

      {/* Form Fields */}
      <section id="form-fields" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Form Fields</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3 mb-2">
            <span className="text-blue-400 dark:text-blue-400">📄 FormField.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Exports:</span>
            <span className="text-muted-foreground dark:text-gray-400">InputField, TextareaField, SelectField</span>
          </div>
        </div>
        <Card>
          <div className="max-w-2xl space-y-6">
            <InputField
              label="Text Input"
              placeholder="Enter text..."
              helperText="This is a helper text"
            />

            <InputField
              label="Email Input"
              type="email"
              placeholder="Enter email..."
              required
            />

            <InputField
              label="Input with Error"
              placeholder="Enter something..."
              error="This field is required"
              required
            />

            <TextareaField
              label="Textarea"
              placeholder="Enter longer text..."
              rows={4}
              helperText="You can enter multiple lines"
            />

            <SelectField
              label="Select Dropdown"
              options={[
                { value: 'option1', label: 'Option 1' },
                { value: 'option2', label: 'Option 2' },
                { value: 'option3', label: 'Option 3' },
              ]}
              required
            />
          </div>
        </Card>
      </section>

      {/* DependentSelect Component */}
      <section id="dependent-select" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Dependent Select (Cascading Forms)</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3 mb-2">
            <span className="text-blue-400 dark:text-blue-400">📄 DependentSelect.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Exports:</span>
            <span className="text-muted-foreground dark:text-gray-400">DependentSelect, CascadingFormExample</span>
          </div>
        </div>
        <Card>
          <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
            <strong className="text-gray-900 dark:text-gray-200">Full Example:</strong> See CascadingFormExample in the Modal section, or OrganizationMembers.tsx
          </p>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            DependentSelect enables cascading dropdowns where child select options update based on parent selections. Used for hierarchical data like location (Country → State → City) or organization structure (Department → Team → Project).
          </p>
        </Card>
      </section>

      {/* FilterBar Component */}
      <section id="filter-bar" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Filter Bar</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3 mb-2">
            <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 FilterBar.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">filters (FilterConfig[]), onFilterChange, showSearch, searchPlaceholder</span>
          </div>
        </div>
        <Card>
          <div className="p-4 bg-secondary/20 dark:bg-[#0f0f0f] rounded-lg border border-border dark:border-[#2a2a2a]">
            <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
              <strong className="text-gray-900 dark:text-gray-200">Used in:</strong> CredentialsManager.tsx for filtering credentials by type, status, and service
            </p>
            <div className="space-y-2">
              <FilterBar
                filters={[
                  {
                    id: 'example-type',
                    label: 'Type',
                    type: 'select',
                    options: [
                      { value: 'all', label: 'All Types' },
                      { value: 'api_key', label: 'API Key' },
                      { value: 'database', label: 'Database' },
                    ],
                  },
                  {
                    id: 'example-status',
                    label: 'Status',
                    type: 'select',
                    options: [
                      { value: 'all', label: 'All Status' },
                      { value: 'active', label: 'Active' },
                      { value: 'expired', label: 'Expired' },
                    ],
                  },
                ]}
                onFilterChange={(values) => console.log('Filter values:', values)}
                showSearch={true}
                searchPlaceholder="Search credentials..."
              />
            </div>
          </div>
        </Card>
      </section>

      {/* Multi-Select Components */}
      <section id="multi-select" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Multi-Select Components</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3 mb-2">
            <span className="text-blue-400 dark:text-blue-400">📄 MultiSelect.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">label, options, value, onChange, placeholder, style ("default" | "badges" | "pills" | "chips" | "compact")</span>
          </div>
        </div>
        <div className="space-y-6">
          <Card>
            <h3 className="font-medium mb-4">Style 1: Default with Icons</h3>
            <MultiSelect
              label="Select with Icons"
              options={iconOptions}
              value={multiSelectValue1}
              onChange={setMultiSelectValue1}
              style="default"
              placeholder="Select options with icons..."
            />
          </Card>

          <Card>
            <h3 className="font-medium mb-4">Style 2: Badges with Users</h3>
            <MultiSelect
              label="Select Team Members"
              options={userOptions}
              value={multiSelectValue2}
              onChange={setMultiSelectValue2}
              style="badges"
              placeholder="Select team members..."
            />
          </Card>

          <Card>
            <h3 className="font-medium mb-4">Style 3: Pills with Tags</h3>
            <MultiSelect
              label="Select Tags"
              options={tagOptions}
              value={multiSelectValue3}
              onChange={setMultiSelectValue3}
              style="pills"
              placeholder="Select tags..."
            />
          </Card>

          <Card>
            <h3 className="font-medium mb-4">Style 4: Chips with Colors</h3>
            <MultiSelect
              label="Select Categories"
              options={categoryOptions}
              value={multiSelectValue4}
              onChange={setMultiSelectValue4}
              style="chips"
              placeholder="Select categories..."
            />
          </Card>

          <Card>
            <h3 className="font-medium mb-4">Style 5: Compact Mode</h3>
            <MultiSelect
              label="Compact Selection"
              options={[...iconOptions, ...categoryOptions]}
              value={multiSelectValue5}
              onChange={setMultiSelectValue5}
              style="compact"
              placeholder="Select multiple..."
            />
          </Card>
        </div>
      </section>
      </div>

      {/* ========== DATA DISPLAY COMPONENTS ========== */}
      <div className="space-y-8">
        <div className="border-l-4 border-primary pl-4">
          <h2 className="text-2xl font-bold mb-1 dark:text-gray-100">Data Display Components</h2>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Tables, lists, and trees for displaying structured data
          </p>
        </div>

      {/* Enhanced Data Table */}
      <section id="table" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Full-Featured Table</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3 mb-2">
            <span className="text-blue-400 dark:text-blue-400">📄 Table.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">columns, data, searchable, selectable, onRowClick, rowActions, pageSize, draggableRows, resizableColumns, realtime, updateInterval</span>
          </div>
        </div>

        <Card className="p-0 overflow-hidden">
          <InlineFilterBar
            title="Full-Featured Table"
            filters={[
              {
                id: 'status-table',
                label: 'Status',
                value: status,
                onChange: setStatus,
                options: [
                  { value: 'all', label: 'All Status' },
                  { value: 'active', label: 'Active' },
                  { value: 'pending', label: 'Pending' },
                  { value: 'completed', label: 'Completed' },
                ],
              },
              {
                id: 'category-table',
                label: 'Category',
                value: language,
                onChange: setLanguage,
                options: [
                  { value: 'all', label: 'All Categories' },
                  { value: 'development', label: 'Development' },
                  { value: 'design', label: 'Design' },
                  { value: 'marketing', label: 'Marketing' },
                ],
              },
              {
                id: 'priority-table',
                label: 'Priority',
                value: sortBy,
                onChange: setSortBy,
                options: [
                  { value: 'all', label: 'All' },
                  { value: 'high', label: 'High' },
                  { value: 'medium', label: 'Medium' },
                  { value: 'low', label: 'Low' },
                ],
              },
            ]}
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            searchPlaceholder="Search projects..."
            actions={
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Project
              </Button>
            }
          />
          <div className="p-6">
            <EnhancedDataTable
              columns={tableColumns}
              data={tableData}
              searchable={false}
              selectable
              onRowClick={(row) => showToast('info', `Clicked: ${row.name}`)}
              rowActions={(row) => [
                { label: 'View', onClick: () => showToast('info', `View ${row.name}`) },
                { label: 'Edit', onClick: () => showToast('info', `Edit ${row.name}`) },
                { label: 'Delete', onClick: () => showToast('error', `Delete ${row.name}`) },
              ]}
              pageSize={5}
            />
          </div>
        </Card>
      </section>

      {/* Cards Section */}
      <section id="card" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Cards</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3">
            <span className="text-blue-400 dark:text-blue-400">📄 Card.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">className, children</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <div className="space-y-3">
              <div className="p-3 bg-primary/10 rounded-xl w-fit">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Basic Card</h3>
              <p className="text-sm text-muted-foreground">
                A simple card with icon, title, and description.
              </p>
            </div>
          </Card>

          <Card className="hover:border-primary/40 cursor-pointer">
            <div className="space-y-3">
              <div className="p-3 bg-green-100 rounded-xl w-fit">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold">Hoverable Card</h3>
              <p className="text-sm text-muted-foreground">
                This card has hover effects and is clickable.
              </p>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <div className="space-y-3">
              <div className="p-3 bg-white dark:bg-[#1a1a1a] shadow-sm rounded-xl w-fit">
                <Crown className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold">Gradient Card</h3>
              <p className="text-sm text-muted-foreground">
                A card with gradient background and custom styling.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Icons Section */}
      <section id="icon-examples" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Icon Examples</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3">
            <span className="text-blue-400 dark:text-blue-400">📦 lucide-react</span>
            <span className="text-orange-500 dark:text-orange-400">Usage:</span>
            <span className="text-muted-foreground dark:text-gray-400">import {`{ IconName }`} from "lucide-react"</span>
          </div>
          <div className="flex gap-3 mt-1">
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">className, size, color, strokeWidth</span>
          </div>
        </div>
        <Card>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
            <div className="flex flex-col items-center gap-2">
              <Star className="w-6 h-6 text-primary" />
              <span className="text-xs text-muted-foreground">Star</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Heart className="w-6 h-6 text-red-500" />
              <span className="text-xs text-muted-foreground">Heart</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <ThumbsUp className="w-6 h-6 text-blue-500" />
              <span className="text-xs text-muted-foreground">Like</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MessageSquare className="w-6 h-6 text-green-500" />
              <span className="text-xs text-muted-foreground">Message</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Share2 className="w-6 h-6 text-purple-500" />
              <span className="text-xs text-muted-foreground">Share</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Bookmark className="w-6 h-6 text-yellow-500" />
              <span className="text-xs text-muted-foreground">Bookmark</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Shield className="w-6 h-6 text-indigo-500" />
              <span className="text-xs text-muted-foreground">Shield</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Zap className="w-6 h-6 text-orange-500" />
              <span className="text-xs text-muted-foreground">Zap</span>
            </div>
          </div>
        </Card>
      </section>

      {/* Tree View Component */}
      <section id="tree-view" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Tree View Component</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3">
            <span className="text-blue-400 dark:text-blue-400">📄 TreeView.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">data, defaultExpanded, onNodeClick</span>
          </div>
        </div>
        <Card>
          <h3 className="font-medium mb-4">Hierarchical File Tree</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Expandable/collapsible tree structure with icons and metadata
          </p>
          <TreeView
            data={sampleTreeData}
            defaultExpanded={['1']}
            onNodeClick={(node) => showToast('info', `Clicked: ${node.label}`)}
          />
        </Card>
      </section>

      {/* Chat Components */}
      <section id="chat" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Chat Components</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="text-purple-400 dark:text-purple-400 mb-2">📁 components/</div>
          <div className="ml-4 space-y-1">
            <div className="flex gap-3">
              <span className="text-blue-400 dark:text-blue-400">📄 ChatMessage.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">sender, content, timestamp, thinking, thinkingDuration, inlineThinking, confirmation, dashboard</span>
            </div>
          </div>
        </div>

        <Card>
          <h3 className="font-medium mb-4">User Message</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3">
              <span className="text-blue-400 dark:text-blue-400">📄 ChatMessage.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">content: string, timestamp?: string</span>
            </div>
          </div>
          <ChatMessage
            sender="user"
            content="Hello! Can you help me understand how the AI thinking mode works?"
            timestamp="2:45 PM"
          />
        </Card>

        <Card>
          <h3 className="font-medium mb-4">User Message with File Attachments</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3">
              <span className="text-blue-400 dark:text-blue-400">📄 ChatMessage.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">content: string, attachments?: FileAttachment[]</span>
            </div>
          </div>
          <ChatMessage
            sender="user"
            content="Here are the documents you requested. Please review them and let me know if you need anything else."
            timestamp="3:15 PM"
            attachments={[
              {
                id: '1',
                name: 'Project_Proposal.pdf',
                type: 'application/pdf',
                size: 2457600,
                url: 'https://example.com/proposal.pdf',
              },
              {
                id: '2',
                name: 'Budget_Analysis.xlsx',
                type: 'application/vnd.ms-excel',
                size: 1024000,
                url: 'https://example.com/budget.xlsx',
              },
              {
                id: '3',
                name: 'Screenshot_2024.png',
                type: 'image/png',
                size: 512000,
                url: 'https://via.placeholder.com/800x600',
                preview: 'https://via.placeholder.com/800x600',
              },
            ]}
          />
        </Card>

        <Card>
          <h3 className="font-medium mb-4">AI Message (Basic)</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3">
              <span className="text-blue-400 dark:text-blue-400">📄 ChatMessage.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">content: string, timestamp?: string</span>
            </div>
          </div>
          <ChatMessage
            sender="ai"
            content="The thinking mode allows the AI to show its reasoning process step by step, helping users understand how conclusions are reached."
            timestamp="2:46 PM"
          />
        </Card>

        <Card>
          <h3 className="font-medium mb-4">AI Message with Thinking</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3 mb-2">
              <span className="text-blue-400 dark:text-blue-400">📄 ChatMessage.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">thinking?: {`{ duration: number }`}, onThinkingClick?: () =&gt; void</span>
            </div>
          </div>
          <ChatMessage
            sender="ai"
            content="Based on my analysis, I've identified the root cause of the issue in your authentication flow."
            timestamp="2:47 PM"
            thinkingDuration={3.2}
            onThinkingClick={() => showToast('info', 'Opening thinking panel...')}
          />
        </Card>

        <Card>
          <h3 className="font-medium mb-4">AI Message with Confirmation</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3 mb-2">
              <span className="text-blue-400 dark:text-blue-400">📄 ChatMessage.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">confirmation?: {`{ message: string, onConfirm: () => void, onCancel: () => void }`}</span>
            </div>
          </div>
          <ChatMessage
            sender="ai"
            content="I can delete all the test files from your project. This action cannot be undone."
            timestamp="2:48 PM"
            confirmation={{
              question: "Are you sure you want to delete all test files? This action cannot be undone.",
              onConfirm: () => showToast('success', 'Files deleted successfully'),
              onCancel: () => showToast('info', 'Action cancelled'),
            }}
          />
        </Card>

        <Card>
          <h3 className="font-medium mb-4">AI Message with Dashboard</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3 mb-2">
              <span className="text-blue-400 dark:text-blue-400">📄 ChatMessage.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">dashboard?: {`{ title: string, metrics: Array<{ label: string, value: string, change: string }> }`}</span>
            </div>
          </div>
          <ChatMessage
            sender="ai"
            content="Here's your latest performance overview:"
            timestamp="2:49 PM"
            dashboard={{
              title: "Performance Metrics",
              metrics: [
                { label: "Total Users", value: "12,450", change: "+12% from last week" },
                { label: "Revenue", value: "$54,320", change: "+8% from last week" },
                { label: "Conversion Rate", value: "3.2%", change: "+0.5% from last week" },
                { label: "Avg Response Time", value: "230ms", change: "-15% from last week" },
              ]
            }}
          />
        </Card>

        <Card className="bg-secondary/20 dark:bg-[#0f0f0f] border-primary/20">
          <h3 className="font-medium mb-4">Legacy: ChatMessage (Unified Component)</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3">
              <span className="text-blue-400 dark:text-blue-400">📄 ChatMessage.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">sender ("user" | "ai"), content, timestamp, thinking, showThinking, inlineThinking, confirmation</span>
            </div>
            <div className="mt-2 text-xs text-yellow-600 dark:text-yellow-400">
              💡 Unified component - Use sender prop to switch between user and AI messages
            </div>
          </div>
          <ChatMessage
            sender="ai"
            content="This is the legacy ChatMessage component with all features combined."
            timestamp="2:50 PM"
            thinking={[
              {
                title: "Legacy Pattern",
                content: "This component combines all chat features in one - consider using granular components instead.",
                duration: "1s"
              }
            ]}
            showThinking={false}
          />
        </Card>

      </section>

      {/* Confirmation Dialog */}
      <section id="confirm-dialog" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Confirmation Dialog</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3">
            <span className="text-blue-400 dark:text-blue-400">📄 ConfirmDialog.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">isOpen, onClose, onConfirm, title, message, confirmText, cancelText, variant, icon</span>
          </div>
        </div>
        <Card>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Modal confirmation dialogs for critical actions
            </p>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowConfirmDialog(true)}
                className="gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete Item
              </Button>
            </div>
          </div>
        </Card>
      </section>

      </div>

      {/* ========== LAYOUT COMPONENTS ========== */}
      <div className="space-y-8">
        <div className="border-l-4 border-primary pl-4">
          <h2 className="text-2xl font-bold mb-1 dark:text-gray-100">Layout Components</h2>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Split views, modals, and complex layouts
          </p>
        </div>

      {/* Split View with Lazy Load List & Tree */}
      <section id="split-view" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Split View with Lazy Load List & Tree</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3 mb-2">
            <span className="text-blue-400 dark:text-blue-400">📄 SplitView.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">leftWidth, leftPanel, rightPanel</span>
          </div>
        </div>
        <Card className="p-0">
          <div className="p-6 border-b border-border dark:border-[#2a2a2a]">
            <div className="flex gap-3 flex-wrap">
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="gap-2"
                >
                  <List className="w-4 h-4" />
                  Lazy Load List
                </Button>
                <Button
                  variant={viewMode === 'tree' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setViewMode('tree')}
                  className="gap-2"
                >
                  <Folder className="w-4 h-4" />
                  Lazy Load Tree
                </Button>
              </div>
              <div className="border-l border-border dark:border-[#2a2a2a] mx-2" />
              <div className="flex gap-2">
                <Button size="sm" onClick={() => openModal('form')}>
                  Open Form Modal
                </Button>
                <Button size="sm" onClick={() => openModal('table')}>
                  Open Table Modal
                </Button>
                <Button size="sm" onClick={() => openModal('view')}>
                  Open View Modal
                </Button>
              </div>
            </div>
          </div>
          <div className="h-[500px]">
            <SplitView
              leftWidth={35}
              leftPanel={
                viewMode === 'list' ? (
                  <LazyLoadList
                    items={listItems}
                    renderItem={(item, isSelected) => (
                      <div className="p-4">
                        <div className="font-medium dark:text-gray-200">{item.title}</div>
                        <div className="text-sm text-muted-foreground dark:text-gray-400 mt-1">{item.description}</div>
                        <div className="text-xs text-primary mt-2">{item.category}</div>
                      </div>
                    )}
                    onItemClick={setSelectedItem}
                    selectedId={selectedItem?.id}
                    searchable={true}
                    itemHeight={90}
                  />
                ) : (
                  <LazyLoadTree
                    nodes={treeNodes}
                    onNodeClick={setSelectedItem}
                    selectedId={selectedItem?.id}
                  />
                )
              }
              rightPanel={
                <div className="p-6 h-full">
                  <TabbedFormView tabs={tabs} />
                </div>
              }
            />
          </div>
        </Card>
      </section>

      </div>

      {/* ========== FILTER & SEARCH COMPONENTS ========== */}
      <div className="space-y-8">
        <div className="border-l-4 border-primary pl-4">
          <h2 className="text-2xl font-bold mb-1 dark:text-gray-100">Filter & Search Components</h2>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Advanced filtering with inline dropdowns, tree modals, and cascading filters
          </p>
        </div>

      {/* Filter Bar */}
      <section id="inline-filter-bar" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Filter Bar</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3">
            <span className="text-blue-400 dark:text-blue-400">📄 filters/InlineFilterBar.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">title, filters, searchValue, onSearchChange, searchPlaceholder, showResultCount, resultCount, actions</span>
          </div>
          <div className="flex gap-3 mt-2">
            <span className="text-blue-400 dark:text-blue-400">📄 selectors/TreeSelectField.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">nodes, value, onChange, label, placeholder, multiSelect, selectedValues, onMultiChange</span>
          </div>
        </div>
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

        <Card className="p-6">
          <h3 className="text-xl font-semibold dark:text-gray-100 mb-4">Advanced: Tree Modal + Cascading Filters</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Departments Multi-Select Field */}
            <TreeSelectField
              nodes={departmentNodes}
              value={null}
              onChange={() => {}}
              multiSelect={true}
              selectedValues={selectedDepartments}
              onMultiChange={handleDepartmentChange}
              label="Departments"
              placeholder="Select departments..."
            />

            {/* Cascading Project Filter */}
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">Project</label>
              <select
                value={selectedProject || 'all'}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="all">All Projects</option>
                {projectOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-4 bg-secondary/30 dark:bg-[#0f0f0f] border border-border dark:border-[#2a2a2a] rounded-lg">
            <div className="text-sm space-y-2">
              <p className="dark:text-gray-200">
                <strong>Selected Departments:</strong>{' '}
                {selectedDepartments.length > 0 ? getDepartmentLabels() : 'None (pre-loaded with Frontend & Backend)'}
              </p>
              <p className="dark:text-gray-200">
                <strong>Available Projects:</strong> {projectOptions.length} {projectOptions.length > 0 && `(auto-loaded based on departments)`}
              </p>
              <p className="text-xs text-muted-foreground dark:text-gray-400 mt-3">
                💡 Features: Tree modal with async loading, pre-selected values (Frontend & Backend teams), and cascading project filter that updates based on department selection.
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* Draggable Table */}
      <section id="draggable-table" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Draggable & Resizable Table</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3 mb-2">
            <span className="text-blue-400 dark:text-blue-400">📄 Table.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Feature Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">draggableRows={true}, resizableColumns={true}, storageKey, onRowContextMenu</span>
          </div>
          <div className="ml-4 text-xs text-muted-foreground dark:text-gray-400">
            💡 Same Table.tsx component with draggable/resizable features enabled via props
          </div>
        </div>
        <Card className="p-0 overflow-hidden">
          <InlineFilterBar
            title="Draggable & Resizable Table"
            filters={[
              {
                id: 'role-draggable',
                label: 'Role',
                value: 'all',
                onChange: () => {},
                options: [
                  { value: 'all', label: 'All Roles' },
                  { value: 'admin', label: 'Admin' },
                  { value: 'editor', label: 'Editor' },
                  { value: 'viewer', label: 'Viewer' },
                ],
              },
              {
                id: 'dept-draggable',
                label: 'Department',
                value: 'all',
                onChange: () => {},
                options: [
                  { value: 'all', label: 'All Departments' },
                  { value: 'engineering', label: 'Engineering' },
                  { value: 'sales', label: 'Sales' },
                  { value: 'marketing', label: 'Marketing' },
                ],
              },
            ]}
            searchValue=""
            onSearchChange={() => {}}
            searchPlaceholder="Search users..."
          />
          <div className="p-6">
            <DraggableTable
              columns={draggableTableColumns}
              data={draggableTableData}
              rowKey={(row) => row.id}
              actions={draggableTableActions}
              storageKey="showcase-table-state"
              draggableRows={true}
              resizableColumns={true}
            />
          </div>
        </Card>
      </section>

      </div>

      {/* ========== SELECTION COMPONENTS ========== */}
      <div className="space-y-8">
        <div className="border-l-4 border-primary pl-4">
          <h2 className="text-2xl font-bold mb-1 dark:text-gray-100">Selection Components</h2>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Tree and table selectors with single/multi-select and hierarchical selection
          </p>
        </div>

      {/* Tree Selectors */}
      <section id="tree-selectors" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Tree Selectors</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3 mb-2">
            <span className="text-blue-400 dark:text-blue-400">📄 selectors/TreeSelect.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">nodes, value, onChange, label, placeholder, multiSelect, selectedValues, onMultiChange, maxSelections, modalMode</span>
          </div>
        </div>

          <div className="ml-4 mt-3 pt-3 border-t border-border dark:border-[#2a2a2a]">
            <div className="text-yellow-400 dark:text-yellow-400 text-xs mb-1">Variants (via props):</div>
            <div className="ml-2 text-muted-foreground dark:text-gray-400">
              <div>• Single select inline: multiSelect={false}, modalMode={false}</div>
              <div>• Multi select inline: multiSelect={true}, modalMode={false}</div>
              <div>• Multi select modal: multiSelect={true}, modalMode={true}</div>
            </div>
          </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <h3 className="font-medium mb-4 dark:text-gray-100">Single Select Tree</h3>
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
            <h3 className="font-medium mb-4 dark:text-gray-100">Multi Select Tree</h3>
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

          <Card>
            <h3 className="font-medium mb-4 dark:text-gray-100">Multi Select Field (Modal)</h3>
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Opens a popup modal for multi-selection with checkboxes.
              </p>
              <TreeSelectField
                nodes={treeNodes}
                value={null}
                onChange={() => {}}
                multiSelect={true}
                selectedValues={selectedModalNodes}
                onMultiChange={(ids, nodes) => {
                  setSelectedModalNodes(ids);
                  showToast('success', `Selected ${ids.length} item(s)`);
                }}
                label="Select Resources"
                placeholder="Click to select..."
              />
            </div>
          </Card>
        </div>
      </section>

      {/* Table Selectors */}
      <section id="table-selectors" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Table Selectors</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3 mb-2">
            <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 selectors/TableSelector.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">isOpen, onClose, columns, data, rowKey, value, onChange, title</span>
          </div>
          <div className="flex gap-3 mb-2">
            <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 selectors/TableMultiSelector.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">isOpen, onClose, columns, data, rowKey, value, onChange, title, maxSelections</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-medium mb-4 dark:text-gray-100">Single Select Table</h3>
            <Button onClick={() => setShowTableSelector(true)}>
              Open Table Selector
            </Button>
            {selectedRow && (
              <p className="text-sm text-muted-foreground dark:text-gray-400 mt-2">
                Selected: {selectorTableData.find(r => r.id === selectedRow)?.name}
              </p>
            )}
          </Card>

          <Card>
            <h3 className="font-medium mb-4 dark:text-gray-100">Multi Select Table</h3>
            <Button onClick={() => setShowTableMultiSelector(true)}>
              Open Multi-Select Table
            </Button>
            {selectedRows.length > 0 && (
              <p className="text-sm text-muted-foreground dark:text-gray-400 mt-2">
                Selected: {selectedRows.length} row(s)
              </p>
            )}
          </Card>
        </div>
      </section>

      </div>

      {/* ========== FORM & INPUT COMPONENTS ========== */}
      <div className="space-y-8">
        <div className="border-l-4 border-primary pl-4">
          <h2 className="text-2xl font-bold mb-1 dark:text-gray-100">Form & Input Components</h2>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Text inputs, markdown editors, file uploaders, and form fields
          </p>
        </div>

      {/* Markdown Editor */}
      <section id="markdown-editor" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Markdown Editor</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3">
            <span className="text-blue-400 dark:text-blue-400">📄 editors/MarkdownEditor.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">value, onChange, placeholder, height</span>
          </div>
        </div>
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
      <section id="file-upload" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">File Uploader</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="text-primary mb-1">📁 upload/</div>
          <div className="ml-4 flex gap-3">
            <span className="text-blue-400 dark:text-blue-400">├─ 📄 FileUploader.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">onUpload, accept, maxSize, maxFiles, multiple</span>
          </div>
          <div className="ml-4 flex gap-3 mt-1">
            <span className="text-blue-400 dark:text-blue-400">└─ 📄 FileViewer.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">file, onClose</span>
          </div>
        </div>
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
      <section id="realtime-table" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Realtime Table</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3 mb-2">
            <span className="text-blue-400 dark:text-blue-400">📄 Table.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Feature Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">realtime={true}, onFetchData, updateInterval, maxRows, highlightChanges</span>
          </div>
          <div className="ml-4 text-xs text-muted-foreground dark:text-gray-400">
            💡 Same Table.tsx component with real-time updates enabled via props
          </div>
        </div>
        <Card className="p-0 overflow-hidden">
          <InlineFilterBar
            title="Auto-Updating Table"
            filters={[
              {
                id: 'status-realtime',
                label: 'Status',
                value: 'all',
                onChange: () => {},
                options: [
                  { value: 'all', label: 'All Status' },
                  { value: 'active', label: 'Active' },
                  { value: 'inactive', label: 'Inactive' },
                ],
              },
            ]}
            searchValue=""
            onSearchChange={() => {}}
            searchPlaceholder="Search users..."
          />
          <div className="border-t border-border dark:border-[#2a2a2a] bg-secondary/30 dark:bg-[#0f0f0f] p-3">
            <p className="text-xs text-muted-foreground dark:text-gray-400">
              ⚡ Refreshes every 3 seconds with highlighted changes
            </p>
          </div>
          <RealtimeTable
            columns={realtimeColumns}
            initialData={selectorTableData.slice(0, 10)}
            rowKey={(row) => row.id}
            onFetchData={fetchRealtimeData}
            updateInterval={3000}
            maxRows={10}
            highlightChanges
          />
        </Card>
      </section>

      {/* LazyLoadList with Multi-Select */}
      <section id="lazy-load-list" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">LazyLoadList with Multi-Select</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3 mb-2">
            <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 LazyLoadList.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">items, renderItem, onLoadMore, loading, hasMore, searchTerm, multiSelect, selectedItems, onSelectionChange</span>
          </div>
        </div>
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium dark:text-gray-100">Document List</h3>
            <span className="text-sm text-muted-foreground dark:text-gray-400">
              {selectedListItems.length} selected
            </span>
          </div>
          <div className="border border-border dark:border-[#2a2a2a] rounded-lg overflow-hidden">
            <LazyLoadList
              items={listItems.slice(0, 20).map((item, i) => ({
                ...item,
                subtitle: `Updated ${i + 1} days ago`,
                status: ['Active', 'Draft', 'Archived'][i % 3],
              }))}
              renderItem={(item) => (
                <div className="py-3 px-4">
                  <div className="font-medium dark:text-gray-200">{item.title}</div>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">{(item as any).subtitle}</div>
                </div>
              )}
              onItemClick={() => {}}
              multiSelect
              selectedIds={selectedListItems}
              onSelectionChange={setSelectedListItems}
              itemHeight={70}
            />
          </div>
        </Card>
      </section>

      {/* TreeSelectField */}
      <section id="tree-select-fields" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Tree Select Fields</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3">
            <span className="text-blue-400 dark:text-blue-400">📄 selectors/TreeSelectField.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">nodes, value, onChange, label, placeholder, multiSelect, selectedValues, onMultiChange</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <h3 className="font-medium mb-4 dark:text-gray-100">Single Select Field</h3>
            <TreeSelectField
              nodes={treeNodes}
              value={selectedNode}
              onChange={(id, node) => {
                setSelectedNode(id);
                if (node) showToast('info', `Selected: ${node.label}`);
              }}
              placeholder="Select department..."
            />
          </Card>

          <Card>
            <h3 className="font-medium mb-4 dark:text-gray-100">Multi Select Field</h3>
            <TreeSelectField
              nodes={treeNodes}
              value={null}
              onChange={() => {}}
              placeholder="Select team..."
              multiSelect
              selectedValues={selectedNodes}
              onMultiChange={(ids) => setSelectedNodes(ids)}
            />
          </Card>
        </div>
      </section>

      </div>

      {/* ========== INTERACTIVE COMPONENTS ========== */}
      <div className="space-y-8">
        <div className="border-l-4 border-primary pl-4">
          <h2 className="text-2xl font-bold mb-1 dark:text-gray-100">Interactive Components</h2>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Chat messages, context menus, and interactive UI elements
          </p>
        </div>

      {/* Context Menu */}
      <section id="context-menu" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Context Menu</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3">
            <span className="text-blue-400 dark:text-blue-400">📄 ContextMenu.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Hook:</span>
            <span className="text-muted-foreground dark:text-gray-400">useContextMenu(config) → Returns: handleContextMenu, ContextMenuComponent</span>
          </div>
          <div className="ml-4 flex gap-3 mt-1">
            <span className="text-blue-400 dark:text-blue-400">└─ Config: getMenuItems(item)</span>
            <span className="text-orange-500 dark:text-orange-400">Returns:</span>
            <span className="text-muted-foreground dark:text-gray-400">Array of menu items with props: label, icon, onClick, variant, divider</span>
          </div>
        </div>
        <Card>
          <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
            Right-click on tree nodes or table rows to open context menus with dynamic actions
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-4 dark:text-gray-100">Tree with Context Menu</h3>
              <div className="border border-border dark:border-[#2a2a2a] rounded-lg overflow-hidden h-[300px]">
                <LazyLoadTree
                  nodes={treeNodes}
                  onNodeClick={setSelectedItem}
                  selectedId={selectedItem?.id}
                  onContextMenu={treeContextMenu.handleContextMenu}
                />
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-4 dark:text-gray-100">Table with Context Menu</h3>
              <div className="border border-border dark:border-[#2a2a2a] rounded-lg overflow-hidden">
                <DraggableTable
                  columns={draggableTableColumns.slice(0, 3)}
                  data={draggableTableData.slice(0, 5)}
                  rowKey={(row) => row.id}
                  storageKey="context-menu-table"
                  onRowContextMenu={tableContextMenu.handleContextMenu}
                />
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Input Components */}
      <section id="input-components" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Input Components</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3">
            <span className="text-blue-400 dark:text-blue-400">📄 ui/Input.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">label, placeholder, helperText, required, error, variant ("default" | "search"), showClearButton, icon</span>
          </div>
        </div>
        <Card>
          <div className="space-y-4 max-w-2xl">
            <Input
              label="Standard Input"
              placeholder="Enter text..."
            />

            <Input
              label="With Helper Text"
              placeholder="Email address"
              helperText="We'll never share your email"
            />

            <Input
              label="Required Field"
              placeholder="Username"
              required
            />

            <Input
              label="With Error"
              placeholder="Password"
              error="Password is too weak"
            />

            <Input
              variant="search"
              placeholder="Search..."
              showClearButton
            />

            <Input
              label="With Icon"
              placeholder="Search users..."
              icon={<User className="w-4 h-4 text-muted-foreground dark:text-gray-400" />}
            />
          </div>
        </Card>
      </section>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={() => setShowConfirmDialog(false)}
        onConfirm={() => {
          showToast('success', 'Item deleted successfully');
          setShowConfirmDialog(false);
        }}
        title="Delete this item?"
        message="This action cannot be undone. The item will be permanently deleted from your workspace."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        icon={<Trash2 className="w-6 h-6" />}
      />
      </div>

      {/* Modals */}
      <section id="modal" className="space-y-4">
        <h3 className="text-xl font-semibold dark:text-gray-100">Modal Component</h3>
        <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
          <div className="flex gap-3 mb-2">
            <span className="text-blue-400 dark:text-blue-400">📄 Modal.tsx</span>
            <span className="text-orange-500 dark:text-orange-400">Props:</span>
            <span className="text-muted-foreground dark:text-gray-400">isOpen, onClose, title, children, size ("sm" | "md" | "lg" | "xl"), footer</span>
          </div>
        </div>
        <Card>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Modals are triggered by button clicks in the Split View section above
          </p>
        </Card>
      </section>

      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={
          modalContent === 'form'
            ? 'Form in Modal'
            : modalContent === 'table'
            ? 'Table in Modal'
            : 'View in Modal'
        }
        size={modalContent === 'table' ? 'xl' : 'md'}
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button onClick={() => {
              showToast('success', 'Action completed');
              setShowModal(false);
            }}>
              Confirm
            </Button>
          </div>
        }
      >
        {modalContent === 'form' && (
          <div className="space-y-4">
            <h3 className="font-semibold mb-4 dark:text-gray-100">Cascading Form Example</h3>
            <CascadingFormExample onSubmit={(data) => console.log('Form data:', data)} />
          </div>
        )}

        {modalContent === 'table' && (
          <DraggableTable
            columns={draggableTableColumns}
            data={draggableTableData}
            rowKey={(row) => row.id}
            actions={draggableTableActions}
            storageKey="modal-table-state"
            draggableRows={true}
            resizableColumns={true}
          />
        )}

        {modalContent === 'view' && (
          <div className="space-y-4">
            <h3 className="font-semibold dark:text-gray-100">Custom View Content</h3>
            <p className="text-muted-foreground dark:text-gray-400">
              This demonstrates opening any custom view content in a modal. You can include charts, forms, tables, or any other components.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-4 border border-border dark:border-[#2a2a2a] bg-secondary/30 dark:bg-[#2a2a2a]/30">
                  <div className="font-medium mb-2 dark:text-gray-200">Metric {i}</div>
                  <div className="text-2xl font-bold text-primary">{Math.floor(Math.random() * 1000)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      {/* Table Selector Modals */}
      <TableSelector
        isOpen={showTableSelector}
        onClose={() => setShowTableSelector(false)}
        columns={selectorTableColumns}
        data={selectorTableData}
        rowKey={(row) => row.id}
        value={selectedRow}
        onChange={(key) => setSelectedRow(key)}
        title="Select a User"
      />

      <TableMultiSelector
        isOpen={showTableMultiSelector}
        onClose={() => setShowTableMultiSelector(false)}
        columns={selectorTableColumns}
        data={selectorTableData}
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


      {/* ========== AI DASHBOARD COMPONENTS ========== */}
      <div className="space-y-8">
        <div className="border-l-4 border-primary pl-4">
          <h2 className="text-2xl font-bold mb-1 dark:text-gray-100">AI Dashboard Components (UnifiedChat)</h2>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Components for building AI-powered chat interfaces with file attachments, thinking visualization, and intelligence controls
          </p>
        </div>

        {/* FileAttachmentManager */}
        <section id="file-attachment" className="space-y-4">
          <h3 className="text-xl font-semibold dark:text-gray-100">FileAttachmentManager Component</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3 mb-2">
              <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 FileAttachmentManager.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">isOpen, onClose, onAttach, existingAttachments</span>
            </div>
          </div>
          <Card>
            <div className="space-y-4">
              <Button onClick={() => setShowFileManager(true)}>
                Open File Attachment Manager
              </Button>
              {fileAttachments.length > 0 && (
                <div className="p-4 bg-secondary/20 dark:bg-[#0f0f0f] rounded-lg border border-border dark:border-[#2a2a2a]">
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    <strong className="text-gray-900 dark:text-gray-200">Attached Files:</strong> {fileAttachments.length}
                  </p>
                </div>
              )}
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Modal for uploading and managing file attachments. Supports drag-and-drop, image previews, and file removal. Used in UnifiedChat for attaching files to messages.
              </p>
            </div>
          </Card>
          <FileAttachmentManager
            isOpen={showFileManager}
            onClose={() => setShowFileManager(false)}
            onAttach={(files) => {
              setFileAttachments(files);
              showToast('success', `${files.length} file(s) attached`);
            }}
            existingAttachments={fileAttachments}
          />
        </section>

        {/* ActivityPanel */}
        <section id="activity-panel" className="space-y-4">
          <h3 className="text-xl font-semibold dark:text-gray-100">ActivityPanel Component</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3 mb-2">
              <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 ActivityPanel.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">isOpen, onClose, duration (number), steps (ThinkingStep[])</span>
            </div>
            <div className="ml-4 mt-2 text-muted-foreground dark:text-gray-400 text-xs">
              ThinkingStep: {`{ type: "thinking" | "code", content: string, language?: string }`}
            </div>
          </div>
          <Card>
            <div className="space-y-4">
              <Button onClick={() => setShowActivityPanel(true)}>
                Open Activity Panel (AI Thinking)
              </Button>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Side panel displaying AI thinking process with code blocks and reasoning steps. Shows duration and allows copying code snippets. Used in UnifiedChat to visualize AI's reasoning.
              </p>
            </div>
          </Card>
        </section>

        {/* IntelligenceModal */}
        <section id="intelligence-modal" className="space-y-4">
          <h3 className="text-xl font-semibold dark:text-gray-100">IntelligenceModal Component</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3 mb-2">
              <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 IntelligenceModal.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">isOpen, onClose</span>
            </div>
          </div>
          <Card>
            <div className="space-y-4">
              <Button onClick={() => setShowIntelligenceModal(true)}>
                Open Intelligence Settings
              </Button>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Modal for selecting AI model and mode (Standard, Extended, Creative). Includes configuration options for thinking time and depth. Used in UnifiedChat for AI intelligence settings.
              </p>
            </div>
          </Card>
          <IntelligenceModal
            isOpen={showIntelligenceModal}
            onClose={() => setShowIntelligenceModal(false)}
          />
        </section>

        {/* InlineConfirmation */}
        <section id="inline-confirmation" className="space-y-4">
          <h3 className="text-xl font-semibold dark:text-gray-100">InlineConfirmation Component</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3 mb-2">
              <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 InlineConfirmation.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">message, onConfirm, onCancel</span>
            </div>
          </div>
          <Card>
            <div className="space-y-4">
              <Button onClick={() => setShowInlineConfirm(!showInlineConfirm)}>
                Toggle Inline Confirmation
              </Button>
              {showInlineConfirm && (
                <InlineConfirmation
                  message="Are you sure you want to delete this conversation? This action cannot be undone."
                  onConfirm={() => {
                    showToast('success', 'Confirmed');
                    setShowInlineConfirm(false);
                  }}
                  onCancel={() => {
                    showToast('info', 'Cancelled');
                    setShowInlineConfirm(false);
                  }}
                />
              )}
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Yellow warning box with confirm/cancel buttons for inline confirmations. Used in UnifiedChat for confirming destructive actions within the chat flow.
              </p>
            </div>
          </Card>
        </section>

        {/* Chat UI Patterns */}
        <section id="chat-patterns" className="space-y-4">
          <h3 className="text-xl font-semibold dark:text-gray-100">Chat UI Patterns from UnifiedChat</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="text-purple-400 dark:text-purple-400 mb-2">📁 patterns/ & chat/</div>
            <div className="ml-4 space-y-1">
              <div className="flex gap-3">
                <span className="text-blue-400 dark:text-blue-400">├─ 📄 ChatEmptyState.tsx</span>
                <span className="text-orange-500 dark:text-orange-400">Props:</span>
                <span className="text-muted-foreground dark:text-gray-400">onSuggestionClick, onSend</span>
              </div>
              <div className="flex gap-3">
                <span className="text-blue-400 dark:text-blue-400">├─ 📄 ChatMessageSender.tsx</span>
                <span className="text-orange-500 dark:text-orange-400">Props:</span>
                <span className="text-muted-foreground dark:text-gray-400">onSend, onModeClick, onAttachClick, slashCommands</span>
              </div>
              <div className="ml-6 text-xs text-muted-foreground dark:text-gray-500 mt-1">
                SlashCommand: {`{ command, subcommand?, description, example? }`}
              </div>
              <div className="flex gap-3">
                <span className="text-blue-400 dark:text-blue-400">└─ 📄 ChatMessage.tsx</span>
                <span className="text-orange-500 dark:text-orange-400">Props:</span>
                <span className="text-muted-foreground dark:text-gray-400">sender, content, timestamp, thinking, thinkingDuration, onThinkingClick, confirmation, dashboard</span>
              </div>
            </div>
          </div>

          <Card>
            <h4 className="text-lg font-semibold mb-4 dark:text-gray-200">1. Chat Empty State</h4>
            <ChatEmptyState
              onSuggestionClick={(suggestion) => showToast('info', `Clicked: ${suggestion}`)}
            />
          </Card>

          <Card>
            <h4 className="text-lg font-semibold mb-4 dark:text-gray-200">2. Chat Message Sender (with Slash Commands)</h4>
            <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
              Type <code className="px-1.5 py-0.5 bg-secondary dark:bg-[#2a2a2a] rounded text-primary">/</code> to see available commands. Use arrow keys to navigate and Tab/Enter to select.
            </p>
            <div className="flex justify-center py-6">
              <ChatMessageSender
                onSend={(msg) => showToast('success', `Sent: ${msg}`)}
                onModeClick={() => showToast('info', 'Mode selector clicked')}
                onAttachClick={() => showToast('info', 'Attach files clicked')}
                slashCommands={[
                  {
                    command: 'workflow',
                    subcommand: 'create',
                    description: 'Create a new workflow',
                    example: '/workflow create "Customer Onboarding"'
                  },
                  {
                    command: 'workflow',
                    subcommand: 'list',
                    description: 'List all workflows',
                    example: '/workflow list'
                  },
                  {
                    command: 'workflow',
                    subcommand: 'delete',
                    description: 'Delete a workflow',
                    example: '/workflow delete "workflow-name"'
                  },
                  {
                    command: 'task',
                    subcommand: 'create',
                    description: 'Create a new task',
                    example: '/task create "Review documents"'
                  },
                  {
                    command: 'task',
                    subcommand: 'list',
                    description: 'List all tasks',
                    example: '/task list'
                  },
                  {
                    command: 'help',
                    description: 'Show help information',
                    example: '/help'
                  },
                  {
                    command: 'clear',
                    description: 'Clear chat history',
                    example: '/clear'
                  },
                ]}
              />
            </div>
          </Card>

          <Card>
            <h4 className="text-lg font-semibold mb-4 dark:text-gray-200">3. User Message</h4>
            <div className="space-y-4">
              <ChatMessage
                sender="user"
                content="Can you create a dashboard showing our key metrics?"
                timestamp="2:45 PM"
              />
              <ChatMessage
                sender="user"
                content="Please add the Q4 sales data"
                timestamp="2:47 PM"
              />
            </div>
          </Card>

          <Card>
            <h4 className="text-lg font-semibold mb-4 dark:text-gray-200">4. AI Message (Basic)</h4>
            <ChatMessage
              sender="ai"
              content="I'll create a comprehensive dashboard for you with your key performance metrics including revenue, active users, conversion rates, and system health."
              timestamp="2:46 PM"
            />
          </Card>

          <Card>
            <h4 className="text-lg font-semibold mb-4 dark:text-gray-200">5. AI Message with Thinking</h4>
            <ChatMessage
              sender="ai"
              content="Based on my analysis, here's the best approach for your dashboard."
              timestamp="2:46 PM"
              thinkingDuration={3.2}
              onThinkingClick={() => showToast('info', 'View thinking process')}
            />
          </Card>

          <Card>
            <h4 className="text-lg font-semibold mb-4 dark:text-gray-200">6. AI Message with Confirmation</h4>
            <ChatMessage
              sender="ai"
              content="I can add the Q4 sales data to your dashboard. This will replace the current sales metrics."
              timestamp="2:48 PM"
              confirmation={{
                question: "This will replace the current sales metrics. Do you want to proceed?",
                onConfirm: () => showToast('success', 'Confirmed action'),
                onCancel: () => showToast('info', 'Cancelled action'),
              }}
            />
          </Card>

          <Card>
            <h4 className="text-lg font-semibold mb-4 dark:text-gray-200">7. AI Message with Dashboard</h4>
            <ChatMessage
              sender="ai"
              content="Here's your Q4 performance dashboard:"
              timestamp="2:49 PM"
              dashboard={{
                title: "Q4 Performance Dashboard",
                metrics: [
                  { label: 'Revenue', value: '$124.5K', change: '+12.3%' },
                  { label: 'Active Users', value: '1,247', change: '+8.2%' },
                  { label: 'Conversion', value: '3.2%', change: '+0.5%' },
                  { label: 'Uptime', value: '99.9%', change: '+0.1%' },
                ],
              }}
            />
          </Card>

          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              <strong>💡 Complete Implementation:</strong> See <code className="text-primary">src/app/screens/UnifiedChat.tsx</code> for the full AI chat interface with all patterns integrated together.
            </p>
          </div>
        </section>
      </div>

      {/* ========== MONITORING & DASHBOARD COMPONENTS ========== */}
      <div className="space-y-8">
        <div className="border-l-4 border-primary pl-4">
          <h2 className="text-2xl font-bold mb-1 dark:text-gray-100">Monitoring & Dashboard Components</h2>
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Real-time monitoring components for Process Monitor and Admin Dashboard
          </p>
        </div>

        {/* Monitoring Core Components */}
        <section id="monitoring-core" className="space-y-4">
          <h3 className="text-xl font-semibold dark:text-gray-100">Monitoring Core Components</h3>
          <Card>
            <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs space-y-2">
              <div className="text-primary mb-2">📁 monitoring/</div>
              <div className="ml-4 flex gap-3">
                <span className="text-blue-400 dark:text-blue-400">├─ 📄 LiveBadge.tsx</span>
                <span className="text-orange-500 dark:text-orange-400">Props:</span>
                <span className="text-muted-foreground dark:text-gray-400">isLive, onClick</span>
              </div>
              <div className="ml-4 flex gap-3">
                <span className="text-blue-400 dark:text-blue-400">├─ 📄 SegmentedControl.tsx</span>
                <span className="text-orange-500 dark:text-orange-400">Props:</span>
                <span className="text-muted-foreground dark:text-gray-400">options, value, onChange</span>
              </div>
              <div className="ml-4 flex gap-3">
                <span className="text-blue-400 dark:text-blue-400">├─ 📄 MetricCard.tsx</span>
                <span className="text-orange-500 dark:text-orange-400">Props:</span>
                <span className="text-muted-foreground dark:text-gray-400">label, value, change, trend, sparklineData</span>
              </div>
              <div className="ml-4 flex gap-3">
                <span className="text-blue-400 dark:text-blue-400">├─ 📄 ToolbarButton.tsx</span>
                <span className="text-orange-500 dark:text-orange-400">Props:</span>
                <span className="text-muted-foreground dark:text-gray-400">icon, label, onClick, active, badge</span>
              </div>
              <div className="ml-4 flex gap-3">
                <span className="text-blue-400 dark:text-blue-400">├─ 📄 Panel.tsx</span>
                <span className="text-orange-500 dark:text-orange-400">Props:</span>
                <span className="text-muted-foreground dark:text-gray-400">children, className</span>
              </div>
              <div className="ml-4 flex gap-3">
                <span className="text-blue-400 dark:text-blue-400">├─ 📄 PanelHeader.tsx</span>
                <span className="text-orange-500 dark:text-orange-400">Props:</span>
                <span className="text-muted-foreground dark:text-gray-400">title, actions, rightContent</span>
              </div>
              <div className="ml-4 flex gap-3">
                <span className="text-blue-400 dark:text-blue-400">├─ 📄 SearchInput.tsx</span>
                <span className="text-orange-500 dark:text-orange-400">Props:</span>
                <span className="text-muted-foreground dark:text-gray-400">value, onChange, placeholder</span>
              </div>
              <div className="ml-4 flex gap-3">
                <span className="text-blue-400 dark:text-blue-400">├─ 📄 Legend.tsx</span>
                <span className="text-orange-500 dark:text-orange-400">Props:</span>
                <span className="text-muted-foreground dark:text-gray-400">items, onItemClick</span>
              </div>
              <div className="ml-4 flex gap-3">
                <span className="text-blue-400 dark:text-blue-400">├─ 📄 StatusDot.tsx</span>
                <span className="text-orange-500 dark:text-orange-400">Props:</span>
                <span className="text-muted-foreground dark:text-gray-400">status ("active" | "idle" | "error"), size</span>
              </div>
              <div className="ml-4 flex gap-3">
                <span className="text-blue-400 dark:text-blue-400">├─ 📄 Popover.tsx</span>
                <span className="text-orange-500 dark:text-orange-400">Props:</span>
                <span className="text-muted-foreground dark:text-gray-400">isOpen, onClose, anchorEl, children</span>
              </div>
              <div className="ml-4 flex gap-3">
                <span className="text-blue-400 dark:text-blue-400">├─ 📄 Toggle.tsx</span>
                <span className="text-orange-500 dark:text-orange-400">Props:</span>
                <span className="text-muted-foreground dark:text-gray-400">checked, onChange, label</span>
              </div>
              <div className="ml-4 flex gap-3">
                <span className="text-blue-400 dark:text-blue-400">├─ 📄 AlertItem.tsx</span>
                <span className="text-orange-500 dark:text-orange-400">Props:</span>
                <span className="text-muted-foreground dark:text-gray-400">alert (title, message, level), onDismiss</span>
              </div>
              <div className="ml-4 flex gap-3">
                <span className="text-blue-400 dark:text-blue-400">└─ 📄 SparklineChart.tsx</span>
                <span className="text-orange-500 dark:text-orange-400">Props:</span>
                <span className="text-muted-foreground dark:text-gray-400">data, width, height, color</span>
              </div>
            </div>

            <div className="p-4 bg-secondary/20 dark:bg-[#0f0f0f] rounded-lg border border-border dark:border-[#2a2a2a] mt-4">
              <p className="text-sm text-muted-foreground dark:text-gray-400 mb-2">
                <strong className="text-gray-900 dark:text-gray-200">Full Implementations:</strong>
              </p>
              <ul className="text-sm text-muted-foreground dark:text-gray-400 list-disc list-inside space-y-1">
                <li><code className="text-primary">src/app/screens/ProcessMonitor.tsx</code> - Real-time process monitoring</li>
                <li><code className="text-primary">src/app/screens/AdminDashboard.tsx</code> - Admin system dashboard</li>
              </ul>
            </div>
          </Card>
        </section>

        {/* Live Monitoring Showcases */}
        <section id="live-badge" className="space-y-4">
          <h3 className="text-xl font-semibold dark:text-gray-100">Live Badge Component</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3 mb-2">
              <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 monitoring/LiveBadge.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">isLive</span>
            </div>
          </div>
          <Card>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <LiveBadge isLive={isLive} />
                <Button
                  size="sm"
                  onClick={() => setIsLive(!isLive)}
                >
                  Toggle Status
                </Button>
              </div>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Used in ProcessMonitor and AdminDashboard to indicate real-time status. Automatically animates when live.
              </p>
            </div>
          </Card>
        </section>

        <section id="segmented-control" className="space-y-4">
          <h3 className="text-xl font-semibold dark:text-gray-100">Segmented Control Component</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3 mb-2">
              <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 monitoring/SegmentedControl.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">options, value, onChange</span>
            </div>
          </div>
          <Card>
            <div className="space-y-4">
              <SegmentedControl
                options={[
                  { value: 'overview', label: 'Overview' },
                  { value: 'processes', label: 'Processes' },
                  { value: 'metrics', label: 'Metrics' },
                  { value: 'alerts', label: 'Alerts' },
                ]}
                value={segmentedValue}
                onChange={setSegmentedValue}
              />
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Currently selected: <strong className="text-primary">{segmentedValue}</strong>
              </p>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Used in ProcessMonitor and AdminDashboard for view switching with smooth animations.
              </p>
            </div>
          </Card>
        </section>

        <section id="metric-card" className="space-y-4">
          <h3 className="text-xl font-semibold dark:text-gray-100">Metric Card Component</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3 mb-2">
              <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 monitoring/MetricCard.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">title, value, unit, sparkline</span>
            </div>
          </div>
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <MetricCard
                title="CPU Usage"
                value="42"
                unit="%"
                sparkline={{
                  data: [30, 35, 40, 38, 42, 45, 42],
                  color: '#3b82f6',
                }}
              />
              <MetricCard
                title="Memory"
                value="2.4"
                unit="GB"
                sparkline={{
                  data: [2.0, 2.1, 2.3, 2.2, 2.4, 2.5, 2.4],
                  color: '#8b5cf6',
                }}
              />
              <MetricCard
                title="Active Users"
                value="1,247"
                sparkline={{
                  data: [1100, 1150, 1200, 1180, 1220, 1240, 1247],
                  color: '#10b981',
                }}
              />
              <MetricCard
                title="Response Time"
                value="124"
                unit="ms"
                sparkline={{
                  data: [130, 125, 120, 122, 124, 123, 124],
                  color: '#f59e0b',
                }}
              />
              <MetricCard
                title="Error Rate"
                value="0.3"
                unit="%"
                sparkline={{
                  data: [0.5, 0.4, 0.3, 0.35, 0.3, 0.28, 0.3],
                  color: '#ef4444',
                }}
              />
              <MetricCard
                title="Requests"
                value="12.5k"
                sparkline={{
                  data: [10000, 11000, 11500, 12000, 12200, 12400, 12500],
                  color: '#06b6d4',
                }}
              />
            </div>
            <p className="text-sm text-muted-foreground dark:text-gray-400 mt-4">
              MetricCard displays real-time metrics with sparkline charts. Used extensively in ProcessMonitor and AdminDashboard for system health visualization.
            </p>
          </Card>
        </section>

        <section id="sparkline-chart" className="space-y-4">
          <h3 className="text-xl font-semibold dark:text-gray-100">SparklineChart Component</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3 mb-2">
              <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 monitoring/SparklineChart.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">data, variant, width, height</span>
            </div>
          </div>
          <Card>
            <div className="flex flex-wrap gap-6">
              <div className="w-24">
                <h4 className="text-xs font-semibold mb-2 dark:text-gray-200">Blue</h4>
                <SparklineChart data={[30, 35, 40, 38, 42, 45, 42, 40, 38, 35, 32, 30]} variant="blue" />
              </div>
              <div className="w-24">
                <h4 className="text-xs font-semibold mb-2 dark:text-gray-200">Green</h4>
                <SparklineChart data={[20, 25, 30, 28, 32, 35, 33, 31, 29, 27, 25, 23]} variant="green" />
              </div>
              <div className="w-24">
                <h4 className="text-xs font-semibold mb-2 dark:text-gray-200">Purple</h4>
                <SparklineChart data={[15, 18, 22, 25, 23, 27, 30, 28, 26, 24, 22, 20]} variant="purple" />
              </div>
              <div className="w-24">
                <h4 className="text-xs font-semibold mb-2 dark:text-gray-200">Cyan</h4>
                <SparklineChart data={[40, 42, 45, 48, 50, 52, 55, 53, 51, 49, 47, 45]} variant="cyan" />
              </div>
              <div className="w-24">
                <h4 className="text-xs font-semibold mb-2 dark:text-gray-200">Red</h4>
                <SparklineChart data={[60, 58, 55, 52, 50, 48, 45, 47, 49, 51, 53, 55]} variant="red" />
              </div>
            </div>
          </Card>
        </section>

        <section id="panel" className="space-y-4">
          <h3 className="text-xl font-semibold dark:text-gray-100">Panel Components</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs space-y-2">
            <div className="flex gap-3">
              <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 monitoring/Panel.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">header, children, footer, className</span>
            </div>
            <div className="flex gap-3">
              <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 monitoring/PanelHeader.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">title, subtitle, actions, className</span>
            </div>
          </div>
          <Card className="p-0">
            <Panel
              header={
                <PanelHeader
                  title="Process Monitor"
                  subtitle="Real-time system monitoring"
                  actions={
                    <>
                      <LiveBadge isLive={true} />
                      <ToolbarButton icon={<Settings className="w-4 h-4" />} label="Settings" />
                    </>
                  }
                />
              }
              footer={
                <Legend
                  items={[
                    { status: 'active', label: 'Active' },
                    { status: 'idle', label: 'Idle' },
                    { status: 'stopped', label: 'Stopped' },
                  ]}
                />
              }
            >
              <div className="p-6">
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  Panel provides a consistent container with header, body, and footer. Used in ProcessMonitor and AdminDashboard as main layout component.
                </p>
              </div>
            </Panel>
          </Card>
        </section>

        <section id="search-input" className="space-y-4">
          <h3 className="text-xl font-semibold dark:text-gray-100">SearchInput Component</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3 mb-2">
              <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 monitoring/SearchInput.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">value, onChange, placeholder, className</span>
            </div>
          </div>
          <Card>
            <div className="space-y-4">
              <SearchInput
                value={searchValue}
                onChange={setSearchValue}
                placeholder="Search processes..."
              />
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Current value: <strong className="text-primary">{searchValue || '(empty)'}</strong>
              </p>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                SearchInput provides a styled search field with icon. Used in ProcessMonitor and AdminDashboard for filtering.
              </p>
            </div>
          </Card>
        </section>

        <section id="status-dot" className="space-y-4">
          <h3 className="text-xl font-semibold dark:text-gray-100">StatusDot Component</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3 mb-2">
              <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 monitoring/StatusDot.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">status ("active" | "running" | "idle" | "sleeping" | "stopped" | "restricted" | "zombie" | "system" | "high"), label</span>
            </div>
          </div>
          <Card>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <StatusDot status="active" label="Active" />
                <StatusDot status="running" label="Running" />
                <StatusDot status="idle" label="Idle" />
                <StatusDot status="sleeping" label="Sleeping" />
                <StatusDot status="stopped" label="Stopped" />
                <StatusDot status="restricted" label="Restricted" />
                <StatusDot status="zombie" label="Zombie" />
                <StatusDot status="system" label="System" />
                <StatusDot status="high" label="High" />
              </div>
              <div className="flex gap-4 pt-4 border-t border-border dark:border-[#2a2a2a]">
                <span className="text-sm text-muted-foreground dark:text-gray-400">Dots without labels:</span>
                <StatusDot status="active" />
                <StatusDot status="idle" />
                <StatusDot status="stopped" />
                <StatusDot status="system" />
              </div>
              <p className="text-sm text-muted-foreground dark:text-gray-400 mt-4">
                StatusDot displays colored indicators for process/system states. Used in ProcessMonitor to show process status.
              </p>
            </div>
          </Card>
        </section>

        <section id="legend" className="space-y-4">
          <h3 className="text-xl font-semibold dark:text-gray-100">Legend Component</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3 mb-2">
              <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 monitoring/Legend.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">items (LegendItem[]), className</span>
            </div>
          </div>
          <Card className="p-0">
            <Legend
              items={[
                { status: 'active', label: 'Active Processes' },
                { status: 'idle', label: 'Idle Processes' },
                { status: 'stopped', label: 'Stopped Processes' },
                { status: 'system', label: 'System Processes' },
                { status: 'zombie', label: 'Zombie Processes' },
              ]}
            />
          </Card>
        </section>

        <section id="toggle" className="space-y-4">
          <h3 className="text-xl font-semibold dark:text-gray-100">Toggle Component</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3 mb-2">
              <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 monitoring/Toggle.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">checked, onChange, disabled</span>
            </div>
          </div>
          <Card>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Toggle checked={toggleChecked} onChange={setToggleChecked} />
                <span className="text-sm text-muted-foreground dark:text-gray-400">
                  Auto-refresh: <strong className="text-primary">{toggleChecked ? 'Enabled' : 'Disabled'}</strong>
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Toggle checked={false} onChange={() => {}} disabled />
                <span className="text-sm text-muted-foreground dark:text-gray-400">Disabled toggle</span>
              </div>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Toggle switch component for binary settings. Used in ProcessMonitor for auto-refresh and filter toggles.
              </p>
            </div>
          </Card>
        </section>

        <section id="alert-item" className="space-y-4">
          <h3 className="text-xl font-semibold dark:text-gray-100">AlertItem Component</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3 mb-2">
              <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 monitoring/AlertItem.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">alert ({`{ id, title, message, level: "INFO" | "WARN" | "ERROR" }`})</span>
            </div>
          </div>
          <Card>
            <div className="space-y-4">
              <AlertItem
                alert={{
                  id: '1',
                  title: 'System Update Available',
                  message: 'A new system update is ready to install. Please restart to apply changes.',
                  level: 'INFO',
                }}
              />
              <AlertItem
                alert={{
                  id: '2',
                  title: 'High Memory Usage',
                  message: 'Memory usage has exceeded 85%. Consider closing unused applications.',
                  level: 'WARN',
                }}
              />
              <AlertItem
                alert={{
                  id: '3',
                  title: 'Process Crashed',
                  message: 'The background service has stopped unexpectedly. Attempting to restart...',
                  level: 'ERROR',
                }}
              />
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                AlertItem displays system alerts with different severity levels. Used in AdminDashboard for system notifications.
              </p>
            </div>
          </Card>
        </section>

        <section id="toolbar-button" className="space-y-4">
          <h3 className="text-xl font-semibold dark:text-gray-100">ToolbarButton Component</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3 mb-2">
              <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 monitoring/ToolbarButton.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">icon, label, active, onClick, badge, variant ("default" | "warning" | "danger")</span>
            </div>
          </div>
          <Card>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-3">
                <ToolbarButton icon={<Download className="w-4 h-4" />} label="Export" />
                <ToolbarButton icon={<Settings className="w-4 h-4" />} label="Settings" active />
                <ToolbarButton icon={<Bell className="w-4 h-4" />} label="Alerts" badge={3} />
                <ToolbarButton icon={<AlertCircle className="w-4 h-4" />} label="Warning" variant="warning" />
                <ToolbarButton icon={<Trash2 className="w-4 h-4" />} label="Delete" variant="danger" />
              </div>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                ToolbarButton provides styled action buttons with icons, labels, and badges. Used in ProcessMonitor and AdminDashboard toolbars.
              </p>
            </div>
          </Card>
        </section>

        <section id="popover" className="space-y-4">
          <h3 className="text-xl font-semibold dark:text-gray-100">Popover Component</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs space-y-2">
            <div className="flex gap-3">
              <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 monitoring/Popover.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Exports:</span>
              <span className="text-muted-foreground dark:text-gray-400">Popover, PopoverSection, CheckRow, RadioRow, SettingRow</span>
            </div>
            <div className="ml-4 flex gap-3">
              <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">├─ Popover</span>
              <span className="text-muted-foreground dark:text-gray-400">isOpen, onClose, trigger, children, title, width</span>
            </div>
            <div className="ml-4 flex gap-3">
              <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">├─ CheckRow</span>
              <span className="text-muted-foreground dark:text-gray-400">label, checked, onChange, disabled, badge</span>
            </div>
            <div className="ml-4 flex gap-3">
              <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">└─ RadioRow</span>
              <span className="text-muted-foreground dark:text-gray-400">label, checked, onChange, name</span>
            </div>
          </div>
          <Card>
            <div className="space-y-4">
              <Button
                ref={(el) => {
                  if (el && !popoverTrigger) setPopoverTrigger(el);
                }}
                onClick={() => setShowPopover(!showPopover)}
              >
                Open Settings Popover
              </Button>
              <Popover
                isOpen={showPopover}
                onClose={() => setShowPopover(false)}
                trigger={popoverTrigger}
                title="Filter Settings"
              >
                <PopoverSection title="Display Options">
                  <CheckRow
                    label="Show system processes"
                    checked={popoverCheck1}
                    onChange={setPopoverCheck1}
                  />
                  <CheckRow
                    label="Show background tasks"
                    checked={popoverCheck2}
                    onChange={setPopoverCheck2}
                    badge="12"
                  />
                </PopoverSection>
                <PopoverSection title="Update Frequency">
                  <RadioRow
                    label="Every second"
                    checked={popoverRadio === 'option1'}
                    onChange={() => setPopoverRadio('option1')}
                    name="frequency"
                  />
                  <RadioRow
                    label="Every 5 seconds"
                    checked={popoverRadio === 'option2'}
                    onChange={() => setPopoverRadio('option2')}
                    name="frequency"
                  />
                  <RadioRow
                    label="Every 10 seconds"
                    checked={popoverRadio === 'option3'}
                    onChange={() => setPopoverRadio('option3')}
                    name="frequency"
                  />
                </PopoverSection>
                <PopoverSection title="Advanced">
                  <SettingRow label="Auto-scroll">
                    <Toggle checked={toggleChecked} onChange={setToggleChecked} />
                  </SettingRow>
                </PopoverSection>
              </Popover>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Popover provides dropdown panels with sections, checkboxes, radio buttons, and custom settings. Used in ProcessMonitor for filter and settings menus.
              </p>
            </div>
          </Card>
        </section>

        {/* Specific Popover Patterns from ProcessMonitor */}
        <section id="popover-patterns" className="space-y-4">
          <h3 className="text-xl font-semibold dark:text-gray-100">Popover Patterns - Filter, Columns, Alerts, Settings</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="text-purple-400 dark:text-purple-400 mb-2">📁 patterns/</div>
            <div className="ml-4 space-y-1">
              <div className="flex gap-3">
                <span className="text-blue-400 dark:text-blue-400">├─ 📄 FilterPopover.tsx</span>
                <span className="text-orange-500 dark:text-orange-400">Props:</span>
                <span className="text-muted-foreground dark:text-gray-400">onFiltersChange</span>
              </div>
              <div className="flex gap-3">
                <span className="text-blue-400 dark:text-blue-400">├─ 📄 ColumnsPopover.tsx</span>
                <span className="text-orange-500 dark:text-orange-400">Props:</span>
                <span className="text-muted-foreground dark:text-gray-400">onColumnsChange</span>
              </div>
              <div className="flex gap-3">
                <span className="text-blue-400 dark:text-blue-400">├─ 📄 AlertsPopover.tsx</span>
                <span className="text-orange-500 dark:text-orange-400">Props:</span>
                <span className="text-muted-foreground dark:text-gray-400">onAlertsAction</span>
              </div>
              <div className="flex gap-3">
                <span className="text-blue-400 dark:text-blue-400">└─ 📄 SettingsPopover.tsx</span>
                <span className="text-orange-500 dark:text-orange-400">Props:</span>
                <span className="text-muted-foreground dark:text-gray-400">onSettingsChange</span>
              </div>
            </div>
          </div>

          <Card>
            <h4 className="text-lg font-semibold mb-4 dark:text-gray-200">1. Filter Popover</h4>
            <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
              <strong className="text-gray-900 dark:text-gray-200">Used in ProcessMonitor</strong> - Combines multiple filter sections with checkboxes and input controls
            </p>
            <FilterPopover />
          </Card>

          <Card>
            <h4 className="text-lg font-semibold mb-4 dark:text-gray-200">2. Columns Popover</h4>
            <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
              <strong className="text-gray-900 dark:text-gray-200">Used in ProcessMonitor</strong> - Controls column visibility with disabled states for required columns
            </p>
            <ColumnsPopover />
          </Card>

          <Card>
            <h4 className="text-lg font-semibold mb-4 dark:text-gray-200">3. Alerts Popover</h4>
            <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
              <strong className="text-gray-900 dark:text-gray-200">Used in ProcessMonitor</strong> - Displays list of AlertItem components with batch actions
            </p>
            <AlertsPopover />
          </Card>

          <Card>
            <h4 className="text-lg font-semibold mb-4 dark:text-gray-200">4. Settings Popover</h4>
            <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
              <strong className="text-gray-900 dark:text-gray-200">Used in ProcessMonitor</strong> - Application settings with toggles, selects, and inputs
            </p>
            <SettingsPopover />
          </Card>

          <div className="p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-900 dark:text-blue-200">
              <strong>💡 Pattern Summary:</strong> All four popover patterns use the same base components (Popover, PopoverSection, CheckRow, RadioRow, SettingRow, Toggle) but compose them differently based on their purpose. This demonstrates the flexibility of the component system.
            </p>
          </div>
        </section>

        <section id="log-viewer" className="space-y-4">
          <h3 className="text-xl font-semibold dark:text-gray-100">LogViewer Component</h3>
          <div className="mb-4 p-3 bg-secondary/30 dark:bg-[#2a2a2a]/30 border border-border dark:border-[#2a2a2a] rounded-lg font-mono text-xs">
            <div className="flex gap-3 mb-2">
              <span className="text-blue-400 dark:text-blue-400 whitespace-nowrap">📄 LogViewer.tsx</span>
              <span className="text-orange-500 dark:text-orange-400">Props:</span>
              <span className="text-muted-foreground dark:text-gray-400">logs (LogEntry[]), title</span>
            </div>
            <div className="ml-4 mt-2 text-muted-foreground dark:text-gray-400 text-xs">
              LogEntry: {`{ id, timestamp, level: "info" | "warning" | "error" | "success", message }`}
            </div>
          </div>
          <Card className="p-0 overflow-hidden">
            <div className="h-[400px]">
              <LogViewer
                title="System Logs"
                logs={[
                  { id: '1', timestamp: '10:23:45', level: 'info', message: 'Application started successfully' },
                  { id: '2', timestamp: '10:23:46', level: 'info', message: 'Connected to database' },
                  { id: '3', timestamp: '10:23:48', level: 'success', message: 'User authentication initialized' },
                  { id: '4', timestamp: '10:24:02', level: 'warning', message: 'High memory usage detected (78%)' },
                  { id: '5', timestamp: '10:24:15', level: 'info', message: 'Processing batch job #1234' },
                  { id: '6', timestamp: '10:24:22', level: 'error', message: 'Failed to connect to external API: timeout' },
                  { id: '7', timestamp: '10:24:23', level: 'info', message: 'Retrying API connection...' },
                  { id: '8', timestamp: '10:24:25', level: 'success', message: 'API connection restored' },
                  { id: '9', timestamp: '10:24:30', level: 'info', message: 'Batch job #1234 completed successfully' },
                  { id: '10', timestamp: '10:24:45', level: 'warning', message: 'Cache miss rate above threshold (15%)' },
                  { id: '11', timestamp: '10:25:00', level: 'info', message: 'Background cleanup process started' },
                  { id: '12', timestamp: '10:25:15', level: 'success', message: 'Cleanup completed, freed 245MB' },
                ]}
              />
            </div>
          </Card>
        </section>
      </div>

      {/* Context Menus */}
      {treeContextMenu.ContextMenuComponent}
      {tableContextMenu.ContextMenuComponent}

      {/* Activity Panel */}
      {showActivityPanel && (
        <div className="fixed top-0 right-0 h-full z-50">
          <ActivityPanel
            isOpen={showActivityPanel}
            onClose={() => setShowActivityPanel(false)}
            duration={8}
            steps={[
              { type: 'thinking', content: 'Analyzing query parameters and determining the best approach...' },
              { type: 'code', content: 'const query = parseUserInput(message);\nconst intent = detectIntent(query);\nconst context = retrieveContext(intent);', language: 'JavaScript' },
              { type: 'thinking', content: 'Fetching relevant data from multiple sources including database and cache...' },
              { type: 'code', content: 'SELECT m.*, u.name\nFROM metrics m\nJOIN users u ON m.user_id = u.id\nWHERE m.date >= CURRENT_DATE - INTERVAL \'30 days\'\nORDER BY m.date DESC;', language: 'SQL' },
              { type: 'thinking', content: 'Processing and aggregating metrics for visualization...' },
              { type: 'code', content: 'const aggregated = metrics.reduce((acc, m) => {\n  acc[m.category] = (acc[m.category] || 0) + m.value;\n  return acc;\n}, {});', language: 'JavaScript' },
              { type: 'thinking', content: 'Generating dashboard layout and formatting response...' },
            ]}
          />
        </div>
      )}
    </div>
  );
}
```
