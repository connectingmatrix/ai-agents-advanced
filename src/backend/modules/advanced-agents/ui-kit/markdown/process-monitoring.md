# UI Kit Process Monitoring Source Context

This file exports 19 source file(s). Each section includes reuse guidance and an exact snippet from the uploaded UI Kit.

## `PROCESS_MONITORING_NOTES.md`

- Category: support file.
- Imports: import { processMonitorRealtime } from './src/app/process-monitoring';
- Exports: No named exports detected; inspect the default/component body.
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````md
# Process tree / realtime monitor integration notes

## Routes

- Root/admin users: `/admin-dashboard`
- Normal users: `/process-monitoring`
- Legacy alias retained: `/process-monitor`

## Main files added

- `src/app/process-monitoring/views/ProcessMonitorView.tsx` — shared view used by both routes.
- `src/app/process-monitoring/components/*` — smaller UI components for header, metrics, user tree, process tree, realtime logs, footer, and popovers.
- `src/app/process-monitoring/realtimeProcessStore.ts` — subscription store and public update API.
- `src/app/process-monitoring/types.ts` — realtime data contracts.
- `src/app/process-monitoring/mockProcessMonitorData.ts` — initial mock snapshot.

## Realtime API

The view subscribes to `processMonitorRealtime`. Push data into the UI with:

```ts
import { processMonitorRealtime } from './src/app/process-monitoring';

processMonitorRealtime.upsertProcesses([...]);
processMonitorRealtime.upsertUsers([...]);
processMonitorRealtime.setMetrics({ cpuUsage: 31.2 });
processMonitorRealtime.appendLogs([...]);
processMonitorRealtime.replaceSnapshot(fullSnapshot);
```

For quick browser testing, the same API is exposed as:

```js
window.processMonitorRealtime.appendLogs([
  {
    id: crypto.randomUUID(),
    timestamp: new Date().toLocaleTimeString(),
    processName: 'api-worker',
    pid: 8844,
    userId: 'john',
    level: 'INFO',
    message: 'Realtime process sample received',
  },
]);
```

## UI details

- User Tree is summary-only; clicking a user loads that user’s process tree.
- Process Tree supports branch expand/collapse and expand-all/collapse-all.
- Real-time Logs panel has an independent scroll container.
- Filter, Columns, Settings, Alerts, and Time Range popovers are fixed-position with viewport flipping so they stay above the view.
- Accent color uses the existing `AccentColorContext` CSS variables.
- Light/dark mode uses the existing `DarkModeContext`.

## Build

The final package was validated with:

```bash
npm install --ignore-scripts --no-audit --no-fund
npm run build
```
````````

## `src/app/process-monitoring/components/MetricsGrid.tsx`

- Category: process monitoring.
- Imports: import { MetricCard } from '../../components/monitoring/MetricCard';, import type { ProcessMonitorMetrics } from '../types';, import { createSparkline, formatBytes, formatPercent } from '../formatters';
- Exports: export function MetricsGrid({ metrics, showSparklines }: MetricsGridProps) {
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { MetricCard } from '../../components/monitoring/MetricCard';
import type { ProcessMonitorMetrics } from '../types';
import { createSparkline, formatBytes, formatPercent } from '../formatters';

interface MetricsGridProps {
  metrics: ProcessMonitorMetrics;
  showSparklines: boolean;
}

export function MetricsGrid({ metrics, showSparklines }: MetricsGridProps) {
  const sparkline = (variant: 'blue' | 'green' | 'purple' | 'cyan' | 'red', seed: number) =>
    showSparklines ? { variant, data: createSparkline(seed) } : undefined;

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-8">
      <MetricCard title="Total Processes" value={metrics.totalProcesses} sparkline={sparkline('blue', 2)} />
      <MetricCard title="Total Users" value={metrics.totalUsers} sparkline={sparkline('blue', 4)} />
      <MetricCard title="CPU Usage" value={formatPercent(metrics.cpuUsage)} sparkline={sparkline('green', 6)} />
      <MetricCard title="Memory Usage" value={formatBytes(metrics.memoryUsedBytes)} unit={`/ ${formatBytes(metrics.memoryTotalBytes)}`} sparkline={sparkline('purple', 8)} />
      <MetricCard title="Load Average" value={metrics.loadAverage.map((item) => item.toFixed(2)).join('  ')} sparkline={sparkline('blue', 10)} />
      <MetricCard title="Disk I/O" value={metrics.diskMbps} unit="MB/s" sparkline={sparkline('cyan', 12)} />
      <MetricCard title="Active Alerts" value={metrics.activeAlerts} sparkline={sparkline('red', 14)} />
      <MetricCard title="System Uptime" value={metrics.uptime} />
    </section>
  );
}
````````

## `src/app/process-monitoring/components/MonitorFooter.tsx`

