export { planner_agent } from './planner-agent/index.js';
export { researcher_agent } from './researcher-agent/index.js';
export { software_builder_agent } from './software-builder-agent/index.js';
export { deployment_agent } from './deployment-agent/index.js';
export { data_analyst_agent } from './data-analyst-agent/index.js';
export { image_gis_agent } from './image-gis-agent/index.js';
export { memory_agent } from './memory-agent/index.js';
export { platform_fix_agent } from './platform-fix-agent/index.js';
export { process_monitor_control_agent } from './process-monitor-control-agent/index.js';
export { output_designer_agent } from './output-designer-agent/index.js';
export { swarm_coordinator_agent } from './swarm-coordinator-agent/index.js';
export declare const advancedAgentRegistry: {
    name: string;
    packageName: string;
    kind: "advanced";
    title: string;
    description: string;
    inputSchema: {
        type: string;
        required: string[];
        properties: {
            objective: {
                type: string;
            };
            context: {
                type: string;
            };
        };
    };
    outputSchema: {
        type: string;
        properties: {
            output: {
                type: string;
            };
            steps: {
                type: string;
            };
        };
    };
    run(input: import("./planner-agent/index.js").AdvancedAgentRunInput): Promise<import("./planner-agent/index.js").AdvancedAgentRunOutput>;
}[];
export declare const advancedAgentNames: string[];
