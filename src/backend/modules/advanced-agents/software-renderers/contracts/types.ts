import type { AdvancedSoftwareFile, AdvancedSoftwareSystemSpec } from '../../contracts/types';
import type { SoftwareDomainBlueprint } from '../../software-blueprints';
import type { SoftwareDevelopmentProcess } from '../../software-development-process';
import type { SoftwareTemplate } from '../../softwares';

export type { AdvancedSoftwareFile };

export type SoftwareBuildContext = {
  appSlug: string;
  name: string;
  prompt: string;
  modules: string[];
  template: SoftwareTemplate;
  database: AdvancedSoftwareSystemSpec['database'];
  blueprint: SoftwareDomainBlueprint;
  softwareProcess: SoftwareDevelopmentProcess;
};
