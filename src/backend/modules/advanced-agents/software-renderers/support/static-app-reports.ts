import { barRowsSvg, donutSvg, sparklineSvg } from './static-app-charts';
import type { SoftwareBuildContext } from '../contracts/types';

const chartCard = (label: string, value: number, index: number) =>
  `<article class="chart-card" data-ui-kit-component="MetricCard"><h3>${label}</h3>${
    index % 2 ? donutSvg(label, value * 2.76) : sparklineSvg(index)
  }<div class="bar"><span style="width:${value}%"></span></div><p>${value}% trend score derived from seed records, not empty placeholders.</p></article>`;

export const reportsScreenHtml = (context: SoftwareBuildContext) =>
  `<section class="screen" data-screen="reports"><section class="panel" data-ui-kit-component="Panel"><h2>Reporting and charts</h2><p>Executive reporting uses UI-kit MetricCard, SparklineChart, Panel, and table patterns with chart specs tied to domain metrics.</p><div class="chart-grid">${context.blueprint.metrics
    .map((metric, index) => chartCard(metric, 48 + index * 11, index))
    .join('')}</div></section><section class="panel"><h3>Operational report mix</h3>${barRowsSvg(
    context.blueprint.metrics,
  )}<table data-ui-kit-component="LogViewerTable"><thead><tr><th>Report</th><th>Audience</th><th>Refresh</th></tr></thead><tbody>${context.softwareProcess.roleRouteMatrix
    .slice(0, 6)
    .map((row) => `<tr><td>${row.role} performance report</td><td>${row.role}</td><td>Daily</td></tr>`)
    .join('')}</tbody></table></section></section>`;

export const settingsScreenHtml = (context: SoftwareBuildContext) =>
  `<section class="screen" data-screen="settings"><section class="panel"><h2>Settings and configuration</h2><p>Administrative setup for roles, statuses, integrations, workflow thresholds, and reporting periods.</p><div class="crud-grid">${context.modules
    .map(
      (module) =>
        `<article class="form-card"><h3>${module}</h3><label data-ui-kit-component="FormField">Status rule<input value="Active, Pending, Archived"/></label><label data-ui-kit-component="FormField">Owner role<input value="${
          context.softwareProcess.roleRouteMatrix[0]?.role || 'Admin'
        }"/></label><label data-ui-kit-component="FormField">Integration mode<select><option>Demo placeholder</option><option>Credential required</option></select></label></article>`,
    )
    .join('')}</div></section></section>`;
