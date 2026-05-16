export const GisImageAgent = {
    name: 'gis-image',
    description: 'Handles GIS/image analysis agent prompts and structured outputs.',
    async run(input) {
        const objective = input.objective ?? input.message;
        return ['advanced-agent:gis-image', `objective: ${objective}`, `message: ${input.message}`].join('\n');
    },
};
