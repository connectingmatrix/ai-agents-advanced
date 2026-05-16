# UI Kit Screens Source Context

This file exports 25 source file(s). Each section includes reuse guidance and an exact snippet from the uploaded UI Kit.

## `src/app/screens/Activity.tsx`

- Category: screen.
- Imports: import { useState } from "react";, import { useNavigate } from "react-router";, import { Card } from "../components/Card";, import { recentActivity, posts, subjects } from "../data/mockData";, import { MessageSquare, Eye, Clock } from "lucide-react";
- Exports: export function Activity() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/Card";
import { recentActivity, posts, subjects } from "../data/mockData";
import { MessageSquare, Eye, Clock } from "lucide-react";

export function Activity() {
  const [activeTab, setActiveTab] = useState<"chats" | "viewed">("chats");
  const navigate = useNavigate();

  const tabs = [
    { id: "chats", label: "Recent Chats", icon: MessageSquare },
    { id: "viewed", label: "Viewed Content", icon: Eye },
  ];

  const getFilteredActivity = () => {
    if (activeTab === "chats") {
      return recentActivity.filter((a) => a.type === "chat");
    } else if (activeTab === "viewed") {
      return recentActivity.filter((a) => a.type === "view");
    }
    return [];
  };

  const filteredActivity = getFilteredActivity();

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-2">Activity</h1>
        <p className="text-muted-foreground">Track your learning journey</p>
      </header>

      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="space-y-2">
        {filteredActivity.length > 0 ? (
          filteredActivity.map((activity) => {
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
                className="hover:border-primary/40"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-secondary rounded-xl">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium mb-1">{activity.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {activity.contextName}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                </div>
              </Card>
            );
          })
        ) : (
          <Card>
            <div className="text-center py-8 text-muted-foreground">
              <p>No activity yet in this category</p>
              <p className="text-sm mt-2">
                Start exploring to see your activity here
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
````````

## `src/app/screens/AdminDashboard.tsx`

- Category: screen.
- Imports: import { ProcessMonitorView } from '../process-monitoring/views/ProcessMonitorView';
- Exports: export function AdminDashboard() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { ProcessMonitorView } from '../process-monitoring/views/ProcessMonitorView';

export function AdminDashboard() {
  return <ProcessMonitorView accessMode="root" title="Admin Dashboard" />;
}
````````

## `src/app/screens/AdminPlansAndPolicies.tsx`

- Category: screen.
- Imports: import { useState } from 'react';, import { Shield, Save, CreditCard, Building2, Users, Search, AlertCircle, Edit2, Check, X } from 'lucide-react';, import { Button } from '../components/Button';, import { Card } from '../components/Card';, import { Badge } from '../components/Badge';, import { SearchBar } from '../components/SearchBar';, import { LazyLoadList } from '../components/LazyLoadList';, import { EmptyState } from '../components/EmptyState';, import { useToast } from '../components/Toast';
- Exports: export default function AdminPlansAndPolicies() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from 'react';
import { Shield, Save, CreditCard, Building2, Users, Search, AlertCircle, Edit2, Check, X } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { SearchBar } from '../components/SearchBar';
import { LazyLoadList } from '../components/LazyLoadList';
import { EmptyState } from '../components/EmptyState';
import { useToast } from '../components/Toast';

type PlanType = 'starter' | 'pro' | 'business-lite' | 'business-lite-seat';
type EntityType = 'organization' | 'user';

interface Plan {
  id: PlanType;
  name: string;
  price: string;
}

interface Limitation {
  id: string;
  name: string;
  description: string;
  unit: string;
}

interface LimitOverride {
  limitId: string;
  value: number;
  isOverridden: boolean;
}

interface Organization {
  id: string;
  name: string;
  plan: PlanType;
  userCount: number;
  activeUsers: number;
  createdAt: string;
  status: 'active' | 'suspended';
  limitOverrides: Record<string, LimitOverride>;
}

interface User {
  id: string;
  name: string;
  email: string;
  organization: string;
  organizationId: string;
  role: string;
  plan: PlanType;
  status: 'active' | 'inactive';
  lastActive: string;
  limitOverrides: Record<string, LimitOverride>;
}

export default function AdminPlansAndPolicies() {
  const { showToast } = useToast();
  const [entityType, setEntityType] = useState<EntityType>('organization');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingLimitId, setEditingLimitId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');

  const plans: Plan[] = [
    { id: 'starter', name: 'Starter Pack', price: 'Free' },
    { id: 'pro', name: 'Pro', price: '$29/month' },
    { id: 'business-lite', name: 'Business Lite', price: '$99/month' },
    { id: 'business-lite-seat', name: 'Business Lite Seat', price: '$15/seat/month' },
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

  const defaultPlanLimits: Record<PlanType, Record<string, number>> = {
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
      ORG_SHARED_SPACE_BYTES: 1073741824,
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
      ORG_SHARED_SPACE_BYTES: 10737418240,
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
      ORG_SHARED_SPACE_BYTES: 53687091200,
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
      ORG_SHARED_SPACE_BYTES: 107374182400,
    },
  };

  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: '1',
      name: 'Acme Corporation',
      plan: 'business-lite',
      userCount: 45,
      activeUsers: 38,
      createdAt: '2024-01-15',
      status: 'active',
      limitOverrides: {
        CHANNEL_COUNT: { limitId: 'CHANNEL_COUNT', value: 150, isOverridden: true },
      },
    },
    {
      id: '2',
      name: 'TechStart Inc',
      plan: 'pro',
      userCount: 8,
      activeUsers: 7,
      createdAt: '2024-02-20',
      status: 'active',
      limitOverrides: {},
    },
    {
      id: '3',
      name: 'Global Enterprises',
      plan: 'business-lite-seat',
      userCount: 234,
      activeUsers: 198,
      createdAt: '2023-11-05',
      status: 'active',
      limitOverrides: {
        MAX_WORKFLOW_AI_CREDITS_PER_BILLING_PERIOD: {
          limitId: 'MAX_WORKFLOW_AI_CREDITS_PER_BILLING_PERIOD',
          value: 200000,
          isOverridden: true
        },
      },
    },
    {
      id: '4',
      name: 'Startup Labs',
      plan: 'starter',
      userCount: 1,
      activeUsers: 1,
      createdAt: '2024-03-10',
      status: 'active',
      limitOverrides: {},
    },
    {
      id: '5',
      name: 'Suspended Corp',
      plan: 'pro',
      userCount: 12,
      activeUsers: 0,
      createdAt: '2024-01-01',
      status: 'suspended',
      limitOverrides: {},
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@acme.com',
      organization: 'Acme Corporation',
      organizationId: '1',
      role: 'Admin',
      plan: 'business-lite',
      status: 'active',
      lastActive: '5 minutes ago',
      limitOverrides: {
        CONCURRENT_EXECUTIONS_PER_USER: {
          limitId: 'CONCURRENT_EXECUTIONS_PER_USER',
          value: 20,
          isOverridden: true
        },
      },
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@techstart.com',
      organization: 'TechStart Inc',
      organizationId: '2',
      role: 'Editor',
      plan: 'pro',
      status: 'active',
      lastActive: '2 hours ago',
      limitOverrides: {},
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob.j@global.com',
      organization: 'Global Enterprises',
      organizationId: '3',
      role: 'Manager',
      plan: 'business-lite-seat',
      status: 'active',
      lastActive: 'Just now',
      limitOverrides: {},
    },
    {
      id: '4',
      name: 'Alice Williams',
      email: 'alice@startup.com',
      organization: 'Startup Labs',
      organizationId: '4',
      role: 'Owner',
      plan: 'starter',
      status: 'active',
      lastActive: '1 day ago',
      limitOverrides: {},
    },
  ]);

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedOrg = entityType === 'organization' ? organizations.find(o => o.id === selectedId) : null;
  const selectedUser = entityType === 'user' ? users.find(u => u.id === selectedId) : null;

  const getEffectiveLimit = (limitId: string, entity: Organization | User | null): number => {
    if (!entity) return 0;

    // Check if there's an override
    if (entity.limitOverrides[limitId]?.isOverridden) {
      return entity.limitOverrides[limitId].value;
    }

    // Return default plan limit
    return defaultPlanLimits[entity.plan][limitId] || 0;
  };

  const formatValue = (value: number, unit: string): string => {
    if (unit === 'bytes') {
      const gb = value / 1073741824;
      return `${gb.toFixed(1)} GB`;
    }
    return value.toLocaleString();
  };

  const handlePlanChange = (plan: PlanType) => {
    if (!selectedId) return;

    if (entityType === 'organization') {
      setOrganizations(orgs =>
        orgs.map(org => org.id === selectedId ? { ...org, plan } : org)
      );
      showToast('success', 'Organization plan updated');
    } else {
      setUsers(users =>
        users.map(user => user.id === selectedId ? { ...user, plan } : user)
      );
      showToast('success', 'User plan updated');
    }
  };

  const startEditingLimit = (limitId: string, currentValue: number) => {
    setEditingLimitId(limitId);
    setEditingValue(currentValue.toString());
  };

  const saveLimit = (limitId: string) => {
    if (!selectedId) return;

    const newValue = parseInt(editingValue, 10);
    if (isNaN(newValue) || newValue < 0) {
      showToast('error', 'Invalid value');
      return;
    }

    const override: LimitOverride = {
      limitId,
      value: newValue,
      isOverridden: true,
    };

    if (entityType === 'organization') {
      setOrganizations(orgs =>
        orgs.map(org =>
          org.id === selectedId
            ? { ...org, limitOverrides: { ...org.limitOverrides, [limitId]: override } }
            : org
        )
      );
      showToast('success', 'Organization limit updated');
    } else {
      setUsers(users =>
        users.map(user =>
          user.id === selectedId
            ? { ...user, limitOverrides: { ...user.limitOverrides, [limitId]: override } }
            : user
        )
      );
      showToast('success', 'User limit updated');
    }

    setEditingLimitId(null);
  };

  const removeOverride = (limitId: string) => {
    if (!selectedId) return;

    if (entityType === 'organization') {
      setOrganizations(orgs =>
        orgs.map(org => {
          if (org.id === selectedId) {
            const newOverrides = { ...org.limitOverrides };
            delete newOverrides[limitId];
            return { ...org, limitOverrides: newOverrides };
          }
          return org;
        })
      );
      showToast('success', 'Override removed');
    } else {
      setUsers(users =>
        users.map(user => {
          if (user.id === selectedId) {
            const newOverrides = { ...user.limitOverrides };
            delete newOverrides[limitId];
            return { ...user, limitOverrides: newOverrides };
          }
          return user;
        })
      );
      showToast('success', 'Override removed');
    }
  };

  const renderOrgItem = (org: Organization, isSelected: boolean) => (
    <div className="flex items-start gap-3 p-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
        org.status === 'active'
          ? 'bg-gradient-to-br from-blue-500 to-blue-600'
          : 'bg-gray-400 dark:bg-gray-600'
      }`}>
        <Building2 className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold dark:text-gray-100 truncate">{org.name}</h3>
          <Badge variant={org.status === 'active' ? 'success' : 'danger'}>
            {org.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground dark:text-gray-400 mb-2">
          {plans.find(p => p.id === org.plan)?.name} • {org.activeUsers}/{org.userCount} users active
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground dark:text-gray-500">
          <span>Created {org.createdAt}</span>
          {Object.keys(org.limitOverrides).length > 0 && (
            <Badge variant="warning" className="text-xs">
              {Object.keys(org.limitOverrides).length} overrides
            </Badge>
          )}
        </div>
      </div>
    </div>
  );

  const renderUserItem = (user: User, isSelected: boolean) => (
    <div className="flex items-start gap-3 p-4">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 text-white font-semibold">
        {user.name.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold dark:text-gray-100 truncate">{user.name}</h3>
          <Badge variant={user.status === 'active' ? 'success' : 'default'}>
            {user.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground dark:text-gray-400 truncate mb-1">
          {user.email}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground dark:text-gray-500">
          <span>{user.organization}</span>
          <span>•</span>
          <span>{user.role}</span>
          {Object.keys(user.limitOverrides).length > 0 && (
            <>
              <span>•</span>
              <Badge variant="warning" className="text-xs">
                {Object.keys(user.limitOverrides).length} overrides
              </Badge>
            </>
          )}
        </div>
      </div>
    </div>
  );

  const selectedEntity = entityType === 'organization' ? selectedOrg : selectedUser;

  return (
    <div className="min-h-screen bg-background dark:bg-[#0a0a0a]">
      <div className="flex h-screen flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-[#1a1a1a] border-b border-border dark:border-[#2a2a2a] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold dark:text-gray-100">Admin Plans & Policies</h1>
                <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                  Manage organization and user plans with custom limitations
                </p>
              </div>
            </div>

            {/* Entity Type Toggle */}
            <div className="flex items-center gap-2 p-1 bg-secondary dark:bg-[#2a2a2a] rounded-lg">
              <button
                onClick={() => {
                  setEntityType('organization');
                  setSelectedId(null);
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  entityType === 'organization'
                    ? 'bg-white dark:bg-[#1a1a1a] text-primary shadow-sm'
                    : 'text-muted-foreground dark:text-gray-400 hover:text-foreground'
                }`}
              >
                <Building2 className="w-4 h-4 inline mr-2" />
                Organizations
              </button>
              <button
                onClick={() => {
                  setEntityType('user');
                  setSelectedId(null);
                }}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  entityType === 'user'
                    ? 'bg-white dark:bg-[#1a1a1a] text-primary shadow-sm'
                    : 'text-muted-foreground dark:text-gray-400 hover:text-foreground'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Users
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - List */}
          <div className="w-96 border-r border-border dark:border-[#2a2a2a] overflow-y-auto bg-white dark:bg-[#0f0f0f]">
            <div className="p-4 border-b border-border dark:border-[#2a2a2a]">
              <div className="mb-3">
                <div className="text-sm text-muted-foreground dark:text-gray-400">
                  {entityType === 'organization'
                    ? `${organizations.length} organizations`
                    : `${users.length} users`}
                </div>
              </div>
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder={`Search ${entityType === 'organization' ? 'organizations' : 'users'}...`}
              />
            </div>

            {entityType === 'organization' ? (
              filteredOrganizations.length === 0 ? (
                <EmptyState
                  icon={Building2}
                  title="No organizations found"
                  description="Try adjusting your search"
                />
              ) : (
                <LazyLoadList
                  items={filteredOrganizations}
                  renderItem={renderOrgItem}
                  onItemClick={(org) => setSelectedId(org.id)}
                  selectedId={selectedId || undefined}
                  itemHeight={100}
                />
              )
            ) : (
              filteredUsers.length === 0 ? (
                <EmptyState
                  icon={Users}
                  title="No users found"
                  description="Try adjusting your search"
                />
              ) : (
                <LazyLoadList
                  items={filteredUsers}
                  renderItem={renderUserItem}
                  onItemClick={(user) => setSelectedId(user.id)}
                  selectedId={selectedId || undefined}
                  itemHeight={100}
                />
              )
            )}
          </div>

          {/* Right Panel - Details */}
          <div className="flex-1 overflow-y-auto">
            {selectedEntity ? (
              <div className="p-8">
                {/* Entity Header */}
                <div className="mb-6">
                  {entityType === 'organization' && selectedOrg && (
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <Building2 className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl font-bold dark:text-gray-100">{selectedOrg.name}</h2>
                          <Badge variant={selectedOrg.status === 'active' ? 'success' : 'danger'}>
                            {selectedOrg.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground dark:text-gray-400">
                          {selectedOrg.activeUsers}/{selectedOrg.userCount} active users • Created {selectedOrg.createdAt}
                        </p>
                      </div>
                    </div>
                  )}

                  {entityType === 'user' && selectedUser && (
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                        {selectedUser.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-2xl font-bold dark:text-gray-100">{selectedUser.name}</h2>
                          <Badge variant={selectedUser.status === 'active' ? 'success' : 'default'}>
                            {selectedUser.status}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground dark:text-gray-400">
                          {selectedUser.email} • {selectedUser.organization} • {selectedUser.role}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Plan Selection */}
                <Card className="mb-6">
                  <h3 className="font-semibold text-lg mb-4 dark:text-gray-100">Assigned Plan</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {plans.map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => handlePlanChange(plan.id)}
                        className={`p-4 border rounded-lg transition-all text-left ${
                          selectedEntity.plan === plan.id
                            ? 'border-primary bg-primary/5 dark:bg-primary/10'
                            : 'border-border dark:border-[#2a2a2a] hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            selectedEntity.plan === plan.id
                              ? 'border-primary bg-primary'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}>
                            {selectedEntity.plan === plan.id && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                          <h4 className="font-semibold text-sm dark:text-gray-100">{plan.name}</h4>
                        </div>
                        <p className="text-xs text-primary font-medium">{plan.price}</p>
                      </button>
                    ))}
                  </div>
                </Card>

                {/* Limits Configuration */}
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-lg dark:text-gray-100">Limitations</h3>
                    <Badge variant="info">
                      {Object.keys(selectedEntity.limitOverrides).length} custom overrides
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    {limitations.map((limitation) => {
                      const effectiveLimit = getEffectiveLimit(limitation.id, selectedEntity);
                      const isOverridden = selectedEntity.limitOverrides[limitation.id]?.isOverridden;
                      const defaultLimit = defaultPlanLimits[selectedEntity.plan][limitation.id];
                      const isEditing = editingLimitId === limitation.id;

                      return (
                        <div
                          key={limitation.id}
                          className={`p-4 border rounded-lg ${
                            isOverridden
                              ? 'border-orange-300 dark:border-orange-700 bg-orange-50/50 dark:bg-orange-950/20'
                              : 'border-border dark:border-[#2a2a2a]'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium dark:text-gray-100">{limitation.name}</h4>
                                {isOverridden && (
                                  <Badge variant="warning" className="text-xs">Custom</Badge>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground dark:text-gray-400 mb-2">
                                {limitation.description}
                              </p>

                              {isEditing ? (
                                <div className="flex items-center gap-2">
                                  <input
                                    type="number"
                                    value={editingValue}
                                    onChange={(e) => setEditingValue(e.target.value)}
                                    className="w-32 px-3 py-1 border border-border dark:border-[#2a2a2a] rounded bg-white dark:bg-[#1a1a1a] text-sm"
                                    autoFocus
                                  />
                                  <Button
                                    size="sm"
                                    onClick={() => saveLimit(limitation.id)}
                                    className="gap-1"
                                  >
                                    <Check className="w-3 h-3" />
                                    Save
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => setEditingLimitId(null)}
                                    className="gap-1"
                                  >
                                    <X className="w-3 h-3" />
                                    Cancel
                                  </Button>
                                </div>
                              ) : (
                                <div className="flex items-center gap-3 text-sm">
                                  <span className="text-muted-foreground dark:text-gray-400">
                                    Default: {formatValue(defaultLimit, limitation.unit)}
                                  </span>
                                  <span className="text-muted-foreground dark:text-gray-400">→</span>
                                  <span className="font-semibold text-primary">
                                    Current: {formatValue(effectiveLimit, limitation.unit)}
                                  </span>
                                </div>
                              )}
                            </div>

                            {!isEditing && (
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => startEditingLimit(limitation.id, effectiveLimit)}
                                  className="gap-1"
                                >
                                  <Edit2 className="w-3 h-3" />
                                  Edit
                                </Button>
                                {isOverridden && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => removeOverride(limitation.id)}
                                    className="gap-1 text-red-600 dark:text-red-400"
                                  >
                                    <X className="w-3 h-3" />
                                    Reset
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Card>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <EmptyState
                  icon={entityType === 'organization' ? Building2 : Users}
                  title={`No ${entityType} selected`}
                  description={`Select ${entityType === 'organization' ? 'an organization' : 'a user'} from the list to manage plans and limits`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
````````

## `src/app/screens/AdminPlansAndPoliciesEnhanced.tsx`

- Category: screen.
- Imports: import { useState } from 'react';, import { Shield, Save, CreditCard, Building2, Users, Settings, AlertCircle, Edit2, Check, X, Plus, Search, Box, Sparkles, Network, FileText } from 'lucide-react';, import { Button } from '../components/Button';, import { Card } from '../components/Card';, import { Badge } from '../components/Badge';, import { SearchBar } from '../components/SearchBar';, import { LazyLoadList } from '../components/LazyLoadList';, import { EmptyState } from '../components/EmptyState';, import { PermissionsMatrix, PermissionCategory, Role } from '../components/PermissionsMatrix';, import { useToast } from '../components/Toast';
- Exports: export default function AdminPlansAndPoliciesEnhanced() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from 'react';
import { Shield, Save, CreditCard, Building2, Users, Settings, AlertCircle, Edit2, Check, X, Plus, Search, Box, Sparkles, Network, FileText } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { SearchBar } from '../components/SearchBar';
import { LazyLoadList } from '../components/LazyLoadList';
import { EmptyState } from '../components/EmptyState';
import { PermissionsMatrix, PermissionCategory, Role } from '../components/PermissionsMatrix';
import { useToast } from '../components/Toast';

type PlanType = 'starter' | 'pro' | 'business-lite' | 'business-lite-seat';
type ViewMode = 'organization' | 'user' | 'global-plans';
type DetailTab = 'limits' | 'permissions';
type GlobalPlanTab = 'limits' | 'permissions' | 'restrictions';

interface Plan {
  id: PlanType;
  name: string;
  price: string;
}

interface Limitation {
  id: string;
  name: string;
  description: string;
  unit: string;
}

interface LimitOverride {
  limitId: string;
  value: number;
  isOverridden: boolean;
}

interface Organization {
  id: string;
  name: string;
  plan: PlanType;
  userCount: number;
  activeUsers: number;
  createdAt: string;
  status: 'active' | 'suspended';
  limitOverrides: Record<string, LimitOverride>;
  permissions: Record<string, string[]>;
}

interface User {
  id: string;
  name: string;
  email: string;
  organization: string;
  organizationId: string;
  role: string;
  plan: PlanType;
  status: 'active' | 'inactive';
  lastActive: string;
  limitOverrides: Record<string, LimitOverride>;
  permissions: Record<string, string[]>;
}

export default function AdminPlansAndPoliciesEnhanced() {
  const { showToast } = useToast();
  const [viewMode, setViewMode] = useState<ViewMode>('organization');
  const [detailTab, setDetailTab] = useState<DetailTab>('limits');
  const [globalPlanTab, setGlobalPlanTab] = useState<GlobalPlanTab>('limits');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editingLimitId, setEditingLimitId] = useState<string | null>(null);
  const [editingValue, setEditingValue] = useState<string>('');
  const [editingPlan, setEditingPlan] = useState<PlanType | null>(null);
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

  const [restrictedNodes, setRestrictedNodes] = useState<Record<PlanType, string[]>>({
    'starter': ['ai-governor-node', 'data-processor'],
    'pro': ['ai-governor-node'],
    'business-lite': [],
    'business-lite-seat': [],
  });

  const plans: Plan[] = [
    { id: 'starter', name: 'Starter Pack', price: 'Free' },
    { id: 'pro', name: 'Pro', price: '$29/month' },
    { id: 'business-lite', name: 'Business Lite', price: '$99/month' },
    { id: 'business-lite-seat', name: 'Business Lite Seat', price: '$15/seat/month' },
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

  const [defaultPlanLimits, setDefaultPlanLimits] = useState<Record<PlanType, Record<string, number>>>({
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
      ORG_SHARED_SPACE_BYTES: 1073741824,
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
      ORG_SHARED_SPACE_BYTES: 10737418240,
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
      ORG_SHARED_SPACE_BYTES: 53687091200,
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
      ORG_SHARED_SPACE_BYTES: 107374182400,
    },
  });

  const [defaultPlanPermissions, setDefaultPlanPermissions] = useState<Record<PlanType, Record<string, string[]>>>({
    starter: {
      admin: ['content.view', 'content.create', 'content.edit', 'ai.chat'],
      manager: ['content.view', 'content.create', 'ai.chat'],
      editor: ['content.view', 'content.create', 'ai.chat'],
      viewer: ['content.view'],
    },
    pro: {
      admin: ['content.view', 'content.create', 'content.edit', 'content.delete', 'workflows.view', 'workflows.create', 'workflows.execute', 'ai.chat', 'ai.agents'],
      manager: ['content.view', 'content.create', 'content.edit', 'workflows.view', 'workflows.execute', 'ai.chat'],
      editor: ['content.view', 'content.create', 'content.edit', 'ai.chat'],
      viewer: ['content.view'],
    },
    'business-lite': {
      admin: permissionCategories.flatMap(c => c.permissions.map(p => p.id)),
      manager: ['content.view', 'content.create', 'content.edit', 'content.publish', 'workflows.view', 'workflows.create', 'workflows.execute', 'ai.chat', 'ai.agents', 'ai.workflows'],
      editor: ['content.view', 'content.create', 'content.edit', 'ai.chat', 'ai.agents'],
      viewer: ['content.view'],
    },
    'business-lite-seat': {
      admin: permissionCategories.flatMap(c => c.permissions.map(p => p.id)),
      manager: ['content.view', 'content.create', 'content.edit', 'content.publish', 'workflows.view', 'workflows.create', 'workflows.execute', 'workflows.delete', 'ai.chat', 'ai.agents', 'ai.workflows'],
      editor: ['content.view', 'content.create', 'content.edit', 'content.publish', 'ai.chat', 'ai.agents'],
      viewer: ['content.view'],
    },
  });

  const [organizations, setOrganizations] = useState<Organization[]>([
    {
      id: '1',
      name: 'Acme Corporation',
      plan: 'business-lite',
      userCount: 45,
      activeUsers: 38,
      createdAt: '2024-01-15',
      status: 'active',
      limitOverrides: {
        CHANNEL_COUNT: { limitId: 'CHANNEL_COUNT', value: 150, isOverridden: true },
      },
      permissions: {
        admin: permissionCategories.flatMap(c => c.permissions.map(p => p.id)),
        manager: ['content.view', 'content.create', 'content.edit', 'workflows.view', 'workflows.execute', 'ai.chat'],
        editor: ['content.view', 'content.create', 'content.edit', 'ai.chat'],
        viewer: ['content.view'],
      },
    },
    {
      id: '2',
      name: 'TechStart Inc',
      plan: 'pro',
      userCount: 8,
      activeUsers: 7,
      createdAt: '2024-02-20',
      status: 'active',
      limitOverrides: {},
      permissions: {
        admin: permissionCategories.flatMap(c => c.permissions.map(p => p.id)),
        manager: ['content.view', 'content.create', 'workflows.view', 'ai.chat'],
        editor: ['content.view', 'content.create', 'ai.chat'],
        viewer: ['content.view'],
      },
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@acme.com',
      organization: 'Acme Corporation',
      organizationId: '1',
      role: 'Admin',
      plan: 'business-lite',
      status: 'active',
      lastActive: '5 minutes ago',
      limitOverrides: {
        CONCURRENT_EXECUTIONS_PER_USER: {
          limitId: 'CONCURRENT_EXECUTIONS_PER_USER',
          value: 20,
          isOverridden: true
        },
      },
      permissions: {
        admin: permissionCategories.flatMap(c => c.permissions.map(p => p.id)),
        manager: [],
        editor: [],
        viewer: [],
      },
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@techstart.com',
      organization: 'TechStart Inc',
      organizationId: '2',
      role: 'Editor',
      plan: 'pro',
      status: 'active',
      lastActive: '2 hours ago',
      limitOverrides: {},
      permissions: {
        admin: [],
        manager: [],
        editor: ['content.view', 'content.create', 'content.edit', 'ai.chat', 'workflows.view'],
        viewer: [],
      },
    },
  ]);

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.organization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedOrg = viewMode === 'organization' ? organizations.find(o => o.id === selectedId) : null;
  const selectedUser = viewMode === 'user' ? users.find(u => u.id === selectedId) : null;

  const formatValue = (value: number, unit: string): string => {
    if (unit === 'bytes') {
      const gb = value / 1073741824;
      return `${gb.toFixed(1)} GB`;
    }
    return value.toLocaleString();
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    setSelectedId(null);
    setDetailTab('limits');
  };

  const handlePlanChange = (plan: PlanType) => {
    if (!selectedId) return;

    if (viewMode === 'organization') {
      setOrganizations(orgs =>
        orgs.map(org => org.id === selectedId ? { ...org, plan } : org)
      );
      showToast('success', 'Organization plan updated');
    } else if (viewMode === 'user') {
      setUsers(users =>
        users.map(user => user.id === selectedId ? { ...user, plan } : user)
      );
      showToast('success', 'User plan updated');
    }
  };

  const saveGlobalLimit = (plan: PlanType, limitId: string, value: string) => {
    const newValue = parseInt(value, 10);
    if (isNaN(newValue) || newValue < 0) {
      showToast('error', 'Invalid value');
      return;
    }

    setDefaultPlanLimits(prev => ({
      ...prev,
      [plan]: {
        ...prev[plan],
        [limitId]: newValue,
      },
    }));

    showToast('success', `Global limit updated for ${plans.find(p => p.id === plan)?.name}`);
    setEditingLimitId(null);
    setEditingPlan(null);
  };

  const handleGlobalPlanPermissionsChange = (newPermissions: Record<string, string[]>) => {
    if (!selectedId) return;

    setDefaultPlanPermissions(prev => ({
      ...prev,
      [selectedId as PlanType]: newPermissions,
    }));

    showToast('success', `Permissions updated for ${plans.find(p => p.id === selectedId)?.name}`);
  };

  const handlePermissionsChange = (newPermissions: Record<string, string[]>) => {
    if (!selectedId) return;

    if (viewMode === 'organization') {
      setOrganizations(orgs =>
        orgs.map(org => org.id === selectedId ? { ...org, permissions: newPermissions } : org)
      );
      showToast('success', 'Organization permissions updated');
    } else if (viewMode === 'user') {
      setUsers(users =>
        users.map(user => user.id === selectedId ? { ...user, permissions: newPermissions } : user)
      );
      showToast('success', 'User permissions updated');
    }
  };

  const handleAddRestriction = () => {
    if (!selectedId || !selectedNodeToRestrict) return;

    const currentRestrictions = restrictedNodes[selectedId as PlanType] || [];
    if (currentRestrictions.includes(selectedNodeToRestrict)) {
      showToast('warning', 'This node is already restricted');
      return;
    }

    setRestrictedNodes(prev => ({
      ...prev,
      [selectedId as PlanType]: [...currentRestrictions, selectedNodeToRestrict],
    }));

    setSelectedNodeToRestrict('');
    showToast('success', 'Node restriction added');
  };

  const handleRemoveRestriction = (nodeId: string) => {
    if (!selectedId) return;

    setRestrictedNodes(prev => ({
      ...prev,
      [selectedId as PlanType]: prev[selectedId as PlanType].filter(id => id !== nodeId),
    }));

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

  const renderOrgItem = (org: Organization, isSelected: boolean) => (
    <div className="flex items-start gap-3 p-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
        org.status === 'active'
          ? 'bg-gradient-to-br from-blue-500 to-blue-600'
          : 'bg-gray-400 dark:bg-gray-600'
      }`}>
        <Building2 className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold dark:text-gray-100 truncate">{org.name}</h3>
          <Badge variant={org.status === 'active' ? 'success' : 'danger'}>
            {org.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground dark:text-gray-400 mb-2">
          {plans.find(p => p.id === org.plan)?.name} • {org.activeUsers}/{org.userCount} users
        </p>
      </div>
    </div>
  );

  const renderUserItem = (user: User, isSelected: boolean) => (
    <div className="flex items-start gap-3 p-4">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0 text-white font-semibold">
        {user.name.split(' ').map(n => n[0]).join('')}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold dark:text-gray-100 truncate">{user.name}</h3>
          <Badge variant={user.status === 'active' ? 'success' : 'default'}>
            {user.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground dark:text-gray-400 truncate">
          {user.email}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background dark:bg-[#0a0a0a]">
      <div className="flex h-screen flex-col">
        {/* Header */}
        <div className="bg-white dark:bg-[#1a1a1a] border-b border-border dark:border-[#2a2a2a] p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold dark:text-gray-100">Admin Plans & Policies</h1>
                <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                  Manage plans, limits, and permissions globally
                </p>
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 p-1 bg-secondary dark:bg-[#2a2a2a] rounded-lg">
              <button
                onClick={() => handleViewModeChange('organization')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'organization'
                    ? 'bg-white dark:bg-[#1a1a1a] text-primary shadow-sm'
                    : 'text-muted-foreground dark:text-gray-400 hover:text-foreground'
                }`}
              >
                <Building2 className="w-4 h-4 inline mr-2" />
                Organizations
              </button>
              <button
                onClick={() => handleViewModeChange('user')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'user'
                    ? 'bg-white dark:bg-[#1a1a1a] text-primary shadow-sm'
                    : 'text-muted-foreground dark:text-gray-400 hover:text-foreground'
                }`}
              >
                <Users className="w-4 h-4 inline mr-2" />
                Users
              </button>
              <button
                onClick={() => handleViewModeChange('global-plans')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'global-plans'
                    ? 'bg-white dark:bg-[#1a1a1a] text-primary shadow-sm'
                    : 'text-muted-foreground dark:text-gray-400 hover:text-foreground'
                }`}
              >
                <Settings className="w-4 h-4 inline mr-2" />
                Global Plans
              </button>
            </div>
          </div>
        </div>

        {viewMode === 'global-plans' ? (
          // Global Plans View - Full width with plan cards at top
          <div className="flex-1 overflow-y-auto">
            <div className="p-8">
              <div className="max-w-6xl mx-auto">
                {/* Plan Selection Cards */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Assigned Plan</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {plans.map((plan) => (
                      <button
                        key={plan.id}
                        onClick={() => setSelectedId(plan.id)}
                        className={`p-4 border-2 rounded-lg transition-all text-left ${
                          selectedId === plan.id
                            ? 'border-primary bg-primary/5 dark:bg-primary/10'
                            : 'border-border dark:border-[#2a2a2a] hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            selectedId === plan.id
                              ? 'border-primary bg-primary'
                              : 'border-gray-300 dark:border-gray-600'
                          }`}>
                            {selectedId === plan.id && (
                              <div className="w-2.5 h-2.5 bg-white rounded-full" />
                            )}
                          </div>
                          <h3 className="font-semibold text-base dark:text-gray-100">{plan.name}</h3>
                        </div>
                        <p className="text-sm text-primary font-medium">{plan.price}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tabs and Content */}
                {selectedId ? (
                  <div>
                    {/* Tab Navigation */}
                    <div className="flex gap-1 mb-6 border-b border-border dark:border-[#2a2a2a]">
                      <button
                        onClick={() => setGlobalPlanTab('limits')}
                        className={`px-4 py-2.5 font-medium transition-colors relative ${
                          globalPlanTab === 'limits'
                            ? 'text-primary'
                            : 'text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200'
                        }`}
                      >
                        Limits
                        {globalPlanTab === 'limits' && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                      </button>
                      <button
                        onClick={() => setGlobalPlanTab('permissions')}
                        className={`px-4 py-2.5 font-medium transition-colors relative ${
                          globalPlanTab === 'permissions'
                            ? 'text-primary'
                            : 'text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200'
                        }`}
                      >
                        Permissions
                        {globalPlanTab === 'permissions' && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                      </button>
                      <button
                        onClick={() => setGlobalPlanTab('restrictions')}
                        className={`px-4 py-2.5 font-medium transition-colors relative ${
                          globalPlanTab === 'restrictions'
                            ? 'text-primary'
                            : 'text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200'
                        }`}
                      >
                        Restrictions
                        {globalPlanTab === 'restrictions' && (
                          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                      </button>
                    </div>

                    {/* Tab Content */}
                    {globalPlanTab === 'limits' && (
                      <div>
                        <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Current Limits</h2>
                        <Card className="overflow-hidden">
                          <div className="divide-y divide-border dark:divide-[#2a2a2a]">
                            {limitations.map((limitation) => {
                              const value = defaultPlanLimits[selectedId as PlanType][limitation.id];
                              const isEditing = editingLimitId === limitation.id && editingPlan === selectedId;

                              return (
                                <div
                                  key={limitation.id}
                                  className="p-4 hover:bg-secondary/50 dark:hover:bg-[#1a1a1a] transition-colors"
                                >
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <h4 className="font-semibold dark:text-gray-100">{limitation.name}</h4>
                                      </div>
                                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                                        {limitation.description}
                                      </p>
                                    </div>

                                    <div className="flex items-center gap-3">
                                      {isEditing ? (
                                        <>
                                          <input
                                            type="number"
                                            value={editingValue}
                                            onChange={(e) => setEditingValue(e.target.value)}
                                            className="w-32 px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] text-sm dark:text-gray-100"
                                            autoFocus
                                          />
                                          <Button
                                            size="sm"
                                            onClick={() => saveGlobalLimit(selectedId as PlanType, limitation.id, editingValue)}
                                            className="gap-1"
                                          >
                                            <Check className="w-3 h-3" />
                                          </Button>
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                              setEditingLimitId(null);
                                              setEditingPlan(null);
                                            }}
                                            className="gap-1"
                                          >
                                            <X className="w-3 h-3" />
                                          </Button>
                                        </>
                                      ) : (
                                        <>
                                          <div className="text-right min-w-[100px]">
                                            <div className="text-2xl font-bold text-primary">
                                              {formatValue(value, limitation.unit)}
                                            </div>
                                          </div>
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                              setEditingLimitId(limitation.id);
                                              setEditingPlan(selectedId as PlanType);
                                              setEditingValue(value.toString());
                                            }}
                                            className="gap-1"
                                          >
                                            <Edit2 className="w-3 h-3" />
                                            Edit
                                          </Button>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </Card>
                      </div>
                    )}

                    {globalPlanTab === 'permissions' && (
                      <div>
                        <h2 className="text-xl font-semibold mb-4 dark:text-gray-100">Plan Permissions</h2>
                        <Card>
                          <PermissionsMatrix
                            roles={roles}
                            categories={permissionCategories}
                            initialPermissions={defaultPlanPermissions[selectedId as PlanType]}
                            onChange={handleGlobalPlanPermissionsChange}
                          />
                        </Card>
                      </div>
                    )}

                    {globalPlanTab === 'restrictions' && (
                      <div>
                        <h2 className="text-xl font-semibold mb-4 text-primary">NODE PERMISSIONS</h2>
                        <p className="text-sm text-muted-foreground dark:text-gray-400 mb-6">
                          Selected nodes are blocked by the plan before organization or user overrides are applied.
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
                              {availableNodes.filter(node => !restrictedNodes[selectedId as PlanType]?.includes(node.id)).map(node => (
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
                        <Card>
                          <div className="divide-y divide-border dark:divide-[#2a2a2a]">
                            {filteredAvailableNodes.length === 0 ? (
                              <div className="p-8 text-center text-muted-foreground dark:text-gray-400">
                                No nodes found
                              </div>
                            ) : (
                              filteredAvailableNodes.map((node) => {
                                const Icon = getNodeIcon(node.icon);
                                const isRestricted = restrictedNodes[selectedId as PlanType]?.includes(node.id);

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
                        </Card>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-20">
                    <EmptyState
                      icon={CreditCard}
                      title="Select a plan"
                      description="Choose a plan above to view and configure its settings"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          // Organizations/Users View
          <div className="flex flex-1 overflow-hidden">
            {/* Left Sidebar - List */}
            <div className="w-96 border-r border-border dark:border-[#2a2a2a] overflow-y-auto bg-white dark:bg-[#0f0f0f]">
              <div className="p-4 border-b border-border dark:border-[#2a2a2a]">
                <div className="mb-3">
                  <div className="text-sm text-muted-foreground dark:text-gray-400">
                    {viewMode === 'organization'
                      ? `${organizations.length} organizations`
                      : `${users.length} users`}
                  </div>
                </div>
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder={`Search ${viewMode === 'organization' ? 'organizations' : 'users'}...`}
                />
              </div>

              {viewMode === 'organization' ? (
                filteredOrganizations.length === 0 ? (
                  <EmptyState
                    icon={Building2}
                    title="No organizations found"
                    description="Try adjusting your search"
                  />
                ) : (
                  <LazyLoadList
                    items={filteredOrganizations}
                    renderItem={renderOrgItem}
                    onItemClick={(org) => setSelectedId(org.id)}
                    selectedId={selectedId || undefined}
                    itemHeight={100}
                  />
                )
              ) : (
                filteredUsers.length === 0 ? (
                  <EmptyState
                    icon={Users}
                    title="No users found"
                    description="Try adjusting your search"
                  />
                ) : (
                  <LazyLoadList
                    items={filteredUsers}
                    renderItem={renderUserItem}
                    onItemClick={(user) => setSelectedId(user.id)}
                    selectedId={selectedId || undefined}
                    itemHeight={100}
                  />
                )
              )}
            </div>

            {/* Right Panel - Details */}
            <div className="flex-1 overflow-hidden flex flex-col">
              {(selectedOrg || selectedUser) ? (
                <>
                  {/* Entity Header */}
                  <div className="p-6 border-b border-border dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a]">
                    {selectedOrg && (
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                          <Building2 className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-bold dark:text-gray-100">{selectedOrg.name}</h2>
                            <Badge variant={selectedOrg.status === 'active' ? 'success' : 'danger'}>
                              {selectedOrg.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground dark:text-gray-400">
                            {selectedOrg.activeUsers}/{selectedOrg.userCount} active users • Created {selectedOrg.createdAt}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedUser && (
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-2xl">
                          {selectedUser.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-bold dark:text-gray-100">{selectedUser.name}</h2>
                            <Badge variant={selectedUser.status === 'active' ? 'success' : 'default'}>
                              {selectedUser.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground dark:text-gray-400">
                            {selectedUser.email} • {selectedUser.organization} • {selectedUser.role}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tabs */}
                  <div className="flex items-center gap-4 px-6 bg-white dark:bg-[#1a1a1a] border-b border-border dark:border-[#2a2a2a]">
                    <button
                      onClick={() => setDetailTab('limits')}
                      className={`px-4 py-3 border-b-2 transition-colors ${
                        detailTab === 'limits'
                          ? 'border-primary text-primary font-medium'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Limits & Plan
                    </button>
                    <button
                      onClick={() => setDetailTab('permissions')}
                      className={`px-4 py-3 border-b-2 transition-colors ${
                        detailTab === 'permissions'
                          ? 'border-primary text-primary font-medium'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      Permissions
                    </button>
                  </div>

                  {/* Tab Content */}
                  <div className="flex-1 overflow-y-auto p-6">
                    {detailTab === 'limits' && (
                      <div>
                        {/* Plan Selection */}
                        <Card className="mb-6">
                          <h3 className="font-semibold text-lg mb-4 dark:text-gray-100">Assigned Plan</h3>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {plans.map((plan) => {
                              const entity = selectedOrg || selectedUser;
                              return (
                                <button
                                  key={plan.id}
                                  onClick={() => handlePlanChange(plan.id)}
                                  className={`p-4 border rounded-lg transition-all text-left ${
                                    entity?.plan === plan.id
                                      ? 'border-primary bg-primary/5 dark:bg-primary/10'
                                      : 'border-border dark:border-[#2a2a2a] hover:border-primary/50'
                                  }`}
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                      entity?.plan === plan.id
                                        ? 'border-primary bg-primary'
                                        : 'border-gray-300 dark:border-gray-600'
                                    }`}>
                                      {entity?.plan === plan.id && (
                                        <div className="w-2 h-2 bg-white rounded-full" />
                                      )}
                                    </div>
                                    <h4 className="font-semibold text-sm dark:text-gray-100">{plan.name}</h4>
                                  </div>
                                  <p className="text-xs text-primary font-medium">{plan.price}</p>
                                </button>
                              );
                            })}
                          </div>
                        </Card>

                        {/* Limits - Simplified view, edit handled in Global Plans */}
                        <Card>
                          <h3 className="font-semibold text-lg mb-4 dark:text-gray-100">Current Limits</h3>
                          <div className="space-y-3">
                            {limitations.map((limitation) => {
                              const entity = selectedOrg || selectedUser;
                              const defaultLimit = defaultPlanLimits[entity!.plan][limitation.id];
                              const override = entity?.limitOverrides[limitation.id];
                              const currentValue = override?.isOverridden ? override.value : defaultLimit;

                              return (
                                <div
                                  key={limitation.id}
                                  className={`p-3 border rounded-lg ${
                                    override?.isOverridden
                                      ? 'border-orange-300 dark:border-orange-700 bg-orange-50/50 dark:bg-orange-950/20'
                                      : 'border-border dark:border-[#2a2a2a]'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <div>
                                      <div className="flex items-center gap-2">
                                        <h4 className="font-medium text-sm dark:text-gray-100">{limitation.name}</h4>
                                        {override?.isOverridden && (
                                          <Badge variant="warning" className="text-xs">Custom</Badge>
                                        )}
                                      </div>
                                      <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">
                                        {limitation.description}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <div className="text-sm font-semibold text-primary">
                                        {formatValue(currentValue, limitation.unit)}
                                      </div>
                                      {override?.isOverridden && (
                                        <div className="text-xs text-muted-foreground dark:text-gray-400">
                                          Default: {formatValue(defaultLimit, limitation.unit)}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="mt-4 p-3 bg-blue-50/50 dark:bg-blue-950/20 rounded-lg">
                            <p className="text-xs text-blue-800 dark:text-blue-300">
                              Custom limit overrides can be set per {viewMode} to override plan defaults.
                              These are managed separately from global plan limits.
                            </p>
                          </div>
                        </Card>
                      </div>
                    )}

                    {detailTab === 'permissions' && (
                      <Card>
                        <h3 className="font-semibold text-lg mb-4 dark:text-gray-100">
                          {viewMode === 'organization' ? 'Organization' : 'User'} Permissions
                        </h3>
                        <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
                          Configure role-based permissions for this {viewMode}.
                        </p>
                        <PermissionsMatrix
                          categories={permissionCategories}
                          roles={roles}
                          initialPermissions={
                            viewMode === 'organization'
                              ? selectedOrg?.permissions || {}
                              : selectedUser?.permissions || {}
                          }
                          onChange={handlePermissionsChange}
                          editable={true}
                        />
                      </Card>
                    )}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <EmptyState
                    icon={viewMode === 'organization' ? Building2 : Users}
                    title={`No ${viewMode} selected`}
                    description={`Select ${viewMode === 'organization' ? 'an organization' : 'a user'} from the list to manage`}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
````````

## `src/app/screens/AdvancedComponentsShowcase.tsx`

- Category: screen.
- Imports: import { useState } from "react";, import { SplitView } from "../components/SplitView";, import { LazyLoadList, ListItem } from "../components/LazyLoadList";, import { LazyLoadTree, TreeNode } from "../components/LazyLoadTree";, import { TabbedFormView, TabConfig } from "../components/TabbedFormView";, import { DraggableTable, TableColumn, TableAction } from "../components/DraggableTable";, import { Modal } from "../components/Modal";, import { FilterBar, FilterConfig } from "../components/FilterBar";, import { CascadingFormExample } from "../components/DependentSelect";, import { Button } from "../components/Button";
- Exports: export function AdvancedComponentsShowcase() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from "react";
import { SplitView } from "../components/SplitView";
import { LazyLoadList, ListItem } from "../components/LazyLoadList";
import { LazyLoadTree, TreeNode } from "../components/LazyLoadTree";
import { TabbedFormView, TabConfig } from "../components/TabbedFormView";
import { DraggableTable, TableColumn, TableAction } from "../components/DraggableTable";
import { Modal } from "../components/Modal";
import { FilterBar, FilterConfig } from "../components/FilterBar";
import { CascadingFormExample } from "../components/DependentSelect";
import { Button } from "../components/Button";
import { useToast } from "../components/Toast";
import { Edit, Trash2, Eye, FileText, Folder, Database, Table, List } from "lucide-react";

interface DataItem {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
}

export function AdvancedComponentsShowcase() {
  const { showToast } = useToast();
  const [viewMode, setViewMode] = useState<'list' | 'tree'>('list');
  const [selectedItem, setSelectedItem] = useState<ListItem | TreeNode | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<'form' | 'table' | 'view'>('form');

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
            // Simulate API call
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

  // Sample data for table
  const tableData: DataItem[] = Array.from({ length: 20 }, (_, i) => ({
    id: `row-${i}`,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: ['Admin', 'Editor', 'Viewer'][i % 3],
    department: ['Engineering', 'Sales', 'Marketing'][i % 3],
    status: ['Active', 'Inactive'][i % 2],
  }));

  const tableColumns: TableColumn<DataItem>[] = [
    { id: 'name', header: 'Name', accessor: (row) => row.name, sortable: true, width: 200 },
    { id: 'email', header: 'Email', accessor: (row) => row.email, sortable: true, width: 250 },
    { id: 'role', header: 'Role', accessor: (row) => row.role, sortable: true, width: 150 },
    { id: 'department', header: 'Department', accessor: (row) => row.department, sortable: true, width: 150 },
    { id: 'status', header: 'Status', accessor: (row) => (
      <span className={`px-2 py-1 text-xs ${row.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
        {row.status}
      </span>
    ), width: 120 },
  ];

  const tableActions: TableAction<DataItem>[] = [
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
      badge: tableData.length,
      content: (
        <div className="space-y-4">
          <h3 className="font-semibold dark:text-gray-100">Related Items</h3>
          <DraggableTable
            columns={tableColumns}
            data={tableData.slice(0, 5)}
            rowKey={(row) => row.id}
            actions={tableActions}
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

  const openModal = (content: 'form' | 'table' | 'view') => {
    setModalContent(content);
    setShowModal(true);
  };

  return (
    <div className="h-screen flex flex-col bg-secondary/30">
      {/* Header */}
      <div className="bg-white dark:bg-[#1a1a1a] border-b border-border dark:border-[#2a2a2a] p-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold mb-4 dark:text-gray-100">Advanced Components Showcase</h1>
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
      </div>

      {/* Filter Bar */}
      <div className="p-6 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <FilterBar
            filters={filterConfigs}
            onFilterChange={(filters) => console.log('Filters:', filters)}
            showSearch={true}
          />
        </div>
      </div>

      {/* Split View */}
      <div className="flex-1 overflow-hidden">
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

      {/* Modals */}
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
            columns={tableColumns}
            data={tableData}
            rowKey={(row) => row.id}
            actions={tableActions}
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
    </div>
  );
}
````````

## `src/app/screens/AIAgentEditor.tsx`

- Category: screen.
- Imports: import { useState } from 'react';, import { Save, Bot, Shield, Wrench, Brain, FileOutput, Zap, AlertTriangle } from 'lucide-react';, import { Card } from '../components/Card';, import { Button } from '../components/Button';, import { Badge } from '../components/Badge';, import { useNavigate, useSearchParams } from 'react-router';
- Exports: export default function AIAgentEditor() {
- Reuse guidance: Use this for AI Agent editor, testing, file ingestion, decision-chain, and project-debug surfaces.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from 'react';
import { Save, Bot, Shield, Wrench, Brain, FileOutput, Zap, AlertTriangle } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { useNavigate, useSearchParams } from 'react-router';

type AgentRisk = 'high' | 'medium' | 'low';
type AgentOutputBlock = 'text' | 'image' | 'file' | 'chart' | 'table';


export default function AIAgentEditor() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const agentId = searchParams.get('id');
  const isEditing = !!agentId;


  const [activeTab, setActiveTab] = useState<'basic' | 'tools' | 'guardrails' | 'output' | 'memory'>('basic');

  // Basic Info
  const [name, setName] = useState('Customer Support Agent');
  const [description, setDescription] = useState('Handles customer inquiries and support tickets');
  const [model, setModel] = useState('claude-sonnet-4.5');
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful customer support agent...');

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

  // Output Contract
  const [outputBlocks, setOutputBlocks] = useState<AgentOutputBlock[]>(['text', 'image']);
  const [responseFormat, setResponseFormat] = useState<'markdown' | 'json' | 'mixed'>('markdown');
  const [fileSyntax, setFileSyntax] = useState('[[file:path/to/file]]');
  const [excelSyntax, setExcelSyntax] = useState('[[excel:sheet_name]]');
  const [chartGroupSyntax, setChartGroupSyntax] = useState('[[chart:chart_id]]');

  // Memory Policy
  const [memoryEnabled, setMemoryEnabled] = useState(true);
  const [memoryScope, setMemoryScope] = useState<'chat' | 'session' | 'user' | 'organization' | 'agent'>('user');
  const [writeFeedback, setWriteFeedback] = useState(true);
  const [readBeforeRun, setReadBeforeRun] = useState(true);
  const [maxMemories, setMaxMemories] = useState(100);
  const [defaultImportance, setDefaultImportance] = useState(5);
  const [retentionDays, setRetentionDays] = useState(90);

  const handleSave = () => {
    const agentConfig = {
      name,
      description,
      model,
      systemPrompt,
      toolPolicy: {
        allowSystemTools,
        allowEntityTools,
        allowWorkflowTools,
        allowFileTools,
        allowMcpTools,
        allowedTools,
        blockedTools,
        maxToolPasses,
        requireConfirmationFor,
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
        blockedDomains,
      },
      outputContract: {
        blocks: outputBlocks,
        responseFormat,
        fileSyntax,
        excelSyntax,
        chartGroupSyntax,
      },
      memoryPolicy: {
        enabled: memoryEnabled,
        scope: memoryScope,
        writeFeedback,
        readBeforeRun,
        maxMemories,
        defaultImportance,
        retentionDays,
      },
    };
    console.log('Saving agent:', agentConfig);
    navigate('/ai-agents');
  };

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" className="sr-only peer" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
    </label>
  );

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
                <h1 className="text-xl font-bold dark:text-gray-100">
                  {isEditing ? 'Edit Agent' : 'Create New Agent'}
                </h1>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  Configure your AI agent's behavior and capabilities
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => navigate('/ai-agents')}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="gap-2">
                <Save className="w-4 h-4" />
                {isEditing ? 'Save Changes' : 'Create Agent'}
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-6 border-b border-border dark:border-[#2a2a2a] -mb-4">
            {[
              { id: 'basic', label: 'Basic Info', icon: Bot },
              { id: 'tools', label: 'Tool Policy', icon: Wrench },
              { id: 'guardrails', label: 'Guardrails', icon: Shield },
              { id: 'output', label: 'Output', icon: FileOutput },
              { id: 'memory', label: 'Memory', icon: Brain },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`pb-4 px-1 font-medium transition-colors relative flex items-center gap-2 ${
                    activeTab === tab.id
                      ? 'text-primary dark:text-primary'
                      : 'text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {activeTab === 'basic' && (
          <div className="max-w-3xl space-y-6">
            <Card>
              <h3 className="text-lg font-semibold mb-4 dark:text-gray-100">Basic Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">Agent Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter agent name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder="Describe what this agent does"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">Model *</label>
                  <select
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="claude-opus-4.7">Claude Opus 4.7 (Most Capable)</option>
                    <option value="claude-sonnet-4.5">Claude Sonnet 4.5 (Balanced)</option>
                    <option value="claude-haiku-4.5">Claude Haiku 4.5 (Fast)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">System Prompt</label>
                  <textarea
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    rows={6}
                    className="w-full px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary resize-none font-mono text-sm"
                    placeholder="Enter the system prompt that defines the agent's behavior"
                  />
                  <p className="text-xs text-muted-foreground dark:text-gray-500 mt-1">
                    This prompt will guide the agent's behavior and responses
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'tools' && (
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
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      Allow access to system-level operations
                    </p>
                  </div>
                  <ToggleSwitch checked={allowSystemTools} onChange={setAllowSystemTools} />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border dark:border-[#2a2a2a]">
                  <div>
                    <h4 className="font-medium dark:text-gray-200">Entity Tools</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      Allow CRUD operations on entities
                    </p>
                  </div>
                  <ToggleSwitch checked={allowEntityTools} onChange={setAllowEntityTools} />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border dark:border-[#2a2a2a]">
                  <div>
                    <h4 className="font-medium dark:text-gray-200">Workflow Tools</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      Allow execution of workflows
                    </p>
                  </div>
                  <ToggleSwitch checked={allowWorkflowTools} onChange={setAllowWorkflowTools} />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border dark:border-[#2a2a2a]">
                  <div>
                    <h4 className="font-medium dark:text-gray-200">File Tools</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      Allow file operations (read, write, delete)
                    </p>
                  </div>
                  <ToggleSwitch checked={allowFileTools} onChange={setAllowFileTools} />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border dark:border-[#2a2a2a]">
                  <div>
                    <h4 className="font-medium dark:text-gray-200">MCP Tools</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      Allow Model Context Protocol tools
                    </p>
                  </div>
                  <ToggleSwitch checked={allowMcpTools} onChange={setAllowMcpTools} />
                </div>

                <div className="pt-4">
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Max Tool Passes
                  </label>
                  <input
                    type="number"
                    value={maxToolPasses}
                    onChange={(e) => setMaxToolPasses(Number(e.target.value))}
                    min={1}
                    max={50}
                    className="w-32 px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <p className="text-xs text-muted-foreground dark:text-gray-500 mt-1">
                    Maximum number of tool invocations per request
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Require Confirmation For
                  </label>
                  <div className="flex gap-2">
                    {(['high', 'medium', 'low'] as AgentRisk[]).map((risk) => (
                      <button
                        key={risk}
                        onClick={() => {
                          setRequireConfirmationFor(
                            requireConfirmationFor.includes(risk)
                              ? requireConfirmationFor.filter(r => r !== risk)
                              : [...requireConfirmationFor, risk]
                          );
                        }}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          requireConfirmationFor.includes(risk)
                            ? 'bg-primary text-white border-primary'
                            : 'border-border dark:border-[#2a2a2a] dark:text-gray-300 hover:border-primary'
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

        {activeTab === 'guardrails' && (
          <div className="max-w-3xl space-y-6">
            <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50/50 dark:bg-yellow-900/10">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-900 dark:text-yellow-200 mb-1">Safety Guardrails</h4>
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    Configure safety measures to prevent unauthorized or dangerous operations
                  </p>
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
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      Ask for user approval before executing risky actions
                    </p>
                  </div>
                  <ToggleSwitch checked={requireConfirmation} onChange={setRequireConfirmation} />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border dark:border-[#2a2a2a]">
                  <div>
                    <h4 className="font-medium dark:text-gray-200">Block Destructive Operations</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      Prevent deletion and destructive modifications
                    </p>
                  </div>
                  <ToggleSwitch checked={blockDestructive} onChange={setBlockDestructive} />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border dark:border-[#2a2a2a]">
                  <div>
                    <h4 className="font-medium dark:text-gray-200">Block Admin Operations</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      Restrict administrative and privileged actions
                    </p>
                  </div>
                  <ToggleSwitch checked={blockAdmin} onChange={setBlockAdmin} />
                </div>

                <div className="flex items-center justify-between py-3 border-b border-border dark:border-[#2a2a2a]">
                  <div>
                    <h4 className="font-medium dark:text-gray-200">Block External Network</h4>
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      Prevent outbound network requests
                    </p>
                  </div>
                  <ToggleSwitch checked={blockExternalNetwork} onChange={setBlockExternalNetwork} />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                      Max Runtime (seconds)
                    </label>
                    <input
                      type="number"
                      value={maxRuntimeSeconds}
                      onChange={(e) => setMaxRuntimeSeconds(Number(e.target.value))}
                      min={10}
                      max={3600}
                      className="w-full px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                      Max Cost (USD)
                    </label>
                    <input
                      type="number"
                      value={maxCostUsd}
                      onChange={(e) => setMaxCostUsd(Number(e.target.value))}
                      min={0}
                      step={0.1}
                      className="w-full px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    PII Policy
                  </label>
                  <div className="flex gap-2">
                    {(['allow', 'mask', 'block'] as const).map((policy) => (
                      <button
                        key={policy}
                        onClick={() => setPiiPolicy(policy)}
                        className={`px-4 py-2 rounded-lg border transition-colors ${
                          piiPolicy === policy
                            ? 'bg-primary text-white border-primary'
                            : 'border-border dark:border-[#2a2a2a] dark:text-gray-300 hover:border-primary'
                        }`}
                      >
                        {policy.charAt(0).toUpperCase() + policy.slice(1)}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground dark:text-gray-500 mt-2">
                    How to handle Personally Identifiable Information
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'output' && (
          <div className="max-w-3xl space-y-6">
            <Card>
              <div className="flex items-center gap-3 mb-4">
                <FileOutput className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-semibold dark:text-gray-100">Output Configuration</h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Allowed Output Blocks
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['text', 'image', 'file', 'chart', 'table'] as AgentOutputBlock[]).map((block) => (
                      <button
                        key={block}
                        onClick={() => {
                          setOutputBlocks(
                            outputBlocks.includes(block)
                              ? outputBlocks.filter(b => b !== block)
                              : [...outputBlocks, block]
                          );
                        }}
                        className={`px-4 py-2 rounded-lg border transition-colors text-left ${
                          outputBlocks.includes(block)
                            ? 'bg-primary/10 dark:bg-primary/20 text-primary border-primary'
                            : 'border-border dark:border-[#2a2a2a] dark:text-gray-300 hover:border-primary'
                        }`}
                      >
                        {block.charAt(0).toUpperCase() + block.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Response Format
                  </label>
                  <select
                    value={responseFormat}
                    onChange={(e) => setResponseFormat(e.target.value as any)}
                    className="w-full px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="markdown">Markdown</option>
                    <option value="json">JSON</option>
                    <option value="mixed">Mixed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    File Syntax
                  </label>
                  <input
                    type="text"
                    value={fileSyntax}
                    onChange={(e) => setFileSyntax(e.target.value)}
                    className="w-full px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                    placeholder="e.g., [[file:path/to/file]]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Excel Syntax
                  </label>
                  <input
                    type="text"
                    value={excelSyntax}
                    onChange={(e) => setExcelSyntax(e.target.value)}
                    className="w-full px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                    placeholder="e.g., [[excel:sheet_name]]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                    Chart Group Syntax
                  </label>
                  <input
                    type="text"
                    value={chartGroupSyntax}
                    onChange={(e) => setChartGroupSyntax(e.target.value)}
                    className="w-full px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                    placeholder="e.g., [[chart:chart_id]]"
                  />
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'memory' && (
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
                    <p className="text-sm text-muted-foreground dark:text-gray-400">
                      Allow the agent to remember context across conversations
                    </p>
                  </div>
                  <ToggleSwitch checked={memoryEnabled} onChange={setMemoryEnabled} />
                </div>

                {memoryEnabled && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                        Memory Scope
                      </label>
                      <select
                        value={memoryScope}
                        onChange={(e) => setMemoryScope(e.target.value as any)}
                        className="w-full px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        <option value="chat">Chat (current conversation only)</option>
                        <option value="session">Session (current session)</option>
                        <option value="user">User (across all user conversations)</option>
                        <option value="organization">Organization (shared across org)</option>
                        <option value="agent">Agent (shared across all users)</option>
                      </select>
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-border dark:border-[#2a2a2a]">
                      <div>
                        <h4 className="font-medium dark:text-gray-200">Write Feedback</h4>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          Store user feedback in memory
                        </p>
                      </div>
                      <ToggleSwitch checked={writeFeedback} onChange={setWriteFeedback} />
                    </div>

                    <div className="flex items-center justify-between py-3 border-b border-border dark:border-[#2a2a2a]">
                      <div>
                        <h4 className="font-medium dark:text-gray-200">Read Before Run</h4>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          Load memories before processing requests
                        </p>
                      </div>
                      <ToggleSwitch checked={readBeforeRun} onChange={setReadBeforeRun} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                          Max Memories
                        </label>
                        <input
                          type="number"
                          value={maxMemories}
                          onChange={(e) => setMaxMemories(Number(e.target.value))}
                          min={1}
                          max={1000}
                          className="w-full px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                          Retention Days
                        </label>
                        <input
                          type="number"
                          value={retentionDays}
                          onChange={(e) => setRetentionDays(Number(e.target.value))}
                          min={1}
                          max={365}
                          className="w-full px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#1a1a1a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                        Default Importance (1-10)
                      </label>
                      <input
                        type="range"
                        value={defaultImportance}
                        onChange={(e) => setDefaultImportance(Number(e.target.value))}
                        min={1}
                        max={10}
                        className="w-full"
                      />
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
          </div>
        )}
      </div>
    </div>
  );
}
````````

## `src/app/screens/AIAgentProjectEditor.tsx`

- Category: screen.
- Imports: import { useState, useEffect } from 'react';, import { useNavigate, useSearchParams } from 'react-router';, import {, import { Button } from '../components/Button';, import { Badge } from '../components/Badge';, import { Card } from '../components/Card';
- Exports: export default function AIAgentProjectEditor() {
- Reuse guidance: Use this for AI Agent editor, testing, file ingestion, decision-chain, and project-debug surfaces.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import {
  Save,
  Play,
  RefreshCw,
  Settings,
  FileText,
  Rocket,
  Terminal,
  Sparkles,
  Monitor,
  Code,
  FolderOpen,
  Plus,
  Trash2,
  Download,
  Upload,
  ExternalLink,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
} from 'lucide-react';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { Card } from '../components/Card';

type TabType = 'overview' | 'files' | 'deployments' | 'logs' | 'ai-debug' | 'preview';

interface FileNode {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileNode[];
}

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
  source?: string;
}

interface Deployment {
  id: string;
  project_id: string;
  deployment_kind: string;
  status: string;
  url?: string;
  created_at: string;
}

export default function AIAgentProjectEditor() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectId = searchParams.get('id');
  const initialTab = (searchParams.get('tab') as TabType) || 'overview';

  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [projectName, setProjectName] = useState('E-Commerce Platform');
  const [projectDescription, setProjectDescription] = useState(
    'Full-featured e-commerce platform with cart, payments, and admin dashboard'
  );
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [isBuilding, setIsBuilding] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');

  // Mock file tree
  const [files] = useState<FileNode[]>([
    {
      id: '1',
      name: 'src',
      path: 'src',
      type: 'folder',
      children: [
        {
          id: '2',
          name: 'components',
          path: 'src/components',
          type: 'folder',
          children: [
            {
              id: '3',
              name: 'ProductCard.tsx',
              path: 'src/components/ProductCard.tsx',
              type: 'file',
              content: `import React from 'react';\n\nexport function ProductCard({ product }) {\n  return (\n    <div className="product-card">\n      <img src={product.image} alt={product.name} />\n      <h3>{product.name}</h3>\n      <p>{product.price}</p>\n    </div>\n  );\n}`,
            },
            {
              id: '4',
              name: 'Cart.tsx',
              path: 'src/components/Cart.tsx',
              type: 'file',
              content: `import React from 'react';\n\nexport function Cart({ items }) {\n  return (\n    <div className="cart">\n      {items.map(item => (\n        <div key={item.id}>{item.name}</div>\n      ))}\n    </div>\n  );\n}`,
            },
          ],
        },
        {
          id: '5',
          name: 'App.tsx',
          path: 'src/App.tsx',
          type: 'file',
          content: `import React from 'react';\nimport { ProductCard } from './components/ProductCard';\n\nfunction App() {\n  return (\n    <div className="app">\n      <h1>E-Commerce Store</h1>\n    </div>\n  );\n}\n\nexport default App;`,
        },
      ],
    },
    {
      id: '6',
      name: 'package.json',
      path: 'package.json',
      type: 'file',
      content: `{\n  "name": "e-commerce-platform",\n  "version": "1.0.0",\n  "dependencies": {\n    "react": "^18.2.0",\n    "react-dom": "^18.2.0"\n  }\n}`,
    },
  ]);

  // Mock logs
  const [logs] = useState<LogEntry[]>([
    {
      id: '1',
      timestamp: '10:24:33',
      level: 'info',
      message: 'Starting build process...',
      source: 'builder',
    },
    {
      id: '2',
      timestamp: '10:24:34',
      level: 'info',
      message: 'Installing dependencies...',
      source: 'npm',
    },
    {
      id: '3',
      timestamp: '10:24:45',
      level: 'success',
      message: 'Dependencies installed successfully',
      source: 'npm',
    },
    {
      id: '4',
      timestamp: '10:24:46',
      level: 'info',
      message: 'Compiling TypeScript...',
      source: 'tsc',
    },
    {
      id: '5',
      timestamp: '10:24:48',
      level: 'warn',
      message: 'Warning: Unused variable "count" in ProductCard.tsx',
      source: 'tsc',
    },
    {
      id: '6',
      timestamp: '10:24:50',
      level: 'success',
      message: 'Build completed successfully',
      source: 'builder',
    },
  ]);

  // Mock deployments
  const [deployments] = useState<Deployment[]>([
    {
      id: '1',
      project_id: 'proj-1',
      deployment_kind: 'sandbox',
      status: 'deployed',
      url: 'https://ecom-platform-abc123.app',
      created_at: '2024-05-10 10:24:50',
    },
    {
      id: '2',
      project_id: 'proj-1',
      deployment_kind: 'sandbox',
      status: 'completed',
      url: 'https://ecom-platform-xyz789.app',
      created_at: '2024-05-09 15:30:20',
    },
  ]);

  const handleBuild = () => {
    setIsBuilding(true);
    setTimeout(() => {
      setIsBuilding(false);
    }, 3000);
  };

  const handleAIDebug = () => {
    // Simulate AI debugging
    console.log('AI Debug:', aiPrompt);
  };

  const renderFileTree = (nodes: FileNode[], level = 0) => {
    return nodes.map(node => (
      <div key={node.id} style={{ paddingLeft: `${level * 16}px` }}>
        <div
          className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded ${
            selectedFile?.id === node.id ? 'bg-secondary dark:bg-[#2a2a2a]' : ''
          }`}
          onClick={() => node.type === 'file' && setSelectedFile(node)}
        >
          {node.type === 'folder' ? (
            <FolderOpen className="w-4 h-4 text-yellow-500" />
          ) : (
            <FileText className="w-4 h-4 text-blue-500" />
          )}
          <span className="text-sm dark:text-gray-300">{node.name}</span>
        </div>
        {node.children && renderFileTree(node.children, level + 1)}
      </div>
    ));
  };

  return (
    <div className="min-h-screen bg-background dark:bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <div className="border-b border-border dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f]">
        <div className="px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold dark:text-gray-100">{projectName}</h1>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  {projectDescription}
                </p>
              </div>
              <Badge variant="success">
                <CheckCircle className="w-3 h-3 mr-1" />
                Deployed
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={handleBuild} disabled={isBuilding}>
                {isBuilding ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                {isBuilding ? 'Building...' : 'Build'}
              </Button>
              <Button size="sm">
                <Save className="w-4 h-4 mr-2" />
                Save
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 border-b border-border dark:border-[#2a2a2a] -mb-[1px]">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <Settings className="w-4 h-4 inline mr-2" />
              Overview
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
              Files
            </button>
            <button
              onClick={() => setActiveTab('deployments')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'deployments'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <Rocket className="w-4 h-4 inline mr-2" />
              Deployments
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'logs'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <Terminal className="w-4 h-4 inline mr-2" />
              Logs
            </button>
            <button
              onClick={() => setActiveTab('ai-debug')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'ai-debug'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <Sparkles className="w-4 h-4 inline mr-2" />
              AI Debug
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === 'preview'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              <Monitor className="w-4 h-4 inline mr-2" />
              Live Preview
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <h3 className="font-semibold mb-4 dark:text-gray-100">Project Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Project Name
                  </label>
                  <input
                    type="text"
                    value={projectName}
                    onChange={e => setProjectName(e.target.value)}
                    className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Description
                  </label>
                  <textarea
                    value={projectDescription}
                    onChange={e => setProjectDescription(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
                  />
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold mb-4 dark:text-gray-100">Tech Stack</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Framework
                  </label>
                  <select className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200">
                    <option>React + Vite</option>
                    <option>Next.js</option>
                    <option>Vue</option>
                    <option>Svelte</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Database
                  </label>
                  <select className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200">
                    <option>PostgreSQL</option>
                    <option>MongoDB</option>
                    <option>MySQL</option>
                    <option>Supabase</option>
                  </select>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold mb-4 dark:text-gray-100">Project Stats</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <div className="text-2xl font-bold text-primary">24</div>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">
                    Files
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">3,542</div>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">
                    Lines of Code
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground dark:text-gray-400">
                    Deployments
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Files Tab */}
        {activeTab === 'files' && (
          <div className="flex flex-col lg:flex-row gap-6 h-full">
            {/* File Tree */}
            <div className="w-full lg:w-64 border-r-0 lg:border-r border-border dark:border-[#2a2a2a] lg:pr-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold dark:text-gray-100">Files</h3>
                <Button size="sm" variant="outline">
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              <div className="space-y-1">{renderFileTree(files)}</div>
            </div>

            {/* Code Editor */}
            <div className="flex-1">
              {selectedFile ? (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold dark:text-gray-100">{selectedFile.name}</h3>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        <Upload className="w-3 h-3 mr-2" />
                        Update
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                  <textarea
                    value={selectedFile.content}
                    readOnly
                    className="w-full h-[600px] px-4 py-3 font-mono text-sm border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground dark:text-gray-400">
                  Select a file to view its contents
                </div>
              )}
            </div>
          </div>
        )}

        {/* Deployments Tab */}
        {activeTab === 'deployments' && (
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold dark:text-gray-100">Deployment History</h3>
              <Button size="sm">
                <Rocket className="w-4 h-4 mr-2" />
                New Deployment
              </Button>
            </div>

            {deployments.map(deployment => (
              <Card key={deployment.id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        deployment.status === 'deployed'
                          ? 'bg-green-500/10'
                          : 'bg-gray-500/10'
                      }`}
                    >
                      {deployment.status === 'deployed' ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : (
                        <Clock className="w-6 h-6 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold dark:text-gray-100">
                          Deployment {deployment.id}
                        </h4>
                        <Badge
                          variant={deployment.status === 'deployed' ? 'success' : 'default'}
                        >
                          {deployment.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        {deployment.created_at}
                      </p>
                      {deployment.url && (
                        <a
                          href={deployment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center gap-1"
                        >
                          {deployment.url}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View Logs
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Logs Tab */}
        {activeTab === 'logs' && (
          <div className="max-w-6xl mx-auto">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold dark:text-gray-100">Build Logs</h3>
                <Button size="sm" variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Refresh
                </Button>
              </div>
              <div className="bg-black rounded-lg p-4 font-mono text-sm space-y-1 max-h-[600px] overflow-auto">
                {logs.map(log => (
                  <div key={log.id} className="flex items-start gap-4">
                    <span className="text-gray-500">{log.timestamp}</span>
                    <span
                      className={`${
                        log.level === 'error'
                          ? 'text-red-400'
                          : log.level === 'warn'
                          ? 'text-yellow-400'
                          : log.level === 'success'
                          ? 'text-green-400'
                          : 'text-gray-400'
                      }`}
                    >
                      [{log.level.toUpperCase()}]
                    </span>
                    <span className="text-gray-300">{log.message}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* AI Debug Tab */}
        {activeTab === 'ai-debug' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <h3 className="font-semibold mb-4 dark:text-gray-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                AI-Powered Debugging
              </h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
                Describe the issue you're experiencing, and our AI will analyze your code and
                suggest fixes.
              </p>
              <textarea
                value={aiPrompt}
                onChange={e => setAiPrompt(e.target.value)}
                placeholder="e.g., The shopping cart is not updating when I add items..."
                rows={4}
                className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200 mb-4"
              />
              <Button onClick={handleAIDebug} className="gap-2">
                <Zap className="w-4 h-4" />
                Analyze & Fix
              </Button>
            </Card>

            <Card>
              <h3 className="font-semibold mb-4 dark:text-gray-100">AI Suggestions</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-600 mb-1">Performance Optimization</h4>
                    <p className="text-sm dark:text-gray-300">
                      Consider memoizing the ProductCard component to prevent unnecessary re-renders
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-600 mb-1">Code Quality</h4>
                    <p className="text-sm dark:text-gray-300">
                      Your component structure follows best practices
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Preview Tab */}
        {activeTab === 'preview' && (
          <div className="h-full">
            <Card className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold dark:text-gray-100">Live Preview</h3>
                <div className="flex items-center gap-2">
                  <Button size="sm" variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reload
                  </Button>
                  <Button size="sm" variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open in New Tab
                  </Button>
                </div>
              </div>
              <div className="flex-1 border border-border dark:border-[#2a2a2a] rounded-lg overflow-hidden bg-white">
                <iframe
                  src="about:blank"
                  className="w-full h-full"
                  title="Live Preview"
                  sandbox="allow-scripts allow-same-origin"
                />
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
````````

## `src/app/screens/AIAgentProjects.tsx`

- Category: screen.
- Imports: import { useState } from 'react';, import { useNavigate } from 'react-router';, import { Plus, Search, Folder, Play, Pause, Trash2, GitBranch, Clock, User, Sparkles } from 'lucide-react';, import { Card } from '../components/Card';, import { Button } from '../components/Button';, import { Badge } from '../components/Badge';, import { SearchBar } from '../components/SearchBar';, import { EmptyState } from '../components/EmptyState';
- Exports: export default function AIAgentProjects() {
- Reuse guidance: Use this for AI Agent editor, testing, file ingestion, decision-chain, and project-debug surfaces.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Search, Folder, Play, Pause, Trash2, GitBranch, Clock, User, Sparkles } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { SearchBar } from '../components/SearchBar';
import { EmptyState } from '../components/EmptyState';

interface AIAgentProject {
  id: string;
  agent_id?: string | null;
  owner_type?: string;
  owner_id?: string;
  organization_id?: string | null;
  chat_id?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  project_kind?: string;
  status?: string;
  stack?: {
    framework?: string;
    database?: string;
    orm?: string;
  };
  architecture?: object | null;
  files?: object[] | null;
  database_manifest?: object | null;
  runtime_manifest?: object | null;
  last_run?: {
    status?: string;
    timestamp?: string;
  };
  metadata?: object | null;
  created_by?: string;
  created_at?: string;
  updated_at?: string;
}

export default function AIAgentProjects() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const [projects, setProjects] = useState<AIAgentProject[]>([
    {
      id: '1',
      agent_id: 'agent-001',
      owner_type: 'user',
      owner_id: 'user-123',
      name: 'E-Commerce Platform',
      slug: 'e-commerce-platform',
      description: 'Full-featured e-commerce platform with cart, payments, and admin dashboard',
      project_kind: 'react-vite',
      status: 'deployed',
      stack: {
        framework: 'React + Vite',
        database: 'PostgreSQL',
        orm: 'Prisma',
      },
      last_run: {
        status: 'success',
        timestamp: '2 hours ago',
      },
      created_by: 'John Doe',
      created_at: '2024-05-01',
      updated_at: '2024-05-08',
    },
    {
      id: '2',
      agent_id: 'agent-002',
      name: 'Task Management App',
      slug: 'task-management-app',
      description: 'Collaborative task management with real-time updates and team features',
      project_kind: 'next-js',
      status: 'building',
      stack: {
        framework: 'Next.js',
        database: 'MongoDB',
        orm: 'Mongoose',
      },
      last_run: {
        status: 'building',
        timestamp: 'Just now',
      },
      created_by: 'Jane Smith',
      created_at: '2024-05-05',
      updated_at: '2024-05-10',
    },
    {
      id: '3',
      agent_id: 'agent-001',
      name: 'Analytics Dashboard',
      slug: 'analytics-dashboard',
      description: 'Real-time analytics dashboard with charts, metrics, and data visualization',
      project_kind: 'react-vite',
      status: 'draft',
      stack: {
        framework: 'React + Vite',
        database: 'Supabase',
      },
      last_run: {
        status: 'idle',
        timestamp: 'Never',
      },
      created_by: 'John Doe',
      created_at: '2024-05-08',
      updated_at: '2024-05-09',
    },
    {
      id: '4',
      agent_id: 'agent-003',
      name: 'Social Media Platform',
      slug: 'social-media-platform',
      description: 'Social networking app with posts, comments, likes, and user profiles',
      project_kind: 'next-js',
      status: 'error',
      stack: {
        framework: 'Next.js',
        database: 'PostgreSQL',
        orm: 'Drizzle',
      },
      last_run: {
        status: 'error',
        timestamp: '30 minutes ago',
      },
      created_by: 'Alice Johnson',
      created_at: '2024-05-03',
      updated_at: '2024-05-10',
    },
  ]);

  const filteredProjects = projects.filter(project => {
    const matchesSearch =
      searchQuery === '' ||
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.slug.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id: string) => {
    setProjects(projects.filter(p => p.id !== id));
  };

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'deployed':
        return 'success';
      case 'building':
        return 'warning';
      case 'error':
        return 'danger';
      case 'draft':
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status?: string) => {
    switch (status) {
      case 'deployed':
        return <Play className="w-3 h-3" />;
      case 'building':
        return <Clock className="w-3 h-3 animate-spin" />;
      case 'error':
        return <Pause className="w-3 h-3" />;
      default:
        return <GitBranch className="w-3 h-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-[#0a0a0a]">
      <div className="p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold dark:text-gray-100 mb-2">AI Agent Projects</h1>
              <p className="text-muted-foreground dark:text-gray-400">
                Full-stack applications built and managed by AI agents
              </p>
            </div>
            <Button onClick={() => navigate('/ai-agent-project-editor')} className="gap-2">
              <Plus className="w-4 h-4" />
              New Project
            </Button>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="flex-1 sm:min-w-[300px]">
              <SearchBar
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search projects..."
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('all')}
              >
                All
              </Button>
              <Button
                variant={filterStatus === 'deployed' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('deployed')}
              >
                Deployed
              </Button>
              <Button
                variant={filterStatus === 'building' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('building')}
              >
                Building
              </Button>
              <Button
                variant={filterStatus === 'draft' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('draft')}
              >
                Draft
              </Button>
              <Button
                variant={filterStatus === 'error' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus('error')}
              >
                Error
              </Button>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <EmptyState
            icon={Folder}
            title="No projects found"
            description={searchQuery ? 'Try adjusting your search' : 'Create your first AI-powered project'}
            action={
              !searchQuery
                ? {
                    label: 'Create Project',
                    onClick: () => navigate('/ai-agent-project-editor'),
                  }
                : undefined
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredProjects.map(project => (
              <Card
                key={project.id}
                className="hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => navigate(`/ai-agent-project-editor?id=${project.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Folder className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold dark:text-gray-100 truncate group-hover:text-primary transition-colors">
                        {project.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getStatusColor(project.status)}>
                          <span className="flex items-center gap-1">
                            {getStatusIcon(project.status)}
                            {project.status}
                          </span>
                        </Badge>
                        {project.agent_id && (
                          <Badge variant="default">
                            <Sparkles className="w-3 h-3 mr-1" />
                            AI
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4 line-clamp-2">
                  {project.description || 'No description'}
                </p>

                {/* Stack Info */}
                {project.stack && (
                  <div className="mb-4 flex items-center gap-2 flex-wrap">
                    {project.stack.framework && (
                      <span className="px-2 py-1 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded text-xs">
                        {project.stack.framework}
                      </span>
                    )}
                    {project.stack.database && (
                      <span className="px-2 py-1 bg-green-500/10 text-green-600 dark:text-green-400 rounded text-xs">
                        {project.stack.database}
                      </span>
                    )}
                    {project.stack.orm && (
                      <span className="px-2 py-1 bg-purple-500/10 text-purple-600 dark:text-purple-400 rounded text-xs">
                        {project.stack.orm}
                      </span>
                    )}
                  </div>
                )}

                {/* Meta Info */}
                <div className="flex items-center justify-between text-xs text-muted-foreground dark:text-gray-500 pt-4 border-t border-border dark:border-[#2a2a2a]">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {project.created_by}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {project.last_run?.timestamp || 'Never'}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex items-center gap-2 mt-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={e => {
                      e.stopPropagation();
                      navigate(`/ai-agent-project-editor?id=${project.id}&tab=preview`);
                    }}
                  >
                    <Play className="w-3 h-3 mr-1" />
                    Preview
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={e => {
                      e.stopPropagation();
                      handleDelete(project.id);
                    }}
                    className="text-red-600 dark:text-red-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
````````

## `src/app/screens/AIAgents.tsx`

- Category: screen.
- Imports: import { useState } from 'react';, import { Bot, Plus, Edit, Trash2, Power, PowerOff, MessageSquare, ExternalLink } from 'lucide-react';, import { Card } from '../components/Card';, import { Button } from '../components/Button';, import { Badge } from '../components/Badge';, import { SearchBar } from '../components/SearchBar';, import { LazyLoadList } from '../components/LazyLoadList';, import { EmptyState } from '../components/EmptyState';, import { useNavigate } from 'react-router';
- Exports: export default function AIAgents() {
- Reuse guidance: Use this for AI Agent editor, testing, file ingestion, decision-chain, and project-debug surfaces.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from 'react';
import { Bot, Plus, Edit, Trash2, Power, PowerOff, MessageSquare, ExternalLink } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { SearchBar } from '../components/SearchBar';
import { LazyLoadList } from '../components/LazyLoadList';
import { EmptyState } from '../components/EmptyState';
import { useNavigate } from 'react-router';

interface ChatAttachment {
  id: string;
  name: string;
  context: string;
  lastUsed: string;
  messageCount: number;
}

interface AIAgent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  model: string;
  chats: number;
  lastUsed: string;
  createdAt: string;
  toolPolicy: {
    allowSystemTools: boolean;
    allowEntityTools: boolean;
    allowWorkflowTools: boolean;
  };
  guardrails: {
    requireConfirmation: boolean;
    blockDestructive: boolean;
  };
  attachedChats: ChatAttachment[];
}

export default function AIAgents() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const [agents, setAgents] = useState<AIAgent[]>([
    {
      id: '1',
      name: 'Customer Support Agent',
      description: 'Handles customer inquiries and support tickets with empathy and efficiency',
      status: 'active',
      model: 'claude-sonnet-4.5',
      chats: 1247,
      lastUsed: '5 minutes ago',
      createdAt: '2024-01-15',
      toolPolicy: {
        allowSystemTools: true,
        allowEntityTools: true,
        allowWorkflowTools: true,
      },
      guardrails: {
        requireConfirmation: true,
        blockDestructive: true,
      },
      attachedChats: [
        { id: 'chat-1', name: 'Product Support Channel', context: 'Channel: Product Support', lastUsed: '2 mins ago', messageCount: 342 },
        { id: 'chat-2', name: 'General Inquiries', context: 'Category: General', lastUsed: '15 mins ago', messageCount: 156 },
        { id: 'chat-3', name: 'Billing Questions', context: 'Subject: Billing', lastUsed: '1 hour ago', messageCount: 89 },
      ],
    },
    {
      id: '2',
      name: 'Code Review Assistant',
      description: 'Reviews code changes, suggests improvements, and identifies potential bugs',
      status: 'active',
      model: 'claude-opus-4.7',
      chats: 456,
      lastUsed: '2 hours ago',
      createdAt: '2024-02-20',
      toolPolicy: {
        allowSystemTools: true,
        allowEntityTools: false,
        allowWorkflowTools: true,
      },
      guardrails: {
        requireConfirmation: false,
        blockDestructive: true,
      },
      attachedChats: [
        { id: 'chat-4', name: 'Engineering Team', context: 'Channel: Engineering', lastUsed: '30 mins ago', messageCount: 234 },
        { id: 'chat-5', name: 'Pull Request Reviews', context: 'Subject: Code Review', lastUsed: '2 hours ago', messageCount: 167 },
      ],
    },
    {
      id: '3',
      name: 'Data Analysis Agent',
      description: 'Analyzes datasets, generates insights, and creates visualizations',
      status: 'active',
      model: 'claude-sonnet-4.5',
      chats: 892,
      lastUsed: 'Just now',
      createdAt: '2024-03-10',
      toolPolicy: {
        allowSystemTools: true,
        allowEntityTools: true,
        allowWorkflowTools: false,
      },
      guardrails: {
        requireConfirmation: true,
        blockDestructive: true,
      },
      attachedChats: [
        { id: 'chat-6', name: 'Analytics Dashboard', context: 'Subject: Data Analytics', lastUsed: '5 mins ago', messageCount: 421 },
        { id: 'chat-7', name: 'Reports Channel', context: 'Channel: Reporting', lastUsed: '1 hour ago', messageCount: 278 },
      ],
    },
    {
      id: '4',
      name: 'Content Writer',
      description: 'Creates engaging content, blog posts, and marketing copy',
      status: 'inactive',
      model: 'claude-haiku-4.5',
      chats: 234,
      lastUsed: '3 days ago',
      createdAt: '2024-01-05',
      toolPolicy: {
        allowSystemTools: false,
        allowEntityTools: false,
        allowWorkflowTools: false,
      },
      guardrails: {
        requireConfirmation: false,
        blockDestructive: false,
      },
      attachedChats: [
        { id: 'chat-8', name: 'Marketing Team', context: 'Channel: Marketing', lastUsed: '3 days ago', messageCount: 89 },
      ],
    },
  ]);

  const filteredAgents = agents.filter(agent =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agent.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    setAgents(agents.filter(a => a.id !== id));
  };

  const toggleStatus = (id: string) => {
    setAgents(agents.map(agent =>
      agent.id === id
        ? { ...agent, status: agent.status === 'active' ? 'inactive' : 'active' as any }
        : agent
    ));
  };

  const selectedAgentData = agents.find(a => a.id === selectedAgent);

  const renderAgentItem = (agent: AIAgent, isSelected: boolean) => (
    <div className="flex items-start gap-3 p-4">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
        agent.status === 'active'
          ? 'bg-gradient-to-br from-primary to-primary/80'
          : 'bg-gray-300 dark:bg-gray-700'
      }`}>
        <Bot className="w-5 h-5 text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <h3 className="font-semibold dark:text-gray-100 truncate">{agent.name}</h3>
          <Badge variant={agent.status === 'active' ? 'success' : 'warning'}>
            {agent.status}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-2 mb-2">
          {agent.description}
        </p>
        <div className="flex items-center gap-3 text-xs text-muted-foreground dark:text-gray-500">
          <span className="px-2 py-1 bg-secondary dark:bg-[#2a2a2a] rounded">
            {agent.model}
          </span>
          <span>{agent.chats.toLocaleString()} chats</span>
          <span>Last used: {agent.lastUsed}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background dark:bg-[#0a0a0a]">
      <div className="flex flex-col md:flex-row h-screen">
        {/* Left Sidebar - Agents List */}
        <div className="w-full md:w-96 border-r border-border dark:border-[#2a2a2a] overflow-y-auto bg-white dark:bg-[#0f0f0f]">
          <div className="p-6 border-b border-border dark:border-[#2a2a2a]">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold dark:text-gray-100">AI Agents</h1>
                <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                  {agents.length} agents
                </p>
              </div>
              <Button onClick={() => navigate('/ai-agent-editor')} size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                New
              </Button>
            </div>

            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search agents..."
            />
          </div>

          {filteredAgents.length === 0 ? (
            <EmptyState
              icon={Bot}
              title="No agents found"
              description={searchQuery ? "Try adjusting your search" : "Create your first AI agent"}
              action={!searchQuery ? {
                label: "Create Agent",
                onClick: () => navigate('/ai-agent-editor')
              } : undefined}
            />
          ) : (
            <LazyLoadList
              items={filteredAgents}
              renderItem={renderAgentItem}
              onItemClick={(agent) => setSelectedAgent(agent.id)}
              selectedId={selectedAgent || undefined}
              itemHeight={120}
            />
          )}
        </div>

        {/* Right Panel - Agent Details */}
        <div className="flex-1 overflow-y-auto">
          {selectedAgentData ? (
            <div className="p-4 sm:p-6 md:p-8">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                      selectedAgentData.status === 'active'
                        ? 'bg-gradient-to-br from-primary to-primary/80'
                        : 'bg-gray-300 dark:bg-gray-700'
                    }`}>
                      <Bot className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-2xl font-bold dark:text-gray-100">
                          {selectedAgentData.name}
                        </h2>
                        <Badge variant={selectedAgentData.status === 'active' ? 'success' : 'warning'}>
                          {selectedAgentData.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground dark:text-gray-400 mb-2">
                        {selectedAgentData.description}
                      </p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-3 py-1 bg-secondary dark:bg-[#2a2a2a] rounded-lg">
                          {selectedAgentData.model}
                        </span>
                        <span className="text-muted-foreground dark:text-gray-500">
                          Created {selectedAgentData.createdAt}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStatus(selectedAgentData.id)}
                      className="gap-2"
                    >
                      {selectedAgentData.status === 'active' ? (
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
                      onClick={() => navigate(`/ai-agent-editor?id=${selectedAgentData.id}`)}
                      className="gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(selectedAgentData.id)}
                      className="gap-2 text-red-600 dark:text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <Card>
                  <div className="text-sm text-muted-foreground dark:text-gray-400 mb-1">Total Chats</div>
                  <div className="text-3xl font-bold text-primary">
                    {selectedAgentData.chats.toLocaleString()}
                  </div>
                </Card>
                <Card>
                  <div className="text-sm text-muted-foreground dark:text-gray-400 mb-1">Last Used</div>
                  <div className="text-lg font-semibold dark:text-gray-200">
                    {selectedAgentData.lastUsed}
                  </div>
                </Card>
                <Card>
                  <div className="text-sm text-muted-foreground dark:text-gray-400 mb-1">Status</div>
                  <div className="text-lg font-semibold dark:text-gray-200 capitalize">
                    {selectedAgentData.status}
                  </div>
                </Card>
              </div>

              {/* Configuration Details */}
              <div className="space-y-6">
                <Card>
                  <h3 className="font-semibold mb-4 dark:text-gray-100">Tool Permissions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-border dark:border-[#2a2a2a]">
                      <span className="text-sm dark:text-gray-300">System Tools</span>
                      <Badge variant={selectedAgentData.toolPolicy.allowSystemTools ? 'success' : 'default'}>
                        {selectedAgentData.toolPolicy.allowSystemTools ? 'Allowed' : 'Blocked'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-border dark:border-[#2a2a2a]">
                      <span className="text-sm dark:text-gray-300">Entity Tools</span>
                      <Badge variant={selectedAgentData.toolPolicy.allowEntityTools ? 'success' : 'default'}>
                        {selectedAgentData.toolPolicy.allowEntityTools ? 'Allowed' : 'Blocked'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm dark:text-gray-300">Workflow Tools</span>
                      <Badge variant={selectedAgentData.toolPolicy.allowWorkflowTools ? 'success' : 'default'}>
                        {selectedAgentData.toolPolicy.allowWorkflowTools ? 'Allowed' : 'Blocked'}
                      </Badge>
                    </div>
                  </div>
                </Card>

                <Card>
                  <h3 className="font-semibold mb-4 dark:text-gray-100">Safety Guardrails</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-border dark:border-[#2a2a2a]">
                      <span className="text-sm dark:text-gray-300">Require Confirmation</span>
                      <Badge variant={selectedAgentData.guardrails.requireConfirmation ? 'warning' : 'default'}>
                        {selectedAgentData.guardrails.requireConfirmation ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm dark:text-gray-300">Block Destructive</span>
                      <Badge variant={selectedAgentData.guardrails.blockDestructive ? 'success' : 'danger'}>
                        {selectedAgentData.guardrails.blockDestructive ? 'Enabled' : 'Disabled'}
                      </Badge>
                    </div>
                  </div>
                </Card>

                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold dark:text-gray-100 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Attached Chats
                    </h3>
                    <Badge variant="default">
                      {selectedAgentData.attachedChats.length} {selectedAgentData.attachedChats.length === 1 ? 'chat' : 'chats'}
                    </Badge>
                  </div>

                  {selectedAgentData.attachedChats.length > 0 ? (
                    <div className="space-y-3">
                      {selectedAgentData.attachedChats.map((chat) => (
                        <div
                          key={chat.id}
                          className="p-4 border border-border dark:border-[#2a2a2a] rounded-lg hover:border-primary/50 dark:hover:border-primary/50 transition-all"
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
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-muted-foreground dark:text-gray-400 text-sm">
                      No chats attached to this agent yet
                    </div>
                  )}
                </Card>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <EmptyState
                icon={Bot}
                title="No agent selected"
                description="Select an agent from the list to view details"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
````````

## `src/app/screens/BookmarksScreen.tsx`

- Category: screen.
- Imports: import { useState } from "react";, import { useNavigate } from "react-router";, import { Card } from "../components/Card";, import { Hash, Layers, BookOpen, FileText, Bookmark, X } from "lucide-react";, import { Button } from "../components/Button";, import { useBookmarks } from "../contexts/BookmarkContext";
- Exports: export function BookmarksScreen() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/Card";
import { Hash, Layers, BookOpen, FileText, Bookmark, X } from "lucide-react";
import { Button } from "../components/Button";
import { useBookmarks } from "../contexts/BookmarkContext";

export function BookmarksScreen() {
  const [activeTab, setActiveTab] = useState<"channels" | "categories" | "subjects" | "posts">("subjects");
  const navigate = useNavigate();
  const { getBookmarksByType, removeBookmark } = useBookmarks();

  const tabs = [
    { id: "channels", label: "Channels", icon: Hash },
    { id: "categories", label: "Categories", icon: Layers },
    { id: "subjects", label: "Subjects", icon: BookOpen },
    { id: "posts", label: "Posts", icon: FileText },
  ];

  const bookmarkedChannels = getBookmarksByType('channel');
  const bookmarkedCategories = getBookmarksByType('category');
  const bookmarkedSubjects = getBookmarksByType('subject');
  const bookmarkedPosts = getBookmarksByType('post');

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-2">Bookmarks</h1>
        <p className="text-muted-foreground">Your saved content for later</p>
      </header>

      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeTab === "channels" && bookmarkedChannels.length > 0 ? (
          bookmarkedChannels.map((bookmark) => (
            <Card
              key={bookmark.id}
              onClick={() => navigate(`/channel/${bookmark.channelId}`)}
              className="hover:border-primary/40 cursor-pointer relative group"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeBookmark(bookmark.id);
                }}
                className="absolute top-3 right-3 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600 dark:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove bookmark"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Hash className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold dark:text-gray-100">{bookmark.name}</h3>
                    {bookmark.description && (
                      <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-2 mt-1">
                        {bookmark.description}
                      </p>
                    )}
                  </div>
                </div>
                {bookmark.metadata?.postCount !== undefined && (
                  <p className="text-xs text-muted-foreground dark:text-gray-500">
                    {bookmark.metadata.postCount} posts
                  </p>
                )}
              </div>
            </Card>
          ))
        ) : activeTab === "categories" && bookmarkedCategories.length > 0 ? (
          bookmarkedCategories.map((bookmark) => (
            <Card
              key={bookmark.id}
              onClick={() => navigate(`/channel/${bookmark.channelId}/category/${bookmark.categoryId}`)}
              className="hover:border-primary/40 cursor-pointer relative group"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeBookmark(bookmark.id);
                }}
                className="absolute top-3 right-3 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600 dark:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove bookmark"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold dark:text-gray-100">{bookmark.name}</h3>
                    {bookmark.description && (
                      <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-2 mt-1">
                        {bookmark.description}
                      </p>
                    )}
                  </div>
                </div>
                {bookmark.metadata?.postCount !== undefined && (
                  <p className="text-xs text-muted-foreground dark:text-gray-500">
                    {bookmark.metadata.postCount} posts
                  </p>
                )}
              </div>
            </Card>
          ))
        ) : activeTab === "subjects" && bookmarkedSubjects.length > 0 ? (
          bookmarkedSubjects.map((bookmark) => (
            <Card
              key={bookmark.id}
              onClick={() => navigate(`/channel/${bookmark.channelId}/category/${bookmark.categoryId}/subject/${bookmark.subjectId}`)}
              className="hover:border-primary/40 cursor-pointer relative group"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeBookmark(bookmark.id);
                }}
                className="absolute top-3 right-3 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600 dark:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove bookmark"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold dark:text-gray-100">{bookmark.name}</h3>
                    {bookmark.description && (
                      <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-2 mt-1">
                        {bookmark.description}
                      </p>
                    )}
                  </div>
                </div>
                {bookmark.metadata?.postCount !== undefined && (
                  <p className="text-xs text-muted-foreground dark:text-gray-500">
                    {bookmark.metadata.postCount} posts
                  </p>
                )}
              </div>
            </Card>
          ))
        ) : activeTab === "posts" && bookmarkedPosts.length > 0 ? (
          bookmarkedPosts.map((bookmark) => (
            <Card
              key={bookmark.id}
              onClick={() => navigate(`/channel/${bookmark.channelId}/category/${bookmark.categoryId}/subject/${bookmark.subjectId}/post/${bookmark.postId}`)}
              className="hover:border-primary/40 cursor-pointer relative group"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeBookmark(bookmark.id);
                }}
                className="absolute top-3 right-3 p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600 dark:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                title="Remove bookmark"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="space-y-3">
                <h3 className="font-semibold dark:text-gray-100">{bookmark.name}</h3>
                {bookmark.description && (
                  <p className="text-sm text-muted-foreground dark:text-gray-400 line-clamp-2">
                    {bookmark.description}
                  </p>
                )}
                {bookmark.metadata && (
                  <p className="text-xs text-muted-foreground dark:text-gray-500">
                    {bookmark.metadata.author && `${bookmark.metadata.author} • `}
                    {bookmark.metadata.date}
                  </p>
                )}
              </div>
            </Card>
          ))
        ) : (
          <div className="col-span-full">
            <Card>
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bookmark className="w-8 h-8 text-muted-foreground dark:text-gray-400" />
                </div>
                <h3 className="font-semibold mb-2 dark:text-gray-100">No bookmarks yet</h3>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  Save {activeTab} to find them here later
                </p>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
````````

## `src/app/screens/CategoryScreen.tsx`

- Category: screen.
- Imports: import { useParams, useNavigate } from "react-router";, import { Card } from "../components/Card";, import { Button } from "../components/Button";, import { channels, categories, subjects } from "../data/mockData";, import { BookOpen, ArrowRight, FileText, Bot } from "lucide-react";, import { BookmarkButton } from "../components/BookmarkButton";
- Exports: export function CategoryScreen() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useParams, useNavigate } from "react-router";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { channels, categories, subjects } from "../data/mockData";
import { BookOpen, ArrowRight, FileText, Bot } from "lucide-react";
import { BookmarkButton } from "../components/BookmarkButton";

export function CategoryScreen() {
  const { channelId, categoryId } = useParams();
  const navigate = useNavigate();

  const channel = channels.find(c => c.id === channelId);
  const category = categories.find(c => c.id === categoryId);
  const categorySubjects = subjects.filter(s => s.categoryId === categoryId);

  if (!channel || !category) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-muted-foreground">Category not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
      <header className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 dark:text-gray-100">{category.name}</h1>
          <p className="text-muted-foreground dark:text-gray-400">{category.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <BookmarkButton
            type="category"
            id={category.id}
            channelId={channelId}
            categoryId={category.id}
            name={category.name}
            description={category.description}
            metadata={{ postCount: categorySubjects.length }}
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
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categorySubjects.map(subject => (
          <Card padding="md"
            key={subject.id}
            onClick={() => navigate(`/channel/${channelId}/category/${categoryId}/subject/${subject.id}`)}
            className="hover:border-primary/40 cursor-pointer"
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1 min-w-0">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">{subject.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {subject.description}
                    </p>
                  </div>
                </div>
                {subject.tag && (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-lg flex-shrink-0">
                    {subject.tag}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  <span>{subject.postCount} posts</span>
                </div>
              </div>

              <div className="flex items-center gap-1 text-sm text-primary pt-2 border-t border-border">
                <span>Open subject</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {categorySubjects.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">No subjects yet</h3>
            <p className="text-sm text-muted-foreground">
              Create your first subject to start adding content
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
````````

## `src/app/screens/ChannelScreen.tsx`

- Category: screen.
- Imports: import { useParams, useNavigate } from "react-router";, import { Card } from "../components/Card";, import { Button } from "../components/Button";, import { channels, categories, subjects } from "../data/mockData";, import { FolderOpen, ArrowRight, BookOpen, Bot } from "lucide-react";, import { BookmarkButton } from "../components/BookmarkButton";
- Exports: export function ChannelScreen() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useParams, useNavigate } from "react-router";
import { Card } from "../components/Card";
import { Button } from "../components/Button";
import { channels, categories, subjects } from "../data/mockData";
import { FolderOpen, ArrowRight, BookOpen, Bot } from "lucide-react";
import { BookmarkButton } from "../components/BookmarkButton";

export function ChannelScreen() {
  const { channelId } = useParams();
  const navigate = useNavigate();

  const channel = channels.find(c => c.id === channelId);
  const channelCategories = categories.filter(c => c.channelId === channelId);

  if (!channel) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-8">
        <p className="text-muted-foreground">Channel not found</p>
      </div>
    );
  }

  const getCategoryStats = (categoryId: string) => {
    const categorySubjects = subjects.filter(s => s.categoryId === categoryId);
    const totalPosts = categorySubjects.reduce((acc, s) => acc + s.postCount, 0);
    return {
      subjects: categorySubjects.length,
      posts: totalPosts,
    };
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      <header className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-2 dark:text-gray-100">{channel.name}</h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Browse categories to find organized knowledge
          </p>
        </div>
        <div className="flex items-center gap-2">
          <BookmarkButton
            type="channel"
            id={channel.id}
            channelId={channel.id}
            name={channel.name}
            description="Browse categories to find organized knowledge"
            metadata={{ postCount: channelCategories.length }}
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
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {channelCategories.map(category => {
          const stats = getCategoryStats(category.id);
          return (
            <Card
              key={category.id}
              onClick={() => navigate(`/channel/${channelId}/category/${category.id}`)}
              className="hover:border-primary/40 cursor-pointer"
              padding="md"
            >
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <FolderOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{stats.subjects} subjects</span>
                  </div>
                  <span>•</span>
                  <span>{stats.posts} posts</span>
                </div>

                <div className="flex items-center gap-1 text-sm text-primary pt-2 border-t border-border">
                  <span>View subjects</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {channelCategories.length === 0 && (
        <Card padding="lg">
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold mb-2">No categories yet</h3>
            <p className="text-sm text-muted-foreground">
              Create your first category to organize knowledge
            </p>
          </div>
        </Card>
      )}
    </div>
  );
}
````````

## `src/app/screens/ChatConfigure.tsx`

- Category: screen.
- Imports: import { useState } from 'react';, import { Bot, Link2, Settings, Zap, Save, X } from 'lucide-react';, import { Card } from '../components/Card';, import { Button } from '../components/Button';, import { Badge } from '../components/Badge';, import { FormField } from '../components/FormField';, import { Modal } from '../components/Modal';
- Exports: export default function ChatConfigure() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from 'react';
import { Bot, Link2, Settings, Zap, Save, X } from 'lucide-react';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { FormField } from '../components/FormField';
import { Modal } from '../components/Modal';

interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused';
}

interface AIAgent {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'inactive';
  model: string;
}

type AttachmentType = 'workflow' | 'agent';

export default function ChatConfigure() {
  const [chatName, setChatName] = useState('Customer Support Bot');
  const [chatDescription, setChatDescription] = useState('AI assistant for customer inquiries');
  const [attachmentType, setAttachmentType] = useState<AttachmentType>('agent');
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string | null>('1');
  const [showPicker, setShowPicker] = useState(false);

  const availableWorkflows: Workflow[] = [
    {
      id: '1',
      name: 'Customer service workflow',
      description: 'Resolve customer queries with custom policies',
      status: 'active',
    },
    {
      id: '2',
      name: 'Data enrichment pipeline',
      description: 'Pull together data to answer user questions',
      status: 'active',
    },
    {
      id: '3',
      name: 'Knowledge assistant',
      description: 'Triage and answer questions from employees',
      status: 'active',
    },
  ];

  const availableAgents: AIAgent[] = [
    {
      id: '1',
      name: 'Customer Support Agent',
      description: 'Handles customer inquiries and support tickets with empathy',
      status: 'active',
      model: 'claude-sonnet-4.5',
    },
    {
      id: '2',
      name: 'Code Review Assistant',
      description: 'Reviews code changes and suggests improvements',
      status: 'active',
      model: 'claude-opus-4.7',
    },
    {
      id: '3',
      name: 'Data Analysis Agent',
      description: 'Analyzes datasets and generates insights',
      status: 'active',
      model: 'claude-sonnet-4.5',
    },
  ];

  const selectedWorkflowData = availableWorkflows.find(w => w.id === selectedWorkflow);
  const selectedAgentData = availableAgents.find(a => a.id === selectedAgent);

  const handleSave = () => {
    console.log('Saving configuration...', {
      chatName,
      chatDescription,
      attachmentType,
      selectedWorkflow,
      selectedAgent,
    });
  };

  const handleSelect = (id: string) => {
    if (attachmentType === 'workflow') {
      setSelectedWorkflow(id);
    } else {
      setSelectedAgent(id);
    }
    setShowPicker(false);
  };

  const handleRemove = () => {
    if (attachmentType === 'workflow') {
      setSelectedWorkflow(null);
    } else {
      setSelectedAgent(null);
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-[#0a0a0a]">
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 dark:text-gray-100">Configure Chat Agent</h1>
          <p className="text-muted-foreground dark:text-gray-400">
            Customize your chat settings and attach AI capabilities
          </p>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold dark:text-gray-100">Basic Information</h2>
            </div>

            <div className="space-y-4">
              <FormField
                label="Chat Agent Name"
                value={chatName}
                onChange={setChatName}
                placeholder="Enter chat agent name"
              />

              <FormField
                label="Description"
                value={chatDescription}
                onChange={setChatDescription}
                placeholder="Enter description"
                multiline
                rows={3}
              />
            </div>
          </Card>

          {/* AI Capability Attachment */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-xl font-semibold dark:text-gray-100">AI Capability</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-3 dark:text-gray-200">
                  Attachment Type
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setAttachmentType('agent')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                      attachmentType === 'agent'
                        ? 'border-primary bg-primary/5 dark:bg-primary/10'
                        : 'border-border dark:border-[#2a2a2a] hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Bot className={`w-5 h-5 ${
                        attachmentType === 'agent' ? 'text-primary' : 'text-muted-foreground dark:text-gray-400'
                      }`} />
                      <div className="text-left">
                        <div className={`font-semibold ${
                          attachmentType === 'agent' ? 'text-primary' : 'dark:text-gray-200'
                        }`}>
                          AI Agent
                        </div>
                        <div className="text-xs text-muted-foreground dark:text-gray-400">
                          Intelligent agent with tools and guardrails
                        </div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setAttachmentType('workflow')}
                    className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all ${
                      attachmentType === 'workflow'
                        ? 'border-primary bg-primary/5 dark:bg-primary/10'
                        : 'border-border dark:border-[#2a2a2a] hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Zap className={`w-5 h-5 ${
                        attachmentType === 'workflow' ? 'text-primary' : 'text-muted-foreground dark:text-gray-400'
                      }`} />
                      <div className="text-left">
                        <div className={`font-semibold ${
                          attachmentType === 'workflow' ? 'text-primary' : 'dark:text-gray-200'
                        }`}>
                          Workflow
                        </div>
                        <div className="text-xs text-muted-foreground dark:text-gray-400">
                          Custom logic and automation workflow
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              {/* Selected Attachment Display */}
              {attachmentType === 'agent' && selectedAgentData ? (
                <div className="border border-border dark:border-[#2a2a2a] rounded-lg p-4 bg-secondary/30 dark:bg-[#1a1a1a]">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold dark:text-gray-100">
                          {selectedAgentData.name}
                        </h3>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          {selectedAgentData.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemove}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={selectedAgentData.status === 'active' ? 'success' : 'warning'}>
                      {selectedAgentData.status}
                    </Badge>
                    <span className="text-xs px-2 py-1 bg-secondary dark:bg-[#2a2a2a] rounded">
                      {selectedAgentData.model}
                    </span>
                  </div>
                </div>
              ) : attachmentType === 'workflow' && selectedWorkflowData ? (
                <div className="border border-border dark:border-[#2a2a2a] rounded-lg p-4 bg-secondary/30 dark:bg-[#1a1a1a]">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold dark:text-gray-100">
                          {selectedWorkflowData.name}
                        </h3>
                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                          {selectedWorkflowData.description}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemove}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={selectedWorkflowData.status === 'active' ? 'success' : 'warning'}>
                      {selectedWorkflowData.status}
                    </Badge>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-border dark:border-[#2a2a2a] rounded-lg p-8 text-center">
                  {attachmentType === 'agent' ? (
                    <>
                      <Bot className="w-12 h-12 text-muted-foreground dark:text-gray-600 mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
                        No AI agent attached
                      </p>
                    </>
                  ) : (
                    <>
                      <Zap className="w-12 h-12 text-muted-foreground dark:text-gray-600 mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4">
                        No workflow attached
                      </p>
                    </>
                  )}
                  <Button onClick={() => setShowPicker(true)} className="gap-2">
                    <Link2 className="w-4 h-4" />
                    Attach {attachmentType === 'agent' ? 'Agent' : 'Workflow'}
                  </Button>
                </div>
              )}

              {(selectedAgentData || selectedWorkflowData) && (
                <Button
                  onClick={() => setShowPicker(true)}
                  variant="outline"
                  className="w-full gap-2"
                >
                  <Link2 className="w-4 h-4" />
                  Change {attachmentType === 'agent' ? 'Agent' : 'Workflow'}
                </Button>
              )}
            </div>
          </Card>

          {/* Advanced Settings */}
          <Card>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-semibold dark:text-gray-100">Advanced Settings</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium dark:text-gray-200">Enable context memory</h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    Remember conversation history across sessions
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium dark:text-gray-200">Auto-response mode</h3>
                  <p className="text-sm text-muted-foreground dark:text-gray-400">
                    Automatically respond to common queries
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              Save Configuration
            </Button>
          </div>
        </div>
      </div>

      {/* Picker Modal */}
      <Modal
        isOpen={showPicker}
        onClose={() => setShowPicker(false)}
        title={`Select ${attachmentType === 'agent' ? 'AI Agent' : 'Workflow'}`}
      >
        <div className="space-y-3">
          {attachmentType === 'agent' ? (
            availableAgents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => handleSelect(agent.id)}
                className={`w-full text-left p-4 border rounded-lg transition-all hover:border-primary dark:hover:border-primary ${
                  selectedAgent === agent.id
                    ? 'border-primary dark:border-primary bg-primary/5 dark:bg-primary/10'
                    : 'border-border dark:border-[#2a2a2a]'
                }`}
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold dark:text-gray-100">{agent.name}</h3>
                      <Badge variant={agent.status === 'active' ? 'success' : 'warning'}>
                        {agent.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 mb-2">
                      {agent.description}
                    </p>
                    <span className="text-xs px-2 py-1 bg-secondary dark:bg-[#2a2a2a] rounded">
                      {agent.model}
                    </span>
                  </div>
                </div>
              </button>
            ))
          ) : (
            availableWorkflows.map((workflow) => (
              <button
                key={workflow.id}
                onClick={() => handleSelect(workflow.id)}
                className={`w-full text-left p-4 border rounded-lg transition-all hover:border-primary dark:hover:border-primary ${
                  selectedWorkflow === workflow.id
                    ? 'border-primary dark:border-primary bg-primary/5 dark:bg-primary/10'
                    : 'border-border dark:border-[#2a2a2a]'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold dark:text-gray-100">{workflow.name}</h3>
                  <Badge variant={workflow.status === 'active' ? 'success' : 'warning'}>
                    {workflow.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  {workflow.description}
                </p>
              </button>
            ))
          )}
        </div>
      </Modal>
    </div>
  );
}
````````

## `src/app/screens/ChatDemo.tsx`

- Category: screen.
- Imports: import { useState } from "react";, import { ChatMessage, ThinkingStep } from "../components/ChatMessage";, import { Button } from "../components/Button";, import { useToast } from "../components/Toast";, import { Send, RotateCcw } from "lucide-react";
- Exports: export function ChatDemo() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from "react";
import { ChatMessage, ThinkingStep } from "../components/ChatMessage";
import { Button } from "../components/Button";
import { useToast } from "../components/Toast";
import { Send, RotateCcw } from "lucide-react";

interface Message {
  id: number;
  sender: 'user' | 'ai';
  content: string;
  timestamp: string;
  thinking?: ThinkingStep[];
  inlineThinking?: string;
  confirmation?: {
    question: string;
    onConfirm: () => void;
    onCancel: () => void;
  };
}

export function ChatDemo() {
  const { showToast } = useToast();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      content: 'Hello! I\'m your AI assistant. I can demonstrate different chat features:\n\n1. Thinking mode (shows reasoning steps)\n2. Inline thinking (subtle thought process)\n3. Confirmations (for important actions)\n\nTry asking me to:\n- "Analyze something" (shows thinking mode)\n- "Explain how X works" (shows inline thinking)\n- "Delete my files" (shows confirmation)',
      timestamp: '2:00 PM',
    },
  ]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response based on input
    setTimeout(() => {
      let aiMessage: Message;

      if (input.toLowerCase().includes('analyze') || input.toLowerCase().includes('think')) {
        aiMessage = {
          id: messages.length + 2,
          sender: 'ai',
          content: 'After careful analysis, I can provide you with a comprehensive breakdown of the topic. The thinking mode above shows my step-by-step reasoning process.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          thinking: [
            {
              title: 'Understanding the request',
              content: 'The user wants me to demonstrate the thinking mode feature with a detailed analysis.',
              duration: '0.3s',
            },
            {
              title: 'Breaking down the problem',
              content: 'I need to show how the AI processes information step by step, making the reasoning transparent.',
              duration: '0.8s',
            },
            {
              title: 'Gathering relevant information',
              content: 'Looking at the context and previous messages to provide accurate information.',
              duration: '1.2s',
            },
            {
              title: 'Formulating the response',
              content: 'Crafting a clear, concise response that addresses the user\'s question while demonstrating the thinking feature.',
              duration: '0.5s',
            },
          ],
        };
      } else if (input.toLowerCase().includes('explain') || input.toLowerCase().includes('how')) {
        aiMessage = {
          id: messages.length + 2,
          sender: 'ai',
          content: 'Let me explain how this works. The system uses a combination of advanced algorithms and natural language processing to understand your questions and provide relevant answers.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          inlineThinking: 'Breaking down the concept into simple, understandable parts...',
        };
      } else if (input.toLowerCase().includes('delete') || input.toLowerCase().includes('remove')) {
        aiMessage = {
          id: messages.length + 2,
          sender: 'ai',
          content: 'I can help you with that deletion. However, this is a destructive action that requires your confirmation.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          confirmation: {
            question: 'Are you sure you want to proceed with this deletion? This action cannot be undone.',
            onConfirm: () => showToast('success', 'Action confirmed and executed'),
            onCancel: () => showToast('info', 'Action cancelled'),
          },
        };
      } else {
        aiMessage = {
          id: messages.length + 2,
          sender: 'ai',
          content: 'I understand your question. Try asking me to "analyze something", "explain how it works", or request a "delete" action to see different chat features in action!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
      }

      setMessages(prev => [...prev, aiMessage]);
    }, 1000);

    setInput('');
  };

  const handleReset = () => {
    setMessages([
      {
        id: 1,
        sender: 'ai',
        content: 'Hello! I\'m your AI assistant. I can demonstrate different chat features:\n\n1. Thinking mode (shows reasoning steps)\n2. Inline thinking (subtle thought process)\n3. Confirmations (for important actions)\n\nTry asking me to:\n- "Analyze something" (shows thinking mode)\n- "Explain how X works" (shows inline thinking)\n- "Delete my files" (shows confirmation)',
        timestamp: '2:00 PM',
      },
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-secondary/30">
      <header className="bg-white dark:bg-[#1a1a1a] border-b border-border dark:border-[#2a2a2a] px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-lg dark:text-gray-100">Chat Component Demo</h1>
            <p className="text-xs text-muted-foreground dark:text-gray-400 mt-0.5">
              Interactive demonstration of all chat features
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={handleReset} className="gap-2">
            <RotateCcw className="w-4 h-4" />
            Reset Chat
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map(message => (
            <ChatMessage key={message.id} {...message} />
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] border-t border-border dark:border-[#2a2a2a] px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Try: 'analyze the data', 'explain how it works', or 'delete my files'"
              className="flex-1 px-4 py-3 border border-border dark:border-[#2a2a2a] rounded-xl bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <Button onClick={handleSend} size="lg" disabled={!input.trim()} className="gap-2">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground dark:text-gray-400 mt-2 text-center">
            This is a demonstration of chat component features
          </p>
        </div>
      </div>
    </div>
  );
}
````````

## `src/app/screens/ChatScreen.tsx`

- Category: screen.
- Imports: import { useState } from "react";, import { useParams, useNavigate } from "react-router";, import { Button } from "../components/Button";, import { ErrorState } from "../components/ErrorState";, import { subjects, posts } from "../data/mockData";, import { Sparkles, Send, RotateCcw, AlertCircle } from "lucide-react";
- Exports: export function ChatScreen() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "../components/Button";
import { ErrorState } from "../components/ErrorState";
import { subjects, posts } from "../data/mockData";
import { Sparkles, Send, RotateCcw, AlertCircle } from "lucide-react";

interface Message {
  id: number;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'error';
}

export function ChatScreen() {
  const { contextType, contextId } = useParams();
  const navigate = useNavigate();

  const subject = subjects.find(s => s.id === contextId);
  const post = posts.find(p => p.id === contextId);
  const contextName = subject?.name || post?.title || 'General';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'ai',
      text: `Hi! I'm focused on "${contextName}". Ask me anything about this topic.`,
      timestamp: 'Just now',
      status: 'sent',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: input,
      timestamp: 'Just now',
      status: 'sending',
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // Random success/error
      const success = Math.random() > 0.1;

      if (success) {
        const aiResponse: Message = {
          id: messages.length + 2,
          sender: 'ai',
          text: `Based on "${contextName}", ${input.toLowerCase().includes('what') ? "here's what you need to know" : input.toLowerCase().includes('how') ? "here's how it works" : "let me explain"}...\n\nThis is a contextual AI response that would draw from the specific subject or post content. The AI maintains focus on the selected context to provide accurate, relevant answers.`,
          timestamp: 'Just now',
          status: 'sent',
        };

        setMessages(prev => [
          ...prev.slice(0, -1),
          { ...prev[prev.length - 1], status: 'sent' },
          aiResponse,
        ]);
      } else {
        setMessages(prev => [
          ...prev.slice(0, -1),
          { ...prev[prev.length - 1], status: 'error' },
        ]);
      }

      setIsLoading(false);
    }, 1500);
  };

  const handleRetry = (messageId: number) => {
    const message = messages.find(m => m.id === messageId);
    if (!message) return;

    setInput(message.text);
    setMessages(prev => prev.filter(m => m.id !== messageId));
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: 1,
        sender: 'ai',
        text: `Hi! I'm focused on "${contextName}". Ask me anything about this topic.`,
        timestamp: 'Just now',
        status: 'sent',
      },
    ]);
  };

  return (
    <div className="flex flex-col h-screen bg-secondary/30 dark:bg-[#0f0f0f]">
      <header className="bg-white dark:bg-[#1a1a1a] border-b border-border dark:border-[#2a2a2a] px-6 py-4 flex items-center justify-between flex-shrink-0 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="font-semibold flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              GIGA AI
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs text-muted-foreground">Context:</span>
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                {contextName}
              </span>
            </div>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="gap-2" onClick={handleNewChat}>
          <RotateCcw className="w-4 h-4" />
          New Chat
        </Button>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.sender === 'ai' && (
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3 flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
              )}
              <div className="max-w-2xl">
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'bg-primary text-white'
                      : 'bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a]'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed dark:text-gray-200">{message.text}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <p
                      className={`text-xs ${
                        message.sender === 'user'
                          ? 'text-white/70'
                          : 'text-muted-foreground dark:text-gray-400'
                      }`}
                    >
                      {message.timestamp}
                    </p>
                    {message.status === 'sending' && (
                      <span className="text-xs text-white/70">Sending...</span>
                    )}
                  </div>
                </div>

                {message.status === 'error' && (
                  <div className="mt-2">
                    <ErrorState
                      inline
                      title="Response failed"
                      message="The AI couldn't respond. Please try again."
                      onRetry={() => handleRetry(message.id)}
                    />
                  </div>
                )}
              </div>
              {message.sender === 'user' && (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center ml-3 flex-shrink-0 text-sm font-medium text-primary">
                  U
                </div>
              )}
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3 flex-shrink-0">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-2xl px-4 py-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span>Thinking...</span>
                </div>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-[#1a1a1a] border-t border-border dark:border-[#2a2a2a] px-6 py-4 flex-shrink-0 sticky bottom-0">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Ask a question..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 border border-border dark:border-[#2a2a2a] rounded-xl bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <Button
              onClick={handleSend}
              size="lg"
              className="gap-2"
              disabled={isLoading || !input.trim()}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground dark:text-gray-400 mt-2 text-center">
            AI answers are contextual to <span className="font-medium">{contextName}</span>. Responses may contain errors.
          </p>
        </div>
      </div>
    </div>
  );
}
````````

## `src/app/screens/ComponentsShowcase.tsx`

- Category: screen.
- Imports: import { useState, useEffect } from "react";, import { Card } from "../components/Card";, import { Button } from "../components/Button";, import { LoadingState } from "../components/LoadingState";, import { ErrorState } from "../components/ErrorState";, import { EmptyState } from "../components/EmptyState";, import { InputField, TextareaField, SelectField } from "../components/FormField";, import { MultiSelect, iconOptions, userOptions, tagOptions, categoryOptions } from "../components/MultiSelect";, import { EnhancedDataTable, Column } from "../components/EnhancedDataTable";, import { TreeView, sampleTreeData } from "../components/TreeView";
- Exports: export function ComponentsShowcase() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
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
````````

## `src/app/screens/CredentialsManager.tsx`

- Category: screen.
- Imports: import { useState } from "react";, import { Key, Plus, Trash2, Eye, EyeOff, Copy, Users } from "lucide-react";, import { Button } from "../components/Button";, import { Modal } from "../components/Modal";, import { useToast } from "../components/Toast";, import { FilterBar, FilterConfig } from "../components/FilterBar";, import { Input } from "../components/ui/input";
- Exports: export function CredentialsManager() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
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
````````

## `src/app/screens/DashboardFromChat.tsx`

- Category: screen.
- Imports: import { useState } from "react";, import { Send, TrendingUp, Users, DollarSign, Activity, BarChart3, ChevronRight } from "lucide-react";, import { Button } from "../components/Button";, import { Card } from "../components/Card";, import { IntelligenceModal } from "../components/IntelligenceModal";
- Exports: export function DashboardFromChat() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
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
````````

## `src/app/screens/DesignSystemShowcase.tsx`

- Category: screen.
- Imports: import { useState } from "react";, import { Plus, Download, Settings, User, Bell, Search as SearchIcon, Edit, Trash2, Eye, MoreVertical } from "lucide-react";, import { Button } from "../components/Button";, import { Input } from "../components/ui/input";, import { Card } from "../components/Card";, import { useToast } from "../components/Toast";, import { TreeSelectField } from "../components/selectors/TreeSelectField";, import { TreeNode } from "../components/LazyLoadTree";, import { LazyLoadList, ListItem } from "../components/LazyLoadList";
- Exports: export function DesignSystemShowcase() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
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
````````

## `src/app/screens/ExploreScreen.tsx`

- Category: screen.
- Imports: import { useState, useEffect } from "react";, import { useNavigate } from "react-router";, import { Card } from "../components/Card";, import { LoadingState } from "../components/LoadingState";, import { ErrorState } from "../components/ErrorState";, import { EmptyState } from "../components/EmptyState";, import { channels, categories, subjects } from "../data/mockData";, import { Radio, ArrowRight, FolderOpen, BookOpen } from "lucide-react";
- Exports: export function ExploreScreen() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
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
````````

## `src/app/screens/FileViewer.tsx`

- Category: screen.
- Imports: import { useState, useEffect } from 'react';, import { useParams, useNavigate } from 'react-router';, import { Card } from '../components/Card';, import { Button } from '../components/Button';, import { useToast } from '../components/Toast';, import Editor from '@monaco-editor/react';, import {, import { normalizeResult } from '@workflow/executor';, import { executeBackend } from '@workflow/execute';, import { createAgentBackendNodeModule } from '@workflow/nodes/nodes/_agent-backend-node-module';
- Exports: export const validate = async (payload: WorkerPayload): Promise<WorkerValidateResult> => {, export const init = async (payload: WorkerPayload): Promise<boolean> => { NODE_SCOPE.workflowId = text(record(payload.workflow?.metadata).id); return true; };, export const onUpdate = async (payload: WorkerPayload): Promise<WorkerUpdateResult> => { NODE_SCOPE.lastStatus = payload.self?.status || NODE_SCOPE.lastStatus; NODE_SCOPE.lastOutput = payload.self?.OUTPUT || NODE_SCOPE.lastOutput; return { ok: true, error: null }; };, export const execute = async (payload: WorkerPayload): Promise<WorkerExecuteResult> => {, export const commandToolSpec = async (payload: WorkerPayload): Promise<WorkflowCommandToolSpec> => {, export default createAgentBackendNodeModule({ id: 'airtable', rawSchema, label: 'Airtable', description: 'Read/write Airtable through centralized backend capabilities.', kind: 'database', order: 512 });, export interface APIEndpoint {, export const endpoints: APIEndpoint[] = [, export interface User {, export default function FileViewer() {
- Reuse guidance: Use this for User Drive/Organisation Drive upload, file viewer, AI Agent project file editing, and ingestion mode changes.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
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
````````

## `src/app/screens/GlobalDefaults.tsx`

- Category: screen.
- Imports: import { useState } from 'react';, import { useNavigate } from 'react-router';, import { Card } from '../components/Card';, import { Button } from '../components/Button';, import { Badge } from '../components/Badge';, import { useToast } from '../components/Toast';, import { Settings, Bot, Zap, ChevronDown, X, Shield } from 'lucide-react';
- Exports: export default function GlobalDefaults() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
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
````````

## `src/app/screens/Home.tsx`

- Category: screen.
- Imports: import { useState } from "react";, import { useNavigate } from "react-router";, import { Card } from "../components/Card";, import { channels, subjects, posts, recentActivity } from "../data/mockData";, import { Sparkles, Compass, BookOpen, Plus, ArrowRight, Clock } from "lucide-react";
- Exports: export function Home() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
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
````````

## `src/app/screens/LandingPage.tsx`

- Category: screen.
- Imports: import { ArrowRight, Brain, Search, Zap, MessageSquare, FolderTree, Shield, Sparkles, Bot, Workflow, Database, Lock, TrendingUp, Users, Globe, Code, Cpu, Network, GitBranch, BarChart3, CheckCircle2, Play } from "lucide-react";, import { Button } from "../components/Button";, import { Card } from "../components/Card";, import { Link } from "react-router";, import { motion } from "motion/react";, import { ImageWithFallback } from "../components/figma/ImageWithFallback";
- Exports: export function LandingPage() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
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
````````

## `src/app/screens/Login.tsx`

- Category: screen.
- Imports: import { useState } from 'react';, import { useNavigate } from 'react-router';, import { motion } from 'motion/react';, import { Sparkles, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';, import { Button } from '../components/Button';
- Exports: export function Login() {
- Reuse guidance: Use this screen as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
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
````````
