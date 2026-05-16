export type SoftwareRoute = { path: string; label: string; component: string; summary: string };
export type SoftwareTable = { name: string; columns: string[] };
export type SoftwareSeedRecord = { title: string; status: string; owner: string; value: string };

export type SoftwareDomainBlueprint = {
  id: string;
  label: string;
  defaultName: string;
  summary: string;
  keywords: RegExp;
  modules: string[];
  routes: SoftwareRoute[];
  tables: SoftwareTable[];
  workflows: string[];
  metrics: string[];
  records: SoftwareSeedRecord[];
};
