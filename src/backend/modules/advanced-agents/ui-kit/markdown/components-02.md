# UI Kit Components Source Context

This file exports 35 source file(s). Each section includes reuse guidance and an exact snippet from the uploaded UI Kit.

## `src/app/components/LogViewer.tsx`

- Category: component.
- Imports: import { Terminal } from "lucide-react";
- Exports: export function LogViewer({ logs, title = "Logs" }: LogViewerProps) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { Terminal } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

interface LogViewerProps {
  logs: LogEntry[];
  title?: string;
}

export function LogViewer({ logs, title = "Logs" }: LogViewerProps) {
  const getLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'success': return 'text-green-400';
      default: return 'text-blue-400';
    }
  };

  const getLevelBadge = (level: LogEntry['level']) => {
    switch (level) {
      case 'error': return 'bg-red-500/20 text-red-400';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400';
      case 'success': return 'bg-green-500/20 text-green-400';
      default: return 'bg-blue-500/20 text-blue-400';
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a0a0a] border-l border-[#2a2a2a]">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#2a2a2a] bg-[#1a1a1a]">
        <Terminal className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-300">{title}</span>
      </div>

      {/* Log Content */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-2">
        {logs.map((log) => (
          <div key={log.id} className="flex items-start gap-3">
            <span className="text-gray-600 flex-shrink-0 w-16">{log.timestamp}</span>
            <span className={`px-2 py-0.5 rounded text-xs flex-shrink-0 ${getLevelBadge(log.level)}`}>
              {log.level.toUpperCase()}
            </span>
            <span className="text-gray-400 flex-1">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
````````

## `src/app/components/LogViewerTable.tsx`

- Category: component.
- Imports: import { Terminal } from "lucide-react";
- Exports: export function LogViewerTable({ logs, title = "Logs" }: LogViewerTableProps) {
- Reuse guidance: Use this for queryable records, database viewers, process rows, and entity management lists.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { Terminal } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

interface LogViewerTableProps {
  logs: LogEntry[];
  title?: string;
}

export function LogViewerTable({ logs, title = "Logs" }: LogViewerTableProps) {
  const getLevelBadge = (level: LogEntry['level']) => {
    switch (level) {
      case 'error': return 'bg-red-500/20 text-red-400 dark:bg-red-500/20 dark:text-red-400';
      case 'warning': return 'bg-yellow-500/20 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400';
      case 'success': return 'bg-green-500/20 text-green-600 dark:bg-green-500/20 dark:text-green-400';
      default: return 'bg-blue-500/20 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#0a0a0a] border-l border-border dark:border-[#2a2a2a]">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border dark:border-[#2a2a2a] bg-secondary/30 dark:bg-[#1a1a1a]">
        <Terminal className="w-4 h-4 text-muted-foreground dark:text-gray-500" />
        <span className="text-sm font-medium text-foreground dark:text-gray-300">{title}</span>
      </div>

      {/* Log Table */}
      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-xs">
          <thead className="sticky top-0 bg-secondary/50 dark:bg-[#1a1a1a] border-b border-border dark:border-[#2a2a2a]">
            <tr>
              <th className="px-3 py-2 text-left font-medium text-muted-foreground dark:text-gray-500 w-20">Time</th>
              <th className="px-3 py-2 text-left font-medium text-muted-foreground dark:text-gray-500 w-24">Level</th>
              <th className="px-3 py-2 text-left font-medium text-muted-foreground dark:text-gray-500">Message</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, idx) => (
              <tr
                key={log.id}
                className={`border-b border-border dark:border-[#1a1a1a] ${
                  idx % 2 === 0 ? 'bg-white dark:bg-[#0a0a0a]' : 'bg-secondary/20 dark:bg-[#0f0f0f]'
                }`}
              >
                <td className="px-3 py-2 text-muted-foreground dark:text-gray-600 font-mono">
                  {log.timestamp}
                </td>
                <td className="px-3 py-2">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${getLevelBadge(log.level)}`}>
                    {log.level.toUpperCase()}
                  </span>
                </td>
                <td className="px-3 py-2 text-foreground dark:text-gray-400">
                  {log.message}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
````````

## `src/app/components/Modal.tsx`

- Category: component.
- Imports: import { ReactNode, useEffect } from "react";, import { X } from "lucide-react";, import { Button } from "./Button";
- Exports: export interface ModalProps {, export function Modal({
- Reuse guidance: Use this for create/update/delete flows, confirmations, and risky operation approval gates.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { ReactNode, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "./Button";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showClose?: boolean;
  closeOnOverlay?: boolean;
  footer?: ReactNode;
}

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showClose = true,
  closeOnOverlay = true,
  footer,
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-[95vw] h-[95vh]',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50 animate-fadeIn"
        onClick={closeOnOverlay ? onClose : undefined}
      />

      {/* Modal Content */}
      <div className={`relative bg-white dark:bg-[#1a1a1a] shadow-2xl rounded-2xl ${sizeClasses[size]} w-full max-h-[90vh] flex flex-col animate-scaleIn`}>
        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            {title && <h2 className="text-xl font-semibold text-foreground dark:text-gray-200">{title}</h2>}
            {showClose && (
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded-lg transition-colors ml-auto"
              >
                <X className="w-5 h-5 text-foreground dark:text-gray-400" />
              </button>
            )}
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-2">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="px-6 pb-6 pt-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
````````

## `src/app/components/monitoring/AlertItem.tsx`

- Category: process monitoring.
- Imports: No direct imports in this file.
- Exports: export interface Alert {, export interface AlertItemProps {, export function AlertItem({ alert }: AlertItemProps) {
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
export interface Alert {
  id: string;
  title: string;
  message: string;
  level: 'INFO' | 'WARN' | 'ERROR';
}

export interface AlertItemProps {
  alert: Alert;
}

export function AlertItem({ alert }: AlertItemProps) {
  const levelStyles = {
    INFO: 'bg-blue-600/22 dark:bg-blue-600/22 text-blue-600 dark:text-[#6fb6ff] border-blue-600/22',
    WARN: 'bg-yellow-600/22 dark:bg-yellow-600/22 text-yellow-600 dark:text-[#ffd400] border-yellow-600/26',
    ERROR: 'bg-red-600/24 dark:bg-red-600/24 text-red-600 dark:text-[#ff7974] border-red-600/25'
  };

  return (
    <div className="px-4 py-3 bg-secondary/30 dark:bg-[#0f1721] border border-border dark:border-[#1f3349] rounded-lg">
      <div className="flex items-start justify-between gap-3 mb-2">
        <strong className="text-sm font-semibold text-foreground dark:text-white">{alert.title}</strong>
        <span className={`px-2 py-1 text-[11px] font-black font-mono tracking-tight border rounded ${levelStyles[alert.level]}`}>
          {alert.level}
        </span>
      </div>
      <span className="text-sm text-muted-foreground dark:text-gray-400">{alert.message}</span>
    </div>
  );
}
````````

## `src/app/components/monitoring/Legend.tsx`

- Category: process monitoring.
- Imports: import { StatusDot } from './StatusDot';
- Exports: export interface LegendItem {, export interface LegendProps {, export function Legend({ items, className = '' }: LegendProps) {
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { StatusDot } from './StatusDot';

export interface LegendItem {
  status: 'active' | 'running' | 'idle' | 'sleeping' | 'stopped' | 'restricted' | 'zombie' | 'system' | 'high';
  label: string;
}

export interface LegendProps {
  items: LegendItem[];
  className?: string;
}

export function Legend({ items, className = '' }: LegendProps) {
  return (
    <div className={`min-h-[44px] flex items-center gap-[22px] px-[18px] border-t border-gray-200 dark:border-[#7997bb]/14 bg-gray-50/80 dark:bg-[#08111d]/62 text-gray-700 dark:text-[#cbd5e1] text-xs flex-wrap ${className}`}>
      {items.map((item) => (
        <span key={item.status} className="inline-flex items-center gap-2 whitespace-nowrap">
          <StatusDot status={item.status} />
          {item.label}
        </span>
      ))}
    </div>
  );
}
````````

## `src/app/components/monitoring/LiveBadge.tsx`

- Category: process monitoring.
- Imports: No direct imports in this file.
- Exports: export interface LiveBadgeProps {, export function LiveBadge({ isLive, className = '' }: LiveBadgeProps) {
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
export interface LiveBadgeProps {
  isLive: boolean;
  className?: string;
}

export function LiveBadge({ isLive, className = '' }: LiveBadgeProps) {
  return (
    <span
      className={`inline-flex items-center justify-center px-2 py-1 text-[10px] font-black tracking-wider uppercase border rounded ${
        isLive
          ? 'bg-green-500/20 text-green-400 border-green-500/40 animate-pulse'
          : 'bg-gray-500/20 text-gray-400 border-gray-500/40'
      } ${className}`}
    >
      {isLive ? 'LIVE' : 'PAUSED'}
    </span>
  );
}
````````

## `src/app/components/monitoring/MetricCard.tsx`

- Category: process monitoring.
- Imports: import { SparklineChart, SparklineChartProps } from './SparklineChart';
- Exports: export interface MetricCardProps {, export function MetricCard({ title, value, unit, sparkline, className = '' }: MetricCardProps) {
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { SparklineChart, SparklineChartProps } from './SparklineChart';

export interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  sparkline?: Omit<SparklineChartProps, 'className' | 'width' | 'height'>;
  className?: string;
}

export function MetricCard({ title, value, unit, sparkline, className = '' }: MetricCardProps) {
  return (
    <article className={`relative min-h-[76px] grid grid-cols-[minmax(86px,auto)_1fr] items-center gap-[10px] overflow-hidden px-3 py-3 border border-border rounded-xl bg-card/95 shadow-sm dark:border-white/10 dark:bg-[#0f1f33]/80 dark:shadow-[0_4px_22px_rgba(0,0,0,0.30)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/[0.035] before:to-transparent before:-translate-x-full before:animate-[shimmer_8s_ease-in-out_infinite] before:pointer-events-none ${className}`}>
      <div>
        <div className="text-muted-foreground text-xs whitespace-nowrap mb-[7px]">{title}</div>
        <div className="inline-flex items-baseline gap-[5px] text-[clamp(18px,1.8vw,25px)] font-[820] tracking-tight text-foreground">
          <span>{value}</span>
          {unit && <small className="text-xs text-muted-foreground font-bold tracking-normal">{unit}</small>}
        </div>
      </div>
      {sparkline && <SparklineChart {...sparkline} className="justify-self-stretch w-full h-[42px]" />}
    </article>
  );
}
````````

## `src/app/components/monitoring/Panel.tsx`

- Category: process monitoring.
- Imports: import { ReactNode } from 'react';
- Exports: export interface PanelProps {, export function Panel({ header, children, footer, className = '' }: PanelProps) {
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { ReactNode } from 'react';

export interface PanelProps {
  header?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function Panel({ header, children, footer, className = '' }: PanelProps) {
  return (
    <section className={`min-h-0 overflow-hidden border border-border rounded-xl bg-card/95 shadow-sm dark:border-white/10 dark:bg-[#0b1726]/95 dark:shadow-[0_4px_22px_rgba(0,0,0,0.38)] flex flex-col min-w-0 ${className}`}>
      {header}
      <div className="flex-1 min-h-0 overflow-auto">
        {children}
      </div>
      {footer}
    </section>
  );
}
````````

## `src/app/components/monitoring/PanelHeader.tsx`

- Category: process monitoring.
- Imports: import { ReactNode } from 'react';
- Exports: export interface PanelHeaderProps {, export function PanelHeader({ title, subtitle, actions, className = '' }: PanelHeaderProps) {
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { ReactNode } from 'react';

export interface PanelHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

export function PanelHeader({ title, subtitle, actions, className = '' }: PanelHeaderProps) {
  return (
    <div className={`min-h-[58px] flex items-center gap-[10px] px-3 py-2 border-b border-border bg-muted/40 dark:border-white/10 dark:bg-white/5 ${className}`}>
      <div className="flex flex-col gap-[2px] min-w-max">
        <div className="text-sm font-[850] uppercase tracking-[0.02em] text-foreground">{title}</div>
        {subtitle && <div className="text-[11px] text-muted-foreground normal-case tracking-normal">{subtitle}</div>}
      </div>
      {actions && <div className="ml-auto flex items-center gap-2 min-w-0 flex-wrap justify-end">{actions}</div>}
    </div>
  );
}
````````

## `src/app/components/monitoring/Popover.tsx`

- Category: process monitoring.
- Imports: import { ReactNode, useEffect, useRef, useState } from 'react';, import { X } from 'lucide-react';
- Exports: export interface PopoverProps {, export function Popover({ isOpen, onClose, trigger, children, title, width = 360 }: PopoverProps) {, export interface PopoverSectionProps {, export function PopoverSection({ title, children, className = '' }: PopoverSectionProps) {, export interface CheckRowProps {, export function CheckRow({ label, checked, onChange, disabled = false, badge }: CheckRowProps) {, export interface RadioRowProps {, export function RadioRow({ label, checked, onChange, name }: RadioRowProps) {, export interface SettingRowProps {, export function SettingRow({ label, children }: SettingRowProps) {
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { ReactNode, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

export interface PopoverProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: HTMLElement | null;
  children: ReactNode;
  title?: string;
  width?: number;
}

export function Popover({ isOpen, onClose, trigger, children, title, width = 360 }: PopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0, maxHeight: 520 });

  useEffect(() => {
    if (!isOpen || !trigger) return;

    const updatePosition = () => {
      const rect = trigger.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const margin = 16;
      const gap = 8;
      const measuredHeight = popoverRef.current?.offsetHeight || 420;

      let left = rect.left;
      if (left + width > viewportWidth - margin) left = viewportWidth - width - margin;
      if (left < margin) left = margin;

      const spaceBelow = viewportHeight - rect.bottom - margin;
      const spaceAbove = rect.top - margin;
      const openAbove = measuredHeight > spaceBelow && spaceAbove > spaceBelow;
      const maxHeight = Math.max(240, openAbove ? spaceAbove - gap : spaceBelow - gap);
      let top = openAbove ? rect.top - Math.min(measuredHeight, maxHeight) - gap : rect.bottom + gap;
      if (top < margin) top = margin;

      setPosition({ top, left, maxHeight });
    };

    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen, trigger, width]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        trigger &&
        !trigger.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, trigger]);

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      className="fixed z-[9999] rounded-xl border border-border bg-background text-foreground shadow-2xl ring-1 ring-black/5 animate-slideDown dark:border-white/10 dark:bg-[#0f1721] dark:ring-white/10"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        width: `${Math.min(width, window.innerWidth - 32)}px`,
        maxHeight: `${position.maxHeight}px`,
        overflow: 'auto',
      }}
    >
      {title && (
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-background/95 px-5 py-4 backdrop-blur dark:border-white/10 dark:bg-[#0f1721]/95">
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="grid h-7 w-7 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label="Close popover"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

export interface PopoverSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function PopoverSection({ title, children, className = '' }: PopoverSectionProps) {
  return (
    <div className={`mb-5 last:mb-0 ${className}`}>
      {title && <div className="mb-3 text-xs font-bold uppercase tracking-wider text-muted-foreground">{title}</div>}
      <div className="space-y-2">{children}</div>
    </div>
  );
}

export interface CheckRowProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  badge?: string;
}

export function CheckRow({ label, checked, onChange, disabled = false, badge }: CheckRowProps) {
  return (
    <label className={`flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:bg-secondary'}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        disabled={disabled}
        className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
      />
      <span className="flex-1 text-sm text-foreground">{label}</span>
      {badge && <span className="rounded-full border border-border bg-secondary px-2 py-0.5 text-xs font-bold text-muted-foreground">{badge}</span>}
    </label>
  );
}

export interface RadioRowProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  name: string;
}

export function RadioRow({ label, checked, onChange, name }: RadioRowProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-secondary">
      <input type="radio" name={name} checked={checked} onChange={onChange} className="h-4 w-4 border-border text-primary focus:ring-primary" />
      <span className="flex-1 text-sm text-foreground">{label}</span>
    </label>
  );
}

export interface SettingRowProps {
  label: string;
  children: ReactNode;
}

export function SettingRow({ label, children }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg px-3 py-2.5">
      <span className="text-sm text-foreground">{label}</span>
      {children}
    </div>
  );
}
````````

## `src/app/components/monitoring/SearchInput.tsx`

- Category: process monitoring.
- Imports: import { Search } from 'lucide-react';
- Exports: export interface SearchInputProps {, export function SearchInput({ value = '', onChange, placeholder = 'Search...', className = '' }: SearchInputProps) {
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { Search } from 'lucide-react';

export interface SearchInputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ value = '', onChange, placeholder = 'Search...', className = '' }: SearchInputProps) {
  return (
    <label className={`h-9 min-w-[130px] w-full max-w-[220px] flex items-center gap-2 px-3 border border-border rounded-lg bg-background/80 transition-all hover:border-primary/45 hover:bg-primary/5 dark:border-white/10 dark:bg-white/5 dark:hover:bg-primary/10 ${className}`}>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full min-w-0 border-0 outline-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground"
      />
      <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
    </label>
  );
}
````````

## `src/app/components/monitoring/SegmentedControl.tsx`

- Category: process monitoring.
- Imports: No direct imports in this file.
- Exports: export interface SegmentedControlOption {, export interface SegmentedControlProps {, export function SegmentedControl({ options, value, onChange, className = '' }: SegmentedControlProps) {
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
export interface SegmentedControlOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SegmentedControl({ options, value, onChange, className = '' }: SegmentedControlProps) {
  return (
    <div className={`inline-flex p-[3px] gap-[3px] border border-border rounded-xl bg-secondary/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.035)] dark:border-white/10 dark:bg-white/5 ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`h-[30px] px-3 rounded-[9px] text-sm transition-all ${
            value === option.value
              ? 'bg-primary text-primary-foreground shadow-[0_8px_20px_rgba(0,0,0,0.14),inset_0_1px_0_rgba(255,255,255,0.22)]'
              : 'bg-transparent text-muted-foreground hover:bg-primary/10 hover:text-foreground'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
````````

## `src/app/components/monitoring/SparklineChart.tsx`

- Category: process monitoring.
- Imports: No direct imports in this file.
- Exports: export interface SparklineChartProps {, export function SparklineChart({
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
export interface SparklineChartProps {
  data?: number[];
  variant?: 'blue' | 'green' | 'purple' | 'cyan' | 'red';
  className?: string;
  width?: number;
  height?: number;
}

export function SparklineChart({
  data = [36, 35, 28, 18, 20, 18, 20, 19, 24, 21, 23, 10, 8],
  variant = 'blue',
  className = '',
  width = 96,
  height = 42,
}: SparklineChartProps) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * (height - 8);
    return `${x} ${y}`;
  });

  const linePath = `M${points.join(' L')}`;
  const areaPath = `${linePath} L${width} ${height} L0 ${height}Z`;

  const colors = {
    blue: { line: 'var(--primary)', area: 'var(--primary)' },
    green: { line: '#52e35c', area: '#52e35c' },
    purple: { line: '#9d6bff', area: '#9d6bff' },
    cyan: { line: '#06b6d4', area: '#06b6d4' },
    red: { line: '#ff5a55', area: '#ff5a55' },
  };

  const color = colors[variant];

  return (
    <svg className={`opacity-95 ${className}`} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      <path d={areaPath} fill={color.area} opacity="0.15" />
      <path d={linePath} fill="none" stroke={color.line} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
````````

## `src/app/components/monitoring/StatusDot.tsx`

- Category: process monitoring.
- Imports: No direct imports in this file.
- Exports: export interface StatusDotProps {, export function StatusDot({ status, label, className = '' }: StatusDotProps) {
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
export interface StatusDotProps {
  status: 'active' | 'running' | 'idle' | 'sleeping' | 'stopped' | 'restricted' | 'zombie' | 'system' | 'high';
  label?: string;
  className?: string;
}

export function StatusDot({ status, label, className = '' }: StatusDotProps) {
  const colorMap = {
    active: 'bg-green-500 shadow-[0_0_10px_rgba(82,227,92,0.65)] text-green-400 dark:text-[#69ff70]',
    running: 'bg-green-500 shadow-[0_0_10px_rgba(82,227,92,0.65)] text-green-400 dark:text-[#69ff70]',
    idle: 'bg-yellow-500 shadow-[0_0_10px_rgba(248,197,27,0.62)] text-yellow-600 dark:text-[#ffd84d]',
    sleeping: 'bg-yellow-500 shadow-[0_0_10px_rgba(248,197,27,0.62)] text-yellow-600 dark:text-[#ffd84d]',
    stopped: 'bg-red-500 shadow-[0_0_10px_rgba(255,90,85,0.62)] text-red-500 dark:text-[#ff8787]',
    restricted: 'bg-gray-400 dark:bg-[#91a4bb] shadow-none text-gray-600 dark:text-[#9fb0c6]',
    zombie: 'bg-gray-400 dark:bg-[#91a4bb] shadow-none text-gray-600 dark:text-[#9fb0c6]',
    system: 'bg-purple-500 shadow-[0_0_10px_rgba(139,92,246,0.4)] text-purple-500',
    high: 'bg-orange-500 shadow-[0_0_10px_rgba(255,153,28,0.4)] text-orange-500',
  };

  const dotColor = colorMap[status] || colorMap.active;

  if (!label) {
    return (
      <span className={`w-2 h-2 rounded-full ${dotColor.split(' ').slice(0, 2).join(' ')} ${className}`} />
    );
  }

  return (
    <span className={`inline-flex items-center gap-[7px] whitespace-nowrap ${dotColor.split(' ').slice(2).join(' ')} ${className}`}>
      <span className={`w-[7px] h-[7px] rounded-full ${dotColor.split(' ').slice(0, 2).join(' ')}`} />
      {label}
    </span>
  );
}
````````

## `src/app/components/monitoring/Toggle.tsx`

- Category: process monitoring.
- Imports: No direct imports in this file.
- Exports: export interface ToggleProps {, export function Toggle({ checked, onChange, disabled = false }: ToggleProps) {
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export function Toggle({ checked, onChange, disabled = false }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        disabled
          ? 'opacity-50 cursor-not-allowed'
          : 'cursor-pointer'
      } ${
        checked
          ? 'bg-primary'
          : 'bg-gray-300 dark:bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}
````````

## `src/app/components/monitoring/ToolbarButton.tsx`

- Category: process monitoring.
- Imports: import { ReactNode, forwardRef } from 'react';
- Exports: export interface ToolbarButtonProps {, export const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { ReactNode, forwardRef } from 'react';

export interface ToolbarButtonProps {
  children?: ReactNode;
  icon?: ReactNode;
  label?: string;
  active?: boolean;
  onClick?: () => void;
  title?: string;
  badge?: number | string;
  variant?: 'default' | 'warning' | 'danger';
  className?: string;
}

export const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  function ToolbarButton(
    {
      children,
      icon,
      label,
      active = false,
      onClick,
      title,
      badge,
      variant = 'default',
      className = ''
    },
    ref
  ) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        title={title}
        className={`relative h-9 px-3 flex items-center gap-2 border rounded-lg transition-all ${
          active
            ? 'border-primary/60 bg-primary text-primary-foreground shadow-[0_8px_20px_rgba(0,0,0,0.16),inset_0_1px_0_rgba(255,255,255,0.20)]'
            : variant === 'warning'
            ? 'border-yellow-500/33 text-yellow-600 bg-background/70 dark:text-yellow-400'
            : variant === 'danger'
            ? 'border-red-500/28 text-red-600 bg-background/70 dark:text-red-300'
            : 'border-border bg-background/70 text-foreground hover:border-primary/45 hover:bg-primary/10 dark:border-white/10 dark:bg-white/5 dark:hover:bg-primary/15'
        } ${className}`}
      >
        {icon && <span className="w-4 h-4 flex items-center justify-center">{icon}</span>}
        {label && <span className="text-sm whitespace-nowrap">{label}</span>}
        {children}
        {badge !== undefined && badge !== 0 && (
          <span className="-ml-1 inline-grid h-[18px] min-w-[18px] place-items-center rounded-full bg-yellow-400 px-[5px] text-[10px] font-black text-black">
            {badge}
          </span>
        )}
      </button>
    );
  }
);
````````

## `src/app/components/MultiSelect.tsx`

- Category: component.
- Imports: import { useState, useRef, useEffect, ReactNode } from "react";, import { Check, X, Search, ChevronDown, Star, Circle, Square, Tag as TagIcon } from "lucide-react";
- Exports: export interface MultiSelectOption {, export function MultiSelect({, export const iconOptions: MultiSelectOption[] = [, export const userOptions: MultiSelectOption[] = [, export const tagOptions: MultiSelectOption[] = [, export const categoryOptions: MultiSelectOption[] = [
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, useRef, useEffect, ReactNode } from "react";
import { Check, X, Search, ChevronDown, Star, Circle, Square, Tag as TagIcon } from "lucide-react";

export interface MultiSelectOption {
  value: string;
  label: string;
  icon?: ReactNode;
  color?: string;
  avatar?: string;
  description?: string;
  badge?: string;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  searchable?: boolean;
  style?: 'default' | 'badges' | 'compact' | 'pills' | 'chips';
  maxHeight?: string;
  label?: string;
  error?: string;
}

export function MultiSelect({
  options,
  value,
  onChange,
  placeholder = "Select options...",
  searchable = true,
  style = 'default',
  maxHeight = '300px',
  label,
  error,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = searchQuery
    ? options.filter(opt =>
        opt.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opt.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const selectedOptions = options.filter(opt => value.includes(opt.value));

  const toggleOption = (optValue: string) => {
    if (value.includes(optValue)) {
      onChange(value.filter(v => v !== optValue));
    } else {
      onChange([...value, optValue]);
    }
  };

  const removeOption = (optValue: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    onChange(value.filter(v => v !== optValue));
  };

  const renderSelectedValues = () => {
    if (selectedOptions.length === 0) {
      return <span className="text-muted-foreground">{placeholder}</span>;
    }

    switch (style) {
      case 'badges':
        return (
          <div className="flex flex-wrap gap-1.5">
            {selectedOptions.map(opt => (
              <span
                key={opt.value}
                className="inline-flex items-center gap-1.5 px-2 py-1 bg-primary/10 text-primary text-sm rounded-lg"
              >
                {opt.icon}
                {opt.label}
                <button
                  onClick={(e) => removeOption(opt.value, e)}
                  className="hover:bg-primary/20 rounded p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        );

      case 'compact':
        return (
          <span className="text-sm">
            {selectedOptions.length} selected
          </span>
        );

      case 'pills':
        return (
          <div className="flex flex-wrap gap-1.5">
            {selectedOptions.map(opt => (
              <span
                key={opt.value}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary text-foreground text-sm rounded-full"
              >
                {opt.icon}
                {opt.label}
                <button
                  onClick={(e) => removeOption(opt.value, e)}
                  className="hover:bg-border rounded-full p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        );

      case 'chips':
        return (
          <div className="flex flex-wrap gap-1.5">
            {selectedOptions.map(opt => (
              <span
                key={opt.value}
                className="inline-flex items-center gap-1.5 px-2 py-1 border border-border text-sm rounded"
                style={{ borderColor: opt.color, color: opt.color }}
              >
                {opt.icon}
                {opt.label}
                <button
                  onClick={(e) => removeOption(opt.value, e)}
                  className="hover:bg-secondary rounded p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        );

      default:
        return (
          <div className="flex flex-wrap gap-1.5">
            {selectedOptions.map(opt => (
              <span
                key={opt.value}
                className="inline-flex items-center gap-1.5 px-2 py-1 bg-primary text-white text-sm rounded-lg"
              >
                {opt.icon}
                {opt.label}
                <button
                  onClick={(e) => removeOption(opt.value, e)}
                  className="hover:bg-primary/80 rounded p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        );
    }
  };

  return (
    <div ref={containerRef} className="relative w-full">
      {label && (
        <label className="block text-sm font-medium mb-2">{label}</label>
      )}

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-[#0f0f0f] cursor-pointer transition-all min-h-[48px] flex items-center justify-between ${
          error
            ? 'border-destructive focus:ring-destructive/20'
            : 'border-border dark:border-[#2a2a2a] hover:border-primary/40'
        } ${isOpen ? 'ring-2 ring-primary/20' : ''}`}
      >
        <div className="flex-1 min-w-0">{renderSelectedValues()}</div>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground transition-transform flex-shrink-0 ml-2 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </div>

      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}

      {isOpen && (
        <div
          className="absolute z-50 w-full mt-2 bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-xl shadow-lg overflow-hidden"
          style={{ maxHeight }}
        >
          {searchable && (
            <div className="p-3 border-b border-border dark:border-[#2a2a2a]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground dark:text-gray-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg text-sm bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}

          <div className="overflow-y-auto" style={{ maxHeight: '250px' }}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map(option => (
                <div
                  key={option.value}
                  onClick={() => toggleOption(option.value)}
                  className="px-4 py-3 hover:bg-secondary dark:hover:bg-[#2a2a2a] cursor-pointer transition-colors flex items-center gap-3"
                >
                  <div className={`w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 ${
                    value.includes(option.value)
                      ? 'bg-primary border-primary'
                      : 'border-border'
                  }`}>
                    {value.includes(option.value) && (
                      <Check className="w-3.5 h-3.5 text-white" />
                    )}
                  </div>

                  {option.avatar && (
                    <img
                      src={option.avatar}
                      alt={option.label}
                      className="w-8 h-8 rounded-full flex-shrink-0"
                    />
                  )}

                  {option.icon && !option.avatar && (
                    <div className="flex-shrink-0" style={{ color: option.color }}>
                      {option.icon}
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium dark:text-gray-200">{option.label}</span>
                      {option.badge && (
                        <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
                          {option.badge}
                        </span>
                      )}
                    </div>
                    {option.description && (
                      <p className="text-xs text-muted-foreground dark:text-gray-400 truncate">
                        {option.description}
                      </p>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground dark:text-gray-400">
                No options found
              </div>
            )}
          </div>

          {selectedOptions.length > 0 && (
            <div className="p-3 border-t border-border dark:border-[#2a2a2a] flex items-center justify-between bg-secondary/30 dark:bg-[#2a2a2a]/30">
              <span className="text-sm text-muted-foreground dark:text-gray-400">
                {selectedOptions.length} selected
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onChange([]);
                }}
                className="text-sm text-primary hover:underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Sample option generators
export const iconOptions: MultiSelectOption[] = [
  { value: 'star', label: 'Star', icon: <Star className="w-4 h-4" />, color: '#FFD700' },
  { value: 'circle', label: 'Circle', icon: <Circle className="w-4 h-4" />, color: '#3B82F6' },
  { value: 'square', label: 'Square', icon: <Square className="w-4 h-4" />, color: '#10B981' },
  { value: 'tag', label: 'Tag', icon: <TagIcon className="w-4 h-4" />, color: '#8B5CF6' },
];

export const userOptions: MultiSelectOption[] = [
  { value: 'user1', label: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=1', description: 'Product Manager' },
  { value: 'user2', label: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=2', description: 'Designer' },
  { value: 'user3', label: 'Bob Johnson', avatar: 'https://i.pravatar.cc/150?img=3', description: 'Engineer' },
];

export const tagOptions: MultiSelectOption[] = [
  { value: 'important', label: 'Important', color: '#EF4444', badge: 'High' },
  { value: 'urgent', label: 'Urgent', color: '#F59E0B', badge: 'Medium' },
  { value: 'review', label: 'Review', color: '#8B5CF6' },
  { value: 'approved', label: 'Approved', color: '#10B981', badge: 'Low' },
];

export const categoryOptions: MultiSelectOption[] = [
  { value: 'product', label: 'Product', icon: <TagIcon className="w-4 h-4" />, description: 'Product related items' },
  { value: 'engineering', label: 'Engineering', icon: <Circle className="w-4 h-4" />, description: 'Technical content' },
  { value: 'design', label: 'Design', icon: <Star className="w-4 h-4" />, description: 'Design assets and docs' },
];
````````

## `src/app/components/NodeEditorModal.tsx`

- Category: component.
- Imports: import { useState, useEffect } from 'react';, import { X, Hash, Layers, Tag, FileText } from 'lucide-react';, import { Button } from './Button';, import type { TreeNode, TreeNodeType } from './HierarchicalTree';
- Exports: export interface NodeFormData {, export function NodeEditorModal({
- Reuse guidance: Use this for Node Designer screens, node validation, run/test controls, and debug-with-AI workflows. Use this for create/update/delete flows, confirmations, and risky operation approval gates.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, useEffect } from 'react';
import { X, Hash, Layers, Tag, FileText } from 'lucide-react';
import { Button } from './Button';
import type { TreeNode, TreeNodeType } from './HierarchicalTree';

interface NodeEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: NodeFormData) => void;
  mode: 'create' | 'edit';
  nodeType: TreeNodeType;
  initialData?: Partial<TreeNode>;
  parentName?: string;
}

export interface NodeFormData {
  name: string;
  slug?: string;
  icon?: string;
  type: TreeNodeType;
  metadata?: {
    postCount?: number;
    memberCount?: number;
    visibility?: string;
  };
}

const nodeTypeLabels: Record<TreeNodeType, string> = {
  channel: 'Channel',
  category: 'Category',
  subject: 'Subject',
  post: 'Post',
};

const nodeTypeIcons: Record<TreeNodeType, React.ComponentType<{ className?: string }>> = {
  channel: Hash,
  category: Layers,
  subject: Tag,
  post: FileText,
};

export function NodeEditorModal({
  isOpen,
  onClose,
  onSave,
  mode,
  nodeType,
  initialData,
  parentName,
}: NodeEditorModalProps) {
  const [formData, setFormData] = useState<NodeFormData>({
    name: '',
    slug: '',
    icon: '',
    type: nodeType,
    metadata: {},
  });

  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && initialData) {
        setFormData({
          name: initialData.name || '',
          slug: '', // Would come from initialData in real implementation
          icon: initialData.icon || '',
          type: nodeType,
          metadata: initialData.metadata || {},
        });
      } else {
        setFormData({
          name: '',
          slug: '',
          icon: '',
          type: nodeType,
          metadata: {},
        });
      }
    }
  }, [isOpen, mode, nodeType, initialData]);

  // Auto-generate slug from name
  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.trim()) {
      onSave(formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  const Icon = nodeTypeIcons[nodeType];
  const label = nodeTypeLabels[nodeType];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl w-full max-w-md mx-4 border border-border dark:border-[#2a2a2a]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border dark:border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold dark:text-gray-100">
                {mode === 'create' ? `Create ${label}` : `Edit ${label}`}
              </h2>
              {mode === 'create' && parentName && (
                <p className="text-sm text-muted-foreground dark:text-gray-400">
                  Under: {parentName}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2 dark:text-gray-200">
              {label} Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary dark:text-gray-100"
              placeholder={`Enter ${label.toLowerCase()} name`}
              required
              autoFocus
            />
          </div>

          {/* Slug - for channels, categories, subjects */}
          {(nodeType === 'channel' || nodeType === 'category' || nodeType === 'subject') && (
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                Slug *
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary dark:text-gray-100 font-mono text-sm"
                placeholder={`${label.toLowerCase()}-slug`}
                required
              />
              <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">
                Auto-generated from name. Used in URLs. Only lowercase letters, numbers, and hyphens.
              </p>
            </div>
          )}

          {/* Icon (for channels) */}
          {nodeType === 'channel' && (
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                Icon (emoji)
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary dark:text-gray-100"
                placeholder="📚"
                maxLength={2}
              />
              <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">
                Optional: Add an emoji to represent this channel
              </p>
            </div>
          )}

          {/* Visibility (for channels and categories) */}
          {(nodeType === 'channel' || nodeType === 'category') && (
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                Visibility
              </label>
              <select
                value={formData.metadata?.visibility || 'private'}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    metadata: { ...formData.metadata, visibility: e.target.value },
                  })
                }
                className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary dark:text-gray-100"
              >
                <option value="private">Private</option>
                <option value="organization">Organization</option>
                <option value="public">Public</option>
              </select>
            </div>
          )}

          {/* Post Content (for posts) */}
          {nodeType === 'post' && (
            <div>
              <label className="block text-sm font-medium mb-2 dark:text-gray-200">
                Content Preview
              </label>
              <textarea
                className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-primary dark:text-gray-100 resize-none"
                rows={3}
                placeholder="This will be created as a draft post..."
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === 'create' ? 'Create' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
````````

## `src/app/components/patterns/AlertsPopover.tsx`

- Category: component.
- Imports: import { useState } from 'react';, import { Bell } from 'lucide-react';, import { Button } from '../Button';, import { PositionedPopover, PopoverPosition } from '../PositionedPopover';, import { AlertItem } from '../monitoring/AlertItem';
- Exports: export interface AlertsPopoverProps {, export function AlertsPopover({ onAlertsAction, position = 'auto' }: AlertsPopoverProps) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '../Button';
import { PositionedPopover, PopoverPosition } from '../PositionedPopover';
import { AlertItem } from '../monitoring/AlertItem';

export interface AlertsPopoverProps {
  onAlertsAction?: (action: string) => void;
  position?: PopoverPosition;
}

export function AlertsPopover({ onAlertsAction, position = 'auto' }: AlertsPopoverProps) {
  const [showPopover, setShowPopover] = useState(false);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);

  const alerts = [
    {
      id: '1',
      title: 'High CPU Usage',
      message: 'Process "node" is using 94% CPU',
      level: 'ERROR' as const,
    },
    {
      id: '2',
      title: 'Memory Warning',
      message: 'System memory usage exceeded 85%',
      level: 'WARN' as const,
    },
    {
      id: '3',
      title: 'Process Started',
      message: 'Background service initialized successfully',
      level: 'INFO' as const,
    },
  ];

  return (
    <>
      <Button
        ref={(el) => {
          if (el && !trigger) setTrigger(el);
        }}
        onClick={() => setShowPopover(!showPopover)}
        variant="secondary"
        size="sm"
        className="gap-2"
      >
        <Bell className="w-4 h-4" />
        Alerts
        <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">
          {alerts.length}
        </span>
      </Button>

      <PositionedPopover
        isOpen={showPopover}
        onClose={() => setShowPopover(false)}
        trigger={trigger}
        title="Active Alerts"
        width={320}
        position={position}
      >
        <div className="px-3 pb-2">
          <p className="text-xs text-muted-foreground dark:text-gray-400">
            Current alerts for the selected process scope.
          </p>
        </div>

        <div className="px-3 space-y-3 pb-3">
          {alerts.map((alert) => (
            <AlertItem key={alert.id} alert={alert} />
          ))}
        </div>

        <div className="px-3 pb-3 pt-2 border-t border-border dark:border-[#2a2a2a]">
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" className="flex-1">
              Mark all read
            </Button>
            <Button size="sm" className="flex-1" onClick={() => setShowPopover(false)}>
              Done
            </Button>
          </div>
        </div>
      </PositionedPopover>
    </>
  );
}
````````

## `src/app/components/patterns/ColumnsPopover.tsx`

- Category: component.
- Imports: import { useState } from 'react';, import { Columns } from 'lucide-react';, import { Button } from '../Button';, import { PositionedPopover, PopoverSection, CheckRow, PopoverPosition } from '../PositionedPopover';
- Exports: export interface ColumnsPopoverProps {, export function ColumnsPopover({ onColumnsChange, position = 'auto' }: ColumnsPopoverProps) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from 'react';
import { Columns } from 'lucide-react';
import { Button } from '../Button';
import { PositionedPopover, PopoverSection, CheckRow, PopoverPosition } from '../PositionedPopover';

export interface ColumnsPopoverProps {
  onColumnsChange?: (columns: any) => void;
  position?: PopoverPosition;
}

export function ColumnsPopover({ onColumnsChange, position = 'auto' }: ColumnsPopoverProps) {
  const [showPopover, setShowPopover] = useState(false);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);

  const [userCol, setUserCol] = useState(true);
  const [cpuCol, setCpuCol] = useState(true);
  const [memoryCol, setMemoryCol] = useState(true);
  const [processesCol, setProcessesCol] = useState(false);
  const [statusCol, setStatusCol] = useState(true);

  const [processNameCol, setProcessNameCol] = useState(true);
  const [pidCol, setPidCol] = useState(true);
  const [processCpuCol, setProcessCpuCol] = useState(true);
  const [processMemoryCol, setProcessMemoryCol] = useState(false);
  const [processStatusCol, setProcessStatusCol] = useState(true);

  const resetColumns = () => {
    setUserCol(true);
    setCpuCol(true);
    setMemoryCol(true);
    setProcessesCol(false);
    setStatusCol(true);
    setProcessNameCol(true);
    setPidCol(true);
    setProcessCpuCol(true);
    setProcessMemoryCol(false);
    setProcessStatusCol(true);
  };

  return (
    <>
      <Button
        ref={(el) => {
          if (el && !trigger) setTrigger(el);
        }}
        onClick={() => setShowPopover(!showPopover)}
        variant="secondary"
        size="sm"
        className="gap-2"
      >
        <Columns className="w-4 h-4" />
        Columns
      </Button>

      <PositionedPopover
        isOpen={showPopover}
        onClose={() => setShowPopover(false)}
        trigger={trigger}
        title="Columns"
        width={280}
        position={position}
      >
        <PopoverSection title="USER TREE">
          <CheckRow
            label="User"
            checked={userCol}
            onChange={setUserCol}
            disabled
            badge="required"
          />
          <CheckRow label="CPU %" checked={cpuCol} onChange={setCpuCol} />
          <CheckRow label="Memory" checked={memoryCol} onChange={setMemoryCol} />
          <CheckRow label="Processes" checked={processesCol} onChange={setProcessesCol} />
          <CheckRow label="Status" checked={statusCol} onChange={setStatusCol} />
        </PopoverSection>

        <PopoverSection title="PROCESS TREE">
          <CheckRow
            label="Process Name"
            checked={processNameCol}
            onChange={setProcessNameCol}
            disabled
            badge="required"
          />
          <CheckRow label="PID" checked={pidCol} onChange={setPidCol} />
          <CheckRow label="CPU %" checked={processCpuCol} onChange={setProcessCpuCol} />
          <CheckRow label="Memory" checked={processMemoryCol} onChange={setProcessMemoryCol} />
          <CheckRow label="Status" checked={processStatusCol} onChange={setProcessStatusCol} />
        </PopoverSection>

        <div className="px-3 pb-3">
          <Button variant="secondary" size="sm" onClick={resetColumns} className="w-full">
            Reset Columns
          </Button>
        </div>
      </PositionedPopover>
    </>
  );
}
````````

## `src/app/components/patterns/EmptyState.tsx`

- Category: component.
- Imports: import { Plus, Mic, Send } from 'lucide-react';
- Exports: export interface ChatEmptyStateProps {, export function ChatEmptyState({ onSuggestionClick, onSend }: ChatEmptyStateProps) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { Plus, Mic, Send } from 'lucide-react';

export interface ChatEmptyStateProps {
  onSuggestionClick?: (suggestion: string) => void;
  onSend?: (message: string) => void;
}

export function ChatEmptyState({ onSuggestionClick, onSend }: ChatEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-3xl font-semibold mb-12 dark:text-gray-100">
        What's on the agenda today?
      </h1>

      {/* Rounded Input */}
      <div className="w-full max-w-3xl mb-8">
        <div className="flex items-center gap-3 border border-border dark:border-[#2a2a2a] rounded-full px-4 py-3 bg-white dark:bg-[#0f0f0f] focus-within:border-primary/50 transition-colors shadow-sm">
          <button className="text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
            <Plus className="w-5 h-5" />
          </button>
          <input
            type="text"
            placeholder="Ask anything"
            className="flex-1 bg-transparent focus:outline-none dark:text-gray-200 placeholder:text-muted-foreground dark:placeholder:text-gray-500"
          />
          <button className="text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
            <Mic className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Suggestion Pills */}
      <div className="flex flex-wrap gap-3 justify-center max-w-3xl">
        <button
          onClick={() => onSuggestionClick?.('Create a dashboard')}
          className="px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-full bg-white dark:bg-[#0f0f0f] hover:border-primary/50 dark:hover:border-primary/50 transition-colors text-sm dark:text-gray-200"
        >
          📊 Create a dashboard
        </button>
        <button
          onClick={() => onSuggestionClick?.('Analyze data')}
          className="px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-full bg-white dark:bg-[#0f0f0f] hover:border-primary/50 dark:hover:border-primary/50 transition-colors text-sm dark:text-gray-200"
        >
          ✏️ Analyze data
        </button>
        <button
          onClick={() => onSuggestionClick?.('Generate report')}
          className="px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-full bg-white dark:bg-[#0f0f0f] hover:border-primary/50 dark:hover:border-primary/50 transition-colors text-sm dark:text-gray-200"
        >
          🌐 Generate report
        </button>
      </div>
    </div>
  );
}
````````

## `src/app/components/patterns/FilterPopover.tsx`

- Category: component.
- Imports: import { useState } from 'react';, import { Filter } from 'lucide-react';, import { Button } from '../Button';, import { PositionedPopover, PopoverSection, CheckRow, PopoverPosition } from '../PositionedPopover';
- Exports: export interface FilterPopoverProps {, export function FilterPopover({ onFiltersChange, position = 'auto' }: FilterPopoverProps) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from 'react';
import { Filter } from 'lucide-react';
import { Button } from '../Button';
import { PositionedPopover, PopoverSection, CheckRow, PopoverPosition } from '../PositionedPopover';

export interface FilterPopoverProps {
  onFiltersChange?: (filters: any) => void;
  position?: PopoverPosition;
}

export function FilterPopover({ onFiltersChange, position = 'auto' }: FilterPopoverProps) {
  const [showPopover, setShowPopover] = useState(false);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);

  const [logInfo, setLogInfo] = useState(true);
  const [logDebug, setLogDebug] = useState(false);
  const [logWarn, setLogWarn] = useState(true);
  const [logError, setLogError] = useState(true);

  const [statusRunning, setStatusRunning] = useState(true);
  const [statusSleeping, setStatusSleeping] = useState(true);
  const [statusStopped, setStatusStopped] = useState(false);
  const [statusZombie, setStatusZombie] = useState(false);

  const [cpuThreshold, setCpuThreshold] = useState(10);

  const resetFilters = () => {
    setLogInfo(true);
    setLogDebug(false);
    setLogWarn(true);
    setLogError(true);
    setStatusRunning(true);
    setStatusSleeping(true);
    setStatusStopped(false);
    setStatusZombie(false);
    setCpuThreshold(10);
  };

  return (
    <>
      <Button
        ref={(el) => {
          if (el && !trigger) setTrigger(el);
        }}
        onClick={() => setShowPopover(!showPopover)}
        variant="secondary"
        size="sm"
        className="gap-2"
      >
        <Filter className="w-4 h-4" />
        Filters
      </Button>

      <PositionedPopover
        isOpen={showPopover}
        onClose={() => setShowPopover(false)}
        trigger={trigger}
        title="Filters"
        width={280}
        position={position}
      >
        <PopoverSection title="LOG LEVELS">
          <CheckRow label="INFO" checked={logInfo} onChange={setLogInfo} />
          <CheckRow label="DEBUG" checked={logDebug} onChange={setLogDebug} />
          <CheckRow label="WARN" checked={logWarn} onChange={setLogWarn} />
          <CheckRow label="ERROR" checked={logError} onChange={setLogError} />
        </PopoverSection>

        <PopoverSection title="PROCESS STATUS">
          <CheckRow label="Running" checked={statusRunning} onChange={setStatusRunning} />
          <CheckRow label="Sleeping" checked={statusSleeping} onChange={setStatusSleeping} />
          <CheckRow label="Stopped" checked={statusStopped} onChange={setStatusStopped} />
          <CheckRow label="Zombie" checked={statusZombie} onChange={setStatusZombie} />
        </PopoverSection>

        <PopoverSection title="CPU THRESHOLD">
          <div className="flex items-center justify-between px-3 py-2.5 rounded-lg">
            <span className="text-sm text-foreground dark:text-gray-200">Minimum CPU %</span>
            <input
              type="number"
              min="0"
              max="100"
              value={cpuThreshold}
              onChange={(e) => setCpuThreshold(Number(e.target.value))}
              className="w-20 px-2 py-1 text-sm border border-border dark:border-[#2a2a2a] rounded bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
            />
          </div>
        </PopoverSection>

        <div className="px-3 pb-3">
          <Button variant="secondary" size="sm" onClick={resetFilters} className="w-full">
            Reset Filters
          </Button>
        </div>
      </PositionedPopover>
    </>
  );
}
````````

## `src/app/components/patterns/MessageSender.tsx`

- Category: component.
- Imports: import { useState, useEffect, useRef } from 'react';, import { Plus, Mic, MicOff, Send, ChevronRight, Terminal } from 'lucide-react';
- Exports: export interface SlashCommand {, export interface ChatMessageSenderProps {, export function ChatMessageSender({
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, useEffect, useRef } from 'react';
import { Plus, Mic, MicOff, Send, ChevronRight, Terminal } from 'lucide-react';

export interface SlashCommand {
  command: string;
  subcommand?: string;
  description: string;
  example?: string;
}

export interface ChatMessageSenderProps {
  onSend?: (message: string) => void;
  onModeClick?: () => void;
  onAttachClick?: () => void;
  slashCommands?: SlashCommand[];
}

export function ChatMessageSender({
  onSend,
  onModeClick,
  onAttachClick,
  slashCommands = []
}: ChatMessageSenderProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [mode, setMode] = useState('Standard');
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const [filteredCommands, setFilteredCommands] = useState<SlashCommand[]>([]);
  const [selectedCommandIndex, setSelectedCommandIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Detect slash command and filter
  useEffect(() => {
    if (message.startsWith('/')) {
      const query = message.slice(1).toLowerCase();
      const filtered = slashCommands.filter(cmd => {
        const fullCommand = cmd.subcommand
          ? `${cmd.command} ${cmd.subcommand}`
          : cmd.command;
        return fullCommand.toLowerCase().startsWith(query);
      });
      setFilteredCommands(filtered);
      setShowCommandMenu(filtered.length > 0);
      setSelectedCommandIndex(0);
    } else {
      setShowCommandMenu(false);
      setFilteredCommands([]);
    }
  }, [message, slashCommands]);

  const handleSend = () => {
    if (message.trim()) {
      onSend?.(message);
      setMessage('');
      setShowCommandMenu(false);
    }
  };

  const selectCommand = (command: SlashCommand) => {
    const fullCommand = command.subcommand
      ? `/${command.command} ${command.subcommand} `
      : `/${command.command} `;
    setMessage(fullCommand);
    setShowCommandMenu(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showCommandMenu && filteredCommands.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedCommandIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedCommandIndex((prev) => prev > 0 ? prev - 1 : 0);
      } else if (e.key === 'Tab' || (e.key === 'Enter' && !e.shiftKey)) {
        e.preventDefault();
        selectCommand(filteredCommands[selectedCommandIndex]);
        return;
      } else if (e.key === 'Escape') {
        setShowCommandMenu(false);
      }
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Check if message starts with a valid slash command
  const isSlashCommand = message.startsWith('/');
  const commandPart = isSlashCommand ? message.split(' ')[0] : '';
  const restPart = isSlashCommand ? message.slice(commandPart.length) : message;

  return (
    <div className="w-full max-w-4xl relative">
      {/* Slash Command Dropdown */}
      {showCommandMenu && filteredCommands.length > 0 && (
        <div className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">
          {filteredCommands.map((cmd, index) => {
            const fullCommand = cmd.subcommand
              ? `${cmd.command} ${cmd.subcommand}`
              : cmd.command;

            return (
              <button
                key={`${cmd.command}-${cmd.subcommand || 'none'}`}
                onClick={() => selectCommand(cmd)}
                className={`w-full px-4 py-3 text-left transition-colors border-b border-border dark:border-[#2a2a2a] last:border-b-0 ${
                  index === selectedCommandIndex
                    ? 'bg-primary/10 dark:bg-primary/20'
                    : 'hover:bg-secondary dark:hover:bg-[#2a2a2a]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-primary" />
                  <span className="font-mono text-sm font-semibold text-primary">
                    /{fullCommand}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground dark:text-gray-400 mt-1 ml-6">
                  {cmd.description}
                </div>
                {cmd.example && (
                  <div className="text-xs text-muted-foreground dark:text-gray-500 mt-1 ml-6 font-mono">
                    Example: {cmd.example}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      <div className="flex items-center gap-3 border border-border dark:border-[#2a2a2a] rounded-full px-4 py-3 bg-white dark:bg-[#0f0f0f] shadow-sm focus-within:border-primary/50 transition-colors">
        {/* Attach Button */}
        <button
          onClick={onAttachClick}
          className="text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
          title="Attach files"
        >
          <Plus className="w-5 h-5" />
        </button>

        {/* Slash Command Indicator */}
        {isSlashCommand && (
          <Terminal className="w-4 h-4 text-primary" />
        )}

        {/* Input Field with Command Highlighting */}
        <div className="flex-1 relative">
          {isSlashCommand && commandPart && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none flex">
              <span className="font-mono text-primary font-semibold">
                {commandPart}
              </span>
              <span className="opacity-0">{restPart}</span>
            </div>
          )}
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything or type / for commands"
            className={`w-full bg-transparent focus:outline-none dark:text-gray-200 placeholder:text-muted-foreground dark:placeholder:text-gray-500 ${
              isSlashCommand ? 'font-mono' : ''
            }`}
            style={isSlashCommand ? { color: 'transparent', caretColor: '#6b7280' } : {}}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Mode Selector */}
          <button
            onClick={onModeClick}
            className="flex items-center gap-1 px-3 py-1.5 text-sm rounded-lg hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors dark:text-gray-200"
          >
            <span>{mode}</span>
            <ChevronRight className="w-3 h-3" />
          </button>

          {/* Voice Recording */}
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`p-2 rounded-lg transition-colors ${
              isRecording
                ? 'bg-red-500 text-white'
                : 'text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary'
            }`}
            title={isRecording ? 'Stop recording' : 'Start recording'}
          >
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          {/* Send Button */}
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="p-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
````````

## `src/app/components/patterns/SettingsPopover.tsx`

- Category: component.
- Imports: import { useState } from 'react';, import { Settings } from 'lucide-react';, import { Button } from '../Button';, import { PositionedPopover, PopoverSection, PopoverPosition } from '../PositionedPopover';, import { Toggle } from '../monitoring/Toggle';
- Exports: export interface SettingsPopoverProps {, export function SettingsPopover({ onSettingsChange, position = 'auto' }: SettingsPopoverProps) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from 'react';
import { Settings } from 'lucide-react';
import { Button } from '../Button';
import { PositionedPopover, PopoverSection, PopoverPosition } from '../PositionedPopover';
import { Toggle } from '../monitoring/Toggle';

export interface SettingsPopoverProps {
  onSettingsChange?: (settings: any) => void;
  position?: PopoverPosition;
}

export function SettingsPopover({ onSettingsChange, position = 'auto' }: SettingsPopoverProps) {
  const [showPopover, setShowPopover] = useState(false);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);

  const [theme, setTheme] = useState('dark');
  const [compactRows, setCompactRows] = useState(false);
  const [showSparklines, setShowSparklines] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  const [refreshInterval, setRefreshInterval] = useState('1000');
  const [logLineCap, setLogLineCap] = useState('5000');

  return (
    <>
      <Button
        ref={(el) => {
          if (el && !trigger) setTrigger(el);
        }}
        onClick={() => setShowPopover(!showPopover)}
        variant="secondary"
        size="sm"
        className="gap-2"
      >
        <Settings className="w-4 h-4" />
        Settings
      </Button>

      <PositionedPopover
        isOpen={showPopover}
        onClose={() => setShowPopover(false)}
        trigger={trigger}
        title="Settings"
        width={300}
        position={position}
      >
        <PopoverSection title="APPEARANCE">
          <div className="flex items-center justify-between px-3 py-2.5 rounded-lg">
            <span className="text-sm text-foreground dark:text-gray-200">Theme</span>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="px-2 py-1 text-sm border border-border dark:border-[#2a2a2a] rounded bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="system">System</option>
            </select>
          </div>
          <div className="flex items-center justify-between px-3 py-2.5 rounded-lg">
            <span className="text-sm text-foreground dark:text-gray-200">Compact rows</span>
            <Toggle checked={compactRows} onChange={setCompactRows} />
          </div>
          <div className="flex items-center justify-between px-3 py-2.5 rounded-lg">
            <span className="text-sm text-foreground dark:text-gray-200">Show metric sparklines</span>
            <Toggle checked={showSparklines} onChange={setShowSparklines} />
          </div>
          <div className="flex items-center justify-between px-3 py-2.5 rounded-lg">
            <span className="text-sm text-foreground dark:text-gray-200">High contrast</span>
            <Toggle checked={highContrast} onChange={setHighContrast} />
          </div>
          <div className="flex items-center justify-between px-3 py-2.5 rounded-lg">
            <span className="text-sm text-foreground dark:text-gray-200">Reduce motion</span>
            <Toggle checked={reduceMotion} onChange={setReduceMotion} />
          </div>
        </PopoverSection>

        <PopoverSection title="PERFORMANCE">
          <div className="flex items-center justify-between px-3 py-2.5 rounded-lg">
            <span className="text-sm text-foreground dark:text-gray-200">Refresh interval</span>
            <select
              value={refreshInterval}
              onChange={(e) => setRefreshInterval(e.target.value)}
              className="px-2 py-1 text-sm border border-border dark:border-[#2a2a2a] rounded bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
            >
              <option value="1000">1 second</option>
              <option value="5000">5 seconds</option>
              <option value="10000">10 seconds</option>
            </select>
          </div>
          <div className="flex items-center justify-between px-3 py-2.5 rounded-lg">
            <span className="text-sm text-foreground dark:text-gray-200">Log line cap</span>
            <select
              value={logLineCap}
              onChange={(e) => setLogLineCap(e.target.value)}
              className="px-2 py-1 text-sm border border-border dark:border-[#2a2a2a] rounded bg-white dark:bg-[#0f0f0f] dark:text-gray-200"
            >
              <option value="1000">1,000 lines</option>
              <option value="5000">5,000 lines</option>
              <option value="10000">10,000 lines</option>
            </select>
          </div>
        </PopoverSection>
      </PositionedPopover>
    </>
  );
}
````````

## `src/app/components/PermissionsMatrix.tsx`

- Category: component.
- Imports: import { useState } from "react";, import { Check, Minus } from "lucide-react";
- Exports: export interface Permission {, export interface PermissionCategory {, export interface Role {, export interface PermissionsMatrixProps {, export function PermissionsMatrix({
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from "react";
import { Check, Minus } from "lucide-react";

export interface Permission {
  id: string;
  name: string;
  description?: string;
}

export interface PermissionCategory {
  id: string;
  name: string;
  permissions: Permission[];
}

export interface Role {
  id: string;
  name: string;
  description?: string;
}

export interface PermissionsMatrixProps {
  categories: PermissionCategory[];
  roles: Role[];
  initialPermissions: Record<string, string[]>; // roleId -> permissionIds[]
  onChange: (permissions: Record<string, string[]>) => void;
  editable?: boolean;
}

export function PermissionsMatrix({
  categories,
  roles,
  initialPermissions,
  onChange,
  editable = true,
}: PermissionsMatrixProps) {
  const [permissions, setPermissions] = useState(initialPermissions);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(categories.map(c => c.id))
  );

  const hasPermission = (roleId: string, permissionId: string): boolean => {
    return permissions[roleId]?.includes(permissionId) || false;
  };

  const togglePermission = (roleId: string, permissionId: string) => {
    if (!editable) return;

    const rolePermissions = permissions[roleId] || [];
    const newPermissions = rolePermissions.includes(permissionId)
      ? rolePermissions.filter(p => p !== permissionId)
      : [...rolePermissions, permissionId];

    const updated = {
      ...permissions,
      [roleId]: newPermissions,
    };

    setPermissions(updated);
    onChange(updated);
  };

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleAllInCategory = (roleId: string, category: PermissionCategory) => {
    if (!editable) return;

    const rolePermissions = permissions[roleId] || [];
    const categoryPermissionIds = category.permissions.map(p => p.id);
    const hasAll = categoryPermissionIds.every(id => rolePermissions.includes(id));

    const newPermissions = hasAll
      ? rolePermissions.filter(p => !categoryPermissionIds.includes(p))
      : [...new Set([...rolePermissions, ...categoryPermissionIds])];

    const updated = {
      ...permissions,
      [roleId]: newPermissions,
    };

    setPermissions(updated);
    onChange(updated);
  };

  const getCategoryStatus = (roleId: string, category: PermissionCategory): 'all' | 'some' | 'none' => {
    const rolePermissions = permissions[roleId] || [];
    const categoryPermissionIds = category.permissions.map(p => p.id);
    const count = categoryPermissionIds.filter(id => rolePermissions.includes(id)).length;

    if (count === 0) return 'none';
    if (count === categoryPermissionIds.length) return 'all';
    return 'some';
  };

  return (
    <div className="bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-lg overflow-x-auto">
      <table className="w-full">
        <thead className="bg-secondary/30 dark:bg-[#0f0f0f] border-b border-border dark:border-[#2a2a2a] sticky top-0">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium dark:text-gray-200 w-64">Permission</th>
            {roles.map(role => (
              <th key={role.id} className="px-4 py-3 text-center text-sm font-medium dark:text-gray-200 w-32">
                <div>
                  <div className="font-medium">{role.name}</div>
                  {role.description && (
                    <div className="text-xs text-muted-foreground dark:text-gray-400 font-normal mt-1">
                      {role.description}
                    </div>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {categories.map(category => {
            const isExpanded = expandedCategories.has(category.id);

            return (
              <tbody key={category.id}>
                {/* Category Header */}
                <tr className="bg-secondary/50 dark:bg-[#1a1a1a] border-b border-border dark:border-[#2a2a2a]">
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="flex items-center gap-2 font-medium text-sm dark:text-gray-200 w-full text-left"
                    >
                      <span>{isExpanded ? '▼' : '▶'}</span>
                      {category.name}
                    </button>
                  </td>
                  {roles.map(role => {
                    const status = getCategoryStatus(role.id, category);
                    return (
                      <td key={role.id} className="px-4 py-3 text-center">
                        <button
                          onClick={() => toggleAllInCategory(role.id, category)}
                          disabled={!editable}
                          className={`w-6 h-6 border flex items-center justify-center transition-colors ${
                            status === 'all'
                              ? 'bg-primary border-primary'
                              : status === 'some'
                              ? 'bg-primary/50 border-primary/50'
                              : 'bg-white dark:bg-[#0f0f0f] border-border dark:border-[#2a2a2a]'
                          } ${editable ? 'cursor-pointer hover:border-primary' : 'cursor-not-allowed opacity-50'}`}
                        >
                          {status === 'all' && <Check className="w-4 h-4 text-white" />}
                          {status === 'some' && <Minus className="w-4 h-4 text-white" />}
                        </button>
                      </td>
                    );
                  })}
                </tr>

                {/* Category Permissions */}
                {isExpanded && category.permissions.map(permission => (
                  <tr key={permission.id} className="border-b border-border dark:border-[#2a2a2a] hover:bg-secondary/30 dark:hover:bg-[#2a2a2a]/30">
                    <td className="px-4 py-3 pl-12">
                      <div className="text-sm">
                        <div className="font-medium dark:text-gray-200">{permission.name}</div>
                        {permission.description && (
                          <div className="text-xs text-muted-foreground dark:text-gray-400 mt-1">
                            {permission.description}
                          </div>
                        )}
                      </div>
                    </td>
                    {roles.map(role => (
                      <td key={role.id} className="px-4 py-3 text-center">
                        <button
                          onClick={() => togglePermission(role.id, permission.id)}
                          disabled={!editable}
                          className={`w-6 h-6 border flex items-center justify-center mx-auto transition-colors ${
                            hasPermission(role.id, permission.id)
                              ? 'bg-primary border-primary'
                              : 'bg-white dark:bg-[#0f0f0f] border-border dark:border-[#2a2a2a]'
                          } ${editable ? 'cursor-pointer hover:border-primary' : 'cursor-not-allowed opacity-50'}`}
                        >
                          {hasPermission(role.id, permission.id) && (
                            <Check className="w-4 h-4 text-white" />
                          )}
                        </button>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
````````

## `src/app/components/PositionedPopover.tsx`

- Category: component.
- Imports: import { ReactNode, useEffect, useRef, useState } from 'react';, import { X } from 'lucide-react';
- Exports: export type PopoverPosition = 'auto' | 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'center-top' | 'center-bottom';, export interface PositionedPopoverProps {, export function PositionedPopover({, export interface PopoverSectionProps {, export function PopoverSection({ title, children, className = '' }: PopoverSectionProps) {, export interface CheckRowProps {, export function CheckRow({ label, checked, onChange, disabled = false, badge }: CheckRowProps) {, export interface RadioRowProps {, export function RadioRow({ label, checked, onChange, name }: RadioRowProps) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { ReactNode, useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';

export type PopoverPosition = 'auto' | 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right' | 'center-top' | 'center-bottom';

export interface PositionedPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: HTMLElement | null;
  children: ReactNode;
  title?: string;
  width?: number;
  position?: PopoverPosition;
}

export function PositionedPopover({
  isOpen,
  onClose,
  trigger,
  children,
  title,
  width = 360,
  position = 'auto'
}: PositionedPopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (isOpen && trigger) {
      const rect = trigger.getBoundingClientRect();
      const popoverWidth = width;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const gap = 8;
      const padding = 16;

      let left = 0;
      let top = 0;
      let finalPosition = position;

      // Auto-detect best position based on available space
      if (position === 'auto') {
        const popoverHeight = popoverRef.current?.offsetHeight || 400; // estimate if not yet rendered

        const spaceAbove = rect.top;
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceLeft = rect.left;
        const spaceRight = viewportWidth - rect.right;

        // Determine vertical placement (top or bottom)
        const preferBottom = spaceBelow >= spaceAbove;

        // Determine horizontal alignment
        let horizontalAlign: 'left' | 'right' | 'center' = 'left';

        // Check if popover fits on the left side
        const fitsLeft = rect.left + popoverWidth <= viewportWidth - padding;
        // Check if popover fits on the right side
        const fitsRight = rect.right - popoverWidth >= padding;
        // Check if popover fits centered
        const centerLeft = rect.left + (rect.width / 2) - (popoverWidth / 2);
        const fitsCenter = centerLeft >= padding && centerLeft + popoverWidth <= viewportWidth - padding;

        if (fitsCenter) {
          horizontalAlign = 'center';
        } else if (fitsLeft) {
          horizontalAlign = 'left';
        } else if (fitsRight) {
          horizontalAlign = 'right';
        } else {
          // Default to left if nothing fits perfectly
          horizontalAlign = 'left';
        }

        // Combine vertical and horizontal preferences
        if (preferBottom) {
          finalPosition = horizontalAlign === 'center' ? 'center-bottom' :
                         horizontalAlign === 'right' ? 'bottom-right' : 'bottom-left';
        } else {
          finalPosition = horizontalAlign === 'center' ? 'center-top' :
                         horizontalAlign === 'right' ? 'top-right' : 'top-left';
        }
      }

      // Calculate position based on final determined position
      switch (finalPosition) {
        case 'bottom-left':
          left = rect.left;
          top = rect.bottom + gap;
          break;
        case 'bottom-right':
          left = rect.right - popoverWidth;
          top = rect.bottom + gap;
          break;
        case 'top-left':
          left = rect.left;
          top = rect.top - gap;
          if (popoverRef.current) {
            top -= popoverRef.current.offsetHeight;
          }
          break;
        case 'top-right':
          left = rect.right - popoverWidth;
          top = rect.top - gap;
          if (popoverRef.current) {
            top -= popoverRef.current.offsetHeight;
          }
          break;
        case 'center-top':
          left = rect.left + (rect.width / 2) - (popoverWidth / 2);
          top = rect.top - gap;
          if (popoverRef.current) {
            top -= popoverRef.current.offsetHeight;
          }
          break;
        case 'center-bottom':
          left = rect.left + (rect.width / 2) - (popoverWidth / 2);
          top = rect.bottom + gap;
          break;
      }

      // Adjust if popover would go off right edge
      if (left + popoverWidth > viewportWidth - padding) {
        left = viewportWidth - popoverWidth - padding;
      }

      // Adjust if popover would go off left edge
      if (left < padding) {
        left = padding;
      }

      // Adjust if popover would go off top edge
      if (top < padding) {
        top = padding;
      }

      // Adjust if popover would go off bottom edge
      if (popoverRef.current && top + popoverRef.current.offsetHeight > viewportHeight - padding) {
        top = viewportHeight - popoverRef.current.offsetHeight - padding;
      }

      setCoords({ top, left });
    }
  }, [isOpen, trigger, width, position]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node) &&
        trigger &&
        !trigger.contains(e.target as Node)
      ) {
        onClose();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, trigger]);

  if (!isOpen) return null;

  return (
    <div
      ref={popoverRef}
      className="fixed z-[100] bg-background dark:bg-[#0f0f0f] border border-border dark:border-[#2a2a2a] rounded-xl shadow-lg animate-slideDown"
      style={{
        top: `${coords.top}px`,
        left: `${coords.left}px`,
        width: `${width}px`,
        maxHeight: 'calc(100vh - 100px)',
        overflow: 'auto'
      }}
    >
      {title && (
        <div className="flex items-center justify-between px-5 py-4 border-b border-border dark:border-[#2a2a2a]">
          <h3 className="font-semibold text-foreground dark:text-gray-100">{title}</h3>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-secondary dark:hover:bg-[#1a1a1a] transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
          </button>
        </div>
      )}
      <div className="p-5">
        {children}
      </div>
    </div>
  );
}

export interface PopoverSectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function PopoverSection({ title, children, className = '' }: PopoverSectionProps) {
  return (
    <div className={`mb-5 last:mb-0 ${className}`}>
      {title && (
        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground dark:text-gray-400 mb-3">
          {title}
        </div>
      )}
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}

export interface CheckRowProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  badge?: string;
}

export function CheckRow({ label, checked, onChange, disabled = false, badge }: CheckRowProps) {
  return (
    <label className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
      disabled
        ? 'opacity-50 cursor-not-allowed'
        : 'cursor-pointer hover:bg-secondary dark:hover:bg-[#1a1a1a]'
    }`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary"
      />
      <span className="flex-1 text-sm text-foreground dark:text-gray-200">{label}</span>
      {badge && (
        <span className="px-2 py-0.5 text-xs font-bold bg-secondary dark:bg-[#1a1a1a] text-muted-foreground dark:text-gray-400 rounded-full border border-border dark:border-[#2a2a2a]">
          {badge}
        </span>
      )}
    </label>
  );
}

export interface RadioRowProps {
  label: string;
  checked: boolean;
  onChange: () => void;
  name: string;
}

export function RadioRow({ label, checked, onChange, name }: RadioRowProps) {
  return (
    <label className="flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-secondary dark:hover:bg-[#1a1a1a] transition-colors">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 border-gray-300 dark:border-gray-600 text-primary focus:ring-primary"
      />
      <span className="flex-1 text-sm text-foreground dark:text-gray-200">{label}</span>
    </label>
  );
}
````````

## `src/app/components/ProgrammaticSidebar.tsx`

- Category: component.
- Imports: import { useState } from 'react';, import { useNavigate, useLocation } from 'react-router';, import { HierarchicalTree, RootNode, TreeNode, TreeNodeType } from './HierarchicalTree';, import { NodeEditorModal, NodeFormData } from './NodeEditorModal';, import { useToast } from './Toast';, import { User as UserIcon, Settings, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
- Exports: export function ProgrammaticSidebar({ onCreateClick }: ProgrammaticSidebarProps) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { HierarchicalTree, RootNode, TreeNode, TreeNodeType } from './HierarchicalTree';
import { NodeEditorModal, NodeFormData } from './NodeEditorModal';
import { useToast } from './Toast';
import { User as UserIcon, Settings, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';

interface ProgrammaticSidebarProps {
  onCreateClick: () => void;
}

interface EditorState {
  isOpen: boolean;
  mode: 'create' | 'edit';
  nodeType: TreeNodeType;
  parentNode?: TreeNode | RootNode;
  editingNode?: TreeNode | RootNode;
}

// Helper to build navigation hierarchy
interface NodePathInfo {
  channelId?: string;
  categoryId?: string;
  subjectId?: string;
  postId?: string;
}

export function ProgrammaticSidebar({ onCreateClick }: ProgrammaticSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { showToast } = useToast();
  const [selectedPath, setSelectedPath] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editorState, setEditorState] = useState<EditorState>({
    isOpen: false,
    mode: 'create',
    nodeType: 'channel',
  });

  // Helper function to generate many nodes for testing grouping feature
  const generateManyNodes = (): TreeNode[] => {
    const nodes: TreeNode[] = [];
    // Generate 250 posts to demonstrate array grouping (100+ nodes)
    for (let i = 1; i <= 250; i++) {
      nodes.push({
        id: `auto-post-${i}`,
        name: `Auto-Generated Post ${i}`,
        type: 'post',
      });
    }
    return nodes;
  };

  // Tree data using actual IDs from mockData + large dataset for testing
  const [treeData, setTreeData] = useState<RootNode[]>([
    {
      id: 'my-channels',
      name: 'My Channels',
      children: [
        {
          id: 'richard-devlin',
          name: 'Richard Devlin',
          type: 'channel',
          icon: 'RD',
          metadata: { postCount: 10, memberCount: 1 },
          children: [
            {
              id: 'general',
              name: 'General',
              type: 'category',
              metadata: { postCount: 3 },
              children: [
                {
                  id: 'general-subject',
                  name: 'General',
                  type: 'subject',
                  metadata: { postCount: 2 },
                },
                {
                  id: 'getting-started',
                  name: 'Getting Started',
                  type: 'subject',
                  metadata: { postCount: 1 },
                  children: [
                    {
                      id: 'getting-started-post',
                      name: 'Getting Started',
                      type: 'post',
                    },
                  ],
                },
              ],
            },
            {
              id: 'product',
              name: 'Product',
              type: 'category',
              metadata: { postCount: 5 },
              children: [
                {
                  id: 'product-strategy',
                  name: 'Product Strategy',
                  type: 'subject',
                  metadata: { postCount: 7 },
                },
              ],
            },
            {
              id: 'engineering',
              name: 'Engineering',
              type: 'category',
              metadata: { postCount: 8 },
              children: [
                {
                  id: 'ai-prompting',
                  name: 'AI Prompt Engineering',
                  type: 'subject',
                  metadata: { postCount: 5 },
                  children: [
                    {
                      id: 'ai-prompting-intro',
                      name: 'Introduction to Prompt Engineering',
                      type: 'post',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'organization',
      name: 'Organization',
      children: [
        {
          id: 'giga',
          name: 'GIGA Channels',
          type: 'channel',
          icon: 'GC',
          metadata: { postCount: 4, memberCount: 23 },
          children: [
            {
              id: 'marketing',
              name: 'Marketing',
              type: 'category',
              metadata: { postCount: 4 },
            },
            {
              id: 'large-dataset-demo',
              name: 'Large Dataset Demo (250 posts)',
              type: 'category',
              metadata: { postCount: 250 },
              children: [
                {
                  id: 'bulk-posts',
                  name: 'Bulk Posts Subject',
                  type: 'subject',
                  metadata: { postCount: 250 },
                  children: generateManyNodes(),
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'global',
      name: 'Global',
      children: [],
    },
  ]);

  // Build path info by traversing tree
  const buildPathInfo = (targetNode: TreeNode, roots: RootNode[]): NodePathInfo | null => {
    const findNode = (
      current: TreeNode | RootNode,
      target: TreeNode,
      pathInfo: NodePathInfo
    ): NodePathInfo | null => {
      if ('type' in current && current.id === target.id) {
        return pathInfo;
      }

      if (current.children) {
        for (const child of current.children) {
          let newPathInfo = { ...pathInfo };

          if ('type' in current) {
            const currentNode = current as TreeNode;
            if (currentNode.type === 'channel') {
              newPathInfo.channelId = currentNode.id;
            } else if (currentNode.type === 'category') {
              newPathInfo.categoryId = currentNode.id;
            } else if (currentNode.type === 'subject') {
              newPathInfo.subjectId = currentNode.id;
            }
          }

          const result = findNode(child, target, newPathInfo);
          if (result) return result;
        }
      }

      return null;
    };

    for (const root of roots) {
      const result = findNode(root, targetNode, {});
      if (result) return result;
    }

    return null;
  };

  const handleNodeClick = (node: TreeNode | RootNode, path: string[]) => {
    const fullPath = path.join('/');
    setSelectedPath(fullPath);

    // Navigate based on node type
    if ('type' in node) {
      const treeNode = node as TreeNode;
      const pathInfo = buildPathInfo(treeNode, treeData);

      if (!pathInfo) return;

      switch (treeNode.type) {
        case 'channel':
          navigate(`/channel/${treeNode.id}`);
          break;
        case 'category':
          if (pathInfo.channelId) {
            navigate(`/channel/${pathInfo.channelId}/category/${treeNode.id}`);
          }
          break;
        case 'subject':
          if (pathInfo.channelId && pathInfo.categoryId) {
            navigate(`/channel/${pathInfo.channelId}/category/${pathInfo.categoryId}/subject/${treeNode.id}`);
          }
          break;
        case 'post':
          if (pathInfo.channelId && pathInfo.categoryId && pathInfo.subjectId) {
            navigate(
              `/channel/${pathInfo.channelId}/category/${pathInfo.categoryId}/subject/${pathInfo.subjectId}/post/${treeNode.id}`
            );
          }
          break;
      }
    }
  };

  const handleChatClick = (node: TreeNode | RootNode) => {
    // Always navigate to UnifiedChat (dashboard-chat)
    // The UnifiedChat system handles all chat interactions
    navigate('/dashboard-chat');
  };

  const handleCreate = (parentNode: TreeNode | RootNode, type: TreeNodeType) => {
    setEditorState({
      isOpen: true,
      mode: 'create',
      nodeType: type,
      parentNode,
    });
  };

  const handleEdit = (node: TreeNode | RootNode) => {
    if ('type' in node) {
      setEditorState({
        isOpen: true,
        mode: 'edit',
        nodeType: (node as TreeNode).type,
        editingNode: node,
      });
    }
  };

  const handleDelete = (node: TreeNode | RootNode) => {
    if ('type' in node) {
      const confirmMsg = `Delete "${node.name}" and all its children? This action cannot be undone.`;
      if (window.confirm(confirmMsg)) {
        showToast('success', `Deleted "${node.name}" and all children`);

        // In a real app, this would:
        // 1. Make an API call to delete the entity and all children
        // 2. Update the tree data by removing the node from its parent

        console.log('Delete', node);
      }
    }
  };

  const handleSaveNode = (formData: NodeFormData) => {
    if (editorState.mode === 'create') {
      showToast('success', `Created ${formData.type}: "${formData.name}"`);

      // In a real app:
      // 1. Make API call to create the entity
      // 2. Get the new ID from the response
      // 3. Update treeData by adding the new node to the parent's children

      console.log('Create node:', formData, 'under', editorState.parentNode);
    } else {
      showToast('success', `Updated "${formData.name}"`);

      // In a real app:
      // 1. Make API call to update the entity
      // 2. Update treeData by finding and updating the node

      console.log('Update node:', formData);
    }

    setEditorState({ ...editorState, isOpen: false });
  };

  return (
    <>
      <aside
        className={`hidden md:flex bg-white dark:bg-[#0f0f0f] border-r border-border dark:border-[#2a2a2a] flex-col transition-all duration-300 ${
          isCollapsed ? 'md:w-20' : 'md:w-80'
        }`}
      >
        <div className={`p-4 border-b border-border dark:border-[#2a2a2a] flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
          {!isCollapsed && (
            <div>
              <h1 className="text-lg font-bold text-primary">GIGA Intelligence</h1>
              <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">Programmatic View</p>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-2 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded-lg transition-colors ${isCollapsed ? 'mx-auto' : ''}`}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </button>
        </div>

        {!isCollapsed && (
          <>
            {/* Search Bar */}
            <div className="px-4 py-3 border-b border-border dark:border-[#2a2a2a]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground dark:text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search nodes..."
                  className="w-full pl-9 pr-8 py-2 text-sm border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0a0a0a] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 placeholder:text-muted-foreground dark:placeholder:text-gray-500"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded"
                  >
                    <X className="w-3 h-3 text-muted-foreground dark:text-gray-400" />
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className="text-xs text-muted-foreground dark:text-gray-500 mt-2">
                  Searching for "{searchQuery}"
                </p>
              )}
            </div>

            {/* Tree */}
            <div className="flex-1 overflow-hidden px-2">
              <HierarchicalTree
                roots={treeData}
                onNodeClick={handleNodeClick}
                onCreateClick={handleCreate}
                onEditClick={handleEdit}
                onDeleteClick={handleDelete}
                onChatClick={handleChatClick}
                selectedPath={selectedPath}
                searchQuery={searchQuery}
              />
            </div>
          </>
        )}

        {/* Footer - Profile & Settings */}
        <div className="p-3 border-t border-border dark:border-[#2a2a2a] space-y-1">
          <button
            onClick={() => navigate('/profile')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full group relative ${
              location.pathname === '/profile'
                ? 'bg-primary text-white'
                : 'text-foreground dark:text-gray-200 hover:bg-secondary dark:hover:bg-[#2a2a2a]'
            } ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? 'Profile' : undefined}
          >
            <UserIcon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Profile</span>}
            {isCollapsed && location.pathname !== '/profile' && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                Profile
              </div>
            )}
          </button>

          <button
            onClick={() => navigate('/settings')}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors w-full group relative ${
              location.pathname === '/settings'
                ? 'bg-primary text-white'
                : 'text-foreground dark:text-gray-200 hover:bg-secondary dark:hover:bg-[#2a2a2a]'
            } ${isCollapsed ? 'justify-center' : ''}`}
            title={isCollapsed ? 'Settings' : undefined}
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Settings</span>}
            {isCollapsed && location.pathname !== '/settings' && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                Settings
              </div>
            )}
          </button>
        </div>
      </aside>

      <NodeEditorModal
        isOpen={editorState.isOpen}
        onClose={() => setEditorState({ ...editorState, isOpen: false })}
        onSave={handleSaveNode}
        mode={editorState.mode}
        nodeType={editorState.nodeType}
        initialData={editorState.editingNode as TreeNode}
        parentName={editorState.parentNode?.name}
      />
    </>
  );
}
````````

## `src/app/components/Root.tsx`

- Category: component.
- Imports: import { useState, useEffect } from "react";, import { Outlet } from "react-router";, import { Sidebar } from "./Sidebar";, import { ProgrammaticSidebar } from "./ProgrammaticSidebar";, import { GlobalHeader } from "./GlobalHeader";, import { CreateModal } from "./CreateModal";, import { BottomNav } from "./BottomNav";
- Exports: export type ViewMode = 'compact' | 'programmatic';, export function Root() {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, useEffect } from "react";
import { Outlet } from "react-router";
import { Sidebar } from "./Sidebar";
import { ProgrammaticSidebar } from "./ProgrammaticSidebar";
import { GlobalHeader } from "./GlobalHeader";
import { CreateModal } from "./CreateModal";
import { BottomNav } from "./BottomNav";

export type ViewMode = 'compact' | 'programmatic';

export function Root() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [programmaticViewEnabled, setProgrammaticViewEnabled] = useState(() => {
    const setting = localStorage.getItem('programmaticViewEnabled');
    return setting === null || setting === 'true';
  });
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    // Check if programmatic view is enabled (default to true if not set)
    const programmaticSetting = localStorage.getItem('programmaticViewEnabled');
    const isProgrammaticEnabled = programmaticSetting === null || programmaticSetting === 'true';

    if (!isProgrammaticEnabled) {
      return 'compact';
    }
    const saved = localStorage.getItem('viewMode');
    return (saved === 'compact' || saved === 'programmatic') ? saved : 'compact';
  });

  // Listen for changes to programmaticViewEnabled setting
  useEffect(() => {
    const handleStorageChange = () => {
      const setting = localStorage.getItem('programmaticViewEnabled');
      const isEnabled = setting === null || setting === 'true';
      setProgrammaticViewEnabled(isEnabled);

      // If programmatic view is disabled, switch to compact mode
      if (!isEnabled && viewMode === 'programmatic') {
        setViewMode('compact');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Also check periodically for same-tab changes
    const interval = setInterval(handleStorageChange, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, [viewMode]);

  useEffect(() => {
    localStorage.setItem('viewMode', viewMode);
  }, [viewMode]);

  const toggleViewMode = () => {
    setViewMode(prev => prev === 'compact' ? 'programmatic' : 'compact');
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {viewMode === 'compact' ? (
        <Sidebar onCreateClick={() => setIsCreateModalOpen(true)} />
      ) : (
        <ProgrammaticSidebar onCreateClick={() => setIsCreateModalOpen(true)} />
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <GlobalHeader
          onCreateClick={() => setIsCreateModalOpen(true)}
          viewMode={viewMode}
          onViewModeToggle={toggleViewMode}
          programmaticViewEnabled={programmaticViewEnabled}
        />

        <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
          <Outlet />
        </main>
      </div>

      <BottomNav onCreateClick={() => setIsCreateModalOpen(true)} />
      <CreateModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
````````

## `src/app/components/SearchBar.tsx`

- Category: component.
- Imports: import { Search } from "lucide-react";
- Exports: export function SearchBar({
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: () => void;
  large?: boolean;
}

export function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
  onSubmit,
  large = false,
}: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search className={`absolute left-4 text-muted-foreground dark:text-gray-400 ${large ? "top-5 w-5 h-5" : "top-3 w-4 h-4"}`} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit?.()}
        placeholder={placeholder}
        className={`w-full border border-border dark:border-[#2a2a2a] rounded-xl bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all ${
          large ? "pl-12 pr-6 py-4 text-base" : "pl-10 pr-4 py-2.5 text-sm"
        }`}
      />
    </div>
  );
}
````````

## `src/app/components/selectors/TableMultiSelector.tsx`

- Category: selector.
- Imports: import { useState, ReactNode } from "react";, import { Search, Check } from "lucide-react";, import { Modal } from "../Modal";, import { Button } from "../Button";
- Exports: export interface TableMultiSelectorColumn<T> {, export interface TableMultiSelectorProps<T> {, export function TableMultiSelector<T>({
- Reuse guidance: Use this for queryable records, database viewers, process rows, and entity management lists.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, ReactNode } from "react";
import { Search, Check } from "lucide-react";
import { Modal } from "../Modal";
import { Button } from "../Button";

export interface TableMultiSelectorColumn<T> {
  id: string;
  header: string;
  accessor: (row: T) => ReactNode;
  filterable?: boolean;
  width?: string;
}

export interface TableMultiSelectorProps<T> {
  isOpen: boolean;
  onClose: () => void;
  columns: TableMultiSelectorColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;
  value: string[];
  onChange: (rowKeys: string[], rows: T[]) => void;
  title?: string;
  searchPlaceholder?: string;
  filters?: ReactNode;
  maxSelections?: number;
  onConfirm?: () => void;
}

export function TableMultiSelector<T>({
  isOpen,
  onClose,
  columns,
  data,
  rowKey,
  value,
  onChange,
  title = "Select Items",
  searchPlaceholder = "Search...",
  filters,
  maxSelections,
  onConfirm,
}: TableMultiSelectorProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter data based on search
  const filteredData = searchQuery
    ? data.filter((row) =>
        columns.some((col) => {
          const cellValue = col.accessor(row);
          return String(cellValue)
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        })
      )
    : data;

  const handleToggle = (row: T) => {
    const key = rowKey(row);
    const isSelected = value.includes(key);

    if (isSelected) {
      const newValue = value.filter((k) => k !== key);
      const newRows = data.filter((r) => newValue.includes(rowKey(r)));
      onChange(newValue, newRows);
    } else {
      if (maxSelections && value.length >= maxSelections) {
        return;
      }
      const newValue = [...value, key];
      const newRows = data.filter((r) => newValue.includes(rowKey(r)));
      onChange(newValue, newRows);
    }
  };

  const handleSelectAll = () => {
    const allKeys = filteredData.map(rowKey);
    const limitedKeys = maxSelections
      ? allKeys.slice(0, maxSelections)
      : allKeys;
    const selectedRows = data.filter((r) => limitedKeys.includes(rowKey(r)));
    onChange(limitedKeys, selectedRows);
  };

  const handleClearAll = () => {
    onChange([], []);
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const allSelected = filteredData.length > 0 && filteredData.every((row) => value.includes(rowKey(row)));
  const someSelected = filteredData.some((row) => value.includes(rowKey(row))) && !allSelected;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="lg"
      footer={
        <div className="flex items-center justify-between w-full">
          <span className="text-sm text-muted-foreground">
            {value.length} selected
            {maxSelections && ` (max ${maxSelections})`}
          </span>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>
              Confirm Selection
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Search and Filters */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              autoFocus
            />
          </div>
          {filters}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleSelectAll}
              disabled={maxSelections !== undefined && filteredData.length > maxSelections}
            >
              Select All
            </Button>
            <Button size="sm" variant="secondary" onClick={handleClearAll}>
              Clear All
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="border border-border rounded-lg overflow-hidden max-h-[400px] overflow-y-auto">
          <table className="w-full">
            <thead className="bg-secondary/30 border-b border-border sticky top-0">
              <tr>
                <th className="w-10 px-3 py-2">
                  <button
                    onClick={handleSelectAll}
                    className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${
                      allSelected
                        ? 'bg-primary border-primary'
                        : someSelected
                        ? 'bg-primary/50 border-primary'
                        : 'border-border hover:border-primary'
                    }`}
                  >
                    {allSelected && <Check className="w-3 h-3 text-white" />}
                    {someSelected && <div className="w-2 h-0.5 bg-white" />}
                  </button>
                </th>
                {columns.map((col) => (
                  <th
                    key={col.id}
                    className="px-4 py-2 text-left text-sm font-medium"
                    style={{ width: col.width }}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No items found
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => {
                  const key = rowKey(row);
                  const isSelected = value.includes(key);
                  const isDisabled = maxSelections && value.length >= maxSelections && !isSelected;

                  return (
                    <tr
                      key={key}
                      onClick={() => !isDisabled && handleToggle(row)}
                      className={`border-b border-border cursor-pointer transition-colors ${
                        isDisabled
                          ? 'opacity-50 cursor-not-allowed'
                          : isSelected
                          ? 'bg-primary/10'
                          : 'hover:bg-secondary/50'
                      }`}
                    >
                      <td className="px-3 py-2">
                        <div
                          className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-primary border-primary'
                              : 'border-border'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </td>
                      {columns.map((col) => (
                        <td key={col.id} className="px-4 py-2 text-sm">
                          {col.accessor(row)}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}
````````

## `src/app/components/selectors/TableSelector.tsx`

- Category: selector.
- Imports: import { useState, ReactNode } from "react";, import { Search, Check } from "lucide-react";, import { Modal } from "../Modal";, import { Button } from "../Button";
- Exports: export interface TableSelectorColumn<T> {, export interface TableSelectorProps<T> {, export function TableSelector<T>({
- Reuse guidance: Use this for queryable records, database viewers, process rows, and entity management lists.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, ReactNode } from "react";
import { Search, Check } from "lucide-react";
import { Modal } from "../Modal";
import { Button } from "../Button";

export interface TableSelectorColumn<T> {
  id: string;
  header: string;
  accessor: (row: T) => ReactNode;
  filterable?: boolean;
  width?: string;
}

export interface TableSelectorProps<T> {
  isOpen: boolean;
  onClose: () => void;
  columns: TableSelectorColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;
  value: string | null;
  onChange: (rowKey: string | null, row: T | null) => void;
  title?: string;
  searchPlaceholder?: string;
  filters?: ReactNode;
}

export function TableSelector<T>({
  isOpen,
  onClose,
  columns,
  data,
  rowKey,
  value,
  onChange,
  title = "Select Item",
  searchPlaceholder = "Search...",
  filters,
}: TableSelectorProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter data based on search
  const filteredData = searchQuery
    ? data.filter((row) =>
        columns.some((col) => {
          const cellValue = col.accessor(row);
          return String(cellValue)
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        })
      )
    : data;

  const handleSelect = (row: T) => {
    const key = rowKey(row);
    onChange(key, row);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="lg"
    >
      <div className="space-y-4">
        {/* Search and Filters */}
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              autoFocus
            />
          </div>
          {filters}
        </div>

        {/* Table */}
        <div className="border border-border rounded-lg overflow-hidden max-h-[400px] overflow-y-auto">
          <table className="w-full">
            <thead className="bg-secondary/30 border-b border-border sticky top-0">
              <tr>
                <th className="w-10 px-3 py-2"></th>
                {columns.map((col) => (
                  <th
                    key={col.id}
                    className="px-4 py-2 text-left text-sm font-medium"
                    style={{ width: col.width }}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredData.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + 1}
                    className="px-4 py-8 text-center text-muted-foreground"
                  >
                    No items found
                  </td>
                </tr>
              ) : (
                filteredData.map((row) => {
                  const key = rowKey(row);
                  const isSelected = value === key;

                  return (
                    <tr
                      key={key}
                      onClick={() => handleSelect(row)}
                      className={`border-b border-border cursor-pointer transition-colors ${
                        isSelected
                          ? 'bg-primary/10'
                          : 'hover:bg-secondary/50'
                      }`}
                    >
                      <td className="px-3 py-2">
                        <div
                          className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-primary border-primary'
                              : 'border-border'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </td>
                      {columns.map((col) => (
                        <td key={col.id} className="px-4 py-2 text-sm">
                          {col.accessor(row)}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Modal>
  );
}
````````

## `src/app/components/selectors/TreeMultiSelector.tsx`

- Category: selector.
- Imports: import { useState, useRef, useEffect } from "react";, import { ChevronRight, ChevronDown, Check, Minus, X } from "lucide-react";, import { TreeNode } from "../LazyLoadTree";
- Exports: export interface TreeMultiSelectorProps {, export function TreeMultiSelector({
- Reuse guidance: Use this selector as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronDown, Check, Minus, X } from "lucide-react";
import { TreeNode } from "../LazyLoadTree";

export interface TreeMultiSelectorProps {
  nodes: TreeNode[];
  value: string[];
  onChange: (nodeIds: string[], nodes: TreeNode[]) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  maxSelections?: number;
  highlightSelectedRows?: boolean;
}

export function TreeMultiSelector({
  nodes,
  value,
  onChange,
  placeholder = "Select items...",
  label,
  disabled = false,
  required = false,
  maxSelections,
  highlightSelectedRows = true,
}: TreeMultiSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get all nodes as flat map for lookup
  const nodeMap = new Map<string, TreeNode>();
  const buildNodeMap = (nodeList: TreeNode[]) => {
    nodeList.forEach((node) => {
      nodeMap.set(node.id, node);
      if (node.children) {
        buildNodeMap(node.children);
      }
    });
  };
  buildNodeMap(nodes);

  const getSelectedLabels = (): string[] => {
    return value.map((id) => nodeMap.get(id)?.label || id);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleExpand = (nodeId: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedIds(newExpanded);
  };

  // Get all descendant IDs of a node
  const getAllDescendantIds = (node: TreeNode): string[] => {
    let ids: string[] = [];
    if (node.children) {
      node.children.forEach((child) => {
        if (!child.disabled) {
          ids.push(child.id);
          ids = [...ids, ...getAllDescendantIds(child)];
        }
      });
    }
    return ids;
  };

  // Get all leaf nodes (nodes without children) that are descendants
  const getLeafDescendantIds = (node: TreeNode): string[] => {
    let leafIds: string[] = [];

    if (!node.children || node.children.length === 0) {
      // This is a leaf node
      if (!node.disabled) {
        return [node.id];
      }
      return [];
    }

    // Has children, recurse
    node.children.forEach((child) => {
      leafIds = [...leafIds, ...getLeafDescendantIds(child)];
    });

    return leafIds;
  };

  // Check if all children are selected
  const areAllChildrenSelected = (node: TreeNode): boolean => {
    if (!node.children || node.children.length === 0) return false;

    const leafIds = getLeafDescendantIds(node);
    return leafIds.length > 0 && leafIds.every(id => value.includes(id));
  };

  // Check if some (but not all) children are selected
  const areSomeChildrenSelected = (node: TreeNode): boolean => {
    if (!node.children || node.children.length === 0) return false;

    const leafIds = getLeafDescendantIds(node);
    const selectedCount = leafIds.filter(id => value.includes(id)).length;
    return selectedCount > 0 && selectedCount < leafIds.length;
  };

  const handleToggle = (node: TreeNode) => {
    let newValue = [...value];
    const hasChildren = node.children && node.children.length > 0;

    if (hasChildren) {
      // Parent node - toggle all children
      const allLeafIds = getLeafDescendantIds(node);
      const allSelected = allLeafIds.every(id => value.includes(id));

      if (allSelected) {
        // Unselect all descendants
        newValue = newValue.filter(id => !allLeafIds.includes(id));
      } else {
        // Select all descendants
        allLeafIds.forEach(id => {
          if (!newValue.includes(id)) {
            newValue.push(id);
          }
        });
      }
    } else {
      // Leaf node - simple toggle
      if (value.includes(node.id)) {
        newValue = newValue.filter((id) => id !== node.id);
      } else if (!maxSelections || value.length < maxSelections) {
        newValue.push(node.id);
      }
    }

    const selectedNodes = newValue.map((id) => nodeMap.get(id)!).filter(Boolean);
    onChange(newValue, selectedNodes);
  };

  const handleRemove = (nodeId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const newValue = value.filter((id) => id !== nodeId);
    const selectedNodes = newValue.map((id) => nodeMap.get(id)!).filter(Boolean);
    onChange(newValue, selectedNodes);
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange([], []);
  };

  const renderNode = (node: TreeNode, level: number = 0) => {
    const isExpanded = expandedIds.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const nodeDisabled = node.disabled || false;

    // Determine selection state
    let isSelected = false;
    let isPartiallySelected = false;

    if (hasChildren) {
      // Parent node - check children selection state
      isSelected = areAllChildrenSelected(node);
      isPartiallySelected = !isSelected && areSomeChildrenSelected(node);
    } else {
      // Leaf node - check if directly selected
      isSelected = value.includes(node.id);
    }

    const maxReachedDisabled = maxSelections && value.length >= maxSelections && !isSelected && !isPartiallySelected;
    const isDisabled = nodeDisabled || maxReachedDisabled;

    return (
      <div key={node.id}>
        <div
          className={`flex items-center gap-2 px-3 py-2 transition-colors ${
            isDisabled
              ? 'opacity-50 cursor-not-allowed'
              : highlightSelectedRows && (isSelected || isPartiallySelected)
              ? 'bg-primary/10 dark:bg-primary/20 cursor-pointer'
              : highlightSelectedRows
              ? 'hover:bg-secondary/50 dark:hover:bg-[#2a2a2a]/50 cursor-pointer'
              : 'cursor-pointer'
          }`}
          style={{ paddingLeft: `${level * 20 + 12}px` }}
        >
          {/* Expand/Collapse */}
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(node.id);
              }}
              className="w-4 h-4 flex items-center justify-center hover:bg-primary/10 dark:hover:bg-primary/20 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </button>
          ) : (
            <div className="w-4" />
          )}

          {/* Checkbox */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isDisabled) handleToggle(node);
            }}
            disabled={isDisabled}
            className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${
              isSelected
                ? 'bg-primary border-primary'
                : isPartiallySelected
                ? 'bg-primary/50 border-primary'
                : 'border-border dark:border-[#2a2a2a] hover:border-primary'
            }`}
          >
            {isSelected && <Check className="w-3 h-3 text-white" />}
            {isPartiallySelected && !isSelected && <Minus className="w-3 h-3 text-white" />}
          </button>

          {/* Node Content */}
          <div
            onClick={() => !isDisabled && handleToggle(node)}
            className="flex-1 flex items-center gap-2 text-sm dark:text-gray-200"
          >
            {node.icon}
            <span>{node.label}</span>
          </div>
        </div>

        {/* Children */}
        {isExpanded && hasChildren && (
          <div className="animate-slideDown">
            {node.children!.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  const selectedLabels = getSelectedLabels();

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium mb-2">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      {/* Trigger */}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full min-h-[42px] px-3 py-2 border rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200 text-left flex items-start justify-between transition-all ${
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
        } ${isOpen ? 'ring-2 ring-primary/20 border-primary' : 'border-border dark:border-[#2a2a2a]'}`}
      >
        <div className="flex-1 flex flex-wrap gap-1">
          {selectedLabels.length === 0 ? (
            <span className="text-muted-foreground dark:text-gray-400">{placeholder}</span>
          ) : (
            selectedLabels.map((label, index) => (
              <span
                key={value[index]}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-sm rounded"
              >
                {label}
                {!disabled && (
                  <X
                    className="w-3 h-3 hover:text-primary/70 transition-colors"
                    onClick={(e) => handleRemove(value[index], e)}
                  />
                )}
              </span>
            ))
          )}
        </div>
        <div className="flex items-center gap-1 ml-2">
          {value.length > 0 && !disabled && (
            <X
              className="w-4 h-4 text-muted-foreground dark:text-gray-400 hover:text-foreground transition-colors"
              onClick={handleClearAll}
            />
          )}
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground dark:text-gray-400 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] dark:border-[#2a2a2a] rounded-lg shadow-lg max-h-80 overflow-y-auto animate-slideDown">
          <div className="sticky top-0 bg-white dark:bg-[#1a1a1a] border-b border-border dark:border-[#2a2a2a] dark:border-[#2a2a2a] px-3 py-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground dark:text-gray-400">
              {value.length} selected
              {maxSelections && ` (max ${maxSelections})`}
            </span>
            {value.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-primary hover:text-primary/70 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
          {nodes.map((node) => renderNode(node))}
        </div>
      )}
    </div>
  );
}
````````

## `src/app/components/selectors/TreeMultiSelectorModal.tsx`

- Category: selector.
- Imports: import { useState } from "react";, import { ChevronRight, ChevronDown, Check, Minus } from "lucide-react";, import { Modal } from "../Modal";, import { Button } from "../Button";, import { TreeNode } from "../LazyLoadTree";
- Exports: export interface TreeMultiSelectorModalProps {, export function TreeMultiSelectorModal({
- Reuse guidance: Use this for create/update/delete flows, confirmations, and risky operation approval gates.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from "react";
import { ChevronRight, ChevronDown, Check, Minus } from "lucide-react";
import { Modal } from "../Modal";
import { Button } from "../Button";
import { TreeNode } from "../LazyLoadTree";

export interface TreeMultiSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodes: TreeNode[];
  value: string[];
  onChange: (nodeIds: string[], nodes: TreeNode[]) => void;
  title?: string;
  maxSelections?: number;
  onConfirm?: () => void;
  highlightSelectedRows?: boolean;
}

export function TreeMultiSelectorModal({
  isOpen,
  onClose,
  nodes,
  value,
  onChange,
  title = "Select Items",
  maxSelections,
  onConfirm,
  highlightSelectedRows = true,
}: TreeMultiSelectorModalProps) {
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  // Get all nodes as flat map for lookup
  const nodeMap = new Map<string, TreeNode>();
  const buildNodeMap = (nodeList: TreeNode[]) => {
    nodeList.forEach((node) => {
      nodeMap.set(node.id, node);
      if (node.children) {
        buildNodeMap(node.children);
      }
    });
  };
  buildNodeMap(nodes);

  const toggleExpand = (nodeId: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedIds(newExpanded);
  };

  // Get all leaf nodes (nodes without children) that are descendants
  const getLeafDescendantIds = (node: TreeNode): string[] => {
    let leafIds: string[] = [];

    if (!node.children || node.children.length === 0) {
      // This is a leaf node
      if (!node.disabled) {
        return [node.id];
      }
      return [];
    }

    // Has children, recurse
    node.children.forEach((child) => {
      leafIds = [...leafIds, ...getLeafDescendantIds(child)];
    });

    return leafIds;
  };

  // Check if all children are selected
  const areAllChildrenSelected = (node: TreeNode): boolean => {
    if (!node.children || node.children.length === 0) return false;

    const leafIds = getLeafDescendantIds(node);
    return leafIds.length > 0 && leafIds.every(id => value.includes(id));
  };

  // Check if some (but not all) children are selected
  const areSomeChildrenSelected = (node: TreeNode): boolean => {
    if (!node.children || node.children.length === 0) return false;

    const leafIds = getLeafDescendantIds(node);
    const selectedCount = leafIds.filter(id => value.includes(id)).length;
    return selectedCount > 0 && selectedCount < leafIds.length;
  };

  const handleToggle = (node: TreeNode) => {
    let newValue = [...value];
    const hasChildren = node.children && node.children.length > 0;

    if (hasChildren) {
      // Parent node - toggle all leaf children
      const allLeafIds = getLeafDescendantIds(node);
      const allSelected = allLeafIds.every(id => value.includes(id));

      if (allSelected) {
        // Unselect all descendants
        newValue = newValue.filter(id => !allLeafIds.includes(id));
      } else {
        // Select all descendants
        allLeafIds.forEach(id => {
          if (!newValue.includes(id)) {
            newValue.push(id);
          }
        });
      }
    } else {
      // Leaf node - simple toggle
      if (value.includes(node.id)) {
        newValue = newValue.filter((id) => id !== node.id);
      } else if (!maxSelections || value.length < maxSelections) {
        newValue.push(node.id);
      }
    }

    const selectedNodes = newValue.map((id) => nodeMap.get(id)!).filter(Boolean);
    onChange(newValue, selectedNodes);
  };

  const handleClearAll = () => {
    onChange([], []);
  };

  const handleConfirm = () => {
    onConfirm?.();
    onClose();
  };

  const renderNode = (node: TreeNode, level: number = 0) => {
    const isExpanded = expandedIds.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const nodeDisabled = node.disabled || false;

    // Determine selection state
    let isSelected = false;
    let isPartiallySelected = false;

    if (hasChildren) {
      // Parent node - check children selection state
      isSelected = areAllChildrenSelected(node);
      isPartiallySelected = !isSelected && areSomeChildrenSelected(node);
    } else {
      // Leaf node - check if directly selected
      isSelected = value.includes(node.id);
    }

    const maxReachedDisabled = maxSelections && value.length >= maxSelections && !isSelected && !isPartiallySelected;
    const isDisabled = nodeDisabled || maxReachedDisabled;

    return (
      <div key={node.id}>
        <div
          className={`flex items-center gap-2 px-3 py-2 transition-colors ${
            isDisabled
              ? 'opacity-50 cursor-not-allowed'
              : highlightSelectedRows && (isSelected || isPartiallySelected)
              ? 'bg-primary/10 dark:bg-primary/20 cursor-pointer'
              : highlightSelectedRows
              ? 'hover:bg-secondary/50 dark:hover:bg-[#2a2a2a]/50 cursor-pointer'
              : 'cursor-pointer'
          }`}
          style={{ paddingLeft: `${level * 20 + 12}px` }}
        >
          {/* Expand/Collapse */}
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(node.id);
              }}
              className="w-4 h-4 flex items-center justify-center hover:bg-primary/10 dark:hover:bg-primary/20 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </button>
          ) : (
            <div className="w-4" />
          )}

          {/* Checkbox */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isDisabled) handleToggle(node);
            }}
            disabled={isDisabled}
            className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${
              isSelected
                ? 'bg-primary border-primary'
                : isPartiallySelected
                ? 'bg-primary/50 border-primary'
                : 'border-border dark:border-[#2a2a2a] hover:border-primary'
            }`}
          >
            {isSelected && <Check className="w-3 h-3 text-white" />}
            {isPartiallySelected && !isSelected && <Minus className="w-3 h-3 text-white" />}
          </button>

          {/* Node Content */}
          <div
            onClick={() => !isDisabled && handleToggle(node)}
            className="flex-1 flex items-center gap-2 text-sm dark:text-gray-200"
          >
            {node.icon}
            <span>{node.label}</span>
          </div>
        </div>

        {/* Children */}
        {isExpanded && hasChildren && (
          <div>
            {node.children!.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="text-sm text-muted-foreground dark:text-gray-400">
            {value.length} selected
            {maxSelections && ` (max ${maxSelections})`}
          </div>
          <div className="flex gap-3">
            {value.length > 0 && (
              <Button variant="secondary" onClick={handleClearAll}>
                Clear All
              </Button>
            )}
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>
              Confirm
            </Button>
          </div>
        </div>
      }
    >
      <div className="max-h-96 overflow-y-auto border border-border dark:border-[#2a2a2a] rounded-lg">
        {nodes.map((node) => renderNode(node))}
      </div>
    </Modal>
  );
}
````````

## `src/app/components/selectors/TreeSelectField.tsx`

- Category: selector.
- Imports: import { useState } from "react";, import { ChevronDown, X } from "lucide-react";, import { TreeNode } from "../LazyLoadTree";, import { TreeSelectorModal } from "./TreeSelectorModal";
- Exports: export interface TreeSelectFieldProps {, export function TreeSelectField({
- Reuse guidance: Use this selector as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from "react";
import { ChevronDown, X } from "lucide-react";
import { TreeNode } from "../LazyLoadTree";
import { TreeSelectorModal } from "./TreeSelectorModal";

export interface TreeSelectFieldProps {
  nodes: TreeNode[];
  value: string | null;
  onChange: (nodeId: string | null, node: TreeNode | null) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  multiSelect?: boolean;
  selectedValues?: string[];
  onMultiChange?: (nodeIds: string[], nodes: TreeNode[]) => void;
}

export function TreeSelectField({
  nodes,
  value,
  onChange,
  label,
  placeholder = "Select an item...",
  disabled = false,
  required = false,
  error,
  multiSelect = false,
  selectedValues = [],
  onMultiChange,
}: TreeSelectFieldProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Build node map
  const nodeMap = new Map<string, TreeNode>();
  const buildNodeMap = (nodeList: TreeNode[]) => {
    nodeList.forEach((node) => {
      nodeMap.set(node.id, node);
      if (node.children) {
        buildNodeMap(node.children);
      }
    });
  };
  buildNodeMap(nodes);

  const getSelectedLabel = (): string => {
    if (multiSelect) {
      if (selectedValues.length === 0) return placeholder;
      if (selectedValues.length === 1) {
        return nodeMap.get(selectedValues[0])?.label || placeholder;
      }
      return `${selectedValues.length} items selected`;
    }
    return value ? nodeMap.get(value)?.label || placeholder : placeholder;
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (multiSelect && onMultiChange) {
      onMultiChange([], []);
    } else {
      onChange(null, null);
    }
  };

  const hasSelection = multiSelect ? selectedValues.length > 0 : value !== null;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium mb-2">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(true)}
        disabled={disabled}
        className={`
          w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200 text-left
          flex items-center justify-between transition-all
          ${disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
          }
          ${error ? 'border-destructive' : 'border-border dark:border-[#2a2a2a]'}
        `}
      >
        <span className={hasSelection ? 'text-foreground' : 'text-muted-foreground dark:text-gray-400'}>
          {getSelectedLabel()}
        </span>
        <div className="flex items-center gap-1">
          {hasSelection && !disabled && (
            <X
              className="w-4 h-4 text-muted-foreground dark:text-gray-400 hover:text-foreground transition-colors"
              onClick={handleClear}
            />
          )}
          <ChevronDown className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
        </div>
      </button>

      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}

      {/* Modal */}
      <TreeSelectorModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        nodes={nodes}
        value={value}
        onChange={onChange}
        title={multiSelect ? "Select Items" : "Select Item"}
        multiSelect={multiSelect}
        selectedValues={selectedValues}
        onMultiChange={onMultiChange}
      />
    </div>
  );
}
````````

## `src/app/components/selectors/TreeSelector.tsx`

- Category: selector.
- Imports: import { useState, useRef, useEffect } from "react";, import { ChevronRight, ChevronDown, Check, X } from "lucide-react";, import { TreeNode } from "../LazyLoadTree";
- Exports: export interface TreeSelectorProps {, export function TreeSelector({
- Reuse guidance: Use this selector as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, useRef, useEffect } from "react";
import { ChevronRight, ChevronDown, Check, X } from "lucide-react";
import { TreeNode } from "../LazyLoadTree";

export interface TreeSelectorProps {
  nodes: TreeNode[];
  value: string | null;
  onChange: (nodeId: string | null, node: TreeNode | null) => void;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  highlightSelectedRows?: boolean;
}

export function TreeSelector({
  nodes,
  value,
  onChange,
  placeholder = "Select an item...",
  label,
  disabled = false,
  required = false,
  highlightSelectedRows = true,
}: TreeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Get selected node label
  const getSelectedLabel = (nodeId: string | null, nodeList: TreeNode[]): string => {
    if (!nodeId) return placeholder;

    for (const node of nodeList) {
      if (node.id === nodeId) return node.label;
      if (node.children) {
        const found = getSelectedLabel(nodeId, node.children);
        if (found !== placeholder) return found;
      }
    }
    return placeholder;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleExpand = (nodeId: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedIds(newExpanded);
  };

  const handleSelect = (node: TreeNode) => {
    onChange(node.id, node);
    setIsOpen(false);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(null, null);
  };

  const renderNode = (node: TreeNode, level: number = 0) => {
    const isExpanded = expandedIds.has(node.id);
    const isSelected = value === node.id;
    const hasChildren = node.children && node.children.length > 0;
    const isDisabled = node.disabled || false;

    return (
      <div key={node.id}>
        <div
          className={`flex items-center gap-2 px-3 py-2 transition-colors ${
            isDisabled
              ? 'opacity-50 cursor-not-allowed'
              : highlightSelectedRows && isSelected
              ? 'bg-primary/10 dark:bg-primary/20 text-primary font-medium cursor-pointer'
              : highlightSelectedRows
              ? 'hover:bg-secondary/50 dark:hover:bg-[#2a2a2a]/50 dark:text-gray-200 cursor-pointer'
              : 'dark:text-gray-200 cursor-pointer'
          }`}
          style={{ paddingLeft: `${level * 20 + 12}px` }}
        >
          {/* Expand/Collapse */}
          {hasChildren ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(node.id);
              }}
              className="w-4 h-4 flex items-center justify-center hover:bg-primary/10 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-3 h-3" />
              ) : (
                <ChevronRight className="w-3 h-3" />
              )}
            </button>
          ) : (
            <div className="w-4" />
          )}

          {/* Node Content */}
          <div
            onClick={() => !isDisabled && handleSelect(node)}
            className="flex-1 flex items-center gap-2 text-sm"
          >
            {node.icon}
            <span>{node.label}</span>
          </div>

          {/* Selected Indicator */}
          {isSelected && <Check className="w-4 h-4 text-primary" />}
        </div>

        {/* Children */}
        {isExpanded && hasChildren && (
          <div className="animate-slideDown">
            {node.children!.map((child) => renderNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {label && (
        <label className="block text-sm font-medium mb-2">
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      {/* Trigger */}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-[#0f0f0f] text-left flex items-center justify-between transition-all ${
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary'
        } ${isOpen ? 'ring-2 ring-primary/20 border-primary' : 'border-border dark:border-[#2a2a2a]'}`}
      >
        <span className={value ? 'text-foreground dark:text-gray-200' : 'text-muted-foreground dark:text-gray-400 dark:text-gray-400'}>
          {getSelectedLabel(value, nodes)}
        </span>
        <div className="flex items-center gap-1">
          {value && !disabled && (
            <X
              className="w-4 h-4 text-muted-foreground dark:text-gray-400 hover:text-foreground transition-colors"
              onClick={handleClear}
            />
          )}
          <ChevronDown
            className={`w-4 h-4 text-muted-foreground dark:text-gray-400 transition-transform ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </div>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-lg shadow-lg max-h-80 overflow-y-auto animate-slideDown">
          {nodes.map((node) => renderNode(node))}
        </div>
      )}
    </div>
  );
}
````````
