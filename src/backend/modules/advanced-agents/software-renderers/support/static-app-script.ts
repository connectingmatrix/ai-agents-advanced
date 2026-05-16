import type { SoftwareBuildContext } from '../contracts/types';

export const buildStaticAppScript = (context: SoftwareBuildContext): string => {
  const seed = Object.fromEntries(
    context.blueprint.tables.map((table) => [
      table.name,
      context.blueprint.records.map((row, index) => ({
        id: `${table.name}-${index + 1}`,
        title: row.title,
        status: row.status,
        owner: row.owner,
        value: row.value,
      })),
    ]),
  );
  return `(() => {
const seed=${JSON.stringify(seed)}; const state={records:JSON.parse(JSON.stringify(seed)),role:'organization_admin'};
const screens=Array.from(document.querySelectorAll('[data-screen]')); const links=Array.from(document.querySelectorAll('nav a[href^="#/"]'));
const escapeHtml=(value)=>String(value??'').replace(/[&<>"']/g,(char)=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const showToast=(message,kind='success')=>{const node=document.querySelector('#toast-region'); if(node){node.textContent=message; node.dataset.kind=kind; node.hidden=false; setTimeout(()=>{node.hidden=true;},2500);}};
const api=async(operation,method='GET',body)=>{const response=await fetch('./api/'+operation,{method,headers:{'content-type':'application/json'},body:body?JSON.stringify(body):undefined}); const json=await response.json().catch(()=>({ok:false,error:'Invalid JSON'})); if(!response.ok||json.ok===false) throw new Error(json.error||'Request failed'); return json;};
const rowHtml=(entity,row)=>'<tr data-row-id="'+escapeHtml(row.id)+'"><td>'+escapeHtml(row.id)+'</td><td>'+escapeHtml(row.title)+'</td><td>'+escapeHtml(row.status)+'</td><td>'+escapeHtml(row.owner)+'</td><td>'+escapeHtml(row.value)+'</td><td><button type="button" data-action="edit" data-entity="'+escapeHtml(entity)+'" data-id="'+escapeHtml(row.id)+'">Edit</button><button type="button" data-action="delete" data-entity="'+escapeHtml(entity)+'" data-id="'+escapeHtml(row.id)+'">Delete</button></td></tr>';
const renderRows=(entity)=>{const body=document.querySelector('[data-crud-rows="'+entity+'"]'); const empty=document.querySelector('[data-empty-state="'+entity+'"]'); if(!body)return; const rows=state.records[entity]||[]; body.innerHTML=rows.map((row)=>rowHtml(entity,row)).join(''); if(empty)empty.hidden=rows.length>0;};
const formFields=(form)=>Array.from(form.elements).filter((field)=>field.name); const formRecord=(form)=>Object.fromEntries(formFields(form).map((field)=>[field.name,field.value]));
const submitCrud=async(form)=>{const entity=form.dataset.crudForm; const body=formRecord(form); if(!body.title){showToast('Title is required','error'); return;} const id=form.dataset.editId; const saved={...body,id:id||entity+'-'+Date.now()}; await api(entity+'.'+(id?'update':'create'),id?'PATCH':'POST',saved); state.records[entity]=id?(state.records[entity]||[]).map((row)=>row.id===id?saved:row):[saved,...(state.records[entity]||[])]; form.reset(); delete form.dataset.editId; renderRows(entity); showToast(id?'Record updated':'Record created');};
const show=()=>{const name=(location.hash.replace('#/','')||'home').split('?')[0]; const adminOnly=name==='settings'; const forbidden=adminOnly&&state.role!=='organization_admin'&&state.role!=='super_admin'; const selected=forbidden?screens.find((screen)=>screen.dataset.screen==='unauthorized'):screens.find((screen)=>screen.dataset.screen===name)||screens.find((screen)=>screen.dataset.screen==='not-found'); screens.forEach((screen)=>screen.classList.toggle('active',screen===selected)); links.forEach((link)=>link.setAttribute('aria-current',link.getAttribute('href')==='#/'+selected.dataset.screen?'true':'false'));};
document.querySelectorAll('[data-crud-form]').forEach((form)=>form.addEventListener('submit',(event)=>{event.preventDefault(); submitCrud(form).catch((error)=>showToast(error.message,'error'));}));
document.addEventListener('click',(event)=>{const target=event.target.closest('[data-action]'); if(!target)return; const entity=target.dataset.entity; if(target.dataset.action==='login'){state.role=document.querySelector('[data-role-select]')?.value||state.role; location.hash='#/dashboard'; showToast('Signed in as '+state.role); return;} if(target.dataset.action==='edit'){const form=document.querySelector('[data-crud-form="'+entity+'"]'); const row=(state.records[entity]||[]).find((item)=>item.id===target.dataset.id); if(form&&row){form.dataset.editId=row.id; formFields(form).forEach((field)=>{field.value=row[field.name]||'';}); showToast('Editing '+row.id);} return;} if(target.dataset.action==='delete'&&confirm('Delete this record?')){api(entity+'.delete','DELETE',{id:target.dataset.id}).then(()=>{state.records[entity]=(state.records[entity]||[]).filter((row)=>row.id!==target.dataset.id); renderRows(entity); showToast('Record deleted');}).catch((error)=>showToast(error.message,'error'));}});
document.querySelectorAll('[data-crud-rows]').forEach((node)=>renderRows(node.dataset.crudRows)); addEventListener('hashchange',show); show();
})();`;
};
