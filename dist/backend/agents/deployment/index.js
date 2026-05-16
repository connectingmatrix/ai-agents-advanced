export const DeploymentAgent = {
    name: 'deployment',
    description: 'Plans deployment checks and release gates for project package adapters.',
    async run(input) {
        const objective = input.objective ?? input.message;
        return ['advanced-agent:deployment', `objective: ${objective}`, `message: ${input.message}`].join('\n');
    },
};
