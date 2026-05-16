export const MemoryAnalystAgent = {
    name: 'memory-analyst',
    description: 'Analyses memory files and recommends ingestion modes.',
    async run(input) {
        const objective = input.objective ?? input.message;
        return ['advanced-agent:memory-analyst', `objective: ${objective}`, `message: ${input.message}`].join('\n');
    },
};
