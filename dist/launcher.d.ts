import { type PackageLauncherPanel, type RequestContext } from './contracts.js';
export declare function createConnectingmatrixAiAgentsAdvancedStubLauncher(context?: RequestContext): PackageLauncherPanel;
export declare const createStubLauncher: typeof createConnectingmatrixAiAgentsAdvancedStubLauncher;
export declare const Launcher: {
    open: typeof createConnectingmatrixAiAgentsAdvancedStubLauncher;
    mode: "stub";
};
export declare const launcher: typeof createConnectingmatrixAiAgentsAdvancedStubLauncher;
