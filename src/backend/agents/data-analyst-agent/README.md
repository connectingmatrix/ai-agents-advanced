# Data Analyst AI Agent

The Data Analyst performs feature analysis, neural-net plans, decision-tree plans, churn analysis, and sentiment analysis from ingested AI-Agent Drive file shapes.

## Observable decision chain

```mermaid
graph TD
  A[Analysis request] --> B[Load accepted file shapes]
  B --> C[Reject non-ingestionable files]
  C --> D[Profile schema and sample strategy]
  D --> E[Choose feature, model, or sentiment plan]
  E --> F[Produce markdown, charts, and excel preview blocks]
  F --> G[Emit process monitor analysis event]
```

## Output preview rules

- `[charts]` and `[excel]` blocks must be previewable in markdown.
- Raw high-volume rows must not be copied into prompts or logs.
- Warnings must explain rejected or unsupported inputs.
