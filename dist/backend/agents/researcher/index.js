export const ResearcherAgent = {
    name: 'researcher',
    description: 'Researches constraints, produces sourced working notes, and summarizes gaps.',
    async run(input) {
        const objective = input.objective ?? input.message;
        return ['advanced-agent:researcher', `objective: ${objective}`, `message: ${input.message}`].join('\n');
    },
};
