# UI Kit Component Matrix

This matrix is the durable UI source for generated apps. Use the JSON file for machine reads.

| Component | Category | Use | Required Patterns |
| --- | --- | --- | --- |
| Root | layout | App shell | dashboards, CRUD apps |
| Sidebar | navigation | Role-filtered nav | admin/RBAC apps |
| GlobalHeader | layout | Search/create/status | all authenticated apps |
| EnhancedDataTable | table | CRUD tables | CRUD_TABLE_MODAL |
| CreateModal | modal | Create/edit forms | CRUD_CREATE_EDIT_MODAL |
| ConfirmDialog | dialog | Destructive confirmation | delete/archive flows |
| FormField | form | Validation fields | forms/settings |
| PermissionsMatrix | permission | RBAC editing | super-admin management |
| MetricCard/SparklineChart | monitoring | Charts and KPIs | reporting dashboards |
| Empty/Loading/Error/Toast | feedback | State coverage | all interactive features |

Rules: do not invent primitives already present; every generated screen must cite approved UI-kit components or document a missing capability.
