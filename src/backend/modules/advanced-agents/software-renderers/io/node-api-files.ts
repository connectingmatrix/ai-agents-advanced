import type { AdvancedSoftwareFile, SoftwareBuildContext } from '../contracts/types';

export const buildNodeApiFiles = (context: SoftwareBuildContext): AdvancedSoftwareFile[] => [
  {
    path: 'src/server.ts',
    kind: 'ts',
    content: `const manifest = ${JSON.stringify(
      { name: context.name, modules: context.modules, workflows: context.blueprint.workflows },
      null,
      2,
    )} as const;\n\nBun?.serve?.({ fetch: () => Response.json(manifest) });\nconsole.log(JSON.stringify(manifest));\n`,
  },
  { path: 'src/routes.ts', kind: 'ts', content: `export const routes = ${JSON.stringify(context.blueprint.routes, null, 2)} as const;\n` },
];
