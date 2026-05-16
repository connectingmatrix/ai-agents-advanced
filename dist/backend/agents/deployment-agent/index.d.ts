export interface AdvancedAgentRunInput {
    objective: string;
    context?: Record<string, unknown>;
}
export interface AdvancedAgentRunOutput {
    agent: string;
    output: string;
    steps: string[];
    metadata: Record<string, unknown>;
}
export declare const deployment_agent: {
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
    run(input: AdvancedAgentRunInput): Promise<AdvancedAgentRunOutput>;
};
export default deployment_agent;
