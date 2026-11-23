(()=>{
'use strict';
const $=(selector)=>document.querySelector(selector);
const $$=(selector)=>[...document.querySelectorAll(selector)];
const facebook='https://www.facebook.com/share/1deLJW2QHp/';
const email='1064euroblend@gmail.com';
const menu=$('#mobile-menu'),nav=$('#site-nav');
if(menu&&nav){
 const close=()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');nav.classList.remove('is-open')};
 menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));menu.setAttribute('aria-label',open?'Open menu':'Close menu');nav.classList.toggle('is-open',!open)});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
}
const year=$('#year');if(year)year.textContent=String(new Date().getFullYear());
const flavors=[
 {key:'latte',name:'Ube Latte',html:'Ube<br>Latte',eyebrow:'THE SIGNATURE',description:'A latte-inspired expression of a familiar ube favorite.',image:'ube-latte',width:1122,family:'cafe'},
 {key:'milk',name:'Ube Milk',html:'Ube<br>Milk',eyebrow:'A GENTLER MOMENT',description:'A milk-inspired pairing in the Euro Blend ube collection.',image:'ube-milk',width:1000,family:'velvet'},
 {key:'classic',name:'Ube Classic',html:'Ube<br>Classic',eyebrow:'FAMILIAR AT HEART',description:'The classic expression of the ube flavor.',image:'ube-classic',width:1000,family:'velvet'},
 {key:'macchiato',name:'Ube Macchiato',html:'Ube<br>Macchiato',eyebrow:'THE CAFÉ EDIT',description:'A macchiato-inspired ube pairing.',image:'ube-macchiato',width:1000,family:'cafe'},
 {key:'vanilla',name:'Ube Vanilla',html:'Ube<br>Vanilla',eyebrow:'A FAMILIAR PAIRING',description:'Ube and vanilla in one flavor idea.',image:'ube-vanilla',width:1000,family:'velvet'},
 {key:'salted-caramel',name:'Ube Salted Caramel',html:'Ube Salted<br>Caramel',eyebrow:'SWEET MEETS SALTY',description:'A sweet-and-salty ube pairing.',image:'ube-salted-caramel',width:1000,family:'velvet'},
 {key:'criollo-cacao',name:'Ube Criollo Cacao',html:'Ube Criollo<br>Cacao',eyebrow:'THE CACAO EDIT',description:'An ube-and-Criollo-cacao-inspired flavor.',image:'ube-criollo-cacao',width:1000,family:'cafe'},
 {key:'criollo-salted-caramel',name:'Ube Criollo Salted Caramel',html:'Ube Criollo<br>Salted Caramel',eyebrow:'THE UNEXPECTED PAIRING',description:'Cacao-inspired notes and salted caramel in the flavor name.',image:'ube-criollo-salted-caramel',width:1000,family:'cafe'}
];
if(!$('#flavor-showcase'))return; // Trade page shares navigation, not the interactive home showcase.
const select=$('#flavor-showcase'),image=$('#flavor-image'),title=$('#flavor-title'),eyebrow=$('#flavor-eyebrow'),description=$('#flavor-description'),counter=$('#flavor-count'),enquire=$('#flavor-enquire'),copy=$('#copy-flavor'),status=$('#copy-status');
const rail=$('.flavor-rail'),buttons=$$('.flavor-rail__option'),groups=$$('.flight-groups__tab');
const add=$('#add-to-flight'),tastingList=$('#tasting-list'),tastingStatus=$('#tasting-status'),tastingEmail=$('#tasting-email');
let selected=5,activeFamily='velvet';
const saved=[];
const indices=()=>flavors.map((f,i)=>f.family===activeFamily?i:-1).filter(i=>i>=0);
const productPhotos={latte:'ube-latte',macchiato:'ube-macchiato','criollo-cacao':'ube-criollo-cacao','criollo-salted-caramel':'ube-criollo-salted-caramel'};
let packView='carton';
const sourceText=(()=>{const p=new URLSearchParams(location.search),parts=[];for(const field of ['utm_source','utm_campaign','ref']){const value=(p.get(field)||'').replace(/[^a-zA-Z0-9 _.-]/g,'').slice(0,70);if(value)parts.push(field+': '+value)}return parts.length?'\nWhere I found Euro Blend: '+parts.join(' / '):''})();
const emailHref=(subject,body)=>`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
const simpleEnquiry=(names)=>'Hello Euro Blend! I would like to ask about '+names.join(', ')+'. Please share current pack sizes, pricing, availability and delivery options. Thank you.';
const copyText=async(value)=>{
 try{if(!navigator.clipboard?.writeText)throw Error('Clipboard unavailable');await navigator.clipboard.writeText(value);return true}
 catch{return false}
};
function renderTasting(){
 tastingList.replaceChildren();
 if(saved.length===0){const empty=document.createElement('span');empty.className='tasting-edit__empty';empty.textContent='No flavors selected yet.';tastingList.append(empty)}
 else saved.forEach(i=>{
  const button=document.createElement('button');button.type='button';button.className='tasting-edit__chip';button.setAttribute('aria-label','Remove '+flavors[i].name+' from your tasting edit');
  button.append(document.createTextNode(flavors[i].name));const close=document.createElement('span');close.textContent='×';close.setAttribute('aria-hidden','true');button.append(close);
  button.addEventListener('click',()=>{saved.splice(saved.indexOf(i),1);tastingStatus.textContent='Removed '+flavors[i].name+'.';renderTasting()});tastingList.append(button)
 });
 const names=saved.map(i=>flavors[i].name);
 tastingEmail.href=emailHref('Euro Blend flavor enquiry',simpleEnquiry(names.length?names:['your ube collection'])+sourceText);
 add.setAttribute('aria-pressed',String(saved.includes(selected)));
 add.firstChild.textContent=saved.includes(selected)?'Remove from my edit ':'Add to my edit ';
}
function choose(i){
 if(!flavors[i]||flavors[i].family!==activeFamily)return;
 selected=i;const f=flavors[selected];select.dataset.flavor=f.key;
 const photo=productPhotos[f.key];
 packView='carton';
 $('#pack-view').hidden=!photo;
 $('#pack-carton').classList.add('is-active');$('#pack-carton').setAttribute('aria-pressed','true');
 $('#pack-sachet').classList.remove('is-active');$('#pack-sachet').setAttribute('aria-pressed','false');
 if(photo){image.srcset=`/images/editorial-${photo}-480.webp 480w, /images/editorial-${photo}-800.webp 800w`;image.src=`/images/editorial-${photo}-800.webp`;image.alt=f.name+' packaging artwork on natural linen';}
 else{image.srcset=`/images/${f.image}-480.webp 480w, /images/${f.image}-800.webp 800w, /images/${f.image}.webp ${f.width}w`;image.src=`/images/${f.image}-800.webp`;image.alt='Illustrative Euro Blend '+f.name+' serving and packaging presentation';}
 title.innerHTML=f.html;eyebrow.textContent=f.eyebrow;description.textContent=f.description;
 counter.textContent=String(selected+1).padStart(2,'0')+' / 08';
 enquire.setAttribute('aria-label','Enquire about '+f.name+' on Euro Blend Facebook');
 buttons.forEach((b,n)=>{const active=n===selected;b.classList.toggle('is-selected',active);b.setAttribute('aria-pressed',String(active))});
 status.textContent='';renderTasting();
}
function setFamily(family){
 if(!['velvet','cafe'].includes(family))return;
 activeFamily=family;
 groups.forEach(b=>{const active=b.dataset.family===family;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active))});
 buttons.forEach((b,i)=>{b.hidden=flavors[i].family!==family});
 if(flavors[selected].family!==family)choose(indices()[0]);else choose(selected);
}
function setPackView(kind){
 const f=flavors[selected],photo=productPhotos[f.key];if(!photo)return;
 packView=kind==='sachet'?'sachet':'carton';const base=`editorial-${photo}${packView==='sachet'?'-sachet':''}`;
 image.srcset=`/images/${base}-480.webp 480w, /images/${base}-800.webp 800w`;
 image.src=`/images/${base}-800.webp`;image.alt=f.name+' '+packView+' packaging artwork on natural linen';
 for(const [key,node] of [['carton',$('#pack-carton')],['sachet',$('#pack-sachet')]]){const on=key===packView;node.classList.toggle('is-active',on);node.setAttribute('aria-pressed',String(on))}
}
$('#pack-carton').addEventListener('click',()=>setPackView('carton'));
$('#pack-sachet').addEventListener('click',()=>setPackView('sachet'));
$$('[data-feature-flavor]').forEach(b=>b.addEventListener('click',()=>{const i=Number(b.dataset.featureFlavor);setFamily(flavors[i].family);choose(i);document.querySelector('.showcase').scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth',block:'start'})}));
buttons.forEach((button,index)=>button.addEventListener('click',()=>choose(index)));
groups.forEach(button=>button.addEventListener('click',()=>setFamily(button.dataset.family)));
const rotate=step=>{const list=indices(),pos=list.indexOf(selected);choose(list[(pos+step+list.length)%list.length])};
$('#prev-flavor').addEventListener('click',()=>rotate(-1));$('#next-flavor').addEventListener('click',()=>rotate(1));
rail.addEventListener('keydown',e=>{if(!['ArrowRight','ArrowLeft'].includes(e.key))return;e.preventDefault();rotate(e.key==='ArrowRight'?1:-1);buttons[selected].focus()});
add.addEventListener('click',()=>{
 const pos=saved.indexOf(selected);
 if(pos>=0){saved.splice(pos,1);tastingStatus.textContent='Removed '+flavors[selected].name+'.'}
 else if(saved.length>=3){tastingStatus.textContent='You can select up to three flavors for one enquiry.';return}
 else{saved.push(selected);tastingStatus.textContent='Added '+flavors[selected].name+'.'}
 renderTasting();
});
copy.addEventListener('click',async()=>{const okay=await copyText(simpleEnquiry([flavors[selected].name]));status.textContent=okay?'Enquiry copied. Paste it into a Facebook message.':'Copy unavailable here. Mention '+flavors[selected].name+' when you message Euro Blend.'});
$('#tasting-copy').addEventListener('click',async()=>{const names=saved.map(i=>flavors[i].name);if(!names.length){tastingStatus.textContent='Choose a flavor first.';return}const okay=await copyText(simpleEnquiry(names));tastingStatus.textContent=okay?'Your tasting edit is copied and ready to send.':'Copy unavailable. You can open an email draft instead.'});
setFamily(activeFamily);renderTasting();
// Theme controls change appearance and creative story only. They do not claim a morning/evening formulation.
const moodButtons=$$('[data-mood-choice]');
function setMood(mood){
 const active=mood==='purple-hour'?'purple-hour':'morning';document.body.dataset.mood=active;
 moodButtons.forEach(b=>{const on=b.dataset.moodChoice===active;b.classList.toggle('is-active',on);b.setAttribute('aria-pressed',String(on))});
 $('#hero-strap').textContent=active==='morning'?'A FILIPINO FAVORITE, REIMAGINED':'AN EVENING MOOD, A FAMILIAR FLAVOR';
 $('#hero-script').textContent=active==='morning'?'the everyday, elevated.':'after hours.';
 $('#hero-lead').textContent=active==='morning'?'Inspired by the flavors Filipinos love. A collection made to discover, one blend at a time.':'Some moments call for something different. Explore eight flavors in a richer evening atmosphere.';
 $('#photo-tag').textContent=active==='morning'?'START HERE':'THE EVENING EDIT';
 $('#photo-feature').textContent=active==='morning'?'Ube Latte / Deep Ube':'Ube Criollo Salted Caramel';
 $('#browser-theme-color').setAttribute('content',active==='morning'?'#faf6ed':'#18131b');
 if(active==='purple-hour'){$('.hero__photo-night').loading='eager'}
 try{localStorage.setItem('euroblend-mood',active)}catch{}
}
let remembered='morning';try{remembered=localStorage.getItem('euroblend-mood')||'morning'}catch{}
setMood(remembered);
moodButtons.forEach(b=>b.addEventListener('click',()=>setMood(b.dataset.moodChoice)));
// Conversion pathways: contact only, no invisible lead collection or promise of order submission.
let type='personal';const personal=$('#enquiry-personal'),trade=$('#enquiry-trade'),action=$('#enquiry-action'),guide=$('#enquiry-guide'),enquiryStatus=$('#enquiry-status');
function currentMessage(){const names=saved.map(i=>flavors[i].name);return type==='personal'?simpleEnquiry(names.length?names:['the Euro Blend Ube Collection']):'Hello Euro Blend! I am enquiring about hospitality, café or retail supply. Please share your current product list, pack specifications, business pricing and applicable terms. '+(names.length?'Flavors of interest: '+names.join(', ')+'. ':'')+'Thank you.'}
function setEnquiry(kind){type=kind==='trade'?'trade':'personal';personal.classList.toggle('is-active',type==='personal');trade.classList.toggle('is-active',type==='trade');personal.setAttribute('aria-pressed',String(type==='personal'));trade.setAttribute('aria-pressed',String(type==='trade'));guide.textContent=type==='personal'?'Ask about flavor availability, current prices and delivery through the official Euro Blend Facebook page.':'Ask about café, retail or hospitality requirements through the Euro Blend business enquiry email.';action.href=type==='personal'?facebook:emailHref('Euro Blend hospitality and trade enquiry',currentMessage()+sourceText);action.innerHTML=type==='personal'?'Message on Facebook <span aria-hidden="true">↗</span>':'Open business email draft <span aria-hidden="true">↗</span>';enquiryStatus.textContent=''}
personal.addEventListener('click',()=>setEnquiry('personal'));trade.addEventListener('click',()=>setEnquiry('trade'));
$('#enquiry-copy').addEventListener('click',async()=>{const okay=await copyText(currentMessage());enquiryStatus.textContent=okay?'Enquiry copied and ready to paste.':'Copy unavailable. You can use the contact link above.'});
setEnquiry('personal');
// Progressive enhancement: do not hide content if animation observer fails or reduced motion is requested.
const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
if('IntersectionObserver'in window&&!reduced){const elements=$$('.intro__heading,.story__text,.tasting-edit,.ritual__copy');const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('reveal-in');observer.unobserve(entry.target)}}},{threshold:0.08});elements.forEach(el=>{el.classList.add('reveal-ready');observer.observe(el)})}
})();
