# UI Kit Screens Source Context

This file contains exact source snippets from the uploaded UI kit for the `screens` category.

## `process-monitoring-final/src/app/screens/CredentialsManager.tsx`

- Category: `screens`
- Bytes: `14873`
- SHA-256: `6252ceeb1507bd094b88b47f8c4a7e3f6c357d69128393c11d9aa124c5c70a2d`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `CredentialsManager.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState } from "react";
import { Key, Plus, Trash2, Eye, EyeOff, Copy, Users } from "lucide-react";
import { Button } from "../components/Button";
import { Modal } from "../components/Modal";
import { useToast } from "../components/Toast";
import { FilterBar, FilterConfig } from "../components/FilterBar";
import { Input } from "../components/ui/input";

interface Credential {
  id: string;
  name: string;
  type: 'api_key' | 'database' | 'service_account' | 'oauth';
  service: string;
  createdDate: string;
  lastUsed: string;
  assignedTo: string[];
  status: 'active' | 'expired' | 'revoked';
}

export function CredentialsManager() {
  const { showToast } = useToast();
  const [credentials, setCredentials] = useState<Credential[]>([
    {
      id: '1',
      name: 'Production API Key',
      type: 'api_key',
      service: 'AWS',
      createdDate: '2024-01-15',
      lastUsed: '2 hours ago',
      assignedTo: ['john.doe@company.com', 'jane.smith@company.com'],
      status: 'active',
    },
    {
      id: '2',
      name: 'Database Connection',
      type: 'database',
      service: 'PostgreSQL',
      createdDate: '2024-02-10',
      lastUsed: '5 minutes ago',
      assignedTo: ['bob.johnson@company.com'],
      status: 'active',
    },
    {
      id: '3',
      name: 'Stripe API Key',
      type: 'api_key',
      service: 'Stripe',
      createdDate: '2024-03-01',
      lastUsed: '1 day ago',
      assignedTo: ['alice.williams@company.com'],
      status: 'active',
    },
    {
      id: '4',
      name: 'Google Service Account',
      type: 'service_account',
      service: 'Google Cloud',
      createdDate: '2023-12-01',
      lastUsed: '1 week ago',
      assignedTo: [],
      status: 'expired',
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState<Credential | null>(null);
  const [revealedKeys, setRevealedKeys] = useState<Set<string>>(new Set());
  const [filteredData, setFilteredData] = useState(credentials);

  const filters: FilterConfig[] = [
    {
      id: 'type',
      label: 'Type',
      type: 'select',
      options: [
        { value: 'api_key', label: 'API Key' },
        { value: 'database', label: 'Database' },
        { value: 'service_account', label: 'Service Account' },
        { value: 'oauth', label: 'OAuth' },
      ],
    },
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'expired', label: 'Expired' },
        { value: 'revoked', label: 'Revoked' },
      ],
    },
    {
      id: 'service',
      label: 'Service',
      type: 'text',
      placeholder: 'Filter by service...',
    },
  ];

  const handleFilterChange = (filterValues: Record<string, any>) => {
    let filtered = credentials;

    if (filterValues.search) {
      filtered = filtered.filter(cred =>
        cred.name.toLowerCase().includes(filterValues.search.toLowerCase()) ||
        cred.service.toLowerCase().includes(filterValues.search.toLowerCase())
      );
    }

    if (filterValues.type) {
      filtered = filtered.filter(cred => cred.type === filterValues.type);
    }

    if (filterValues.status) {
      filtered = filtered.filter(cred => cred.status === filterValues.status);
    }

    if (filterValues.service) {
      filtered = filtered.filter(cred =>
        cred.service.toLowerCase().includes(filterValues.service.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const toggleReveal = (credId: string) => {
    const newRevealed = new Set(revealedKeys);
    if (newRevealed.has(credId)) {
      newRevealed.delete(credId);
    } else {
      newRevealed.add(credId);
    }
    setRevealedKeys(newRevealed);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast('success', 'Copied to clipboard');
  };

  const handleRevoke = (credId: string) => {
    setCredentials(credentials.map(c =>
      c.id === credId ? { ...c, status: 'revoked' as const } : c
    ));
    showToast('success', 'Credential revoked');
  };

  const handleDelete = (credId: string) => {
    setCredentials(credentials.filter(c => c.id !== credId));
    showToast('success', 'Credential deleted');
  };

  const handleAssignMembers = () => {
    showToast('success', 'Members assigned successfully');
    setShowAssignModal(false);
  };

  const typeLabels: Record<string, string> = {
    api_key: 'API Key',
    database: 'Database',
    service_account: 'Service Account',
    oauth: 'OAuth',
  };

  return (
    <div className="h-screen flex flex-col bg-secondary/30">
      {/* Header */}
      <div className="bg-white dark:bg-[#1a1a1a] border-b border-border dark:border-[#2a2a2a] px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 flex items-center justify-center">
                <Key className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold dark:text-gray-200">Credentials Manager</h1>
                <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                  Manage and allocate API keys and credentials
                </p>
              </div>
            </div>
            <Button onClick={() => setShowAddModal(true)} size="sm" className="gap-2">
              <Plus className="w-4 h-4" />
              Add Credential
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-3 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <FilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            showSearch={true}
            searchPlaceholder="Search credentials..."
          />
        </div>
      </div>

      {/* Credentials Table */}
      <div className="flex-1 overflow-auto px-4 pb-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-secondary/30 border-b border-border">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium dark:text-gray-200">Name</th>
                  <th className="px-4 py-3 text-left text-sm font-medium dark:text-gray-200">Type</th>
                  <th className="px-4 py-3 text-left text-sm font-medium dark:text-gray-200">Service</th>
                  <th className="px-4 py-3 text-left text-sm font-medium dark:text-gray-200">Key/Value</th>
                  <th className="px-4 py-3 text-left text-sm font-medium dark:text-gray-200">Assigned To</th>
                  <th className="px-4 py-3 text-left text-sm font-medium dark:text-gray-200">Status</th>
                  <th className="px-4 py-3 text-left text-sm font-medium dark:text-gray-200">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((cred) => (
                  <tr key={cred.id} className="border-b border-border hover:bg-secondary/30">
                    <td className="px-4 py-3">
                      <div className="font-medium dark:text-gray-200">{cred.name}</div>
                      <div className="text-xs text-muted-foreground">
                        Created {cred.createdDate}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{typeLabels[cred.type]}</td>
                    <td className="px-4 py-3 text-sm">{cred.service}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <code className="px-2 py-1 bg-secondary text-xs font-mono">
                          {revealedKeys.has(cred.id)
                            ? 'sk_live_51H...' + 'a'.repeat(20)
                            : '••••••••••••••••'}
                        </code>
                        <button
                          onClick={() => toggleReveal(cred.id)}
                          className="p-1 hover:bg-secondary transition-colors"
                          title={revealedKeys.has(cred.id) ? 'Hide' : 'Reveal'}
                        >
                          {revealedKeys.has(cred.id) ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                        <button
                          onClick={() => copyToClipboard('sk_live_51H...')}
                          className="p-1 hover:bg-secondary transition-colors"
                          title="Copy"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedCredential(cred);
                            setShowAssignModal(true);
                          }}
                          className="flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          <Users className="w-4 h-4" />
                          {cred.assignedTo.length} {cred.assignedTo.length === 1 ? 'member' : 'members'}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 text-xs ${
                        cred.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : cred.status === 'expired'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {cred.status.charAt(0).toUpperCase() + cred.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        {cred.status === 'active' && (
                          <button
                            onClick={() => handleRevoke(cred.id)}
                            className="text-sm text-yellow-600 hover:underline"
                          >
                            Revoke
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(cred.id)}
                          className="text-sm text-destructive hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Credential Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Credential"
        size="md"
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" size="sm" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={() => {
              showToast('success', 'Credential added');
              setShowAddModal(false);
            }}>
              Add Credential
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input
            label="Credential Name"
            placeholder="e.g., Production API Key"
          />

          <div>
            <label className="block text-sm font-medium dark:text-gray-200 mb-2">Type</label>
            <select className="w-full px-3 py-2 border border-border rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="">Select type...</option>
              <option value="api_key">API Key</option>
              <option value="database">Database</option>
              <option value="service_account">Service Account</option>
              <option value="oauth">OAuth</option>
            </select>
          </div>

          <Input
            label="Service"
            placeholder="e.g., AWS, Stripe, Google Cloud"
          />

          <div>
            <label className="block text-sm font-medium dark:text-gray-200 mb-2">Key/Value</label>
            <textarea
              rows={3}
              placeholder="Paste your credential here..."
              className="w-full px-3 py-2 border border-border rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono text-sm resize-none"
            />
          </div>
        </div>
      </Modal>

      {/* Assign Members Modal */}
      <Modal
        isOpen={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        title={`Assign Members - ${selectedCredential?.name}`}
        size="md"
        footer={
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" size="sm" onClick={() => setShowAssignModal(false)}>
              Cancel
            </Button>
            <Button size="sm" onClick={handleAssignMembers}>
              Save Assignments
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground dark:text-gray-400">
            Select team members who should have access to this credential.
          </p>

          <div className="space-y-2">
            {['john.doe@company.com', 'jane.smith@company.com', 'bob.johnson@company.com', 'alice.williams@company.com'].map((email) => (
              <label key={email} className="flex items-center gap-3 p-3 border border-border hover:bg-secondary/30 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={selectedCredential?.assignedTo.includes(email)}
                  className="w-4 h-4"
                />
                <span className="text-sm">{email}</span>
              </label>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/DashboardFromChat.tsx`

