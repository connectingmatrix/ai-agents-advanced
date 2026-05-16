import { electronSoftware } from './runtime/electron';
import { hybridSoftware } from './runtime/hybrid';
import { nodeApiSoftware } from './runtime/node-api';
import { threeJsGameSoftware } from './runtime/threejs-game';
import { webappSoftware } from './runtime/webapp';
import type { SoftwareDatabase, SoftwareFramework, SoftwareOrm, SoftwareTemplate } from './contracts/types';

export const softwareTemplates: ReadonlyArray<SoftwareTemplate> = [
  webappSoftware,
  nodeApiSoftware,
  electronSoftware,
  threeJsGameSoftware,
  hybridSoftware,
];

export const softwareFrameworks = softwareTemplates.map((template) => template.framework) as ReadonlyArray<SoftwareFramework>;
export const softwareDatabases = softwareTemplates.map((template) => template.database) as ReadonlyArray<SoftwareDatabase>;
export const softwareOrms = softwareTemplates.map((template) => template.orm) as ReadonlyArray<SoftwareOrm>;

export const findSoftwareTemplate = (framework: string): SoftwareTemplate =>
  softwareTemplates.find((template) => template.framework === framework) || webappSoftware;

export * from './contracts/types';
export * from './runtime/webapp';
export * from './runtime/node-api';
export * from './runtime/electron';
export * from './runtime/threejs-game';
export * from './runtime/hybrid';
