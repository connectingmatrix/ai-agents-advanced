# Using @connectingmatrix/ai-agents-advanced

    ```ts
    import { AdvancedAIAgents } from '@connectingmatrix/ai-agents-advanced';
const output = await AdvancedAIAgents.runAgent('software-builder-agent', { objective: 'build project shell' });
    ```

    ## Backend registration

    ```ts
    import { createPackage } from '@connectingmatrix/ai-agents-advanced';
    const module = createPackage();
    server.register(module);
    ```

    ## Frontend binding

    Packages that expose UI dataloaders support `.bindWithServer('/graphql')` or a package-owned client under `src/client`.

    ## Playable launcher

    ```bash
    npm run build
    npm test
    npm run play
    ```
