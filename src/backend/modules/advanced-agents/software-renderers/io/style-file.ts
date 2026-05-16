import type { AdvancedSoftwareFile } from '../contracts/types';

export const buildStyleFile = (): AdvancedSoftwareFile => ({
  path: 'src/app/styles.css',
  kind: 'css',
  content:
    ':root{font-family:Manrope,Inter,system-ui,sans-serif;color:#102033;background:#e9eef3}body{margin:0}.app-shell{min-height:100vh;display:grid;grid-template-columns:300px 1fr}aside{background:#102033;color:white;padding:32px;display:flex;flex-direction:column;gap:18px}nav{display:grid;gap:8px}nav a{color:#d8e6f5;text-decoration:none;border:1px solid #31506d;border-radius:14px;padding:12px}main{padding:28px;display:grid;gap:20px}.eyebrow{text-transform:uppercase;letter-spacing:.16em;font-size:12px;color:#63b3ff}.hero,.panel,.metric{background:white;border:1px solid #d7e0ea;border-radius:24px;padding:22px;box-shadow:0 18px 50px #10203314}.hero{display:flex;align-items:center;justify-content:space-between}.hero button{background:#0f766e;color:white;border:0;border-radius:999px;padding:12px 18px}.metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(190px,1fr));gap:14px}.metric{display:grid;gap:8px}.metric strong{font-size:32px}table{width:100%;border-collapse:collapse}th,td{text-align:left;border-bottom:1px solid #e5edf5;padding:12px}.workflow-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;padding:0;list-style:none}.workflow-list li{border:1px solid #dce7f0;border-radius:18px;padding:14px;display:grid;gap:8px}@media(max-width:760px){.app-shell{grid-template-columns:1fr}aside{position:relative}.hero{display:grid;gap:16px}}',
});
