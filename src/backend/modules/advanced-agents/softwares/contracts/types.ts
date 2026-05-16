export type SoftwareFramework = 'react-vite' | 'node-api' | 'electron' | 'threejs-game' | 'hybrid';

export type SoftwareDatabase = 'sqlite' | 'duckdb' | 'none';

export type SoftwareOrm = 'giga-lite-orm' | 'drizzle-lite' | 'none';

export type SoftwareTemplate = {
  framework: SoftwareFramework;
  database: SoftwareDatabase;
  orm: SoftwareOrm;
  label: string;
  dependencies: Record<string, string>;
};
