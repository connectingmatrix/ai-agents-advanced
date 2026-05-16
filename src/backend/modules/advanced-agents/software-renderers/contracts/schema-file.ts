import type { AdvancedSoftwareFile, SoftwareBuildContext } from './types';

export const buildSchemaFile = (context: SoftwareBuildContext): AdvancedSoftwareFile => ({
  path: 'db/schema.sql',
  kind: 'sql',
  content:
    context.database === 'none'
      ? '-- no database requested'
      : context.blueprint.tables
          .map(
            (table) =>
              `CREATE TABLE IF NOT EXISTS ${table.name} (\n${table.columns
                .map((column) => `  ${column} TEXT${column === 'id' ? ' PRIMARY KEY' : ''}`)
                .join(',\n')}\n);`,
          )
          .join('\n\n'),
});

export const buildSeedFile = (context: SoftwareBuildContext): AdvancedSoftwareFile => ({
  path: 'db/seed.json',
  kind: 'json',
  content: JSON.stringify(
    { records: context.blueprint.records, workflows: context.blueprint.workflows, metrics: context.blueprint.metrics },
    null,
    2,
  ),
});
