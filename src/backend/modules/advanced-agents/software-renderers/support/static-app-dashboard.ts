import { sparklineSvg } from './static-app-charts';
import type { SoftwareBuildContext } from '../contracts/types';

const metricHtml = (context: SoftwareBuildContext) =>
  context.blueprint.metrics
    .map(
      (metric, index) =>
        `<article class="metric" data-ui-kit-component="MetricCard"><span>${metric}</span><strong>${index + 2}${
          index === 1 ? '%' : ''
        }</strong><small>Seed-backed operating signal</small>${sparklineSvg(index)}</article>`,
    )
    .join('');
const recordHtml = (context: SoftwareBuildContext) =>
  context.blueprint.records
    .map((record) => `<tr><td>${record.title}</td><td>${record.status}</td><td>${record.owner}</td><td>${record.value}</td></tr>`)
    .join('');
const workflowHtml = (context: SoftwareBuildContext) =>
  context.blueprint.workflows
    .map((workflow) => `<li><strong>${workflow}</strong><span>Ready for queue execution, audit, and escalation.</span></li>`)
    .join('');
const agentHtml = (context: SoftwareBuildContext) =>
  context.softwareProcess.agentWorkGraph
    .slice(0, 8)
    .map((agent) => `<li><strong>${agent.title}</strong><span>${agent.expectedOutput}</span></li>`)
    .join('');

export const dashboardScreenHtml = (context: SoftwareBuildContext) =>
  `<section class="screen" data-screen="dashboard"><section class="hero"><div><p class="eyebrow">Command center</p><h2>Operational dashboard</h2><p>Role-filtered KPIs, queues, critical records, and workflow readiness in one workspace.</p><div class="kit-badges"><span>Root</span><span>Sidebar</span><span>GlobalHeader</span><span>MetricCard</span><span>SparklineChart</span></div></div><button>New record</button></section><section class="metrics">${metricHtml(
    context,
  )}</section><section class="panel" data-ui-kit-component="EnhancedDataTable"><h2>Priority records</h2><table><thead><tr><th>Title</th><th>Status</th><th>Owner</th><th>Value</th></tr></thead><tbody>${recordHtml(
    context,
  )}</tbody></table></section><section class="panel"><h2>Workflow automation</h2><ul class="workflow-list">${workflowHtml(
    context,
  )}</ul></section><section class="panel"><h2>Specialist build swarm</h2><ul class="agent-grid">${agentHtml(context)}</ul></section></section>`;
