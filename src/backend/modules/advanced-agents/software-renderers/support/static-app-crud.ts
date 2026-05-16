import type { SoftwareBuildContext } from '../contracts/types';

const label = (value: string) => value.replace(/_/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
const screenId = (value: string) =>
  value
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
const formFields = (columns: string[]) =>
  ['title', 'status', 'owner', 'value']
    .map((field, index) => ({ field, title: label(columns[index + 1] || field) }))
    .map(
      (item) =>
        `<label data-ui-kit-component="FormField">${item.title}<input name="${item.field}" required aria-label="${
          item.title
        }" placeholder="Enter ${item.title.toLowerCase()}"/></label>`,
    )
    .join('');
const rowsHtml = (context: SoftwareBuildContext, table: { name: string }) =>
  context.blueprint.records
    .map(
      (row, index) =>
        `<tr data-row-id="${table.name}-${index + 1}"><td>${table.name}-${index + 1}</td><td>${row.title}</td><td>${row.status}</td><td>${
          row.owner
        }</td><td>${row.value}</td><td><button type="button" data-action="edit" data-entity="${table.name}" data-id="${table.name}-${
          index + 1
        }">Edit</button><button type="button" data-action="delete" data-entity="${table.name}" data-id="${table.name}-${
          index + 1
        }">Delete</button></td></tr>`,
    )
    .join('');

export const crudScreensHtml = (context: SoftwareBuildContext) =>
  context.blueprint.tables
    .map(
      (table) =>
        `<section class="screen crud-screen" data-screen="${screenId(table.name)}"><section class="panel"><h2>${label(
          table.name,
        )}</h2><p>Create, read, update, archive, filter, export, and audit ${label(
          table.name,
        ).toLowerCase()} records through generated app-local API contracts.</p><div class="kit-badges"><span>EnhancedDataTable</span><span>CreateModal</span><span>FormField</span><span>ConfirmDialog</span><span>Toast</span></div><div class="crud-grid"><form class="form-card" data-ui-kit-component="CreateModal" data-crud-form="${
          table.name
        }"><h3>Create or edit ${label(table.name)}</h3>${formFields(
          table.columns,
        )}<div class="actions"><button type="submit" data-action="submit" data-entity="${
          table.name
        }">Create</button><button type="reset">Clear</button></div><p class="muted">Validation is required before submit; edit row actions populate this form.</p></form><article class="form-card"><h3>Record actions</h3><p>Row actions are wired to generated create/update/delete compatibility operations and show toast feedback.</p><div class="actions"><a href="#/reports">Open reports</a><a href="#/offline">Test offline state</a></div></article></div></section><section class="panel" data-ui-kit-component="EnhancedDataTable"><h3>${label(
          table.name,
        )} table</h3><p data-empty-state="${
          table.name
        }" hidden>No records yet. Create one with the form above.</p><table><thead><tr><th>ID</th><th>Title</th><th>Status</th><th>Owner</th><th>Value</th><th>Actions</th></tr></thead><tbody data-crud-rows="${
          table.name
        }">${rowsHtml(context, table)}</tbody></table></section></section>`,
    )
    .join('');

export const crudNavHtml = (context: SoftwareBuildContext) =>
  context.blueprint.tables
    .map(
      (table) => `<a href="#/${screenId(table.name)}"><span>${label(table.name)}</span><small>CRUD table, forms, drawer, and audit trail</small></a>`,
    )
    .join('');
