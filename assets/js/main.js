
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const header=$('.site-header'); addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>30),{passive:true});
const menu=$('.mobile-menu'), openBtn=$('.menu-btn'), closeBtn=$('.menu-x');
function setMenu(v){if(!menu)return;menu.classList.toggle('open',v);document.body.classList.toggle('menu-open',v);openBtn?.setAttribute('aria-expanded',String(v));}
openBtn?.addEventListener('click',()=>setMenu(true));closeBtn?.addEventListener('click',()=>setMenu(false));$$('.mobile-menu a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));addEventListener('keydown',e=>{if(e.key==='Escape')setMenu(false)});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12});$$('.reveal').forEach(el=>io.observe(el));
$$('.faq-q').forEach(btn=>btn.addEventListener('click',()=>{const item=btn.closest('.faq-item');const open=item.classList.toggle('open');btn.setAttribute('aria-expanded',open)}));
$$('img[data-fallback]').forEach(img=>img.addEventListener('error',()=>{if(img.src.endsWith(img.dataset.fallback))return;img.src=img.dataset.fallback}));
