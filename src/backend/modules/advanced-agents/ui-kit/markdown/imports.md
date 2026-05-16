# UI Kit Imports Source Context

This file exports 12 source file(s). Each section includes reuse guidance and an exact snippet from the uploaded UI Kit.

## `src/imports/advanced-swarm-v2-schema.json`

- Category: imported artifact/schema.
- Imports: No direct imports in this file.
- Exports: No named exports detected; inspect the default/component body.
- Reuse guidance: Use this imported artifact/schema as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````json
{
  "id": "advanced-swarm-v2",
  "name": "Advanced Swarm V2",
  "type": "advanced-swarm-v2",
  "version": "20.0.0",
  "description": "R20 node that routes to agent.swarm.v2 through executeBackend.",
  "kind": "agent",
  "inputs": {
    "message": {
      "type": "string"
    },
    "input": {
      "type": "object"
    },
    "confirmed": {
      "type": "boolean"
    }
  },
  "outputs": {
    "result": {
      "type": "object"
    }
  },
  "ui": {
    "icon": "sparkles",
    "group": "AI Agent OS"
  }
}
````````

## `src/imports/agent-memory-schema.json`

- Category: imported artifact/schema.
- Imports: No direct imports in this file.
- Exports: No named exports detected; inspect the default/component body.
- Reuse guidance: Use this for AI Agent editor, testing, file ingestion, decision-chain, and project-debug surfaces.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````json
{
  "id": "agent-memory",
  "name": "Agent Memory",
  "type": "agent-memory",
  "version": "20.0.0",
  "description": "R20 node that routes to agent.memory.search.v2 through executeBackend.",
  "kind": "knowledge",
  "inputs": {
    "message": {
      "type": "string"
    },
    "input": {
      "type": "object"
    },
    "confirmed": {
      "type": "boolean"
    }
  },
  "outputs": {
    "result": {
      "type": "object"
    }
  },
  "ui": {
    "icon": "sparkles",
    "group": "AI Agent OS"
  }
}
````````

## `src/imports/agent-task-graph-schema.json`

- Category: imported artifact/schema.
- Imports: No direct imports in this file.
- Exports: No named exports detected; inspect the default/component body.
- Reuse guidance: Use this for AI Agent editor, testing, file ingestion, decision-chain, and project-debug surfaces.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````json
{
  "id": "agent-task-graph",
  "name": "Agent Task Graph",
  "type": "agent-task-graph",
  "version": "20.0.0",
  "description": "R20 node that routes to agent.task_graph through executeBackend.",
  "kind": "agent",
  "inputs": {
    "message": {
      "type": "string"
    },
    "input": {
      "type": "object"
    },
    "confirmed": {
      "type": "boolean"
    }
  },
  "outputs": {
    "result": {
      "type": "object"
    }
  },
  "ui": {
    "icon": "sparkles",
    "group": "AI Agent OS"
  }
}
````````

## `src/imports/ai-agent-schema.json`

- Category: imported artifact/schema.
- Imports: No direct imports in this file.
- Exports: No named exports detected; inspect the default/component body.
- Reuse guidance: Use this for AI Agent editor, testing, file ingestion, decision-chain, and project-debug surfaces.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````json
{
  "id": "ai-agent",
  "group": "Giga AI Nodes",
  "iconClass": "pi pi-sparkles",
  "executorKey": "ai-agent",
  "render": {
    "iconKey": "ai-agent",
    "iconClass": "pi pi-sparkles",
    "iconSize": 64,
    "nodeSize": 180,
    "nodeWidth": 252,
    "iconColor": "#0f766e",
    "iconBackground": "#ccfbf1"
  },
  "outputViewers": [
    {
      "id": "json",
      "label": "JSON",
      "type": "json"
    },
    {
      "id": "raw",
      "label": "Raw",
      "type": "raw"
    }
  ],
  "name": {
    "type": "string",
    "editable": true,
    "autoGenerate": true
  },
  "fields": {
    "description": {
      "type": "textarea",
      "editable": true,
      "defaultValue": "Plan, confirm, execute, and respond through connected LLM, tools, and workflow nodes.",
      "label": "Description",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "selectionPromptMd": {
      "type": "markdown",
      "editable": true,
      "defaultValue": "Use the Node Rules and the connected commandToolSpec catalog to plan. Return direct replies for greetings. For mutations, read/resolve targets first, ask confirmation when required, then execute through connected tools. Do not hardcode backend actions that are not present in the connected tool catalog. Keep Giga answers grounded in local/scoped Giga knowledge. For workflow requests, create valid executable workflow definitions and execute/publish/attach only through connected tools. For charts/maps, preserve labels, values, legends, and [chart] markup.",
      "label": "Planning Prompt",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "executionMode": {
      "type": "select",
      "editable": true,
      "defaultValue": "plan-and-run",
      "label": "Execution Mode",
      "options": [
        {
          "label": "Plan And Run",
          "value": "plan-and-run"
        },
        {
          "label": "Plan Only",
          "value": "plan-only"
        },
        {
          "label": "Execute Approved Plan",
          "value": "execute-plan"
        },
        {
          "label": "Quick Reply",
          "value": "quick-reply"
        }
      ],
      "allowVariables": true
    },
    "confirmationPolicy": {
      "type": "select",
      "editable": true,
      "defaultValue": "mutations",
      "label": "Confirmation Policy",
      "options": [
        {
          "label": "Mutations Only",
          "value": "mutations-only"
        },
        {
          "label": "Always",
          "value": "always"
        },
        {
          "label": "Never",
          "value": "never"
        }
      ],
      "allowVariables": true
    },
    "modelActionPolicy": {
      "type": "select",
      "editable": true,
      "defaultValue": "prefer-tools",
      "label": "Model Action Policy",
      "options": [
        {
          "label": "Allow",
          "value": "allow"
        },
        {
          "label": "Prefer Direct Replies",
          "value": "prefer-direct-replies"
        },
        {
          "label": "Tools Only",
          "value": "tools-only"
        }
      ],
      "allowVariables": true
    },
    "quickReplyMaxWords": {
      "type": "number",
      "editable": true,
      "defaultValue": 14,
      "label": "Quick Reply Max Words",
      "allowVariables": true,
      "visibleWhen": {
        "field": "executionMode",
        "notEquals": "execute-plan"
      }
    },
    "nodeLibraryId": {
      "type": "string",
      "hidden": true,
      "editable": false,
      "defaultValue": "",
      "allowVariables": false
    },
    "status": {
      "type": "string",
      "hidden": true,
      "auto": true,
      "defaultValue": "stopped",
      "allowVariables": false
    },
    "source": {
      "type": "string",
      "hidden": true,
      "defaultValue": "",
      "allowVariables": false
    },
    "timestamp": {
      "type": "timestamp",
      "hidden": true,
      "auto": true,
      "allowVariables": false
    },
    "message": {
      "type": "textarea",
      "editable": true,
      "defaultValue": "",
      "label": "Message",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "analysisSummary": {
      "type": "string",
      "editable": true,
      "defaultValue": "",
      "label": "Analysis Summary",
      "allowVariables": true
    },
    "context": {
      "type": "textarea",
      "editable": true,
      "defaultValue": "",
      "label": "Context",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "pendingPlan": {
      "type": "textarea",
      "editable": true,
      "defaultValue": "",
      "label": "Pending Plan",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "confirmed": {
      "type": "boolean",
      "editable": true,
      "defaultValue": false,
      "label": "Confirmed",
      "allowVariables": true
    },
    "nodeRules": {
      "type": "markdown",
      "editable": true,
      "defaultValue": "AI Agent Node Rules\n\n- Use connected commandToolSpec tools; never assume backend action names that are not advertised by a connected peer.\n- Common greetings, thanks, and small talk should return a direct response without tool calls.\n- Read before mutate whenever the target is ambiguous.\n- Reuse/link existing tree nodes when the request asks for shared concepts or when matching nodes already exist.\n- Posts support create/read/update/delete only; never link or unlink posts.\n- Destructive operations require confirmation unless the request explicitly says to cancel/remove a pending flow.\n- Use permissions and entity/relation results as source of truth; do not bypass permissions in the agent.\n- For Giga questions, prefer local Giga knowledge and scoped posts/attachments over model priors.\n- Large knowledge sections must be chunked and summarized into smaller units before workflow/tool creation.\n- Workflow requests may create workflows, create workflows that create workflows, execute newly created workflows, publish workflows, and attach workflows when the connected tools support those operations.\n- Chart requests must preserve chart labels, values, title, legend, and map-region names.\n- US/Pakistan/India population map requests should use map chart tools with shaded blue values when requested.\n- RCM manager/training/data-analysis requests should create separate child workflows, place generated test data in Organisation shared space, then execute/report training results.\n- After successful tree mutations, return metadata that lets the UI refetch/realtime-refresh the affected tree scope.",
      "label": "Node Rules",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "maxToolPasses": {
      "type": "number",
      "editable": true,
      "defaultValue": 4,
      "label": "Max Tool Passes",
      "min": 1,
      "max": 10,
      "step": 1
    }
  },
  "inputs": {
    "input": {
      "allowMultipleArrows": true
    }
  },
  "outputs": {
    "output": {
      "allowMultipleArrows": true
    },
    "nodeRules": {
      "type": "json",
      "label": "Node Rules"
    }
  },
  "commands": {
    "llm": {
      "label": "LLM",
      "portType": "bi-directional",
      "acceptedSourceGroups": [
        "AI Models"
      ],
      "acceptedSourceModelIds": [
        "openai",
        "claude",
        "gemini",
        "groq",
        "deepseek",
        "perplexity",
        "mistral"
      ],
      "allowMultipleArrows": true,
      "side": "bottom",
      "order": 1
    },
    "tools": {
      "label": "Tools",
      "portType": "bi-directional",
      "allowMultipleArrows": true,
      "side": "bottom",
      "order": 2,
      "acceptedSourceModelIds": [
        "action-router",
        "chart"
      ]
    },
    "workflow": {
      "label": "Workflow",
      "portType": "bi-directional",
      "acceptedSourceModelIds": [
        "workflow",
        "execute-workflow"
      ],
      "allowMultipleArrows": true,
      "side": "bottom",
      "order": 3
    }
  },
  "documentation": {
    "nodeTypeLabel": "AI Agent",
    "summary": "Composite worker-owned AI node that plans connected tools, handles confirmation, executes approved actions, and emits the final chat response payload.",
    "usage": "Connect one LLM on LLM, reusable backend tools on Tools, and workflow authoring/execution nodes on Workflow. Use this node when the workflow should both decide and answer without a separate AI Governor plus response merge chain.",
    "inputs": [
      {
        "key": "selectionPromptMd",
        "label": "Planning Prompt",
        "description": "Instructions for when the agent should use tools and how it should shape action plans.",
        "required": false
      },
      {
        "key": "confirmationPolicy",
        "label": "Confirmation Policy",
        "description": "When the agent should return a confirmation request before executing a plan.",
        "required": false
      },
      {
        "key": "workflowToolAllowlist",
        "label": "Workflow Tools",
        "description": "Optional subset of connected workflow-port tools that may be used for workflow output actions.",
        "required": false
      }
    ],
    "outputs": [
      {
        "key": "text",
        "label": "Text",
        "description": "Final assistant response text.",
        "required": false
      },
      {
        "key": "agent",
        "label": "Agent",
        "description": "Structured planning, execution, and response metadata.",
        "required": false
      }
    ],
    "examples": [
      {
        "title": "Direct reply",
        "description": "Use the connected LLM to answer without tool execution when the request is conversational.",
        "setup": "Model Action Policy = Prefer Direct Replies",
        "output": "{ \"text\": \"Hello Rich, how are you?\", \"agent\": { \"response_format\": \"plain_text\" } }"
      },
      {
        "title": "Confirmation required",
        "description": "Mutating plans return a confirmation request and pending actions.",
        "setup": "Confirmation Policy = Mutations Only",
        "output": "{ \"text\": \"I can make these Giga changes after you confirm:\", \"agent\": { \"requires_confirmation\": true } }"
      },
      {
        "title": "Workflow output",
        "description": "Connected Workflow plus Execute Workflow nodes return the final workflow output directly.",
        "setup": "Workflow nodes connected on cmd:workflow",
        "output": "{ \"text\": \"Requested workflow output.\", \"agent\": { \"response_format\": \"workflow_output\" } }"
      }
    ],
    "failureCases": [
      "Fails when the planning prompt is missing in plan modes.",
      "Fails when a connected tool port peer does not expose commandToolSpec().",
      "Fails when execute-plan runs without a plan input."
    ],
    "backend": null,
    "nodeRules": "The AI Agent is tool-spec driven. It plans only from connected commandToolSpec peers, applies nodeRules, supports multiple LLM/tool passes, and confirmation-gates mutations."
  },
  "properties": {
    "agentId": {
      "type": "string",
      "title": "Stored AI Agent",
      "description": "Reusable ai_agents.id to run with the OpenAI Agents SDK."
    },
    "agentRuntimeMode": {
      "type": "string",
      "enum": [
        "inline",
        "stored-agent",
        "swarm"
      ],
      "default": "stored-agent"
    },
    "openAgentEditor": {
      "type": "boolean",
      "default": false,
      "ui": {
        "action": "open-ai-agent-editor"
      }
    },
    "persistSession": {
      "type": "boolean",
      "default": true
    },
    "memoryMode": {
      "type": "string",
      "enum": [
        "none",
        "session",
        "user",
        "organization"
      ],
      "default": "session"
    },
    "modelProvider": {
      "type": "string",
      "default": "openai"
    },
    "modelId": {
      "type": "string",
      "default": "gpt-4.1-mini"
    }
  },
  "ui": {
    "customInspector": "ai-agent-editor"
  },
  "supportsStoredAgents": true
}
````````

## `src/imports/airtable-node.ts`

- Category: imported artifact/schema.
- Imports: import rawSchema from './airtable-schema.json';, import { createAgentBackendNodeModule } from '@workflow/nodes/nodes/_agent-backend-node-module';
- Exports: export default createAgentBackendNodeModule({ id: 'airtable', rawSchema, label: 'Airtable', description: 'Read/write Airtable through centralized backend capabilities.', kind: 'database', order: 512 });
- Reuse guidance: Use this for Node Designer screens, node validation, run/test controls, and debug-with-AI workflows. Use this for queryable records, database viewers, process rows, and entity management lists.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````ts
import rawSchema from './airtable-schema.json';
import { createAgentBackendNodeModule } from '@workflow/nodes/nodes/_agent-backend-node-module';

export default createAgentBackendNodeModule({ id: 'airtable', rawSchema, label: 'Airtable', description: 'Read/write Airtable through centralized backend capabilities.', kind: 'database', order: 512 });
````````

## `src/imports/airtable-schema.json`

- Category: imported artifact/schema.
- Imports: No direct imports in this file.
- Exports: No named exports detected; inspect the default/component body.
- Reuse guidance: Use this for queryable records, database viewers, process rows, and entity management lists.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````json
{
  "id": "airtable",
  "group": "Data and Integrations",
  "iconClass": "pi pi-bolt",
  "executorKey": "airtable",
  "render": {
    "iconKey": "airtable",
    "iconClass": "pi pi-bolt",
    "iconSize": 64,
    "nodeSize": 180,
    "iconColor": "#2563eb",
    "iconBackground": "#dbeafe"
  },
  "outputViewers": [
    {
      "id": "json",
      "label": "JSON",
      "type": "json"
    },
    {
      "id": "markdown",
      "label": "Markdown",
      "type": "markdown"
    },
    {
      "id": "raw",
      "label": "Raw",
      "type": "raw"
    }
  ],
  "name": {
    "type": "string",
    "editable": true,
    "autoGenerate": true
  },
  "instruction": {
    "code": false,
    "markdown": false
  },
  "fields": {
    "description": {
      "type": "textarea",
      "editable": true,
      "defaultValue": "Read/write Airtable through centralized backend capabilities.",
      "label": "Description",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "operation": {
      "type": "string",
      "editable": true,
      "defaultValue": "auto",
      "label": "Operation",
      "allowVariables": true
    },
    "prompt": {
      "type": "textarea",
      "editable": true,
      "defaultValue": "Read/write Airtable through centralized backend capabilities.",
      "label": "Prompt",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "credentialKey": {
      "type": "string",
      "editable": true,
      "defaultValue": "",
      "label": "Credential Key",
      "allowVariables": true
    },
    "config": {
      "type": "json",
      "editable": true,
      "defaultValue": {},
      "label": "Config",
      "allowVariables": true
    },
    "query": {
      "type": "textarea",
      "editable": true,
      "defaultValue": "",
      "label": "Query / Command",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    }
  },
  "inputs": {
    "input": {
      "allowMultipleArrows": true
    }
  },
  "outputs": {
    "output": {
      "allowMultipleArrows": true
    }
  },
  "commands": {
    "command": {
      "label": "Command",
      "portType": "bi-directional",
      "side": "top",
      "order": 0,
      "acceptedSourceModelIds": [
        "ai-agent"
      ],
      "allowMultipleArrows": true
    }
  },
  "documentation": {
    "nodeTypeLabel": "Airtable",
    "summary": "Read/write Airtable through centralized backend capabilities.",
    "usage": "This node exposes a reusable command tool to the AI Agent. Backend operations are routed through executeBackend -> Entities or centralized capabilities.",
    "inputs": [
      {
        "key": "operation",
        "label": "Operation",
        "required": false
      },
      {
        "key": "prompt",
        "label": "Prompt",
        "required": false
      }
    ],
    "outputs": [
      {
        "key": "output",
        "label": "Output"
      }
    ]
  }
}
````````

## `src/imports/merge-schema.json`

- Category: imported artifact/schema.
- Imports: No direct imports in this file.
- Exports: No named exports detected; inspect the default/component body.
- Reuse guidance: Use this imported artifact/schema as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````json
{
  "id": "merge",
  "group": "Data",
  "iconClass": "pi pi-clone",
  "executorKey": "merge",
  "render": {
    "iconKey": "merge",
    "iconClass": "pi pi-clone",
    "iconSize": 64,
    "nodeSize": 180,
    "iconColor": "#1d4ed8",
    "iconBackground": "#dbeafe"
  },
  "outputViewers": [
    {
      "id": "json",
      "label": "JSON",
      "type": "json"
    },
    {
      "id": "raw",
      "label": "Raw",
      "type": "raw"
    }
  ],
  "name": {
    "type": "string",
    "editable": true,
    "autoGenerate": true
  },
  "instruction": {
    "code": false,
    "markdown": false
  },
  "fields": {
    "description": {
      "type": "textarea",
      "editable": true,
      "defaultValue": "Combine upstream outputs into one payload.",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "nodeLibraryId": {
      "type": "string",
      "hidden": true,
      "editable": false,
      "defaultValue": "",
      "allowVariables": false
    },
    "status": {
      "type": "string",
      "hidden": true,
      "auto": true,
      "defaultValue": "stopped",
      "allowVariables": false
    },
    "source": {
      "type": "string",
      "hidden": true,
      "defaultValue": "",
      "allowVariables": false
    },
    "timestamp": {
      "type": "timestamp",
      "hidden": true,
      "auto": true,
      "allowVariables": false
    },
    "input1Value": {
      "type": "string",
      "editable": true,
      "defaultValue": "",
      "label": "Input 1 Value",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "input2Value": {
      "type": "string",
      "editable": true,
      "defaultValue": "",
      "label": "Input 2 Value",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "input3Value": {
      "type": "string",
      "editable": true,
      "defaultValue": "",
      "label": "Input 3 Value",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "input4Value": {
      "type": "string",
      "editable": true,
      "defaultValue": "",
      "label": "Input 4 Value",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    },
    "input5Value": {
      "type": "string",
      "editable": true,
      "defaultValue": "",
      "label": "Input 5 Value",
      "styles": {
        "layoutPreset": "full"
      },
      "allowVariables": true
    }
  },
  "inputs": {
    "input1": {
      "label": "Input 1",
      "allowMultipleArrows": true,
      "side": "left",
      "order": 1
    },
    "input2": {
      "label": "Input 2",
      "allowMultipleArrows": true,
      "side": "left",
      "order": 2
    },
    "input3": {
      "label": "Input 3",
      "allowMultipleArrows": true,
      "side": "left",
      "order": 3
    },
    "input4": {
      "label": "Input 4",
      "allowMultipleArrows": true,
      "side": "left",
      "order": 4
    },
    "input5": {
      "label": "Input 5",
      "allowMultipleArrows": true,
      "side": "left",
      "order": 5
    },
    "command": {
      "label": "Command",
      "portType": "bi-directional",
      "side": "top",
      "order": 0,
      "allowMultipleArrows": true
    }
  },
  "outputs": {
    "output": {
      "allowMultipleArrows": true,
      "side": "right",
      "order": 1
    },
    "command": {
      "label": "Command",
      "portType": "bi-directional",
      "side": "top",
      "order": 0,
      "allowMultipleArrows": true
    }
  },
  "documentation": {
    "nodeTypeLabel": "Merge",
    "summary": "Combines up to five input ports into a single output payload.",
    "usage": "Bind Input 1 Value through Input 5 Value from other nodes using variables. Plain objects are shallow-merged in order and non-object payloads are preserved under their configured input key.",
    "inputs": [
      {
        "key": "port:command",
        "label": "Control Port: Command",
        "description": "Bi-directional control-state input from connected command peers.",
        "required": false
      },
      {
        "key": "port:input1",
        "label": "Input Port: Input 1",
        "description": "Optional graph dependency. Bind Input 1 Value explicitly to merge data.",
        "required": false
      },
      {
        "key": "port:input2",
        "label": "Input Port: Input 2",
        "description": "Incoming payload merged after Input 1.",
        "required": false
      },
      {
        "key": "port:input3",
        "label": "Input Port: Input 3",
        "description": "Incoming payload merged after Input 2.",
        "required": false
      },
      {
        "key": "port:input4",
        "label": "Input Port: Input 4",
        "description": "Incoming payload merged after Input 3.",
        "required": false
      },
      {
        "key": "port:input5",
        "label": "Input Port: Input 5",
        "description": "Incoming payload merged last.",
        "required": false
      }
    ],
    "outputs": [
      {
        "key": "port:command",
        "label": "Control Port: Command",
        "description": "Publishes this node control state for connected command peers.",
        "required": false
      },
      {
        "key": "port:output",
        "label": "Output Port: Output",
        "description": "Outgoing payload emitted after node execution.",
        "required": false
      }
    ],
    "failureCases": []
  }
}
````````

## `src/imports/process_monitor_root_normal_light_dark_final-1.html`

- Category: imported artifact/schema.
- Imports: No direct imports in this file.
- Exports: No named exports detected; inspect the default/component body.
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````html
<!doctype html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Process Monitor — Root & Normal User Interactive Mockup with Light/Dark Mode</title>
  <!-- THEME BOOTSTRAP: set saved light/dark/system preference before the CSS renders. -->
  <script>
    (function initializeThemeBeforePaint() {
      try {
        const storedTheme = localStorage.getItem('processMonitorTheme') || 'dark';
        const resolvedTheme = storedTheme === 'system'
          ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
          : (storedTheme === 'light' ? 'light' : 'dark');
        document.documentElement.dataset.theme = resolvedTheme;
      } catch (error) {
        document.documentElement.dataset.theme = 'dark';
      }
    })();
  </script>
  <!--
    All-in-one responsive UI mockup.
    Component map:
    1. App shell + top toolbar
    2. System metric cards
    3. User Tree summary panel
    4. Process Tree detail panel
    5. Real-time Logs panel
    6. Footer status bar
    7. Floating popovers and toast notifications
  -->
  <style>
    :root {
      color-scheme: dark;
      --body-bg: radial-gradient(circle at 12% 5%, rgba(44, 115, 255, .16), transparent 28rem), radial-gradient(circle at 84% 8%, rgba(31, 194, 107, .10), transparent 26rem), radial-gradient(circle at 50% 106%, rgba(139, 92, 246, .10), transparent 35rem), linear-gradient(180deg, #07101c 0%, #07111e 55%, #050c16 100%);
      --bg: #07111e;
      --bg-2: #0a1624;
      --panel: rgba(13, 26, 42, 0.9);
      --panel-2: rgba(9, 19, 32, 0.96);
      --panel-3: rgba(17, 33, 52, 0.76);
      --line: rgba(121, 151, 187, 0.18);
      --line-strong: rgba(126, 170, 222, 0.32);
      --text: #e8f0fb;
      --muted: #9fb0c6;
      --muted-2: #6f8198;
      --blue: #3b82f6;
      --blue-2: #60a5fa;
      --green: #52e35c;
      --green-2: #1fc26b;
      --yellow: #f8c51b;
      --orange: #ff991c;
      --red: #ff5a55;
      --purple: #8b5cf6;
      --cyan: #23d3ee;
      --card-shadow: 0 20px 70px rgba(0, 0, 0, .35), inset 0 1px 0 rgba(255, 255, 255, .035);
      --radius: 10px;
      --header-h: 64px;
      --row-h: 39px;
      --font-main: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      --font-mono: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
      font-family: var(--font-main);
    }

    * { box-sizing: border-box; }
    html, body { min-height: 100%; }
    body {
      margin: 0;
      min-height: 100vh;
      overflow-x: hidden;
      color: var(--text);
      background: var(--body-bg);
      letter-spacing: -0.01em;
    }
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      background-image:
        linear-gradient(rgba(255, 255, 255, .025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, .02) 1px, transparent 1px);
      background-size: 32px 32px;
      mask-image: linear-gradient(180deg, rgba(0,0,0,.55), transparent 78%);
    }
    button, input, select { font: inherit; }
    button { -webkit-tap-highlight-color: transparent; }

    .app {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(139, 168, 202, .10);
      background: rgba(3, 9, 18, .14);
      position: relative;
    }

    .topbar {
      min-height: var(--header-h);
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 10px 18px;
      border-bottom: 1px solid var(--line);
      background: rgba(5, 13, 24, .84);
      backdrop-filter: blur(16px);
      position: sticky;
      top: 0;
      z-index: 30;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: max-content;
    }
    .pulse-logo {
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      color: var(--blue-2);
      filter: drop-shadow(0 0 14px rgba(59,130,246,.40));
    }
    .pulse-logo svg { width: 34px; height: 34px; }
    h1 {
      font-size: clamp(18px, 2vw, 26px);
      line-height: 1;
      margin: 0;
      font-weight: 760;
      letter-spacing: -0.05em;
    }
    .live-badge, .scope-badge, .pill, .severity, .status-dot-label {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border-radius: 999px;
      white-space: nowrap;
    }
    .live-badge {
      height: 26px;
      padding: 0 10px;
      color: #70fb86;
      border: 1px solid rgba(82, 227, 92, .42);
      background: rgba(28, 165, 73, .12);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: .02em;
      box-shadow: inset 0 0 16px rgba(82, 227, 92, .07);
    }
    .live-badge.paused {
      color: #ffd56a;
      border-color: rgba(248, 197, 27, .42);
      background: rgba(248, 197, 27, .12);
    }
    .live-badge::before, .streaming::before, .dot::before {
      content: "";
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--green);
      box-shadow: 0 0 10px rgba(82, 227, 92, .75);
    }
    .live-badge.paused::before { background: var(--yellow); box-shadow: 0 0 10px rgba(248, 197, 27, .70); }

    .toolbar {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    .tool-button,
    .select-like,
    .segmented button,
    .icon-button,
    .plain-button {
      color: var(--text);
      border: 1px solid rgba(129, 158, 193, .18);
      background: rgba(10, 20, 34, .55);
      border-radius: 9px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 0 12px;
      font-size: 13px;
      line-height: 1;
      cursor: pointer;
      transition: border-color .15s ease, background .15s ease, transform .15s ease, box-shadow .15s ease;
      position: relative;
      user-select: none;
    }
    .tool-button:hover,
    .select-like:hover,
    .segmented button:hover,
    .icon-button:hover,
    .search:hover,
    .plain-button:hover {
      border-color: rgba(96, 165, 250, .45);
      background: rgba(12, 28, 50, .70);
    }
    .tool-button:active, .icon-button:active, .plain-button:active { transform: translateY(1px); }
    .tool-button svg, .select-like svg, .plain-button svg { width: 16px; height: 16px; color: #cbd9ec; }
    .tool-button.active, .plain-button.active {
      border-color: rgba(96,165,250,.55);
      background: rgba(59,130,246,.18);
      box-shadow: inset 0 0 20px rgba(59,130,246,.08);
    }
    .count-badge {
      display: inline-grid;
      place-items: center;
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 900;
      color: #0b1421;
      background: var(--yellow);
      margin-left: -3px;
    }
    .count-badge.hidden { display: none; }

    .segmented {
      display: inline-flex;
      padding: 3px;
      gap: 3px;
      border: 1px solid rgba(129, 158, 193, .18);
      border-radius: 12px;
      background: rgba(7, 15, 27, .75);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.035);
      flex: 0 0 auto;
    }
    .segmented button {
      height: 30px;
      border: 0;
      padding: 0 11px;
      border-radius: 9px;
      color: var(--muted);
      background: transparent;
    }
    .segmented button.active {
      color: #f7fbff;
      background: linear-gradient(180deg, #3c7bf7, #2b5fe8);
      box-shadow: 0 8px 20px rgba(59,130,246,.28), inset 0 1px 0 rgba(255,255,255,.22);
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px 16px 0;
      min-width: 0;
    }
    .metric-grid {
      display: grid;
      grid-template-columns: repeat(8, minmax(130px, 1fr));
      gap: 12px;
      min-width: 0;
    }
    .metric-card {
      position: relative;
      min-height: 76px;
      display: grid;
      grid-template-columns: minmax(86px, auto) 1fr;
      align-items: center;
      gap: 10px;
      overflow: hidden;
      padding: 12px 12px 12px 14px;
      border: 1px solid rgba(129, 158, 193, .17);
      border-radius: var(--radius);
      background: linear-gradient(180deg, rgba(18, 34, 54, .78), rgba(11, 22, 37, .82));
      box-shadow: var(--card-shadow);
    }
    .metric-card::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,.035), transparent);
      transform: translateX(-100%);
      animation: shimmer 8s ease-in-out infinite;
      pointer-events: none;
    }
    @keyframes shimmer {
      0%, 70% { transform: translateX(-110%); }
      100% { transform: translateX(110%); }
    }
    .metric-title {
      color: #d5deec;
      font-size: 12px;
      white-space: nowrap;
      margin-bottom: 7px;
    }
    .metric-value {
      display: inline-flex;
      align-items: baseline;
      gap: 5px;
      font-size: clamp(18px, 1.8vw, 25px);
      font-weight: 820;
      letter-spacing: -0.045em;
    }
    .metric-value small { font-size: 12px; color: #d6deea; font-weight: 700; letter-spacing: 0; }
    .sparkline {
      justify-self: stretch;
      width: 100%;
      height: 42px;
      opacity: .96;
      filter: drop-shadow(0 0 8px rgba(59,130,246,.16));
    }
    .sparkline path.line { fill: none; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
    .sparkline path.area { opacity: .15; }
    .sparkline.blue .line { stroke: var(--blue-2); }
    .sparkline.blue .area { fill: var(--blue); }
    .sparkline.green .line { stroke: var(--green); }
    .sparkline.green .area { fill: var(--green); }
    .sparkline.purple .line { stroke: #9d6bff; }
    .sparkline.purple .area { fill: #9d6bff; }
    .sparkline.cyan .line { stroke: var(--cyan); }
    .sparkline.cyan .area { fill: var(--cyan); }
    .sparkline.red .line { stroke: var(--red); }
    .sparkline.red .area { fill: var(--red); }
    body.hide-sparks .sparkline { opacity: .05; visibility: hidden; }

    .workspace {
      flex: 1;
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(340px, .85fr) minmax(420px, 1.03fr) minmax(540px, 1.28fr);
      gap: 12px;
    }
    .panel {
      min-height: 650px;
      overflow: hidden;
      border: 1px solid rgba(129, 158, 193, .18);
      border-radius: var(--radius);
      background:
        radial-gradient(circle at 55% 0%, rgba(82, 150, 255, .07), transparent 28rem),
        linear-gradient(180deg, rgba(13, 26, 42, .91), rgba(8, 18, 30, .96));
      box-shadow: var(--card-shadow);
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .panel-header {
      min-height: 54px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px 8px 14px;
      border-bottom: 1px solid var(--line);
      background: linear-gradient(180deg, rgba(15, 31, 51, .82), rgba(10, 22, 38, .58));
    }
    .panel-title-wrap { display: flex; flex-direction: column; gap: 2px; min-width: max-content; }
    .panel-title { font-size: 14px; font-weight: 850; text-transform: uppercase; letter-spacing: .02em; }
    .panel-subtitle { font-size: 11px; color: var(--muted-2); text-transform: none; letter-spacing: 0; }
    .panel-actions { margin-left: auto; display: flex; align-items: center; gap: 8px; min-width: 0; flex-wrap: wrap; justify-content: flex-end; }
    .search {
      height: 36px;
      width: min(100%, 220px);
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 8px;
      border: 1px solid rgba(129, 158, 193, .17);
      background: rgba(7, 16, 28, .70);
      padding: 0 10px;
      color: var(--muted);
      transition: border-color .15s ease, background .15s ease;
      min-width: 130px;
    }
    .search input { width: 100%; border: 0; outline: 0; color: var(--text); background: transparent; font-size: 13px; min-width: 0; }
    .search input::placeholder { color: #76879c; }
    .search svg { width: 16px; height: 16px; color: #a7b9cf; flex: 0 0 auto; }
    .icon-button { width: 38px; padding: 0; flex: 0 0 auto; }
    .icon-button.active {
      border-color: rgba(96, 165, 250, .60);
      background: linear-gradient(180deg, #3b82f6, #285ce1);
      box-shadow: 0 8px 20px rgba(59, 130, 246, .32), inset 0 1px 0 rgba(255,255,255,.20);
    }
    .icon-button svg { width: 17px; height: 17px; }
    .icon-button.warning { color: var(--yellow); border-color: rgba(248, 197, 27, .33); }
    .icon-button.danger { color: #ffb3b3; border-color: rgba(255,90,85,.28); }

    .column-head, .tree-row, .log-row {
      display: grid;
      align-items: center;
      min-width: 0;
      column-gap: 10px;
    }
    .column-head {
      color: #d1dbe9;
      height: 40px;
      padding: 0 14px;
      font-size: 12px;
      border-bottom: 1px solid var(--line);
      background: rgba(5, 13, 24, .22);
      position: sticky;
      top: 0;
      z-index: 3;
    }
    .table-scroll {
      overflow: auto;
      min-height: 0;
      flex: 1;
      scrollbar-width: thin;
      scrollbar-color: rgba(105, 135, 172, .52) rgba(10, 22, 37, .22);
      position: relative;
    }
    .table-scroll::-webkit-scrollbar { width: 9px; height: 9px; }
    .table-scroll::-webkit-scrollbar-track { background: rgba(10, 22, 37, .22); }
    .table-scroll::-webkit-scrollbar-thumb { background: rgba(105, 135, 172, .52); border-radius: 999px; }
    .table-inner { min-width: 0; }
    .logs-inner { min-width: 720px; }
    .process-inner { min-width: 640px; }
    .user-inner { min-width: 510px; }
    .tree-row, .log-row {
      min-height: var(--row-h);
      padding: 0 14px;
      border-bottom: 1px solid rgba(121, 151, 187, .105);
      color: #d8e3f2;
      font-size: 12.5px;
      transition: background .14s ease, border-color .14s ease, box-shadow .14s ease;
    }
    body.compact { --row-h: 31px; }
    body.compact .panel { min-height: 560px; }
    body.compact .metric-card { min-height: 66px; padding-top: 9px; padding-bottom: 9px; }
    .tree-row:hover, .log-row:hover { background: rgba(59, 130, 246, .07); }
    .tree-row.selected {
      background: linear-gradient(90deg, rgba(59, 130, 246, .18), rgba(59, 130, 246, .04));
      box-shadow: inset 3px 0 0 var(--blue-2);
      border-color: rgba(96, 165, 250, .24);
    }
    .tree-row.restricted-row { opacity: .75; }
    .tree-cell {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      overflow: hidden;
      padding-left: calc(var(--depth, 0) * 20px);
      position: relative;
    }
    .tree-row.tree-mode .tree-cell::before {
      content: "";
      position: absolute;
      left: calc(14px + var(--depth, 0) * 20px - 9px);
      top: 0;
      bottom: 0;
      border-left: 1px solid rgba(159, 176, 198, .20);
      display: var(--branch-display, none);
    }
    .tree-row.tree-mode.depth-1 .tree-cell::before,
    .tree-row.tree-mode.depth-2 .tree-cell::before,
    .tree-row.tree-mode.depth-3 .tree-cell::before,
    .tree-row.tree-mode.depth-4 .tree-cell::before { --branch-display: block; }
    .tree-cell strong {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 680;
    }
    .caret {
      width: 18px;
      height: 22px;
      flex: 0 0 18px;
      color: #a7bdd5;
      display: inline-grid;
      place-items: center;
      border-radius: 5px;
      cursor: pointer;
      transition: background .15s ease, transform .15s ease, color .15s ease;
      font-size: 17px;
      line-height: 1;
    }
    .caret:hover { background: rgba(96, 165, 250, .14); color: #e7f0ff; }
    .caret.empty { visibility: hidden; pointer-events: none; }
    .caret.collapsed { transform: rotate(-90deg); }
    .avatar, .proc-icon {
      width: 22px;
      height: 22px;
      display: inline-grid;
      place-items: center;
      flex: 0 0 auto;
      border-radius: 50%;
      color: #f7fbff;
      font-size: 11px;
      font-weight: 900;
      border: 1px solid rgba(255,255,255,.18);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.18), 0 0 14px rgba(59, 130, 246, .10);
      background: linear-gradient(180deg, #438aff, #2962df);
    }
    .avatar.root { background: linear-gradient(180deg, #65758d, #293749); color: #dce9f8; }
    .avatar.john { background: linear-gradient(180deg, #4b94ff, #235bdd); }
    .avatar.jane { background: linear-gradient(180deg, #a475ff, #6740c9); }
    .avatar.mike { background: linear-gradient(180deg, #42b6ff, #0e77c7); }
    .avatar.alex { background: linear-gradient(180deg, #42d79a, #138b59); }
    .avatar.service { background: linear-gradient(180deg, #748399, #34445a); }
    .avatar.nginx { background: linear-gradient(180deg, #35c36e, #11863f); }
    .avatar.postgres { background: linear-gradient(180deg, #5e95d8, #285184); }
    .avatar.docker { background: linear-gradient(180deg, #4db3ff, #1b72b9); }
    .proc-icon {
      border-radius: 7px;
      width: 20px;
      height: 20px;
      font-size: 10px;
      background: rgba(44, 58, 78, .92);
      color: #d7e7fa;
    }
    .proc-icon.js { color: #101820; background: #ffd500; border-color: #ffdd24; }
    .proc-icon.node { background: #164f28; color: #5aff7a; border-color: rgba(82, 227, 92, .4); }
    .proc-icon.nginx { background: #116c36; color: #abffc5; }
    .proc-icon.pg { background: #2b5b91; color: #d6ebff; }
    .proc-icon.docker { background: #1c65a5; color: #e5f4ff; }
    .proc-icon.shell { background: #111827; color: #dae7f7; }
    .proc-icon.chrome { background: conic-gradient(#ef4444, #f59e0b, #22c55e, #3b82f6, #ef4444); color: #fff; }
    .proc-icon.code { background: #1e6cbd; color: #e8f4ff; }
    .proc-icon.redis { background: #8d1d24; color: #ffe8e8; }
    .proc-icon.python { background: #19355f; color: #ffd86c; }
    .tag-you, .mini-tag, .permission-tag {
      display: inline-flex;
      align-items: center;
      height: 18px;
      padding: 0 6px;
      border-radius: 999px;
      font-size: 10px;
      line-height: 1;
      font-weight: 800;
      letter-spacing: .01em;
      white-space: nowrap;
    }
    .tag-you { color: #c7d9ff; background: rgba(59, 130, 246, .20); border: 1px solid rgba(96, 165, 250, .35); }
    .mini-tag { color: #cbd9ec; background: rgba(129, 158, 193, .12); border: 1px solid rgba(129, 158, 193, .20); }
    .permission-tag { color: #ffe8ad; background: rgba(245, 158, 11, .13); border: 1px solid rgba(245, 158, 11, .30); }
    .number-green { color: #62f45e; font-variant-numeric: tabular-nums; }
    .number-yellow { color: var(--yellow); font-variant-numeric: tabular-nums; }
    .number-red { color: var(--red); font-variant-numeric: tabular-nums; }
    .muted { color: var(--muted); }
    .tabular { font-variant-numeric: tabular-nums; }
    .mono { font-family: var(--font-mono); letter-spacing: -0.02em; }
    .status {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      color: #69ff70;
      white-space: nowrap;
    }
    .status::before {
      content: "";
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--green);
      box-shadow: 0 0 10px rgba(82, 227, 92, .65);
    }
    .status.idle { color: #ffd84d; }
    .status.idle::before { background: var(--yellow); box-shadow: 0 0 10px rgba(248, 197, 27, .62); }
    .status.stopped { color: #ff8787; }
    .status.stopped::before { background: var(--red); box-shadow: 0 0 10px rgba(255, 90, 85, .62); }
    .status.restricted { color: #9fb0c6; }
    .status.restricted::before { background: #91a4bb; box-shadow: none; }
    .severity {
      justify-content: center;
      height: 23px;
      min-width: 52px;
      padding: 0 8px;
      border-radius: 6px;
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: -.02em;
    }
    .severity.info { color: #6fb6ff; background: rgba(37, 99, 235, .22); border: 1px solid rgba(59, 130, 246, .22); }
    .severity.debug { color: #c8d3e1; background: rgba(124, 144, 169, .18); border: 1px solid rgba(124, 144, 169, .16); }
    .severity.warn { color: #ffd400; background: rgba(245, 158, 11, .22); border: 1px solid rgba(245, 158, 11, .26); }
    .severity.error { color: #ff7974; background: rgba(220, 38, 38, .24); border: 1px solid rgba(239, 68, 68, .25); }
    .msg.info { color: #d7e5f8; }
    .msg.debug { color: #cbd5e1; }
    .msg.warn { color: #ffd400; }
    .msg.error { color: #ff7974; }

    .legend {
      min-height: 44px;
      display: flex;
      align-items: center;
      gap: 22px;
      padding: 0 18px;
      border-top: 1px solid rgba(121,151,187,.14);
      background: rgba(8, 17, 29, .62);
      color: #cbd5e1;
      font-size: 12px;
      flex-wrap: wrap;
    }
    .legend-item { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
    .legend-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--green);
      box-shadow: 0 0 10px rgba(82,227,92,.4);
    }
    .legend-dot.idle { background: var(--yellow); box-shadow: 0 0 10px rgba(248,197,27,.4); }
    .legend-dot.restricted { background: #91a4bb; box-shadow: none; }
    .legend-dot.system { background: #8b5cf6; box-shadow: 0 0 10px rgba(139,92,246,.4); }
    .legend-dot.high { background: var(--orange); box-shadow: 0 0 10px rgba(255,153,28,.4); }
    .legend-dot.stop { background: var(--red); box-shadow: 0 0 10px rgba(255,90,85,.4); }

    .side-note {
      margin: 24px 38px;
      min-height: 92px;
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 16px 18px;
      color: #c7d5e8;
      border: 1px solid rgba(59, 130, 246, .34);
      border-radius: 9px;
      background: linear-gradient(180deg, rgba(26, 83, 161, .18), rgba(17, 43, 79, .15));
      box-shadow: inset 0 1px 0 rgba(255,255,255,.045);
    }
    .side-note svg { width: 32px; height: 32px; color: var(--blue-2); flex: 0 0 auto; }
    .side-note strong { display: block; font-size: 13px; margin-bottom: 5px; }
    .side-note span { display: block; color: #a8b7cb; font-size: 12px; line-height: 1.4; }
    .empty-state {
      min-height: 100%;
      display: grid;
      place-items: center;
      padding: 32px;
      color: #b6c7dc;
      text-align: center;
    }
    .empty-card { max-width: 390px; }
    .empty-icon { width: 64px; height: 64px; margin-bottom: 14px; color: #7f93ad; opacity: .9; }
    .empty-card h2 { font-size: 19px; margin: 0 0 8px; color: #edf5ff; letter-spacing: -0.04em; }
    .empty-card p { margin: 0; color: #98a9bd; line-height: 1.5; font-size: 13px; }

    .footer {
      min-height: 48px;
      display: flex;
      align-items: center;
      gap: 22px;
      padding: 8px 18px;
      border-top: 1px solid var(--line);
      background: rgba(5, 13, 24, .78);
      color: #c9d6e7;
      font-size: 13px;
      flex-wrap: wrap;
    }
    .footer-item { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
    .footer svg { width: 17px; height: 17px; color: #a7bbd4; }
    .footer strong { color: #f2f7ff; font-weight: 700; }
    .footer .push { margin-left: auto; }
    .mini-spark { width: 92px; height: 24px; }
    .switch {
      width: 38px;
      height: 20px;
      padding: 2px;
      display: inline-flex;
      align-items: center;
      border-radius: 999px;
      background: linear-gradient(180deg, #3c7bf7, #2b5fe8);
      border: 1px solid rgba(255,255,255,.12);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.22), 0 0 18px rgba(59,130,246,.22);
      cursor: pointer;
    }
    .switch span {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #fff;
      margin-left: 16px;
      transition: margin .15s ease;
      box-shadow: 0 1px 6px rgba(0,0,0,.32);
    }
    .switch.off { background: rgba(99, 113, 134, .30); }
    .switch.off span { margin-left: 0; }

    .popover {
      position: fixed;
      z-index: 10000;
      width: min(360px, calc(100vw - 24px));
      max-height: calc(100vh - 90px);
      overflow: auto;
      display: none;
      padding: 12px;
      border: 1px solid rgba(129, 158, 193, .24);
      border-radius: 12px;
      background: rgba(8, 18, 32, .98);
      box-shadow: 0 26px 90px rgba(0,0,0,.58), inset 0 1px 0 rgba(255,255,255,.04);
      backdrop-filter: blur(18px);
    }
    .popover.open { display: block; }
    .popover h3 { margin: 0 0 8px; font-size: 14px; letter-spacing: -0.03em; }
    .popover p { margin: 0 0 10px; color: var(--muted); font-size: 12px; line-height: 1.4; }
    .popover-section { padding: 10px; border: 1px solid rgba(129,158,193,.13); border-radius: 10px; background: rgba(12, 26, 44, .52); margin-top: 10px; }
    .popover-section:first-of-type { margin-top: 0; }
    .popover-title { font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: #9cb0c8; margin-bottom: 8px; font-weight: 900; }
    .check-row, .radio-row, .setting-row {
      min-height: 30px;
      display: flex;
      align-items: center;
      gap: 10px;
      color: #dce7f6;
      font-size: 13px;
    }
    .setting-row { justify-content: space-between; gap: 16px; }
    .check-row input, .radio-row input { accent-color: #3b82f6; width: 15px; height: 15px; }
    .settings-select, .mini-input {
      height: 30px;
      border: 1px solid rgba(129,158,193,.2);
      border-radius: 8px;
      color: var(--text);
      background: rgba(5, 13, 24, .65);
      padding: 0 8px;
      outline: none;
    }
    .mini-input { width: 78px; }
    .popover-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px; }
    .plain-button { height: 32px; padding: 0 10px; font-size: 12px; }
    .plain-button.primary { background: linear-gradient(180deg, #3b82f6, #285ce1); border-color: rgba(96,165,250,.6); color: #fff; }
    .plain-button.danger { color: #ffc1c1; border-color: rgba(239,68,68,.3); }

    .alert-item {
      padding: 10px;
      border-radius: 9px;
      background: rgba(11, 24, 40, .72);
      border: 1px solid rgba(129,158,193,.12);
      margin-top: 8px;
    }
    .alert-item strong { display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 13px; }
    .alert-item span { display: block; color: #aab9cc; font-size: 12px; margin-top: 4px; line-height: 1.35; }

    .toast-stack {
      position: fixed;
      right: 18px;
      bottom: 64px;
      z-index: 11000;
      display: grid;
      gap: 8px;
      pointer-events: none;
    }
    .toast {
      padding: 10px 12px;
      border: 1px solid rgba(96,165,250,.32);
      border-radius: 10px;
      color: #eaf3ff;
      background: rgba(11, 24, 40, .96);
      box-shadow: 0 18px 50px rgba(0,0,0,.40);
      font-size: 12px;
      animation: toastIn .18s ease both;
    }
    @keyframes toastIn { from { transform: translateY(6px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    .highlight-pulse { animation: highlightPulse 1.1s ease; }
    @keyframes highlightPulse {
      0% { box-shadow: inset 0 0 0 rgba(96,165,250,0), 0 0 0 rgba(96,165,250,0); }
      30% { box-shadow: inset 3px 0 0 var(--blue-2), 0 0 0 1px rgba(96,165,250,.35); }
      100% { box-shadow: inset 0 0 0 rgba(96,165,250,0), 0 0 0 rgba(96,165,250,0); }
    }


    /* ----------------------------------------------------------------------
       Theme system: dark mode is the default. Light mode overrides the same
       component tokens without changing the markup structure.
       ---------------------------------------------------------------------- */
    :root[data-theme="dark"] { color-scheme: dark; }
    :root[data-theme="light"] {
      color-scheme: light;
      --body-bg:
        radial-gradient(circle at 12% 5%, rgba(59, 130, 246, .18), transparent 28rem),
        radial-gradient(circle at 84% 8%, rgba(31, 194, 107, .12), transparent 26rem),
        radial-gradient(circle at 50% 106%, rgba(139, 92, 246, .11), transparent 35rem),
        linear-gradient(180deg, #f8fbff 0%, #eef4fb 58%, #e8eef7 100%);
      --bg: #f5f8fc;
      --bg-2: #eef4fb;
      --panel: rgba(255, 255, 255, .90);
      --panel-2: rgba(248, 251, 255, .97);
      --panel-3: rgba(239, 246, 255, .82);
      --line: rgba(71, 85, 105, .18);
      --line-strong: rgba(59, 130, 246, .34);
      --text: #0f172a;
      --muted: #536174;
      --muted-2: #718096;
      --blue: #2563eb;
      --blue-2: #2563eb;
      --green: #16a34a;
      --green-2: #15803d;
      --yellow: #b77905;
      --orange: #ea580c;
      --red: #dc2626;
      --purple: #7c3aed;
      --cyan: #0891b2;
      --card-shadow: 0 18px 48px rgba(15, 23, 42, .11), inset 0 1px 0 rgba(255, 255, 255, .78);
    }
    :root[data-theme="light"] body::before {
      background-image:
        linear-gradient(rgba(15, 23, 42, .045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(15, 23, 42, .035) 1px, transparent 1px);
      mask-image: linear-gradient(180deg, rgba(0,0,0,.38), transparent 78%);
    }
    :root[data-theme="light"] .app { background: rgba(255,255,255,.26); border-color: rgba(71,85,105,.14); }
    :root[data-theme="light"] .topbar { background: rgba(255,255,255,.86); }
    :root[data-theme="light"] .tool-button,
    :root[data-theme="light"] .select-like,
    :root[data-theme="light"] .segmented button,
    :root[data-theme="light"] .icon-button,
    :root[data-theme="light"] .plain-button {
      color: var(--text);
      border-color: rgba(71,85,105,.20);
      background: rgba(255,255,255,.72);
    }
    :root[data-theme="light"] .tool-button:hover,
    :root[data-theme="light"] .select-like:hover,
    :root[data-theme="light"] .segmented button:hover,
    :root[data-theme="light"] .icon-button:hover,
    :root[data-theme="light"] .search:hover,
    :root[data-theme="light"] .plain-button:hover { background: rgba(239,246,255,.96); border-color: rgba(37,99,235,.42); }
    :root[data-theme="light"] .tool-button svg,
    :root[data-theme="light"] .select-like svg,
    :root[data-theme="light"] .plain-button svg { color: #334155; }
    :root[data-theme="light"] .segmented { background: rgba(226,232,240,.72); border-color: rgba(71,85,105,.18); }
    :root[data-theme="light"] .segmented button.active,
    :root[data-theme="light"] .icon-button.active { color: #fff; background: linear-gradient(180deg, #3b82f6, #2563eb); }
    :root[data-theme="light"] .metric-card {
      border-color: rgba(71,85,105,.17);
      background: linear-gradient(180deg, rgba(255,255,255,.94), rgba(239,246,255,.90));
    }
    :root[data-theme="light"] .metric-title,
    :root[data-theme="light"] .metric-value small,
    :root[data-theme="light"] .column-head,
    :root[data-theme="light"] .tree-row,
    :root[data-theme="light"] .log-row,
    :root[data-theme="light"] .legend,
    :root[data-theme="light"] .footer { color: #334155; }
    :root[data-theme="light"] .panel {
      border-color: rgba(71,85,105,.18);
      background: radial-gradient(circle at 55% 0%, rgba(59,130,246,.11), transparent 28rem), linear-gradient(180deg, rgba(255,255,255,.94), rgba(245,248,252,.96));
    }
    :root[data-theme="light"] .panel-header { background: linear-gradient(180deg, rgba(248,250,252,.96), rgba(239,246,255,.74)); }
    :root[data-theme="light"] .search { background: rgba(255,255,255,.82); border-color: rgba(71,85,105,.20); }
    :root[data-theme="light"] .search input::placeholder { color: #8490a3; }
    :root[data-theme="light"] .search svg { color: #64748b; }
    :root[data-theme="light"] .column-head { background: rgba(241,245,249,.72); }
    :root[data-theme="light"] .tree-row,
    :root[data-theme="light"] .log-row { border-bottom-color: rgba(71,85,105,.12); }
    :root[data-theme="light"] .tree-row:hover,
    :root[data-theme="light"] .log-row:hover { background: rgba(37,99,235,.065); }
    :root[data-theme="light"] .tree-row.selected { background: linear-gradient(90deg, rgba(37,99,235,.15), rgba(37,99,235,.04)); }
    :root[data-theme="light"] .caret { color: #64748b; }
    :root[data-theme="light"] .caret:hover { color: #1d4ed8; background: rgba(37,99,235,.10); }
    :root[data-theme="light"] .legend { background: rgba(248,250,252,.86); border-top-color: rgba(71,85,105,.14); }
    :root[data-theme="light"] .side-note { color: #1e293b; background: linear-gradient(180deg, rgba(219,234,254,.80), rgba(239,246,255,.86)); }
    :root[data-theme="light"] .side-note span,
    :root[data-theme="light"] .empty-state,
    :root[data-theme="light"] .empty-card p { color: #64748b; }
    :root[data-theme="light"] .empty-card h2 { color: #0f172a; }
    :root[data-theme="light"] .footer { background: rgba(255,255,255,.82); }
    :root[data-theme="light"] .footer strong { color: #0f172a; }
    :root[data-theme="light"] .popover {
      border-color: rgba(71,85,105,.22);
      background: rgba(255,255,255,.98);
      box-shadow: 0 26px 80px rgba(15,23,42,.23), inset 0 1px 0 rgba(255,255,255,.82);
    }
    :root[data-theme="light"] .popover-section,
    :root[data-theme="light"] .alert-item { background: rgba(241,245,249,.78); border-color: rgba(71,85,105,.14); }
    :root[data-theme="light"] .popover-title { color: #475569; }
    :root[data-theme="light"] .check-row,
    :root[data-theme="light"] .radio-row,
    :root[data-theme="light"] .setting-row { color: #1e293b; }
    :root[data-theme="light"] .settings-select,
    :root[data-theme="light"] .mini-input { color: var(--text); background: rgba(255,255,255,.82); border-color: rgba(71,85,105,.22); }
    :root[data-theme="light"] .toast { color: #0f172a; background: rgba(255,255,255,.98); box-shadow: 0 18px 48px rgba(15,23,42,.18); }
    :root[data-theme="light"] .number-green { color: #15803d; }
    :root[data-theme="light"] .status { color: #15803d; }
    :root[data-theme="light"] .msg.info { color: #1f2937; }
    :root[data-theme="light"] .msg.debug { color: #475569; }
    :root[data-theme="light"] .msg.warn { color: #a16207; }
    :root[data-theme="light"] .msg.error { color: #dc2626; }

    body.high-contrast {
      --line: rgba(174, 201, 234, .28);
      --muted: #c1cce0;
      --text: #f7fbff;
    }
    body.reduce-motion *, body.reduce-motion *::before, body.reduce-motion *::after { animation: none !important; transition: none !important; }
    .fullscreen-fallback .app { position: fixed; inset: 0; z-index: 999; overflow: auto; }

    @media (max-width: 1480px) {
      .metric-grid { grid-template-columns: repeat(4, minmax(150px, 1fr)); }
      .workspace { grid-template-columns: minmax(320px, .9fr) minmax(390px, 1.1fr); }
      .logs-panel { grid-column: 1 / -1; min-height: 520px; }
    }
    @media (max-width: 960px) {
      .topbar { align-items: flex-start; flex-direction: column; }
      .toolbar { margin-left: 0; justify-content: flex-start; width: 100%; }
      .metric-grid { grid-template-columns: repeat(2, minmax(150px, 1fr)); }
      .workspace { grid-template-columns: 1fr; }
      .panel { min-height: 500px; }
      .panel-header { align-items: flex-start; flex-direction: column; }
      .panel-actions { margin-left: 0; justify-content: flex-start; width: 100%; }
      .search { width: min(100%, 260px); }
      .footer .push { margin-left: 0; }
    }
    @media (max-width: 560px) {
      .content { padding: 10px 10px 0; }
      .metric-grid { grid-template-columns: 1fr; }
      .metric-card { grid-template-columns: 1fr auto; }
      .tool-button .label, .plain-button .label { display: none; }
      .tool-button, .plain-button { padding: 0 10px; }
      .segmented { width: 100%; }
      .segmented button { flex: 1; }
      .brand { flex-wrap: wrap; }
      .footer { gap: 12px; }
      .legend { gap: 12px; }
    }
  </style>
</head>
<body>
  <!-- APP SHELL: full-page responsive monitoring dashboard. -->
  <main class="app" id="app">
    <!-- TOP BAR: brand, preview persona switch, and global dashboard controls. -->
    <header class="topbar">
      <div class="brand">
        <div class="pulse-logo" aria-hidden="true">
          <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22h6l3-9 5 22 5-30 5 17h10"/></svg>
        </div>
        <h1>Process Monitor</h1>
        <span id="liveBadge" class="live-badge">LIVE</span>
      </div>

      <div class="segmented" aria-label="Preview mode">
        <button id="rootViewBtn" type="button" class="active">Root User</button>
        <button id="normalViewBtn" type="button">Normal User</button>
      </div>

      <nav class="toolbar" aria-label="Global actions">
        <button id="topPauseBtn" class="tool-button" type="button" aria-pressed="false" title="Pause or resume live updates">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8 5v14M16 5v14" stroke-linecap="round"/></svg><span class="label">Pause</span>
        </button>
        <button id="filterBtn" class="tool-button" type="button" title="Open filters">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 5h18l-7 8v5l-4 2v-7z" stroke-linejoin="round"/></svg><span class="label">Filter</span><span id="filterBadge" class="count-badge hidden">0</span>
        </button>
        <button id="columnsBtn" class="tool-button" type="button" title="Choose visible columns">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="5" width="5" height="14" rx="1"/><rect x="10" y="5" width="5" height="14" rx="1"/><rect x="16" y="5" width="5" height="14" rx="1"/></svg><span class="label">Columns</span>
        </button>
        <button id="alertsBtn" class="tool-button" type="button" title="Open active alerts">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Z"/><path d="M18 16v-5a6 6 0 0 0-12 0v5l-2 2h20z" stroke-linejoin="round"/></svg><span class="label">Alerts</span><span id="alertBadge" class="count-badge">3</span>
        </button>
        <button id="settingsBtn" class="tool-button" type="button" title="Open settings">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-.4-1.1 1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.2 9a1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6c.38-.15.73-.35 1-.6.28-.28.43-.67.4-1.1V3a2 2 0 1 1 4 0v.1c-.03.43.12.82.4 1.1.27.25.62.45 1 .6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.15.38.35.73.6 1 .28.28.67.43 1.1.4h.1a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.1.4c-.25.27-.45.62-.6 1Z" stroke-linejoin="round"/></svg><span class="label">Settings</span>
        </button>
        <button id="themeToggleBtn" class="tool-button" type="button" aria-pressed="false" title="Switch between light and dark mode">
          <svg id="themeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke-linecap="round"/><circle cx="12" cy="12" r="4"/></svg><span id="themeLabel" class="label">Light</span>
        </button>
        <button id="fullscreenBtn" class="tool-button" type="button" title="Toggle fullscreen">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M21 16v5h-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button id="timeRangeBtn" class="select-like" type="button" title="Choose time range"><span id="timeRangeLabel">Last 5 minutes</span><span aria-hidden="true">⌄</span></button>
      </nav>
    </header>

    <section class="content">
      <!-- SYSTEM METRICS: realtime KPI cards with compact sparklines. -->
      <section class="metric-grid" aria-label="System metrics">
        <article class="metric-card"><div><div class="metric-title">Total Processes</div><div class="metric-value"><span id="metricTotalProcesses">128</span></div></div><svg class="sparkline blue" viewBox="0 0 96 42" preserveAspectRatio="none"><path class="area" d="M0 36 L8 35 L16 28 L24 18 L32 20 L40 18 L48 20 L56 19 L64 24 L72 21 L80 23 L88 10 L96 8 L96 42 L0 42Z"/><path class="line" d="M0 36 L8 35 L16 28 L24 18 L32 20 L40 18 L48 20 L56 19 L64 24 L72 21 L80 23 L88 10 L96 8"/></svg></article>
        <article class="metric-card"><div><div class="metric-title">Total Users</div><div class="metric-value"><span id="metricTotalUsers">12</span></div></div><svg class="sparkline blue" viewBox="0 0 96 42" preserveAspectRatio="none"><path class="area" d="M0 35 L9 31 L18 34 L27 23 L36 33 L45 26 L54 30 L63 17 L72 28 L81 16 L90 24 L96 18 L96 42 L0 42Z"/><path class="line" d="M0 35 L9 31 L18 34 L27 23 L36 33 L45 26 L54 30 L63 17 L72 28 L81 16 L90 24 L96 18"/></svg></article>
        <article class="metric-card"><div><div class="metric-title">CPU Usage</div><div class="metric-value"><span id="metricCpu">23.7</span><small>%</small></div></div><svg class="sparkline green" viewBox="0 0 96 42" preserveAspectRatio="none"><path class="area" d="M0 35 L10 30 L20 22 L30 23 L40 31 L50 31 L60 27 L70 29 L80 18 L90 8 L96 10 L96 42 L0 42Z"/><path class="line" d="M0 35 L10 30 L20 22 L30 23 L40 31 L50 31 L60 27 L70 29 L80 18 L90 8 L96 10"/></svg></article>
        <article class="metric-card"><div><div class="metric-title">Memory Usage</div><div class="metric-value"><span id="metricMemory">4.2</span><small>GB / 15.6 GB</small></div></div><svg class="sparkline purple" viewBox="0 0 96 42" preserveAspectRatio="none"><path class="area" d="M0 35 L8 30 L16 28 L24 18 L32 23 L40 22 L48 28 L56 23 L64 30 L72 27 L80 29 L88 18 L96 20 L96 42 L0 42Z"/><path class="line" d="M0 35 L8 30 L16 28 L24 18 L32 23 L40 22 L48 28 L56 23 L64 30 L72 27 L80 29 L88 18 L96 20"/></svg></article>
        <article class="metric-card"><div><div class="metric-title">Selected User CPU</div><div class="metric-value"><span id="metricUserCpu">8.6%</span></div></div><svg class="sparkline green" viewBox="0 0 96 42" preserveAspectRatio="none"><path class="area" d="M0 36 L10 33 L20 31 L30 34 L40 30 L50 26 L60 24 L70 21 L80 25 L90 19 L96 16 L96 42 L0 42Z"/><path class="line" d="M0 36 L10 33 L20 31 L30 34 L40 30 L50 26 L60 24 L70 21 L80 25 L90 19 L96 16"/></svg></article>
        <article class="metric-card"><div><div class="metric-title">Network I/O</div><div class="metric-value"><span id="metricNetwork">1.3</span><small>Gb/s</small></div></div><svg class="sparkline cyan" viewBox="0 0 96 42" preserveAspectRatio="none"><path class="area" d="M0 36 L8 34 L16 28 L24 30 L32 22 L40 25 L48 19 L56 22 L64 16 L72 18 L80 14 L88 12 L96 5 L96 42 L0 42Z"/><path class="line" d="M0 36 L8 34 L16 28 L24 30 L32 22 L40 25 L48 19 L56 22 L64 16 L72 18 L80 14 L88 12 L96 5"/></svg></article>
        <article class="metric-card"><div><div class="metric-title">Active Alerts</div><div class="metric-value"><span id="metricAlerts">3</span></div></div><svg class="sparkline red" viewBox="0 0 96 42" preserveAspectRatio="none"><path class="area" d="M0 34 L8 32 L16 31 L24 33 L32 35 L40 34 L48 34 L56 33 L64 32 L72 34 L80 20 L88 17 L96 12 L96 42 L0 42Z"/><path class="line" d="M0 34 L8 32 L16 31 L24 33 L32 35 L40 34 L48 34 L56 33 L64 32 L72 34 L80 20 L88 17 L96 12"/></svg></article>
        <article class="metric-card"><div><div class="metric-title">System Uptime</div><div class="metric-value"><span>5d</span><small>14h 22m</small></div></div></article>
      </section>

      <!-- WORKSPACE: three main panels arranged responsively. -->
      <section class="workspace" aria-label="Monitoring workspace">
        <!-- USER TREE PANEL: users only; no process children are rendered here. -->
        <section class="panel user-panel" aria-label="User tree">
          <div class="panel-header">
            <div class="panel-title-wrap">
              <div class="panel-title">User Tree</div>
              <div class="panel-subtitle">Summary-only users. Click a user to load processes.</div>
            </div>
            <div class="panel-actions">
              <label class="search" aria-label="Search users"><input id="userSearch" type="search" placeholder="Search users..." autocomplete="off" /><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4.2-4.2" stroke-linecap="round"/></svg></label>
              <button id="userExpandBtn" class="icon-button" type="button" title="Expand or collapse user tree"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
              <button id="userTreeBtn" class="icon-button active" type="button" title="User tree view"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4v6M12 10H7v5M12 10h5v5"/><circle cx="12" cy="4" r="2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg></button>
              <button id="userListBtn" class="icon-button" type="button" title="User list view"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01" stroke-linecap="round"/></svg></button>
            </div>
          </div>
          <div class="table-inner user-inner"><div id="userHead" class="column-head"></div></div>
          <div class="table-scroll" id="userScroll"><div class="table-inner user-inner" id="usersTable"></div><aside class="side-note" aria-label="Interaction hint"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01" stroke-linecap="round"/></svg><div><strong>Users stay summary-only</strong><span>The User Tree does not show child processes. Select a user to refresh the Process Tree and live logs.</span></div></aside></div>
          <div class="legend"><span class="legend-item"><i class="legend-dot"></i>Active</span><span class="legend-item"><i class="legend-dot idle"></i>Idle</span><span class="legend-item"><i class="legend-dot restricted"></i>Restricted</span><span class="legend-item"><i class="legend-dot system"></i>System</span></div>
        </section>

        <!-- PROCESS TREE PANEL: populated when a user row is selected. -->
        <section class="panel process-panel" aria-label="Process tree">
          <div class="panel-header">
            <div class="panel-title-wrap"><div class="panel-title">Process Tree</div><div class="panel-subtitle" id="processSubtitle">root selected · privileged process scope</div></div>
            <div class="panel-actions">
              <label class="search" aria-label="Search processes"><input id="processSearch" type="search" placeholder="Search processes..." autocomplete="off" /><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4.2-4.2" stroke-linecap="round"/></svg></label>
              <button id="processExpandBtn" class="icon-button" type="button" title="Expand or collapse process tree"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
              <button id="processTreeBtn" class="icon-button active" type="button" title="Process tree view"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4v6M12 10H7v5M12 10h5v5"/><circle cx="12" cy="4" r="2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg></button>
              <button id="processListBtn" class="icon-button" type="button" title="Process list view"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01" stroke-linecap="round"/></svg></button>
            </div>
          </div>
          <div class="table-inner process-inner"><div id="processHead" class="column-head"></div></div>
          <div class="table-scroll" id="processScroll"><div class="table-inner process-inner" id="processTable"></div></div>
          <div class="legend"><span class="legend-item"><i class="legend-dot"></i>Running</span><span class="legend-item"><i class="legend-dot idle"></i>Sleeping</span><span class="legend-item"><i class="legend-dot high"></i>High CPU</span><span class="legend-item"><i class="legend-dot stop"></i>Stopped</span><span class="legend-item"><i class="legend-dot restricted"></i>Zombie</span></div>
        </section>

        <!-- REAL-TIME LOGS PANEL: rows are filtered by the selected user/process scope. -->
        <section class="panel logs-panel" aria-label="Real-time logs">
          <div class="panel-header">
            <div class="panel-title-wrap"><div class="panel-title">Real-time Logs <span id="streamingLabel" class="streaming">Streaming</span></div><div class="panel-subtitle" id="logsSubtitle">Filtered by root process scope</div></div>
            <div class="panel-actions">
              <button id="logScopeBtn" class="select-like" type="button" aria-label="Log process filter"><span id="logFilterLabel">root scope</span><span aria-hidden="true">⌄</span></button>
              <label class="search" aria-label="Search logs"><input id="logSearch" type="search" placeholder="Search logs..." autocomplete="off" /><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4.2-4.2" stroke-linecap="round"/></svg></label>
              <button id="logPauseBtn" class="icon-button" type="button" title="Pause logs" aria-label="Pause logs"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M8 5v14M16 5v14" stroke-linecap="round"/></svg></button>
              <button id="clearLogsBtn" class="icon-button danger" type="button" title="Clear current logs" aria-label="Clear logs"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M6 6l1 16h10l1-16" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            </div>
          </div>
          <div class="table-inner logs-inner"><div id="logsHead" class="column-head"></div></div>
          <div class="table-scroll" id="logsScroll"><div class="table-inner logs-inner" id="logsTable"></div></div>
        </section>
      </section>
    </section>

    <!-- FOOTER STATUS BAR: global status, autoscroll, and log line limit. -->
    <footer class="footer" aria-label="Status bar">
      <span class="footer-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" stroke-linecap="round"/></svg> System Uptime: <strong>5d 14h 22m</strong></span>
      <span class="footer-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" stroke-linecap="round"/></svg> Load Average: <strong>0.42&nbsp; 0.38&nbsp; 0.35</strong></span>
      <span class="footer-item"><span class="status-dot-label"><span class="dot" aria-hidden="true"></span> Last Updated:</span> <strong id="lastUpdated">10:24:33</strong></span>
      <span class="footer-item push">CPU: <strong id="footerCpu">23.7%</strong><svg class="sparkline green mini-spark" viewBox="0 0 96 24" preserveAspectRatio="none"><path class="line" d="M0 19 L8 17 L16 20 L24 11 L32 16 L40 13 L48 18 L56 10 L64 12 L72 5 L80 16 L88 8 L96 11"/></svg></span>
      <span class="footer-item">Auto-scroll <span id="footerAutoScroll" class="switch" role="switch" aria-checked="true" tabindex="0"><span></span></span></span>
      <span class="footer-item">Log Lines: <button id="logLinesBtn" class="select-like" type="button"><strong id="logLineCount">5000</strong>⌄</button></span>
    </footer>
  </main>

  <!-- FLOATING POPOVERS: rendered outside the app shell so they can layer above every panel. -->
  <!-- Filters popover: log-level, process-status, and CPU-threshold controls. -->
  <div id="filterPopover" class="popover" role="dialog" aria-label="Filters">
    <h3>Filters</h3>
    <p>Filters apply immediately to the Process Tree and Real-time Logs.</p>
    <div class="popover-section"><div class="popover-title">Log levels</div><label class="check-row"><input type="checkbox" data-filter-level="INFO" checked> INFO</label><label class="check-row"><input type="checkbox" data-filter-level="DEBUG" checked> DEBUG</label><label class="check-row"><input type="checkbox" data-filter-level="WARN" checked> WARN</label><label class="check-row"><input type="checkbox" data-filter-level="ERROR" checked> ERROR</label></div>
    <div class="popover-section"><div class="popover-title">Process status</div><label class="check-row"><input type="checkbox" data-filter-status="Running" checked> Running</label><label class="check-row"><input type="checkbox" data-filter-status="Sleeping" checked> Sleeping</label><label class="check-row"><input type="checkbox" data-filter-status="Stopped" checked> Stopped</label><label class="check-row"><input type="checkbox" data-filter-status="Zombie" checked> Zombie</label></div>
    <div class="popover-section"><div class="popover-title">CPU threshold</div><div class="setting-row"><span>Minimum CPU %</span><input id="minCpuInput" class="mini-input" type="number" min="0" max="100" step="0.1" value="0"></div></div>
    <div class="popover-actions"><button id="resetFiltersBtn" class="plain-button" type="button">Reset</button><button class="plain-button primary" type="button" data-close-popover>Done</button></div>
  </div>

  <!-- Columns popover: live column visibility chooser for each table. -->
  <div id="columnsPopover" class="popover" role="dialog" aria-label="Column chooser">
    <h3>Columns</h3>
    <p>Show or hide columns in each panel. Name and Message columns stay enabled for readability.</p>
    <div class="popover-section"><div class="popover-title">User Tree</div><div id="userColumnChecks"></div></div>
    <div class="popover-section"><div class="popover-title">Process Tree</div><div id="processColumnChecks"></div></div>
    <div class="popover-section"><div class="popover-title">Real-time Logs</div><div id="logColumnChecks"></div></div>
    <div class="popover-actions"><button id="resetColumnsBtn" class="plain-button" type="button">Reset columns</button><button class="plain-button primary" type="button" data-close-popover>Done</button></div>
  </div>

  <!-- Settings popover: visual density, theme, refresh, and layout controls. -->
  <div id="settingsPopover" class="popover" role="dialog" aria-label="Settings">
    <h3>Settings</h3>
    <p>These switches update the mock UI immediately.</p>
    <div class="popover-section"><div class="setting-row"><span>Theme</span><select id="themeModeSelect" class="settings-select"><option value="dark" selected>Dark</option><option value="light">Light</option><option value="system">System</option></select></div><div class="setting-row"><span>Compact rows</span><span id="compactSwitch" class="switch off" role="switch" tabindex="0" aria-checked="false"><span></span></span></div><div class="setting-row"><span>Show metric sparklines</span><span id="sparksSwitch" class="switch" role="switch" tabindex="0" aria-checked="true"><span></span></span></div><div class="setting-row"><span>High contrast</span><span id="contrastSwitch" class="switch off" role="switch" tabindex="0" aria-checked="false"><span></span></span></div><div class="setting-row"><span>Reduce motion</span><span id="motionSwitch" class="switch off" role="switch" tabindex="0" aria-checked="false"><span></span></span></div></div>
    <div class="popover-section"><div class="setting-row"><span>Refresh interval</span><select id="refreshSelect" class="settings-select"><option value="800">0.8 sec</option><option value="1400" selected>1.4 sec</option><option value="3000">3 sec</option></select></div><div class="setting-row"><span>Log line cap</span><select id="settingsLogLines" class="settings-select"><option>1000</option><option selected>5000</option><option>10000</option></select></div></div>
    <div class="popover-actions"><button id="resetLayoutBtn" class="plain-button danger" type="button">Reset layout</button><button class="plain-button primary" type="button" data-close-popover>Done</button></div>
  </div>

  <!-- Alerts popover: alert inbox for the current mock session. -->
  <div id="alertsPopover" class="popover" role="dialog" aria-label="Alerts">
    <h3>Active Alerts</h3>
    <p>Current alerts for the selected process scope.</p>
    <div id="alertsList"></div>
    <div class="popover-actions"><button id="markAlertsReadBtn" class="plain-button" type="button">Mark all read</button><button class="plain-button primary" type="button" data-close-popover>Done</button></div>
  </div>

  <!-- Time range popover: controls the displayed monitoring window label. -->
  <div id="timePopover" class="popover" role="dialog" aria-label="Time range">
    <h3>Time Range</h3>
    <div class="popover-section" id="timeRangeChoices"><label class="radio-row"><input type="radio" name="timeRange" value="Last 1 minute"> Last 1 minute</label><label class="radio-row"><input type="radio" name="timeRange" value="Last 5 minutes" checked> Last 5 minutes</label><label class="radio-row"><input type="radio" name="timeRange" value="Last 15 minutes"> Last 15 minutes</label><label class="radio-row"><input type="radio" name="timeRange" value="Last 1 hour"> Last 1 hour</label></div>
  </div>

  <!-- Log scope popover: chooses selected/all/error-only log views. -->
  <div id="logScopePopover" class="popover" role="dialog" aria-label="Log scope">
    <h3>Log Scope</h3>
    <div class="popover-section" id="logScopeChoices"><label class="radio-row"><input type="radio" name="logScope" value="selected" checked> Selected user/process scope</label><label class="radio-row"><input type="radio" name="logScope" value="all"> All processes</label><label class="radio-row"><input type="radio" name="logScope" value="errors"> Errors only</label><label class="radio-row"><input type="radio" name="logScope" value="warnerror"> Warnings + errors</label></div>
  </div>

  <!-- Log lines popover: quick cap selector for log rows. -->
  <div id="logLinesPopover" class="popover" role="dialog" aria-label="Log lines">
    <h3>Log Lines</h3>
    <div class="popover-section"><label class="radio-row"><input type="radio" name="logLines" value="1000"> 1000</label><label class="radio-row"><input type="radio" name="logLines" value="5000" checked> 5000</label><label class="radio-row"><input type="radio" name="logLines" value="10000"> 10000</label></div>
  </div>

  <!-- TOAST STACK: non-blocking feedback for each interaction. -->
  <div id="toastStack" class="toast-stack" aria-live="polite"></div>

  <!-- SCRIPT: DATA MODEL: sample users, processes, logs, columns, state, and DOM references. -->
  <script>
    const svgEmpty = '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M9 18h6M10 22h4M12 2v3M5 8l2 2M19 8l-2 2M8 14a4 4 0 1 1 8 0c0 1.5-.7 2.5-1.6 3.3-.7.6-1.1 1.1-1.1 1.7H10.7c0-.6-.4-1.1-1.1-1.7C8.7 16.5 8 15.5 8 14z" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    const users = [
      { key: 'all', label: 'All Users', role: 'aggregate', avatar: 'A', avatarClass: 'service', cpu: 23.7, memory: '4.2 GB', processes: 128, status: 'Active', statusClass: 'active', depth: 0, hasChildren: true },
      { key: 'root', label: 'root', role: 'superuser', avatar: '#', avatarClass: 'root', cpu: 8.6, memory: '1.2 GB', processes: 32, status: 'Active', statusClass: 'active', tag: 'ROOT', depth: 1 },
      { key: 'john', label: 'john', role: 'normal', avatar: 'J', avatarClass: 'john', cpu: 5.7, memory: '864.2 MB', processes: 18, status: 'Active', statusClass: 'active', tag: 'YOU', depth: 1 },
      { key: 'jane', label: 'jane', role: 'normal', avatar: 'J', avatarClass: 'jane', cpu: 3.2, memory: '512.8 MB', processes: 12, status: 'Active', statusClass: 'active', depth: 1 },
      { key: 'mike', label: 'mike', role: 'normal', avatar: 'M', avatarClass: 'mike', cpu: 2.1, memory: '310.7 MB', processes: 9, status: 'Active', statusClass: 'active', depth: 1 },
      { key: 'alex', label: 'alex', role: 'normal', avatar: 'A', avatarClass: 'alex', cpu: 1.6, memory: '198.6 MB', processes: 6, status: 'Active', statusClass: 'active', depth: 1 },
      { key: 'docker', label: 'docker', role: 'service', avatar: 'D', avatarClass: 'docker', cpu: 2.1, memory: '345.6 MB', processes: 6, status: 'Active', statusClass: 'active', tag: 'SERVICE', depth: 1 },
      { key: 'nginx', label: 'nginx', role: 'service', avatar: 'N', avatarClass: 'nginx', cpu: 4.1, memory: '512.3 MB', processes: 6, status: 'Active', statusClass: 'active', tag: 'SERVICE', depth: 1 },
      { key: 'postgres', label: 'postgres', role: 'service', avatar: 'P', avatarClass: 'postgres', cpu: 3.0, memory: '482.1 MB', processes: 15, status: 'Active', statusClass: 'active', tag: 'SERVICE', depth: 1 },
      { key: 'other', label: 'Other Users (7)', role: 'aggregate', avatar: '×', avatarClass: 'service', cpu: 2.5, memory: '1.1 GB', processes: 51, status: 'Active', statusClass: 'active', depth: 1 }
    ];

    const processData = {
      root: [
        { id: 'root-systemd', name: 'systemd (init)', pid: 1, cpu: .3, mem: '55.2 MB', status: 'Running', icon: '⚙', iconClass: '', children: [
          { id: 'root-sshd', name: 'sshd', pid: 742, cpu: .1, mem: '12.4 MB', status: 'Running', icon: '▣', iconClass: '', children: [
            { id: 'root-bash', name: 'bash', pid: 1123, cpu: .2, mem: '8.1 MB', status: 'Running', icon: '>', iconClass: 'shell', children: [
              { id: 'root-node', name: 'node server.js', pid: 1156, cpu: 5.6, mem: '128.7 MB', status: 'Running', icon: '⬢', iconClass: 'node', children: [
                { id: 'root-w1', name: 'worker.js', pid: 1161, cpu: 2.1, mem: '45.3 MB', status: 'Running', icon: 'JS', iconClass: 'js' },
                { id: 'root-w2', name: 'worker.js', pid: 1162, cpu: 1.8, mem: '44.8 MB', status: 'Running', icon: 'JS', iconClass: 'js' },
                { id: 'root-dbjs', name: 'database.js', pid: 1163, cpu: 1.2, mem: '38.9 MB', status: 'Running', icon: 'JS', iconClass: 'js' },
                { id: 'root-cache', name: 'cache.js', pid: 1164, cpu: .8, mem: '24.6 MB', status: 'Running', icon: 'JS', iconClass: 'js' }
              ]}
            ]}
          ]}
        ]},
        { id: 'root-nginx', name: 'nginx', pid: 888, cpu: 1.3, mem: '33.6 MB', status: 'Running', icon: 'N', iconClass: 'nginx', children: [
          { id: 'root-nginx-889', name: 'nginx: worker process', pid: 889, cpu: .6, mem: '15.8 MB', status: 'Running', icon: '>', iconClass: 'shell' },
          { id: 'root-nginx-890', name: 'nginx: worker process', pid: 890, cpu: .7, mem: '16.1 MB', status: 'Running', icon: '>', iconClass: 'shell' }
        ]},
        { id: 'root-postgres', name: 'postgres', pid: 994, cpu: 2.4, mem: '98.7 MB', status: 'Running', icon: 'P', iconClass: 'pg', children: [
          { id: 'root-pg-writer', name: 'postgres: writer', pid: 995, cpu: 1.1, mem: '32.2 MB', status: 'Running', icon: 'P', iconClass: 'pg' },
          { id: 'root-pg-wal', name: 'postgres: wal writer', pid: 996, cpu: .4, mem: '12.1 MB', status: 'Sleeping', icon: 'P', iconClass: 'pg' },
          { id: 'root-pg-bg', name: 'postgres: bgworker', pid: 997, cpu: .3, mem: '11.8 MB', status: 'Running', icon: 'P', iconClass: 'pg' }
        ]},
        { id: 'root-docker', name: 'docker', pid: 1021, cpu: 1.6, mem: '75.4 MB', status: 'Running', icon: 'D', iconClass: 'docker', children: [
          { id: 'root-containerd', name: 'containerd', pid: 1022, cpu: .6, mem: '22.8 MB', status: 'Running', icon: '>', iconClass: 'shell' },
          { id: 'root-dproxy', name: 'docker-proxy', pid: 1023, cpu: 1.0, mem: '18.2 MB', status: 'Running', icon: '>', iconClass: 'shell' }
        ]},
        { id: 'root-redis', name: 'redis-server', pid: 1033, cpu: .5, mem: '19.1 MB', status: 'Running', icon: 'R', iconClass: 'redis' },
        { id: 'root-cron', name: 'cron', pid: 1044, cpu: .1, mem: '2.1 MB', status: 'Sleeping', icon: '◷', iconClass: '' }
      ],
      john: [
        { id: 'john-shell', name: 'bash', pid: 2310, cpu: .6, mem: '78.2 MB', status: 'Running', icon: '>', iconClass: 'shell', children: [
          { id: 'john-devserver', name: 'node dev-server.js', pid: 2366, cpu: 2.6, mem: '118.4 MB', status: 'Running', icon: '⬢', iconClass: 'node', children: [
            { id: 'john-vite', name: 'vite --host 0.0.0.0', pid: 2369, cpu: 1.4, mem: '92.7 MB', status: 'Running', icon: 'JS', iconClass: 'js' },
            { id: 'john-tsserver', name: 'tsserver', pid: 2370, cpu: 1.1, mem: '96.3 MB', status: 'Running', icon: 'TS', iconClass: 'js' }
          ]},
          { id: 'john-tmux', name: 'tmux: server', pid: 2402, cpu: .4, mem: '24.2 MB', status: 'Running', icon: 'T', iconClass: 'shell' }
        ]},
        { id: 'john-code', name: 'code', pid: 2411, cpu: 2.3, mem: '256.4 MB', status: 'Running', icon: 'C', iconClass: 'code', children: [
          { id: 'john-extension', name: 'extensionHost', pid: 2420, cpu: .5, mem: '88.0 MB', status: 'Running', icon: 'C', iconClass: 'code' },
          { id: 'john-pty', name: 'ptyHost', pid: 2428, cpu: .2, mem: '22.5 MB', status: 'Sleeping', icon: '>', iconClass: 'shell' }
        ]},
        { id: 'john-chrome', name: 'chrome', pid: 2501, cpu: 2.1, mem: '345.6 MB', status: 'Running', icon: 'G', iconClass: 'chrome', children: [
          { id: 'john-chrome-render', name: 'chrome --renderer', pid: 2504, cpu: .8, mem: '102.1 MB', status: 'Running', icon: 'G', iconClass: 'chrome' },
          { id: 'john-chrome-gpu', name: 'chrome --gpu-process', pid: 2506, cpu: .3, mem: '40.7 MB', status: 'Sleeping', icon: 'G', iconClass: 'chrome' }
        ]},
        { id: 'john-slack', name: 'slack', pid: 2602, cpu: .9, mem: '256.0 MB', status: 'Running', icon: 'S', iconClass: '' }
      ],
      jane: [
        { id: 'jane-chrome', name: 'chrome', pid: 3130, cpu: 2.4, mem: '324.5 MB', status: 'Running', icon: 'G', iconClass: 'chrome', children: [
          { id: 'jane-tab', name: 'chrome --tab docs', pid: 3134, cpu: .7, mem: '88.3 MB', status: 'Running', icon: 'G', iconClass: 'chrome' }
        ]},
        { id: 'jane-slack', name: 'slack', pid: 3178, cpu: .4, mem: '89.1 MB', status: 'Running', icon: 'S', iconClass: '' },
        { id: 'jane-code', name: 'code', pid: 3200, cpu: .4, mem: '99.2 MB', status: 'Sleeping', icon: 'C', iconClass: 'code' }
      ],
      mike: [
        { id: 'mike-terminal', name: 'terminal', pid: 4114, cpu: .7, mem: '110.2 MB', status: 'Running', icon: '>', iconClass: 'shell', children: [
          { id: 'mike-python', name: 'python train.py', pid: 4120, cpu: 1.1, mem: '200.3 MB', status: 'Running', icon: 'PY', iconClass: 'python', children: [
            { id: 'mike-worker-a', name: 'dataloader worker 0', pid: 4121, cpu: .3, mem: '40.1 MB', status: 'Sleeping', icon: 'PY', iconClass: 'python' },
            { id: 'mike-worker-b', name: 'dataloader worker 1', pid: 4122, cpu: .3, mem: '38.6 MB', status: 'Sleeping', icon: 'PY', iconClass: 'python' }
          ]}
        ]},
        { id: 'mike-vim', name: 'vim', pid: 4198, cpu: .3, mem: '45.2 MB', status: 'Running', icon: 'V', iconClass: '' }
      ],
      alex: [
        { id: 'alex-git', name: 'git status --watch', pid: 5121, cpu: .6, mem: '78.6 MB', status: 'Running', icon: 'G', iconClass: '' },
        { id: 'alex-node', name: 'node cli.js', pid: 5125, cpu: 1.0, mem: '120.0 MB', status: 'Running', icon: '⬢', iconClass: 'node', children: [
          { id: 'alex-bash', name: 'bash', pid: 5126, cpu: 0.0, mem: '0.0 MB', status: 'Sleeping', icon: '>', iconClass: 'shell' }
        ]}
      ],
      docker: [
        { id: 'docker-daemon', name: 'dockerd', pid: 1021, cpu: 1.2, mem: '256.0 MB', status: 'Running', icon: 'D', iconClass: 'docker', children: [
          { id: 'docker-containerd', name: 'containerd', pid: 1022, cpu: .6, mem: '22.8 MB', status: 'Running', icon: 'D', iconClass: 'docker' },
          { id: 'docker-worker', name: 'container: app-worker', pid: 1452, cpu: .8, mem: '66.0 MB', status: 'Running', icon: 'D', iconClass: 'docker' }
        ]}
      ],
      nginx: [
        { id: 'nginx-master', name: 'nginx: master process', pid: 888, cpu: 1.3, mem: '33.6 MB', status: 'Running', icon: 'N', iconClass: 'nginx', children: [
          { id: 'nginx-worker-889', name: 'nginx: worker process', pid: 889, cpu: .6, mem: '15.8 MB', status: 'Running', icon: 'N', iconClass: 'nginx' },
          { id: 'nginx-worker-890', name: 'nginx: worker process', pid: 890, cpu: .7, mem: '16.1 MB', status: 'Running', icon: 'N', iconClass: 'nginx' }
        ]}
      ],
      postgres: [
        { id: 'postgres-main', name: 'postgres', pid: 994, cpu: 2.4, mem: '98.7 MB', status: 'Running', icon: 'P', iconClass: 'pg', children: [
          { id: 'postgres-writer', name: 'postgres: writer', pid: 995, cpu: 1.1, mem: '32.2 MB', status: 'Running', icon: 'P', iconClass: 'pg' },
          { id: 'postgres-wal', name: 'postgres: wal writer', pid: 996, cpu: .4, mem: '12.1 MB', status: 'Sleeping', icon: 'P', iconClass: 'pg' },
          { id: 'postgres-bg', name: 'postgres: bgworker', pid: 997, cpu: .3, mem: '11.8 MB', status: 'Running', icon: 'P', iconClass: 'pg' }
        ]}
      ],
      other: []
    };

    const logData = {
      root: [
        ['10:24:31.123', 'node server.js', 1156, 'INFO', 'Server started on port 3000'],
        ['10:24:31.125', 'worker.js', 1161, 'INFO', 'Worker started with id 1'],
        ['10:24:31.126', 'database.js', 1163, 'INFO', 'Connected to database'],
        ['10:24:31.200', 'nginx: worker process', 889, 'INFO', 'Accepted connection from 192.168.1.10'],
        ['10:24:31.245', 'node server.js', 1156, 'INFO', 'GET /api/users 200 15ms'],
        ['10:24:31.310', 'worker.js', 1162, 'DEBUG', 'Processing job 42'],
        ['10:24:31.410', 'database.js', 1163, 'INFO', 'Query executed in 12ms'],
        ['10:24:31.512', 'worker.js', 1161, 'WARN', 'Job queue size high (85)'],
        ['10:24:31.678', 'nginx: worker process', 890, 'INFO', 'Accepted connection from 192.168.1.11'],
        ['10:24:31.789', 'node server.js', 1156, 'ERROR', 'Unhandled exception: User not found'],
        ['10:24:31.790', 'worker.js', 1162, 'ERROR', 'Job 42 failed: Timeout exceeded'],
        ['10:24:31.900', 'postgres: writer', 995, 'INFO', 'WAL segment written'],
        ['10:24:32.001', 'postgres: bgworker', 997, 'DEBUG', 'Background worker heartbeat'],
        ['10:24:32.215', 'nginx: worker process', 889, 'INFO', 'GET /favicon.ico 404 2ms'],
        ['10:24:32.410', 'cache.js', 1164, 'INFO', 'Cache hit for key: user:123'],
        ['10:24:32.612', 'worker.js', 1161, 'INFO', 'Job 43 completed in 120ms'],
        ['10:24:32.890', 'database.js', 1163, 'ERROR', 'Connection pool exhausted'],
        ['10:24:33.001', 'node server.js', 1156, 'WARN', 'High response time detected: 502ms'],
        ['10:24:33.123', 'redis-server', 1033, 'INFO', 'Client connected: 127.0.0.1:54321'],
        ['10:24:33.456', 'docker', 1021, 'INFO', 'Container nginx started'],
        ['10:24:33.789', 'cron', 1044, 'INFO', 'Scheduled job completed']
      ],
      john: [
        ['10:24:31.102', 'node dev-server.js', 2366, 'INFO', 'Development server listening on :5173'],
        ['10:24:31.268', 'tsserver', 2370, 'DEBUG', 'Project graph refreshed in 44ms'],
        ['10:24:31.344', 'code', 2411, 'INFO', 'Workspace opened: process-monitor'],
        ['10:24:31.480', 'chrome --renderer', 2504, 'INFO', 'Loaded /dashboard preview'],
        ['10:24:31.592', 'node dev-server.js', 2366, 'WARN', 'API proxy fallback used for /logs'],
        ['10:24:31.774', 'extensionHost', 2420, 'DEBUG', 'Language server ready'],
        ['10:24:31.910', 'node dev-server.js', 2366, 'INFO', 'GET /api/processes?user=john 200 18ms'],
        ['10:24:32.104', 'ptyHost', 2428, 'INFO', 'Terminal spawned: bash'],
        ['10:24:32.290', 'chrome --gpu-process', 2506, 'DEBUG', 'Frame rendered in 12ms'],
        ['10:24:32.430', 'node dev-server.js', 2366, 'ERROR', 'Websocket reconnect attempt failed'],
        ['10:24:32.612', 'vite --host', 2369, 'INFO', 'Client reconnected'],
        ['10:24:32.880', 'tsserver', 2370, 'WARN', 'High memory watermark: 96.3 MB'],
        ['10:24:33.001', 'slack', 2602, 'INFO', 'Notification received']
      ],
      jane: [
        ['10:24:31.101', 'chrome', 3130, 'INFO', 'Tab active: docs'],
        ['10:24:31.230', 'slack', 3178, 'INFO', 'Workspace sync complete'],
        ['10:24:31.600', 'code', 3200, 'DEBUG', 'Extension host idle']
      ],
      mike: [
        ['10:24:31.150', 'python train.py', 4120, 'INFO', 'Epoch 12 started'],
        ['10:24:31.620', 'terminal', 4114, 'DEBUG', 'Shell prompt rendered'],
        ['10:24:32.900', 'python train.py', 4120, 'WARN', 'GPU utilization below expected threshold']
      ],
      alex: [
        ['10:24:31.310', 'git status --watch', 5121, 'INFO', 'Working tree clean'],
        ['10:24:32.002', 'node cli.js', 5125, 'INFO', 'CLI heartbeat']
      ],
      docker: [
        ['10:24:31.220', 'dockerd', 1021, 'INFO', 'Container api-nginx started'],
        ['10:24:31.650', 'containerd', 1022, 'DEBUG', 'Snapshot prepared'],
        ['10:24:32.410', 'container: app-worker', 1452, 'WARN', 'Restart policy triggered']
      ],
      nginx: [
        ['10:24:31.200', 'nginx worker', 889, 'INFO', 'Accepted connection from 192.168.1.10'],
        ['10:24:32.215', 'nginx worker', 889, 'INFO', 'GET /favicon.ico 404 2ms'],
        ['10:24:33.789', 'nginx worker', 890, 'INFO', 'GET /api/health 200 3ms']
      ],
      postgres: [
        ['10:24:31.900', 'postgres: writer', 995, 'INFO', 'WAL segment written'],
        ['10:24:32.001', 'postgres: bgworker', 997, 'DEBUG', 'Background worker heartbeat'],
        ['10:24:32.890', 'postgres', 994, 'ERROR', 'Connection pool exhausted']
      ],
      all: [],
      other: []
    };

    const alertsSeed = [
      { level: 'ERROR', title: 'Connection pool exhausted', text: 'database.js reported no available connections in root scope.' },
      { level: 'WARN', title: 'High response time detected', text: 'node server.js exceeded 500ms on the last collection window.' },
      { level: 'ERROR', title: 'Websocket reconnect failed', text: 'john / node dev-server.js failed a reconnect attempt.' }
    ];

    const columnDefs = {
      user: [
        { key: 'name', label: 'User', width: 'minmax(168px, 1fr)', required: true },
        { key: 'cpu', label: 'CPU %', width: '64px' },
        { key: 'memory', label: 'Memory', width: '86px' },
        { key: 'processes', label: 'Processes', width: '70px' },
        { key: 'status', label: 'Status', width: '82px' }
      ],
      process: [
        { key: 'name', label: 'Process Name', width: 'minmax(230px, 1fr)', required: true },
        { key: 'pid', label: 'PID', width: '70px' },
        { key: 'cpu', label: 'CPU %', width: '76px' },
        { key: 'memory', label: 'Memory', width: '92px' },
        { key: 'status', label: 'Status', width: '92px' }
      ],
      log: [
        { key: 'time', label: 'Time', width: '106px' },
        { key: 'process', label: 'Process', width: 'minmax(132px, 1fr)' },
        { key: 'pid', label: 'PID', width: '70px' },
        { key: 'level', label: 'Level', width: '82px' },
        { key: 'message', label: 'Message', width: 'minmax(230px, 1.7fr)', required: true }
      ]
    };

    const state = {
      mode: 'root',
      selectedUser: 'root',
      paused: false,
      userTreeExpanded: true,
      userView: 'tree',
      processView: 'tree',
      processExpanded: new Set(),
      allProcessesExpanded: true,
      search: { user: '', process: '', log: '' },
      filters: {
        levels: { INFO: true, DEBUG: true, WARN: true, ERROR: true },
        statuses: { Running: true, Sleeping: true, Stopped: true, Zombie: true },
        minCpu: 0
      },
      columns: {
        user: { name: true, cpu: true, memory: true, processes: true, status: true },
        process: { name: true, pid: true, cpu: true, memory: true, status: true },
        log: { time: true, process: true, pid: true, level: true, message: true }
      },
      logScope: 'selected',
      timeRange: 'Last 5 minutes',
      autoScroll: true,
      compact: false,
      showSparks: true,
      highContrast: false,
      reduceMotion: false,
      refreshMs: 1400,
      logLineCap: 5000,
      theme: 'dark',
      resolvedTheme: 'dark',
      alerts: alertsSeed.slice(),
      intervalId: null
    };

    const els = {
      userHead: document.getElementById('userHead'),
      processHead: document.getElementById('processHead'),
      logsHead: document.getElementById('logsHead'),
      usersTable: document.getElementById('usersTable'),
      processTable: document.getElementById('processTable'),
      logsTable: document.getElementById('logsTable'),
      userSearch: document.getElementById('userSearch'),
      processSearch: document.getElementById('processSearch'),
      logSearch: document.getElementById('logSearch'),
      processSubtitle: document.getElementById('processSubtitle'),
      logsSubtitle: document.getElementById('logsSubtitle'),
      liveBadge: document.getElementById('liveBadge'),
      streamingLabel: document.getElementById('streamingLabel'),
      alertBadge: document.getElementById('alertBadge'),
      filterBadge: document.getElementById('filterBadge'),
      themeToggleBtn: document.getElementById('themeToggleBtn'),
      themeLabel: document.getElementById('themeLabel'),
      themeIcon: document.getElementById('themeIcon'),
      toastStack: document.getElementById('toastStack')
    };
  </script>

  <!-- SCRIPT: UTILITIES: formatting helpers, tree traversal, visibility rules, and data selectors. -->
  <script>
    function esc(value) {
      return String(value ?? '').replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
    }
    function fmtCpu(value) { return typeof value === 'number' ? `${value.toFixed(1)}%` : value; }
    function cpuClass(cpu) { if (Number(cpu) >= 9) return 'number-red'; if (Number(cpu) >= 5) return 'number-yellow'; return 'number-green'; }
    function severityClass(level) { return String(level).toLowerCase(); }
    function processStatusClass(status) { return status === 'Sleeping' ? 'idle' : status === 'Stopped' ? 'stopped' : status === 'Zombie' ? 'restricted' : ''; }
    function hasChildren(node) { return Array.isArray(node.children) && node.children.length > 0; }
    function activeColumns(table) { return columnDefs[table].filter(col => state.columns[table][col.key]); }
    function gridTemplate(table) { return activeColumns(table).map(c => c.width).join(' '); }
    function setGrid(el, table) { el.style.gridTemplateColumns = gridTemplate(table); }
    function renderHeader(el, table) {
      setGrid(el, table);
      el.innerHTML = activeColumns(table).map(c => `<span>${esc(c.label)}</span>`).join('');
    }

    function flatten(nodes, depth = 0, acc = []) {
      for (const node of nodes || []) {
        acc.push({ ...node, depth });
        if (hasChildren(node)) flatten(node.children, depth + 1, acc);
      }
      return acc;
    }
    function collectIds(nodes, ids = []) {
      for (const node of nodes || []) {
        if (hasChildren(node)) ids.push(node.id);
        if (hasChildren(node)) collectIds(node.children, ids);
      }
      return ids;
    }
    function userRecord(key = state.selectedUser) {
      const raw = users.find(u => u.key === key) || users[1];
      return userVisibleForMode(raw);
    }
    function cleanLabel(label) { return String(label).replace(/ \(.+\)/, ''); }
    function userVisibleForMode(user) {
      if (state.mode === 'root') return { ...user };
      if (user.key === 'root') return { ...user, status: 'Restricted', statusClass: 'restricted', cpu: 0, memory: 'Hidden', processes: '—', tag: 'ROOT' };
      if (user.key === 'all') return { ...user, label: 'Visible Users', memory: '2.7 GB', processes: 63, cpu: 15.1 };
      if (user.key === 'other') return { ...user, status: 'Restricted', statusClass: 'restricted', memory: 'Hidden', processes: '—' };
      return { ...user };
    }
    function getProcessesForUser(key) {
      if (state.mode === 'normal' && key === 'root') return [];
      if (key === 'all') {
        const keys = state.mode === 'normal' ? ['john', 'jane', 'mike', 'alex', 'docker', 'nginx', 'postgres'] : ['root', 'john', 'jane', 'mike', 'alex', 'docker', 'nginx', 'postgres'];
        return keys.flatMap(k => processData[k] || []);
      }
      if (key === 'other') return [];
      return processData[key] || [];
    }
    function getRawLogsForScope() {
      if (state.logScope === 'all') {
        const keys = state.mode === 'normal' ? ['john', 'jane', 'mike', 'alex', 'docker', 'nginx', 'postgres'] : ['root', 'john', 'jane', 'mike', 'alex', 'docker', 'nginx', 'postgres'];
        return keys.flatMap(k => logData[k] || []);
      }
      if (state.mode === 'normal' && state.selectedUser === 'root') {
        return [
          ['10:24:31.111', 'permission', '—', 'WARN', 'Root process details are hidden for normal user scope'],
          ['10:24:31.150', 'session', '—', 'INFO', 'Select john or another visible user to load permitted processes']
        ];
      }
      if (state.selectedUser === 'all') return getRawLogsForAllSelected();
      return logData[state.selectedUser] || [];
    }
    function getRawLogsForAllSelected() {
      const keys = state.mode === 'normal' ? ['john', 'jane', 'mike', 'alex', 'docker', 'nginx', 'postgres'] : ['root', 'john', 'jane', 'mike', 'alex', 'docker', 'nginx', 'postgres'];
      return keys.flatMap(k => logData[k] || []);
    }
  </script>

  <!-- SCRIPT: RENDERERS: User Tree, Process Tree, Logs, Alerts, and label updates. -->
  <script>
    function renderUsers() {
      renderHeader(els.userHead, 'user');
      const q = state.search.user.trim().toLowerCase();
      let rows = [];
      const allUser = userVisibleForMode(users[0]);
      rows.push(allUser);
      if (state.userView === 'list' || state.userTreeExpanded || q) {
        rows.push(...users.slice(1).map(userVisibleForMode));
      }
      rows = rows.filter(u => !q || u.label.toLowerCase().includes(q) || u.role.toLowerCase().includes(q) || String(u.processes).includes(q));
      const cols = activeColumns('user');
      els.usersTable.innerHTML = rows.map(u => {
        const selected = u.key === state.selectedUser ? 'selected' : '';
        const restricted = u.statusClass === 'restricted' ? 'restricted-row' : '';
        const depth = state.userView === 'tree' && u.key !== 'all' ? 1 : 0;
        const caret = u.key === 'all' && state.userView === 'tree' ? `<span class="caret ${state.userTreeExpanded ? '' : 'collapsed'}" data-user-caret="all">⌄</span>` : '<span class="caret empty">⌄</span>';
        const tag = u.tag ? `<span class="${u.tag === 'YOU' ? 'tag-you' : 'permission-tag'}">${esc(u.tag)}</span>` : '';
        const values = {
          name: `<div class="tree-cell" style="--depth:${depth}">${caret}<span class="avatar ${esc(u.avatarClass)}">${esc(u.avatar)}</span><strong title="${esc(u.label)}">${esc(u.label)}</strong>${tag}</div>`,
          cpu: `<span class="${cpuClass(u.cpu)}">${fmtCpu(u.cpu)}</span>`,
          memory: `<span>${esc(u.memory)}</span>`,
          processes: `<span class="tabular">${esc(u.processes)}</span>`,
          status: `<span class="status ${u.statusClass === 'restricted' ? 'restricted' : ''}">${esc(u.status)}</span>`
        };
        return `<div class="tree-row user-row ${state.userView === 'tree' ? 'tree-mode' : ''} depth-${depth} ${selected} ${restricted}" data-user="${esc(u.key)}" style="grid-template-columns:${gridTemplate('user')}">${cols.map(c => values[c.key]).join('')}</div>`;
      }).join('');
      els.usersTable.querySelectorAll('.user-row').forEach(row => {
        row.addEventListener('click', e => {
          const caret = e.target.closest('[data-user-caret]');
          if (caret) { state.userTreeExpanded = !state.userTreeExpanded; renderUsers(); toast(state.userTreeExpanded ? 'User tree expanded' : 'User tree collapsed'); return; }
          selectUser(row.dataset.user);
        });
      });
      document.getElementById('userExpandBtn').classList.toggle('active', state.userTreeExpanded || state.userView === 'list');
      document.getElementById('userTreeBtn').classList.toggle('active', state.userView === 'tree');
      document.getElementById('userListBtn').classList.toggle('active', state.userView === 'list');
    }

    function nodeMatches(node, q) {
      if (!q) return true;
      return String(node.name).toLowerCase().includes(q) || String(node.pid).includes(q) || String(node.status).toLowerCase().includes(q);
    }
    function filterNodeTree(nodes, depth = 0, acc = [], q = '') {
      for (const node of nodes || []) {
        const children = node.children || [];
        const childAcc = [];
        filterNodeTree(children, depth + 1, childAcc, q);
        const matchesText = nodeMatches(node, q);
        const matchesStatus = state.filters.statuses[node.status] !== false;
        const matchesCpu = Number(node.cpu) >= Number(state.filters.minCpu || 0);
        const include = (matchesText || childAcc.length > 0) && (matchesStatus || childAcc.length > 0) && (matchesCpu || childAcc.length > 0);
        if (!include) continue;
        acc.push({ ...node, depth });
        const expanded = state.processView === 'list' || q || state.processExpanded.has(node.id);
        if (children.length && expanded) {
          if (q) acc.push(...childAcc);
          else filterNodeTree(children, depth + 1, acc, q);
        }
      }
      return acc;
    }
    function renderProcesses() {
      renderHeader(els.processHead, 'process');
      const raw = getProcessesForUser(state.selectedUser);
      const q = state.search.process.trim().toLowerCase();
      const rows = filterNodeTree(raw, 0, [], q);
      const cols = activeColumns('process');
      if (!rows.length) {
        const msg = (state.mode === 'normal' && state.selectedUser === 'root')
          ? '<h2>Root process tree restricted</h2><p>Normal users can see the root account summary, but cannot load root process details. Select john or another visible user.</p>'
          : '<h2>Select a user to view processes</h2><p>Choose a user from the User Tree. That user’s process tree will load here.</p>';
        els.processTable.innerHTML = `<div class="empty-state"><div class="empty-card">${svgEmpty}${msg}</div></div>`;
        return;
      }
      els.processTable.innerHTML = rows.map(p => {
        const hasKids = hasChildren(p);
        const expanded = state.processView === 'list' || q || state.processExpanded.has(p.id);
        const caret = hasKids && state.processView === 'tree' ? `<span class="caret ${expanded ? '' : 'collapsed'}" data-proc-caret="${esc(p.id)}">⌄</span>` : '<span class="caret empty">⌄</span>';
        const values = {
          name: `<div class="tree-cell" style="--depth:${state.processView === 'tree' ? p.depth : 0}">${caret}<span class="proc-icon ${esc(p.iconClass || '')}">${esc(p.icon)}</span><strong title="${esc(p.name)}">${esc(p.name)}</strong></div>`,
          pid: `<span class="tabular">${esc(p.pid)}</span>`,
          cpu: `<span class="${cpuClass(p.cpu)}">${fmtCpu(p.cpu)}</span>`,
          memory: `<span>${esc(p.mem)}</span>`,
          status: `<span class="status ${processStatusClass(p.status)}">${esc(p.status)}</span>`
        };
        return `<div class="tree-row proc-row ${state.processView === 'tree' ? 'tree-mode' : ''} depth-${p.depth}" data-proc="${esc(p.id)}" style="grid-template-columns:${gridTemplate('process')}">${cols.map(c => values[c.key]).join('')}</div>`;
      }).join('');
      els.processTable.querySelectorAll('[data-proc-caret]').forEach(caret => {
        caret.addEventListener('click', e => {
          e.stopPropagation();
          const id = caret.dataset.procCaret;
          if (state.processExpanded.has(id)) state.processExpanded.delete(id); else state.processExpanded.add(id);
          state.allProcessesExpanded = false;
          renderProcesses();
          toast(state.processExpanded.has(id) ? 'Process branch expanded' : 'Process branch collapsed');
        });
      });
      document.getElementById('processTreeBtn').classList.toggle('active', state.processView === 'tree');
      document.getElementById('processListBtn').classList.toggle('active', state.processView === 'list');
      document.getElementById('processExpandBtn').classList.toggle('active', state.processView === 'list' || state.allProcessesExpanded);
    }

    function filteredLogs() {
      const q = state.search.log.trim().toLowerCase();
      let logs = getRawLogsForScope();
      if (state.logScope === 'errors') logs = logs.filter(l => l[3] === 'ERROR');
      if (state.logScope === 'warnerror') logs = logs.filter(l => l[3] === 'WARN' || l[3] === 'ERROR');
      logs = logs.filter(l => state.filters.levels[l[3]] !== false);
      if (q) logs = logs.filter(l => l.join(' ').toLowerCase().includes(q));
      return logs.slice(0, state.logLineCap);
    }
    function renderLogs() {
      renderHeader(els.logsHead, 'log');
      const cols = activeColumns('log');
      const logs = filteredLogs();
      if (!logs.length) {
        els.logsTable.innerHTML = `<div class="empty-state"><div class="empty-card">${svgEmpty}<h2>No log rows match</h2><p>Adjust the search, level filters, or log scope to show matching real-time rows.</p></div></div>`;
        return;
      }
      els.logsTable.innerHTML = logs.map(([time, process, pid, level, message]) => {
        const cls = severityClass(level);
        const values = {
          time: `<span>${esc(time)}</span>`,
          process: `<span title="${esc(process)}">${esc(process)}</span>`,
          pid: `<span class="tabular">${esc(pid)}</span>`,
          level: `<span class="severity ${cls}">${esc(level)}</span>`,
          message: `<span class="msg ${cls}">${esc(message)}</span>`
        };
        return `<div class="log-row mono" style="grid-template-columns:${gridTemplate('log')}">${cols.map(c => `<div>${values[c.key]}</div>`).join('')}</div>`;
      }).join('');
      if (state.autoScroll) document.getElementById('logsScroll').scrollTop = 0;
    }

    function updateLabels() {
      const u = userRecord();
      const label = cleanLabel(u.label);
      const restricted = state.mode === 'normal' && state.selectedUser === 'root';
      document.getElementById('metricSelectedUser')?.remove();
      document.getElementById('metricUserCpu').textContent = typeof u.cpu === 'number' ? fmtCpu(u.cpu) : u.cpu;
      document.getElementById('metricTotalUsers').textContent = state.mode === 'normal' ? '6' : '12';
      document.getElementById('metricTotalProcesses').textContent = state.mode === 'normal' ? '63' : '128';
      document.getElementById('metricAlerts').textContent = state.alerts.length;
      els.alertBadge.textContent = state.alerts.length;
      els.alertBadge.classList.toggle('hidden', state.alerts.length === 0);
      els.processSubtitle.textContent = restricted ? 'root selected · restricted in normal-user scope' : `${label} selected · ${state.selectedUser === 'root' ? 'privileged' : 'user'} process scope`;
      els.logsSubtitle.textContent = state.logScope === 'all' ? 'Showing all permitted logs' : state.logScope === 'errors' ? 'Showing matching errors only' : state.logScope === 'warnerror' ? 'Showing warnings and errors' : `Filtered by ${label} process scope`;
      document.getElementById('logFilterLabel').textContent = state.logScope === 'selected' ? `${label} scope` : state.logScope === 'all' ? 'All Processes' : state.logScope === 'errors' ? 'Errors only' : 'Warn + Error';
      document.getElementById('timeRangeLabel').textContent = state.timeRange;
      document.getElementById('logLineCount').textContent = state.logLineCap;
      updateFilterBadge();
      renderAlerts();
    }
    function updateFilterBadge() {
      let count = 0;
      Object.values(state.filters.levels).forEach(v => { if (!v) count++; });
      Object.values(state.filters.statuses).forEach(v => { if (!v) count++; });
      if (Number(state.filters.minCpu) > 0) count++;
      els.filterBadge.textContent = count;
      els.filterBadge.classList.toggle('hidden', count === 0);
      document.getElementById('filterBtn').classList.toggle('active', count > 0);
    }
    function renderAlerts() {
      const list = document.getElementById('alertsList');
      if (!state.alerts.length) {
        list.innerHTML = '<div class="alert-item"><strong>All clear <span class="severity info">INFO</span></strong><span>No unread alerts in the current mock session.</span></div>';
        return;
      }
      list.innerHTML = state.alerts.map(a => `<div class="alert-item"><strong>${esc(a.title)} <span class="severity ${severityClass(a.level)}">${esc(a.level)}</span></strong><span>${esc(a.text)}</span></div>`).join('');
    }
    function renderAll() {
      renderUsers();
      renderProcesses();
      renderLogs();
      updateLabels();
    }
  </script>

  <!-- SCRIPT: ACTIONS: theme mode, user selection, mode switching, timers, and column controls. -->
  <script>
    function getStoredThemeMode() {
      try { return localStorage.getItem('processMonitorTheme') || 'dark'; }
      catch (error) { return 'dark'; }
    }
    function resolveThemeMode(themeMode) {
      if (themeMode === 'system') {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      }
      return themeMode === 'light' ? 'light' : 'dark';
    }
    function updateThemeButtonLabel() {
      const isLight = state.resolvedTheme === 'light';
      els.themeToggleBtn?.setAttribute('aria-pressed', String(isLight));
      els.themeToggleBtn?.classList.toggle('active', isLight);
      if (els.themeLabel) els.themeLabel.textContent = isLight ? 'Dark' : 'Light';
      if (els.themeToggleBtn) els.themeToggleBtn.title = isLight ? 'Switch to dark mode' : 'Switch to light mode';
      if (els.themeIcon) {
        els.themeIcon.innerHTML = isLight
          ? '<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.8 6.8 0 0 0 21 12.8Z" stroke-linecap="round" stroke-linejoin="round"/>'
          : '<path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke-linecap="round"/><circle cx="12" cy="12" r="4"/>';
      }
      const themeSelect = document.getElementById('themeModeSelect');
      if (themeSelect) themeSelect.value = state.theme;
    }
    function applyThemeMode(themeMode, options = {}) {
      state.theme = themeMode;
      state.resolvedTheme = resolveThemeMode(themeMode);
      document.documentElement.dataset.theme = state.resolvedTheme;
      updateThemeButtonLabel();
      if (options.persist !== false) {
        try { localStorage.setItem('processMonitorTheme', themeMode); }
        catch (error) { /* Storage can be blocked in sandboxed previews. */ }
      }
      if (options.announce) toast(`${state.resolvedTheme === 'light' ? 'Light' : 'Dark'} mode enabled`);
    }
    function toggleLightDarkMode() {
      const nextTheme = state.resolvedTheme === 'light' ? 'dark' : 'light';
      applyThemeMode(nextTheme, { announce: true });
    }
    function initializeThemeMode() {
      const storedThemeMode = getStoredThemeMode();
      applyThemeMode(storedThemeMode, { persist: false });
      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: light)').addEventListener?.('change', () => {
          if (state.theme === 'system') applyThemeMode('system', { persist: false });
        });
      }
    }

    function selectUser(key) {
      if (!users.some(u => u.key === key)) return;
      state.selectedUser = key;
      state.processExpanded = new Set(collectIds(getProcessesForUser(key)));
      state.allProcessesExpanded = true;
      state.logScope = 'selected';
      document.querySelector('input[name="logScope"][value="selected"]').checked = true;
      renderAll();
      const safeUserKey = window.CSS && CSS.escape ? CSS.escape(key) : String(key).replace(/[^a-zA-Z0-9_-]/g, match => '\\' + match);
      const row = document.querySelector(`[data-user="${safeUserKey}"]`);
      if (row) { row.classList.add('highlight-pulse'); setTimeout(() => row.classList.remove('highlight-pulse'), 1200); }
      toast(`${cleanLabel(userRecord(key).label)} selected — process tree loaded`);
    }
    function setMode(mode) {
      state.mode = mode;
      state.selectedUser = mode === 'root' ? 'root' : 'john';
      state.processExpanded = new Set(collectIds(getProcessesForUser(state.selectedUser)));
      state.allProcessesExpanded = true;
      document.getElementById('rootViewBtn').classList.toggle('active', mode === 'root');
      document.getElementById('normalViewBtn').classList.toggle('active', mode === 'normal');
      history.replaceState(null, '', '#' + mode);
      renderAll();
      toast(mode === 'root' ? 'Root user view enabled' : 'Normal user view enabled');
    }

    function togglePause(force) {
      state.paused = typeof force === 'boolean' ? force : !state.paused;
      document.getElementById('topPauseBtn').setAttribute('aria-pressed', String(state.paused));
      document.getElementById('topPauseBtn').querySelector('.label').textContent = state.paused ? 'Resume' : 'Pause';
      document.getElementById('topPauseBtn').classList.toggle('active', state.paused);
      document.getElementById('logPauseBtn').classList.toggle('active', state.paused);
      els.liveBadge.textContent = state.paused ? 'PAUSED' : 'LIVE';
      els.liveBadge.classList.toggle('paused', state.paused);
      els.streamingLabel.textContent = state.paused ? 'Paused' : 'Streaming';
      toast(state.paused ? 'Live updates paused' : 'Live updates resumed');
    }
    function nowTime() { return new Date().toLocaleTimeString('en-US', { hour12: false }); }
    function simulateTick() {
      if (state.paused) return;
      const cpu = 22.6 + Math.random() * 4.2;
      const mem = 4.08 + Math.random() * .32;
      const net = 1.1 + Math.random() * .6;
      document.getElementById('metricCpu').textContent = cpu.toFixed(1);
      document.getElementById('metricMemory').textContent = mem.toFixed(1);
      document.getElementById('metricNetwork').textContent = net.toFixed(1);
      document.getElementById('footerCpu').textContent = `${cpu.toFixed(1)}%`;
      document.getElementById('lastUpdated').textContent = nowTime();
      const currentKey = state.selectedUser === 'all' ? (state.mode === 'root' ? 'root' : 'john') : state.selectedUser;
      if (currentKey !== 'root' || state.mode === 'root') {
        const pool = logData[currentKey] || logData.john;
        const proc = flatten(getProcessesForUser(currentKey))[Math.floor(Math.random() * Math.max(1, flatten(getProcessesForUser(currentKey)).length))];
        if (pool && proc && Math.random() > .35) {
          const messages = [['INFO', 'Heartbeat received'], ['INFO', 'Snapshot refreshed'], ['DEBUG', 'Process sample collected'], ['INFO', 'CPU window recalculated'], ['WARN', 'Transient spike detected']];
          const [level, msg] = messages[Math.floor(Math.random() * messages.length)];
          pool.unshift([nowTime() + '.' + String(Math.floor(Math.random() * 900) + 100), proc.name, proc.pid, level, msg]);
          if (pool.length > 35) pool.pop();
          renderLogs();
        }
      }
    }
    function restartTimer() {
      if (state.intervalId) clearInterval(state.intervalId);
      state.intervalId = setInterval(simulateTick, state.refreshMs);
    }

    function createColumnChecks() {
      const containers = { user: document.getElementById('userColumnChecks'), process: document.getElementById('processColumnChecks'), log: document.getElementById('logColumnChecks') };
      for (const table of Object.keys(containers)) {
        containers[table].innerHTML = columnDefs[table].map(col => `<label class="check-row"><input type="checkbox" data-column-table="${table}" data-column-key="${col.key}" ${state.columns[table][col.key] ? 'checked' : ''} ${col.required ? 'disabled' : ''}> ${esc(col.label)}${col.required ? ' <span class="mini-tag">required</span>' : ''}</label>`).join('');
      }
      document.querySelectorAll('[data-column-table]').forEach(input => {
        input.addEventListener('change', () => {
          state.columns[input.dataset.columnTable][input.dataset.columnKey] = input.checked;
          renderAll();
          toast('Columns updated');
        });
      });
    }
    function resetColumns() {
      for (const table of Object.keys(state.columns)) for (const col of Object.keys(state.columns[table])) state.columns[table][col] = true;
      createColumnChecks();
      renderAll();
      toast('Columns reset');
    }
  </script>

  <!-- SCRIPT: POPOVERS AND FEEDBACK: layered dropdown positioning, switches, and toasts. -->
  <script>
    function openAnchoredPopover(popoverId, anchorElement) {
      const popoverElement = document.getElementById(popoverId);
      closeAllPopoversExcept(popoverId);
      const anchorRect = anchorElement.getBoundingClientRect();

      popoverElement.classList.add('open');
      popoverElement.style.visibility = 'hidden';
      popoverElement.style.left = '0px';
      popoverElement.style.top = '0px';
      popoverElement.style.width = `${Math.min(360, window.innerWidth - 24)}px`;

      const measuredRect = popoverElement.getBoundingClientRect();
      const horizontalMargin = 12;
      const verticalMargin = 12;
      const preferredWidth = Math.min(360, window.innerWidth - horizontalMargin * 2);
      const preferredLeft = anchorRect.right - preferredWidth;
      const safeLeft = Math.max(horizontalMargin, Math.min(preferredLeft, window.innerWidth - preferredWidth - horizontalMargin));

      const spaceBelow = window.innerHeight - anchorRect.bottom - verticalMargin;
      const spaceAbove = anchorRect.top - verticalMargin;
      const openAbove = measuredRect.height > spaceBelow && spaceAbove > spaceBelow;
      const maxAvailableHeight = Math.max(180, (openAbove ? spaceAbove : spaceBelow) - 8);
      const safeTop = openAbove
        ? Math.max(verticalMargin, anchorRect.top - Math.min(measuredRect.height, maxAvailableHeight) - 8)
        : Math.min(anchorRect.bottom + 8, window.innerHeight - Math.min(measuredRect.height, maxAvailableHeight) - verticalMargin);

      popoverElement.style.left = `${safeLeft}px`;
      popoverElement.style.top = `${safeTop}px`;
      popoverElement.style.maxHeight = `${maxAvailableHeight}px`;
      popoverElement.style.visibility = 'visible';
      anchorElement.classList.add('active');
    }
    function closeAllPopoversExcept(exceptId) {
      document.querySelectorAll('.popover.open').forEach(p => { if (p.id !== exceptId) p.classList.remove('open'); });
      ['filterBtn','columnsBtn','alertsBtn','settingsBtn','timeRangeBtn','logScopeBtn','logLinesBtn'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn && (!exceptId || !document.getElementById(exceptId)?.classList.contains('open'))) btn.classList.remove('active');
      });
      if (exceptId) {
        const map = { filterPopover: 'filterBtn', columnsPopover: 'columnsBtn', alertsPopover: 'alertsBtn', settingsPopover: 'settingsBtn', timePopover: 'timeRangeBtn', logScopePopover: 'logScopeBtn', logLinesPopover: 'logLinesBtn' };
        Object.entries(map).forEach(([pid, bid]) => { if (pid !== exceptId) document.getElementById(bid)?.classList.remove('active'); });
      }
    }
    function bindPopoverTrigger(buttonId, popoverId) {
      document.getElementById(buttonId).addEventListener('click', e => {
        e.stopPropagation();
        const pop = document.getElementById(popoverId);
        if (pop.classList.contains('open')) { pop.classList.remove('open'); document.getElementById(buttonId).classList.remove('active'); }
        else openAnchoredPopover(popoverId, document.getElementById(buttonId));
      });
    }
    function toast(message) {
      const item = document.createElement('div');
      item.className = 'toast';
      item.textContent = message;
      els.toastStack.appendChild(item);
      setTimeout(() => { item.style.opacity = '0'; item.style.transform = 'translateY(6px)'; }, 2200);
      setTimeout(() => item.remove(), 2600);
    }
    function setSwitch(el, on) {
      el.classList.toggle('off', !on);
      el.setAttribute('aria-checked', String(on));
    }
    function bindSwitch(el, getter, setter) {
      const toggle = () => { setter(!getter()); };
      el.addEventListener('click', toggle);
      el.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); } });
    }
  </script>

  <!-- SCRIPT: EVENT WIRING AND STARTUP: binds all controls and starts the live mock session. -->
  <script>
    function setupEvents() {
      document.getElementById('rootViewBtn').addEventListener('click', () => setMode('root'));
      document.getElementById('normalViewBtn').addEventListener('click', () => setMode('normal'));
      document.getElementById('topPauseBtn').addEventListener('click', () => togglePause());
      document.getElementById('logPauseBtn').addEventListener('click', () => togglePause());
      document.getElementById('clearLogsBtn').addEventListener('click', () => {
        const key = state.selectedUser === 'all' ? (state.mode === 'root' ? 'root' : 'john') : state.selectedUser;
        if (logData[key]) logData[key] = [];
        renderLogs();
        toast('Current log scope cleared');
      });
      document.getElementById('userExpandBtn').addEventListener('click', () => { state.userTreeExpanded = !state.userTreeExpanded; renderUsers(); toast(state.userTreeExpanded ? 'User tree expanded' : 'User tree collapsed'); });
      document.getElementById('userTreeBtn').addEventListener('click', () => { state.userView = 'tree'; renderUsers(); toast('User tree view'); });
      document.getElementById('userListBtn').addEventListener('click', () => { state.userView = 'list'; renderUsers(); toast('User list view'); });
      document.getElementById('processExpandBtn').addEventListener('click', () => {
        const ids = collectIds(getProcessesForUser(state.selectedUser));
        const allExpanded = ids.every(id => state.processExpanded.has(id));
        state.processExpanded = allExpanded ? new Set() : new Set(ids);
        state.allProcessesExpanded = !allExpanded;
        renderProcesses();
        toast(allExpanded ? 'Process tree collapsed' : 'Process tree expanded');
      });
      document.getElementById('processTreeBtn').addEventListener('click', () => { state.processView = 'tree'; renderProcesses(); toast('Process tree view'); });
      document.getElementById('processListBtn').addEventListener('click', () => { state.processView = 'list'; renderProcesses(); toast('Process list view'); });
      els.userSearch.addEventListener('input', e => { state.search.user = e.target.value; renderUsers(); });
      els.processSearch.addEventListener('input', e => { state.search.process = e.target.value; renderProcesses(); });
      els.logSearch.addEventListener('input', e => { state.search.log = e.target.value; renderLogs(); });

      bindPopoverTrigger('filterBtn', 'filterPopover');
      bindPopoverTrigger('columnsBtn', 'columnsPopover');
      bindPopoverTrigger('alertsBtn', 'alertsPopover');
      bindPopoverTrigger('settingsBtn', 'settingsPopover');
      bindPopoverTrigger('timeRangeBtn', 'timePopover');
      bindPopoverTrigger('logScopeBtn', 'logScopePopover');
      bindPopoverTrigger('logLinesBtn', 'logLinesPopover');
      document.getElementById('themeToggleBtn').addEventListener('click', toggleLightDarkMode);
      document.getElementById('themeModeSelect').addEventListener('change', e => applyThemeMode(e.target.value, { announce: true }));

      document.querySelectorAll('[data-close-popover]').forEach(btn => btn.addEventListener('click', () => closeAllPopoversExcept()));
      document.addEventListener('click', e => {
        if (!e.target.closest('.popover') && !e.target.closest('.tool-button') && !e.target.closest('.select-like')) closeAllPopoversExcept();
      });
      document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllPopoversExcept(); });

      document.querySelectorAll('[data-filter-level]').forEach(input => input.addEventListener('change', () => { state.filters.levels[input.dataset.filterLevel] = input.checked; renderLogs(); updateFilterBadge(); toast('Log level filter updated'); }));
      document.querySelectorAll('[data-filter-status]').forEach(input => input.addEventListener('change', () => { state.filters.statuses[input.dataset.filterStatus] = input.checked; renderProcesses(); updateFilterBadge(); toast('Process status filter updated'); }));
      document.getElementById('minCpuInput').addEventListener('input', e => { state.filters.minCpu = Number(e.target.value || 0); renderProcesses(); updateFilterBadge(); });
      document.getElementById('resetFiltersBtn').addEventListener('click', () => {
        state.filters = { levels: { INFO: true, DEBUG: true, WARN: true, ERROR: true }, statuses: { Running: true, Sleeping: true, Stopped: true, Zombie: true }, minCpu: 0 };
        document.querySelectorAll('[data-filter-level],[data-filter-status]').forEach(i => i.checked = true);
        document.getElementById('minCpuInput').value = 0;
        renderAll();
        toast('Filters reset');
      });
      document.getElementById('resetColumnsBtn').addEventListener('click', resetColumns);
      document.getElementById('markAlertsReadBtn').addEventListener('click', () => { state.alerts = []; renderAll(); toast('Alerts marked read'); });
      document.querySelectorAll('input[name="timeRange"]').forEach(input => input.addEventListener('change', () => { state.timeRange = input.value; updateLabels(); toast(`${state.timeRange} selected`); closeAllPopoversExcept(); }));
      document.querySelectorAll('input[name="logScope"]').forEach(input => input.addEventListener('change', () => { state.logScope = input.value; renderLogs(); updateLabels(); toast('Log scope updated'); closeAllPopoversExcept(); }));
      document.querySelectorAll('input[name="logLines"]').forEach(input => input.addEventListener('change', () => { state.logLineCap = Number(input.value); document.getElementById('settingsLogLines').value = input.value; renderLogs(); updateLabels(); toast(`Log line cap set to ${input.value}`); closeAllPopoversExcept(); }));

      bindSwitch(document.getElementById('footerAutoScroll'), () => state.autoScroll, val => { state.autoScroll = val; setSwitch(document.getElementById('footerAutoScroll'), val); toast(val ? 'Auto-scroll enabled' : 'Auto-scroll disabled'); });
      bindSwitch(document.getElementById('compactSwitch'), () => state.compact, val => { state.compact = val; document.body.classList.toggle('compact', val); setSwitch(document.getElementById('compactSwitch'), val); toast(val ? 'Compact rows enabled' : 'Comfortable rows enabled'); });
      bindSwitch(document.getElementById('sparksSwitch'), () => state.showSparks, val => { state.showSparks = val; document.body.classList.toggle('hide-sparks', !val); setSwitch(document.getElementById('sparksSwitch'), val); toast(val ? 'Sparklines shown' : 'Sparklines hidden'); });
      bindSwitch(document.getElementById('contrastSwitch'), () => state.highContrast, val => { state.highContrast = val; document.body.classList.toggle('high-contrast', val); setSwitch(document.getElementById('contrastSwitch'), val); toast(val ? 'High contrast enabled' : 'High contrast disabled'); });
      bindSwitch(document.getElementById('motionSwitch'), () => state.reduceMotion, val => { state.reduceMotion = val; document.body.classList.toggle('reduce-motion', val); setSwitch(document.getElementById('motionSwitch'), val); toast(val ? 'Motion reduced' : 'Motion restored'); });
      document.getElementById('refreshSelect').addEventListener('change', e => { state.refreshMs = Number(e.target.value); restartTimer(); toast('Refresh interval updated'); });
      document.getElementById('settingsLogLines').addEventListener('change', e => { state.logLineCap = Number(e.target.value); document.querySelector(`input[name="logLines"][value="${e.target.value}"]`).checked = true; renderLogs(); updateLabels(); toast(`Log line cap set to ${e.target.value}`); });
      document.getElementById('resetLayoutBtn').addEventListener('click', () => {
        state.userView = 'tree'; state.processView = 'tree'; state.userTreeExpanded = true; state.compact = false; state.showSparks = true; state.highContrast = false; state.reduceMotion = false; state.autoScroll = true; state.logScope = 'selected'; state.logLineCap = 5000; state.refreshMs = 1400;
        document.body.classList.remove('compact', 'hide-sparks', 'high-contrast', 'reduce-motion');
        setSwitch(document.getElementById('compactSwitch'), false); setSwitch(document.getElementById('sparksSwitch'), true); setSwitch(document.getElementById('contrastSwitch'), false); setSwitch(document.getElementById('motionSwitch'), false); setSwitch(document.getElementById('footerAutoScroll'), true);
        document.getElementById('refreshSelect').value = '1400'; document.getElementById('settingsLogLines').value = '5000'; document.querySelector('input[name="logScope"][value="selected"]').checked = true; document.querySelector('input[name="logLines"][value="5000"]').checked = true;
        restartTimer(); renderAll(); toast('Layout reset');
      });
      document.getElementById('fullscreenBtn').addEventListener('click', async () => {
        try {
          if (!document.fullscreenElement && document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
          else if (document.exitFullscreen) await document.exitFullscreen();
          document.getElementById('fullscreenBtn').classList.toggle('active', !!document.fullscreenElement);
          toast(document.fullscreenElement ? 'Fullscreen enabled' : 'Fullscreen exited');
        } catch (err) {
          document.body.classList.toggle('fullscreen-fallback');
          document.getElementById('fullscreenBtn').classList.toggle('active', document.body.classList.contains('fullscreen-fallback'));
          toast('Fullscreen fallback toggled');
        }
      });
    }

    function init() {
      initializeThemeMode();
      createColumnChecks();
      setupEvents();
      const initialMode = location.hash.replace('#','') === 'normal' ? 'normal' : 'root';
      state.selectedUser = initialMode === 'root' ? 'root' : 'john';
      state.mode = initialMode;
      state.processExpanded = new Set(collectIds(getProcessesForUser(state.selectedUser)));
      document.getElementById('rootViewBtn').classList.toggle('active', initialMode === 'root');
      document.getElementById('normalViewBtn').classList.toggle('active', initialMode === 'normal');
      renderAll();
      restartTimer();
    }
    init();
  </script>
</body>
</html>
````````

## `src/imports/process_monitor_root_normal_light_dark_final-2.html`

- Category: imported artifact/schema.
- Imports: No direct imports in this file.
- Exports: No named exports detected; inspect the default/component body.
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````html
<!doctype html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Process Monitor — Root & Normal User Interactive Mockup with Light/Dark Mode</title>
  <!-- THEME BOOTSTRAP: set saved light/dark/system preference before the CSS renders. -->
  <script>
    (function initializeThemeBeforePaint() {
      try {
        const storedTheme = localStorage.getItem('processMonitorTheme') || 'dark';
        const resolvedTheme = storedTheme === 'system'
          ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
          : (storedTheme === 'light' ? 'light' : 'dark');
        document.documentElement.dataset.theme = resolvedTheme;
      } catch (error) {
        document.documentElement.dataset.theme = 'dark';
      }
    })();
  </script>
  <!--
    All-in-one responsive UI mockup.
    Component map:
    1. App shell + top toolbar
    2. System metric cards
    3. User Tree summary panel
    4. Process Tree detail panel
    5. Real-time Logs panel
    6. Footer status bar
    7. Floating popovers and toast notifications
  -->
  <style>
    :root {
      color-scheme: dark;
      --body-bg: radial-gradient(circle at 12% 5%, rgba(44, 115, 255, .16), transparent 28rem), radial-gradient(circle at 84% 8%, rgba(31, 194, 107, .10), transparent 26rem), radial-gradient(circle at 50% 106%, rgba(139, 92, 246, .10), transparent 35rem), linear-gradient(180deg, #07101c 0%, #07111e 55%, #050c16 100%);
      --bg: #07111e;
      --bg-2: #0a1624;
      --panel: rgba(13, 26, 42, 0.9);
      --panel-2: rgba(9, 19, 32, 0.96);
      --panel-3: rgba(17, 33, 52, 0.76);
      --line: rgba(121, 151, 187, 0.18);
      --line-strong: rgba(126, 170, 222, 0.32);
      --text: #e8f0fb;
      --muted: #9fb0c6;
      --muted-2: #6f8198;
      --blue: #3b82f6;
      --blue-2: #60a5fa;
      --green: #52e35c;
      --green-2: #1fc26b;
      --yellow: #f8c51b;
      --orange: #ff991c;
      --red: #ff5a55;
      --purple: #8b5cf6;
      --cyan: #23d3ee;
      --card-shadow: 0 20px 70px rgba(0, 0, 0, .35), inset 0 1px 0 rgba(255, 255, 255, .035);
      --radius: 10px;
      --header-h: 64px;
      --row-h: 39px;
      --font-main: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      --font-mono: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
      font-family: var(--font-main);
    }

    * { box-sizing: border-box; }
    html, body { min-height: 100%; }
    body {
      margin: 0;
      min-height: 100vh;
      overflow-x: hidden;
      color: var(--text);
      background: var(--body-bg);
      letter-spacing: -0.01em;
    }
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      background-image:
        linear-gradient(rgba(255, 255, 255, .025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, .02) 1px, transparent 1px);
      background-size: 32px 32px;
      mask-image: linear-gradient(180deg, rgba(0,0,0,.55), transparent 78%);
    }
    button, input, select { font: inherit; }
    button { -webkit-tap-highlight-color: transparent; }

    .app {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(139, 168, 202, .10);
      background: rgba(3, 9, 18, .14);
      position: relative;
    }

    .topbar {
      min-height: var(--header-h);
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 10px 18px;
      border-bottom: 1px solid var(--line);
      background: rgba(5, 13, 24, .84);
      backdrop-filter: blur(16px);
      position: sticky;
      top: 0;
      z-index: 30;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: max-content;
    }
    .pulse-logo {
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      color: var(--blue-2);
      filter: drop-shadow(0 0 14px rgba(59,130,246,.40));
    }
    .pulse-logo svg { width: 34px; height: 34px; }
    h1 {
      font-size: clamp(18px, 2vw, 26px);
      line-height: 1;
      margin: 0;
      font-weight: 760;
      letter-spacing: -0.05em;
    }
    .live-badge, .scope-badge, .pill, .severity, .status-dot-label {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border-radius: 999px;
      white-space: nowrap;
    }
    .live-badge {
      height: 26px;
      padding: 0 10px;
      color: #70fb86;
      border: 1px solid rgba(82, 227, 92, .42);
      background: rgba(28, 165, 73, .12);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: .02em;
      box-shadow: inset 0 0 16px rgba(82, 227, 92, .07);
    }
    .live-badge.paused {
      color: #ffd56a;
      border-color: rgba(248, 197, 27, .42);
      background: rgba(248, 197, 27, .12);
    }
    .live-badge::before, .streaming::before, .dot::before {
      content: "";
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--green);
      box-shadow: 0 0 10px rgba(82, 227, 92, .75);
    }
    .live-badge.paused::before { background: var(--yellow); box-shadow: 0 0 10px rgba(248, 197, 27, .70); }

    .toolbar {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    .tool-button,
    .select-like,
    .segmented button,
    .icon-button,
    .plain-button {
      color: var(--text);
      border: 1px solid rgba(129, 158, 193, .18);
      background: rgba(10, 20, 34, .55);
      border-radius: 9px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 0 12px;
      font-size: 13px;
      line-height: 1;
      cursor: pointer;
      transition: border-color .15s ease, background .15s ease, transform .15s ease, box-shadow .15s ease;
      position: relative;
      user-select: none;
    }
    .tool-button:hover,
    .select-like:hover,
    .segmented button:hover,
    .icon-button:hover,
    .search:hover,
    .plain-button:hover {
      border-color: rgba(96, 165, 250, .45);
      background: rgba(12, 28, 50, .70);
    }
    .tool-button:active, .icon-button:active, .plain-button:active { transform: translateY(1px); }
    .tool-button svg, .select-like svg, .plain-button svg { width: 16px; height: 16px; color: #cbd9ec; }
    .tool-button.active, .plain-button.active {
      border-color: rgba(96,165,250,.55);
      background: rgba(59,130,246,.18);
      box-shadow: inset 0 0 20px rgba(59,130,246,.08);
    }
    .count-badge {
      display: inline-grid;
      place-items: center;
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 900;
      color: #0b1421;
      background: var(--yellow);
      margin-left: -3px;
    }
    .count-badge.hidden { display: none; }

    .segmented {
      display: inline-flex;
      padding: 3px;
      gap: 3px;
      border: 1px solid rgba(129, 158, 193, .18);
      border-radius: 12px;
      background: rgba(7, 15, 27, .75);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.035);
      flex: 0 0 auto;
    }
    .segmented button {
      height: 30px;
      border: 0;
      padding: 0 11px;
      border-radius: 9px;
      color: var(--muted);
      background: transparent;
    }
    .segmented button.active {
      color: #f7fbff;
      background: linear-gradient(180deg, #3c7bf7, #2b5fe8);
      box-shadow: 0 8px 20px rgba(59,130,246,.28), inset 0 1px 0 rgba(255,255,255,.22);
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px 16px 0;
      min-width: 0;
    }
    .metric-grid {
      display: grid;
      grid-template-columns: repeat(8, minmax(130px, 1fr));
      gap: 12px;
      min-width: 0;
    }
    .metric-card {
      position: relative;
      min-height: 76px;
      display: grid;
      grid-template-columns: minmax(86px, auto) 1fr;
      align-items: center;
      gap: 10px;
      overflow: hidden;
      padding: 12px 12px 12px 14px;
      border: 1px solid rgba(129, 158, 193, .17);
      border-radius: var(--radius);
      background: linear-gradient(180deg, rgba(18, 34, 54, .78), rgba(11, 22, 37, .82));
      box-shadow: var(--card-shadow);
    }
    .metric-card::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,.035), transparent);
      transform: translateX(-100%);
      animation: shimmer 8s ease-in-out infinite;
      pointer-events: none;
    }
    @keyframes shimmer {
      0%, 70% { transform: translateX(-110%); }
      100% { transform: translateX(110%); }
    }
    .metric-title {
      color: #d5deec;
      font-size: 12px;
      white-space: nowrap;
      margin-bottom: 7px;
    }
    .metric-value {
      display: inline-flex;
      align-items: baseline;
      gap: 5px;
      font-size: clamp(18px, 1.8vw, 25px);
      font-weight: 820;
      letter-spacing: -0.045em;
    }
    .metric-value small { font-size: 12px; color: #d6deea; font-weight: 700; letter-spacing: 0; }
    .sparkline {
      justify-self: stretch;
      width: 100%;
      height: 42px;
      opacity: .96;
      filter: drop-shadow(0 0 8px rgba(59,130,246,.16));
    }
    .sparkline path.line { fill: none; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
    .sparkline path.area { opacity: .15; }
    .sparkline.blue .line { stroke: var(--blue-2); }
    .sparkline.blue .area { fill: var(--blue); }
    .sparkline.green .line { stroke: var(--green); }
    .sparkline.green .area { fill: var(--green); }
    .sparkline.purple .line { stroke: #9d6bff; }
    .sparkline.purple .area { fill: #9d6bff; }
    .sparkline.cyan .line { stroke: var(--cyan); }
    .sparkline.cyan .area { fill: var(--cyan); }
    .sparkline.red .line { stroke: var(--red); }
    .sparkline.red .area { fill: var(--red); }
    body.hide-sparks .sparkline { opacity: .05; visibility: hidden; }

    .workspace {
      flex: 1;
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(340px, .85fr) minmax(420px, 1.03fr) minmax(540px, 1.28fr);
      gap: 12px;
    }
    .panel {
      min-height: 650px;
      overflow: hidden;
      border: 1px solid rgba(129, 158, 193, .18);
      border-radius: var(--radius);
      background:
        radial-gradient(circle at 55% 0%, rgba(82, 150, 255, .07), transparent 28rem),
        linear-gradient(180deg, rgba(13, 26, 42, .91), rgba(8, 18, 30, .96));
      box-shadow: var(--card-shadow);
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .panel-header {
      min-height: 54px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px 8px 14px;
      border-bottom: 1px solid var(--line);
      background: linear-gradient(180deg, rgba(15, 31, 51, .82), rgba(10, 22, 38, .58));
    }
    .panel-title-wrap { display: flex; flex-direction: column; gap: 2px; min-width: max-content; }
    .panel-title { font-size: 14px; font-weight: 850; text-transform: uppercase; letter-spacing: .02em; }
    .panel-subtitle { font-size: 11px; color: var(--muted-2); text-transform: none; letter-spacing: 0; }
    .panel-actions { margin-left: auto; display: flex; align-items: center; gap: 8px; min-width: 0; flex-wrap: wrap; justify-content: flex-end; }
    .search {
      height: 36px;
      width: min(100%, 220px);
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 8px;
      border: 1px solid rgba(129, 158, 193, .17);
      background: rgba(7, 16, 28, .70);
      padding: 0 10px;
      color: var(--muted);
      transition: border-color .15s ease, background .15s ease;
      min-width: 130px;
    }
    .search input { width: 100%; border: 0; outline: 0; color: var(--text); background: transparent; font-size: 13px; min-width: 0; }
    .search input::placeholder { color: #76879c; }
    .search svg { width: 16px; height: 16px; color: #a7b9cf; flex: 0 0 auto; }
    .icon-button { width: 38px; padding: 0; flex: 0 0 auto; }
    .icon-button.active {
      border-color: rgba(96, 165, 250, .60);
      background: linear-gradient(180deg, #3b82f6, #285ce1);
      box-shadow: 0 8px 20px rgba(59, 130, 246, .32), inset 0 1px 0 rgba(255,255,255,.20);
    }
    .icon-button svg { width: 17px; height: 17px; }
    .icon-button.warning { color: var(--yellow); border-color: rgba(248, 197, 27, .33); }
    .icon-button.danger { color: #ffb3b3; border-color: rgba(255,90,85,.28); }

    .column-head, .tree-row, .log-row {
      display: grid;
      align-items: center;
      min-width: 0;
      column-gap: 10px;
    }
    .column-head {
      color: #d1dbe9;
      height: 40px;
      padding: 0 14px;
      font-size: 12px;
      border-bottom: 1px solid var(--line);
      background: rgba(5, 13, 24, .22);
      position: sticky;
      top: 0;
      z-index: 3;
    }
    .table-scroll {
      overflow: auto;
      min-height: 0;
      flex: 1;
      scrollbar-width: thin;
      scrollbar-color: rgba(105, 135, 172, .52) rgba(10, 22, 37, .22);
      position: relative;
    }
    .table-scroll::-webkit-scrollbar { width: 9px; height: 9px; }
    .table-scroll::-webkit-scrollbar-track { background: rgba(10, 22, 37, .22); }
    .table-scroll::-webkit-scrollbar-thumb { background: rgba(105, 135, 172, .52); border-radius: 999px; }
    .table-inner { min-width: 0; }
    .logs-inner { min-width: 720px; }
    .process-inner { min-width: 640px; }
    .user-inner { min-width: 510px; }
    .tree-row, .log-row {
      min-height: var(--row-h);
      padding: 0 14px;
      border-bottom: 1px solid rgba(121, 151, 187, .105);
      color: #d8e3f2;
      font-size: 12.5px;
      transition: background .14s ease, border-color .14s ease, box-shadow .14s ease;
    }
    body.compact { --row-h: 31px; }
    body.compact .panel { min-height: 560px; }
    body.compact .metric-card { min-height: 66px; padding-top: 9px; padding-bottom: 9px; }
    .tree-row:hover, .log-row:hover { background: rgba(59, 130, 246, .07); }
    .tree-row.selected {
      background: linear-gradient(90deg, rgba(59, 130, 246, .18), rgba(59, 130, 246, .04));
      box-shadow: inset 3px 0 0 var(--blue-2);
      border-color: rgba(96, 165, 250, .24);
    }
    .tree-row.restricted-row { opacity: .75; }
    .tree-cell {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      overflow: hidden;
      padding-left: calc(var(--depth, 0) * 20px);
      position: relative;
    }
    .tree-row.tree-mode .tree-cell::before {
      content: "";
      position: absolute;
      left: calc(14px + var(--depth, 0) * 20px - 9px);
      top: 0;
      bottom: 0;
      border-left: 1px solid rgba(159, 176, 198, .20);
      display: var(--branch-display, none);
    }
    .tree-row.tree-mode.depth-1 .tree-cell::before,
    .tree-row.tree-mode.depth-2 .tree-cell::before,
    .tree-row.tree-mode.depth-3 .tree-cell::before,
    .tree-row.tree-mode.depth-4 .tree-cell::before { --branch-display: block; }
    .tree-cell strong {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 680;
    }
    .caret {
      width: 18px;
      height: 22px;
      flex: 0 0 18px;
      color: #a7bdd5;
      display: inline-grid;
      place-items: center;
      border-radius: 5px;
      cursor: pointer;
      transition: background .15s ease, transform .15s ease, color .15s ease;
      font-size: 17px;
      line-height: 1;
    }
    .caret:hover { background: rgba(96, 165, 250, .14); color: #e7f0ff; }
    .caret.empty { visibility: hidden; pointer-events: none; }
    .caret.collapsed { transform: rotate(-90deg); }
    .avatar, .proc-icon {
      width: 22px;
      height: 22px;
      display: inline-grid;
      place-items: center;
      flex: 0 0 auto;
      border-radius: 50%;
      color: #f7fbff;
      font-size: 11px;
      font-weight: 900;
      border: 1px solid rgba(255,255,255,.18);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.18), 0 0 14px rgba(59, 130, 246, .10);
      background: linear-gradient(180deg, #438aff, #2962df);
    }
    .avatar.root { background: linear-gradient(180deg, #65758d, #293749); color: #dce9f8; }
    .avatar.john { background: linear-gradient(180deg, #4b94ff, #235bdd); }
    .avatar.jane { background: linear-gradient(180deg, #a475ff, #6740c9); }
    .avatar.mike { background: linear-gradient(180deg, #42b6ff, #0e77c7); }
    .avatar.alex { background: linear-gradient(180deg, #42d79a, #138b59); }
    .avatar.service { background: linear-gradient(180deg, #748399, #34445a); }
    .avatar.nginx { background: linear-gradient(180deg, #35c36e, #11863f); }
    .avatar.postgres { background: linear-gradient(180deg, #5e95d8, #285184); }
    .avatar.docker { background: linear-gradient(180deg, #4db3ff, #1b72b9); }
    .proc-icon {
      border-radius: 7px;
      width: 20px;
      height: 20px;
      font-size: 10px;
      background: rgba(44, 58, 78, .92);
      color: #d7e7fa;
    }
    .proc-icon.js { color: #101820; background: #ffd500; border-color: #ffdd24; }
    .proc-icon.node { background: #164f28; color: #5aff7a; border-color: rgba(82, 227, 92, .4); }
    .proc-icon.nginx { background: #116c36; color: #abffc5; }
    .proc-icon.pg { background: #2b5b91; color: #d6ebff; }
    .proc-icon.docker { background: #1c65a5; color: #e5f4ff; }
    .proc-icon.shell { background: #111827; color: #dae7f7; }
    .proc-icon.chrome { background: conic-gradient(#ef4444, #f59e0b, #22c55e, #3b82f6, #ef4444); color: #fff; }
    .proc-icon.code { background: #1e6cbd; color: #e8f4ff; }
    .proc-icon.redis { background: #8d1d24; color: #ffe8e8; }
    .proc-icon.python { background: #19355f; color: #ffd86c; }
    .tag-you, .mini-tag, .permission-tag {
      display: inline-flex;
      align-items: center;
      height: 18px;
      padding: 0 6px;
      border-radius: 999px;
      font-size: 10px;
      line-height: 1;
      font-weight: 800;
      letter-spacing: .01em;
      white-space: nowrap;
    }
    .tag-you { color: #c7d9ff; background: rgba(59, 130, 246, .20); border: 1px solid rgba(96, 165, 250, .35); }
    .mini-tag { color: #cbd9ec; background: rgba(129, 158, 193, .12); border: 1px solid rgba(129, 158, 193, .20); }
    .permission-tag { color: #ffe8ad; background: rgba(245, 158, 11, .13); border: 1px solid rgba(245, 158, 11, .30); }
    .number-green { color: #62f45e; font-variant-numeric: tabular-nums; }
    .number-yellow { color: var(--yellow); font-variant-numeric: tabular-nums; }
    .number-red { color: var(--red); font-variant-numeric: tabular-nums; }
    .muted { color: var(--muted); }
    .tabular { font-variant-numeric: tabular-nums; }
    .mono { font-family: var(--font-mono); letter-spacing: -0.02em; }
    .status {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      color: #69ff70;
      white-space: nowrap;
    }
    .status::before {
      content: "";
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--green);
      box-shadow: 0 0 10px rgba(82, 227, 92, .65);
    }
    .status.idle { color: #ffd84d; }
    .status.idle::before { background: var(--yellow); box-shadow: 0 0 10px rgba(248, 197, 27, .62); }
    .status.stopped { color: #ff8787; }
    .status.stopped::before { background: var(--red); box-shadow: 0 0 10px rgba(255, 90, 85, .62); }
    .status.restricted { color: #9fb0c6; }
    .status.restricted::before { background: #91a4bb; box-shadow: none; }
    .severity {
      justify-content: center;
      height: 23px;
      min-width: 52px;
      padding: 0 8px;
      border-radius: 6px;
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: -.02em;
    }
    .severity.info { color: #6fb6ff; background: rgba(37, 99, 235, .22); border: 1px solid rgba(59, 130, 246, .22); }
    .severity.debug { color: #c8d3e1; background: rgba(124, 144, 169, .18); border: 1px solid rgba(124, 144, 169, .16); }
    .severity.warn { color: #ffd400; background: rgba(245, 158, 11, .22); border: 1px solid rgba(245, 158, 11, .26); }
    .severity.error { color: #ff7974; background: rgba(220, 38, 38, .24); border: 1px solid rgba(239, 68, 68, .25); }
    .msg.info { color: #d7e5f8; }
    .msg.debug { color: #cbd5e1; }
    .msg.warn { color: #ffd400; }
    .msg.error { color: #ff7974; }

    .legend {
      min-height: 44px;
      display: flex;
      align-items: center;
      gap: 22px;
      padding: 0 18px;
      border-top: 1px solid rgba(121,151,187,.14);
      background: rgba(8, 17, 29, .62);
      color: #cbd5e1;
      font-size: 12px;
      flex-wrap: wrap;
    }
    .legend-item { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
    .legend-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--green);
      box-shadow: 0 0 10px rgba(82,227,92,.4);
    }
    .legend-dot.idle { background: var(--yellow); box-shadow: 0 0 10px rgba(248,197,27,.4); }
    .legend-dot.restricted { background: #91a4bb; box-shadow: none; }
    .legend-dot.system { background: #8b5cf6; box-shadow: 0 0 10px rgba(139,92,246,.4); }
    .legend-dot.high { background: var(--orange); box-shadow: 0 0 10px rgba(255,153,28,.4); }
    .legend-dot.stop { background: var(--red); box-shadow: 0 0 10px rgba(255,90,85,.4); }

    .side-note {
      margin: 24px 38px;
      min-height: 92px;
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 16px 18px;
      color: #c7d5e8;
      border: 1px solid rgba(59, 130, 246, .34);
      border-radius: 9px;
      background: linear-gradient(180deg, rgba(26, 83, 161, .18), rgba(17, 43, 79, .15));
      box-shadow: inset 0 1px 0 rgba(255,255,255,.045);
    }
    .side-note svg { width: 32px; height: 32px; color: var(--blue-2); flex: 0 0 auto; }
    .side-note strong { display: block; font-size: 13px; margin-bottom: 5px; }
    .side-note span { display: block; color: #a8b7cb; font-size: 12px; line-height: 1.4; }
    .empty-state {
      min-height: 100%;
      display: grid;
      place-items: center;
      padding: 32px;
      color: #b6c7dc;
      text-align: center;
    }
    .empty-card { max-width: 390px; }
    .empty-icon { width: 64px; height: 64px; margin-bottom: 14px; color: #7f93ad; opacity: .9; }
    .empty-card h2 { font-size: 19px; margin: 0 0 8px; color: #edf5ff; letter-spacing: -0.04em; }
    .empty-card p { margin: 0; color: #98a9bd; line-height: 1.5; font-size: 13px; }

    .footer {
      min-height: 48px;
      display: flex;
      align-items: center;
      gap: 22px;
      padding: 8px 18px;
      border-top: 1px solid var(--line);
      background: rgba(5, 13, 24, .78);
      color: #c9d6e7;
      font-size: 13px;
      flex-wrap: wrap;
    }
    .footer-item { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
    .footer svg { width: 17px; height: 17px; color: #a7bbd4; }
    .footer strong { color: #f2f7ff; font-weight: 700; }
    .footer .push { margin-left: auto; }
    .mini-spark { width: 92px; height: 24px; }
    .switch {
      width: 38px;
      height: 20px;
      padding: 2px;
      display: inline-flex;
      align-items: center;
      border-radius: 999px;
      background: linear-gradient(180deg, #3c7bf7, #2b5fe8);
      border: 1px solid rgba(255,255,255,.12);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.22), 0 0 18px rgba(59,130,246,.22);
      cursor: pointer;
    }
    .switch span {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #fff;
      margin-left: 16px;
      transition: margin .15s ease;
      box-shadow: 0 1px 6px rgba(0,0,0,.32);
    }
    .switch.off { background: rgba(99, 113, 134, .30); }
    .switch.off span { margin-left: 0; }

    .popover {
      position: fixed;
      z-index: 10000;
      width: min(360px, calc(100vw - 24px));
      max-height: calc(100vh - 90px);
      overflow: auto;
      display: none;
      padding: 12px;
      border: 1px solid rgba(129, 158, 193, .24);
      border-radius: 12px;
      background: rgba(8, 18, 32, .98);
      box-shadow: 0 26px 90px rgba(0,0,0,.58), inset 0 1px 0 rgba(255,255,255,.04);
      backdrop-filter: blur(18px);
    }
    .popover.open { display: block; }
    .popover h3 { margin: 0 0 8px; font-size: 14px; letter-spacing: -0.03em; }
    .popover p { margin: 0 0 10px; color: var(--muted); font-size: 12px; line-height: 1.4; }
    .popover-section { padding: 10px; border: 1px solid rgba(129,158,193,.13); border-radius: 10px; background: rgba(12, 26, 44, .52); margin-top: 10px; }
    .popover-section:first-of-type { margin-top: 0; }
    .popover-title { font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: #9cb0c8; margin-bottom: 8px; font-weight: 900; }
    .check-row, .radio-row, .setting-row {
      min-height: 30px;
      display: flex;
      align-items: center;
      gap: 10px;
      color: #dce7f6;
      font-size: 13px;
    }
    .setting-row { justify-content: space-between; gap: 16px; }
    .check-row input, .radio-row input { accent-color: #3b82f6; width: 15px; height: 15px; }
    .settings-select, .mini-input {
      height: 30px;
      border: 1px solid rgba(129,158,193,.2);
      border-radius: 8px;
      color: var(--text);
      background: rgba(5, 13, 24, .65);
      padding: 0 8px;
      outline: none;
    }
    .mini-input { width: 78px; }
    .popover-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px; }
    .plain-button { height: 32px; padding: 0 10px; font-size: 12px; }
    .plain-button.primary { background: linear-gradient(180deg, #3b82f6, #285ce1); border-color: rgba(96,165,250,.6); color: #fff; }
    .plain-button.danger { color: #ffc1c1; border-color: rgba(239,68,68,.3); }

    .alert-item {
      padding: 10px;
      border-radius: 9px;
      background: rgba(11, 24, 40, .72);
      border: 1px solid rgba(129,158,193,.12);
      margin-top: 8px;
    }
    .alert-item strong { display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 13px; }
    .alert-item span { display: block; color: #aab9cc; font-size: 12px; margin-top: 4px; line-height: 1.35; }

    .toast-stack {
      position: fixed;
      right: 18px;
      bottom: 64px;
      z-index: 11000;
      display: grid;
      gap: 8px;
      pointer-events: none;
    }
    .toast {
      padding: 10px 12px;
      border: 1px solid rgba(96,165,250,.32);
      border-radius: 10px;
      color: #eaf3ff;
      background: rgba(11, 24, 40, .96);
      box-shadow: 0 18px 50px rgba(0,0,0,.40);
      font-size: 12px;
      animation: toastIn .18s ease both;
    }
    @keyframes toastIn { from { transform: translateY(6px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    .highlight-pulse { animation: highlightPulse 1.1s ease; }
    @keyframes highlightPulse {
      0% { box-shadow: inset 0 0 0 rgba(96,165,250,0), 0 0 0 rgba(96,165,250,0); }
      30% { box-shadow: inset 3px 0 0 var(--blue-2), 0 0 0 1px rgba(96,165,250,.35); }
      100% { box-shadow: inset 0 0 0 rgba(96,165,250,0), 0 0 0 rgba(96,165,250,0); }
    }


    /* ----------------------------------------------------------------------
       Theme system: dark mode is the default. Light mode overrides the same
       component tokens without changing the markup structure.
       ---------------------------------------------------------------------- */
    :root[data-theme="dark"] { color-scheme: dark; }
    :root[data-theme="light"] {
      color-scheme: light;
      --body-bg:
        radial-gradient(circle at 12% 5%, rgba(59, 130, 246, .18), transparent 28rem),
        radial-gradient(circle at 84% 8%, rgba(31, 194, 107, .12), transparent 26rem),
        radial-gradient(circle at 50% 106%, rgba(139, 92, 246, .11), transparent 35rem),
        linear-gradient(180deg, #f8fbff 0%, #eef4fb 58%, #e8eef7 100%);
      --bg: #f5f8fc;
      --bg-2: #eef4fb;
      --panel: rgba(255, 255, 255, .90);
      --panel-2: rgba(248, 251, 255, .97);
      --panel-3: rgba(239, 246, 255, .82);
      --line: rgba(71, 85, 105, .18);
      --line-strong: rgba(59, 130, 246, .34);
      --text: #0f172a;
      --muted: #536174;
      --muted-2: #718096;
      --blue: #2563eb;
      --blue-2: #2563eb;
      --green: #16a34a;
      --green-2: #15803d;
      --yellow: #b77905;
      --orange: #ea580c;
      --red: #dc2626;
      --purple: #7c3aed;
      --cyan: #0891b2;
      --card-shadow: 0 18px 48px rgba(15, 23, 42, .11), inset 0 1px 0 rgba(255, 255, 255, .78);
    }
    :root[data-theme="light"] body::before {
      background-image:
        linear-gradient(rgba(15, 23, 42, .045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(15, 23, 42, .035) 1px, transparent 1px);
      mask-image: linear-gradient(180deg, rgba(0,0,0,.38), transparent 78%);
    }
    :root[data-theme="light"] .app { background: rgba(255,255,255,.26); border-color: rgba(71,85,105,.14); }
    :root[data-theme="light"] .topbar { background: rgba(255,255,255,.86); }
    :root[data-theme="light"] .tool-button,
    :root[data-theme="light"] .select-like,
    :root[data-theme="light"] .segmented button,
    :root[data-theme="light"] .icon-button,
    :root[data-theme="light"] .plain-button {
      color: var(--text);
      border-color: rgba(71,85,105,.20);
      background: rgba(255,255,255,.72);
    }
    :root[data-theme="light"] .tool-button:hover,
    :root[data-theme="light"] .select-like:hover,
    :root[data-theme="light"] .segmented button:hover,
    :root[data-theme="light"] .icon-button:hover,
    :root[data-theme="light"] .search:hover,
    :root[data-theme="light"] .plain-button:hover { background: rgba(239,246,255,.96); border-color: rgba(37,99,235,.42); }
    :root[data-theme="light"] .tool-button svg,
    :root[data-theme="light"] .select-like svg,
    :root[data-theme="light"] .plain-button svg { color: #334155; }
    :root[data-theme="light"] .segmented { background: rgba(226,232,240,.72); border-color: rgba(71,85,105,.18); }
    :root[data-theme="light"] .segmented button.active,
    :root[data-theme="light"] .icon-button.active { color: #fff; background: linear-gradient(180deg, #3b82f6, #2563eb); }
    :root[data-theme="light"] .metric-card {
      border-color: rgba(71,85,105,.17);
      background: linear-gradient(180deg, rgba(255,255,255,.94), rgba(239,246,255,.90));
    }
    :root[data-theme="light"] .metric-title,
    :root[data-theme="light"] .metric-value small,
    :root[data-theme="light"] .column-head,
    :root[data-theme="light"] .tree-row,
    :root[data-theme="light"] .log-row,
    :root[data-theme="light"] .legend,
    :root[data-theme="light"] .footer { color: #334155; }
    :root[data-theme="light"] .panel {
      border-color: rgba(71,85,105,.18);
      background: radial-gradient(circle at 55% 0%, rgba(59,130,246,.11), transparent 28rem), linear-gradient(180deg, rgba(255,255,255,.94), rgba(245,248,252,.96));
    }
    :root[data-theme="light"] .panel-header { background: linear-gradient(180deg, rgba(248,250,252,.96), rgba(239,246,255,.74)); }
    :root[data-theme="light"] .search { background: rgba(255,255,255,.82); border-color: rgba(71,85,105,.20); }
    :root[data-theme="light"] .search input::placeholder { color: #8490a3; }
    :root[data-theme="light"] .search svg { color: #64748b; }
    :root[data-theme="light"] .column-head { background: rgba(241,245,249,.72); }
    :root[data-theme="light"] .tree-row,
    :root[data-theme="light"] .log-row { border-bottom-color: rgba(71,85,105,.12); }
    :root[data-theme="light"] .tree-row:hover,
    :root[data-theme="light"] .log-row:hover { background: rgba(37,99,235,.065); }
    :root[data-theme="light"] .tree-row.selected { background: linear-gradient(90deg, rgba(37,99,235,.15), rgba(37,99,235,.04)); }
    :root[data-theme="light"] .caret { color: #64748b; }
    :root[data-theme="light"] .caret:hover { color: #1d4ed8; background: rgba(37,99,235,.10); }
    :root[data-theme="light"] .legend { background: rgba(248,250,252,.86); border-top-color: rgba(71,85,105,.14); }
    :root[data-theme="light"] .side-note { color: #1e293b; background: linear-gradient(180deg, rgba(219,234,254,.80), rgba(239,246,255,.86)); }
    :root[data-theme="light"] .side-note span,
    :root[data-theme="light"] .empty-state,
    :root[data-theme="light"] .empty-card p { color: #64748b; }
    :root[data-theme="light"] .empty-card h2 { color: #0f172a; }
    :root[data-theme="light"] .footer { background: rgba(255,255,255,.82); }
    :root[data-theme="light"] .footer strong { color: #0f172a; }
    :root[data-theme="light"] .popover {
      border-color: rgba(71,85,105,.22);
      background: rgba(255,255,255,.98);
      box-shadow: 0 26px 80px rgba(15,23,42,.23), inset 0 1px 0 rgba(255,255,255,.82);
    }
    :root[data-theme="light"] .popover-section,
    :root[data-theme="light"] .alert-item { background: rgba(241,245,249,.78); border-color: rgba(71,85,105,.14); }
    :root[data-theme="light"] .popover-title { color: #475569; }
    :root[data-theme="light"] .check-row,
    :root[data-theme="light"] .radio-row,
    :root[data-theme="light"] .setting-row { color: #1e293b; }
    :root[data-theme="light"] .settings-select,
    :root[data-theme="light"] .mini-input { color: var(--text); background: rgba(255,255,255,.82); border-color: rgba(71,85,105,.22); }
    :root[data-theme="light"] .toast { color: #0f172a; background: rgba(255,255,255,.98); box-shadow: 0 18px 48px rgba(15,23,42,.18); }
    :root[data-theme="light"] .number-green { color: #15803d; }
    :root[data-theme="light"] .status { color: #15803d; }
    :root[data-theme="light"] .msg.info { color: #1f2937; }
    :root[data-theme="light"] .msg.debug { color: #475569; }
    :root[data-theme="light"] .msg.warn { color: #a16207; }
    :root[data-theme="light"] .msg.error { color: #dc2626; }

    body.high-contrast {
      --line: rgba(174, 201, 234, .28);
      --muted: #c1cce0;
      --text: #f7fbff;
    }
    body.reduce-motion *, body.reduce-motion *::before, body.reduce-motion *::after { animation: none !important; transition: none !important; }
    .fullscreen-fallback .app { position: fixed; inset: 0; z-index: 999; overflow: auto; }

    @media (max-width: 1480px) {
      .metric-grid { grid-template-columns: repeat(4, minmax(150px, 1fr)); }
      .workspace { grid-template-columns: minmax(320px, .9fr) minmax(390px, 1.1fr); }
      .logs-panel { grid-column: 1 / -1; min-height: 520px; }
    }
    @media (max-width: 960px) {
      .topbar { align-items: flex-start; flex-direction: column; }
      .toolbar { margin-left: 0; justify-content: flex-start; width: 100%; }
      .metric-grid { grid-template-columns: repeat(2, minmax(150px, 1fr)); }
      .workspace { grid-template-columns: 1fr; }
      .panel { min-height: 500px; }
      .panel-header { align-items: flex-start; flex-direction: column; }
      .panel-actions { margin-left: 0; justify-content: flex-start; width: 100%; }
      .search { width: min(100%, 260px); }
      .footer .push { margin-left: 0; }
    }
    @media (max-width: 560px) {
      .content { padding: 10px 10px 0; }
      .metric-grid { grid-template-columns: 1fr; }
      .metric-card { grid-template-columns: 1fr auto; }
      .tool-button .label, .plain-button .label { display: none; }
      .tool-button, .plain-button { padding: 0 10px; }
      .segmented { width: 100%; }
      .segmented button { flex: 1; }
      .brand { flex-wrap: wrap; }
      .footer { gap: 12px; }
      .legend { gap: 12px; }
    }
  </style>
</head>
<body>
  <!-- APP SHELL: full-page responsive monitoring dashboard. -->
  <main class="app" id="app">
    <!-- TOP BAR: brand, preview persona switch, and global dashboard controls. -->
    <header class="topbar">
      <div class="brand">
        <div class="pulse-logo" aria-hidden="true">
          <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22h6l3-9 5 22 5-30 5 17h10"/></svg>
        </div>
        <h1>Process Monitor</h1>
        <span id="liveBadge" class="live-badge">LIVE</span>
      </div>

      <div class="segmented" aria-label="Preview mode">
        <button id="rootViewBtn" type="button" class="active">Root User</button>
        <button id="normalViewBtn" type="button">Normal User</button>
      </div>

      <nav class="toolbar" aria-label="Global actions">
        <button id="topPauseBtn" class="tool-button" type="button" aria-pressed="false" title="Pause or resume live updates">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8 5v14M16 5v14" stroke-linecap="round"/></svg><span class="label">Pause</span>
        </button>
        <button id="filterBtn" class="tool-button" type="button" title="Open filters">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 5h18l-7 8v5l-4 2v-7z" stroke-linejoin="round"/></svg><span class="label">Filter</span><span id="filterBadge" class="count-badge hidden">0</span>
        </button>
        <button id="columnsBtn" class="tool-button" type="button" title="Choose visible columns">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="5" width="5" height="14" rx="1"/><rect x="10" y="5" width="5" height="14" rx="1"/><rect x="16" y="5" width="5" height="14" rx="1"/></svg><span class="label">Columns</span>
        </button>
        <button id="alertsBtn" class="tool-button" type="button" title="Open active alerts">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Z"/><path d="M18 16v-5a6 6 0 0 0-12 0v5l-2 2h20z" stroke-linejoin="round"/></svg><span class="label">Alerts</span><span id="alertBadge" class="count-badge">3</span>
        </button>
        <button id="settingsBtn" class="tool-button" type="button" title="Open settings">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-.4-1.1 1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.2 9a1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6c.38-.15.73-.35 1-.6.28-.28.43-.67.4-1.1V3a2 2 0 1 1 4 0v.1c-.03.43.12.82.4 1.1.27.25.62.45 1 .6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.15.38.35.73.6 1 .28.28.67.43 1.1.4h.1a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.1.4c-.25.27-.45.62-.6 1Z" stroke-linejoin="round"/></svg><span class="label">Settings</span>
        </button>
        <button id="themeToggleBtn" class="tool-button" type="button" aria-pressed="false" title="Switch between light and dark mode">
          <svg id="themeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke-linecap="round"/><circle cx="12" cy="12" r="4"/></svg><span id="themeLabel" class="label">Light</span>
        </button>
        <button id="fullscreenBtn" class="tool-button" type="button" title="Toggle fullscreen">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M21 16v5h-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button id="timeRangeBtn" class="select-like" type="button" title="Choose time range"><span id="timeRangeLabel">Last 5 minutes</span><span aria-hidden="true">⌄</span></button>
      </nav>
    </header>

    <section class="content">
      <!-- SYSTEM METRICS: realtime KPI cards with compact sparklines. -->
      <section class="metric-grid" aria-label="System metrics">
        <article class="metric-card"><div><div class="metric-title">Total Processes</div><div class="metric-value"><span id="metricTotalProcesses">128</span></div></div><svg class="sparkline blue" viewBox="0 0 96 42" preserveAspectRatio="none"><path class="area" d="M0 36 L8 35 L16 28 L24 18 L32 20 L40 18 L48 20 L56 19 L64 24 L72 21 L80 23 L88 10 L96 8 L96 42 L0 42Z"/><path class="line" d="M0 36 L8 35 L16 28 L24 18 L32 20 L40 18 L48 20 L56 19 L64 24 L72 21 L80 23 L88 10 L96 8"/></svg></article>
        <article class="metric-card"><div><div class="metric-title">Total Users</div><div class="metric-value"><span id="metricTotalUsers">12</span></div></div><svg class="sparkline blue" viewBox="0 0 96 42" preserveAspectRatio="none"><path class="area" d="M0 35 L9 31 L18 34 L27 23 L36 33 L45 26 L54 30 L63 17 L72 28 L81 16 L90 24 L96 18 L96 42 L0 42Z"/><path class="line" d="M0 35 L9 31 L18 34 L27 23 L36 33 L45 26 L54 30 L63 17 L72 28 L81 16 L90 24 L96 18"/></svg></article>
        <article class="metric-card"><div><div class="metric-title">CPU Usage</div><div class="metric-value"><span id="metricCpu">23.7</span><small>%</small></div></div><svg class="sparkline green" viewBox="0 0 96 42" preserveAspectRatio="none"><path class="area" d="M0 35 L10 30 L20 22 L30 23 L40 31 L50 31 L60 27 L70 29 L80 18 L90 8 L96 10 L96 42 L0 42Z"/><path class="line" d="M0 35 L10 30 L20 22 L30 23 L40 31 L50 31 L60 27 L70 29 L80 18 L90 8 L96 10"/></svg></article>
        <article class="metric-card"><div><div class="metric-title">Memory Usage</div><div class="metric-value"><span id="metricMemory">4.2</span><small>GB / 15.6 GB</small></div></div><svg class="sparkline purple" viewBox="0 0 96 42" preserveAspectRatio="none"><path class="area" d="M0 35 L8 30 L16 28 L24 18 L32 23 L40 22 L48 28 L56 23 L64 30 L72 27 L80 29 L88 18 L96 20 L96 42 L0 42Z"/><path class="line" d="M0 35 L8 30 L16 28 L24 18 L32 23 L40 22 L48 28 L56 23 L64 30 L72 27 L80 29 L88 18 L96 20"/></svg></article>
        <article class="metric-card"><div><div class="metric-title">Selected User CPU</div><div class="metric-value"><span id="metricUserCpu">8.6%</span></div></div><svg class="sparkline green" viewBox="0 0 96 42" preserveAspectRatio="none"><path class="area" d="M0 36 L10 33 L20 31 L30 34 L40 30 L50 26 L60 24 L70 21 L80 25 L90 19 L96 16 L96 42 L0 42Z"/><path class="line" d="M0 36 L10 33 L20 31 L30 34 L40 30 L50 26 L60 24 L70 21 L80 25 L90 19 L96 16"/></svg></article>
        <article class="metric-card"><div><div class="metric-title">Network I/O</div><div class="metric-value"><span id="metricNetwork">1.3</span><small>Gb/s</small></div></div><svg class="sparkline cyan" viewBox="0 0 96 42" preserveAspectRatio="none"><path class="area" d="M0 36 L8 34 L16 28 L24 30 L32 22 L40 25 L48 19 L56 22 L64 16 L72 18 L80 14 L88 12 L96 5 L96 42 L0 42Z"/><path class="line" d="M0 36 L8 34 L16 28 L24 30 L32 22 L40 25 L48 19 L56 22 L64 16 L72 18 L80 14 L88 12 L96 5"/></svg></article>
        <article class="metric-card"><div><div class="metric-title">Active Alerts</div><div class="metric-value"><span id="metricAlerts">3</span></div></div><svg class="sparkline red" viewBox="0 0 96 42" preserveAspectRatio="none"><path class="area" d="M0 34 L8 32 L16 31 L24 33 L32 35 L40 34 L48 34 L56 33 L64 32 L72 34 L80 20 L88 17 L96 12 L96 42 L0 42Z"/><path class="line" d="M0 34 L8 32 L16 31 L24 33 L32 35 L40 34 L48 34 L56 33 L64 32 L72 34 L80 20 L88 17 L96 12"/></svg></article>
        <article class="metric-card"><div><div class="metric-title">System Uptime</div><div class="metric-value"><span>5d</span><small>14h 22m</small></div></div></article>
      </section>

      <!-- WORKSPACE: three main panels arranged responsively. -->
      <section class="workspace" aria-label="Monitoring workspace">
        <!-- USER TREE PANEL: users only; no process children are rendered here. -->
        <section class="panel user-panel" aria-label="User tree">
          <div class="panel-header">
            <div class="panel-title-wrap">
              <div class="panel-title">User Tree</div>
              <div class="panel-subtitle">Summary-only users. Click a user to load processes.</div>
            </div>
            <div class="panel-actions">
              <label class="search" aria-label="Search users"><input id="userSearch" type="search" placeholder="Search users..." autocomplete="off" /><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4.2-4.2" stroke-linecap="round"/></svg></label>
              <button id="userExpandBtn" class="icon-button" type="button" title="Expand or collapse user tree"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
              <button id="userTreeBtn" class="icon-button active" type="button" title="User tree view"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4v6M12 10H7v5M12 10h5v5"/><circle cx="12" cy="4" r="2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg></button>
              <button id="userListBtn" class="icon-button" type="button" title="User list view"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01" stroke-linecap="round"/></svg></button>
            </div>
          </div>
          <div class="table-inner user-inner"><div id="userHead" class="column-head"></div></div>
          <div class="table-scroll" id="userScroll"><div class="table-inner user-inner" id="usersTable"></div><aside class="side-note" aria-label="Interaction hint"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01" stroke-linecap="round"/></svg><div><strong>Users stay summary-only</strong><span>The User Tree does not show child processes. Select a user to refresh the Process Tree and live logs.</span></div></aside></div>
          <div class="legend"><span class="legend-item"><i class="legend-dot"></i>Active</span><span class="legend-item"><i class="legend-dot idle"></i>Idle</span><span class="legend-item"><i class="legend-dot restricted"></i>Restricted</span><span class="legend-item"><i class="legend-dot system"></i>System</span></div>
        </section>

        <!-- PROCESS TREE PANEL: populated when a user row is selected. -->
        <section class="panel process-panel" aria-label="Process tree">
          <div class="panel-header">
            <div class="panel-title-wrap"><div class="panel-title">Process Tree</div><div class="panel-subtitle" id="processSubtitle">root selected · privileged process scope</div></div>
            <div class="panel-actions">
              <label class="search" aria-label="Search processes"><input id="processSearch" type="search" placeholder="Search processes..." autocomplete="off" /><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4.2-4.2" stroke-linecap="round"/></svg></label>
              <button id="processExpandBtn" class="icon-button" type="button" title="Expand or collapse process tree"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
              <button id="processTreeBtn" class="icon-button active" type="button" title="Process tree view"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4v6M12 10H7v5M12 10h5v5"/><circle cx="12" cy="4" r="2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg></button>
              <button id="processListBtn" class="icon-button" type="button" title="Process list view"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01" stroke-linecap="round"/></svg></button>
            </div>
          </div>
          <div class="table-inner process-inner"><div id="processHead" class="column-head"></div></div>
          <div class="table-scroll" id="processScroll"><div class="table-inner process-inner" id="processTable"></div></div>
          <div class="legend"><span class="legend-item"><i class="legend-dot"></i>Running</span><span class="legend-item"><i class="legend-dot idle"></i>Sleeping</span><span class="legend-item"><i class="legend-dot high"></i>High CPU</span><span class="legend-item"><i class="legend-dot stop"></i>Stopped</span><span class="legend-item"><i class="legend-dot restricted"></i>Zombie</span></div>
        </section>

        <!-- REAL-TIME LOGS PANEL: rows are filtered by the selected user/process scope. -->
        <section class="panel logs-panel" aria-label="Real-time logs">
          <div class="panel-header">
            <div class="panel-title-wrap"><div class="panel-title">Real-time Logs <span id="streamingLabel" class="streaming">Streaming</span></div><div class="panel-subtitle" id="logsSubtitle">Filtered by root process scope</div></div>
            <div class="panel-actions">
              <button id="logScopeBtn" class="select-like" type="button" aria-label="Log process filter"><span id="logFilterLabel">root scope</span><span aria-hidden="true">⌄</span></button>
              <label class="search" aria-label="Search logs"><input id="logSearch" type="search" placeholder="Search logs..." autocomplete="off" /><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4.2-4.2" stroke-linecap="round"/></svg></label>
              <button id="logPauseBtn" class="icon-button" type="button" title="Pause logs" aria-label="Pause logs"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M8 5v14M16 5v14" stroke-linecap="round"/></svg></button>
              <button id="clearLogsBtn" class="icon-button danger" type="button" title="Clear current logs" aria-label="Clear logs"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M6 6l1 16h10l1-16" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            </div>
          </div>
          <div class="table-inner logs-inner"><div id="logsHead" class="column-head"></div></div>
          <div class="table-scroll" id="logsScroll"><div class="table-inner logs-inner" id="logsTable"></div></div>
        </section>
      </section>
    </section>

    <!-- FOOTER STATUS BAR: global status, autoscroll, and log line limit. -->
    <footer class="footer" aria-label="Status bar">
      <span class="footer-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" stroke-linecap="round"/></svg> System Uptime: <strong>5d 14h 22m</strong></span>
      <span class="footer-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" stroke-linecap="round"/></svg> Load Average: <strong>0.42&nbsp; 0.38&nbsp; 0.35</strong></span>
      <span class="footer-item"><span class="status-dot-label"><span class="dot" aria-hidden="true"></span> Last Updated:</span> <strong id="lastUpdated">10:24:33</strong></span>
      <span class="footer-item push">CPU: <strong id="footerCpu">23.7%</strong><svg class="sparkline green mini-spark" viewBox="0 0 96 24" preserveAspectRatio="none"><path class="line" d="M0 19 L8 17 L16 20 L24 11 L32 16 L40 13 L48 18 L56 10 L64 12 L72 5 L80 16 L88 8 L96 11"/></svg></span>
      <span class="footer-item">Auto-scroll <span id="footerAutoScroll" class="switch" role="switch" aria-checked="true" tabindex="0"><span></span></span></span>
      <span class="footer-item">Log Lines: <button id="logLinesBtn" class="select-like" type="button"><strong id="logLineCount">5000</strong>⌄</button></span>
    </footer>
  </main>

  <!-- FLOATING POPOVERS: rendered outside the app shell so they can layer above every panel. -->
  <!-- Filters popover: log-level, process-status, and CPU-threshold controls. -->
  <div id="filterPopover" class="popover" role="dialog" aria-label="Filters">
    <h3>Filters</h3>
    <p>Filters apply immediately to the Process Tree and Real-time Logs.</p>
    <div class="popover-section"><div class="popover-title">Log levels</div><label class="check-row"><input type="checkbox" data-filter-level="INFO" checked> INFO</label><label class="check-row"><input type="checkbox" data-filter-level="DEBUG" checked> DEBUG</label><label class="check-row"><input type="checkbox" data-filter-level="WARN" checked> WARN</label><label class="check-row"><input type="checkbox" data-filter-level="ERROR" checked> ERROR</label></div>
    <div class="popover-section"><div class="popover-title">Process status</div><label class="check-row"><input type="checkbox" data-filter-status="Running" checked> Running</label><label class="check-row"><input type="checkbox" data-filter-status="Sleeping" checked> Sleeping</label><label class="check-row"><input type="checkbox" data-filter-status="Stopped" checked> Stopped</label><label class="check-row"><input type="checkbox" data-filter-status="Zombie" checked> Zombie</label></div>
    <div class="popover-section"><div class="popover-title">CPU threshold</div><div class="setting-row"><span>Minimum CPU %</span><input id="minCpuInput" class="mini-input" type="number" min="0" max="100" step="0.1" value="0"></div></div>
    <div class="popover-actions"><button id="resetFiltersBtn" class="plain-button" type="button">Reset</button><button class="plain-button primary" type="button" data-close-popover>Done</button></div>
  </div>

  <!-- Columns popover: live column visibility chooser for each table. -->
  <div id="columnsPopover" class="popover" role="dialog" aria-label="Column chooser">
    <h3>Columns</h3>
    <p>Show or hide columns in each panel. Name and Message columns stay enabled for readability.</p>
    <div class="popover-section"><div class="popover-title">User Tree</div><div id="userColumnChecks"></div></div>
    <div class="popover-section"><div class="popover-title">Process Tree</div><div id="processColumnChecks"></div></div>
    <div class="popover-section"><div class="popover-title">Real-time Logs</div><div id="logColumnChecks"></div></div>
    <div class="popover-actions"><button id="resetColumnsBtn" class="plain-button" type="button">Reset columns</button><button class="plain-button primary" type="button" data-close-popover>Done</button></div>
  </div>

  <!-- Settings popover: visual density, theme, refresh, and layout controls. -->
  <div id="settingsPopover" class="popover" role="dialog" aria-label="Settings">
    <h3>Settings</h3>
    <p>These switches update the mock UI immediately.</p>
    <div class="popover-section"><div class="setting-row"><span>Theme</span><select id="themeModeSelect" class="settings-select"><option value="dark" selected>Dark</option><option value="light">Light</option><option value="system">System</option></select></div><div class="setting-row"><span>Compact rows</span><span id="compactSwitch" class="switch off" role="switch" tabindex="0" aria-checked="false"><span></span></span></div><div class="setting-row"><span>Show metric sparklines</span><span id="sparksSwitch" class="switch" role="switch" tabindex="0" aria-checked="true"><span></span></span></div><div class="setting-row"><span>High contrast</span><span id="contrastSwitch" class="switch off" role="switch" tabindex="0" aria-checked="false"><span></span></span></div><div class="setting-row"><span>Reduce motion</span><span id="motionSwitch" class="switch off" role="switch" tabindex="0" aria-checked="false"><span></span></span></div></div>
    <div class="popover-section"><div class="setting-row"><span>Refresh interval</span><select id="refreshSelect" class="settings-select"><option value="800">0.8 sec</option><option value="1400" selected>1.4 sec</option><option value="3000">3 sec</option></select></div><div class="setting-row"><span>Log line cap</span><select id="settingsLogLines" class="settings-select"><option>1000</option><option selected>5000</option><option>10000</option></select></div></div>
    <div class="popover-actions"><button id="resetLayoutBtn" class="plain-button danger" type="button">Reset layout</button><button class="plain-button primary" type="button" data-close-popover>Done</button></div>
  </div>

  <!-- Alerts popover: alert inbox for the current mock session. -->
  <div id="alertsPopover" class="popover" role="dialog" aria-label="Alerts">
    <h3>Active Alerts</h3>
    <p>Current alerts for the selected process scope.</p>
    <div id="alertsList"></div>
    <div class="popover-actions"><button id="markAlertsReadBtn" class="plain-button" type="button">Mark all read</button><button class="plain-button primary" type="button" data-close-popover>Done</button></div>
  </div>

  <!-- Time range popover: controls the displayed monitoring window label. -->
  <div id="timePopover" class="popover" role="dialog" aria-label="Time range">
    <h3>Time Range</h3>
    <div class="popover-section" id="timeRangeChoices"><label class="radio-row"><input type="radio" name="timeRange" value="Last 1 minute"> Last 1 minute</label><label class="radio-row"><input type="radio" name="timeRange" value="Last 5 minutes" checked> Last 5 minutes</label><label class="radio-row"><input type="radio" name="timeRange" value="Last 15 minutes"> Last 15 minutes</label><label class="radio-row"><input type="radio" name="timeRange" value="Last 1 hour"> Last 1 hour</label></div>
  </div>

  <!-- Log scope popover: chooses selected/all/error-only log views. -->
  <div id="logScopePopover" class="popover" role="dialog" aria-label="Log scope">
    <h3>Log Scope</h3>
    <div class="popover-section" id="logScopeChoices"><label class="radio-row"><input type="radio" name="logScope" value="selected" checked> Selected user/process scope</label><label class="radio-row"><input type="radio" name="logScope" value="all"> All processes</label><label class="radio-row"><input type="radio" name="logScope" value="errors"> Errors only</label><label class="radio-row"><input type="radio" name="logScope" value="warnerror"> Warnings + errors</label></div>
  </div>

  <!-- Log lines popover: quick cap selector for log rows. -->
  <div id="logLinesPopover" class="popover" role="dialog" aria-label="Log lines">
    <h3>Log Lines</h3>
    <div class="popover-section"><label class="radio-row"><input type="radio" name="logLines" value="1000"> 1000</label><label class="radio-row"><input type="radio" name="logLines" value="5000" checked> 5000</label><label class="radio-row"><input type="radio" name="logLines" value="10000"> 10000</label></div>
  </div>

  <!-- TOAST STACK: non-blocking feedback for each interaction. -->
  <div id="toastStack" class="toast-stack" aria-live="polite"></div>

  <!-- SCRIPT: DATA MODEL: sample users, processes, logs, columns, state, and DOM references. -->
  <script>
    const svgEmpty = '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M9 18h6M10 22h4M12 2v3M5 8l2 2M19 8l-2 2M8 14a4 4 0 1 1 8 0c0 1.5-.7 2.5-1.6 3.3-.7.6-1.1 1.1-1.1 1.7H10.7c0-.6-.4-1.1-1.1-1.7C8.7 16.5 8 15.5 8 14z" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    const users = [
      { key: 'all', label: 'All Users', role: 'aggregate', avatar: 'A', avatarClass: 'service', cpu: 23.7, memory: '4.2 GB', processes: 128, status: 'Active', statusClass: 'active', depth: 0, hasChildren: true },
      { key: 'root', label: 'root', role: 'superuser', avatar: '#', avatarClass: 'root', cpu: 8.6, memory: '1.2 GB', processes: 32, status: 'Active', statusClass: 'active', tag: 'ROOT', depth: 1 },
      { key: 'john', label: 'john', role: 'normal', avatar: 'J', avatarClass: 'john', cpu: 5.7, memory: '864.2 MB', processes: 18, status: 'Active', statusClass: 'active', tag: 'YOU', depth: 1 },
      { key: 'jane', label: 'jane', role: 'normal', avatar: 'J', avatarClass: 'jane', cpu: 3.2, memory: '512.8 MB', processes: 12, status: 'Active', statusClass: 'active', depth: 1 },
      { key: 'mike', label: 'mike', role: 'normal', avatar: 'M', avatarClass: 'mike', cpu: 2.1, memory: '310.7 MB', processes: 9, status: 'Active', statusClass: 'active', depth: 1 },
      { key: 'alex', label: 'alex', role: 'normal', avatar: 'A', avatarClass: 'alex', cpu: 1.6, memory: '198.6 MB', processes: 6, status: 'Active', statusClass: 'active', depth: 1 },
      { key: 'docker', label: 'docker', role: 'service', avatar: 'D', avatarClass: 'docker', cpu: 2.1, memory: '345.6 MB', processes: 6, status: 'Active', statusClass: 'active', tag: 'SERVICE', depth: 1 },
      { key: 'nginx', label: 'nginx', role: 'service', avatar: 'N', avatarClass: 'nginx', cpu: 4.1, memory: '512.3 MB', processes: 6, status: 'Active', statusClass: 'active', tag: 'SERVICE', depth: 1 },
      { key: 'postgres', label: 'postgres', role: 'service', avatar: 'P', avatarClass: 'postgres', cpu: 3.0, memory: '482.1 MB', processes: 15, status: 'Active', statusClass: 'active', tag: 'SERVICE', depth: 1 },
      { key: 'other', label: 'Other Users (7)', role: 'aggregate', avatar: '×', avatarClass: 'service', cpu: 2.5, memory: '1.1 GB', processes: 51, status: 'Active', statusClass: 'active', depth: 1 }
    ];

    const processData = {
      root: [
        { id: 'root-systemd', name: 'systemd (init)', pid: 1, cpu: .3, mem: '55.2 MB', status: 'Running', icon: '⚙', iconClass: '', children: [
          { id: 'root-sshd', name: 'sshd', pid: 742, cpu: .1, mem: '12.4 MB', status: 'Running', icon: '▣', iconClass: '', children: [
            { id: 'root-bash', name: 'bash', pid: 1123, cpu: .2, mem: '8.1 MB', status: 'Running', icon: '>', iconClass: 'shell', children: [
              { id: 'root-node', name: 'node server.js', pid: 1156, cpu: 5.6, mem: '128.7 MB', status: 'Running', icon: '⬢', iconClass: 'node', children: [
                { id: 'root-w1', name: 'worker.js', pid: 1161, cpu: 2.1, mem: '45.3 MB', status: 'Running', icon: 'JS', iconClass: 'js' },
                { id: 'root-w2', name: 'worker.js', pid: 1162, cpu: 1.8, mem: '44.8 MB', status: 'Running', icon: 'JS', iconClass: 'js' },
                { id: 'root-dbjs', name: 'database.js', pid: 1163, cpu: 1.2, mem: '38.9 MB', status: 'Running', icon: 'JS', iconClass: 'js' },
                { id: 'root-cache', name: 'cache.js', pid: 1164, cpu: .8, mem: '24.6 MB', status: 'Running', icon: 'JS', iconClass: 'js' }
              ]}
            ]}
          ]}
        ]},
        { id: 'root-nginx', name: 'nginx', pid: 888, cpu: 1.3, mem: '33.6 MB', status: 'Running', icon: 'N', iconClass: 'nginx', children: [
          { id: 'root-nginx-889', name: 'nginx: worker process', pid: 889, cpu: .6, mem: '15.8 MB', status: 'Running', icon: '>', iconClass: 'shell' },
          { id: 'root-nginx-890', name: 'nginx: worker process', pid: 890, cpu: .7, mem: '16.1 MB', status: 'Running', icon: '>', iconClass: 'shell' }
        ]},
        { id: 'root-postgres', name: 'postgres', pid: 994, cpu: 2.4, mem: '98.7 MB', status: 'Running', icon: 'P', iconClass: 'pg', children: [
          { id: 'root-pg-writer', name: 'postgres: writer', pid: 995, cpu: 1.1, mem: '32.2 MB', status: 'Running', icon: 'P', iconClass: 'pg' },
          { id: 'root-pg-wal', name: 'postgres: wal writer', pid: 996, cpu: .4, mem: '12.1 MB', status: 'Sleeping', icon: 'P', iconClass: 'pg' },
          { id: 'root-pg-bg', name: 'postgres: bgworker', pid: 997, cpu: .3, mem: '11.8 MB', status: 'Running', icon: 'P', iconClass: 'pg' }
        ]},
        { id: 'root-docker', name: 'docker', pid: 1021, cpu: 1.6, mem: '75.4 MB', status: 'Running', icon: 'D', iconClass: 'docker', children: [
          { id: 'root-containerd', name: 'containerd', pid: 1022, cpu: .6, mem: '22.8 MB', status: 'Running', icon: '>', iconClass: 'shell' },
          { id: 'root-dproxy', name: 'docker-proxy', pid: 1023, cpu: 1.0, mem: '18.2 MB', status: 'Running', icon: '>', iconClass: 'shell' }
        ]},
        { id: 'root-redis', name: 'redis-server', pid: 1033, cpu: .5, mem: '19.1 MB', status: 'Running', icon: 'R', iconClass: 'redis' },
        { id: 'root-cron', name: 'cron', pid: 1044, cpu: .1, mem: '2.1 MB', status: 'Sleeping', icon: '◷', iconClass: '' }
      ],
      john: [
        { id: 'john-shell', name: 'bash', pid: 2310, cpu: .6, mem: '78.2 MB', status: 'Running', icon: '>', iconClass: 'shell', children: [
          { id: 'john-devserver', name: 'node dev-server.js', pid: 2366, cpu: 2.6, mem: '118.4 MB', status: 'Running', icon: '⬢', iconClass: 'node', children: [
            { id: 'john-vite', name: 'vite --host 0.0.0.0', pid: 2369, cpu: 1.4, mem: '92.7 MB', status: 'Running', icon: 'JS', iconClass: 'js' },
            { id: 'john-tsserver', name: 'tsserver', pid: 2370, cpu: 1.1, mem: '96.3 MB', status: 'Running', icon: 'TS', iconClass: 'js' }
          ]},
          { id: 'john-tmux', name: 'tmux: server', pid: 2402, cpu: .4, mem: '24.2 MB', status: 'Running', icon: 'T', iconClass: 'shell' }
        ]},
        { id: 'john-code', name: 'code', pid: 2411, cpu: 2.3, mem: '256.4 MB', status: 'Running', icon: 'C', iconClass: 'code', children: [
          { id: 'john-extension', name: 'extensionHost', pid: 2420, cpu: .5, mem: '88.0 MB', status: 'Running', icon: 'C', iconClass: 'code' },
          { id: 'john-pty', name: 'ptyHost', pid: 2428, cpu: .2, mem: '22.5 MB', status: 'Sleeping', icon: '>', iconClass: 'shell' }
        ]},
        { id: 'john-chrome', name: 'chrome', pid: 2501, cpu: 2.1, mem: '345.6 MB', status: 'Running', icon: 'G', iconClass: 'chrome', children: [
          { id: 'john-chrome-render', name: 'chrome --renderer', pid: 2504, cpu: .8, mem: '102.1 MB', status: 'Running', icon: 'G', iconClass: 'chrome' },
          { id: 'john-chrome-gpu', name: 'chrome --gpu-process', pid: 2506, cpu: .3, mem: '40.7 MB', status: 'Sleeping', icon: 'G', iconClass: 'chrome' }
        ]},
        { id: 'john-slack', name: 'slack', pid: 2602, cpu: .9, mem: '256.0 MB', status: 'Running', icon: 'S', iconClass: '' }
      ],
      jane: [
        { id: 'jane-chrome', name: 'chrome', pid: 3130, cpu: 2.4, mem: '324.5 MB', status: 'Running', icon: 'G', iconClass: 'chrome', children: [
          { id: 'jane-tab', name: 'chrome --tab docs', pid: 3134, cpu: .7, mem: '88.3 MB', status: 'Running', icon: 'G', iconClass: 'chrome' }
        ]},
        { id: 'jane-slack', name: 'slack', pid: 3178, cpu: .4, mem: '89.1 MB', status: 'Running', icon: 'S', iconClass: '' },
        { id: 'jane-code', name: 'code', pid: 3200, cpu: .4, mem: '99.2 MB', status: 'Sleeping', icon: 'C', iconClass: 'code' }
      ],
      mike: [
        { id: 'mike-terminal', name: 'terminal', pid: 4114, cpu: .7, mem: '110.2 MB', status: 'Running', icon: '>', iconClass: 'shell', children: [
          { id: 'mike-python', name: 'python train.py', pid: 4120, cpu: 1.1, mem: '200.3 MB', status: 'Running', icon: 'PY', iconClass: 'python', children: [
            { id: 'mike-worker-a', name: 'dataloader worker 0', pid: 4121, cpu: .3, mem: '40.1 MB', status: 'Sleeping', icon: 'PY', iconClass: 'python' },
            { id: 'mike-worker-b', name: 'dataloader worker 1', pid: 4122, cpu: .3, mem: '38.6 MB', status: 'Sleeping', icon: 'PY', iconClass: 'python' }
          ]}
        ]},
        { id: 'mike-vim', name: 'vim', pid: 4198, cpu: .3, mem: '45.2 MB', status: 'Running', icon: 'V', iconClass: '' }
      ],
      alex: [
        { id: 'alex-git', name: 'git status --watch', pid: 5121, cpu: .6, mem: '78.6 MB', status: 'Running', icon: 'G', iconClass: '' },
        { id: 'alex-node', name: 'node cli.js', pid: 5125, cpu: 1.0, mem: '120.0 MB', status: 'Running', icon: '⬢', iconClass: 'node', children: [
          { id: 'alex-bash', name: 'bash', pid: 5126, cpu: 0.0, mem: '0.0 MB', status: 'Sleeping', icon: '>', iconClass: 'shell' }
        ]}
      ],
      docker: [
        { id: 'docker-daemon', name: 'dockerd', pid: 1021, cpu: 1.2, mem: '256.0 MB', status: 'Running', icon: 'D', iconClass: 'docker', children: [
          { id: 'docker-containerd', name: 'containerd', pid: 1022, cpu: .6, mem: '22.8 MB', status: 'Running', icon: 'D', iconClass: 'docker' },
          { id: 'docker-worker', name: 'container: app-worker', pid: 1452, cpu: .8, mem: '66.0 MB', status: 'Running', icon: 'D', iconClass: 'docker' }
        ]}
      ],
      nginx: [
        { id: 'nginx-master', name: 'nginx: master process', pid: 888, cpu: 1.3, mem: '33.6 MB', status: 'Running', icon: 'N', iconClass: 'nginx', children: [
          { id: 'nginx-worker-889', name: 'nginx: worker process', pid: 889, cpu: .6, mem: '15.8 MB', status: 'Running', icon: 'N', iconClass: 'nginx' },
          { id: 'nginx-worker-890', name: 'nginx: worker process', pid: 890, cpu: .7, mem: '16.1 MB', status: 'Running', icon: 'N', iconClass: 'nginx' }
        ]}
      ],
      postgres: [
        { id: 'postgres-main', name: 'postgres', pid: 994, cpu: 2.4, mem: '98.7 MB', status: 'Running', icon: 'P', iconClass: 'pg', children: [
          { id: 'postgres-writer', name: 'postgres: writer', pid: 995, cpu: 1.1, mem: '32.2 MB', status: 'Running', icon: 'P', iconClass: 'pg' },
          { id: 'postgres-wal', name: 'postgres: wal writer', pid: 996, cpu: .4, mem: '12.1 MB', status: 'Sleeping', icon: 'P', iconClass: 'pg' },
          { id: 'postgres-bg', name: 'postgres: bgworker', pid: 997, cpu: .3, mem: '11.8 MB', status: 'Running', icon: 'P', iconClass: 'pg' }
        ]}
      ],
      other: []
    };

    const logData = {
      root: [
        ['10:24:31.123', 'node server.js', 1156, 'INFO', 'Server started on port 3000'],
        ['10:24:31.125', 'worker.js', 1161, 'INFO', 'Worker started with id 1'],
        ['10:24:31.126', 'database.js', 1163, 'INFO', 'Connected to database'],
        ['10:24:31.200', 'nginx: worker process', 889, 'INFO', 'Accepted connection from 192.168.1.10'],
        ['10:24:31.245', 'node server.js', 1156, 'INFO', 'GET /api/users 200 15ms'],
        ['10:24:31.310', 'worker.js', 1162, 'DEBUG', 'Processing job 42'],
        ['10:24:31.410', 'database.js', 1163, 'INFO', 'Query executed in 12ms'],
        ['10:24:31.512', 'worker.js', 1161, 'WARN', 'Job queue size high (85)'],
        ['10:24:31.678', 'nginx: worker process', 890, 'INFO', 'Accepted connection from 192.168.1.11'],
        ['10:24:31.789', 'node server.js', 1156, 'ERROR', 'Unhandled exception: User not found'],
        ['10:24:31.790', 'worker.js', 1162, 'ERROR', 'Job 42 failed: Timeout exceeded'],
        ['10:24:31.900', 'postgres: writer', 995, 'INFO', 'WAL segment written'],
        ['10:24:32.001', 'postgres: bgworker', 997, 'DEBUG', 'Background worker heartbeat'],
        ['10:24:32.215', 'nginx: worker process', 889, 'INFO', 'GET /favicon.ico 404 2ms'],
        ['10:24:32.410', 'cache.js', 1164, 'INFO', 'Cache hit for key: user:123'],
        ['10:24:32.612', 'worker.js', 1161, 'INFO', 'Job 43 completed in 120ms'],
        ['10:24:32.890', 'database.js', 1163, 'ERROR', 'Connection pool exhausted'],
        ['10:24:33.001', 'node server.js', 1156, 'WARN', 'High response time detected: 502ms'],
        ['10:24:33.123', 'redis-server', 1033, 'INFO', 'Client connected: 127.0.0.1:54321'],
        ['10:24:33.456', 'docker', 1021, 'INFO', 'Container nginx started'],
        ['10:24:33.789', 'cron', 1044, 'INFO', 'Scheduled job completed']
      ],
      john: [
        ['10:24:31.102', 'node dev-server.js', 2366, 'INFO', 'Development server listening on :5173'],
        ['10:24:31.268', 'tsserver', 2370, 'DEBUG', 'Project graph refreshed in 44ms'],
        ['10:24:31.344', 'code', 2411, 'INFO', 'Workspace opened: process-monitor'],
        ['10:24:31.480', 'chrome --renderer', 2504, 'INFO', 'Loaded /dashboard preview'],
        ['10:24:31.592', 'node dev-server.js', 2366, 'WARN', 'API proxy fallback used for /logs'],
        ['10:24:31.774', 'extensionHost', 2420, 'DEBUG', 'Language server ready'],
        ['10:24:31.910', 'node dev-server.js', 2366, 'INFO', 'GET /api/processes?user=john 200 18ms'],
        ['10:24:32.104', 'ptyHost', 2428, 'INFO', 'Terminal spawned: bash'],
        ['10:24:32.290', 'chrome --gpu-process', 2506, 'DEBUG', 'Frame rendered in 12ms'],
        ['10:24:32.430', 'node dev-server.js', 2366, 'ERROR', 'Websocket reconnect attempt failed'],
        ['10:24:32.612', 'vite --host', 2369, 'INFO', 'Client reconnected'],
        ['10:24:32.880', 'tsserver', 2370, 'WARN', 'High memory watermark: 96.3 MB'],
        ['10:24:33.001', 'slack', 2602, 'INFO', 'Notification received']
      ],
      jane: [
        ['10:24:31.101', 'chrome', 3130, 'INFO', 'Tab active: docs'],
        ['10:24:31.230', 'slack', 3178, 'INFO', 'Workspace sync complete'],
        ['10:24:31.600', 'code', 3200, 'DEBUG', 'Extension host idle']
      ],
      mike: [
        ['10:24:31.150', 'python train.py', 4120, 'INFO', 'Epoch 12 started'],
        ['10:24:31.620', 'terminal', 4114, 'DEBUG', 'Shell prompt rendered'],
        ['10:24:32.900', 'python train.py', 4120, 'WARN', 'GPU utilization below expected threshold']
      ],
      alex: [
        ['10:24:31.310', 'git status --watch', 5121, 'INFO', 'Working tree clean'],
        ['10:24:32.002', 'node cli.js', 5125, 'INFO', 'CLI heartbeat']
      ],
      docker: [
        ['10:24:31.220', 'dockerd', 1021, 'INFO', 'Container api-nginx started'],
        ['10:24:31.650', 'containerd', 1022, 'DEBUG', 'Snapshot prepared'],
        ['10:24:32.410', 'container: app-worker', 1452, 'WARN', 'Restart policy triggered']
      ],
      nginx: [
        ['10:24:31.200', 'nginx worker', 889, 'INFO', 'Accepted connection from 192.168.1.10'],
        ['10:24:32.215', 'nginx worker', 889, 'INFO', 'GET /favicon.ico 404 2ms'],
        ['10:24:33.789', 'nginx worker', 890, 'INFO', 'GET /api/health 200 3ms']
      ],
      postgres: [
        ['10:24:31.900', 'postgres: writer', 995, 'INFO', 'WAL segment written'],
        ['10:24:32.001', 'postgres: bgworker', 997, 'DEBUG', 'Background worker heartbeat'],
        ['10:24:32.890', 'postgres', 994, 'ERROR', 'Connection pool exhausted']
      ],
      all: [],
      other: []
    };

    const alertsSeed = [
      { level: 'ERROR', title: 'Connection pool exhausted', text: 'database.js reported no available connections in root scope.' },
      { level: 'WARN', title: 'High response time detected', text: 'node server.js exceeded 500ms on the last collection window.' },
      { level: 'ERROR', title: 'Websocket reconnect failed', text: 'john / node dev-server.js failed a reconnect attempt.' }
    ];

    const columnDefs = {
      user: [
        { key: 'name', label: 'User', width: 'minmax(168px, 1fr)', required: true },
        { key: 'cpu', label: 'CPU %', width: '64px' },
        { key: 'memory', label: 'Memory', width: '86px' },
        { key: 'processes', label: 'Processes', width: '70px' },
        { key: 'status', label: 'Status', width: '82px' }
      ],
      process: [
        { key: 'name', label: 'Process Name', width: 'minmax(230px, 1fr)', required: true },
        { key: 'pid', label: 'PID', width: '70px' },
        { key: 'cpu', label: 'CPU %', width: '76px' },
        { key: 'memory', label: 'Memory', width: '92px' },
        { key: 'status', label: 'Status', width: '92px' }
      ],
      log: [
        { key: 'time', label: 'Time', width: '106px' },
        { key: 'process', label: 'Process', width: 'minmax(132px, 1fr)' },
        { key: 'pid', label: 'PID', width: '70px' },
        { key: 'level', label: 'Level', width: '82px' },
        { key: 'message', label: 'Message', width: 'minmax(230px, 1.7fr)', required: true }
      ]
    };

    const state = {
      mode: 'root',
      selectedUser: 'root',
      paused: false,
      userTreeExpanded: true,
      userView: 'tree',
      processView: 'tree',
      processExpanded: new Set(),
      allProcessesExpanded: true,
      search: { user: '', process: '', log: '' },
      filters: {
        levels: { INFO: true, DEBUG: true, WARN: true, ERROR: true },
        statuses: { Running: true, Sleeping: true, Stopped: true, Zombie: true },
        minCpu: 0
      },
      columns: {
        user: { name: true, cpu: true, memory: true, processes: true, status: true },
        process: { name: true, pid: true, cpu: true, memory: true, status: true },
        log: { time: true, process: true, pid: true, level: true, message: true }
      },
      logScope: 'selected',
      timeRange: 'Last 5 minutes',
      autoScroll: true,
      compact: false,
      showSparks: true,
      highContrast: false,
      reduceMotion: false,
      refreshMs: 1400,
      logLineCap: 5000,
      theme: 'dark',
      resolvedTheme: 'dark',
      alerts: alertsSeed.slice(),
      intervalId: null
    };

    const els = {
      userHead: document.getElementById('userHead'),
      processHead: document.getElementById('processHead'),
      logsHead: document.getElementById('logsHead'),
      usersTable: document.getElementById('usersTable'),
      processTable: document.getElementById('processTable'),
      logsTable: document.getElementById('logsTable'),
      userSearch: document.getElementById('userSearch'),
      processSearch: document.getElementById('processSearch'),
      logSearch: document.getElementById('logSearch'),
      processSubtitle: document.getElementById('processSubtitle'),
      logsSubtitle: document.getElementById('logsSubtitle'),
      liveBadge: document.getElementById('liveBadge'),
      streamingLabel: document.getElementById('streamingLabel'),
      alertBadge: document.getElementById('alertBadge'),
      filterBadge: document.getElementById('filterBadge'),
      themeToggleBtn: document.getElementById('themeToggleBtn'),
      themeLabel: document.getElementById('themeLabel'),
      themeIcon: document.getElementById('themeIcon'),
      toastStack: document.getElementById('toastStack')
    };
  </script>

  <!-- SCRIPT: UTILITIES: formatting helpers, tree traversal, visibility rules, and data selectors. -->
  <script>
    function esc(value) {
      return String(value ?? '').replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
    }
    function fmtCpu(value) { return typeof value === 'number' ? `${value.toFixed(1)}%` : value; }
    function cpuClass(cpu) { if (Number(cpu) >= 9) return 'number-red'; if (Number(cpu) >= 5) return 'number-yellow'; return 'number-green'; }
    function severityClass(level) { return String(level).toLowerCase(); }
    function processStatusClass(status) { return status === 'Sleeping' ? 'idle' : status === 'Stopped' ? 'stopped' : status === 'Zombie' ? 'restricted' : ''; }
    function hasChildren(node) { return Array.isArray(node.children) && node.children.length > 0; }
    function activeColumns(table) { return columnDefs[table].filter(col => state.columns[table][col.key]); }
    function gridTemplate(table) { return activeColumns(table).map(c => c.width).join(' '); }
    function setGrid(el, table) { el.style.gridTemplateColumns = gridTemplate(table); }
    function renderHeader(el, table) {
      setGrid(el, table);
      el.innerHTML = activeColumns(table).map(c => `<span>${esc(c.label)}</span>`).join('');
    }

    function flatten(nodes, depth = 0, acc = []) {
      for (const node of nodes || []) {
        acc.push({ ...node, depth });
        if (hasChildren(node)) flatten(node.children, depth + 1, acc);
      }
      return acc;
    }
    function collectIds(nodes, ids = []) {
      for (const node of nodes || []) {
        if (hasChildren(node)) ids.push(node.id);
        if (hasChildren(node)) collectIds(node.children, ids);
      }
      return ids;
    }
    function userRecord(key = state.selectedUser) {
      const raw = users.find(u => u.key === key) || users[1];
      return userVisibleForMode(raw);
    }
    function cleanLabel(label) { return String(label).replace(/ \(.+\)/, ''); }
    function userVisibleForMode(user) {
      if (state.mode === 'root') return { ...user };
      if (user.key === 'root') return { ...user, status: 'Restricted', statusClass: 'restricted', cpu: 0, memory: 'Hidden', processes: '—', tag: 'ROOT' };
      if (user.key === 'all') return { ...user, label: 'Visible Users', memory: '2.7 GB', processes: 63, cpu: 15.1 };
      if (user.key === 'other') return { ...user, status: 'Restricted', statusClass: 'restricted', memory: 'Hidden', processes: '—' };
      return { ...user };
    }
    function getProcessesForUser(key) {
      if (state.mode === 'normal' && key === 'root') return [];
      if (key === 'all') {
        const keys = state.mode === 'normal' ? ['john', 'jane', 'mike', 'alex', 'docker', 'nginx', 'postgres'] : ['root', 'john', 'jane', 'mike', 'alex', 'docker', 'nginx', 'postgres'];
        return keys.flatMap(k => processData[k] || []);
      }
      if (key === 'other') return [];
      return processData[key] || [];
    }
    function getRawLogsForScope() {
      if (state.logScope === 'all') {
        const keys = state.mode === 'normal' ? ['john', 'jane', 'mike', 'alex', 'docker', 'nginx', 'postgres'] : ['root', 'john', 'jane', 'mike', 'alex', 'docker', 'nginx', 'postgres'];
        return keys.flatMap(k => logData[k] || []);
      }
      if (state.mode === 'normal' && state.selectedUser === 'root') {
        return [
          ['10:24:31.111', 'permission', '—', 'WARN', 'Root process details are hidden for normal user scope'],
          ['10:24:31.150', 'session', '—', 'INFO', 'Select john or another visible user to load permitted processes']
        ];
      }
      if (state.selectedUser === 'all') return getRawLogsForAllSelected();
      return logData[state.selectedUser] || [];
    }
    function getRawLogsForAllSelected() {
      const keys = state.mode === 'normal' ? ['john', 'jane', 'mike', 'alex', 'docker', 'nginx', 'postgres'] : ['root', 'john', 'jane', 'mike', 'alex', 'docker', 'nginx', 'postgres'];
      return keys.flatMap(k => logData[k] || []);
    }
  </script>

  <!-- SCRIPT: RENDERERS: User Tree, Process Tree, Logs, Alerts, and label updates. -->
  <script>
    function renderUsers() {
      renderHeader(els.userHead, 'user');
      const q = state.search.user.trim().toLowerCase();
      let rows = [];
      const allUser = userVisibleForMode(users[0]);
      rows.push(allUser);
      if (state.userView === 'list' || state.userTreeExpanded || q) {
        rows.push(...users.slice(1).map(userVisibleForMode));
      }
      rows = rows.filter(u => !q || u.label.toLowerCase().includes(q) || u.role.toLowerCase().includes(q) || String(u.processes).includes(q));
      const cols = activeColumns('user');
      els.usersTable.innerHTML = rows.map(u => {
        const selected = u.key === state.selectedUser ? 'selected' : '';
        const restricted = u.statusClass === 'restricted' ? 'restricted-row' : '';
        const depth = state.userView === 'tree' && u.key !== 'all' ? 1 : 0;
        const caret = u.key === 'all' && state.userView === 'tree' ? `<span class="caret ${state.userTreeExpanded ? '' : 'collapsed'}" data-user-caret="all">⌄</span>` : '<span class="caret empty">⌄</span>';
        const tag = u.tag ? `<span class="${u.tag === 'YOU' ? 'tag-you' : 'permission-tag'}">${esc(u.tag)}</span>` : '';
        const values = {
          name: `<div class="tree-cell" style="--depth:${depth}">${caret}<span class="avatar ${esc(u.avatarClass)}">${esc(u.avatar)}</span><strong title="${esc(u.label)}">${esc(u.label)}</strong>${tag}</div>`,
          cpu: `<span class="${cpuClass(u.cpu)}">${fmtCpu(u.cpu)}</span>`,
          memory: `<span>${esc(u.memory)}</span>`,
          processes: `<span class="tabular">${esc(u.processes)}</span>`,
          status: `<span class="status ${u.statusClass === 'restricted' ? 'restricted' : ''}">${esc(u.status)}</span>`
        };
        return `<div class="tree-row user-row ${state.userView === 'tree' ? 'tree-mode' : ''} depth-${depth} ${selected} ${restricted}" data-user="${esc(u.key)}" style="grid-template-columns:${gridTemplate('user')}">${cols.map(c => values[c.key]).join('')}</div>`;
      }).join('');
      els.usersTable.querySelectorAll('.user-row').forEach(row => {
        row.addEventListener('click', e => {
          const caret = e.target.closest('[data-user-caret]');
          if (caret) { state.userTreeExpanded = !state.userTreeExpanded; renderUsers(); toast(state.userTreeExpanded ? 'User tree expanded' : 'User tree collapsed'); return; }
          selectUser(row.dataset.user);
        });
      });
      document.getElementById('userExpandBtn').classList.toggle('active', state.userTreeExpanded || state.userView === 'list');
      document.getElementById('userTreeBtn').classList.toggle('active', state.userView === 'tree');
      document.getElementById('userListBtn').classList.toggle('active', state.userView === 'list');
    }

    function nodeMatches(node, q) {
      if (!q) return true;
      return String(node.name).toLowerCase().includes(q) || String(node.pid).includes(q) || String(node.status).toLowerCase().includes(q);
    }
    function filterNodeTree(nodes, depth = 0, acc = [], q = '') {
      for (const node of nodes || []) {
        const children = node.children || [];
        const childAcc = [];
        filterNodeTree(children, depth + 1, childAcc, q);
        const matchesText = nodeMatches(node, q);
        const matchesStatus = state.filters.statuses[node.status] !== false;
        const matchesCpu = Number(node.cpu) >= Number(state.filters.minCpu || 0);
        const include = (matchesText || childAcc.length > 0) && (matchesStatus || childAcc.length > 0) && (matchesCpu || childAcc.length > 0);
        if (!include) continue;
        acc.push({ ...node, depth });
        const expanded = state.processView === 'list' || q || state.processExpanded.has(node.id);
        if (children.length && expanded) {
          if (q) acc.push(...childAcc);
          else filterNodeTree(children, depth + 1, acc, q);
        }
      }
      return acc;
    }
    function renderProcesses() {
      renderHeader(els.processHead, 'process');
      const raw = getProcessesForUser(state.selectedUser);
      const q = state.search.process.trim().toLowerCase();
      const rows = filterNodeTree(raw, 0, [], q);
      const cols = activeColumns('process');
      if (!rows.length) {
        const msg = (state.mode === 'normal' && state.selectedUser === 'root')
          ? '<h2>Root process tree restricted</h2><p>Normal users can see the root account summary, but cannot load root process details. Select john or another visible user.</p>'
          : '<h2>Select a user to view processes</h2><p>Choose a user from the User Tree. That user’s process tree will load here.</p>';
        els.processTable.innerHTML = `<div class="empty-state"><div class="empty-card">${svgEmpty}${msg}</div></div>`;
        return;
      }
      els.processTable.innerHTML = rows.map(p => {
        const hasKids = hasChildren(p);
        const expanded = state.processView === 'list' || q || state.processExpanded.has(p.id);
        const caret = hasKids && state.processView === 'tree' ? `<span class="caret ${expanded ? '' : 'collapsed'}" data-proc-caret="${esc(p.id)}">⌄</span>` : '<span class="caret empty">⌄</span>';
        const values = {
          name: `<div class="tree-cell" style="--depth:${state.processView === 'tree' ? p.depth : 0}">${caret}<span class="proc-icon ${esc(p.iconClass || '')}">${esc(p.icon)}</span><strong title="${esc(p.name)}">${esc(p.name)}</strong></div>`,
          pid: `<span class="tabular">${esc(p.pid)}</span>`,
          cpu: `<span class="${cpuClass(p.cpu)}">${fmtCpu(p.cpu)}</span>`,
          memory: `<span>${esc(p.mem)}</span>`,
          status: `<span class="status ${processStatusClass(p.status)}">${esc(p.status)}</span>`
        };
        return `<div class="tree-row proc-row ${state.processView === 'tree' ? 'tree-mode' : ''} depth-${p.depth}" data-proc="${esc(p.id)}" style="grid-template-columns:${gridTemplate('process')}">${cols.map(c => values[c.key]).join('')}</div>`;
      }).join('');
      els.processTable.querySelectorAll('[data-proc-caret]').forEach(caret => {
        caret.addEventListener('click', e => {
          e.stopPropagation();
          const id = caret.dataset.procCaret;
          if (state.processExpanded.has(id)) state.processExpanded.delete(id); else state.processExpanded.add(id);
          state.allProcessesExpanded = false;
          renderProcesses();
          toast(state.processExpanded.has(id) ? 'Process branch expanded' : 'Process branch collapsed');
        });
      });
      document.getElementById('processTreeBtn').classList.toggle('active', state.processView === 'tree');
      document.getElementById('processListBtn').classList.toggle('active', state.processView === 'list');
      document.getElementById('processExpandBtn').classList.toggle('active', state.processView === 'list' || state.allProcessesExpanded);
    }

    function filteredLogs() {
      const q = state.search.log.trim().toLowerCase();
      let logs = getRawLogsForScope();
      if (state.logScope === 'errors') logs = logs.filter(l => l[3] === 'ERROR');
      if (state.logScope === 'warnerror') logs = logs.filter(l => l[3] === 'WARN' || l[3] === 'ERROR');
      logs = logs.filter(l => state.filters.levels[l[3]] !== false);
      if (q) logs = logs.filter(l => l.join(' ').toLowerCase().includes(q));
      return logs.slice(0, state.logLineCap);
    }
    function renderLogs() {
      renderHeader(els.logsHead, 'log');
      const cols = activeColumns('log');
      const logs = filteredLogs();
      if (!logs.length) {
        els.logsTable.innerHTML = `<div class="empty-state"><div class="empty-card">${svgEmpty}<h2>No log rows match</h2><p>Adjust the search, level filters, or log scope to show matching real-time rows.</p></div></div>`;
        return;
      }
      els.logsTable.innerHTML = logs.map(([time, process, pid, level, message]) => {
        const cls = severityClass(level);
        const values = {
          time: `<span>${esc(time)}</span>`,
          process: `<span title="${esc(process)}">${esc(process)}</span>`,
          pid: `<span class="tabular">${esc(pid)}</span>`,
          level: `<span class="severity ${cls}">${esc(level)}</span>`,
          message: `<span class="msg ${cls}">${esc(message)}</span>`
        };
        return `<div class="log-row mono" style="grid-template-columns:${gridTemplate('log')}">${cols.map(c => `<div>${values[c.key]}</div>`).join('')}</div>`;
      }).join('');
      if (state.autoScroll) document.getElementById('logsScroll').scrollTop = 0;
    }

    function updateLabels() {
      const u = userRecord();
      const label = cleanLabel(u.label);
      const restricted = state.mode === 'normal' && state.selectedUser === 'root';
      document.getElementById('metricSelectedUser')?.remove();
      document.getElementById('metricUserCpu').textContent = typeof u.cpu === 'number' ? fmtCpu(u.cpu) : u.cpu;
      document.getElementById('metricTotalUsers').textContent = state.mode === 'normal' ? '6' : '12';
      document.getElementById('metricTotalProcesses').textContent = state.mode === 'normal' ? '63' : '128';
      document.getElementById('metricAlerts').textContent = state.alerts.length;
      els.alertBadge.textContent = state.alerts.length;
      els.alertBadge.classList.toggle('hidden', state.alerts.length === 0);
      els.processSubtitle.textContent = restricted ? 'root selected · restricted in normal-user scope' : `${label} selected · ${state.selectedUser === 'root' ? 'privileged' : 'user'} process scope`;
      els.logsSubtitle.textContent = state.logScope === 'all' ? 'Showing all permitted logs' : state.logScope === 'errors' ? 'Showing matching errors only' : state.logScope === 'warnerror' ? 'Showing warnings and errors' : `Filtered by ${label} process scope`;
      document.getElementById('logFilterLabel').textContent = state.logScope === 'selected' ? `${label} scope` : state.logScope === 'all' ? 'All Processes' : state.logScope === 'errors' ? 'Errors only' : 'Warn + Error';
      document.getElementById('timeRangeLabel').textContent = state.timeRange;
      document.getElementById('logLineCount').textContent = state.logLineCap;
      updateFilterBadge();
      renderAlerts();
    }
    function updateFilterBadge() {
      let count = 0;
      Object.values(state.filters.levels).forEach(v => { if (!v) count++; });
      Object.values(state.filters.statuses).forEach(v => { if (!v) count++; });
      if (Number(state.filters.minCpu) > 0) count++;
      els.filterBadge.textContent = count;
      els.filterBadge.classList.toggle('hidden', count === 0);
      document.getElementById('filterBtn').classList.toggle('active', count > 0);
    }
    function renderAlerts() {
      const list = document.getElementById('alertsList');
      if (!state.alerts.length) {
        list.innerHTML = '<div class="alert-item"><strong>All clear <span class="severity info">INFO</span></strong><span>No unread alerts in the current mock session.</span></div>';
        return;
      }
      list.innerHTML = state.alerts.map(a => `<div class="alert-item"><strong>${esc(a.title)} <span class="severity ${severityClass(a.level)}">${esc(a.level)}</span></strong><span>${esc(a.text)}</span></div>`).join('');
    }
    function renderAll() {
      renderUsers();
      renderProcesses();
      renderLogs();
      updateLabels();
    }
  </script>

  <!-- SCRIPT: ACTIONS: theme mode, user selection, mode switching, timers, and column controls. -->
  <script>
    function getStoredThemeMode() {
      try { return localStorage.getItem('processMonitorTheme') || 'dark'; }
      catch (error) { return 'dark'; }
    }
    function resolveThemeMode(themeMode) {
      if (themeMode === 'system') {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      }
      return themeMode === 'light' ? 'light' : 'dark';
    }
    function updateThemeButtonLabel() {
      const isLight = state.resolvedTheme === 'light';
      els.themeToggleBtn?.setAttribute('aria-pressed', String(isLight));
      els.themeToggleBtn?.classList.toggle('active', isLight);
      if (els.themeLabel) els.themeLabel.textContent = isLight ? 'Dark' : 'Light';
      if (els.themeToggleBtn) els.themeToggleBtn.title = isLight ? 'Switch to dark mode' : 'Switch to light mode';
      if (els.themeIcon) {
        els.themeIcon.innerHTML = isLight
          ? '<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.8 6.8 0 0 0 21 12.8Z" stroke-linecap="round" stroke-linejoin="round"/>'
          : '<path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke-linecap="round"/><circle cx="12" cy="12" r="4"/>';
      }
      const themeSelect = document.getElementById('themeModeSelect');
      if (themeSelect) themeSelect.value = state.theme;
    }
    function applyThemeMode(themeMode, options = {}) {
      state.theme = themeMode;
      state.resolvedTheme = resolveThemeMode(themeMode);
      document.documentElement.dataset.theme = state.resolvedTheme;
      updateThemeButtonLabel();
      if (options.persist !== false) {
        try { localStorage.setItem('processMonitorTheme', themeMode); }
        catch (error) { /* Storage can be blocked in sandboxed previews. */ }
      }
      if (options.announce) toast(`${state.resolvedTheme === 'light' ? 'Light' : 'Dark'} mode enabled`);
    }
    function toggleLightDarkMode() {
      const nextTheme = state.resolvedTheme === 'light' ? 'dark' : 'light';
      applyThemeMode(nextTheme, { announce: true });
    }
    function initializeThemeMode() {
      const storedThemeMode = getStoredThemeMode();
      applyThemeMode(storedThemeMode, { persist: false });
      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: light)').addEventListener?.('change', () => {
          if (state.theme === 'system') applyThemeMode('system', { persist: false });
        });
      }
    }

    function selectUser(key) {
      if (!users.some(u => u.key === key)) return;
      state.selectedUser = key;
      state.processExpanded = new Set(collectIds(getProcessesForUser(key)));
      state.allProcessesExpanded = true;
      state.logScope = 'selected';
      document.querySelector('input[name="logScope"][value="selected"]').checked = true;
      renderAll();
      const safeUserKey = window.CSS && CSS.escape ? CSS.escape(key) : String(key).replace(/[^a-zA-Z0-9_-]/g, match => '\\' + match);
      const row = document.querySelector(`[data-user="${safeUserKey}"]`);
      if (row) { row.classList.add('highlight-pulse'); setTimeout(() => row.classList.remove('highlight-pulse'), 1200); }
      toast(`${cleanLabel(userRecord(key).label)} selected — process tree loaded`);
    }
    function setMode(mode) {
      state.mode = mode;
      state.selectedUser = mode === 'root' ? 'root' : 'john';
      state.processExpanded = new Set(collectIds(getProcessesForUser(state.selectedUser)));
      state.allProcessesExpanded = true;
      document.getElementById('rootViewBtn').classList.toggle('active', mode === 'root');
      document.getElementById('normalViewBtn').classList.toggle('active', mode === 'normal');
      history.replaceState(null, '', '#' + mode);
      renderAll();
      toast(mode === 'root' ? 'Root user view enabled' : 'Normal user view enabled');
    }

    function togglePause(force) {
      state.paused = typeof force === 'boolean' ? force : !state.paused;
      document.getElementById('topPauseBtn').setAttribute('aria-pressed', String(state.paused));
      document.getElementById('topPauseBtn').querySelector('.label').textContent = state.paused ? 'Resume' : 'Pause';
      document.getElementById('topPauseBtn').classList.toggle('active', state.paused);
      document.getElementById('logPauseBtn').classList.toggle('active', state.paused);
      els.liveBadge.textContent = state.paused ? 'PAUSED' : 'LIVE';
      els.liveBadge.classList.toggle('paused', state.paused);
      els.streamingLabel.textContent = state.paused ? 'Paused' : 'Streaming';
      toast(state.paused ? 'Live updates paused' : 'Live updates resumed');
    }
    function nowTime() { return new Date().toLocaleTimeString('en-US', { hour12: false }); }
    function simulateTick() {
      if (state.paused) return;
      const cpu = 22.6 + Math.random() * 4.2;
      const mem = 4.08 + Math.random() * .32;
      const net = 1.1 + Math.random() * .6;
      document.getElementById('metricCpu').textContent = cpu.toFixed(1);
      document.getElementById('metricMemory').textContent = mem.toFixed(1);
      document.getElementById('metricNetwork').textContent = net.toFixed(1);
      document.getElementById('footerCpu').textContent = `${cpu.toFixed(1)}%`;
      document.getElementById('lastUpdated').textContent = nowTime();
      const currentKey = state.selectedUser === 'all' ? (state.mode === 'root' ? 'root' : 'john') : state.selectedUser;
      if (currentKey !== 'root' || state.mode === 'root') {
        const pool = logData[currentKey] || logData.john;
        const proc = flatten(getProcessesForUser(currentKey))[Math.floor(Math.random() * Math.max(1, flatten(getProcessesForUser(currentKey)).length))];
        if (pool && proc && Math.random() > .35) {
          const messages = [['INFO', 'Heartbeat received'], ['INFO', 'Snapshot refreshed'], ['DEBUG', 'Process sample collected'], ['INFO', 'CPU window recalculated'], ['WARN', 'Transient spike detected']];
          const [level, msg] = messages[Math.floor(Math.random() * messages.length)];
          pool.unshift([nowTime() + '.' + String(Math.floor(Math.random() * 900) + 100), proc.name, proc.pid, level, msg]);
          if (pool.length > 35) pool.pop();
          renderLogs();
        }
      }
    }
    function restartTimer() {
      if (state.intervalId) clearInterval(state.intervalId);
      state.intervalId = setInterval(simulateTick, state.refreshMs);
    }

    function createColumnChecks() {
      const containers = { user: document.getElementById('userColumnChecks'), process: document.getElementById('processColumnChecks'), log: document.getElementById('logColumnChecks') };
      for (const table of Object.keys(containers)) {
        containers[table].innerHTML = columnDefs[table].map(col => `<label class="check-row"><input type="checkbox" data-column-table="${table}" data-column-key="${col.key}" ${state.columns[table][col.key] ? 'checked' : ''} ${col.required ? 'disabled' : ''}> ${esc(col.label)}${col.required ? ' <span class="mini-tag">required</span>' : ''}</label>`).join('');
      }
      document.querySelectorAll('[data-column-table]').forEach(input => {
        input.addEventListener('change', () => {
          state.columns[input.dataset.columnTable][input.dataset.columnKey] = input.checked;
          renderAll();
          toast('Columns updated');
        });
      });
    }
    function resetColumns() {
      for (const table of Object.keys(state.columns)) for (const col of Object.keys(state.columns[table])) state.columns[table][col] = true;
      createColumnChecks();
      renderAll();
      toast('Columns reset');
    }
  </script>

  <!-- SCRIPT: POPOVERS AND FEEDBACK: layered dropdown positioning, switches, and toasts. -->
  <script>
    function openAnchoredPopover(popoverId, anchorElement) {
      const popoverElement = document.getElementById(popoverId);
      closeAllPopoversExcept(popoverId);
      const anchorRect = anchorElement.getBoundingClientRect();

      popoverElement.classList.add('open');
      popoverElement.style.visibility = 'hidden';
      popoverElement.style.left = '0px';
      popoverElement.style.top = '0px';
      popoverElement.style.width = `${Math.min(360, window.innerWidth - 24)}px`;

      const measuredRect = popoverElement.getBoundingClientRect();
      const horizontalMargin = 12;
      const verticalMargin = 12;
      const preferredWidth = Math.min(360, window.innerWidth - horizontalMargin * 2);
      const preferredLeft = anchorRect.right - preferredWidth;
      const safeLeft = Math.max(horizontalMargin, Math.min(preferredLeft, window.innerWidth - preferredWidth - horizontalMargin));

      const spaceBelow = window.innerHeight - anchorRect.bottom - verticalMargin;
      const spaceAbove = anchorRect.top - verticalMargin;
      const openAbove = measuredRect.height > spaceBelow && spaceAbove > spaceBelow;
      const maxAvailableHeight = Math.max(180, (openAbove ? spaceAbove : spaceBelow) - 8);
      const safeTop = openAbove
        ? Math.max(verticalMargin, anchorRect.top - Math.min(measuredRect.height, maxAvailableHeight) - 8)
        : Math.min(anchorRect.bottom + 8, window.innerHeight - Math.min(measuredRect.height, maxAvailableHeight) - verticalMargin);

      popoverElement.style.left = `${safeLeft}px`;
      popoverElement.style.top = `${safeTop}px`;
      popoverElement.style.maxHeight = `${maxAvailableHeight}px`;
      popoverElement.style.visibility = 'visible';
      anchorElement.classList.add('active');
    }
    function closeAllPopoversExcept(exceptId) {
      document.querySelectorAll('.popover.open').forEach(p => { if (p.id !== exceptId) p.classList.remove('open'); });
      ['filterBtn','columnsBtn','alertsBtn','settingsBtn','timeRangeBtn','logScopeBtn','logLinesBtn'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn && (!exceptId || !document.getElementById(exceptId)?.classList.contains('open'))) btn.classList.remove('active');
      });
      if (exceptId) {
        const map = { filterPopover: 'filterBtn', columnsPopover: 'columnsBtn', alertsPopover: 'alertsBtn', settingsPopover: 'settingsBtn', timePopover: 'timeRangeBtn', logScopePopover: 'logScopeBtn', logLinesPopover: 'logLinesBtn' };
        Object.entries(map).forEach(([pid, bid]) => { if (pid !== exceptId) document.getElementById(bid)?.classList.remove('active'); });
      }
    }
    function bindPopoverTrigger(buttonId, popoverId) {
      document.getElementById(buttonId).addEventListener('click', e => {
        e.stopPropagation();
        const pop = document.getElementById(popoverId);
        if (pop.classList.contains('open')) { pop.classList.remove('open'); document.getElementById(buttonId).classList.remove('active'); }
        else openAnchoredPopover(popoverId, document.getElementById(buttonId));
      });
    }
    function toast(message) {
      const item = document.createElement('div');
      item.className = 'toast';
      item.textContent = message;
      els.toastStack.appendChild(item);
      setTimeout(() => { item.style.opacity = '0'; item.style.transform = 'translateY(6px)'; }, 2200);
      setTimeout(() => item.remove(), 2600);
    }
    function setSwitch(el, on) {
      el.classList.toggle('off', !on);
      el.setAttribute('aria-checked', String(on));
    }
    function bindSwitch(el, getter, setter) {
      const toggle = () => { setter(!getter()); };
      el.addEventListener('click', toggle);
      el.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); } });
    }
  </script>

  <!-- SCRIPT: EVENT WIRING AND STARTUP: binds all controls and starts the live mock session. -->
  <script>
    function setupEvents() {
      document.getElementById('rootViewBtn').addEventListener('click', () => setMode('root'));
      document.getElementById('normalViewBtn').addEventListener('click', () => setMode('normal'));
      document.getElementById('topPauseBtn').addEventListener('click', () => togglePause());
      document.getElementById('logPauseBtn').addEventListener('click', () => togglePause());
      document.getElementById('clearLogsBtn').addEventListener('click', () => {
        const key = state.selectedUser === 'all' ? (state.mode === 'root' ? 'root' : 'john') : state.selectedUser;
        if (logData[key]) logData[key] = [];
        renderLogs();
        toast('Current log scope cleared');
      });
      document.getElementById('userExpandBtn').addEventListener('click', () => { state.userTreeExpanded = !state.userTreeExpanded; renderUsers(); toast(state.userTreeExpanded ? 'User tree expanded' : 'User tree collapsed'); });
      document.getElementById('userTreeBtn').addEventListener('click', () => { state.userView = 'tree'; renderUsers(); toast('User tree view'); });
      document.getElementById('userListBtn').addEventListener('click', () => { state.userView = 'list'; renderUsers(); toast('User list view'); });
      document.getElementById('processExpandBtn').addEventListener('click', () => {
        const ids = collectIds(getProcessesForUser(state.selectedUser));
        const allExpanded = ids.every(id => state.processExpanded.has(id));
        state.processExpanded = allExpanded ? new Set() : new Set(ids);
        state.allProcessesExpanded = !allExpanded;
        renderProcesses();
        toast(allExpanded ? 'Process tree collapsed' : 'Process tree expanded');
      });
      document.getElementById('processTreeBtn').addEventListener('click', () => { state.processView = 'tree'; renderProcesses(); toast('Process tree view'); });
      document.getElementById('processListBtn').addEventListener('click', () => { state.processView = 'list'; renderProcesses(); toast('Process list view'); });
      els.userSearch.addEventListener('input', e => { state.search.user = e.target.value; renderUsers(); });
      els.processSearch.addEventListener('input', e => { state.search.process = e.target.value; renderProcesses(); });
      els.logSearch.addEventListener('input', e => { state.search.log = e.target.value; renderLogs(); });

      bindPopoverTrigger('filterBtn', 'filterPopover');
      bindPopoverTrigger('columnsBtn', 'columnsPopover');
      bindPopoverTrigger('alertsBtn', 'alertsPopover');
      bindPopoverTrigger('settingsBtn', 'settingsPopover');
      bindPopoverTrigger('timeRangeBtn', 'timePopover');
      bindPopoverTrigger('logScopeBtn', 'logScopePopover');
      bindPopoverTrigger('logLinesBtn', 'logLinesPopover');
      document.getElementById('themeToggleBtn').addEventListener('click', toggleLightDarkMode);
      document.getElementById('themeModeSelect').addEventListener('change', e => applyThemeMode(e.target.value, { announce: true }));

      document.querySelectorAll('[data-close-popover]').forEach(btn => btn.addEventListener('click', () => closeAllPopoversExcept()));
      document.addEventListener('click', e => {
        if (!e.target.closest('.popover') && !e.target.closest('.tool-button') && !e.target.closest('.select-like')) closeAllPopoversExcept();
      });
      document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllPopoversExcept(); });

      document.querySelectorAll('[data-filter-level]').forEach(input => input.addEventListener('change', () => { state.filters.levels[input.dataset.filterLevel] = input.checked; renderLogs(); updateFilterBadge(); toast('Log level filter updated'); }));
      document.querySelectorAll('[data-filter-status]').forEach(input => input.addEventListener('change', () => { state.filters.statuses[input.dataset.filterStatus] = input.checked; renderProcesses(); updateFilterBadge(); toast('Process status filter updated'); }));
      document.getElementById('minCpuInput').addEventListener('input', e => { state.filters.minCpu = Number(e.target.value || 0); renderProcesses(); updateFilterBadge(); });
      document.getElementById('resetFiltersBtn').addEventListener('click', () => {
        state.filters = { levels: { INFO: true, DEBUG: true, WARN: true, ERROR: true }, statuses: { Running: true, Sleeping: true, Stopped: true, Zombie: true }, minCpu: 0 };
        document.querySelectorAll('[data-filter-level],[data-filter-status]').forEach(i => i.checked = true);
        document.getElementById('minCpuInput').value = 0;
        renderAll();
        toast('Filters reset');
      });
      document.getElementById('resetColumnsBtn').addEventListener('click', resetColumns);
      document.getElementById('markAlertsReadBtn').addEventListener('click', () => { state.alerts = []; renderAll(); toast('Alerts marked read'); });
      document.querySelectorAll('input[name="timeRange"]').forEach(input => input.addEventListener('change', () => { state.timeRange = input.value; updateLabels(); toast(`${state.timeRange} selected`); closeAllPopoversExcept(); }));
      document.querySelectorAll('input[name="logScope"]').forEach(input => input.addEventListener('change', () => { state.logScope = input.value; renderLogs(); updateLabels(); toast('Log scope updated'); closeAllPopoversExcept(); }));
      document.querySelectorAll('input[name="logLines"]').forEach(input => input.addEventListener('change', () => { state.logLineCap = Number(input.value); document.getElementById('settingsLogLines').value = input.value; renderLogs(); updateLabels(); toast(`Log line cap set to ${input.value}`); closeAllPopoversExcept(); }));

      bindSwitch(document.getElementById('footerAutoScroll'), () => state.autoScroll, val => { state.autoScroll = val; setSwitch(document.getElementById('footerAutoScroll'), val); toast(val ? 'Auto-scroll enabled' : 'Auto-scroll disabled'); });
      bindSwitch(document.getElementById('compactSwitch'), () => state.compact, val => { state.compact = val; document.body.classList.toggle('compact', val); setSwitch(document.getElementById('compactSwitch'), val); toast(val ? 'Compact rows enabled' : 'Comfortable rows enabled'); });
      bindSwitch(document.getElementById('sparksSwitch'), () => state.showSparks, val => { state.showSparks = val; document.body.classList.toggle('hide-sparks', !val); setSwitch(document.getElementById('sparksSwitch'), val); toast(val ? 'Sparklines shown' : 'Sparklines hidden'); });
      bindSwitch(document.getElementById('contrastSwitch'), () => state.highContrast, val => { state.highContrast = val; document.body.classList.toggle('high-contrast', val); setSwitch(document.getElementById('contrastSwitch'), val); toast(val ? 'High contrast enabled' : 'High contrast disabled'); });
      bindSwitch(document.getElementById('motionSwitch'), () => state.reduceMotion, val => { state.reduceMotion = val; document.body.classList.toggle('reduce-motion', val); setSwitch(document.getElementById('motionSwitch'), val); toast(val ? 'Motion reduced' : 'Motion restored'); });
      document.getElementById('refreshSelect').addEventListener('change', e => { state.refreshMs = Number(e.target.value); restartTimer(); toast('Refresh interval updated'); });
      document.getElementById('settingsLogLines').addEventListener('change', e => { state.logLineCap = Number(e.target.value); document.querySelector(`input[name="logLines"][value="${e.target.value}"]`).checked = true; renderLogs(); updateLabels(); toast(`Log line cap set to ${e.target.value}`); });
      document.getElementById('resetLayoutBtn').addEventListener('click', () => {
        state.userView = 'tree'; state.processView = 'tree'; state.userTreeExpanded = true; state.compact = false; state.showSparks = true; state.highContrast = false; state.reduceMotion = false; state.autoScroll = true; state.logScope = 'selected'; state.logLineCap = 5000; state.refreshMs = 1400;
        document.body.classList.remove('compact', 'hide-sparks', 'high-contrast', 'reduce-motion');
        setSwitch(document.getElementById('compactSwitch'), false); setSwitch(document.getElementById('sparksSwitch'), true); setSwitch(document.getElementById('contrastSwitch'), false); setSwitch(document.getElementById('motionSwitch'), false); setSwitch(document.getElementById('footerAutoScroll'), true);
        document.getElementById('refreshSelect').value = '1400'; document.getElementById('settingsLogLines').value = '5000'; document.querySelector('input[name="logScope"][value="selected"]').checked = true; document.querySelector('input[name="logLines"][value="5000"]').checked = true;
        restartTimer(); renderAll(); toast('Layout reset');
      });
      document.getElementById('fullscreenBtn').addEventListener('click', async () => {
        try {
          if (!document.fullscreenElement && document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
          else if (document.exitFullscreen) await document.exitFullscreen();
          document.getElementById('fullscreenBtn').classList.toggle('active', !!document.fullscreenElement);
          toast(document.fullscreenElement ? 'Fullscreen enabled' : 'Fullscreen exited');
        } catch (err) {
          document.body.classList.toggle('fullscreen-fallback');
          document.getElementById('fullscreenBtn').classList.toggle('active', document.body.classList.contains('fullscreen-fallback'));
          toast('Fullscreen fallback toggled');
        }
      });
    }

    function init() {
      initializeThemeMode();
      createColumnChecks();
      setupEvents();
      const initialMode = location.hash.replace('#','') === 'normal' ? 'normal' : 'root';
      state.selectedUser = initialMode === 'root' ? 'root' : 'john';
      state.mode = initialMode;
      state.processExpanded = new Set(collectIds(getProcessesForUser(state.selectedUser)));
      document.getElementById('rootViewBtn').classList.toggle('active', initialMode === 'root');
      document.getElementById('normalViewBtn').classList.toggle('active', initialMode === 'normal');
      renderAll();
      restartTimer();
    }
    init();
  </script>
</body>
</html>
````````

## `src/imports/process_monitor_root_normal_light_dark_final.html`

- Category: imported artifact/schema.
- Imports: No direct imports in this file.
- Exports: No named exports detected; inspect the default/component body.
- Reuse guidance: Use this for Process Monitor views, realtime runtime logs, worker status panels, CPU/RAM cards, and scope-aware process trees.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````html
<!doctype html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Process Monitor — Root & Normal User Interactive Mockup with Light/Dark Mode</title>
  <!-- THEME BOOTSTRAP: set saved light/dark/system preference before the CSS renders. -->
  <script>
    (function initializeThemeBeforePaint() {
      try {
        const storedTheme = localStorage.getItem('processMonitorTheme') || 'dark';
        const resolvedTheme = storedTheme === 'system'
          ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
          : (storedTheme === 'light' ? 'light' : 'dark');
        document.documentElement.dataset.theme = resolvedTheme;
      } catch (error) {
        document.documentElement.dataset.theme = 'dark';
      }
    })();
  </script>
  <!--
    All-in-one responsive UI mockup.
    Component map:
    1. App shell + top toolbar
    2. System metric cards
    3. User Tree summary panel
    4. Process Tree detail panel
    5. Real-time Logs panel
    6. Footer status bar
    7. Floating popovers and toast notifications
  -->
  <style>
    :root {
      color-scheme: dark;
      --body-bg: radial-gradient(circle at 12% 5%, rgba(44, 115, 255, .16), transparent 28rem), radial-gradient(circle at 84% 8%, rgba(31, 194, 107, .10), transparent 26rem), radial-gradient(circle at 50% 106%, rgba(139, 92, 246, .10), transparent 35rem), linear-gradient(180deg, #07101c 0%, #07111e 55%, #050c16 100%);
      --bg: #07111e;
      --bg-2: #0a1624;
      --panel: rgba(13, 26, 42, 0.9);
      --panel-2: rgba(9, 19, 32, 0.96);
      --panel-3: rgba(17, 33, 52, 0.76);
      --line: rgba(121, 151, 187, 0.18);
      --line-strong: rgba(126, 170, 222, 0.32);
      --text: #e8f0fb;
      --muted: #9fb0c6;
      --muted-2: #6f8198;
      --blue: #3b82f6;
      --blue-2: #60a5fa;
      --green: #52e35c;
      --green-2: #1fc26b;
      --yellow: #f8c51b;
      --orange: #ff991c;
      --red: #ff5a55;
      --purple: #8b5cf6;
      --cyan: #23d3ee;
      --card-shadow: 0 20px 70px rgba(0, 0, 0, .35), inset 0 1px 0 rgba(255, 255, 255, .035);
      --radius: 10px;
      --header-h: 64px;
      --row-h: 39px;
      --font-main: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      --font-mono: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
      font-family: var(--font-main);
    }

    * { box-sizing: border-box; }
    html, body { min-height: 100%; }
    body {
      margin: 0;
      min-height: 100vh;
      overflow-x: hidden;
      color: var(--text);
      background: var(--body-bg);
      letter-spacing: -0.01em;
    }
    body::before {
      content: "";
      position: fixed;
      inset: 0;
      pointer-events: none;
      background-image:
        linear-gradient(rgba(255, 255, 255, .025) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, .02) 1px, transparent 1px);
      background-size: 32px 32px;
      mask-image: linear-gradient(180deg, rgba(0,0,0,.55), transparent 78%);
    }
    button, input, select { font: inherit; }
    button { -webkit-tap-highlight-color: transparent; }

    .app {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      border: 1px solid rgba(139, 168, 202, .10);
      background: rgba(3, 9, 18, .14);
      position: relative;
    }

    .topbar {
      min-height: var(--header-h);
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 10px 18px;
      border-bottom: 1px solid var(--line);
      background: rgba(5, 13, 24, .84);
      backdrop-filter: blur(16px);
      position: sticky;
      top: 0;
      z-index: 30;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 12px;
      min-width: max-content;
    }
    .pulse-logo {
      width: 34px;
      height: 34px;
      display: grid;
      place-items: center;
      color: var(--blue-2);
      filter: drop-shadow(0 0 14px rgba(59,130,246,.40));
    }
    .pulse-logo svg { width: 34px; height: 34px; }
    h1 {
      font-size: clamp(18px, 2vw, 26px);
      line-height: 1;
      margin: 0;
      font-weight: 760;
      letter-spacing: -0.05em;
    }
    .live-badge, .scope-badge, .pill, .severity, .status-dot-label {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      border-radius: 999px;
      white-space: nowrap;
    }
    .live-badge {
      height: 26px;
      padding: 0 10px;
      color: #70fb86;
      border: 1px solid rgba(82, 227, 92, .42);
      background: rgba(28, 165, 73, .12);
      font-size: 12px;
      font-weight: 800;
      letter-spacing: .02em;
      box-shadow: inset 0 0 16px rgba(82, 227, 92, .07);
    }
    .live-badge.paused {
      color: #ffd56a;
      border-color: rgba(248, 197, 27, .42);
      background: rgba(248, 197, 27, .12);
    }
    .live-badge::before, .streaming::before, .dot::before {
      content: "";
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--green);
      box-shadow: 0 0 10px rgba(82, 227, 92, .75);
    }
    .live-badge.paused::before { background: var(--yellow); box-shadow: 0 0 10px rgba(248, 197, 27, .70); }

    .toolbar {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      flex-wrap: wrap;
      justify-content: flex-end;
    }
    .tool-button,
    .select-like,
    .segmented button,
    .icon-button,
    .plain-button {
      color: var(--text);
      border: 1px solid rgba(129, 158, 193, .18);
      background: rgba(10, 20, 34, .55);
      border-radius: 9px;
      height: 36px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 0 12px;
      font-size: 13px;
      line-height: 1;
      cursor: pointer;
      transition: border-color .15s ease, background .15s ease, transform .15s ease, box-shadow .15s ease;
      position: relative;
      user-select: none;
    }
    .tool-button:hover,
    .select-like:hover,
    .segmented button:hover,
    .icon-button:hover,
    .search:hover,
    .plain-button:hover {
      border-color: rgba(96, 165, 250, .45);
      background: rgba(12, 28, 50, .70);
    }
    .tool-button:active, .icon-button:active, .plain-button:active { transform: translateY(1px); }
    .tool-button svg, .select-like svg, .plain-button svg { width: 16px; height: 16px; color: #cbd9ec; }
    .tool-button.active, .plain-button.active {
      border-color: rgba(96,165,250,.55);
      background: rgba(59,130,246,.18);
      box-shadow: inset 0 0 20px rgba(59,130,246,.08);
    }
    .count-badge {
      display: inline-grid;
      place-items: center;
      min-width: 18px;
      height: 18px;
      padding: 0 5px;
      border-radius: 999px;
      font-size: 10px;
      font-weight: 900;
      color: #0b1421;
      background: var(--yellow);
      margin-left: -3px;
    }
    .count-badge.hidden { display: none; }

    .segmented {
      display: inline-flex;
      padding: 3px;
      gap: 3px;
      border: 1px solid rgba(129, 158, 193, .18);
      border-radius: 12px;
      background: rgba(7, 15, 27, .75);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.035);
      flex: 0 0 auto;
    }
    .segmented button {
      height: 30px;
      border: 0;
      padding: 0 11px;
      border-radius: 9px;
      color: var(--muted);
      background: transparent;
    }
    .segmented button.active {
      color: #f7fbff;
      background: linear-gradient(180deg, #3c7bf7, #2b5fe8);
      box-shadow: 0 8px 20px rgba(59,130,246,.28), inset 0 1px 0 rgba(255,255,255,.22);
    }

    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 12px 16px 0;
      min-width: 0;
    }
    .metric-grid {
      display: grid;
      grid-template-columns: repeat(8, minmax(130px, 1fr));
      gap: 12px;
      min-width: 0;
    }
    .metric-card {
      position: relative;
      min-height: 76px;
      display: grid;
      grid-template-columns: minmax(86px, auto) 1fr;
      align-items: center;
      gap: 10px;
      overflow: hidden;
      padding: 12px 12px 12px 14px;
      border: 1px solid rgba(129, 158, 193, .17);
      border-radius: var(--radius);
      background: linear-gradient(180deg, rgba(18, 34, 54, .78), rgba(11, 22, 37, .82));
      box-shadow: var(--card-shadow);
    }
    .metric-card::before {
      content: "";
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,.035), transparent);
      transform: translateX(-100%);
      animation: shimmer 8s ease-in-out infinite;
      pointer-events: none;
    }
    @keyframes shimmer {
      0%, 70% { transform: translateX(-110%); }
      100% { transform: translateX(110%); }
    }
    .metric-title {
      color: #d5deec;
      font-size: 12px;
      white-space: nowrap;
      margin-bottom: 7px;
    }
    .metric-value {
      display: inline-flex;
      align-items: baseline;
      gap: 5px;
      font-size: clamp(18px, 1.8vw, 25px);
      font-weight: 820;
      letter-spacing: -0.045em;
    }
    .metric-value small { font-size: 12px; color: #d6deea; font-weight: 700; letter-spacing: 0; }
    .sparkline {
      justify-self: stretch;
      width: 100%;
      height: 42px;
      opacity: .96;
      filter: drop-shadow(0 0 8px rgba(59,130,246,.16));
    }
    .sparkline path.line { fill: none; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
    .sparkline path.area { opacity: .15; }
    .sparkline.blue .line { stroke: var(--blue-2); }
    .sparkline.blue .area { fill: var(--blue); }
    .sparkline.green .line { stroke: var(--green); }
    .sparkline.green .area { fill: var(--green); }
    .sparkline.purple .line { stroke: #9d6bff; }
    .sparkline.purple .area { fill: #9d6bff; }
    .sparkline.cyan .line { stroke: var(--cyan); }
    .sparkline.cyan .area { fill: var(--cyan); }
    .sparkline.red .line { stroke: var(--red); }
    .sparkline.red .area { fill: var(--red); }
    body.hide-sparks .sparkline { opacity: .05; visibility: hidden; }

    .workspace {
      flex: 1;
      min-height: 0;
      display: grid;
      grid-template-columns: minmax(340px, .85fr) minmax(420px, 1.03fr) minmax(540px, 1.28fr);
      gap: 12px;
    }
    .panel {
      min-height: 650px;
      overflow: hidden;
      border: 1px solid rgba(129, 158, 193, .18);
      border-radius: var(--radius);
      background:
        radial-gradient(circle at 55% 0%, rgba(82, 150, 255, .07), transparent 28rem),
        linear-gradient(180deg, rgba(13, 26, 42, .91), rgba(8, 18, 30, .96));
      box-shadow: var(--card-shadow);
      display: flex;
      flex-direction: column;
      min-width: 0;
    }
    .panel-header {
      min-height: 54px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px 8px 14px;
      border-bottom: 1px solid var(--line);
      background: linear-gradient(180deg, rgba(15, 31, 51, .82), rgba(10, 22, 38, .58));
    }
    .panel-title-wrap { display: flex; flex-direction: column; gap: 2px; min-width: max-content; }
    .panel-title { font-size: 14px; font-weight: 850; text-transform: uppercase; letter-spacing: .02em; }
    .panel-subtitle { font-size: 11px; color: var(--muted-2); text-transform: none; letter-spacing: 0; }
    .panel-actions { margin-left: auto; display: flex; align-items: center; gap: 8px; min-width: 0; flex-wrap: wrap; justify-content: flex-end; }
    .search {
      height: 36px;
      width: min(100%, 220px);
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 8px;
      border: 1px solid rgba(129, 158, 193, .17);
      background: rgba(7, 16, 28, .70);
      padding: 0 10px;
      color: var(--muted);
      transition: border-color .15s ease, background .15s ease;
      min-width: 130px;
    }
    .search input { width: 100%; border: 0; outline: 0; color: var(--text); background: transparent; font-size: 13px; min-width: 0; }
    .search input::placeholder { color: #76879c; }
    .search svg { width: 16px; height: 16px; color: #a7b9cf; flex: 0 0 auto; }
    .icon-button { width: 38px; padding: 0; flex: 0 0 auto; }
    .icon-button.active {
      border-color: rgba(96, 165, 250, .60);
      background: linear-gradient(180deg, #3b82f6, #285ce1);
      box-shadow: 0 8px 20px rgba(59, 130, 246, .32), inset 0 1px 0 rgba(255,255,255,.20);
    }
    .icon-button svg { width: 17px; height: 17px; }
    .icon-button.warning { color: var(--yellow); border-color: rgba(248, 197, 27, .33); }
    .icon-button.danger { color: #ffb3b3; border-color: rgba(255,90,85,.28); }

    .column-head, .tree-row, .log-row {
      display: grid;
      align-items: center;
      min-width: 0;
      column-gap: 10px;
    }
    .column-head {
      color: #d1dbe9;
      height: 40px;
      padding: 0 14px;
      font-size: 12px;
      border-bottom: 1px solid var(--line);
      background: rgba(5, 13, 24, .22);
      position: sticky;
      top: 0;
      z-index: 3;
    }
    .table-scroll {
      overflow: auto;
      min-height: 0;
      flex: 1;
      scrollbar-width: thin;
      scrollbar-color: rgba(105, 135, 172, .52) rgba(10, 22, 37, .22);
      position: relative;
    }
    .table-scroll::-webkit-scrollbar { width: 9px; height: 9px; }
    .table-scroll::-webkit-scrollbar-track { background: rgba(10, 22, 37, .22); }
    .table-scroll::-webkit-scrollbar-thumb { background: rgba(105, 135, 172, .52); border-radius: 999px; }
    .table-inner { min-width: 0; }
    .logs-inner { min-width: 720px; }
    .process-inner { min-width: 640px; }
    .user-inner { min-width: 510px; }
    .tree-row, .log-row {
      min-height: var(--row-h);
      padding: 0 14px;
      border-bottom: 1px solid rgba(121, 151, 187, .105);
      color: #d8e3f2;
      font-size: 12.5px;
      transition: background .14s ease, border-color .14s ease, box-shadow .14s ease;
    }
    body.compact { --row-h: 31px; }
    body.compact .panel { min-height: 560px; }
    body.compact .metric-card { min-height: 66px; padding-top: 9px; padding-bottom: 9px; }
    .tree-row:hover, .log-row:hover { background: rgba(59, 130, 246, .07); }
    .tree-row.selected {
      background: linear-gradient(90deg, rgba(59, 130, 246, .18), rgba(59, 130, 246, .04));
      box-shadow: inset 3px 0 0 var(--blue-2);
      border-color: rgba(96, 165, 250, .24);
    }
    .tree-row.restricted-row { opacity: .75; }
    .tree-cell {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      overflow: hidden;
      padding-left: calc(var(--depth, 0) * 20px);
      position: relative;
    }
    .tree-row.tree-mode .tree-cell::before {
      content: "";
      position: absolute;
      left: calc(14px + var(--depth, 0) * 20px - 9px);
      top: 0;
      bottom: 0;
      border-left: 1px solid rgba(159, 176, 198, .20);
      display: var(--branch-display, none);
    }
    .tree-row.tree-mode.depth-1 .tree-cell::before,
    .tree-row.tree-mode.depth-2 .tree-cell::before,
    .tree-row.tree-mode.depth-3 .tree-cell::before,
    .tree-row.tree-mode.depth-4 .tree-cell::before { --branch-display: block; }
    .tree-cell strong {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 680;
    }
    .caret {
      width: 18px;
      height: 22px;
      flex: 0 0 18px;
      color: #a7bdd5;
      display: inline-grid;
      place-items: center;
      border-radius: 5px;
      cursor: pointer;
      transition: background .15s ease, transform .15s ease, color .15s ease;
      font-size: 17px;
      line-height: 1;
    }
    .caret:hover { background: rgba(96, 165, 250, .14); color: #e7f0ff; }
    .caret.empty { visibility: hidden; pointer-events: none; }
    .caret.collapsed { transform: rotate(-90deg); }
    .avatar, .proc-icon {
      width: 22px;
      height: 22px;
      display: inline-grid;
      place-items: center;
      flex: 0 0 auto;
      border-radius: 50%;
      color: #f7fbff;
      font-size: 11px;
      font-weight: 900;
      border: 1px solid rgba(255,255,255,.18);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.18), 0 0 14px rgba(59, 130, 246, .10);
      background: linear-gradient(180deg, #438aff, #2962df);
    }
    .avatar.root { background: linear-gradient(180deg, #65758d, #293749); color: #dce9f8; }
    .avatar.john { background: linear-gradient(180deg, #4b94ff, #235bdd); }
    .avatar.jane { background: linear-gradient(180deg, #a475ff, #6740c9); }
    .avatar.mike { background: linear-gradient(180deg, #42b6ff, #0e77c7); }
    .avatar.alex { background: linear-gradient(180deg, #42d79a, #138b59); }
    .avatar.service { background: linear-gradient(180deg, #748399, #34445a); }
    .avatar.nginx { background: linear-gradient(180deg, #35c36e, #11863f); }
    .avatar.postgres { background: linear-gradient(180deg, #5e95d8, #285184); }
    .avatar.docker { background: linear-gradient(180deg, #4db3ff, #1b72b9); }
    .proc-icon {
      border-radius: 7px;
      width: 20px;
      height: 20px;
      font-size: 10px;
      background: rgba(44, 58, 78, .92);
      color: #d7e7fa;
    }
    .proc-icon.js { color: #101820; background: #ffd500; border-color: #ffdd24; }
    .proc-icon.node { background: #164f28; color: #5aff7a; border-color: rgba(82, 227, 92, .4); }
    .proc-icon.nginx { background: #116c36; color: #abffc5; }
    .proc-icon.pg { background: #2b5b91; color: #d6ebff; }
    .proc-icon.docker { background: #1c65a5; color: #e5f4ff; }
    .proc-icon.shell { background: #111827; color: #dae7f7; }
    .proc-icon.chrome { background: conic-gradient(#ef4444, #f59e0b, #22c55e, #3b82f6, #ef4444); color: #fff; }
    .proc-icon.code { background: #1e6cbd; color: #e8f4ff; }
    .proc-icon.redis { background: #8d1d24; color: #ffe8e8; }
    .proc-icon.python { background: #19355f; color: #ffd86c; }
    .tag-you, .mini-tag, .permission-tag {
      display: inline-flex;
      align-items: center;
      height: 18px;
      padding: 0 6px;
      border-radius: 999px;
      font-size: 10px;
      line-height: 1;
      font-weight: 800;
      letter-spacing: .01em;
      white-space: nowrap;
    }
    .tag-you { color: #c7d9ff; background: rgba(59, 130, 246, .20); border: 1px solid rgba(96, 165, 250, .35); }
    .mini-tag { color: #cbd9ec; background: rgba(129, 158, 193, .12); border: 1px solid rgba(129, 158, 193, .20); }
    .permission-tag { color: #ffe8ad; background: rgba(245, 158, 11, .13); border: 1px solid rgba(245, 158, 11, .30); }
    .number-green { color: #62f45e; font-variant-numeric: tabular-nums; }
    .number-yellow { color: var(--yellow); font-variant-numeric: tabular-nums; }
    .number-red { color: var(--red); font-variant-numeric: tabular-nums; }
    .muted { color: var(--muted); }
    .tabular { font-variant-numeric: tabular-nums; }
    .mono { font-family: var(--font-mono); letter-spacing: -0.02em; }
    .status {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      color: #69ff70;
      white-space: nowrap;
    }
    .status::before {
      content: "";
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--green);
      box-shadow: 0 0 10px rgba(82, 227, 92, .65);
    }
    .status.idle { color: #ffd84d; }
    .status.idle::before { background: var(--yellow); box-shadow: 0 0 10px rgba(248, 197, 27, .62); }
    .status.stopped { color: #ff8787; }
    .status.stopped::before { background: var(--red); box-shadow: 0 0 10px rgba(255, 90, 85, .62); }
    .status.restricted { color: #9fb0c6; }
    .status.restricted::before { background: #91a4bb; box-shadow: none; }
    .severity {
      justify-content: center;
      height: 23px;
      min-width: 52px;
      padding: 0 8px;
      border-radius: 6px;
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 800;
      letter-spacing: -.02em;
    }
    .severity.info { color: #6fb6ff; background: rgba(37, 99, 235, .22); border: 1px solid rgba(59, 130, 246, .22); }
    .severity.debug { color: #c8d3e1; background: rgba(124, 144, 169, .18); border: 1px solid rgba(124, 144, 169, .16); }
    .severity.warn { color: #ffd400; background: rgba(245, 158, 11, .22); border: 1px solid rgba(245, 158, 11, .26); }
    .severity.error { color: #ff7974; background: rgba(220, 38, 38, .24); border: 1px solid rgba(239, 68, 68, .25); }
    .msg.info { color: #d7e5f8; }
    .msg.debug { color: #cbd5e1; }
    .msg.warn { color: #ffd400; }
    .msg.error { color: #ff7974; }

    .legend {
      min-height: 44px;
      display: flex;
      align-items: center;
      gap: 22px;
      padding: 0 18px;
      border-top: 1px solid rgba(121,151,187,.14);
      background: rgba(8, 17, 29, .62);
      color: #cbd5e1;
      font-size: 12px;
      flex-wrap: wrap;
    }
    .legend-item { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
    .legend-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--green);
      box-shadow: 0 0 10px rgba(82,227,92,.4);
    }
    .legend-dot.idle { background: var(--yellow); box-shadow: 0 0 10px rgba(248,197,27,.4); }
    .legend-dot.restricted { background: #91a4bb; box-shadow: none; }
    .legend-dot.system { background: #8b5cf6; box-shadow: 0 0 10px rgba(139,92,246,.4); }
    .legend-dot.high { background: var(--orange); box-shadow: 0 0 10px rgba(255,153,28,.4); }
    .legend-dot.stop { background: var(--red); box-shadow: 0 0 10px rgba(255,90,85,.4); }

    .side-note {
      margin: 24px 38px;
      min-height: 92px;
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 16px 18px;
      color: #c7d5e8;
      border: 1px solid rgba(59, 130, 246, .34);
      border-radius: 9px;
      background: linear-gradient(180deg, rgba(26, 83, 161, .18), rgba(17, 43, 79, .15));
      box-shadow: inset 0 1px 0 rgba(255,255,255,.045);
    }
    .side-note svg { width: 32px; height: 32px; color: var(--blue-2); flex: 0 0 auto; }
    .side-note strong { display: block; font-size: 13px; margin-bottom: 5px; }
    .side-note span { display: block; color: #a8b7cb; font-size: 12px; line-height: 1.4; }
    .empty-state {
      min-height: 100%;
      display: grid;
      place-items: center;
      padding: 32px;
      color: #b6c7dc;
      text-align: center;
    }
    .empty-card { max-width: 390px; }
    .empty-icon { width: 64px; height: 64px; margin-bottom: 14px; color: #7f93ad; opacity: .9; }
    .empty-card h2 { font-size: 19px; margin: 0 0 8px; color: #edf5ff; letter-spacing: -0.04em; }
    .empty-card p { margin: 0; color: #98a9bd; line-height: 1.5; font-size: 13px; }

    .footer {
      min-height: 48px;
      display: flex;
      align-items: center;
      gap: 22px;
      padding: 8px 18px;
      border-top: 1px solid var(--line);
      background: rgba(5, 13, 24, .78);
      color: #c9d6e7;
      font-size: 13px;
      flex-wrap: wrap;
    }
    .footer-item { display: inline-flex; align-items: center; gap: 8px; white-space: nowrap; }
    .footer svg { width: 17px; height: 17px; color: #a7bbd4; }
    .footer strong { color: #f2f7ff; font-weight: 700; }
    .footer .push { margin-left: auto; }
    .mini-spark { width: 92px; height: 24px; }
    .switch {
      width: 38px;
      height: 20px;
      padding: 2px;
      display: inline-flex;
      align-items: center;
      border-radius: 999px;
      background: linear-gradient(180deg, #3c7bf7, #2b5fe8);
      border: 1px solid rgba(255,255,255,.12);
      box-shadow: inset 0 1px 0 rgba(255,255,255,.22), 0 0 18px rgba(59,130,246,.22);
      cursor: pointer;
    }
    .switch span {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background: #fff;
      margin-left: 16px;
      transition: margin .15s ease;
      box-shadow: 0 1px 6px rgba(0,0,0,.32);
    }
    .switch.off { background: rgba(99, 113, 134, .30); }
    .switch.off span { margin-left: 0; }

    .popover {
      position: fixed;
      z-index: 10000;
      width: min(360px, calc(100vw - 24px));
      max-height: calc(100vh - 90px);
      overflow: auto;
      display: none;
      padding: 12px;
      border: 1px solid rgba(129, 158, 193, .24);
      border-radius: 12px;
      background: rgba(8, 18, 32, .98);
      box-shadow: 0 26px 90px rgba(0,0,0,.58), inset 0 1px 0 rgba(255,255,255,.04);
      backdrop-filter: blur(18px);
    }
    .popover.open { display: block; }
    .popover h3 { margin: 0 0 8px; font-size: 14px; letter-spacing: -0.03em; }
    .popover p { margin: 0 0 10px; color: var(--muted); font-size: 12px; line-height: 1.4; }
    .popover-section { padding: 10px; border: 1px solid rgba(129,158,193,.13); border-radius: 10px; background: rgba(12, 26, 44, .52); margin-top: 10px; }
    .popover-section:first-of-type { margin-top: 0; }
    .popover-title { font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: #9cb0c8; margin-bottom: 8px; font-weight: 900; }
    .check-row, .radio-row, .setting-row {
      min-height: 30px;
      display: flex;
      align-items: center;
      gap: 10px;
      color: #dce7f6;
      font-size: 13px;
    }
    .setting-row { justify-content: space-between; gap: 16px; }
    .check-row input, .radio-row input { accent-color: #3b82f6; width: 15px; height: 15px; }
    .settings-select, .mini-input {
      height: 30px;
      border: 1px solid rgba(129,158,193,.2);
      border-radius: 8px;
      color: var(--text);
      background: rgba(5, 13, 24, .65);
      padding: 0 8px;
      outline: none;
    }
    .mini-input { width: 78px; }
    .popover-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px; }
    .plain-button { height: 32px; padding: 0 10px; font-size: 12px; }
    .plain-button.primary { background: linear-gradient(180deg, #3b82f6, #285ce1); border-color: rgba(96,165,250,.6); color: #fff; }
    .plain-button.danger { color: #ffc1c1; border-color: rgba(239,68,68,.3); }

    .alert-item {
      padding: 10px;
      border-radius: 9px;
      background: rgba(11, 24, 40, .72);
      border: 1px solid rgba(129,158,193,.12);
      margin-top: 8px;
    }
    .alert-item strong { display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 13px; }
    .alert-item span { display: block; color: #aab9cc; font-size: 12px; margin-top: 4px; line-height: 1.35; }

    .toast-stack {
      position: fixed;
      right: 18px;
      bottom: 64px;
      z-index: 11000;
      display: grid;
      gap: 8px;
      pointer-events: none;
    }
    .toast {
      padding: 10px 12px;
      border: 1px solid rgba(96,165,250,.32);
      border-radius: 10px;
      color: #eaf3ff;
      background: rgba(11, 24, 40, .96);
      box-shadow: 0 18px 50px rgba(0,0,0,.40);
      font-size: 12px;
      animation: toastIn .18s ease both;
    }
    @keyframes toastIn { from { transform: translateY(6px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    .highlight-pulse { animation: highlightPulse 1.1s ease; }
    @keyframes highlightPulse {
      0% { box-shadow: inset 0 0 0 rgba(96,165,250,0), 0 0 0 rgba(96,165,250,0); }
      30% { box-shadow: inset 3px 0 0 var(--blue-2), 0 0 0 1px rgba(96,165,250,.35); }
      100% { box-shadow: inset 0 0 0 rgba(96,165,250,0), 0 0 0 rgba(96,165,250,0); }
    }


    /* ----------------------------------------------------------------------
       Theme system: dark mode is the default. Light mode overrides the same
       component tokens without changing the markup structure.
       ---------------------------------------------------------------------- */
    :root[data-theme="dark"] { color-scheme: dark; }
    :root[data-theme="light"] {
      color-scheme: light;
      --body-bg:
        radial-gradient(circle at 12% 5%, rgba(59, 130, 246, .18), transparent 28rem),
        radial-gradient(circle at 84% 8%, rgba(31, 194, 107, .12), transparent 26rem),
        radial-gradient(circle at 50% 106%, rgba(139, 92, 246, .11), transparent 35rem),
        linear-gradient(180deg, #f8fbff 0%, #eef4fb 58%, #e8eef7 100%);
      --bg: #f5f8fc;
      --bg-2: #eef4fb;
      --panel: rgba(255, 255, 255, .90);
      --panel-2: rgba(248, 251, 255, .97);
      --panel-3: rgba(239, 246, 255, .82);
      --line: rgba(71, 85, 105, .18);
      --line-strong: rgba(59, 130, 246, .34);
      --text: #0f172a;
      --muted: #536174;
      --muted-2: #718096;
      --blue: #2563eb;
      --blue-2: #2563eb;
      --green: #16a34a;
      --green-2: #15803d;
      --yellow: #b77905;
      --orange: #ea580c;
      --red: #dc2626;
      --purple: #7c3aed;
      --cyan: #0891b2;
      --card-shadow: 0 18px 48px rgba(15, 23, 42, .11), inset 0 1px 0 rgba(255, 255, 255, .78);
    }
    :root[data-theme="light"] body::before {
      background-image:
        linear-gradient(rgba(15, 23, 42, .045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(15, 23, 42, .035) 1px, transparent 1px);
      mask-image: linear-gradient(180deg, rgba(0,0,0,.38), transparent 78%);
    }
    :root[data-theme="light"] .app { background: rgba(255,255,255,.26); border-color: rgba(71,85,105,.14); }
    :root[data-theme="light"] .topbar { background: rgba(255,255,255,.86); }
    :root[data-theme="light"] .tool-button,
    :root[data-theme="light"] .select-like,
    :root[data-theme="light"] .segmented button,
    :root[data-theme="light"] .icon-button,
    :root[data-theme="light"] .plain-button {
      color: var(--text);
      border-color: rgba(71,85,105,.20);
      background: rgba(255,255,255,.72);
    }
    :root[data-theme="light"] .tool-button:hover,
    :root[data-theme="light"] .select-like:hover,
    :root[data-theme="light"] .segmented button:hover,
    :root[data-theme="light"] .icon-button:hover,
    :root[data-theme="light"] .search:hover,
    :root[data-theme="light"] .plain-button:hover { background: rgba(239,246,255,.96); border-color: rgba(37,99,235,.42); }
    :root[data-theme="light"] .tool-button svg,
    :root[data-theme="light"] .select-like svg,
    :root[data-theme="light"] .plain-button svg { color: #334155; }
    :root[data-theme="light"] .segmented { background: rgba(226,232,240,.72); border-color: rgba(71,85,105,.18); }
    :root[data-theme="light"] .segmented button.active,
    :root[data-theme="light"] .icon-button.active { color: #fff; background: linear-gradient(180deg, #3b82f6, #2563eb); }
    :root[data-theme="light"] .metric-card {
      border-color: rgba(71,85,105,.17);
      background: linear-gradient(180deg, rgba(255,255,255,.94), rgba(239,246,255,.90));
    }
    :root[data-theme="light"] .metric-title,
    :root[data-theme="light"] .metric-value small,
    :root[data-theme="light"] .column-head,
    :root[data-theme="light"] .tree-row,
    :root[data-theme="light"] .log-row,
    :root[data-theme="light"] .legend,
    :root[data-theme="light"] .footer { color: #334155; }
    :root[data-theme="light"] .panel {
      border-color: rgba(71,85,105,.18);
      background: radial-gradient(circle at 55% 0%, rgba(59,130,246,.11), transparent 28rem), linear-gradient(180deg, rgba(255,255,255,.94), rgba(245,248,252,.96));
    }
    :root[data-theme="light"] .panel-header { background: linear-gradient(180deg, rgba(248,250,252,.96), rgba(239,246,255,.74)); }
    :root[data-theme="light"] .search { background: rgba(255,255,255,.82); border-color: rgba(71,85,105,.20); }
    :root[data-theme="light"] .search input::placeholder { color: #8490a3; }
    :root[data-theme="light"] .search svg { color: #64748b; }
    :root[data-theme="light"] .column-head { background: rgba(241,245,249,.72); }
    :root[data-theme="light"] .tree-row,
    :root[data-theme="light"] .log-row { border-bottom-color: rgba(71,85,105,.12); }
    :root[data-theme="light"] .tree-row:hover,
    :root[data-theme="light"] .log-row:hover { background: rgba(37,99,235,.065); }
    :root[data-theme="light"] .tree-row.selected { background: linear-gradient(90deg, rgba(37,99,235,.15), rgba(37,99,235,.04)); }
    :root[data-theme="light"] .caret { color: #64748b; }
    :root[data-theme="light"] .caret:hover { color: #1d4ed8; background: rgba(37,99,235,.10); }
    :root[data-theme="light"] .legend { background: rgba(248,250,252,.86); border-top-color: rgba(71,85,105,.14); }
    :root[data-theme="light"] .side-note { color: #1e293b; background: linear-gradient(180deg, rgba(219,234,254,.80), rgba(239,246,255,.86)); }
    :root[data-theme="light"] .side-note span,
    :root[data-theme="light"] .empty-state,
    :root[data-theme="light"] .empty-card p { color: #64748b; }
    :root[data-theme="light"] .empty-card h2 { color: #0f172a; }
    :root[data-theme="light"] .footer { background: rgba(255,255,255,.82); }
    :root[data-theme="light"] .footer strong { color: #0f172a; }
    :root[data-theme="light"] .popover {
      border-color: rgba(71,85,105,.22);
      background: rgba(255,255,255,.98);
      box-shadow: 0 26px 80px rgba(15,23,42,.23), inset 0 1px 0 rgba(255,255,255,.82);
    }
    :root[data-theme="light"] .popover-section,
    :root[data-theme="light"] .alert-item { background: rgba(241,245,249,.78); border-color: rgba(71,85,105,.14); }
    :root[data-theme="light"] .popover-title { color: #475569; }
    :root[data-theme="light"] .check-row,
    :root[data-theme="light"] .radio-row,
    :root[data-theme="light"] .setting-row { color: #1e293b; }
    :root[data-theme="light"] .settings-select,
    :root[data-theme="light"] .mini-input { color: var(--text); background: rgba(255,255,255,.82); border-color: rgba(71,85,105,.22); }
    :root[data-theme="light"] .toast { color: #0f172a; background: rgba(255,255,255,.98); box-shadow: 0 18px 48px rgba(15,23,42,.18); }
    :root[data-theme="light"] .number-green { color: #15803d; }
    :root[data-theme="light"] .status { color: #15803d; }
    :root[data-theme="light"] .msg.info { color: #1f2937; }
    :root[data-theme="light"] .msg.debug { color: #475569; }
    :root[data-theme="light"] .msg.warn { color: #a16207; }
    :root[data-theme="light"] .msg.error { color: #dc2626; }

    body.high-contrast {
      --line: rgba(174, 201, 234, .28);
      --muted: #c1cce0;
      --text: #f7fbff;
    }
    body.reduce-motion *, body.reduce-motion *::before, body.reduce-motion *::after { animation: none !important; transition: none !important; }
    .fullscreen-fallback .app { position: fixed; inset: 0; z-index: 999; overflow: auto; }

    @media (max-width: 1480px) {
      .metric-grid { grid-template-columns: repeat(4, minmax(150px, 1fr)); }
      .workspace { grid-template-columns: minmax(320px, .9fr) minmax(390px, 1.1fr); }
      .logs-panel { grid-column: 1 / -1; min-height: 520px; }
    }
    @media (max-width: 960px) {
      .topbar { align-items: flex-start; flex-direction: column; }
      .toolbar { margin-left: 0; justify-content: flex-start; width: 100%; }
      .metric-grid { grid-template-columns: repeat(2, minmax(150px, 1fr)); }
      .workspace { grid-template-columns: 1fr; }
      .panel { min-height: 500px; }
      .panel-header { align-items: flex-start; flex-direction: column; }
      .panel-actions { margin-left: 0; justify-content: flex-start; width: 100%; }
      .search { width: min(100%, 260px); }
      .footer .push { margin-left: 0; }
    }
    @media (max-width: 560px) {
      .content { padding: 10px 10px 0; }
      .metric-grid { grid-template-columns: 1fr; }
      .metric-card { grid-template-columns: 1fr auto; }
      .tool-button .label, .plain-button .label { display: none; }
      .tool-button, .plain-button { padding: 0 10px; }
      .segmented { width: 100%; }
      .segmented button { flex: 1; }
      .brand { flex-wrap: wrap; }
      .footer { gap: 12px; }
      .legend { gap: 12px; }
    }
  </style>
</head>
<body>
  <!-- APP SHELL: full-page responsive monitoring dashboard. -->
  <main class="app" id="app">
    <!-- TOP BAR: brand, preview persona switch, and global dashboard controls. -->
    <header class="topbar">
      <div class="brand">
        <div class="pulse-logo" aria-hidden="true">
          <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22h6l3-9 5 22 5-30 5 17h10"/></svg>
        </div>
        <h1>Process Monitor</h1>
        <span id="liveBadge" class="live-badge">LIVE</span>
      </div>

      <div class="segmented" aria-label="Preview mode">
        <button id="rootViewBtn" type="button" class="active">Root User</button>
        <button id="normalViewBtn" type="button">Normal User</button>
      </div>

      <nav class="toolbar" aria-label="Global actions">
        <button id="topPauseBtn" class="tool-button" type="button" aria-pressed="false" title="Pause or resume live updates">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M8 5v14M16 5v14" stroke-linecap="round"/></svg><span class="label">Pause</span>
        </button>
        <button id="filterBtn" class="tool-button" type="button" title="Open filters">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 5h18l-7 8v5l-4 2v-7z" stroke-linejoin="round"/></svg><span class="label">Filter</span><span id="filterBadge" class="count-badge hidden">0</span>
        </button>
        <button id="columnsBtn" class="tool-button" type="button" title="Choose visible columns">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="5" width="5" height="14" rx="1"/><rect x="10" y="5" width="5" height="14" rx="1"/><rect x="16" y="5" width="5" height="14" rx="1"/></svg><span class="label">Columns</span>
        </button>
        <button id="alertsBtn" class="tool-button" type="button" title="Open active alerts">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2Z"/><path d="M18 16v-5a6 6 0 0 0-12 0v5l-2 2h20z" stroke-linejoin="round"/></svg><span class="label">Alerts</span><span id="alertBadge" class="count-badge">3</span>
        </button>
        <button id="settingsBtn" class="tool-button" type="button" title="Open settings">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.4 1.1V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-.4-1.1 1.7 1.7 0 0 0-1-.6 1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1 1.7 1.7 0 0 0-1.1-.4H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.2 9a1.7 1.7 0 0 0 .6-1 1.7 1.7 0 0 0-.34-1.88l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.7 1.7 0 0 0 9 4.6c.38-.15.73-.35 1-.6.28-.28.43-.67.4-1.1V3a2 2 0 1 1 4 0v.1c-.03.43.12.82.4 1.1.27.25.62.45 1 .6a1.7 1.7 0 0 0 1.88-.34l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.7 1.7 0 0 0 19.4 9c.15.38.35.73.6 1 .28.28.67.43 1.1.4h.1a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.1.4c-.25.27-.45.62-.6 1Z" stroke-linejoin="round"/></svg><span class="label">Settings</span>
        </button>
        <button id="themeToggleBtn" class="tool-button" type="button" aria-pressed="false" title="Switch between light and dark mode">
          <svg id="themeIcon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke-linecap="round"/><circle cx="12" cy="12" r="4"/></svg><span id="themeLabel" class="label">Light</span>
        </button>
        <button id="fullscreenBtn" class="tool-button" type="button" title="Toggle fullscreen">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3H3v5M16 3h5v5M8 21H3v-5M21 16v5h-5" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </button>
        <button id="timeRangeBtn" class="select-like" type="button" title="Choose time range"><span id="timeRangeLabel">Last 5 minutes</span><span aria-hidden="true">⌄</span></button>
      </nav>
    </header>

    <section class="content">
      <!-- SYSTEM METRICS: realtime KPI cards with compact sparklines. -->
      <section class="metric-grid" aria-label="System metrics">
        <article class="metric-card"><div><div class="metric-title">Total Processes</div><div class="metric-value"><span id="metricTotalProcesses">128</span></div></div><svg class="sparkline blue" viewBox="0 0 96 42" preserveAspectRatio="none"><path class="area" d="M0 36 L8 35 L16 28 L24 18 L32 20 L40 18 L48 20 L56 19 L64 24 L72 21 L80 23 L88 10 L96 8 L96 42 L0 42Z"/><path class="line" d="M0 36 L8 35 L16 28 L24 18 L32 20 L40 18 L48 20 L56 19 L64 24 L72 21 L80 23 L88 10 L96 8"/></svg></article>
        <article class="metric-card"><div><div class="metric-title">Total Users</div><div class="metric-value"><span id="metricTotalUsers">12</span></div></div><svg class="sparkline blue" viewBox="0 0 96 42" preserveAspectRatio="none"><path class="area" d="M0 35 L9 31 L18 34 L27 23 L36 33 L45 26 L54 30 L63 17 L72 28 L81 16 L90 24 L96 18 L96 42 L0 42Z"/><path class="line" d="M0 35 L9 31 L18 34 L27 23 L36 33 L45 26 L54 30 L63 17 L72 28 L81 16 L90 24 L96 18"/></svg></article>
        <article class="metric-card"><div><div class="metric-title">CPU Usage</div><div class="metric-value"><span id="metricCpu">23.7</span><small>%</small></div></div><svg class="sparkline green" viewBox="0 0 96 42" preserveAspectRatio="none"><path class="area" d="M0 35 L10 30 L20 22 L30 23 L40 31 L50 31 L60 27 L70 29 L80 18 L90 8 L96 10 L96 42 L0 42Z"/><path class="line" d="M0 35 L10 30 L20 22 L30 23 L40 31 L50 31 L60 27 L70 29 L80 18 L90 8 L96 10"/></svg></article>
        <article class="metric-card"><div><div class="metric-title">Memory Usage</div><div class="metric-value"><span id="metricMemory">4.2</span><small>GB / 15.6 GB</small></div></div><svg class="sparkline purple" viewBox="0 0 96 42" preserveAspectRatio="none"><path class="area" d="M0 35 L8 30 L16 28 L24 18 L32 23 L40 22 L48 28 L56 23 L64 30 L72 27 L80 29 L88 18 L96 20 L96 42 L0 42Z"/><path class="line" d="M0 35 L8 30 L16 28 L24 18 L32 23 L40 22 L48 28 L56 23 L64 30 L72 27 L80 29 L88 18 L96 20"/></svg></article>
        <article class="metric-card"><div><div class="metric-title">Selected User CPU</div><div class="metric-value"><span id="metricUserCpu">8.6%</span></div></div><svg class="sparkline green" viewBox="0 0 96 42" preserveAspectRatio="none"><path class="area" d="M0 36 L10 33 L20 31 L30 34 L40 30 L50 26 L60 24 L70 21 L80 25 L90 19 L96 16 L96 42 L0 42Z"/><path class="line" d="M0 36 L10 33 L20 31 L30 34 L40 30 L50 26 L60 24 L70 21 L80 25 L90 19 L96 16"/></svg></article>
        <article class="metric-card"><div><div class="metric-title">Network I/O</div><div class="metric-value"><span id="metricNetwork">1.3</span><small>Gb/s</small></div></div><svg class="sparkline cyan" viewBox="0 0 96 42" preserveAspectRatio="none"><path class="area" d="M0 36 L8 34 L16 28 L24 30 L32 22 L40 25 L48 19 L56 22 L64 16 L72 18 L80 14 L88 12 L96 5 L96 42 L0 42Z"/><path class="line" d="M0 36 L8 34 L16 28 L24 30 L32 22 L40 25 L48 19 L56 22 L64 16 L72 18 L80 14 L88 12 L96 5"/></svg></article>
        <article class="metric-card"><div><div class="metric-title">Active Alerts</div><div class="metric-value"><span id="metricAlerts">3</span></div></div><svg class="sparkline red" viewBox="0 0 96 42" preserveAspectRatio="none"><path class="area" d="M0 34 L8 32 L16 31 L24 33 L32 35 L40 34 L48 34 L56 33 L64 32 L72 34 L80 20 L88 17 L96 12 L96 42 L0 42Z"/><path class="line" d="M0 34 L8 32 L16 31 L24 33 L32 35 L40 34 L48 34 L56 33 L64 32 L72 34 L80 20 L88 17 L96 12"/></svg></article>
        <article class="metric-card"><div><div class="metric-title">System Uptime</div><div class="metric-value"><span>5d</span><small>14h 22m</small></div></div></article>
      </section>

      <!-- WORKSPACE: three main panels arranged responsively. -->
      <section class="workspace" aria-label="Monitoring workspace">
        <!-- USER TREE PANEL: users only; no process children are rendered here. -->
        <section class="panel user-panel" aria-label="User tree">
          <div class="panel-header">
            <div class="panel-title-wrap">
              <div class="panel-title">User Tree</div>
              <div class="panel-subtitle">Summary-only users. Click a user to load processes.</div>
            </div>
            <div class="panel-actions">
              <label class="search" aria-label="Search users"><input id="userSearch" type="search" placeholder="Search users..." autocomplete="off" /><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4.2-4.2" stroke-linecap="round"/></svg></label>
              <button id="userExpandBtn" class="icon-button" type="button" title="Expand or collapse user tree"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
              <button id="userTreeBtn" class="icon-button active" type="button" title="User tree view"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4v6M12 10H7v5M12 10h5v5"/><circle cx="12" cy="4" r="2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg></button>
              <button id="userListBtn" class="icon-button" type="button" title="User list view"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01" stroke-linecap="round"/></svg></button>
            </div>
          </div>
          <div class="table-inner user-inner"><div id="userHead" class="column-head"></div></div>
          <div class="table-scroll" id="userScroll"><div class="table-inner user-inner" id="usersTable"></div><aside class="side-note" aria-label="Interaction hint"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01" stroke-linecap="round"/></svg><div><strong>Users stay summary-only</strong><span>The User Tree does not show child processes. Select a user to refresh the Process Tree and live logs.</span></div></aside></div>
          <div class="legend"><span class="legend-item"><i class="legend-dot"></i>Active</span><span class="legend-item"><i class="legend-dot idle"></i>Idle</span><span class="legend-item"><i class="legend-dot restricted"></i>Restricted</span><span class="legend-item"><i class="legend-dot system"></i>System</span></div>
        </section>

        <!-- PROCESS TREE PANEL: populated when a user row is selected. -->
        <section class="panel process-panel" aria-label="Process tree">
          <div class="panel-header">
            <div class="panel-title-wrap"><div class="panel-title">Process Tree</div><div class="panel-subtitle" id="processSubtitle">root selected · privileged process scope</div></div>
            <div class="panel-actions">
              <label class="search" aria-label="Search processes"><input id="processSearch" type="search" placeholder="Search processes..." autocomplete="off" /><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4.2-4.2" stroke-linecap="round"/></svg></label>
              <button id="processExpandBtn" class="icon-button" type="button" title="Expand or collapse process tree"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
              <button id="processTreeBtn" class="icon-button active" type="button" title="Process tree view"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 4v6M12 10H7v5M12 10h5v5"/><circle cx="12" cy="4" r="2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg></button>
              <button id="processListBtn" class="icon-button" type="button" title="Process list view"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01" stroke-linecap="round"/></svg></button>
            </div>
          </div>
          <div class="table-inner process-inner"><div id="processHead" class="column-head"></div></div>
          <div class="table-scroll" id="processScroll"><div class="table-inner process-inner" id="processTable"></div></div>
          <div class="legend"><span class="legend-item"><i class="legend-dot"></i>Running</span><span class="legend-item"><i class="legend-dot idle"></i>Sleeping</span><span class="legend-item"><i class="legend-dot high"></i>High CPU</span><span class="legend-item"><i class="legend-dot stop"></i>Stopped</span><span class="legend-item"><i class="legend-dot restricted"></i>Zombie</span></div>
        </section>

        <!-- REAL-TIME LOGS PANEL: rows are filtered by the selected user/process scope. -->
        <section class="panel logs-panel" aria-label="Real-time logs">
          <div class="panel-header">
            <div class="panel-title-wrap"><div class="panel-title">Real-time Logs <span id="streamingLabel" class="streaming">Streaming</span></div><div class="panel-subtitle" id="logsSubtitle">Filtered by root process scope</div></div>
            <div class="panel-actions">
              <button id="logScopeBtn" class="select-like" type="button" aria-label="Log process filter"><span id="logFilterLabel">root scope</span><span aria-hidden="true">⌄</span></button>
              <label class="search" aria-label="Search logs"><input id="logSearch" type="search" placeholder="Search logs..." autocomplete="off" /><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-4.2-4.2" stroke-linecap="round"/></svg></label>
              <button id="logPauseBtn" class="icon-button" type="button" title="Pause logs" aria-label="Pause logs"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="M8 5v14M16 5v14" stroke-linecap="round"/></svg></button>
              <button id="clearLogsBtn" class="icon-button danger" type="button" title="Clear current logs" aria-label="Clear logs"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M8 6V4h8v2M6 6l1 16h10l1-16" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
            </div>
          </div>
          <div class="table-inner logs-inner"><div id="logsHead" class="column-head"></div></div>
          <div class="table-scroll" id="logsScroll"><div class="table-inner logs-inner" id="logsTable"></div></div>
        </section>
      </section>
    </section>

    <!-- FOOTER STATUS BAR: global status, autoscroll, and log line limit. -->
    <footer class="footer" aria-label="Status bar">
      <span class="footer-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" stroke-linecap="round"/></svg> System Uptime: <strong>5d 14h 22m</strong></span>
      <span class="footer-item"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" stroke-linecap="round"/></svg> Load Average: <strong>0.42&nbsp; 0.38&nbsp; 0.35</strong></span>
      <span class="footer-item"><span class="status-dot-label"><span class="dot" aria-hidden="true"></span> Last Updated:</span> <strong id="lastUpdated">10:24:33</strong></span>
      <span class="footer-item push">CPU: <strong id="footerCpu">23.7%</strong><svg class="sparkline green mini-spark" viewBox="0 0 96 24" preserveAspectRatio="none"><path class="line" d="M0 19 L8 17 L16 20 L24 11 L32 16 L40 13 L48 18 L56 10 L64 12 L72 5 L80 16 L88 8 L96 11"/></svg></span>
      <span class="footer-item">Auto-scroll <span id="footerAutoScroll" class="switch" role="switch" aria-checked="true" tabindex="0"><span></span></span></span>
      <span class="footer-item">Log Lines: <button id="logLinesBtn" class="select-like" type="button"><strong id="logLineCount">5000</strong>⌄</button></span>
    </footer>
  </main>

  <!-- FLOATING POPOVERS: rendered outside the app shell so they can layer above every panel. -->
  <!-- Filters popover: log-level, process-status, and CPU-threshold controls. -->
  <div id="filterPopover" class="popover" role="dialog" aria-label="Filters">
    <h3>Filters</h3>
    <p>Filters apply immediately to the Process Tree and Real-time Logs.</p>
    <div class="popover-section"><div class="popover-title">Log levels</div><label class="check-row"><input type="checkbox" data-filter-level="INFO" checked> INFO</label><label class="check-row"><input type="checkbox" data-filter-level="DEBUG" checked> DEBUG</label><label class="check-row"><input type="checkbox" data-filter-level="WARN" checked> WARN</label><label class="check-row"><input type="checkbox" data-filter-level="ERROR" checked> ERROR</label></div>
    <div class="popover-section"><div class="popover-title">Process status</div><label class="check-row"><input type="checkbox" data-filter-status="Running" checked> Running</label><label class="check-row"><input type="checkbox" data-filter-status="Sleeping" checked> Sleeping</label><label class="check-row"><input type="checkbox" data-filter-status="Stopped" checked> Stopped</label><label class="check-row"><input type="checkbox" data-filter-status="Zombie" checked> Zombie</label></div>
    <div class="popover-section"><div class="popover-title">CPU threshold</div><div class="setting-row"><span>Minimum CPU %</span><input id="minCpuInput" class="mini-input" type="number" min="0" max="100" step="0.1" value="0"></div></div>
    <div class="popover-actions"><button id="resetFiltersBtn" class="plain-button" type="button">Reset</button><button class="plain-button primary" type="button" data-close-popover>Done</button></div>
  </div>

  <!-- Columns popover: live column visibility chooser for each table. -->
  <div id="columnsPopover" class="popover" role="dialog" aria-label="Column chooser">
    <h3>Columns</h3>
    <p>Show or hide columns in each panel. Name and Message columns stay enabled for readability.</p>
    <div class="popover-section"><div class="popover-title">User Tree</div><div id="userColumnChecks"></div></div>
    <div class="popover-section"><div class="popover-title">Process Tree</div><div id="processColumnChecks"></div></div>
    <div class="popover-section"><div class="popover-title">Real-time Logs</div><div id="logColumnChecks"></div></div>
    <div class="popover-actions"><button id="resetColumnsBtn" class="plain-button" type="button">Reset columns</button><button class="plain-button primary" type="button" data-close-popover>Done</button></div>
  </div>

  <!-- Settings popover: visual density, theme, refresh, and layout controls. -->
  <div id="settingsPopover" class="popover" role="dialog" aria-label="Settings">
    <h3>Settings</h3>
    <p>These switches update the mock UI immediately.</p>
    <div class="popover-section"><div class="setting-row"><span>Theme</span><select id="themeModeSelect" class="settings-select"><option value="dark" selected>Dark</option><option value="light">Light</option><option value="system">System</option></select></div><div class="setting-row"><span>Compact rows</span><span id="compactSwitch" class="switch off" role="switch" tabindex="0" aria-checked="false"><span></span></span></div><div class="setting-row"><span>Show metric sparklines</span><span id="sparksSwitch" class="switch" role="switch" tabindex="0" aria-checked="true"><span></span></span></div><div class="setting-row"><span>High contrast</span><span id="contrastSwitch" class="switch off" role="switch" tabindex="0" aria-checked="false"><span></span></span></div><div class="setting-row"><span>Reduce motion</span><span id="motionSwitch" class="switch off" role="switch" tabindex="0" aria-checked="false"><span></span></span></div></div>
    <div class="popover-section"><div class="setting-row"><span>Refresh interval</span><select id="refreshSelect" class="settings-select"><option value="800">0.8 sec</option><option value="1400" selected>1.4 sec</option><option value="3000">3 sec</option></select></div><div class="setting-row"><span>Log line cap</span><select id="settingsLogLines" class="settings-select"><option>1000</option><option selected>5000</option><option>10000</option></select></div></div>
    <div class="popover-actions"><button id="resetLayoutBtn" class="plain-button danger" type="button">Reset layout</button><button class="plain-button primary" type="button" data-close-popover>Done</button></div>
  </div>

  <!-- Alerts popover: alert inbox for the current mock session. -->
  <div id="alertsPopover" class="popover" role="dialog" aria-label="Alerts">
    <h3>Active Alerts</h3>
    <p>Current alerts for the selected process scope.</p>
    <div id="alertsList"></div>
    <div class="popover-actions"><button id="markAlertsReadBtn" class="plain-button" type="button">Mark all read</button><button class="plain-button primary" type="button" data-close-popover>Done</button></div>
  </div>

  <!-- Time range popover: controls the displayed monitoring window label. -->
  <div id="timePopover" class="popover" role="dialog" aria-label="Time range">
    <h3>Time Range</h3>
    <div class="popover-section" id="timeRangeChoices"><label class="radio-row"><input type="radio" name="timeRange" value="Last 1 minute"> Last 1 minute</label><label class="radio-row"><input type="radio" name="timeRange" value="Last 5 minutes" checked> Last 5 minutes</label><label class="radio-row"><input type="radio" name="timeRange" value="Last 15 minutes"> Last 15 minutes</label><label class="radio-row"><input type="radio" name="timeRange" value="Last 1 hour"> Last 1 hour</label></div>
  </div>

  <!-- Log scope popover: chooses selected/all/error-only log views. -->
  <div id="logScopePopover" class="popover" role="dialog" aria-label="Log scope">
    <h3>Log Scope</h3>
    <div class="popover-section" id="logScopeChoices"><label class="radio-row"><input type="radio" name="logScope" value="selected" checked> Selected user/process scope</label><label class="radio-row"><input type="radio" name="logScope" value="all"> All processes</label><label class="radio-row"><input type="radio" name="logScope" value="errors"> Errors only</label><label class="radio-row"><input type="radio" name="logScope" value="warnerror"> Warnings + errors</label></div>
  </div>

  <!-- Log lines popover: quick cap selector for log rows. -->
  <div id="logLinesPopover" class="popover" role="dialog" aria-label="Log lines">
    <h3>Log Lines</h3>
    <div class="popover-section"><label class="radio-row"><input type="radio" name="logLines" value="1000"> 1000</label><label class="radio-row"><input type="radio" name="logLines" value="5000" checked> 5000</label><label class="radio-row"><input type="radio" name="logLines" value="10000"> 10000</label></div>
  </div>

  <!-- TOAST STACK: non-blocking feedback for each interaction. -->
  <div id="toastStack" class="toast-stack" aria-live="polite"></div>

  <!-- SCRIPT: DATA MODEL: sample users, processes, logs, columns, state, and DOM references. -->
  <script>
    const svgEmpty = '<svg class="empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M9 18h6M10 22h4M12 2v3M5 8l2 2M19 8l-2 2M8 14a4 4 0 1 1 8 0c0 1.5-.7 2.5-1.6 3.3-.7.6-1.1 1.1-1.1 1.7H10.7c0-.6-.4-1.1-1.1-1.7C8.7 16.5 8 15.5 8 14z" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    const users = [
      { key: 'all', label: 'All Users', role: 'aggregate', avatar: 'A', avatarClass: 'service', cpu: 23.7, memory: '4.2 GB', processes: 128, status: 'Active', statusClass: 'active', depth: 0, hasChildren: true },
      { key: 'root', label: 'root', role: 'superuser', avatar: '#', avatarClass: 'root', cpu: 8.6, memory: '1.2 GB', processes: 32, status: 'Active', statusClass: 'active', tag: 'ROOT', depth: 1 },
      { key: 'john', label: 'john', role: 'normal', avatar: 'J', avatarClass: 'john', cpu: 5.7, memory: '864.2 MB', processes: 18, status: 'Active', statusClass: 'active', tag: 'YOU', depth: 1 },
      { key: 'jane', label: 'jane', role: 'normal', avatar: 'J', avatarClass: 'jane', cpu: 3.2, memory: '512.8 MB', processes: 12, status: 'Active', statusClass: 'active', depth: 1 },
      { key: 'mike', label: 'mike', role: 'normal', avatar: 'M', avatarClass: 'mike', cpu: 2.1, memory: '310.7 MB', processes: 9, status: 'Active', statusClass: 'active', depth: 1 },
      { key: 'alex', label: 'alex', role: 'normal', avatar: 'A', avatarClass: 'alex', cpu: 1.6, memory: '198.6 MB', processes: 6, status: 'Active', statusClass: 'active', depth: 1 },
      { key: 'docker', label: 'docker', role: 'service', avatar: 'D', avatarClass: 'docker', cpu: 2.1, memory: '345.6 MB', processes: 6, status: 'Active', statusClass: 'active', tag: 'SERVICE', depth: 1 },
      { key: 'nginx', label: 'nginx', role: 'service', avatar: 'N', avatarClass: 'nginx', cpu: 4.1, memory: '512.3 MB', processes: 6, status: 'Active', statusClass: 'active', tag: 'SERVICE', depth: 1 },
      { key: 'postgres', label: 'postgres', role: 'service', avatar: 'P', avatarClass: 'postgres', cpu: 3.0, memory: '482.1 MB', processes: 15, status: 'Active', statusClass: 'active', tag: 'SERVICE', depth: 1 },
      { key: 'other', label: 'Other Users (7)', role: 'aggregate', avatar: '×', avatarClass: 'service', cpu: 2.5, memory: '1.1 GB', processes: 51, status: 'Active', statusClass: 'active', depth: 1 }
    ];

    const processData = {
      root: [
        { id: 'root-systemd', name: 'systemd (init)', pid: 1, cpu: .3, mem: '55.2 MB', status: 'Running', icon: '⚙', iconClass: '', children: [
          { id: 'root-sshd', name: 'sshd', pid: 742, cpu: .1, mem: '12.4 MB', status: 'Running', icon: '▣', iconClass: '', children: [
            { id: 'root-bash', name: 'bash', pid: 1123, cpu: .2, mem: '8.1 MB', status: 'Running', icon: '>', iconClass: 'shell', children: [
              { id: 'root-node', name: 'node server.js', pid: 1156, cpu: 5.6, mem: '128.7 MB', status: 'Running', icon: '⬢', iconClass: 'node', children: [
                { id: 'root-w1', name: 'worker.js', pid: 1161, cpu: 2.1, mem: '45.3 MB', status: 'Running', icon: 'JS', iconClass: 'js' },
                { id: 'root-w2', name: 'worker.js', pid: 1162, cpu: 1.8, mem: '44.8 MB', status: 'Running', icon: 'JS', iconClass: 'js' },
                { id: 'root-dbjs', name: 'database.js', pid: 1163, cpu: 1.2, mem: '38.9 MB', status: 'Running', icon: 'JS', iconClass: 'js' },
                { id: 'root-cache', name: 'cache.js', pid: 1164, cpu: .8, mem: '24.6 MB', status: 'Running', icon: 'JS', iconClass: 'js' }
              ]}
            ]}
          ]}
        ]},
        { id: 'root-nginx', name: 'nginx', pid: 888, cpu: 1.3, mem: '33.6 MB', status: 'Running', icon: 'N', iconClass: 'nginx', children: [
          { id: 'root-nginx-889', name: 'nginx: worker process', pid: 889, cpu: .6, mem: '15.8 MB', status: 'Running', icon: '>', iconClass: 'shell' },
          { id: 'root-nginx-890', name: 'nginx: worker process', pid: 890, cpu: .7, mem: '16.1 MB', status: 'Running', icon: '>', iconClass: 'shell' }
        ]},
        { id: 'root-postgres', name: 'postgres', pid: 994, cpu: 2.4, mem: '98.7 MB', status: 'Running', icon: 'P', iconClass: 'pg', children: [
          { id: 'root-pg-writer', name: 'postgres: writer', pid: 995, cpu: 1.1, mem: '32.2 MB', status: 'Running', icon: 'P', iconClass: 'pg' },
          { id: 'root-pg-wal', name: 'postgres: wal writer', pid: 996, cpu: .4, mem: '12.1 MB', status: 'Sleeping', icon: 'P', iconClass: 'pg' },
          { id: 'root-pg-bg', name: 'postgres: bgworker', pid: 997, cpu: .3, mem: '11.8 MB', status: 'Running', icon: 'P', iconClass: 'pg' }
        ]},
        { id: 'root-docker', name: 'docker', pid: 1021, cpu: 1.6, mem: '75.4 MB', status: 'Running', icon: 'D', iconClass: 'docker', children: [
          { id: 'root-containerd', name: 'containerd', pid: 1022, cpu: .6, mem: '22.8 MB', status: 'Running', icon: '>', iconClass: 'shell' },
          { id: 'root-dproxy', name: 'docker-proxy', pid: 1023, cpu: 1.0, mem: '18.2 MB', status: 'Running', icon: '>', iconClass: 'shell' }
        ]},
        { id: 'root-redis', name: 'redis-server', pid: 1033, cpu: .5, mem: '19.1 MB', status: 'Running', icon: 'R', iconClass: 'redis' },
        { id: 'root-cron', name: 'cron', pid: 1044, cpu: .1, mem: '2.1 MB', status: 'Sleeping', icon: '◷', iconClass: '' }
      ],
      john: [
        { id: 'john-shell', name: 'bash', pid: 2310, cpu: .6, mem: '78.2 MB', status: 'Running', icon: '>', iconClass: 'shell', children: [
          { id: 'john-devserver', name: 'node dev-server.js', pid: 2366, cpu: 2.6, mem: '118.4 MB', status: 'Running', icon: '⬢', iconClass: 'node', children: [
            { id: 'john-vite', name: 'vite --host 0.0.0.0', pid: 2369, cpu: 1.4, mem: '92.7 MB', status: 'Running', icon: 'JS', iconClass: 'js' },
            { id: 'john-tsserver', name: 'tsserver', pid: 2370, cpu: 1.1, mem: '96.3 MB', status: 'Running', icon: 'TS', iconClass: 'js' }
          ]},
          { id: 'john-tmux', name: 'tmux: server', pid: 2402, cpu: .4, mem: '24.2 MB', status: 'Running', icon: 'T', iconClass: 'shell' }
        ]},
        { id: 'john-code', name: 'code', pid: 2411, cpu: 2.3, mem: '256.4 MB', status: 'Running', icon: 'C', iconClass: 'code', children: [
          { id: 'john-extension', name: 'extensionHost', pid: 2420, cpu: .5, mem: '88.0 MB', status: 'Running', icon: 'C', iconClass: 'code' },
          { id: 'john-pty', name: 'ptyHost', pid: 2428, cpu: .2, mem: '22.5 MB', status: 'Sleeping', icon: '>', iconClass: 'shell' }
        ]},
        { id: 'john-chrome', name: 'chrome', pid: 2501, cpu: 2.1, mem: '345.6 MB', status: 'Running', icon: 'G', iconClass: 'chrome', children: [
          { id: 'john-chrome-render', name: 'chrome --renderer', pid: 2504, cpu: .8, mem: '102.1 MB', status: 'Running', icon: 'G', iconClass: 'chrome' },
          { id: 'john-chrome-gpu', name: 'chrome --gpu-process', pid: 2506, cpu: .3, mem: '40.7 MB', status: 'Sleeping', icon: 'G', iconClass: 'chrome' }
        ]},
        { id: 'john-slack', name: 'slack', pid: 2602, cpu: .9, mem: '256.0 MB', status: 'Running', icon: 'S', iconClass: '' }
      ],
      jane: [
        { id: 'jane-chrome', name: 'chrome', pid: 3130, cpu: 2.4, mem: '324.5 MB', status: 'Running', icon: 'G', iconClass: 'chrome', children: [
          { id: 'jane-tab', name: 'chrome --tab docs', pid: 3134, cpu: .7, mem: '88.3 MB', status: 'Running', icon: 'G', iconClass: 'chrome' }
        ]},
        { id: 'jane-slack', name: 'slack', pid: 3178, cpu: .4, mem: '89.1 MB', status: 'Running', icon: 'S', iconClass: '' },
        { id: 'jane-code', name: 'code', pid: 3200, cpu: .4, mem: '99.2 MB', status: 'Sleeping', icon: 'C', iconClass: 'code' }
      ],
      mike: [
        { id: 'mike-terminal', name: 'terminal', pid: 4114, cpu: .7, mem: '110.2 MB', status: 'Running', icon: '>', iconClass: 'shell', children: [
          { id: 'mike-python', name: 'python train.py', pid: 4120, cpu: 1.1, mem: '200.3 MB', status: 'Running', icon: 'PY', iconClass: 'python', children: [
            { id: 'mike-worker-a', name: 'dataloader worker 0', pid: 4121, cpu: .3, mem: '40.1 MB', status: 'Sleeping', icon: 'PY', iconClass: 'python' },
            { id: 'mike-worker-b', name: 'dataloader worker 1', pid: 4122, cpu: .3, mem: '38.6 MB', status: 'Sleeping', icon: 'PY', iconClass: 'python' }
          ]}
        ]},
        { id: 'mike-vim', name: 'vim', pid: 4198, cpu: .3, mem: '45.2 MB', status: 'Running', icon: 'V', iconClass: '' }
      ],
      alex: [
        { id: 'alex-git', name: 'git status --watch', pid: 5121, cpu: .6, mem: '78.6 MB', status: 'Running', icon: 'G', iconClass: '' },
        { id: 'alex-node', name: 'node cli.js', pid: 5125, cpu: 1.0, mem: '120.0 MB', status: 'Running', icon: '⬢', iconClass: 'node', children: [
          { id: 'alex-bash', name: 'bash', pid: 5126, cpu: 0.0, mem: '0.0 MB', status: 'Sleeping', icon: '>', iconClass: 'shell' }
        ]}
      ],
      docker: [
        { id: 'docker-daemon', name: 'dockerd', pid: 1021, cpu: 1.2, mem: '256.0 MB', status: 'Running', icon: 'D', iconClass: 'docker', children: [
          { id: 'docker-containerd', name: 'containerd', pid: 1022, cpu: .6, mem: '22.8 MB', status: 'Running', icon: 'D', iconClass: 'docker' },
          { id: 'docker-worker', name: 'container: app-worker', pid: 1452, cpu: .8, mem: '66.0 MB', status: 'Running', icon: 'D', iconClass: 'docker' }
        ]}
      ],
      nginx: [
        { id: 'nginx-master', name: 'nginx: master process', pid: 888, cpu: 1.3, mem: '33.6 MB', status: 'Running', icon: 'N', iconClass: 'nginx', children: [
          { id: 'nginx-worker-889', name: 'nginx: worker process', pid: 889, cpu: .6, mem: '15.8 MB', status: 'Running', icon: 'N', iconClass: 'nginx' },
          { id: 'nginx-worker-890', name: 'nginx: worker process', pid: 890, cpu: .7, mem: '16.1 MB', status: 'Running', icon: 'N', iconClass: 'nginx' }
        ]}
      ],
      postgres: [
        { id: 'postgres-main', name: 'postgres', pid: 994, cpu: 2.4, mem: '98.7 MB', status: 'Running', icon: 'P', iconClass: 'pg', children: [
          { id: 'postgres-writer', name: 'postgres: writer', pid: 995, cpu: 1.1, mem: '32.2 MB', status: 'Running', icon: 'P', iconClass: 'pg' },
          { id: 'postgres-wal', name: 'postgres: wal writer', pid: 996, cpu: .4, mem: '12.1 MB', status: 'Sleeping', icon: 'P', iconClass: 'pg' },
          { id: 'postgres-bg', name: 'postgres: bgworker', pid: 997, cpu: .3, mem: '11.8 MB', status: 'Running', icon: 'P', iconClass: 'pg' }
        ]}
      ],
      other: []
    };

    const logData = {
      root: [
        ['10:24:31.123', 'node server.js', 1156, 'INFO', 'Server started on port 3000'],
        ['10:24:31.125', 'worker.js', 1161, 'INFO', 'Worker started with id 1'],
        ['10:24:31.126', 'database.js', 1163, 'INFO', 'Connected to database'],
        ['10:24:31.200', 'nginx: worker process', 889, 'INFO', 'Accepted connection from 192.168.1.10'],
        ['10:24:31.245', 'node server.js', 1156, 'INFO', 'GET /api/users 200 15ms'],
        ['10:24:31.310', 'worker.js', 1162, 'DEBUG', 'Processing job 42'],
        ['10:24:31.410', 'database.js', 1163, 'INFO', 'Query executed in 12ms'],
        ['10:24:31.512', 'worker.js', 1161, 'WARN', 'Job queue size high (85)'],
        ['10:24:31.678', 'nginx: worker process', 890, 'INFO', 'Accepted connection from 192.168.1.11'],
        ['10:24:31.789', 'node server.js', 1156, 'ERROR', 'Unhandled exception: User not found'],
        ['10:24:31.790', 'worker.js', 1162, 'ERROR', 'Job 42 failed: Timeout exceeded'],
        ['10:24:31.900', 'postgres: writer', 995, 'INFO', 'WAL segment written'],
        ['10:24:32.001', 'postgres: bgworker', 997, 'DEBUG', 'Background worker heartbeat'],
        ['10:24:32.215', 'nginx: worker process', 889, 'INFO', 'GET /favicon.ico 404 2ms'],
        ['10:24:32.410', 'cache.js', 1164, 'INFO', 'Cache hit for key: user:123'],
        ['10:24:32.612', 'worker.js', 1161, 'INFO', 'Job 43 completed in 120ms'],
        ['10:24:32.890', 'database.js', 1163, 'ERROR', 'Connection pool exhausted'],
        ['10:24:33.001', 'node server.js', 1156, 'WARN', 'High response time detected: 502ms'],
        ['10:24:33.123', 'redis-server', 1033, 'INFO', 'Client connected: 127.0.0.1:54321'],
        ['10:24:33.456', 'docker', 1021, 'INFO', 'Container nginx started'],
        ['10:24:33.789', 'cron', 1044, 'INFO', 'Scheduled job completed']
      ],
      john: [
        ['10:24:31.102', 'node dev-server.js', 2366, 'INFO', 'Development server listening on :5173'],
        ['10:24:31.268', 'tsserver', 2370, 'DEBUG', 'Project graph refreshed in 44ms'],
        ['10:24:31.344', 'code', 2411, 'INFO', 'Workspace opened: process-monitor'],
        ['10:24:31.480', 'chrome --renderer', 2504, 'INFO', 'Loaded /dashboard preview'],
        ['10:24:31.592', 'node dev-server.js', 2366, 'WARN', 'API proxy fallback used for /logs'],
        ['10:24:31.774', 'extensionHost', 2420, 'DEBUG', 'Language server ready'],
        ['10:24:31.910', 'node dev-server.js', 2366, 'INFO', 'GET /api/processes?user=john 200 18ms'],
        ['10:24:32.104', 'ptyHost', 2428, 'INFO', 'Terminal spawned: bash'],
        ['10:24:32.290', 'chrome --gpu-process', 2506, 'DEBUG', 'Frame rendered in 12ms'],
        ['10:24:32.430', 'node dev-server.js', 2366, 'ERROR', 'Websocket reconnect attempt failed'],
        ['10:24:32.612', 'vite --host', 2369, 'INFO', 'Client reconnected'],
        ['10:24:32.880', 'tsserver', 2370, 'WARN', 'High memory watermark: 96.3 MB'],
        ['10:24:33.001', 'slack', 2602, 'INFO', 'Notification received']
      ],
      jane: [
        ['10:24:31.101', 'chrome', 3130, 'INFO', 'Tab active: docs'],
        ['10:24:31.230', 'slack', 3178, 'INFO', 'Workspace sync complete'],
        ['10:24:31.600', 'code', 3200, 'DEBUG', 'Extension host idle']
      ],
      mike: [
        ['10:24:31.150', 'python train.py', 4120, 'INFO', 'Epoch 12 started'],
        ['10:24:31.620', 'terminal', 4114, 'DEBUG', 'Shell prompt rendered'],
        ['10:24:32.900', 'python train.py', 4120, 'WARN', 'GPU utilization below expected threshold']
      ],
      alex: [
        ['10:24:31.310', 'git status --watch', 5121, 'INFO', 'Working tree clean'],
        ['10:24:32.002', 'node cli.js', 5125, 'INFO', 'CLI heartbeat']
      ],
      docker: [
        ['10:24:31.220', 'dockerd', 1021, 'INFO', 'Container api-nginx started'],
        ['10:24:31.650', 'containerd', 1022, 'DEBUG', 'Snapshot prepared'],
        ['10:24:32.410', 'container: app-worker', 1452, 'WARN', 'Restart policy triggered']
      ],
      nginx: [
        ['10:24:31.200', 'nginx worker', 889, 'INFO', 'Accepted connection from 192.168.1.10'],
        ['10:24:32.215', 'nginx worker', 889, 'INFO', 'GET /favicon.ico 404 2ms'],
        ['10:24:33.789', 'nginx worker', 890, 'INFO', 'GET /api/health 200 3ms']
      ],
      postgres: [
        ['10:24:31.900', 'postgres: writer', 995, 'INFO', 'WAL segment written'],
        ['10:24:32.001', 'postgres: bgworker', 997, 'DEBUG', 'Background worker heartbeat'],
        ['10:24:32.890', 'postgres', 994, 'ERROR', 'Connection pool exhausted']
      ],
      all: [],
      other: []
    };

    const alertsSeed = [
      { level: 'ERROR', title: 'Connection pool exhausted', text: 'database.js reported no available connections in root scope.' },
      { level: 'WARN', title: 'High response time detected', text: 'node server.js exceeded 500ms on the last collection window.' },
      { level: 'ERROR', title: 'Websocket reconnect failed', text: 'john / node dev-server.js failed a reconnect attempt.' }
    ];

    const columnDefs = {
      user: [
        { key: 'name', label: 'User', width: 'minmax(168px, 1fr)', required: true },
        { key: 'cpu', label: 'CPU %', width: '64px' },
        { key: 'memory', label: 'Memory', width: '86px' },
        { key: 'processes', label: 'Processes', width: '70px' },
        { key: 'status', label: 'Status', width: '82px' }
      ],
      process: [
        { key: 'name', label: 'Process Name', width: 'minmax(230px, 1fr)', required: true },
        { key: 'pid', label: 'PID', width: '70px' },
        { key: 'cpu', label: 'CPU %', width: '76px' },
        { key: 'memory', label: 'Memory', width: '92px' },
        { key: 'status', label: 'Status', width: '92px' }
      ],
      log: [
        { key: 'time', label: 'Time', width: '106px' },
        { key: 'process', label: 'Process', width: 'minmax(132px, 1fr)' },
        { key: 'pid', label: 'PID', width: '70px' },
        { key: 'level', label: 'Level', width: '82px' },
        { key: 'message', label: 'Message', width: 'minmax(230px, 1.7fr)', required: true }
      ]
    };

    const state = {
      mode: 'root',
      selectedUser: 'root',
      paused: false,
      userTreeExpanded: true,
      userView: 'tree',
      processView: 'tree',
      processExpanded: new Set(),
      allProcessesExpanded: true,
      search: { user: '', process: '', log: '' },
      filters: {
        levels: { INFO: true, DEBUG: true, WARN: true, ERROR: true },
        statuses: { Running: true, Sleeping: true, Stopped: true, Zombie: true },
        minCpu: 0
      },
      columns: {
        user: { name: true, cpu: true, memory: true, processes: true, status: true },
        process: { name: true, pid: true, cpu: true, memory: true, status: true },
        log: { time: true, process: true, pid: true, level: true, message: true }
      },
      logScope: 'selected',
      timeRange: 'Last 5 minutes',
      autoScroll: true,
      compact: false,
      showSparks: true,
      highContrast: false,
      reduceMotion: false,
      refreshMs: 1400,
      logLineCap: 5000,
      theme: 'dark',
      resolvedTheme: 'dark',
      alerts: alertsSeed.slice(),
      intervalId: null
    };

    const els = {
      userHead: document.getElementById('userHead'),
      processHead: document.getElementById('processHead'),
      logsHead: document.getElementById('logsHead'),
      usersTable: document.getElementById('usersTable'),
      processTable: document.getElementById('processTable'),
      logsTable: document.getElementById('logsTable'),
      userSearch: document.getElementById('userSearch'),
      processSearch: document.getElementById('processSearch'),
      logSearch: document.getElementById('logSearch'),
      processSubtitle: document.getElementById('processSubtitle'),
      logsSubtitle: document.getElementById('logsSubtitle'),
      liveBadge: document.getElementById('liveBadge'),
      streamingLabel: document.getElementById('streamingLabel'),
      alertBadge: document.getElementById('alertBadge'),
      filterBadge: document.getElementById('filterBadge'),
      themeToggleBtn: document.getElementById('themeToggleBtn'),
      themeLabel: document.getElementById('themeLabel'),
      themeIcon: document.getElementById('themeIcon'),
      toastStack: document.getElementById('toastStack')
    };
  </script>

  <!-- SCRIPT: UTILITIES: formatting helpers, tree traversal, visibility rules, and data selectors. -->
  <script>
    function esc(value) {
      return String(value ?? '').replace(/[&<>"]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[char]));
    }
    function fmtCpu(value) { return typeof value === 'number' ? `${value.toFixed(1)}%` : value; }
    function cpuClass(cpu) { if (Number(cpu) >= 9) return 'number-red'; if (Number(cpu) >= 5) return 'number-yellow'; return 'number-green'; }
    function severityClass(level) { return String(level).toLowerCase(); }
    function processStatusClass(status) { return status === 'Sleeping' ? 'idle' : status === 'Stopped' ? 'stopped' : status === 'Zombie' ? 'restricted' : ''; }
    function hasChildren(node) { return Array.isArray(node.children) && node.children.length > 0; }
    function activeColumns(table) { return columnDefs[table].filter(col => state.columns[table][col.key]); }
    function gridTemplate(table) { return activeColumns(table).map(c => c.width).join(' '); }
    function setGrid(el, table) { el.style.gridTemplateColumns = gridTemplate(table); }
    function renderHeader(el, table) {
      setGrid(el, table);
      el.innerHTML = activeColumns(table).map(c => `<span>${esc(c.label)}</span>`).join('');
    }

    function flatten(nodes, depth = 0, acc = []) {
      for (const node of nodes || []) {
        acc.push({ ...node, depth });
        if (hasChildren(node)) flatten(node.children, depth + 1, acc);
      }
      return acc;
    }
    function collectIds(nodes, ids = []) {
      for (const node of nodes || []) {
        if (hasChildren(node)) ids.push(node.id);
        if (hasChildren(node)) collectIds(node.children, ids);
      }
      return ids;
    }
    function userRecord(key = state.selectedUser) {
      const raw = users.find(u => u.key === key) || users[1];
      return userVisibleForMode(raw);
    }
    function cleanLabel(label) { return String(label).replace(/ \(.+\)/, ''); }
    function userVisibleForMode(user) {
      if (state.mode === 'root') return { ...user };
      if (user.key === 'root') return { ...user, status: 'Restricted', statusClass: 'restricted', cpu: 0, memory: 'Hidden', processes: '—', tag: 'ROOT' };
      if (user.key === 'all') return { ...user, label: 'Visible Users', memory: '2.7 GB', processes: 63, cpu: 15.1 };
      if (user.key === 'other') return { ...user, status: 'Restricted', statusClass: 'restricted', memory: 'Hidden', processes: '—' };
      return { ...user };
    }
    function getProcessesForUser(key) {
      if (state.mode === 'normal' && key === 'root') return [];
      if (key === 'all') {
        const keys = state.mode === 'normal' ? ['john', 'jane', 'mike', 'alex', 'docker', 'nginx', 'postgres'] : ['root', 'john', 'jane', 'mike', 'alex', 'docker', 'nginx', 'postgres'];
        return keys.flatMap(k => processData[k] || []);
      }
      if (key === 'other') return [];
      return processData[key] || [];
    }
    function getRawLogsForScope() {
      if (state.logScope === 'all') {
        const keys = state.mode === 'normal' ? ['john', 'jane', 'mike', 'alex', 'docker', 'nginx', 'postgres'] : ['root', 'john', 'jane', 'mike', 'alex', 'docker', 'nginx', 'postgres'];
        return keys.flatMap(k => logData[k] || []);
      }
      if (state.mode === 'normal' && state.selectedUser === 'root') {
        return [
          ['10:24:31.111', 'permission', '—', 'WARN', 'Root process details are hidden for normal user scope'],
          ['10:24:31.150', 'session', '—', 'INFO', 'Select john or another visible user to load permitted processes']
        ];
      }
      if (state.selectedUser === 'all') return getRawLogsForAllSelected();
      return logData[state.selectedUser] || [];
    }
    function getRawLogsForAllSelected() {
      const keys = state.mode === 'normal' ? ['john', 'jane', 'mike', 'alex', 'docker', 'nginx', 'postgres'] : ['root', 'john', 'jane', 'mike', 'alex', 'docker', 'nginx', 'postgres'];
      return keys.flatMap(k => logData[k] || []);
    }
  </script>

  <!-- SCRIPT: RENDERERS: User Tree, Process Tree, Logs, Alerts, and label updates. -->
  <script>
    function renderUsers() {
      renderHeader(els.userHead, 'user');
      const q = state.search.user.trim().toLowerCase();
      let rows = [];
      const allUser = userVisibleForMode(users[0]);
      rows.push(allUser);
      if (state.userView === 'list' || state.userTreeExpanded || q) {
        rows.push(...users.slice(1).map(userVisibleForMode));
      }
      rows = rows.filter(u => !q || u.label.toLowerCase().includes(q) || u.role.toLowerCase().includes(q) || String(u.processes).includes(q));
      const cols = activeColumns('user');
      els.usersTable.innerHTML = rows.map(u => {
        const selected = u.key === state.selectedUser ? 'selected' : '';
        const restricted = u.statusClass === 'restricted' ? 'restricted-row' : '';
        const depth = state.userView === 'tree' && u.key !== 'all' ? 1 : 0;
        const caret = u.key === 'all' && state.userView === 'tree' ? `<span class="caret ${state.userTreeExpanded ? '' : 'collapsed'}" data-user-caret="all">⌄</span>` : '<span class="caret empty">⌄</span>';
        const tag = u.tag ? `<span class="${u.tag === 'YOU' ? 'tag-you' : 'permission-tag'}">${esc(u.tag)}</span>` : '';
        const values = {
          name: `<div class="tree-cell" style="--depth:${depth}">${caret}<span class="avatar ${esc(u.avatarClass)}">${esc(u.avatar)}</span><strong title="${esc(u.label)}">${esc(u.label)}</strong>${tag}</div>`,
          cpu: `<span class="${cpuClass(u.cpu)}">${fmtCpu(u.cpu)}</span>`,
          memory: `<span>${esc(u.memory)}</span>`,
          processes: `<span class="tabular">${esc(u.processes)}</span>`,
          status: `<span class="status ${u.statusClass === 'restricted' ? 'restricted' : ''}">${esc(u.status)}</span>`
        };
        return `<div class="tree-row user-row ${state.userView === 'tree' ? 'tree-mode' : ''} depth-${depth} ${selected} ${restricted}" data-user="${esc(u.key)}" style="grid-template-columns:${gridTemplate('user')}">${cols.map(c => values[c.key]).join('')}</div>`;
      }).join('');
      els.usersTable.querySelectorAll('.user-row').forEach(row => {
        row.addEventListener('click', e => {
          const caret = e.target.closest('[data-user-caret]');
          if (caret) { state.userTreeExpanded = !state.userTreeExpanded; renderUsers(); toast(state.userTreeExpanded ? 'User tree expanded' : 'User tree collapsed'); return; }
          selectUser(row.dataset.user);
        });
      });
      document.getElementById('userExpandBtn').classList.toggle('active', state.userTreeExpanded || state.userView === 'list');
      document.getElementById('userTreeBtn').classList.toggle('active', state.userView === 'tree');
      document.getElementById('userListBtn').classList.toggle('active', state.userView === 'list');
    }

    function nodeMatches(node, q) {
      if (!q) return true;
      return String(node.name).toLowerCase().includes(q) || String(node.pid).includes(q) || String(node.status).toLowerCase().includes(q);
    }
    function filterNodeTree(nodes, depth = 0, acc = [], q = '') {
      for (const node of nodes || []) {
        const children = node.children || [];
        const childAcc = [];
        filterNodeTree(children, depth + 1, childAcc, q);
        const matchesText = nodeMatches(node, q);
        const matchesStatus = state.filters.statuses[node.status] !== false;
        const matchesCpu = Number(node.cpu) >= Number(state.filters.minCpu || 0);
        const include = (matchesText || childAcc.length > 0) && (matchesStatus || childAcc.length > 0) && (matchesCpu || childAcc.length > 0);
        if (!include) continue;
        acc.push({ ...node, depth });
        const expanded = state.processView === 'list' || q || state.processExpanded.has(node.id);
        if (children.length && expanded) {
          if (q) acc.push(...childAcc);
          else filterNodeTree(children, depth + 1, acc, q);
        }
      }
      return acc;
    }
    function renderProcesses() {
      renderHeader(els.processHead, 'process');
      const raw = getProcessesForUser(state.selectedUser);
      const q = state.search.process.trim().toLowerCase();
      const rows = filterNodeTree(raw, 0, [], q);
      const cols = activeColumns('process');
      if (!rows.length) {
        const msg = (state.mode === 'normal' && state.selectedUser === 'root')
          ? '<h2>Root process tree restricted</h2><p>Normal users can see the root account summary, but cannot load root process details. Select john or another visible user.</p>'
          : '<h2>Select a user to view processes</h2><p>Choose a user from the User Tree. That user’s process tree will load here.</p>';
        els.processTable.innerHTML = `<div class="empty-state"><div class="empty-card">${svgEmpty}${msg}</div></div>`;
        return;
      }
      els.processTable.innerHTML = rows.map(p => {
        const hasKids = hasChildren(p);
        const expanded = state.processView === 'list' || q || state.processExpanded.has(p.id);
        const caret = hasKids && state.processView === 'tree' ? `<span class="caret ${expanded ? '' : 'collapsed'}" data-proc-caret="${esc(p.id)}">⌄</span>` : '<span class="caret empty">⌄</span>';
        const values = {
          name: `<div class="tree-cell" style="--depth:${state.processView === 'tree' ? p.depth : 0}">${caret}<span class="proc-icon ${esc(p.iconClass || '')}">${esc(p.icon)}</span><strong title="${esc(p.name)}">${esc(p.name)}</strong></div>`,
          pid: `<span class="tabular">${esc(p.pid)}</span>`,
          cpu: `<span class="${cpuClass(p.cpu)}">${fmtCpu(p.cpu)}</span>`,
          memory: `<span>${esc(p.mem)}</span>`,
          status: `<span class="status ${processStatusClass(p.status)}">${esc(p.status)}</span>`
        };
        return `<div class="tree-row proc-row ${state.processView === 'tree' ? 'tree-mode' : ''} depth-${p.depth}" data-proc="${esc(p.id)}" style="grid-template-columns:${gridTemplate('process')}">${cols.map(c => values[c.key]).join('')}</div>`;
      }).join('');
      els.processTable.querySelectorAll('[data-proc-caret]').forEach(caret => {
        caret.addEventListener('click', e => {
          e.stopPropagation();
          const id = caret.dataset.procCaret;
          if (state.processExpanded.has(id)) state.processExpanded.delete(id); else state.processExpanded.add(id);
          state.allProcessesExpanded = false;
          renderProcesses();
          toast(state.processExpanded.has(id) ? 'Process branch expanded' : 'Process branch collapsed');
        });
      });
      document.getElementById('processTreeBtn').classList.toggle('active', state.processView === 'tree');
      document.getElementById('processListBtn').classList.toggle('active', state.processView === 'list');
      document.getElementById('processExpandBtn').classList.toggle('active', state.processView === 'list' || state.allProcessesExpanded);
    }

    function filteredLogs() {
      const q = state.search.log.trim().toLowerCase();
      let logs = getRawLogsForScope();
      if (state.logScope === 'errors') logs = logs.filter(l => l[3] === 'ERROR');
      if (state.logScope === 'warnerror') logs = logs.filter(l => l[3] === 'WARN' || l[3] === 'ERROR');
      logs = logs.filter(l => state.filters.levels[l[3]] !== false);
      if (q) logs = logs.filter(l => l.join(' ').toLowerCase().includes(q));
      return logs.slice(0, state.logLineCap);
    }
    function renderLogs() {
      renderHeader(els.logsHead, 'log');
      const cols = activeColumns('log');
      const logs = filteredLogs();
      if (!logs.length) {
        els.logsTable.innerHTML = `<div class="empty-state"><div class="empty-card">${svgEmpty}<h2>No log rows match</h2><p>Adjust the search, level filters, or log scope to show matching real-time rows.</p></div></div>`;
        return;
      }
      els.logsTable.innerHTML = logs.map(([time, process, pid, level, message]) => {
        const cls = severityClass(level);
        const values = {
          time: `<span>${esc(time)}</span>`,
          process: `<span title="${esc(process)}">${esc(process)}</span>`,
          pid: `<span class="tabular">${esc(pid)}</span>`,
          level: `<span class="severity ${cls}">${esc(level)}</span>`,
          message: `<span class="msg ${cls}">${esc(message)}</span>`
        };
        return `<div class="log-row mono" style="grid-template-columns:${gridTemplate('log')}">${cols.map(c => `<div>${values[c.key]}</div>`).join('')}</div>`;
      }).join('');
      if (state.autoScroll) document.getElementById('logsScroll').scrollTop = 0;
    }

    function updateLabels() {
      const u = userRecord();
      const label = cleanLabel(u.label);
      const restricted = state.mode === 'normal' && state.selectedUser === 'root';
      document.getElementById('metricSelectedUser')?.remove();
      document.getElementById('metricUserCpu').textContent = typeof u.cpu === 'number' ? fmtCpu(u.cpu) : u.cpu;
      document.getElementById('metricTotalUsers').textContent = state.mode === 'normal' ? '6' : '12';
      document.getElementById('metricTotalProcesses').textContent = state.mode === 'normal' ? '63' : '128';
      document.getElementById('metricAlerts').textContent = state.alerts.length;
      els.alertBadge.textContent = state.alerts.length;
      els.alertBadge.classList.toggle('hidden', state.alerts.length === 0);
      els.processSubtitle.textContent = restricted ? 'root selected · restricted in normal-user scope' : `${label} selected · ${state.selectedUser === 'root' ? 'privileged' : 'user'} process scope`;
      els.logsSubtitle.textContent = state.logScope === 'all' ? 'Showing all permitted logs' : state.logScope === 'errors' ? 'Showing matching errors only' : state.logScope === 'warnerror' ? 'Showing warnings and errors' : `Filtered by ${label} process scope`;
      document.getElementById('logFilterLabel').textContent = state.logScope === 'selected' ? `${label} scope` : state.logScope === 'all' ? 'All Processes' : state.logScope === 'errors' ? 'Errors only' : 'Warn + Error';
      document.getElementById('timeRangeLabel').textContent = state.timeRange;
      document.getElementById('logLineCount').textContent = state.logLineCap;
      updateFilterBadge();
      renderAlerts();
    }
    function updateFilterBadge() {
      let count = 0;
      Object.values(state.filters.levels).forEach(v => { if (!v) count++; });
      Object.values(state.filters.statuses).forEach(v => { if (!v) count++; });
      if (Number(state.filters.minCpu) > 0) count++;
      els.filterBadge.textContent = count;
      els.filterBadge.classList.toggle('hidden', count === 0);
      document.getElementById('filterBtn').classList.toggle('active', count > 0);
    }
    function renderAlerts() {
      const list = document.getElementById('alertsList');
      if (!state.alerts.length) {
        list.innerHTML = '<div class="alert-item"><strong>All clear <span class="severity info">INFO</span></strong><span>No unread alerts in the current mock session.</span></div>';
        return;
      }
      list.innerHTML = state.alerts.map(a => `<div class="alert-item"><strong>${esc(a.title)} <span class="severity ${severityClass(a.level)}">${esc(a.level)}</span></strong><span>${esc(a.text)}</span></div>`).join('');
    }
    function renderAll() {
      renderUsers();
      renderProcesses();
      renderLogs();
      updateLabels();
    }
  </script>

  <!-- SCRIPT: ACTIONS: theme mode, user selection, mode switching, timers, and column controls. -->
  <script>
    function getStoredThemeMode() {
      try { return localStorage.getItem('processMonitorTheme') || 'dark'; }
      catch (error) { return 'dark'; }
    }
    function resolveThemeMode(themeMode) {
      if (themeMode === 'system') {
        return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
      }
      return themeMode === 'light' ? 'light' : 'dark';
    }
    function updateThemeButtonLabel() {
      const isLight = state.resolvedTheme === 'light';
      els.themeToggleBtn?.setAttribute('aria-pressed', String(isLight));
      els.themeToggleBtn?.classList.toggle('active', isLight);
      if (els.themeLabel) els.themeLabel.textContent = isLight ? 'Dark' : 'Light';
      if (els.themeToggleBtn) els.themeToggleBtn.title = isLight ? 'Switch to dark mode' : 'Switch to light mode';
      if (els.themeIcon) {
        els.themeIcon.innerHTML = isLight
          ? '<path d="M21 12.8A8.5 8.5 0 1 1 11.2 3 6.8 6.8 0 0 0 21 12.8Z" stroke-linecap="round" stroke-linejoin="round"/>'
          : '<path d="M12 3v2M12 19v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M3 12h2M19 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke-linecap="round"/><circle cx="12" cy="12" r="4"/>';
      }
      const themeSelect = document.getElementById('themeModeSelect');
      if (themeSelect) themeSelect.value = state.theme;
    }
    function applyThemeMode(themeMode, options = {}) {
      state.theme = themeMode;
      state.resolvedTheme = resolveThemeMode(themeMode);
      document.documentElement.dataset.theme = state.resolvedTheme;
      updateThemeButtonLabel();
      if (options.persist !== false) {
        try { localStorage.setItem('processMonitorTheme', themeMode); }
        catch (error) { /* Storage can be blocked in sandboxed previews. */ }
      }
      if (options.announce) toast(`${state.resolvedTheme === 'light' ? 'Light' : 'Dark'} mode enabled`);
    }
    function toggleLightDarkMode() {
      const nextTheme = state.resolvedTheme === 'light' ? 'dark' : 'light';
      applyThemeMode(nextTheme, { announce: true });
    }
    function initializeThemeMode() {
      const storedThemeMode = getStoredThemeMode();
      applyThemeMode(storedThemeMode, { persist: false });
      if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: light)').addEventListener?.('change', () => {
          if (state.theme === 'system') applyThemeMode('system', { persist: false });
        });
      }
    }

    function selectUser(key) {
      if (!users.some(u => u.key === key)) return;
      state.selectedUser = key;
      state.processExpanded = new Set(collectIds(getProcessesForUser(key)));
      state.allProcessesExpanded = true;
      state.logScope = 'selected';
      document.querySelector('input[name="logScope"][value="selected"]').checked = true;
      renderAll();
      const safeUserKey = window.CSS && CSS.escape ? CSS.escape(key) : String(key).replace(/[^a-zA-Z0-9_-]/g, match => '\\' + match);
      const row = document.querySelector(`[data-user="${safeUserKey}"]`);
      if (row) { row.classList.add('highlight-pulse'); setTimeout(() => row.classList.remove('highlight-pulse'), 1200); }
      toast(`${cleanLabel(userRecord(key).label)} selected — process tree loaded`);
    }
    function setMode(mode) {
      state.mode = mode;
      state.selectedUser = mode === 'root' ? 'root' : 'john';
      state.processExpanded = new Set(collectIds(getProcessesForUser(state.selectedUser)));
      state.allProcessesExpanded = true;
      document.getElementById('rootViewBtn').classList.toggle('active', mode === 'root');
      document.getElementById('normalViewBtn').classList.toggle('active', mode === 'normal');
      history.replaceState(null, '', '#' + mode);
      renderAll();
      toast(mode === 'root' ? 'Root user view enabled' : 'Normal user view enabled');
    }

    function togglePause(force) {
      state.paused = typeof force === 'boolean' ? force : !state.paused;
      document.getElementById('topPauseBtn').setAttribute('aria-pressed', String(state.paused));
      document.getElementById('topPauseBtn').querySelector('.label').textContent = state.paused ? 'Resume' : 'Pause';
      document.getElementById('topPauseBtn').classList.toggle('active', state.paused);
      document.getElementById('logPauseBtn').classList.toggle('active', state.paused);
      els.liveBadge.textContent = state.paused ? 'PAUSED' : 'LIVE';
      els.liveBadge.classList.toggle('paused', state.paused);
      els.streamingLabel.textContent = state.paused ? 'Paused' : 'Streaming';
      toast(state.paused ? 'Live updates paused' : 'Live updates resumed');
    }
    function nowTime() { return new Date().toLocaleTimeString('en-US', { hour12: false }); }
    function simulateTick() {
      if (state.paused) return;
      const cpu = 22.6 + Math.random() * 4.2;
      const mem = 4.08 + Math.random() * .32;
      const net = 1.1 + Math.random() * .6;
      document.getElementById('metricCpu').textContent = cpu.toFixed(1);
      document.getElementById('metricMemory').textContent = mem.toFixed(1);
      document.getElementById('metricNetwork').textContent = net.toFixed(1);
      document.getElementById('footerCpu').textContent = `${cpu.toFixed(1)}%`;
      document.getElementById('lastUpdated').textContent = nowTime();
      const currentKey = state.selectedUser === 'all' ? (state.mode === 'root' ? 'root' : 'john') : state.selectedUser;
      if (currentKey !== 'root' || state.mode === 'root') {
        const pool = logData[currentKey] || logData.john;
        const proc = flatten(getProcessesForUser(currentKey))[Math.floor(Math.random() * Math.max(1, flatten(getProcessesForUser(currentKey)).length))];
        if (pool && proc && Math.random() > .35) {
          const messages = [['INFO', 'Heartbeat received'], ['INFO', 'Snapshot refreshed'], ['DEBUG', 'Process sample collected'], ['INFO', 'CPU window recalculated'], ['WARN', 'Transient spike detected']];
          const [level, msg] = messages[Math.floor(Math.random() * messages.length)];
          pool.unshift([nowTime() + '.' + String(Math.floor(Math.random() * 900) + 100), proc.name, proc.pid, level, msg]);
          if (pool.length > 35) pool.pop();
          renderLogs();
        }
      }
    }
    function restartTimer() {
      if (state.intervalId) clearInterval(state.intervalId);
      state.intervalId = setInterval(simulateTick, state.refreshMs);
    }

    function createColumnChecks() {
      const containers = { user: document.getElementById('userColumnChecks'), process: document.getElementById('processColumnChecks'), log: document.getElementById('logColumnChecks') };
      for (const table of Object.keys(containers)) {
        containers[table].innerHTML = columnDefs[table].map(col => `<label class="check-row"><input type="checkbox" data-column-table="${table}" data-column-key="${col.key}" ${state.columns[table][col.key] ? 'checked' : ''} ${col.required ? 'disabled' : ''}> ${esc(col.label)}${col.required ? ' <span class="mini-tag">required</span>' : ''}</label>`).join('');
      }
      document.querySelectorAll('[data-column-table]').forEach(input => {
        input.addEventListener('change', () => {
          state.columns[input.dataset.columnTable][input.dataset.columnKey] = input.checked;
          renderAll();
          toast('Columns updated');
        });
      });
    }
    function resetColumns() {
      for (const table of Object.keys(state.columns)) for (const col of Object.keys(state.columns[table])) state.columns[table][col] = true;
      createColumnChecks();
      renderAll();
      toast('Columns reset');
    }
  </script>

  <!-- SCRIPT: POPOVERS AND FEEDBACK: layered dropdown positioning, switches, and toasts. -->
  <script>
    function openAnchoredPopover(popoverId, anchorElement) {
      const popoverElement = document.getElementById(popoverId);
      closeAllPopoversExcept(popoverId);
      const anchorRect = anchorElement.getBoundingClientRect();

      popoverElement.classList.add('open');
      popoverElement.style.visibility = 'hidden';
      popoverElement.style.left = '0px';
      popoverElement.style.top = '0px';
      popoverElement.style.width = `${Math.min(360, window.innerWidth - 24)}px`;

      const measuredRect = popoverElement.getBoundingClientRect();
      const horizontalMargin = 12;
      const verticalMargin = 12;
      const preferredWidth = Math.min(360, window.innerWidth - horizontalMargin * 2);
      const preferredLeft = anchorRect.right - preferredWidth;
      const safeLeft = Math.max(horizontalMargin, Math.min(preferredLeft, window.innerWidth - preferredWidth - horizontalMargin));

      const spaceBelow = window.innerHeight - anchorRect.bottom - verticalMargin;
      const spaceAbove = anchorRect.top - verticalMargin;
      const openAbove = measuredRect.height > spaceBelow && spaceAbove > spaceBelow;
      const maxAvailableHeight = Math.max(180, (openAbove ? spaceAbove : spaceBelow) - 8);
      const safeTop = openAbove
        ? Math.max(verticalMargin, anchorRect.top - Math.min(measuredRect.height, maxAvailableHeight) - 8)
        : Math.min(anchorRect.bottom + 8, window.innerHeight - Math.min(measuredRect.height, maxAvailableHeight) - verticalMargin);

      popoverElement.style.left = `${safeLeft}px`;
      popoverElement.style.top = `${safeTop}px`;
      popoverElement.style.maxHeight = `${maxAvailableHeight}px`;
      popoverElement.style.visibility = 'visible';
      anchorElement.classList.add('active');
    }
    function closeAllPopoversExcept(exceptId) {
      document.querySelectorAll('.popover.open').forEach(p => { if (p.id !== exceptId) p.classList.remove('open'); });
      ['filterBtn','columnsBtn','alertsBtn','settingsBtn','timeRangeBtn','logScopeBtn','logLinesBtn'].forEach(id => {
        const btn = document.getElementById(id);
        if (btn && (!exceptId || !document.getElementById(exceptId)?.classList.contains('open'))) btn.classList.remove('active');
      });
      if (exceptId) {
        const map = { filterPopover: 'filterBtn', columnsPopover: 'columnsBtn', alertsPopover: 'alertsBtn', settingsPopover: 'settingsBtn', timePopover: 'timeRangeBtn', logScopePopover: 'logScopeBtn', logLinesPopover: 'logLinesBtn' };
        Object.entries(map).forEach(([pid, bid]) => { if (pid !== exceptId) document.getElementById(bid)?.classList.remove('active'); });
      }
    }
    function bindPopoverTrigger(buttonId, popoverId) {
      document.getElementById(buttonId).addEventListener('click', e => {
        e.stopPropagation();
        const pop = document.getElementById(popoverId);
        if (pop.classList.contains('open')) { pop.classList.remove('open'); document.getElementById(buttonId).classList.remove('active'); }
        else openAnchoredPopover(popoverId, document.getElementById(buttonId));
      });
    }
    function toast(message) {
      const item = document.createElement('div');
      item.className = 'toast';
      item.textContent = message;
      els.toastStack.appendChild(item);
      setTimeout(() => { item.style.opacity = '0'; item.style.transform = 'translateY(6px)'; }, 2200);
      setTimeout(() => item.remove(), 2600);
    }
    function setSwitch(el, on) {
      el.classList.toggle('off', !on);
      el.setAttribute('aria-checked', String(on));
    }
    function bindSwitch(el, getter, setter) {
      const toggle = () => { setter(!getter()); };
      el.addEventListener('click', toggle);
      el.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); toggle(); } });
    }
  </script>

  <!-- SCRIPT: EVENT WIRING AND STARTUP: binds all controls and starts the live mock session. -->
  <script>
    function setupEvents() {
      document.getElementById('rootViewBtn').addEventListener('click', () => setMode('root'));
      document.getElementById('normalViewBtn').addEventListener('click', () => setMode('normal'));
      document.getElementById('topPauseBtn').addEventListener('click', () => togglePause());
      document.getElementById('logPauseBtn').addEventListener('click', () => togglePause());
      document.getElementById('clearLogsBtn').addEventListener('click', () => {
        const key = state.selectedUser === 'all' ? (state.mode === 'root' ? 'root' : 'john') : state.selectedUser;
        if (logData[key]) logData[key] = [];
        renderLogs();
        toast('Current log scope cleared');
      });
      document.getElementById('userExpandBtn').addEventListener('click', () => { state.userTreeExpanded = !state.userTreeExpanded; renderUsers(); toast(state.userTreeExpanded ? 'User tree expanded' : 'User tree collapsed'); });
      document.getElementById('userTreeBtn').addEventListener('click', () => { state.userView = 'tree'; renderUsers(); toast('User tree view'); });
      document.getElementById('userListBtn').addEventListener('click', () => { state.userView = 'list'; renderUsers(); toast('User list view'); });
      document.getElementById('processExpandBtn').addEventListener('click', () => {
        const ids = collectIds(getProcessesForUser(state.selectedUser));
        const allExpanded = ids.every(id => state.processExpanded.has(id));
        state.processExpanded = allExpanded ? new Set() : new Set(ids);
        state.allProcessesExpanded = !allExpanded;
        renderProcesses();
        toast(allExpanded ? 'Process tree collapsed' : 'Process tree expanded');
      });
      document.getElementById('processTreeBtn').addEventListener('click', () => { state.processView = 'tree'; renderProcesses(); toast('Process tree view'); });
      document.getElementById('processListBtn').addEventListener('click', () => { state.processView = 'list'; renderProcesses(); toast('Process list view'); });
      els.userSearch.addEventListener('input', e => { state.search.user = e.target.value; renderUsers(); });
      els.processSearch.addEventListener('input', e => { state.search.process = e.target.value; renderProcesses(); });
      els.logSearch.addEventListener('input', e => { state.search.log = e.target.value; renderLogs(); });

      bindPopoverTrigger('filterBtn', 'filterPopover');
      bindPopoverTrigger('columnsBtn', 'columnsPopover');
      bindPopoverTrigger('alertsBtn', 'alertsPopover');
      bindPopoverTrigger('settingsBtn', 'settingsPopover');
      bindPopoverTrigger('timeRangeBtn', 'timePopover');
      bindPopoverTrigger('logScopeBtn', 'logScopePopover');
      bindPopoverTrigger('logLinesBtn', 'logLinesPopover');
      document.getElementById('themeToggleBtn').addEventListener('click', toggleLightDarkMode);
      document.getElementById('themeModeSelect').addEventListener('change', e => applyThemeMode(e.target.value, { announce: true }));

      document.querySelectorAll('[data-close-popover]').forEach(btn => btn.addEventListener('click', () => closeAllPopoversExcept()));
      document.addEventListener('click', e => {
        if (!e.target.closest('.popover') && !e.target.closest('.tool-button') && !e.target.closest('.select-like')) closeAllPopoversExcept();
      });
      document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAllPopoversExcept(); });

      document.querySelectorAll('[data-filter-level]').forEach(input => input.addEventListener('change', () => { state.filters.levels[input.dataset.filterLevel] = input.checked; renderLogs(); updateFilterBadge(); toast('Log level filter updated'); }));
      document.querySelectorAll('[data-filter-status]').forEach(input => input.addEventListener('change', () => { state.filters.statuses[input.dataset.filterStatus] = input.checked; renderProcesses(); updateFilterBadge(); toast('Process status filter updated'); }));
      document.getElementById('minCpuInput').addEventListener('input', e => { state.filters.minCpu = Number(e.target.value || 0); renderProcesses(); updateFilterBadge(); });
      document.getElementById('resetFiltersBtn').addEventListener('click', () => {
        state.filters = { levels: { INFO: true, DEBUG: true, WARN: true, ERROR: true }, statuses: { Running: true, Sleeping: true, Stopped: true, Zombie: true }, minCpu: 0 };
        document.querySelectorAll('[data-filter-level],[data-filter-status]').forEach(i => i.checked = true);
        document.getElementById('minCpuInput').value = 0;
        renderAll();
        toast('Filters reset');
      });
      document.getElementById('resetColumnsBtn').addEventListener('click', resetColumns);
      document.getElementById('markAlertsReadBtn').addEventListener('click', () => { state.alerts = []; renderAll(); toast('Alerts marked read'); });
      document.querySelectorAll('input[name="timeRange"]').forEach(input => input.addEventListener('change', () => { state.timeRange = input.value; updateLabels(); toast(`${state.timeRange} selected`); closeAllPopoversExcept(); }));
      document.querySelectorAll('input[name="logScope"]').forEach(input => input.addEventListener('change', () => { state.logScope = input.value; renderLogs(); updateLabels(); toast('Log scope updated'); closeAllPopoversExcept(); }));
      document.querySelectorAll('input[name="logLines"]').forEach(input => input.addEventListener('change', () => { state.logLineCap = Number(input.value); document.getElementById('settingsLogLines').value = input.value; renderLogs(); updateLabels(); toast(`Log line cap set to ${input.value}`); closeAllPopoversExcept(); }));

      bindSwitch(document.getElementById('footerAutoScroll'), () => state.autoScroll, val => { state.autoScroll = val; setSwitch(document.getElementById('footerAutoScroll'), val); toast(val ? 'Auto-scroll enabled' : 'Auto-scroll disabled'); });
      bindSwitch(document.getElementById('compactSwitch'), () => state.compact, val => { state.compact = val; document.body.classList.toggle('compact', val); setSwitch(document.getElementById('compactSwitch'), val); toast(val ? 'Compact rows enabled' : 'Comfortable rows enabled'); });
      bindSwitch(document.getElementById('sparksSwitch'), () => state.showSparks, val => { state.showSparks = val; document.body.classList.toggle('hide-sparks', !val); setSwitch(document.getElementById('sparksSwitch'), val); toast(val ? 'Sparklines shown' : 'Sparklines hidden'); });
      bindSwitch(document.getElementById('contrastSwitch'), () => state.highContrast, val => { state.highContrast = val; document.body.classList.toggle('high-contrast', val); setSwitch(document.getElementById('contrastSwitch'), val); toast(val ? 'High contrast enabled' : 'High contrast disabled'); });
      bindSwitch(document.getElementById('motionSwitch'), () => state.reduceMotion, val => { state.reduceMotion = val; document.body.classList.toggle('reduce-motion', val); setSwitch(document.getElementById('motionSwitch'), val); toast(val ? 'Motion reduced' : 'Motion restored'); });
      document.getElementById('refreshSelect').addEventListener('change', e => { state.refreshMs = Number(e.target.value); restartTimer(); toast('Refresh interval updated'); });
      document.getElementById('settingsLogLines').addEventListener('change', e => { state.logLineCap = Number(e.target.value); document.querySelector(`input[name="logLines"][value="${e.target.value}"]`).checked = true; renderLogs(); updateLabels(); toast(`Log line cap set to ${e.target.value}`); });
      document.getElementById('resetLayoutBtn').addEventListener('click', () => {
        state.userView = 'tree'; state.processView = 'tree'; state.userTreeExpanded = true; state.compact = false; state.showSparks = true; state.highContrast = false; state.reduceMotion = false; state.autoScroll = true; state.logScope = 'selected'; state.logLineCap = 5000; state.refreshMs = 1400;
        document.body.classList.remove('compact', 'hide-sparks', 'high-contrast', 'reduce-motion');
        setSwitch(document.getElementById('compactSwitch'), false); setSwitch(document.getElementById('sparksSwitch'), true); setSwitch(document.getElementById('contrastSwitch'), false); setSwitch(document.getElementById('motionSwitch'), false); setSwitch(document.getElementById('footerAutoScroll'), true);
        document.getElementById('refreshSelect').value = '1400'; document.getElementById('settingsLogLines').value = '5000'; document.querySelector('input[name="logScope"][value="selected"]').checked = true; document.querySelector('input[name="logLines"][value="5000"]').checked = true;
        restartTimer(); renderAll(); toast('Layout reset');
      });
      document.getElementById('fullscreenBtn').addEventListener('click', async () => {
        try {
          if (!document.fullscreenElement && document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
          else if (document.exitFullscreen) await document.exitFullscreen();
          document.getElementById('fullscreenBtn').classList.toggle('active', !!document.fullscreenElement);
          toast(document.fullscreenElement ? 'Fullscreen enabled' : 'Fullscreen exited');
        } catch (err) {
          document.body.classList.toggle('fullscreen-fallback');
          document.getElementById('fullscreenBtn').classList.toggle('active', document.body.classList.contains('fullscreen-fallback'));
          toast('Fullscreen fallback toggled');
        }
      });
    }

    function init() {
      initializeThemeMode();
      createColumnChecks();
      setupEvents();
      const initialMode = location.hash.replace('#','') === 'normal' ? 'normal' : 'root';
      state.selectedUser = initialMode === 'root' ? 'root' : 'john';
      state.mode = initialMode;
      state.processExpanded = new Set(collectIds(getProcessesForUser(state.selectedUser)));
      document.getElementById('rootViewBtn').classList.toggle('active', initialMode === 'root');
      document.getElementById('normalViewBtn').classList.toggle('active', initialMode === 'normal');
      renderAll();
      restartTimer();
    }
    init();
  </script>
</body>
</html>
````````

## `src/imports/README.md`

- Category: imported artifact/schema.
- Imports: No direct imports in this file.
- Exports: No named exports detected; inspect the default/component body.
- Reuse guidance: Use this imported artifact/schema as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````md
# Airtable

Read/write Airtable through centralized backend capabilities.

This node is command-capable and routes backend operations through `executeBackend`. It does not access Supabase or Neo4j directly.
````````

## `src/imports/worker.ts`

- Category: imported artifact/schema.
- Imports: import type { WorkflowCommandToolSpec, WorkerExecuteResult, WorkerPayload, WorkerScope, WorkerUpdateResult, WorkerValidateResult } from '@workflow/executor';, import { normalizeResult } from '@workflow/executor';, import { executeBackend } from '@workflow/execute';
- Exports: export const validate = async (payload: WorkerPayload): Promise<WorkerValidateResult> => {, export const init = async (payload: WorkerPayload): Promise<boolean> => { NODE_SCOPE.workflowId = text(record(payload.workflow?.metadata).id); return true; };, export const onUpdate = async (payload: WorkerPayload): Promise<WorkerUpdateResult> => { NODE_SCOPE.lastStatus = payload.self?.status || NODE_SCOPE.lastStatus; NODE_SCOPE.lastOutput = payload.self?.OUTPUT || NODE_SCOPE.lastOutput; return { ok: true, error: null }; };, export const execute = async (payload: WorkerPayload): Promise<WorkerExecuteResult> => {, export const commandToolSpec = async (payload: WorkerPayload): Promise<WorkflowCommandToolSpec> => {
- Reuse guidance: Use this imported artifact/schema as an approved UI Kit source. Preserve its data attributes, accessibility intent, empty/error/loading states, and composition pattern.
- Software Builder rule: prefer reusing this pattern before generating a new widget; adapt data bindings and permissions, but keep the visual contract consistent.

````````ts
import type { WorkflowCommandToolSpec, WorkerExecuteResult, WorkerPayload, WorkerScope, WorkerUpdateResult, WorkerValidateResult } from '@workflow/executor';
import { normalizeResult } from '@workflow/executor';
import { executeBackend } from '@workflow/execute';

const NODE_SCOPE: WorkerScope = {};
const descriptor = { key: 'executeAgentRuntimeTool', service: 'services/workflow/nodes/agent-runtime-tool-handler.ts', function: 'executeAgentRuntimeTool', description: 'Executes a centralized agent/backend capability.' };
const record = (value: unknown): Record<string, unknown> => value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : {};
const text = (value: unknown): string => String(value ?? '').trim();
const nodeValue = (payload: WorkerPayload): Record<string, unknown> => record((payload as { NODE?: unknown }).NODE || (payload as { self?: unknown }).self || payload);
const runtime = (payload: WorkerPayload): Record<string, unknown> => ({ ...record(nodeValue(payload).runtime), ...record(nodeValue(payload).properties), ...record(payload.input) });

export const validate = async (payload: WorkerPayload): Promise<WorkerValidateResult> => {
  const data = runtime(payload);
  const warnings: string[] = [];
  if (!text(data.operation || data.action || data.prompt || data.query || data.message)) warnings.push('This node will read operation/query/message from workflow input if not configured.');
  return { ok: true, errors: [], warnings, normalizedRuntime: data };
};

export const init = async (payload: WorkerPayload): Promise<boolean> => { NODE_SCOPE.workflowId = text(record(payload.workflow?.metadata).id); return true; };
export const onUpdate = async (payload: WorkerPayload): Promise<WorkerUpdateResult> => { NODE_SCOPE.lastStatus = payload.self?.status || NODE_SCOPE.lastStatus; NODE_SCOPE.lastOutput = payload.self?.OUTPUT || NODE_SCOPE.lastOutput; return { ok: true, error: null }; };

export const execute = async (payload: WorkerPayload): Promise<WorkerExecuteResult> => {
  try {
    const data = runtime(payload);
    const tool = { id: 'mcp.execute', name: 'Airtable', description: 'Read/write Airtable through centralized backend capabilities.', kind: 'database', mutates: true, mutationPolicy: 'confirmation-required' };
    const action = { id: `${tool.id}-${Date.now()}`, tool: tool.id, reason: text(data.reason || data.prompt || data.message || tool.description), input: data };
    const result = await executeBackend(descriptor, { tool, action, NODE: nodeValue(payload), payload, NODE_SCOPE });
    return normalizeResult(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Node execution failed.';
    return { output: { error: message }, status: 'failed', logs: [message] };
  }
};

export const commandToolSpec = async (payload: WorkerPayload): Promise<WorkflowCommandToolSpec> => {
  const node = nodeValue(payload);
  const data = runtime(payload);
  return {
    toolName: text(node.name || data.name || 'Airtable'),
    toolDescription: text(data.description || data.toolDescription || 'Read/write Airtable through centralized backend capabilities.'),
    inputContract: { required: [], optional: [{ key: 'operation', label: 'Operation' }, { key: 'prompt', label: 'Prompt' }, { key: 'query', label: 'Query' }, { key: 'data', label: 'Data' }, { key: 'config', label: 'Config' }] },
    outputContract: [{ key: 'output', label: 'Output' }, { key: 'files', label: 'Files' }, { key: 'logs', label: 'Logs' }],
    metadata: { modelId: 'airtable', toolDomain: 'database', mutating: true, reusableByAiAgent: true },
    executionKind: 'tool',
  };
};
````````
