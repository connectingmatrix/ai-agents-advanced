import type { AdvancedSoftwareFile, SoftwareBuildContext } from '../contracts/types';

export const buildPackageFile = (context: SoftwareBuildContext): AdvancedSoftwareFile => {
  const dependencies = {
    ...context.template.dependencies,
    '@vitejs/plugin-react': context.template.framework === 'node-api' ? undefined : 'latest',
    react: context.template.framework === 'node-api' ? undefined : 'latest',
    'react-dom': context.template.framework === 'node-api' ? undefined : 'latest',
    vite: context.template.framework === 'node-api' ? undefined : 'latest',
    'better-sqlite3': context.database === 'sqlite' ? 'latest' : undefined,
  };
  const scripts =
    context.template.framework === 'node-api'
      ? { dev: 'tsx src/server.ts', build: 'tsc --noEmit', test: 'vitest run', start: 'node dist/server.js' }
      : { dev: 'vite --host 0.0.0.0', build: 'vite build', test: 'vitest run', start: 'vite --host 0.0.0.0' };
  const cleanDependencies = Object.fromEntries(Object.entries(dependencies).filter((entry) => entry[1]));
  return {
    path: 'package.json',
    kind: 'json',
    content: JSON.stringify(
      { name: context.appSlug, version: '0.1.0', type: 'module', scripts, dependencies: cleanDependencies, devDependencies: { vitest: 'latest' } },
      null,
      2,
    ),
  };
};
