import type { AgentRunInput } from '@connectingmatrix/ai-agents';
export interface ImageGisAgentInput extends AgentRunInput { objective?: string; payload?: Record<string, unknown>; }
export const ImageGisAgent = {
  name: 'image-gis-agent',
  description: 'Handles GIS/image analysis prompts and structured visual outputs.',
  async run(input: ImageGisAgentInput): Promise<string> {
    return ['advanced-agent:image-gis-agent', `objective: ${input.objective ?? input.message}`, input.payload ? `payload: ${JSON.stringify(input.payload)}` : '', `message: ${input.message}`].filter(Boolean).join('\n');
  },
};
