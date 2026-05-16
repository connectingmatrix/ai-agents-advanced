export const ResearcherAgent = {
    name: 'researcher-agent',
    description: 'Researches constraints, produces sourced working notes, and summarizes gaps.',
    async run(input) {
        return ['advanced-agent:researcher-agent', `objective: ${input.objective ?? input.message}`, input.payload ? `payload: ${JSON.stringify(input.payload)}` : '', `message: ${input.message}`].filter(Boolean).join('\n');
    },
};
