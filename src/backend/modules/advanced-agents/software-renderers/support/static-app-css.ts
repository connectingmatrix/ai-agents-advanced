import { buildStyleFile } from '../io/style-file';

export const staticAppCss =
  `${
    buildStyleFile().content
  }.app-shell{background:radial-gradient(circle_at_14%_8%,#d7fff1,transparent_28%),linear-gradient(135deg,#edf5f2,#f8fafc_44%,#e7eef8);color:#102033}` +
  'aside{background:linear-gradient(180deg,#102033,#102c45 62%,#0f766e);box-shadow:20px 0 70px #10203322}nav a{display:grid;gap:4px}' +
  'nav a[aria-current=true]{background:#e6f4ef;color:#102033;border-color:#8ed1bd}nav a small{color:#a7c4dc;line-height:1.35}nav a[aria-current=true] small{color:#31506d}' +
  '.screen{display:none}.screen.active{display:grid;gap:20px}.hero h2{font-size:clamp(36px,5vw,72px);line-height:.91;margin:8px 0;letter-spacing:-.06em}.hero p{max-width:860px}' +
  '.kit-badges,.module-strip,.status-bar,.actions{display:flex;flex-wrap:wrap;gap:10px}.kit-badges span,.module-strip span,.status-bar span{background:#e6f4ef;border:1px solid #b9dfd2;border-radius:999px;padding:8px 12px}' +
  '.auth-grid,.crud-grid,.chart-grid,.agent-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px}.form-card,.chart-card,.agent-grid li{background:white;border:1px solid #d8e7f5;border-radius:22px;padding:18px;display:grid;gap:12px}' +
  'label{display:grid;gap:6px;font-weight:700}input,select,textarea{border:1px solid #cbd9e5;border-radius:14px;padding:12px;background:#f8fbfd;color:#102033}.actions button,.hero button,.hero-link{background:#0f766e;color:white;border:0;border-radius:999px;padding:12px 18px;text-decoration:none}' +
  '.metric{position:relative;overflow:hidden}.metric svg,.chart-card svg{width:100%;height:86px;color:#0f766e}.donut{max-width:220px;margin:auto}.bar{height:12px;border-radius:999px;background:#e1ecf4;overflow:hidden}.bar span{display:block;height:100%;background:linear-gradient(90deg,#0f766e,#63b3ff)}.crud-screen table{background:white}.agent-grid{padding:0;list-style:none}#toast-region{position:fixed;right:24px;bottom:24px;background:#102033;color:white;border-radius:18px;padding:14px 18px;box-shadow:0 20px 50px #10203333}#toast-region[data-kind=error]{background:#9f1239}';
