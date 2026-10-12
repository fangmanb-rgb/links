(async()=>{
  const CAP=5,app=document.getElementById('app');
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const item=(l,cat)=>`<li><a href="${esc(l.url)}" target="_blank" rel="noopener"><span class="t">${esc(l.title)}</span>${cat?`<span class="c">${esc(cat)}</span>`:''}<span class="d">${esc(l.desc)}</span>${l.via?`<span class="v">via ${esc(l.via)}</span>`:''}</a></li>`;
  try{
    const data=await (await fetch('links.json',{cache:'no-cache'})).json();
    const archive=[...(data.archive||[])];let html='';
    // Sort categories by link count (capped at 5), most first; stable, so ties keep links.json order.
    const cats=[...(data.categories||[])].sort((a,b)=>Math.min((b.links||[]).length,CAP)-Math.min((a.links||[]).length,CAP));
    for(const c of cats){
      const links=c.links||[];
      if(links.length>CAP){console.warn(`"${c.name}" has ${links.length} links; showing first ${CAP}, rest moved to Archive.`);
        links.slice(CAP).forEach(l=>archive.unshift({...l,category:c.name}));}
      const shown=links.slice(0,CAP);if(!shown.length)continue;
      html+=`<section><h2>${esc(c.name)}</h2><ul>${shown.map(l=>item(l)).join('')}</ul></section>`;
    }
    html+=`<details><summary>Archive (${archive.length})</summary>${archive.length?`<section><ul>${archive.map(l=>item(l,l.category)).join('')}</ul></section>`:'<p class="muted" style="padding:0 16px">Nothing archived yet.</p>'}</details>`;
    app.innerHTML=html;
  }catch(e){app.innerHTML='<p class="muted">Could not load links.json (serve via http, not file://).</p>';console.error(e);}
})();
