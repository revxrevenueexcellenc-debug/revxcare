const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
/* services tabs (Physician Billing copy is from Figma; other four tabs are drafts) */
const S=[
['stethoscope','Physician Billing','Clean claims for sleep medicine providers','Accurate coding, timely claim submission and consistent follow-up, so your practice gets paid for the care it delivers.',['Coding review','Claim submission','Payment follow-up']],
['flask','Lab Billing','Clean claims for sleep labs','Authorization, technical claims and payer follow-up for independent and multi-site sleep labs.',['Eligibility checks','Authorization tracking','Payment posting']],
['hospital','Hospital Billing','Billing for hospital sleep programs','Facility claims handled with the accuracy and documentation hospital sleep programs require.',['Facility claim submission','Denial follow-up','A/R management']],
['heartbeat','RPM/CCM','Recurring revenue, captured','Monthly remote patient monitoring and chronic care management billing, with requirements tracked so claims go out clean.',['Consent tracking','Time-log review','Monthly claims']],
['arrows-clockwise','End-to-End RCM','Full-cycle revenue management','From eligibility and prior authorization to billing, denial management, and collections.',['Eligibility &amp; prior auth','Billing &amp; denials','Collections']]];
const tabs=$$('.tabs button'),sc=$('#sc'),big=$('#big');
function tab(i){tabs.forEach((b,k)=>b.classList.toggle('on',k===i));const[c,t,s,d,l]=S[i];big.className='big ph ph-'+c;
sc.className='swap';void sc.offsetWidth;
sc.innerHTML=`<p class="cnt">0${i+1} / 05</p><h3>${t}</h3><p class="sub">${s}</p><p class="d">${d}</p><ul>${l.map(x=>`<li><i class="ph ph-check"></i>${x}</li>`).join('')}</ul><a class="btn out" href="#contact">Learn more</a>`}
tabs.forEach((b,i)=>b.onclick=()=>tab(i));tab(0);
$$('[data-tab]').forEach(a=>a.addEventListener('click',()=>tab(+a.dataset.tab)));
/* mobile menu */
const nav=$('#nav'),bg=$('.burger');bg.onclick=()=>{const o=nav.classList.toggle('open');bg.setAttribute('aria-expanded',o)};
$$('#nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
/* hero heading: words fade in */
const h1=$('#h1');let d=0;(function w(n){[...n.childNodes].forEach(c=>{if(c.nodeType===3){const f=document.createDocumentFragment();c.textContent.split(/(\s+)/).forEach(p=>{if(!p.trim())return f.append(p);const s=document.createElement('span');s.className='w1';s.style.animationDelay=(d++*.09)+'s';s.textContent=p;f.append(s)});c.replaceWith(f)}else w(c)})})(h1);
/* reveal */
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.12});$$('.rv').forEach(el=>io.observe(el));
/* scroll effects */
const hero=$('.hero'),brand=$('.brand'),hs=$('.hs'),track=$('.track'),steps=$('.steps'),bar2=$('.bar2'),st=$$('.step'),links=$$('#nav a');
const secs=links.map(a=>$(a.getAttribute('href')));
function hsSize(){if(innerWidth<=900){hs.style.height='';track.style.transform='';return}hs.style.height=(track.scrollWidth-innerWidth+innerHeight+96)+'px'}
function onScroll(){
 brand.classList.toggle('hide',scrollY>hero.offsetHeight-120);
 if(innerWidth>900){const r=hs.getBoundingClientRect(),max=hs.offsetHeight-innerHeight,p=Math.min(Math.max(-r.top/max,0),1);track.style.transform=`translateX(${-p*(track.scrollWidth-innerWidth)}px)`}
 const r=steps.getBoundingClientRect(),h=innerHeight,p=Math.min(Math.max((h*.6-r.top)/r.height,0),1);bar2.style.height=p*100+'%';
 st.forEach(s=>s.classList.toggle('on',s.getBoundingClientRect().top<h*.62));
 let cur=-1;secs.forEach((s,i)=>{if(s&&s.getBoundingClientRect().top<h*.4)cur=i});links.forEach((a,i)=>a.classList.toggle('on',i===cur))}
addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',()=>{hsSize();onScroll()});
document.fonts.ready.then(()=>{hsSize();onScroll()});hsSize();onScroll();
/* faq */
$$('.q button').forEach(b=>b.onclick=()=>{const q=b.parentElement,o=!q.classList.contains('open');$$('.q').forEach(x=>{x.classList.remove('open');$('button',x).setAttribute('aria-expanded','false')});if(o){q.classList.add('open');b.setAttribute('aria-expanded','true')}});
/* contact form -> /api/contact */
const f=$('#cf'),m=$('#msg');
f.onsubmit=async e=>{e.preventDefault();const b=f.querySelector('.btn');b.disabled=true;m.textContent='Sending…';
try{const r=await fetch('/api/contact',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(Object.fromEntries(new FormData(f)))});if(!r.ok)throw 0;f.reset();m.textContent='Thank you. We’ll reply within one business day.'}
catch{m.innerHTML='Something went wrong. Please email <a href="mailto:info@revxcare.com"><u>info@revxcare.com</u></a>.'}b.disabled=false};
