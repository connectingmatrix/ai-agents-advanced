# Route/Auth/RBAC Matrix

Every generated route needs access classification, allowed roles, frontend guard, backend guard, redirect or unauthorized behavior, navigation visibility, and tests.

Example: `/admin/users` is super-admin only, uses `RequireRole(['super_admin'])`, requires backend `users.manage`, hides nav for denied roles, and must test guest, normal user, and super admin.
