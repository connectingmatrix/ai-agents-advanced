import { buildComponentFiles } from '../software-renderers/io/component-files';
import { buildReadmeFile, buildTestFile } from '../software-renderers/io/docs-file';
import { buildElectronFiles } from '../software-renderers/io/electron-files';
import { buildManifestFile } from '../software-renderers/contracts/manifest-file';
import { buildNodeApiFiles } from '../software-renderers/io/node-api-files';
import { buildPackageFile } from '../software-renderers/io/package-file';
import { buildProcessFiles } from '../software-renderers/io/process-files';
import { buildReactFiles } from '../software-renderers/io/react-files';
import { buildSchemaFile, buildSeedFile } from '../software-renderers/contracts/schema-file';
import { buildScreenFiles } from '../software-renderers/io/screen-files';
import { buildStaticIndexFile } from '../software-renderers/runtime/static-html';
import { buildStyleFile } from '../software-renderers/io/style-file';
import { buildUiKitUsageFiles } from '../software-renderers/io/ui-kit-usage-file';
import { buildUiKitComponentFile } from '../software-renderers/io/ui-kit-component-file';
import type { SoftwareDomainBlueprint } from '../software-blueprints';
import type { SoftwareTemplate } from '../softwares';
import type { AdvancedSoftwareFile, AdvancedSoftwareSystemSpec } from '../contracts/types';
import type { SoftwareDevelopmentProcess } from '../software-development-process';

export const buildSoftwareFiles = (params: {
  appSlug: string;
  name: string;
  prompt: string;
  modules: string[];
  template: SoftwareTemplate;
  database: AdvancedSoftwareSystemSpec['database'];
  blueprint: SoftwareDomainBlueprint;
  softwareProcess: SoftwareDevelopmentProcess;
}): AdvancedSoftwareFile[] => {
  const context = { ...params, modules: params.modules.length ? params.modules : params.blueprint.modules };
  const sharedFiles = [
    buildPackageFile(context),
    buildSchemaFile(context),
    buildSeedFile(context),
    buildManifestFile(context),
    buildReadmeFile(context),
    buildTestFile(context),
    ...buildUiKitUsageFiles(),
    ...buildProcessFiles(context),
  ];
  if (context.template.framework === 'node-api') return [...sharedFiles, ...buildNodeApiFiles(context)];
  return [
    buildStaticIndexFile(context),
    buildStyleFile(),
    buildUiKitComponentFile(),
    ...buildReactFiles(context),
    ...buildScreenFiles(context),
    ...buildComponentFiles(),
    ...sharedFiles,
    ...buildElectronFiles(context),
  ];
};
