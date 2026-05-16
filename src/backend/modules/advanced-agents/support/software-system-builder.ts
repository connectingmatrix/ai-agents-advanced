import { randomUUID } from 'node:crypto';
import { parseBooleanValue, parseNumberValue, parseRecordValue } from 'giga-ai-helper/workflow';
import { buildSoftwareFiles } from '../io/software-files';
import { findSoftwareBlueprint } from '../software-blueprints';
import { buildSoftwareDevelopmentProcess } from '../software-development-process';
import { findSoftwareTemplate } from '../softwares';
import { neutralizeGeneratedBranding } from './software-branding';
import { detectSoftwareFramework, detectSoftwareModules, readSoftwareSlug, readSoftwareText } from './software-detection';
import { scoreAdvancedSoftwareSystem } from './software-quality';
import type { AdvancedSoftwareSystemSpec } from '../contracts/types';

export function generateAdvancedSoftwareSystem(input: Record<string, unknown>): AdvancedSoftwareSystemSpec {
  const prompt = neutralizeGeneratedBranding(readSoftwareText(input.prompt || input.message || input.goal || 'Generated application'));
  const blueprint = findSoftwareBlueprint(prompt);
  const requestedName = neutralizeGeneratedBranding(readSoftwareText(input.name));
  const name = requestedName || blueprint.defaultName || prompt.slice(0, 70).replace(/[\n\r]+/g, ' ');
  const framework = detectSoftwareFramework(prompt);
  const template = findSoftwareTemplate(framework);
  const modules = detectSoftwareModules(prompt, input.modules);
  const appSlug = readSoftwareSlug(name);
  const database =
    /database|sqlite|orm|management|rcm|hospital|school|edtech|practice|turbulence/i.test(prompt) || template.database !== 'none'
      ? template.database
      : 'none';
  const softwareProcess = buildSoftwareDevelopmentProcess({ name, prompt, modules, blueprint });
  const files = buildSoftwareFiles({ appSlug, name, prompt, modules, template, database, blueprint, softwareProcess });
  const spec: AdvancedSoftwareSystemSpec = {
    id: randomUUID(),
    name,
    slug: appSlug,
    prompt,
    framework: template.framework,
    database,
    orm: database === 'none' ? 'none' : template.orm,
    files,
    commands: [
      { name: 'install', command: 'npm', args: ['install', '--ignore-scripts', '--no-audit', '--no-fund'], risk: 'package-install' },
      { name: 'build', command: 'npm', args: ['run', 'build'], risk: 'long-running' },
      { name: 'dev', command: 'npm', args: ['run', 'dev'], risk: 'local-computer' },
    ],
    runner: {
      mode: parseBooleanValue(input.local) ? 'local-runner' : 'sandbox',
      port: parseNumberValue(input.port, 5173),
      url: `/generated-apps/${appSlug}`,
    },
    metadata: {
      modules,
      blueprint,
      uiKit: { source: 'sanitized-ui-kit-cache', enforced: true },
      softwareProcess,
      matrices: {
        featurePatterns: softwareProcess.featurePatternMatrix,
        routeAuthRbac: softwareProcess.routeAuthRbacMatrix,
        crudOperations: softwareProcess.crudOperationMatrix,
        backendContracts: softwareProcess.backendContractMatrix,
        screenStates: softwareProcess.screenStateMatrix,
        tests: softwareProcess.testCoverageMatrix,
      },
      definitionOfDone: softwareProcess.definitionOfDone,
      backendContract: softwareProcess.backendContractMatrix,
      originalInput: parseRecordValue(input),
    },
  };
  return { ...spec, metadata: { ...spec.metadata, quality: scoreAdvancedSoftwareSystem(spec) } };
}

export { createAdvancedSoftwareProject, queueAdvancedSoftwareRun } from './software-project';
export { createAdvancedSoftwareDeployment } from './software-deployment';
