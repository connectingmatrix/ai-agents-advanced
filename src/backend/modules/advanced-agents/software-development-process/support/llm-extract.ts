import { z } from 'zod';
import { openAIChatModelProfile } from '@connectingmatrix/ai-agents/services/ai-agents/io/model-profile';
import type { SoftwareRequirementBreakdown } from '../contracts/types';

const extractionSchema = z.object({
  productSummary: z.string(),
  userRoles: z.array(z.string()),
  screens: z.array(z.string()),
  features: z.array(z.string()),
  dataEntities: z.array(z.string()),
  businessRules: z.array(z.string()),
  permissions: z.array(z.string()),
  pwaExpectations: z.array(z.string()),
  testingExpectations: z.array(z.string()),
  deploymentExpectations: z.array(z.string()),
});

export async function extractSoftwareRequirementsWithLlm(prompt: string): Promise<SoftwareRequirementBreakdown> {
  const { openai } = await import('@giga/shared/services/common/openai-client');
  const response = await openai.chat.completions.create({
    ...openAIChatModelProfile(),
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: 'Extract a software requirement document into strict JSON fields matching the requested keys. Do not add markdown.',
      },
      { role: 'user', content: prompt },
    ],
  });
  const content = response.choices[0]?.message?.content;
  if (!content) throw new Error('LLM requirement extraction returned an empty response.');
  return extractionSchema.parse(JSON.parse(content));
}
