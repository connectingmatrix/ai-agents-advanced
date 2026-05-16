export type AdvancedOutputBlock =
  | { type: 'markdown'; markdown: string }
  | { type: 'terminal'; content: string }
  | { type: 'excel'; path: string; title?: string }
  | { type: 'chart'; spec: Record<string, unknown> }
  | { type: 'chart-group'; columns: string; charts: Array<Record<string, unknown>> }
  | { type: 'banner'; tone: 'info' | 'success' | 'warning' | 'error'; title: string; body: string }
  | { type: 'file'; path: string; title?: string }
  | { type: 'workflow'; workflowId: string; title?: string }
  | { type: 'confirmation'; confirmationId: string; reason: string };

export const ADVANCED_AGENT_OUTPUT_SEED = `
Use the Giga output protocol when useful:
- [EXCEL]storage-or-download-path[/EXCEL]
- [chart]{JSON chart spec}[/chart]
- [chart-group columns="1/3"][chart]{...}[/chart][chart]{...}[/chart][/chart-group]
- [banner tone="info|success|warning|error" title="Title"]message[/banner]
- [terminal]command output or logs[/terminal]
- [file title="Name"]storage-or-download-path[/file]
- [workflow]workflow-id[/workflow]
Never invent downloadable links. Publish artifacts first, then include returned URLs.
`;

export function renderOutputBlocks(blocks: AdvancedOutputBlock[]): string {
  return blocks
    .map((block) => {
      if (block.type === 'markdown') return block.markdown;
      if (block.type === 'terminal') return `[terminal]\n${block.content}\n[/terminal]`;
      if (block.type === 'excel') return `[EXCEL]${block.path}[/EXCEL]`;
      if (block.type === 'chart') return `[chart]${JSON.stringify(block.spec)}[/chart]`;
      if (block.type === 'chart-group')
        return `[chart-group columns="${block.columns}"]${block.charts
          .map((chart) => `[chart]${JSON.stringify(chart)}[/chart]`)
          .join('')}[/chart-group]`;
      if (block.type === 'banner') return `[banner tone="${block.tone}" title="${block.title}"]${block.body}[/banner]`;
      if (block.type === 'file') return `[file title="${block.title || 'File'}"]${block.path}[/file]`;
      if (block.type === 'workflow') return `[workflow]${block.workflowId}[/workflow]`;
      return `[confirmation id="${block.confirmationId}"]${block.reason}[/confirmation]`;
    })
    .join('\n\n');
}
