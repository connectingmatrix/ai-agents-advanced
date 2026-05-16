import { uiKitComponentContracts, uiKitPagePatterns, uiKitVisualTokens } from '../../ui-kit';
import type { AdvancedSoftwareFile } from '../contracts/types';

const usage = {
  usedComponents: [
    'Root',
    'Sidebar',
    'GlobalHeader',
    'MetricCard',
    'SparklineChart',
    'EnhancedDataTable',
    'CreateModal',
    'FormField',
    'Panel',
    'LogViewerTable',
  ],
  componentContracts: uiKitComponentContracts,
  pagePatterns: uiKitPagePatterns,
  visualTokens: uiKitVisualTokens,
  requiredPropsCovered: ['title', 'value', 'sparkline', 'columns', 'data', 'rowActions', 'isOpen', 'onClose'],
};

export const buildUiKitUsageFiles = (): AdvancedSoftwareFile[] => [
  { path: 'docs/ui-kit-usage.json', kind: 'json', content: JSON.stringify(usage, null, 2) },
  {
    path: 'src/app/ui-kit/usage-contract.ts',
    kind: 'ts',
    content: `export const uiKitUsageContract = ${JSON.stringify(usage, null, 2)} as const;\n`,
  },
];
