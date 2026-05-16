export const ImageGisAgent = {
    name: 'image-gis-agent',
    description: 'Handles GIS/image analysis prompts and structured visual outputs.',
    async run(input) {
        return ['advanced-agent:image-gis-agent', `objective: ${input.objective ?? input.message}`, input.payload ? `payload: ${JSON.stringify(input.payload)}` : '', `message: ${input.message}`].filter(Boolean).join('\n');
    },
};
