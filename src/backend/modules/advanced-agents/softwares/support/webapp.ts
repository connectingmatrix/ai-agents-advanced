import type { SoftwareTemplate } from '../contracts/types';

export const webappSoftware: SoftwareTemplate = {
  framework: 'react-vite',
  database: 'sqlite',
  orm: 'giga-lite-orm',
  label: 'Web Application',
  dependencies: {
    '@vitejs/plugin-react': 'latest',
    react: 'latest',
    'react-dom': 'latest',
    typescript: 'latest',
    vite: 'latest',
  },
};
