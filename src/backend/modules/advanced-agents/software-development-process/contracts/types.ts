import type { SoftwareDomainBlueprint } from '../../software-blueprints';
import type { SoftwareProcessMatrices } from './matrix-types';

export type SoftwareAgentWorkNode = {
  id: string;
  title: string;
  parentId?: string;
  lifecycleStep: number;
  expectedOutput: string;
  memoryNamespace: string;
};

export type SoftwareRequirementBreakdown = {
  productSummary: string;
  userRoles: string[];
  screens: string[];
  features: string[];
  dataEntities: string[];
  businessRules: string[];
  permissions: string[];
  pwaExpectations: string[];
  testingExpectations: string[];
  deploymentExpectations: string[];
};

export type SoftwareDevelopmentProcess = SoftwareProcessMatrices & {
  status: 'ready' | 'failed';
  requirementBreakdown: SoftwareRequirementBreakdown;
  userStories: string[];
  implementationTasks: string[];
  ambiguityRegister: string[];
  assumptions: string[];
  acceptanceCriteria: string[];
  agentWorkGraph: SoftwareAgentWorkNode[];
  agentWorkPackets: Array<{
    id: string;
    owner: string;
    lifecycleStep: number;
    task: string;
    inputs: string[];
    outputs: string[];
    memoryNamespace: string;
    matrixReferences: string[];
    expectedArtifactPaths: string[];
    verificationStatus: 'planned' | 'passed';
  }>;
  researchBrief: {
    domain: string;
    coreScreens: string[];
    coreEntities: string[];
    workflowRisks: string[];
    reportingNeeds: string[];
  };
  uiResearch: {
    routes: string[];
    components: string[];
    states: string[];
    accessibility: string[];
    screenArchitecture: string[];
    pagePatterns: readonly { name: string; useFor: string }[];
    mobile: string[];
  };
  backendArchitecture: { models: string[]; routes: string[]; validations: string[]; authRules: string[] };
  apiContractMap: Array<{ operation: string; endpoint: string; method: string; purpose: string; model: string }>;
  screenEndpointMap: Array<{ screen: string; endpoints: string[] }>;
  roleRouteMatrix: Array<{ role: string; routes: string[] }>;
  roleEndpointMatrix: Array<{ role: string; endpoints: string[] }>;
  requestResponseSchemas: Array<{ endpoint: string; request: string[]; response: string[] }>;
  implementationPlan: string[];
  verification: { checks: string[]; risks: string[]; status: 'planned' | 'passed' };
  build: { commands: string[]; status: 'planned' | 'passed' };
  deployment: { target: string; checks: string[]; status: 'planned' | 'deployed' };
  connectivity: { checks: Array<{ operation: string; endpoint: string; method: string; expectedStatus: number }> };
  finalReport: string;
  blueprint: Pick<SoftwareDomainBlueprint, 'id' | 'label'>;
};

export type SoftwareProcessInput = {
  name: string;
  prompt: string;
  modules: string[];
  blueprint: SoftwareDomainBlueprint;
  extractionMode?: 'deterministic' | 'llm';
};
