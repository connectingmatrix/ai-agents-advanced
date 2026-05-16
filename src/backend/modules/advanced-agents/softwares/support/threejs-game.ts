import type { SoftwareTemplate } from '../contracts/types';

export const threeJsGameSoftware: SoftwareTemplate = {
  framework: 'threejs-game',
  database: 'none',
  orm: 'none',
  label: 'Three.js Game',
  dependencies: {
    three: 'latest',
    typescript: 'latest',
    vite: 'latest',
  },
};
