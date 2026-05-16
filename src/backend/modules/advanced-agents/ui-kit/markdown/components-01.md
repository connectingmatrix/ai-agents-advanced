# UI Kit Components Source Context

This file exports 35 source file(s). Each section includes reuse guidance and an exact snippet from the uploaded UI Kit.

## `src/app/components/ActivityPanel.tsx`

- Category: component.
- Imports: import { X, Copy } from "lucide-react";, import { Button } from "./Button";
- Exports: export interface ThinkingStep {, export function ActivityPanel({ isOpen, onClose, duration, steps }: ActivityPanelProps) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { X, Copy } from "lucide-react";
import { Button } from "./Button";

export interface ThinkingStep {
  type: 'thinking' | 'code';
  content: string;
  language?: string;
}

interface ActivityPanelProps {
  isOpen: boolean;
  onClose: () => void;
  duration: number;
  steps: ThinkingStep[];
}

export function ActivityPanel({ isOpen, onClose, duration, steps }: ActivityPanelProps) {
  if (!isOpen) return null;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="w-96 bg-white dark:bg-[#0f0f0f] border-l border-border dark:border-[#2a2a2a] shadow-xl flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border dark:border-[#2a2a2a]">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium dark:text-gray-200">Activity</span>
          <span className="text-xs text-muted-foreground dark:text-gray-400">{duration}s</span>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Static Thinking Header */}
      <div className="px-4 py-3 border-b border-border dark:border-[#2a2a2a]">
        <p className="text-sm font-medium dark:text-gray-200">Thinking</p>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {steps.map((step, idx) => (
          <div key={idx} className="mb-4">
            {step.type === 'thinking' ? (
              <p className="text-sm text-muted-foreground dark:text-gray-400 mb-2">{step.content}</p>
            ) : (
              <div className="relative group">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground dark:text-gray-400">{step.language || 'code'}</span>
                  <button
                    onClick={() => copyToClipboard(step.content)}
                    className="p-1 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Copy code"
                  >
                    <Copy className="w-3 h-3" />
                  </button>
                </div>
                <pre className="bg-secondary/50 dark:bg-[#1a1a1a] rounded p-3 text-xs overflow-x-auto border border-border dark:border-[#2a2a2a]">
                  <code className="text-foreground dark:text-gray-300 font-mono">{step.content}</code>
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
````````

## `src/app/components/AlertsPopover.tsx`

- Category: component.
- Imports: import { useState } from 'react';, import { Bell } from 'lucide-react';, import { PositionedPopover, PopoverSection, CheckRow, RadioRow, PopoverPosition } from './PositionedPopover';, import { Input } from './client/input';
- Exports: export interface AlertsPopoverProps {, export function AlertsPopover({ position = 'auto' }: AlertsPopoverProps) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from 'react';
import { Bell } from 'lucide-react';
import { PositionedPopover, PopoverSection, CheckRow, RadioRow, PopoverPosition } from './PositionedPopover';
import { Input } from './client/input';

export interface AlertsPopoverProps {
  position?: PopoverPosition;
}

export function AlertsPopover({ position = 'auto' }: AlertsPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);

  const [alerts, setAlerts] = useState({
    email: true,
    push: true,
    sms: false,
    desktop: true
  });

  const [frequency, setFrequency] = useState<'instant' | 'daily' | 'weekly'>('instant');
  const [threshold, setThreshold] = useState('10');

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTriggerEl(e.currentTarget);
    setIsOpen(!isOpen);
  };

  const toggleAlert = (key: keyof typeof alerts) => {
    setAlerts(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="flex items-center gap-2 px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] hover:bg-secondary dark:hover:bg-[#1a1a1a] transition-colors"
      >
        <Bell className="w-4 h-4" />
        <span>Alerts</span>
      </button>

      <PositionedPopover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trigger={triggerEl}
        title="Alert Settings"
        width={320}
        position={position}
      >
        <PopoverSection title="Notification Channels">
          <CheckRow
            label="Email Notifications"
            checked={alerts.email}
            onChange={() => toggleAlert('email')}
          />
          <CheckRow
            label="Push Notifications"
            checked={alerts.push}
            onChange={() => toggleAlert('push')}
          />
          <CheckRow
            label="SMS Alerts"
            checked={alerts.sms}
            onChange={() => toggleAlert('sms')}
            badge="Pro"
          />
          <CheckRow
            label="Desktop Notifications"
            checked={alerts.desktop}
            onChange={() => toggleAlert('desktop')}
          />
        </PopoverSection>

        <PopoverSection title="Frequency">
          <RadioRow
            label="Instant"
            checked={frequency === 'instant'}
            onChange={() => setFrequency('instant')}
            name="frequency"
          />
          <RadioRow
            label="Daily Digest"
            checked={frequency === 'daily'}
            onChange={() => setFrequency('daily')}
            name="frequency"
          />
          <RadioRow
            label="Weekly Summary"
            checked={frequency === 'weekly'}
            onChange={() => setFrequency('weekly')}
            name="frequency"
          />
        </PopoverSection>

        <PopoverSection title="Alert Threshold">
          <Input
            type="number"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            placeholder="Enter threshold value"
          />
        </PopoverSection>

        <div className="flex gap-2 mt-4 pt-4 border-t border-border dark:border-[#2a2a2a]">
          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg hover:bg-secondary dark:hover:bg-[#1a1a1a] transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Save
          </button>
        </div>
      </PositionedPopover>
    </>
  );
}
````````

## `src/app/components/Badge.tsx`

- Category: component.
- Imports: import { ReactNode } from 'react';
- Exports: export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variantClasses = {
    default: 'bg-secondary dark:bg-[#2a2a2a] text-foreground dark:text-gray-200',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800',
    warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800',
    danger: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800',
    info: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
````````

## `src/app/components/BookmarkButton.tsx`

- Category: component.
- Imports: import { Bookmark, BookmarkCheck } from 'lucide-react';, import { useBookmarks, Bookmark as BookmarkType } from '../contexts/BookmarkContext';, import { useToast } from './Toast';
- Exports: export function BookmarkButton({
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { useBookmarks, Bookmark as BookmarkType } from '../contexts/BookmarkContext';
import { useToast } from './Toast';

interface BookmarkButtonProps {
  type: BookmarkType['type'];
  id: string;
  channelId?: string;
  categoryId?: string;
  subjectId?: string;
  postId?: string;
  name: string;
  description?: string;
  metadata?: {
    postCount?: number;
    author?: string;
    date?: string;
  };
  className?: string;
  variant?: 'icon' | 'button';
}

export function BookmarkButton({
  type,
  id,
  channelId,
  categoryId,
  subjectId,
  postId,
  name,
  description,
  metadata,
  className = '',
  variant = 'icon',
}: BookmarkButtonProps) {
  const { isBookmarked, addBookmark, removeBookmark } = useBookmarks();
  const { showToast } = useToast();

  const bookmarked = isBookmarked(id, type);
  const bookmarkId = `${type}-${channelId || ''}-${categoryId || ''}-${subjectId || ''}-${postId || ''}`;

  const handleToggleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (bookmarked) {
      removeBookmark(bookmarkId);
      showToast('success', `Removed from bookmarks`);
    } else {
      addBookmark({
        type,
        channelId,
        categoryId,
        subjectId,
        postId,
        name,
        description,
        metadata,
      });
      showToast('success', `Added to bookmarks`);
    }
  };

  if (variant === 'button') {
    return (
      <button
        onClick={handleToggleBookmark}
        className={`flex items-center gap-2 px-3 py-2 border border-border dark:border-[#2a2a2a] rounded-lg hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors text-sm ${className} ${
          bookmarked ? 'bg-primary/10 border-primary/30 text-primary' : ''
        }`}
      >
        {bookmarked ? (
          <>
            <BookmarkCheck className="w-4 h-4" />
            <span>Bookmarked</span>
          </>
        ) : (
          <>
            <Bookmark className="w-4 h-4" />
            <span>Bookmark</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggleBookmark}
      className={`p-2 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded-lg transition-colors ${className}`}
      title={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
    >
      {bookmarked ? (
        <BookmarkCheck className="w-5 h-5 fill-primary text-primary" />
      ) : (
        <Bookmark className="w-5 h-5 text-muted-foreground dark:text-gray-400" />
      )}
    </button>
  );
}
````````

## `src/app/components/BottomNav.tsx`

- Category: component.
- Imports: import { Link, useLocation } from "react-router";, import { Home, Compass, Plus, Clock, User } from "lucide-react";
- Exports: export function BottomNav({ onCreateClick }: BottomNavProps) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { Link, useLocation } from "react-router";
import { Home, Compass, Plus, Clock, User } from "lucide-react";

interface BottomNavProps {
  onCreateClick?: () => void;
}

export function BottomNav({ onCreateClick }: BottomNavProps) {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Compass, label: "Explore", path: "/explore" },
    { icon: Plus, label: "Create", onClick: onCreateClick },
    { icon: Clock, label: "Activity", path: "/activity" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#0f0f0f] border-t border-border dark:border-[#2a2a2a] z-50">
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path && location.pathname === item.path;

          if (item.onClick) {
            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className="flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg text-muted-foreground dark:text-gray-400"
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={item.label}
              to={item.path!}
              className={`flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all ${
                isActive ? "text-primary" : "text-muted-foreground dark:text-gray-400"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
````````

## `src/app/components/Breadcrumb.tsx`

- Category: component.
- Imports: import { Link } from "react-router";, import { ChevronRight } from "lucide-react";
- Exports: export function Breadcrumb({ items }: BreadcrumbProps) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {index > 0 && <ChevronRight className="w-4 h-4" />}
          {item.path ? (
            <Link
              to={item.path}
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
````````

## `src/app/components/Button.tsx`

- Category: component.
- Imports: import { ReactNode } from "react";
- Exports: export function Button({
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "outline" | "transparent" | "icon" | "danger";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: "button" | "submit" | "reset";
  iconOnly?: boolean;
}

export function Button({
  children,
  onClick,
  variant = "primary",
  size = "sm",
  className = "",
  disabled = false,
  loading = false,
  type = "button",
  iconOnly = false,
}: ButtonProps) {
  const baseStyles = "rounded-lg transition-all font-medium inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 shadow-sm hover:shadow-md disabled:hover:bg-primary dark:bg-primary dark:text-white dark:hover:bg-primary/90",
    secondary: "bg-secondary text-foreground hover:bg-secondary/80 border border-border disabled:hover:bg-secondary dark:bg-[#2a2a2a] dark:border-[#3a3a3a] dark:text-gray-200 dark:hover:bg-[#3a3a3a]",
    ghost: "bg-transparent text-foreground hover:bg-secondary disabled:hover:bg-transparent dark:text-gray-200 dark:hover:bg-[#2a2a2a]",
    outline: "bg-transparent border border-border text-foreground hover:bg-secondary hover:border-primary/50 disabled:hover:bg-transparent dark:border-[#3a3a3a] dark:text-gray-200 dark:hover:bg-[#2a2a2a]",
    transparent: "bg-transparent text-foreground hover:bg-primary/10 disabled:hover:bg-transparent dark:text-gray-200 dark:hover:bg-primary/20",
    icon: "bg-transparent text-foreground hover:bg-secondary disabled:hover:bg-transparent p-2 dark:text-gray-200 dark:hover:bg-[#2a2a2a]",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm hover:shadow-md disabled:hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800",
  };

  const sizes = iconOnly || variant === 'icon' ? {
    sm: "w-9 h-9",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  } : {
    sm: "px-3 py-2 h-9 text-sm",
    md: "px-4 py-2.5 h-10 text-base",
    lg: "px-6 py-3 h-12 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading && (
        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      )}
      {children}
    </button>
  );
}
````````

## `src/app/components/Card.tsx`

- Category: component.
- Imports: import { ReactNode } from "react";
- Exports: export function Card({ children, className = "", onClick, padding = 'sm' }: CardProps) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ children, className = "", onClick, padding = 'sm' }: CardProps) {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-2',
    md: 'p-3',
    lg: 'p-4',
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-lg hover:shadow-sm transition-shadow ${
        onClick ? "cursor-pointer" : ""
      } ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </div>
  );
}
````````

## `src/app/components/ChatMessage.tsx`

- Category: component.
- Imports: import { useState, ReactNode } from "react";, import { User, Bot, ChevronDown, ChevronUp, Check, X, ChevronRight } from "lucide-react";, import { Button } from "./Button";, import { Card } from "./Card";, import { FileListViewer, FileAttachment } from "./FileViewer";
- Exports: export type { FileAttachment };, export interface ThinkingStep {, export interface ConfirmationAction {, export interface DashboardMetric {, export interface Dashboard {, export function ChatMessage({
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, ReactNode } from "react";
import { User, Bot, ChevronDown, ChevronUp, Check, X, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { Card } from "./Card";
import { FileListViewer, FileAttachment } from "./FileViewer";

// Re-export FileAttachment for convenience
export type { FileAttachment };

export interface ThinkingStep {
  title: string;
  content: string;
  duration?: string;
}

export interface ConfirmationAction {
  question: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface DashboardMetric {
  label: string;
  value: string;
  change: string;
}

export interface Dashboard {
  title: string;
  metrics: DashboardMetric[];
}

interface ChatMessageProps {
  sender: 'user' | 'ai';
  content: string;
  timestamp?: string;
  thinking?: ThinkingStep[];
  showThinking?: boolean;
  inlineThinking?: string;
  confirmation?: ConfirmationAction;
  avatar?: string;
  thinkingDuration?: number;
  onThinkingClick?: () => void;
  dashboard?: Dashboard;
  attachments?: FileAttachment[];
}

export function ChatMessage({
  sender,
  content,
  timestamp,
  thinking,
  showThinking = false,
  inlineThinking,
  confirmation,
  avatar,
  thinkingDuration,
  onThinkingClick,
  dashboard,
  attachments,
}: ChatMessageProps) {
  const [isThinkingExpanded, setIsThinkingExpanded] = useState(showThinking);
  const [showConfirmation, setShowConfirmation] = useState(!!confirmation);

  return (
    <div className={`flex gap-4 ${sender === 'user' ? 'flex-row-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
        sender === 'user' ? 'bg-primary/10' : 'bg-gradient-to-br from-primary to-primary/80'
      }`}>
        {avatar ? (
          <img src={avatar} alt={sender} className="w-full h-full rounded-full" />
        ) : sender === 'user' ? (
          <User className="w-5 h-5 text-primary" />
        ) : (
          <Bot className="w-5 h-5 text-white" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex-1 max-w-3xl space-y-3 ${sender === 'user' ? 'items-end' : 'items-start'}`}>
        {/* AI Thinking Duration Link */}
        {sender === 'ai' && thinkingDuration && onThinkingClick && (
          <button
            onClick={onThinkingClick}
            className="flex items-center gap-1 text-xs text-muted-foreground dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
          >
            <span>Thought for {thinkingDuration}s</span>
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
        {/* Thinking Steps (ChatGPT-like expandable) */}
        {thinking && thinking.length > 0 && (
          <div className="w-full bg-secondary/50 dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-xl overflow-hidden">
            <button
              onClick={() => setIsThinkingExpanded(!isThinkingExpanded)}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium dark:text-gray-200">
                  {isThinkingExpanded ? 'Hide thinking' : 'Show thinking'}
                </span>
                <span className="text-xs text-muted-foreground dark:text-gray-400">
                  {thinking.length} {thinking.length === 1 ? 'step' : 'steps'}
                </span>
              </div>
              {isThinkingExpanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>

            {isThinkingExpanded && (
              <div className="border-t border-border dark:border-[#2a2a2a] p-4 space-y-3 bg-white dark:bg-[#0f0f0f]">
                {thinking.map((step, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary">
                        {index + 1}
                      </div>
                      <h4 className="text-sm font-medium dark:text-gray-200">{step.title}</h4>
                      {step.duration && (
                        <span className="text-xs text-muted-foreground dark:text-gray-400">({step.duration})</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground dark:text-gray-400 pl-8">{step.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Inline Thinking (subtle) */}
        {inlineThinking && (
          <div className="w-full px-4 py-2 bg-primary/5 dark:bg-primary/10 border-l-4 border-primary rounded-r-lg">
            <p className="text-xs text-muted-foreground dark:text-gray-400 italic">
              💭 {inlineThinking}
            </p>
          </div>
        )}

        {/* File Attachments */}
        {attachments && attachments.length > 0 && (
          <div className={`w-full ${sender === 'user' ? 'ml-auto' : ''}`}>
            <FileListViewer files={attachments} />
          </div>
        )}

        {/* Main Message */}
        {content && (
          <div className={`rounded-2xl px-4 py-3 ${
            sender === 'user'
              ? 'bg-primary text-white ml-auto'
              : 'bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a]'
          }`}>
            <p className={`text-sm whitespace-pre-wrap leading-relaxed ${sender === 'ai' ? 'dark:text-gray-200' : ''}`}>{content}</p>
          </div>
        )}

        {/* Confirmation Dialog (in message) */}
        {showConfirmation && confirmation && (
          <div className="w-full bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
            <p className="text-sm font-medium text-yellow-900 dark:text-yellow-200 mb-3">
              ⚠️ {confirmation.question}
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                onClick={() => {
                  confirmation.onConfirm();
                  setShowConfirmation(false);
                }}
                className="gap-2"
              >
                <Check className="w-4 h-4" />
                Confirm
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  confirmation.onCancel();
                  setShowConfirmation(false);
                }}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </div>
          </div>
        )}

        {/* Dashboard Metrics */}
        {sender === 'ai' && dashboard && (
          <Card className="mt-3">
            <h3 className="font-semibold mb-4 dark:text-gray-100">{dashboard.title}</h3>
            <div className="grid grid-cols-2 gap-4">
              {dashboard.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="p-4 border border-border dark:border-[#2a2a2a] rounded-lg bg-secondary/30 dark:bg-[#0f0f0f]"
                >
                  <div className="text-sm text-muted-foreground dark:text-gray-400">
                    {metric.label}
                  </div>
                  <div className="text-2xl font-bold mt-1 dark:text-gray-100">
                    {metric.value}
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400 mt-1">
                    {metric.change}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Timestamp */}
        {timestamp && (
          <p className={`text-xs text-muted-foreground dark:text-gray-400 ${
            sender === 'user' ? 'text-right' : 'text-left'
          }`}>
            {timestamp}
          </p>
        )}
      </div>
    </div>
  );
}
````````

## `src/app/components/ColumnsPopover.tsx`

- Category: component.
- Imports: import { useState } from 'react';, import { Columns } from 'lucide-react';, import { PositionedPopover, PopoverSection, CheckRow, PopoverPosition } from './PositionedPopover';
- Exports: export interface ColumnsPopoverProps {, export function ColumnsPopover({ position = 'auto' }: ColumnsPopoverProps) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from 'react';
import { Columns } from 'lucide-react';
import { PositionedPopover, PopoverSection, CheckRow, PopoverPosition } from './PositionedPopover';

export interface ColumnsPopoverProps {
  position?: PopoverPosition;
}

export function ColumnsPopover({ position = 'auto' }: ColumnsPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);

  const [columns, setColumns] = useState({
    id: true,
    name: true,
    email: true,
    status: true,
    createdAt: true,
    updatedAt: false,
    actions: true,
    tags: false,
    priority: true
  });

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTriggerEl(e.currentTarget);
    setIsOpen(!isOpen);
  };

  const toggleColumn = (key: keyof typeof columns) => {
    setColumns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const visibleCount = Object.values(columns).filter(Boolean).length;

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="flex items-center gap-2 px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] hover:bg-secondary dark:hover:bg-[#1a1a1a] transition-colors"
      >
        <Columns className="w-4 h-4" />
        <span>Columns</span>
      </button>

      <PositionedPopover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trigger={triggerEl}
        title="Manage Columns"
        width={280}
        position={position}
      >
        <PopoverSection>
          <CheckRow
            label="ID"
            checked={columns.id}
            onChange={() => toggleColumn('id')}
            disabled
          />
          <CheckRow
            label="Name"
            checked={columns.name}
            onChange={() => toggleColumn('name')}
          />
          <CheckRow
            label="Email"
            checked={columns.email}
            onChange={() => toggleColumn('email')}
          />
          <CheckRow
            label="Status"
            checked={columns.status}
            onChange={() => toggleColumn('status')}
            badge="New"
          />
          <CheckRow
            label="Created At"
            checked={columns.createdAt}
            onChange={() => toggleColumn('createdAt')}
          />
          <CheckRow
            label="Updated At"
            checked={columns.updatedAt}
            onChange={() => toggleColumn('updatedAt')}
          />
          <CheckRow
            label="Actions"
            checked={columns.actions}
            onChange={() => toggleColumn('actions')}
          />
          <CheckRow
            label="Tags"
            checked={columns.tags}
            onChange={() => toggleColumn('tags')}
          />
          <CheckRow
            label="Priority"
            checked={columns.priority}
            onChange={() => toggleColumn('priority')}
          />
        </PopoverSection>

        <div className="mt-4 pt-4 border-t border-border dark:border-[#2a2a2a] text-sm text-muted-foreground dark:text-gray-400">
          {visibleCount} of {Object.keys(columns).length} columns visible
        </div>
      </PositionedPopover>
    </>
  );
}
````````

## `src/app/components/ConfirmDialog.tsx`

- Category: component.
- Imports: import { ReactNode } from "react";, import { AlertCircle, X } from "lucide-react";, import { Button } from "./Button";
- Exports: export function ConfirmDialog({
- Reuse guidance: Use this for create/update/delete flows, confirmations, and risky operation approval gates.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { ReactNode } from "react";
import { AlertCircle, X } from "lucide-react";
import { Button } from "./Button";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
  icon?: ReactNode;
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = 'warning',
  icon,
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const colors = {
    danger: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200',
    warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-200',
    info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200',
  };

  const iconColors = {
    danger: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl w-full max-w-md">
        <div className={`p-6 border-b ${colors[variant]}`}>
          <div className="flex items-start gap-4">
            <div className={`p-2 rounded-full bg-white dark:bg-[#0f0f0f] ${iconColors[variant]}`}>
              {icon || <AlertCircle className="w-6 h-6" />}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{title}</h3>
              <p className="text-sm mt-1 opacity-90">{message}</p>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-white/50 dark:hover:bg-black/20 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            {cancelText}
          </Button>
          <Button onClick={onConfirm}>
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
````````

## `src/app/components/ContextMenu.tsx`

- Category: component.
- Imports: import { ReactNode, useEffect, useRef, useState } from "react";
- Exports: export interface ContextMenuItem {, export interface ContextMenuProps {, export function ContextMenu({ items, x, y, onClose }: ContextMenuProps) {, export interface UseContextMenuOptions<T = any> {, export function useContextMenu<T = any>({ getMenuItems }: UseContextMenuOptions<T>) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { ReactNode, useEffect, useRef, useState } from "react";

export interface ContextMenuItem {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  variant?: 'default' | 'primary' | 'destructive';
  disabled?: boolean;
  divider?: boolean;
}

export interface ContextMenuProps {
  items: ContextMenuItem[];
  x: number;
  y: number;
  onClose: () => void;
}

export function ContextMenu({ items, x, y, onClose }: ContextMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x, y });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Adjust position if menu would go off screen
    if (menuRef.current) {
      const rect = menuRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let adjustedX = x;
      let adjustedY = y;

      if (x + rect.width > viewportWidth) {
        adjustedX = viewportWidth - rect.width - 10;
      }

      if (y + rect.height > viewportHeight) {
        adjustedY = viewportHeight - rect.height - 10;
      }

      if (adjustedX !== x || adjustedY !== y) {
        setPosition({ x: adjustedX, y: adjustedY });
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [x, y, onClose]);

  const handleItemClick = (item: ContextMenuItem) => {
    if (!item.disabled) {
      item.onClick();
      onClose();
    }
  };

  return (
    <div
      ref={menuRef}
      className="fixed z-50 min-w-[200px] bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-lg shadow-lg py-1"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      {items.map((item, index) => (
        <div key={index}>
          {item.divider && <div className="my-1 border-t border-border dark:border-[#2a2a2a]" />}
          <button
            onClick={() => handleItemClick(item)}
            disabled={item.disabled}
            className={`w-full px-4 py-2 text-left text-sm flex items-center gap-2 transition-colors ${
              item.disabled
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-secondary dark:hover:bg-[#2a2a2a] cursor-pointer'
            } ${
              item.variant === 'primary'
                ? 'text-primary'
                : item.variant === 'destructive'
                ? 'text-destructive'
                : 'dark:text-gray-200'
            }`}
          >
            {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
            <span>{item.label}</span>
          </button>
        </div>
      ))}
    </div>
  );
}

export interface UseContextMenuOptions<T = any> {
  getMenuItems: (target: T) => ContextMenuItem[];
}

export function useContextMenu<T = any>({ getMenuItems }: UseContextMenuOptions<T>) {
  const [contextMenu, setContextMenu] = useState<{
    x: number;
    y: number;
    target: T;
  } | null>(null);

  const handleContextMenu = (event: React.MouseEvent, target: T) => {
    event.preventDefault();
    event.stopPropagation();
    setContextMenu({
      x: event.clientX,
      y: event.clientY,
      target,
    });
  };

  const closeContextMenu = () => {
    setContextMenu(null);
  };

  const ContextMenuComponent = contextMenu ? (
    <ContextMenu
      items={getMenuItems(contextMenu.target)}
      x={contextMenu.x}
      y={contextMenu.y}
      onClose={closeContextMenu}
    />
  ) : null;

  return {
    handleContextMenu,
    closeContextMenu,
    ContextMenuComponent,
    isOpen: !!contextMenu,
  };
}
````````

## `src/app/components/CreateModal.tsx`

- Category: component.
- Imports: import { useState } from "react";, import { X, Radio, FolderOpen, BookOpen, FileText } from "lucide-react";, import { Button } from "./Button";, import { InputField, TextareaField, SelectField } from "./FormField";, import { useToast } from "./Toast";, import { channels, categories, subjects } from "../data/mockData";
- Exports: export function CreateModal({ isOpen, onClose }: CreateModalProps) {
- Reuse guidance: Use this for create/update/delete flows, confirmations, and risky operation approval gates.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from "react";
import { X, Radio, FolderOpen, BookOpen, FileText } from "lucide-react";
import { Button } from "./Button";
import { InputField, TextareaField, SelectField } from "./FormField";
import { useToast } from "./Toast";
import { channels, categories, subjects } from "../data/mockData";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CreateType = 'channel' | 'category' | 'subject' | 'post' | null;

interface FormData {
  title: string;
  description: string;
  content: string;
  channelId: string;
  categoryId: string;
  subjectId: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  content?: string;
  channelId?: string;
  categoryId?: string;
  subjectId?: string;
}

export function CreateModal({ isOpen, onClose }: CreateModalProps) {
  const { showToast } = useToast();
  const [selectedType, setSelectedType] = useState<CreateType>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    title: '',
    description: '',
    content: '',
    channelId: '',
    categoryId: '',
    subjectId: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  if (!isOpen) return null;

  const createOptions = [
    {
      type: 'channel' as const,
      icon: Radio,
      title: 'Channel',
      description: 'A top-level workspace for organizing knowledge',
    },
    {
      type: 'category' as const,
      icon: FolderOpen,
      title: 'Category',
      description: 'Group related subjects together',
    },
    {
      type: 'subject' as const,
      icon: BookOpen,
      title: 'Subject',
      description: 'A focused topic with posts',
    },
    {
      type: 'post' as const,
      icon: FileText,
      title: 'Post',
      description: 'Create content within a subject',
    },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (selectedType === 'post' && !formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    if ((selectedType === 'category' || selectedType === 'subject' || selectedType === 'post') && !formData.channelId) {
      newErrors.channelId = 'Please select a channel';
    }

    if ((selectedType === 'subject' || selectedType === 'post') && !formData.categoryId) {
      newErrors.categoryId = 'Please select a category';
    }

    if (selectedType === 'post' && !formData.subjectId) {
      newErrors.subjectId = 'Please select a subject';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      showToast('error', 'Please fix the errors before submitting');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      showToast('success', `${selectedType} created successfully!`);
      setIsSubmitting(false);
      handleClose();
    }, 1500);
  };

  const handleClose = () => {
    setSelectedType(null);
    setFormData({
      title: '',
      description: '',
      content: '',
      channelId: '',
      categoryId: '',
      subjectId: '',
    });
    setErrors({});
    onClose();
  };

  const selectedCategories = formData.channelId
    ? categories.filter(c => c.channelId === formData.channelId)
    : [];

  const selectedSubjects = formData.categoryId
    ? subjects.filter(s => s.categoryId === formData.categoryId)
    : [];

  const isFormValid = () => {
    if (!formData.title.trim() || !formData.description.trim()) return false;
    if (selectedType === 'post' && !formData.content.trim()) return false;
    if ((selectedType === 'category' || selectedType === 'subject' || selectedType === 'post') && !formData.channelId) return false;
    if ((selectedType === 'subject' || selectedType === 'post') && !formData.categoryId) return false;
    if (selectedType === 'post' && !formData.subjectId) return false;
    return true;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-border dark:border-[#2a2a2a]">
          <h2 className="text-xl font-semibold dark:text-gray-200">
            {selectedType ? `Create ${selectedType}` : 'What do you want to create?'}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {!selectedType ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {createOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.type}
                    onClick={() => setSelectedType(option.type)}
                    className="flex flex-col items-start gap-3 p-4 border-2 border-border dark:border-[#2a2a2a] rounded-xl hover:border-primary/40 hover:bg-primary/5 dark:hover:bg-primary/10 transition-all text-left"
                  >
                    <div className="p-3 bg-primary/10 rounded-xl">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold dark:text-gray-200 mb-1">{option.title}</h3>
                      <p className="text-sm text-muted-foreground dark:text-gray-400">
                        {option.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-4">
              <button
                onClick={() => setSelectedType(null)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                ← Back to options
              </button>

              <div className="space-y-4">
                {(selectedType === 'category' || selectedType === 'subject' || selectedType === 'post') && (
                  <SelectField
                    label="Channel"
                    required
                    value={formData.channelId}
                    onChange={(value) => {
                      setFormData({ ...formData, channelId: value, categoryId: '', subjectId: '' });
                      setErrors({ ...errors, channelId: undefined });
                    }}
                    options={channels.map(c => ({ value: c.id, label: c.name }))}
                    error={errors.channelId}
                    helperText="Select the channel where this will be created"
                  />
                )}

                {(selectedType === 'subject' || selectedType === 'post') && (
                  <SelectField
                    label="Category"
                    required
                    value={formData.categoryId}
                    onChange={(value) => {
                      setFormData({ ...formData, categoryId: value, subjectId: '' });
                      setErrors({ ...errors, categoryId: undefined });
                    }}
                    options={selectedCategories.map(c => ({ value: c.id, label: c.name }))}
                    error={errors.categoryId}
                    helperText="Select the category for organization"
                  />
                )}

                {selectedType === 'post' && (
                  <SelectField
                    label="Subject"
                    required
                    value={formData.subjectId}
                    onChange={(value) => {
                      setFormData({ ...formData, subjectId: value });
                      setErrors({ ...errors, subjectId: undefined });
                    }}
                    options={selectedSubjects.map(s => ({ value: s.id, label: s.name }))}
                    error={errors.subjectId}
                    helperText="Select the subject this post belongs to"
                  />
                )}

                <InputField
                  label="Title"
                  required
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({ ...formData, title: e.target.value });
                    setErrors({ ...errors, title: undefined });
                  }}
                  placeholder={`Enter ${selectedType} title...`}
                  error={errors.title}
                  helperText={`Choose a clear, descriptive title for your ${selectedType}`}
                />

                <TextareaField
                  label="Description"
                  required
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    setErrors({ ...errors, description: undefined });
                  }}
                  placeholder={`Describe this ${selectedType}...`}
                  rows={4}
                  error={errors.description}
                  helperText="Provide a brief description to help others understand"
                />

                {selectedType === 'post' && (
                  <TextareaField
                    label="Content"
                    required
                    value={formData.content}
                    onChange={(e) => {
                      setFormData({ ...formData, content: e.target.value });
                      setErrors({ ...errors, content: undefined });
                    }}
                    placeholder="Write your content using markdown..."
                    rows={8}
                    error={errors.content}
                    helperText="Use markdown for formatting"
                  />
                )}
              </div>
            </div>
          )}
        </div>

        {selectedType && (
          <div className="flex items-center justify-between gap-3 p-6 border-t border-border dark:border-[#2a2a2a] bg-secondary/30 dark:bg-[#0f0f0f]">
            <p className="text-sm text-muted-foreground dark:text-gray-400">
              {isFormValid() ? 'Ready to create' : 'Fill in all required fields'}
            </p>
            <div className="flex gap-3">
              <Button variant="secondary" onClick={() => setSelectedType(null)} disabled={isSubmitting}>
                Cancel
              </Button>
              <Button onClick={handleSubmit} disabled={isSubmitting || !isFormValid()}>
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  `Create ${selectedType}`
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
````````

## `src/app/components/DataTable.tsx`

- Category: component.
- Imports: import { useState, useCallback } from "react";, import { MoreVertical } from "lucide-react";, import { DndProvider, useDrag, useDrop } from "react-dnd";, import { HTML5Backend } from "react-dnd-html5-backend";
- Exports: export interface Column {, export interface RowData {, export function DataTable({
- Reuse guidance: Use this for queryable records, database viewers, process rows, and entity management lists.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, useCallback } from "react";
import { MoreVertical } from "lucide-react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export interface Column {
  key: string;
  label: string;
  width?: string;
}

export interface RowData {
  id: string;
  [key: string]: any;
}

interface DataTableProps {
  columns: Column[];
  data: RowData[];
  onRowClick?: (row: RowData) => void;
  onReorder?: (newData: RowData[]) => void;
  draggable?: boolean;
  actions?: (row: RowData) => React.ReactNode;
}

interface DraggableRowProps {
  row: RowData;
  index: number;
  columns: Column[];
  moveRow: (dragIndex: number, hoverIndex: number) => void;
  onRowClick?: (row: RowData) => void;
  actions?: (row: RowData) => React.ReactNode;
}

function DraggableRow({ row, index, columns, moveRow, onRowClick, actions }: DraggableRowProps) {
  const [{ isDragging }, drag] = useDrag({
    type: 'ROW',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'ROW',
    hover: (item: { index: number }) => {
      if (item.index !== index) {
        moveRow(item.index, index);
        item.index = index;
      }
    },
  });

  return (
    <tr
      ref={(node) => drag(drop(node))}
      onClick={() => onRowClick?.(row)}
      className={`border-b border-border dark:border-[#2a2a2a] hover:bg-secondary/50 dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {columns.map((column) => (
        <td key={column.key} className="px-4 py-3 text-sm dark:text-gray-300">
          {row[column.key]}
        </td>
      ))}
      {actions && (
        <td className="px-4 py-3 text-sm">
          <div className="flex items-center justify-end gap-2">
            {actions(row)}
          </div>
        </td>
      )}
    </tr>
  );
}

export function DataTable({
  columns,
  data: initialData,
  onRowClick,
  onReorder,
  draggable = false,
  actions,
}: DataTableProps) {
  const [data, setData] = useState(initialData);

  const moveRow = useCallback((dragIndex: number, hoverIndex: number) => {
    const newData = [...data];
    const [removed] = newData.splice(dragIndex, 1);
    newData.splice(hoverIndex, 0, removed);
    setData(newData);
    onReorder?.(newData);
  }, [data, onReorder]);

  const TableContent = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-border dark:border-[#2a2a2a] bg-secondary/30 dark:bg-[#1a1a1a]">
            {columns.map((column) => (
              <th
                key={column.key}
                className="px-4 py-3 text-left text-sm font-medium text-muted-foreground dark:text-gray-400"
                style={{ width: column.width }}
              >
                {column.label}
              </th>
            ))}
            {actions && (
              <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground dark:text-gray-400">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {draggable ? (
            data.map((row, index) => (
              <DraggableRow
                key={row.id}
                row={row}
                index={index}
                columns={columns}
                moveRow={moveRow}
                onRowClick={onRowClick}
                actions={actions}
              />
            ))
          ) : (
            data.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick?.(row)}
                className="border-b border-border dark:border-[#2a2a2a] hover:bg-secondary/50 dark:hover:bg-[#1a1a1a] transition-colors cursor-pointer"
              >
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 text-sm dark:text-gray-300">
                    {row[column.key]}
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-3 text-sm">
                    <div className="flex items-center justify-end gap-2">
                      {actions(row)}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );

  return draggable ? (
    <DndProvider backend={HTML5Backend}>
      <TableContent />
    </DndProvider>
  ) : (
    <TableContent />
  );
}
````````

## `src/app/components/DependentSelect.tsx`

- Category: component.
- Imports: import { useState, useEffect } from "react";
- Exports: export interface SelectOption {, export interface DependentSelectProps {, export function DependentSelect({, export interface CascadingFormProps {, export function CascadingFormExample({ onSubmit }: CascadingFormProps) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, useEffect } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface DependentSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[] | ((parentValue: string) => SelectOption[] | Promise<SelectOption[]>);
  dependsOn?: string;
  placeholder?: string;
  loading?: boolean;
  disabled?: boolean;
  required?: boolean;
  error?: string;
}

export function DependentSelect({
  label,
  value,
  onChange,
  options,
  dependsOn,
  placeholder = "Select an option",
  loading = false,
  disabled = false,
  required = false,
  error,
}: DependentSelectProps) {
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadOptions = async () => {
      if (typeof options === 'function') {
        if (!dependsOn) {
          // If depends on a parent but parent is not selected yet
          setSelectOptions([]);
          return;
        }

        setIsLoading(true);
        try {
          const result = options(dependsOn);
          const resolvedOptions = result instanceof Promise ? await result : result;
          setSelectOptions(resolvedOptions);
        } catch (err) {
          console.error('Failed to load options:', err);
          setSelectOptions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSelectOptions(options);
      }
    };

    loadOptions();
  }, [options, dependsOn]);

  const isDisabled = disabled || (typeof options === 'function' && !dependsOn) || isLoading;

  return (
    <div>
      <label className="block text-sm font-medium mb-2">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isDisabled}
        className={`w-full px-3 py-2 border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 ${
          error ? 'border-destructive' : 'border-border'
        } ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <option value="">
          {isLoading || loading ? 'Loading...' : placeholder}
        </option>
        {selectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );
}

// Example cascading form component
export interface CascadingFormProps {
  onSubmit: (data: Record<string, string>) => void;
}

export function CascadingFormExample({ onSubmit }: CascadingFormProps) {
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  // Mock data - in real app, this would come from API
  const countries: SelectOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' },
  ];

  const getStates = (countryCode: string): SelectOption[] => {
    const statesByCountry: Record<string, SelectOption[]> = {
      us: [
        { value: 'ca', label: 'California' },
        { value: 'ny', label: 'New York' },
        { value: 'tx', label: 'Texas' },
      ],
      ca: [
        { value: 'on', label: 'Ontario' },
        { value: 'qc', label: 'Quebec' },
        { value: 'bc', label: 'British Columbia' },
      ],
      uk: [
        { value: 'eng', label: 'England' },
        { value: 'sco', label: 'Scotland' },
        { value: 'wal', label: 'Wales' },
      ],
    };
    return statesByCountry[countryCode] || [];
  };

  const getCities = async (stateCode: string): Promise<SelectOption[]> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const citiesByState: Record<string, SelectOption[]> = {
          ca: [
            { value: 'la', label: 'Los Angeles' },
            { value: 'sf', label: 'San Francisco' },
            { value: 'sd', label: 'San Diego' },
          ],
          ny: [
            { value: 'nyc', label: 'New York City' },
            { value: 'buf', label: 'Buffalo' },
            { value: 'roc', label: 'Rochester' },
          ],
          on: [
            { value: 'tor', label: 'Toronto' },
            { value: 'ott', label: 'Ottawa' },
            { value: 'mis', label: 'Mississauga' },
          ],
        };
        resolve(citiesByState[stateCode] || []);
      }, 500);
    });
  };

  const handleCountryChange = (value: string) => {
    setCountry(value);
    setState(''); // Reset dependent fields
    setCity('');
  };

  const handleStateChange = (value: string) => {
    setState(value);
    setCity(''); // Reset dependent field
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ country, state, city });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DependentSelect
        label="Country"
        value={country}
        onChange={handleCountryChange}
        options={countries}
        placeholder="Select a country"
        required
      />

      <DependentSelect
        label="State/Province"
        value={state}
        onChange={handleStateChange}
        options={getStates}
        dependsOn={country}
        placeholder="Select a state"
        required
      />

      <DependentSelect
        label="City"
        value={city}
        onChange={setCity}
        options={getCities}
        dependsOn={state}
        placeholder="Select a city"
        required
      />
    </form>
  );
}
````````

## `src/app/components/DraggableTable.tsx`

- Category: component.
- Imports: import { useState, useEffect, ReactNode } from "react";, import { GripVertical, ChevronUp, ChevronDown, Settings } from "lucide-react";
- Exports: export interface TableColumn<T> {, export interface TableAction<T> {, export interface DraggableTableProps<T> {, export function DraggableTable<T>({
- Reuse guidance: Use this for queryable records, database viewers, process rows, and entity management lists.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, useEffect, ReactNode } from "react";
import { GripVertical, ChevronUp, ChevronDown, Settings } from "lucide-react";

export interface TableColumn<T> {
  id: string;
  header: string;
  accessor: (row: T) => ReactNode;
  width?: number;
  sortable?: boolean;
  resizable?: boolean;
}

export interface TableAction<T> {
  label: string;
  icon?: ReactNode;
  onClick: (row: T) => void;
  variant?: 'primary' | 'secondary' | 'destructive';
}

export interface DraggableTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  actions?: TableAction<T>[];
  rowKey: (row: T) => string;
  storageKey?: string;
  draggableRows?: boolean;
  resizableColumns?: boolean;
  onRowOrderChange?: (newData: T[]) => void;
  onRowContextMenu?: (event: React.MouseEvent, row: T) => void;
}

export function DraggableTable<T>({
  columns: initialColumns,
  data: initialData,
  actions,
  rowKey,
  storageKey = 'table-state',
  draggableRows = false,
  resizableColumns = false,
  onRowOrderChange,
  onRowContextMenu,
}: DraggableTableProps<T>) {
  const [data, setData] = useState(initialData);
  const [columns, setColumns] = useState(initialColumns);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const [columnOrder, setColumnOrder] = useState<string[]>(initialColumns.map(c => c.id));
  const [sortConfig, setSortConfig] = useState<{ column: string; direction: 'asc' | 'desc' } | null>(null);
  const [draggedRow, setDraggedRow] = useState<number | null>(null);
  const [draggedColumn, setDraggedColumn] = useState<string | null>(null);
  const [resizingColumn, setResizingColumn] = useState<string | null>(null);
  const [resizeStartX, setResizeStartX] = useState(0);
  const [resizeStartWidth, setResizeStartWidth] = useState(0);

  // Load state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem(storageKey);
    if (savedState) {
      try {
        const { columnWidths: savedWidths, columnOrder: savedOrder, sortConfig: savedSort } = JSON.parse(savedState);
        if (savedWidths) setColumnWidths(savedWidths);
        if (savedOrder) setColumnOrder(savedOrder);
        if (savedSort) setSortConfig(savedSort);
      } catch (err) {
        console.error('Failed to load table state:', err);
      }
    }
  }, [storageKey]);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem(
      storageKey,
      JSON.stringify({ columnWidths, columnOrder, sortConfig })
    );
  }, [columnWidths, columnOrder, sortConfig, storageKey]);

  // Update data when initialData changes
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  // Sort data
  const sortedData = sortConfig
    ? [...data].sort((a, b) => {
        const column = columns.find(c => c.id === sortConfig.column);
        if (!column) return 0;

        const aValue = String(column.accessor(a));
        const bValue = String(column.accessor(b));

        if (sortConfig.direction === 'asc') {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      })
    : data;

  // Row drag handlers
  const handleRowDragStart = (index: number) => {
    setDraggedRow(index);
  };

  const handleRowDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedRow === null || draggedRow === index) return;

    const newData = [...data];
    const draggedItem = newData[draggedRow];
    newData.splice(draggedRow, 1);
    newData.splice(index, 0, draggedItem);

    setData(newData);
    setDraggedRow(index);
  };

  const handleRowDragEnd = () => {
    setDraggedRow(null);
    onRowOrderChange?.(data);
  };

  // Column drag handlers
  const handleColumnDragStart = (columnId: string) => {
    setDraggedColumn(columnId);
  };

  const handleColumnDragOver = (e: React.DragEvent, targetColumnId: string) => {
    e.preventDefault();
    if (!draggedColumn || draggedColumn === targetColumnId) return;

    const newOrder = [...columnOrder];
    const draggedIndex = newOrder.indexOf(draggedColumn);
    const targetIndex = newOrder.indexOf(targetColumnId);

    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedColumn);

    setColumnOrder(newOrder);
  };

  const handleColumnDragEnd = () => {
    setDraggedColumn(null);
  };

  // Column resize handlers
  const handleResizeStart = (e: React.MouseEvent, columnId: string) => {
    e.preventDefault();
    setResizingColumn(columnId);
    setResizeStartX(e.clientX);
    setResizeStartWidth(columnWidths[columnId] || 150);
  };

  const handleResizeMove = (e: React.MouseEvent) => {
    if (!resizingColumn) return;

    const diff = e.clientX - resizeStartX;
    const newWidth = Math.max(50, resizeStartWidth + diff);

    setColumnWidths({
      ...columnWidths,
      [resizingColumn]: newWidth,
    });
  };

  const handleResizeEnd = () => {
    setResizingColumn(null);
  };

  // Sort handler
  const handleSort = (columnId: string) => {
    const column = columns.find(c => c.id === columnId);
    if (!column?.sortable) return;

    setSortConfig(current => ({
      column: columnId,
      direction: current?.column === columnId && current.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Get ordered columns
  const orderedColumns = columnOrder
    .map(id => columns.find(c => c.id === id))
    .filter(Boolean) as TableColumn<T>[];

  return (
    <div className="bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table
          className="w-full"
          onMouseMove={handleResizeMove}
          onMouseUp={handleResizeEnd}
          onMouseLeave={handleResizeEnd}
        >
          <thead className="bg-secondary/30 dark:bg-[#0f0f0f] border-b border-border dark:border-[#2a2a2a]">
            <tr>
              {draggableRows && (
                <th className="w-10 px-2 py-3"></th>
              )}
              {orderedColumns.map((column) => (
                <th
                  key={column.id}
                  draggable
                  onDragStart={() => handleColumnDragStart(column.id)}
                  onDragOver={(e) => handleColumnDragOver(e, column.id)}
                  onDragEnd={handleColumnDragEnd}
                  className="px-4 py-3 text-left text-sm font-medium dark:text-gray-200 relative group cursor-move"
                  style={{ width: columnWidths[column.id] || column.width || 'auto' }}
                >
                  <div className="flex items-center gap-2">
                    <GripVertical className="w-4 h-4 text-muted-foreground dark:text-gray-400 opacity-0 group-hover:opacity-100" />
                    <span>{column.header}</span>
                    {column.sortable && (
                      <button
                        onClick={() => handleSort(column.id)}
                        className="ml-auto"
                      >
                        {sortConfig?.column === column.id ? (
                          sortConfig.direction === 'asc' ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )
                        ) : (
                          <div className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Resize Handle */}
                  {resizableColumns && column.resizable !== false && (
                    <div
                      onMouseDown={(e) => handleResizeStart(e, column.id)}
                      className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/50 opacity-0 group-hover:opacity-100"
                    />
                  )}
                </th>
              ))}
              {actions && <th className="w-32 px-4 py-3 text-left text-sm font-medium dark:text-gray-200">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row, index) => (
              <tr
                key={rowKey(row)}
                draggable={draggableRows}
                onDragStart={() => handleRowDragStart(index)}
                onDragOver={(e) => handleRowDragOver(e, index)}
                onDragEnd={handleRowDragEnd}
                onContextMenu={(e) => onRowContextMenu?.(e, row)}
                className={`border-b border-border dark:border-[#2a2a2a] hover:bg-secondary/30 dark:hover:bg-[#2a2a2a]/30 transition-colors ${
                  draggedRow === index ? 'opacity-50' : ''
                } ${draggableRows ? 'cursor-move' : ''}`}
              >
                {draggableRows && (
                  <td className="px-2 py-3">
                    <GripVertical className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
                  </td>
                )}
                {orderedColumns.map((column) => (
                  <td key={column.id} className="px-4 py-3 text-sm dark:text-gray-200">
                    {column.accessor(row)}
                  </td>
                ))}
                {actions && (
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {actions.map((action, actionIndex) => (
                        <button
                          key={actionIndex}
                          onClick={() => action.onClick(row)}
                          className={`px-2 py-1 text-xs transition-colors ${
                            action.variant === 'destructive'
                              ? 'text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20'
                              : action.variant === 'primary'
                              ? 'text-primary hover:bg-primary/10 dark:hover:bg-primary/20'
                              : 'text-foreground dark:text-gray-200 hover:bg-secondary dark:hover:bg-[#2a2a2a]'
                          }`}
                          title={action.label}
                        >
                          {action.icon || action.label}
                        </button>
                      ))}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
````````

## `src/app/components/editors/MarkdownEditor.tsx`

- Category: component.
- Imports: import { useState } from "react";, import { Bold, Italic, List, ListOrdered, Link, Image, Code, Eye, Edit3 } from "lucide-react";
- Exports: export interface MarkdownEditorProps {, export function MarkdownEditor({
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from "react";
import { Bold, Italic, List, ListOrdered, Link, Image, Code, Eye, Edit3 } from "lucide-react";

export interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
  showPreview?: boolean;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write something...",
  height = "400px",
  showPreview = true,
}: MarkdownEditorProps) {
  const [mode, setMode] = useState<'edit' | 'preview' | 'split'>('split');

  const insertMarkdown = (before: string, after: string = '') => {
    const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end);

    onChange(newText);

    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 0);
  };

  const toolbarButtons = [
    { icon: Bold, action: () => insertMarkdown('**', '**'), label: 'Bold' },
    { icon: Italic, action: () => insertMarkdown('*', '*'), label: 'Italic' },
    { icon: Code, action: () => insertMarkdown('`', '`'), label: 'Code' },
    { icon: Link, action: () => insertMarkdown('[', '](url)'), label: 'Link' },
    { icon: Image, action: () => insertMarkdown('![alt](', ')'), label: 'Image' },
    { icon: List, action: () => insertMarkdown('\n- ', ''), label: 'Bullet List' },
    { icon: ListOrdered, action: () => insertMarkdown('\n1. ', ''), label: 'Numbered List' },
  ];

  // Simple markdown to HTML conversion
  const renderMarkdown = (text: string): string => {
    return text
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mt-4 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mt-4 mb-2">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-semibold mt-4 mb-2">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Code
      .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 bg-secondary text-sm font-mono rounded">$1</code>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
      // Lists
      .replace(/^\* (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4 list-decimal">$1</li>')
      // Line breaks
      .replace(/\n/g, '<br/>');
  };

  return (
    <div className="border border-border dark:border-[#2a2a2a] rounded-lg overflow-hidden bg-white dark:bg-[#1a1a1a]">
      {/* Toolbar */}
      <div className="border-b border-border dark:border-[#2a2a2a] bg-secondary/30 dark:bg-[#0f0f0f] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {toolbarButtons.map((btn, index) => {
            const Icon = btn.icon;
            return (
              <button
                key={index}
                onClick={btn.action}
                className="p-2 hover:bg-white dark:hover:bg-[#2a2a2a] rounded transition-colors dark:text-gray-300"
                title={btn.label}
              >
                <Icon className="w-4 h-4" />
              </button>
            );
          })}
        </div>

        {/* Mode Toggle */}
        {showPreview && (
          <div className="flex items-center border border-border dark:border-[#2a2a2a] rounded-lg overflow-hidden bg-white dark:bg-[#0f0f0f]">
            <button
              onClick={() => setMode('edit')}
              className={`px-3 py-1.5 text-sm transition-colors flex items-center gap-1.5 ${
                mode === 'edit' ? 'bg-primary text-white' : 'hover:bg-secondary dark:hover:bg-[#2a2a2a] dark:text-gray-300'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => setMode('split')}
              className={`px-3 py-1.5 text-sm transition-colors flex items-center gap-1.5 border-x border-border dark:border-[#2a2a2a] ${
                mode === 'split' ? 'bg-primary text-white' : 'hover:bg-secondary dark:hover:bg-[#2a2a2a] dark:text-gray-300'
              }`}
            >
              <span>Split</span>
            </button>
            <button
              onClick={() => setMode('preview')}
              className={`px-3 py-1.5 text-sm transition-colors flex items-center gap-1.5 ${
                mode === 'preview' ? 'bg-primary text-white' : 'hover:bg-secondary dark:hover:bg-[#2a2a2a] dark:text-gray-300'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          </div>
        )}
      </div>

      {/* Editor/Preview */}
      <div className="flex" style={{ height }}>
        {/* Editor */}
        {(mode === 'edit' || mode === 'split') && (
          <div className={mode === 'split' ? 'flex-1 border-r border-border dark:border-[#2a2a2a]' : 'flex-1'}>
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              className="w-full h-full p-4 resize-none focus:outline-none font-mono text-sm bg-white dark:bg-[#1a1a1a] dark:text-gray-200 dark:placeholder-gray-500"
            />
          </div>
        )}

        {/* Preview */}
        {(mode === 'preview' || mode === 'split') && (
          <div className={mode === 'split' ? 'flex-1 overflow-y-auto' : 'flex-1'}>
            <div
              className="p-4 prose prose-sm max-w-none dark:text-gray-200"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
````````

## `src/app/components/EmptyState.tsx`

- Category: component.
- Imports: import { LucideIcon } from "lucide-react";, import { Button } from "./Button";, import { ReactNode } from "react";
- Exports: export function EmptyState({ icon: Icon, title, message, action }: EmptyStateProps) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { LucideIcon } from "lucide-react";
import { Button } from "./Button";
import { ReactNode } from "react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon, title, message, action }: EmptyStateProps) {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{message}</p>
        {action && (
          <Button onClick={action.onClick}>
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
}
````````

## `src/app/components/EnhancedDataTable.tsx`

- Category: component.
- Imports: import { useState, ReactNode } from "react";, import { ChevronUp, ChevronDown, MoreHorizontal, ChevronLeft, ChevronRight, Search, Filter, X } from "lucide-react";, import { Button } from "./Button";
- Exports: export interface Column<T> {, export function EnhancedDataTable<T extends { id?: string | number }>({
- Reuse guidance: Use this for queryable records, database viewers, process rows, and entity management lists.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, ReactNode } from "react";
import { ChevronUp, ChevronDown, MoreHorizontal, ChevronLeft, ChevronRight, Search, Filter, X } from "lucide-react";
import { Button } from "./Button";

export interface Column<T> {
  id: string;
  header: string;
  accessor: (row: T) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: 'text' | 'select';
  filterOptions?: { value: string; label: string }[];
  width?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  rowActions?: (row: T) => { label: string; onClick: () => void }[];
  selectable?: boolean;
  pageSize?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
}

export function EnhancedDataTable<T extends { id?: string | number }>({
  columns,
  data,
  onRowClick,
  rowActions,
  selectable = false,
  pageSize = 10,
  searchable = true,
  searchPlaceholder = "Search...",
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [showActions, setShowActions] = useState<string | number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>({});

  const handleSort = (columnId: string) => {
    if (sortColumn === columnId) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnId);
      setSortDirection('asc');
    }
  };

  const handleFilterChange = (columnId: string, value: string) => {
    setColumnFilters(prev => ({
      ...prev,
      [columnId]: value,
    }));
    setCurrentPage(1);
  };

  const clearFilter = (columnId: string) => {
    const newFilters = { ...columnFilters };
    delete newFilters[columnId];
    setColumnFilters(newFilters);
  };

  const clearAllFilters = () => {
    setColumnFilters({});
    setSearchQuery('');
  };

  // Apply search filter
  let filteredData = [...data];
  if (searchQuery) {
    filteredData = filteredData.filter(row => {
      return columns.some(col => {
        const value = col.accessor(row);
        return String(value).toLowerCase().includes(searchQuery.toLowerCase());
      });
    });
  }

  // Apply column filters
  Object.entries(columnFilters).forEach(([columnId, filterValue]) => {
    if (filterValue) {
      filteredData = filteredData.filter(row => {
        const column = columns.find(c => c.id === columnId);
        if (!column) return true;
        const value = column.accessor(row);
        return String(value).toLowerCase().includes(filterValue.toLowerCase());
      });
    }
  });

  // Apply sorting
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortColumn) return 0;

    const column = columns.find(c => c.id === sortColumn);
    if (!column) return 0;

    const aValue = column.accessor(a);
    const bValue = column.accessor(b);

    const aStr = String(aValue);
    const bStr = String(bValue);

    if (sortDirection === 'asc') {
      return aStr.localeCompare(bStr);
    } else {
      return bStr.localeCompare(aStr);
    }
  });

  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const toggleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map(row => row.id!)));
    }
  };

  const toggleSelectRow = (id: string | number) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  const activeFilterCount = Object.values(columnFilters).filter(Boolean).length;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 flex-wrap">
        {searchable && (
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
          className="gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="px-1.5 py-0.5 bg-primary text-white text-xs rounded">
              {activeFilterCount}
            </span>
          )}
        </Button>

        {(searchQuery || activeFilterCount > 0) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="gap-2"
          >
            <X className="w-4 h-4" />
            Clear all
          </Button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-secondary/30 border border-border rounded-xl">
          {columns.filter(col => col.filterable).map(column => (
            <div key={column.id} className="space-y-2">
              <label className="text-sm font-medium">{column.header}</label>
              {column.filterType === 'select' && column.filterOptions ? (
                <select
                  value={columnFilters[column.id] || ''}
                  onChange={(e) => handleFilterChange(column.id, e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="">All</option>
                  {column.filterOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="relative">
                  <input
                    type="text"
                    value={columnFilters[column.id] || ''}
                    onChange={(e) => handleFilterChange(column.id, e.target.value)}
                    placeholder={`Filter ${column.header.toLowerCase()}...`}
                    className="w-full px-3 py-2 pr-8 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                  {columnFilters[column.id] && (
                    <button
                      onClick={() => clearFilter(column.id)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-secondary rounded transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-secondary border-b border-border">
              <tr>
                {selectable && (
                  <th className="w-12 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-border"
                    />
                  </th>
                )}
                {columns.map(column => (
                  <th
                    key={column.id}
                    className="px-4 py-3 text-left text-sm font-medium text-foreground"
                    style={{ width: column.width }}
                  >
                    {column.sortable ? (
                      <button
                        onClick={() => handleSort(column.id)}
                        className="flex items-center gap-2 hover:text-primary transition-colors group"
                      >
                        {column.header}
                        <div className="flex flex-col">
                          <ChevronUp
                            className={`w-3 h-3 -mb-1 ${
                              sortColumn === column.id && sortDirection === 'asc'
                                ? 'text-primary'
                                : 'text-muted-foreground opacity-50 group-hover:opacity-100'
                            }`}
                          />
                          <ChevronDown
                            className={`w-3 h-3 ${
                              sortColumn === column.id && sortDirection === 'desc'
                                ? 'text-primary'
                                : 'text-muted-foreground opacity-50 group-hover:opacity-100'
                            }`}
                          />
                        </div>
                      </button>
                    ) : (
                      column.header
                    )}
                  </th>
                ))}
                {rowActions && <th className="w-12 px-4 py-3"></th>}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  className={`border-b border-border last:border-0 ${
                    onRowClick ? 'cursor-pointer hover:bg-secondary/50' : ''
                  } transition-colors`}
                  onClick={() => onRowClick?.(row)}
                >
                  {selectable && (
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedRows.has(row.id!)}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleSelectRow(row.id!);
                        }}
                        className="w-4 h-4 rounded border-border"
                        onClick={(e) => e.stopPropagation()}
                      />
                    </td>
                  )}
                  {columns.map(column => (
                    <td key={column.id} className="px-4 py-3 text-sm text-foreground">
                      {column.accessor(row)}
                    </td>
                  ))}
                  {rowActions && (
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <div className="relative">
                        <button
                          onClick={() => setShowActions(showActions === row.id ? null : row.id!)}
                          className="p-1 hover:bg-secondary rounded transition-colors"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                        {showActions === row.id && (
                          <div className="absolute right-0 mt-1 bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-lg shadow-lg py-1 z-10 min-w-32">
                            {rowActions(row).map((action, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  action.onClick();
                                  setShowActions(null);
                                }}
                                className="w-full px-4 py-2 text-left text-sm hover:bg-secondary transition-colors"
                              >
                                {action.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {paginatedData.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <p>No data found</p>
            {(searchQuery || activeFilterCount > 0) && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-primary hover:underline mt-2"
              >
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} results
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-border rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-border rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {selectable && selectedRows.size > 0 && (
        <div className="flex items-center gap-3 px-4 py-3 bg-primary/10 border border-primary/20 rounded-lg">
          <p className="text-sm font-medium">
            {selectedRows.size} item{selectedRows.size > 1 ? 's' : ''} selected
          </p>
          <button
            onClick={() => setSelectedRows(new Set())}
            className="text-sm text-primary hover:underline"
          >
            Clear selection
          </button>
        </div>
      )}
    </div>
  );
}
````````

## `src/app/components/ErrorState.tsx`

- Category: component.
- Imports: import { AlertCircle, RefreshCw } from "lucide-react";, import { Button } from "./Button";
- Exports: export function ErrorState({
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { AlertCircle, RefreshCw } from "lucide-react";
import { Button } from "./Button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  inline?: boolean;
}

export function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this content. Please try again.",
  onRetry,
  inline = false,
}: ErrorStateProps) {
  if (inline) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-destructive mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
          {onRetry && (
            <Button variant="ghost" size="sm" onClick={onRetry} className="gap-2 flex-shrink-0">
              <RefreshCw className="w-4 h-4" />
              Retry
            </Button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-destructive" />
        </div>
        <h3 className="font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{message}</p>
        {onRetry && (
          <Button onClick={onRetry} className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}
````````

## `src/app/components/figma/ImageWithFallback.tsx`

- Category: component.
- Imports: import React, { useState } from 'react'
- Exports: export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import React, { useState } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [didError, setDidError] = useState(false)

  const handleError = () => {
    setDidError(true)
  }

  const { src, alt, style, className, ...rest } = props

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img src={src} alt={alt} className={className} style={style} {...rest} onError={handleError} />
  )
}
````````

## `src/app/components/FileAttachmentManager.tsx`

- Category: component.
- Imports: import { useState } from "react";, import { Upload, File, Image as ImageIcon, X, Trash2 } from "lucide-react";, import { Modal } from "./Modal";, import { Button } from "./Button";
- Exports: export function FileAttachmentManager({
- Reuse guidance: Use this for User Drive/Organisation Drive upload, file viewer, AI Agent project file editing, and ingestion mode changes.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from "react";
import { Upload, File, Image as ImageIcon, X, Trash2 } from "lucide-react";
import { Modal } from "./Modal";
import { Button } from "./Button";

interface Attachment {
  id: string;
  file: File;
  preview?: string;
  type: 'image' | 'file';
}

interface FileAttachmentManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onAttach: (files: Attachment[]) => void;
  existingAttachments?: Attachment[];
}

export function FileAttachmentManager({
  isOpen,
  onClose,
  onAttach,
  existingAttachments = [],
}: FileAttachmentManagerProps) {
  const [attachments, setAttachments] = useState<Attachment[]>(existingAttachments);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    const newAttachments = await Promise.all(
      files.map(async (file) => {
        let preview: string | undefined;
        if (file.type.startsWith('image/')) {
          preview = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.readAsDataURL(file);
          });
        }

        return {
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview,
          type: file.type.startsWith('image/') ? 'image' as const : 'file' as const,
        };
      })
    );

    setAttachments([...attachments, ...newAttachments]);
  };

  const removeAttachment = (id: string) => {
    setAttachments(attachments.filter(a => a.id !== id));
  };

  const handleAttach = () => {
    onAttach(attachments);
    onClose();
  };

  const handleCancel = () => {
    setAttachments(existingAttachments);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCancel}
      title="Attach Files"
      size="md"
      footer={
        <div className="flex gap-2 justify-end">
          <Button variant="secondary" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleAttach}>
            Attach {attachments.length > 0 && `(${attachments.length})`}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Upload Area */}
        <label className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/40 transition-colors cursor-pointer block">
          <input
            type="file"
            multiple
            accept="image/*,application/pdf,.doc,.docx,.txt,.zip"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="flex flex-col items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-medium">Click to upload or drag and drop</p>
              <p className="text-sm text-muted-foreground mt-1">
                Images, PDFs, documents (max 100MB)
              </p>
            </div>
          </div>
        </label>

        {/* Attachments List */}
        {attachments.length > 0 && (
          <div className="space-y-3">
            <p className="text-sm font-medium">Attached Files ({attachments.length})</p>
            <div className="grid grid-cols-2 gap-3">
              {attachments.map((att) => (
                <div key={att.id} className="relative group border border-border rounded-lg overflow-hidden">
                  {att.type === 'image' && att.preview ? (
                    <div className="relative">
                      <img
                        src={att.preview}
                        alt={att.file.name}
                        className="w-full h-32 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button
                          onClick={() => removeAttachment(att.id)}
                          className="p-2 bg-destructive text-white rounded-full hover:bg-destructive/90 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-2">
                        <p className="text-xs truncate">{att.file.name}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 flex items-center gap-3">
                      <File className="w-8 h-8 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm truncate">{att.file.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(att.file.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <button
                        onClick={() => removeAttachment(att.id)}
                        className="p-1 hover:bg-destructive/10 text-destructive rounded opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
````````

## `src/app/components/FileUploadModal.tsx`

- Category: component.
- Imports: import { useState, useRef, useCallback } from 'react';, import { Button } from './Button';, import { X, Upload, File, Image as ImageIcon, FileText, Check, AlertCircle } from 'lucide-react';, import { useToast } from './Toast';, import { formatBytes } from '../format';
- Exports: export function FileUploadModal({ isOpen, onClose, onUploadComplete }: FileUploadModalProps) {
- Reuse guidance: Use this for User Drive/Organisation Drive upload, file viewer, AI Agent project file editing, and ingestion mode changes. Use this for create/update/delete flows, confirmations, and risky operation approval gates.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, useRef, useCallback } from 'react';
import { Button } from './Button';
import { X, Upload, File, Image as ImageIcon, FileText, Check, AlertCircle } from 'lucide-react';
import { useToast } from './Toast';
import { formatBytes } from '../format';

interface UploadFile {
  id: string;
  file: File;
  progress: number;
  status: 'pending' | 'uploading' | 'completed' | 'error';
  error?: string;
}

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete: (files: File[]) => void;
}

export function FileUploadModal({ isOpen, onClose, onUploadComplete }: FileUploadModalProps) {
  const { showToast } = useToast();
  const [uploadFiles, setUploadFiles] = useState<UploadFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 30;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setUploadFiles(prev =>
          prev.map(f =>
            f.id === fileId ? { ...f, progress: 100, status: 'completed' } : f
          )
        );
      } else {
        setUploadFiles(prev =>
          prev.map(f => (f.id === fileId ? { ...f, progress, status: 'uploading' } : f))
        );
      }
    }, 300);
  };

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;

    const newUploadFiles: UploadFile[] = Array.from(files).map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      progress: 0,
      status: 'pending' as const,
    }));

    setUploadFiles(prev => [...prev, ...newUploadFiles]);

    // Start simulated uploads
    newUploadFiles.forEach(uf => {
      setTimeout(() => simulateUpload(uf.id), 100);
    });
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removeFile = (fileId: string) => {
    setUploadFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleComplete = () => {
    const completedFiles = uploadFiles
      .filter(f => f.status === 'completed')
      .map(f => f.file);

    if (completedFiles.length === 0) {
      showToast('error', 'No files uploaded successfully');
      return;
    }

    onUploadComplete(completedFiles);
    setUploadFiles([]);
    onClose();
  };

  const handleCancel = () => {
    setUploadFiles([]);
    onClose();
  };

  const getFileIcon = (file: File) => {
    if (file.type.startsWith('image/')) return ImageIcon;
    if (file.type.startsWith('text/')) return FileText;
    return File;
  };

  if (!isOpen) return null;

  const allCompleted = uploadFiles.length > 0 && uploadFiles.every(f => f.status === 'completed');
  const hasFiles = uploadFiles.length > 0;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        <div className="p-6 border-b border-border dark:border-[#2a2a2a]">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold dark:text-gray-100">Upload Files</h2>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {/* Drop Zone */}
          {!hasFiles && (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all cursor-pointer ${
                isDragging
                  ? 'border-primary bg-primary/5 dark:bg-primary/10'
                  : 'border-border dark:border-[#2a2a2a] hover:border-primary/50 dark:hover:border-primary/50'
              }`}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2 dark:text-gray-100">
                Drop files here or click to browse
              </h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                Support for images, documents, code files, and more
              </p>
            </div>
          )}

          {/* File List */}
          {hasFiles && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold dark:text-gray-100">
                  {uploadFiles.length} {uploadFiles.length === 1 ? 'file' : 'files'}
                </h3>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Add More
                </Button>
              </div>

              {uploadFiles.map((uploadFile) => {
                const Icon = getFileIcon(uploadFile.file);
                return (
                  <div
                    key={uploadFile.id}
                    className="border border-border dark:border-[#2a2a2a] rounded-lg p-4 space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium dark:text-gray-100 truncate">
                            {uploadFile.file.name}
                          </h4>
                          <p className="text-xs text-muted-foreground dark:text-gray-400">
                            {formatBytes(uploadFile.file.size)} • {uploadFile.file.type || 'Unknown type'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {uploadFile.status === 'completed' && (
                          <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                            <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </div>
                        )}
                        {uploadFile.status === 'error' && (
                          <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                            <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                          </div>
                        )}
                        {uploadFile.status !== 'completed' && (
                          <button
                            onClick={() => removeFile(uploadFile.id)}
                            className="p-1 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    {(uploadFile.status === 'uploading' || uploadFile.status === 'pending') && (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground dark:text-gray-400">
                            {uploadFile.status === 'pending' ? 'Preparing...' : 'Uploading...'}
                          </span>
                          <span className="text-xs font-medium dark:text-gray-300">
                            {Math.round(uploadFile.progress)}%
                          </span>
                        </div>
                        <div className="h-2 bg-secondary dark:bg-[#2a2a2a] rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-300 ease-out"
                            style={{ width: `${uploadFile.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {uploadFile.status === 'error' && (
                      <p className="text-xs text-red-600 dark:text-red-400">
                        {uploadFile.error || 'Upload failed'}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
        </div>

        <div className="p-6 border-t border-border dark:border-[#2a2a2a]">
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleComplete}
              disabled={!allCompleted}
              className="flex-1"
            >
              {allCompleted ? 'Complete Upload' : 'Uploading...'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
````````

## `src/app/components/FileViewer.tsx`

- Category: component.
- Imports: import { useState } from 'react';, import { FileText, Download, Eye, X, FileSpreadsheet, FileImage, Video, Archive, File } from 'lucide-react';, import { Button } from './Button';, import { Modal } from './Modal';
- Exports: export interface FileAttachment {, export function FileViewer({ file, onRemove, compact = false }: FileViewerProps) {, export function FileListViewer({ files, onRemove }: FileListViewerProps) {
- Reuse guidance: Use this for User Drive/Organisation Drive upload, file viewer, AI Agent project file editing, and ingestion mode changes.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from 'react';
import { FileText, Download, Eye, X, FileSpreadsheet, FileImage, Video, Archive, File } from 'lucide-react';
import { Button } from './Button';
import { Modal } from './Modal';

export interface FileAttachment {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
  preview?: string;
}

interface FileViewerProps {
  file: FileAttachment;
  onRemove?: () => void;
  compact?: boolean;
}

export function FileViewer({ file, onRemove, compact = false }: FileViewerProps) {
  const [showPreview, setShowPreview] = useState(false);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  const getFileIcon = () => {
    const ext = file.name.split('.').pop()?.toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) {
      return <FileImage className="w-5 h-5" />;
    }
    if (['mp4', 'webm', 'ogg', 'mov'].includes(ext || '')) {
      return <Video className="w-5 h-5" />;
    }
    if (['xlsx', 'xls', 'csv'].includes(ext || '')) {
      return <FileSpreadsheet className="w-5 h-5" />;
    }
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext || '')) {
      return <Archive className="w-5 h-5" />;
    }
    if (['pdf', 'doc', 'docx', 'txt'].includes(ext || '')) {
      return <FileText className="w-5 h-5" />;
    }
    return <File className="w-5 h-5" />;
  };

  const getFileColor = () => {
    const ext = file.name.split('.').pop()?.toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) {
      return 'text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30';
    }
    if (['mp4', 'webm', 'ogg', 'mov'].includes(ext || '')) {
      return 'text-purple-600 dark:text-purple-400 bg-purple-100 dark:bg-purple-900/30';
    }
    if (['xlsx', 'xls', 'csv'].includes(ext || '')) {
      return 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30';
    }
    if (['zip', 'rar', '7z', 'tar', 'gz'].includes(ext || '')) {
      return 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30';
    }
    if (['pdf'].includes(ext || '')) {
      return 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30';
    }
    return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700';
  };

  const isPreviewable = () => {
    const ext = file.name.split('.').pop()?.toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'pdf', 'mp4', 'webm', 'ogg'].includes(ext || '');
  };

  const renderPreview = () => {
    const ext = file.name.split('.').pop()?.toLowerCase();

    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext || '')) {
      return (
        <div className="flex items-center justify-center bg-black/5 dark:bg-black/20 rounded-lg overflow-hidden">
          <img
            src={file.preview || file.url}
            alt={file.name}
            className="max-w-full max-h-[70vh] object-contain"
          />
        </div>
      );
    }

    if (['mp4', 'webm', 'ogg'].includes(ext || '')) {
      return (
        <div className="flex items-center justify-center bg-black rounded-lg overflow-hidden">
          <video controls className="max-w-full max-h-[70vh]">
            <source src={file.url} type={`video/${ext}`} />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }

    if (ext === 'pdf') {
      return (
        <div className="w-full h-[70vh] bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden">
          <iframe
            src={file.url}
            className="w-full h-full"
            title={file.name}
          />
        </div>
      );
    }

    // For Excel/Docs - show placeholder
    if (['xlsx', 'xls', 'csv', 'doc', 'docx'].includes(ext || '')) {
      return (
        <div className="flex flex-col items-center justify-center py-12 bg-secondary/30 dark:bg-[#1a1a1a] rounded-lg">
          {getFileIcon()}
          <p className="mt-4 text-sm text-muted-foreground dark:text-gray-400">
            Preview not available for this file type
          </p>
          <p className="mt-2 text-xs text-muted-foreground dark:text-gray-500">
            Download to view the full content
          </p>
          <Button
            onClick={() => window.open(file.url, '_blank')}
            className="mt-4 gap-2"
          >
            <Download className="w-4 h-4" />
            Download File
          </Button>
        </div>
      );
    }

    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground dark:text-gray-400">Preview not available</p>
      </div>
    );
  };

  if (compact) {
    return (
      <>
        <div className={`flex items-center gap-3 p-3 rounded-lg border border-border dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f] hover:border-primary dark:hover:border-primary transition-colors group`}>
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getFileColor()}`}>
            {getFileIcon()}
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium dark:text-gray-200 truncate">
              {file.name}
            </p>
            <p className="text-xs text-muted-foreground dark:text-gray-500">
              {formatFileSize(file.size)}
            </p>
          </div>

          <div className="flex items-center gap-1">
            {isPreviewable() && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPreview(true)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Eye className="w-4 h-4" />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(file.url, '_blank')}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Download className="w-4 h-4" />
            </Button>
            {onRemove && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onRemove}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 dark:text-red-400"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {showPreview && (
          <Modal
            isOpen={showPreview}
            onClose={() => setShowPreview(false)}
            title={file.name}
            size="xl"
          >
            {renderPreview()}
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                onClick={() => window.open(file.url, '_blank')}
                className="gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button onClick={() => setShowPreview(false)}>
                Close
              </Button>
            </div>
          </Modal>
        )}
      </>
    );
  }

  // Full size preview card
  return (
    <div className="border border-border dark:border-[#2a2a2a] rounded-lg overflow-hidden bg-white dark:bg-[#0f0f0f]">
      <div className="p-4 border-b border-border dark:border-[#2a2a2a]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getFileColor()}`}>
              {getFileIcon()}
            </div>
            <div>
              <p className="font-medium dark:text-gray-200">{file.name}</p>
              <p className="text-xs text-muted-foreground dark:text-gray-500">
                {formatFileSize(file.size)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(file.url, '_blank')}
              className="gap-2"
            >
              <Download className="w-4 h-4" />
              Download
            </Button>
            {onRemove && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRemove}
                className="text-red-600 dark:text-red-400"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="p-4">
        {renderPreview()}
      </div>
    </div>
  );
}

interface FileListViewerProps {
  files: FileAttachment[];
  onRemove?: (fileId: string) => void;
}

export function FileListViewer({ files, onRemove }: FileListViewerProps) {
  if (files.length === 0) return null;

  return (
    <div className="space-y-2">
      {files.map((file) => (
        <FileViewer
          key={file.id}
          file={file}
          onRemove={onRemove ? () => onRemove(file.id) : undefined}
          compact
        />
      ))}
    </div>
  );
}
````````

## `src/app/components/FilterBar.tsx`

- Category: component.
- Imports: import { Search, Filter, RefreshCw, Home, MoreVertical } from "lucide-react";
- Exports: export function FilterBar({
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { Search, Filter, RefreshCw, Home, MoreVertical } from "lucide-react";

interface FilterBarProps {
  onSearch?: (query: string) => void;
  onFilter?: () => void;
  onRefresh?: () => void;
  onHome?: () => void;
  searchPlaceholder?: string;
}

export function FilterBar({
  onSearch,
  onFilter,
  onRefresh,
  onHome,
  searchPlaceholder = "Search..."
}: FilterBarProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-white dark:bg-[#1a1a1a]">
      <div className="flex items-center gap-2">
        {onHome && (
          <button
            onClick={onHome}
            className="p-1.5 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded transition-colors"
            title="Home"
          >
            <Home className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
          </button>
        )}

        {onFilter && (
          <button
            onClick={onFilter}
            className="p-1.5 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded transition-colors"
            title="Filter"
          >
            <Filter className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
          </button>
        )}
      </div>

      {onSearch && (
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground dark:text-gray-500" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-1.5 bg-secondary dark:bg-[#0f0f0f] border border-border dark:border-[#2a2a2a] rounded text-sm text-foreground dark:text-gray-300 placeholder-muted-foreground dark:placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-primary/50"
          />
        </div>
      )}

      <div className="flex items-center gap-2">
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="p-1.5 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
          </button>
        )}

        <button
          className="p-1.5 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded transition-colors"
          title="More"
        >
          <MoreVertical className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
}
````````

## `src/app/components/FilterPopover.tsx`

- Category: component.
- Imports: import { useState } from 'react';, import { Filter } from 'lucide-react';, import { PositionedPopover, PopoverSection, PopoverPosition } from './PositionedPopover';, import { Input } from './client/input';, import { SelectField } from './FormField';
- Exports: export interface FilterPopoverProps {, export function FilterPopover({ position = 'auto' }: FilterPopoverProps) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from 'react';
import { Filter } from 'lucide-react';
import { PositionedPopover, PopoverSection, PopoverPosition } from './PositionedPopover';
import { Input } from './client/input';
import { SelectField } from './FormField';

export interface FilterPopoverProps {
  position?: PopoverPosition;
}

export function FilterPopover({ position = 'auto' }: FilterPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [triggerEl, setTriggerEl] = useState<HTMLElement | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [status, setStatus] = useState('');
  const [dateRange, setDateRange] = useState('');

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setTriggerEl(e.currentTarget);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className="flex items-center gap-2 px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] hover:bg-secondary dark:hover:bg-[#1a1a1a] transition-colors"
      >
        <Filter className="w-4 h-4" />
        <span>Filter</span>
      </button>

      <PositionedPopover
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trigger={triggerEl}
        title="Filter Options"
        width={320}
        position={position}
      >
        <PopoverSection title="Search">
          <Input
            variant="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            showClearButton
            onClear={() => setSearchTerm('')}
          />
        </PopoverSection>

        <PopoverSection title="Status">
          <SelectField
            label=""
            value={status}
            onChange={setStatus}
            options={[
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
              { value: 'pending', label: 'Pending' },
              { value: 'completed', label: 'Completed' }
            ]}
          />
        </PopoverSection>

        <PopoverSection title="Date Range">
          <SelectField
            label=""
            value={dateRange}
            onChange={setDateRange}
            options={[
              { value: 'today', label: 'Today' },
              { value: 'week', label: 'This Week' },
              { value: 'month', label: 'This Month' },
              { value: 'year', label: 'This Year' },
              { value: 'custom', label: 'Custom Range' }
            ]}
          />
        </PopoverSection>

        <div className="flex gap-2 mt-4 pt-4 border-t border-border dark:border-[#2a2a2a]">
          <button
            onClick={() => {
              setSearchTerm('');
              setStatus('');
              setDateRange('');
            }}
            className="flex-1 px-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg hover:bg-secondary dark:hover:bg-[#1a1a1a] transition-colors"
          >
            Clear
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
          >
            Apply
          </button>
        </div>
      </PositionedPopover>
    </>
  );
}
````````

## `src/app/components/filters/InlineFilterBar.tsx`

- Category: component.
- Imports: import { Search, Filter, Plus, ChevronDown } from "lucide-react";, import { ReactNode, useState, useRef, useEffect } from "react";
- Exports: export interface InlineFilter {, export interface InlineFilterBarProps {, export function InlineFilterBar({
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { Search, Filter, Plus, ChevronDown } from "lucide-react";
import { ReactNode, useState, useRef, useEffect } from "react";

export interface InlineFilter {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  icon?: ReactNode;
}

export interface InlineFilterBarProps {
  title?: string;
  filters: InlineFilter[];
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  actions?: ReactNode;
  showResultCount?: boolean;
  resultCount?: number;
}

function FilterDropdown({ filter }: { filter: InlineFilter }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  const selectedOption = filter.options.find(opt => opt.value === filter.value);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200 text-sm hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
      >
        {filter.icon}
        <span>{filter.label}: {selectedOption?.label}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 min-w-full bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-lg shadow-lg py-1">
          {filter.options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                filter.onChange(option.value);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors ${
                filter.value === option.value ? 'bg-primary/10 dark:bg-primary/20 text-primary' : 'dark:text-gray-200'
              }`}
            >
              {filter.label}: {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function InlineFilterBar({
  title,
  filters,
  searchValue = '',
  onSearchChange,
  searchPlaceholder = "Search...",
  actions,
  showResultCount = false,
  resultCount,
}: InlineFilterBarProps) {
  const [perPage, setPerPage] = useState('12');

  return (
    <div className="bg-white dark:bg-[#1a1a1a] border-b border-border dark:border-[#2a2a2a]">
      {/* Title and Actions Row */}
      {(title || actions) && (
        <div className="px-6 py-4 flex items-center justify-between border-b border-border dark:border-[#2a2a2a]">
          {title && <h2 className="text-lg font-semibold dark:text-gray-200">{title}</h2>}
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}

      {/* Filters Row */}
      <div className="px-6 py-3 flex items-center gap-3 flex-wrap">
        {filters.map((filter) => (
          <FilterDropdown key={filter.id} filter={filter} />
        ))}

        {/* Filter Icon for Additional Filters */}
        <button className="p-2 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded-lg transition-colors">
          <Filter className="w-4 h-4 text-muted-foreground dark:text-gray-400" />
        </button>
      </div>

      {/* Search Row */}
      {onSearchChange && (
        <div className="px-6 pb-4 flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground dark:text-gray-500 pointer-events-none" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full pl-10 pr-4 py-2 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
          </div>

          {showResultCount && resultCount !== undefined && (
            <FilterDropdown
              filter={{
                id: 'perPage',
                label: '',
                value: perPage,
                options: [
                  { value: '12', label: '12' },
                  { value: '24', label: '24' },
                  { value: '50', label: '50' },
                  { value: '100', label: '100' },
                ],
                onChange: setPerPage,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
}
````````

## `src/app/components/FormField.tsx`

- Category: component.
- Imports: import { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from "react";, import { AlertCircle, Loader2 } from "lucide-react";
- Exports: export function InputField({ label, error, helperText, required, ...props }: InputFieldProps) {, export function TextareaField({ label, error, helperText, required, ...props }: TextareaFieldProps) {, export function SelectField({ label, error, helperText, required, value, onChange, options, loading, disabled }: SelectFieldProps) {, export function FormField({ multiline, ...props }: FormFieldProps) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { ReactNode, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { AlertCircle, Loader2 } from "lucide-react";

interface BaseFieldProps {
  label: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

interface InputFieldProps extends BaseFieldProps, InputHTMLAttributes<HTMLInputElement> {
  type?: 'text' | 'email' | 'password' | 'number';
}

interface TextareaFieldProps extends BaseFieldProps, TextareaHTMLAttributes<HTMLTextAreaElement> {}

interface SelectFieldProps extends BaseFieldProps {
  value?: string;
  onChange?: (value: string) => void;
  options: { value: string; label: string }[];
  loading?: boolean;
  disabled?: boolean;
}

export function InputField({ label, error, helperText, required, ...props }: InputFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium dark:text-gray-200">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <input
        {...props}
        className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 transition-all ${
          error
            ? 'border-destructive focus:ring-destructive/20'
            : 'border-border dark:border-[#2a2a2a] focus:ring-primary/20'
        } ${props.className || ''}`}
      />
      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {helperText && !error && (
        <p className="text-sm text-muted-foreground dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
}

export function TextareaField({ label, error, helperText, required, ...props }: TextareaFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium dark:text-gray-200">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <textarea
        {...props}
        className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 transition-all resize-none ${
          error
            ? 'border-destructive focus:ring-destructive/20'
            : 'border-border dark:border-[#2a2a2a] focus:ring-primary/20'
        } ${props.className || ''}`}
      />
      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {helperText && !error && (
        <p className="text-sm text-muted-foreground dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
}

export function SelectField({ label, error, helperText, required, value, onChange, options, loading, disabled }: SelectFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium dark:text-gray-200">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={disabled || loading}
          className={`w-full px-4 py-3 border rounded-xl bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
            error
              ? 'border-destructive focus:ring-destructive/20'
              : 'border-border dark:border-[#2a2a2a] focus:ring-primary/20'
          } ${loading ? 'pr-10' : ''}`}
        >
          <option value="">{loading ? 'Loading...' : 'Select an option'}</option>
          {!loading && options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
          </div>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
      {helperText && !error && (
        <p className="text-sm text-muted-foreground dark:text-gray-400">{helperText}</p>
      )}
    </div>
  );
}

// Unified FormField component for convenience
interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  error?: string;
  helperText?: string;
}

export function FormField({ multiline, ...props }: FormFieldProps) {
  if (multiline) {
    return <TextareaField {...props} />;
  }
  return <InputField {...props} type="text" />;
}
````````

## `src/app/components/GlobalHeader.tsx`

- Category: component.
- Imports: import { Plus, ChevronRight, List, Network, Zap, Bot, Home } from "lucide-react";, import { useParams, useNavigate, useLocation } from "react-router";, import { channels, categories, subjects } from "../data/mockData";, import type { ViewMode } from "./Root";
- Exports: export function GlobalHeader({ onCreateClick, viewMode, onViewModeToggle, programmaticViewEnabled = true }: GlobalHeaderProps) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { Plus, ChevronRight, List, Network, Zap, Bot, Home } from "lucide-react";
import { useParams, useNavigate, useLocation } from "react-router";
import { channels, categories, subjects } from "../data/mockData";
import type { ViewMode } from "./Root";

interface GlobalHeaderProps {
  onCreateClick: () => void;
  viewMode?: ViewMode;
  onViewModeToggle?: () => void;
  programmaticViewEnabled?: boolean;
}

interface BreadcrumbItem {
  label: string;
  path?: string;
}

export function GlobalHeader({ onCreateClick, viewMode, onViewModeToggle, programmaticViewEnabled = true }: GlobalHeaderProps) {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const channel = channels.find(c => c.id === params.channelId);
  const category = categories.find(c => c.id === params.categoryId);
  const subject = subjects.find(s => s.id === params.subjectId);

  // Build breadcrumbs based on current route
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const path = location.pathname;
    const crumbs: BreadcrumbItem[] = [];

    // Channel/Category/Subject hierarchy
    if (channel) {
      crumbs.push({ label: channel.name, path: `/channel/${channel.id}` });
      if (category) {
        crumbs.push({ label: category.name, path: `/channel/${params.channelId}/category/${category.id}` });
        if (subject) {
          crumbs.push({ label: subject.name, path: `/channel/${params.channelId}/category/${params.categoryId}/subject/${subject.id}` });
        }
      }
      return crumbs;
    }

    // Other routes
    if (path === '/' || path === '') {
      crumbs.push({ label: 'Home' });
    } else if (path === '/landing') {
      crumbs.push({ label: 'Landing Page' });
    } else if (path === '/explore') {
      crumbs.push({ label: 'Explore' });
    } else if (path === '/activity') {
      crumbs.push({ label: 'Activity' });
    } else if (path === '/bookmarks') {
      crumbs.push({ label: 'Bookmarks' });
    } else if (path === '/profile') {
      crumbs.push({ label: 'Profile' });
    } else if (path === '/settings') {
      crumbs.push({ label: 'Settings' });
    } else if (path === '/workflows') {
      crumbs.push({ label: 'Workflows' });
    } else if (path === '/workflow-builder') {
      crumbs.push({ label: 'Workflows', path: '/workflows' });
      crumbs.push({ label: 'Builder' });
    } else if (path === '/workflow-editor') {
      crumbs.push({ label: 'Workflows', path: '/workflows' });
      crumbs.push({ label: 'Editor' });
    } else if (path === '/ai-agents') {
      crumbs.push({ label: 'AI Agents' });
    } else if (path === '/ai-agent-editor') {
      crumbs.push({ label: 'AI Agents', path: '/ai-agents' });
      crumbs.push({ label: 'Editor' });
    } else if (path === '/nodes') {
      crumbs.push({ label: 'Nodes' });
    } else if (path === '/node-editor') {
      crumbs.push({ label: 'Nodes', path: '/nodes' });
      crumbs.push({ label: 'Editor' });
    } else if (path === '/ai-agent-projects') {
      crumbs.push({ label: 'AI Agent Projects' });
    } else if (path === '/ai-agent-project-editor') {
      crumbs.push({ label: 'AI Agent Projects', path: '/ai-agent-projects' });
      crumbs.push({ label: 'Editor' });
    } else if (path === '/dashboard-chat') {
      crumbs.push({ label: 'Dashboard Chat' });
    } else if (path === '/process-monitoring' || path === '/process-monitor') {
      crumbs.push({ label: 'Process Monitoring' });
    } else if (path === '/admin-dashboard') {
      crumbs.push({ label: 'Admin Dashboard' });
    } else if (path === '/permissions') {
      crumbs.push({ label: 'User Permissions' });
    } else if (path === '/members') {
      crumbs.push({ label: 'Organization Members' });
    } else if (path === '/credentials') {
      crumbs.push({ label: 'Credentials Manager' });
    } else if (path === '/plans-policies') {
      crumbs.push({ label: 'Plans & Policies' });
    } else if (path === '/admin-plans-policies') {
      crumbs.push({ label: 'Admin Plans & Policies' });
    } else if (path === '/pricing') {
      crumbs.push({ label: 'Pricing' });
    } else if (path === '/privacy') {
      crumbs.push({ label: 'Privacy Policy' });
    } else if (path === '/components') {
      crumbs.push({ label: 'Components Showcase' });
    } else if (path === '/chat-configure') {
      crumbs.push({ label: 'Chat Configuration' });
    } else if (path.startsWith('/organization-drive')) {
      crumbs.push({ label: 'Organisation Drive', path: '/organization-drive' });

      // Handle space and file paths
      const pathParts = path.split('/');
      if (pathParts.length >= 3 && pathParts[2]) {
        // We're in a space or file
        const spaceId = pathParts[2];
        crumbs.push({ label: 'Space', path: `/organization-drive/${spaceId}` });

        if (pathParts.length >= 5 && pathParts[3] === 'file' && pathParts[4]) {
          // We're viewing a file
          crumbs.push({ label: 'File Viewer' });
        }
      }
    }

    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-[#0f0f0f] border-b border-border dark:border-[#2a2a2a]">
      <div className="flex items-center justify-between px-4 py-2.5">
        {/* Breadcrumbs - Always show */}
        <div className="flex items-center gap-1.5 text-sm">
          <button
            onClick={() => navigate('/')}
            className="text-muted-foreground dark:text-gray-400 hover:text-primary transition-colors"
            title="Home"
          >
            <Home className="w-4 h-4" />
          </button>
          {breadcrumbs.length > 0 && (
            <>
              <ChevronRight className="w-3 h-3 text-muted-foreground dark:text-gray-500" />
              <div className="flex items-center gap-1">
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center gap-1">
                    {crumb.path ? (
                      <button
                        onClick={() => navigate(crumb.path!)}
                        className="text-foreground dark:text-gray-200 hover:text-primary transition-colors font-medium"
                      >
                        {crumb.label}
                      </button>
                    ) : (
                      <span className="text-primary font-semibold">{crumb.label}</span>
                    )}
                    {index < breadcrumbs.length - 1 && (
                      <ChevronRight className="w-3 h-3 text-muted-foreground dark:text-gray-500" />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Workflows Button - Only show in programmatic view */}
          {viewMode === 'programmatic' && (
            <button
              onClick={() => navigate('/workflows')}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-border dark:border-[#2a2a2a] rounded-lg hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors text-sm"
              title="Workflows"
            >
              <Zap className="w-4 h-4" />
              <span className="text-muted-foreground dark:text-gray-400">Workflows</span>
            </button>
          )}

          {/* AI Agents Button - Only show in programmatic view */}
          {viewMode === 'programmatic' && (
            <button
              onClick={() => navigate('/ai-agents')}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-border dark:border-[#2a2a2a] rounded-lg hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors text-sm"
              title="AI Agents"
            >
              <Bot className="w-4 h-4" />
              <span className="text-muted-foreground dark:text-gray-400">AI Agents</span>
            </button>
          )}

          {/* View Mode Toggle - Only show if programmatic view is enabled */}
          {viewMode && onViewModeToggle && programmaticViewEnabled && (
            <button
              onClick={onViewModeToggle}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 border border-border dark:border-[#2a2a2a] rounded-lg hover:bg-secondary dark:hover:bg-[#2a2a2a] transition-colors text-sm"
              title={`Switch to ${viewMode === 'compact' ? 'Programmatic' : 'Compact'} view`}
            >
              {viewMode === 'compact' ? (
                <>
                  <Network className="w-4 h-4" />
                  <span className="text-muted-foreground dark:text-gray-400">Programmatic</span>
                </>
              ) : (
                <>
                  <List className="w-4 h-4" />
                  <span className="text-muted-foreground dark:text-gray-400">Compact</span>
                </>
              )}
            </button>
          )}

          <button
            onClick={onCreateClick}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create</span>
          </button>
        </div>
      </div>
    </header>
  );
}
````````

## `src/app/components/HierarchicalTree.tsx`

- Category: component.
- Imports: import { useState, useMemo } from 'react';, import { ChevronRight, ChevronDown, Plus, Edit, Trash2, Folder, FileText, Hash, Tag, Layers, MessageSquare, Loader } from 'lucide-react';
- Exports: export type TreeNodeType = 'channel' | 'category' | 'subject' | 'post';, export type RootNodeType = 'my-channels' | 'organization' | 'global';, export interface TreeNode {, export interface RootNode {, export function HierarchicalTree({
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, useMemo } from 'react';
import { ChevronRight, ChevronDown, Plus, Edit, Trash2, Folder, FileText, Hash, Tag, Layers, MessageSquare, Loader } from 'lucide-react';

export type TreeNodeType = 'channel' | 'category' | 'subject' | 'post';
export type RootNodeType = 'my-channels' | 'organization' | 'global';

export interface TreeNode {
  id: string;
  name: string;
  type: TreeNodeType;
  icon?: string;
  children?: TreeNode[];
  metadata?: {
    postCount?: number;
    memberCount?: number;
    visibility?: string;
  };
}

export interface RootNode {
  id: RootNodeType;
  name: string;
  children: TreeNode[];
}

interface HierarchicalTreeProps {
  roots: RootNode[];
  onNodeClick: (node: TreeNode | RootNode, path: string[]) => void;
  onCreateClick: (parentNode: TreeNode | RootNode, type: TreeNodeType) => void;
  onEditClick: (node: TreeNode | RootNode) => void;
  onDeleteClick: (node: TreeNode | RootNode) => void;
  onChatClick: (node: TreeNode | RootNode) => void;
  selectedPath?: string;
  searchQuery?: string;
}

interface TreeNodeItemProps {
  node: TreeNode | RootNode;
  level: number;
  path: string[];
  isRoot?: boolean;
  selectedPath?: string;
  searchQuery?: string;
  onNodeClick: (node: TreeNode | RootNode, path: string[]) => void;
  onCreateClick: (parentNode: TreeNode | RootNode, type: TreeNodeType) => void;
  onEditClick: (node: TreeNode | RootNode) => void;
  onDeleteClick: (node: TreeNode | RootNode) => void;
  onChatClick: (node: TreeNode | RootNode) => void;
}

// Group node for array-based grouping
interface GroupNode extends TreeNode {
  isGroup: boolean;
  groupRange: string;
  groupChildren: TreeNode[];
}

function getNodeIcon(type: TreeNodeType | 'root', isExpanded: boolean = false) {
  switch (type) {
    case 'channel':
      return isExpanded ? Folder : Hash;
    case 'category':
      return Layers;
    case 'subject':
      return Tag;
    case 'post':
      return FileText;
    case 'root':
      return Folder;
    default:
      return Folder;
  }
}

function getCreateOptions(nodeType: TreeNodeType | 'root'): { type: TreeNodeType; label: string }[] {
  switch (nodeType) {
    case 'root':
      return [{ type: 'channel', label: 'Channel' }];
    case 'channel':
      return [
        { type: 'channel', label: 'Sub-Channel' },
        { type: 'category', label: 'Category' },
      ];
    case 'category':
      return [
        { type: 'category', label: 'Sub-Category' },
        { type: 'subject', label: 'Subject' },
      ];
    case 'subject':
      return [
        { type: 'subject', label: 'Sub-Subject' },
        { type: 'post', label: 'Post' },
      ];
    case 'post':
      return [];
    default:
      return [];
  }
}

function TreeNodeItem({
  node,
  level,
  path,
  isRoot = false,
  selectedPath,
  searchQuery = '',
  onNodeClick,
  onCreateClick,
  onEditClick,
  onDeleteClick,
  onChatClick,
}: TreeNodeItemProps) {
  const [isExpanded, setIsExpanded] = useState(level === 0);
  const [showActions, setShowActions] = useState(false);
  const [showCreateMenu, setShowCreateMenu] = useState(false);
  const [isLoadingChildren, setIsLoadingChildren] = useState(false);

  // Check if this is a group node
  const isGroupNode = 'isGroup' in node && (node as any).isGroup;

  const hasChildren = node.children && node.children.length > 0;
  const currentPath = [...path, node.id].join('/');
  const isSelected = selectedPath === currentPath;

  const nodeType = isRoot ? 'root' : (node as TreeNode).type;
  const Icon = getNodeIcon(nodeType, isExpanded);
  const createOptions = getCreateOptions(nodeType);

  // Search filtering: check if this node or any descendant matches
  const matchesSearch = (n: TreeNode | RootNode, query: string): boolean => {
    if (!query) return true;
    const lowerQuery = query.toLowerCase();
    if (n.name.toLowerCase().includes(lowerQuery)) return true;
    if (n.children) {
      return n.children.some(child => matchesSearch(child, query));
    }
    return false;
  };

  const shouldShow = matchesSearch(node, searchQuery);

  // Group children if there are more than 100
  const processedChildren = useMemo(() => {
    if (!node.children || node.children.length <= 100) {
      return node.children || [];
    }

    // For group nodes, return the grouped children directly
    if (isGroupNode) {
      return (node as any).groupChildren || [];
    }

    // Create groups of 100
    const groups: any[] = [];
    const children = node.children;
    const groupSize = 100;

    for (let i = 0; i < children.length; i += groupSize) {
      const start = i;
      const end = Math.min(i + groupSize - 1, children.length - 1);
      const groupChildren = children.slice(start, end + 1);

      groups.push({
        id: `group-${start}-${end}`,
        name: `${start + 1}-${end + 1}`,
        type: 'category' as TreeNodeType,
        isGroup: true,
        groupRange: `${start + 1}-${end + 1}`,
        groupChildren: groupChildren,
        children: groupChildren,
        metadata: { postCount: groupChildren.length },
      });
    }

    return groups;
  }, [node.children, isGroupNode]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasChildren || isRoot) {
      // Simulate lazy loading for large datasets
      if (!isExpanded && processedChildren.length > 50) {
        setIsLoadingChildren(true);
        setTimeout(() => {
          setIsExpanded(!isExpanded);
          setIsLoadingChildren(false);
        }, 300);
      } else {
        setIsExpanded(!isExpanded);
      }
    }
  };

  const handleClick = () => {
    if (!isGroupNode) {
      onNodeClick(node, [...path, node.id]);
    }
  };

  const handleCreate = (type: TreeNodeType) => {
    onCreateClick(node, type);
    setShowCreateMenu(false);
    setShowActions(false);
  };

  if (!shouldShow) return null;

  return (
    <div>
      <div
        className={`group flex items-center gap-2 px-2 py-1.5 hover:bg-secondary dark:hover:bg-[#2a2a2a] rounded transition-colors cursor-pointer relative ${
          isSelected ? 'bg-primary/10 dark:bg-primary/20' : ''
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => {
          setShowActions(false);
          setShowCreateMenu(false);
        }}
        onClick={handleClick}
      >
        {/* Expand/Collapse Icon */}
        <button
          onClick={handleToggle}
          className={`flex-shrink-0 w-4 h-4 flex items-center justify-center text-muted-foreground dark:text-gray-400 hover:text-foreground ${
            !hasChildren && !isRoot ? 'invisible' : ''
          }`}
        >
          {isExpanded ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {/* Node Icon */}
        <Icon className={`w-4 h-4 flex-shrink-0 ${
          isRoot ? 'text-primary' : 'text-muted-foreground dark:text-gray-400'
        }`} />

        {/* Node Name */}
        <span className={`flex-1 text-sm truncate ${
          isRoot ? 'font-semibold text-foreground dark:text-gray-100' :
          isGroupNode ? 'font-medium text-blue-600 dark:text-blue-400' :
          'dark:text-gray-200'
        }`}>
          {isGroupNode && '[ '}
          {node.name}
          {isGroupNode && ' ]'}
        </span>

        {/* Metadata */}
        {!isRoot && (node as TreeNode).metadata && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground dark:text-gray-500">
            {(node as TreeNode).metadata?.postCount !== undefined && (
              <span>{(node as TreeNode).metadata!.postCount} posts</span>
            )}
          </div>
        )}

        {/* Actions */}
        {showActions && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onChatClick(node);
              }}
              className="p-1 hover:bg-green-100 dark:hover:bg-green-900/30 rounded text-green-600 dark:text-green-400"
              title="Open AI Chat"
            >
              <MessageSquare className="w-3.5 h-3.5" />
            </button>

            {createOptions.length > 0 && (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowCreateMenu(!showCreateMenu);
                  }}
                  className="p-1 hover:bg-primary/10 dark:hover:bg-primary/20 rounded text-primary"
                  title="Create"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>

                {showCreateMenu && (
                  <div className="absolute right-0 top-full mt-1 bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-lg shadow-lg py-1 z-50 min-w-[140px]">
                    {createOptions.map((option) => (
                      <button
                        key={option.type}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCreate(option.type);
                        }}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-secondary dark:hover:bg-[#2a2a2a] dark:text-gray-200 flex items-center gap-2"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditClick(node);
              }}
              className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded text-blue-600 dark:text-blue-400"
              title="Edit"
            >
              <Edit className="w-3.5 h-3.5" />
            </button>

            {!isRoot && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteClick(node);
                }}
                className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded text-red-600 dark:text-red-400"
                title="Delete (includes all children)"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Loading indicator */}
      {isLoadingChildren && isExpanded && (
        <div className="flex items-center gap-2 px-2 py-2 text-sm text-muted-foreground dark:text-gray-400" style={{ paddingLeft: `${(level + 1) * 16 + 8}px` }}>
          <Loader className="w-4 h-4 animate-spin" />
          <span>Loading nodes...</span>
        </div>
      )}

      {/* Children */}
      {isExpanded && !isLoadingChildren && processedChildren.length > 0 && (
        <div>
          {processedChildren.map((child) => (
            <TreeNodeItem
              key={child.id}
              node={child}
              level={level + 1}
              path={[...path, node.id]}
              selectedPath={selectedPath}
              searchQuery={searchQuery}
              onNodeClick={onNodeClick}
              onCreateClick={onCreateClick}
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
              onChatClick={onChatClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function HierarchicalTree({
  roots,
  onNodeClick,
  onCreateClick,
  onEditClick,
  onDeleteClick,
  onChatClick,
  selectedPath,
  searchQuery = '',
}: HierarchicalTreeProps) {
  return (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="py-2">
        {searchQuery && (
          <div className="px-2 pb-2 text-xs text-muted-foreground dark:text-gray-500">
            {roots.reduce((count, root) => {
              const countNodes = (n: TreeNode | RootNode): number => {
                let c = n.name.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0;
                if (n.children) {
                  c += n.children.reduce((acc, child) => acc + countNodes(child), 0);
                }
                return c;
              };
              return count + countNodes(root);
            }, 0)} results found
          </div>
        )}
        {roots.map((root) => (
          <TreeNodeItem
            key={root.id}
            node={root}
            level={0}
            path={[]}
            isRoot={true}
            selectedPath={selectedPath}
            searchQuery={searchQuery}
            onNodeClick={onNodeClick}
            onCreateClick={onCreateClick}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            onChatClick={onChatClick}
          />
        ))}
      </div>
    </div>
  );
}
````````

## `src/app/components/InlineConfirmation.tsx`

- Category: component.
- Imports: import { AlertTriangle, Check, X } from "lucide-react";, import { Button } from "./Button";
- Exports: export function InlineConfirmation({ message, onConfirm, onCancel }: InlineConfirmationProps) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { AlertTriangle, Check, X } from "lucide-react";
import { Button } from "./Button";

interface InlineConfirmationProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function InlineConfirmation({ message, onConfirm, onCancel }: InlineConfirmationProps) {
  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-4">
      <div className="flex items-start gap-2 mb-3">
        <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-yellow-800 dark:text-yellow-200">{message}</p>
      </div>
      <div className="flex gap-2">
        <Button
          variant="primary"
          size="sm"
          onClick={onConfirm}
          className="gap-2"
        >
          <Check className="w-4 h-4" />
          Confirm
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={onCancel}
          className="gap-2"
        >
          <X className="w-4 h-4" />
          Cancel
        </Button>
      </div>
    </div>
  );
}
````````

## `src/app/components/IntelligenceModal.tsx`

- Category: component.
- Imports: import { useState } from "react";, import { Modal } from "./Modal";, import { Button } from "./Button";, import { Badge } from "./Badge";, import { Bot, Zap, Link2, X } from "lucide-react";
- Exports: export function IntelligenceModal({ isOpen, onClose }: IntelligenceModalProps) {
- Reuse guidance: Use this for create/update/delete flows, confirmations, and risky operation approval gates.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { Bot, Zap, Link2, X } from "lucide-react";

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

type AttachmentType = 'none' | 'workflow' | 'agent';

interface IntelligenceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function IntelligenceModal({ isOpen, onClose }: IntelligenceModalProps) {
  const [showConfigurePopup, setShowConfigurePopup] = useState(false);
  const [attachmentType, setAttachmentType] = useState<AttachmentType>('none');
  const [selectedWorkflow, setSelectedWorkflow] = useState<string | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
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

  const handleSelect = (id: string) => {
    if (attachmentType === 'workflow') {
      setSelectedWorkflow(id);
    } else if (attachmentType === 'agent') {
      setSelectedAgent(id);
    }
    setShowPicker(false);
  };

  const handleAttachmentTypeChange = (type: AttachmentType) => {
    setAttachmentType(type);
    if (type === 'none') {
      setSelectedWorkflow(null);
      setSelectedAgent(null);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Intelligence"
        size="lg"
      >
        <div className="space-y-6">
          {/* AI Capability Attachment */}
          <div>
            <label className="block text-sm font-medium dark:text-gray-200 mb-3">
              AI Capability (Optional)
            </label>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <button
                onClick={() => handleAttachmentTypeChange('none')}
                className={`px-4 py-2.5 border rounded-lg transition-all ${
                  attachmentType === 'none'
                    ? 'border-primary bg-primary/5 dark:bg-primary/10 text-primary'
                    : 'border-border dark:border-[#2a2a2a] hover:bg-secondary dark:hover:bg-[#2a2a2a] dark:text-gray-200'
                }`}
              >
                None
              </button>
              <button
                onClick={() => handleAttachmentTypeChange('agent')}
                className={`px-4 py-2.5 border rounded-lg transition-all ${
                  attachmentType === 'agent'
                    ? 'border-primary bg-primary/5 dark:bg-primary/10 text-primary'
                    : 'border-border dark:border-[#2a2a2a] hover:bg-secondary dark:hover:bg-[#2a2a2a] dark:text-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 justify-center">
                  <Bot className="w-4 h-4" />
                  <span>Agent</span>
                </div>
              </button>
              <button
                onClick={() => handleAttachmentTypeChange('workflow')}
                className={`px-4 py-2.5 border rounded-lg transition-all ${
                  attachmentType === 'workflow'
                    ? 'border-primary bg-primary/5 dark:bg-primary/10 text-primary'
                    : 'border-border dark:border-[#2a2a2a] hover:bg-secondary dark:hover:bg-[#2a2a2a] dark:text-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 justify-center">
                  <Zap className="w-4 h-4" />
                  <span>Workflow</span>
                </div>
              </button>
            </div>

            {/* Selected Attachment Display */}
            {attachmentType === 'agent' && selectedAgentData ? (
              <div className="border border-border dark:border-[#2a2a2a] rounded-lg p-3 bg-secondary/30 dark:bg-[#1a1a1a]">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium dark:text-gray-100 text-sm truncate">
                        {selectedAgentData.name}
                      </h4>
                      <p className="text-xs text-muted-foreground dark:text-gray-400 truncate">
                        {selectedAgentData.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedAgent(null)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={selectedAgentData.status === 'active' ? 'success' : 'warning'}>
                    {selectedAgentData.status}
                  </Badge>
                  <span className="text-xs px-2 py-0.5 bg-secondary dark:bg-[#2a2a2a] rounded">
                    {selectedAgentData.model}
                  </span>
                </div>
              </div>
            ) : attachmentType === 'workflow' && selectedWorkflowData ? (
              <div className="border border-border dark:border-[#2a2a2a] rounded-lg p-3 bg-secondary/30 dark:bg-[#1a1a1a]">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium dark:text-gray-100 text-sm truncate">
                        {selectedWorkflowData.name}
                      </h4>
                      <p className="text-xs text-muted-foreground dark:text-gray-400 truncate">
                        {selectedWorkflowData.description}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedWorkflow(null)}
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
            ) : attachmentType !== 'none' ? (
              <Button
                onClick={() => setShowPicker(true)}
                variant="outline"
                className="w-full gap-2"
              >
                <Link2 className="w-4 h-4" />
                Select {attachmentType === 'agent' ? 'AI Agent' : 'Workflow'}
              </Button>
            ) : null}
          </div>

          {/* Configure Button */}
          <div className="flex justify-end gap-2 pt-4 border-t border-border dark:border-[#2a2a2a]">
            <Button
              variant="secondary"
              onClick={() => setShowConfigurePopup(true)}
            >
              Advanced Settings
            </Button>
            <Button onClick={onClose}>
              Save
            </Button>
          </div>
        </div>
      </Modal>

      {/* Picker Modal */}
      <Modal
        isOpen={showPicker}
        onClose={() => setShowPicker(false)}
        title={`Select ${attachmentType === 'agent' ? 'AI Agent' : 'Workflow'}`}
        size="md"
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

      {/* Configure Popup */}
      <Modal
        isOpen={showConfigurePopup}
        onClose={() => setShowConfigurePopup(false)}
        title="Advanced Settings"
        size="sm"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowConfigurePopup(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowConfigurePopup(false)}>
              Save
            </Button>
          </div>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium dark:text-gray-200 mb-2">Maximum thinking time</label>
            <input
              type="number"
              defaultValue={30}
              className="w-full px-4 py-2.5 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">Seconds (max 120)</p>
          </div>
          <div>
            <label className="block text-sm font-medium dark:text-gray-200 mb-2">Thinking depth</label>
            <select className="w-full px-4 py-2.5 border border-border dark:border-[#2a2a2a] rounded-lg bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option>Shallow</option>
              <option>Medium</option>
              <option selected>Deep</option>
            </select>
          </div>
          <div className="flex items-center justify-between p-3 border border-border dark:border-[#2a2a2a] rounded-lg">
            <span className="text-sm font-medium dark:text-gray-200">Show thinking process</span>
            <div className="w-11 h-6 rounded-full bg-primary">
              <div className="w-5 h-5 rounded-full bg-white shadow-sm transform translate-x-6 mt-0.5" />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
````````

## `src/app/components/LazyLoadList.tsx`

- Category: component.
- Imports: import { useState, useEffect, useRef, ReactNode } from "react";, import { Loader2, Check } from "lucide-react";
- Exports: export interface ListItem {, export interface LazyLoadListProps<T extends ListItem> {, export function LazyLoadList<T extends ListItem>({
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, useEffect, useRef, ReactNode } from "react";
import { Loader2, Check } from "lucide-react";

export interface ListItem {
  id: string;
  [key: string]: any;
}

export interface LazyLoadListProps<T extends ListItem> {
  items: T[];
  renderItem: (item: T, isSelected: boolean) => ReactNode;
  onItemClick: (item: T) => void;
  selectedId?: string;
  loadMore?: () => Promise<void>;
  hasMore?: boolean;
  loading?: boolean;
  itemHeight?: number;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyMessage?: string;
  multiSelect?: boolean;
  selectedIds?: string[];
  onSelectionChange?: (selectedIds: string[]) => void;
  highlightOnHover?: boolean;
}

export function LazyLoadList<T extends ListItem>({
  items,
  renderItem,
  onItemClick,
  selectedId,
  loadMore,
  hasMore = false,
  loading = false,
  itemHeight = 60,
  searchable = false,
  searchPlaceholder = "Search...",
  emptyMessage = "No items found",
  multiSelect = false,
  selectedIds = [],
  onSelectionChange,
  highlightOnHover = true,
}: LazyLoadListProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const observerTarget = useRef<HTMLDivElement>(null);

  const handleItemClick = (item: T) => {
    if (multiSelect && onSelectionChange) {
      const isSelected = selectedIds.includes(item.id);
      const newSelection = isSelected
        ? selectedIds.filter(id => id !== item.id)
        : [...selectedIds, item.id];
      onSelectionChange(newSelection);
    } else {
      onItemClick(item);
    }
  };

  const isItemSelected = (item: T): boolean => {
    return multiSelect ? selectedIds.includes(item.id) : selectedId === item.id;
  };

  // Filter items based on search
  const filteredItems = searchQuery
    ? items.filter((item) =>
        Object.values(item).some((value) =>
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : items;

  // Intersection Observer for infinite scroll
  useEffect(() => {
    if (!loadMore || !hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const target = observerTarget.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [loadMore, hasMore, loading]);

  return (
    <div className="flex flex-col h-full">
      {/* Search */}
      {searchable && (
        <div className="p-4 border-b border-border dark:border-[#2a2a2a] bg-white dark:bg-[#1a1a1a]">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full px-3 py-2 border border-border dark:border-[#2a2a2a] bg-white dark:bg-[#0f0f0f] dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      )}

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground dark:text-gray-400">
            {emptyMessage}
          </div>
        ) : (
          <>
            {filteredItems.map((item) => {
              const selected = isItemSelected(item);
              return (
                <div
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`cursor-pointer border-b border-border dark:border-[#2a2a2a] transition-colors ${
                    selected
                      ? 'bg-primary/10 dark:bg-primary/30 border-l-4 border-l-primary'
                      : highlightOnHover
                      ? 'bg-white dark:bg-[#0f0f0f] hover:bg-secondary/50 dark:hover:bg-[#2a2a2a]/50'
                      : 'bg-white dark:bg-[#0f0f0f]'
                  }`}
                  style={{ minHeight: itemHeight }}
                >
                  <div className="flex items-center gap-3 h-full">
                    {multiSelect && (
                      <div className="pl-3">
                        <div
                          className={`w-4 h-4 border rounded flex items-center justify-center transition-colors ${
                            selected
                              ? 'bg-primary border-primary'
                              : 'border-border dark:border-[#2a2a2a]'
                          }`}
                        >
                          {selected && <Check className="w-3 h-3 text-white" />}
                        </div>
                      </div>
                    )}
                    <div className="flex-1">
                      {renderItem(item, selected)}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Loading indicator */}
            {hasMore && (
              <div ref={observerTarget} className="p-4 flex justify-center">
                {loading && (
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
````````

## `src/app/components/LazyLoadTree.tsx`

- Category: component.
- Imports: import { useState, ReactNode } from "react";, import { ChevronRight, ChevronDown, Folder, FolderOpen, File, Loader2 } from "lucide-react";
- Exports: export interface TreeNode {, export interface LazyLoadTreeProps {, export function LazyLoadTree({
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
import { useState, ReactNode } from "react";
import { ChevronRight, ChevronDown, Folder, FolderOpen, File, Loader2 } from "lucide-react";

export interface TreeNode {
  id: string;
  label: string;
  icon?: ReactNode;
  children?: TreeNode[];
  hasChildren?: boolean;
  loadChildren?: () => Promise<TreeNode[]>;
  metadata?: any;
  selectable?: boolean; // If false, node cannot be selected
}

export interface LazyLoadTreeProps {
  nodes: TreeNode[];
  onNodeClick: (node: TreeNode) => void;
  selectedId?: string;
  renderNode?: (node: TreeNode, isSelected: boolean) => ReactNode;
  expandAll?: boolean; // Auto-expand all nodes
  onContextMenu?: (event: React.MouseEvent, node: TreeNode) => void;
}

export function LazyLoadTree({
  nodes,
  onNodeClick,
  selectedId,
  renderNode,
  expandAll = false,
  onContextMenu,
}: LazyLoadTreeProps) {
  // Auto-expand all nodes if expandAll is true
  const getAllNodeIds = (nodeList: TreeNode[]): string[] => {
    const ids: string[] = [];
    const traverse = (n: TreeNode[]) => {
      n.forEach(node => {
        if (node.children || node.hasChildren) {
          ids.push(node.id);
          if (node.children) traverse(node.children);
        }
      });
    };
    traverse(nodeList);
    return ids;
  };

  const [expandedIds, setExpandedIds] = useState<Set<string>>(() =>
    expandAll ? new Set(getAllNodeIds(nodes)) : new Set()
  );
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());
  const [loadedChildren, setLoadedChildren] = useState<Map<string, TreeNode[]>>(new Map());

  const toggleExpand = async (node: TreeNode) => {
    const newExpanded = new Set(expandedIds);

    if (expandedIds.has(node.id)) {
      newExpanded.delete(node.id);
    } else {
      newExpanded.add(node.id);

      // Load children if needed
      if (node.loadChildren && !loadedChildren.has(node.id)) {
        setLoadingIds(new Set(loadingIds).add(node.id));
        try {
          const children = await node.loadChildren();
          setLoadedChildren(new Map(loadedChildren).set(node.id, children));
        } catch (error) {
          console.error('Failed to load children:', error);
        } finally {
          const newLoading = new Set(loadingIds);
          newLoading.delete(node.id);
          setLoadingIds(newLoading);
        }
      }
    }

    setExpandedIds(newExpanded);
  };

  const renderTreeNode = (node: TreeNode, level: number = 0) => {
    const isExpanded = expandedIds.has(node.id);
    const isSelected = selectedId === node.id;
    const isLoading = loadingIds.has(node.id);
    const hasChildNodes = node.children || node.hasChildren || loadedChildren.has(node.id);
    const children = loadedChildren.get(node.id) || node.children || [];
    const isSelectable = node.selectable !== false; // Default to true if not specified

    return (
      <div key={node.id}>
        <div
          className={`flex items-center gap-2 px-3 py-1.5 transition-colors ${
            isSelectable
              ? `cursor-pointer ${isSelected ? 'bg-primary/10 dark:bg-primary/20' : 'hover:bg-secondary/50 dark:hover:bg-[#1a1a1a]'}`
              : 'cursor-default opacity-60'
          }`}
          style={{ paddingLeft: `${level * 20 + 12}px` }}
          onContextMenu={(e) => onContextMenu?.(e, node)}
        >
          {/* Expand/Collapse Button */}
          {hasChildNodes ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpand(node);
              }}
              className="w-4 h-4 flex items-center justify-center"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          ) : (
            <div className="w-4" />
          )}

          {/* Node Content */}
          <div
            onClick={() => isSelectable && onNodeClick(node)}
            className="flex-1 flex items-center gap-2"
          >
            {renderNode ? (
              renderNode(node, isSelected)
            ) : (
              <>
                {node.icon || (
                  hasChildNodes ? (
                    isExpanded ? (
                      <FolderOpen className="w-4 h-4 text-primary" />
                    ) : (
                      <Folder className="w-4 h-4 text-primary" />
                    )
                  ) : (
                    <File className="w-4 h-4 text-muted-foreground" />
                  )
                )}
                <span className="text-sm">{node.label}</span>
              </>
            )}
          </div>
        </div>

        {/* Children */}
        {isExpanded && children.length > 0 && (
          <div>
            {children.map((child) => renderTreeNode(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-[#0f0f0f] h-full overflow-y-auto text-foreground dark:text-gray-300">
      {nodes.map((node) => renderTreeNode(node))}
    </div>
  );
}
````````

## `src/app/components/LoadingState.tsx`

- Category: component.
- Imports: No direct imports in this file.
- Exports: export function LoadingState({ type = 'spinner', count = 3 }: LoadingStateProps) {
- Reuse guidance: Use this component as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````tsx
interface LoadingStateProps {
  type?: 'spinner' | 'skeleton-card' | 'skeleton-list' | 'skeleton-table';
  count?: number;
}

export function LoadingState({ type = 'spinner', count = 3 }: LoadingStateProps) {
  if (type === 'spinner') {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (type === 'skeleton-card') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-xl p-4 animate-pulse">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-secondary dark:bg-[#2a2a2a] rounded-xl" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-secondary dark:bg-[#2a2a2a] rounded w-3/4" />
                <div className="h-3 bg-secondary dark:bg-[#2a2a2a] rounded w-1/2" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-secondary dark:bg-[#2a2a2a] rounded w-full" />
              <div className="h-3 bg-secondary dark:bg-[#2a2a2a] rounded w-5/6" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'skeleton-list') {
    return (
      <div className="space-y-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-xl p-4 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-secondary dark:bg-[#2a2a2a] rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-secondary dark:bg-[#2a2a2a] rounded w-2/3" />
                <div className="h-3 bg-secondary dark:bg-[#2a2a2a] rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'skeleton-table') {
    return (
      <div className="bg-white dark:bg-[#1a1a1a] border border-border dark:border-[#2a2a2a] rounded-xl overflow-hidden">
        <div className="border-b border-border dark:border-[#2a2a2a] p-4 animate-pulse">
          <div className="flex gap-4">
            <div className="h-4 bg-secondary dark:bg-[#2a2a2a] rounded w-32" />
            <div className="h-4 bg-secondary dark:bg-[#2a2a2a] rounded w-40" />
            <div className="h-4 bg-secondary dark:bg-[#2a2a2a] rounded w-24" />
          </div>
        </div>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="border-b border-border dark:border-[#2a2a2a] p-4 animate-pulse">
            <div className="flex gap-4">
              <div className="h-3 bg-secondary dark:bg-[#2a2a2a] rounded w-32" />
              <div className="h-3 bg-secondary dark:bg-[#2a2a2a] rounded w-40" />
              <div className="h-3 bg-secondary dark:bg-[#2a2a2a] rounded w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
````````
