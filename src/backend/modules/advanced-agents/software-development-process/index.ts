import { z } from 'zod';
import { findSoftwareBlueprint } from '../software-blueprints';
import { buildSoftwareDevelopmentProcess } from './runtime/builders';
import { extractSoftwareRequirementsWithLlm } from './runtime/llm-extract';

export { buildSoftwareDevelopmentProcess } from './runtime/builders';
export { buildSoftwareProcessMatrices } from './runtime/matrices';
export { buildSoftwareAgentWorkGraph, roleExpectedOutput, softwareDevelopmentRoles } from './runtime/roles';
export { defaultValueScore, processScoreCaps } from './runtime/value-score';
export type { SoftwareDevelopmentProcess, SoftwareProcessInput } from './contracts/types';
export type {
  SoftwareBackendContract,
  SoftwareCrudEntry,
  SoftwareFeaturePattern,
  SoftwareProcessMatrices,
  SoftwareRouteRbacEntry,
  SoftwareScreenState,
  SoftwareTestCoverage,
  SoftwareValueScore,
} from './contracts/matrix-types';

const processToolInputSchema = z.object({
  name: z.string().optional(),
  prompt: z.string().optional(),
  message: z.string().optional(),
  modules: z.array(z.string()).optional(),
  extractionMode: z.enum(['deterministic', 'llm']).optional(),
});

export async function executeSoftwareDevelopmentProcess(rawInput: unknown) {
  const input = processToolInputSchema.parse(rawInput);
  const prompt = input.prompt || input.message || 'Generated application';
  const blueprint = findSoftwareBlueprint(prompt);
  const process = buildSoftwareDevelopmentProcess({
    name: input.name || prompt.slice(0, 70).replace(/[\n\r]+/g, ' '),
    prompt,
    modules: input.modules || blueprint.modules,
    blueprint,
    extractionMode: input.extractionMode || 'deterministic',
  });
  if (input.extractionMode !== 'llm') return process;
  try {
    return { ...process, requirementBreakdown: await extractSoftwareRequirementsWithLlm(prompt) };
  } catch (error) {
    return { status: 'failed', stage: 'llm_extraction', error: error instanceof Error ? error.message : 'LLM extraction failed.' };
  }
}
