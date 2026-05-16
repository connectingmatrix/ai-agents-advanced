export const OutputDesignerAgent = {
    name: 'output-designer',
    description: 'Builds editable Agent Output Designer contracts and preview schemas.',
    async run(input) {
        const objective = input.objective ?? input.message;
        return ['advanced-agent:output-designer', `objective: ${objective}`, `message: ${input.message}`].join('\n');
    },
};
