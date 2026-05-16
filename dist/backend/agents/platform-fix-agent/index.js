export const PlatformFixAgent = {
    name: 'platform-fix-agent',
    description: 'Diagnoses package wiring, health, migrations, and runtime contract failures.',
    async run(input) {
        return ['advanced-agent:platform-fix-agent', `objective: ${input.objective ?? input.message}`, input.payload ? `payload: ${JSON.stringify(input.payload)}` : '', `message: ${input.message}`].filter(Boolean).join('\n');
    },
};
