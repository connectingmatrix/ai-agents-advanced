import type { SoftwareTemplate } from '../contracts/types';

export const nodeApiSoftware: SoftwareTemplate = {
  framework: 'node-api',
  database: 'sqlite',
  orm: 'giga-lite-orm',
  label: 'Node API Service',
  dependencies: {
    typescript: 'latest',
  },
};
