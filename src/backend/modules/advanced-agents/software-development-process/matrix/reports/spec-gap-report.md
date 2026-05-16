# Software-Development Agent Spec Gap Report

## Gaps Found

- The scoped matrix catalog existed, but the runtime process still used a hard-coded mini matrix and generic `records/create-record/update-record/delete-record` API operations.
- The generated static app exposed CRUD-looking screens, but buttons/forms did not mutate data or call generated app-local API contracts.
- The compatibility API only served GET-style generic data and did not enforce generated operation methods.
- The quality score allowed superficial UI-kit names and file presence to pass without proving wired CRUD behavior.
- The default AI-agent model was not the requested Codex reasoning profile.

## Gaps Closed

- Added a scoped matrix catalog validator and expanded the matrix JSON surface to the master-plan required feature patterns, component categories, and score caps.
- Refactored software process matrices to emit entity operations such as `patients.list`, `patients.create`, `patients.update`, and `patients.delete`.
- Wired generated auth, CRUD forms, row edit/delete actions, role simulation, unauthorized/offline screens, and toast feedback into the static app runtime.
- Split generated process files so API client, CRUD handlers, backend evidence, tests, and app-local API files are generated from the same process contract.
- Added generated app compatibility API support for GET, POST, PATCH, and DELETE with method mismatch and unknown-operation errors.
- Strengthened quality scoring so static CRUD, missing compatibility APIs, incomplete matrices, missing RBAC, and unwired buttons/forms cap or fail the app.
- Switched the AI-agent default model profile to `gpt-5.3-codex` while preserving saved-agent and env overrides.

## Remaining Watch Items

- Generated app backends remain app-local compatibility contracts in this pass; full per-app pod runtime can reuse the same manifest contracts later.
- UI-kit use is still component-contract based in this backend repo cache; importing real UI-kit source files would require a separate sanctioned asset/vendor decision.