- Category: process monitoring.
- Imports: import { Clock, Gauge, HardDrive, RefreshCcw } from 'lucide-react';, import { SparklineChart } from '../../components/monitoring/SparklineChart';, import type { ProcessMonitorMetrics } from '../types';, import { formatBytes, formatPercent } from '../formatters';
- Exports: export function MonitorFooter({ metrics, updatedAt, isLive, logLineCap }: MonitorFooterProps) {
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { Clock, Gauge, HardDrive, RefreshCcw } from 'lucide-react';
import { SparklineChart } from '../../components/monitoring/SparklineChart';
import type { ProcessMonitorMetrics } from '../types';
import { formatBytes, formatPercent } from '../formatters';

interface MonitorFooterProps {
  metrics: ProcessMonitorMetrics;
  updatedAt: string;
  isLive: boolean;
  logLineCap: number;
}

export function MonitorFooter({ metrics, updatedAt, isLive, logLineCap }: MonitorFooterProps) {
  return (
    <footer className="relative z-10 grid gap-3 border-t border-border/80 bg-background/80 px-4 py-3 text-xs text-muted-foreground backdrop-blur dark:border-white/10 dark:bg-[#07101c]/90 md:grid-cols-2 xl:grid-cols-6">
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4" />
        <span>System Uptime:</span>
        <strong className="text-foreground">{metrics.uptime}</strong>
      </div>
      <div className="flex items-center gap-2">
        <Gauge className="h-4 w-4" />
        <span>Load Average:</span>
        <strong className="text-foreground">{metrics.loadAverage.map((value) => value.toFixed(2)).join('  ')}</strong>
      </div>
      <div className="flex items-center gap-2">
        <span>CPU:</span>
        <strong className="text-foreground">{formatPercent(metrics.cpuUsage)}</strong>
        <SparklineChart variant="green" width={82} height={22} className="h-[22px] w-[82px]" />
      </div>
      <div className="flex items-center gap-2">
        <HardDrive className="h-4 w-4" />
        <span>Memory:</span>
        <strong className="text-foreground">{formatBytes(metrics.memoryUsedBytes)}</strong>
      </div>
      <div className="flex items-center gap-2">
        <RefreshCcw className={`h-4 w-4 ${isLive ? 'animate-spin text-primary' : ''}`} />
        <span>Last Updated:</span>
        <strong className="text-foreground">{updatedAt}</strong>
      </div>
      <div className="flex items-center gap-2 md:justify-end">
        <span>Log Lines:</span>
        <strong className="text-foreground">{logLineCap}</strong>
      </div>
    </footer>
  );
}
````````

## `src/app/process-monitoring/components/MonitorHeader.tsx`

- Category: process monitoring.
- Imports: import { Activity, Bell, Columns, Filter, Maximize, Moon, Pause, Play, Settings, Sun, Timer } from 'lucide-react';, import { useNavigate } from 'react-router';, import { LiveBadge } from '../../components/monitoring/LiveBadge';, import { ToolbarButton } from '../../components/monitoring/ToolbarButton';, import type { ProcessAccessMode } from '../types';, import type { RefObject } from 'react';
- Exports: export function MonitorHeader({
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { Activity, Bell, Columns, Filter, Maximize, Moon, Pause, Play, Settings, Sun, Timer } from 'lucide-react';
import { useNavigate } from 'react-router';
import { LiveBadge } from '../../components/monitoring/LiveBadge';
import { ToolbarButton } from '../../components/monitoring/ToolbarButton';
import type { ProcessAccessMode } from '../types';
import type { RefObject } from 'react';

interface MonitorHeaderProps {
  title: string;
  accessMode: ProcessAccessMode;
  isLive: boolean;
  isDarkMode: boolean;
  timeRange: string;
  alertCount: number;
  onToggleLive: () => void;
  onToggleTheme: () => void;
  onOpenFilter: () => void;
  onOpenColumns: () => void;
  onOpenAlerts: () => void;
  onOpenSettings: () => void;
  onOpenTimeRange: () => void;
  refs: {
    filter: RefObject<HTMLButtonElement>;
    columns: RefObject<HTMLButtonElement>;
    alerts: RefObject<HTMLButtonElement>;
    settings: RefObject<HTMLButtonElement>;
    timeRange: RefObject<HTMLButtonElement>;
  };
}

export function MonitorHeader({
  title,
  accessMode,
  isLive,
  isDarkMode,
  timeRange,
  alertCount,
  onToggleLive,
  onToggleTheme,
  onOpenFilter,
  onOpenColumns,
  onOpenAlerts,
  onOpenSettings,
  onOpenTimeRange,
  refs,
}: MonitorHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="relative z-20 flex flex-col gap-3 border-b border-border/80 bg-background/80 px-3 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-[#07101c]/90 lg:flex-row lg:items-center">
      <div className="flex min-w-max items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/25">
          <Activity className="h-6 w-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold tracking-tight text-foreground md:text-xl">{title}</h1>
            <LiveBadge isLive={isLive} />
          </div>
          <p className="text-xs text-muted-foreground">
            {accessMode === 'root' ? 'Root scope · all logged-in users' : 'Normal user scope · personal processes'}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
        <ToolbarButton
          active={accessMode === 'root'}
          label="Root"
          title="Open root/admin dashboard"
          onClick={() => navigate('/admin-dashboard')}
        />
        <ToolbarButton
          active={accessMode === 'normal'}
          label="Normal"
          title="Open normal process monitoring"
          onClick={() => navigate('/process-monitoring')}
        />
        <ToolbarButton
          ref={refs.timeRange}
          icon={<Timer className="h-4 w-4" />}
          label={timeRange}
          onClick={onOpenTimeRange}
        />
        <ToolbarButton
          icon={isLive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          label={isLive ? 'Pause' : 'Resume'}
          active={!isLive}
          onClick={onToggleLive}
        />
        <ToolbarButton ref={refs.filter} icon={<Filter className="h-4 w-4" />} label="Filter" onClick={onOpenFilter} />
        <ToolbarButton ref={refs.columns} icon={<Columns className="h-4 w-4" />} label="Columns" onClick={onOpenColumns} />
        <ToolbarButton ref={refs.alerts} icon={<Bell className="h-4 w-4" />} label="Alerts" badge={alertCount} onClick={onOpenAlerts} />
        <ToolbarButton ref={refs.settings} icon={<Settings className="h-4 w-4" />} label="Settings" onClick={onOpenSettings} />
        <ToolbarButton
          icon={isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          label={isDarkMode ? 'Light' : 'Dark'}
          onClick={onToggleTheme}
        />
        <ToolbarButton icon={<Maximize className="h-4 w-4" />} title="Fullscreen layout" onClick={() => document.documentElement.requestFullscreen?.()} />
      </div>
    </header>
  );
}
````````

## `src/app/process-monitoring/components/MonitorPanel.tsx`

- Category: process monitoring.
- Imports: import type { ReactNode } from 'react';
- Exports: export function MonitorPanel({ header, children, footer, className = '', bodyClassName = '' }: MonitorPanelProps) {
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import type { ReactNode } from 'react';

interface MonitorPanelProps {
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export function MonitorPanel({ header, children, footer, className = '', bodyClassName = '' }: MonitorPanelProps) {
  return (
    <section className={`min-h-0 overflow-hidden rounded-xl border border-border/80 bg-card/95 shadow-sm dark:border-white/10 dark:bg-[#0b1726]/95 dark:shadow-[0_4px_22px_rgba(0,0,0,0.38)] flex flex-col ${className}`}>
      {header}
      <div className={`flex-1 min-h-0 overflow-auto ${bodyClassName}`}>{children}</div>
      {footer}
    </section>
  );
}
````````

## `src/app/process-monitoring/components/MonitorPopovers.tsx`

- Category: process monitoring.
- Imports: import { Popover, PopoverSection, CheckRow, RadioRow, SettingRow } from '../../components/monitoring/Popover';, import { Toggle } from '../../components/monitoring/Toggle';, import { Button } from '../../components/Button';, import { ACCENT_COLORS, type AccentColorKey } from '../../contexts/AccentColorContext';, import type { RefObject } from 'react';, import type { LogLevel, MonitorAlert, MonitorColumnState, MonitorSettingsState, ProcessMonitorFilters, ProcessStatus } from '../types';
- Exports: export function createDefaultMonitorColumns(): MonitorColumnState {, export function createDefaultMonitorFilters(): ProcessMonitorFilters {, export function MonitorPopovers({
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { Popover, PopoverSection, CheckRow, RadioRow, SettingRow } from '../../components/monitoring/Popover';
import { Toggle } from '../../components/monitoring/Toggle';
import { Button } from '../../components/Button';
import { ACCENT_COLORS, type AccentColorKey } from '../../contexts/AccentColorContext';
import type { RefObject } from 'react';
import type { LogLevel, MonitorAlert, MonitorColumnState, MonitorSettingsState, ProcessMonitorFilters, ProcessStatus } from '../types';

type MonitorPopoverName = 'filter' | 'columns' | 'alerts' | 'settings' | 'timeRange';

interface MonitorPopoversProps {
  refs: {
    filter: RefObject<HTMLButtonElement>;
    columns: RefObject<HTMLButtonElement>;
    alerts: RefObject<HTMLButtonElement>;
    settings: RefObject<HTMLButtonElement>;
    timeRange: RefObject<HTMLButtonElement>;
  };
  open: {
    filter: boolean;
    columns: boolean;
    alerts: boolean;
    settings: boolean;
    timeRange: boolean;
  };
  onClose: (name: MonitorPopoverName) => void;
  filters: ProcessMonitorFilters;
  setFilters: (filters: ProcessMonitorFilters) => void;
  columns: MonitorColumnState;
  setColumns: (columns: MonitorColumnState) => void;
  settings: MonitorSettingsState;
  setSettings: (settings: MonitorSettingsState) => void;
  alerts: MonitorAlert[];
  timeRange: string;
  setTimeRange: (value: string) => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  accentColor: AccentColorKey;
  setAccentColor: (color: AccentColorKey) => void;
}

const defaultFilters: ProcessMonitorFilters = {
  logLevels: { INFO: true, DEBUG: true, WARN: true, ERROR: true },
  processStatuses: { running: true, sleeping: true, stopped: true, zombie: true },
  minCpu: 0,
};

const defaultColumns: MonitorColumnState = {
  users: { user: true, cpu: true, memory: true, processes: true, status: true },
  processes: { process: true, pid: true, cpu: true, memory: true, status: true },
  logs: { time: true, process: true, pid: true, level: true, message: true },
};

export function createDefaultMonitorColumns(): MonitorColumnState {
  return {
    users: { ...defaultColumns.users },
    processes: { ...defaultColumns.processes },
    logs: { ...defaultColumns.logs },
  };
}

export function createDefaultMonitorFilters(): ProcessMonitorFilters {
  return {
    logLevels: { ...defaultFilters.logLevels },
    processStatuses: { ...defaultFilters.processStatuses },
    minCpu: defaultFilters.minCpu,
  };
}

export function MonitorPopovers({
  refs,
  open,
  onClose,
  filters,
  setFilters,
  columns,
  setColumns,
  settings,
  setSettings,
  alerts,
  timeRange,
  setTimeRange,
  isDarkMode,
  toggleDarkMode,
  accentColor,
  setAccentColor,
}: MonitorPopoversProps) {
  const updateLogLevel = (level: LogLevel, checked: boolean) => {
    setFilters({ ...filters, logLevels: { ...filters.logLevels, [level]: checked } });
  };

  const updateProcessStatus = (status: ProcessStatus, checked: boolean) => {
    setFilters({ ...filters, processStatuses: { ...filters.processStatuses, [status]: checked } });
  };

  return (
    <>
      <Popover isOpen={open.filter} onClose={() => onClose('filter')} trigger={refs.filter.current} title="Filters" width={380}>
        <p className="mb-4 text-sm text-muted-foreground">Filter process rows and realtime log lines before they are rendered.</p>

        <PopoverSection title="Log levels">
          {(Object.keys(filters.logLevels) as LogLevel[]).map((level) => (
            <CheckRow key={level} label={level} checked={filters.logLevels[level]} onChange={(checked) => updateLogLevel(level, checked)} />
          ))}
        </PopoverSection>

        <PopoverSection title="Process statuses">
          {(Object.keys(filters.processStatuses) as ProcessStatus[]).map((status) => (
            <CheckRow key={status} label={status.charAt(0).toUpperCase() + status.slice(1)} checked={filters.processStatuses[status]} onChange={(checked) => updateProcessStatus(status, checked)} />
          ))}
        </PopoverSection>

        <PopoverSection title="CPU threshold">
          <SettingRow label="Minimum CPU %">
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={filters.minCpu}
              onChange={(event) => setFilters({ ...filters, minCpu: Number(event.target.value) || 0 })}
              className="h-9 w-24 rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 dark:border-white/10"
            />
          </SettingRow>
        </PopoverSection>

        <div className="flex gap-3 pt-4">
          <Button variant="secondary" size="sm" onClick={() => setFilters(createDefaultMonitorFilters())}>Reset</Button>
          <Button size="sm" onClick={() => onClose('filter')}>Done</Button>
        </div>
      </Popover>

      <Popover isOpen={open.columns} onClose={() => onClose('columns')} trigger={refs.columns.current} title="Columns" width={420}>
        <p className="mb-4 text-sm text-muted-foreground">Show or hide columns per panel. Primary identity columns stay enabled for readability.</p>

        <PopoverSection title="User tree">
          <CheckRow label="User" checked={columns.users.user} onChange={() => undefined} disabled badge="required" />
          <CheckRow label="CPU %" checked={columns.users.cpu} onChange={(checked) => setColumns({ ...columns, users: { ...columns.users, cpu: checked } })} />
          <CheckRow label="Memory" checked={columns.users.memory} onChange={(checked) => setColumns({ ...columns, users: { ...columns.users, memory: checked } })} />
          <CheckRow label="Processes" checked={columns.users.processes} onChange={(checked) => setColumns({ ...columns, users: { ...columns.users, processes: checked } })} />
          <CheckRow label="Status" checked={columns.users.status} onChange={(checked) => setColumns({ ...columns, users: { ...columns.users, status: checked } })} />
        </PopoverSection>

        <PopoverSection title="Process tree">
          <CheckRow label="Process Name" checked={columns.processes.process} onChange={() => undefined} disabled badge="required" />
          <CheckRow label="PID" checked={columns.processes.pid} onChange={(checked) => setColumns({ ...columns, processes: { ...columns.processes, pid: checked } })} />
          <CheckRow label="CPU %" checked={columns.processes.cpu} onChange={(checked) => setColumns({ ...columns, processes: { ...columns.processes, cpu: checked } })} />
          <CheckRow label="Memory" checked={columns.processes.memory} onChange={(checked) => setColumns({ ...columns, processes: { ...columns.processes, memory: checked } })} />
          <CheckRow label="Status" checked={columns.processes.status} onChange={(checked) => setColumns({ ...columns, processes: { ...columns.processes, status: checked } })} />
        </PopoverSection>

        <PopoverSection title="Realtime logs">
          <CheckRow label="Time" checked={columns.logs.time} onChange={(checked) => setColumns({ ...columns, logs: { ...columns.logs, time: checked } })} />
          <CheckRow label="Process" checked={columns.logs.process} onChange={(checked) => setColumns({ ...columns, logs: { ...columns.logs, process: checked } })} />
          <CheckRow label="PID" checked={columns.logs.pid} onChange={(checked) => setColumns({ ...columns, logs: { ...columns.logs, pid: checked } })} />
          <CheckRow label="Level" checked={columns.logs.level} onChange={(checked) => setColumns({ ...columns, logs: { ...columns.logs, level: checked } })} />
          <CheckRow label="Message" checked={columns.logs.message} onChange={() => undefined} disabled badge="required" />
        </PopoverSection>

        <div className="flex gap-3 pt-4">
          <Button variant="secondary" size="sm" onClick={() => setColumns(createDefaultMonitorColumns())}>Reset columns</Button>
          <Button size="sm" onClick={() => onClose('columns')}>Done</Button>
        </div>
      </Popover>

      <Popover isOpen={open.alerts} onClose={() => onClose('alerts')} trigger={refs.alerts.current} title="Active Alerts" width={400}>
        <p className="mb-4 text-sm text-muted-foreground">Current alerts for the selected process scope.</p>
        <div className="space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="rounded-xl border border-border bg-muted/35 p-3 dark:border-white/10 dark:bg-white/5">
              <div className={`text-xs font-bold ${alert.level === 'ERROR' ? 'text-red-500' : 'text-yellow-500'}`}>{alert.level}</div>
              <div className="mt-1 font-semibold text-foreground">{alert.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{alert.message}</p>
            </div>
          ))}
        </div>
        <div className="pt-4">
          <Button size="sm" onClick={() => onClose('alerts')}>Done</Button>
        </div>
      </Popover>

      <Popover isOpen={open.settings} onClose={() => onClose('settings')} trigger={refs.settings.current} title="Settings" width={420}>
        <p className="mb-4 text-sm text-muted-foreground">Theme, accent color, density, and realtime rendering preferences.</p>

        <PopoverSection title="Appearance">
          <SettingRow label="Dark mode">
            <Toggle checked={isDarkMode} onChange={toggleDarkMode} />
          </SettingRow>
          <SettingRow label="Accent color">
            <select
              value={accentColor}
              onChange={(event) => setAccentColor(event.target.value as AccentColorKey)}
              className="h-9 min-w-[150px] rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 dark:border-white/10"
            >
              {Object.entries(ACCENT_COLORS).map(([key, color]) => (
                <option key={key} value={key}>{color.name}</option>
              ))}
            </select>
          </SettingRow>
          <SettingRow label="Compact rows">
            <Toggle checked={settings.compactRows} onChange={(checked) => setSettings({ ...settings, compactRows: checked })} />
          </SettingRow>
          <SettingRow label="Show metric sparklines">
            <Toggle checked={settings.showSparklines} onChange={(checked) => setSettings({ ...settings, showSparklines: checked })} />
          </SettingRow>
          <SettingRow label="High contrast">
            <Toggle checked={settings.highContrast} onChange={(checked) => setSettings({ ...settings, highContrast: checked })} />
          </SettingRow>
          <SettingRow label="Reduce motion">
            <Toggle checked={settings.reduceMotion} onChange={(checked) => setSettings({ ...settings, reduceMotion: checked })} />
          </SettingRow>
        </PopoverSection>

        <PopoverSection title="Realtime">
          <SettingRow label="Refresh interval">
            <select
              value={String(settings.refreshIntervalMs)}
              onChange={(event) => setSettings({ ...settings, refreshIntervalMs: Number(event.target.value) })}
              className="h-9 min-w-[110px] rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 dark:border-white/10"
            >
              <option value="800">0.8 sec</option>
              <option value="1400">1.4 sec</option>
              <option value="3000">3 sec</option>
              <option value="5000">5 sec</option>
            </select>
          </SettingRow>
          <SettingRow label="Log line cap">
            <select
              value={String(settings.logLineCap)}
              onChange={(event) => setSettings({ ...settings, logLineCap: Number(event.target.value) })}
              className="h-9 min-w-[110px] rounded-lg border border-border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary/30 dark:border-white/10"
            >
              <option value="500">500</option>
              <option value="1000">1000</option>
              <option value="5000">5000</option>
              <option value="10000">10000</option>
            </select>
          </SettingRow>
        </PopoverSection>

        <div className="flex gap-3 pt-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setSettings({ compactRows: false, showSparklines: true, highContrast: false, reduceMotion: false, refreshIntervalMs: 1400, logLineCap: 5000 })}
          >
            Reset layout
          </Button>
          <Button size="sm" onClick={() => onClose('settings')}>Done</Button>
        </div>
      </Popover>

      <Popover isOpen={open.timeRange} onClose={() => onClose('timeRange')} trigger={refs.timeRange.current} title="Time Range" width={320}>
        <PopoverSection>
          {['Last 1 minute', 'Last 5 minutes', 'Last 15 minutes', 'Last 1 hour'].map((option) => (
            <RadioRow key={option} label={option} checked={timeRange === option} onChange={() => setTimeRange(option)} name="time-range" />
          ))}
        </PopoverSection>
      </Popover>
    </>
  );
}
````````

## `src/app/process-monitoring/components/ProcessTreePanel.tsx`

- Category: process monitoring.
- Imports: import { ChevronDown, ChevronRight, Network, Search } from 'lucide-react';, import { MonitorPanel } from './MonitorPanel';, import { ProcessTreeRow } from './ProcessTreeRow';, import { PanelHeader } from '../../components/monitoring/PanelHeader';, import { SearchInput } from '../../components/monitoring/SearchInput';, import { ToolbarButton } from '../../components/monitoring/ToolbarButton';, import { Legend } from '../../components/monitoring/Legend';, import type { MonitorColumnState, ProcessMonitorFilters, ProcessNode, UserMetric } from '../types';
- Exports: export function ProcessTreePanel({
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { ChevronDown, ChevronRight, Network, Search } from 'lucide-react';
import { MonitorPanel } from './MonitorPanel';
import { ProcessTreeRow } from './ProcessTreeRow';
import { PanelHeader } from '../../components/monitoring/PanelHeader';
import { SearchInput } from '../../components/monitoring/SearchInput';
import { ToolbarButton } from '../../components/monitoring/ToolbarButton';
import { Legend } from '../../components/monitoring/Legend';
import type { MonitorColumnState, ProcessMonitorFilters, ProcessNode, UserMetric } from '../types';

interface ProcessTreePanelProps {
  processes: ProcessNode[];
  users: UserMetric[];
  selectedUserId: string;
  search: string;
  filters: ProcessMonitorFilters;
  columns: MonitorColumnState['processes'];
  expandedProcesses: Set<string>;
  compactRows: boolean;
  onSearchChange: (value: string) => void;
  onToggleProcess: (processId: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

interface ProcessTreeNode {
  process: ProcessNode;
  children: ProcessTreeNode[];
}

function getFilteredProcesses(processes: ProcessNode[], selectedUserId: string, search: string, filters: ProcessMonitorFilters) {
  const query = search.trim().toLowerCase();

  return processes.filter((process) => {
    const matchesUser = selectedUserId === 'all' || process.userId === selectedUserId;
    const matchesSearch =
      !query ||
      process.name.toLowerCase().includes(query) ||
      process.command?.toLowerCase().includes(query) ||
      String(process.pid).includes(query) ||
      process.userId.toLowerCase().includes(query);
    const matchesStatus = filters.processStatuses[process.status];
    const matchesCpu = process.cpu >= filters.minCpu;

    return matchesUser && matchesSearch && matchesStatus && matchesCpu;
  });
}

function buildProcessTree(processes: ProcessNode[]): ProcessTreeNode[] {
  const nodeMap = new Map<string, ProcessTreeNode>();
  processes.forEach((process) => nodeMap.set(process.id, { process, children: [] }));

  const roots: ProcessTreeNode[] = [];
  processes.forEach((process) => {
    const node = nodeMap.get(process.id)!;
    const parent = process.parentId ? nodeMap.get(process.parentId) : undefined;

    if (parent) {
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  });

  return roots.sort((a, b) => a.process.pid - b.process.pid);
}

function flattenTree(nodes: ProcessTreeNode[], expanded: Set<string>, level = 0): Array<{ node: ProcessTreeNode; level: number }> {
  return nodes.flatMap((node) => {
    const current = [{ node, level }];
    if (node.children.length > 0 && expanded.has(node.process.id)) {
      current.push(...flattenTree(node.children, expanded, level + 1));
    }
    return current;
  });
}

export function ProcessTreePanel({
  processes,
  users,
  selectedUserId,
  search,
  filters,
  columns,
  expandedProcesses,
  compactRows,
  onSearchChange,
  onToggleProcess,
  onExpandAll,
  onCollapseAll,
}: ProcessTreePanelProps) {
  const selectedUser = users.find((user) => user.id === selectedUserId);
  const filteredProcesses = getFilteredProcesses(processes, selectedUserId, search, filters);
  const tree = buildProcessTree(filteredProcesses);
  const rows = flattenTree(tree, expandedProcesses);
  const subtitle = selectedUserId === 'all' ? 'All process groups' : `${selectedUser?.name ?? selectedUserId} process tree`;

  return (
    <MonitorPanel
      header={
        <PanelHeader
          title="Process Tree"
          subtitle={subtitle}
          actions={
            <>
              <SearchInput value={search} onChange={onSearchChange} placeholder="Search processes..." />
              <ToolbarButton icon={<ChevronDown className="h-4 w-4" />} title="Expand all process branches" onClick={onExpandAll} className="w-9 px-0" />
              <ToolbarButton icon={<ChevronRight className="h-4 w-4" />} title="Collapse all process branches" onClick={onCollapseAll} className="w-9 px-0" />
            </>
          }
        />
      }
      footer={
        <Legend
          items={[
            { status: 'running', label: 'Running' },
            { status: 'sleeping', label: 'Sleeping' },
            { status: 'high', label: 'High CPU' },
            { status: 'stopped', label: 'Stopped' },
            { status: 'zombie', label: 'Zombie' },
          ]}
        />
      }
    >
      <div className="min-w-[610px]">
        <div className="sticky top-0 z-10 grid grid-cols-[minmax(240px,1fr)_78px_84px_100px_104px] gap-3 border-b border-border/80 bg-background/95 px-4 py-3 text-xs font-semibold text-muted-foreground backdrop-blur dark:border-white/10 dark:bg-[#0b1726]/95">
          <span className={columns.process ? '' : 'hidden'}>Process Name</span>
          <span className={columns.pid ? '' : 'hidden'}>PID</span>
          <span className={columns.cpu ? '' : 'hidden'}>CPU %</span>
          <span className={columns.memory ? '' : 'hidden'}>Memory</span>
          <span className={columns.status ? '' : 'hidden'}>Status</span>
        </div>

        {rows.map(({ node, level }) => (
          <ProcessTreeRow
            key={node.process.id}
            process={node.process}
            level={level}
            hasChildren={node.children.length > 0}
            expanded={expandedProcesses.has(node.process.id)}
            columns={columns}
            compactRows={compactRows}
            onToggle={onToggleProcess}
          />
        ))}

        {rows.length === 0 && (
          <div className="grid min-h-[340px] place-items-center px-6 py-14 text-center text-muted-foreground">
            <div>
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-border bg-muted/40 dark:border-white/10 dark:bg-white/5">
                {search || filters.minCpu > 0 ? <Search className="h-7 w-7" /> : <Network className="h-7 w-7" />}
              </div>
              <h3 className="text-base font-semibold text-foreground">No process rows to show</h3>
              <p className="mt-1 max-w-sm text-sm">
                {selectedUserId === 'all'
                  ? 'Processes will appear here when realtime data arrives.'
                  : 'Try selecting another user or relaxing the process filters.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </MonitorPanel>
  );
}
````````

## `src/app/process-monitoring/components/ProcessTreeRow.tsx`

- Category: process monitoring.
- Imports: import { ChevronRight } from 'lucide-react';, import { ProcessTypeIcon } from './ProcessTypeIcon';, import { StatusDot } from '../../components/monitoring/StatusDot';, import type { MonitorColumnState, ProcessNode } from '../types';, import { formatBytes, formatPercent } from '../formatters';
- Exports: export function ProcessTreeRow({ process, level, hasChildren, expanded, columns, compactRows, onToggle }: ProcessTreeRowProps) {
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { ChevronRight } from 'lucide-react';
import { ProcessTypeIcon } from './ProcessTypeIcon';
import { StatusDot } from '../../components/monitoring/StatusDot';
import type { MonitorColumnState, ProcessNode } from '../types';
import { formatBytes, formatPercent } from '../formatters';

interface ProcessTreeRowProps {
  process: ProcessNode;
  level: number;
  hasChildren: boolean;
  expanded: boolean;
  columns: MonitorColumnState['processes'];
  compactRows: boolean;
  onToggle: (processId: string) => void;
}

const statusLabel = {
  running: 'Running',
  sleeping: 'Sleeping',
  stopped: 'Stopped',
  zombie: 'Zombie',
};

export function ProcessTreeRow({ process, level, hasChildren, expanded, columns, compactRows, onToggle }: ProcessTreeRowProps) {
  return (
    <div
      className={`grid grid-cols-[minmax(240px,1fr)_78px_84px_100px_104px] items-center gap-3 border-b border-border/60 px-4 text-xs text-foreground transition-colors hover:bg-primary/10 dark:border-white/10 dark:hover:bg-primary/15 ${
        compactRows ? 'min-h-9 py-1.5' : 'min-h-11 py-2.5'
      }`}
    >
      <div className={`${columns.process ? 'flex' : 'hidden'} min-w-0 items-center gap-2`} style={{ paddingLeft: `${level * 20}px` }}>
        {hasChildren ? (
          <button
            type="button"
            onClick={() => onToggle(process.id)}
            className="grid h-5 w-5 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            aria-label={`${expanded ? 'Collapse' : 'Expand'} ${process.name}`}
          >
            <ChevronRight className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-90' : ''}`} />
          </button>
        ) : (
          <span className="h-5 w-5 shrink-0" />
        )}
        {level > 0 && <span className="h-7 w-px shrink-0 bg-border dark:bg-white/10" aria-hidden="true" />}
        <ProcessTypeIcon process={process} />
        <div className="min-w-0">
          <div className="truncate font-semibold">{process.name}</div>
          {process.command && <div className="truncate text-[11px] text-muted-foreground">{process.command}</div>}
        </div>
      </div>
      <div className={`${columns.pid ? '' : 'hidden'} tabular-nums text-muted-foreground`}>{process.pid}</div>
      <div className={`${columns.cpu ? '' : 'hidden'} tabular-nums ${process.cpu >= 5 ? 'text-yellow-500' : 'text-green-600 dark:text-green-400'}`}>{formatPercent(process.cpu)}</div>
      <div className={`${columns.memory ? '' : 'hidden'} tabular-nums text-muted-foreground`}>{formatBytes(process.memoryBytes)}</div>
      <div className={columns.status ? '' : 'hidden'}>
        <StatusDot status={process.status} label={statusLabel[process.status]} />
      </div>
    </div>
  );
}
````````

## `src/app/process-monitoring/components/ProcessTypeIcon.tsx`

- Category: process monitoring.
- Imports: import { Box, Chrome, Code2, Cpu, Database, Server, ServerCog, Shield, Terminal, Workflow } from 'lucide-react';, import type { ProcessNode } from '../types';
- Exports: export function ProcessTypeIcon({ process }: ProcessTypeIconProps) {
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { Box, Chrome, Code2, Cpu, Database, Server, ServerCog, Shield, Terminal, Workflow } from 'lucide-react';
import type { ProcessNode } from '../types';

interface ProcessTypeIconProps {
  process: ProcessNode;
}

export function ProcessTypeIcon({ process }: ProcessTypeIconProps) {
  const baseClass = 'h-3.5 w-3.5';
  const type = process.type || 'other';

  const iconMap = {
    system: Shield,
    shell: Terminal,
    node: Workflow,
    database: Database,
    nginx: Server,
    docker: Box,
    python: Cpu,
    browser: Chrome,
    editor: Code2,
    service: ServerCog,
    other: Cpu,
  } satisfies Record<NonNullable<ProcessNode['type']>, typeof Cpu>;

  const Icon = iconMap[type];

  return (
    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary ring-1 ring-primary/20">
      <Icon className={baseClass} />
    </span>
  );
}
````````

## `src/app/process-monitoring/components/RealtimeLogsPanel.tsx`

- Category: process monitoring.
- Imports: import { Pause, Play, Search, Trash2 } from 'lucide-react';, import { MonitorPanel } from './MonitorPanel';, import { PanelHeader } from '../../components/monitoring/PanelHeader';, import { SearchInput } from '../../components/monitoring/SearchInput';, import { ToolbarButton } from '../../components/monitoring/ToolbarButton';, import { StatusDot } from '../../components/monitoring/StatusDot';, import type { LogLevel, MonitorColumnState, ProcessMonitorFilters, RealtimeLogEntry, UserMetric } from '../types';
- Exports: export function RealtimeLogsPanel({
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { Pause, Play, Search, Trash2 } from 'lucide-react';
import { MonitorPanel } from './MonitorPanel';
import { PanelHeader } from '../../components/monitoring/PanelHeader';
import { SearchInput } from '../../components/monitoring/SearchInput';
import { ToolbarButton } from '../../components/monitoring/ToolbarButton';
import { StatusDot } from '../../components/monitoring/StatusDot';
import type { LogLevel, MonitorColumnState, ProcessMonitorFilters, RealtimeLogEntry, UserMetric } from '../types';

interface RealtimeLogsPanelProps {
  logs: RealtimeLogEntry[];
  users: UserMetric[];
  selectedUserId: string;
  search: string;
  filters: ProcessMonitorFilters;
  columns: MonitorColumnState['logs'];
  isLive: boolean;
  compactRows: boolean;
  logLineCap: number;
  onSearchChange: (value: string) => void;
  onToggleLive: () => void;
  onClearLogs: () => void;
}

const levelClasses: Record<LogLevel, string> = {
  INFO: 'bg-primary/10 text-primary border-primary/20',
  DEBUG: 'bg-slate-500/12 text-slate-500 dark:text-slate-300 border-slate-500/20',
  WARN: 'bg-yellow-500/15 text-yellow-600 dark:text-yellow-300 border-yellow-500/25',
  ERROR: 'bg-red-500/15 text-red-600 dark:text-red-300 border-red-500/25',
};

function filterLogs(logs: RealtimeLogEntry[], selectedUserId: string, search: string, filters: ProcessMonitorFilters) {
  const query = search.trim().toLowerCase();
  return logs.filter((log) => {
    const matchesUser = selectedUserId === 'all' || log.userId === selectedUserId;
    const matchesLevel = filters.logLevels[log.level];
    const matchesSearch =
      !query ||
      log.message.toLowerCase().includes(query) ||
      log.processName.toLowerCase().includes(query) ||
      log.level.toLowerCase().includes(query) ||
      String(log.pid ?? '').includes(query);

    return matchesUser && matchesLevel && matchesSearch;
  });
}

export function RealtimeLogsPanel({
  logs,
  users,
  selectedUserId,
  search,
  filters,
  columns,
  isLive,
  compactRows,
  logLineCap,
  onSearchChange,
  onToggleLive,
  onClearLogs,
}: RealtimeLogsPanelProps) {
  const visibleLogs = filterLogs(logs, selectedUserId, search, filters).slice(0, logLineCap);
  const selectedUser = users.find((user) => user.id === selectedUserId);

  return (
    <MonitorPanel
      className="min-h-[520px]"
      bodyClassName="overflow-hidden"
      header={
        <PanelHeader
          title="Real-time Logs"
          subtitle={isLive ? `Streaming ${selectedUserId === 'all' ? 'all scopes' : selectedUser?.name ?? selectedUserId}` : 'Paused'}
          actions={
            <>
              <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
                <StatusDot status={isLive ? 'active' : 'restricted'} />
                <span>{isLive ? 'Streaming' : 'Paused'}</span>
              </div>
              <SearchInput value={search} onChange={onSearchChange} placeholder="Search logs..." />
              <ToolbarButton icon={isLive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />} onClick={onToggleLive} active={!isLive} className="w-9 px-0" title={isLive ? 'Pause logs' : 'Resume logs'} />
              <ToolbarButton icon={<Trash2 className="h-4 w-4" />} onClick={onClearLogs} className="w-9 px-0" title="Clear logs" />
            </>
          }
        />
      }
    >
      <div className="flex h-full min-h-0 flex-col">
        <div className="grid min-w-[700px] grid-cols-[120px_minmax(160px,1fr)_78px_88px_minmax(280px,2fr)] gap-3 border-b border-border/80 bg-background/95 px-4 py-3 text-xs font-semibold text-muted-foreground dark:border-white/10 dark:bg-[#0b1726]/95">
          <span className={columns.time ? '' : 'hidden'}>Time</span>
          <span className={columns.process ? '' : 'hidden'}>Process</span>
          <span className={columns.pid ? '' : 'hidden'}>PID</span>
          <span className={columns.level ? '' : 'hidden'}>Level</span>
          <span className={columns.message ? '' : 'hidden'}>Message</span>
        </div>

        <div className="min-h-0 flex-1 overflow-auto">
          <div className="min-w-[700px]">
            {visibleLogs.map((log) => (
              <div
                key={log.id}
                className={`grid grid-cols-[120px_minmax(160px,1fr)_78px_88px_minmax(280px,2fr)] items-center gap-3 border-b border-border/60 px-4 font-mono text-xs transition-colors hover:bg-primary/10 dark:border-white/10 dark:hover:bg-primary/15 ${
                  compactRows ? 'min-h-8 py-1.5' : 'min-h-10 py-2'
                }`}
              >
                <div className={`${columns.time ? '' : 'hidden'} tabular-nums text-muted-foreground`}>{log.timestamp}</div>
                <div className={`${columns.process ? '' : 'hidden'} truncate text-foreground`}>{log.processName}</div>
                <div className={`${columns.pid ? '' : 'hidden'} tabular-nums text-muted-foreground`}>{log.pid ?? '—'}</div>
                <div className={columns.level ? '' : 'hidden'}>
                  <span className={`rounded-md border px-2 py-1 text-[10px] font-bold ${levelClasses[log.level]}`}>{log.level}</span>
                </div>
                <div className={`${columns.message ? '' : 'hidden'} truncate ${log.level === 'ERROR' ? 'text-red-500 dark:text-red-300' : log.level === 'WARN' ? 'text-yellow-600 dark:text-yellow-300' : 'text-foreground'}`}>
                  {log.message}
                </div>
              </div>
            ))}

            {visibleLogs.length === 0 && (
              <div className="grid min-h-[300px] place-items-center px-6 py-14 text-center text-muted-foreground">
                <div>
                  <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl border border-border bg-muted/40 dark:border-white/10 dark:bg-white/5">
                    <Search className="h-7 w-7" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">No log lines matched</h3>
                  <p className="mt-1 max-w-sm text-sm">Realtime log entries will stream here and this panel scrolls independently.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MonitorPanel>
  );
}
````````

## `src/app/process-monitoring/components/UserTreePanel.tsx`

- Category: process monitoring.
- Imports: import { ChevronDown, ChevronRight, Crown, Search, ServerCog, User, Users } from 'lucide-react';, import { MonitorPanel } from './MonitorPanel';, import { PanelHeader } from '../../components/monitoring/PanelHeader';, import { SearchInput } from '../../components/monitoring/SearchInput';, import { ToolbarButton } from '../../components/monitoring/ToolbarButton';, import { Legend } from '../../components/monitoring/Legend';, import { StatusDot } from '../../components/monitoring/StatusDot';, import type { MonitorColumnState, ProcessAccessMode, UserMetric } from '../types';, import { formatBytes, formatPercent } from '../formatters';
- Exports: export function UserTreePanel({
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { ChevronDown, ChevronRight, Crown, Search, ServerCog, User, Users } from 'lucide-react';
import { MonitorPanel } from './MonitorPanel';
import { PanelHeader } from '../../components/monitoring/PanelHeader';
import { SearchInput } from '../../components/monitoring/SearchInput';
import { ToolbarButton } from '../../components/monitoring/ToolbarButton';
import { Legend } from '../../components/monitoring/Legend';
import { StatusDot } from '../../components/monitoring/StatusDot';
import type { MonitorColumnState, ProcessAccessMode, UserMetric } from '../types';
import { formatBytes, formatPercent } from '../formatters';

interface UserTreePanelProps {
  users: UserMetric[];
  accessMode: ProcessAccessMode;
  selectedUserId: string;
  search: string;
  columns: MonitorColumnState['users'];
  compactRows: boolean;
  expandedGroups: Set<string>;
  onSearchChange: (value: string) => void;
  onSelectUser: (userId: string) => void;
  onToggleGroup: (groupId: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

function aggregateUsers(users: UserMetric[]): UserMetric {
  return {
    id: 'all',
    name: 'All Users',
    cpu: users.reduce((sum, user) => sum + user.cpu, 0),
    memoryBytes: users.reduce((sum, user) => sum + user.memoryBytes, 0),
    processCount: users.reduce((sum, user) => sum + user.processCount, 0),
    status: users.some((user) => user.status === 'active') ? 'active' : 'idle',
    role: 'system',
  };
}

function UserGlyph({ user }: { user: UserMetric }) {
  if (user.id === 'all') return <Users className="h-4 w-4" />;
  if (user.role === 'root') return <Crown className="h-4 w-4" />;
  if (user.role === 'service' || user.role === 'system') return <ServerCog className="h-4 w-4" />;
  return <User className="h-4 w-4" />;
}

function UserRow({
  user,
  selected,
  columns,
  compactRows,
  level = 0,
  onClick,
}: {
  user: UserMetric;
  selected: boolean;
  columns: MonitorColumnState['users'];
  compactRows: boolean;
  level?: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`grid w-full grid-cols-[minmax(180px,1fr)_72px_96px_78px_96px] items-center gap-3 border-b border-border/60 px-4 text-left text-xs transition-colors hover:bg-primary/10 dark:border-white/10 dark:hover:bg-primary/20 ${
        selected ? 'bg-primary/10 ring-1 ring-inset ring-primary/20' : ''
      } ${compactRows ? 'min-h-9 py-1.5' : 'min-h-11 py-2.5'}`}
    >
      <div className={`${columns.user ? 'flex' : 'hidden'} min-w-0 items-center gap-2`} style={{ paddingLeft: `${level * 18}px` }}>
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20">
          <UserGlyph user={user} />
        </span>
        <span className="truncate font-semibold text-foreground">{user.name}</span>
      </div>
      <div className={`${columns.cpu ? '' : 'hidden'} tabular-nums text-green-600 dark:text-green-400`}>{formatPercent(user.cpu)}</div>
      <div className={`${columns.memory ? '' : 'hidden'} tabular-nums text-muted-foreground`}>{formatBytes(user.memoryBytes)}</div>
      <div className={`${columns.processes ? '' : 'hidden'} tabular-nums text-muted-foreground`}>{user.processCount}</div>
      <div className={columns.status ? '' : 'hidden'}>
        <StatusDot status={user.status === 'disconnected' ? 'restricted' : user.status} label={user.status === 'disconnected' ? 'Offline' : user.status.charAt(0).toUpperCase() + user.status.slice(1)} />
      </div>
    </button>
  );
}

export function UserTreePanel({
  users,
  accessMode,
  selectedUserId,
  search,
  columns,
  compactRows,
  expandedGroups,
  onSearchChange,
  onSelectUser,
  onToggleGroup,
  onExpandAll,
  onCollapseAll,
}: UserTreePanelProps) {
  const query = search.trim().toLowerCase();
  const visibleUsers = users.filter((user) =>
    !query || user.name.toLowerCase().includes(query) || user.role?.includes(query) || String(user.processCount).includes(query)
  );

  const serviceUsers = visibleUsers.filter((user) => user.role === 'service' || user.role === 'system');
  const loggedInUsers = visibleUsers.filter((user) => user.role !== 'service' && user.role !== 'system');
  const allUser = aggregateUsers(users);

  const GroupHeader = ({ id, title, count }: { id: string; title: string; count: number }) => {
    const expanded = expandedGroups.has(id);
    return (
      <button
        type="button"
        onClick={() => onToggleGroup(id)}
        className="flex w-full items-center gap-2 border-b border-border/60 bg-muted/40 px-4 py-2 text-left text-[11px] font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:bg-primary/10 dark:border-white/10 dark:bg-white/5"
      >
        {expanded ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
        <span>{title}</span>
        <span className="ml-auto rounded-full bg-primary/10 px-2 py-0.5 text-primary">{count}</span>
      </button>
    );
  };

  return (
    <MonitorPanel
      header={
        <PanelHeader
          title="User Tree"
          subtitle={accessMode === 'root' ? 'Click a user to load its process tree' : 'Your realtime process scope'}
          actions={
            <>
              <SearchInput value={search} onChange={onSearchChange} placeholder="Search users..." />
              <ToolbarButton icon={<ChevronDown className="h-4 w-4" />} title="Expand all user groups" onClick={onExpandAll} className="w-9 px-0" />
              <ToolbarButton icon={<ChevronRight className="h-4 w-4" />} title="Collapse all user groups" onClick={onCollapseAll} className="w-9 px-0" />
            </>
          }
        />
      }
      footer={
        <Legend
          items={[
            { status: 'active', label: 'Active' },
            { status: 'idle', label: 'Idle' },
            { status: 'restricted', label: 'Disconnected' },
            { status: 'system', label: 'Service' },
          ]}
        />
      }
    >
      <div className="min-w-[530px]">
        <div className="sticky top-0 z-10 grid grid-cols-[minmax(180px,1fr)_72px_96px_78px_96px] gap-3 border-b border-border/80 bg-background/95 px-4 py-3 text-xs font-semibold text-muted-foreground backdrop-blur dark:border-white/10 dark:bg-[#0b1726]/95">
          <span className={columns.user ? '' : 'hidden'}>User</span>
          <span className={columns.cpu ? '' : 'hidden'}>CPU %</span>
          <span className={columns.memory ? '' : 'hidden'}>Memory</span>
          <span className={columns.processes ? '' : 'hidden'}>Processes</span>
          <span className={columns.status ? '' : 'hidden'}>Status</span>
        </div>

        {accessMode === 'root' && (
          <UserRow user={allUser} selected={selectedUserId === 'all'} columns={columns} compactRows={compactRows} onClick={() => onSelectUser('all')} />
        )}

        {accessMode === 'root' ? (
          <>
            <GroupHeader id="logged-in" title="Logged-in users" count={loggedInUsers.length} />
            {expandedGroups.has('logged-in') &&
              loggedInUsers.map((user) => (
                <UserRow key={user.id} user={user} selected={selectedUserId === user.id} columns={columns} compactRows={compactRows} level={1} onClick={() => onSelectUser(user.id)} />
              ))}

            <GroupHeader id="services" title="Service accounts" count={serviceUsers.length} />
            {expandedGroups.has('services') &&
              serviceUsers.map((user) => (
                <UserRow key={user.id} user={user} selected={selectedUserId === user.id} columns={columns} compactRows={compactRows} level={1} onClick={() => onSelectUser(user.id)} />
              ))}
          </>
        ) : (
          visibleUsers.map((user) => (
            <UserRow key={user.id} user={user} selected columns={columns} compactRows={compactRows} onClick={() => onSelectUser(user.id)} />
          ))
        )}

        {visibleUsers.length === 0 && (
          <div className="grid place-items-center gap-2 px-4 py-14 text-center text-muted-foreground">
            <Search className="h-7 w-7" />
            <div>No users matched your search.</div>
          </div>
        )}
      </div>
    </MonitorPanel>
  );
}
````````

## `src/app/process-monitoring/formatters.ts`

- Category: process monitoring.
- Imports: No direct imports in this file.
- Exports: export function formatBytes(bytes: number): string {, export function formatPercent(value: number, precision = 1): string {, export function createTimestamp(date = new Date()): string {, export function createSparkline(seed: number, points = 20): number[] {
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````ts
export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }

  const precision = value >= 10 || unitIndex === 0 ? 0 : 1;
  return `${value.toFixed(precision)} ${units[unitIndex]}`;
}

export function formatPercent(value: number, precision = 1): string {
  if (!Number.isFinite(value)) return '0%';
  return `${value.toFixed(precision)}%`;
}

export function createTimestamp(date = new Date()): string {
  return date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

export function createSparkline(seed: number, points = 20): number[] {
  return Array.from({ length: points }, (_, index) => {
    const wave = Math.sin((index + seed) / 2.4) * 8;
    const drift = Math.cos((index + seed) / 4.2) * 4;
    return Math.max(2, Math.round(34 + wave + drift + ((index + seed) % 5)));
  });
}
````````

## `src/app/process-monitoring/hooks/useProcessMonitorSubscription.ts`

- Category: process monitoring.
- Imports: import { useEffect, useSyncExternalStore } from 'react';, import { processMonitorRealtime } from '../realtimeProcessStore';, import type { ProcessMonitorSnapshot } from '../types';
- Exports: export function useProcessMonitorSubscription(): ProcessMonitorSnapshot {, export function useDemoRealtimeFeed(enabled: boolean, logLineCap: number, refreshIntervalMs = 3500) {
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````ts
import { useEffect, useSyncExternalStore } from 'react';
import { processMonitorRealtime } from '../realtimeProcessStore';
import type { ProcessMonitorSnapshot } from '../types';

export function useProcessMonitorSubscription(): ProcessMonitorSnapshot {
  return useSyncExternalStore(
    processMonitorRealtime.subscribe,
    processMonitorRealtime.getSnapshot,
    processMonitorRealtime.getServerSnapshot
  );
}

export function useDemoRealtimeFeed(enabled: boolean, logLineCap: number, refreshIntervalMs = 3500) {
  useEffect(() => {
    if (!enabled) return;

    const interval = window.setInterval(() => {
      const snapshot = processMonitorRealtime.getSnapshot();
      const jitter = Math.random() * 2 - 1;
      const nextCpuUsage = Math.max(1, Math.min(99, snapshot.metrics.cpuUsage + jitter));
      const process = snapshot.processes[Math.floor(Math.random() * snapshot.processes.length)];

      processMonitorRealtime.setMetrics({
        cpuUsage: Number(nextCpuUsage.toFixed(1)),
        networkGbps: Number(Math.max(0.1, snapshot.metrics.networkGbps + jitter / 12).toFixed(2)),
      });

      if (process) {
        processMonitorRealtime.upsertProcesses([
          {
            ...process,
            cpu: Number(Math.max(0, Math.min(95, process.cpu + jitter)).toFixed(1)),
          },
        ]);

        processMonitorRealtime.appendLogs(
          [
            {
              id: `live-${Date.now()}`,
              timestamp: new Date().toLocaleTimeString('en-US', {
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              }),
              processId: process.id,
              processName: process.name,
              pid: process.pid,
              userId: process.userId,
              level: Math.random() > 0.93 ? 'WARN' : 'INFO',
              message: Math.random() > 0.93 ? 'Realtime threshold warning' : 'Realtime sample received',
            },
          ],
          logLineCap
        );
      }
    }, refreshIntervalMs);

    return () => window.clearInterval(interval);
  }, [enabled, logLineCap, refreshIntervalMs]);
}
````````

## `src/app/process-monitoring/index.ts`

- Category: process monitoring.
- Imports: No direct imports in this file.
- Exports: No named exports detected; inspect the default/component body.
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````ts
export * from './types';
export * from './realtimeProcessStore';
export * from './views/ProcessMonitorView';
````````

## `src/app/process-monitoring/mockProcessMonitorData.ts`

- Category: process monitoring.
- Imports: import type { ProcessMonitorSnapshot } from './types';
- Exports: export const initialProcessMonitorSnapshot: ProcessMonitorSnapshot = {
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````ts
import type { ProcessMonitorSnapshot } from './types';

const MB = 1024 * 1024;
const GB = 1024 * MB;

export const initialProcessMonitorSnapshot: ProcessMonitorSnapshot = {
  updatedAt: '10:24:33',
  metrics: {
    totalProcesses: 128,
    totalUsers: 12,
    cpuUsage: 23.7,
    memoryUsedBytes: 4.2 * GB,
    memoryTotalBytes: 15.6 * GB,
    loadAverage: [0.42, 0.38, 0.35],
    activeAlerts: 3,
    uptime: '5d 14h 22m',
    networkGbps: 1.3,
    diskMbps: 248,
  },
  users: [
    { id: 'root', name: 'root', cpu: 8.6, memoryBytes: 1.2 * GB, processCount: 32, status: 'active', role: 'root' },
    { id: 'john', name: 'john', cpu: 5.7, memoryBytes: 864.2 * MB, processCount: 18, status: 'active', role: 'normal' },
    { id: 'jane', name: 'jane', cpu: 3.2, memoryBytes: 512.8 * MB, processCount: 12, status: 'active', role: 'normal' },
    { id: 'mike', name: 'mike', cpu: 2.1, memoryBytes: 310.7 * MB, processCount: 9, status: 'idle', role: 'normal' },
    { id: 'alex', name: 'alex', cpu: 1.6, memoryBytes: 198.6 * MB, processCount: 6, status: 'active', role: 'normal' },
    { id: 'docker', name: 'docker', cpu: 2.1, memoryBytes: 345.6 * MB, processCount: 6, status: 'active', role: 'service' },
    { id: 'nginx', name: 'nginx', cpu: 4.1, memoryBytes: 512.3 * MB, processCount: 6, status: 'active', role: 'service' },
    { id: 'postgres', name: 'postgres', cpu: 3.0, memoryBytes: 482.1 * MB, processCount: 15, status: 'active', role: 'service' },
    { id: 'redis', name: 'redis', cpu: 0.8, memoryBytes: 128.4 * MB, processCount: 2, status: 'active', role: 'service' },
  ],
  processes: [
    { id: 'systemd', pid: 1, parentId: null, name: 'systemd (init)', userId: 'root', cpu: 0.3, memoryBytes: 55.2 * MB, status: 'running', type: 'system' },
    { id: 'sshd', pid: 742, parentId: 'systemd', name: 'sshd', userId: 'root', cpu: 0.1, memoryBytes: 12.4 * MB, status: 'running', type: 'service' },
    { id: 'root-bash', pid: 1123, parentId: 'sshd', name: 'bash', userId: 'root', cpu: 0.2, memoryBytes: 8.1 * MB, status: 'running', type: 'shell' },
    { id: 'node-server', pid: 1156, parentId: 'root-bash', name: 'node server.js', userId: 'root', cpu: 5.6, memoryBytes: 128.7 * MB, status: 'running', type: 'node' },
    { id: 'worker-1', pid: 1161, parentId: 'node-server', name: 'worker.js', userId: 'root', cpu: 2.1, memoryBytes: 45.3 * MB, status: 'running', type: 'node' },
    { id: 'worker-2', pid: 1162, parentId: 'node-server', name: 'worker.js', userId: 'root', cpu: 1.8, memoryBytes: 44.8 * MB, status: 'running', type: 'node' },
    { id: 'database-js', pid: 1163, parentId: 'node-server', name: 'database.js', userId: 'root', cpu: 1.2, memoryBytes: 38.9 * MB, status: 'running', type: 'node' },
    { id: 'cache-js', pid: 1164, parentId: 'node-server', name: 'cache.js', userId: 'root', cpu: 0.8, memoryBytes: 24.6 * MB, status: 'running', type: 'node' },

    { id: 'nginx-master', pid: 888, parentId: 'systemd', name: 'nginx', userId: 'nginx', cpu: 1.3, memoryBytes: 33.6 * MB, status: 'running', type: 'nginx' },
    { id: 'nginx-worker-1', pid: 889, parentId: 'nginx-master', name: 'nginx: worker process', userId: 'nginx', cpu: 0.6, memoryBytes: 15.8 * MB, status: 'running', type: 'nginx' },
    { id: 'nginx-worker-2', pid: 890, parentId: 'nginx-master', name: 'nginx: worker process', userId: 'nginx', cpu: 0.7, memoryBytes: 16.1 * MB, status: 'running', type: 'nginx' },

    { id: 'postgres-master', pid: 994, parentId: 'systemd', name: 'postgres', userId: 'postgres', cpu: 2.4, memoryBytes: 98.7 * MB, status: 'running', type: 'database' },
    { id: 'postgres-writer', pid: 995, parentId: 'postgres-master', name: 'postgres: writer', userId: 'postgres', cpu: 1.1, memoryBytes: 32.2 * MB, status: 'running', type: 'database' },
    { id: 'postgres-wal', pid: 996, parentId: 'postgres-master', name: 'postgres: wal writer', userId: 'postgres', cpu: 0.4, memoryBytes: 12.1 * MB, status: 'sleeping', type: 'database' },
    { id: 'postgres-bg', pid: 997, parentId: 'postgres-master', name: 'postgres: bgworker', userId: 'postgres', cpu: 0.3, memoryBytes: 11.8 * MB, status: 'sleeping', type: 'database' },

    { id: 'docker-service', pid: 1021, parentId: 'systemd', name: 'docker', userId: 'docker', cpu: 1.6, memoryBytes: 75.4 * MB, status: 'running', type: 'docker' },
    { id: 'containerd', pid: 1022, parentId: 'docker-service', name: 'containerd', userId: 'docker', cpu: 0.6, memoryBytes: 22.8 * MB, status: 'running', type: 'docker' },
    { id: 'docker-proxy', pid: 1023, parentId: 'docker-service', name: 'docker-proxy', userId: 'docker', cpu: 1.0, memoryBytes: 18.2 * MB, status: 'running', type: 'docker' },
    { id: 'redis-server', pid: 1033, parentId: 'systemd', name: 'redis-server', userId: 'redis', cpu: 0.5, memoryBytes: 19.1 * MB, status: 'running', type: 'database' },
    { id: 'cron', pid: 1044, parentId: 'systemd', name: 'cron', userId: 'root', cpu: 0.1, memoryBytes: 2.1 * MB, status: 'running', type: 'service' },

    { id: 'john-shell', pid: 2201, parentId: null, name: 'terminal', userId: 'john', cpu: 0.7, memoryBytes: 110.2 * MB, status: 'running', type: 'shell' },
    { id: 'john-node', pid: 2205, parentId: 'john-shell', name: 'node dev-server.js', userId: 'john', cpu: 2.3, memoryBytes: 256.4 * MB, status: 'running', type: 'node' },
    { id: 'john-code', pid: 2210, parentId: null, name: 'code', userId: 'john', cpu: 1.4, memoryBytes: 289.6 * MB, status: 'running', type: 'editor' },
    { id: 'john-chrome', pid: 2218, parentId: null, name: 'chrome', userId: 'john', cpu: 1.5, memoryBytes: 320.2 * MB, status: 'running', type: 'browser' },
    { id: 'john-python', pid: 2222, parentId: 'john-shell', name: 'python worker.py', userId: 'john', cpu: 1.1, memoryBytes: 200.3 * MB, status: 'sleeping', type: 'python' },

    { id: 'jane-chrome', pid: 3201, parentId: null, name: 'chrome', userId: 'jane', cpu: 2.4, memoryBytes: 324.5 * MB, status: 'running', type: 'browser' },
    { id: 'jane-slack', pid: 3205, parentId: null, name: 'slack', userId: 'jane', cpu: 0.4, memoryBytes: 89.1 * MB, status: 'running', type: 'other' },
    { id: 'jane-code', pid: 3210, parentId: null, name: 'code', userId: 'jane', cpu: 0.4, memoryBytes: 99.2 * MB, status: 'sleeping', type: 'editor' },

    { id: 'mike-terminal', pid: 4201, parentId: null, name: 'terminal', userId: 'mike', cpu: 0.7, memoryBytes: 110.2 * MB, status: 'running', type: 'shell' },
    { id: 'mike-python', pid: 4205, parentId: 'mike-terminal', name: 'python', userId: 'mike', cpu: 1.1, memoryBytes: 200.3 * MB, status: 'running', type: 'python' },
    { id: 'mike-vim', pid: 4207, parentId: 'mike-terminal', name: 'vim', userId: 'mike', cpu: 0.3, memoryBytes: 45.2 * MB, status: 'sleeping', type: 'editor' },

    { id: 'alex-git', pid: 5202, parentId: null, name: 'git', userId: 'alex', cpu: 0.6, memoryBytes: 78.6 * MB, status: 'sleeping', type: 'shell' },
    { id: 'alex-node', pid: 5204, parentId: null, name: 'node', userId: 'alex', cpu: 1.0, memoryBytes: 120.0 * MB, status: 'running', type: 'node' },
  ],
  logs: [
    { id: 'log-1', timestamp: '10:24:31.123', processId: 'node-server', processName: 'node server.js', pid: 1156, userId: 'root', level: 'INFO', message: 'Server started on port 3000' },
    { id: 'log-2', timestamp: '10:24:31.125', processId: 'worker-1', processName: 'worker.js', pid: 1161, userId: 'root', level: 'INFO', message: 'Worker started with id 1' },
    { id: 'log-3', timestamp: '10:24:31.126', processId: 'database-js', processName: 'database.js', pid: 1163, userId: 'root', level: 'INFO', message: 'Connected to database' },
    { id: 'log-4', timestamp: '10:24:31.200', processId: 'nginx-worker-1', processName: 'nginx: worker process', pid: 889, userId: 'nginx', level: 'INFO', message: 'Accepted connection from 192.168.1.10' },
    { id: 'log-5', timestamp: '10:24:31.245', processId: 'node-server', processName: 'node server.js', pid: 1156, userId: 'root', level: 'INFO', message: 'GET /api/users 200 15ms' },
    { id: 'log-6', timestamp: '10:24:31.310', processId: 'worker-2', processName: 'worker.js', pid: 1162, userId: 'root', level: 'DEBUG', message: 'Processing job 42' },
    { id: 'log-7', timestamp: '10:24:31.410', processId: 'database-js', processName: 'database.js', pid: 1163, userId: 'root', level: 'INFO', message: 'Query executed in 12ms' },
    { id: 'log-8', timestamp: '10:24:31.512', processId: 'worker-1', processName: 'worker.js', pid: 1161, userId: 'root', level: 'WARN', message: 'Job queue size high (85)' },
    { id: 'log-9', timestamp: '10:24:31.789', processId: 'node-server', processName: 'node server.js', pid: 1156, userId: 'root', level: 'ERROR', message: 'Unhandled exception: User not found' },
    { id: 'log-10', timestamp: '10:24:31.790', processId: 'worker-2', processName: 'worker.js', pid: 1162, userId: 'root', level: 'ERROR', message: 'Job 42 failed: Timeout exceeded' },
    { id: 'log-11', timestamp: '10:24:31.900', processId: 'postgres-writer', processName: 'postgres: writer', pid: 995, userId: 'postgres', level: 'INFO', message: 'WAL segment written' },
    { id: 'log-12', timestamp: '10:24:32.001', processId: 'postgres-bg', processName: 'postgres: bgworker', pid: 997, userId: 'postgres', level: 'DEBUG', message: 'Background worker heartbeat' },
    { id: 'log-13', timestamp: '10:24:32.215', processId: 'nginx-worker-1', processName: 'nginx: worker process', pid: 889, userId: 'nginx', level: 'INFO', message: 'GET /favicon.ico 404 2ms' },
    { id: 'log-14', timestamp: '10:24:32.410', processId: 'cache-js', processName: 'cache.js', pid: 1164, userId: 'root', level: 'INFO', message: 'Cache hit for key: user:123' },
    { id: 'log-15', timestamp: '10:24:32.612', processId: 'worker-1', processName: 'worker.js', pid: 1161, userId: 'root', level: 'INFO', message: 'Job 43 completed in 120ms' },
    { id: 'log-16', timestamp: '10:24:32.890', processId: 'database-js', processName: 'database.js', pid: 1163, userId: 'root', level: 'ERROR', message: 'Connection pool exhausted' },
    { id: 'log-17', timestamp: '10:24:33.001', processId: 'node-server', processName: 'node server.js', pid: 1156, userId: 'root', level: 'WARN', message: 'High response time detected: 502ms' },
    { id: 'log-18', timestamp: '10:24:33.123', processId: 'redis-server', processName: 'redis-server', pid: 1033, userId: 'redis', level: 'INFO', message: 'Client connected: 127.0.0.1:54321' },
    { id: 'log-19', timestamp: '10:24:33.456', processId: 'docker-service', processName: 'docker', pid: 1021, userId: 'docker', level: 'INFO', message: 'Container nginx started' },
    { id: 'log-20', timestamp: '10:24:33.789', processId: 'cron', processName: 'cron', pid: 1044, userId: 'root', level: 'INFO', message: 'Scheduled job completed' },
    { id: 'log-21', timestamp: '10:24:34.004', processId: 'john-node', processName: 'node dev-server.js', pid: 2205, userId: 'john', level: 'INFO', message: 'Vite dev server hot update applied' },
    { id: 'log-22', timestamp: '10:24:34.109', processId: 'john-python', processName: 'python worker.py', pid: 2222, userId: 'john', level: 'DEBUG', message: 'Background embedding batch queued' },
    { id: 'log-23', timestamp: '10:24:34.333', processId: 'jane-chrome', processName: 'chrome', pid: 3201, userId: 'jane', level: 'WARN', message: 'Renderer memory pressure warning' },
    { id: 'log-24', timestamp: '10:24:34.618', processId: 'mike-python', processName: 'python', pid: 4205, userId: 'mike', level: 'INFO', message: 'Notebook kernel started' },
  ],
  alerts: [
    { id: 'alert-1', title: 'Connection pool exhausted', message: 'database.js reported no available connections in the selected scope.', level: 'ERROR' },
    { id: 'alert-2', title: 'High response time detected', message: 'node server.js exceeded 500ms on the last collection window.', level: 'WARN' },
    { id: 'alert-3', title: 'Job queue size high', message: 'worker.js reported 85 queued jobs awaiting dispatch.', level: 'WARN' },
  ],
};
````````

## `src/app/process-monitoring/README.md`

- Category: process monitoring.
- Imports: import { processMonitorRealtime } from './src/app/process-monitoring';
- Exports: No named exports detected; inspect the default/component body.
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````md
# Process monitoring module

This folder contains the reusable process-monitoring implementation used by:

- `/admin-dashboard` for the root/admin user view.
- `/process-monitoring` for the normal user view.

## Realtime subscription API

The UI renders from `processMonitorRealtime`, a small external-store API. Any service, websocket handler, SSE callback, polling function, or mock can push data into it.

```ts
import { processMonitorRealtime } from './src/app/process-monitoring';

processMonitorRealtime.upsertProcesses([
  {
    id: 'api-worker-1',
    pid: 8844,
    parentId: null,
    name: 'api-worker',
    userId: 'john',
    cpu: 12.4,
    memoryBytes: 180 * 1024 * 1024,
    status: 'running',
    type: 'node',
  },
]);

processMonitorRealtime.appendLogs([
  {
    id: crypto.randomUUID(),
    timestamp: new Date().toLocaleTimeString(),
    processName: 'api-worker',
    pid: 8844,
    userId: 'john',
    level: 'INFO',
    message: 'Realtime process sample received',
  },
]);
```

The same API is also exposed on `window.processMonitorRealtime` for quick browser-console testing.
````````

## `src/app/process-monitoring/realtimeProcessStore.ts`

- Category: process monitoring.
- Imports: import { initialProcessMonitorSnapshot } from './mockProcessMonitorData';, import type {, import { createTimestamp } from './formatters';
- Exports: export type ProcessMonitorListener = () => void;, export type ProcessMonitorDataSource = (api: ProcessMonitorRealtimeStore) => void | (() => void);, export class ProcessMonitorRealtimeStore {, export const processMonitorRealtime = new ProcessMonitorRealtimeStore();
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````ts
import { initialProcessMonitorSnapshot } from './mockProcessMonitorData';
import type {
  ProcessMonitorMetrics,
  ProcessMonitorPatch,
  ProcessMonitorSnapshot,
  ProcessNode,
  RealtimeLogEntry,
  UserMetric,
} from './types';
import { createTimestamp } from './formatters';

export type ProcessMonitorListener = () => void;
export type ProcessMonitorDataSource = (api: ProcessMonitorRealtimeStore) => void | (() => void);

function cloneSnapshot(snapshot: ProcessMonitorSnapshot): ProcessMonitorSnapshot {
  return {
    ...snapshot,
    metrics: { ...snapshot.metrics, loadAverage: [...snapshot.metrics.loadAverage] as [number, number, number] },
    users: snapshot.users.map((user) => ({ ...user })),
    processes: snapshot.processes.map((process) => ({ ...process })),
    logs: snapshot.logs.map((log) => ({ ...log })),
    alerts: snapshot.alerts.map((alert) => ({ ...alert })),
  };
}

function mergeById<T extends { id: string }>(current: T[], updates: T[]): T[] {
  const next = new Map(current.map((item) => [item.id, item]));
  updates.forEach((item) => next.set(item.id, { ...next.get(item.id), ...item }));
  return Array.from(next.values());
}

export class ProcessMonitorRealtimeStore {
  private snapshot: ProcessMonitorSnapshot;
  private listeners = new Set<ProcessMonitorListener>();
  private teardownSource?: () => void;

  constructor(initialSnapshot: ProcessMonitorSnapshot = initialProcessMonitorSnapshot) {
    this.snapshot = cloneSnapshot(initialSnapshot);
  }

  subscribe = (listener: ProcessMonitorListener) => {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  };

  getSnapshot = () => this.snapshot;

  getServerSnapshot = () => this.snapshot;

  replaceSnapshot = (nextSnapshot: ProcessMonitorSnapshot) => {
    this.snapshot = cloneSnapshot({ ...nextSnapshot, updatedAt: nextSnapshot.updatedAt || createTimestamp() });
    this.notify();
  };

  patchSnapshot = (patch: ProcessMonitorPatch) => {
    this.snapshot = {
      ...this.snapshot,
      ...patch,
      metrics: patch.metrics ? { ...this.snapshot.metrics, ...patch.metrics } : this.snapshot.metrics,
      users: patch.users ? patch.users.map((user) => ({ ...user })) : this.snapshot.users,
      processes: patch.processes ? patch.processes.map((process) => ({ ...process })) : this.snapshot.processes,
      logs: patch.logs ? patch.logs.map((log) => ({ ...log })) : this.snapshot.logs,
      alerts: patch.alerts ? patch.alerts.map((alert) => ({ ...alert })) : this.snapshot.alerts,
      updatedAt: patch.updatedAt || createTimestamp(),
    };
    this.notify();
  };

  setMetrics = (metrics: Partial<ProcessMonitorMetrics>) => {
    this.patchSnapshot({ metrics });
  };

  upsertUsers = (users: UserMetric[]) => {
    this.snapshot = {
      ...this.snapshot,
      users: mergeById(this.snapshot.users, users),
      updatedAt: createTimestamp(),
    };
    this.notify();
  };

  upsertProcesses = (processes: ProcessNode[]) => {
    this.snapshot = {
      ...this.snapshot,
      processes: mergeById(this.snapshot.processes, processes),
      updatedAt: createTimestamp(),
    };
    this.notify();
  };

  removeProcesses = (processIds: string[]) => {
    const removeSet = new Set(processIds);
    this.snapshot = {
      ...this.snapshot,
      processes: this.snapshot.processes.filter((process) => !removeSet.has(process.id)),
      updatedAt: createTimestamp(),
    };
    this.notify();
  };

  appendLogs = (logs: RealtimeLogEntry[], cap = 5000) => {
    this.snapshot = {
      ...this.snapshot,
      logs: [...logs.map((log) => ({ ...log })), ...this.snapshot.logs].slice(0, cap),
      updatedAt: createTimestamp(),
    };
    this.notify();
  };

  clearLogs = () => {
    this.snapshot = {
      ...this.snapshot,
      logs: [],
      updatedAt: createTimestamp(),
    };
    this.notify();
  };

  connectSource = (source: ProcessMonitorDataSource) => {
    this.teardownSource?.();
    const maybeTeardown = source(this);
    this.teardownSource = typeof maybeTeardown === 'function' ? maybeTeardown : undefined;
  };

  disconnectSource = () => {
    this.teardownSource?.();
    this.teardownSource = undefined;
  };

  private notify() {
    this.listeners.forEach((listener) => listener());
  }
}

export const processMonitorRealtime = new ProcessMonitorRealtimeStore();

if (typeof window !== 'undefined') {
  window.processMonitorRealtime = processMonitorRealtime;
}

declare global {
  interface Window {
    processMonitorRealtime?: ProcessMonitorRealtimeStore;
  }
}
````````

## `src/app/process-monitoring/types.ts`

- Category: process monitoring.
- Imports: No direct imports in this file.
- Exports: export type ProcessAccessMode = 'root' | 'normal';, export type UserStatus = 'active' | 'idle' | 'disconnected' | 'system';, export type ProcessStatus = 'running' | 'sleeping' | 'stopped' | 'zombie';, export type LogLevel = 'INFO' | 'DEBUG' | 'WARN' | 'ERROR';, export interface UserMetric {, export interface ProcessNode {, export interface RealtimeLogEntry {, export interface ProcessMonitorMetrics {, export interface MonitorAlert {, export interface ProcessMonitorSnapshot {
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````ts
export type ProcessAccessMode = 'root' | 'normal';

export type UserStatus = 'active' | 'idle' | 'disconnected' | 'system';
export type ProcessStatus = 'running' | 'sleeping' | 'stopped' | 'zombie';
export type LogLevel = 'INFO' | 'DEBUG' | 'WARN' | 'ERROR';

export interface UserMetric {
  id: string;
  name: string;
  cpu: number;
  memoryBytes: number;
  processCount: number;
  status: UserStatus;
  role?: 'root' | 'normal' | 'service' | 'system';
}

export interface ProcessNode {
  id: string;
  pid: number;
  parentId: string | null;
  name: string;
  command?: string;
  userId: string;
  cpu: number;
  memoryBytes: number;
  status: ProcessStatus;
  type?: 'system' | 'shell' | 'node' | 'database' | 'nginx' | 'docker' | 'python' | 'browser' | 'editor' | 'service' | 'other';
}

export interface RealtimeLogEntry {
  id: string;
  timestamp: string;
  processId?: string;
  processName: string;
  pid?: number;
  userId?: string;
  level: LogLevel;
  message: string;
}

export interface ProcessMonitorMetrics {
  totalProcesses: number;
  totalUsers: number;
  cpuUsage: number;
  memoryUsedBytes: number;
  memoryTotalBytes: number;
  loadAverage: [number, number, number];
  activeAlerts: number;
  uptime: string;
  networkGbps: number;
  diskMbps: number;
}

export interface MonitorAlert {
  id: string;
  title: string;
  message: string;
  level: Exclude<LogLevel, 'INFO' | 'DEBUG'>;
}

export interface ProcessMonitorSnapshot {
  updatedAt: string;
  metrics: ProcessMonitorMetrics;
  users: UserMetric[];
  processes: ProcessNode[];
  logs: RealtimeLogEntry[];
  alerts: MonitorAlert[];
}

export interface ProcessMonitorFilters {
  logLevels: Record<LogLevel, boolean>;
  processStatuses: Record<ProcessStatus, boolean>;
  minCpu: number;
}

export interface MonitorColumnState {
  users: {
    user: boolean;
    cpu: boolean;
    memory: boolean;
    processes: boolean;
    status: boolean;
  };
  processes: {
    process: boolean;
    pid: boolean;
    cpu: boolean;
    memory: boolean;
    status: boolean;
  };
  logs: {
    time: boolean;
    process: boolean;
    pid: boolean;
    level: boolean;
    message: boolean;
  };
}

export interface MonitorSettingsState {
  compactRows: boolean;
  showSparklines: boolean;
  highContrast: boolean;
  reduceMotion: boolean;
  refreshIntervalMs: number;
  logLineCap: number;
}

export type ProcessMonitorPatch = Partial<Omit<ProcessMonitorSnapshot, 'metrics'>> & {
  metrics?: Partial<ProcessMonitorMetrics>;
};
````````

## `src/app/process-monitoring/views/ProcessMonitorView.tsx`

- Category: process monitoring.
- Imports: import { useMemo, useRef, useState } from 'react';, import { MonitorHeader } from '../components/MonitorHeader';, import { MetricsGrid } from '../components/MetricsGrid';, import { UserTreePanel } from '../components/UserTreePanel';, import { ProcessTreePanel } from '../components/ProcessTreePanel';, import { RealtimeLogsPanel } from '../components/RealtimeLogsPanel';, import { MonitorFooter } from '../components/MonitorFooter';, import { MonitorPopovers, createDefaultMonitorColumns, createDefaultMonitorFilters } from '../components/MonitorPopovers';, import { processMonitorRealtime } from '../realtimeProcessStore';, import { useDemoRealtimeFeed, useProcessMonitorSubscription } from '../hooks/useProcessMonitorSubscription';
- Exports: export function ProcessMonitorView({ accessMode, title, normalUserId = 'john' }: ProcessMonitorViewProps) {
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useMemo, useRef, useState } from 'react';
import { MonitorHeader } from '../components/MonitorHeader';
import { MetricsGrid } from '../components/MetricsGrid';
import { UserTreePanel } from '../components/UserTreePanel';
import { ProcessTreePanel } from '../components/ProcessTreePanel';
import { RealtimeLogsPanel } from '../components/RealtimeLogsPanel';
import { MonitorFooter } from '../components/MonitorFooter';
import { MonitorPopovers, createDefaultMonitorColumns, createDefaultMonitorFilters } from '../components/MonitorPopovers';
import { processMonitorRealtime } from '../realtimeProcessStore';
import { useDemoRealtimeFeed, useProcessMonitorSubscription } from '../hooks/useProcessMonitorSubscription';
import { useDarkMode } from '../../contexts/DarkModeContext';
import { useAccentColor } from '../../contexts/AccentColorContext';
import type { MonitorSettingsState, ProcessAccessMode } from '../types';

interface ProcessMonitorViewProps {
  accessMode: ProcessAccessMode;
  title: string;
  normalUserId?: string;
}

const defaultSettings: MonitorSettingsState = {
  compactRows: false,
  showSparklines: true,
  highContrast: false,
  reduceMotion: false,
  refreshIntervalMs: 1400,
  logLineCap: 5000,
};

export function ProcessMonitorView({ accessMode, title, normalUserId = 'john' }: ProcessMonitorViewProps) {
  const snapshot = useProcessMonitorSubscription();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const { accentColor, setAccentColor } = useAccentColor();

  const [isLive, setIsLive] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(accessMode === 'root' ? 'all' : normalUserId);
  const [userSearch, setUserSearch] = useState('');
  const [processSearch, setProcessSearch] = useState('');
  const [logSearch, setLogSearch] = useState('');
  const [filters, setFilters] = useState(createDefaultMonitorFilters());
  const [columns, setColumns] = useState(createDefaultMonitorColumns());
  const [settings, setSettings] = useState<MonitorSettingsState>(defaultSettings);
  const [timeRange, setTimeRange] = useState('Last 5 minutes');
  const [expandedUserGroups, setExpandedUserGroups] = useState(new Set(['logged-in', 'services']));
  const [expandedProcesses, setExpandedProcesses] = useState(new Set(['systemd', 'sshd', 'root-bash', 'node-server', 'nginx-master', 'postgres-master', 'docker-service', 'john-shell']));
  const [openPopover, setOpenPopover] = useState({ filter: false, columns: false, alerts: false, settings: false, timeRange: false });

  const filterRef = useRef<HTMLButtonElement>(null);
  const columnsRef = useRef<HTMLButtonElement>(null);
  const alertsRef = useRef<HTMLButtonElement>(null);
  const settingsRef = useRef<HTMLButtonElement>(null);
  const timeRangeRef = useRef<HTMLButtonElement>(null);

  useDemoRealtimeFeed(isLive, settings.logLineCap, settings.refreshIntervalMs);

  const visibleUsers = useMemo(() => {
    if (accessMode === 'normal') {
      return snapshot.users.filter((user) => user.id === normalUserId);
    }
    return snapshot.users;
  }, [accessMode, normalUserId, snapshot.users]);

  const effectiveSelectedUserId = accessMode === 'normal' ? normalUserId : selectedUserId;

  const setSinglePopover = (name: keyof typeof openPopover, value: boolean) => {
    setOpenPopover({ filter: false, columns: false, alerts: false, settings: false, timeRange: false, [name]: value });
  };

  const toggleUserGroup = (groupId: string) => {
    setExpandedUserGroups((previous) => {
      const next = new Set(previous);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  };

  const toggleProcess = (processId: string) => {
    setExpandedProcesses((previous) => {
      const next = new Set(previous);
      if (next.has(processId)) next.delete(processId);
      else next.add(processId);
      return next;
    });
  };

  const rootProcessesForScope = snapshot.processes.filter((process) => effectiveSelectedUserId === 'all' || process.userId === effectiveSelectedUserId);
  const scopedProcessIds = rootProcessesForScope.map((process) => process.id);

  const shellClassName = [
    'relative flex h-[calc(100vh-49px)] min-h-[760px] flex-col overflow-hidden bg-gradient-to-b from-background to-muted/70 text-foreground dark:from-[#050913] dark:to-[#0a1018]',
    settings.highContrast ? 'contrast-125' : '',
    settings.reduceMotion ? '[&_*]:!animate-none [&_*]:!transition-none' : '',
  ].join(' ');

  return (
    <div className={shellClassName}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <MonitorHeader
        title={title}
        accessMode={accessMode}
        isLive={isLive}
        isDarkMode={isDarkMode}
        timeRange={timeRange}
        alertCount={snapshot.alerts.length}
        onToggleLive={() => setIsLive((value) => !value)}
        onToggleTheme={toggleDarkMode}
        onOpenFilter={() => setSinglePopover('filter', !openPopover.filter)}
        onOpenColumns={() => setSinglePopover('columns', !openPopover.columns)}
        onOpenAlerts={() => setSinglePopover('alerts', !openPopover.alerts)}
        onOpenSettings={() => setSinglePopover('settings', !openPopover.settings)}
        onOpenTimeRange={() => setSinglePopover('timeRange', !openPopover.timeRange)}
        refs={{ filter: filterRef, columns: columnsRef, alerts: alertsRef, settings: settingsRef, timeRange: timeRangeRef }}
      />

      <main className="relative z-10 flex flex-1 min-h-0 flex-col gap-3 overflow-auto p-3 md:p-4">
        <MetricsGrid metrics={snapshot.metrics} showSparklines={settings.showSparklines} />

        <section className="grid flex-1 min-h-[560px] grid-cols-1 gap-3 xl:grid-cols-[minmax(310px,0.84fr)_minmax(430px,1.08fr)_minmax(520px,1.42fr)]">
          <UserTreePanel
            users={visibleUsers}
            accessMode={accessMode}
            selectedUserId={effectiveSelectedUserId}
            search={userSearch}
            columns={columns.users}
            compactRows={settings.compactRows}
            expandedGroups={expandedUserGroups}
            onSearchChange={setUserSearch}
            onSelectUser={(userId) => setSelectedUserId(userId)}
            onToggleGroup={toggleUserGroup}
            onExpandAll={() => setExpandedUserGroups(new Set(['logged-in', 'services']))}
            onCollapseAll={() => setExpandedUserGroups(new Set())}
          />

          <ProcessTreePanel
            processes={snapshot.processes}
            users={snapshot.users}
            selectedUserId={effectiveSelectedUserId}
            search={processSearch}
            filters={filters}
            columns={columns.processes}
            expandedProcesses={expandedProcesses}
            compactRows={settings.compactRows}
            onSearchChange={setProcessSearch}
            onToggleProcess={toggleProcess}
            onExpandAll={() => setExpandedProcesses(new Set(scopedProcessIds))}
            onCollapseAll={() => setExpandedProcesses(new Set())}
          />

          <RealtimeLogsPanel
            logs={snapshot.logs}
            users={snapshot.users}
            selectedUserId={effectiveSelectedUserId}
            search={logSearch}
            filters={filters}
            columns={columns.logs}
            isLive={isLive}
            compactRows={settings.compactRows}
            logLineCap={settings.logLineCap}
            onSearchChange={setLogSearch}
            onToggleLive={() => setIsLive((value) => !value)}
            onClearLogs={() => processMonitorRealtime.clearLogs()}
          />
        </section>
      </main>

      <MonitorFooter metrics={snapshot.metrics} updatedAt={snapshot.updatedAt} isLive={isLive} logLineCap={settings.logLineCap} />

      <MonitorPopovers
        refs={{ filter: filterRef, columns: columnsRef, alerts: alertsRef, settings: settingsRef, timeRange: timeRangeRef }}
        open={openPopover}
        onClose={(name) => setOpenPopover((previous) => ({ ...previous, [name]: false }))}
        filters={filters}
        setFilters={setFilters}
        columns={columns}
        setColumns={setColumns}
        settings={settings}
        setSettings={setSettings}
        alerts={snapshot.alerts}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        accentColor={accentColor}
        setAccentColor={setAccentColor}
      />
    </div>
  );
}
````````
