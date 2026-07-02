/* proyectoDevOps.js */
}


function save(){
const data = {};
checkboxes.forEach(cb=> data[cb.dataset.key]=cb.checked);
localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}


// compute progress per phase and overall
function updateProgress(){
const phases = qAll('.phase');
let totalChecked = 0; let totalBoxes = 0;
phases.forEach(phase=>{
const boxes = Array.from(phase.querySelectorAll('input[type="checkbox"][data-key]'));
const checked = boxes.filter(b=>b.checked).length;
const pct = boxes.length? Math.round( (checked/boxes.length)*100 ) : 0;
phase.querySelector('.phasePct').textContent = pct + '%';
totalChecked += checked; totalBoxes += boxes.length;
});
const overallPct = totalBoxes? Math.round((totalChecked/totalBoxes)*100):0;
overall.style.width = overallPct + '%';
overall.textContent = overallPct + '%';
}


// wire change events
checkboxes.forEach(cb=> cb.addEventListener('change', ()=>{ save(); updateProgress(); }));


exportBtn.addEventListener('click', ()=>{
const data = {};
checkboxes.forEach(cb=> data[cb.dataset.key]=cb.checked);
const blob = new Blob([JSON.stringify(data, null, 2)], {type:'application/json'});
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url; a.download = 'proyectoDevOps-progress.json';
document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
});


importBtn.addEventListener('click', ()=> fileInput.click());
fileInput.addEventListener('change', async (e)=>{
const f = e.target.files && e.target.files[0];
if(!f) return;
try{
const txt = await f.text();
const data = JSON.parse(txt);
checkboxes.forEach(cb=>{
const k = cb.dataset.key;
if(k in data) cb.checked = !!data[k];
});
save(); updateProgress();
alert('Importado correctamente');
}catch(err){alert('Error importando JSON: '+err.message)}
fileInput.value = '';
});


resetBtn.addEventListener('click', ()=>{
if(!confirm('¿Seguro que quieres resetear todo el progreso?')) return;
checkboxes.forEach(cb=> cb.checked = false);
save(); updateProgress();
});


// initial
load(); updateProgress();
})();