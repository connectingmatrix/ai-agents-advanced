import type { AdvancedSoftwareFile, SoftwareBuildContext } from '../contracts/types';

export const buildReadmeFile = (context: SoftwareBuildContext): AdvancedSoftwareFile => ({
  path: 'README.md',
  kind: 'md',
  content: `# ${context.name}\n\n${context.blueprint.summary}\n\n## Routes\n\n${context.blueprint.routes
    .map((route) => `- ${route.label}: ${route.summary}`)
    .join('\n')}\n\n## Data Model\n\n${context.blueprint.tables
    .map((table) => `- ${table.name}: ${table.columns.join(', ')}`)
    .join(
      '\n',
    )}\n\n## Run\n\nUse \`npm install && npm run dev\` for local development, or deploy the static \`index.html\` through the agent app host.\n`,
});

export const buildTestFile = (context: SoftwareBuildContext): AdvancedSoftwareFile => ({
  path: 'tests/domain.spec.ts',
  kind: 'ts',
  content: `import { describe, expect, it } from 'vitest';\nimport { appManifest } from '../src/app/data/domain';\n\ndescribe('${context.blueprint.label}', () => {\n  it('ships domain routes, records, and workflows', () => {\n    expect(appManifest.routes.length).toBeGreaterThan(3);\n    expect(appManifest.records.length).toBeGreaterThan(2);\n    expect(appManifest.workflows.length).toBeGreaterThan(2);\n  });\n});\n`,
});
