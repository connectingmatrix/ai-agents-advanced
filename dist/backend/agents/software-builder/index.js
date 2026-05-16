export const SoftwareBuilderAgent = {
    name: 'software-builder',
    description: 'Creates build/debug plans for software projects without owning project deployment.',
    async run(input) {
        const objective = input.objective ?? input.message;
        return ['advanced-agent:software-builder', `objective: ${objective}`, `message: ${input.message}`].join('\n');
    },
};
