export const DataAnalystAgent = {
    name: 'data-analyst-agent',
    description: 'Analyzes connected databases, query results, runtime logs, and project telemetry.',
    async run(input) {
        return ['advanced-agent:data-analyst-agent', `objective: ${input.objective ?? input.message}`, input.payload ? `payload: ${JSON.stringify(input.payload)}` : '', `message: ${input.message}`].filter(Boolean).join('\n');
    },
};
