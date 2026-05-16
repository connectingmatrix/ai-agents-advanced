export const ProcessMonitorControlAgent = {
    name: 'process-monitor-control-agent',
    description: 'Inspects process monitor state and recommends process abort/log actions.',
    async run(input) {
        return ['advanced-agent:process-monitor-control-agent', `objective: ${input.objective ?? input.message}`, input.payload ? `payload: ${JSON.stringify(input.payload)}` : '', `message: ${input.message}`].filter(Boolean).join('\n');
    },
};
