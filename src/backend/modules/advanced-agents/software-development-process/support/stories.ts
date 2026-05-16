import type { SoftwareDomainBlueprint } from '../../software-blueprints';

export function buildUserStories(blueprint: SoftwareDomainBlueprint) {
  return [
    `As an admin, I can configure ${blueprint.modules.join(', ')} so the workspace matches my operating model.`,
    `As an operator, I can create and update ${blueprint.tables[0]?.name || 'records'} without leaving the workflow queue.`,
    `As a specialist, I can filter records, open detail drawers, and resolve exceptions from one table surface.`,
    `As an auditor, I can review metrics, logs, changes, and reports without write access.`,
    `As an executive, I can read chart-backed trends and understand risk before opening a record.`,
  ];
}

export function buildAcceptanceCriteria(blueprint: SoftwareDomainBlueprint) {
  const routeCriteria = blueprint.routes.map(
    (route) => `${route.label} renders a complete screen with data, actions, empty, loading, and error states.`,
  );
  return [
    ...routeCriteria,
    'Home, login, signup, dashboard, CRUD, reporting, and settings routes are present.',
    'Dashboard includes MetricCard and SparklineChart patterns with seeded data.',
    'Every CRUD screen includes form fields, searchable table, row actions, and audit guidance.',
    'Generated routing stays inside the app deployment frame.',
    'All generated visuals reference approved UI-kit contracts and page patterns.',
  ];
}

export function buildImplementationTasks(blueprint: SoftwareDomainBlueprint) {
  return [
    'Extract requirements into product summary, roles, screens, entities, business rules, permissions, PWA, tests, and deployment expectations.',
    'Create screen architecture from UI-kit LandingPage, Root, Sidebar, GlobalHeader, dashboard, CRUD, reports, and settings patterns.',
    `Create data contracts for ${blueprint.tables.map((table) => table.name).join(', ')} with migrations and seed data.`,
    'Create UI-kit-backed home, auth, dashboard, CRUD, reports, settings, offline, error, and loading states.',
    'Create API contract map, role-route matrix, role-endpoint matrix, validation matrix, and connectivity checks.',
    'Verify charts, tables, forms, routes, accessibility labels, PWA metadata, deployment health, and generated API checks.',
  ];
}
