
const estState={vehicle:'SEDAN',service:'DETAILING',option:'Signature Detail'};
const optionMap={DETAILING:['Essential Detail','Signature Detail','Premium Detail'],CORRECTION:['Single Stage','Two Stage','Multi Stage'],COATING:['Signature','Premium'],TINT:['Core','Signature','Black'],PPF:['Daily Protection','Front Protection','Full Body'],'NEW CAR':['Essential','Signature','Premium']};
const prices={
'DETAILING|Essential Detail':[99000,139000],'DETAILING|Signature Detail':[179000,249000],'DETAILING|Premium Detail':[390000,520000],
'CORRECTION|Single Stage':[350000,490000],'CORRECTION|Two Stage':[550000,760000],'CORRECTION|Multi Stage':[750000,1100000],
'COATING|Signature':[590000,790000],'COATING|Premium':[890000,1190000],
'TINT|Core':[380000,520000],'TINT|Signature':[520000,760000],'TINT|Black':[760000,1050000],
'PPF|Daily Protection':[250000,390000],'PPF|Front Protection':[950000,1600000],'PPF|Full Body':[3200000,5200000],
'NEW CAR|Essential':[690000,890000],'NEW CAR|Signature':[1290000,1590000],'NEW CAR|Premium':[1890000,2290000]};
let estStep=1;function money(n){return n.toLocaleString('ko-KR')+'원'}function renderEst(){$$('.est-step').forEach((e,i)=>e.classList.toggle('active',i===estStep-1));$('#estBack').style.visibility=estStep===1?'hidden':'visible';$('#estNext').textContent=estStep===3?'예상 범위 확인':'다음';}
function renderOptions(){const el=$('#optionChoices');if(!el)return;el.innerHTML='';(optionMap[estState.service]||[]).forEach((o,i)=>{const b=document.createElement('button');b.className='choice'+(i===0?' active':'');b.textContent=o;b.type='button';b.onclick=()=>{[...el.children].forEach(x=>x.classList.remove('active'));b.classList.add('active');estState.option=o};el.appendChild(b)});estState.option=optionMap[estState.service][0]}
$$('[data-est-vehicle]').forEach(b=>b.addEventListener('click',()=>{$$('[data-est-vehicle]').forEach(x=>x.classList.remove('active'));b.classList.add('active');estState.vehicle=b.dataset.estVehicle}));
$$('[data-est-service]').forEach(b=>b.addEventListener('click',()=>{$$('[data-est-service]').forEach(x=>x.classList.remove('active'));b.classList.add('active');estState.service=b.dataset.estService;renderOptions()}));
$('#estNext')?.addEventListener('click',()=>{if(estStep<3){estStep++;renderEst();if(estStep===3)renderOptions();}else{let [lo,hi]=prices[estState.service+'|'+estState.option]||[0,0];const adj={SEDAN:1,SUV:1.12,'LARGE SUV':1.22,'SPORTS / COUPE':1.08}[estState.vehicle]||1;lo=Math.round(lo*adj/10000)*10000;hi=Math.round(hi*adj/10000)*10000;$('#estimatePrice').textContent=money(lo)+' ~ '+money(hi);$('#estimateMeta').textContent=`${estState.vehicle} · ${estState.service} · ${estState.option}`;const href=`reservation.html?vehicle=${encodeURIComponent(estState.vehicle)}&service=${encodeURIComponent(estState.service)}&option=${encodeURIComponent(estState.option)}`;$('#estimateCTA').href=href}});
$('#estBack')?.addEventListener('click',()=>{if(estStep>1){estStep--;renderEst()}});renderEst();
