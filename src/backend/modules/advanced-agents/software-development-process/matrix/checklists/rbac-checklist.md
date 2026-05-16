# RBAC Checklist

- Every protected route has frontend guard.
- Every protected endpoint has backend guard.
- Navigation visibility follows role matrix.
- Unauthorized UI exists.
- Admin APIs reject normal users.
- Tests cover guest, allowed role, and denied role.
