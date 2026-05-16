import { educationBlueprint } from './runtime/education';
import { generalBlueprint } from './runtime/general';
import { healthcareBlueprint } from './runtime/healthcare';
import { rcmBlueprint } from './runtime/rcm';
import { researchBlueprint } from './runtime/research';
import type { SoftwareDomainBlueprint } from './contracts/types';

export const softwareBlueprints: ReadonlyArray<SoftwareDomainBlueprint> = [
  rcmBlueprint,
  healthcareBlueprint,
  educationBlueprint,
  researchBlueprint,
  generalBlueprint,
];

export const findSoftwareBlueprint = (prompt: string): SoftwareDomainBlueprint => {
  const healthcareIntent =
    prompt.match(/hospital|practice management|patient registration|appointment|provider|encounter|clinical|lab|pharmacy|inventory/gi)?.length || 0;
  const rcmIntent = prompt.match(/rcm|revenue cycle|claim|denial|payer|insurance|appeal|medical billing/gi)?.length || 0;
  if (healthcareIntent >= 3 && /hospital|practice management|patient registration/i.test(prompt)) return healthcareBlueprint;
  if (rcmIntent >= 2) return rcmBlueprint;
  return softwareBlueprints.find((blueprint) => blueprint.keywords.test(prompt)) || generalBlueprint;
};

export * from './contracts/types';
export * from './runtime/rcm';
export * from './runtime/healthcare';
export * from './runtime/education';
export * from './runtime/research';
export * from './runtime/general';
