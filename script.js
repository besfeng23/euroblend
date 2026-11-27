(()=>{
'use strict';
const $=(selector)=>document.querySelector(selector);
const $$=(selector)=>[...document.querySelectorAll(selector)];
const facebook='https://www.facebook.com/share/1deLJW2QHp/';
const menu=$('#mobile-menu'),nav=$('#site-nav');
if(menu&&nav){
 const close=()=>{menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open menu');nav.classList.remove('is-open')};
 menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));menu.setAttribute('aria-label',open?'Open menu':'Close menu');nav.classList.toggle('is-open',!open)});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
 document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
}
const year=$('#year');if(year)year.textContent=String(new Date().getFullYear());
const flavors=[
 {key:'macchiato',name:'Ube Macchiato',html:'Ube<br>Macchiato',eyebrow:'THE CAFÉ EDIT',description:'A macchiato-inspired ube pairing.',image:'ube-macchiato',width:1000,family:'cafe'},
 {key:'criollo-cacao',name:'Ube Criollo Cacao',html:'Ube Criollo<br>Cacao',eyebrow:'THE CACAO EDIT',description:'An ube and cacao flavor in the Euro Blend collection.',image:'ube-criollo-cacao',width:1000,family:'cafe'},
 {key:'criollo-salted-caramel',name:'Ube Criollo with Salted Caramel',html:'Ube Criollo<br>with Salted Caramel',eyebrow:'THE UNEXPECTED PAIRING',description:'A cacao-inspired pairing with a salted caramel twist.',image:'ube-criollo-salted-caramel',width:1000,family:'cafe'},
 {key:'salted-caramel',name:'Ube Latte — Salted Caramel',html:'Ube Latte —<br>Salted Caramel',eyebrow:'SWEET MEETS SALTY',description:'An ube latte with salted caramel flavor.',family:'velvet'},
 {key:'vanilla',name:'Ube Latte — Vanilla',html:'Ube Latte —<br>Vanilla',eyebrow:'A FAMILIAR PAIRING',description:'An ube latte with vanilla flavor.',family:'velvet'},
 {key:'light-lavender',name:'Ube Latte — Light Lavender',html:'Ube Latte —<br>Light Lavender',eyebrow:'THE SIGNATURE',description:'The Light Lavender flavor in the signature Ube Latte collection.',family:'signature'},
 {key:'classic',name:'Ube Latte — Classic Ube',html:'Ube Latte —<br>Classic Ube',eyebrow:'FAMILIAR AT HEART',description:'The Classic Ube flavor in the signature Ube Latte collection.',family:'signature'},
 {key:'latte',name:'Ube Latte — Deep Ube',html:'Ube Latte —<br>Deep Ube',eyebrow:'THE SIGNATURE',description:'The Deep Ube flavor in the signature Ube Latte collection.',image:'ube-latte',width:1122,family:'signature'},
 {key:'milk',name:'Ube Milk',html:'Ube<br>Milk',eyebrow:'A GENTLER MOMENT',description:'A milk-inspired pairing in the Euro Blend ube collection.',family:'milk'}
];
if(!$('#flavor-showcase'))return; // Trade page shares navigation, not the interactive home showcase.
const brandFilm=$('#brand-film-video'),brandFilmPlay=$('#brand-film-play');
if(brandFilm&&brandFilmPlay){
 const resetBrandFilm=()=>{
  const restoreFocus=document.activeElement===brandFilm;
  brandFilm.pause();
  brandFilm.removeAttribute('src');
  brandFilm.controls=false;
  brandFilm.tabIndex=-1;
  brandFilm.load();
  brandFilmPlay.hidden=false;
  if(restoreFocus)brandFilmPlay.focus();
 };
 brandFilmPlay.addEventListener('click',()=>{
  brandFilmPlay.hidden=true;
  brandFilm.controls=true;
  brandFilm.tabIndex=0;
  brandFilm.src='/videos/euroblend-film.mp4';
  brandFilm.load();
  brandFilm.focus();
  const playback=brandFilm.play();
  if(playback&&typeof playback.catch==='function')playback.catch(()=>{
   resetBrandFilm();
   brandFilmPlay.focus();
  });
 });
 brandFilm.addEventListener('ended',resetBrandFilm);
 brandFilm.addEventListener('error',resetBrandFilm);
}
const select=$('#flavor-showcase'),image=$('#flavor-image'),identity=$('#flavor-identity'),identityName=$('#flavor-identity-name'),title=$('#flavor-title'),eyebrow=$('#flavor-eyebrow'),description=$('#flavor-description'),counter=$('#flavor-count'),enquire=$('#flavor-enquire'),copy=$('#copy-flavor'),status=$('#copy-status');
const rail=$('.flavor-rail'),buttons=$$('.flavor-rail__option'),groups=$$('.flight-groups__tab');
const add=$('#add-to-flight'),tastingList=$('#tasting-list'),tastingStatus=$('#tasting-status'),tastingEmail=$('#tasting-email');
let selected=0,activeFamily='cafe';
const saved=[];
const indices=()=>flavors.map((f,i)=>f.family===activeFamily?i:-1).filter(i=>i>=0);
const productPhotos={macchiato:'ube-macchiato','criollo-cacao':'ube-criollo-cacao','criollo-salted-caramel':'ube-criollo-salted-caramel',latte:'ube-latte'};
let packView='carton';
const sourceText=(()=>{const p=new URLSearchParams(location.search),parts=[];for(const field of ['utm_source','utm_campaign','ref']){const value=(p.get(field)||'').replace(/[^a-zA-Z0-9 _.-]/g,'').slice(0,70);if(value)parts.push(field+': '+value)}return parts.length?'\nWhere I found Euro Blend: '+parts.join(' / '):''})();
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
 tastingEmail.href=facebook;tastingEmail.target='_blank';tastingEmail.rel='noopener noreferrer';
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
 if(photo){
  identity.hidden=true;image.hidden=false;
  image.srcset=`/images/editorial-${photo}-480.webp 480w, /images/editorial-${photo}-800.webp 800w`;
  image.src=`/images/editorial-${photo}-800.webp`;
  image.alt='Euro Blend '+f.name+' packaging artwork on natural linen';
 }else{
  // Owner directive: do not illustrate colors of an unverified beverage.
  image.hidden=true;image.removeAttribute('srcset');image.removeAttribute('src');image.alt='';
  identityName.textContent=f.name;
  identity.setAttribute('aria-label','Euro Blend '+f.name+' name artwork with no beverage appearance depicted');
  identity.hidden=false;
 }
 title.innerHTML=f.html;eyebrow.textContent=f.eyebrow;description.textContent=f.description;
 counter.textContent=String(selected+1).padStart(2,'0')+' / '+String(flavors.length).padStart(2,'0');
 enquire.setAttribute('aria-label','Ask about this flavor: '+f.name+' on the Euro Blend Facebook page');
 buttons.forEach((b,n)=>{const active=n===selected;b.classList.toggle('is-selected',active);b.setAttribute('aria-pressed',String(active))});
 status.textContent='';renderTasting();
}
function setFamily(family){
 if(!flavors.some(f=>f.family===family))return;
 activeFamily=family;
 const single=indices().length<2;
 rail.hidden=false;
 $('.showcase__bottom').hidden=single;
 groups.forEach(b=>{const active=b.dataset.family===family;b.classList.toggle('is-active',active);b.setAttribute('aria-pressed',String(active))});
 buttons.forEach(b=>{b.hidden=false});
 $('.menu-family').forEach(el=>el.classList.toggle('is-current',el.dataset.menuFamily===family));
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
function openFlavor(i){
 if(!flavors[i])return;
 if(activeFamily!==flavors[i].family)setFamily(flavors[i].family);
 choose(i);title.focus({preventScroll:true});
 select.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});
}
$('[data-feature-flavor]').forEach(b=>b.addEventListener('click',()=>openFlavor(Number(b.dataset.featureFlavor))));
buttons.forEach((button,index)=>button.addEventListener('click',()=>openFlavor(index)));
groups.forEach(button=>button.addEventListener('click',()=>{const i=flavors.findIndex(f=>f.family===button.dataset.family);openFlavor(flavors[selected].family===button.dataset.family?selected:i)}));
const rotate=step=>{const list=indices();if(list.length<2)return;const pos=list.indexOf(selected);choose(list[(pos+step+list.length)%list.length])};
$('#prev-flavor').addEventListener('click',()=>rotate(-1));$('#next-flavor').addEventListener('click',()=>rotate(1));
rail.addEventListener('keydown',e=>{const current=buttons.indexOf(e.target);if(current<0||!['ArrowRight','ArrowLeft','ArrowDown','ArrowUp','Home','End'].includes(e.key))return;e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?buttons.length-1:(current+(['ArrowRight','ArrowDown'].includes(e.key)?1:-1)+buttons.length)%buttons.length;buttons[next].focus()});
add.addEventListener('click',()=>{
 const pos=saved.indexOf(selected);
 if(pos>=0){saved.splice(pos,1);tastingStatus.textContent='Removed '+flavors[selected].name+'.'}
 else if(saved.length>=3){tastingStatus.textContent='You can select up to three flavors for one enquiry.';return}
 else{saved.push(selected);tastingStatus.textContent='Added '+flavors[selected].name+'.'}
 renderTasting();
});
copy.addEventListener('click',async()=>{const okay=await copyText(simpleEnquiry([flavors[selected].name])+sourceText);status.textContent=okay?'Enquiry copied. Paste it into a Facebook message.':'Copy unavailable here. Mention '+flavors[selected].name+' when you message Euro Blend.'});
$('#tasting-copy').addEventListener('click',async()=>{const names=saved.map(i=>flavors[i].name);if(!names.length){tastingStatus.textContent='Choose a flavor first.';return}const okay=await copyText(simpleEnquiry(names)+sourceText);tastingStatus.textContent=okay?'Your tasting edit is copied. Open Facebook to send it.':'Copy unavailable. Please list your chosen flavors when contacting Euro Blend.'});
setFamily(activeFamily);renderTasting();
// Theme controls change appearance and creative story only. They do not claim a morning/evening formulation.
const moodButtons=$$('[data-mood-choice]');
function setMood(mood){
 const active=mood==='purple-hour'?'purple-hour':'morning';document.body.dataset.mood=active;
 moodButtons.forEach(b=>{const on=b.dataset.moodChoice===active;b.classList.toggle('is-active',on);b.setAttribute('aria-pressed',String(on))});
 $('#hero-strap').textContent=active==='morning'?'A FILIPINO FAVORITE, REIMAGINED':'AN EVENING MOOD, A FAMILIAR FLAVOR';
 $('#hero-script').textContent=active==='morning'?'beautifully different.':'a different kind of evening.';
 $('#hero-lead').textContent=active==='morning'?'A Filipino favorite, expressed in nine distinctive café-inspired beverages. Discover the Euro Blend collection.':'Discover the same Euro Blend collection in a richer evening atmosphere.';
 $('#photo-tag').textContent=active==='morning'?'SIGNATURE COLLECTION':'THE EVENING EDIT';
 $('#photo-feature').textContent=active==='morning'?'Ube Latte — Deep Ube':'Ube Criollo with Salted Caramel';
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
function setEnquiry(kind){type=kind==='trade'?'trade':'personal';personal.classList.toggle('is-active',type==='personal');trade.classList.toggle('is-active',type==='trade');personal.setAttribute('aria-pressed',String(type==='personal'));trade.setAttribute('aria-pressed',String(type==='trade'));guide.textContent=type==='personal'?'Ask about flavor availability, current prices and delivery through Euro Blend’s Facebook page.':'For café, retail or hospitality supply, copy your enquiry and contact Euro Blend through its Facebook page.';action.href=facebook;action.target='_blank';action.rel='noopener noreferrer';action.innerHTML=type==='personal'?'Open Euro Blend Facebook <span aria-hidden="true">↗</span>':'Open Facebook for trade enquiries <span aria-hidden="true">↗</span>';enquiryStatus.textContent=''}
personal.addEventListener('click',()=>setEnquiry('personal'));trade.addEventListener('click',()=>setEnquiry('trade'));
$('#enquiry-copy').addEventListener('click',async()=>{const okay=await copyText(currentMessage()+sourceText);enquiryStatus.textContent=okay?'Enquiry copied and ready to paste.':'Copy unavailable. You can use the contact link above.'});
setEnquiry('personal');
// Progressive enhancement: do not hide content if animation observer fails or reduced motion is requested.
const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
if('IntersectionObserver'in window&&!reduced){const elements=$$('.intro__heading,.story__text,.tasting-edit,.ritual__copy');const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){entry.target.classList.add('reveal-in');observer.unobserve(entry.target)}}},{threshold:0.08});elements.forEach(el=>{el.classList.add('reveal-ready');observer.observe(el)})}
})();
