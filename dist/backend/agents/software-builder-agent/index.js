export const SoftwareBuilderAgent = {
    name: 'software-builder-agent',
    description: 'Creates build/debug plans for software projects while delegating deployment ownership to projects.',
    async run(input) {
        return ['advanced-agent:software-builder-agent', `objective: ${input.objective ?? input.message}`, input.payload ? `payload: ${JSON.stringify(input.payload)}` : '', `message: ${input.message}`].filter(Boolean).join('\n');
    },
};
