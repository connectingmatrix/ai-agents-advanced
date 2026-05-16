# Deployment Agent

The Deployment Agent builds deployment manifests and streams deployment process state.

## Rules

- Build first, deploy only after a valid manifest exists.
- Persist deployment URL/status in the project runtime manifest.
- Emit queued/running/deployed/failed process events.
