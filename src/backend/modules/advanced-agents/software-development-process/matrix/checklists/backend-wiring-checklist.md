# Backend Wiring Checklist

- Every frontend action has a backend contract.
- API client owns request, auth, errors, and retry behavior.
- Backend adapter owns validation and persistence.
- Standard success and error shapes are used.
- Unauthorized and forbidden responses are tested.
