export const OutputDesignerAgent = {
    name: 'output-designer-agent',
    description: 'Builds editable Agent Output Designer contracts and preview schemas.',
    async run(input) {
        return ['advanced-agent:output-designer-agent', `objective: ${input.objective ?? input.message}`, input.payload ? `payload: ${JSON.stringify(input.payload)}` : '', `message: ${input.message}`].filter(Boolean).join('\n');
    },
};
