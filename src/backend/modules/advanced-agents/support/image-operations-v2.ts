import { randomUUID } from 'node:crypto';
import type { AdvancedImageOperationSpec } from '../contracts/types';

const text = (value: unknown) => String(value ?? '').trim();

export function createImageOperationSpec(input: Record<string, unknown>): AdvancedImageOperationSpec {
  const prompt = text(input.prompt || input.message || input.instruction);
  const operation =
    text(input.operation) ||
    (/sprite/i.test(prompt)
      ? 'sprite-sheet'
      : /resize/i.test(prompt)
      ? 'resize'
      : /crop/i.test(prompt)
      ? 'crop'
      : /background/i.test(prompt)
      ? 'background-remove'
      : /mask/i.test(prompt)
      ? 'mask'
      : 'edit');
  const format = text(input.outputFormat || input.output_format) || 'png';
  const id = text(input.id) || randomUUID();
  return {
    id,
    operation: operation as AdvancedImageOperationSpec['operation'],
    sourceUri: text(input.sourceUri || input.source_uri || input.path) || undefined,
    prompt,
    outputFormat: format as AdvancedImageOperationSpec['outputFormat'],
    artifacts: [{ path: `agent-artifacts/images/${id}.${format}`, title: text(input.title) || `${operation} output`, metadata: { prompt } }],
    requiresExecutor: true,
  };
}

export function createSpriteSheetSpec(input: Record<string, unknown>) {
  const base = createImageOperationSpec({ ...input, operation: 'sprite-sheet' });
  return {
    ...base,
    frame: {
      width: Number(input.frameWidth || input.frame_width || 64),
      height: Number(input.frameHeight || input.frame_height || 64),
      columns: Number(input.columns || 8),
      rows: Number(input.rows || 4),
    },
  };
}
