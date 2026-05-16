import { uiKitComponentContracts, uiKitPagePatterns } from '../../ui-kit';
import type { SoftwareDomainBlueprint } from '../../software-blueprints';
import type { SoftwareAgentWorkNode } from '../contracts/types';

export function buildUiResearchArtifact(blueprint: SoftwareDomainBlueprint) {
  return {
    screenArchitecture: ['home', 'login', 'signup', 'dashboard', ...blueprint.tables.map((table) => table.name), 'reports', 'settings'],
    approvedComponents: uiKitComponentContracts,
    pagePatterns: uiKitPagePatterns,
    accessibility: ['landmarks', 'keyboard routes', 'form labels', 'chart text summaries', 'contrast-safe status labels'],
    mobile: ['collapsible sidebar', 'single-column cards', 'sticky actions', 'touch-sized table controls'],
  };
}

export function buildAgentWorkPackets(nodes: SoftwareAgentWorkNode[], blueprint: SoftwareDomainBlueprint) {
  return nodes.map((node) => ({
    id: node.id,
    owner: node.title,
    lifecycleStep: node.lifecycleStep,
    task: node.expectedOutput,
    inputs: [blueprint.label, blueprint.summary, ...blueprint.modules.slice(0, 3)],
    outputs: ['artifact path', 'acceptance notes', 'verification status'],
    memoryNamespace: node.memoryNamespace,
    matrixReferences: ['ui-kit-component-matrix', 'feature-pattern-matrix', 'route-auth-rbac-matrix', 'backend-contract-matrix'],
    expectedArtifactPaths: ['docs/generated', 'src/app', 'backend', 'tests'],
    verificationStatus: 'planned' as const,
  }));
}

export function buildResearchBrief(blueprint: SoftwareDomainBlueprint) {
  return {
    domain: blueprint.label,
    coreScreens: blueprint.routes.map((route) => route.label),
    coreEntities: blueprint.tables.map((table) => table.name),
    workflowRisks: blueprint.workflows.map((workflow) => `${workflow} needs status, owner, SLA, evidence, and audit fields.`),
    reportingNeeds: blueprint.metrics.map((metric) => `${metric} needs sparkline, trend, target, and source records.`),
  };
}