- Category: `screens`
- Bytes: `11701`
- SHA-256: `3034f3a4270f67f9e8f02c82a056b1939663adf1d49999727107f7dd2d0ee1cb`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `DashboardFromChat.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState } from "react";
import { Send, TrendingUp, Users, DollarSign, Activity, BarChart3, ChevronRight } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { IntelligenceModal } from "../components/IntelligenceModal";

interface MetricCard {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ComponentType<{ className?: string }>;
}

type ModelMode = 'standard' | 'extended' | 'creative';

export function DashboardFromChat() {
  const [chatInput, setChatInput] = useState('');
  const [dashboardGenerated, setDashboardGenerated] = useState(false);
  const [showIntelligenceModal, setShowIntelligenceModal] = useState(false);
  const [modelMode, setModelMode] = useState<ModelMode>('extended');
  const [showModeMenu, setShowModeMenu] = useState(false);

  const metrics: MetricCard[] = [
    {
      title: 'Total Revenue',
      value: '$124,563',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Active Users',
      value: '2,847',
      change: '+8.2%',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-0.4%',
      trend: 'down',
      icon: TrendingUp,
    },
    {
      title: 'Avg Session',
      value: '4m 32s',
      change: '+2.1%',
      trend: 'up',
      icon: Activity,
    },
  ];

  const handleGenerateDashboard = () => {
    setDashboardGenerated(true);
    setChatInput('');
  };

  const getModeLabel = () => {
    switch (modelMode) {
      case 'standard': return 'Standard';
      case 'extended': return 'Extended';
      case 'creative': return 'Creative';
      default: return 'Extended';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-secondary/30 dark:bg-[#0f0f0f]">
      {/* Chat Input Header */}
      <div className="bg-white dark:bg-[#1a1a1a] border-b border-border dark:border-[#2a2a2a] p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-semibold dark:text-gray-200 mb-4">AI Dashboard Generator</h1>
          <div className="flex gap-3">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleGenerateDashboard()}
              placeholder="Ask AI to generate a dashboard... (e.g., 'Show me a sales performance dashboard')"
              className="flex-1 px-4 py-3 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <div className="relative">
              <button
                onClick={() => setShowModeMenu(!showModeMenu)}
                className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200 transition-colors border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] hover:bg-secondary dark:hover:bg-[#2a2a2a]"
              >
                <span>{getModeLabel()}</span>
                <ChevronRight className={`w-4 h-4 transition-transform ${showModeMenu ? 'rotate-90' : '-rotate-90'}`} />
              </button>

              {showModeMenu && (
                <div className="absolute top-full right-0 mt-2 bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-lg shadow-lg py-1 min-w-[120px] z-10">
                  <button
                    onClick={() => { setModelMode('standard'); setShowModeMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors dark:text-gray-200 ${modelMode === 'standard' ? 'bg-primary/10 text-primary dark:bg-primary/20' : ''}`}
                  >
                    Standard
                  </button>
                  <button
                    onClick={() => { setShowIntelligenceModal(true); setShowModeMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors dark:text-gray-200 ${modelMode === 'extended' ? 'bg-primary/10 text-primary dark:bg-primary/20' : ''}`}
                  >
                    Extended
                  </button>
                  <button
                    onClick={() => { setModelMode('creative'); setShowModeMenu(false); }}
                    className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors dark:text-gray-200 ${modelMode === 'creative' ? 'bg-primary/10 text-primary dark:bg-primary/20' : ''}`}
                  >
                    Creative
                  </button>
                </div>
              )}
            </div>
            <Button onClick={handleGenerateDashboard} disabled={!chatInput.trim()} className="gap-2">
              <Send className="w-4 h-4" />
              Generate
            </Button>
          </div>
        </div>
      </div>

      {/* Dashboard Output */}
      <div className="flex-1 overflow-y-auto p-6">
        {dashboardGenerated ? (
          <div className="max-w-7xl mx-auto space-y-6">
            {/* AI Response */}
            <Card padding="md" className="bg-primary/5 dark:bg-primary/10 border-l-4 border-l-primary">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center">
                  AI
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground dark:text-gray-300 mb-2">
                    I've generated a sales performance dashboard based on your request. Here's an overview of key metrics:
                  </p>
                </div>
              </div>
            </Card>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <Card key={index} padding="md" className="border border-border dark:border-[#2a2a2a]">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground dark:text-gray-400">{metric.title}</span>
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold dark:text-gray-100 mb-2">{metric.value}</div>
                    <div className={`text-sm ${
                      metric.trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {metric.change} from last month
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card padding="md" className="border border-border dark:border-[#2a2a2a]">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold dark:text-gray-200">Revenue Trend</h3>
                </div>
                <div className="h-64 bg-secondary/30 dark:bg-[#1a1a1a] rounded-lg flex items-center justify-center text-muted-foreground dark:text-gray-400">
                  Chart visualization would appear here
                </div>
              </Card>

              <Card padding="md" className="border border-border dark:border-[#2a2a2a]">
                <div className="flex items-center gap-3 mb-6">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold dark:text-gray-200">User Growth</h3>
                </div>
                <div className="h-64 bg-secondary/30 dark:bg-[#1a1a1a] rounded-lg flex items-center justify-center text-muted-foreground dark:text-gray-400">
                  Chart visualization would appear here
                </div>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card padding="md" className="border border-border">
              <h3 className="font-semibold mb-4">Recent Transactions</h3>
              <div className="space-y-3">
                {[
                  { id: '#12345', customer: 'John Doe', amount: '$1,234', status: 'Completed' },
                  { id: '#12344', customer: 'Jane Smith', amount: '$987', status: 'Pending' },
                  { id: '#12343', customer: 'Bob Johnson', amount: '$2,456', status: 'Completed' },
                  { id: '#12342', customer: 'Alice Williams', amount: '$543', status: 'Completed' },
                ].map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between py-3 border-b border-border dark:border-[#2a2a2a] last:border-0">
                    <div>
                      <div className="font-medium dark:text-gray-200">{transaction.customer}</div>
                      <div className="text-sm text-muted-foreground dark:text-gray-400">{transaction.id}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium dark:text-gray-200">{transaction.amount}</div>
                      <div className={`text-sm ${
                        transaction.status === 'Completed' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'
                      }`}>
                        {transaction.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto text-center py-20">
            <div className="w-20 h-20 bg-primary/10 rounded-lg mx-auto flex items-center justify-center mb-6">
              <BarChart3 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-semibold dark:text-gray-200 mb-4">Generate AI-Powered Dashboards</h2>
            <p className="text-muted-foreground dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Describe the dashboard you want to create, and our AI will generate a customized view with relevant metrics, charts, and insights.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              {[
                'Show me a sales performance dashboard',
                'Create a customer analytics overview',
                'Build a marketing metrics dashboard',
              ].map((example) => (
                <button
                  key={example}
                  onClick={() => setChatInput(example)}
                  className="p-4 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 hover:border-primary transition-colors text-sm"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Intelligence Modal */}
      <IntelligenceModal
        isOpen={showIntelligenceModal}
        onClose={() => setShowIntelligenceModal(false)}
      />
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/DesignSystemShowcase.tsx`

- Category: `screens`
- Bytes: `10861`
- SHA-256: `ef53883aba86f6c34f8f5b94b1395b4c66273463427ec5914b71a6d4e9778c3e`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `DesignSystemShowcase.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState } from "react";
import { Plus, Download, Settings, User, Bell, Search as SearchIcon, Edit, Trash2, Eye, MoreVertical } from "lucide-react";
import { Button } from "../components/Button";
import { Input } from "../components/ui/input";
import { Card } from "../components/Card";
import { useToast } from "../components/Toast";
import { TreeSelectField } from "../components/selectors/TreeSelectField";
import { TreeNode } from "../components/LazyLoadTree";
import { LazyLoadList, ListItem } from "../components/LazyLoadList";

export function DesignSystemShowcase() {
  const { showToast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [selectedListItems, setSelectedListItems] = useState<string[]>([]);

  // Sample tree data
  const treeNodes: TreeNode[] = [
    {
      id: '1',
      label: 'Engineering',
      children: [
        { id: '1-1', label: 'Frontend Team' },
        { id: '1-2', label: 'Backend Team' },
        { id: '1-3', label: 'DevOps Team' },
      ],
    },
    {
      id: '2',
      label: 'Sales',
      children: [
        { id: '2-1', label: 'Enterprise Sales' },
        { id: '2-2', label: 'SMB Sales' },
      ],
    },
    {
      id: '3',
      label: 'Marketing',
      children: [
        { id: '3-1', label: 'Content Marketing' },
        { id: '3-2', label: 'Product Marketing' },
      ],
    },
  ];

  // Sample list data
  const listItems: ListItem[] = Array.from({ length: 20 }, (_, i) => ({
    id: `item-${i}`,
    title: `Document ${i + 1}`,
    subtitle: `Updated ${i + 1} days ago`,
    status: ['Active', 'Draft', 'Archived'][i % 3],
  }));

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Top Header - User Controls */}
      <header className="bg-white dark:bg-[#0f0f0f] border-b border-border dark:border-[#2a2a2a] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold dark:text-gray-100">Clean Design System</h1>

            {/* User Controls */}
            <div className="flex items-center gap-2">
              <Button variant="icon" iconOnly>
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="icon" iconOnly>
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="icon" iconOnly>
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
        {/* Page Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium dark:text-gray-100">Documents Library</h2>
            <p className="text-sm text-muted-foreground dark:text-gray-400 dark:text-gray-400 mt-1">
              Manage and organize your documents
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Document
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <Card padding="sm">
          <div className="flex flex-wrap gap-3">
            {/* Search - fixed width */}
            <div className="w-64">
              <Input
                variant="search"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                showClearButton
                onClear={() => setSearchQuery('')}
              />
            </div>

            {/* Filters - wrap to next line if needed */}
            <div className="w-56">
              <TreeSelectField
                nodes={treeNodes}
                value={selectedNode}
                onChange={(id, node) => {
                  setSelectedNode(id);
                  if (node) showToast('info', `Selected: ${node.label}`);
                }}
                placeholder="Select department..."
              />
            </div>

            <div className="w-56">
              <TreeSelectField
                nodes={treeNodes}
                value={null}
                onChange={() => {}}
                placeholder="Select team..."
                multiSelect
                selectedValues={selectedNodes}
                onMultiChange={(ids) => setSelectedNodes(ids)}
              />
            </div>
          </div>
        </Card>

        {/* Content Grid */}
        <div className="grid grid-cols-12 gap-4">
          {/* Button Variants Showcase */}
          <Card className="col-span-12" padding="md">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold dark:text-gray-100">Button Variants</h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 dark:text-gray-400 mb-3">Filled Buttons</p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary">Primary Button</Button>
                    <Button variant="secondary">Secondary Button</Button>
                    <Button variant="outline">Outline Button</Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 mb-3">Ghost & Transparent</p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="ghost">Ghost Button</Button>
                    <Button variant="transparent">Transparent Button</Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 mb-3">Icon Buttons</p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="icon" iconOnly>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="icon" iconOnly>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                    <Button variant="icon" iconOnly>
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="icon" iconOnly>
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 mb-3">With Icons</p>
                  <div className="flex flex-wrap gap-3">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Create New
                    </Button>
                    <Button variant="secondary">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 mb-3">Sizes</p>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground dark:text-gray-400 mb-3">States</p>
                  <div className="flex flex-wrap gap-3">
                    <Button disabled>Disabled</Button>
                    <Button loading>Loading...</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Input Variants */}
          <Card className="col-span-6" padding="md">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Input Components</h3>

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
                icon={<SearchIcon className="w-4 h-4 text-muted-foreground dark:text-gray-400" />}
              />
            </div>
          </Card>

          {/* List with Multi-Select */}
          <Card className="col-span-6" padding="md">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Multi-Select List</h3>
                <span className="text-sm text-muted-foreground dark:text-gray-400">
                  {selectedListItems.length} selected
                </span>
              </div>

              <div className="border border-border rounded-lg overflow-hidden">
                <LazyLoadList
                  items={listItems}
                  renderItem={(item) => (
                    <div className="py-3 px-4">
                      <div className="font-medium">{item.title}</div>
                      <div className="text-sm text-muted-foreground dark:text-gray-400">{item.subtitle}</div>
                    </div>
                  )}
                  onItemClick={() => {}}
                  multiSelect
                  selectedIds={selectedListItems}
                  onSelectionChange={setSelectedListItems}
                  itemHeight={70}
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/ExploreScreen.tsx`

- Category: `screens`
- Bytes: `6966`
- SHA-256: `540dc60f1c79ce0b1d2c1b35a8272685ab833c913790200c860fa5c659ae7710`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `ExploreScreen.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/Card";
import { LoadingState } from "../components/LoadingState";
import { ErrorState } from "../components/ErrorState";
import { EmptyState } from "../components/EmptyState";
import { channels, categories, subjects } from "../data/mockData";
import { Radio, ArrowRight, FolderOpen, BookOpen } from "lucide-react";

export function ExploreScreen() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Simulate data loading
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  }, []);

  const myChannels = channels.filter(c => c.type === 'personal');
  const orgChannels = channels.filter(c => c.type === 'organization');
  const allChannels = [...myChannels, ...orgChannels];

  const getChannelStats = (channelId: string) => {
    const channelCategories = categories.filter(c => c.channelId === channelId);
    const channelSubjects = subjects.filter(s => s.channelId === channelId);
    return {
      categories: channelCategories.length,
      subjects: channelSubjects.length,
    };
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="h-8 w-48 bg-secondary rounded animate-pulse mb-2" />
          <div className="h-4 w-96 bg-secondary rounded animate-pulse" />
        </div>
        <LoadingState type="skeleton-card" count={6} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <ErrorState
          title="Failed to load channels"
          message="We couldn't load your channels. Please try again."
          onRetry={() => {
            setError(false);
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 800);
          }}
        />
      </div>
    );
  }

  if (allChannels.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <EmptyState
          icon={Radio}
          title="No channels yet"
          message="Create your first channel to start organizing knowledge"
          action={{
            label: "Create Channel",
            onClick: () => navigate('/'),
          }}
        />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      <header>
        <h1 className="text-3xl font-bold mb-2">Explore Knowledge</h1>
        <p className="text-muted-foreground">
          Start by selecting a channel to browse organized content
        </p>
      </header>

      {myChannels.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">My Channels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myChannels.map((channel) => {
              const stats = getChannelStats(channel.id);
              return (
                <Card
                  key={channel.id}
                  onClick={() => navigate(`/channel/${channel.id}`)}
                  className="hover:border-primary/40 cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <Radio className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1">{channel.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Personal workspace
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <FolderOpen className="w-3.5 h-3.5" />
                        <span>{stats.categories} categories</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{stats.subjects} subjects</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-primary pt-2 border-t border-border">
                      <span>Browse content</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      )}

      {orgChannels.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-lg font-semibold">Organization Channels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {orgChannels.map((channel) => {
              const stats = getChannelStats(channel.id);
              return (
                <Card
                  key={channel.id}
                  onClick={() => navigate(`/channel/${channel.id}`)}
                  className="hover:border-primary/40 cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <Radio className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1">{channel.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          Organization workspace
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <FolderOpen className="w-3.5 h-3.5" />
                        <span>{stats.categories} categories</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>{stats.subjects} subjects</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-primary pt-2 border-t border-border">
                      <span>Browse content</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/FileViewer.tsx`

- Category: `screens`
- Bytes: `22609`
- SHA-256: `06d6150364cc25afdf5e94cff7350e3cb5f13452b4ec927038343f531aa94ae4`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `FileViewer.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { useToast } from '../components/Toast';
import Editor from '@monaco-editor/react';
import {
  ArrowLeft,
  Save,
  Download,
  Trash2,
  Edit3,
  Eye,
  Code,
  FileText,
  ChevronRight,
  Home,
} from 'lucide-react';

interface FileContent {
  id: string;
  filename: string;
  mime_type: string;
  content: string;
  byte_size: number;
  created_at: string;
  created_by: string;
}

const mockFileContents: Record<string, FileContent> = {
  'file-1': {
    id: 'file-1',
    filename: 'worker.ts',
    mime_type: 'text/typescript',
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
    const tool = { id: 'mcp.execute', name: 'Airtable', description: 'Read/write Airtable through centralized backend capabilities.', kind: 'database', mutates: true, mutationPolicy: 'confirmation-required' };
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
    toolName: text(node.name || data.name || 'Airtable'),
    toolDescription: text(data.description || data.toolDescription || 'Read/write Airtable through centralized backend capabilities.'),
    inputContract: { required: [], optional: [{ key: 'operation', label: 'Operation' }, { key: 'prompt', label: 'Prompt' }, { key: 'query', label: 'Query' }, { key: 'data', label: 'Data' }, { key: 'config', label: 'Config' }] },
    outputContract: [{ key: 'output', label: 'Output' }, { key: 'files', label: 'Files' }, { key: 'logs', label: 'Logs' }],
    metadata: { modelId: 'airtable', toolDomain: 'database', mutating: true, reusableByAiAgent: true },
    executionKind: 'tool',
  };
};
`,
    byte_size: 3840,
    created_at: '2026-05-01T10:00:00Z',
    created_by: 'user-1',
  },
  'file-2': {
    id: 'file-2',
    filename: 'airtable-node.ts',
    mime_type: 'text/typescript',
    content: `import rawSchema from './airtable-schema.json';
import { createAgentBackendNodeModule } from '@workflow/nodes/nodes/_agent-backend-node-module';

export default createAgentBackendNodeModule({ id: 'airtable', rawSchema, label: 'Airtable', description: 'Read/write Airtable through centralized backend capabilities.', kind: 'database', order: 512 });
`,
    byte_size: 512,
    created_at: '2026-05-01T10:00:00Z',
    created_by: 'user-1',
  },
  'file-3': {
    id: 'file-3',
    filename: 'airtable-schema.json',
    mime_type: 'application/json',
    content: `{
  "id": "airtable",
  "group": "Data and Integrations",
  "iconClass": "pi pi-bolt",
  "executorKey": "airtable",
  "render": {
    "iconKey": "airtable",
    "iconClass": "pi pi-bolt",
    "iconSize": 64,
    "nodeSize": 180,
    "iconColor": "#2563eb",
    "iconBackground": "#dbeafe"
  },
  "outputViewers": [
    {
      "id": "json",
      "label": "JSON",
      "type": "json"
    },
    {
      "id": "markdown",
      "label": "Markdown",
      "type": "markdown"
    },
    {
      "id": "raw",
      "label": "Raw",
      "type": "raw"
    }
  ],
  "name": {
    "type": "string",
    "editable": true,
    "autoGenerate": true
  },
  "instruction": {
    "code": false,
    "markdown": false
  },
  "fields": {
    "description": {
      "type": "textarea",
      "editable": true,
      "defaultValue": "Read/write Airtable through centralized backend capabilities.",
      "label": "Description",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "operation": {
      "type": "string",
      "editable": true,
      "defaultValue": "auto",
      "label": "Operation",
      "allowVariables": true
    },
    "prompt": {
      "type": "textarea",
      "editable": true,
      "defaultValue": "Read/write Airtable through centralized backend capabilities.",
      "label": "Prompt",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "credentialKey": {
      "type": "string",
      "editable": true,
      "defaultValue": "",
      "label": "Credential Key",
      "allowVariables": true
    },
    "config": {
      "type": "json",
      "editable": true,
      "defaultValue": {},
      "label": "Config",
      "allowVariables": true
    },
    "query": {
      "type": "textarea",
      "editable": true,
      "defaultValue": "",
      "label": "Query / Command",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    }
  },
  "inputs": {
    "input": {
      "allowMultipleArrows": true
    }
  },
  "outputs": {
    "output": {
      "allowMultipleArrows": true
    }
  },
  "commands": {
    "command": {
      "label": "Command",
      "portType": "bi-directional",
      "side": "top",
      "order": 0,
      "acceptedSourceModelIds": [
        "ai-agent"
      ],
      "allowMultipleArrows": true
    }
  },
  "documentation": {
    "nodeTypeLabel": "Airtable",
    "summary": "Read/write Airtable through centralized backend capabilities.",
    "usage": "This node exposes a reusable command tool to the AI Agent. Backend operations are routed through executeBackend -> Entities or centralized capabilities.",
    "inputs": [
      {
        "key": "operation",
        "label": "Operation",
        "required": false
      },
      {
        "key": "prompt",
        "label": "Prompt",
        "required": false
      }
    ],
    "outputs": [
      {
        "key": "output",
        "label": "Output"
      }
    ]
  }
}`,
    byte_size: 4096,
    created_at: '2026-05-01T10:00:00Z',
    created_by: 'user-1',
  },
  'file-4': {
    id: 'file-4',
    filename: 'README.md',
    mime_type: 'text/markdown',
    content: `# Airtable

Read/write Airtable through centralized backend capabilities.

This node is command-capable and routes backend operations through \`executeBackend\`. It does not access Supabase or Neo4j directly.
`,
    byte_size: 256,
    created_at: '2026-05-01T10:00:00Z',
    created_by: 'user-1',
  },
  'file-5': {
    id: 'file-5',
    filename: 'api-spec.ts',
    mime_type: 'text/typescript',
    content: `// API Specification
export interface APIEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  requestBody?: Record<string, unknown>;
  responseBody?: Record<string, unknown>;
  queryParams?: Record<string, string>;
  headers?: Record<string, string>;
}

export const endpoints: APIEndpoint[] = [
  {
    method: 'GET',
    path: '/api/users',
    description: 'Retrieve all users',
    queryParams: {
      page: 'number',
      limit: 'number',
      sort: 'string',
    },
    responseBody: {
      users: 'User[]',
      total: 'number',
      page: 'number',
    },
  },
  {
    method: 'POST',
    path: '/api/users',
    description: 'Create a new user',
    requestBody: {
      name: 'string',
      email: 'string',
      role: 'string',
    },
    responseBody: {
      user: 'User',
      message: 'string',
    },
  },
  {
    method: 'GET',
    path: '/api/users/:id',
    description: 'Retrieve a specific user',
    responseBody: {
      user: 'User',
    },
  },
  {
    method: 'PUT',
    path: '/api/users/:id',
    description: 'Update a user',
    requestBody: {
      name: 'string',
      email: 'string',
      role: 'string',
    },
    responseBody: {
      user: 'User',
      message: 'string',
    },
  },
  {
    method: 'DELETE',
    path: '/api/users/:id',
    description: 'Delete a user',
    responseBody: {
      message: 'string',
    },
  },
];

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'viewer';
  created_at: string;
  updated_at: string;
}
`,
    byte_size: 15360,
    created_at: '2026-05-01T10:00:00Z',
    created_by: 'user-1',
  },
  'file-8': {
    id: 'file-8',
    filename: 'Engineering-README.md',
    mime_type: 'text/markdown',
    content: `# Engineering Documentation

Welcome to the engineering documentation repository.

## Overview

This repository contains all technical documentation for our platform, including:

- API specifications
- Database schemas
- Architecture diagrams
- Configuration guides
- Best practices

## Getting Started

1. Review the API specification in \`api-spec.ts\`
2. Check the database schema in \`database-schema.sql\`
3. Configure your environment using \`config.json\`

## API Documentation

Our REST API provides the following endpoints:

- \`GET /api/users\` - List all users
- \`POST /api/users\` - Create a new user
- \`GET /api/users/:id\` - Get user details
- \`PUT /api/users/:id\` - Update a user
- \`DELETE /api/users/:id\` - Delete a user

## Database

We use PostgreSQL for our primary database. The schema includes:

- Users table
- Organizations table
- Shared spaces and files
- Audit logs

## Contributing

Please follow our coding standards and submit pull requests for any changes.
`,
    byte_size: 8192,
    created_at: '2026-05-02T11:30:00Z',
    created_by: 'user-2',
  },
  'file-6': {
    id: 'file-6',
    filename: 'database-schema.sql',
    mime_type: 'application/sql',
    content: `-- Database Schema for Organization Drive

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Organizations table
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    metadata JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shared spaces table
CREATE TABLE shared_spaces (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scope_type VARCHAR(50),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255),
    slug VARCHAR(255),
    metadata JSONB,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Shared space files table
CREATE TABLE shared_space_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    shared_space_id UUID REFERENCES shared_spaces(id) ON DELETE CASCADE,
    storage_bucket VARCHAR(255),
    storage_path VARCHAR(1024),
    filename VARCHAR(255),
    mime_type VARCHAR(127),
    byte_size BIGINT,
    metadata JSONB,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_shared_spaces_user ON shared_spaces(user_id);
CREATE INDEX idx_shared_spaces_org ON shared_spaces(organization_id);
CREATE INDEX idx_files_space ON shared_space_files(shared_space_id);
CREATE INDEX idx_files_created ON shared_space_files(created_at DESC);

-- RLS Policies
ALTER TABLE shared_spaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE shared_space_files ENABLE ROW LEVEL SECURITY;

-- Allow users to see their own spaces
CREATE POLICY "Users can view own spaces" ON shared_spaces
    FOR SELECT USING (user_id = auth.uid());

-- Allow users to see organization spaces
CREATE POLICY "Users can view org spaces" ON shared_spaces
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM organization_members
            WHERE user_id = auth.uid()
        )
    );
`,
    byte_size: 12288,
    created_at: '2026-05-05T09:20:00Z',
    created_by: 'user-3',
  },
  'file-7': {
    id: 'file-7',
    filename: 'config.json',
    mime_type: 'application/json',
    content: `{
  "application": {
    "name": "Organization Drive",
    "version": "1.0.0",
    "environment": "production"
  },
  "database": {
    "host": "localhost",
    "port": 5432,
    "name": "org_drive",
    "ssl": true,
    "poolSize": 20
  },
  "storage": {
    "provider": "s3",
    "bucket": "org-files",
    "region": "us-east-1",
    "maxFileSize": 104857600,
    "allowedMimeTypes": [
      "image/*",
      "video/*",
      "audio/*",
      "text/*",
      "application/pdf",
      "application/json",
      "application/javascript",
      "application/typescript"
    ]
  },
  "security": {
    "jwtSecret": "your-secret-key",
    "tokenExpiry": "7d",
    "bcryptRounds": 10
  },
  "features": {
    "enableUserSpaces": true,
    "enableOrgSpaces": true,
    "enableFileVersioning": true,
    "enableFileSharing": true
  }
}
`,
    byte_size: 2048,
    created_at: '2026-05-08T16:45:00Z',
    created_by: 'user-1',
  },
};

const mockSpaces = [
  { id: 'space-1', name: 'Engineering Documents' },
  { id: 'space-2', name: 'Design Assets' },
];

export default function FileViewer() {
  const { spaceId, fileId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const space = mockSpaces.find(s => s.id === spaceId);

  // Get file from mock contents or create a default empty file
  const file = fileId ? (mockFileContents[fileId] || {
    id: fileId,
    filename: 'new-file.txt',
    mime_type: 'text/plain',
    content: '// Start editing your file here...\n',
    byte_size: 0,
    created_at: new Date().toISOString(),
    created_by: 'user-1',
  }) : null;

  useEffect(() => {
    if (file) {
      setContent(file.content);
    }
  }, [file]);

  if (!space || !file) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-muted-foreground">File not found</p>
      </div>
    );
  }

  const getLanguage = (mimeType: string): string => {
    if (mimeType.includes('typescript')) return 'typescript';
    if (mimeType.includes('javascript')) return 'javascript';
    if (mimeType.includes('json')) return 'json';
    if (mimeType.includes('sql')) return 'sql';
    if (mimeType.includes('python')) return 'python';
    if (mimeType.includes('markdown')) return 'markdown';
    if (mimeType.includes('html')) return 'html';
    if (mimeType.includes('css')) return 'css';
    return 'plaintext';
  };

  const handleSave = () => {
    showToast('success', `Saved ${file.filename}`);
    setHasChanges(false);
    setIsEditing(false);
  };

  const handleContentChange = (value: string | undefined) => {
    if (value !== undefined) {
      setContent(value);
      setHasChanges(value !== file.content);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: file.mime_type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('success', `Downloaded ${file.filename}`);
  };

  const handleDelete = () => {
    showToast('success', `Deleted ${file.filename}`);
    navigate(`/organization-drive/${spaceId}`);
  };

  return (
    <div className="min-h-screen bg-background dark:bg-[#0a0a0a]">
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="border-b border-border dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a]">
          <div className="px-6 py-4">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm mb-4">
              <button
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Home className="w-4 h-4" />
              </button>
              <ChevronRight className="w-3 h-3 text-muted-foreground" />
              <button
                onClick={() => navigate('/organization-drive')}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Organisation Drive
              </button>
              <ChevronRight className="w-3 h-3 text-muted-foreground" />
              <button
                onClick={() => navigate(`/organization-drive/${spaceId}`)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {space.name}
              </button>
              <ChevronRight className="w-3 h-3 text-muted-foreground" />
              <span className="text-primary font-medium">{file.filename}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Code className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h1 className="text-xl font-bold dark:text-gray-100">{file.filename}</h1>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    {file.mime_type} • {Math.round(file.byte_size / 1024)} KB
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {!isEditing ? (
                  <>
                    <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2">
                      <Edit3 className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button variant="outline" onClick={handleDownload} className="gap-2">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                    <Button variant="outline" onClick={handleDelete} className="gap-2">
                      <Trash2 className="w-4 h-4 text-red-600" />
                      Delete
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false);
                        setContent(file.content);
                        setHasChanges(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={!hasChanges}
                      className="gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Changes
                    </Button>
                  </>
                )}
              </div>
            </div>

            {hasChanges && (
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  You have unsaved changes
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-hidden">
          <Editor
            height="100%"
            language={getLanguage(file.mime_type)}
            value={content}
            onChange={handleContentChange}
            theme="vs-dark"
            options={{
              readOnly: !isEditing,
              minimap: { enabled: true },
              fontSize: 14,
              lineNumbers: 'on',
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
              scrollBeyondLastLine: false,
              renderWhitespace: 'selection',
              folding: true,
              links: true,
              colorDecorators: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/GlobalDefaults.tsx`

- Category: `screens`
- Bytes: `11367`
- SHA-256: `0826a56f5ddbe4bc3b0178c641b7fc0858b4ef42f422abc400af299ee3a85be2`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `GlobalDefaults.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { useToast } from '../components/Toast';
import { Settings, Bot, Zap, ChevronDown, X, Shield } from 'lucide-react';

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

export default function GlobalDefaults() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [defaults, setDefaults] = useState<LevelDefaults>({
    channel: { type: 'none', id: null, name: null },
    category: { type: 'none', id: null, name: null },
    subject: { type: 'none', id: null, name: null },
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
    showToast('success', 'Global defaults saved successfully');
    console.log('Saving global defaults:', defaults);
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
                  No global default configured
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-red-500 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold dark:text-gray-100">Global Defaults</h1>
              <p className="text-muted-foreground dark:text-gray-400">
                Configure system-wide default AI agents and workflows
              </p>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <Card className="mb-6 bg-red-50/50 dark:bg-red-950/20 border-red-200 dark:border-red-800">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-red-900 dark:text-red-200">
                Root User Global Settings
              </h4>
              <p className="text-sm text-red-800 dark:text-red-300">
                These global defaults apply system-wide across all organizations and will be used as fallback when no organization-specific defaults are configured.
              </p>
            </div>
          </div>
        </Card>

        {/* Default Selectors */}
        <div className="space-y-4 mb-8">
          {renderDefaultSelector('channel', 'Channel Default', 'System-wide default AI configuration for all channels')}
          {renderDefaultSelector('category', 'Category Default', 'System-wide default AI configuration for all categories')}
          {renderDefaultSelector('subject', 'Subject Default', 'System-wide default AI configuration for all subjects')}
          {renderDefaultSelector('post', 'Post Default', 'System-wide default AI configuration for all posts')}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-6 border-t border-border dark:border-[#2a2a2a]">
          <Button variant="outline" onClick={() => navigate('/settings')}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="gap-2">
            <Settings className="w-4 h-4" />
            Save Global Defaults
          </Button>
        </div>
      </div>
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/Home.tsx`

- Category: `screens`
- Bytes: `7772`
- SHA-256: `ad81b24698db2e5654af7404ee9199e7fa54c7fbf3b5c85c684e2ec24d28ee56`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `Home.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/Card";
import { channels, subjects, posts, recentActivity } from "../data/mockData";
import { Sparkles, Compass, BookOpen, Plus, ArrowRight, Clock } from "lucide-react";

export function Home() {
  const [aiInput, setAiInput] = useState("");
  const navigate = useNavigate();

  const handleAskAI = () => {
    if (aiInput.trim()) {
      navigate('/dashboard-chat');
    }
  };

  const myChannels = channels.filter(c => c.type === 'personal');

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
      <section className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-sm text-primary font-medium">
          <Sparkles className="w-4 h-4" />
          <span>AI-Powered Knowledge Workspace</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground dark:text-gray-100 max-w-3xl mx-auto leading-tight">
          What do you want to understand?
        </h1>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={aiInput}
              onChange={(e) => setAiInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAskAI()}
              placeholder="Ask AI about anything..."
              className="w-full px-6 py-4 pr-12 border-2 border-border dark:border-[#2a2a2a] rounded-2xl text-base bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all shadow-sm"
            />
            <button
              onClick={handleAskAI}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors"
            >
              <Sparkles className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground dark:text-gray-400 mt-3">
            AI answers stay focused on your selected context
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold dark:text-gray-200 mb-4">Get Started</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card
            onClick={() => navigate("/explore")}
            className="hover:border-primary/40 cursor-pointer"
          >
            <div className="space-y-3">
              <div className="p-3 bg-primary/10 rounded-xl w-fit">
                <Compass className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold dark:text-gray-200 mb-1">Explore Topics</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  Browse through organized knowledge
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm text-primary">
                <span>Start exploring</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Card>

          <Card
            onClick={() => navigate("/activity")}
            className="hover:border-primary/40 cursor-pointer"
          >
            <div className="space-y-3">
              <div className="p-3 bg-primary/10 rounded-xl w-fit">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold dark:text-gray-200 mb-1">Continue Learning</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  Pick up where you left off
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm text-primary">
                <span>View activity</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Card>

          <Card className="hover:border-primary/40 cursor-pointer">
            <div className="space-y-3">
              <div className="p-3 bg-primary/10 rounded-xl w-fit">
                <Plus className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold dark:text-gray-200 mb-1">Create Content</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  Add new knowledge to your workspace
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm text-primary">
                <span>Create now</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold dark:text-gray-200 mb-4">Recent Context</h2>
        <div className="space-y-3">
          {recentActivity.slice(0, 3).map((activity) => {
            const post = posts.find(p => p.id === activity.contextId);
            const subject = subjects.find(s => s.id === activity.contextId);

            return (
              <Card
                key={activity.id}
                onClick={() => {
                  if (post) {
                    navigate(`/channel/${post.channelId}/category/${post.categoryId}/subject/${post.subjectId}/post/${post.id}`);
                  } else if (subject) {
                    navigate(`/channel/${subject.channelId}/category/${subject.categoryId}/subject/${subject.id}`);
                  }
                }}
                className="hover:border-primary/40 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-secondary dark:bg-[#2a2a2a] rounded-lg">
                    <Clock className="w-5 h-5 text-muted-foreground dark:text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium dark:text-gray-200 mb-0.5">{activity.title}</p>
                    <p className="text-xs text-muted-foreground dark:text-gray-400 truncate">
                      {activity.contextName}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">{activity.timestamp}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {myChannels.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold dark:text-gray-200 mb-4">Your Channels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {myChannels.map((channel) => (
              <Card
                key={channel.id}
                onClick={() => navigate(`/channel/${channel.id}`)}
                className="hover:border-primary/40 cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-lg font-medium text-primary">
                    {channel.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold dark:text-gray-200 mb-0.5">{channel.name}</h3>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">Personal workspace</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground dark:text-gray-400" />
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/LandingPage.tsx`

- Category: `screens`
- Bytes: `59840`
- SHA-256: `d520c416a27e38e9028c381e9dfca672ce3aa0d9f329b2778fc170b1565b67fc`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `LandingPage.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { ArrowRight, Brain, Search, Zap, MessageSquare, FolderTree, Shield, Sparkles, Bot, Workflow, Database, Lock, TrendingUp, Users, Globe, Code, Cpu, Network, GitBranch, BarChart3, CheckCircle2, Play } from "lucide-react";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function LandingPage() {
  const features = [
    {
      icon: Brain,
      title: "Neural AI Processing",
      description: "State-of-the-art neural networks analyze and understand your content with unprecedented accuracy and contextual awareness.",
    },
    {
      icon: Bot,
      title: "Autonomous AI Agents",
      description: "Deploy intelligent agents that work 24/7, automating complex workflows and making smart decisions on your behalf.",
    },
    {
      icon: Workflow,
      title: "Visual Workflow Builder",
      description: "Design sophisticated automation pipelines with our intuitive drag-and-drop interface powered by AI suggestions.",
    },
    {
      icon: MessageSquare,
      title: "Conversational Intelligence",
      description: "Natural language interface that understands context, intent, and nuance for truly intelligent interactions.",
    },
    {
      icon: Database,
      title: "Knowledge Graph",
      description: "Automatically build interconnected knowledge graphs that reveal hidden insights and relationships in your data.",
    },
    {
      icon: Search,
      title: "Semantic Search",
      description: "Find information based on meaning, not just keywords, with advanced semantic understanding and vector embeddings.",
    },
    {
      icon: Network,
      title: "Distributed Architecture",
      description: "Enterprise-grade scalability with distributed processing and intelligent load balancing across global infrastructure.",
    },
    {
      icon: Lock,
      title: "Zero-Trust Security",
      description: "Military-grade encryption, role-based access control, and compliance with SOC2, GDPR, and HIPAA standards.",
    },
    {
      icon: Zap,
      title: "Real-Time Sync",
      description: "Instant synchronization across all devices with conflict resolution and offline-first architecture.",
    },
  ];

  const aiCapabilities = [
    {
      title: "Advanced Natural Language Processing",
      description: "Our proprietary NLP models understand context, sentiment, and intent with 99.7% accuracy",
      metrics: ["99.7% Accuracy", "142 Languages", "Real-time Processing"],
    },
    {
      title: "Machine Learning Automation",
      description: "Self-improving algorithms that learn from your workflows and optimize over time",
      metrics: ["24/7 Learning", "Auto-optimization", "Predictive Analytics"],
    },
    {
      title: "Computer Vision Integration",
      description: "Extract insights from images, documents, and visual data with neural network analysis",
      metrics: ["OCR Support", "Image Recognition", "Document AI"],
    },
  ];

  const useCases = [
    {
      title: "Research & Development",
      description: "Accelerate innovation with AI-powered literature review, patent analysis, and experimental data management.",
      icon: BarChart3,
    },
    {
      title: "Customer Support",
      description: "Deploy intelligent support agents that resolve queries instantly while learning from every interaction.",
      icon: MessageSquare,
    },
    {
      title: "Sales Enablement",
      description: "Empower your sales team with instant access to product knowledge, competitive intelligence, and customer insights.",
      icon: TrendingUp,
    },
    {
      title: "Engineering Teams",
      description: "Centralize technical documentation, API references, and engineering best practices with AI-powered search.",
      icon: Code,
    },
    {
      title: "Legal & Compliance",
      description: "Manage complex regulatory requirements with AI-assisted document analysis and compliance tracking.",
      icon: Shield,
    },
    {
      title: "Product Management",
      description: "Organize roadmaps, user research, and feature specifications with intelligent categorization and linking.",
      icon: GitBranch,
    },
  ];

  const stats = [
    { value: "10M+", label: "AI Queries Processed" },
    { value: "99.9%", label: "Uptime SLA" },
    { value: "150ms", label: "Avg Response Time" },
    { value: "50K+", label: "Active Users" },
  ];

  const integrations = [
    "Slack", "Microsoft Teams", "Google Workspace", "Salesforce", "GitHub", "Jira",
    "Notion", "Confluence", "Zapier", "Make", "Airtable", "MongoDB"
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "VP of Research",
      company: "BioTech Innovations",
      content: "GIGA Intelligence's neural AI completely transformed our research workflow. We've reduced literature review time by 80% and discovered connections we would have never found manually.",
      avatar: "SC",
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      company: "DataScale Labs",
      content: "The autonomous AI agents handle our entire documentation pipeline. The ROI was clear within the first month - our engineering team saves 20 hours per week on knowledge management.",
      avatar: "MR",
    },
    {
      name: "Emma Thompson",
      role: "Head of Product",
      company: "CloudSync Inc",
      content: "Best AI platform we've ever used. The semantic search is mind-blowing, and the workflow automation has eliminated countless hours of manual work. Absolutely game-changing.",
      avatar: "ET",
    },
    {
      name: "James Park",
      role: "Director of Operations",
      company: "FinTech Solutions",
      content: "Security and compliance were our biggest concerns. GIGA Intelligence exceeded all expectations with SOC2 certification and granular access controls. Now our entire organization runs on it.",
      avatar: "JP",
    },
    {
      name: "Lisa Anderson",
      role: "Chief Innovation Officer",
      company: "Global Enterprises",
      content: "We evaluated 15 different platforms. GIGA Intelligence was the only one that combined enterprise-grade AI with genuine ease of use. The knowledge graph feature alone is worth the investment.",
      avatar: "LA",
    },
    {
      name: "David Kumar",
      role: "Founder & CEO",
      company: "StartupForge",
      content: "As a fast-growing startup, we needed AI that could scale with us. GIGA Intelligence handles everything from customer support to internal wikis, all with one unified platform.",
      avatar: "DK",
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-white to-primary/10 dark:from-[#0a0a0a] dark:via-[#0f0f0f] dark:to-purple-950/20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-10 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.2, 0.4, 0.2],
              x: [0, -30, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Cpu className="w-4 h-4 text-primary animate-pulse" />
                <span className="text-sm font-medium text-primary">Next-Generation AI Platform</span>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 dark:from-gray-100 dark:to-gray-400 bg-clip-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Neural AI for
                <br />
                <span className="text-primary">Infinite Intelligence</span>
              </motion.h1>

              <motion.p
                className="text-xl text-muted-foreground dark:text-gray-400 mb-8 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Harness the power of advanced neural networks, autonomous AI agents, and semantic understanding to transform how your organization manages knowledge and automates workflows.
              </motion.p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link to="/signup">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="gap-2 text-lg px-8">
                      Start Free Trial
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </motion.div>
                </Link>
                <Link to="/dashboard-chat">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" variant="outline" className="text-lg px-8 gap-2">
                      <Play className="w-5 h-5" />
                      Watch Demo
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              <motion.div
                className="flex items-center gap-6 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-muted-foreground dark:text-gray-400">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <span className="text-muted-foreground dark:text-gray-400">14-day free trial</span>
                </div>
              </motion.div>
            </div>

            {/* Right: Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border dark:border-[#2a2a2a]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1717501219263-9aa2d6a768d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="AI Neural Network Visualization"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              {/* Floating Stats */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl p-4 border border-border dark:border-[#2a2a2a]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold dark:text-gray-100">10M+</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">AI Queries Daily</div>
                  </div>
                </div>
              </motion.div>
              <motion.div
                className="absolute -top-6 -right-6 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl p-4 border border-border dark:border-[#2a2a2a]"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-500/10 dark:bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold dark:text-gray-100">99.9%</div>
                    <div className="text-xs text-muted-foreground dark:text-gray-400">Uptime SLA</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-sm md:text-base opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities */}
      <section className="py-24 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
              <Cpu className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powered by Advanced AI</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-gray-100">
              Enterprise-Grade AI Capabilities
            </h2>
            <p className="text-lg text-muted-foreground dark:text-gray-400 max-w-3xl mx-auto">
              Built on cutting-edge neural network architecture with capabilities that scale from startups to Fortune 500 enterprises
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aiCapabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="p-8 h-full border-2 border-border dark:border-[#2a2a2a] hover:border-primary/50 dark:hover:border-primary/50 transition-all">
                  <h3 className="text-2xl font-bold mb-4 dark:text-gray-100">{capability.title}</h3>
                  <p className="text-muted-foreground dark:text-gray-400 mb-6 leading-relaxed">
                    {capability.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {capability.metrics.map((metric, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-primary/10 dark:bg-primary/20 text-primary text-sm font-medium rounded-full"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Visual */}
      <section className="py-24 bg-secondary/30 dark:bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border dark:border-[#2a2a2a]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1760553122008-70027a3123eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Futuristic Workspace"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold mb-6 dark:text-gray-100">
                Intelligent Workspace Designed for the Future
              </h2>
              <p className="text-lg text-muted-foreground dark:text-gray-400 mb-6 leading-relaxed">
                Experience a workspace that adapts to your workflow, learns from your patterns, and anticipates your needs with predictive AI.
              </p>
              <div className="space-y-4">
                {[
                  "Real-time collaborative editing with AI suggestions",
                  "Automatic content categorization and tagging",
                  "Smart notifications based on relevance and priority",
                  "Cross-platform synchronization with conflict resolution"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground dark:text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-gray-100">
              Complete AI-Powered Platform
            </h2>
            <p className="text-lg text-muted-foreground dark:text-gray-400 max-w-3xl mx-auto">
              Every feature engineered with neural AI at its core, delivering unprecedented intelligence and automation
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.2 }}>
                    <Card className="p-6 hover:shadow-xl transition-all border-2 border-border dark:border-[#2a2a2a] hover:border-primary/30 dark:hover:border-primary/30 h-full bg-gradient-to-br from-white to-gray-50/50 dark:from-[#1a1a1a] dark:to-[#0f0f0f]">
                      <motion.div
                        className="w-14 h-14 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center mb-4 shadow-lg"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </motion.div>
                      <h3 className="text-lg font-bold mb-2 dark:text-gray-100">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400 leading-relaxed">{feature.description}</p>
                    </Card>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Showcase */}
      <section className="py-24 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full mb-6">
                <Network className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Neural Architecture</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 dark:text-gray-100">
                Powered by Advanced Neural Networks
              </h2>
              <p className="text-lg text-muted-foreground dark:text-gray-400 mb-6 leading-relaxed">
                Our proprietary neural network architecture processes millions of data points per second, learning and adapting to your organization's unique patterns.
              </p>
              <div className="space-y-4">
                {[
                  { metric: "99.7%", label: "AI Accuracy" },
                  { metric: "<150ms", label: "Response Time" },
                  { metric: "142+", label: "Languages Supported" },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-20 text-3xl font-bold text-primary">{stat.metric}</div>
                    <div className="text-muted-foreground dark:text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border dark:border-[#2a2a2a]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1737505599159-5ffc1dcbc08f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Neural Network Architecture"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-semibold text-lg">Advanced AI Processing</p>
                  <p className="text-white/80 text-sm">Real-time neural network computation</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border dark:border-[#2a2a2a]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1761912149936-8f662fc2a13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Data Analytics Dashboard"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white font-semibold text-lg">Intelligent Analytics</p>
                  <p className="text-white/80 text-sm">Transform data into actionable insights</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 dark:bg-purple-500/20 rounded-full mb-6">
                <BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-medium text-purple-600 dark:text-purple-400">Deep Analytics</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 dark:text-gray-100">
                Turn Data Into Intelligence
              </h2>
              <p className="text-lg text-muted-foreground dark:text-gray-400 mb-6 leading-relaxed">
                Advanced analytics powered by machine learning reveal patterns and insights that traditional tools miss. Make data-driven decisions with confidence.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: TrendingUp, label: "Predictive Analytics" },
                  { icon: Brain, label: "Pattern Recognition" },
                  { icon: BarChart3, label: "Real-time Dashboards" },
                  { icon: Network, label: "Knowledge Graphs" },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-secondary/50 dark:bg-[#1a1a1a] rounded-lg border border-border dark:border-[#2a2a2a]">
                    <feature.icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium dark:text-gray-200">{feature.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-secondary/30 dark:bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-gray-100">
              Built for Every Team
            </h2>
            <p className="text-lg text-muted-foreground dark:text-gray-400 max-w-3xl mx-auto">
              From research labs to customer support, our AI adapts to your industry and workflow
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="p-8 h-full hover:shadow-lg transition-all border border-border dark:border-[#2a2a2a]">
                    <div className="w-16 h-16 bg-primary/10 dark:bg-primary/20 rounded-2xl flex items-center justify-center mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 dark:text-gray-100">{useCase.title}</h3>
                    <p className="text-muted-foreground dark:text-gray-400 leading-relaxed">
                      {useCase.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-24 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
              <Globe className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Seamless Integrations</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-gray-100">
              Works With Your Entire Stack
            </h2>
            <p className="text-lg text-muted-foreground dark:text-gray-400 max-w-3xl mx-auto">
              Connect with 100+ tools and platforms through native integrations and powerful APIs
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-[#1a1a1a] border-2 border-border dark:border-[#2a2a2a] rounded-xl p-6 flex items-center justify-center hover:border-primary/50 dark:hover:border-primary/50 transition-all"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="font-semibold text-center dark:text-gray-200">{integration}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-secondary/30 dark:bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl font-bold mb-4 dark:text-gray-100">Simple, yet powerful</h2>
            <p className="text-lg text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto">
              Get started in minutes with our intuitive hierarchy system.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Create Channels", desc: "Organize by projects or teams" },
              { step: "2", title: "Add Categories", desc: "Group related information" },
              { step: "3", title: "Build Subjects", desc: "Structure your knowledge" },
              { step: "4", title: "Chat with AI", desc: "Get intelligent answers" },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <motion.div
                  className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  {item.step}
                </motion.div>
                <h3 className="text-lg font-semibold mb-2 dark:text-gray-100">{item.title}</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-secondary/30 dark:bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 dark:bg-primary/20 rounded-full mb-4">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Trusted by Industry Leaders</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-gray-100">
              Transforming Organizations Worldwide
            </h2>
            <p className="text-lg text-muted-foreground dark:text-gray-400 max-w-3xl mx-auto">
              From startups to Fortune 500 companies, teams choose GIGA Intelligence for mission-critical AI
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Card className="p-8 border-2 border-border dark:border-[#2a2a2a] hover:border-primary/50 dark:hover:border-primary/50 transition-all h-full flex flex-col bg-white dark:bg-[#1a1a1a]">
                    <div className="flex-1 mb-6">
                      <p className="text-muted-foreground dark:text-gray-300 leading-relaxed text-base">
                        "{testimonial.content}"
                      </p>
                    </div>
                    <div className="flex items-center gap-4 pt-6 border-t border-border dark:border-[#2a2a2a]">
                      <motion.div
                        className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center font-bold text-white text-lg shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {testimonial.avatar}
                      </motion.div>
                      <div>
                        <p className="font-bold dark:text-gray-100">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          {testimonial.role}
                        </p>
                        <p className="text-xs text-primary font-medium">
                          {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Collaboration Visual */}
      <section className="py-24 bg-white dark:bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 dark:text-gray-100">
                Collaborate Smarter, Not Harder
              </h2>
              <p className="text-lg text-muted-foreground dark:text-gray-400 mb-8 leading-relaxed">
                Real-time collaboration powered by AI that understands your team's workflow and automates repetitive tasks so you can focus on what matters.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { icon: Users, label: "Team Workspaces", value: "Unlimited" },
                  { icon: Globe, label: "Global CDN", value: "99.9% Uptime" },
                  { icon: Shield, label: "Security", value: "SOC2 Certified" },
                  { icon: Zap, label: "Performance", value: "<150ms Response" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-bold text-lg dark:text-gray-100">{item.value}</div>
                      <div className="text-sm text-muted-foreground dark:text-gray-400">{item.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-border dark:border-[#2a2a2a]">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758518729685-f88df7890776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Team Collaboration"
                  className="w-full h-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 bg-secondary/30 dark:bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 dark:text-gray-100">
              Enterprise Pricing, Startup Friendly
            </h2>
            <p className="text-lg text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto">
              Start free and scale seamlessly as you grow. All plans include core AI features.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0 }}
            >
              <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                <Card className="p-8 border-2 border-border dark:border-[#2a2a2a] h-full bg-white dark:bg-[#1a1a1a]">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2 dark:text-gray-100">Starter</h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-5xl font-bold dark:text-gray-100">$0</span>
                      <span className="text-muted-foreground dark:text-gray-400">/month</span>
                    </div>
                    <p className="text-muted-foreground dark:text-gray-400">Perfect for individuals and small teams</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {["5 Channels", "100 Posts", "Basic AI Chat", "1K AI Credits/month", "Community Support"].map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <span className="dark:text-gray-200">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/signup">
                    <Button variant="outline" className="w-full">Get Started Free</Button>
                  </Link>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <motion.div
                whileHover={{ y: -12, scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <motion.div
                  className="absolute -top-5 left-1/2 -translate-x-1/2 z-10"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <span className="px-6 py-2 bg-gradient-to-r from-primary to-purple-600 text-white text-sm font-bold rounded-full shadow-lg">
                    Most Popular
                  </span>
                </motion.div>
                <Card className="p-8 border-4 border-primary shadow-2xl relative bg-gradient-to-br from-white to-primary/5 dark:from-[#1a1a1a] dark:to-primary/10">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2 dark:text-gray-100">Pro</h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-5xl font-bold text-primary">$29</span>
                      <span className="text-muted-foreground dark:text-gray-400">/month</span>
                    </div>
                    <p className="text-muted-foreground dark:text-gray-400">For professionals and growing teams</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {["25 Channels", "1K Posts", "Advanced AI Chat", "10K AI Credits/month", "AI Agents & Workflows", "Priority Support", "Custom Integrations"].map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="dark:text-gray-200 font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/signup">
                    <Button className="w-full shadow-lg">Start 14-Day Free Trial</Button>
                  </Link>
                </Card>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
                <Card className="p-8 border-2 border-border dark:border-[#2a2a2a] h-full bg-white dark:bg-[#1a1a1a]">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2 dark:text-gray-100">Enterprise</h3>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-5xl font-bold dark:text-gray-100">Custom</span>
                    </div>
                    <p className="text-muted-foreground dark:text-gray-400">For large organizations with specific needs</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {["Unlimited Everything", "Custom AI Training", "Dedicated Support", "SLA Guarantees", "On-Premise Option", "Advanced Security", "White-Label Available"].map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <span className="dark:text-gray-200">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/signup">
                    <Button variant="outline" className="w-full">Contact Sales</Button>
                  </Link>
                </Card>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link to="/pricing" className="inline-flex items-center gap-2 text-primary hover:underline font-semibold text-lg">
              Compare all features in detail
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-gradient-to-br from-primary via-purple-600 to-blue-600 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.3, 0.1],
              x: [0, -50, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-1/2 left-1/2 w-80 h-80 bg-white/10 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.15, 0.25, 0.15],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full mb-8">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Transform Your Organization with AI</span>
            </div>
          </motion.div>

          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Ready to Experience the Future of Knowledge Management?
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl mb-12 opacity-95 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join 50,000+ users who trust GIGA Intelligence to power their knowledge workflows with cutting-edge AI
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Link to="/signup">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="secondary" className="gap-3 text-lg px-10 py-6 text-primary shadow-2xl">
                  <Sparkles className="w-6 h-6" />
                  Start Free Trial
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </motion.div>
            </Link>
            <Link to="/dashboard-chat">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="gap-3 text-lg px-10 py-6 bg-white/10 hover:bg-white/20 border-2 border-white/40 backdrop-blur-sm shadow-xl">
                  <Play className="w-6 h-6" />
                  Watch Live Demo
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-8 text-sm opacity-90"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.9 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Free 14-day trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>Setup in 5 minutes</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-b from-secondary/30 to-secondary/60 dark:from-[#0f0f0f] dark:to-[#000000] border-t border-border dark:border-[#2a2a2a] pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Footer Content */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <motion.div
                className="flex items-center gap-3 mb-6"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl dark:text-gray-100">GIGA Intelligence</h3>
                  <p className="text-xs text-muted-foreground dark:text-gray-400">Neural AI Platform</p>
                </div>
              </motion.div>
              <p className="text-sm text-muted-foreground dark:text-gray-400 mb-6 leading-relaxed max-w-sm">
                Transform your organization with next-generation AI. Built for teams that demand enterprise-grade intelligence with startup agility.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: "𝕏", label: "Twitter" },
                  { icon: "in", label: "LinkedIn" },
                  { icon: "GH", label: "GitHub" },
                  { icon: "YT", label: "YouTube" },
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    className="w-10 h-10 rounded-lg bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] flex items-center justify-center hover:border-primary dark:hover:border-primary transition-colors"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.label}
                  >
                    <span className="font-bold text-sm dark:text-gray-200">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="font-bold mb-6 dark:text-gray-100 text-base">Product</h4>
              <ul className="space-y-3 text-sm">
                {[
                  { label: "Features", to: "/" },
                  { label: "AI Agents", to: "/ai-agents" },
                  { label: "Workflows", to: "/workflows" },
                  { label: "Integrations", to: "/" },
                  { label: "Security", to: "/" },
                  { label: "Pricing", to: "/pricing" },
                  { label: "Changelog", to: "#" },
                ].map((link, i) => (
                  <li key={i}>
                    <Link to={link.to} className="text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="font-bold mb-6 dark:text-gray-100 text-base">Resources</h4>
              <ul className="space-y-3 text-sm">
                {[
                  "Documentation",
                  "API Reference",
                  "Tutorials",
                  "Blog",
                  "Community",
                  "Help Center",
                  "Status Page",
                ].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h4 className="font-bold mb-6 dark:text-gray-100 text-base">Company</h4>
              <ul className="space-y-3 text-sm">
                {[
                  "About Us",
                  "Careers",
                  "Partners",
                  "Press Kit",
                  "Contact",
                  "Terms",
                  "Privacy",
                ].map((link, i) => (
                  <li key={i}>
                    <a href="#" className="text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            className="border-t border-border dark:border-[#2a2a2a] pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-sm text-muted-foreground dark:text-gray-400">
              &copy; 2026 GIGA Intelligence. All rights reserved. Built with{" "}
              <span className="text-red-500">♥</span> for the future of work.
            </div>
            <div className="flex items-center gap-6 text-xs text-muted-foreground dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>All systems operational</span>
              </div>
              <a href="#" className="hover:text-primary transition-colors">SOC2 Certified</a>
              <a href="#" className="hover:text-primary transition-colors">GDPR Compliant</a>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/Login.tsx`

- Category: `screens`
- Bytes: `10616`
- SHA-256: `849b21e220bae43c07c9bcb948c587a74c36900b73c663fc9bab8a83d18b3824`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `Login.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-purple-50 dark:from-[#0a0a0a] dark:via-[#0f0f0f] dark:to-purple-950/20 flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo & Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-purple-600 rounded-2xl mb-4 shadow-lg"
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <Sparkles className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold text-foreground dark:text-gray-100 mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Sign in to your GIGA Intelligence account
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-xl border border-border dark:border-[#2a2a2a] p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-gray-100 transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground dark:text-gray-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary/50 dark:text-gray-100 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border dark:border-[#2a2a2a] text-primary focus:ring-primary/50"
                />
                <span className="text-muted-foreground dark:text-gray-400">Remember me</span>
              </label>
              <button
                type="button"
                className="text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Button
                type="submit"
                className="w-full py-3 text-base font-semibold gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </motion.div>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border dark:border-[#2a2a2a]" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-[#1a1a1a] text-muted-foreground dark:text-gray-400">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border dark:border-[#2a2a2a] rounded-lg hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-sm font-medium dark:text-gray-200">Google</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-border dark:border-[#2a2a2a] rounded-lg hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <span className="text-sm font-medium dark:text-gray-200">GitHub</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Sign Up Link */}
        <motion.p
          className="text-center mt-6 text-sm text-muted-foreground dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-primary font-semibold hover:underline"
          >
            Sign up for free
          </button>
        </motion.p>
      </motion.div>
    </div>
  );
}
```

## `process-monitoring-final/src/app/screens/NewComponentsShowcase.tsx`

- Category: `screens`
- Bytes: `11925`
- SHA-256: `05234b9f159d501d0a591504424d4266559c74b31eb6ccfc7ba4d485fb48a6e8`

### Reuse notes

Use this artifact when the Software Builder needs the `screens` pattern represented by `NewComponentsShowcase.tsx`. Preserve imports, component boundaries, state names, and styling conventions shown in the snippet unless the target app requires a typed adaptation.

### Exact snippet

```tsx
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
```
