import type { AdvancedSoftwareFile, SoftwareBuildContext } from '../contracts/types';

export const buildElectronFiles = (context: SoftwareBuildContext): AdvancedSoftwareFile[] =>
  context.template.framework === 'electron'
    ? [
        {
          path: 'electron/main.ts',
          kind: 'ts',
          content:
            "import { app, BrowserWindow } from 'electron';\n\nconst createWindow = () => {\n  const win = new BrowserWindow({ width: 1440, height: 920, webPreferences: { preload: new URL('./preload.ts', import.meta.url).pathname } });\n  void win.loadFile('dist/index.html');\n};\n\napp.whenReady().then(createWindow);\n",
        },
        {
          path: 'electron/preload.ts',
          kind: 'ts',
          content: "import { contextBridge } from 'electron';\n\ncontextBridge.exposeInMainWorld('desktopRuntime', { version: '0.1.0' });\n",
        },
      ]
    : [];
