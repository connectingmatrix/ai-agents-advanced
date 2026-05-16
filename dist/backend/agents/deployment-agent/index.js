export const DeploymentAgent = {
    name: 'deployment-agent',
    description: 'Plans deployment checks and release gates for package/project deployments.',
    async run(input) {
        return ['advanced-agent:deployment-agent', `objective: ${input.objective ?? input.message}`, input.payload ? `payload: ${JSON.stringify(input.payload)}` : '', `message: ${input.message}`].filter(Boolean).join('\n');
    },
};
