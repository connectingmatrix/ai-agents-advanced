import { authScreensHtml, homeScreenHtml } from '../auth/static-app-auth';
import { crudNavHtml, crudScreensHtml } from './static-app-crud';
import { dashboardScreenHtml } from './static-app-dashboard';
import { reportsScreenHtml, settingsScreenHtml } from './static-app-reports';
import { buildStaticAppScript } from './static-app-script';
import { staticAppCss } from './static-app-css';
import type { AdvancedSoftwareFile, SoftwareBuildContext } from '../contracts/types';

const navHtml = (context: SoftwareBuildContext) =>
  `<a href="#/home"><span>Home</span><small>Product landing and value proposition</small></a><a href="#/login"><span>Login</span><small>Role simulation and session start</small></a><a href="#/signup"><span>Signup</span><small>Invite and onboarding flow</small></a><a href="#/dashboard"><span>Dashboard</span><small>KPIs, queues, and critical work</small></a>${crudNavHtml(
    context,
  )}<a href="#/reports"><span>Reports</span><small>Charts, trends, and report library</small></a><a href="#/settings"><span>Settings</span><small>Configuration, roles, integrations</small></a>`;

export const buildStaticIndexFile = (context: SoftwareBuildContext): AdvancedSoftwareFile => ({
  path: 'index.html',
  kind: 'html',
  content: `<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${
    context.name
  }</title><style>${staticAppCss}</style></head><body><div id="root" data-generated-app-shell="static"><div class="app-shell"><aside><p class="eyebrow">Application Studio</p><h1>${
    context.name
  }</h1><p>${context.blueprint.summary}</p><nav>${navHtml(context)}</nav></aside><main>${homeScreenHtml(
    context,
  )}${authScreensHtml()}${dashboardScreenHtml(context)}${crudScreensHtml(context)}${reportsScreenHtml(context)}${settingsScreenHtml(
    context,
  )}<section class="screen" data-screen="unauthorized"><section class="panel"><h2>Unauthorized</h2><p>Your current role cannot access this screen. Switch to an admin role from Login to validate route guards.</p><a href="#/login">Switch role</a></section></section><section class="screen" data-screen="offline"><section class="panel"><h2>Offline mode</h2><p>The generated app shell remains available while the network reconnects.</p><a href="#/dashboard">Return to dashboard</a></section></section><section class="screen" data-screen="not-found"><section class="panel"><h2>Screen not found</h2><p>This generated app uses internal hash routing so it stays inside its deployment frame.</p><a href="#/home">Return home</a></section></section></main><div id="toast-region" role="status" aria-live="polite" hidden></div></div></div><script>${buildStaticAppScript(
    context,
  )}</script><script>if(!window.__AGENT_APP_LIVE__&&!location.pathname.includes('/api/v2/agent-apps/live/')){const entry=document.createElement('script');entry.type='module';entry.src='/src/main.tsx';document.body.appendChild(entry);}</script></body></html>`,
});
