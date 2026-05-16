import type { AdvancedAgentTask } from '../contracts/types';

export type AdvancedGap = {
  id: string;
  area: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  finding: string;
  fix: string;
  evidence?: string;
};

export function identifyAdvancedGaps(input: Record<string, unknown> = {}): AdvancedGap[] {
  const known = String(input.audit || input.report || '').toLowerCase();
  const gaps: AdvancedGap[] = [
    {
      id: 'build-first',
      area: 'build-health',
      severity: 'critical',
      finding: 'Feature overlays cannot be trusted while backend/workflow builds are failing.',
      fix: 'Run build repair first, add entity compatibility shims only as transition wrappers, then remove legacy call sites in a dedicated pass.',
      evidence: known.includes('479') ? 'Audit mentioned 479 webpack errors.' : undefined,
    },
    {
      id: 'swarm-execution',
      area: 'multi-agent',
      severity: 'high',
      finding: 'Swarm planning exists but specialist agents need durable task graph execution, evidence collection, verifier, and cleanup.',
      fix: 'Use advanced task graph, worker roles, confirmation gate, run ledger, and artifact collector.',
    },
    {
      id: 'software-runner',
      area: 'generated-software',
      severity: 'high',
      finding: 'Generated app scaffolds need build/run/host lifecycle, command policy, logs, local runner support, and DB manifest.',
      fix: 'Use software.create, software.run, software.host and runner job protocol with approval gates.',
    },
    {
      id: 'memory-quality',
      area: 'agent-memory',
      severity: 'medium',
      finding: 'Memory exists but needs feedback, preference, domain, and episodic memory channels with retrieval scoring.',
      fix: 'Persist user feedback and useful facts into agent memory and load memory preamble before planning.',
    },
    {
      id: 'gis-world',
      area: 'charts-gis',
      severity: 'medium',
      finding: 'US/Pakistan maps exist but world/all-country maps, coordinate plotting, routes, heatmaps, and buffer specs need a unified GIS spec.',
      fix: 'Use advanced GIS spec and deck.gl GeoJsonLayer/Scatterplot layers for world and country maps.',
    },
    {
      id: 'image-pipeline',
      area: 'image',
      severity: 'medium',
      finding: 'Image operations need an artifact-backed executor plan instead of only prompt text.',
      fix: 'Use image.operation/image.sprite_sheet to produce executor jobs and publish artifacts.',
    },
    {
      id: 'platform-fix',
      area: 'self-repair',
      severity: 'high',
      finding:
        'The agent can discuss platform fixes but needs safe repo diagnostics, patch planning, and runner-based execution without direct DB bypass.',
      fix: 'Use platform.fix.plan and local-runner jobs gated by user approval.',
    },
  ];
  return gaps;
}

export function gapsToTasks(gaps: AdvancedGap[]): AdvancedAgentTask[] {
  return gaps.map((gap, index) => ({
    id: `gap-${index + 1}-${gap.id}`,
    title: gap.fix,
    description: gap.finding,
    status: gap.severity === 'critical' ? 'pending' : 'pending',
    ownerRole: gap.area,
    risk: gap.severity === 'critical' || gap.severity === 'high' ? 'write' : 'none',
    evidence: gap.evidence ? [gap.evidence] : [],
  }));
}
