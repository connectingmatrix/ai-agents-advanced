export interface AdvancedAgentPlanEntity {
  id: string;
  kind: 'planner' | 'researcher' | 'software-builder' | 'deployment' | 'memory-analyst' | 'output-designer' | 'gis-image';
  objective: string;
  status: 'planned' | 'running' | 'completed';
  output?: string;
}
