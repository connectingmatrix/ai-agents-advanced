import { parseStringValue, parseUnknownArray } from 'giga-ai-helper/workflow';
import type { SoftwareFramework } from '../softwares';

export const readSoftwareText = (value: unknown): string => parseStringValue(value).trim();

export const readSoftwareSlug = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 80) || `app-${Date.now()}`;

export const detectSoftwareFramework = (prompt: string): SoftwareFramework => {
  if (/electron|desktop/i.test(prompt)) return 'electron';
  if (/three|game|sprite|3d/i.test(prompt)) return 'threejs-game';
  if (/api|backend|service/i.test(prompt) && !/react|ui|frontend/i.test(prompt)) return 'node-api';
  if (/hybrid|multi-platform/i.test(prompt)) return 'hybrid';
  return 'react-vite';
};

export const detectSoftwareModules = (prompt: string, value: unknown): string[] => {
  const modules: string[] = [];
  for (const item of parseUnknownArray(value)) {
    const moduleName = readSoftwareText(item);
    if (moduleName) modules.push(moduleName);
  }
  if (modules.length) return modules;
  if (/rcm|billing|claim|denial|insurance|medical/i.test(prompt))
    return ['Patients', 'Claims', 'Payers', 'Denials', 'LettersOfNecessity', 'Appeals', 'Reports'];
  if (/hospital|clinic|practice/i.test(prompt)) return ['Patients', 'Appointments', 'Providers', 'Billing', 'Inventory', 'Reports'];
  if (/school|edtech|student|course/i.test(prompt)) return ['Students', 'Courses', 'Attendance', 'Grades', 'Payments', 'Reports'];
  if (/turbulence|cfd|simulation|fluid/i.test(prompt)) return ['Datasets', 'Simulations', 'Meshes', 'Runs', 'Charts', 'Reports'];
  return ['Dashboard', 'Records', 'Reports'];
};
