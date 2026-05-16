export const MemoryAgent = {
    name: 'memory-agent',
    description: 'Analyzes memory files and recommends ingestion modes, summaries, and context trimming.',
    async run(input) {
        return ['advanced-agent:memory-agent', `objective: ${input.objective ?? input.message}`, input.payload ? `payload: ${JSON.stringify(input.payload)}` : '', `message: ${input.message}`].filter(Boolean).join('\n');
    },
};
