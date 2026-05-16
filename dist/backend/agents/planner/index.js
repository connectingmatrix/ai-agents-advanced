export const PlannerAgent = {
    name: 'planner',
    description: 'Plans multi-step tasks and validates execution shape.',
    async run(input) {
        const objective = input.objective ?? input.message;
        return ['advanced-agent:planner', `objective: ${objective}`, `message: ${input.message}`].join('\n');
    },
};
