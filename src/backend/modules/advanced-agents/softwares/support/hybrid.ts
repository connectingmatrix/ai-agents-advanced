import type { SoftwareTemplate } from '../contracts/types';

export const hybridSoftware: SoftwareTemplate = {
  framework: 'hybrid',
  database: 'duckdb',
  orm: 'drizzle-lite',
  label: 'Hybrid Application',
  dependencies: {
    typescript: 'latest',
  },
};
