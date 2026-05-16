import type { SoftwareTemplate } from '../contracts/types';

export const electronSoftware: SoftwareTemplate = {
  framework: 'electron',
  database: 'sqlite',
  orm: 'giga-lite-orm',
  label: 'Electron Desktop Application',
  dependencies: {
    electron: 'latest',
    typescript: 'latest',
  },
};
